import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
// Investors
import Investors1 from "@/pages/assets/images/77.png";
import Investors2 from "@/pages/assets/certificates/aa2_new.avif";
import Investors3 from "@/pages/assets/images/cdm.png";

// Certificates Images
import Certificate1 from "@/pages/assets/certificates/1.png";
import Certificate2 from "@/pages/assets/certificates/2.png";
import Certificate3 from "@/pages/assets/certificates/3.png";
import Certificate4 from "@/pages/assets/certificates/4.png";
import Certificate5 from "@/pages/assets/certificates/5.png";
import Certificate6 from "@/pages/assets/certificates/6.png";
import Certificate7 from "@/pages/assets/certificates/7.png";
import Certificate8 from "@/pages/assets/certificates/8.png";


// pdf
import pdf1 from "@/pages/assets/pdf/gov.pdf"
import pdf2 from "@/pages/assets/pdf/list.pdf"
import pdf3 from "@/pages/assets/pdf/emvco.pdf"
import pdf4 from "@/pages/assets/pdf/iso.pdf"
import pdf5 from "@/pages/assets/pdf/sisa.pdf"


// ----- Certificate Grid -----
function CertificateGrid({ Certificates }: { Certificates: any[] }) {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
      {Certificates.map((cert, i) => (
        <a
          key={i}
          href={cert.pdf}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center min-h-[90px] rounded-lg bg-white/80 border border-slate-200 hover:shadow-md transition"
        >
          <img
            src={cert.img}
            alt={`Certificate ${i + 1}`}
            className="h-16 w-16 object-contain"
            loading="lazy"
          />
        </a>
      ))}
    </div>
  );
}

// ----- Investor Grid -----
function InvestorGrid({ Investors }: { Investors: any[] }) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {Investors.map((invest, i) => (
        <a
          key={i}
          className="flex items-center justify-center min-h-[90px] rounded-lg bg-white/80 border border-slate-200 hover:shadow-md transition"
          href={invest.pdf}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={invest.img}
            alt={`Investor ${i + 1}`}
            className="h-16 w-24 object-contain"
            loading="lazy"
          />
        </a>
      ))}
    </div>
  );
}

// ----- Who Section -----
export default function Who() {
  const Investors = [
    { img: Investors1, pdf: "https://77.capital/" },
    { img: Investors2, pdf: "https://www.saisoncapital.com/portfolio" },
    { img: Investors3, pdf: "https://cdmcapital.in/" },
  ];

  const Certificates = [
    { img: Certificate1, pdf: pdf1 },
    { img: Certificate2, pdf: pdf2 },
    { img: Certificate3, pdf: pdf3 },
    { img: Certificate4, pdf: pdf4 },
    { img: Certificate5, pdf: pdf5 },
    {
      img: Certificate6,
      pdf: "https://seal.controlcase.com/index.php?page=showCert&cId=4174044739",
    },
    {
      img: Certificate7,
      pdf: "https://www.sisainfosec.com/certificate.php?number=65293083357311337083&type=pcisthree",
    },
    {
      img: Certificate8,
      pdf: "https://www.sisainfosec.com/certificate.php?number=65293083357311337083&type=pcisthree",
    },
  ];

  // 👇 Intersection Observer logic
  const [isVisible, setIsVisible] = useState(false);
  const gridRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (gridRef.current) observer.observe(gridRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="who" className="bg-white">
      <div className="container mx-auto py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Left Section */}
          <div className="flex flex-col justify-center text-center md:text-left px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
              Who We Are
            </h2>
            <p className="mt-3 text-base text-slate-700 max-w-xl mx-auto md:mx-0 leading-relaxed">
              Mylapay is a next-generation payment infrastructure company enabling seamless card payment
              processing through a single-window platform. As a certified processor and intermediator, Mylapay connects Payment Aggregators (PA-PGs), banks, and global card networks (Visa, MasterCard, RuPay, Amex) for complete end-to-end payment flow — authentication, authorization, fund collection, reconciliation, and dispute management.
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
                <a className="font-semibold" href="https://maps.app.goo.gl/Qwko21PwicaeEy9k7" target="_blank" rel="noopener noreferrer">Chennai</a>
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

          {/* Right Section */}
          <div
            ref={gridRef}
            className="bg-slate-50 rounded-xl p-6 border border-slate-100"
          >
            {isVisible ? (
              <>
                {/* Certificates Section */}
                <div className="text-xs font-medium text-slate-700 mb-4">
                  Certificates and Badges
                </div>
                <CertificateGrid Certificates={Certificates} />

                {/* Investors Section */}
                <div className="mt-8 text-xs font-medium text-slate-700 mb-4">
                  Backed by Prominent Investors
                </div>
                <InvestorGrid Investors={Investors} />
              </>
            ) : (
              <div className="text-center text-slate-500 py-12">
                Loading certificates & investors...
              </div>
            )}
          </div>
                    {/* Right Container */}
                 
        </div>
      </div>
    </section>
  );
}
