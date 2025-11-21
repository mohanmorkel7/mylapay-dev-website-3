"use client";

import { motion } from "framer-motion";
import { CalendarSync, Expand, CircleMinus, BarChart2,ToggleLeft,CircleFadingArrowUp,HandCoins,Activity } from "lucide-react";
import img from "@/pages/assets/images/fav.png"

const features = [
  {
    title: "Catch settlement anomalies early ",
    desc: "Instantly detect missing funds, short settlements, and over-refunds.",
    icon: CalendarSync,
  },
  {
    title: "Maximize DCC markups ",
    desc: "Leverage real-time FX rates directly from card networks",
    icon: Expand,
  },
  {
    title: "Reduce exchange losses",
    desc: "Optimize cross-border transactions with accurate currency handling.",
    icon: CircleMinus,
  },
  {
    title: "Cost control",
    desc: "Identify and report overcharges in interchange and scheme fees.",
    icon: ToggleLeft,
  },
  {
    title:"Stay ahead with updated rates",
    desc: "Access the latest interchange fees for special MCC categories.",
    icon:CircleFadingArrowUp,
  },
  {
    title:"See your true cost",
    desc:"Gain line-by-line visibility into every cost component of a transaction.",
    icon:HandCoins,

  },
  {
    title:"Know your profit drivers",
    desc:"Uncover insights at every level: transaction, merchant, MCC, and card product.",
    icon:BarChart2,

  },
  {
    title:"Act in real time",
    desc:"Centralized dashboard with live analytics for complete acquiring intelligence.",
    icon:Activity,
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.25 },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const FeaturesSection = () => {
  return (
    <section className="w-full bg-white py-20 px-6 md:px-16 lg:px-32">
      {/* Heading */}
      <div className="text-center mb-16">
        <h2 className="text-5xl font-extrabold mb-4 secondarycolormylapay">
          What you get with <span className="primarycolormylapay">intelle360</span>

        </h2>   
      </div>

      {/* Split Layout */}
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
        {/* Left Side - Illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex-1 flex justify-center"
        >
          <div className="relative flex items-center justify-center">
            {/* Animated Circle */}
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="w-56 h-56 sm:w-72 sm:h-72 lg:w-96 lg:h-96 rounded-full bg-gradient-to-tr from-[#2cade3] to-[#1f2b5c] flex items-center justify-center shadow-2xl overflow-hidden"
            >
              {/* Image inside circle */}
              <motion.img
                src={img} // replace with your image path
                alt="Illustration"
                className="w-28 h-28 sm:w-36 sm:h-36 lg:w-44 lg:h-44 object-contain"
                // animate={{ rotate: [0, 360] }}
                // transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
              />
            </motion.div>

            {/* Decorative Ring */}
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
              className="absolute w-[110%] h-[110%] sm:w-[120%] sm:h-[120%] lg:w-[130%] lg:h-[130%] rounded-full border-4 border-white/30"
            />
          </div>
        </motion.div>

        {/* Right Side - Features List */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="flex-1 space-y-10"
        >
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={idx}
                variants={item}
                whileHover={{ scale: 1.03, x: 5 }}
                transition={{ duration: 0.3 }}
                className="flex gap-6 items-start"
              >
                {/* Icon */}
                <motion.div
                  whileHover={{ rotate: 10 }}
                  className="w-14 h-14 flex items-center justify-center rounded-xl bg-gradient-to-tr from-[#2cade3] to-[#1f2b5c] text-white shadow-lg shrink-0"
                >
                  <Icon className="w-7 h-7" />
                </motion.div>

                {/* Text */}
                <div>
                  <h3 className="text-xl font-semibold text-[#1f2b5c] mb-2">
                    {feature.title}
                  </h3>
                  <p
                    className="text-gray-700 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: feature.desc }}
                  />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
