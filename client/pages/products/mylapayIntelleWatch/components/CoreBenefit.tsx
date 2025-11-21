"use client";

import { motion } from "framer-motion";
import {
  BrickWallShield,
  Expand,
  UserStar,
  ShieldCheck,
} from "lucide-react";

const features = [
  {
    title: "1000 + Advanced Risk Rules",
    desc: "Leverage industry-standard rules or configure personalized logic to adapt to evolving fraud patterns",
    icon: <BrickWallShield className="w-6 h-6 text-[#fff]" />,
  },
  {
    title: "360 Risk Coverage",
    desc: "Protect transactiona across the life cycle to mitigate fraud, money laundering, and operational errors",
    icon: <Expand className="w-6 h-6 text-[#fff]" />,
  },
  {
    title: "Merchant Risk Insights",
    desc: "Gain merchant-level intelligence through behaviour analysis, risk scores, and decision-driven  risk indicators",
    icon: <UserStar className="w-6 h-6 text-[#fff]" />,
  },
  {
    title: "Precise Deduction & Prevention",
    desc: "Reduce fraud and chargebacks by up to 99% with intelligent, ML-driven threat detection and automated prevention .",
    icon: <ShieldCheck className="w-6 h-6 text-[#fff]" />,
  },
];

const FeaturesSection = () => {
  return (
    <section className="w-full bg-white pb-16 py-16 px-6 md:px-16 lg:px-32">
      <div className="text-center mb-16">
        
        <h3 className="text-4xl md:text-3xl font-bold mb-4 secondarycolormylapay">
          Scale safety 
        </h3>
        <p className="text-gray-600 max-w-3xl mx-auto text-lg">
          Our system blocks fraud before it strikes
        </p>
      </div>

      <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
        {features.map((feature, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: idx * 0.2 }}
            viewport={{ once: true }}
            whileHover={{
              scale: 1.03,
              y: -1,
              boxShadow: "0px 0px 25px rgba(31,43,92,0.4)",
              borderColor: "#2cade3",
              transition: {
                type: "tween",
                duration: 0.1,
                ease: "easeOut",
              },
            }}
            whileTap={{ scale: 0.97 }}
            className="relative bg-white rounded-3xl p-8 shadow-xl border-l-4 border-[#1f2b5c] cursor-default"
          >
            <div className="absolute -top-6 left-8 w-12 h-12 flex items-center justify-center bg-[#1f2b5c] rounded-full text-white shadow-md">
              {feature.icon}
            </div>
            <div className="mt-6">
              <h3 className="text-xl md:text-2xl secondarycolormylapay font-semibold mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
