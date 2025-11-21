"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { Linkedin } from "lucide-react";
import leader1 from "../assets/mohanraj.png";
import leader2 from "../assets/santhanakumar-co-founder.jpg";
import leader3 from "../assets/sunder-co-founder.jpg";



type Founder = {
  name: string;
  role: string;
  image: string;
  linkedin: string;
};

const container: Variants = {
  hidden: { opacity: 0 },
  show: { 
    opacity: 1, 
    transition: { staggerChildren: 0.15 } 
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring", stiffness: 120, damping: 15 } 
  },
};

export default function Founders() {
  const founders: Founder[] = [
    {
      name: "Mohanraj Ravi",
      role: "Founder, CEO",
      image: leader1,
      linkedin: "https://www.linkedin.com/in/mohanraj-ravi-35b44958/",
    },
    {
      name: "Santhanakumar Dhanabalakrishnan",
      role: "Co-founder, CTO",
      image: leader2,
      linkedin: "https://www.linkedin.com/in/santhanakumar04/",
    },
    {
      name: "Sundar Balasubramanian",
      role: "Co-founder, CFO",
      image: leader3,
      linkedin: "https://www.linkedin.com/in/sundar-b-607814a/",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
         <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-extrabold secondarycolormylapay dark:text-white">
          Meet Our <span className="primarycolormylapay">Founders</span>
        </h2>
        <p className="mt-3 text-gray-600 dark:text-gray-400">
          The visionaries behind our journey
        </p>
      </div>
        <motion.div
          className="grid gap-8 md:grid-cols-3"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
            
          {founders.map((founder) => (
            <motion.div
              key={founder.name}
              className="bg-white rounded-2xl shadow p-6 text-center  hover:shadow-xl"
              variants={item}
              whileHover={{ scale: 1.08, y: -5 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <img
                src={founder.image}
                alt={founder.name}
                className="w-32 h-32 rounded-full mx-auto object-cover mb-4"
              />
              <h3 className="text-xl font-semibold">{founder.name}</h3>
              <p className="text-gray-600">{founder.role}</p>
                <motion.a
                href={founder.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-4 px-4 py-2 primarycolormylapay"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
                >
                <Linkedin className="w-5 h-5" /> LinkedIn
                </motion.a>

            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
