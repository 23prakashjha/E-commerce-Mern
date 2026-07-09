import { useEffect, useMemo, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
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
import hero from "../assets/hero.jpg";
import {
  Star, Truck, RefreshCcw, Headphones, ShieldCheck, ArrowUp,
  ChevronDown, ChevronRight, ChevronLeft, ShoppingBag, TrendingUp, Sparkles,
  Award, Tag, Heart, Package, Instagram, Facebook, Twitter, Youtube,
  Zap, Clock, Shield, Flame, Gem, Sun, Gift,
} from "lucide-react";

/* ================= DATA ================= */
const categories = [
  { name: "Mens", image: men },
  { name: "Womens", image: women },
  { name: "Children", image: children },
  { name: "Accessories", image: accessories },
];

const promoBanners = [
  { title: "New Arrivals", subtitle: "Fresh styles, just landed", gradient: "from-blue-600 via-blue-500 to-cyan-400", icon: Sparkles },
  { title: "Premium Collection", subtitle: "Elevate your everyday style", gradient: "from-purple-600 via-purple-500 to-pink-400", icon: Gem },
  { title: "Best Sellers", subtitle: "Loved by thousands", gradient: "from-orange-500 via-red-500 to-pink-500", icon: Award },
  { title: "Limited Edition", subtitle: "While stocks last", gradient: "from-rose-600 via-pink-500 to-fuchsia-400", icon: Zap },
  { title: "Trending Now", subtitle: "What everyone's wearing", gradient: "from-teal-500 via-cyan-500 to-blue-400", icon: Flame },
  { title: "Exclusive Deals", subtitle: "Up to 70% off", gradient: "from-amber-500 via-yellow-500 to-orange-400", icon: Tag },
  { title: "Luxury Edit", subtitle: "Curated premium picks", gradient: "from-indigo-600 via-purple-600 to-violet-400", icon: Star },
  { title: "Daily Essentials", subtitle: "Your wardrobe staples", gradient: "from-emerald-500 via-green-500 to-teal-400", icon: ShoppingBag },
  { title: "Weekend Special", subtitle: "Limited time offers", gradient: "from-violet-500 via-fuchsia-500 to-pink-400", icon: Clock },
  { title: "Top Rated", subtitle: "Customer favorites", gradient: "from-rose-500 via-pink-500 to-orange-400", icon: Heart },
  { title: "Must Haves", subtitle: "Don't miss out", gradient: "from-sky-500 via-indigo-500 to-blue-400", icon: Sparkles },
  { title: "Style Edit", subtitle: "Curated for you", gradient: "from-orange-400 via-pink-500 to-rose-400", icon: Package },
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
  { icon: Headphones, title: "24/7 Support", desc: "We are always here to help you anytime, anywhere." },
  { icon: Truck, title: "Fastest Delivery", desc: "Get your products delivered in record time." },
  { icon: RefreshCcw, title: "Easy Returns", desc: "Hassle-free returns within 30 days." },
  { icon: ShieldCheck, title: "Premium Quality", desc: "We ensure the best quality products for you." },
];

const promoFullBanners = [
  { title: "Mega Sale", highlight: "Up to 70% Off", subtitle: "Biggest sale of the season. Shop now before it ends!", gradient: "from-orange-600 via-red-500 to-pink-600", icon: Gift },
  { title: "New Season", highlight: "Fresh Arrivals", subtitle: "Explore the latest trends — updated weekly.", gradient: "from-blue-600 via-purple-500 to-pink-500", icon: Sun },
  { title: "Free Shipping", highlight: "On All Orders", subtitle: "No minimum. Limited time offer.", gradient: "from-teal-600 via-emerald-500 to-green-400", icon: Truck },
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

const blogGradients = [
  "from-blue-400 to-purple-500",
  "from-emerald-400 to-teal-500",
  "from-orange-400 to-red-500",
  "from-pink-400 to-rose-500",
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

const CountUp = ({ value, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const duration = 1500;
    const steps = 30;
    const increment = parseInt(value) / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= parseInt(value)) {
        setCount(parseInt(value));
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, value]);

  return <span ref={ref}>{count}{suffix}</span>;
};

const ProductSkeleton = () => (
  <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
    {[1, 2, 3, 4].map((i) => (
      <div key={i} className="bg-white rounded-2xl shadow-sm overflow-hidden animate-pulse">
        <div className="aspect-[4/5] bg-gray-200" />
        <div className="p-4 space-y-3">
          <div className="h-4 bg-gray-200 rounded w-3/4" />
          <div className="h-4 bg-gray-200 rounded w-1/2" />
        </div>
      </div>
    ))}
  </div>
);

const AnnouncementBar = () => {
  const [idx, setIdx] = useState(0);
  const announcements = [
    "Free Shipping on orders over ₹500!",
    "Use code WELCOME10 for 10% off your first order",
    "Flash Sale: Extra 20% off — Today Only!",
  ];

  useEffect(() => {
    const id = setInterval(() => setIdx((p) => (p + 1) % announcements.length), 4000);
    return () => clearInterval(id);
  }, [announcements.length]);

  return (
    <div className="bg-gray-900 text-white text-sm py-2.5 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-center">
        <Zap size={14} className="text-orange-400 mr-2 shrink-0" />
        <motion.p
          key={idx}
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -16, opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="text-center font-medium"
        >
          {announcements[idx]}
        </motion.p>
      </div>
      <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden sm:flex gap-3 text-xs text-gray-400">
        <span className="hover:text-white cursor-pointer transition">Help</span>
        <span className="hover:text-white cursor-pointer transition">Track Order</span>
        <span className="hover:text-white cursor-pointer transition">USD ↓</span>
      </div>
      <div className="absolute left-1/2 -translate-x-1/2 bottom-1 flex gap-1.5">
        {announcements.map((_, i) => (
          <span key={i} className={`w-1.5 h-1.5 rounded-full transition-colors ${i === idx ? "bg-orange-400" : "bg-gray-600"}`} />
        ))}
      </div>
    </div>
  );
};

/* ================= COMPONENT ================= */
const Home = () => {
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [openFaq, setOpenFaq] = useState(null);
  const [showBackTop, setShowBackTop] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    api.get("/products")
      .then((res) => setProducts(res.data))
      .catch(console.error)
      .finally(() => setProductsLoading(false));
  }, []);

  useEffect(() => {
    const onScroll = () => setShowBackTop(window.scrollY > 800);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const scrollTrending = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir * 300, behavior: "smooth" });
    }
  };

  const latestCollection = useMemo(
    () => [...products].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 8),
    [products]
  );

  const bestSellers = useMemo(
    () => [...products].sort((a, b) => (b.sales || 0) - (a.sales || 0)).slice(0, 8),
    [products]
  );

  const trendingProducts = useMemo(() => products.slice(0, 10), [products]);

  const heroDecor = [
    { icon: Truck, label: "Free Shipping", color: "bg-green-500" },
    { icon: Shield, label: "Secure", color: "bg-blue-500" },
    { icon: Clock, label: "24/7 Support", color: "bg-purple-500" },
  ];

  return (
    <div className="max-w-full mx-auto overflow-x-hidden">
      {/* ===== SECTION 1: ANNOUNCEMENT BAR ===== */}
      <AnnouncementBar />

      {/* ===== SECTION 2: HERO ===== */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden rounded-none sm:rounded-3xl sm:mx-2 lg:mx-8">
        <motion.img
          src={hero}
          alt="Fashion Background"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 8, ease: "easeOut" }}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-r from-black/85 via-black/60 to-transparent" />

        {/* Floating decorative elements */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 0.15, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="absolute top-20 right-20 w-64 h-64 rounded-full bg-orange-500 blur-[120px] hidden lg:block"
        />
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 0.1, y: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="absolute bottom-20 left-20 w-48 h-48 rounded-full bg-white blur-[100px] hidden lg:block"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
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
                className="inline-flex items-center gap-2 mb-6 px-5 py-2 text-sm font-semibold tracking-wide rounded-full bg-orange-500/15 text-orange-400 border border-orange-400/30"
              >
                <Sparkles size={14} /> New 2026 Collection
              </motion.span>

              <h1 className="text-4xl sm:text-5xl xl:text-7xl font-extrabold leading-tight mb-6 text-white">
                Fashion That{" "}
                <span className="bg-linear-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent drop-shadow-lg">
                  Moves
                </span>{" "}
                With You
              </h1>

              <p className="text-white/80 mb-10 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Bold silhouettes, premium comfort, and timeless confidence —
                crafted for modern lifestyles and everyday movement.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  to="/products"
                  className="inline-flex items-center justify-center gap-2 bg-orange-500 text-white px-10 py-4 rounded-2xl font-bold shadow-2xl hover:bg-orange-600 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-400/50 transition-all duration-300 text-base"
                >
                  <ShoppingBag size={20} /> Shop Collection
                </Link>
                <Link
                  to="/about"
                  className="inline-flex items-center justify-center gap-2 border border-white/30 text-white px-10 py-4 rounded-2xl font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300 backdrop-blur-sm text-base"
                >
                  Learn More <ChevronRight size={18} />
                </Link>
              </div>

              {/* Floating badges */}
              <div className="flex flex-wrap gap-3 mt-10 justify-center lg:justify-start">
                {heroDecor.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + i * 0.15 }}
                      className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white/90 text-xs sm:text-sm border border-white/10"
                    >
                      <Icon size={14} className="text-orange-400" />
                      {item.label}
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="hidden lg:block"
            >
              <div className="relative bg-white/10 backdrop-blur-2xl rounded-3xl p-10 shadow-[0_20px_80px_rgba(0,0,0,0.45)] border border-white/20">
                <div className="absolute -top-4 -right-4 bg-orange-500 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
                  NEW
                </div>
                <Sparkles className="text-yellow-400 w-8 h-8 mb-4" />
                <h3 className="text-3xl font-bold mb-3 text-white">New Season Drop</h3>
                <p className="text-white/70 mb-6 text-lg">Designed for motion. Styled for impact.</p>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-orange-400 font-bold text-2xl">From ₹999</span>
                    <p className="text-white/50 text-xs mt-1">Limited stock available</p>
                  </div>
                  <Link to="/products" className="text-white font-semibold hover:text-orange-400 transition flex items-center gap-1 text-lg">
                    Explore <ChevronRight size={18} />
                  </Link>
                </div>
              </div>

              {/* Stats card */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="mt-6 bg-white/10 backdrop-blur-2xl rounded-2xl p-5 border border-white/20 flex items-center justify-around"
              >
                {[{ value: "500+", label: "Products" }, { value: "10K+", label: "Customers" }, { value: "4.9", label: "Rating" }].map((s) => (
                  <div key={s.label} className="text-center">
                    <p className="text-white font-bold text-lg">{s.value}</p>
                    <p className="text-white/60 text-xs">{s.label}</p>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 3: TRUST BADGES ===== */}
      <section className="py-10 -mt-10 relative z-20 max-w-6xl mx-auto px-4">
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
              className="bg-white rounded-2xl shadow-lg p-5 flex items-center gap-4 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-gray-50"
            >
              <div className="bg-orange-100 p-3 rounded-xl shrink-0">
                <s.icon className="text-orange-500 w-6 h-6" />
              </div>
              <div>
                <p className="text-2xl font-extrabold text-gray-800"><CountUp value={s.value.replace(/[^0-9]/g, "")} suffix={s.value.includes("K") ? "K+" : s.value.includes("★") ? "★" : "+"} /></p>
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
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
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
                className="group relative block overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl transition-shadow"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="h-80 w-full object-cover group-hover:scale-110 transition duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute inset-0 bg-orange-500/0 group-hover:bg-orange-500/20 transition-colors duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-white text-3xl font-bold tracking-wide">{cat.name}</h3>
                  <div className="flex items-center gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <span className="text-orange-400 text-sm font-semibold">Shop Now</span>
                    <ChevronRight size={16} className="text-orange-400" />
                  </div>
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
      <section className="mb-16 bg-gradient-to-br from-gray-50 to-gray-100 py-16 px-4 sm:px-6 lg:px-8">
        <SectionHeading subtitle="We go above and beyond to make your shopping experience exceptional">
          Why Shop With Us
        </SectionHeading>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              custom={i}
              className="bg-white p-8 rounded-3xl shadow-lg flex flex-col items-center text-center hover:scale-[1.03] hover:shadow-2xl transition-all duration-300 border border-gray-50"
            >
              <div className="bg-orange-100 p-4 rounded-2xl mb-4 group-hover:bg-orange-500 transition-colors">
                <s.icon className="w-12 h-12 text-orange-500 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold mb-2">{s.title}</h3>
              <p className="text-gray-600 leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== SECTION 7: TRENDING NOW ===== */}
      <section className="mb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <SectionHeading subtitle="The most popular styles right now">
              <TrendingUp className="inline w-7 h-7 text-orange-500 -mt-1" /> Trending Now
            </SectionHeading>
            <div className="hidden sm:flex gap-2">
              <button onClick={() => scrollTrending(-1)} className="p-2.5 rounded-full border border-gray-200 hover:bg-orange-50 hover:border-orange-300 transition" aria-label="Scroll left">
                <ChevronLeft size={18} className="text-gray-600" />
              </button>
              <button onClick={() => scrollTrending(1)} className="p-2.5 rounded-full border border-gray-200 hover:bg-orange-50 hover:border-orange-300 transition" aria-label="Scroll right">
                <ChevronRight size={18} className="text-gray-600" />
              </button>
            </div>
          </div>
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-thin"
            style={{ scrollbarWidth: "thin" }}
          >
            {productsLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="min-w-[260px] animate-pulse">
                  <div className="bg-white rounded-2xl overflow-hidden">
                    <div className="aspect-[4/5] bg-gray-200" />
                    <div className="p-4 space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-3/4" />
                      <div className="h-4 bg-gray-200 rounded w-1/3" />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              trendingProducts.map((p, i) => (
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
              ))
            )}
          </div>
          <div className="text-center mt-8">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 border-2 border-orange-500 text-orange-500 px-8 py-3 rounded-2xl font-bold hover:bg-orange-500 hover:text-white transition-all duration-300"
            >
              View All Products <ChevronRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== PROMO BANNER 1 ===== */}
      <div className="px-4 sm:px-6 lg:px-8">
        <FestiveBanner {...promoFullBanners[0]} />
      </div>

      <section className="mb-16 px-4 sm:px-6 lg:px-8">
        <SectionHeading subtitle="Check out our freshest drops">
          <Sparkles className="inline w-7 h-7 text-orange-500 -mt-1" /> New Arrivals
        </SectionHeading>
        {productsLoading ? (
          <ProductSkeleton />
        ) : latestCollection.length ? (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {latestCollection.map((p) => <ProductCard key={p._id} product={p} />)}
          </div>
        ) : (
          <p className="text-center text-gray-500 col-span-full py-12">No products found.</p>
        )}
        <div className="text-center mt-10">
          <Link to="/products" className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-10 py-3 rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all duration-300">
            Discover More
          </Link>
        </div>
      </section>

      <div className="px-4 sm:px-6 lg:px-8">
        <FlashSaleBanner />
      </div>

      <section className="mb-16 px-4 sm:px-6 lg:px-8">
        <SectionHeading subtitle="Our most popular products loved by customers">
          <Award className="inline w-7 h-7 text-orange-500 -mt-1" /> Best Sellers
        </SectionHeading>
        {productsLoading ? (
          <ProductSkeleton />
        ) : bestSellers.length ? (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {bestSellers.map((p) => <ProductCard key={p._id} product={p} />)}
          </div>
        ) : (
          <p className="text-center text-gray-500 col-span-full py-12">No products found.</p>
        )}
        <div className="text-center mt-10">
          <Link to="/products" className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-10 py-3 rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all duration-300">
            View Best Sellers
          </Link>
        </div>
      </section>

      {/* ===== SECTION 13: BRAND PARTNERS ===== */}
      <section className="mb-16 py-16 overflow-hidden">
        <SectionHeading subtitle="We partner with the world's leading brands">
          Our Brands
        </SectionHeading>
        <div className="relative max-w-7xl mx-auto">
          <div className="flex gap-8" style={{ animation: "scrollBrands 30s linear infinite" }}>
            {[...brands, ...brands].map((brand, i) => (
              <div
                key={i}
                className="flex-shrink-0 px-8 py-4 bg-white rounded-2xl border border-gray-100 hover:border-orange-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
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
              <p className="text-gray-700 mt-4 mb-6 leading-relaxed italic">"{t.text}"</p>
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
              <div className={`bg-gradient-to-br ${blogGradients[i]} h-48 rounded-3xl mb-4 flex items-center justify-center overflow-hidden relative`}>
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
                <div className="text-5xl font-bold text-white/30 group-hover:scale-110 transition-transform duration-500 select-none">
                  {post.tag[0]}
                </div>
              </div>
              <span className="text-xs font-semibold text-orange-500 uppercase tracking-wider">{post.tag}</span>
              <h3 className="font-bold text-lg mt-1 group-hover:text-orange-500 transition-colors">{post.title}</h3>
              <p className="text-gray-500 text-sm mt-2 line-clamp-2 leading-relaxed">{post.excerpt}</p>
              <p className="text-gray-400 text-xs mt-3 flex items-center gap-1">
                <Clock size={12} /> {post.date}
              </p>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-10">
          <button className="border-2 border-orange-500 text-orange-500 px-8 py-3 rounded-2xl font-bold hover:bg-orange-500 hover:text-white transition-all duration-300">
            View All Articles
          </button>
        </div>
      </section>

      {/* ===== PROMO BANNER 2 ===== */}
      <div className="px-4 sm:px-6 lg:px-8">
        <FestiveBanner {...promoFullBanners[1]} />
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
                className="flex items-start gap-5 p-6 rounded-2xl hover:bg-orange-50 transition-all duration-300 group border border-transparent hover:border-orange-100"
              >
                <div className="bg-orange-100 p-3 rounded-xl group-hover:bg-orange-500 transition-colors shrink-0">
                  <Icon className="w-6 h-6 text-orange-500 group-hover:text-white transition-colors" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">{f.title}</h3>
                  <p className="text-gray-500 text-sm mt-1">{f.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ===== SECTION 20: FAQ ===== */}
      <section className="mb-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <SectionHeading subtitle="Got questions? We've got answers.">
          Frequently Asked Questions
        </SectionHeading>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={faq.q}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-orange-200 transition-colors"
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left font-semibold text-gray-800 hover:bg-orange-50/50 transition-colors"
              >
                <span className="pr-4">{faq.q}</span>
                <ChevronDown
                  size={18}
                  className={`text-orange-500 transition-all duration-300 shrink-0 ${
                    openFaq === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              <motion.div
                initial={false}
                animate={{
                  height: openFaq === i ? "auto" : 0,
                  opacity: openFaq === i ? 1 : 0,
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <p className="px-5 pb-5 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">{faq.a}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== SECTION 21: SOCIAL FEED ===== */}
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
                className={`bg-gradient-to-br ${post.gradient} aspect-square rounded-2xl flex items-center justify-center hover:scale-105 hover:rotate-2 transition-all duration-300 cursor-pointer relative group shadow-lg`}
              >
                <Icon className="w-8 h-8 text-white opacity-70 group-hover:opacity-100 transition-all group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 rounded-2xl transition-colors" />
              </motion.a>
            );
          })}
        </div>
        <div className="flex justify-center gap-4 mt-8">
          {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
            <a
              key={i}
              href="#"
              className="p-3 bg-gray-100 rounded-full hover:bg-orange-500 hover:text-white transition-all duration-300 shadow hover:shadow-lg hover:-translate-y-1"
            >
              <Icon size={20} />
            </a>
          ))}
        </div>
      </section>

      {/* ===== PROMO BANNER 3 ===== */}
      <div className="px-4 sm:px-6 lg:px-8">
        <FestiveBanner {...promoFullBanners[2]} />
      </div>

      {/* ===== SECTION 22: NEWSLETTER ===== */}
      <div className="px-4 sm:px-6 lg:px-8">
        <Newsletter />
      </div>

      {/* ===== SECTION 23: PROMO GRID ===== */}
      <section className="mb-16 px-4 sm:px-6 lg:px-8">
        <SectionHeading subtitle="Curated collections for every style">
          <Sparkles className="inline w-7 h-7 text-orange-500 -mt-1" /> Shop by Collection
        </SectionHeading>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {promoBanners.map((b, i) => {
            const Icon = b.icon;
            return (
              <motion.div
                key={b.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                custom={i}
              >
                <Link
                  to="/products"
                  className={`group relative block rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all bg-gradient-to-br ${b.gradient}`}
                >
                  <div className="aspect-[4/3] p-8 flex flex-col justify-between relative">
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
                    <div className="relative z-10 self-end">
                      <Icon className="w-10 h-10 text-white/80 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300" />
                    </div>
                    <div className="relative z-10">
                      <h3 className="text-2xl font-extrabold text-white mb-1">{b.title}</h3>
                      <p className="text-white/80 text-sm mb-3">{b.subtitle}</p>
                      <span className="inline-flex items-center gap-1 text-white font-semibold text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                        Explore <ChevronRight size={14} />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ===== BACK TO TOP ===== */}
      <motion.button
        onClick={scrollToTop}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: showBackTop ? 1 : 0, scale: showBackTop ? 1 : 0 }}
        className="fixed bottom-8 right-8 z-50 bg-orange-500 text-white p-4 rounded-full shadow-2xl hover:bg-orange-600 hover:scale-110 transition-all duration-300 hover:shadow-orange-500/30"
      >
        <ArrowUp size={24} />
      </motion.button>
    </div>
  );
};

export default Home;
