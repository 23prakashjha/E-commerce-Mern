import { useContext, useEffect, useState, useMemo } from "react";
import { AuthContext } from "../context/AuthContext";
import { api } from "../services/api";
import { toast } from "react-toastify";
import { User, Clock, ChevronDown, ChevronUp, Package, ShoppingBag, IndianRupee, Calendar, MapPin, CreditCard, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

const statusColors = {
  Pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  Shipped: "bg-blue-100 text-blue-800 border-blue-200",
  Completed: "bg-green-100 text-green-800 border-green-200",
  Cancelled: "bg-red-100 text-red-800 border-red-200",
};

const Skeleton = () => (
  <div className="animate-pulse space-y-4">
    {[1, 2, 3].map((i) => (
      <div key={i} className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 space-y-3">
        <div className="flex justify-between">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32" />
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-20" />
        </div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-48" />
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-36" />
      </div>
    ))}
  </div>
);

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [expandedOrders, setExpandedOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const { data } = await api.get("/orders/myorders");
      setOrders(data || []);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to load orders");
    } finally {
      setLoadingOrders(false);
    }
  };

  useEffect(() => { fetchOrders(); }, []);

  const toggleExpand = (id) => {
    setExpandedOrders((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const stats = useMemo(() => {
    const totalOrders = orders.length;
    const totalSpent = orders.reduce((sum, o) => sum + (o.totalPrice || 0), 0);
    const pendingOrders = orders.filter((o) => o.orderStatus === "Pending" || o.orderStatus === "Shipped").length;
    return { totalOrders, totalSpent, pendingOrders };
  }, [orders]);

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <User size={64} className="mx-auto text-gray-300 dark:text-gray-600 mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">Please Login</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6">You need to be logged in to view your profile.</p>
        <Link to="/register" className="inline-block bg-orange-500 text-white px-8 py-3 rounded-xl font-semibold hover:bg-orange-600 transition shadow-lg">
          Login / Register
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* ===== USER CARD ===== */}
        <div className="lg:w-80">
          <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-lg border border-gray-50 dark:border-gray-700 p-6 lg:sticky lg:top-24">
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-linear-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white shadow-lg mb-4">
                <User size={40} />
              </div>
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">{user.name}</h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm">{user.email}</p>
              {user.isAdmin && (
                <span className="mt-2 inline-block bg-orange-100 text-orange-600 text-xs font-bold px-3 py-1 rounded-full">
                  Admin
                </span>
              )}
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3 text-center">
              <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl py-3">
                <p className="text-xl font-bold text-orange-500">{stats.totalOrders}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Orders</p>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 rounded-xl py-3">
                <p className="text-xl font-bold text-green-500">{stats.pendingOrders}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Active</p>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl py-3">
                <p className="text-xl font-bold text-blue-500">₹{stats.totalSpent.toLocaleString()}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Spent</p>
              </div>
            </div>

            <div className="mt-6 space-y-2">
              <Link to="/products" className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 hover:text-orange-500 transition p-2 rounded-lg hover:bg-orange-50 dark:hover:bg-orange-900/20">
                <ShoppingBag size={16} /> Continue Shopping
              </Link>
              {user.isAdmin && (
                <Link to="/admin" className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 hover:text-orange-500 transition p-2 rounded-lg hover:bg-orange-50 dark:hover:bg-orange-900/20">
                  <Package size={16} /> Admin Dashboard
                </Link>
              )}
              <button
                onClick={() => { logout(); navigate("/"); }}
                className="flex items-center gap-2 text-sm text-red-500 hover:text-red-600 transition p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 w-full"
              >
                <LogOut size={16} /> Logout
              </button>
            </div>
          </div>
        </div>

        {/* ===== ORDERS ===== */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-6">
            <Package size={24} className="text-orange-500" />
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">My Orders</h2>
            {orders.length > 0 && (
              <span className="bg-orange-100 text-orange-600 text-xs font-bold px-3 py-1 rounded-full">
                {orders.length} total
              </span>
            )}
          </div>

          {loadingOrders ? (
            <Skeleton />
          ) : orders.length === 0 ? (
            <div className="text-center py-24 bg-white dark:bg-gray-900 rounded-3xl shadow-sm border border-gray-50 dark:border-gray-700">
              <Package size={48} className="mx-auto text-gray-300 dark:text-gray-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">No orders yet</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6">Start shopping to see your orders here.</p>
              <Link
                to="/products"
                className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-2.5 rounded-xl font-semibold shadow-lg transition"
              >
                <ShoppingBag size={18} /> Browse Products
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order, index) => {
                const isExpanded = expandedOrders.includes(order._id);
                return (
                  <motion.div
                    key={order._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.04 }}
                    className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-50 dark:border-gray-700 hover:shadow-md transition-shadow overflow-hidden"
                  >
                    <div className="p-5">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="min-w-0">
                          <p className="text-xs text-gray-400 dark:text-gray-500 font-medium">ORDER ID</p>
                          <p className="font-mono text-sm font-semibold text-gray-700 dark:text-gray-200 truncate">{order._id}</p>
                        </div>
                        <span className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-bold border ${statusColors[order.orderStatus] || "bg-gray-100 text-gray-800"}`}>
                          {order.orderStatus || "Pending"}
                        </span>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-4 gap-2">
                        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
                          <span className="flex items-center gap-1">
                            <IndianRupee size={14} className="text-orange-500" />
                            <strong>₹{order.totalPrice?.toFixed(2)}</strong>
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar size={14} className="text-gray-400 dark:text-gray-500" />
                            {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "N/A"}
                          </span>
                          <span className="flex items-center gap-1">
                            <CreditCard size={14} className="text-gray-400 dark:text-gray-500" />
                            {order.paymentMethod || "COD"}
                          </span>
                        </div>

                        {order.orderItems?.length > 0 && (
                          <button
                            onClick={() => toggleExpand(order._id)}
                            className="flex items-center gap-1 text-sm font-medium text-orange-500 hover:text-orange-600 transition shrink-0"
                          >
                            {isExpanded ? "Hide Items" : `View Items (${order.orderItems.length})`}
                            {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                          </button>
                        )}
                      </div>

                      {order.shippingAddress && (
                        <div className="mt-3 flex items-start gap-1.5 text-xs text-gray-400 dark:text-gray-500">
                          <MapPin size={12} className="mt-0.5 shrink-0" />
                          <span className="truncate">
                            {order.shippingAddress.name}, {order.shippingAddress.street}, {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.zip}
                          </span>
                        </div>
                      )}
                    </div>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="border-t border-gray-100 dark:border-gray-700 px-5 py-4 space-y-3 bg-gray-50/50 dark:bg-gray-800/50">
                            {order.orderItems?.map((item, idx) => (
                              <div key={item.product + "-" + idx} className="flex items-center justify-between text-sm">
                                <div className="min-w-0 flex-1">
                                  <p className="font-medium text-gray-700 dark:text-gray-200 truncate">{item.name}</p>
                                  <p className="text-gray-400 dark:text-gray-500 text-xs">Qty: {item.quantity}</p>
                                </div>
                                <span className="font-semibold text-gray-700 dark:text-gray-200 shrink-0 ml-4">
                                  ₹{(item.price * item.quantity).toFixed(2)}
                                </span>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
