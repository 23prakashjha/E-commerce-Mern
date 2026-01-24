import { Facebook, Twitter, Instagram, Linkedin, Home, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-5 gap-8">

        {/* ================= BRAND ================= */}
        <div className="md:col-span-2">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-linear-to-r from-orange-500 to-orange-600 p-3 rounded-full shadow-lg">
              <Home className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white">
              Shop<span className="text-orange-500">Ease</span>
            </h2>
          </div>

          <p className="text-sm leading-relaxed text-gray-400 mb-4">
            ShopEase is your ultimate destination for premium products, secure payments, and fast delivery. Join thousands of happy customers today!
          </p>

          {/* Newsletter */}
          <div className="mt-6">
            <h3 className="text-white font-semibold mb-2">Subscribe to Newsletter</h3>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="p-3 rounded-lg flex-1 focus:outline-none focus:ring-2 focus:ring-orange-400 border border-gray-700 bg-gray-800 placeholder-gray-400"
              />
              <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition flex items-center justify-center gap-2">
                <Mail size={18} /> Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* ================= QUICK LINKS ================= */}
        <div>
          <h3 className="text-white font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-orange-500 transition">Home</Link>
            </li>
            <li>
              <Link to="/products" className="hover:text-orange-500 transition">Products</Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-orange-500 transition">About Us</Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-orange-500 transition">Contact</Link>
            </li>
          </ul>
        </div>

        {/* ================= SUPPORT ================= */}
        <div>
          <h3 className="text-white font-semibold mb-4">Support</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-orange-500 transition cursor-pointer">FAQs</li>
            <li className="hover:text-orange-500 transition cursor-pointer">Privacy Policy</li>
            <li className="hover:text-orange-500 transition cursor-pointer">Terms & Conditions</li>
            <li className="hover:text-orange-500 transition cursor-pointer">Help Center</li>
          </ul>
        </div>

        {/* ================= SOCIAL ================= */}
        <div>
          <h3 className="text-white font-semibold mb-4">Follow Us</h3>
          <div className="flex gap-3">
            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, idx) => (
              <a
                key={idx}
                href="#"
                className="p-3 rounded-full bg-gray-800 hover:bg-orange-500 transition transform hover:scale-110 shadow-lg"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ================= BOTTOM BAR ================= */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between text-sm text-gray-400 gap-2">
          <p>&copy; {new Date().getFullYear()} ShopEase. All rights reserved.</p>
          <p>Designed with ❤️ Prakash Jha</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
