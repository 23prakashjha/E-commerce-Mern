import { useState } from "react";
import { Facebook, Twitter, Instagram, Linkedin, Home, Mail, ArrowUp, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return toast.error("Please enter your email");
    toast.success("Subscribed successfully!");
    setEmail("");
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="bg-gray-900 text-gray-300 mt-16 relative">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8">

        {/* ================= BRAND (spans 4 cols) ================= */}
        <div className="sm:col-span-2 lg:col-span-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-linear-to-r from-orange-500 to-orange-600 p-3 rounded-full shadow-lg">
              <Home className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-bold text-white">
              Shop<span className="text-orange-500">Ease</span>
            </h2>
          </div>

          <p className="text-sm leading-relaxed text-gray-400 mb-4 max-w-xs">
            ShopEase is your ultimate destination for premium products, secure payments, and fast delivery.
          </p>

          <div className="flex gap-3">
            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, idx) => (
              <a
                key={idx}
                href="#"
                aria-label="Social media"
                className="p-2.5 rounded-full bg-gray-800 hover:bg-orange-500 transition transform hover:scale-110 shadow-lg"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* ================= QUICK LINKS (spans 2 cols) ================= */}
        <div className="lg:col-span-2">
          <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Quick Links</h3>
          <ul className="space-y-3 text-sm">
            {[
              { to: "/", label: "Home" },
              { to: "/products", label: "Products" },
              { to: "/about", label: "About Us" },
              { to: "/contact", label: "Contact" },
            ].map(({ to, label }) => (
              <li key={to}>
                <Link to={to} className="hover:text-orange-500 transition flex items-center gap-1.5 group">
                  <ChevronRight size={12} className="text-gray-600 group-hover:text-orange-500 transition" />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* ================= SUPPORT (spans 2 cols) ================= */}
        <div className="lg:col-span-2">
          <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Support</h3>
          <ul className="space-y-3 text-sm">
            {["FAQs", "Privacy Policy", "Terms & Conditions", "Help Center"].map((item) => (
              <li key={item}>
                <span className="hover:text-orange-500 transition cursor-pointer flex items-center gap-1.5 group">
                  <ChevronRight size={12} className="text-gray-600 group-hover:text-orange-500 transition" />
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* ================= NEWSLETTER (spans 4 cols) ================= */}
        <div className="sm:col-span-2 lg:col-span-4">
          <h3 className="text-white font-semibold mb-2 text-sm uppercase tracking-wider">Newsletter</h3>
          <p className="text-sm text-gray-400 mb-4">Get updates on new arrivals and exclusive deals.</p>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="px-4 py-2.5 rounded-lg flex-1 focus:outline-none focus:ring-2 focus:ring-orange-400 border border-gray-700 bg-gray-800 placeholder-gray-500 text-sm"
            />
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-5 py-2.5 rounded-lg shadow-lg transition flex items-center justify-center gap-2 text-sm shrink-0"
            >
              <Mail size={16} /> Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* ================= BOTTOM BAR ================= */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between text-sm text-gray-400 gap-2">
          <p>&copy; {new Date().getFullYear()} ShopEase. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made by <span className="text-orange-500 font-medium">Prakash Jha</span>
          </p>
        </div>
      </div>

      {/* ================= BACK TO TOP ================= */}
      <button
        onClick={scrollToTop}
        className="absolute -top-5 right-6 bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition hover:-translate-y-1"
        aria-label="Back to top"
      >
        <ArrowUp size={20} />
      </button>
    </footer>
  );
};

export default Footer;
