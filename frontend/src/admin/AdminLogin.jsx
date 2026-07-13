import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Shield, LogIn, Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const AdminLogin = () => {
  const { adminLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await adminLogin({ email: formData.email, password: formData.password });
      toast.success("Welcome back, Admin!");
      navigate("/admin");
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid admin credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-50 to-orange-50 dark:from-gray-900 dark:to-gray-800 px-4 py-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-white dark:bg-gray-900 p-10 rounded-3xl shadow-2xl"
      >
        <div className="flex flex-col items-center mb-8">
          <div className="bg-linear-to-br from-orange-500 to-orange-600 w-20 h-20 rounded-full flex items-center justify-center text-white shadow-lg mb-4">
            <Shield size={36} />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-800 dark:text-gray-100">Admin Login</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Not an admin?{" "}
            <Link to="/admin/register" className="text-orange-500 font-bold hover:underline">Register</Link>
          </p>
        </div>

        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <div>
            <label className="text-gray-600 dark:text-gray-300 text-sm font-medium mb-1.5 block">Email Address</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange}
              placeholder="admin@example.com" required
              className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 transition" />
          </div>
          <div>
            <label className="text-gray-600 dark:text-gray-300 text-sm font-medium mb-1.5 block">Password</label>
            <div className="relative">
              <input type={showPwd ? "text" : "password"} name="password" value={formData.password} onChange={handleChange}
                placeholder="Enter your password" required
                className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100 rounded-xl px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-orange-500 transition" />
              <button type="button" onClick={() => setShowPwd(!showPwd)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300">
                {showPwd ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button type="submit" disabled={loading}
            className="mt-4 w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-linear-to-r from-orange-500 to-orange-600 text-white font-bold hover:from-orange-600 hover:to-orange-700 transition shadow-lg disabled:opacity-50 text-lg">
            <LogIn size={20} />
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="text-center mt-6">
          <Link to="/register" className="text-gray-400 dark:text-gray-500 hover:text-orange-500 text-sm transition">
            Regular user? Sign in here
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
