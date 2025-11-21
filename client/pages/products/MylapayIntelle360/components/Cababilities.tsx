"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, BarChart3, Settings } from "lucide-react";

// Replace with your actual images
import Img1 from "@/pages/assets/images/cardPayments.png";
import Img2 from "@/pages/assets/images/acquiringSupport.jpg";
import Img3 from "@/pages/assets/images/paymentOri.png";

// import img4 from "@/pages/assets/cardnetworks/MasterCard.png"
// import img5 from "@/pages/assets/cardnetworks/amex.png"
import img6 from "@/pages/assets/cardnetworks/juspay.jpg"
import img7 from "@/pages/assets/cardnetworks/razorpay.png"
import img8 from "@/pages/assets/cardnetworks/rupay.png"
import img9 from "@/pages/assets/cardnetworks/visa.png"



const images = [img6,img7,img8,img9];

const features = [
  {
    icon: TrendingUp,
    title: "Performance & Scalability",
    desc: "Handling millions of txns/day with 20x scale capacity. Ready for tomorrow’s growth today.",
  },
  {
    icon: BarChart3,
    title: "Proven Track Record",
    desc: "1B+ transactions processed with $100B+ volume. $100M+ saved for clients worldwide.",
  },
  {
    icon: Settings,
    title: "Operational Efficiency",
    desc: "Automated dashboard system. Reduced manpower efforts & costs by 90%.",
  },
];

export default function FeaturesWithSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full py-16 bg-[#fff]">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center px-6">
        
        {/* Left side - Features */}
        <div className="space-y-8">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="flex items-start gap-4"
            >
              <div className="min-w-[50px] min-h-[50px] flex items-center justify-center rounded-xl bg-gradient-to-br from-[#2cade3] to-[#1f2b5c] text-[#fff] shadow-md">
                <f.icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#000]">{f.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Right side - Auto changing image */}
        <div className="relative w-full flex justify-center">
          <div className="w-[70%] sm:w-[50%] md:w-[20%] lg:w-[55%] xl:w-[45%] h-60 sm:h-52 md:h-60 lg:h-76 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.img
                key={index}
                src={images[index]}
                alt="Feature showcase"
                className="w-full h-full object-cover"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.8 }}
              />
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
