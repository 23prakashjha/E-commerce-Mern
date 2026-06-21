import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Shield, UserPlus, Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const AdminRegister = () => {
  const { registerAdmin } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      return toast.error("Passwords do not match!");
    }
    if (formData.password.length < 6) {
      return toast.error("Password must be at least 6 characters");
    }
    try {
      setLoading(true);
      await registerAdmin({ name: formData.name, email: formData.email, password: formData.password });
      toast.success("Admin account created successfully!");
      navigate("/admin");
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-50 to-orange-50 px-4 py-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-white p-10 rounded-3xl shadow-2xl"
      >
        <div className="flex flex-col items-center mb-8">
          <div className="bg-linear-to-br from-orange-500 to-orange-600 w-20 h-20 rounded-full flex items-center justify-center text-white shadow-lg mb-4">
            <Shield size={36} />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-800">Admin Registration</h2>
          <p className="text-gray-500 mt-2">
            Already an admin?{" "}
            <Link to="/admin/login" className="text-orange-500 font-bold hover:underline">Log In</Link>
          </p>
        </div>

        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <div>
            <label className="text-gray-600 text-sm font-medium mb-1.5 block">Full Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange}
              placeholder="Enter your name" required
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 transition" />
          </div>
          <div>
            <label className="text-gray-600 text-sm font-medium mb-1.5 block">Email Address</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange}
              placeholder="admin@example.com" required
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 transition" />
          </div>
          <div>
            <label className="text-gray-600 text-sm font-medium mb-1.5 block">Password</label>
            <div className="relative">
              <input type={showPwd ? "text" : "password"} name="password" value={formData.password} onChange={handleChange}
                placeholder="Min. 6 characters" required minLength={6}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-orange-500 transition" />
              <button type="button" onClick={() => setShowPwd(!showPwd)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                {showPwd ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
          <div>
            <label className="text-gray-600 text-sm font-medium mb-1.5 block">Confirm Password</label>
            <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange}
              placeholder="Re-enter password" required
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 transition" />
          </div>

          <button type="submit" disabled={loading}
            className="mt-4 w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-linear-to-r from-orange-500 to-orange-600 text-white font-bold hover:from-orange-600 hover:to-orange-700 transition shadow-lg disabled:opacity-50 text-lg">
            <UserPlus size={20} />
            {loading ? "Creating Admin..." : "Create Admin"}
          </button>
        </form>

        <p className="text-center text-gray-400 text-sm mt-6">
          By registering, you agree to our Terms & Privacy Policy
        </p>
      </motion.div>
    </div>
  );
};

export default AdminRegister;
