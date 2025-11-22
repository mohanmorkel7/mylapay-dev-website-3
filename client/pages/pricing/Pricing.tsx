import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "@/components/layout/Footer";

const plans = [
  {
    name: "STARTER",
    subtitle: "Kickstart your journey",
    color: "bg-black text-white",
  },
  {
    name: "ADVANCE",
    subtitle: "Go beyond limits",
    color: "bg-[#2cade3] text-white",
  },
  {
    name: "ENTERPRISE",
    subtitle: "For big ambitions",
    color: "bg-[#1f2c5e] text-white",
  },
];

// 💰 Each product has different prices for each plan
const products = [
  {
    name: "Mylapay TokenX",
    prices: {
      STARTER: 300,
      ADVANCE: 600,
      ENTERPRISE: 900,
    },
  },
  {
    name: "Mylapay Secure",
    prices: {
      STARTER: 350,
      ADVANCE: 650,
      ENTERPRISE: 950,
    },
  },
  {
    name: "Mylapay C-Switch",
    prices: {
      STARTER: 400,
      ADVANCE: 700,
      ENTERPRISE: 1000,
    },
  },
  {
    name: "IntelleWatch",
    prices: {
      STARTER: 450,
      ADVANCE: 750,
      ENTERPRISE: 1050,
    },
  },
  {
    name: "IntelleSettle",
    prices: {
      STARTER: 500,
      ADVANCE: 800,
      ENTERPRISE: 1100,
    },
  },
  {
    name: "IntelleSolve",
    prices: {
      STARTER: 550,
      ADVANCE: 850,
      ENTERPRISE: 1150,
    },
  },
  {
    name: "Intelle360",
    prices: {
      STARTER: 560,
      ADVANCE: 880,
      ENTERPRISE: 1550,
    },
  },
  {
    name: "Mlapay U-Switch",
    prices: {
      STARTER: 560,
      ADVANCE: 880,
      ENTERPRISE: 1550,
    },
  },
  {
    name: "IntellePro",
    prices: {
      STARTER: 560,
      ADVANCE: 880,
      ENTERPRISE: 1550,
    },
  },
   {
    name: "Mylapay SwitchX",
    prices: {
      STARTER: 560,
      ADVANCE: 880,
      ENTERPRISE: 1550,
    },
  },

];

export default function PromotionPlans() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const openModal = (plan: string) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct([]);
  };

  return (
    <div className="w-full bg-white py-12 px-4 sm:px-6 lg:px-12 mt-5">
      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl sm:text-4xl font-bold text-center mb-10 secondarycolormylapay"
      >
        <span className="primarycolormylapay">Pricing</span> Details
      </motion.h2>

      {/* Desktop Table */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="hidden md:block"
      >
        <table className="w-full border-collapse text-center">
          <thead>
            <tr>
              <th className="text-left text-base font-semibold py-4 px-4">
                Our Products
              </th>
              {plans.map((plan, index) => (
                <th key={index} className={`p-4 ${plan.color}`}>
                  <div className="text-lg font-bold">{plan.name}</div>
                  <div className="text-sm">{plan.subtitle}</div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="text-gray-800 text-base">
            {products.map((product, rowIndex) => (
              <tr key={rowIndex} className="border-b">
                <td className="text-left py-3 px-4 font-medium">
                  {product.name}
                </td>
                {plans.map((plan, colIndex) => (
                  <td key={colIndex} className="py-3 px-4">
                    ${product.prices[plan.name as keyof typeof product.prices]}
                  </td>
                ))}
              </tr>
            ))}

            {/* Add button row */}
            <tr>
              <td></td>
              {plans.map((plan, index) => (
                <td key={index} className="py-4">
                  <button
                    onClick={() => openModal(plan.name)}
                    className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#1f2c5e] to-[#2cade3] text-white font-semibold hover:scale-105 transition-transform"
                  >
                    Choose
                  </button>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </motion.div>

      {/* Mobile Cards */}
      <div className="grid grid-cols-1 gap-6 md:hidden">
        {plans.map((plan, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="border rounded-2xl shadow-md overflow-hidden"
          >
            <div className={`${plan.color} py-4 text-center`}>
              <h3 className="text-lg font-bold">{plan.name}</h3>
              <p className="text-sm">{plan.subtitle}</p>
            </div>

            <div className="p-4 text-sm text-gray-700 space-y-2">
              {products.map((p, i) => (
                <div
                  key={i}
                  className="flex justify-between py-1 border-b last:border-b-0"
                >
                  <span className="font-medium">{p.name}</span>
                  <span>${p.prices[plan.name as keyof typeof p.prices]}</span>
                </div>
              ))}

              <button
                onClick={() => openModal(plan.name)}
                className="mt-3 w-full bg-gradient-to-r from-indigo-500 to-blue-500 text-white py-2 rounded-lg font-semibold hover:scale-105 transition-transform"
              >
                Choose
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
<AnimatePresence>
  {isModalOpen && (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
    >
      <motion.div
        className="bg-white rounded-2xl p-6 w-11/12 sm:w-96 shadow-lg relative"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        {/* Close button */}
        <button
          onClick={closeModal}
          className="absolute top-2 right-3 text-gray-500 hover:text-black text-xl"
        >
          ✕
        </button>

        {/* Modal Heading */}
        <h3 className="text-xl font-semibold mb-4 text-center">
          Select Your Product(s)
        </h3>

        {/* Multi-select dropdown */}
        <div className="relative w-full mb-4">
  <button
    type="button"
    onClick={() => setDropdownOpen(!dropdownOpen)}
    className="w-full border rounded-lg p-2 text-left flex justify-between items-center bg-white"
  >
    {selectedProduct.length > 0
      ? `${selectedProduct.length} product(s) selected`
      : "Select Product(s)"}
    <span className="ml-2">&#9662;</span>
  </button>

  {dropdownOpen && (
    <div className="absolute z-10 w-full max-h-60 overflow-auto bg-white border rounded-lg mt-1 shadow-lg">
      {products.map((product) => {
        const isSelected = selectedProduct.includes(product.name);
        return (
          <label
            key={product.name}
            className="flex items-center justify-between px-3 py-2 cursor-pointer hover:bg-gray-100"
          >
            <span>{product.name}</span>
            <input
              type="checkbox"
              checked={isSelected}
              onChange={() => {
                if (isSelected) {
                  setSelectedProduct(selectedProduct.filter((p) => p !== product.name));
                } else {
                  setSelectedProduct([...selectedProduct, product.name]);
                }
              }}
            />
          </label>
        );
      })}
    </div>
  )}
</div>


        {/* Selected Products display as pills */}
        {selectedProduct.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mt-3"
          >
            <p className="text-gray-700">
              Selected Plan:{" "}
              <span className="font-bold text-blue-600">{selectedPlan}</span>
            </p>
            <p className="text-gray-700 mb-2">Selected Product(s):</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {selectedProduct.map((product) => (
                <span
                  key={product}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                >
                  {product}
                </span>
              ))}
            </div>
          </motion.div>
        )}

        {/* Confirm button */}
        <div className="mt-6 text-center">
          <button
            onClick={closeModal}
            className="px-5 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:scale-105 transition-transform"
          >
            Confirm
          </button>
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>


      <Footer />
    </div>
  );
}
