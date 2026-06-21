import { useEffect, useMemo, useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import FestiveBanner from "../components/FestiveBanner";
import Newsletter from "../components/Newsletter";
import SectionHeading from "../components/SectionHeading";
import DealOfTheDay from "../components/DealOfTheDay";
import FlashSaleBanner from "../components/FlashSaleBanner";
import { api } from "../services/api";
import men from "../assets/men.jpeg";
import women from "../assets/women.jpeg";
import children from "../assets/children.jpeg";
import accessories from "../assets/Accessories.jpeg";
import summer from "../assets/summer.jpeg";
import winter from "../assets/winter.jpeg";
import wedding from "../assets/wedding.jpeg";
import Moonson from "../assets/Moonson.jpeg";
import lengha from "../assets/lengha.jpg";
import bridal from "../assets/bridal.jpeg";
import Streetwaer from "../assets/Streetwaer.jpeg";
import jacket from "../assets/jacket.jpeg";
import shirt from "../assets/shirt.jpeg";
import bags from "../assets/bags.jpeg";
import childcollection from "../assets/childcollection.jpeg";
import womcollection from "../assets/womcollection.jpeg";
import Eassy from "../assets/Eassy.png";
import Fastest from "../assets/Fastest.png";
import preminum from "../assets/preminum.png";
import support from "../assets/support.png";
import Diwali from "../assets/Diwali.jpeg";
import holi from "../assets/holi.jpeg";
import NavRatri from "../assets/NavRatri.jpg";
import RakshaBadhan from "../assets/RakshaBadhan.jpg";
import janmashtami from "../assets/janmashtami.jpg";
import hero from "../assets/hero.jpg";
import {
  Star, Truck, RefreshCcw, Headphones, ShieldCheck, ArrowUp,
  ChevronDown, ChevronRight, ShoppingBag, TrendingUp, Sparkles,
  Award, Tag, Heart, Package, Instagram, Facebook, Twitter, Youtube,
} from "lucide-react";

/* ================= DATA ================= */
const categories = [
  { name: "Mens", image: men },
  { name: "Womens", image: women },
  { name: "Children", image: children },
  { name: "Accessories", image: accessories },
];

const featuredBanners = [
  { title: "Winter Season", subtitle: "Fresh styles just dropped", image: winter, link: "/products" },
  { title: "Summer Season", subtitle: "Built for everyday comfort", image: summer, link: "/products" },
  { title: "Monsoon Season", subtitle: "Fresh styles just dropped", image: Moonson, link: "/products" },
  { title: "Wedding Season", subtitle: "Built for everyday comfort", image: wedding, link: "/products" },
  { title: "Bridal Dress", subtitle: "Fresh styles just dropped", image: bridal, link: "/products" },
  { title: "Groom Dress", subtitle: "Built for everyday comfort", image: lengha, link: "/products" },
  { title: "Trending Dress", subtitle: "Built for everyday comfort", image: Streetwaer, link: "/products" },
  { title: "Women Bags", subtitle: "Built for everyday comfort", image: bags, link: "/products" },
  { title: "Mens Latest Jackets", subtitle: "Built for everyday comfort", image: jacket, link: "/products" },
  { title: "Men All Types of T-shirts", subtitle: "Built for everyday comfort", image: shirt, link: "/products" },
  { title: "Children All Collection", subtitle: "Built for everyday comfort", image: childcollection, link: "/products" },
  { title: "Women All Collection", subtitle: "Built for everyday comfort", image: womcollection, link: "/products" },
];

const testimonials = [
  { name: "Vikas Jha", text: "ShopEase delivers a smooth and enjoyable online shopping experience. The website is easy to navigate, products are well-organized, and checkout is fast.", rating: 5 },
  { name: "Pooja Jha", text: "I'm very impressed with the quality of products available on ShopEase. Everything arrived exactly as described, well-packaged, and in perfect condition.", rating: 5 },
  { name: "Rahul Yadav", text: "The delivery service at ShopEase is excellent. My order arrived on time, and tracking updates were clear and accurate.", rating: 5 },
  { name: "Sachin", text: "Customer support at ShopEase is responsive and professional. My query was handled quickly, and the support team was polite.", rating: 4 },
  { name: "Anita", text: "ShopEase offers a clean, modern, and mobile-friendly website design. Browsing products feels smooth and pages load quickly.", rating: 5 },
  { name: "Sarfarz", text: "Pricing on ShopEase is fair and competitive. The platform frequently offers good deals and discounts without compromising on quality.", rating: 4 },
  { name: "Sourav", text: "Security and trust are strong points of ShopEase. Payments are safe, checkout is secure, and personal information is well protected.", rating: 5 },
  { name: "Aman", text: "ShopEase has quickly become my preferred online shopping platform. From product variety to service quality, everything feels reliable.", rating: 5 },
  { name: "Abhinav", text: "Overall, ShopEase makes online shopping simple, fast, and stress-free. With great products, reliable delivery, and excellent customer service.", rating: 5 },
];

const services = [
  { icon: support, title: "24/7 Support", desc: "We are always here to help you anytime, anywhere." },
  { icon: Fastest, title: "Fastest Delivery", desc: "Get your products delivered in record time." },
  { icon: Eassy, title: "Easy Returns", desc: "Hassle-free returns within 30 days." },
  { icon: preminum, title: "Premium Quality", desc: "We ensure the best quality products for you." },
];

const festiveBanners = [
  { image: holi, alt: "Holi Fashion", title: "Celebrate Style", highlight: "This Holi", subtitle: "Vibrant colors, bold designs, and festive comfort — fashion that shines with every celebration." },
  { image: janmashtami, alt: "Janmashtami Fashion", title: "Celebrate Style", highlight: "This Janmashtami", subtitle: "Vibrant colors, bold designs, and festive comfort — fashion that shines with every celebration." },
  { image: RakshaBadhan, alt: "Raksha Bandhan Fashion", title: "Celebrate Style", highlight: "This Raksha Bandhan", subtitle: "Vibrant colors, bold designs, and festive comfort — fashion that shines with every celebration." },
  { image: NavRatri, alt: "Navratri Fashion", title: "Celebrate Style", highlight: "This Navratri", subtitle: "Vibrant colors, bold designs, and festive comfort — fashion that shines with every celebration." },
  { image: Diwali, alt: "Diwali Fashion", title: "Celebrate Style", highlight: "This Diwali", subtitle: "Vibrant colors, bold designs, and festive comfort — fashion that shines with every celebration." },
];

const brands = [
  "Nike", "Adidas", "Zara", "H&M", "Puma", "Levi's", "Gucci", "Prada",
  "Versace", "Tommy", "Ray-Ban", "Fossil",
];

const blogPosts = [
  { title: "10 Summer Fashion Trends for 2026", excerpt: "Stay ahead of the curve with our curated list of must-have summer styles.", date: "Jun 15, 2026", tag: "Trends" },
  { title: "How to Style White Sneakers", excerpt: "The ultimate guide to making white sneakers work with any outfit.", date: "Jun 10, 2026", tag: "Style Guide" },
  { title: "Sustainable Fashion 101", excerpt: "Everything you need to know about building an eco-friendly wardrobe.", date: "Jun 5, 2026", tag: "Eco" },
  { title: "Accessorizing for Every Occasion", excerpt: "From casual to formal — the right accessories make all the difference.", date: "May 28, 2026", tag: "Accessories" },
];

const faqs = [
  { q: "What is your return policy?", a: "We offer hassle-free returns within 30 days of delivery. Items must be unworn with tags attached. Start a return from your profile page." },
  { q: "How long does shipping take?", a: "Standard shipping takes 5-7 business days. Express shipping (2-3 days) is available at checkout. Free shipping on orders over ₹500." },
  { q: "Do you ship internationally?", a: "Yes! We ship to over 50 countries worldwide. International delivery typically takes 7-14 business days. Duties and taxes may apply." },
  { q: "How can I track my order?", a: "Once your order ships, you will receive a tracking number via email. You can also check order status in your profile under 'My Orders'." },
  { q: "What payment methods do you accept?", a: "We accept Visa, Mastercard, American Express, PayPal, and Cash on Delivery (COD) for select locations." },
  { q: "Can I change or cancel my order?", a: "Orders can be modified within 1 hour of placement. Contact our support team immediately for changes." },
];

const featuresGrid = [
  { icon: Truck, title: "Free Shipping", desc: "On orders over ₹500" },
  { icon: ShieldCheck, title: "Secure Checkout", desc: "256-bit SSL encryption" },
  { icon: RefreshCcw, title: "Easy Returns", desc: "30-day return window" },
  { icon: Headphones, title: "24/7 Support", desc: "Dedicated help team" },
  { icon: Award, title: "Premium Quality", desc: "Curated collections" },
  { icon: Tag, title: "Best Prices", desc: "Price match guarantee" },
];

const socialPosts = [
  { gradient: "from-pink-500 to-rose-500", icon: Instagram },
  { gradient: "from-purple-500 to-indigo-500", icon: Instagram },
  { gradient: "from-yellow-400 to-orange-500", icon: Instagram },
  { gradient: "from-green-400 to-teal-500", icon: Instagram },
  { gradient: "from-blue-500 to-cyan-500", icon: Instagram },
  { gradient: "from-red-500 to-pink-600", icon: Instagram },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6 } }),
};

const StarRating = ({ rating }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map((s) => (
      <Star key={s} size={14} className={s <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} />
    ))}
  </div>
);

/* ================= COMPONENT ================= */
const Home = () => {
  const [products, setProducts] = useState([]);
  const [announceIdx, setAnnounceIdx] = useState(0);
  const [openFaq, setOpenFaq] = useState(null);
  const [showBackTop, setShowBackTop] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    api.get("/products").then((res) => setProducts(res.data)).catch(console.error);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setAnnounceIdx((p) => (p + 1) % 3), 4000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const onScroll = () => setShowBackTop(window.scrollY > 800);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const latestCollection = useMemo(
    () => [...products].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 8),
    [products]
  );

  const bestSellers = useMemo(
    () => [...products].sort((a, b) => (b.sales || 0) - (a.sales || 0)).slice(0, 8),
    [products]
  );

  const trendingProducts = useMemo(() => products.slice(0, 10), [products]);

  const announcements = [
    "Free Shipping on orders over ₹500!",
    "Use code WELCOME10 for 10% off your first order",
    "Flash Sale: Extra 20% off — Today Only!",
  ];

  return (
    <div className="max-w-full mx-auto overflow-x-hidden">
      {/* ===== SECTION 1: ANNOUNCEMENT BAR ===== */}
      <div className="bg-gray-900 text-white text-sm py-2.5 overflow-hidden relative">
        <motion.p
          key={announceIdx}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center font-medium tracking-wide"
        >
          {announcements[announceIdx]}
        </motion.p>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden sm:flex gap-3 text-xs text-gray-400">
          <span className="hover:text-white cursor-pointer">Help</span>
          <span className="hover:text-white cursor-pointer">Track Order</span>
          <span className="hover:text-white cursor-pointer">USD ↓</span>
        </div>
      </div>

      {/* ===== SECTION 2: HERO ===== */}
      <section className="relative min-h-screen flex items-center overflow-hidden rounded-none sm:rounded-3xl sm:mx-2 lg:mx-8">
        <motion.img
          src={hero}
          alt="Fashion Background"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 8, ease: "easeOut" }}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/50 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-28 w-full">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              className="text-center lg:text-left"
            >
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-block mb-6 px-5 py-2 text-sm font-semibold tracking-wide rounded-full bg-orange-500/15 text-orange-400 border border-orange-400/30"
              >
                New 2026 Collection
              </motion.span>
              <h1 className="text-4xl sm:text-5xl xl:text-7xl font-extrabold leading-tight mb-6 text-white">
                Fashion That{" "}
                <span className="bg-linear-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent drop-shadow-lg">
                  Moves
                </span>{" "}
                With You
              </h1>
              <p className="text-white/80 mb-12 text-base sm:text-lg max-w-xl mx-auto lg:mx-0">
                Bold silhouettes, premium comfort, and timeless confidence —
                crafted for modern lifestyles and everyday movement.
              </p>
              <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
                <Link
                  to="/products"
                  className="inline-flex items-center justify-center gap-2 bg-orange-500 text-black px-10 py-4 rounded-2xl font-bold shadow-2xl hover:bg-orange-600 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-400/50 transition-all duration-300"
                >
                  <ShoppingBag size={20} /> Shop Collection
                </Link>
                <Link
                  to="/about"
                  className="inline-flex items-center justify-center border border-white/40 text-white px-10 py-4 rounded-2xl font-semibold hover:bg-white hover:text-black transition-all duration-300"
                >
                  Learn More
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="hidden lg:block"
            >
              <div className="relative bg-white/10 backdrop-blur-2xl rounded-3xl p-12 shadow-[0_20px_80px_rgba(0,0,0,0.45)] border border-white/20">
                <Sparkles className="text-yellow-400 w-8 h-8 mb-4" />
                <h3 className="text-3xl font-bold mb-4 text-white">New Season Drop</h3>
                <p className="text-white/70 mb-8 text-lg">Designed for motion. Styled for impact.</p>
                <div className="flex items-center justify-between">
                  <span className="text-orange-400 font-bold text-xl">From ₹999</span>
                  <Link to="/products" className="text-white font-semibold hover:text-orange-400 transition flex items-center gap-1">
                    Explore <ChevronRight size={16} />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 3: TRUST BADGES ===== */}
      <section className="py-12 -mt-20 relative z-20 max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: ShoppingBag, label: "Products", value: "500+" },
            { icon: Heart, label: "Happy Customers", value: "10K+" },
            { icon: Star, label: "Avg Rating", value: "4.9★" },
            { icon: Award, label: "Brands", value: "50+" },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.1 }}
              className="bg-white rounded-2xl shadow-xl p-5 flex items-center gap-4 hover:shadow-2xl transition"
            >
              <div className="bg-orange-100 p-3 rounded-xl">
                <s.icon className="text-orange-500 w-6 h-6" />
              </div>
              <div>
                <p className="text-2xl font-extrabold text-gray-800">{s.value}</p>
                <p className="text-gray-500 text-sm">{s.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== SECTION 4: FEATURED CATEGORIES ===== */}
      <section className="mb-16 px-4 sm:px-6 lg:px-8">
        <SectionHeading subtitle="Shop by category to find exactly what you need">
          Explore Categories
        </SectionHeading>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.name}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              custom={i}
            >
              <Link
                to={`/category/${cat.name.toLowerCase()}`}
                className="group relative block overflow-hidden rounded-3xl shadow-xl"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="h-80 w-full object-cover group-hover:scale-110 transition duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-white text-3xl font-bold tracking-wide">{cat.name}</h3>
                  <p className="text-white/70 text-sm mt-1 opacity-0 group-hover:opacity-100 transition">
                    Shop Now →
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== SECTION 5: DEAL OF THE DAY ===== */}
      <div className="px-4 sm:px-6 lg:px-8">
        <DealOfTheDay product={products[0]} />
      </div>

      {/* ===== SECTION 6: WHY SHOP WITH US ===== */}
      <section className="mb-16 bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
        <SectionHeading subtitle="We go above and beyond to make your shopping experience exceptional">
          Why Shop With Us
        </SectionHeading>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-10 max-w-6xl mx-auto">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              custom={i}
              className="bg-white p-8 rounded-3xl shadow-lg flex flex-col items-center text-center hover:scale-105 hover:shadow-xl transition-all"
            >
              <div className="bg-orange-100 p-4 rounded-2xl mb-4">
                <img src={s.icon} alt={s.title} className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-bold mb-2">{s.title}</h3>
              <p className="text-gray-600">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== SECTION 7: TRENDING NOW ===== */}
      <section className="mb-16 px-4 sm:px-6 lg:px-8">
        <SectionHeading subtitle="The most popular styles right now">
          <TrendingUp className="inline w-8 h-8 text-orange-500 -mt-1" /> Trending Now
        </SectionHeading>
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-thin max-w-7xl mx-auto"
          style={{ scrollbarWidth: "thin" }}
        >
          {trendingProducts.map((p, i) => (
            <motion.div
              key={p._id}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="min-w-[260px] snap-start"
            >
              <ProductCard product={p} />
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 border-2 border-orange-500 text-orange-500 px-8 py-3 rounded-2xl font-bold hover:bg-orange-500 hover:text-white transition"
          >
            View All Products <ChevronRight size={18} />
          </Link>
        </div>
      </section>

      {/* ===== SECTION 8: FESTIVE BANNER — HOLI ===== */}
      <div className="px-4 sm:px-6 lg:px-8">
        <FestiveBanner {...festiveBanners[0]} />
      </div>

      {/* ===== SECTION 9: NEW ARRIVALS ===== */}
      <section className="mb-16 px-4 sm:px-6 lg:px-8">
        <SectionHeading subtitle="Check out our freshest drops">
          <Sparkles className="inline w-7 h-7 text-orange-500 -mt-1" /> New Arrivals
        </SectionHeading>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {latestCollection.length
            ? latestCollection.map((p) => <ProductCard key={p._id} product={p} />)
            : <p className="text-center text-gray-500 col-span-full">No products found.</p>}
        </div>
        <div className="text-center mt-10">
          <Link
            to="/products"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-10 py-3 rounded-2xl font-bold shadow-lg hover:shadow-xl transition"
          >
            Discover More
          </Link>
        </div>
      </section>

      {/* ===== SECTION 10: FLASH SALE ===== */}
      <div className="px-4 sm:px-6 lg:px-8">
        <FlashSaleBanner />
      </div>

      {/* ===== SECTION 11: BEST SELLERS ===== */}
      <section className="mb-16 px-4 sm:px-6 lg:px-8">
        <SectionHeading subtitle="Our most popular products loved by customers">
          <Award className="inline w-7 h-7 text-orange-500 -mt-1" /> Best Sellers
        </SectionHeading>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {bestSellers.length
            ? bestSellers.map((p) => <ProductCard key={p._id} product={p} />)
            : <p className="text-center text-gray-500 col-span-full">No products found.</p>}
        </div>
        <div className="text-center mt-10">
          <Link
            to="/products"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-10 py-3 rounded-2xl font-bold shadow-lg hover:shadow-xl transition"
          >
            View Best Sellers
          </Link>
        </div>
      </section>

      {/* ===== SECTION 12: FESTIVE BANNER — JANMASHTAMI ===== */}
      <div className="px-4 sm:px-6 lg:px-8">
        <FestiveBanner {...festiveBanners[1]} />
      </div>

      {/* ===== SECTION 13: BRAND PARTNERS ===== */}
      <section className="mb-16 py-16 overflow-hidden">
        <SectionHeading subtitle="We partner with the world's leading brands">
          Our Brands
        </SectionHeading>
        <div className="relative max-w-7xl mx-auto">
          <div className="flex gap-12 animate-scroll" style={{ animation: "scrollBrands 30s linear infinite" }}>
            {[...brands, ...brands].map((brand, i) => (
              <div
                key={i}
                className="flex-shrink-0 px-8 py-4 bg-gray-50 rounded-2xl border border-gray-100 hover:border-orange-200 hover:shadow-lg transition"
              >
                <span className="text-xl font-extrabold text-gray-400 hover:text-orange-500 transition tracking-widest uppercase">
                  {brand}
                </span>
              </div>
            ))}
          </div>
        </div>
        <style>{`
          @keyframes scrollBrands {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
      </section>

      {/* ===== SECTION 14: TESTIMONIALS ===== */}
      <section className="mb-16 bg-gradient-to-br from-orange-50 to-white py-24 px-4 sm:px-6 lg:px-8">
        <SectionHeading subtitle="Hear from our happy customers">
          What Our Customers Say
        </SectionHeading>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              custom={i}
              className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-shadow border border-gray-50"
            >
              <StarRating rating={t.rating} />
              <p className="text-gray-700 mt-4 mb-6 leading-relaxed">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-sm">
                  {t.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <p className="font-bold text-gray-800">{t.name}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== SECTION 15: FESTIVE BANNER — RAKSHA BANDHAN ===== */}
      <div className="px-4 sm:px-6 lg:px-8">
        <FestiveBanner {...festiveBanners[2]} />
      </div>

      {/* ===== SECTION 16: FASHION BLOG ===== */}
      <section className="mb-16 px-4 sm:px-6 lg:px-8">
        <SectionHeading subtitle="Style tips, trends, and stories from our team">
          From the Blog
        </SectionHeading>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {blogPosts.map((post, i) => (
            <motion.div
              key={post.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              custom={i}
              className="group cursor-pointer"
            >
              <div className="bg-gradient-to-br from-orange-100 to-orange-50 h-48 rounded-3xl mb-4 flex items-center justify-center overflow-hidden">
                <div className="text-6xl opacity-30 group-hover:scale-110 transition">📰</div>
              </div>
              <span className="text-xs font-semibold text-orange-500 uppercase tracking-wider">{post.tag}</span>
              <h3 className="font-bold text-lg mt-1 group-hover:text-orange-500 transition">{post.title}</h3>
              <p className="text-gray-500 text-sm mt-2 line-clamp-2">{post.excerpt}</p>
              <p className="text-gray-400 text-xs mt-3">{post.date}</p>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-10">
          <button className="border-2 border-orange-500 text-orange-500 px-8 py-3 rounded-2xl font-bold hover:bg-orange-500 hover:text-white transition">
            View All Articles
          </button>
        </div>
      </section>

      {/* ===== SECTION 17: FESTIVE BANNER — NAVRATRI ===== */}
      <div className="px-4 sm:px-6 lg:px-8">
        <FestiveBanner {...festiveBanners[3]} />
      </div>

      {/* ===== SECTION 18: FEATURES GRID ===== */}
      <section className="mb-16 py-16 px-4 sm:px-6 lg:px-8">
        <SectionHeading subtitle="Everything you need for a seamless shopping experience">
          Why Choose ShopEase
        </SectionHeading>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {featuresGrid.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                custom={i}
                className="flex items-start gap-5 p-6 rounded-2xl hover:bg-orange-50 transition group"
              >
                <div className="bg-orange-100 p-3 rounded-xl group-hover:bg-orange-500 transition">
                  <Icon className="w-6 h-6 text-orange-500 group-hover:text-white transition" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">{f.title}</h3>
                  <p className="text-gray-500">{f.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ===== SECTION 19: FESTIVE BANNER — DIWALI ===== */}
      <div className="px-4 sm:px-6 lg:px-8">
        <FestiveBanner {...festiveBanners[4]} />
      </div>

      {/* ===== SECTION 20: FAQ ===== */}
      <section className="mb-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <SectionHeading subtitle="Got questions? We've got answers.">
          Frequently Asked Questions
        </SectionHeading>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={faq.q}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="border border-gray-200 rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left font-semibold hover:bg-orange-50 transition"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  size={18}
                  className={`text-orange-500 transition-transform ${openFaq === i ? "rotate-180" : ""}`}
                />
              </button>
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: openFaq === i ? "auto" : 0 }}
                className="overflow-hidden"
              >
                <p className="px-5 pb-5 text-gray-600 leading-relaxed">{faq.a}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== SECTION 21: INSTAGRAM / SOCIAL FEED ===== */}
      <section className="mb-16 px-4 sm:px-6 lg:px-8">
        <SectionHeading subtitle="Tag us @shopease for a chance to be featured">
          <Instagram className="inline w-7 h-7 text-orange-500 -mt-1" /> Follow Us
        </SectionHeading>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 max-w-6xl mx-auto">
          {socialPosts.map((post, i) => {
            const Icon = post.icon;
            return (
              <motion.a
                key={i}
                href="#"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                custom={i}
                className={`bg-gradient-to-br ${post.gradient} aspect-square rounded-2xl flex items-center justify-center hover:scale-105 transition cursor-pointer relative group`}
              >
                <Icon className="w-8 h-8 text-white opacity-60 group-hover:opacity-100 transition" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 rounded-2xl transition" />
              </motion.a>
            );
          })}
        </div>
        <div className="flex justify-center gap-4 mt-8">
          {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
            <a
              key={i}
              href="#"
              className="p-3 bg-gray-100 rounded-full hover:bg-orange-500 hover:text-white transition shadow"
            >
              <Icon size={20} />
            </a>
          ))}
        </div>
      </section>

      {/* ===== SECTION 22: NEWSLETTER ===== */}
      <div className="px-4 sm:px-6 lg:px-8">
        <Newsletter />
      </div>

      {/* ===== SECTION 23: FEATURED BANNERS GRID ===== */}
      <section className="mb-16 px-4 sm:px-6 lg:px-8">
        <SectionHeading subtitle="Explore our seasonal and special collections">
          Featured Collections
        </SectionHeading>
        <div className="grid md:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {featuredBanners.map((b, i) => (
            <motion.div
              key={b.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              custom={i}
              className="relative rounded-3xl overflow-hidden shadow-2xl group"
            >
              <img src={b.image} alt={b.title} className="h-80 w-full object-cover group-hover:scale-105 transition duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h3 className="text-3xl font-extrabold text-white mb-1">{b.title}</h3>
                <p className="text-white/70 mb-4">{b.subtitle}</p>
                <Link
                  to={b.link}
                  className="inline-flex items-center gap-1 bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-xl font-semibold text-sm transition"
                >
                  Explore <ChevronRight size={16} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== BACK TO TOP ===== */}
      <motion.button
        onClick={scrollToTop}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: showBackTop ? 1 : 0, scale: showBackTop ? 1 : 0 }}
        className="fixed bottom-8 right-8 z-50 bg-orange-500 text-white p-4 rounded-full shadow-2xl hover:bg-orange-600 hover:scale-110 transition"
      >
        <ArrowUp size={24} />
      </motion.button>
    </div>
  );
};

export default Home;
