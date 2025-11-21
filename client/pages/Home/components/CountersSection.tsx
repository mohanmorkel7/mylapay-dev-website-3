import ScrollScale from "@/components/ui/scroll-scale";
import { useEffect, useState } from "react";

const AnimatedNumber = ({
  to,
  prefix = "",
  suffix = "",
  duration = 1500,
  loopInterval = 0, // in ms (0 = no loop)
}: {
  to: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  loopInterval?: number;
}) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    let frame: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const current = Math.floor(progress * to);
      setValue(current);

      if (progress < 1) {
        frame = requestAnimationFrame(step);
      }
    };

    const runAnimation = () => {
      setValue(0); // reset before animating
      startTime = null;
      frame = requestAnimationFrame(step);
    };

    runAnimation();

    let intervalId: NodeJS.Timeout | null = null;
    if (loopInterval > 0) {
      intervalId = setInterval(runAnimation, loopInterval);
    }

    return () => {
      if (frame) cancelAnimationFrame(frame);
      if (intervalId) clearInterval(intervalId);
    };
  }, [to, duration, loopInterval]);

  return (
    <span className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900">
      {prefix}
      {value}
      {suffix}
    </span>
  );
};

export default function CountersSection() {
  return (
    <section id="counters" className="bg-white">
      <ScrollScale
        as="div"
        className="container mx-auto py-6 md:py-10"
        direction="left"
        fromScale={0.7}
        toScale={1}
        fromOpacity={0.12}
        toOpacity={1}
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 text-center divide-x divide-slate-200">
            
            <div className="px-6 py-4">
              <AnimatedNumber to={1} suffix="B+" />
              <div className="mt-2 text-sm text-slate-600">
                transactions processing
              </div>
            </div>

            <div className="px-6 py-4">
              <AnimatedNumber to={100} prefix="$" suffix="B+" loopInterval={5000} />
              <div className="mt-2 text-sm text-slate-600">
                in value handling annually
              </div>
            </div>

            <div className="px-6 py-4">
              <span className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900">
                Millions
              </span>
              <div className="mt-2 text-sm text-slate-600">
                of dollars saving in cost
              </div>
            </div>

            <div className="px-6 py-4">
              <span className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900">
                Zero
              </span>
              <div className="mt-2 text-sm text-slate-600">
                Leakage guaranteed
              </div>
            </div>
            
          </div>
        </div>
      </ScrollScale>
    </section>
  );
}
