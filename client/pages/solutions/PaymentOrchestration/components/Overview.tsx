"use client";

import { motion } from "framer-motion";
import { BarChart3, BadgeCheck, Layers, ShieldCheck,LaptopMinimalCheck, Rocket } from "lucide-react";

export default function FeaturesSection() {

  const features = [
    {
      icon: LaptopMinimalCheck,
      title: "Higher Success Rates",
      description: "Route transactions to the most reliable path instantly",
    },
    {
      icon: ShieldCheck,
      title: "Multi-Payment Rails",
      description: "Cards, UPI, and net banking, all handled effortlessly in one place",
    },
    {
      icon: BarChart3,
      title: "Optimized Costs",
      description: "Lower IC and MDR through intelligent decision rules.",
    },
    {
      icon: BadgeCheck,
      title: "Zero Leakages",
      description: "End-to-end transaction protection with compliance safeguards.",
    },
    {
      icon: Layers,
      title: "Always Compliant",
      description: "PCI, ISO, RBI, NPCI, and global scheme-aligned processes.",
    },
    {
      

      icon: Rocket,
      title: "Faster Market Launches",
      description: "Deploy multi-channel acquiring in record time.",
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
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true }}
    className="text-3xl md:text-4xl lg:text-5xl font-bold secondarycolormylapay"
  >
    The Next-Gen Payment <span className="primarycolormylapay">Orchestration</span>
  </motion.h2>

  <motion.p
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 0.2 }}
    viewport={{ once: true }}
    className="mt-4 text-lg text-gray-600"
  >
designed for smart routing, cost efficiency, and real-time control.
  </motion.p>
        </div>

        {/* Grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
