import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const FloatingShape = ({ className, delay = 0 }) => (
  <motion.div
    animate={{ y: [-10, 10, -10], rotate: [0, 5, -5, 0] }}
    transition={{ duration: 6, repeat: Infinity, delay, ease: "easeInOut" }}
    className={`absolute pointer-events-none ${className}`}
  />
);

const FestiveBanner = ({ image, gradient, alt, title, highlight, subtitle, link = "/products", icon: Icon }) => (
  <section className="relative w-full h-[50vh] sm:h-[60vh] lg:h-[70vh] overflow-hidden rounded-3xl mb-16 sm:mb-20 group">
    {gradient ? (
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} bg-[length:200%_200%] animate-gradient-shift`} />
    ) : (
      <motion.img
        src={image}
        alt={alt || "Banner"}
        initial={{ scale: 1.1 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 10, ease: "easeOut" }}
        className="absolute inset-0 w-full h-full object-cover"
      />
    )}

    {gradient && (
      <>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.18),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(0,0,0,0.15),transparent_50%)]" />

        <FloatingShape className="top-[10%] left-[8%] w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15 hidden sm:flex items-center justify-center" delay={0} />
        <FloatingShape className="top-[15%] right-[12%] w-12 h-12 rounded-full bg-white/8 backdrop-blur-sm border border-white/10 hidden sm:block" delay={1.5} />
        <FloatingShape className="bottom-[20%] left-[15%] w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm border border-white/12 rotate-45 hidden sm:block" delay={0.8} />
        <FloatingShape className="bottom-[15%] right-[8%] w-20 h-20 rounded-3xl bg-white/6 backdrop-blur-sm border border-white/8 hidden lg:block" delay={2} />

        <div className="absolute -top-32 -right-32 w-72 h-72 rounded-full bg-white/5 blur-[80px] hidden sm:block" />
        <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-black/10 blur-[100px]" />
      </>
    )}

    <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent" />

    <div className="relative z-10 flex h-full items-center px-6 sm:px-10 lg:px-20">
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-lg"
      >
        {Icon && (
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
            className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center mb-5"
          >
            <Icon className="w-7 h-7 text-white" />
          </motion.div>
        )}

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight mb-3 text-white drop-shadow-lg"
        >
          {title}
        </motion.h1>

        {highlight && (
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="block text-3xl sm:text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-yellow-300 via-amber-300 to-orange-300 bg-clip-text text-transparent drop-shadow-lg mb-4"
          >
            {highlight}
          </motion.span>
        )}

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="text-white/85 text-sm sm:text-base lg:text-lg mb-8 max-w-md leading-relaxed"
        >
          {subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex flex-wrap gap-4"
        >
          <Link
            to={link}
            className="inline-flex items-center gap-2.5 bg-white text-gray-900 px-8 py-3.5 rounded-2xl font-bold hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-xl shadow-black/20 text-sm sm:text-base"
          >
            Shop Now
            <span className="text-lg transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  </section>
);

export default FestiveBanner;
