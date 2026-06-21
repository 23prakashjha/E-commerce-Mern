import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Flame } from "lucide-react";

const FlashSaleBanner = () => (
  <section className="mb-24 rounded-3xl overflow-hidden relative">
    <div className="absolute inset-0 bg-gradient-to-r from-purple-900 via-purple-700 to-pink-700 animate-gradient" />
    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />
    <div className="relative z-10 px-8 py-16 lg:py-20 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
      >
        <Flame className="mx-auto w-12 h-12 text-yellow-300 mb-4" />
        <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-4">
          Flash Sale — <span className="text-yellow-300">Extra 20% Off</span>
        </h2>
        <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
          Use code <span className="bg-white/20 text-yellow-300 font-bold px-4 py-1 rounded-lg">FLASH20</span> at checkout.
          Valid for the next 24 hours only.
        </p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 bg-yellow-400 text-purple-900 px-10 py-4 rounded-2xl font-bold text-lg hover:bg-yellow-300 transition shadow-xl"
        >
          Shop Flash Sale <span>→</span>
        </Link>
      </motion.div>
    </div>
  </section>
);

export default FlashSaleBanner;
