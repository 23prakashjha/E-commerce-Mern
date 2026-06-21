import {
  Mail, Phone, MapPin, Clock, MessageCircle, Headphones,
  Building2, ChevronDown, Send, ChevronRight, Globe,
  Twitter, Facebook, Instagram, Youtube, Sparkles
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const infoCards = [
  { icon: MapPin, title: "Our Office", desc: "123 ShopEase Street, Commerce City, USA" },
  { icon: Phone, title: "Call Us", desc: "+1 (555) 123-4567", extra: "+1 (555) 987-6543" },
  { icon: Mail, title: "Email Support", desc: "support@shopease.com", extra: "care@shopease.com" },
  { icon: Clock, title: "Working Hours", desc: "Mon – Sat : 9AM – 8PM", extra: "Sun : 10AM – 4PM" },
  { icon: MessageCircle, title: "Live Chat", desc: "Instant help via chat support", extra: "Avg. response: 2 mins" },
  { icon: Headphones, title: "24/7 Care", desc: "Premium round-the-clock support", extra: "Dedicated line for members" },
];

const offices = [
  { city: "New York", address: "123 ShopEase Street, Commerce City, NY 10001", phone: "+1 (555) 123-4567" },
  { city: "London", address: "45 Oxford Street, London W1D 1AN, UK", phone: "+44 20 7946 0958" },
  { city: "Mumbai", address: "7B, Business District, Bandra Kurla Complex, Mumbai 400051", phone: "+91 22 6789 0123" },
  { city: "Dubai", address: "Sheikh Zayed Road, Trade Centre Area, Dubai", phone: "+971 4 567 8901" },
];

const faqs = [
  { q: "How do I track my order?", a: "Log into your account and visit 'My Orders'. You'll see real-time tracking updates for all active orders." },
  { q: "What is your return policy?", a: "We offer 30-day hassle-free returns on all products. Items must be unused and in original packaging." },
  { q: "How long does shipping take?", a: "Standard: 5-7 business days. Express: 2-3 business days. International: 7-14 business days." },
  { q: "Do you ship internationally?", a: "Yes! We ship to over 50 countries worldwide. International shipping rates are calculated at checkout." },
  { q: "What payment methods do you accept?", a: "We accept Visa, Mastercard, PayPal, Apple Pay, Google Pay, and UPI (India)." },
  { q: "How do I contact customer support?", a: "Via live chat, email at support@shopease.com, or call +1 (555) 123-4567. We're here 24/7!" },
  { q: "Can I change or cancel my order?", a: "Orders can be modified within 1 hour of placement. Contact support immediately with your order ID." },
  { q: "Do you have a loyalty program?", a: "Yes! ShopEase Premium offers exclusive discounts, early access to sales, and free express shipping." },
];

const Contact = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", category: "General", message: "" });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for reaching out! Our team will respond within 24 hours.");
    setFormData({ name: "", email: "", subject: "", category: "General", message: "" });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      {/* ================= HERO ================= */}
      <section className="relative mb-28 rounded-3xl overflow-hidden bg-linear-to-br from-orange-500 via-orange-400 to-orange-600 shadow-2xl">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute top-5 left-5 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-5 right-5 w-48 h-48 bg-white/10 rounded-full blur-3xl" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative px-6 py-28 text-center max-w-4xl mx-auto text-white"
        >
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
            className="inline-block bg-white/20 backdrop-blur-sm px-6 py-2 rounded-full text-sm font-semibold mb-6"
          >
            We'd Love to Hear From You
          </motion.span>
          <h1 className="text-4xl sm:text-5xl xl:text-7xl font-extrabold mb-6 leading-tight">
            Contact <span className="text-black drop-shadow-lg">Us</span>
          </h1>
          <p className="text-white/90 text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto">
            Questions, feedback, or need support? Our team is always here to help you.
          </p>
          <div className="flex justify-center gap-4 mt-8 flex-wrap">
            <span className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm">
              <Headphones className="w-4 h-4" /> 24/7 Support
            </span>
            <span className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm">
              <MessageCircle className="w-4 h-4" /> Live Chat
            </span>
            <span className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm">
              <Clock className="w-4 h-4" /> Avg. Response: &lt;2 hrs
            </span>
          </div>
        </motion.div>
      </section>

      {/* ================= INFO CARDS ================= */}
      <section className="mb-28">
        <div className="text-center mb-14">
          <span className="text-orange-500 font-semibold text-sm uppercase tracking-widest">Get in Touch</span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-2">How to Reach <span className="text-orange-500">Us</span></h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">Multiple ways to connect with our support team.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {infoCards.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all text-center border border-gray-100"
              >
                <div className="flex justify-center mb-5">
                  <div className="p-4 rounded-2xl bg-orange-500/10 group-hover:bg-orange-500 transition">
                    <Icon className="w-8 h-8 text-orange-500 group-hover:text-white transition" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
                {item.extra && <p className="text-gray-400 text-sm mt-1">{item.extra}</p>}
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ================= FORM + MAP ================= */}
      <section className="mb-28">
        <div className="text-center mb-14">
          <span className="text-orange-500 font-semibold text-sm uppercase tracking-widest">Reach Out</span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-2">Send Us a <span className="text-orange-500">Message</span></h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">Fill the form and we'll get back to you within 24 hours.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-14 items-start">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <form onSubmit={handleSubmit} className="bg-white p-10 rounded-3xl shadow-xl flex flex-col gap-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <input
                  type="text" name="name" value={formData.name} onChange={handleChange}
                  placeholder="Your Name" required
                  className="border border-gray-300 rounded-xl p-4 focus:ring-2 focus:ring-orange-400 focus:outline-none"
                />
                <input
                  type="email" name="email" value={formData.email} onChange={handleChange}
                  placeholder="Your Email" required
                  className="border border-gray-300 rounded-xl p-4 focus:ring-2 focus:ring-orange-400 focus:outline-none"
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <input
                  type="text" name="subject" value={formData.subject} onChange={handleChange}
                  placeholder="Subject" required
                  className="border border-gray-300 rounded-xl p-4 focus:ring-2 focus:ring-orange-400 focus:outline-none"
                />
                <select
                  name="category" value={formData.category} onChange={handleChange}
                  className="border border-gray-300 rounded-xl p-4 focus:ring-2 focus:ring-orange-400 focus:outline-none"
                >
                  <option>General Inquiry</option>
                  <option>Order Support</option>
                  <option>Returns & Refunds</option>
                  <option>Partnership</option>
                  <option>Feedback</option>
                  <option>Other</option>
                </select>
              </div>
              <textarea
                name="message" value={formData.message} onChange={handleChange}
                placeholder="Your Message" rows={5} required
                className="border border-gray-300 rounded-xl p-4 focus:ring-2 focus:ring-orange-400 focus:outline-none resize-none"
              />
              <button
                type="submit"
                className="mt-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 rounded-xl transition shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" /> Send Message
              </button>
            </form>
          </motion.div>

          {/* RIGHT / MAP */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="rounded-3xl overflow-hidden shadow-xl h-full min-h-[400px] bg-gray-800 relative flex flex-col"
          >
            <div className="absolute inset-0 opacity-20">
              <div className="w-full h-full bg-[url('https://raw.githubusercontent.com/piyush-eon/react-todo/main/public/pattern.svg')] bg-repeat" />
            </div>
            <div className="relative p-8 flex flex-col justify-center items-center text-center flex-1">
              <MapPin className="w-16 h-16 text-orange-400 mb-4" />
              <h3 className="text-white text-2xl font-bold mb-2">Our Headquarters</h3>
              <p className="text-gray-300 mb-2">123 ShopEase Street</p>
              <p className="text-gray-300 mb-6">Commerce City, NY 10001, USA</p>
              <div className="flex items-center gap-2 text-orange-400">
                <Globe className="w-5 h-5" />
                <span className="font-medium">Interactive Map Coming Soon</span>
              </div>
              <div className="mt-8 flex gap-4">
                <span className="bg-white/10 p-3 rounded-xl text-white hover:bg-orange-500 transition cursor-pointer"><Twitter className="w-5 h-5" /></span>
                <span className="bg-white/10 p-3 rounded-xl text-white hover:bg-orange-500 transition cursor-pointer"><Facebook className="w-5 h-5" /></span>
                <span className="bg-white/10 p-3 rounded-xl text-white hover:bg-orange-500 transition cursor-pointer"><Instagram className="w-5 h-5" /></span>
                <span className="bg-white/10 p-3 rounded-xl text-white hover:bg-orange-500 transition cursor-pointer"><Youtube className="w-5 h-5" /></span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= OFFICES ================= */}
      <section className="mb-28">
        <div className="text-center mb-14">
          <span className="text-orange-500 font-semibold text-sm uppercase tracking-widest">Global Presence</span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-2">Our <span className="text-orange-500">Offices</span></h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">We have offices around the world to serve you better.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {offices.map((office, i) => (
            <motion.div
              key={office.city}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-6 rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition border border-gray-100"
            >
              <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center mb-4">
                <Building2 className="w-6 h-6 text-orange-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">{office.city}</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-3">{office.address}</p>
              <p className="text-orange-500 font-medium text-sm flex items-center gap-2">
                <Phone className="w-4 h-4" /> {office.phone}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section className="mb-28 rounded-3xl bg-gray-50 py-20 px-6">
        <div className="text-center mb-14">
          <span className="text-orange-500 font-semibold text-sm uppercase tracking-widest">FAQ</span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-2">Frequently Asked <span className="text-orange-500">Questions</span></h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">Quick answers to common questions.</p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left font-semibold text-gray-800 hover:text-orange-500 transition"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${openFaq === i ? "rotate-180 text-orange-500" : "text-gray-400"}`} />
              </button>
              <AnimatePresence>
                {openFaq === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-5 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= SOCIAL CTA ================= */}
      <section className="mb-32 rounded-3xl bg-linear-to-br from-orange-500 to-orange-600 py-20 px-6 text-center shadow-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Sparkles className="w-12 h-12 mx-auto text-white/80 mb-6" />
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-6">Need Quick Help?</h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto mb-10">
            Chat with our support team instantly or browse our FAQ for immediate answers.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-white text-orange-500 font-bold px-10 py-4 rounded-xl hover:bg-orange-50 transition shadow-lg text-lg flex items-center gap-2">
              <MessageCircle className="w-5 h-5" /> Start Live Chat
            </button>
            <button className="border-2 border-white text-white font-semibold px-10 py-4 rounded-xl hover:bg-white/10 transition text-lg flex items-center gap-2">
              <Mail className="w-5 h-5" /> Email Us
            </button>
          </div>
          <div className="flex justify-center gap-6 mt-10">
            <span className="text-white/60 text-sm flex items-center gap-2"><Phone className="w-4 h-4" /> +1 (555) 123-4567</span>
            <span className="text-white/60 text-sm flex items-center gap-2"><Mail className="w-4 h-4" /> support@shopease.com</span>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Contact;
