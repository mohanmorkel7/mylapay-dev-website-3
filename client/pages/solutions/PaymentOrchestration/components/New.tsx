import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Landmark, CreditCard, ShoppingCart, IndianRupee } from "lucide-react";
import image1 from "../assets/images/bank.jpg";
import image2 from "../assets/images/Customer.jpg";
import image3 from "../assets/images/Institiute.jpg";
import image4 from "../assets/images/payments.jpg";
import image5 from "../assets/images/overall.jpg"; 
import myLogo from "@/pages/assets/images/fav.png"; 

const rotatingContent = [
  {
    image: image1,
    title: "Banks",
    icon: <Landmark className="w-6 h-6 text-white" />,
    points: [
      "Enabling BIN Sponsorship for financial institution and payment aggregators , Operating in merchant acquiring program and payment gateways",
      "",
    ],
  },
  {
    image: image2,
    title: "Financial Institutions (PA-O / PA-CB)",
    icon: <CreditCard className="w-6 h-6 text-white" />,
    points: ["Operating in payment aggregation , Offering payment gateway to merchants"],
  },
  {
    image: image3,
    title: "Point-of-Sales Providers (PA-P)",
    icon: <ShoppingCart className="w-6 h-6 text-white" />,
    points: ["Offering payment acceptance through POS terminals"],
  },
  {
    image: image4,
    title: "Payment Processors",
    icon: <IndianRupee className="w-8 h-6 text-white" />,
    points: [
      "Offering technical services to acquirers, banks, financial institution and payment aggregators",
    ],
  },
];

const AcquiringPlatform = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [holdAll, setHoldAll] = useState(false);

  useEffect(() => {
    let timer;
    if (!holdAll) {
      timer = setInterval(() => {
        if (currentIndex < rotatingContent.length - 1) {
          setCurrentIndex((prev) => prev + 1);
        } else {
          setHoldAll(true);
        }
      }, 5000);
    } else {
      timer = setTimeout(() => {
        setHoldAll(false);
        setCurrentIndex(0);
      }, 5000);
    }

    return () => {
      clearInterval(timer);
      clearTimeout(timer);
    };
  }, [currentIndex, holdAll]);

  return (
    <div className="bg-[#1f2b5c] text-white py-16 px-4 md:px-16">
      {/* Heading */}
      <motion.div
        className="w-full flex flex-col items-center mb-12"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-center">
          <span className="block text-white font-extrabold text-4xl md:text-5xl lg:text-6xl leading-tight mb-2">
            One orchestration layer 
          </span>
          <span className="block text-[#B9C3E2] font-normal text-3xl md:text-4xl lg:text-5xl leading-tight">
            powering limitless possibilities.
          </span>
        </h2>
        <p className="mt-6 text-center text-white max-w-2xl" style={{ fontFamily: "'Surt-Normal-TRIAL', sans-serif", fontWeight: 400, fontSize: "24px", lineHeight: "37px" }}>
          Custom-built to serve varied business needs while empowering every player in the acquiring ecosystem.
        </p>
      </motion.div>

      {/* Main Section */}
      <div className="flex flex-col md:flex-row items-center gap-12 max-w-6xl mx-auto relative">
        {/* Left Card */}
        <motion.div
          className="flex-1 flex justify-center items-center mb-10 md:mb-0"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="bg-white rounded-2xl shadow-lg w-[350px] h-[220px] md:w-[420px] md:h-[260px] flex flex-col overflow-hidden relative">
            {/* Card Header */}
            <div className="flex items-center px-4 py-2 border-b border-gray-200">
              <span className="w-3 h-3 bg-red-400 rounded-full mr-2 animate-pulse"></span>
              <span className="w-3 h-3 bg-yellow-400 rounded-full mr-2 animate-pulse"></span>
              <span className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></span>
              <span className="ml-4 text-xs text-gray-400">mylapay.com</span>
            </div>

            {/* Rotating Images */}
            <div className="flex-1 relative">
              {rotatingContent.map((item, idx) => (
                <motion.img
                  key={idx}
                  src={holdAll ? image5 : item.image}
                  alt="Rotating"
                  initial={false}
                  animate={{ opacity: idx === currentIndex || holdAll ? 1 : 0 }}
                  transition={{ duration: 1 }}
                  className="absolute inset-0 w-full h-full object-cover rounded-b-2xl"
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right Content with connector */}
        <div className="flex-1 relative flex justify-center md:justify-start">
          {/* Curved connector with logo */}
          {/* <div className="hidden md:flex items-center absolute left-[-60px] top-0 h-full">
            <div className="relative w-12 h-full flex flex-col justify-center items-center">
              <div className="w-6 h-6 border-t-2 border-r-2 border-[#2baee4] rounded-tr-full"></div>
              <div className="bg-white rounded-full p-2 my-2 shadow-lg">
                <img src={myLogo} alt="Logo" className="w-8 h-8 object-contain" />
              </div>
              <div className="w-6 h-6 border-b-2 border-l-2 border-[#2baee4] rounded-bl-full"></div>
            </div>
          </div> */}

{/* Right side content */}
{!holdAll ? (
  <motion.div
    key={rotatingContent[currentIndex].title}
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1 }}
    className="flex flex-col gap-4"
  >
    {(currentIndex < 2
      ? [rotatingContent[currentIndex].points[0]] // show only first point for first two
      : rotatingContent[currentIndex].points
    ).map((point, idx) => (
      <motion.div
        key={idx}
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: idx * 0.2 }}
        className="flex items-start gap-4"
      >
        <div className="flex-shrink-0 w-10 h-10 bg-[#2baee4] rounded-full flex items-center justify-center text-white shadow-lg">
          {rotatingContent[currentIndex].icon}
        </div>
        <div>
          <h3 className="font-bold text-xl text-white mb-1">{rotatingContent[currentIndex].title}</h3>
          <p className="text-gray-300 text-md">{point}</p>
        </div>
      </motion.div>
    ))}
  </motion.div>
) : (
  <motion.div
    key="all-cards-hold"
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1 }}
    className="flex flex-col gap-6"
  >
    {rotatingContent.map((item, idx) => (
      <motion.div
        key={idx}
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: idx * 0.2 }}
        className="flex items-start gap-4"
      >
        <div className="flex-shrink-0 w-10 h-10 bg-[#2baee4] rounded-full flex items-center justify-center text-white shadow-lg">
          {item.icon}
        </div>
        <div>
          <h3 className="font-bold text-xl text-white mb-1">{item.title}</h3>
          {(idx < 2 ? [item.points[0]] : item.points).map((point, i) => (
            <p key={i} className="text-gray-300 text-md">{point}</p>
          ))}
        </div>
      </motion.div>
    ))}
  </motion.div>
)}

        </div>
      </div>

      {/* Bottom Cards */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-6xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {[
          { title: "Payment Acceptance", desc: "POS and eCommerce payment gateway." },
          { title: "BIN Sponsorship", desc: "Supports both dedicated and shared models" },
          { title: "Payment Rails", desc: "Cards, UPI and Net-Banking payment rails" },
          { title: "Networks Connectivity", desc: "Integrated with all major global card schemes" },
        ].map((item, i) => (
          <motion.div
            key={i}
            whileHover={{
              y: -10,
              scale: 1.05,
              boxShadow: "0 10px 20px rgba(43, 174, 228, 0.35)",
              borderColor: "#2baee4",
              transition: { type: "spring", stiffness: 250, damping: 18 },
            }}
            whileTap={{ scale: 0.98 }}
            className="border border-blue-400 rounded-lg p-6 text-center bg-white/10 backdrop-blur-lg shadow-md cursor-default"
          >
            <h4 className="font-semibold text-lg text-[#2baee4]">{item.title}</h4>
            <p className="text-gray-200 mt-2">{item.desc}</p> 
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default AcquiringPlatform;
