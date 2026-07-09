import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { api, getImageUrl } from "../services/api";
import config from "../config";
import { Package, ArrowLeft, Star, ShoppingBag, ImageOff } from "lucide-react";
import { motion } from "framer-motion";

const Skeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {Array.from({ length: 8 }).map((_, i) => (
      <div key={i} className="rounded-2xl bg-white shadow-sm overflow-hidden animate-pulse">
        <div className="aspect-[4/5] bg-gray-200" />
        <div className="p-4 space-y-3">
          <div className="h-4 bg-gray-200 rounded w-3/4" />
          <div className="h-4 bg-gray-200 rounded w-1/2" />
        </div>
      </div>
    ))}
  </div>
);

const CategoryProducts = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await api.get("/products");
        const filtered = res.data.filter(
          (p) => p.category && p.category.toLowerCase() === category.toLowerCase()
        );
        setProducts(filtered);
      } catch (err) {
        console.error("Product fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [category]);

  const displayCategory = category
    ? category.charAt(0).toUpperCase() + category.slice(1)
    : "";

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <Link to="/products" className="p-2 rounded-full hover:bg-gray-100 transition">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-orange-100">
              <Package className="w-6 h-6 text-orange-500" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold capitalize">
              {displayCategory} Collection
            </h1>
          </div>
          {!loading && (
            <p className="text-gray-500 text-sm mt-1 ml-12">
              {products.length} {products.length === 1 ? "product" : "products"} found
            </p>
          )}
        </div>
      </div>

      {loading && <Skeleton />}

      {!loading && products.length === 0 && (
        <div className="text-center py-24 bg-white rounded-3xl shadow-sm border border-gray-50">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-orange-100 flex items-center justify-center">
            <Package size={40} className="text-orange-500" />
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">No products found</h2>
          <p className="text-gray-500 mb-6 max-w-sm mx-auto">
            We couldn't find any products in the &quot;{displayCategory}&quot; category. Check back later or browse all products.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-2.5 rounded-xl font-semibold shadow-lg transition"
          >
            <ShoppingBag size={18} /> Browse All Products
          </Link>
        </div>
      )}

      {!loading && products.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((p, i) => (
            <motion.div
              key={p._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Link
                to={`/products/${p._id}`}
                className="block bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden group hover:-translate-y-1"
              >
                <div className="aspect-[4/5] overflow-hidden bg-gray-50">
                  <img
                    src={getImageUrl(p)}
                    alt={p.name}
                    onError={(e) => { e.currentTarget.src = config.FALLBACK_IMAGE; }}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-sm sm:text-base truncate group-hover:text-orange-500 transition-colors">
                    {p.name}
                  </h3>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-orange-500 font-bold text-lg">₹{p.price}</span>
                    <span className="flex items-center gap-1 text-yellow-500 text-xs font-medium">
                      <Star size={12} className="fill-yellow-500" /> {p.rating || 4.5}
                    </span>
                  </div>
                  {p.description && (
                    <p className="text-gray-400 text-xs mt-2 line-clamp-2">{p.description}</p>
                  )}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryProducts;
