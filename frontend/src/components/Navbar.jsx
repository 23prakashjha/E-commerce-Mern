import { useState, useContext, useRef, useEffect } from "react";
import {
  ShoppingCart, Home, Package, Shield, Menu,
  LogOut, X, UserPlus, User, LayoutDashboard, Store, Sun, Moon
} from "lucide-react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";
import { AnimatePresence, motion } from "framer-motion";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();

  const baseLink =
    "flex items-center gap-2.5 px-3 py-2.5 rounded-lg transition-all duration-200 text-sm font-medium";

  const navLinkClass = ({ isActive }) =>
    `${baseLink} ${
      isActive
        ? "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/15 font-semibold"
        : "text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50/50 dark:hover:bg-indigo-500/10"
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
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.removeProperty("overflow");
    }
    return () => { document.body.style.removeProperty("overflow"); };
  }, [menuOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    if (menuOpen) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [menuOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setDropdownOpen(false);
  }, [location.pathname]);

  const navItems = [
    { to: "/", label: "Home", icon: Home },
    { to: "/products", label: "Products", icon: Package },
    { to: "/about", label: "About", icon: Store },
    { to: "/contact", label: "Contact", icon: User },
  ];

  const ThemeToggle = ({ className = "" }) => (
    <button
      onClick={toggleDarkMode}
      className={`relative p-2.5 rounded-xl transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-800 ${className}`}
      aria-label="Toggle dark mode"
    >
      <div className="relative w-5 h-5">
        <motion.div
          initial={false}
          animate={{ rotate: darkMode ? 0 : 180, scale: darkMode ? 1 : 0, opacity: darkMode ? 1 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Moon size={20} className="text-indigo-400" />
        </motion.div>
        <motion.div
          initial={false}
          animate={{ rotate: darkMode ? -180 : 0, scale: darkMode ? 0 : 1, opacity: darkMode ? 0 : 1 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Sun size={20} className="text-amber-500" />
        </motion.div>
      </div>
    </button>
  );

  return (
    <>
      <nav
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl shadow-lg shadow-indigo-500/5 border-b border-indigo-100/50 dark:border-indigo-500/10"
            : "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 p-2 rounded-xl shadow-lg shadow-indigo-500/25 group-hover:shadow-indigo-500/40 transition-shadow duration-300">
              <Home className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-extrabold text-gray-800 dark:text-gray-100">
              Shop<span className="text-indigo-600 dark:text-indigo-400">Ease</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map(({ to, label, icon: Icon }) => (
              <NavLink key={to} to={to} className={navLinkClass} end={to === "/"}>
                <Icon size={16} /> {label}
              </NavLink>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-2">
            <ThemeToggle />

            <NavLink to="/cart"
              className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition px-3 py-2 rounded-lg text-sm font-medium hover:bg-indigo-50/50 dark:hover:bg-indigo-500/10">
              <ShoppingCart size={18} /> Cart
            </NavLink>

            {!user ? (
              <NavLink to="/register"
                className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white px-5 py-2.5 rounded-xl hover:from-indigo-600 hover:to-indigo-700 transition-all shadow-md shadow-indigo-500/25 hover:shadow-lg hover:shadow-indigo-500/30 text-sm font-semibold">
                <UserPlus size={18} /> Sign Up
              </NavLink>
            ) : (
              <div className="relative" ref={dropdownRef}>
                <button onClick={() => setDropdownOpen((prev) => !prev)}
                  className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 hover:bg-indigo-50 dark:hover:bg-indigo-500/15 px-4 py-2.5 rounded-xl transition-all duration-200 shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-400 to-indigo-600 flex items-center justify-center text-white text-xs font-bold">
                    {user.name?.[0]?.toUpperCase()}
                  </div>
                  {user.name}
                </button>
                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.96 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-52 bg-white dark:bg-gray-800/95 backdrop-blur-xl rounded-2xl shadow-2xl shadow-indigo-500/10 z-50 overflow-hidden border border-gray-100 dark:border-gray-700"
                    >
                      <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                        <p className="text-sm font-semibold text-gray-800 dark:text-gray-100 truncate">{user.name}</p>
                        <p className="text-xs text-gray-400 dark:text-gray-500 truncate">{user.email}</p>
                      </div>
                      <Link to="/profile"
                        className="flex items-center gap-2.5 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 hover:text-indigo-600 dark:hover:text-indigo-400 transition text-sm font-medium"
                        onClick={() => setDropdownOpen(false)}>
                        <User size={16} /> Profile
                      </Link>
                      {user.isAdmin && (
                        <Link to="/admin"
                          className="flex items-center gap-2.5 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 hover:text-indigo-600 dark:hover:text-indigo-400 transition text-sm font-medium"
                          onClick={() => setDropdownOpen(false)}>
                          <LayoutDashboard size={16} /> Dashboard
                        </Link>
                      )}
                      <button onClick={handleLogout}
                        className="w-full flex items-center gap-2.5 px-4 py-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 hover:text-red-600 transition text-sm font-medium border-t border-gray-50 dark:border-gray-700">
                        <LogOut size={16} /> Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>

          <div className="flex md:hidden items-center gap-1">
            <ThemeToggle />
            <button className="p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
              {menuOpen ? <X className="w-5 h-5 text-gray-800 dark:text-gray-200" /> : <Menu className="w-5 h-5 text-gray-800 dark:text-gray-200" />}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed inset-0 bg-black/40 z-40"
            onClick={() => setMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="md:hidden fixed top-0 right-0 h-full w-72 bg-white dark:bg-gray-900 shadow-2xl z-50 flex flex-col"
          >
            <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 px-5 py-5 flex items-center justify-between">
              <span className="font-bold text-white text-lg">Menu</span>
              <button onClick={() => setMenuOpen(false)} className="p-1.5 rounded-lg bg-white/20 hover:bg-white/30 transition">
                <X size={20} className="text-white" />
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
                        ? "bg-indigo-50 dark:bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 font-semibold"
                        : "text-gray-700 dark:text-gray-300 hover:bg-indigo-50/50 dark:hover:bg-indigo-500/10 hover:text-indigo-600 dark:hover:text-indigo-400"
                    }`
                  }
                >
                  <Icon size={18} /> {label}
                </NavLink>
              ))}

              <hr className="border-gray-100 dark:border-gray-700 my-3" />

              <NavLink to="/cart" onClick={closeMenus}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl transition text-sm font-medium ${
                    isActive
                      ? "bg-indigo-50 dark:bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 font-semibold"
                      : "text-gray-700 dark:text-gray-300 hover:bg-indigo-50/50 dark:hover:bg-indigo-500/10 hover:text-indigo-600 dark:hover:text-indigo-400"
                  }`
                }>
                <ShoppingCart size={18} /> Cart
              </NavLink>

              {!user ? (
                <NavLink to="/register" onClick={closeMenus}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 text-white font-semibold text-sm mt-3 shadow-md shadow-indigo-500/25">
                  <UserPlus size={18} /> Sign Up / Login
                </NavLink>
              ) : (
                <>
                  <NavLink to="/profile" onClick={closeMenus}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl transition text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 hover:text-indigo-600 dark:hover:text-indigo-400">
                    <User size={18} /> Profile
                  </NavLink>
                  {user.isAdmin && (
                    <NavLink to="/admin" onClick={closeMenus}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl transition text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-500/10">
                      <LayoutDashboard size={18} /> Dashboard
                    </NavLink>
                  )}
                  <button onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition text-sm font-medium mt-2">
                    <LogOut size={18} /> Logout
                  </button>
                </>
              )}
            </div>

            <div className="px-5 py-4 border-t border-gray-100 dark:border-gray-700 text-xs text-gray-400 dark:text-gray-500 text-center">
              ShopEase &copy; {new Date().getFullYear()}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
