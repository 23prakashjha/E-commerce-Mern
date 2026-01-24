import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { Shield, UserPlus } from "lucide-react";
import { toast } from "react-toastify";

const AdminRegister = () => {
  const { registerAdmin } = useContext(AuthContext); // Assume you have a separate admin registration function
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      setLoading(true);
      await registerAdmin(formData); // Your admin registration logic
      toast.success("Admin account created successfully!");
      navigate("/admin"); // Redirect to admin dashboard
    } catch (err) {
      toast.error(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg">
        <div className="flex flex-col items-center mb-6">
          <div className="bg-orange-500 w-16 h-16 rounded-full flex items-center justify-center text-white text-3xl mb-3 shadow-md">
            <Shield size={32} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Admin Registration</h2>
          <p className="text-gray-500 mt-1 text-sm">
            Already an admin?{" "}
            <Link
              to="/admin/login"
              className="text-orange-500 font-medium hover:underline"
            >
              Log In
            </Link>
          </p>
        </div>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <label className="text-gray-600 mb-1 block">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Admin name"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div>
            <label className="text-gray-600 mb-1 block">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="admin@example.com"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div>
            <label className="text-gray-600 mb-1 block">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div>
            <label className="text-gray-600 mb-1 block">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-orange-500 text-white font-semibold hover:bg-orange-600 transition shadow-md disabled:opacity-50"
          >
            <UserPlus size={18} />
            {loading ? "Creating..." : "Create Admin"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminRegister;
