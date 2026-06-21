import { motion } from "framer-motion";

const SectionHeading = ({ children, subtitle, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className={`text-center mb-12 ${className}`}
  >
    <h2 className="text-4xl md:text-5xl font-extrabold">{children}</h2>
    {subtitle && <p className="text-gray-500 mt-3 text-lg max-w-2xl mx-auto">{subtitle}</p>}
    <div className="w-24 h-1 bg-orange-500 mx-auto mt-4 rounded-full" />
  </motion.div>
);

export default SectionHeading;
