import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Package, ShoppingCart, Shield } from "lucide-react";
import { motion } from "framer-motion";

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  /* ================= AUTH GUARD ================= */
  useEffect(() => {
    if (!user) {
      navigate("/register");
    }
  }, [user, navigate]);

  /* ================= QUICK ACTIONS ================= */
  const quickActions = [
    {
      name: "Manage Products",
      link: "/admin/products",
      icon: Package,
      description: "Add, update and manage store products",
      color: "from-orange-400 to-orange-600",
    },
    {
      name: "View Orders",
      link: "/admin/orders",
      icon: ShoppingCart,
      description: "Track and manage customer orders",
      color: "from-emerald-400 to-emerald-600",
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100">
      {/* ================= HEADER ================= */}
      <header className="bg-linear-to-r from-orange-500 to-orange-600 text-white shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="text-center sm:text-left">
            <h1 className="text-4xl font-extrabold tracking-tight">
              Admin Dashboard
            </h1>
            <p className="mt-2 text-white/90">
              Welcome back,{" "}
              <span className="font-semibold">
                {user?.name || "Administrator"}
              </span>
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white/15 backdrop-blur-md px-5 py-3 rounded-2xl">
            <Shield className="w-8 h-8" />
            <span className="font-semibold tracking-wide">
              Admin Access
            </span>
          </div>
        </div>
      </header>

      {/* ================= CONTENT ================= */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* ================= INTRO ================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center sm:text-left"
        >
          <h2 className="text-3xl font-bold text-gray-800">
            Quick Actions
          </h2>
          <p className="mt-2 text-gray-600 max-w-xl">
            Manage your store efficiently using the tools below.
          </p>
        </motion.div>

        {/* ================= ACTION CARDS ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <motion.div
                key={action.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                <Link
                  to={action.link}
                  className="relative overflow-hidden bg-white rounded-3xl shadow-xl p-8 h-full flex flex-col justify-between hover:shadow-2xl transition-all"
                >
                  <div
                    className={`absolute inset-0 opacity-10 bg-linear-to-br ${action.color}`}
                  />

                  <div className="relative z-10">
                    <Icon className="w-14 h-14 text-orange-500 mb-6" />
                    <h3 className="text-2xl font-bold text-gray-800">
                      {action.name}
                    </h3>
                    <p className="mt-2 text-gray-600">
                      {action.description}
                    </p>
                  </div>

                  <div className="relative z-10 mt-8 text-orange-600 font-semibold">
                    Go to section →
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
