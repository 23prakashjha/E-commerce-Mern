import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, User, Shield } from "lucide-react";

const Register = () => {
  const { register, login, adminLogin, registerAdmin } = useContext(AuthContext);
  const navigate = useNavigate();

  const [mode, setMode] = useState("user");
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "admin") {
        if (isLogin) {
          await adminLogin({ email: form.email, password: form.password });
          toast.success("Welcome back, Admin!");
          navigate("/admin");
        } else {
          await registerAdmin({ name: form.name, email: form.email, password: form.password });
          toast.success("Admin account created!");
          navigate("/admin");
        }
      } else {
        if (isLogin) {
          await login({ email: form.email, password: form.password });
          toast.success("Welcome back!");
        } else {
          await register(form);
          toast.success("Account created successfully!");
        }
        navigate("/");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-orange-100 via-white to-orange-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl w-full bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2"
      >
        <div className="hidden md:flex flex-col justify-center items-center bg-linear-to-br from-orange-500 to-orange-600 text-white p-10 relative overflow-hidden">
          <div className="absolute top-5 left-5 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-5 right-5 w-60 h-60 bg-white/10 rounded-full blur-3xl" />
          <div className="relative z-10 text-center">
            {mode === "admin" ? (
              <>
                <Shield className="w-16 h-16 mx-auto mb-6 opacity-90" />
                <h2 className="text-4xl font-extrabold mb-4">
                  {isLogin ? "Admin Login" : "Admin Register"}
                </h2>
                <p className="text-lg opacity-90">
                  {isLogin
                    ? "Access your admin dashboard."
                    : "Create a new admin account."}
                </p>
              </>
            ) : (
              <>
                <h2 className="text-4xl font-extrabold mb-4">
                  {isLogin ? "Welcome Back" : "Join ShopEase"}
                </h2>
                <p className="text-lg opacity-90">
                  {isLogin
                    ? "Login to manage orders, wishlist and cart."
                    : "Create an account and start shopping smarter."}
                </p>
              </>
            )}
          </div>
        </div>

        <div className="p-8 sm:p-12">
          {/* Mode Tabs */}
          <div className="flex bg-gray-100 dark:bg-gray-700 rounded-xl p-1 mb-8">
            <button
              onClick={() => { setMode("user"); setForm({ name: "", email: "", password: "" }); }}
              className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition ${
                mode === "user" ? "bg-white dark:bg-gray-800 text-orange-600 shadow-sm" : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              }`}
            >
              <User className="inline w-4 h-4 mr-1.5" />User
            </button>
            <button
              onClick={() => { setMode("admin"); setForm({ name: "", email: "", password: "" }); }}
              className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition ${
                mode === "admin" ? "bg-white dark:bg-gray-800 text-orange-600 shadow-sm" : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              }`}
            >
              <Shield className="inline w-4 h-4 mr-1.5" />Admin
            </button>
          </div>

          <h1 className="text-3xl font-bold text-center mb-6 dark:text-gray-100">
            {mode === "admin"
              ? (isLogin ? "Admin Login" : "Admin Registration")
              : (isLogin ? "Login to Account" : "Create Account")}
          </h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div className="relative">
                <User className="absolute left-3 top-3.5 text-gray-400 dark:text-gray-500" size={18} />
                <input
                  type="text" name="name" placeholder={mode === "admin" ? "Admin Name" : "Full Name"}
                  className="w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-400 focus:outline-none dark:bg-gray-900 dark:text-gray-100 dark:border-gray-600"
                  value={form.name} onChange={handleChange} required
                />
              </div>
            )}

            <div className="relative">
              <Mail className="absolute left-3 top-3.5 text-gray-400 dark:text-gray-500" size={18} />
              <input
                type="email" name="email" placeholder="Email Address"
                className="w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-400 focus:outline-none dark:bg-gray-900 dark:text-gray-100 dark:border-gray-600"
                value={form.email} onChange={handleChange} required
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-3.5 text-gray-400 dark:text-gray-500" size={18} />
              <input
                type={showPassword ? "text" : "password"} name="password" placeholder="Password"
                className="w-full pl-10 pr-10 py-3 border rounded-xl focus:ring-2 focus:ring-orange-400 focus:outline-none dark:bg-gray-900 dark:text-gray-100 dark:border-gray-600"
                value={form.password} onChange={handleChange} required
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3.5 text-gray-400 dark:text-gray-500 hover:text-orange-500">
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <motion.button
              whileTap={{ scale: 0.97 }}
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-semibold py-3 rounded-xl shadow-lg transition"
            >
              {loading ? "Please wait..." : (isLogin ? "Sign In" : "Create Account")}
            </motion.button>
          </form>

          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-gray-300 dark:bg-gray-600" />
            <span className="text-sm text-gray-500 dark:text-gray-400">OR</span>
            <div className="flex-1 h-px bg-gray-300 dark:bg-gray-600" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button type="button" className="border dark:border-gray-600 py-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition font-medium">Google</button>
            <button type="button" className="border dark:border-gray-600 py-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition font-medium">Facebook</button>
          </div>

          <p className="mt-6 text-center text-gray-600 dark:text-gray-300">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button onClick={() => setIsLogin(!isLogin)} className="text-orange-500 font-semibold hover:underline">
              {isLogin ? "Register" : "Login"}
            </button>
          </p>

          <p className="mt-3 text-center text-xs text-gray-400 dark:text-gray-500">
            {mode === "admin"
              ? "Admin area — for authorized personnel only"
              : "Regular user account"}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
