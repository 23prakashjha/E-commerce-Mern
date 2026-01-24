import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
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






/* ================= CONSTANTS ================= */
const categories = [
  { name: "Mens", image: men },
  { name: "Womens", image: women },
  { name: "Children", image: children },
  { name: "Accessories", image: accessories },
];


const featuredBanners = [
  {
    title: "Winteer Season",
    subtitle: "Fresh styles just dropped",
    image: winter,
    link: "/products",
  },
  {
    title: "Summer Season",
    subtitle: "Built for everyday comfort",
    image: summer,
    link: "/products",
  },
  {
    title: "Mansoon Season",
    subtitle: "Fresh styles just dropped",
    image: Moonson,
    link: "/products",
  },
  {
    title: "Shaadi Season",
    subtitle: "Built for everyday comfort",
    image: wedding,
    link: "/products",
  },
   {
    title: "Bridal Dress",
    subtitle: "Fresh styles just dropped",
    image: bridal,
    link: "/products",
  },
  {
    title: "Groom Dress",
    subtitle: "Built for everyday comfort",
    image: lengha,
    link: "/products",
  },
  {
    title: "Tranding Dress",
    subtitle: "Built for everyday comfort",
    image: Streetwaer,
    link: "/products",
  },
  {
    title: "Women Bags",
    subtitle: "Built for everyday comfort",
    image:bags,
    link: "/products",
  },
  {
    title: "Mens Latest Jackets",
    subtitle: "Built for everyday comfort",
    image:jacket,
    link: "/products",
  },
  {
    title: "Men All Types of T-shirts",
    subtitle: "Built for everyday comfort",
    image:shirt,
    link: "/products",
  },
  {
    title: "Children All Collection",
    subtitle: "Built for everyday comfort",
    image:childcollection,
    link: "/products",
  },
  {
    title: "Women All Collection",
    subtitle: "Built for everyday comfort",
    image:womcollection,
    link: "/products",
  },
];

const testimonials = [
  { name: "Vikas Jha", text: "ShopEase delivers a smooth and enjoyable online shopping experience. The website is easy to navigate, products are well-organized, and checkout is fast. I found exactly what I needed without any hassle, making it a reliable platform for regular online purchases." },
  { name: "Pooja Jha", text: "I’m very impressed with the quality of products available on ShopEase. Everything arrived exactly as described, well-packaged, and in perfect condition. The attention to detail and quality standards clearly sets ShopEase apart from many other online stores." },
  { name: "Rahul Yadav", text: "The delivery service at ShopEase is excellent. My order arrived on time, and tracking updates were clear and accurate. It’s reassuring to shop from a platform that values timely delivery and keeps customers informed throughout the process." },
   { name: "Sachin ", text: "Customer support at ShopEase is responsive and professional. My query was handled quickly, and the support team was polite and helpful. It’s great to know there’s reliable assistance available whenever help is needed." },
  { name: "Anita", text: "ShopEase offers a clean, modern, and mobile-friendly website design. Browsing products feels smooth, pages load quickly, and the overall interface makes shopping enjoyable on both desktop and mobile devices." },
  { name: "Sarfarz", text: "Pricing on ShopEase is fair and competitive. The platform frequently offers good deals and discounts without compromising on product quality. It’s a great place to find value-for-money items while enjoying a premium shopping experience." },
   { name: "Sourav ", text: "Security and trust are strong points of ShopEase. Payments are safe, checkout is secure, and personal information is well protected. I felt confident completing my purchase, which is very important when shopping online." },
  { name: "Aman", text: "ShopEase has quickly become my preferred online shopping platform. From product variety to service quality, everything feels reliable and well-managed. I appreciate the consistency and professionalism the brand delivers with every order." },
  { name: "Abhinav", text: "Overall, ShopEase makes online shopping simple, fast, and stress-free. With great products, reliable delivery, secure payments, and excellent customer service, it’s a platform I would confidently recommend to friends and family." },
];

const services = [
  {
    icon: support,
    title: "24/7 Support",
    desc: "We are always here to help you anytime, anywhere.",
  },
  {
    icon: Fastest,
    title: "Fastest Delivery",
    desc: "Get your products delivered in record time.",
  },
  {
    icon: Eassy,
    title: "Easy Returns",
    desc: "Hassle-free returns within 30 days.",
  },
  {
    icon: preminum,
    title: "Premium Quality",
    desc: "We ensure the best quality products for you.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: i => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6 },
  }),
};

/* ================= COMPONENT ================= */
const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get("/products");
        setProducts(res.data);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  // Sections data
  const topPicks = useMemo(() => products.slice(0, 6), [products]);
  const latestCollection = useMemo(() => {
    return [...products].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 8);
  }, [products]);
  const bestSellers = useMemo(() => {
    return [...products].sort((a, b) => (b.sales || 0) - (a.sales || 0)).slice(0, 8);
  }, [products]);

  return (
    <div className="max-w-full mx-auto px-2 sm:px-6 lg:px-8 overflow-x-hidden">

      {/* ================= HERO ================= */}
<section className="relative min-h-screen flex items-center overflow-hidden rounded-3xl">
  {/* Background Image */}
  <motion.img
    src={hero}
    alt="Fashion Background"
    initial={{ scale: 1.1 }}
    animate={{ scale: 1 }}
    transition={{ duration: 8, ease: "easeOut" }}
    className="absolute inset-0 w-full h-full object-cover"
  />

  {/* Gradient Overlay */}
  <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/50 to-transparent" />

  {/* Content */}
  <div className="relative z-10 max-w-7xl mx-auto px-6 py-28 w-full">
    <div className="grid lg:grid-cols-2 gap-20 items-center">

      {/* Left Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="text-center lg:text-left"
      >
        {/* Badge */}
        <span className="inline-block mb-6 px-5 py-2 text-sm font-semibold tracking-wide rounded-full
          bg-orange-500/15 text-orange-400 border border-orange-400/30">
          New 2026 Collection
        </span>

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

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
          <Link
            to="/products"
            className="inline-flex items-center justify-center bg-orange-500 text-black px-12 py-4 rounded-2xl
              font-semibold shadow-2xl hover:bg-orange-600 hover:scale-105
              focus:outline-none focus:ring-4 focus:ring-orange-400/50 transition-all duration-300"
          >
            Shop Collection
          </Link>

          <Link
            to="/about"
            className="inline-flex items-center justify-center border border-white/40 text-white px-12 py-4
              rounded-2xl font-semibold hover:bg-white hover:text-black transition-all duration-300"
          >
            Learn More
          </Link>
        </div>

        {/* Stats */}
        <div className="mt-14 grid grid-cols-3 gap-6 max-w-md mx-auto lg:mx-0">
          <div>
            <h4 className="text-2xl font-bold text-white">10K+</h4>
            <p className="text-white/60 text-sm">Happy Customers</p>
          </div>
          <div>
            <h4 className="text-2xl font-bold text-white">500+</h4>
            <p className="text-white/60 text-sm">Premium Styles</p>
          </div>
          <div>
            <h4 className="text-2xl font-bold text-white">4.9★</h4>
            <p className="text-white/60 text-sm">Average Rating</p>
          </div>
        </div>
      </motion.div>

      {/* Right Glass Card */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="hidden lg:block"
      >
        <div className="relative bg-white/10 backdrop-blur-2xl rounded-3xl p-12
          shadow-[0_20px_80px_rgba(0,0,0,0.45)] border border-white/20">

          <h3 className="text-3xl font-bold mb-4 text-white">
            New Season Drop
          </h3>

          <p className="text-white/70 mb-8 text-lg">
            Designed for motion. Styled for impact.
          </p>

          <div className="flex items-center justify-between">
            <span className="text-orange-400 font-semibold text-xl">
              From $49
            </span>
            <Link
              to="/products"
              className="text-white font-semibold hover:text-orange-400 transition"
            >
              Explore →
            </Link>
          </div>
        </div>
      </motion.div>

    </div>
  </div>
</section>


      {/* ================= SERVICES ================= */}
      <section className="mb-15 bg-gray-50 py-15">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-16">
          Why Shop With Us
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-10 max-w-6xl mx-auto px-4">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              custom={i}
              className="bg-white p-8 rounded-3xl shadow-lg flex flex-col items-center text-center hover:scale-105 transition"
            >
              <img src={s.icon} alt={s.title} className="h-16 w-16 mb-4" />
              <h3 className="text-xl font-bold mb-2">{s.title}</h3>
              <p className="text-gray-600">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

<section className="relative w-full h-[65vh] sm:h-[75vh] lg:h-[85vh] overflow-hidden rounded-3xl mb-24">

  {/* Background Image with Cinematic Zoom */}
  <motion.img
    src={holi}
    alt="Holi Fashion Banner"
    initial={{ scale: 1.12 }}
    animate={{ scale: 1 }}
    transition={{ duration: 8, ease: "easeOut" }}
    className="absolute inset-0 w-full h-full object-cover"
  />

  {/* Gradient Overlay */}
  <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/50 to-transparent" />

  {/* Content */}
  <div className="relative z-10 flex h-full items-center justify-center px-6 sm:px-12 lg:px-24">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="max-w-xl text-white text-center flex flex-col items-center"
    >
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
        Celebrate Style
        <span className="block bg-linear-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent drop-shadow-lg">
          This Holi
        </span>
      </h1>

      <p className="text-white/90 text-base sm:text-lg mb-10 max-w-md">
        Vibrant colors, bold designs, and festive comfort —
        fashion that shines with every celebration.
      </p>

      <Link
        to="/products"
        className="inline-flex items-center justify-center gap-3
          bg-orange-500 hover:bg-orange-600 text-white
          px-12 py-4 rounded-2xl font-semibold
          shadow-2xl hover:scale-105
          transition-all duration-300"
      >
        Shop Now
        <span className="text-xl">→</span>
      </Link>
    </motion.div>
  </div>

</section>




      {/* ================= CATEGORIES ================= */}
      <section className="mb-15">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-16">
          Explore Categories
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
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
                  className="h-72 w-full object-cover group-hover:scale-110 transition duration-700"
                />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <h3 className="text-white text-3xl font-bold tracking-wide">
                    {cat.name}
                  </h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

<section className="relative w-full h-[65vh] sm:h-[75vh] lg:h-[85vh] overflow-hidden rounded-3xl mb-24">

  {/* Background Image with Cinematic Zoom */}
  <motion.img
    src={janmashtami}
    alt="Holi Fashion Banner"
    initial={{ scale: 1.12 }}
    animate={{ scale: 1 }}
    transition={{ duration: 8, ease: "easeOut" }}
    className="absolute inset-0 w-full h-full object-cover"
  />

  {/* Gradient Overlay */}
  <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/50 to-transparent" />

  {/* Content */}
  <div className="relative z-10 flex h-full items-center justify-center px-6 sm:px-12 lg:px-24">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="max-w-xl text-white text-center flex flex-col items-center"
    >
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
        Celebrate Style
        <span className="block bg-linear-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent drop-shadow-lg">
          This Janmashtmi
        </span>
      </h1>

      <p className="text-white/90 text-base sm:text-lg mb-10 max-w-md">
        Vibrant colors, bold designs, and festive comfort —
        fashion that shines with every celebration.
      </p>

      <Link
        to="/products"
        className="inline-flex items-center justify-center gap-3
          bg-orange-500 hover:bg-orange-600 text-white
          px-12 py-4 rounded-2xl font-semibold
          shadow-2xl hover:scale-105
          transition-all duration-300"
      >
        Shop Now
        <span className="text-xl">→</span>
      </Link>
    </motion.div>
  </div>

</section>


      {/* ================= FEATURED BANNERS ================= */}
      <section className="mb-15">
        <div className="grid md:grid-cols-2 gap-10">
          {featuredBanners.map((b, i) => (
            <motion.div
              key={b.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              custom={i}
              className="relative rounded-3xl overflow-hidden shadow-2xl"
            >
              <img
                src={b.image}
                alt={b.title}
                className="h-96 w-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 p-10 flex flex-col justify-end">
                <h3 className="text-3xl font-extrabold text-white mb-2">
                  {b.title}
                </h3>
                <p className="text-white/80 mb-6">{b.subtitle}</p>
                <Link
                  to={b.link}
                  className="self-start bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-xl font-semibold"
                >
                  Explore
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

 <section className="relative w-full h-[65vh] sm:h-[75vh] lg:h-[85vh] overflow-hidden rounded-3xl mb-24">

  {/* Background Image with Cinematic Zoom */}
  <motion.img
    src={RakshaBadhan}
    alt="Holi Fashion Banner"
    initial={{ scale: 1.12 }}
    animate={{ scale: 1 }}
    transition={{ duration: 8, ease: "easeOut" }}
    className="absolute inset-0 w-full h-full object-cover"
  />

  {/* Gradient Overlay */}
  <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/50 to-transparent" />

  {/* Content */}
  <div className="relative z-10 flex h-full items-center justify-center px-6 sm:px-12 lg:px-24">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="max-w-xl text-white text-center flex flex-col items-center"
    >
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
        Celebrate Style
        <span className="block bg-linear-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent drop-shadow-lg">
          This Raksha Bandhan
        </span>
      </h1>

      <p className="text-white/90 text-base sm:text-lg mb-10 max-w-md">
        Vibrant colors, bold designs, and festive comfort —
        fashion that shines with every celebration.
      </p>

      <Link
        to="/products"
        className="inline-flex items-center justify-center gap-3
          bg-orange-500 hover:bg-orange-600 text-white
          px-12 py-4 rounded-2xl font-semibold
          shadow-2xl hover:scale-105
          transition-all duration-300"
      >
        Shop Now
        <span className="text-xl">→</span>
      </Link>
    </motion.div>
  </div>

</section>

      {/* ================= LATEST COLLECTION ================= */}
      <section className="mb-15">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-14 text-center">
          Latest Collection
        </h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {latestCollection.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))}
          {latestCollection.length === 0 && (
            <p className="text-center text-gray-500 col-span-full">No products found.</p>
          )}
        </div>

        <div className="text-center mt-8">
          <Link
            to="/products"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-2xl font-semibold"
          >
            See More
          </Link>
        </div>
      </section>

<section className="relative w-full h-[65vh] sm:h-[75vh] lg:h-[85vh] overflow-hidden rounded-3xl mb-24">

  {/* Background Image with Cinematic Zoom */}
  <motion.img
    src={NavRatri}
    alt="Holi Fashion Banner"
    initial={{ scale: 1.12 }}
    animate={{ scale: 1 }}
    transition={{ duration: 8, ease: "easeOut" }}
    className="absolute inset-0 w-full h-full object-cover"
  />

  {/* Gradient Overlay */}
  <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/50 to-transparent" />

  {/* Content */}
  <div className="relative z-10 flex h-full items-center justify-center px-6 sm:px-12 lg:px-24">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="max-w-xl text-white text-center flex flex-col items-center"
    >
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
        Celebrate Style
        <span className="block bg-linear-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent drop-shadow-lg">
          This NavRatri
        </span>
      </h1>

      <p className="text-white/90 text-base sm:text-lg mb-10 max-w-md">
        Vibrant colors, bold designs, and festive comfort —
        fashion that shines with every celebration.
      </p>

      <Link
        to="/products"
        className="inline-flex items-center justify-center gap-3
          bg-orange-500 hover:bg-orange-600 text-white
          px-12 py-4 rounded-2xl font-semibold
          shadow-2xl hover:scale-105
          transition-all duration-300"
      >
        Shop Now
        <span className="text-xl">→</span>
      </Link>
    </motion.div>
  </div>

</section>


      {/* ================= TESTIMONIALS ================= */}
      <section className="mb-15 bg-gray-50 rounded-3xl py-24 px-6">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-16">
          What Our Customers Say
        </h2>

        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              custom={i}
              className="bg-white p-10 rounded-3xl shadow-lg"
            >
              <p className="text-gray-700 mb-6 text-lg">“{t.text}”</p>
              <p className="font-bold text-xl">{t.name}</p>
            </motion.div>
          ))}
        </div>
      </section>

<section className="relative w-full h-[65vh] sm:h-[75vh] lg:h-[85vh] overflow-hidden rounded-3xl mb-24">

  {/* Background Image with Cinematic Zoom */}
  <motion.img
    src={Diwali}
    alt="Holi Fashion Banner"
    initial={{ scale: 1.12 }}
    animate={{ scale: 1 }}
    transition={{ duration: 8, ease: "easeOut" }}
    className="absolute inset-0 w-full h-full object-cover"
  />

  {/* Gradient Overlay */}
  <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/50 to-transparent" />

  {/* Content */}
  <div className="relative z-10 flex h-full items-center justify-center px-6 sm:px-12 lg:px-24">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="max-w-xl text-white text-center flex flex-col items-center"
    >
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
        Celebrate Style
        <span className="block bg-linear-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent drop-shadow-lg">
          This Diwali
        </span>
      </h1>

      <p className="text-white/90 text-base sm:text-lg mb-10 max-w-md">
        Vibrant colors, bold designs, and festive comfort —
        fashion that shines with every celebration.
      </p>

      <Link
        to="/products"
        className="inline-flex items-center justify-center gap-3
          bg-orange-500 hover:bg-orange-600 text-white
          px-12 py-4 rounded-2xl font-semibold
          shadow-2xl hover:scale-105
          transition-all duration-300"
      >
        Shop Now
        <span className="text-xl">→</span>
      </Link>
    </motion.div>
  </div>

</section>

      {/* ================= NEWSLETTER ================= */}
      <section className="mb-32 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
          Join Our Style Club
        </h2>
        <p className="text-gray-600 mb-10 text-lg">
          Be the first to know about new drops and exclusive offers.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-6 py-4 rounded-2xl border w-full focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-10 py-4 rounded-2xl font-semibold">
            Subscribe
          </button>
        </div>
      </section>

    </div>
  );
};

export default Home;
