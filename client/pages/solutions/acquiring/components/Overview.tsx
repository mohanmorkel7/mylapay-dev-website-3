"use client";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Gauge,
  Server,
  BarChart3,
  Layers,
  CreditCard,
  FileBarChart,
  Repeat,
  Network,
  Workflow,
} from "lucide-react";

const modules = [
  { icon: CreditCard, title: "Card Token", desc: "COFT & Alt Id" },
  { icon: ShieldCheck, title: "3DSS", desc: "Authentication" },
  { icon: Layers, title: "Base I Auth", desc: "Switch for Cards" },
  { icon: Server, title: "Base II", desc: "Clearing System" },
  { icon: Workflow, title: "FRM", desc: "Fraud Risk Management" },
  { icon: BarChart3, title: "Cards Analytics", desc: "Recon & Reporting" },
  { icon: Repeat, title: "Chargeback", desc: "Dispute Management" },
  { icon: Network, title: "UPI Switch", desc: "Real-time payments" },
  { icon: FileBarChart, title: "UPI Settlement", desc: "Recon & Reporting" },
  { icon: Gauge, title: "Payment Orchestration", desc: "Dynamic Routing" },
];

export default function AcquiringModules() {
  return (
    <section
      id="modules"
      className="relative bg-white py-16 md:py-24 scroll-mt-20"
    >
      <div className="container mx-auto px-4 md:px-8">
        {/* Title */}
<div className="text-center max-w-4xl mx-auto px-4">
  {/* Heading */}
  <motion.h2
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    viewport={{ once: true }}
    className="text-3xl md:text-4xl lg:text-5xl font-extrabold secondarycolormylapay leading-tight"
  >
    We integrate at{" "}
    <span className="primarycolormylapay">
      any point
    </span>{" "}
    in your acquiring lifecycle
  </motion.h2>


  {/* Subheading */}
  <motion.p
    initial={{ opacity: 0, y: 15 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7, ease: "easeOut", delay: 0.4 }}
    viewport={{ once: true }}
    className="mt-5 text-base md:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto"
  >
    to deliver a stand-alone, high-performance modules
  </motion.p>
</div>


        {/* Grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {modules.map(({ icon: Icon, title, desc }, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                ease: "easeOut",
                delay: idx * 0.1,
              }}
              viewport={{ once: true }}
              className="group flex items-center gap-4 p-5 rounded-xl border bg-white/70 backdrop-blur-md shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              {/* Icon with fill animation */}
              <div className="relative flex h-12 w-12 items-center justify-center rounded-full border border-slate-300 overflow-hidden shrink-0">
                {/* Background fill animation */}
                <div className="absolute inset-0 bg-sky-500 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
                {/* Icon */}
                <Icon className="relative z-10 h-6 w-6 text-slate-700 group-hover:text-white transition-colors duration-500" />
              </div>

              {/* Title + Description */}
              <div className="flex-1">
                <div className="font-semibold text-slate-900 group-hover:text-sky-600 transition-colors">
                  {title}
                </div>
                <div className="text-sm text-muted-foreground">{desc}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
