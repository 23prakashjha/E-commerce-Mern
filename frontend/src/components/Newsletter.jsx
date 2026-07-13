import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Check, Sparkles } from "lucide-react";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <section className="mb-16 sm:mb-20 rounded-3xl overflow-hidden relative group">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 bg-[length:200%_200%] animate-gradient-shift" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.12),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(0,0,0,0.1),transparent_40%)]" />

      <motion.div
        animate={{ x: [-20, 20, -20], y: [-10, 10, -10] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-10 left-[10%] w-16 h-16 rounded-2xl bg-white/8 backdrop-blur-sm border border-white/10 hidden sm:block"
      />
      <motion.div
        animate={{ x: [15, -15, 15], y: [10, -10, 10] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-10 right-[15%] w-12 h-12 rounded-full bg-white/6 backdrop-blur-sm border border-white/8 hidden sm:block"
      />
      <motion.div
        animate={{ y: [-8, 8, -8], rotate: [0, 10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute top-1/2 right-[10%] w-8 h-8 rounded-lg bg-white/5 backdrop-blur-sm border border-white/8 rotate-45 hidden lg:block"
      />

      <div className="relative z-10 px-6 sm:px-8 py-12 sm:py-16 lg:py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
            className="w-16 h-16 rounded-2xl bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center mx-auto mb-6"
          >
            <Mail className="w-8 h-8 text-white" />
          </motion.div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4 leading-tight">
            Join Our{" "}
            <span className="bg-gradient-to-r from-yellow-300 via-amber-300 to-orange-300 bg-clip-text text-transparent">
              Style Club
            </span>
          </h2>
          <p className="text-white/80 mb-10 text-sm sm:text-base lg:text-lg max-w-xl mx-auto leading-relaxed">
            Subscribe and get{" "}
            <span className="text-yellow-300 font-bold">20% off</span>{" "}
            your first order. Be the first to know about new drops and exclusive offers.
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
        >
          <div className="relative flex-1">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              className="w-full px-5 py-4 pr-20 rounded-2xl bg-white/15 backdrop-blur-sm text-white placeholder-white/50 border border-white/20 focus:outline-none focus:ring-2 focus:ring-yellow-300/50 focus:border-yellow-300/50 transition-all duration-300 text-sm sm:text-base"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-yellow-300 text-xs font-bold bg-white/15 backdrop-blur-sm px-2.5 py-1.5 rounded-lg border border-white/10">
              -20%
            </span>
          </div>
          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.03 }}
            type="submit"
            className="bg-white text-purple-700 px-8 py-4 rounded-2xl font-bold transition-all duration-300 shadow-xl shadow-black/15 hover:shadow-2xl text-sm sm:text-base flex items-center justify-center gap-2"
          >
            <Sparkles size={16} />
            Subscribe
          </motion.button>
        </motion.form>

        <AnimatePresence>
          {subscribed && (
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.9 }}
              className="mt-6 inline-flex items-center gap-2 bg-green-400/20 backdrop-blur-sm text-green-200 font-semibold px-6 py-3 rounded-2xl border border-green-400/20 text-sm"
            >
              <div className="w-5 h-5 rounded-full bg-green-400 flex items-center justify-center">
                <Check size={12} className="text-white" />
              </div>
              Thanks for subscribing! Check your inbox for 20% off.
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Newsletter;
