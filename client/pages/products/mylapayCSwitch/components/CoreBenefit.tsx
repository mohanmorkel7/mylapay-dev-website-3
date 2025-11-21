"use client";

import { motion } from "framer-motion";
import {
  ShieldUser,
  CircleFadingArrowUp,
  UserStar,
  Rocket,
  PackageCheck,
  CalendarCheck,
} from "lucide-react";

const features = [
  {
    title: "Built-in Smart Logic",
    desc: "1000+ core transaction logics power every flow to deliver consistently high success rates.",
    icon: <PackageCheck className="w-6 h-6 text-[#fff]" />,
  },
  {
    title: "Scalable Performance",
    desc: "Customizable to meet your needs — supports high TPS for merchant-specific demands.",
    icon: <CircleFadingArrowUp className="w-6 h-6 text-[#fff]" />,
  },
  {
    title: "Unified Payment Handling",
    desc: "Seamlessly manage both online and offline payments on a single platform — optimized for cost and efficiency.",
    icon: <UserStar className="w-6 h-6 text-[#fff]" />,
  },
  {
    title: "No Business Disruptions",
    desc: "Cloud-native with 99. 90% uptime — always on, always reliable.",
    icon: <CalendarCheck className="w-6 h-6 text-[#fff]" />,
  },
];

const FeaturesSection = () => {
  return (
    <section className="w-full bg-white pb-16 py-16 px-6 md:px-16 lg:px-32">
      <div className="text-center mb-16">
        <h2 className="text-5xl font-extrabold mb-4 primarycolormylapay bg-clip-text bg-gradient-to-r from-blue-500 to-[#2baee347]">
          Boost your payment 
        </h2>
        <h3 className="text-4xl md:text-4xl font-bold mb-4 secondarycolormylapay">
          volumes while we ensure success in every transaction
        </h3>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          A single powerful platform for all card networks and use cases.
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
