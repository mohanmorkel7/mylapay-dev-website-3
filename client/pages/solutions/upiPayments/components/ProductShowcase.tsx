import { motion, Variants } from 'framer-motion';
import {
  Shield,
  Lock,
  RefreshCw,
  DollarSign,
  ArrowDown,
  User,
  Zap,
  CreditCard,
  Code,
  Globe,
  Wallet,
} from 'lucide-react';
import React from 'react';
import logo from "@/pages/assets/images/fav.png"
import ProductSuites from './ProductSuites';

const icons = [
  Shield,
  Lock,
  RefreshCw,
  DollarSign,
  User,
  Zap,
  CreditCard,
  Code,
  Globe,
  Wallet,
];

const containerVariants: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const iconVariants: Variants = {
  initial: {
    y: '-100%',
    opacity: 0,
  },
  animate: {
    y: '100%',
    opacity: 1,
    transition: {
      repeat: Infinity,
      repeatType: 'loop',
      duration: 10,
      ease: 'linear',
    },
  },
};

const arrowVariants: Variants = {
  animate: {
    y: [0, 5, 0],
    transition: {
      repeat: Infinity,
      duration: 1.5,
      ease: 'easeInOut',
    },
  },
};

const backgroundLineVariants: Variants = {
  initial: {
    y: '-100%',
  },
  animate: (i: number) => ({
    y: ['-100%', '100%'],
    transition: {
      duration: 10 + i * 0.5,
      repeat: Infinity,
      ease: 'linear',
    },
  }),
};

const FlowingDesign = () => {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#e6efff] p-4 text-center">
      {/* Background Lines */}
      {Array.from({ length: 10 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-full w-[2px] rounded-full bg-blue-400 opacity-20"
          style={{
            left: `${10 * i}%`,
            transform: 'translateX(-50%)',
            filter: 'blur(1px)',
          }}
          variants={backgroundLineVariants}
          custom={i}
          initial="initial"
          animate="animate"
        />
      ))}

      <div className="relative z-10 flex flex-col items-center justify-center mt-16">
        {/* Top Text and Slogan */}
        <h1 className="mb-2 text-2xl font-semibold text-gray-800 md:text-4xl">
          Mylapay Products
        </h1>
        <h2 className="mb-8 text-xl font-bold primarycolormylapay md:text-3xl">
           Modular, Plug-in Product Set for UPI Payments
        </h2>

        {/* Central Card and Logo */}
        <motion.div
          className="flex transform cursor-pointer flex-col items-center justify-center rounded-2xl bg-white p-6 shadow-xl transition-transform duration-300 hover:scale-105"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Centered Image (replace with your image component) */}
          <div className="mb-4 h-16 w-16 rounded-full bg-blue-100 p-2">
            <img src={logo} alt="Mylapay Logo" className="h-full w-full object-contain" />
          </div>
        </motion.div>

        {/* Flowing Icons */}

        

        {/* Product Info Text */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">Agile | Flexible | Built for You</p>
        </div>
        <motion.div
            className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md mt-6"
            variants={arrowVariants}
            animate="animate"
          >
            <ArrowDown className="h-6 w-6 text-blue-500" />
        </motion.div>
        <ProductSuites/>

      </div>
    </div>
  );
};

export default FlowingDesign;