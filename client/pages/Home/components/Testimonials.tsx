import { useState, useEffect, useRef } from "react";
import ScrollScale from "@/components/ui/scroll-scale";
import img6 from "@/pages/assets/images/client-logo/6.webp"
import img3 from "@/pages/assets/images/client-logo/3.webp"


export default function Testimonials() {
  // Testimonials data and carousel control
  const testimonials = [
    {
      quote:
        "IntelleEngine is a world class Product that is beautifully built & that has been delivered to the Payment Ecosystem. We are Fortunate to be the Pioneers to have experienced the outcomes of this Product. This product has eased a lot of our work & has given the opportunity to explore the business Revenue. Thanks a Ton. Also, not to forget the team of Mindeed, who are experts & are always having our back on the needed times to solve our queries that can manage our BAU much better. The confidence in your team & the Mindeed Products has let Razorpay explore more business with you.",
      name: "Gowtham Dhakshnamoorthy",
      position: "Associate Director",
      logo: img6,
    },
    {
      quote:
        "Working with Mindeed has been a great experience. Collaborating with a bunch of folks who are highly proficient in the payments domain has been very rewarding.",
      name: "Aditya",
      position: "Products",
      logo: img3,
    },
    {
      quote:
        "We want to express our sincere gratitude for our partnership with Mindeed. Your module has provided us with valuable and practical insights into our business, and we look forward to further strengthening our partnership. Thank you for always being available and assisting us with our inquiries. Your dedication is greatly appreciated, and we wish you continued success.",
      name: "Chetan Nagaraju",
      position: "Senior Director Business Finance ",
      logo: img6,
    },
  ];

  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const testimonialIntervalRef = useRef<number | null>(null);

  useEffect(() => {
    const start = () => {
      testimonialIntervalRef.current = window.setInterval(() => {
        setCurrentTestimonial((i) => (i + 1) % testimonials.length);
      }, 6000);
    };

    start();
    return () => {
      if (testimonialIntervalRef.current)
        window.clearInterval(testimonialIntervalRef.current);
    };
  }, [testimonials.length]);

  const pauseTestimonials = () => {
    if (testimonialIntervalRef.current) {
      window.clearInterval(testimonialIntervalRef.current);
      testimonialIntervalRef.current = null;
    }
  };

  const resumeTestimonials = () => {
    if (!testimonialIntervalRef.current) {
      testimonialIntervalRef.current = window.setInterval(() => {
        setCurrentTestimonial((i) => (i + 1) % testimonials.length);
      }, 6000);
    }

  };


    return(
              <section id="testimonials" className="bg-white">
                <ScrollScale
                  as="div"
                  className="container mx-auto py-12 md:py-16"
                  fromX={160}
                  toX={0}
                  fromScale={0.7}
                  toScale={1}
                  fromOpacity={0.12}
                  toOpacity={1}
                  startViewportRatio={1}
                  endViewportRatio={0.1}
                >
                  <div className="flex justify-center">
                    <div className="relative w-full max-w-5xl">
                      {/* decorative shadow under the carousel */}
                      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-[94%] h-8 bg-white rounded-xl filter blur-2xl opacity-40"></div>
        
                      <div
                        className="relative"
                        onMouseEnter={pauseTestimonials}
                        onMouseLeave={resumeTestimonials}
                      >
                        <div className="overflow-hidden min-h-[220px]">
                          <div className="relative h-auto">
                            {testimonials.map((t, idx) => (
                              <div
                                key={idx}
                                className={`w-full transition-all duration-700 ease-[cubic-bezier(.2,.9,.3,1)] ${
                                  idx === currentTestimonial
                                    ? "opacity-100 translate-y-0 block"
                                    : "opacity-0 translate-y-4 pointer-events-none h-0 overflow-hidden"
                                }`}
                              >
                                <div className="rounded-2xl border-2 border-slate-200 bg-white p-10 md:p-12 shadow-[0_18px_30px_rgba(16,24,40,0.08)]">
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                                    <div>
                                      <h3 className="text-2xl md:text-3xl font-bold text-slate-900 leading-tight">
                                        {t.quote.split(" ").slice(0, 8).join(" ")}
                                        {t.quote.length > 0 ? "..." : ""}
                                      </h3>
                                    </div>
        
                                    <div className="flex flex-col items-start md:items-end">
                                      <p className="text-sm md:text-base text-slate-600 leading-relaxed">
                                        {t.quote}
                                      </p>
        
                                      <div className="mt-6 flex items-center gap-4">
                                        <img
                                          src={t.logo}
                                          alt={`${t.name} logo`}
                                          className="h-10 w-auto sm40"
                                        />
                                        <div className="text-left md:text-right">
                                          <div className="text-sm font-semibold text-slate-900">
                                            {t.name}
                                          </div>
                                          <div className="text-xs text-slate-500">
                                            {t.position}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
        
                        {/* Dots */}
                        <div className="mt-6 flex items-center justify-center gap-3">
                          {testimonials.map((_, i) => (
                            <button
                              key={i}
                              onClick={() => setCurrentTestimonial(i)}
                              className={`h-2 w-8 rounded-full transition-all ${i === currentTestimonial ? "bg-slate-800" : "bg-slate-200"}`}
                              aria-label={`Show testimonial ${i + 1}`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollScale>
              </section>
    );
}