"use client";

import { motion } from "framer-motion";
import { useState } from "react";

// Card network logos
import networkCertificates1 from "../../../assets/cardNetworks/MasterCard.png";
import networkCertificates2 from "../../../assets/cardNetworks/amex.png";
import networkCertificates3 from "../../../assets/cardNetworks/juspay.jpg";
import networkCertificates4 from "../../../assets/cardNetworks/razorpay.png";
import networkCertificates5 from "../../../assets/cardNetworks/rupay.png";
import networkCertificates6 from "../../../assets/cardNetworks/visa.png";

// Global certificates
import GCert1 from "../../../assets/certificates/cc1.png";
import GCert2 from "../../../assets/certificates/ServiceProviderBadge_1.png";
import GCert3 from "../../../assets/certificates/cc2.png";
import GCert4 from "../../../assets/certificates/iso.png";
import GCert5 from "../../../assets/certificates/PCI_3DS.png";
import GCert6 from "../../../assets/certificates/PCIDSS.png";

const features = [
  { title: "Payment Acceptance", description: "POS and eCommerce payment gateway." },
  { title: "BIN Sponsorship", description: "Supports both dedicated and shared models" },
  { title: "Card Networks Connectivity", description: "Integrated with all major global card schemes" },
];

const globalCertificates = [GCert1, GCert2, GCert3, GCert4, GCert5, GCert6];
const networkCertificates = [
  networkCertificates1,
  networkCertificates2,
  networkCertificates3,
  networkCertificates4,
  networkCertificates5,
  networkCertificates6
];

export default function SolutionSuite() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className="relative py-16 px-5 md:px-20 bg-gradient-to-br from-blue-50 to-white overflow-hidden">
      {/* Decorative circles */}
      {/* <div className="absolute -top-32 -left-32 w-64 h-64 bg-blue-200 rounded-full opacity-20 animate-pulse"></div> */}
      <div className="absolute -bottom-32 -right-24 w-72 h-72 bg-[#2baee347] rounded-full opacity-20 animate-pulse"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl font-extrabold mb-4 primarycolormylapay bg-clip-text bg-gradient-to-r from-blue-500 to-[#2baee347]">
            One Solution Suite
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">
            Endless Possibilities
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Custom-built to serve varied business needs while empowering every player in the acquiring ecosystem.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left Features */}
          <div className="flex-1 grid grid-cols-1 gap-6 relative">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                onHoverStart={() => setHovered(idx)}
                onHoverEnd={() => setHovered(null)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{
                  scale: 1.02,
                  y: -2,
                  boxShadow: "0 15px 30px rgba(0,0,0,0.1)",
                  transition: { duration: 0.12, ease: "easeOut" },
                }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="relative p-6 rounded-2xl bg-white border border-gray-200 cursor-pointer hover:bg-gradient-to-br hover:from-blue-50 hover:to-[#2baee347]"
              >
                <div
                  className={`absolute -top-5 -right-5 w-20 h-20 rounded-full ${
                    hovered === idx ? "bg-[#2baee347]" : "bg-blue-100"
                  } opacity-30 pointer-events-none transition-colors duration-200`}
                ></div>
                <h4 className="font-bold text-lg mb-1 text-gray-800">{feature.title}</h4>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Right Container - Alternate Design */}
          <div className="flex-1 flex flex-col gap-8">
            {/* Global Security Certificates - Horizontal Scroll Cards */}
            <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-200">
              <h3 className="text-lg font-bold primarycolormylapay mb-4 text-center">
                Global Security Compliant
              </h3>
              <div className="flex  gap-4 scrollbar-hide py-3 overflow-hidden">
                {globalCertificates.map((img, idx) => (
                  <motion.div
                    key={idx}
                    className="min-w-[100px] flex-shrink-0 bg-blue-50 rounded-2xl p-4 flex items-center justify-center shadow hover:scale-105 transition-transform"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                  >
                    <img
                      src={img}
                      alt={`Global Certificate ${idx + 1}`}
                      className="max-h-10 object-contain"
                    />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Card Network Certificates - Staggered Grid Cards */}
            <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-200">
              <h3 className="text-lg font-bold primarycolormylapay mb-4 text-center">
                Certificate by Card Networks
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {networkCertificates.map((img, idx) => (
                  <motion.div
                    key={idx}
                    className="bg-gradient-to-tr from-blue-50 to-white rounded-2xl p-4 flex items-center justify-center shadow hover:scale-105 transition-transform"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                  >
                    <img
                      src={img}
                      alt={`Card Network ${idx + 1}`}
                      className="max-h-12 object-contain"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
