import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const FestiveBanner = ({ image, alt, title, highlight, subtitle, link = "/products" }) => (
  <section className="relative w-full h-[65vh] sm:h-[75vh] lg:h-[85vh] overflow-hidden rounded-3xl mb-24">
    <motion.img
      src={image}
      alt={alt || "Festive Banner"}
      initial={{ scale: 1.12 }}
      animate={{ scale: 1 }}
      transition={{ duration: 8, ease: "easeOut" }}
      className="absolute inset-0 w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/50 to-transparent" />
    <div className="relative z-10 flex h-full items-center justify-center px-6 sm:px-12 lg:px-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-xl text-white text-center flex flex-col items-center"
      >
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
          {title}
          <span className="block bg-linear-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent drop-shadow-lg">
            {highlight}
          </span>
        </h1>
        <p className="text-white/90 text-base sm:text-lg mb-10 max-w-md">{subtitle}</p>
        <Link
          to={link}
          className="inline-flex items-center justify-center gap-3 bg-orange-500 hover:bg-orange-600 text-white px-12 py-4 rounded-2xl font-semibold shadow-2xl hover:scale-105 transition-all duration-300"
        >
          Shop Now
          <span className="text-xl">→</span>
        </Link>
      </motion.div>
    </div>
  </section>
);

export default FestiveBanner;
