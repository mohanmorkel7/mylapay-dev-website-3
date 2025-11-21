"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Star, IndianRupee, Shield, Users } from "lucide-react"; 

const features = [
  { title: "Payment Acceptance", description: "POS and eCommerce payment gateway.", icon: <IndianRupee size={24} className="text-blue-500" /> },
  { title: "BIN Sponsorship", description: "Supports both dedicated and shared models", icon: <Shield size={24} className="text-blue-500" /> },
  { title: "Card Networks Connectivity", description: "Integrated with all major global card schemes", icon: <Star size={24} className="text-blue-500" /> },
  { title: "Use Cases", description: "Card-present and card-not-present transactions", icon: <Users size={24} className="text-blue-500" /> },
];

const stakeholders = [
  {
    title: "Banks",
    points: [
      "Enabling BIN Sponsorship for financial institutions and payment aggregators",
      "Operating in merchant acquiring program and payment gateways",
    ],
  },
  {
    title: "Financial Institutions",
    points: ["Operating in payment aggregation", "Offering payment gateway to merchants"],
  },
  {
    title: "Point-of-Sales Providers",
    points: ["Offering payment acceptance through POS terminals"],
  },
  {
    title: "Payment Processors",
    points: [
      "Offering technical services to acquirers, banks, financial institution and payment aggregators",
    ],
  },
];

export default function SolutionSuite() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className="relative py-28 px-5 md:px-20 bg-gradient-to-br from-blue-50 to-white overflow-hidden">
      {/* Decorative floating circles */}
      <div className="absolute -top-32 -left-32 w-64 h-64 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute -bottom-32 -right-24 w-72 h-72 bg-[#2baee347] rounded-full opacity-20 animate-pulse"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center md:text-left mb-20 flex flex-col items-center !text-center"
        >
          <h2 className="text-5xl font-extrabold mb-4 primarycolormylapay bg-clip-text bg-gradient-to-r from-blue-500 to-[#2baee347]">
            One Solution Suite
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
            Endless Possibilities
          </h3>
          <p className="text-gray-600 max-w-xl mx-auto md:mx-0 text-lg">
            Custom-built to serve varied business needs while empowering every player in the acquiring ecosystem.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-16">
          {/* Features Left */}
          <div className="flex-1 grid grid-cols-1 gap-10 relative">
                {features.map((feature, idx) => (
                  <motion.div
                    key={idx}
                    onHoverStart={() => setHovered(idx)}
                    onHoverEnd={() => setHovered(null)}
                    initial={{ opacity: 0, y: 30, scale: 1 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    whileHover={{
                      scale: 1.03,
                      y: -3,
                      boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                      transition: { duration: 0.12, ease: "easeOut" },
                    }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="relative p-8 rounded-3xl bg-white border border-gray-200 cursor-pointer hover:bg-gradient-to-br hover:from-blue-50 hover:to-[#2baee347] overflow-hidden"
                  >
                    {/* Circle with Icon */}
                    <div
                      className={`absolute -top-6 -right-6 w-24 h-24 rounded-full flex items-center z-0 justify-center ${
                        hovered === idx ? "bg-[#2baee347]" : "bg-blue-100 "
                      }  pointer-events-none transition-colors duration-200`}
                    >
                      <div className="opacity-100">{feature.icon}</div>
                    </div>

                    <h4 className="font-bold text-xl mb-2 text-gray-800 z-10 relative">{feature.title}</h4>
                    <p className="text-gray-600">{feature.description}</p>
                  </motion.div>
                ))}
          </div>

          {/* Stakeholders Right */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
            {stakeholders.map((stakeholder, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20, scale: 1 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 15px 30px rgba(0,0,0,0.08)",
                  transition: { duration: 0.12, ease: "easeOut" },
                }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white p-6 rounded-2xl border border-gray-200 cursor-pointer hover:bg-blue-50 hover:border-[#2baee347]"
              >
                <h4 className="font-semibold text-lg mb-2 text-gray-800">{stakeholder.title}</h4>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  {stakeholder.points.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
