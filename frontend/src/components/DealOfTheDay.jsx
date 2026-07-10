import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Clock, Zap } from "lucide-react";

const calcTimeLeft = () => {
  const target = new Date();
  target.setHours(23, 59, 59, 999);
  const diff = target - new Date();
  const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const m = Math.floor((diff / (1000 * 60)) % 60);
  const s = Math.floor((diff / 1000) % 60);
  return { h, m, s };
};

const TimeBlock = ({ val, label }) => (
  <div className="flex flex-col items-center">
    <span className="text-3xl font-extrabold bg-white/20 backdrop-blur rounded-xl px-4 py-2 min-w-[60px] text-center">
      {String(val).padStart(2, "0")}
    </span>
    <span className="text-xs uppercase tracking-wider mt-1 opacity-80">{label}</span>
  </div>
);

const DealOfTheDay = ({ product }) => {
  const [time, setTime] = useState(calcTimeLeft());

  useEffect(() => {
    const id = setInterval(() => setTime(calcTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="mb-24 rounded-3xl overflow-hidden bg-linear-to-br from-indigo-600 via-indigo-500 to-red-500 text-white shadow-2xl">
      <div className="grid lg:grid-cols-2 gap-8 p-10 lg:p-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <Zap size={16} className="text-yellow-300" /> Deal of the Day
          </span>
          <h2 className="text-4xl lg:text-5xl font-extrabold mb-4">
            {product?.name || "Premium Collection"}
          </h2>
          <p className="text-white/80 mb-6 text-lg">
            Up to <span className="font-bold text-yellow-300">60% off</span> — limited stock available.
          </p>
          <div className="flex items-center gap-2 mb-8">
            <span className="text-4xl font-bold">₹{product?.price ? (product.price * 0.6).toFixed(0) : "29"}</span>
            <span className="text-2xl line-through opacity-60">₹{product?.price ? product.price.toFixed(0) : "79"}</span>
            <span className="bg-red-400 text-sm font-bold px-3 py-1 rounded-full">-60%</span>
          </div>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 bg-white text-indigo-600 px-8 py-3 rounded-xl font-bold hover:bg-gray-100 transition shadow-lg"
          >
            Grab the Deal <span>→</span>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center"
        >
          <div className="flex items-center gap-2 mb-4">
            <Clock size={20} />
            <span className="font-semibold">Hurry! Offer ends in</span>
          </div>
          <div className="flex gap-4 sm:gap-6">
            <TimeBlock val={time.h} label="Hours" />
            <span className="text-4xl font-bold self-start mt-2">:</span>
            <TimeBlock val={time.m} label="Minutes" />
            <span className="text-4xl font-bold self-start mt-2">:</span>
            <TimeBlock val={time.s} label="Seconds" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DealOfTheDay;
