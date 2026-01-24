import { useEffect, useMemo, useState } from "react";
import { api } from "../services/api";
import { Link } from "react-router-dom";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";

const API_URL = "http://localhost:5000"; // Add your backend URL

const categories = ["All", "Men", "Women", "Children"];
const subCategories = [
  "All",
  "Topwear",
  "Bottomwear",
  "Innerwear",
  "Footwear",
  "Accessories",
];

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [subCategory, setSubCategory] = useState("All");
  const [sort, setSort] = useState("");
  const [currentImage, setCurrentImage] = useState({}); // Track carousel index

  /* ================= FETCH PRODUCTS ================= */
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/products");
        setProducts(res.data);
        // Initialize carousel index for each product
        const initialIndex = {};
        res.data.forEach((p) => (initialIndex[p._id] = 0));
        setCurrentImage(initialIndex);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProducts();
  }, []);

  /* ================= FILTER + SORT ================= */
  const filteredProducts = useMemo(() => {
    let data = [...products];
    if (search) data = data.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));
    if (category !== "All") data = data.filter((p) => p.category === category);
    if (subCategory !== "All") data = data.filter((p) => p.subCategory === subCategory);
    if (sort === "low") data.sort((a, b) => a.price - b.price);
    if (sort === "high") data.sort((a, b) => b.price - a.price);
    return data;
  }, [products, search, category, subCategory, sort]);

  const handlePrevImage = (id) => {
    setCurrentImage((prev) => ({
      ...prev,
      [id]: prev[id] === 0 ? products.find((p) => p._id === id).images.length - 1 : prev[id] - 1,
    }));
  };

  const handleNextImage = (id) => {
    setCurrentImage((prev) => ({
      ...prev,
      [id]: (prev[id] + 1) % products.find((p) => p._id === id).images.length,
    }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-extrabold mb-8 text-center">Explore Products</h1>

      {/* ================= FILTER BAR ================= */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">
        <div className="relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-400"
          />
        </div>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border rounded-lg px-4 py-2"
        >
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <select
          value={subCategory}
          onChange={(e) => setSubCategory(e.target.value)}
          className="border rounded-lg px-4 py-2"
        >
          {subCategories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border rounded-lg px-4 py-2"
        >
          <option value="">Sort by</option>
          <option value="low">Price: Low to High</option>
          <option value="high">Price: High to Low</option>
        </select>
      </div>

      {/* ================= PRODUCT GRID ================= */}
      {filteredProducts.length === 0 ? (
        <p className="text-center text-gray-500">No products found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((p) => (
            <Link
              to={`/products/${p._id}`}
              key={p._id}
              className="bg-white rounded-4xl shadow hover:shadow-xl  transition overflow-hidden group relative"
            >
              {/* Image carousel */}
              <div className="relative h-60 w-2xl overflow-hidden">
                {p.images && p.images.length > 0 && (
                  <>
                    <img
                      src={`${API_URL}/${p.images[currentImage[p._id]]}`}
                      alt={p.name}
                      className="h-75 w-75 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    {p.images.length > 1 && (
                      <>
                        <button
                          onClick={(e) => { e.preventDefault(); handlePrevImage(p._id); }}
                          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 text-white p-1 rounded-full hover:bg-black/50"
                        >
                          <ChevronLeft size={18} />
                        </button>
                        <button
                          onClick={(e) => { e.preventDefault(); handleNextImage(p._id); }}
                          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 text-white p-1 rounded-full hover:bg-black/50"
                        >
                          <ChevronRight size={18} />
                        </button>
                      </>
                    )}
                  </>
                )}
                <span className="absolute top-3 left-3 bg-orange-500 text-white text-xs px-3 py-1 rounded-full">
                  {p.category}
                </span>
              </div>

              {/* Info */}
              <div className="p-4">
                <h2 className="font-semibold text-lg truncate">{p.name}</h2>
                {p.description && (
                  <p className="text-sm text-gray-500 line-clamp-2 mt-1">{p.description}</p>
                )}
                <p className="text-orange-500 font-bold text-lg mt-2">₹{p.price}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsList;

