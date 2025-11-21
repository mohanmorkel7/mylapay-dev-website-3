import ScrollScale from "@/components/ui/scroll-scale"; 
import Reveal from "@/components/ui/reveal";
import Glob from "@/pages/assets/images/glob-img.svg"

export default function GlobalSection() {
    return(
              <section
        id="global-map"
        className="relative bg-background py-6 md:py-8 overflow-hidden scroll-mt-20 md:scroll-mt-24 mb-10"
      >
        <ScrollScale
          as="div"
          className="container relative mx-auto"
          fromX={160}
          toX={0}
          fromScale={0.55}
          toScale={1}
          fromOpacity={0.08}
          toOpacity={1}
          startViewportRatio={1.2}
          endViewportRatio={0}
        >
          <div className="mx-auto max-w-6xl">
            <div className="relative">
              <div className="relative w-full h-[320px] md:h-[420px] lg:h-[520px] flex items-center justify-center">
                <div
                  aria-hidden
                  className="w-full h-full max-w-6xl"
                  style={{
                    color: "#2caee4",
                    backgroundImage:
                      "radial-gradient(currentColor 1.5px, transparent 1.5px)",
                    backgroundSize: "6px 6px",
                    WebkitMaskImage:
                      `url(${Glob})`,
                    WebkitMaskSize: "cover",
                    WebkitMaskPosition: "center center",
                    WebkitMaskRepeat: "no-repeat",
                    maskImage:
                      `url(${Glob})`,
                    maskSize: "cover",
                    maskPosition: "center center",
                    maskRepeat: "no-repeat",
                    opacity: 0.98,
                  }}
                />

                <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-4">
                  <Reveal
                    as="h2"
                    variant="fadeRight"
                    delay={0}
                    className="max-w-3xl text-center text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-slate-900 dark:text-white drop-shadow-sm leading-tight"
                  >
                    A Unified Global
                    <br />
                    Payment Processing Solution
                    <br />
                    for Acquirers - Banks and
                    <br />
                    Payment Aggregators
                  </Reveal>

                  <Reveal
                    as="p"
                    variant="fadeRight"
                    delay={150}
                    className="mt-16 md:mt-20 text-center text-sm md:text-base text-slate-900 dark:text-white font-semibold"
                  >
                    Supports POS and E-com payments for
                  </Reveal>

                  <div className="mt-4 flex flex-col sm:flex-row items-center gap-4 sm:gap-12">
                    <div className="flex items-center gap-3 text-sm sm:text-base md:text-lg text-slate-900">
                      <span className="inline-flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center text-[#1f2c5c]">
                        <svg
                          width="20"
                          height="14"
                          viewBox="0 0 20 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden
                        >
                          <rect
                            x="1"
                            y="2"
                            width="18"
                            height="10"
                            rx="2"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            fill="none"
                          />
                          <rect
                            x="3"
                            y="5"
                            width="4"
                            height="3"
                            rx="0.6"
                            fill="currentColor"
                          />
                        </svg>
                      </span>
                      <span className="font-semibold text-slate-900 dark:text-white">
                        Cards
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-sm sm:text-base md:text-lg text-slate-900">
                      <span className="inline-flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center text-[#1f2c5c]">
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden
                        >
                          <polygon
                            points="4,6 12,12 4,18"
                            fill="currentColor"
                          />
                          <polygon
                            points="12,6 20,12 12,18"
                            fill="currentColor"
                          />
                        </svg>
                      </span>
                      <span className="font-semibold text-slate-900 dark:text-white">
                        UPI
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-sm sm:text-base md:text-lg text-slate-900">
                      <span className="inline-flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center text-[#1f2c5c]">
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden
                        >
                          <circle
                            cx="12"
                            cy="12"
                            r="9"
                            stroke="currentColor"
                            strokeWidth="1.6"
                            fill="none"
                          />
                          <path
                            d="M12 3v18"
                            stroke="currentColor"
                            strokeWidth="1.2"
                            strokeLinecap="round"
                          />
                          <path
                            d="M3 12h18"
                            stroke="currentColor"
                            strokeWidth="1.2"
                            strokeLinecap="round"
                          />
                          <path
                            d="M5 6c3 1.5 6 1.5 10 0"
                            stroke="currentColor"
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            fill="none"
                          />
                          <path
                            d="M5 18c3-1.5 6-1.5 10 0"
                            stroke="currentColor"
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            fill="none"
                          />
                          <path
                            d="M7 3c1.5 4 1.5 8 0 12"
                            stroke="currentColor"
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            fill="none"
                          />
                          <path
                            d="M17 3c-1.5 4-1.5 8 0 12"
                            stroke="currentColor"
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            fill="none"
                          />
                        </svg>
                      </span>
                      <span className="font-semibold text-slate-900 dark:text-white">
                        Net-Banking
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollScale>
      </section>
    );
}