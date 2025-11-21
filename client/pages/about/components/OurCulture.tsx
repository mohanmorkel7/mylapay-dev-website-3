"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import Cultuterimg1 from "../assets/culture1.jpg"
import Cultuterimg2 from "../assets/culture2.jpg"
import Cultuterimg3 from "../assets/culture3.jpg"

const container: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120, damping: 15 } },
};

export default function OurCulture() {
  const teamImages = [
    Cultuterimg1,
    // Cultuterimg2,
    Cultuterimg3,
  ];

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-6 lg:grid lg:grid-cols-2 lg:gap-12 items-center">
        {/* Left: Text */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="space-y-6 lg:pr-8"
        >
          <motion.h2 variants={item} className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">
            Our Team
          </motion.h2>
          <motion.p variants={item} className="text-gray-600 dark:text-gray-300 text-base sm:text-lg">
            We value <strong>passion and potential</strong> over background, age, or years of experience. What matters most to us is a person's drive, willingness to work both hard and smart, and dedication to the task at hand.
          </motion.p>
          <motion.p variants={item} className="text-gray-600 dark:text-gray-300 text-base sm:text-lg">
            Our focus is on nurturing a learning mindset and fostering innovation. We offer freedom to explore new ideas, conduct enriching workshops to enhance skills, and maintain an open, friendly environment where everyone, from top management to the newest team members, is easily accessible.
          </motion.p>
        </motion.div>

        {/* Right: Team Images */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-10 lg:mt-0"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
            {teamImages.map((src, idx) => (
              <motion.div
                key={idx}
                variants={item}
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.25 }}
                className="rounded-xl overflow-hidden shadow-lg cursor-pointer"
              >
                <img
                  src={src}
                  alt={`Team member ${idx + 1}`}
                  className="w-full h-64 object-cover"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
