import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { api } from "../services/api";
import { toast } from "react-toastify";
import {
  User,
  Edit2,
  Save,
  Clock,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const statusColors = {
  Pending: "bg-yellow-100 text-yellow-800",
  Shipped: "bg-blue-100 text-blue-800",
  Completed: "bg-green-100 text-green-800",
  Cancelled: "bg-red-100 text-red-800",
};

const Profile = () => {
  const { user, updateUser } = useContext(AuthContext);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    password: "",
  });

  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [expandedOrders, setExpandedOrders] = useState([]);

  // Fetch user orders
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

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    updateUser(formData);
    setEditing(false);
  };

  const toggleExpand = (id) => {
    setExpandedOrders((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await api.put(`/orders/${orderId}/status`, { status: newStatus });
      toast.success(`Order status updated to ${newStatus}`);
      fetchOrders();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update status");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Profile Card */}
        <div className="flex-1 bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center">
          <div className="bg-orange-500 w-24 h-24 rounded-full flex items-center justify-center text-white text-4xl font-bold mb-4">
            <User size={48} />
          </div>
          <h2 className="text-xl font-semibold text-gray-800">{user?.name}</h2>
          <p className="text-gray-500">{user?.email}</p>
          <button
            onClick={() => setEditing(!editing)}
            className="mt-4 flex items-center gap-2 px-4 py-2 rounded-xl bg-orange-500 text-white hover:bg-orange-600 transition shadow-md"
          >
            <Edit2 size={16} /> {editing ? "Cancel" : "Edit Profile"}
          </button>
        </div>

        {/* Profile Form + Orders */}
        <div className="flex-1 flex flex-col gap-6">
          {/* Profile Form */}
          {editing && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-4"
            >
              <div>
                <label className="block text-gray-600 mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-1">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <button
                onClick={handleSave}
                className="mt-2 flex items-center gap-2 px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition shadow-md"
              >
                <Save size={16} /> Save Changes
              </button>
            </motion.div>
          )}

          {/* Orders Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">My Orders</h3>

            {loadingOrders ? (
              <p className="text-center py-4">Loading orders...</p>
            ) : orders.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No orders found</p>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {orders.map((order, index) => {
                  const isExpanded = expandedOrders.includes(order._id);
                  return (
                    <motion.div
                      key={order._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="border rounded-xl p-4 flex flex-col gap-2 hover:shadow-md transition"
                    >
                      {/* Header */}
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-xs text-gray-400">ORDER ID</p>
                          <p className="font-semibold break-all">{order._id}</p>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            statusColors[order.orderStatus] ||
                            "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {order.orderStatus || "Pending"}
                        </span>
                      </div>

                      {/* Total and Date */}
                      <div className="flex justify-between text-sm text-gray-700 mt-2">
                        <span>Total: ₹{order.totalPrice}</span>
                        <span className="flex items-center gap-1">
                          <Clock size={14} />{" "}
                          {order.createdAt
                            ? new Date(order.createdAt).toLocaleString()
                            : "N/A"}
                        </span>
                      </div>

                      {/* Expandable Products */}
                      <div className="mt-2">
                        <button
                          onClick={() => toggleExpand(order._id)}
                          className="flex items-center justify-between w-full text-sm font-medium text-orange-500"
                        >
                          {isExpanded ? "Hide Products" : "View Products"}
                          {isExpanded ? (
                            <ChevronUp size={16} />
                          ) : (
                            <ChevronDown size={16} />
                          )}
                        </button>
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden mt-2 space-y-1"
                            >
                              {order.orderItems?.map((item, idx) => (
                                <div
                                  key={item.product + "-" + idx}
                                  className="flex justify-between text-sm py-1 border-b last:border-b-0"
                                >
                                  <span>
                                    {item.name} × {item.quantity}
                                  </span>
                                  <span>
                                    ₹{(item.price * item.quantity).toFixed(2)}
                                  </span>
                                </div>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Status Actions */}
                      {order.orderStatus === "Pending" && (
                        <div className="mt-4 flex gap-2 flex-wrap">
                          <button
                            onClick={() =>
                              updateOrderStatus(order._id, "Completed")
                            }
                            className="flex-1 bg-green-500 text-white py-2 rounded-xl hover:bg-green-600 transition"
                          >
                            Mark Completed
                          </button>
                          <button
                            onClick={() =>
                              updateOrderStatus(order._id, "Cancelled")
                            }
                            className="flex-1 bg-red-500 text-white py-2 rounded-xl hover:bg-red-600 transition"
                          >
                            Cancel Order
                          </button>
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
