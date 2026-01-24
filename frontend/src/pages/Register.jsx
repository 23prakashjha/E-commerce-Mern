import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";

const Register = () => {
  const { register, login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await login({ email: form.email, password: form.password });
        toast.success("Welcome back!");
      } else {
        await register(form);
        toast.success("Account created successfully!");
        setIsLogin(true);
        setForm({ name: "", email: "", password: "" });
      }
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Authentication failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-orange-100 via-white to-orange-50 px-4">

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2"
      >
        {/* ================= LEFT PANEL ================= */}
        <div className="hidden md:flex flex-col justify-center items-center bg-linear-to-br from-orange-500 to-orange-600 text-white p-10">
          <h2 className="text-4xl font-extrabold mb-4">
            {isLogin ? "Welcome Back 👋" : "Join ShopEase 🛍️"}
          </h2>
          <p className="text-lg opacity-90 text-center">
            {isLogin
              ? "Login to manage orders, wishlist and cart."
              : "Create an account and start shopping smarter."}
          </p>
        </div>

        {/* ================= FORM PANEL ================= */}
        <div className="p-8 sm:p-12">
          <h1 className="text-3xl font-bold text-center mb-6">
            {isLogin ? "Login to Account" : "Create Account"}
          </h1>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Name */}
            {!isLogin && (
              <div className="relative">
                <User className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  className="w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-400 focus:outline-none"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
            )}

            {/* Email */}
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-400" />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                className="w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-400 focus:outline-none"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Password */}
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                className="w-full pl-10 pr-10 py-3 border rounded-xl focus:ring-2 focus:ring-orange-400 focus:outline-none"
                value={form.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-orange-500"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Submit */}
            <motion.button
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-xl shadow-lg transition"
            >
              {isLogin ? "Login" : "Register"}
            </motion.button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-gray-300" />
            <span className="text-sm text-gray-500">OR</span>
            <div className="flex-1 h-px bg-gray-300" />
          </div>

          {/* Social Buttons (UI ready) */}
          <div className="grid grid-cols-2 gap-4">
            <button className="border py-3 rounded-xl hover:bg-gray-50 transition font-medium">
              Google
            </button>
            <button className="border py-3 rounded-xl hover:bg-gray-50 transition font-medium">
              Facebook
            </button>
          </div>

          {/* Toggle */}
          <p className="mt-6 text-center text-gray-600">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-orange-500 font-semibold hover:underline"
            >
              {isLogin ? "Register" : "Login"}
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
