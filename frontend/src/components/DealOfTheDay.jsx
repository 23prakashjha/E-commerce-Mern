import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Clock, Zap, Star, TrendingUp } from "lucide-react";

const calcTimeLeft = () => {
  const target = new Date();
  target.setHours(23, 59, 59, 999);
  const diff = target - new Date();
  if (diff <= 0) return { h: 0, m: 0, s: 0 };
  return {
    h: Math.floor((diff / (1000 * 60 * 60)) % 24),
    m: Math.floor((diff / (1000 * 60)) % 60),
    s: Math.floor((diff / 1000) % 60),
  };
};

const TimeBlock = ({ val, label }) => (
  <div className="flex flex-col items-center">
    <span className="text-2xl sm:text-3xl font-extrabold bg-white/15 backdrop-blur-md rounded-xl px-3 sm:px-4 py-2 min-w-[52px] sm:min-w-[64px] text-center text-white border border-white/10 shadow-lg">
      {String(val).padStart(2, "0")}
    </span>
    <span className="text-[10px] sm:text-xs uppercase tracking-wider mt-1.5 text-white/60 font-medium">{label}</span>
  </div>
);

const DealOfTheDay = ({ product, bgImage }) => {
  const [time, setTime] = useState(calcTimeLeft());

  useEffect(() => {
    const id = setInterval(() => setTime(calcTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="mb-16 sm:mb-20 rounded-3xl overflow-hidden relative group">
      {bgImage ? (
        <>
          <motion.img
            src={bgImage}
            alt="Deal of the Day"
            initial={{ scale: 1.1 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 12, ease: "easeOut" }}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/90 via-purple-900/80 to-indigo-900/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
        </>
      ) : (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-red-500 bg-[length:200%_200%] animate-gradient-shift" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.1),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(0,0,0,0.08),transparent_40%)]" />
        </>
      )}

      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-yellow-400/10 blur-[60px]"
      />
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.35, 0.15] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute -bottom-20 -left-20 w-56 h-56 rounded-full bg-pink-400/10 blur-[70px]"
      />

      <div className="absolute top-6 left-6 sm:top-8 sm:left-8 opacity-10 group-hover:opacity-20 transition-opacity duration-700">
        <TrendingUp className="w-24 h-24 sm:w-32 sm:h-32 text-white rotate-[-15deg]" />
      </div>
      <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 opacity-10 group-hover:opacity-20 transition-opacity duration-700">
        <Star className="w-20 h-20 sm:w-28 sm:h-28 text-white rotate-[20deg]" />
      </div>

      <div className="relative z-10 grid lg:grid-cols-2 gap-8 p-8 sm:p-10 lg:p-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-6 text-white border border-white/10">
            <Zap size={16} className="text-yellow-300" /> Deal of the Day
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 text-white leading-tight">
            {product?.name || "Premium Collection"}
          </h2>
          <p className="text-white/80 mb-6 text-base sm:text-lg leading-relaxed">
            Up to <span className="font-bold text-yellow-300">60% off</span> — limited stock available.
          </p>
          <div className="flex items-center gap-3 mb-8">
            <span className="text-3xl sm:text-4xl font-bold text-white">₹{product?.price ? (product.price * 0.6).toFixed(0) : "29"}</span>
            <span className="text-xl sm:text-2xl line-through text-white/50">₹{product?.price ? product.price.toFixed(0) : "79"}</span>
            <span className="bg-red-400 text-white text-sm font-bold px-3 py-1 rounded-full shadow-lg">-60%</span>
          </div>
          <Link
            to="/products"
            className="inline-flex items-center gap-2.5 bg-white text-indigo-600 px-8 py-3.5 rounded-2xl font-bold hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-xl shadow-black/15 text-sm sm:text-base"
          >
            Grab the Deal <span className="text-lg">→</span>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="flex flex-col items-center lg:items-end"
        >
          <div className="flex items-center gap-2 mb-5 text-white/80">
            <Clock size={18} />
            <span className="font-semibold text-sm sm:text-base">Hurry! Offer ends in</span>
          </div>
          <div className="flex items-center gap-3 sm:gap-4">
            <TimeBlock val={time.h} label="Hours" />
            <span className="text-3xl font-bold text-white/40 self-start mt-2">:</span>
            <TimeBlock val={time.m} label="Minutes" />
            <span className="text-3xl font-bold text-white/40 self-start mt-2">:</span>
            <TimeBlock val={time.s} label="Seconds" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DealOfTheDay;
