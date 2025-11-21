"use client";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Building2, CreditCard, IndianRupee, Network } from "lucide-react";
import image from "../assets/images/fav.png";
import ScrollStack2 from "@/pages/assets/images/solutions-bg.jpg"
import AcImg from "@/pages/assets/images/ac-support.jpg"
import Card from "@/pages/assets/images/card.jpg"
import Upi from "@/pages/assets/images/upi.jpg"
import Orchestration from "@/pages/assets/images/paymentOric.jpg"

const slides = [
  {
    key: "acquiring",
    title: "Acquiring support",
    description:
      "Flexible, stand-alone, high performance modules that enhance your acquiring payment program at any stage of your acquiring lifecycle.",
    image: AcImg,
    link: "/solutions/acquiring"
  },
  {
    key: "card",  
    title: "Card Payments",
    description:
      "Unified processing platform that powers your acquiring program - from card tokenization and authentication to authorization, settlement, reconciliation, and reporting.",
    image: Card,
    link: "/solutions/card-payments"
  },
  {
    key: "upi",
    title: "UPI payments",
    description:
      "High-performance UPI acquiring platform designed for real-time switching, reconciliation, settlement, adjustments, and dispute resolution.",
    image: Upi,
    link: "/solutions/upi-payments"
  },
  {
    key: "orchestration",
    title: "Payment Orchestration",
    description:
      "A next-gen orchestration hub that supercharges your payment acceptance rails with smart routing, cost efficiency, and real-time control.",
    image: Orchestration,
    link: "/solutions/payment-orchestration"

  },
];

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [matches, query]);

  return matches;
}

export default function ScrollStack() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 85,
    damping: 10,
    mass: 0.2,
  });

  // make section tall enough to hold animations
  const sectionHeight = `${slides.length * 100}vh`;
const text = "Our Solutions";
  return (
    <> 
    <h1 className="fixed top-[-230px] md:top-[-200px] left-0 w-full h-screen z-[8] flex items-center justify-center text-2xl md:text-3xl lg:text-5xl font-bold text-white">
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          className={char === " " ? "mx-1" : ""}
          animate={{
            y: [0, -10, 0],      // vertical movement
            opacity: [0, 1, 1],   // fade in, then hold
          }}
          transition={{
            duration: 1,          // animation time
            delay: index * 0.1,   // stagger letters
            repeat: Infinity,     // infinite loop
            repeatType: "loop",
            repeatDelay: 4        // pause before next loop
          }}
        >
          {char}
        </motion.span>
      ))}
    </h1>
    <section
      ref={containerRef}
      className="relative w-full bg-[#2cade3] "
      style={{ height: sectionHeight, marginTop: "-500px" }}
    >
      <div
        className="fixed top-0 left-0 w-full h-screen z-0"
        style={{
          backgroundImage: `url(${ScrollStack2})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          opacity:"0.8"
        }}
      >
        <div className="absolute inset-0 bg-black/30" /> {/* optional dark overlay */}
      </div>
      {/* sticky ensures fixed stack is released at section end */}
      <div className="sticky top-0 h-screen z-[9]">
        {/* fixed stack */}
        <div className="fixed top-0 left-0 w-full h-screen flex items-center justify-center pointer-events-auto">
          {slides.map((slide, index) => {
            const start = index / slides.length;
            const end = (index + 1) / slides.length;

            const isSmallScreen = useMediaQuery(
              "(min-width: 320px) and (max-width: 476px)"
            );

            // 🎯 First card has no animation in Y & opacity, but SAME scale as others
            const y =
              index === 0
                ? "0%" // stays fixed
                : useTransform(
                    smoothScroll,
                    [start, end],
                    [
                      "100%",
                      isSmallScreen
                        ? index === 3
                          ? "12%"
                          : `${index * 4}%`
                        : index === 3
                        ? "12%"
                        : `${index * 4}%`,
                    ]
                  );

            const opacity =
              index === 0
                ? 1 // always visible
                : useTransform(smoothScroll, [start, end], [0, 1]);

            // ✅ Keep same scale for all cards
            const scale = useTransform(smoothScroll, [start, end], [0.65, 0.85]);

            return (
            
              <motion.div
              
                key={slide.key}
                style={{ y, opacity, scale, zIndex: index + 1}}
                //  boxShadow: "rgb(31, 43, 92) 1px 1px 11px -5px" }
                className="absolute w-[90vw] md:w-[85vw] h-[470px] md:h-[350px] 
                           p-6 md:p-8 bg-white rounded-xl border border-slate-200 shadow-xl 
                           flex flex-col md:flex-row gap-6 items-stretch overflow-hidden "
              >
                {/* Image */}
                <div className="w-full md:w-56 h-40 md:h-full flex-shrink-0">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover rounded-lg border border-slate-300"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col justify-between content">
                  <div>
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-md bg-[#e6f7fb] text-[#2caee4]">
                      {slide.key === "acquiring" ? (
                        <Building2 className="h-5 w-5" />
                      ) : slide.key === "card" ? (
                        <CreditCard className="h-5 w-5" />
                      ) : slide.key === "upi" ? (
                        <IndianRupee className="h-5 w-5" />
                      ) : (
                        <Network className="h-5 w-5" />
                      )}
                    </div>
                    <h3 className="mt-4 text-lg md:text-2xl font-semibold text-slate-900">
                      {slide.title}
                    </h3>
                    <p className="mt-3 text-sm md:text-base text-muted-foreground max-w-xl leading-relaxed">
                      {slide.description}
                    </p>
                  </div>

                  {/* Button pinned to bottom */}
              <div className="mt-auto pt-4">
                <Link
                  to={slide.link}
                  className="inline-flex items-center gap-2 text-sm md:text-base font-medium text-[#2caee4] "
                >
                  Learn more →
                </Link>
              </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
    </>
  );
}
