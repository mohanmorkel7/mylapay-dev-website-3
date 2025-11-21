"use client";

import React from "react";
import {Link} from "react-router-dom"
import { motion, Variants } from "framer-motion";
import img1 from "../assets/team1.jpg"
import img2 from "../assets/team2cpy.jpg"
import img3 from "../assets/team3.jpg"


type Props = {
  images?: string[]; // array of image URLs (recommended up to 3 images)
};

const container = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { staggerChildren: 0.08, when: "beforeChildren" } },
};

const item :Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120, damping: 14 } },
};

export default function OurStorySection({ images = [] }: Props) {
  const placeholders = [
    img1,
    img2,
    img3,
  ];

  const imgs = images.length ? images.slice(0, 3) : placeholders;

  return (
    <section className="w-full bg-[#1f2b5c] dark:bg-gray-900 py-12 px-6 lg:py-20">
      <div className="max-w-7xl mx-auto grid gap-8 lg:grid-cols-2 items-center">
        {/* Left: copy */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="space-y-6 lg:pr-12"
        >
          <motion.h3 variants={item} className="text-sm font-semibold uppercase text-[#2baee4] tracking-wider ">
            Our Story
          </motion.h3>

          <motion.h2 variants={item} className="text-3xl sm:text-4xl font-extrabold leading-tight text-gray-900 text-white dark:text-white">
            Driven by Values, Powered by People
          </motion.h2>

          <motion.p variants={item} className="text-gray-600 text-white dark:text-gray-300 text-base sm:text-lg">
            With over <strong>50 years of combined experience</strong>in the payment sector and an understanding of the challenges posed by legacy systems, we embarked on a mission to transform payment processing. Witnessing a bank suffer financially due to an inefficient processing system marked a turning point for us.
          </motion.p>

          <motion.p variants={item} className="text-gray-600 text-white dark:text-gray-300 text-base sm:text-lg">
            This inspired us to revolutionize payments by developing a comprehensive tech ecosystem, offering complete payment solutions that not only transform the payment experience but also ensure profitable business models.
          </motion.p>

          <motion.div variants={item} className="flex gap-4 items-center">
            {/* <a
              href="#"
              className="inline-flex items-center justify-center rounded-lg px-5 py-2.5 bg-[#f59e0b] text-white font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition"
              aria-label="Learn more about our story"
            >
              Learn more
            </a> */}

            <Link
              to="/contact"
              className="text-sm font-medium  hover:text-[#2bcde3] dark:text-gray-300 text-white"
              aria-label="Contact us"
            >
              Contact us →
            </Link>
          </motion.div>
        </motion.div>

        {/* Right: responsive image collage */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="flex justify-center lg:justify-end w-full"
        >
          {/* Mobile: stacked images */}
          <div className="grid grid-cols-1 gap-4 sm:hidden w-full max-w-md">
            {imgs.map((src, idx) => (
              <motion.figure
                key={idx}
                variants={item}
                whileHover={{ scale: 1.03 }}
                className="rounded-2xl overflow-hidden shadow-lg bg-gray-50"
              >
                <motion.img
                  src={src}
                  alt={`Our story image ${idx + 1}`}
                  className="w-full h-full object-cover min-h-[220px]"
                  loading="lazy"
                />
              </motion.figure>
            ))}
          </div>

          {/* Desktop: collage */}
          <div className="hidden sm:block relative w-full max-w-xl">
            <div className="grid grid-cols-2 grid-rows-2 gap-4 sm:gap-6">
              {/* Large left image */}
              <motion.figure
                variants={item}
                whileHover={{ scale: 1.03 }}
                className="row-span-2 rounded-2xl overflow-hidden shadow-lg bg-gray-50"
              >
                <motion.img
                  src={imgs[0]}
                  alt="Our team or payments concept"
                  className="w-full h-full object-cover min-h-[320px]"
                  loading="lazy"
                />
              </motion.figure>

              {/* Top-right small */}
              <motion.figure
                variants={item}
                whileHover={{ scale: 1.04, y: -6 }}
                className="rounded-2xl overflow-hidden shadow-md bg-gray-50"
              >
                <motion.img src={imgs[1]} alt="Payment infrastructure" className="w-full h-full object-cover h-36 sm:h-40" loading="lazy" />
              </motion.figure>

              {/* Bottom-right small */}
              <motion.figure
                variants={item}
                whileHover={{ scale: 1.04, y: -6 }}
                className="rounded-2xl overflow-hidden shadow-md bg-gray-50"
              >
                <motion.img src={imgs[2]} alt="Legacy systems transformed" className="w-full h-full object-cover h-36 sm:h-40" loading="lazy" />
              </motion.figure>
            </div>
            <div className="hidden lg:block absolute -inset-1  pointer-events-none" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
