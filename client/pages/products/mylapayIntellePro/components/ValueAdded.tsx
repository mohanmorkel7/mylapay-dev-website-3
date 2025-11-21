"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { TrendingUp, Globe, Lightbulb, BarChart2 } from "lucide-react";
import { useRef } from "react";
import CompanyLogo from "@/pages/assets/images/fav.png"

const features = [
  {
    title: "Unified Reconciliation Engine",
    desc: "Real-time sync, fetches all NPCI raw files, validates, reconciles, and posts actions — no manual effort needed.",
    icon: <TrendingUp className="w-8 h-8 text-white" />,
  },
  {
    title: "Integrated Switch Infrastructure",
    desc: "Payee Switch for PA-PGs and Beneficiary Switch for Banks — both supported.",
    icon: <Globe className="w-8 h-8 text-white" />,
  },
  {
    title: "Smart Dispute Logic",
    desc: "Built-in intelligence for CBK handling, automated response triggers, and accurate refund processing.",
    icon: <Lightbulb className="w-8 h-8 text-white" />,
  },
  {
    title: "Dashboard Insights",
    desc: "Monitor cycle performance, exception summaries, refund and chargeback statuses in one view.",
    icon: <BarChart2 className="w-8 h-8 text-white" />,
  },
];

const ValueAdded = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  return (
    <section
      ref={containerRef}
      className="relative min-h-[120vh] py-20 px-6 md:px-16 lg:px-32"
      style={{
        background: `linear-gradient(135deg, #2cade3 0%, #1f2b5c 100%)`,
        backgroundSize: "400% 400%",
        animation: "bgAnimate 15s ease infinite",
      }}
    >
      <style>
        {`
          @keyframes bgAnimate {
            0% {background-position: 0% 50%;}
            50% {background-position: 100% 50%;}
            100% {background-position: 0% 50%;}
          }
        `}
      </style>

      <div className="flex flex-col lg:flex-row lg:justify-between gap-12">
        {/* Left-side content */}
            <div className="lg:sticky lg:top-20 lg:h-screen lg:flex-1 lg:flex lg:flex-col lg:justify-center text-white">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8 }}
                      viewport={{ once: true }}
                      className="p-6 cursor-default flex flex-col items-center lg:items-center text-center"
                    >
                      {/* Company Logo with White Circular Background */}
                      <motion.div
                        className="bg-white rounded-full p-4 mb-6 shadow-lg flex items-center justify-center"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                      >
                        <img
                          src={CompanyLogo}
                          alt="Company Logo"
                          className="w-20 h-20 object-contain"
                        />
                      </motion.div>
          
                      {/* Heading */}
                      <motion.h2
                        whileHover={{ scale: 1.05, color: "" }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="text-3xl md:text-2xl font-bold mb-4 text-center"
                      >
                        Built to keep your UPI payments
                        <br />
                        Fast, accurate and always on no matter the volume
                      </motion.h2>
                    </motion.div>
            </div>

        {/* Right-side animated cards */}
        <div className="lg:flex-1 flex flex-col items-center">
          {features.map((feature, idx) => {
            const startRange = 0.1 * idx;
            const endRange = startRange + 0.3;

            const scrollScale = useTransform(scrollYProgress, [startRange, endRange], [0.8, 1]);
            const hoverScale = useMotionValue(1);
            const combinedScaleRaw = useTransform([scrollScale, hoverScale], ([scroll, hover]) => {
              const scrollNum = typeof scroll === "number" ? scroll : 1;
              const hoverNum = typeof hover === "number" ? hover : 1;
              return scrollNum * hoverNum;
            });
            const combinedScale = useSpring(combinedScaleRaw, {
              stiffness: 500,
              damping: 30,
            });

            const opacity = useTransform(scrollYProgress, [startRange, endRange], [0, 1]);

            return (
              <motion.div
                key={idx}
                style={{ scale: combinedScale, opacity }}
                className="relative bg-white rounded-3xl p-8 flex flex-col items-center text-center
                  shadow-md w-full mb-12 cursor-default"
                onHoverStart={() => hoverScale.set(1.1)}
                onHoverEnd={() => hoverScale.set(1)}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              >
                <motion.div
                  className="w-16 h-16 flex items-center justify-center bg-[#2cade3] rounded-full mb-6 shadow-md"
                  whileHover={{ rotate: 20 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-xl md:text-2xl font-semibold mb-2 text-[#1f2b5c]">
                  {feature.title}
                </h3>
                <p className="text-gray-500">{feature.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ValueAdded;
