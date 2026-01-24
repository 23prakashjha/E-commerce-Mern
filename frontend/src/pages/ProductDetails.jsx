import { useEffect, useState, useMemo, useContext } from "react";
import { useParams } from "react-router-dom";
import { api } from "../services/api";
import { toast } from "react-toastify";
import ProductCard from "../components/ProductCard";
import {
  Minus,
  Plus,
  Heart,
  Star,
  Truck,
  RefreshCcw,
  Headphones,
} from "lucide-react";
import { AuthContext } from "../context/AuthContext";

const API_URL = "https://e-commerce-mern-9snn.onrender.com";
const CATEGORY_TABS = ["mens", "womens", "children"];
const DEFAULT_SIZES = ["XS", "S", "M", "L", "XL", "XXL", "3XL", "4XL"];

const ProductDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const [product, setProduct] = useState(null);
  const [allProducts, setAllProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [wishlist, setWishlist] = useState([]);
  const [activeCategory, setActiveCategory] = useState("");
  const [selectedSize, setSelectedSize] = useState(null);

  /* ---------------- Wishlist ---------------- */
  useEffect(() => {
    setWishlist(JSON.parse(localStorage.getItem("wishlist")) || []);
  }, []);

  /* ---------------- Fetch Product ---------------- */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await api.get(`/products/${id}`);
        setProduct(data);
        setActiveCategory(data.category?.toLowerCase() || "");
        setSelectedSize(null);

        const all = await api.get("/products");
        setAllProducts(all.data);
      } catch {
        toast.error("Failed to load product");
      }
    };

    fetchData();
  }, [id]);

  /* ---------------- Sizes ---------------- */
  const sizes =
    product?.sizes?.length > 0 ? product.sizes : DEFAULT_SIZES;

  /* ---------------- Related Products ---------------- */
  const relatedProducts = useMemo(() => {
    if (!product || !activeCategory) return [];
    return allProducts
      .filter(
        (p) =>
          p._id !== product._id &&
          p.category?.toLowerCase() === activeCategory
      )
      .slice(0, 8);
  }, [allProducts, product, activeCategory]);

  /* ---------------- Add To Cart ---------------- */
  const addToCart = async () => {
    if (!user?.token) {
      toast.error("Please login to add items to cart");
      return;
    }

    if (!selectedSize) {
      toast.error("Please select a size");
      return;
    }

    try {
      await api.post("/cart", {
        productId: product._id,
        quantity,
        size: selectedSize,
      });

      toast.success("Added to cart 🛒");
    } catch (err) {
      toast.error(err.response?.data?.message || "Add to cart failed");
    }
  };

  /* ---------------- Wishlist ---------------- */
  const toggleWishlist = () => {
    const updated = wishlist.includes(product._id)
      ? wishlist.filter((id) => id !== product._id)
      : [...wishlist, product._id];

    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
  };

  if (!product) {
    return (
      <div className="h-screen flex items-center justify-center text-2xl font-bold animate-pulse">
        Loading...
      </div>
    );
  }

  const image = product.image
    ? `${API_URL}/${product.image}`
    : product.images?.length
    ? `${API_URL}/${product.images[0]}`
    : "/placeholder.png";

  const isWishlisted = wishlist.includes(product._id);

  return (
    <div className="max-w-7xl mx-auto px-4 py-14">
      <div className="grid lg:grid-cols-2 gap-14">
        {/* IMAGE */}
        <div className="lg:sticky top-24">
          <img
            src={image}
            alt={product.name}
            className="rounded-3xl shadow-2xl w-full object-cover hover:scale-105 transition"
          />
        </div>

        {/* DETAILS */}
        <div className="space-y-6">
          <h1 className="text-3xl md:text-4xl font-extrabold">
            {product.name}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${
                  i < Math.round(product.rating || 4)
                    ? "text-orange-500 fill-orange-500"
                    : "text-gray-300"
                }`}
              />
            ))}
            <span className="text-sm text-gray-500">
              ({product.numReviews || 0} reviews)
            </span>
          </div>

          <p className="text-gray-600">{product.description}</p>

          <p className="text-4xl font-bold text-orange-500">
            ${product.price.toFixed(2)}
          </p>

          {/* ================= SIZE ================= */}
          <div>
            <p className="font-semibold mb-2">Select Size</p>
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`py-2 rounded-xl font-bold transition transform
                    ${
                      selectedSize === size
                        ? "bg-orange-500 text-white scale-105 shadow-lg"
                        : "border hover:border-orange-500 hover:scale-105"
                    }`}
                >
                  {size}
                </button>
              ))}
            </div>
            {!selectedSize && (
              <p className="text-sm text-red-500 mt-2">
                Size selection required
              </p>
            )}
          </div>

          {/* ================= QUANTITY ================= */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="p-2 border rounded-xl hover:bg-gray-100"
            >
              <Minus />
            </button>

            <span className="font-bold text-xl">{quantity}</span>

            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="p-2 border rounded-xl hover:bg-gray-100"
            >
              <Plus />
            </button>
          </div>

          {/* ================= ACTIONS ================= */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={addToCart}
              className="flex-1 py-3 rounded-xl bg-orange-500 text-white font-bold hover:bg-orange-600 transition"
            >
              Add to Cart
            </button>

            <button
              onClick={toggleWishlist}
              className={`flex-1 py-3 rounded-xl border flex justify-center gap-2
                ${
                  isWishlisted
                    ? "border-red-500 text-red-500"
                    : "hover:border-orange-500"
                }`}
            >
              <Heart className={isWishlisted ? "fill-red-500" : ""} />
              Wishlist
            </button>
          </div>

          {/* ================= TRUST ================= */}
          <div className="grid grid-cols-3 gap-4 pt-6 text-sm text-gray-600">
            <div className="flex flex-col items-center">
              <Truck className="text-orange-500" /> Fast Delivery
            </div>
            <div className="flex flex-col items-center">
              <RefreshCcw className="text-orange-500" /> Easy Returns
            </div>
            <div className="flex flex-col items-center">
              <Headphones className="text-orange-500" /> 24/7 Support
            </div>
          </div>
        </div>
      </div>

      {/* ================= RELATED ================= */}
      {relatedProducts.length > 0 && (
        <section className="mt-24">
          <h2 className="text-4xl font-extrabold text-center mb-10">
            Related Products
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetails;
