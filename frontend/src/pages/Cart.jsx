import { useEffect, useState } from "react";
import { api, getImageUrl } from "../services/api";
import { Trash2, Plus, Minus, ShoppingCart, MapPin, CreditCard, Truck } from "lucide-react";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [address, setAddress] = useState({
    name: "", phone: "", street: "", city: "", state: "", zip: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("COD");

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
    try {
      await api.put("/cart", { productId, quantity });
      setCartItems((prev) =>
        prev.map((item) =>
          item.product._id === productId ? { ...item, quantity } : item
        )
      );
    } catch {
      toast.error("Update failed");
    }
  };

  const subtotal = cartItems.reduce((s, i) => s + (i.product?.price || 0) * i.quantity, 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

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
      } else {
        localStorage.setItem("orderData", JSON.stringify(orderData));
        navigate("/payment", { state: orderData });
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Checkout failed");
    }
  };

  if (loading) return <p className="text-center py-20 text-lg">Loading cart...</p>;
  if (!cartItems.length) return (
    <div className="text-center py-32">
      <ShoppingCart className="mx-auto w-20 h-20 text-gray-400 mb-4 animate-bounce" />
      <p className="text-gray-600 text-xl font-medium">Your cart is empty</p>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-extrabold mb-8 text-center lg:text-left">Shopping Cart</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 space-y-6">
          <AnimatePresence>
            {cartItems.map((item) => {
              const p = item.product;
              return (
                <motion.div
                  key={p._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  className="flex flex-col sm:flex-row items-center gap-4 bg-white p-4 rounded-2xl shadow hover:shadow-lg transition-shadow"
                >
                  <img
                    src={getImageUrl(p)}
                    alt={p.name}
                    className="w-full sm:w-32 h-32 object-cover rounded-xl border border-gray-200 hover:scale-105 transition-transform"
                  />
                  <div className="flex-1 flex flex-col justify-between w-full">
                    <div>
                      <h2 className="font-semibold text-lg">{p.name}</h2>
                      <p className="text-gray-500 mt-1">Price: ₹{p.price.toFixed(2)}</p>
                      <p className="text-sm text-gray-400 mt-1">Subtotal: ₹{(p.price * item.quantity).toFixed(2)}</p>
                    </div>
                    <div className="flex items-center gap-3 mt-4">
                      <button onClick={() => updateQuantity(p._id, item.quantity - 1)} className="p-2 bg-gray-200 rounded hover:bg-gray-300 transition"><Minus size={16} /></button>
                      <span className="font-semibold text-lg">{item.quantity}</span>
                      <button onClick={() => updateQuantity(p._id, item.quantity + 1)} className="p-2 bg-gray-200 rounded hover:bg-gray-300 transition"><Plus size={16} /></button>
                      <button onClick={() => removeItem(p._id)} className="ml-auto text-red-500 hover:text-red-600 transition"><Trash2 size={20} /></button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        <div className="lg:w-96 bg-white p-6 rounded-3xl shadow-lg space-y-6 flex flex-col">
          <h2 className="text-2xl font-bold text-orange-500">Order Summary</h2>
          <div className="space-y-2">
            <div className="flex justify-between text-gray-700"><span>Subtotal</span><span>₹{subtotal.toFixed(2)}</span></div>
            <div className="flex justify-between text-gray-700"><span>Tax (10%)</span><span>₹{tax.toFixed(2)}</span></div>
            <div className="flex justify-between font-bold text-xl border-t pt-3"><span>Total</span><span className="text-orange-500">₹{total.toFixed(2)}</span></div>
          </div>

          <h3 className="font-semibold flex items-center gap-2"><MapPin /> Shipping Address</h3>
          <div className="space-y-3">
            {Object.keys(address).map((key) => (
              <motion.input
                key={key}
                placeholder={key.toUpperCase()}
                value={address[key]}
                onChange={(e) => setAddress({ ...address, [key]: e.target.value })}
                whileFocus={{ scale: 1.02 }}
                className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none transition"
              />
            ))}
          </div>

          <div className="mt-2">
            <label className="mb-2 font-semibold flex items-center gap-2"><CreditCard /> Payment Method</label>
            <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none">
              <option value="COD">Cash on Delivery (COD)</option>
              <option value="Online">Online Payment</option>
            </select>
          </div>

          <button onClick={handleCheckout} className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold transition">
            {paymentMethod === "COD" ? <Truck size={20} /> : <CreditCard size={20} />}
            {paymentMethod === "COD" ? "Place Order (COD)" : "Pay Online"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
