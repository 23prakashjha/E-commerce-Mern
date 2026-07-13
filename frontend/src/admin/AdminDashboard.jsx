import { useContext, useEffect, useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { api } from "../services/api";
import {
  Package, ShoppingCart, Shield, Users, Trash2, Search,
  TrendingUp, DollarSign, Activity, UserCheck, X
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => {
    if (!user || !user.isAdmin) {
      navigate("/register");
      return;
    }
    fetchAll();
  }, [user, navigate]);

  const fetchAll = async () => {
    try {
      const [usersRes, ordersRes, productsRes] = await Promise.all([
        api.get("/admin/users"),
        api.get("/admin/orders"),
        api.get("/products"),
      ]);
      setUsers(usersRes.data);
      setOrders(ordersRes.data);
      setProducts(productsRes.data);
    } catch (err) {
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = useMemo(() => {
    if (!search) return users;
    const q = search.toLowerCase();
    return users.filter((u) => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q));
  }, [users, search]);

  const handleDeleteUser = async (id) => {
    try {
      await api.delete(`/admin/users/${id}`);
      setUsers((prev) => prev.filter((u) => u._id !== id));
      toast.success("User deleted");
      setDeleteConfirm(null);
    } catch (err) {
      toast.error(err.response?.data?.message || "Delete failed");
    }
  };

  const stats = [
    { label: "Total Users", value: users.length, icon: Users, color: "from-blue-400 to-blue-600" },
    { label: "Total Orders", value: orders.length, icon: ShoppingCart, color: "from-emerald-400 to-emerald-600" },
    { label: "Total Products", value: products.length, icon: Package, color: "from-orange-400 to-orange-600" },
    { label: "Revenue", value: `₹${orders.reduce((s, o) => s + (o.totalPrice || 0), 0).toLocaleString()}`, icon: DollarSign, color: "from-purple-400 to-purple-600" },
  ];

  const pendingOrders = orders.filter((o) => o.orderStatus === "Pending").length;
  const adminUsers = users.filter((u) => u.isAdmin).length;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <span className="animate-spin h-16 w-16 border-4 border-orange-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* HEADER */}
      <header className="bg-linear-to-r from-orange-500 to-orange-600 text-white shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="text-center sm:text-left">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">Admin Dashboard</h1>
            <p className="mt-2 text-white/90 text-lg">
              Welcome back, <span className="font-semibold">{user?.name || "Administrator"}</span>
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-white/15 backdrop-blur-md px-5 py-3 rounded-2xl">
              <Shield className="w-6 h-6" />
              <span className="font-semibold tracking-wide">Admin Access</span>
            </div>
            <Link to="/admin/register"
              className="bg-white/20 hover:bg-white/30 px-5 py-3 rounded-2xl font-semibold transition text-sm">
              + New Admin
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* STATS GRID */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-md hover:shadow-xl transition border border-gray-100 dark:border-gray-700"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-linear-to-br ${stat.color} text-white shadow`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-3xl font-extrabold text-gray-800 dark:text-gray-100">{stat.value}</span>
                </div>
                <p className="text-gray-500 dark:text-gray-400 font-medium">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>

        {/* QUICK ACTIONS + INSIGHTS */}
        <div className="grid lg:grid-cols-3 gap-8 mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            <Link to="/admin/products"
              className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-md hover:shadow-xl transition border border-gray-100 dark:border-gray-700 group">
              <Package className="w-12 h-12 text-orange-500 mb-4" />
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">Manage Products</h3>
              <p className="text-gray-500 dark:text-gray-400 mt-2">Add, update & manage inventory</p>
              <span className="inline-block mt-4 text-orange-500 font-semibold group-hover:translate-x-2 transition">Go →</span>
            </Link>
            <Link to="/admin/orders"
              className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-md hover:shadow-xl transition border border-gray-100 dark:border-gray-700 group">
              <ShoppingCart className="w-12 h-12 text-emerald-500 mb-4" />
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">View Orders</h3>
              <p className="text-gray-500 dark:text-gray-400 mt-2">Track & manage all orders</p>
              <span className="inline-block mt-4 text-emerald-500 font-semibold group-hover:translate-x-2 transition">Go →</span>
            </Link>
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-md border border-gray-100 dark:border-gray-700 sm:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <Activity className="text-orange-500" />
                <h3 className="text-lg font-bold">Platform Insights</h3>
              </div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-extrabold text-orange-500">{pendingOrders}</p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Pending Orders</p>
                </div>
                <div>
                  <p className="text-2xl font-extrabold text-emerald-500">{adminUsers}</p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Admins</p>
                </div>
                <div>
                  <p className="text-2xl font-extrabold text-blue-500">{users.length - adminUsers}</p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Customers</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* RECENT ORDERS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-md border border-gray-100 dark:border-gray-700"
          >
            <h3 className="font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2">
              <TrendingUp className="text-orange-500" size={20} />
              Recent Orders
            </h3>
            <div className="space-y-3">
              {orders.slice(0, 5).map((order) => (
                <div key={order._id} className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-300 truncate max-w-[120px]">{order._id.slice(-8)}</span>
                  <span className="font-semibold">₹{order.totalPrice?.toFixed(2)}</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    order.orderStatus === "Completed" ? "bg-green-100 text-green-700" :
                    order.orderStatus === "Pending" ? "bg-yellow-100 text-yellow-700" :
                    order.orderStatus === "Shipped" ? "bg-blue-100 text-blue-700" :
                    "bg-red-100 text-red-700"
                  }`}>{order.orderStatus}</span>
                </div>
              ))}
              {orders.length === 0 && <p className="text-gray-400 dark:text-gray-500 text-sm text-center py-4">No orders yet</p>}
            </div>
          </motion.div>
        </div>

        {/* USERS MANAGEMENT */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-900 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden"
        >
          <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-3">
              <Users className="text-orange-500" size={24} />
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">User Management</h2>
              <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm font-semibold">{users.length} total</span>
            </div>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-3 text-gray-400 dark:text-gray-500" size={18} />
              <input type="text" placeholder="Search users..."
                value={search} onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-orange-400 outline-none dark:bg-gray-900 dark:text-gray-100 dark:border-gray-600" />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Role</th>
                  <th className="px-6 py-4">Joined</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((u) => (
                  <tr key={u._id} className="border-t border-gray-100 dark:border-gray-700 hover:bg-orange-50/50 dark:hover:bg-orange-900/10 transition">
                    <td className="px-6 py-4 font-medium text-gray-800 dark:text-gray-100">{u.name}</td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{u.email}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        u.isAdmin ? "bg-orange-100 text-orange-700" : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300"
                      }`}>
                        {u.isAdmin ? "Admin" : "User"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500 dark:text-gray-400 text-sm">
                      {new Date(u.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => setDeleteConfirm(u)}
                        disabled={u._id === user._id}
                        className="p-2 rounded-lg text-red-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition disabled:opacity-30 disabled:cursor-not-allowed"
                        title={u._id === user._id ? "Cannot delete yourself" : "Delete user"}>
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredUsers.length === 0 && (
              <p className="text-center text-gray-400 dark:text-gray-500 py-12">No users found</p>
            )}
          </div>
        </motion.div>
      </main>

      {/* DELETE CONFIRM MODAL */}
      <AnimatePresence>
        {deleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setDeleteConfirm(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-gray-900 rounded-3xl p-8 max-w-sm w-full shadow-2xl text-center"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
                <Trash2 className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">Delete User?</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-2">
                Are you sure you want to delete <strong>{deleteConfirm.name}</strong>?
              </p>
              <p className="text-red-500 text-sm mb-6">This action cannot be undone.</p>
              <div className="flex gap-4">
                <button onClick={() => setDeleteConfirm(null)}
                  className="flex-1 py-3 rounded-xl border border-gray-300 dark:border-gray-600 font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                  Cancel
                </button>
                <button onClick={() => handleDeleteUser(deleteConfirm._id)}
                  className="flex-1 py-3 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 transition">
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboard;
