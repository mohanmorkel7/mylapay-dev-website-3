"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  CheckCircle,
  CloudCheck,
  Shield,
  ArrowBigUpDash,
  Users,
} from "lucide-react";

// Card network logos
import networkCertificates1 from "@/pages/assets/images/mastercard.png";
import networkCertificates2 from "@/pages/assets/cardnetworks/amex.png";
// import networkCertificates3 from "@/pages/assets/cardNetworks/juspay.jpg";
// import networkCertificates4 from "@/pages/assets/cardNetworks/razorpay.png";
import networkCertificates5 from "@/pages/assets/images/rupay.png";
import networkCertificates6 from "@/pages/assets/images/visa.png";

// Global certificates
import GCert1 from "@/pages/assets/certificates/1.png";
import GCert2 from "@/pages/assets/certificates/2.png";
import GCert3 from "@/pages/assets/certificates/3.png";
import GCert4 from "@/pages/assets/certificates/4.png";
import GCert5 from "@/pages/assets/certificates/5.png";
import GCert6 from "@/pages/assets/certificates/6.png";
import GCert7 from "@/pages/assets/certificates/7.png";
import GCert8 from "@/pages/assets/certificates/8.png";

import Gcpdf2 from "@/pages/assets/pdf/list.pdf";
import Gcpdf4 from "@/pages/assets/pdf/iso.pdf";
import Gcpdf5 from "@/pages/assets/pdf/emvco.pdf";

const features = [
  {
    title: "Ready for tomorrow’s challenge—today",
    description: "Instant adoption to card scheme rule changes",
    icon: CheckCircle,
  },
  {
    title: "User-Friendly APIs",
    description: "Simplified integration for faster go-to-market",
    icon: Users,
  },
  {
    title: "Cloud-Native Platform",
    description: "Resilient, secure, and effortlessly scalable",
    icon: CloudCheck,
  },
];

// Global certificates (image + pdf/external link)
const globalCertificates = [
  {
    img: GCert1,
    pdf: "https://seal.controlcase.com/index.php?page=showCert&cId=4174044739",
  },
  {
    img: GCert2,
    pdf: "https://www.sisainfosec.com/certificate.php?number=23955864680360684188&type=pci3ds",
  },
  {
    img: GCert3,
    pdf: "https://www.sisainfosec.com/certificate.php?number=65293083357311337083&type=pcisthree",
  },
  { img: GCert4, pdf: Gcpdf4 },
  { img: GCert5, pdf: Gcpdf5 },
  {
    img: GCert6,
  },
  { img: GCert7 },
  { img: GCert8, pdf: Gcpdf2 },
];

// Card networks (image + site link)
const networkCertificates = [
  { img: networkCertificates1, pdf: "https://www.mastercard.com/" },
  { img: networkCertificates2, pdf: "https://www.americanexpress.com/" },
  // { img: networkCertificates3, pdf: "https://juspay.in/" },
  // { img: networkCertificates4, pdf: "https://razorpay.com/" },
  { img: networkCertificates5, pdf: "https://www.rupay.co.in/" },
  { img: networkCertificates6, pdf: "https://www.visa.com/" },
];

export default function SolutionSuite() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className="relative py-16 px-5 md:px-20 bg-gradient-to-br from-blue-50 to-white overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute -top-32 -left-32 w-64 h-64 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
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
            Enterprise-Grade Infrastructure,
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold mb-4 secondarycolormylapay">
            engineered for high performance.
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Compliance-First. Developer-Friendly. Future-Ready.
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
                className="relative p-6 rounded-2xl bg-white border border-gray-200 cursor-default hover:bg-gradient-to-br hover:from-blue-50 hover:to-[#2baee347]"
              >
                {/* Circle with Icon */}
                <div
                  className={`absolute -top-5 -right-5 w-20 h-20 rounded-full flex items-center justify-center ${
                    hovered === idx ? "bg-[#2baee347]" : "bg-blue-100"
                  } opacity-90 transition-colors duration-200`}
                >
                  <feature.icon className="w-8 h-8 primarycolormylapay" />
                </div>

                {/* Content */}
                <h4 className="font-bold text-lg lg:text-2xl mb-1 secondarycolormylapay">
                  {feature.title}
                </h4>
                <p className="text-gray-600 text-sm lg:text-xl">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Right Container */}
          <div className="flex-1 flex flex-col gap-8">
            {/* Global Security Certificates */}
            <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-200">
              <h3 className="text-lg font-bold primarycolormylapay mb-4 text-center">
                Global Security Compliant
              </h3>

              {/* Desktop Grid */}
              <div className="hidden  flex-wrap gap-4 justify-center lg:grid grid-cols-4 md:grid-cols-4 gap-4">
                {globalCertificates.map((cert, idx) => (
                  <motion.div key={`gcert-${idx}`}>
                    <a
                      href={cert.pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="min-w-[100px] flex items-center justify-center bg-blue-50 rounded-2xl p-4 shadow"
                    >
                      <img
                        src={cert.img}
                        alt={`Global Certificate ${idx + 1}`}
                        className="max-h-10 object-contain"
                      />
                    </a>
                  </motion.div>
                ))}
              </div>

              {/* Mobile Auto-Scroll */}
              <div className="relative overflow-hidden lg:hidden">
                <motion.div
                  className="flex gap-4 py-3"
                  style={{ whiteSpace: "nowrap" }} // ensures horizontal layout
                  initial={{ x: 0 }}
                  animate={{ x: ["0%", "-300%"] }} // slide fully
                  transition={{
                    x: {
                      repeat: Infinity,
                      repeatType: "loop",
                      duration: 30,
                      ease: "linear",
                    },
                  }}
                >
                  {globalCertificates
                    .concat(globalCertificates)
                    .map((cert, idx) => (
                      <a
                        key={idx}
                        href={cert.pdf}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="min-w-[100px] flex-shrink-0 bg-blue-50 rounded-2xl p-4 flex items-center justify-center shadow"
                      >
                        <img
                          src={cert.img}
                          alt={`Global Certificate ${idx + 1}`}
                          className="max-h-10 object-contain"
                        />
                      </a>
                    ))}
                </motion.div>
              </div>
            </div>

            {/* Card Network Certificates */}
            <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-200">
              <h3 className="text-lg font-bold primarycolormylapay mb-4 text-center">
                Certificate by Card Networks
              </h3>

              {/* Desktop Grid */}
              <div className="hidden lg:grid grid-cols-2 md:grid-cols-2 gap-4">
                {networkCertificates.map((netc, idx) => (
                  <motion.div>
                    <a
                      key={idx}
                      className="bg-gradient-to-tr from-blue-50 to-white rounded-2xl p-4 flex items-center justify-center shadow"
                      // href={netc.pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      // initial={{ opacity: 0, y: 20 }}
                      // whileInView={{ opacity: 1, y: 0 }}
                      // viewport={{ once: true }}
                      // transition={{ duration: 0.3, delay: idx * 0.05 }}
                    >
                      <img
                        src={netc.img}
                        alt={`Card Network ${idx + 1}`}
                        className="max-h-12 object-contain"
                      />
                    </a>
                  </motion.div>
                ))}
              </div>

              {/* Mobile Auto-Scroll */}
              <div className="relative overflow-hidden lg:hidden">
                <motion.div
                  className="flex gap-4 py-3"
                  initial={{ x: 0 }}
                  animate={{ x: ["0%", "-300%"] }}
                  transition={{
                    x: {
                      repeat: Infinity,
                      repeatType: "loop",
                      duration: 25,
                      ease: "linear",
                    },
                  }}
                >
                  {networkCertificates
                    .concat(networkCertificates)
                    .map((netc, idx) => (
                      <a
                        key={idx}
                        className="min-w-[120px] flex-shrink-0 bg-gradient-to-tr from-blue-50 to-white rounded-2xl p-4 flex items-center justify-center shadow"
                        // href={netc.pdf}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          src={netc.img}
                          alt={`Card Network ${idx + 1}`}
                          className="max-h-12 object-contain"
                        />
                      </a>
                    ))}
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
