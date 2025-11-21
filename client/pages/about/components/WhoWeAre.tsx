"use client";

import { motion } from "framer-motion";
import image from "../assets/about-who.jpg";

export default function AboutSection() {
  return (
    <section className="relative w-full py-24 bg-white overflow-hidden mt-6">
      {/* Decorative background bubbles */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-[#2cade3] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      {/* <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#1f2b5c] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div> */}

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Side - Content bubble */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          viewport={{ once: true }}
          className=" backdrop-blur-sm  p-10 space-y-6"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#1f2b5c] leading-snug">
            Who We Are
          </h2>
          <p className="text-lg md:text-l leading-relaxed text-gray-700 text-justify">
            Mylapay is a next-generation payment infrastructure company enabling seamless card payment processing through a single-window platform. As a certified processor and intermediator, Mylapay connects Payment Aggregators (PA-PGs), banks, and global card networks (Visa, MasterCard, RuPay, Amex) for complete end-to-end payment flow — authentication, authorization, fund collection, reconciliation, and dispute management.
          </p>
          <p className="text-lg md:text-l leading-relaxed text-gray-700 text-justify">
            The company addresses long-standing industry challenges such as friction, revenue leakage, and lack of transparency caused by inefficient legacy processors. With an industry-first modern infrastructure, Mylapay combines cutting-edge technology with financial responsibility. Its cloud-native platform ensures high levels of security, resilience, flexibility, and speed, while giving banks and PA-PGs full control, transparency, and data integrity over their payment ecosystems.
          </p>
        </motion.div>

        {/* Right Side - Image with floating effect */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <motion.img
            src={image}
            alt="About illustration"
            className="w-full max-w-md lg:max-w-lg "
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </div>
    </section>
  );
}
