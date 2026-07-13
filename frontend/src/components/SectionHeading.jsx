import { motion } from "framer-motion";

const SectionHeading = ({ children, subtitle, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-40px" }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    className={`text-center mb-12 ${className}`}
  >
    <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-gray-800 dark:text-gray-100">
      {children}
    </h2>
    {subtitle && (
      <p className="text-gray-500 dark:text-gray-400 mt-3 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
        {subtitle}
      </p>
    )}
    <div className="flex items-center justify-center gap-1.5 mt-5">
      <div className="w-8 h-1 rounded-full bg-indigo-300 dark:bg-indigo-700" />
      <div className="w-12 h-1 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500" />
      <div className="w-8 h-1 rounded-full bg-indigo-300 dark:bg-indigo-700" />
    </div>
  </motion.div>
);

export default SectionHeading;
