"use client";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  TrendingUp,
  Scale,
  ArrowBigUpDash,
  CheckCircle2,
  Building2,
  GlobeLock,
  BarChart3,
} from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Smart Transaction Routing",
    desc: "Dynamically direct traffic based on cost, TPS, issuer, and performance data.",
  },
  {
    icon: TrendingUp,
    title: "Unified Multi-Rail Processing",
    desc: "Run all channels on one orchestration layer without separate integrations.",
  },
  {
    icon: GlobeLock,
    title: "Built-In Risk & Compliance",
    desc: "Embedded FRM, kill switches, and compliance checks at every stage.",
  },
  {
    icon: ArrowBigUpDash,
    title: "Rapid Integration",
    desc: "One-time API connection to access the full orchestration suite.",
  },
  {
    icon: CheckCircle2,
    title: "High Availability",
    desc: "Cloud-native design with over 99.90% uptime for uninterrupted service.",
  },
  {
    icon: Building2,
    title: "Modular Extensibility",
    desc: "Add payment rails, modular solutions or analytics as your needs grow",
  },
];

export default function PremiumFeatures() {
  return (
    <section className="relative bg-white py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-8">
        {/* Heading */}
        <div className="text-center max-w-4xl mx-auto">
  <motion.h2
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true }}
    className="text-3xl md:text-4xl lg:text-5xl font-bold secondarycolormylapay"
  >
    An all-in-one <span className="primarycolormylapay">Orchestration framework </span>
  </motion.h2>
  <motion.p
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 0.2 }}
    viewport={{ once: true }}
    className="mt-4 text-lg text-gray-600"
  >
  That connects, manages, and optimizes every payment rail you run

  </motion.p>
        </div>
        {/* Features Grid */}
<div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 justify-items-center">
  {features.map(({ icon: Icon, title, desc }, idx) => (
    <motion.div
      key={idx}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        ease: "easeOut",
        delay: idx * 0.1,
      }}
      viewport={{ once: true }}
      className="group flex items-start gap-4 w-full max-w-md"
    >
      {/* Icon */}
      <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm group-hover:border-sky-400 group-hover:shadow-md transition-all duration-300 ease-out">
        <Icon className="h-6 w-6 text-sky-600 group-hover:scale-110 transition-transform duration-300" />
      </div>

      {/* Text */}
      <div>
        <h3 className="font-semibold text-lg text-gray-900 group-hover:text-sky-600 transition-colors">
          {title}
        </h3>
        <p className="mt-1 text-gray-600 text-sm">{desc}</p>
      </div>
    </motion.div>
  ))}
</div>

      </div>
    </section>
  );
}
