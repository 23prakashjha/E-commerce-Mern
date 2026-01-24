import { useEffect, useMemo, useState } from "react";
import { api } from "../services/api";
import { toast } from "react-toastify";
import {
  Search,
  PackageCheck,
  Clock,
  ShoppingCart,
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

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [expandedOrders, setExpandedOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const { data } = await api.get("/orders/myorders");
      setOrders(data || []);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      const matchSearch = o._id?.toLowerCase().includes(search.toLowerCase());
      const matchStatus =
        statusFilter === "All" || o.orderStatus === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [orders, search, statusFilter]);

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

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="animate-spin h-12 w-12 border-4 border-orange-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <ShoppingCart className="text-orange-500 w-8 h-8" />
        <h1 className="text-3xl font-extrabold">My Orders</h1>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-3 text-gray-400" />
          <input
            placeholder="Search by Order ID"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-xl focus:ring-2 focus:ring-orange-400 outline-none"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border rounded-xl px-4 py-2 focus:ring-2 focus:ring-orange-400"
        >
          <option value="All">All Status</option>
          {Object.keys(statusColors).map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {/* No Orders */}
      {filteredOrders.length === 0 && (
        <div className="text-center py-24 text-gray-500">
          <PackageCheck className="mx-auto mb-4 w-12 h-12 text-gray-400" />
          <p className="text-lg font-medium">No orders found</p>
        </div>
      )}

      {/* Orders Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredOrders.map((order, index) => {
          const isExpanded = expandedOrders.includes(order._id);
          return (
            <motion.div
              key={order._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-2xl shadow hover:shadow-lg transition p-6 flex flex-col"
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

              {/* Summary */}
              <div className="space-y-1 text-gray-700 mt-3">
                <p>
                  <strong>Total:</strong> ₹{order.totalPrice || "0.00"}
                </p>
                <p className="text-sm">
                  <strong>Payment:</strong> {order.paymentMethod || "COD"}
                </p>
                <p className="text-sm flex items-center gap-1 text-gray-500">
                  <Clock size={14} />
                  {order.createdAt
                    ? new Date(order.createdAt).toLocaleString()
                    : "N/A"}
                </p>
              </div>

              {/* Expandable Products */}
              <div className="mt-3">
                <button
                  onClick={() => toggleExpand(order._id)}
                  className="flex items-center justify-between w-full text-sm font-medium text-orange-500"
                >
                  {isExpanded ? "Hide Details" : "View Products"}
                  {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden mt-2"
                    >
                      {order.orderItems?.map((item, idx) => (
                        <div
                          key={item.product + "-" + idx}
                          className="flex justify-between text-sm py-1 border-b last:border-b-0"
                        >
                          <span>
                            {item.name} × {item.quantity}
                          </span>
                          <span>₹{(item.price * item.quantity).toFixed(2)}</span>
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
                    onClick={() => updateOrderStatus(order._id, "Completed")}
                    className="flex-1 bg-green-500 text-white py-2 rounded-xl hover:bg-green-600 transition"
                  >
                    Mark Completed
                  </button>
                  <button
                    onClick={() => updateOrderStatus(order._id, "Cancelled")}
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
    </div>
  );
};

export default Orders;



