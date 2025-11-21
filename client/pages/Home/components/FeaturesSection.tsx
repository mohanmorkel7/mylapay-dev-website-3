"use client";

import { BarChart3, Rocket, Layers, ShieldCheck } from "lucide-react";
import ScrollScale from "@/components/ui/scroll-scale";

export default function FeaturesSection() {
  const features = [
    {
      icon: Rocket,
      title: "Enterprise-Grade Performance",
      description: "Handle 5000+ TPS, cloud-native with over 99.90% uptime.",
    },
    {
      icon: ShieldCheck,
      title: "Compliance first infra",
      description: "PCI-DSS, PCI-3DS, PCI-S3, ISO 27001, RBI SAR certified.",
    },
    {
      icon: BarChart3,
      title: "Profit-driven intelligence",
      description: "Real-time analytics to maximize margins.",
    },
    {
      icon: Layers,
      title: "Modular deployment",
      description: "Integrate only what you need, when you need it.",
    },
  ];

  return (
    <section
      id="features"
      className="bg-background scroll-mt-20 md:scroll-mt-24"
    >
      <ScrollScale
        as="div"
        className="w-full border-t border-b border-slate-200"
        direction="left"
        fromScale={0.9}
        toScale={1}
        fromOpacity={0.1}
        toOpacity={1}
      >
        <div className="container mx-auto py-16">
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => (
              <li
                key={idx}
                className="group flex flex-col items-start text-left gap-4 p-8 rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md hover:border-slate-300"
              >
                <div className="flex-shrink-0 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#e6f7fb] text-[#2caee4] transition-all duration-300 group-hover:scale-110 group-hover:bg-[#2caee4] group-hover:text-white">
                  <feature.icon className="h-6 w-6" aria-hidden />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-slate-900 group-hover:text-[#2caee4] transition-colors duration-300">
                    {feature.title}
                  </h4>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </ScrollScale>
    </section>
  );
}
