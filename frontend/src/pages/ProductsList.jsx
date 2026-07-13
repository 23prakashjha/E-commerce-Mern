import { useEffect, useMemo, useState } from "react";
import { api, getImageUrl } from "../services/api";
import config from "../config";
import { Link } from "react-router-dom";
import { Search, ChevronLeft, ChevronRight, SlidersHorizontal, ImageOff, Star, Box, ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";

const PER_PAGE = 20;

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/products");
        setProducts(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProducts();
  }, []);

  const allCategories = useMemo(() => {
    const fromProducts = [...new Set(products.map((p) => p.category).filter(Boolean))];
    return ["All", ...fromProducts];
  }, [products]);

  const filteredProducts = useMemo(() => {
    let data = [...products];
    if (search) data = data.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));
    if (category !== "All") data = data.filter((p) => p.category === category);
    if (sort === "low") data.sort((a, b) => a.price - b.price);
    if (sort === "high") data.sort((a, b) => b.price - a.price);
    return data;
  }, [products, search, category, sort]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const paginatedProducts = useMemo(
    () => filteredProducts.slice((safePage - 1) * PER_PAGE, safePage * PER_PAGE),
    [filteredProducts, safePage]
  );

  const handlePageChange = (p) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearch = (val) => {
    setSearch(val);
    setPage(1);
  };

  const handleCategory = (val) => {
    setCategory(val);
    setPage(1);
  };

  const handleSort = (val) => {
    setSort(val);
    setPage(1);
  };

  const startItem = (safePage - 1) * PER_PAGE + 1;
  const endItem = Math.min(safePage * PER_PAGE, filteredProducts.length);

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      let start = Math.max(2, safePage - 1);
      let end = Math.min(totalPages - 1, safePage + 1);
      if (safePage <= 2) end = Math.min(4, totalPages - 1);
      if (safePage >= totalPages - 1) start = Math.max(2, totalPages - 3);
      if (start > 2) pages.push("...");
      for (let i = start; i <= end; i++) pages.push(i);
      if (end < totalPages - 1) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold dark:text-gray-100">Explore Products</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">{filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""} found</p>
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="sm:hidden flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-xl text-sm font-semibold"
        >
          <SlidersHorizontal size={16} /> Filters
        </button>
      </div>

      <div className={`${showFilters ? "block" : "hidden"} sm:block`}>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400 dark:text-gray-500" size={18} />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-orange-400 outline-none dark:bg-gray-900 dark:text-gray-100 dark:border-gray-600"
            />
            {search && (
              <button onClick={() => handleSearch("")} className="absolute right-3 top-3 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 text-sm">Clear</button>
            )}
          </div>
          <select value={category} onChange={(e) => handleCategory(e.target.value)} className="border rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-orange-400 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-600">
            {allCategories.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <select value={sort} onChange={(e) => handleSort(e.target.value)} className="border rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-orange-400 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-600">
            <option value="">Sort by</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
          </select>
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-24">
          <Search className="mx-auto w-16 h-16 text-gray-300 dark:text-gray-600 mb-4" />
          <p className="text-gray-500 dark:text-gray-400 text-xl font-medium">No products found</p>
          <p className="text-gray-400 dark:text-gray-500 mt-1">Try adjusting your search or filters</p>
          <button onClick={() => { setSearch(""); setCategory("All"); setSort(""); setPage(1); }} className="mt-6 bg-orange-500 text-white px-6 py-2 rounded-xl font-semibold hover:bg-orange-600 transition">
            Reset Filters
          </button>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between mb-4 text-sm text-gray-500 dark:text-gray-400">
            <span>Showing {startItem}–{endItem} of {filteredProducts.length}</span>
            <span className="hidden sm:block">Page {safePage} of {totalPages}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {paginatedProducts.map((p) => {
              const outOfStock = p.countInStock != null && p.countInStock <= 0;
              return (
                <Link to={`/products/${p._id}`} key={p._id} className="bg-white dark:bg-gray-900 rounded-2xl shadow hover:shadow-xl transition overflow-hidden group relative flex flex-col">
                  <div className="relative h-60 w-full overflow-hidden bg-gray-100 dark:bg-gray-700">
                    {p.images && p.images.length > 0 ? (
                      <img
                        src={getImageUrl({ images: p.images, image: p.images[0] })}
                        alt={p.name}
                        onError={(e) => { e.currentTarget.src = config.FALLBACK_IMAGE; }}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <div className="text-center">
                          <ImageOff size={32} className="mx-auto text-gray-300 dark:text-gray-600 mb-2" />
                          <p className="text-xs text-gray-400 dark:text-gray-500">No image</p>
                        </div>
                      </div>
                    )}
                    <span className="absolute top-3 left-3 bg-orange-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">{p.category || "General"}</span>
                    {outOfStock && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <span className="bg-red-500 text-white text-sm font-bold px-4 py-2 rounded-full">Out of Stock</span>
                      </div>
                    )}
                    {p.discountPrice > 0 && (
                      <span className="absolute top-3 right-3 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow">
                        {Math.round((1 - p.discountPrice / p.price) * 100)}% OFF
                      </span>
                    )}
                  </div>
                  <div className="p-4 flex flex-col flex-1">
                    <h2 className="font-semibold text-base truncate group-hover:text-orange-500 transition-colors dark:text-gray-100">{p.name}</h2>
                    {p.description && <p className="text-sm text-gray-400 dark:text-gray-500 line-clamp-2 mt-1">{p.description}</p>}

                    <div className="flex items-baseline gap-2 mt-2">
                      <p className="text-orange-500 font-bold text-lg">₹{p.discountPrice > 0 ? p.discountPrice : p.price}</p>
                      {p.discountPrice > 0 && (
                        <span className="text-gray-400 dark:text-gray-500 text-sm line-through">₹{p.price}</span>
                      )}
                    </div>

                    <div className="flex items-center gap-3 mt-2 text-xs text-gray-500 dark:text-gray-400">
                      <span className="flex items-center gap-1 text-yellow-500 font-medium">
                        <Star size={12} className="fill-yellow-500" /> {p.rating || "0"}
                      </span>
                      <span className="flex items-center gap-1">
                        <Box size={12} /> Stock: {p.countInStock ?? 0}
                      </span>
                    </div>

                    <div className="mt-auto pt-3">
                      {outOfStock ? (
                        <span className="block w-full text-center text-sm text-red-400 font-medium py-2 border border-red-200 dark:border-red-800 rounded-xl bg-red-50 dark:bg-red-900/20">
                          Unavailable
                        </span>
                      ) : (
                        <span className="block w-full text-center text-sm text-orange-500 font-medium py-2 border border-orange-200 dark:border-orange-800 rounded-xl bg-orange-50/50 dark:bg-orange-900/20 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">
                          <ShoppingCart size={14} className="inline mr-1.5" /> View Details
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-12">
              <button
                onClick={() => handlePageChange(safePage - 1)}
                disabled={safePage === 1}
                className="p-2.5 rounded-xl border dark:border-gray-700 hover:bg-orange-50 dark:hover:bg-orange-900/20 disabled:opacity-30 disabled:cursor-not-allowed transition"
              >
                <ChevronLeft size={18} />
              </button>
              {getPageNumbers().map((p, i) =>
                p === "..." ? (
                  <span key={`dot-${i}`} className="px-2 text-gray-400 dark:text-gray-500">...</span>
                ) : (
                  <motion.button
                    key={p}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handlePageChange(p)}
                    className={`min-w-[42px] h-[42px] rounded-xl font-semibold text-sm transition ${
                      p === safePage
                        ? "bg-orange-500 text-white shadow-lg"
                        : "border dark:border-gray-700 hover:bg-orange-50 dark:hover:bg-orange-900/20 text-gray-700 dark:text-gray-200"
                    }`}
                  >
                    {p}
                  </motion.button>
                )
              )}
              <button
                onClick={() => handlePageChange(safePage + 1)}
                disabled={safePage === totalPages}
                className="p-2.5 rounded-xl border dark:border-gray-700 hover:bg-orange-50 dark:hover:bg-orange-900/20 disabled:opacity-30 disabled:cursor-not-allowed transition"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProductsList;
