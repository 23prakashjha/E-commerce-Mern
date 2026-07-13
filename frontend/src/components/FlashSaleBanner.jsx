import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Flame, Zap, Clock, Sparkles, Percent } from "lucide-react";

const calcTimeLeft = () => {
  const now = new Date();
  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);
  const diff = endOfDay - now;
  if (diff <= 0) return { h: 0, m: 0, s: 0 };
  return {
    h: Math.floor((diff / (1000 * 60 * 60)) % 24),
    m: Math.floor((diff / (1000 * 60)) % 60),
    s: Math.floor((diff / 1000) % 60),
  };
};

const TimeDigit = ({ val, label }) => (
  <div className="flex flex-col items-center">
    <span className="text-2xl sm:text-3xl font-extrabold bg-white/15 backdrop-blur-md rounded-xl px-3 sm:px-4 py-2 min-w-[52px] sm:min-w-[64px] text-center text-white border border-white/10 shadow-lg">
      {String(val).padStart(2, "0")}
    </span>
    <span className="text-[10px] sm:text-xs uppercase tracking-wider mt-1.5 text-white/60 font-medium">{label}</span>
  </div>
);

const FlashSaleBanner = ({ bgImage }) => {
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
            alt="Flash Sale"
            initial={{ scale: 1.1 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 12, ease: "easeOut" }}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/90 via-purple-800/80 to-pink-800/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />
        </>
      ) : (
        <>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900 via-purple-700 to-pink-700 bg-[length:200%_200%] animate-gradient-shift" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNCI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-40" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(250,204,21,0.15),transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_30%,rgba(255,255,255,0.06),transparent_40%)]" />
        </>
      )}

      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-yellow-400/10 blur-[80px] hidden sm:block"
      />
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-pink-400/10 blur-[80px]"
      />

      <div className="absolute top-8 left-8 opacity-10 group-hover:opacity-20 transition-opacity duration-700">
        <Percent className="w-20 h-20 sm:w-28 sm:h-28 text-white rotate-[-10deg]" />
      </div>
      <div className="absolute bottom-8 right-8 opacity-10 group-hover:opacity-20 transition-opacity duration-700">
        <Sparkles className="w-16 h-16 sm:w-24 sm:h-24 text-white rotate-[15deg]" />
      </div>

      <div className="relative z-10 px-6 sm:px-8 py-12 sm:py-16 lg:py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="inline-block mb-4"
          >
            <Flame className="w-10 h-10 sm:w-12 sm:h-12 text-yellow-300 drop-shadow-lg" />
          </motion.div>

          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-extrabold text-white mb-3 leading-tight">
            Flash Sale — <span className="text-yellow-300 drop-shadow-md">Extra 20% Off</span>
          </h2>

          <p className="text-white/80 text-sm sm:text-base lg:text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
            Use code{" "}
            <span className="inline-flex items-center gap-1 bg-white/15 backdrop-blur-sm text-yellow-300 font-bold px-3 py-1 rounded-lg border border-white/10">
              <Zap size={14} /> FLASH20
            </span>{" "}
            at checkout. Valid for today only.
          </p>

          <div className="flex items-center justify-center gap-3 mb-8">
            <Clock size={16} className="text-white/60" />
            <span className="text-white/70 text-sm font-medium">Ends in</span>
            <div className="flex items-center gap-2">
              <TimeDigit val={time.h} label="Hrs" />
              <span className="text-2xl font-bold text-white/50 self-start mt-2">:</span>
              <TimeDigit val={time.m} label="Min" />
              <span className="text-2xl font-bold text-white/50 self-start mt-2">:</span>
              <TimeDigit val={time.s} label="Sec" />
            </div>
          </div>

          <Link
            to="/products"
            className="inline-flex items-center gap-2.5 bg-yellow-400 text-purple-900 px-8 sm:px-10 py-3.5 sm:py-4 rounded-2xl font-bold text-sm sm:text-base lg:text-lg hover:bg-yellow-300 hover:scale-105 transition-all duration-300 shadow-xl shadow-yellow-500/25"
          >
            Shop Flash Sale <span className="text-xl">→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FlashSaleBanner;
