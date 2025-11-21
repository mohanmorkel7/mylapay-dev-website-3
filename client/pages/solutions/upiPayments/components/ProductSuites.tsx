"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom"; // ✅ React Router Link
import {
  Activity,
  BarChart3,
  Database,
  GitBranch,
  KeyRound,
  RotateCcw,
  Server,
  ShieldAlert,
  ShieldCheck,
  Zap,
} from "lucide-react";

import featureImg1 from "@/pages/assets/images/ScrollStack2.jpeg";
import featureImg2 from "@/pages/assets/images/cardPayments.png";

const features = [
  { title: "Mylapay TokenX", description: "Card Tokenization - COLF & Alt ID", span: "Encrypt | Process | Tokenize", icon: KeyRound, link: "/products/mylapay-tokenx" },
  { title: "Mylapay Secure", description: "3DS Server certified by EMVCo", span: "Detect | Prevent | Authenticate", icon: ShieldCheck, link: "/products/mylapay-secure" },
  { title: "Mylapay C-Switch", description: "Base I Auth Switch for Card Payments", span: "Integrate | Transact | Authorize", icon: Server, link: "/products/mylapay-cswitch" },
  { title: "IntelleWatch", description: "Fraud Risk Management (FRM) System", span: "Monitor | Block | Safeguard", icon: ShieldAlert, link: "/products/mylapay-intellewatch" },
  { title: "IntelleSettle", description: "Base II Clearing & Settlement System", span: "Submit | Collect | Settle", icon: Database, link: "/products/mylapay-intellesettle" },
  { title: "IntelleSolve", description: "Chargeback Management System", span: "Defend | Resolve | Recover", icon: RotateCcw, link: "/products/mylapay-intellesolve" },
  { title: "Intelle360", description: "Analytics Suite for Acquiring Payments", span: "Intelligence | Protection | Growth", icon: BarChart3, link: "/products/mylapay-intelle360" },
  { title: "Mylapay U-Switch", description: "UPI Switch for PSPs, Beneficiary Banks", span: "Connect | Route | Approve", icon: GitBranch, link: "/products/mylapay-uswitch" },
  { title: "IntellePro", description: "Real-time TMS for UPI Transactions", span: "Reconcile | Settle | Recover", icon: Activity, link: "/products/mylapay-intellepro" },
  { title: "Mylapay Switch X", description: "Clearing & Settlements Solution", span: "Route | Integrate | Optimize", icon: Zap, link: "/products/mylapay-switchx" },
];

const highlightOrder = [7, 8];
const featureImages = [featureImg1, featureImg2];

export default function PrecisionSolutions() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [highlightedSet, setHighlightedSet] = useState<number[]>([]);
  const [step, setStep] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.1", "end 0.1"],
  });
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const topTwoFeatures = highlightOrder.map((i) => features[i]);
  const remainingFeatures = features.filter((_, i) => !highlightOrder.includes(i));

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const startCycle = () => {
      timer = setInterval(() => {
        setHighlightedSet((prev) => {
          if (step >= highlightOrder.length) {
            clearInterval(timer);
            setTimeout(() => {
              setHighlightedSet([]);
              setStep(0);
              startCycle();
            }, 3000);
            return prev;
          }
          const nextIndex = highlightOrder[step];
          setStep((prevStep) => prevStep + 1);
          return [...prev, nextIndex];
        });
      }, 2000);
    };

    startCycle();
    return () => clearInterval(timer);
  }, [step]);

  return (
    <section className="relative py-12 px-6 md:px-20" ref={containerRef}>
      <div className="max-w-7xl mx-auto relative">
        {/* TOP TWO HIGHLIGHTED CONTAINERS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-8">
          {topTwoFeatures.map((feature, idx) => {
            const Icon = feature.icon as any;
            const originalIndex = highlightOrder[idx];
            const isHighlighted = highlightedSet.includes(originalIndex);
            const bgImage = featureImages[idx];

            return (
              <Link key={idx} to={feature.link || "#"}>
                <motion.div
                  className={`relative flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 bg-cover bg-center cursor-pointer`}
                  style={{
                    backgroundImage: `url(${bgImage})`,
                    borderColor: isHighlighted ? "#3b82f6" : "#e5e7eb",
                    boxShadow: isHighlighted
                      ? "0 10px 20px rgba(59,130,246,0.3)"
                      : "0 2px 6px rgba(0,0,0,0.05)",
                  }}
                  animate={{ scale: isHighlighted ? 1.05 : 1 }}
                >
                  <div className="absolute inset-0 bg-black bg-opacity-45 rounded-2xl pointer-events-none" />
                  <div className="relative z-10 flex-1 text-white">
                    <h4 className="font-semibold text-lg mb-1">{feature.title}</h4>
                    <p className="text-sm mb-2">{feature.description}</p>
                    <span className="text-blue-100 font-medium text-sm">{feature.span}</span>
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </div>

        {/* DIVIDER LINE */}
        <div className="relative mb-12">
          <svg
            className="absolute left-1/2 transform -translate-x-1/2 h-full w-[6px] pointer-events-none"
            viewBox="0 0 6 2000"
            preserveAspectRatio="none"
          >
            <line x1="3" y1="0" x2="3" y2="2000" stroke="#E5E7EB" strokeWidth="1" strokeLinecap="round" strokeDasharray="80 140" />
            <motion.line
              x1="3"
              y1="0"
              x2="3"
              y2="2000"
              stroke="url(#blueGradient)"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray="80 140"
              style={{ pathLength }}
            />
            <defs>
              <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2cade3" />
                <stop offset="100%" stopColor="#1f2b5c" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* REMAINING CONTAINERS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {remainingFeatures.map((feature, idx) => {
            const Icon = feature.icon as any;
            return (
              <Link key={idx} to={feature.link || "#"}>
                <motion.div
                  className="relative flex flex-col items-center text-center transition-all duration-300 cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="w-14 h-14 flex items-center justify-center rounded-full bg-gray-100 border border-gray-300 mb-3">
                    <Icon className="w-7 h-7 text-gray-800" />
                  </div>
                  <div className="p-4 rounded-xl w-full max-w-[280px] border border-gray-200 bg-white shadow-sm">
                    <h4 className="font-medium text-gray-900 text-sm mb-1">{feature.title}</h4>
                    <p className="text-gray-600 text-xs mb-2">{feature.description}</p>
                    <span className="text-blue-700 text-xs font-medium">{feature.span}</span>
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
