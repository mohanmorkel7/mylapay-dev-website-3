"use client";

import { motion } from "framer-motion";
import {
  Globe,
  ArrowRightLeft,
  Monitor,
  Shield,
  Receipt,
  Gavel,
  Eye,
  Search,
} from "lucide-react";
import image from "../assets/images/card-pay.jpg"

const features = [
  {
    icon: Globe,
    title: "Global-Ready Security",
    desc: "COFT & Alt ID tokenization across major global card networks— safeguarding every transaction.",
  },
  {
    icon: ArrowRightLeft,
    title: "Frictionless Authentication",
    desc: "3DS 2.3.1.1 with SDK and biometrics for zero-friction authentication and advanced fraud prevention.",
  },
  {
    icon: Monitor,
    title: "One Platform for All Payments",
    desc: "Process online and offline transactions seamlessly, with high TPS and improved success rates.",
  },
  {
    icon: Shield,
    title: "Adaptive Risk Protection",
    desc: "Real-time fraud defense that evolves with threats, protecting every stakeholder in the ecosystem.",
  },
  {
    icon: Receipt,
    title: "Accurate Clearing & Settlement",
    desc: "Base II Clearing for precise, on-time presentments and settlements with all global card networks.",
  },
  {
    icon: Gavel,
    title: "Smart Dispute Resolution",
    desc: "Automated chargeback management for fast, compliant, and error-free dispute handling.",
  },
  {
    icon: Eye,
    title: "Deep Transaction Intelligence",
    desc: "Analytics that deliver unmatched visibility, control, recon accuracy, revenue insights and growth.",
  },
  {
    icon: Search,
    title: "Insight-Driven Compliance",
    desc: "Powerful dashboards and reporting modules that meet business, compliance, and regulatory demands.",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function FeatureSection() {
  return (
    <section className="bg-[#1f2b5c] text-white py-16 px-6">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 items-center">
      {/* Left Text */}
        <motion.div
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="lg:w-1/2 items-center justify-center lg:justify-start cursor-default"
      >
        <motion.img
          src={image}
          alt=""
          className="rounded-[30px] "
          // whileHover={{ scale: 1.05 }}
          // transition={{ duration: 0.2, ease: "easeOut" }}
        />

        <motion.h2
          whileHover={{ scale: 1.05, color: "#2cade3" }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="text-xl md:text-2xl font-bold leading-snug !text-center lg:text-left mt-5"
        >
          We stay in sync through every step, delivering the finest solutions
        </motion.h2>
      </motion.div>

      {/* Right Features */}
      <motion.div
        variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="lg:w-1/2 grid gap-6"
        >
          {features.map((f, i) => (
          <motion.div
            key={i}
            variants={item}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.1, ease: "easeOut" }}
            className="group flex items-start gap-4 p-3 rounded-xl cursor-default transition-transform duration-100"
          >
            <div
              className="p-2 rounded-lg bg-[#2cade3]/10 text-[#2cade3] flex-shrink-0 transition-colors duration-200 group-hover:bg-[#2cade3] group-hover:text-white"
            >
              <f.icon size={24} strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="font-semibold text-lg transition-colors duration-200 group-hover:text-[#2cade3]">
                {f.title}
              </h3>
              <p className="text-sm text-slate-300">{f.desc}</p>
            </div>
          </motion.div>

        ))}
        </motion.div>
      </div>
    </section>
  );
}
