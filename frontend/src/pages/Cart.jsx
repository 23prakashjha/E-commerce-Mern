import { useEffect, useState } from "react";
import { api, getImageUrl } from "../services/api";
import { Trash2, Plus, Minus, ShoppingCart, MapPin, CreditCard, Truck, ArrowLeft, Package, ShieldCheck, IndianRupee } from "lucide-react";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";

const addressFields = [
  { key: "name", label: "Full Name", type: "text" },
  { key: "phone", label: "Phone Number", type: "tel" },
  { key: "street", label: "Street Address", type: "text" },
  { key: "city", label: "City", type: "text" },
  { key: "state", label: "State", type: "text" },
  { key: "zip", label: "ZIP Code", type: "text" },
];

const Skeleton = () => (
  <div className="space-y-6">
    {[1, 2, 3].map((i) => (
      <div key={i} className="flex flex-col sm:flex-row items-center gap-4 bg-white p-4 rounded-2xl shadow animate-pulse">
        <div className="w-full sm:w-32 h-32 rounded-xl bg-gray-200" />
        <div className="flex-1 w-full space-y-3">
          <div className="h-5 bg-gray-200 rounded w-3/4" />
          <div className="h-4 bg-gray-200 rounded w-1/4" />
          <div className="h-4 bg-gray-200 rounded w-1/3" />
          <div className="flex gap-3 mt-4">
            <div className="h-10 w-10 bg-gray-200 rounded" />
            <div className="h-10 w-10 bg-gray-200 rounded" />
            <div className="h-10 w-10 bg-gray-200 rounded ml-auto" />
          </div>
        </div>
      </div>
    ))}
  </div>
);

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [address, setAddress] = useState({
    name: "", phone: "", street: "", city: "", state: "", zip: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [checkingOut, setCheckingOut] = useState(false);

  const fetchCart = async () => {
    try {
      const { data } = await api.get("/cart");
      setCartItems(data || []);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to load cart");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCart(); }, []);

  const removeItem = async (productId) => {
    try {
      await api.delete(`/cart/${productId}`);
      setCartItems((prev) => prev.filter((item) => item.product._id !== productId));
      toast.success("Item removed");
    } catch {
      toast.error("Remove failed");
    }
  };

  const updateQuantity = async (productId, quantity) => {
    if (quantity < 1) return;
    const prev = cartItems.find((i) => i.product._id === productId)?.quantity;
    setCartItems((prev) =>
      prev.map((item) =>
        item.product._id === productId ? { ...item, quantity } : item
      )
    );
    try {
      await api.put("/cart", { productId, quantity });
    } catch {
      setCartItems((prev) =>
        prev.map((item) =>
          item.product._id === productId ? { ...item, quantity: prev } : item
        )
      );
      toast.error("Update failed");
    }
  };

  const subtotal = cartItems.reduce((s, i) => s + (i.product?.price || 0) * i.quantity, 0);
  const tax = subtotal * 0.1;
  const shipping = subtotal > 500 ? 0 : 49;
  const total = subtotal + tax + shipping;

  const handleCheckout = async () => {
    const { name, phone, street, city, state, zip } = address;
    if (!name || !phone || !street || !city || !state || !zip) {
      toast.error("Please fill all address fields");
      return;
    }
    if (!cartItems.length) {
      toast.error("Cart is empty!");
      return;
    }

    setCheckingOut(true);
    const orderData = {
      products: cartItems.map((i) => ({ productId: i.product._id, quantity: i.quantity, price: i.product.price })),
      cartItems,
      address,
      paymentMethod,
      total,
    };

    try {
      if (paymentMethod === "COD") {
        await api.post("/orders", orderData);
        setCartItems([]);
        toast.success("Order placed successfully!");
        navigate("/profile");
      } else {
        localStorage.setItem("orderData", JSON.stringify(orderData));
        navigate("/payment", { state: orderData });
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Checkout failed");
    } finally {
      setCheckingOut(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-8" />
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1"><Skeleton /></div>
          <div className="lg:w-96">
            <div className="bg-white p-6 rounded-3xl shadow-lg space-y-4 animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-1/2" />
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-5 bg-gray-200 rounded" />
              ))}
              <div className="h-12 bg-gray-200 rounded-xl mt-6" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!cartItems.length) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center py-32">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-orange-100 flex items-center justify-center">
            <ShoppingCart className="w-12 h-12 text-orange-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-8 max-w-md mx-auto">
            Looks like you haven't added anything yet. Browse our collection and find something you love!
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition"
          >
            <Package size={20} /> Start Shopping
          </Link>
          <div className="mt-6 flex justify-center gap-6 text-sm text-gray-400">
            <span className="flex items-center gap-1"><Truck size={14} /> Free shipping</span>
            <span className="flex items-center gap-1"><ShieldCheck size={14} /> Secure checkout</span>
            <span className="flex items-center gap-1"><IndianRupee size={14} /> Easy returns</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <Link to="/products" className="p-2 rounded-full hover:bg-gray-100 transition">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-2xl sm:text-3xl font-extrabold">
          Shopping Cart ({cartItems.length} {cartItems.length === 1 ? "item" : "items"})
        </h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 space-y-4">
          <AnimatePresence>
            {cartItems.map((item) => {
              const p = item.product;
              return (
                <motion.div
                  key={p._id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -50, height: 0, marginBottom: 0 }}
                  className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-white p-4 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-50"
                >
                  <Link to={`/products/${p._id}`} className="shrink-0 w-full sm:w-28 h-28 rounded-xl overflow-hidden border border-gray-100">
                    <img
                      src={getImageUrl(p)}
                      alt={p.name}
                      onError={(e) => { e.currentTarget.src = "/images/placeholder.jpg"; }}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </Link>

                  <div className="flex-1 w-full min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <Link to={`/products/${p._id}`} className="min-w-0">
                        <h2 className="font-semibold text-base sm:text-lg truncate hover:text-orange-500 transition">{p.name}</h2>
                      </Link>
                      <button
                        onClick={() => removeItem(p._id)}
                        className="shrink-0 p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition"
                        title="Remove item"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>

                    <p className="text-sm text-gray-500 mt-0.5 capitalize">{p.category}</p>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => updateQuantity(p._id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed transition"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-8 text-center font-semibold text-base">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(p._id, item.quantity + 1)}
                          className="p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 transition"
                        >
                          <Plus size={16} />
                        </button>
                      </div>

                      <div className="text-right">
                        <p className="text-orange-500 font-bold text-lg">₹{(p.price * item.quantity).toLocaleString()}</p>
                        {item.quantity > 1 && (
                          <p className="text-xs text-gray-400">₹{p.price.toLocaleString()} each</p>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        <div className="lg:w-96">
          <div className="lg:sticky lg:top-24 bg-white p-6 sm:p-8 rounded-3xl shadow-lg border border-gray-50 space-y-6">
            <h2 className="text-xl font-bold text-gray-800">Order Summary</h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal ({cartItems.reduce((s, i) => s + i.quantity, 0)} items)</span>
                <span className="font-medium">₹{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax (10%)</span>
                <span className="font-medium">₹{tax.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">
                  {shipping === 0 ? (
                    <span className="text-green-600">FREE</span>
                  ) : (
                    <span>₹{shipping}</span>
                  )}
                </span>
              </div>
              {shipping > 0 && (
                <p className="text-xs text-gray-400">Free shipping on orders over ₹500</p>
              )}
              <div className="border-t pt-3 flex justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-orange-500">₹{total.toLocaleString()}</span>
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="font-semibold text-sm flex items-center gap-2 mb-4">
                <MapPin size={16} className="text-orange-500" /> Shipping Address
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {addressFields.map(({ key, label, type }) => (
                  <div key={key} className={key === "street" ? "sm:col-span-2" : ""}>
                    <label className="block text-xs font-medium text-gray-500 mb-1">{label}</label>
                    <input
                      type={type}
                      placeholder={label}
                      value={address[key]}
                      onChange={(e) => setAddress({ ...address, [key]: e.target.value })}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-orange-400 outline-none transition"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t pt-6">
              <label className="font-semibold text-sm flex items-center gap-2 mb-3">
                <CreditCard size={16} className="text-orange-500" /> Payment Method
              </label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-orange-400 outline-none"
              >
                <option value="COD">Cash on Delivery (COD)</option>
                <option value="Online">Online Payment</option>
              </select>
            </div>

            <button
              onClick={handleCheckout}
              disabled={checkingOut}
              className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white py-3.5 rounded-xl font-semibold shadow-lg hover:shadow-xl transition text-base"
            >
              {checkingOut ? (
                <span className="flex items-center gap-2">
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Processing...
                </span>
              ) : (
                <>
                  {paymentMethod === "COD" ? <Truck size={20} /> : <CreditCard size={20} />}
                  {paymentMethod === "COD" ? "Place Order (COD)" : "Pay Online"}
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-4 text-xs text-gray-400 pt-2">
              <span className="flex items-center gap-1"><ShieldCheck size={14} /> Secure</span>
              <span className="flex items-center gap-1"><Truck size={14} /> Fast delivery</span>
              <span className="flex items-center gap-1"><IndianRupee size={14} /> Easy returns</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
