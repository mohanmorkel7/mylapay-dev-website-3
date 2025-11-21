"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Zap, Cpu } from "lucide-react";
import team1 from "../assets/team1.jpg";
import team2 from "../assets/team2.jpg";
import team3 from "../assets/team3.jpg";
// import team4 from "../assets/team2.jpg";

const features = [
  {
    icon: <ShieldCheck className="w-8 h-8 text-[#2cade3]" />,
    title: "3DS-Authentication",
    desc: "The linchpin of online commerce, turning payment security into an art form",
  },
  {
    icon: <Zap className="w-8 h-8 text-[#2cade3]" />,
    title: "Authorization Switch",
    desc: "Your go-to solution for speed and security, ensuring high success rates with fast and safe approvals",
  },
  {
    icon: <Cpu className="w-8 h-8 text-[#2cade3]" />,
    title: "IntelleEngine TPS",
    desc: " An all-in-one platform that manages the post-authorization transaction processing end-to-end",
  },
];

export default function FuturisticSection() {
  return (
    <section className="relative w-full py-28 bg-gradient-to-b from-[#f9fafb] to-[#e6f0ff] overflow-hidden">
      {/* Decorative floating circles */}
      <motion.div
        className="absolute top-10 left-[-80px] w-48 h-48 rounded-full bg-[#2cade3] opacity-20"
        animate={{ y: [0, 20, 0], x: [0, 10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 right-[-60px] w-36 h-36 rounded-full bg-[#f53939] opacity-20"
        animate={{ y: [0, -20, 0], x: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-20">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-center space-y-4"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#1f2b5c]">
            We specialize in payment enablement, <span className="primarycolormylapay">crafting cutting-edge payment solutions</span> to simplify the complete card payment cycle
          </h2>
          <p className="text-gray-700 md:text-lg max-w-2xl mx-auto">
            Founded in May 2019 and incorporated as Mindeed Technologies and Services Pvt Ltd, Mylapay has rapidly emerged as an innovator in the fintech arena. Mylapay aimed at redefining the payment processing experience with its core product line up.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: { transition: { staggerChildren: 0.3 } },
          }}
        >
          {features.map((f, idx) => (
            <motion.div
              key={idx}
              className="relative bg-white rounded-3xl p-8 shadow-2xl border-t-4 border-[#2cade3] hover:scale-105 transition cursor-default overflow-hidden"
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Floating icon background */}
              <motion.div
                className="absolute -top-5 -right-5 w-20 h-20 rounded-full bg-[#2cade3] opacity-10"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              />
              <div className="mb-4">{f.icon}</div>
              <h4 className="text-xl font-semibold text-[#1f2b5c]">{f.title}</h4>
              <p className="text-gray-600 mt-1">{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Team Section with overlapping avatars */}
        <motion.div
      className="relative mt-16 flex flex-col md:flex-row justify-center items-center md:gap-10 gap-6"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    >
  {[team1, team2, team3].map((img, idx) => (
    <motion.div
      key={idx}
      className="w-[20rem] h-[15rem] rounded-2xl overflow-hidden shadow-xl border-4 border-white"
      // On large screens, overlap slightly
      style={{ marginLeft: idx !== 0 ? '0' : '0' }}
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 4 + idx, repeat: Infinity, ease: "easeInOut" }}
    >
      <img
        src={img}
        alt={`Team ${idx + 1}`}
        className="w-full h-full object-cover"
      />
    </motion.div>
  ))}
</motion.div>

      </div>
    </section>
  );
}
