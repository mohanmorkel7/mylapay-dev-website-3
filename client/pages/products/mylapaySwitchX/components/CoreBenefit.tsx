"use client";

import { motion } from "framer-motion";
import {
  Cpu,
  UserLock,
  GitPullRequestCreateArrow,
  SendToBack,
} from "lucide-react";

const features = [
  {
    title: "Dynamic Routing Engine",
    desc: "Route payments based on real-time metrics like TPS, success rates, commercials, and card issuer.",
    icon: <Cpu className="w-6 h-6 text-[#fff]" />,
  },
  {
    title: "Built-In Risk & Compliance Controls",
    desc: "Includes pre-auth and post-auth FRM, kill switch, TPS throttling, and Merchant checks",
    icon: <UserLock className="w-6 h-6 text-[#fff]" />,
  },
  {
    title: "Plug-and-Play API Layer",
    desc: "One-time integration for seamless access to SwitchX’s entire orchestration stack.",
    icon: <GitPullRequestCreateArrow className="w-6 h-6 text-[#fff]" />,
  },
  {
    title: "Smart Infrastructure",
    desc: "Cloud-native with over 99.90% uptime —always on, always reliable.",
    icon: <SendToBack className="w-6 h-6 text-[#fff]" />,
  },
];

const FeaturesSection = () => {
  return (
    <section className="w-full bg-white pb-16 py-16 px-6 md:px-16 lg:px-32">
      <div className="text-center mb-16">
        <h2 className="text-5xl font-extrabold mb-4 primarycolormylapay bg-clip-text bg-gradient-to-r from-blue-500 to-[#2baee347]">
          Route smarter
        </h2>
        <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800">
          Transact faster | Scale better.
        </h3>
        {/* <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          Grow with more payment volumes while we protect your every payment
        </p> */}
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
