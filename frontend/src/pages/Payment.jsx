import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { api } from "../services/api";
import { CreditCard, CheckCircle, Lock, MapPin, ShoppingBag } from "lucide-react";

const RAZORPAY_KEY_ID = "rzp_test_TBJj9N5EohTMIH";

const loadRazorpayScript = () =>
  new Promise((resolve) => {
    if (document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]')) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const savedOrder = location.state || JSON.parse(localStorage.getItem("orderData") || "null");
  const [orderData, setOrderData] = useState(savedOrder);
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!savedOrder) {
      toast.error("No order found. Redirecting to cart...");
      navigate("/cart");
    } else {
      setOrderData(savedOrder);
      localStorage.setItem("orderData", JSON.stringify(savedOrder));
    }
  }, [savedOrder, navigate]);

  if (!orderData) return <p className="text-center py-20 text-lg">Loading order...</p>;

  const { cartItems = [], address = {}, total = 0, paymentMethod } = orderData;

  const handlePayment = async () => {
    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) {
      toast.error("Failed to load Razorpay SDK. Check your internet connection.");
      return;
    }

    setProcessing(true);

    try {
      const { data: order } = await api.post("/payments/create-order", { amount: total });

      const options = {
        key: RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Shopping Online",
        description: "Order Payment",
        order_id: order.orderId,
        handler: async (response) => {
          try {
            await api.post("/payments/verify", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            const orderPayload = {
              products: cartItems.map((item) => ({
                productId: item.product._id,
                quantity: item.quantity,
                price: item.product.discountPrice > 0 ? item.product.discountPrice : item.product.price,
              })),
              cartItems,
              address,
              totalPrice: total,
              paymentMethod: "Online",
            };

            await api.post("/orders", orderPayload);

            setProcessing(false);
            setSuccess(true);
            localStorage.removeItem("orderData");
            toast.success("Payment successful!");

            setTimeout(() => navigate("/products"), 2000);
          } catch (err) {
            console.error(err);
            setProcessing(false);
            toast.error("Payment verification failed. Contact support.");
          }
        },
        prefill: {
          name: address.name || "",
          contact: address.phone || "",
        },
        theme: { color: "#f97316" },
        modal: {
          ondismiss: () => {
            setProcessing(false);
            toast.error("Payment cancelled");
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
      setProcessing(false);
    } catch (err) {
      console.error(err);
      setProcessing(false);
      toast.error(err.response?.data?.message || "Payment failed");
    }
  };

  return (
    <div className="min-h-screen bg-orange-50 flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl w-full grid md:grid-cols-2 gap-8"
      >
        {/* ORDER SUMMARY */}
        <div className="bg-white rounded-3xl shadow-xl p-6 flex flex-col justify-between">
          <h2 className="text-2xl font-bold text-orange-500 mb-6">Order Summary</h2>
          <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
            {cartItems.map((item) => (
              <div key={item.product?._id} className="flex justify-between border-b pb-2 text-sm hover:bg-orange-50 rounded-md px-2 transition">
                <span>{item.product?.name} x {item.quantity}</span>
                <span className="font-medium">Rs.{(item.product?.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}

            <div className="flex justify-between text-sm mt-2">
              <span>Shipping</span>
              <span className="text-green-600 font-medium">FREE</span>
            </div>

            <div className="flex justify-between font-bold text-lg border-t pt-4 mt-2">
              <span>Total</span>
              <span>Rs.{total.toFixed(2)}</span>
            </div>
          </div>

          {paymentMethod === "COD" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 flex items-center gap-2 text-green-600 font-semibold">
              <CheckCircle size={20} /> Cash on Delivery order placed!
            </motion.div>
          )}

          {address && (
            <div className="mt-6">
              <h3 className="font-semibold flex items-center gap-2 mb-1">
                <MapPin size={18} /> Shipping Address
              </h3>
              <p className="text-sm text-gray-600">{address.name}, {address.phone}</p>
              <p className="text-sm text-gray-600">{address.street}, {address.city}, {address.state} {address.zip}</p>
            </div>
          )}
        </div>

        {/* ONLINE PAYMENT */}
        {paymentMethod === "Online" && (
          <div className="bg-white rounded-3xl shadow-xl p-6 flex flex-col">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <CreditCard className="text-orange-500" /> Razorpay Payment
            </h2>

            <AnimatePresence>
              {!success ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
                  <div className="bg-orange-50 rounded-xl p-4 text-sm text-gray-600 space-y-1">
                    <p>Click the button below to open the Razorpay secure checkout.</p>
                    <p className="text-xs text-gray-400 mt-2 flex items-center gap-1"><Lock size={12} /> Secured by Razorpay</p>
                  </div>

                  <motion.button whileTap={{ scale: 0.96 }} onClick={handlePayment} disabled={processing} className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition disabled:opacity-70">
                    <CreditCard size={18} /> {processing ? "Processing..." : `Pay Rs.${total.toFixed(2)}`}
                  </motion.button>
                </motion.div>
              ) : (
                <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center py-12">
                  <CheckCircle size={60} className="text-green-500 mx-auto" />
                  <h3 className="text-2xl font-bold text-green-600 mt-4">Payment Successful!</h3>
                  <p className="text-gray-500 mt-2">Redirecting to products...</p>
                  <div className="mt-6 flex justify-center">
                    <ShoppingBag className="animate-bounce text-orange-500" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Payment;
