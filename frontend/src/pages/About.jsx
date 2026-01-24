import { Users, Globe, Package, Truck, ShieldCheck, Star } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Users,
    title: "Our Team",
    desc: "A passionate team of developers, designers, and e-commerce experts delivering the best shopping experience.",
  },
  {
    icon: Globe,
    title: "Global Reach",
    desc: "Serving customers across multiple countries with localized support and fast delivery.",
  },
  {
    icon: Package,
    title: "Premium Products",
    desc: "Carefully curated products ensuring quality, durability, and modern style.",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    desc: "Reliable shipping partners ensuring your orders arrive on time.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payments",
    desc: "100% secure transactions with trusted payment gateways.",
  },
  {
    icon: Star,
    title: "Customer Satisfaction",
    desc: "Thousands of happy customers with consistently high ratings.",
  },
];

const stats = [
  { value: "10K+", label: "Happy Customers" },
  { value: "500+", label: "Products" },
  { value: "50+", label: "Brands" },
  { value: "4.8★", label: "Average Rating" },
];

const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      {/* ================= HERO ================= */}
      <section className="relative mb-28 rounded-3xl overflow-hidden bg-linear-to-br from-orange-500 via-orange-400 to-orange-600 shadow-2xl">
        <div className="absolute inset-0 bg-black/20" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="relative px-6 py-24 text-center max-w-3xl mx-auto text-white"
        >
          <h1 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold mb-6">
            About <span className="text-black drop-shadow-lg">ShopEase</span>
          </h1>
          <p className="text-white/90 text-lg leading-relaxed">
            ShopEase is a modern e-commerce platform redefining online shopping
            with style, speed, and trust at its core.
          </p>
        </motion.div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="mb-28">
        <h2 className="text-3xl font-bold text-center mb-16">
          Why Choose <span className="text-orange-500">Us</span>
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all text-center"
              >
                <div className="flex justify-center mb-6">
                  <div className="p-4 rounded-2xl bg-orange-500/10 group-hover:bg-orange-500 transition">
                    <Icon className="w-10 h-10 text-orange-500 group-hover:text-white transition" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ================= STATS ================= */}
      <section className="mb-28 rounded-3xl bg-gray-100 py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center max-w-5xl mx-auto">
          {stats.map(stat => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-4xl font-extrabold text-orange-500 mb-2">
                {stat.value}
              </p>
              <p className="text-gray-700 font-medium">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= JOURNEY ================= */}
      <section className="mb-28">
        <h2 className="text-3xl font-bold text-center mb-16">
          Our Journey
        </h2>

        <div className="max-w-4xl mx-auto space-y-12">
          {[
            ["2021", "ShopEase was founded with a vision to simplify online shopping."],
            ["2022", "Expanded categories and partnered with top brands."],
            ["2023", "Reached 10,000+ customers and launched mobile-first UX."],
            ["2024", "Introduced fast shipping and global expansion."],
          ].map(([year, text]) => (
            <motion.div
              key={year}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex gap-6 items-start"
            >
              <span className="text-orange-500 font-bold text-xl w-16 shrink-0">
                {year}
              </span>
              <p className="text-gray-700 leading-relaxed">
                {text}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= VALUES ================= */}
      <section className="mb-32">
        <h2 className="text-3xl font-bold text-center mb-16">
          Our Core Values
        </h2>

        <div className="grid md:grid-cols-3 gap-10">
          {[
            ["Trust", "Transparent policies and secure transactions."],
            ["Quality", "Only products we believe in and stand behind."],
            ["Innovation", "Always improving the shopping experience."],
          ].map(([title, desc]) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-10 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all text-center"
            >
              <h3 className="text-2xl font-semibold mb-4 text-orange-500">
                {title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default About;
