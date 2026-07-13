import {
  Users, Globe, Package, Truck, ShieldCheck, Star,
  Target, Eye, Heart, Quote, Award, Zap, Clock,
  TrendingUp, Smile, Sparkles
} from "lucide-react";
import { motion } from "framer-motion";

const features = [
  { icon: Users, title: "Our Team", desc: "A passionate team of developers, designers, and e-commerce experts delivering the best shopping experience." },
  { icon: Globe, title: "Global Reach", desc: "Serving customers across 50+ countries with localized support and fast delivery." },
  { icon: Package, title: "Premium Products", desc: "Carefully curated products ensuring quality, durability, and modern style." },
  { icon: Truck, title: "Fast Delivery", desc: "Reliable shipping partners ensuring your orders arrive on time, every time." },
  { icon: ShieldCheck, title: "Secure Payments", desc: "100% secure transactions with trusted payment gateways and encryption." },
  { icon: Star, title: "Customer Satisfaction", desc: "Thousands of happy customers with consistently high 4.8★ ratings." },
];

const stats = [
  { value: "50K+", label: "Happy Customers", icon: Smile },
  { value: "500+", label: "Products", icon: Package },
  { value: "200+", label: "Brand Partners", icon: Award },
  { value: "4.8★", label: "Average Rating", icon: Star },
  { value: "99.9%", label: "Uptime", icon: Zap },
  { value: "10K+", label: "Daily Orders", icon: TrendingUp },
];

const team = [
  { name: "Priya Sharma", role: "CEO & Founder", img: "https://i.pravatar.cc/150?img=1", bio: "Visionary leader with 15+ years in e-commerce." },
  { name: "Rahul Verma", role: "CTO", img: "https://i.pravatar.cc/150?img=3", bio: "Tech architect building scalable platforms." },
  { name: "Ananya Patel", role: "Head of Design", img: "https://i.pravatar.cc/150?img=5", bio: "Crafting beautiful user experiences." },
  { name: "Vikram Singh", role: "VP of Operations", img: "https://i.pravatar.cc/150?img=8", bio: "Supply chain & logistics expert." },
  { name: "Neha Gupta", role: "Marketing Director", img: "https://i.pravatar.cc/150?img=9", bio: "Driving brand growth globally." },
  { name: "Arjun Mehta", role: "Customer Success", img: "https://i.pravatar.cc/150?img=11", bio: "Ensuring every customer is happy." },
];

const testimonials = [
  { name: "Sneha K.", role: "Regular Shopper", text: "ShopEase completely changed how I shop online. The quality is unmatched and delivery is always on time!", rating: 5 },
  { name: "Rohit M.", role: "Verified Buyer", text: "I've been shopping here for 2 years now. The customer support team goes above and beyond every single time.", rating: 5 },
  { name: "Divya R.", role: "Fashion Enthusiast", text: "The product range is incredible. I find everything I need in one place with amazing discounts!", rating: 4 },
  { name: "Amit S.", role: "Business Owner", text: "We bulk-order from ShopEase for our retail store. Professional, reliable, and always top-quality.", rating: 5 },
  { name: "Kavita P.", role: "Premium Member", text: "The premium membership is absolutely worth it. Exclusive deals and priority delivery are game-changers!", rating: 5 },
  { name: "Deepak J.", role: "Tech Reviewer", text: "As someone who reviews products daily, ShopEase consistently delivers genuine, high-quality items.", rating: 4 },
];

const timeline = [
  ["2021", "ShopEase was founded with a vision to simplify online shopping for everyone."],
  ["2022", "Expanded to 500+ product categories and partnered with 200+ top brands."],
  ["2023", "Reached 50,000+ happy customers and launched our mobile-first shopping experience."],
  ["2024", "Expanded globally to 50+ countries with local warehouses for faster delivery."],
  ["2025", "Launched AI-powered recommendations and premium membership program."],
  ["2026", "Ranked #1 in customer satisfaction and crossed 1M+ orders processed."],
];

const brands = [
  { name: "Nike", color: "bg-red-500" },
  { name: "Adidas", color: "bg-black" },
  { name: "Puma", color: "bg-orange-600" },
  { name: "Zara", color: "bg-gray-800" },
  { name: "H&M", color: "bg-red-600" },
  { name: "Levi's", color: "bg-blue-700" },
  { name: "Apple", color: "bg-gray-900" },
  { name: "Samsung", color: "bg-blue-500" },
];

const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      {/* ================= HERO ================= */}
      <section className="relative mb-28 rounded-3xl overflow-hidden bg-linear-to-br from-orange-500 via-orange-400 to-orange-600 shadow-2xl">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute top-10 left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-60 h-60 bg-white/10 rounded-full blur-3xl" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="relative px-6 py-28 text-center max-w-4xl mx-auto text-white"
        >
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
            className="inline-block bg-white/20 backdrop-blur-sm px-6 py-2 rounded-full text-sm font-semibold mb-6"
          >
            Since 2021
          </motion.span>
          <h1 className="text-4xl sm:text-5xl xl:text-7xl font-extrabold mb-6 leading-tight">
            About <span className="text-black drop-shadow-lg">ShopEase</span>
          </h1>
          <p className="text-white/90 text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto">
            We're on a mission to make online shopping effortless, enjoyable, and trustworthy for everyone around the globe.
          </p>
          <div className="flex justify-center gap-4 mt-10">
            <span className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm">
              <Star className="w-4 h-4" /> 4.8★ Rating
            </span>
            <span className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm">
              <Users className="w-4 h-4" /> 50K+ Customers
            </span>
            <span className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm">
              <Globe className="w-4 h-4" /> 50+ Countries
            </span>
          </div>
        </motion.div>
      </section>

      {/* ================= MISSION & VISION ================= */}
      <section className="mb-28">
        <div className="grid md:grid-cols-2 gap-10">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-900 p-10 rounded-3xl shadow-lg hover:shadow-2xl transition group"
          >
            <div className="w-16 h-16 rounded-2xl bg-orange-500/10 group-hover:bg-orange-500 transition flex items-center justify-center mb-6">
              <Target className="w-8 h-8 text-orange-500 group-hover:text-white transition" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
              To democratize quality shopping by providing a seamless, secure, and delightful e-commerce experience
              that empowers customers to discover and purchase products they love, at prices they deserve.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-900 p-10 rounded-3xl shadow-lg hover:shadow-2xl transition group"
          >
            <div className="w-16 h-16 rounded-2xl bg-orange-500/10 group-hover:bg-orange-500 transition flex items-center justify-center mb-6">
              <Eye className="w-8 h-8 text-orange-500 group-hover:text-white transition" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
              To become the world's most trusted and customer-centric e-commerce platform, where every purchase
              feels personal, every delivery brings joy, and every interaction builds lasting trust.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ================= STATS COUNTER ================= */}
      <section className="mb-28 rounded-3xl bg-linear-to-br from-orange-500 to-orange-600 py-20 shadow-2xl">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 text-center max-w-6xl mx-auto">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="text-white"
              >
                <Icon className="w-8 h-8 mx-auto mb-3 opacity-80" />
                <p className="text-3xl font-extrabold mb-1">{stat.value}</p>
                <p className="text-white/80 text-sm font-medium">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="mb-28">
        <div className="text-center mb-16">
          <span className="text-orange-500 font-semibold text-sm uppercase tracking-widest">What Sets Us Apart</span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-2">
            Why Choose <span className="text-orange-500">Us</span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-3 max-w-xl mx-auto">Six pillars that make ShopEase the preferred choice for millions.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl p-8 rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all text-center border border-gray-100 dark:border-gray-700"
              >
                <div className="flex justify-center mb-6">
                  <div className="p-4 rounded-2xl bg-orange-500/10 group-hover:bg-orange-500 transition">
                    <Icon className="w-8 h-8 text-orange-500 group-hover:text-white transition" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ================= TIMELINE / JOURNEY ================= */}
      <section className="mb-28">
        <div className="text-center mb-16">
          <span className="text-orange-500 font-semibold text-sm uppercase tracking-widest">Our Story</span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-2">The Journey So Far</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-3 max-w-xl mx-auto">From a simple idea to a global platform — here's how we grew.</p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-orange-200 hidden md:block" />
          {timeline.map(([year, text], i) => (
            <motion.div
              key={year}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex gap-6 items-start mb-10 relative"
            >
              <div className="hidden md:flex w-16 h-16 rounded-full bg-orange-500 text-white items-center justify-center font-bold text-sm shrink-0 shadow-lg z-10">
                {year}
              </div>
              <div className="md:hidden w-20 shrink-0">
                <span className="text-orange-500 font-bold text-lg">{year}</span>
              </div>
              <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-md hover:shadow-xl transition flex-1 border-l-4 border-orange-400">
                <p className="text-gray-700 dark:text-gray-200 leading-relaxed">{text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= TEAM ================= */}
      <section className="mb-28">
        <div className="text-center mb-16">
          <span className="text-orange-500 font-semibold text-sm uppercase tracking-widest">Leadership</span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-2">Meet Our <span className="text-orange-500">Team</span></h2>
          <p className="text-gray-500 dark:text-gray-400 mt-3 max-w-xl mx-auto">Talented people behind ShopEase working hard every day.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all text-center border border-gray-100 dark:border-gray-700"
            >
              <div className="w-24 h-24 mx-auto mb-5 rounded-full overflow-hidden ring-4 ring-orange-200 dark:ring-orange-800 group-hover:ring-orange-500 transition">
                <img src={member.img} alt={member.name} className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl font-bold mb-1">{member.name}</h3>
              <p className="text-orange-500 font-semibold text-sm mb-3">{member.role}</p>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{member.bio}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section className="mb-28 rounded-3xl bg-gray-50 dark:bg-gray-800 py-20 px-6">
        <div className="text-center mb-16">
          <span className="text-orange-500 font-semibold text-sm uppercase tracking-widest">Testimonials</span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-2">What Our <span className="text-orange-500">Customers</span> Say</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-3 max-w-xl mx-auto">Real reviews from real people who love shopping with us.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-md hover:shadow-xl transition relative"
            >
              <Quote className="absolute top-4 right-4 w-8 h-8 text-orange-100" />
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star key={idx} className={`w-4 h-4 ${idx < t.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-200 dark:text-gray-600"}`} />
                ))}
              </div>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6 italic">"{t.text}"</p>
              <div>
                <p className="font-semibold text-gray-800 dark:text-gray-100">{t.name}</p>
                <p className="text-sm text-gray-400 dark:text-gray-500">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= BRAND PARTNERS ================= */}
      <section className="mb-28">
        <div className="text-center mb-14">
          <span className="text-orange-500 font-semibold text-sm uppercase tracking-widest">Partners</span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-2">Trusted <span className="text-orange-500">Brands</span></h2>
          <p className="text-gray-500 dark:text-gray-400 mt-3 max-w-xl mx-auto">We partner with the world's leading brands to bring you the best.</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {brands.map((brand, i) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className={`${brand.color} text-white font-bold text-xl py-8 rounded-3xl text-center shadow-lg hover:shadow-2xl hover:-translate-y-1 transition cursor-pointer`}
            >
              {brand.name}
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="mb-32 rounded-3xl bg-linear-to-br from-orange-500 to-orange-600 py-20 px-6 text-center shadow-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Sparkles className="w-12 h-12 mx-auto text-white/80 mb-6" />
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-6">Ready to Start Shopping?</h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto mb-10">
            Join 50,000+ happy customers and experience the ShopEase difference today.
          </p>
          <div className="flex justify-center gap-4">
            <a href="/products" className="bg-white text-orange-500 font-bold px-10 py-4 rounded-xl hover:bg-orange-50 transition shadow-lg text-lg">
              Shop Now
            </a>
            <a href="/register" className="border-2 border-white text-white font-semibold px-10 py-4 rounded-xl hover:bg-white/10 transition text-lg">
              Create Account
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default About;
