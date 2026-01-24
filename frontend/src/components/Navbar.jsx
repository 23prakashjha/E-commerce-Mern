import { useState, useContext, useRef, useEffect } from "react";
import {
  ShoppingCart,
  Home,
  Package,
  Shield,
  Menu,
  LogOut,
  X,
  UserPlus,
  User,
} from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { AnimatePresence, motion } from "framer-motion";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const baseLink =
    "flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200";

  const navLinkClass = ({ isActive }) =>
    `${baseLink} ${
      isActive
        ? "text-orange-600 bg-orange-100 font-semibold"
        : "text-gray-700 hover:text-orange-600 hover:bg-orange-50"
    }`;

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    setDropdownOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-md transition-all">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-linear-to-r from-orange-500 to-orange-600 p-2 rounded-full shadow-lg">
            <Home className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-extrabold text-gray-800">
            Shop<span className="text-orange-600">Ease</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-2">
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to="/products" className={navLinkClass}>
            Products
          </NavLink>
          <NavLink to="/about" className={navLinkClass}>
            About
          </NavLink>
          <NavLink to="/contact" className={navLinkClass}>
            Contact
          </NavLink>
          <NavLink to="/admin" className={navLinkClass}>
            Admin
          </NavLink>
        </div>

        {/* Desktop Right */}
        <div className="hidden md:flex items-center gap-4">
          <NavLink
                to="/cart"
                className="flex items-center gap-2 text-gray-700 hover:text-orange-600 transition px-3 py-2 rounded-lg"
              >
                <ShoppingCart size={18} /> Cart
              </NavLink>

          {!user ? (
            <>
              <NavLink
                to="/register"
                className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition shadow-md"
              >
                <UserPlus size={18} /> Sign Up
              </NavLink>
            </>
          ) : (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen((prev) => !prev)}
                className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition shadow-sm font-medium"
              >
                <User size={18} /> {user.name}
              </button>

              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg z-50 overflow-hidden"
                  >
                    <Link
                      to="/profile"
                      className="block px-4 py-3 text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition font-medium"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-3 text-red-500 hover:bg-red-50 hover:text-red-600 transition font-medium"
                    >
                     Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Mobile Button */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition z-50"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -100, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden fixed top-16 left-0 w-full bg-white shadow-lg z-50"
            >
              <div className="flex flex-col px-4 py-6 gap-2">
                <NavLink
                  to="/"
                  className={navLinkClass}
                  onClick={() => setMenuOpen(false)}
                >
                  Home
                </NavLink>
                <NavLink
                  to="/products"
                  className={navLinkClass}
                  onClick={() => setMenuOpen(false)}
                >
                  Products
                </NavLink>
                <NavLink
                  to="/about"
                  className={navLinkClass}
                  onClick={() => setMenuOpen(false)}
                >
                  About
                </NavLink>
                <NavLink
                  to="/contact"
                  className={navLinkClass}
                  onClick={() => setMenuOpen(false)}
                >
                  Contact
                </NavLink>
                <NavLink
                  to="/admin"
                  className={navLinkClass}
                  onClick={() => setMenuOpen(false)}
                >
                  Admin
                </NavLink>

                <hr className="border-gray-200 my-2" />

                <NavLink
                      to="/cart"
                      className={navLinkClass}
                      onClick={() => setMenuOpen(false)}
                    >
                      <ShoppingCart size={18} /> Cart
                    </NavLink>

                {!user ? (
                  <>

                    <NavLink
                      to="/register"
                      className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition"
                      onClick={() => setMenuOpen(false)}
                    >
                      <UserPlus size={18} /> Sign Up
                    </NavLink>
                  </>
                ) : (
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition mt-2"
                  >
                    <LogOut size={18} /> Logout
                  </button>
                )}
              </div>
            </motion.div>

            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-40"
              onClick={() => setMenuOpen(false)}
            />
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
