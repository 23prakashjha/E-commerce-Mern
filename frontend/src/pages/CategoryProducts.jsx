import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { api, getImageUrl } from "../services/api";
import { Package, ArrowLeft, Star } from "lucide-react";
import { motion } from "framer-motion";

const CategoryProducts = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
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

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-8">
        <Link to="/" className="p-2 rounded-full hover:bg-gray-100 transition"><ArrowLeft /></Link>
        <h1 className="text-3xl font-extrabold flex items-center gap-2 capitalize">
          <Package className="text-orange-500" /> {category} Collection
        </h1>
      </div>

      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-80 rounded-xl bg-gray-200 animate-pulse" />
          ))}
        </div>
      )}

      {!loading && products.length === 0 && (
        <div className="text-center py-24">
          <Package size={60} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500 text-lg">No products found in this category</p>
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
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition overflow-hidden flex flex-col"
            >
              <Link to={`/products/${p._id}`} className="group">
                <div className="relative overflow-hidden">
                  <img
                    src={getImageUrl(p)}
                    alt={p.name}
                    onError={(e) => { e.currentTarget.src = "/images/placeholder.jpg"; }}
                    className="h-75 w-75 object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {p.stock === 0 && (
                    <span className="absolute top-3 left-3 bg-red-500 text-white text-xs px-3 py-1 rounded-full">Out of Stock</span>
                  )}
                </div>
                <div className="p-4 flex flex-col flex-1 justify-between">
                  <h2 className="font-semibold text-lg truncate">{p.name}</h2>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-orange-500 font-bold text-lg">₹{p.price}</span>
                    <span className="flex items-center gap-1 text-yellow-500 text-sm"><Star size={14} /> {p.rating || 4.5}</span>
                  </div>
                  {p.description && <p className="text-gray-500 mt-2 text-sm line-clamp-3">{p.description}</p>}
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
