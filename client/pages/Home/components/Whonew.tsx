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
import { Link } from "react-router-dom";

// Card network logos
import networkCertificates1 from "@/pages/assets/images/mastercard.png";
import networkCertificates2 from "@/pages/assets/cardnetworks/amex.png";
// import networkCertificates3 from "@/pages/assets/cardNetworks/juspay.jpg";
// import networkCertificates4 from "@/pages/assets/cardNetworks/razorpay.png";
import networkCertificates5 from "@/pages/assets/images/rupay.png";
// import networkCertificates6 from "@/pages/assets/images/visa.png"

import Investors1 from "@/pages/assets/images/77.png";
import Investors2 from "@/pages/assets/certificates/aa2_new.avif";
import Investors3 from "@/pages/assets/images/cdm.png";
import Investors4 from "@/pages/assets/certificates/growth.png";
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
  { img: Investors3, pdf: "https://cdmcapital.in/" },
  { img: Investors2, pdf: "https://www.saisoncapital.com" },

  { img: Investors1, pdf: "https://77.capital" },
  // { img: networkCertificates3, pdf: "https://juspay.in/" },
  // { img: networkCertificates4, pdf: "https://razorpay.com/" },
  { img: Investors4, pdf: "https://growthcap.vc/" },

  // { img: networkCertificates6, pdf: "https://www.visa.com/" },
];

export default function SolutionSuite() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className="relative py-16 px-5 md:px-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left Features */}
          <div className="flex flex-col justify-center text-center md:text-left px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
              Who We Are
            </h2>
            <p className="mt-3 text-base text-slate-700 max-w-xl mx-auto md:mx-0 leading-relaxed">
              Mylapay is a next-generation payment infrastructure company
              enabling seamless card payment processing through a single-window
              platform. As a certified processor and intermediator, Mylapay
              connects Payment Aggregators (PA-PGs), banks, and global card
              networks (Visa, MasterCard, RuPay, Amex) for complete end-to-end
              payment flow — authentication, authorization, fund collection,
              reconciliation, and dispute management.
            </p>
            <Link
              to="/about"
              className="text-sm font-medium  hover:text-[#2bcde3] dark:text-gray-300 text-[#1f2b5c] mt-5"
              aria-label="Contact us"
            >
              Read More →
            </Link>
            <div className="mt-6 flex flex-wrap justify-center md:justify-start items-center gap-6 text-sm text-slate-600">
              <div className="flex flex-col items-center md:items-start">
                <span>Founded</span>
                <span className="font-semibold">2019</span>
              </div>
              <div className="flex flex-col items-center md:items-start">
                <span>Corporate Office</span>
                <a
                  className="font-semibold"
                  href="https://maps.app.goo.gl/Qwko21PwicaeEy9k7"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Chennai
                </a>
              </div>
              <div className="flex flex-col items-center md:items-start">
                <span>Business Center</span>
                <span className="font-semibold">Mumbai</span>
              </div>
            </div>

            <div className="mt-6">
              <Link
                to="/contact"
                className="inline-block rounded-md bg-[#202c5c] px-5 py-2 text-white font-medium hover:bg-[#192247]"
              >
                Contact Us
              </Link>
            </div>
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
                  <motion.div>
                    <a
                      key={idx}
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
                Backed by Prominent Investors
              </h3>

              {/* Desktop Grid */}
              <div className="hidden lg:grid grid-cols-4 md:grid-cols-4 gap-4">
                {networkCertificates.map((netc, idx) => (
                  <motion.div>
                    <a
                      key={idx}
                      className="bg-gradient-to-tr from-blue-50 to-white rounded-2xl p-4 flex items-center justify-center shadow h-[100%]"
                      href={netc.pdf}
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
                        className="min-w-[120px] flex-shrink-0 bg-gradient-to-tr from-blue-50 to-white rounded-2xl p-4 flex items-center justify-center shadow "
                        href={netc.pdf}
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
