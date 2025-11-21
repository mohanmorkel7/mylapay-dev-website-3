"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image1 from "@/pages/products/mylapaySwitchX/assets/images/routing.jpg";
import Image2 from "@/pages/products/mylapaySwitchX/assets/images/authendification-support.jpg";
import Image3 from "@/pages/products/mylapaySwitchX/assets/images/killswitch.jpg";
import Image4 from "@/pages/products/mylapaySwitchX/assets/images/settlement.jpg";
import Image5 from "@/pages/products/mylapaySwitchX/assets/images/riskAuthentication.jpg"
import Image6 from "@/pages/products/mylapaySwitchX/assets/images/dispute.jpg";
import Image7 from "@/pages/products/mylapaySwitchX/assets/images/tokenization.jpg";
import Image8 from "@/pages/products/mylapaySwitchX/assets/images/analytics.jpg";

const slides = [
  {
    title: "Smart Routing",
    image: Image1,
    content:
      "Route transactions based on TPS, cost, MDR, success rates, card BIN, and more.",
  },
  {
    title: "Authentication Support",
    image: Image2,
    content:
      "Fully compatible with Mylapay's Secure 3DS Server for smooth authentication.",
  },
  {
    title: "Kill Switch",
    image: Image3,
    content:
      "Instantly disable a merchant, MCC, card, or switch in case of risk.",
  },
  {
    title: "Settlement & Reconciliation",
    image: Image4,
    content:
      "Connects with IntelleSettle and IntellePro for streamlined settlement and reconciliation.",
  },
    {
    title: "Risk Controls",
    image: Image5,
    content:
      "Monitor fraud risk at both pre- and post-auth stages of the payment flow.",
  },
    {
    title: "Chargeback Support",
    image: Image6,
    content:
      "Integrated with Mylapay’s IntelleSolve for efficient chargeback handling.",
  },
    {
    title: "Tokenization Support",
    image: Image7,
    content:
      "Seamlessly integrates with Mylapay’s TokenX for CoFT and Alternate ID support.",
  },
    {
    title: "Analytics Plug-in",
    image: Image8,
    content:
      "Leverages Mylapay’s Intelle360 for real-time transaction insights and dashboards.",
  },

];

// Clone: [last, ...slides, first]
const loopedSlides = [slides[slides.length - 1], ...slides, slides[0]];

export default function AutoSliderSection() {
  const [currentIndex, setCurrentIndex] = useState(1); // Start on first real slide
  const [transitioning, setTransitioning] = useState(true);

  // Auto play
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const handlePrev = () => {
    setCurrentIndex((prev) => {
      if (prev <= 0) return 0; // prevent going negative
      return prev - 1;
    });
  };

  const handleNext = () => {
    setCurrentIndex((prev) => {
      if (prev >= loopedSlides.length - 1) return loopedSlides.length - 1; // prevent overflow
      return prev + 1;
    });
  };


  const handleTransitionEnd = () => {
    // Jump back if we hit clones
    if (currentIndex === loopedSlides.length - 1) {
      // At the end clone → reset to first real slide
      setTransitioning(false);
      setCurrentIndex(1);
    } else if (currentIndex === 0) {
      // At the start clone → reset to last real slide
      setTransitioning(false);
      setCurrentIndex(slides.length);
    } else {
      setTransitioning(true);
    }
  };

  useEffect(() => {
    // Re-enable transition after instant jump
    if (!transitioning) {
      const timeout = setTimeout(() => setTransitioning(true), 50);
      return () => clearTimeout(timeout);
    }
  }, [transitioning]);

  return (
    <section className="w-full bg-gradient-to-b from-[#f0f8ff] to-white py-16 px-4 sm:px-6 lg:px-10">
      {/* Heading */}
      <div className="text-center mb-16">
        <h2 className="text-5xl font-extrabold mb-4 primarycolormylapay bg-clip-text bg-gradient-to-r from-blue-500 to-[#2baee347]">
           SwitchX Capabilities at a <span className="secondarycolormylapay">Glance</span>
        </h2>
        <h3 className="text-xl md:text-xl font-bold mb-4 secondarycolormylapay">
          
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto items-center">
        {/* LEFT: Image */}
        <div className="flex flex-col items-center">
          <div className="w-full max-w-md rounded-xl overflow-hidden shadow-lg border border-gray-200">
            <img
                src={loopedSlides[currentIndex]?.image || ""}
                alt={loopedSlides[currentIndex]?.title || "slide"}
                className="w-full h-80 object-cover"
              />
          </div>

          {/* Controls */}
          <div className="flex justify-center gap-6 mt-4">
            <button
              onClick={handlePrev}
              className="p-3 rounded-full border border-[#1f2b5c] hover:bg-[#2cade3] hover:text-white text-[#1f2b5c] transition"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={handleNext}
              className="p-3 rounded-full border border-[#1f2b5c] hover:bg-[#2cade3] hover:text-white text-[#1f2b5c] transition"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* RIGHT: Content */}
        <div className="w-full">
          <div className="overflow-hidden">
            <div
              className={`flex ${transitioning ? "transition-transform duration-700 ease-in-out" : ""}`}
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              onTransitionEnd={handleTransitionEnd}
            >
              {loopedSlides.map((slide, idx) => (
                <div key={idx} className="flex-shrink-0 w-full p-8 ">
                  <h3 className="text-xl md:text-2xl font-semibold text-[#1f2b5c] mb-3">
                    {slide.title}
                  </h3>
                  <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                    {slide.content}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Dots (map only real slides) */}
          <div className="flex justify-center mt-5 gap-2">
            {slides.map((_, idx) => (
              <span
                key={idx}
                className={`w-2.5 h-2.5 rounded-full ${
                  (currentIndex - 1 + slides.length) % slides.length === idx
                    ? "bg-[#2cade3]"
                    : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
