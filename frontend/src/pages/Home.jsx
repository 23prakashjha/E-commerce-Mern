import { useEffect, useMemo, useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
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
import megaSale from "../assets/mega sale.png";
import mensImg from "../assets/mens.png";
import womenImg from "../assets/women.png";
import childrenImg from "../assets/children.png";
import festiveImg from "../assets/festive.png";
import footwearImg from "../assets/footwear.png";
import luxuryImg from "../assets/luxurary.png";
import westernImg from "../assets/western.png";
import winterImg from "../assets/winter.png";
import gymImg from "../assets/gym.png";
import {
  Star, Truck, RefreshCcw, Headphones, ShieldCheck, ArrowUp,
  ChevronDown, ChevronRight, ChevronLeft, ShoppingBag, TrendingUp, Sparkles,
  Award, Tag, Heart, Package, Instagram, Facebook, Twitter, Youtube,
  Zap, Clock, Shield, Flame, Gem, Sun, Gift, Smartphone, QrCode, Download,
  CheckCircle2,
} from "lucide-react";

/* ================= STAR FIELD ================= */
const STAR_COLORS = ["text-yellow-300", "text-indigo-300", "text-pink-300", "text-cyan-300", "text-white"];
const StarField = ({ count = 40 }) => {
  const stars = useMemo(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 12 + 6,
      duration: Math.random() * 4 + 3,
      delay: Math.random() * 5,
      color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
    })), [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {stars.map((s) => (
        <motion.div
          key={s.id}
          initial={{ opacity: 0, scale: 0, rotate: 0 }}
          animate={{ opacity: [0, 1, 0.4, 1, 0], scale: [0, 1, 0.6, 1, 0], rotate: [0, 180, 360], y: [0, -12, 4, -8, 0] }}
          transition={{ duration: s.duration, repeat: Infinity, delay: s.delay, ease: "easeInOut" }}
          className="absolute"
          style={{ left: `${s.x}%`, top: `${s.y}%` }}
        >
          <Star size={s.size} className={`${s.color} fill-current drop-shadow-[0_0_4px_rgba(255,255,255,0.3)]`} />
        </motion.div>
      ))}
    </div>
  );
};

/* ================= DATA ================= */
const categories = [
  { name: "Mens", image: men, color: "from-blue-600/80 to-indigo-600/80" },
  { name: "Womens", image: women, color: "from-pink-600/80 to-rose-600/80" },
  { name: "Children", image: children, color: "from-amber-500/80 to-orange-500/80" },
  { name: "Accessories", image: accessories, color: "from-emerald-500/80 to-teal-500/80" },
];

const promoBanners = [
  { title: "New Arrivals", subtitle: "Fresh styles, just landed", gradient: "from-blue-600 via-blue-500 to-cyan-400", icon: Sparkles, image: mensImg },
  { title: "Premium Collection", subtitle: "Elevate your everyday style", gradient: "from-purple-600 via-purple-500 to-pink-400", icon: Gem, image: luxuryImg },
  { title: "Best Sellers", subtitle: "Loved by thousands", gradient: "from-indigo-500 via-red-500 to-pink-500", icon: Award, image: womenImg },
  { title: "Limited Edition", subtitle: "While stocks last", gradient: "from-rose-600 via-pink-500 to-fuchsia-400", icon: Zap, image: westernImg },
  { title: "Trending Now", subtitle: "What everyone's wearing", gradient: "from-teal-500 via-cyan-500 to-blue-400", icon: Flame, image: footwearImg },
  { title: "Exclusive Deals", subtitle: "Up to 70% off", gradient: "from-amber-500 via-yellow-500 to-indigo-400", icon: Tag, image: megaSale },
  { title: "Luxury Edit", subtitle: "Curated premium picks", gradient: "from-indigo-600 via-purple-600 to-violet-400", icon: Star, image: luxuryImg },
  { title: "Daily Essentials", subtitle: "Your wardrobe staples", gradient: "from-emerald-500 via-green-500 to-teal-400", icon: ShoppingBag, image: childrenImg },
  { title: "Weekend Special", subtitle: "Limited time offers", gradient: "from-violet-500 via-fuchsia-500 to-pink-400", icon: Clock, image: winterImg },
  { title: "Top Rated", subtitle: "Customer favorites", gradient: "from-rose-500 via-pink-500 to-indigo-400", icon: Heart, image: gymImg },
  { title: "Must Haves", subtitle: "Don't miss out", gradient: "from-sky-500 via-indigo-500 to-blue-400", icon: Sparkles, image: festiveImg },
  { title: "Style Edit", subtitle: "Curated for you", gradient: "from-indigo-400 via-pink-500 to-rose-400", icon: Package, image: westernImg },
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
  { icon: Headphones, title: "24/7 Support", desc: "We are always here to help you anytime, anywhere.", gradient: "from-blue-500 to-indigo-600" },
  { icon: Truck, title: "Fastest Delivery", desc: "Get your products delivered in record time.", gradient: "from-emerald-500 to-teal-600" },
  { icon: RefreshCcw, title: "Easy Returns", desc: "Hassle-free returns within 30 days.", gradient: "from-orange-500 to-rose-500" },
  { icon: ShieldCheck, title: "Premium Quality", desc: "We ensure the best quality products for you.", gradient: "from-purple-500 to-indigo-600" },
];

const promoFullBanners = [
  { title: "Mega Sale", highlight: "Up to 70% Off", subtitle: "Biggest sale of the season. Shop now before it ends!", gradient: "from-indigo-600 via-red-500 to-pink-600", icon: Gift, image: megaSale },
  { title: "New Season", highlight: "Fresh Arrivals", subtitle: "Explore the latest trends — updated weekly.", gradient: "from-blue-600 via-purple-500 to-pink-500", icon: Sun, image: mensImg },
  { title: "Free Shipping", highlight: "On All Orders", subtitle: "No minimum. Limited time offer.", gradient: "from-teal-600 via-emerald-500 to-green-400", icon: Truck, image: festiveImg },
];

const brands = ["Nike", "Adidas", "Zara", "H&M", "Puma", "Levi's", "Gucci", "Prada", "Versace", "Tommy", "Ray-Ban", "Fossil"];

const blogPosts = [
  { title: "10 Summer Fashion Trends for 2026", excerpt: "Stay ahead of the curve with our curated list of must-have summer styles.", date: "Jun 15, 2026", tag: "Trends", readTime: "5 min", author: "Style Team" },
  { title: "How to Style White Sneakers", excerpt: "The ultimate guide to making white sneakers work with any outfit.", date: "Jun 10, 2026", tag: "Style Guide", readTime: "4 min", author: "Fashion Ed." },
  { title: "Sustainable Fashion 101", excerpt: "Everything you need to know about building an eco-friendly wardrobe.", date: "Jun 5, 2026", tag: "Eco", readTime: "6 min", author: "Green Living" },
  { title: "Accessorizing for Every Occasion", excerpt: "From casual to formal — the right accessories make all the difference.", date: "May 28, 2026", tag: "Accessories", readTime: "3 min", author: "Style Team" },
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
  { icon: Truck, title: "Free Shipping", desc: "On orders over ₹500", gradient: "from-blue-500 to-indigo-600" },
  { icon: ShieldCheck, title: "Secure Checkout", desc: "256-bit SSL encryption", gradient: "from-emerald-500 to-teal-600" },
  { icon: RefreshCcw, title: "Easy Returns", desc: "30-day return window", gradient: "from-orange-500 to-rose-500" },
  { icon: Headphones, title: "24/7 Support", desc: "Dedicated help team", gradient: "from-purple-500 to-indigo-600" },
  { icon: Award, title: "Premium Quality", desc: "Curated collections", gradient: "from-pink-500 to-rose-600" },
  { icon: Tag, title: "Best Prices", desc: "Price match guarantee", gradient: "from-amber-500 to-orange-600" },
];

const socialPosts = [
  { gradient: "from-pink-500 to-rose-500", icon: Instagram, label: "Latest Drop", likes: "2.4K" },
  { gradient: "from-purple-500 to-indigo-500", icon: Instagram, label: "Behind the Scenes", likes: "1.8K" },
  { gradient: "from-yellow-400 to-indigo-500", icon: Instagram, label: "Customer Style", likes: "3.1K" },
  { gradient: "from-green-400 to-teal-500", icon: Instagram, label: "Sustainable Line", likes: "956" },
  { gradient: "from-blue-500 to-cyan-500", icon: Instagram, label: "Summer Vibes", likes: "4.2K" },
  { gradient: "from-red-500 to-pink-600", icon: Instagram, label: "Flash Sale", likes: "5.7K" },
];

const blogGradients = ["from-blue-500 via-indigo-500 to-purple-600", "from-emerald-500 via-teal-500 to-cyan-600", "from-rose-500 via-pink-500 to-fuchsia-600", "from-amber-500 via-orange-500 to-red-500"];

const heroSlides = [
  { image: megaSale, title: "Mega Sale", highlight: "Up to 70% Off", subtitle: "Biggest sale of the season — grab your favorites before they're gone!", extra: "Hurry! Limited stocks at unbeatable prices across all categories.", cta: "Shop the Sale", link: "/products", badge: "LIMITED TIME" },
  { image: mensImg, title: "Men's Collection", highlight: "New Arrivals", subtitle: "Bold silhouettes and premium comfort, crafted for the modern man.", extra: "From casual streetwear to formal essentials — redefine your wardrobe.", cta: "Explore Men", link: "/category/mens", badge: "TRENDING" },
  { image: womenImg, title: "Women's Collection", highlight: "Style Redefined", subtitle: "From everyday elegance to statement pieces — discover your look.", extra: "Curated fashion that celebrates confidence, comfort, and individuality.", cta: "Explore Women", link: "/category/womens", badge: "NEW IN" },
  { image: childrenImg, title: "Kids Collection", highlight: "Fun & Comfortable", subtitle: "Playful styles built for adventure, comfort, and all-day energy.", extra: "Durable, colorful, and designed for kids who love to explore.", cta: "Shop Kids", link: "/category/children", badge: "POPULAR" },
  { image: festiveImg, title: "Festive Edit", highlight: "Celebrate in Style", subtitle: "Rich textures, vibrant colors, and timeless traditions — festivewear that shines.", extra: "Handpicked festive outfits for every celebration and occasion.", cta: "Shop Festive", link: "/products", badge: "FESTIVE" },
  { image: footwearImg, title: "Footwear", highlight: "Walk the Talk", subtitle: "Sneakers, boots, and everything in between — step into something new.", extra: "Premium comfort meets head-turning design for every step you take.", cta: "Shop Footwear", link: "/category/accessories", badge: "BEST SELLERS" },
  { image: luxuryImg, title: "Luxury Edit", highlight: "Premium Picks", subtitle: "Refined craftsmanship and exclusive designs for the discerning shopper.", extra: "Indulge in timeless luxury — pieces that define sophistication.", cta: "Explore Luxury", link: "/products", badge: "EXCLUSIVE" },
  { image: westernImg, title: "Western Wear", highlight: "Global Fashion", subtitle: "Contemporary styles inspired by international trends and runway looks.", extra: "Bring international runway energy to your everyday street style.", cta: "Shop Western", link: "/products", badge: "TRENDING" },
  { image: winterImg, title: "Winter Collection", highlight: "Stay Warm", subtitle: "Cozy layers, premium knitwear, and cold-weather essentials.", extra: "Wrap yourself in warmth without compromising on style this season.", cta: "Shop Winter", link: "/products", badge: "SEASONAL" },
  { image: gymImg, title: "Gym & Active", highlight: "Push Limits", subtitle: "High-performance activewear built for movement, sweat, and results.", extra: "Engineered for peak performance — train harder, look sharper.", cta: "Shop Active", link: "/products", badge: "ACTIVE" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" } }),
};

/* ================= SUB COMPONENTS ================= */
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
    const numVal = parseInt(value);
    if (isNaN(numVal)) { setCount(value); return; }
    const duration = 1500;
    const steps = 30;
    const increment = numVal / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= numVal) { setCount(numVal); clearInterval(timer); }
      else { setCount(Math.floor(current)); }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, value]);

  return <span ref={ref}>{count}{suffix}</span>;
};

const ProductSkeleton = () => (
  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 max-w-7xl mx-auto">
    {[1, 2, 3, 4].map((i) => (
      <div key={i} className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm overflow-hidden animate-pulse">
        <div className="aspect-[4/5] bg-gradient-to-br from-gray-200 to-gray-100 dark:from-gray-700 dark:to-gray-800" />
        <div className="p-4 space-y-3">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
          <div className="h-8 bg-gray-100 dark:bg-gray-800 rounded-xl w-full" />
        </div>
      </div>
    ))}
  </div>
);

const AnnouncementBar = () => {
  const [idx, setIdx] = useState(0);
  const items = [
    { icon: Truck, text: "Free Shipping on orders over ₹500!", color: "text-emerald-400" },
    { icon: Tag, text: "Use code WELCOME10 for 10% off your first order", color: "text-yellow-400" },
    { icon: Flame, text: "Flash Sale: Extra 20% off — Today Only!", color: "text-pink-400" },
  ];

  useEffect(() => {
    const id = setInterval(() => setIdx((p) => (p + 1) % items.length), 4000);
    return () => clearInterval(id);
  }, [items.length]);

  const Icon = items[idx].icon;

  return (
    <div className="bg-gradient-to-r from-gray-900 via-indigo-950 to-gray-900 text-white text-sm py-2.5 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-center">
        <Icon size={14} className={`${items[idx].color} mr-2 shrink-0`} />
        <motion.p
          key={idx}
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -16, opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="text-center font-medium"
        >
          {items[idx].text}
        </motion.p>
      </div>
      <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden sm:flex gap-3 text-xs text-gray-400">
        <span className="hover:text-white cursor-pointer transition">Help</span>
        <span className="hover:text-white cursor-pointer transition">Track Order</span>
        <span className="hover:text-white cursor-pointer transition">USD ↓</span>
      </div>
      <div className="absolute left-1/2 -translate-x-1/2 bottom-1 flex gap-1.5">
        {items.map((_, i) => (
          <span key={i} className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === idx ? "bg-indigo-400 w-4" : "bg-gray-600"}`} />
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
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const scrollRef = useRef(null);
  const slideTimerRef = useRef(null);

  const resetSlideTimer = () => {
    clearInterval(slideTimerRef.current);
    slideTimerRef.current = setInterval(() => {
      if (!isPaused) setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
  };

  const goToSlide = (idx) => { setCurrentSlide(idx); resetSlideTimer(); };
  const nextSlide = () => { setCurrentSlide((prev) => (prev + 1) % heroSlides.length); resetSlideTimer(); };
  const prevSlide = () => { setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length); resetSlideTimer(); };

  useEffect(() => {
    api.get("/products")
      .then((res) => setProducts(res.data))
      .catch(console.error)
      .finally(() => setProductsLoading(false));
  }, []);

  useEffect(() => {
    const onScroll = () => setShowBackTop(window.scrollY > 800);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    slideTimerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(slideTimerRef.current);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const scrollTrending = (dir) => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: dir * 300, behavior: "smooth" });
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

  return (
    <div className="max-w-full mx-auto overflow-x-hidden">

      {/* ===== ANNOUNCEMENT BAR ===== */}
      <AnnouncementBar />

      {/* ===== HERO CAROUSEL ===== */}
      <section
        className="relative h-[85vh] sm:h-[92vh] overflow-hidden bg-gray-950"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Slides */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
          >
            <img
              src={heroSlides[currentSlide].image}
              alt={heroSlides[currentSlide].title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/50" />

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
                <div className="mx-auto">
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.15 }}
                  >
                    <span className="inline-block px-5 py-1.5 text-[10px] sm:text-xs font-black tracking-[0.25em] uppercase bg-white/15 backdrop-blur-sm text-white rounded-full border border-white/25 mb-5 sm:mb-6">
                      {heroSlides[currentSlide].badge}
                    </span>
                  </motion.div>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.25 }}
                    className="text-white/70 text-sm sm:text-base font-bold tracking-[0.15em] uppercase mb-3"
                  >
                    {heroSlides[currentSlide].title}
                  </motion.p>

                  <motion.h1
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.35 }}
                    className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-[1.0] mb-5 sm:mb-6 drop-shadow-2xl"
                  >
                    {heroSlides[currentSlide].highlight}
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="text-white/80 text-base sm:text-lg lg:text-xl leading-relaxed mb-3 max-w-2xl mx-auto font-medium"
                  >
                    {heroSlides[currentSlide].subtitle}
                  </motion.p>

                  <motion.p
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="text-white/55 text-sm sm:text-base leading-relaxed mb-8 sm:mb-10 max-w-xl mx-auto"
                  >
                    {heroSlides[currentSlide].extra}
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                  >
                    <Link to={heroSlides[currentSlide].link}
                      className="inline-flex items-center justify-center gap-2 bg-white text-gray-900 px-10 sm:px-12 py-4 sm:py-4.5 rounded-2xl font-extrabold shadow-2xl hover:bg-gray-100 hover:scale-105 transition-all duration-300 text-sm sm:text-base"
                    >
                      <ShoppingBag size={20} /> {heroSlides[currentSlide].cta}
                    </Link>
                    <Link to="/products"
                      className="inline-flex items-center justify-center gap-2 border-2 border-white/30 text-white px-10 sm:px-12 py-4 sm:py-4.5 rounded-2xl font-bold hover:bg-white/15 transition-all duration-300 text-sm sm:text-base"
                    >
                      View All Collections <ChevronRight size={18} />
                    </Link>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/25 transition-all duration-300"
          aria-label="Previous slide"
        >
          <ChevronLeft size={22} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/25 transition-all duration-300"
          aria-label="Next slide"
        >
          <ChevronRight size={22} />
        </button>

        {/* Dots */}
        <div className="absolute bottom-5 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              className={`transition-all duration-300 rounded-full ${
                i === currentSlide
                  ? "w-8 h-2.5 bg-white"
                  : "w-2.5 h-2.5 bg-white/40 hover:bg-white/60"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Slide counter */}
        <div className="absolute bottom-5 sm:bottom-8 right-4 sm:right-8 z-20 text-white/50 text-xs font-medium tracking-wider">
          <span className="text-white font-bold">{String(currentSlide + 1).padStart(2, "0")}</span>
          <span className="mx-1">/</span>
          <span>{String(heroSlides.length).padStart(2, "0")}</span>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-5 sm:bottom-8 left-4 sm:left-8 z-20 hidden sm:flex flex-col items-center gap-1.5"
        >
          <span className="text-white/30 text-[10px] font-medium tracking-wider uppercase">Scroll</span>
          <div className="w-5 h-8 border-2 border-white/20 rounded-full flex justify-center pt-1.5">
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-1.5 bg-white/50 rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* ===== TRUST BADGES ===== */}
      <section className="py-10 sm:py-12 -mt-8 sm:-mt-10 relative z-20 max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {[
            { icon: ShoppingBag, label: "Products", value: "500+", color: "from-indigo-500 to-blue-600" },
            { icon: Heart, label: "Happy Customers", value: "10K+", color: "from-pink-500 to-rose-600" },
            { icon: Star, label: "Avg Rating", value: "4.9★", color: "from-amber-500 to-orange-600" },
            { icon: Award, label: "Brands", value: "50+", color: "from-purple-500 to-indigo-600" },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.1 }}
              className="group bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl shadow-lg shadow-gray-200/50 dark:shadow-gray-900/50 p-4 sm:p-5 flex items-center gap-3 sm:gap-4 hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 border border-white/60 dark:border-gray-700/50"
            >
              <div className={`bg-gradient-to-br ${s.color} p-3 rounded-xl shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <s.icon className="text-white w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-extrabold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
                  <CountUp value={s.value.replace(/[^0-9]/g, "")} suffix={s.value.includes("K") ? "K+" : s.value.includes("★") ? "★" : "+"} />
                </p>
                <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm font-medium">{s.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== FEATURED CATEGORIES ===== */}
      <section className="mb-12 sm:mb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <SectionHeading subtitle="Shop by category to find exactly what you need">
          <span className="text-gray-800 dark:text-white">Explore</span>{" "}
          <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">Categories</span>
        </SectionHeading>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 max-w-7xl mx-auto">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.name}
              variants={fadeUp} initial="hidden" whileInView="visible" custom={i}
            >
              <Link
                to={`/category/${cat.name.toLowerCase()}`}
                className="group relative block overflow-hidden rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500"
              >
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="h-full w-full object-cover group-hover:scale-110 transition duration-700 ease-out"
                  />
                </div>
                <div className={`absolute inset-0 bg-gradient-to-t ${cat.color} via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500`} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.1),transparent_50%)]" />
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                  <h3 className="text-white text-xl sm:text-2xl lg:text-3xl font-bold tracking-wide drop-shadow-lg">{cat.name}</h3>
                  <div className="flex items-center gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-3 group-hover:translate-y-0">
                    <span className="text-white/90 text-xs sm:text-sm font-semibold">Shop Now</span>
                    <ChevronRight size={16} className="text-white/90" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== DEAL OF THE DAY ===== */}
      <div className="px-4 sm:px-6 lg:px-8">
        <DealOfTheDay product={products[0]} bgImage={megaSale} />
      </div>

      {/* ===== WHY SHOP WITH US ===== */}
      <section className="mb-12 sm:mb-16 py-14 sm:py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-indigo-950 to-gray-900" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(99,102,241,0.2),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(168,85,247,0.15),transparent_45%)]" />
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-indigo-500/10 blur-[80px]"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.08, 0.2, 0.08] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-purple-500/10 blur-[80px]"
        />
        <StarField count={10} />
        <div className="relative z-10">
          <SectionHeading subtitle="We go above and beyond for your shopping experience">
            <span className="text-white">Why Shop With</span>{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Us</span>
          </SectionHeading>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5 sm:gap-6 max-w-6xl mx-auto">
            {services.map((s, i) => {
              const SIcon = s.icon;
              return (
                <motion.div
                  key={s.title}
                  variants={fadeUp} initial="hidden" whileInView="visible" custom={i}
                  className="group bg-white/5 backdrop-blur-sm p-6 sm:p-8 rounded-2xl sm:rounded-3xl flex flex-col items-center text-center hover:-translate-y-2 transition-all duration-300 border border-white/10 hover:border-white/20 hover:bg-white/10"
                >
                  <div className={`bg-gradient-to-br ${s.gradient} p-4 rounded-2xl mb-4 shadow-lg group-hover:scale-110 group-hover:shadow-xl transition-all duration-300`}>
                    <SIcon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold mb-2 text-white">{s.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{s.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== TRENDING NOW ===== */}
      <section className="mb-12 sm:mb-16 bg-gradient-to-b from-white via-gray-50/50 to-white dark:from-gray-900 dark:via-gray-800/50 dark:to-gray-900 py-14 sm:py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(99,102,241,0.04),transparent_40%)]" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex items-center justify-between mb-8">
            <SectionHeading subtitle="The most popular styles right now" className="mb-0 text-left">
              <TrendingUp className="inline w-6 h-6 sm:w-7 sm:h-7 text-indigo-500 -mt-1" />{" "}
              <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">Trending Now</span>
            </SectionHeading>
            <div className="hidden sm:flex gap-2">
              <button onClick={() => scrollTrending(-1)} className="p-2.5 rounded-full border border-gray-200 dark:border-gray-700 hover:bg-indigo-50 dark:hover:bg-gray-700 hover:border-indigo-300 transition-all duration-200" aria-label="Scroll left">
                <ChevronLeft size={18} className="text-gray-600 dark:text-gray-300" />
              </button>
              <button onClick={() => scrollTrending(1)} className="p-2.5 rounded-full border border-gray-200 dark:border-gray-700 hover:bg-indigo-50 dark:hover:bg-gray-700 hover:border-indigo-300 transition-all duration-200" aria-label="Scroll right">
                <ChevronRight size={18} className="text-gray-600 dark:text-gray-300" />
              </button>
            </div>
          </div>
          <div
            ref={scrollRef}
            className="flex gap-4 sm:gap-5 overflow-x-auto pb-4 snap-x snap-mandatory"
            style={{ scrollbarWidth: "thin", scrollbarColor: "#c7d2fe transparent" }}
          >
            {productsLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="min-w-[240px] sm:min-w-[260px] animate-pulse">
                  <div className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-sm">
                    <div className="aspect-[4/5] bg-gradient-to-br from-gray-200 to-gray-100 dark:from-gray-700 dark:to-gray-800" />
                    <div className="p-4 space-y-2">
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3" />
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
                  className="min-w-[240px] sm:min-w-[260px] snap-start"
                >
                  <ProductCard product={p} />
                </motion.div>
              ))
            )}
          </div>
          <div className="text-center mt-8">
            <Link to="/products"
              className="inline-flex items-center gap-2 border-2 border-indigo-500 text-indigo-500 px-8 py-3 rounded-2xl font-bold hover:bg-gradient-to-r hover:from-indigo-500 hover:to-purple-600 hover:text-white hover:border-transparent transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/20 text-sm sm:text-base">
              View All Products <ChevronRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== PROMO BANNER 1 ===== */}
      <div className="px-4 sm:px-6 lg:px-8">
        <FestiveBanner {...promoFullBanners[0]} image={megaSale} />
      </div>

      {/* ===== NEW ARRIVALS ===== */}
      <section className="mb-12 sm:mb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(99,102,241,0.03),transparent_40%)]" />
        <div className="relative z-10">
          <SectionHeading subtitle="Check out our freshest drops">
            <Sparkles className="inline w-6 h-6 sm:w-7 sm:h-7 text-indigo-500 -mt-1" />{" "}
            <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">New Arrivals</span>
          </SectionHeading>
        {productsLoading ? (
          <ProductSkeleton />
        ) : latestCollection.length ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5 max-w-7xl mx-auto">
            {latestCollection.map((p) => <ProductCard key={p._id} product={p} />)}
          </div>
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400 py-12">No products found.</p>
        )}
        <div className="text-center mt-8 sm:mt-10">
          <Link to="/products"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-8 sm:px-10 py-3 rounded-2xl font-bold shadow-lg shadow-indigo-500/20 hover:shadow-xl hover:shadow-indigo-500/30 transition-all duration-300 text-sm sm:text-base">
            Discover More <ChevronRight size={18} />
          </Link>
        </div>
        </div>
      </section>

      {/* ===== FLASH SALE ===== */}
      <div className="px-4 sm:px-6 lg:px-8">
        <FlashSaleBanner bgImage={winterImg} />
      </div>

      {/* ===== BEST SELLERS ===== */}
      <section className="mb-12 sm:mb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,rgba(168,85,247,0.03),transparent_40%)]" />
        <div className="relative z-10">
          <SectionHeading subtitle="Our most popular products loved by customers">
            <Award className="inline w-6 h-6 sm:w-7 sm:h-7 text-indigo-500 -mt-1" />{" "}
            <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">Best Sellers</span>
          </SectionHeading>
        {productsLoading ? (
          <ProductSkeleton />
        ) : bestSellers.length ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5 max-w-7xl mx-auto">
            {bestSellers.map((p) => <ProductCard key={p._id} product={p} />)}
          </div>
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400 py-12">No products found.</p>
        )}
        <div className="text-center mt-8 sm:mt-10">
          <Link to="/products"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-8 sm:px-10 py-3 rounded-2xl font-bold shadow-lg shadow-indigo-500/20 hover:shadow-xl hover:shadow-indigo-500/30 transition-all duration-300 text-sm sm:text-base">
            View Best Sellers <ChevronRight size={18} />
          </Link>
        </div>
        </div>
      </section>

      {/* ===== BRAND PARTNERS ===== */}
      <section className="mb-12 sm:mb-16 py-12 sm:py-16 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-indigo-50/30 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900" />
        <div className="relative z-10">
          <SectionHeading subtitle="We partner with the world's leading brands">
            <span className="text-gray-800 dark:text-white">Our</span>{" "}
            <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">Brands</span>
          </SectionHeading>
          <div className="relative max-w-7xl mx-auto">
            <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-white dark:from-gray-900 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-white dark:from-gray-900 to-transparent z-10 pointer-events-none" />
            <div className="flex gap-4 sm:gap-5 py-4" style={{ animation: "scrollBrands 30s linear infinite" }}>
              {[...brands, ...brands].map((brand, i) => (
                <div key={i}
                  className="group flex-shrink-0 px-6 sm:px-8 py-3 sm:py-4 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl border border-gray-100 dark:border-gray-700/50 hover:border-indigo-300 dark:hover:border-indigo-500 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                  <span className="text-xs sm:text-sm font-extrabold bg-gradient-to-r from-gray-400 to-gray-500 dark:from-gray-500 dark:to-gray-400 group-hover:from-indigo-500 group-hover:to-purple-500 bg-clip-text text-transparent transition-all duration-300 tracking-widest uppercase">
                    {brand}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="mb-12 sm:mb-16 py-14 sm:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/80 via-white to-purple-50/50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(99,102,241,0.08),transparent_40%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(168,85,247,0.06),transparent_40%)]" />
        <StarField count={12} />
        <div className="relative z-10">
          <SectionHeading subtitle="Hear from our happy customers">
            What Our{" "}
            <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">Customers Say</span>
          </SectionHeading>

          {/* Mobile: scroll */}
          <div className="md:hidden relative">
            <div className="flex gap-3 overflow-x-auto pb-4 snap-x snap-mandatory px-1" style={{ scrollbarWidth: "none" }}>
              {testimonials.map((t) => (
                <div key={t.name}
                  className="min-w-[270px] max-w-[290px] snap-center bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl p-5 rounded-2xl shadow-md border border-white/60 dark:border-gray-700/50 flex-shrink-0 hover:shadow-xl transition-all duration-300">
                  <StarRating rating={t.rating} />
                  <p className="text-gray-700 dark:text-gray-300 mt-3 mb-4 leading-relaxed italic text-sm">"{t.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-bold text-xs shrink-0 shadow-md">
                      {t.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div>
                      <p className="font-bold text-gray-800 dark:text-gray-100 text-sm">{t.name}</p>
                      <p className="text-gray-400 dark:text-gray-500 text-xs">Verified Buyer</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop: grid */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                variants={fadeUp} initial="hidden" whileInView="visible" custom={i}
                className="group bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl p-6 rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-white/60 dark:border-gray-700/50 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-indigo-500/10 to-transparent rounded-bl-[3rem]" />
                <div className="relative z-10">
                  <StarRating rating={t.rating} />
                  <p className="text-gray-700 dark:text-gray-300 mt-3 mb-4 leading-relaxed italic text-sm">"{t.text}"</p>
                  <div className="flex items-center gap-3 pt-3 border-t border-gray-100 dark:border-gray-700/50">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-md">
                      {t.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div>
                      <p className="font-bold text-gray-800 dark:text-gray-100 text-sm">{t.name}</p>
                      <p className="text-gray-400 dark:text-gray-500 text-xs">Verified Buyer</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FASHION BLOG ===== */}
      <section className="mb-12 sm:mb-16 py-14 sm:py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-indigo-950 to-gray-900" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(99,102,241,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(168,85,247,0.1),transparent_40%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_90%,rgba(236,72,153,0.08),transparent_40%)]" />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-32 -right-32 w-80 h-80 rounded-full bg-indigo-500/10 blur-[100px]"
        />
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.25, 0.1] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-purple-500/10 blur-[100px]"
        />

        <div className="relative z-10">
          <SectionHeading subtitle="Style tips, trends, and stories from our team">
            <span className="text-white">From the</span>{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Blog</span>
          </SectionHeading>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 max-w-7xl mx-auto">
            {blogPosts.map((post, i) => (
              <motion.div key={post.title} variants={fadeUp} initial="hidden" whileInView="visible" custom={i} className="group cursor-pointer">
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-md hover:shadow-2xl overflow-hidden transition-all duration-500 hover:-translate-y-1 border border-white/10 hover:border-white/20">
                  <div className={`bg-gradient-to-br ${blogGradients[i]} h-44 sm:h-52 flex items-center justify-center overflow-hidden relative`}>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.2),transparent_60%)]" />
                    <div className="text-7xl sm:text-8xl font-extrabold text-white/10 group-hover:scale-125 group-hover:text-white/20 transition-all duration-700 select-none">
                      {post.tag[0]}
                    </div>
                    <div className="absolute top-3 left-3">
                      <span className="bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
                        {post.tag}
                      </span>
                    </div>
                    <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                      <span className="bg-white text-indigo-500 text-xs font-bold px-4 py-2 rounded-full shadow-lg flex items-center gap-1">
                        Read More <ChevronRight size={12} />
                      </span>
                    </div>
                  </div>
                  <div className="p-4 sm:p-5">
                    <h3 className="font-bold text-sm sm:text-base group-hover:text-indigo-400 transition-colors leading-snug line-clamp-2 text-white">{post.title}</h3>
                    <p className="text-gray-400 text-xs sm:text-sm mt-2 line-clamp-2 leading-relaxed">{post.excerpt}</p>
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/10">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center">
                          <span className="text-white text-xs font-bold">{post.author[0]}</span>
                        </div>
                        <span className="text-gray-500 text-xs">{post.author}</span>
                      </div>
                      <span className="flex items-center gap-1 text-gray-500 text-xs"><Clock size={10} /> {post.readTime}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-8 sm:mt-10">
            <button className="border-2 border-indigo-400 text-indigo-400 px-8 py-3 rounded-2xl font-bold hover:bg-indigo-400 hover:text-white transition-all duration-300 hover:shadow-lg hover:shadow-indigo-400/20 text-sm sm:text-base">
              View All Articles
            </button>
          </div>
        </div>
      </section>

      {/* ===== PROMO BANNER 2 ===== */}
      <div className="px-4 sm:px-6 lg:px-8">
        <FestiveBanner {...promoFullBanners[1]} image={mensImg} />
      </div>

      {/* ===== WHY CHOOSE SHOP EASE ===== */}
      <section className="mb-12 sm:mb-16 py-14 sm:py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/60 via-white to-purple-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(99,102,241,0.06),transparent_40%)]" />
        <div className="relative z-10">
          <SectionHeading subtitle="Everything you need for a seamless shopping experience">
            Why Choose{" "}
            <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">ShopEase</span>
          </SectionHeading>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto">
            {featuresGrid.map((f, i) => {
              const FIcon = f.icon;
              return (
                <motion.div
                  key={f.title}
                  variants={fadeUp} initial="hidden" whileInView="visible" custom={i}
                  className="group flex items-start gap-4 p-5 sm:p-6 rounded-2xl bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-900 hover:shadow-xl transition-all duration-300 border border-transparent hover:border-indigo-100 dark:hover:border-gray-700"
                >
                  <div className={`bg-gradient-to-br ${f.gradient} p-3 rounded-xl shrink-0 shadow-md group-hover:scale-110 group-hover:shadow-lg transition-all duration-300`}>
                    <FIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base sm:text-lg text-gray-800 dark:text-gray-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{f.title}</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{f.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="mb-12 sm:mb-16 py-14 sm:py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50/50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(99,102,241,0.05),transparent_50%)]" />
        <div className="relative z-10">
          <SectionHeading subtitle="Got questions? We've got answers.">
            Frequently Asked{" "}
            <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">Questions</span>
          </SectionHeading>
          <div className="space-y-2.5 sm:space-y-3 max-w-4xl mx-auto">
            {faqs.map((faq, i) => (
              <motion.div
                key={faq.q}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className={`bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border rounded-2xl overflow-hidden transition-all duration-300 ${openFaq === i ? "border-indigo-200 dark:border-indigo-500/50 shadow-xl shadow-indigo-500/5" : "border-gray-100 dark:border-gray-700/50 hover:border-indigo-200 dark:hover:border-indigo-500/30 hover:shadow-lg"}`}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-4 sm:p-5 text-left font-semibold text-gray-800 dark:text-gray-100 hover:bg-indigo-50/30 dark:hover:bg-gray-800/50 transition-colors"
                >
                  <span className="pr-4 text-sm sm:text-base">{faq.q}</span>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${openFaq === i ? "bg-gradient-to-r from-indigo-500 to-purple-500 rotate-180" : "bg-gray-100 dark:bg-gray-700"}`}>
                    <ChevronDown size={16} className={openFaq === i ? "text-white" : "text-gray-500 dark:text-gray-400"} />
                  </div>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: openFaq === i ? "auto" : 0, opacity: openFaq === i ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <p className="px-4 sm:px-5 pb-4 sm:pb-5 text-gray-600 dark:text-gray-400 leading-relaxed text-sm border-t border-gray-100 dark:border-gray-700/50 pt-4">{faq.a}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SOCIAL FEED ===== */}
      <section className="mb-12 sm:mb-16 py-14 sm:py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-white to-pink-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.05),transparent_50%)]" />
        <div className="relative z-10">
          <SectionHeading subtitle="Tag us @shopease for a chance to be featured">
            <Instagram className="inline w-6 h-6 sm:w-7 sm:h-7 text-pink-500 -mt-1" />{" "}
            <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">Follow Us</span>
          </SectionHeading>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 max-w-6xl mx-auto">
            {socialPosts.map((post, i) => {
              const SIcon = post.icon;
              return (
                <motion.a
                  key={i} href="#"
                  variants={fadeUp} initial="hidden" whileInView="visible" custom={i}
                  className={`group relative bg-gradient-to-br ${post.gradient} aspect-square rounded-2xl sm:rounded-3xl flex flex-col items-center justify-center gap-2 sm:gap-3 hover:scale-105 hover:-rotate-1 transition-all duration-500 cursor-pointer shadow-lg hover:shadow-2xl overflow-hidden`}
                >
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-500" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.2),transparent_50%)]" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                    <SIcon className="w-28 sm:w-32 h-28 sm:h-32" />
                  </div>
                  <SIcon className="w-7 h-7 sm:w-8 sm:h-8 text-white opacity-80 group-hover:opacity-100 transition-all duration-300 relative z-10 group-hover:scale-110" />
                  <span className="text-white/80 text-xs font-semibold relative z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">{post.label}</span>
                  <span className="text-white/60 text-[10px] relative z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-75 translate-y-2 group-hover:translate-y-0 flex items-center gap-1">
                    <Heart size={10} className="fill-current" /> {post.likes}
                  </span>
                </motion.a>
              );
            })}
          </div>

          <div className="max-w-3xl mx-auto mt-10 bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-xl border border-white/60 dark:border-gray-700/50">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-5">
              <div className="text-center sm:text-left">
                <h3 className="text-base sm:text-lg font-bold text-gray-800 dark:text-gray-100">Stay connected with us</h3>
                <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm mt-1">Follow for exclusive deals, style tips, and behind-the-scenes content</p>
              </div>
              <div className="flex gap-2.5">
                {[
                  { Icon: Facebook, color: "hover:bg-blue-600", label: "Facebook" },
                  { Icon: Twitter, color: "hover:bg-sky-500", label: "Twitter" },
                  { Icon: Instagram, color: "hover:bg-pink-500", label: "Instagram" },
                  { Icon: Youtube, color: "hover:bg-red-600", label: "YouTube" },
                ].map(({ Icon: PIcon, color, label }) => (
                  <a key={label} href="#" aria-label={label}
                    className={`p-2.5 sm:p-3 bg-white dark:bg-gray-800 rounded-xl text-gray-600 dark:text-gray-300 ${color} hover:text-white transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-1`}>
                    <PIcon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PROMO BANNER 3 ===== */}
      <div className="px-4 sm:px-6 lg:px-8">
        <FestiveBanner {...promoFullBanners[2]} image={festiveImg} />
      </div>

      {/* ===== NEWSLETTER ===== */}
      <div className="px-4 sm:px-6 lg:px-8">
        <Newsletter />
      </div>

      {/* ===== SHOP BY COLLECTION ===== */}
      <section className="mb-12 sm:mb-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 py-14 sm:py-16 px-4 sm:px-6 lg:px-8">
        <SectionHeading subtitle="Curated collections for every style">
          <Sparkles className="inline w-6 h-6 sm:w-7 sm:h-7 text-indigo-500 -mt-1" /> Shop by Collection
        </SectionHeading>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 max-w-7xl mx-auto">
          {promoBanners.map((b, i) => {
            const BIcon = b.icon;
            return (
              <motion.div key={b.title} variants={fadeUp} initial="hidden" whileInView="visible" custom={i}>
                <Link to="/products"
                  className="group relative block rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all">
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <img
                      src={b.image}
                      alt={b.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-br ${b.gradient} opacity-70 group-hover:opacity-80 transition-opacity duration-500`} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.15),transparent_50%)]" />

                    <div className="relative z-10 aspect-[4/3] p-6 sm:p-8 flex flex-col justify-between">
                      <div className="self-end">
                        <BIcon className="w-9 h-9 sm:w-10 sm:h-10 text-white/80 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 drop-shadow-lg" />
                      </div>
                      <div>
                        <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-1 drop-shadow-lg">{b.title}</h3>
                        <p className="text-white/85 text-xs sm:text-sm mb-3 drop-shadow">{b.subtitle}</p>
                        <span className="inline-flex items-center gap-1 text-white font-semibold text-xs sm:text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                          Explore <ChevronRight size={14} />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ===== GET THE APP ===== */}
      <section className="mb-12 sm:mb-16 mx-4 sm:mx-6 lg:mx-8 rounded-3xl overflow-hidden relative group">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-indigo-950 to-purple-950" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(99,102,241,0.2),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_30%,rgba(168,85,247,0.15),transparent_45%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_90%,rgba(236,72,153,0.1),transparent_40%)]" />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.25, 0.1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-indigo-500/15 blur-[80px]"
        />
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.08, 0.2, 0.08] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-purple-500/15 blur-[80px]"
        />

        <div className="relative z-10 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center p-8 sm:p-12 lg:p-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold text-white border border-white/10 mb-6">
              <Smartphone size={16} className="text-indigo-400" /> Download Now
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4 leading-tight">
              Get the{" "}
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                ShopEase App
              </span>
            </h2>
            <p className="text-white/70 text-base sm:text-lg mb-8 leading-relaxed max-w-md">
              Shop anytime, anywhere. Enjoy exclusive app-only deals, lightning-fast checkout, and real-time order tracking.
            </p>

            <div className="space-y-3 mb-8">
              {[
                "Exclusive app-only discounts up to 30% off",
                "Lightning-fast checkout with saved payments",
                "Real-time order tracking & push notifications",
                "Early access to flash sales and new drops",
              ].map((feature, i) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle2 size={18} className="text-green-400 shrink-0" />
                  <span className="text-white/80 text-sm sm:text-base">{feature}</span>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <a href="https://apps.apple.com" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-white text-gray-900 px-6 py-3 rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                <div className="text-left">
                  <p className="text-[10px] leading-tight text-gray-500">Download on the</p>
                  <p className="text-sm font-bold leading-tight">App Store</p>
                </div>
              </a>
              <a href="https://play.google.com" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-white text-gray-900 px-6 py-3 rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.302 1.33-2.745 2.745-2.466-2.466 2.909-1.609zM5.864 3.456L16.8 9.789l-2.302 2.302L5.864 3.456z"/>
                </svg>
                <div className="text-left">
                  <p className="text-[10px] leading-tight text-gray-500">Get it on</p>
                  <p className="text-sm font-bold leading-tight">Google Play</p>
                </div>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              <div className="absolute -inset-6 bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20 rounded-[3rem] blur-2xl" />
              <div className="relative w-56 sm:w-64 h-[480px] sm:h-[540px] bg-gradient-to-b from-gray-800 to-gray-900 rounded-[2.5rem] border-2 border-gray-700 shadow-2xl overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-gray-900 rounded-b-2xl" />
                <div className="mt-8 mx-3 h-[calc(100%-2.5rem)] rounded-2xl overflow-hidden bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex flex-col items-center justify-center relative">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.2),transparent_50%)]" />
                  <div className="relative z-10 text-center px-6">
                    <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-4 border border-white/30 shadow-lg">
                      <ShoppingBag className="w-8 h-8 text-white" />
                    </div>
                    <p className="text-white font-extrabold text-xl mb-1">ShopEase</p>
                    <p className="text-white/70 text-xs mb-4">Your Style, Your Way</p>
                    <div className="space-y-2">
                      {["Browse", "Shop", "Track", "Enjoy"].map((word, i) => (
                        <motion.div
                          key={word}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.5 + i * 0.15 }}
                          className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/10"
                        >
                          <CheckCircle2 size={14} className="text-green-300" />
                          <span className="text-white text-xs font-medium">{word}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-8 w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-xl rotate-6"
              >
                <span className="text-white font-extrabold text-xs text-center leading-tight">UPTO<br/>30%<br/>OFF</span>
              </motion.div>
              <motion.div
                animate={{ y: [3, -3, 3] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-3 -left-6 w-14 h-14 rounded-xl bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-lg -rotate-6"
              >
                <span className="text-white font-bold text-[10px] text-center leading-tight">FREE<br/>DELIVERY</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== BACK TO TOP ===== */}
      <motion.button
        onClick={scrollToTop}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: showBackTop ? 1 : 0, scale: showBackTop ? 1 : 0 }}
        className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white p-3.5 sm:p-4 rounded-full shadow-xl shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-110 transition-all duration-300"
      >
        <ArrowUp size={22} />
      </motion.button>
    </div>
  );
};

export default Home;
