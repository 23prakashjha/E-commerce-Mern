import { useState } from "react";
import { motion } from "framer-motion";
import { Star, ShoppingCart, Eye, Heart } from "lucide-react";
import { getImageUrl } from "../services/api";
import config from "../config";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const [liked, setLiked] = useState(false);
  const outOfStock = product.countInStock != null && product.countInStock <= 0;
  const discount = product.discountPrice > 0
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
    : 0;

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group bg-white dark:bg-gray-900 rounded-2xl shadow-md hover:shadow-2xl overflow-hidden flex flex-col transition-shadow duration-300"
    >
      <Link to={`/products/${product._id}`} className="relative overflow-hidden block">
        <div className="aspect-[4/5] overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700">
          <img
            src={getImageUrl(product)}
            alt={product.name}
            onError={(e) => { e.currentTarget.src = config.FALLBACK_IMAGE; }}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </div>

        {outOfStock && (
          <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] flex items-center justify-center z-10">
            <span className="bg-red-500 text-white text-sm font-bold px-5 py-2 rounded-full shadow-lg">
              Out of Stock
            </span>
          </div>
        )}

        <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
          <span className="bg-indigo-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
            {product.category || "General"}
          </span>
          {discount > 0 && (
            <span className="bg-gradient-to-r from-rose-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
              -{discount}%
            </span>
          )}
        </div>

        <button
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); setLiked(!liked); }}
          className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-md hover:bg-white dark:hover:bg-gray-700 transition-all duration-200"
        >
          <Heart
            size={16}
            className={`transition-all duration-300 ${liked ? "text-rose-500 fill-rose-500 scale-110" : "text-gray-400 dark:text-gray-500 hover:text-rose-400"}`}
          />
        </button>

        <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex justify-center translate-y-2 group-hover:translate-y-0 z-10">
          <span className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm text-gray-800 dark:text-gray-100 text-xs font-semibold px-5 py-2.5 rounded-full flex items-center gap-1.5 shadow-lg">
            <Eye size={14} /> Quick View
          </span>
        </div>
      </Link>

      <Link to={`/products/${product._id}`} className="p-4 flex flex-col flex-1">
        <h3 className="font-semibold text-sm sm:text-base truncate text-gray-800 dark:text-gray-100 group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors">
          {product.name}
        </h3>

        <div className="flex items-center justify-between mt-2">
          <div className="flex items-baseline gap-1.5">
            <span className="text-indigo-600 dark:text-indigo-400 font-bold text-lg">
              ₹{product.discountPrice > 0 ? product.discountPrice : product.price}
            </span>
            {product.discountPrice > 0 && (
              <span className="text-gray-400 dark:text-gray-500 text-xs line-through">₹{product.price}</span>
            )}
          </div>
          <span className="flex items-center gap-1 text-yellow-500 text-xs font-medium">
            <Star size={12} className="fill-yellow-500" /> {product.rating || "4.5"}
          </span>
        </div>

        {product.description && (
          <p className="text-gray-400 dark:text-gray-500 text-xs mt-2 line-clamp-2 leading-relaxed">{product.description}</p>
        )}

        <div className="mt-auto pt-3">
          {outOfStock ? (
            <span className="block w-full text-center text-sm text-red-400 font-medium py-2.5 border border-red-200 dark:border-red-800 rounded-xl bg-red-50 dark:bg-red-500/10">
              Unavailable
            </span>
          ) : (
            <span className="block w-full text-center text-sm text-indigo-600 dark:text-indigo-400 font-semibold py-2.5 border border-indigo-200 dark:border-indigo-800 rounded-xl bg-indigo-50/50 dark:bg-indigo-500/10 group-hover:bg-indigo-500 group-hover:text-white group-hover:border-indigo-500 transition-all duration-300">
              <ShoppingCart size={14} className="inline mr-1.5" /> View Details
            </span>
          )}
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
