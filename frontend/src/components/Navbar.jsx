import { useState, useContext, useRef, useEffect } from "react";
import {
  ShoppingCart, Home, Package, Shield, Menu,
  LogOut, X, UserPlus, User, LayoutDashboard, Store
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
    "flex items-center gap-2.5 px-3 py-2.5 rounded-lg transition-all duration-200 text-sm font-medium";

  const navLinkClass = ({ isActive }) =>
    `${baseLink} ${
      isActive
        ? "text-indigo-600 bg-indigo-100 font-semibold"
        : "text-gray-700 hover:text-indigo-600 hover:bg-indigo-50"
    }`;

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    setDropdownOpen(false);
  };

  const closeMenus = () => {
    setMenuOpen(false);
    setDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const navItems = [
    { to: "/", label: "Home", icon: Home },
    { to: "/products", label: "Products", icon: Package },
    { to: "/about", label: "About", icon: Store },
    { to: "/contact", label: "Contact", icon: User },
  ];

  return (
    <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="bg-linear-to-r from-indigo-500 to-indigo-600 p-2 rounded-full shadow-lg">
            <Home className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-extrabold text-gray-800">
            Shop<span className="text-indigo-600">Ease</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to} className={navLinkClass} end={to === "/"}>
              <Icon size={16} /> {label}
            </NavLink>
          ))}
        </div>

        {/* Desktop Right */}
        <div className="hidden md:flex items-center gap-3">
          <NavLink to="/cart"
            className="flex items-center gap-2 text-gray-700 hover:text-indigo-600 transition px-3 py-2 rounded-lg text-sm font-medium">
            <ShoppingCart size={18} /> Cart
          </NavLink>

          {!user ? (
            <NavLink to="/register"
              className="flex items-center gap-2 bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition shadow-md text-sm font-semibold">
              <UserPlus size={18} /> Sign Up
            </NavLink>
          ) : (
            <div className="relative" ref={dropdownRef}>
              <button onClick={() => setDropdownOpen((prev) => !prev)}
                className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition shadow-sm text-sm font-medium">
                <User size={18} /> {user.name}
              </button>
              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl z-50 overflow-hidden border border-gray-100"
                  >
                    <Link to="/profile"
                      className="flex items-center gap-2.5 px-4 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition text-sm font-medium"
                      onClick={() => setDropdownOpen(false)}>
                      <User size={16} /> Profile
                    </Link>
                    {user.isAdmin && (
                      <Link to="/admin"
                        className="flex items-center gap-2.5 px-4 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition text-sm font-medium"
                        onClick={() => setDropdownOpen(false)}>
                        <LayoutDashboard size={16} /> Dashboard
                      </Link>
                    )}
                    <button onClick={handleLogout}
                      className="w-full flex items-center gap-2.5 px-4 py-3 text-red-500 hover:bg-red-50 hover:text-red-600 transition text-sm font-medium border-t border-gray-50">
                      <LogOut size={16} /> Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden p-2.5 rounded-lg hover:bg-gray-100 transition z-50"
          onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="md:hidden fixed top-0 right-0 h-full w-72 bg-white shadow-2xl z-40 flex flex-col"
            >
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                <span className="font-bold text-gray-800">Menu</span>
                <button onClick={() => setMenuOpen(false)} className="p-1.5 rounded-lg hover:bg-gray-100 transition">
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
                {navItems.map(({ to, label, icon: Icon }) => (
                  <NavLink
                    key={to}
                    to={to}
                    end={to === "/"}
                    onClick={closeMenus}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-xl transition text-sm font-medium ${
                        isActive
                          ? "bg-indigo-100 text-indigo-600 font-semibold"
                          : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                      }`
                    }
                  >
                    <Icon size={18} /> {label}
                  </NavLink>
                ))}

                <hr className="border-gray-100 my-3" />

                <NavLink to="/cart" onClick={closeMenus}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-xl transition text-sm font-medium ${
                      isActive
                        ? "bg-indigo-100 text-indigo-600 font-semibold"
                        : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                    }`
                  }>
                  <ShoppingCart size={18} /> Cart
                </NavLink>

                {!user ? (
                  <>
                    <NavLink to="/register" onClick={closeMenus}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl bg-indigo-500 text-white font-semibold text-sm mt-2">
                      <UserPlus size={18} /> Sign Up / Login
                    </NavLink>
                  </>
                ) : (
                  <>
                    <NavLink to="/profile" onClick={closeMenus}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl transition text-sm font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-600">
                      <User size={18} /> Profile
                    </NavLink>
                    {user.isAdmin && (
                      <NavLink to="/admin" onClick={closeMenus}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl transition text-sm font-medium text-indigo-600 hover:bg-indigo-50">
                        <LayoutDashboard size={18} /> Dashboard
                      </NavLink>
                    )}
                    <button onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition text-sm font-medium mt-2">
                      <LogOut size={18} /> Logout
                    </button>
                  </>
                )}
              </div>

              <div className="px-5 py-4 border-t border-gray-100 text-xs text-gray-400 text-center">
                ShopEase &copy; {new Date().getFullYear()}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden fixed inset-0 bg-black z-30"
              onClick={() => setMenuOpen(false)}
            />
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
