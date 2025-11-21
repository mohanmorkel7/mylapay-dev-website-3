"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

import img1 from "../assets/gallery/img-1.jpg";
import img2 from "../assets/gallery/img-2.jpg";
import img3 from "../assets/gallery/img-3.jpg";
import img4 from "../assets/gallery/img-4.jpg";
import img5 from "../assets/gallery/img-5.jpg";
import img6 from "../assets/gallery/img-6.jpg";
import img7 from "../assets/gallery/img-7.jpg";
import img8 from "../assets/gallery/img-8.jpg";
import img9 from "../assets/gallery/img-9.jpg";
import img10 from "../assets/gallery/img-10.jpg";
import img11 from "../assets/gallery/img-11.jpg";
import img12 from "../assets/gallery/img-12.jpg";
import img13 from "../assets/gallery/img-13.jpg";
import img14 from "../assets/gallery/img-14.jpg";



const images = [
  img1,
  img2,
  img3,
  img4,
  img5,
  img7,
  img8,
  img9,
  img6,
  img10,
  img11,
  img13,
  // img14,
  img12,
];

export default function Carousel() {
  const [index, setIndex] = useState(0);

  const handleNext = () => setIndex((prev) => prev + 1);
  const handlePrev = () => setIndex((prev) => prev - 1);

  // Auto slide every 3s
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full py-10 mb-10">
               <div className="max-w-7xl mx-auto text-center mb-12 flex flex-col items-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold secondarycolormylapay dark:text-white">
          Our <span className="primarycolormylapay">Culture</span>
        </h2>
        <p className="mt-3 text-center text-l secondarycolormylapay dark:text-gray-400 w-[50%]">
          A dynamic team of young and energetic professionals is transforming the payment landscape and revolutionizing the way payments are made. Together, we create a great working culture and build the best technology products for Payments.
        </p>
      </div>
      <div className="relative flex w-full max-w-6xl h-[400px] sm:h-[480px] justify-center items-center overflow-hidden mb-10">
        
        {[-1, 0, 1].map((offset) => {
          const imgIndex =
            ((index + offset) % images.length + images.length) % images.length;

          const isCenter = offset === 0;

          return (
            <motion.div
              key={imgIndex}
              layout
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className={`mx-2 flex-shrink-0 ${
                isCenter ? "z-20" : "z-10 opacity-80"
              }`}
              style={{ perspective: "1000px" }}
            >
              <motion.div
                layout
                animate={{
                  scale: isCenter ? 1 : 0.85,
                  y: isCenter ? 0 : 20,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className={`rounded-2xl  overflow-hidden transition-all duration-500 ${
                  isCenter
                    ? "w-[300px] h-[200px] sm:w-[360px] sm:h-[260px]"
                    : "w-[240px] h-[120px] sm:w-[280px] sm:h-[160px]"
                }`}
              >
                <img
                  src={images[imgIndex]}
                  alt={`Slide ${imgIndex}`}
                  className="object-contain w-full h-full"
                />
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* Controls */}
      {/* <div className="flex gap-4 mt-6">
        <button
          onClick={handlePrev}
          className="px-4 py-2 bg-[#1f2b5c] text-white rounded-lg shadow-md"
        >
          Prev
        </button>
        <button
          onClick={handleNext}
          className="px-4 py-2 bg-[#2cade3] text-white rounded-lg shadow-md"
        >
          Next
        </button>
      </div> */}
    </div>
  );
}
