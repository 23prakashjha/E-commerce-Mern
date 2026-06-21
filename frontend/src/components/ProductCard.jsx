import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { getImageUrl } from "../services/api";

const ProductCard = ({ product }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="bg-white rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden flex flex-col transition"
    >
      <div className="relative overflow-hidden">
        <img
          src={getImageUrl(product)}
          alt={product.name}
          onError={(e) => { e.currentTarget.src = "/images/placeholder.jpg"; }}
          className="h-64 w-full object-cover transition-transform duration-700 hover:scale-110"
        />
        {product.stock === 0 && (
          <span className="absolute top-3 left-3 bg-red-500 text-white text-xs px-3 py-1 rounded-full">
            Out of Stock
          </span>
        )}
      </div>
      <div className="p-4 flex flex-col flex-1 justify-between">
        <h2 className="font-semibold text-lg truncate">{product.name}</h2>
        <div className="flex items-center justify-between mt-2">
          <span className="text-orange-500 font-bold text-lg">₹{product.price}</span>
          <span className="flex items-center gap-1 text-yellow-500 text-sm">
            <Star size={14} /> {product.rating || 4.5}
          </span>
        </div>
        {product.category && (
          <p className="text-gray-500 text-sm mt-1 capitalize">{product.category}</p>
        )}
        {product.description && (
          <p className="text-gray-500 mt-2 text-sm line-clamp-3">{product.description}</p>
        )}
      </div>
    </motion.div>
  );
};

export default ProductCard;
