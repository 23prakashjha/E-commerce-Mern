import { useState } from "react";
import { motion } from "framer-motion";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <section className="mb-32 text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6">Join Our Style Club</h2>
        <p className="text-gray-600 mb-10 text-lg max-w-xl mx-auto">
          Subscribe and get <span className="text-orange-500 font-bold">20% off</span> your first order.
          Be the first to know about new drops and exclusive offers.
        </p>
      </motion.div>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
        <div className="relative flex-1">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="px-6 py-4 rounded-2xl border w-full focus:outline-none focus:ring-2 focus:ring-orange-500 pr-24"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-orange-500 text-sm font-semibold bg-orange-50 px-2 py-1 rounded-lg">
            -20%
          </span>
        </div>
        <motion.button
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="bg-orange-500 hover:bg-orange-600 text-white px-10 py-4 rounded-2xl font-semibold transition shadow-lg"
        >
          {subscribed ? "Subscribed!" : "Subscribe"}
        </motion.button>
      </form>
      {subscribed && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-green-600 mt-4 font-medium"
        >
          Thanks for subscribing! Check your inbox for 20% off.
        </motion.p>
      )}
    </section>
  );
};

export default Newsletter;
