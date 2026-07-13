import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home } from "lucide-react";

const NotFound = () => (
  <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-orange-50 via-white to-orange-100 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 px-4">
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center max-w-lg"
    >
      <h1 className="text-9xl font-extrabold text-orange-500 mb-4">404</h1>
      <p className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-2">Page Not Found</p>
      <p className="text-gray-500 dark:text-gray-400 mb-8">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-xl font-semibold transition shadow-lg"
      >
        <Home size={20} /> Back to Home
      </Link>
    </motion.div>
  </div>
);

export default NotFound;
