"use client";

import { motion } from "framer-motion";
import { BarChart3, Rocket, Layers, ShieldCheck } from "lucide-react";

export default function FeaturesSection() {
  const features = [
    {
      icon: Rocket,
      title: "Frictionless Payments",
      description: "Boost success rates and handle high TPS with infrastructure tuned for merchant-specific needs.",
    },
    {
      icon: ShieldCheck,
      title: " Advanced Financial Protection",
      description: "Integrated risk intelligence and compliance safeguards for complete transaction security.",
    },
    {
      icon: BarChart3,
      title: "Speed and Scale, Built In",
      description: "Modern, cloud-native architecture with over 99.90% uptime — always fast, always reliable.",
    },
    {
      icon: Layers,
      title: "Compliance-First",
      description: "Built-in compliance with PCI, ISO, RBI, and global network standards — embedded in every process.",
    },
  ];

  return (
    <section
      id="features"
      className="relative bg-white py-16 md:py-24 scroll-mt-20"
    >
      <div className="container mx-auto px-4 md:px-8">
        {/* Heading */}
        <div className="text-center max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-xl md:text-2xl lg:text-3xl font-extrabold text-center text-slate-900 leading-tight secondarycolormylapay"
        >
          Full-Stack Platform for <span className="text-sky-600">end-to-end</span> payment processing
        </motion.h2>
        <motion.p
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 0.2 }}
    viewport={{ once: true }}
    className="mt-4 text-lg text-gray-600"
  >
    From card tokenization and authentication to authorization, settlement, reconciliation and reporting
  </motion.p>
        </div>

        {/* Grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map(({ icon: Icon, title, description }, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                ease: "easeOut",
                delay: idx * 0.15,
              }}
              viewport={{ once: true }}
              className="group flex flex-col items-start gap-4 p-6 rounded-xl border bg-white/70 backdrop-blur-md shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              {/* Icon with hover background fill */}
              <div className="relative flex h-14 w-14 items-center justify-center rounded-full border border-slate-300 overflow-hidden shrink-0">
                <div className="absolute inset-0 bg-sky-500 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
                <Icon className="relative z-10 h-7 w-7 text-slate-700 group-hover:text-white transition-colors duration-500" />
              </div>

              {/* Title + Description */}
              <div>
                <h4 className="text-lg font-semibold text-slate-900 group-hover:text-sky-600 transition-colors">
                  {title}
                </h4>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                  {description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
