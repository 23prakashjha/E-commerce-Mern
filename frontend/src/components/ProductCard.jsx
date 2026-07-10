import { motion } from "framer-motion";
import { Star, ShoppingCart, Eye } from "lucide-react";
import { getImageUrl } from "../services/api";
import config from "../config";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const outOfStock = product.countInStock != null && product.countInStock <= 0;

  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="group bg-white rounded-2xl shadow-md hover:shadow-2xl overflow-hidden flex flex-col transition-all duration-300"
    >
      <Link to={`/products/${product._id}`} className="relative overflow-hidden block">
        <div className="aspect-[4/5] overflow-hidden bg-gray-50">
          <img
            src={getImageUrl(product)}
            alt={product.name}
            onError={(e) => { e.currentTarget.src = config.FALLBACK_IMAGE; }}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </div>

        {outOfStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="bg-red-500 text-white text-sm font-bold px-4 py-2 rounded-full">
              Out of Stock
            </span>
          </div>
        )}

        <div className="absolute top-3 left-3 flex flex-col gap-2">
          <span className="bg-orange-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
            {product.category || "General"}
          </span>
        </div>

        <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center">
          <span className="bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-semibold px-4 py-2 rounded-full flex items-center gap-1.5 shadow-lg">
            <Eye size={14} /> Quick View
          </span>
        </div>
      </Link>

      <Link to={`/products/${product._id}`} className="p-4 flex flex-col flex-1">
        <h3 className="font-semibold text-sm sm:text-base truncate group-hover:text-orange-500 transition-colors">
          {product.name}
        </h3>

        <div className="flex items-center justify-between mt-2">
          <div className="flex items-baseline gap-1.5">
            <span className="text-orange-500 font-bold text-lg">₹{product.discountPrice > 0 ? product.discountPrice : product.price}</span>
            {product.discountPrice > 0 && (
              <span className="text-gray-400 text-xs line-through">₹{product.price}</span>
            )}
          </div>
          <span className="flex items-center gap-1 text-yellow-500 text-xs font-medium">
            <Star size={12} className="fill-yellow-500" /> {product.rating || "4.5"}
          </span>
        </div>

        {product.description && (
          <p className="text-gray-400 text-xs mt-2 line-clamp-2 leading-relaxed">{product.description}</p>
        )}

        <div className="mt-auto pt-3">
          {outOfStock ? (
            <span className="block w-full text-center text-sm text-red-400 font-medium py-2 border border-red-200 rounded-xl bg-red-50">
              Unavailable
            </span>
          ) : (
            <span className="block w-full text-center text-sm text-orange-500 font-medium py-2 border border-orange-200 rounded-xl bg-orange-50/50 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">
              <ShoppingCart size={14} className="inline mr-1.5" /> View Details
            </span>
          )}
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
