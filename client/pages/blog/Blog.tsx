"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { Link } from "react-router-dom";
import { CreditCard, ShieldUser, BarChart2, Globe } from "lucide-react";
import img1 from "@/pages/assets/images/reconsolation.webp";
import img2 from "@/pages/assets/images/blog/2.jpg";
import img3 from "@/pages/assets/images/blog/3.jpg";
import img4 from "@/pages/assets/images/blog/4.jpg";
import Footer from "@/components/layout/Footer";

const features = [
  {
    title: "Payment Resources",
    subtitle: "Reconciliation and Accounting of Acquiring Payments",
    date: "2024-Jan-12",
    image: img1,
    icon: <CreditCard className="w-6 h-6 text-white" />,
    link: "/blog/payment-resources",
  },
  {
    title: "Insights & Trends",
    subtitle: "Chargebacks Unveiled: A Merchant's Guide to Navigating Dispute",
    date: "2024-Jan-09",
    image: img2,
    icon: <ShieldUser className="w-6 h-6 text-white" />,
    link: "/blog/reconciliation",
  },
  {
    title: "Payment Resources",
    subtitle: "Navigating the Risk Landscape: Strategies for Effective Risk Management",
    date: "2024-Jan-09",
    image: img3,
    icon: <BarChart2 className="w-6 h-6 text-white" />,
    link: "/blog/payment-resources2",
  },
  {
    title: "Insights of Payments",
    subtitle: "Decoding Interchange: The Pivotal Cog in Payment Processing",
    date: "2024-Jan-09",
    image: img4,
    icon: <Globe className="w-6 h-6 text-white" />,
    link: "/blog/insitesofpayments",
  },
];

// Motion Variants
const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
  hover: { scale: 1.05, boxShadow: "0px 20px 50px rgba(0,0,0,0.3)" },
};

const BoxSection: React.FC = () => {
  return (
    <>
      <section className="py-20 px-6 md:px-16 bg-gray-50">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-gradient bg-clip-text text-transparent from-purple-500 secondarycolormylapay via-pink-500 to-red-500 h-50">
            Explore Our Services
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg md:text-xl">
            We deliver cutting-edge payment solutions to streamline your
            business and empower transactions globally.
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {features.map((feature, idx) => (
            <Link key={idx} to={feature.link}>
              <motion.div
                variants={cardVariants}
                whileHover="hover"
                className="relative flex flex-col items-center text-center rounded-2xl overflow-hidden cursor-pointer bg-white shadow-lg hover:shadow-2xl transition-shadow duration-500"
              >
                {/* Image Top */}
                <motion.img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-48 object-cover"
                  whileHover={{ scale: 1.1 }}
                />

                {/* Icon */}
                <motion.div
                  className="bg-[#2cade3] p-3 rounded-full -mt-6 shadow-lg flex items-center justify-center z-10"
                  whileHover={{ scale: 1.2 }}
                >
                  {feature.icon}
                </motion.div>

                {/* Content */}
                <div className="p-5 flex flex-col items-center">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-500 text-sm mb-2">
                    {feature.subtitle}
                  </p>
                  <span className="text-gray-400 text-xs">{feature.date}</span>
                </div>
              </motion.div>
            </Link>
          ))}
        </motion.div>
      </section>

      <Footer />
    </>
  );
};

export default BoxSection;
