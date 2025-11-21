import ScrollScale from "@/components/ui/scroll-scale";
import Reveal from "@/components/ui/reveal";
import { Gauge, ChartNoAxesCombined, Server, ShieldCheck } from "lucide-react";

export default function About() {
  return (
    <section
      id="about"
      className="bg-white backdrop-blur-sm scroll-mt-20 md:scroll-mt-24"
    >
      <ScrollScale
        as="div"
        className="container mx-auto py-24 md:py-32"
        fromX={-160}
        toX={0}
        fromScale={0.55}
        toScale={1}
        fromOpacity={0.08}
        toOpacity={1}
        startViewportRatio={1.2}
        endViewportRatio={0}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Left Section */}
          <div className="pl-0 md:pl-6">
            <Reveal
              as="h2"
              variant="fadeLeft"
              delay={0}
              className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight"
            >
              Next-Generation Payment Company
            </Reveal>
            <Reveal
              as="p"
              variant="fadeLeft"
              delay={100}
              className="mt-4 text-lg text-muted-foreground max-w-2xl text-left"
            >
              A Smart payment infrastructure
              <br />
              
            </Reveal>

            {/* Badges */}
            <Reveal
              as="div"
              variant="fadeLeft"
              delay={200}
              className="mt-6 flex flex-wrap items-start gap-3 cursor-default"
            >
              <span className="relative inline-flex items-center gap-2 bg-gradient-to-r from-sky-500 to-sky-600 text-white p-3 rounded-[10px] text-sm font-medium shadow-md overflow-hidden transition-all duration-500 ease-out hover:scale-105">
                <span className="relative z-10">Designed in India</span>
                {/* Shine effect */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-700 ease-out"></span>
              </span>

              <span className="relative inline-flex items-center gap-2 bg-gradient-to-r from-slate-800 to-slate-900 text-white p-3 rounded-[10px] text-sm font-medium shadow-md overflow-hidden transition-all duration-500 ease-out hover:scale-105">
                <span className="relative z-10">Delivering  Globally</span>
                {/* Shine effect */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-700 ease-out"></span>
              </span>
            </Reveal>

          </div>

          {/* Right Section */}
            <div className="flex flex-col items-start justify-center gap-6 pl-0 md:pl-6 w-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
              {[
                {
                  icon: ShieldCheck,
                  title: "Secure",
                  desc: "End-to-end payment security",
                },
                {
                  icon: Gauge,
                  title: "Speed",
                  desc: "Fast transaction processing",
                },
                {
                  icon: ChartNoAxesCombined,
                  title: "Scalable",
                  desc: "Grow without limits",
                },
                {
                  icon: Server,
                  title: "Reliable",
                  desc: "Over 99.90% uptime and resiliency",
                },
              ].map(({ icon: Icon, title, desc }, idx) => (
                <div
                  key={idx}
                  className="group flex items-center gap-4 p-5 rounded-xl border bg-white/70 backdrop-blur-md shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-30"
                >
                  {/* Icon with fill animation */}
                  <div className="relative flex h-12 w-12 items-center justify-center rounded-full border border-slate-300 overflow-hidden shrink-0">
                    {/* Background fill animation */}
                    <div className="absolute inset-0 bg-[#2dade4] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
                    {/* Icon stays visible */}
                    <Icon className="relative z-10 h-6 w-6 text-slate-700 group-hover:text-white transition-colors duration-500" />
                  </div>

                  <div className="flex-1">
                    <div className="font-semibold text-slate-900 group-hover:text-sky-600 transition-colors">
                      {title}
                    </div>
                    <div className="text-sm text-muted-foreground">{desc}</div>
                  </div>
                </div>
              ))}
              </div>
            </div>

        </div>
      </ScrollScale>
    </section>
  );
}
