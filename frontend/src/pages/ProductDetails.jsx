import { useEffect, useState, useMemo, useContext, useRef, useCallback } from "react";
import { useParams } from "react-router-dom";
import { api, getImageUrl } from "../services/api";
import { toast } from "react-toastify";
import ProductCard from "../components/ProductCard";
import { Minus, Plus, Heart, Star, Truck, RefreshCcw, Headphones } from "lucide-react";
import { AuthContext } from "../context/AuthContext";

const DEFAULT_SIZES = ["XS", "S", "M", "L", "XL", "XXL", "3XL", "4XL"];

const ImageZoom = ({ src, alt }) => {
  const containerRef = useRef(null);
  const [zooming, setZooming] = useState(false);
  const [bgPos, setBgPos] = useState("50% 50%");

  const handleMouseMove = useCallback((e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setBgPos(`${x}% ${y}%`);
  }, []);

  return (
    <div
      ref={containerRef}
      className="lg:sticky top-24 rounded-3xl overflow-hidden bg-white shadow-2xl cursor-crosshair"
      style={{ height: "500px" }}
      onMouseEnter={() => setZooming(true)}
      onMouseLeave={() => setZooming(false)}
      onMouseMove={handleMouseMove}
    >
      <div
        className="w-full h-full bg-no-repeat"
        style={{
          backgroundImage: `url(${src})`,
          backgroundSize: zooming ? "200%" : "100%",
          backgroundPosition: zooming ? bgPos : "50% 50%",
          transition: zooming ? "none" : "background-size 0.3s, background-position 0.3s",
        }}
      />
      {!zooming && (
        <div className="absolute bottom-4 right-4 bg-black/50 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur">
          Hover to zoom
        </div>
      )}
    </div>
  );
};

const ProductDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const [product, setProduct] = useState(null);
  const [allProducts, setAllProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [wishlist, setWishlist] = useState([]);
  const [activeCategory, setActiveCategory] = useState("");
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    setWishlist(JSON.parse(localStorage.getItem("wishlist")) || []);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await api.get(`/products/${id}`);
        setProduct(data);
        setActiveCategory(data.category?.toLowerCase() || "");
        setSelectedSize(null);
        setSelectedImage(0);
        const all = await api.get("/products");
        setAllProducts(all.data);
      } catch {
        toast.error("Failed to load product");
      }
    };
    fetchData();
  }, [id]);

  const sizes = product?.sizes?.length > 0 ? product.sizes : DEFAULT_SIZES;

  const relatedProducts = useMemo(() => {
    if (!product || !activeCategory) return [];
    return allProducts
      .filter((p) => p._id !== product._id && p.category?.toLowerCase() === activeCategory)
      .slice(0, 8);
  }, [allProducts, product, activeCategory]);

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
      await api.post("/cart", { productId: product._id, quantity, size: selectedSize });
      toast.success("Added to cart");
    } catch (err) {
      toast.error(err.response?.data?.message || "Add to cart failed");
    }
  };

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

  const images = product.images?.length > 0
    ? product.images.map((img) => getImageUrl({ images: [img], image: img }))
    : [getImageUrl(product)];
  const currentImage = images[selectedImage];
  const isWishlisted = wishlist.includes(product._id);

  return (
    <div className="max-w-7xl mx-auto px-4 py-14">
      <div className="grid lg:grid-cols-2 gap-14">
        <div className="space-y-4">
          <ImageZoom src={currentImage} alt={product.name} />
          {images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition ${
                    selectedImage === i
                      ? "border-orange-500 ring-2 ring-orange-300"
                      : "border-gray-200 hover:border-gray-400"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-6">
          <h1 className="text-3xl md:text-4xl font-extrabold">{product.name}</h1>

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
            <span className="text-sm text-gray-500">({product.numReviews || 0} reviews)</span>
          </div>

          <p className="text-gray-600">{product.description}</p>

          <div className="flex items-baseline gap-3">
            <p className="text-4xl font-bold text-orange-500">₹{product.price.toFixed(2)}</p>
            {product.discountPrice > 0 && (
              <p className="text-lg text-gray-400 line-through">₹{product.discountPrice.toFixed(2)}</p>
            )}
            {product.discountPrice > 0 && (
              <span className="bg-green-100 text-green-700 text-sm font-bold px-2 py-0.5 rounded">
                {Math.round((1 - product.price / product.discountPrice) * 100)}% OFF
              </span>
            )}
          </div>

          <div>
            <p className="font-semibold mb-2">Select Size</p>
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`py-2 rounded-xl font-bold transition transform ${
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
              <p className="text-sm text-red-500 mt-2">Size selection required</p>
            )}
          </div>

          <div className="flex items-center gap-4">
            <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="p-2 border rounded-xl hover:bg-gray-100"><Minus /></button>
            <span className="font-bold text-xl">{quantity}</span>
            <button onClick={() => setQuantity((q) => q + 1)} className="p-2 border rounded-xl hover:bg-gray-100"><Plus /></button>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button onClick={addToCart} className="flex-1 py-3 rounded-xl bg-orange-500 text-white font-bold hover:bg-orange-600 transition">
              Add to Cart
            </button>
            <button onClick={toggleWishlist} className={`flex-1 py-3 rounded-xl border flex justify-center gap-2 ${isWishlisted ? "border-red-500 text-red-500" : "hover:border-orange-500"}`}>
              <Heart className={isWishlisted ? "fill-red-500" : ""} /> Wishlist
            </button>
          </div>

          <div className="border-t pt-6 space-y-3">
            <p className="text-sm text-gray-500 flex items-center gap-2"><Truck className="text-orange-500 w-4 h-4" /> Free delivery on orders over ₹500</p>
            <p className="text-sm text-gray-500 flex items-center gap-2"><RefreshCcw className="text-orange-500 w-4 h-4" /> 30-day easy returns</p>
            <p className="text-sm text-gray-500 flex items-center gap-2"><Headphones className="text-orange-500 w-4 h-4" /> 24/7 customer support</p>
          </div>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <section className="mt-24">
          <h2 className="text-4xl font-extrabold text-center mb-10">Related Products</h2>
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
