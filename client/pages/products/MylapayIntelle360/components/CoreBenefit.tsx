"use client";

import { motion } from "framer-motion";
import { Combine, ShieldCheck,Rocket } from "lucide-react";

const features = [
  {
    title: "1,000+ Built-In Business Logics",
    desc: "Perform 360° Txn-level analysis with pinpoint accuracy — detecting anomalies, capturing patterns, and generating timely, actionable insights.",
    icon: <Combine className="w-6 h-6 text-white" />,
  },
  {
    title: "100% Financial Protection",
    desc: "A precision-built system with embedded risk intelligence and compliance safeguards — ensuring zero revenue leakages and zero loss.",
    icon: <ShieldCheck className="w-6 h-6 text-white" />,
  },
  {
    title: "Boost Transaction Profitability",
    desc: "Empower business teams with complete visibility into transaction-level costs and profitability drivers to optimize MDR and maximize margins.",
    icon: <Rocket className="w-6 h-6 text-white" />,
  },
];

const FeaturesSection = () => {
  return (
    <section className="w-full bg-white pb-16 py-16 px-6 md:px-16 lg:px-32">
      <div className="text-center mb-16">
        <h2 className="text-5xl font-extrabold mb-4 secondarycolormylapay">
          A first-of-its-kind <span className="primarycolormylapay">analytical product</span>
        </h2>
        {/* <h3 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">
          is fast and fraud-resistant
        </h3> */}
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          purpose-built for the acquiring payments business.
        </p>
      </div>

      {/* Grid updated for 3 boxes per row */}
      <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
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
