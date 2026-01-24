import {
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageCircle,
  Headphones,
} from "lucide-react";
import { motion } from "framer-motion";

const infoCards = [
  {
    icon: MapPin,
    title: "Our Office",
    desc: "123 ShopEase Street, Commerce City, USA",
  },
  {
    icon: Phone,
    title: "Call Us",
    desc: "+1 (555) 123-4567",
  },
  {
    icon: Mail,
    title: "Email Support",
    desc: "support@shopease.com",
  },
  {
    icon: Clock,
    title: "Working Hours",
    desc: "Mon – Sat : 9AM – 8PM",
  },
  {
    icon: MessageCircle,
    title: "Live Chat",
    desc: "Instant help via chat support",
  },
  {
    icon: Headphones,
    title: "Customer Care",
    desc: "24/7 Premium Assistance",
  },
];

const Contact = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      {/* ================= HERO ================= */}
      <section className="relative mb-28 rounded-3xl overflow-hidden bg-linear-to-br from-orange-500 via-orange-400 to-orange-600 shadow-2xl">
        <div className="absolute inset-0 bg-black/20" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative px-6 py-24 text-center max-w-3xl mx-auto text-white"
        >
          <h1 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold mb-6">
            Contact <span className="text-black drop-shadow-lg">Us</span>
          </h1>
          <p className="text-white/90 text-lg leading-relaxed">
            Questions, feedback, or support?  
            Our team is always here for you.
          </p>
        </motion.div>
      </section>

      {/* ================= INFO CARDS ================= */}
      <section className="mb-28">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {infoCards.map((item, i) => {
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
                <div className="flex justify-center mb-5">
                  <div className="p-4 rounded-2xl bg-orange-500/10 group-hover:bg-orange-500 transition">
                    <Icon className="w-8 h-8 text-orange-500 group-hover:text-white transition" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ================= CONTACT FORM ================= */}
      <section className="mb-28">
        <div className="grid lg:grid-cols-2 gap-14 items-start">

          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl font-bold mb-4">
              Send Us a Message
            </h2>
            <p className="text-gray-600 mb-10 leading-relaxed">
              Fill out the form and our support team will respond within 24 hours.
            </p>

            <form className="bg-white p-10 rounded-3xl shadow-xl flex flex-col gap-5">
              <input
                type="text"
                placeholder="Your Name"
                className="border border-gray-300 rounded-xl p-4 focus:ring-2 focus:ring-orange-400 focus:outline-none"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="border border-gray-300 rounded-xl p-4 focus:ring-2 focus:ring-orange-400 focus:outline-none"
              />
              <input
                type="text"
                placeholder="Subject"
                className="border border-gray-300 rounded-xl p-4 focus:ring-2 focus:ring-orange-400 focus:outline-none"
              />
              <textarea
                placeholder="Your Message"
                rows={5}
                className="border border-gray-300 rounded-xl p-4 focus:ring-2 focus:ring-orange-400 focus:outline-none resize-none"
              />

              <button
                type="submit"
                className="mt-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 rounded-xl transition shadow-lg hover:shadow-xl"
              >
                Send Message
              </button>
            </form>
          </motion.div>

          {/* RIGHT / MAP */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="rounded-3xl overflow-hidden shadow-xl h-420px bg-gray-200 flex items-center justify-center"
          >
            <p className="text-gray-500 text-lg">
              Google Map / Location Embed Here
            </p>
          </motion.div>
        </div>
      </section>

      {/* ================= HELP CTA ================= */}
      <section className="mb-32 rounded-3xl bg-gray-100 py-20 text-center">
        <h2 className="text-3xl font-bold mb-5">
          Need Quick Help?
        </h2>
        <p className="text-gray-600 mb-10 max-w-2xl mx-auto">
          Browse our FAQ or start a live chat for instant assistance.
        </p>
        <div className="flex flex-wrap justify-center gap-5">
          <button className="px-10 py-4 rounded-xl bg-orange-500 text-white font-semibold hover:bg-orange-600 transition shadow-lg">
            Visit FAQ
          </button>
          <button className="px-10 py-4 rounded-xl border border-orange-500 text-orange-500 font-semibold hover:bg-orange-50 transition">
            Start Live Chat
          </button>
        </div>
      </section>

    </div>
  );
};

export default Contact;
