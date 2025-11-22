import ScrollScale from "@/components/ui/scroll-scale";
import { Activity, BarChart3, Database, GitBranch, KeyRound, RotateCcw, Server, ShieldAlert, ShieldCheck, Zap } from "lucide-react";
import {Link} from "react-router-dom"
import { motion } from "framer-motion";


export default function ProductsSection() {
const text = "Mylapay Product Suites";

    return(
        <section
        id="products"
        className="bg-[#202c5c] scroll-mt-20 md:scroll-mt-24"
      >
        <ScrollScale
          as="div"
          className="container mx-auto py-12 md:py-16"
          direction="right"
          fromScale={0.55}
          toScale={1}
          fromOpacity={0.08}
          toOpacity={1}
          startViewportRatio={1.2}
          endViewportRatio={0}
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-white mb-10">
            {text.split("").map((char, index) => (
                    <motion.span
                      key={index}
                      className={char === " " ? "mx-1" : ""}
                      animate={{
                        y: [0, -10, 0],      // vertical movement
                        opacity: [0, 1, 1],   // fade in, then hold
                      }}
                      transition={{
                        duration: 1,          // animation time
                        delay: index * 0.1,   // stagger letters
                        repeat: Infinity,     // infinite loop
                        repeatType: "loop",
                        repeatDelay: 4        // pause before next loop
                      }}
                    >
                      {char}
                    </motion.span>
                  ))}
          </h2>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* 1 */}
              <Link
                className="rounded-lg border border-[#219dd2] bg-[#202c5c] p-6 text-white group relative overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                role="link"
                tabIndex={0}
                onClick={() => (window.location.href = "#")}
                onKeyDown={(e) => {
                  if ((e as any).key === "Enter") window.location.href = "#";
                }}
                style={{ cursor: "pointer" }}
                to="/products/mylapay-tokenx"
              >
                {" "}
                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-[#1b355f] to-[#219dd2] opacity-0 group-hover:opacity-80 transition-opacity duration-300 pointer-events-none"></div>
                <div className="absolute top-4 right-4 z-30 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all text-[#219dd2] flex items-center justify-center" aria-hidden>
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 19V6"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M5 12l7-7 7 7"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="flex flex-col items-start relative z-10">
                  <KeyRound className="h-8 w-8 text-white mb-3" aria-hidden />

                  <h3 className="text-lg font-semibold">Mylapay TokenX</h3>
                  <p className="mt-1 text-sm text-white/90">
                    Card Tokenization - COF & Alt ID
                  </p>
                  <p className="mt-2 text-xs text-[#219dd2] font-medium">
                    Encrypt | Process | Tokenize
                  </p>
                </div>
              </Link>

              {/* 2 */}
              <Link
                className="rounded-lg border border-[#219dd2] bg-[#202c5c] p-6 text-white group relative overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                role="link"
                to="/products/mylapay-secure"
                tabIndex={0}
                onClick={() => (window.location.href = "#")}
                onKeyDown={(e) => {
                  if ((e as any).key === "Enter") window.location.href = "#";
                }}
                style={{ cursor: "pointer" }}
              >
                {" "}
                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-[#1b355f] to-[#219dd2] opacity-0 group-hover:opacity-80 transition-opacity duration-300 pointer-events-none"></div>
                <div className="absolute top-4 right-4 z-30 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all text-[#219dd2] flex items-center justify-center" role="presentation">
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 19V6"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M5 12l7-7 7 7"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="flex flex-col items-start relative z-10">
                  <ShieldCheck
                    className="h-8 w-8 text-white mb-3"
                    aria-hidden
                  />

                  <h3 className="text-lg font-semibold">Mylapay Secure</h3>
                  <p className="mt-1 text-sm text-white/90">
                    3DS Server certified by EMVCo
                  </p>
                  <p className="mt-2 text-xs text-[#219dd2] font-medium">
                    Detect | Prevent | Authenticate
                  </p>
                </div>
              </Link>

              {/* 3 */}
              <Link
                className="rounded-lg border border-[#219dd2] bg-[#202c5c] p-6 text-white group relative overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                role="link"
                to="/products/mylapay-cswitch"
                tabIndex={0}
                onClick={() => (window.location.href = "#")}
                onKeyDown={(e) => {
                  if ((e as any).key === "Enter") window.location.href = "#";
                }}
                style={{ cursor: "pointer" }}
              >
                {" "}
                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-[#1b355f] to-[#219dd2] opacity-0 group-hover:opacity-80 transition-opacity duration-300 pointer-events-none"></div>
                <div className="absolute top-4 right-4 z-30 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all text-[#219dd2] flex items-center justify-center" role="presentation">
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 19V6"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M5 12l7-7 7 7"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="flex flex-col items-start relative z-10">
                  <Server className="h-8 w-8 text-white mb-3" aria-hidden />

                  <h3 className="text-lg font-semibold">Mylapay C-Switch</h3>
                  <p className="mt-1 text-sm text-white/90">
                    Base I Auth Switch for Card Payments
                  </p>
                  <p className="mt-2 text-xs text-[#219dd2] font-medium">
                    Integrate | Transact | Authorize
                  </p>
                </div>
              </Link>

              {/* 4 */}
              <Link
                className="rounded-lg border border-[#219dd2] bg-[#202c5c] p-6 text-white group relative overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                role="link"
                to="/products/mylapay-intellewatch"
                tabIndex={0}
                onClick={() => (window.location.href = "#")}
                onKeyDown={(e) => {
                  if ((e as any).key === "Enter") window.location.href = "#";
                }}
                style={{ cursor: "pointer" }}
              >
                {" "}
                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-[#1b355f] to-[#219dd2] opacity-0 group-hover:opacity-80 transition-opacity duration-300 pointer-events-none"></div>
                <div className="absolute top-4 right-4 z-30 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all text-[#219dd2] flex items-center justify-center" role="presentation">
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 19V6"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M5 12l7-7 7 7"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="flex flex-col items-start relative z-10">
                  <ShieldAlert
                    className="h-8 w-8 text-white mb-3"
                    aria-hidden
                  />

                  <h3 className="text-lg font-semibold">IntelleWatch</h3>
                  <p className="mt-1 text-sm text-white/90">
                    Fraud Risk Management (FRM) System
                  </p>
                  <p className="mt-2 text-xs text-[#219dd2] font-medium">
                    Monitor | Block | Safeguard
                  </p>
                </div>
              </Link>

              {/* 5 */}
              <Link
                className="rounded-lg border border-[#219dd2] bg-[#202c5c] p-6 text-white group relative overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                role="link"
                to="/products/mylapay-intellesettle"
                tabIndex={0}
                onClick={() => (window.location.href = "#")}
                onKeyDown={(e) => {
                  if ((e as any).key === "Enter") window.location.href = "#";
                }}
                style={{ cursor: "pointer" }}
              >
                {" "}
                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-[#1b355f] to-[#219dd2] opacity-0 group-hover:opacity-80 transition-opacity duration-300 pointer-events-none"></div>
                <div className="absolute top-4 right-4 z-30 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all text-[#219dd2] flex items-center justify-center" role="presentation">
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 19V6"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M5 12l7-7 7 7"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="flex flex-col items-start relative z-10">
                  <Database className="h-8 w-8 text-white mb-3" aria-hidden />

                  <h3 className="text-lg font-semibold">IntelleSettle</h3>
                  <p className="mt-1 text-sm text-white/90">
                    Base II Clearing & Settlement System
                  </p>
                  <p className="mt-2 text-xs text-[#219dd2] font-medium">
                    Submit | Collect | Settle
                  </p>
                </div>
              </Link>

              {/* 6 */}
              <Link
                className="rounded-lg border border-[#219dd2] bg-[#202c5c] p-6 text-white group relative overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                role="link"
                to="/products/mylapay-intellesolve"
                tabIndex={0}
                onClick={() => (window.location.href = "#")}
                onKeyDown={(e) => {
                  if ((e as any).key === "Enter") window.location.href = "#";
                }}
                style={{ cursor: "pointer" }}
              >
                {" "}
                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-[#1b355f] to-[#219dd2] opacity-0 group-hover:opacity-80 transition-opacity duration-300 pointer-events-none"></div>
                <div className="absolute top-4 right-4 z-30 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all text-[#219dd2] flex items-center justify-center" role="presentation">
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 19V6"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M5 12l7-7 7 7"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="flex flex-col items-start relative z-10">
                  <RotateCcw className="h-8 w-8 text-white mb-3" aria-hidden />

                  <h3 className="text-lg font-semibold">IntelleSolve</h3>
                  <p className="mt-1 text-sm text-white/90">
                    Chargeback Management System
                  </p>
                  <p className="mt-2 text-xs text-[#219dd2] font-medium">
                    Defend | Resolve | Recover
                  </p>
                </div>
              </Link>

              {/* 7 */}
              <Link
                className="rounded-lg border border-[#219dd2] bg-[#202c5c] p-6 text-white group relative overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                role="link"
                to="/products/mylapay-intelle360"
                tabIndex={0}
                onClick={() => (window.location.href = "#")}
                onKeyDown={(e) => {
                  if ((e as any).key === "Enter") window.location.href = "#";
                }}
                style={{ cursor: "pointer" }}
              >
                {" "}
                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-[#1b355f] to-[#219dd2] opacity-0 group-hover:opacity-80 transition-opacity duration-300 pointer-events-none"></div>
                <div className="absolute top-4 right-4 z-30 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all text-[#219dd2] flex items-center justify-center" role="presentation">
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 19V6"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M5 12l7-7 7 7"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="flex flex-col items-start relative z-10">
                  <BarChart3 className="h-8 w-8 text-white mb-3" aria-hidden />

                  <h3 className="text-lg font-semibold">Intelle360</h3>
                  <p className="mt-1 text-sm text-white/90">
                    Analytics Suite for Acquiring Payments
                  </p>
                  <p className="mt-2 text-xs text-[#219dd2] font-medium">
                    Intelligence | Protection | Growth
                  </p>
                </div>
              </Link>

              {/* 8 */}
              <Link
                className="rounded-lg border border-[#219dd2] bg-[#202c5c] p-6 text-white group relative overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                role="link"
                tabIndex={0}
                to="/products/mylapay-uswitch"
                onClick={() => (window.location.href = "#")}
                onKeyDown={(e) => {
                  if ((e as any).key === "Enter") window.location.href = "#";
                }}
                style={{ cursor: "pointer" }}
              >
                {" "}
                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-[#1b355f] to-[#219dd2] opacity-0 group-hover:opacity-80 transition-opacity duration-300 pointer-events-none"></div>
                <div className="absolute top-4 right-4 z-30 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all text-[#219dd2] flex items-center justify-center" role="presentation">
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 19V6"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M5 12l7-7 7 7"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="flex flex-col items-start relative z-10">
                  <GitBranch className="h-8 w-8 text-white mb-3" aria-hidden />

                  <h3 className="text-lg font-semibold">Mylapay U-Switch</h3>
                  <p className="mt-1 text-sm text-white/90">
                    UPI Switch for PSPs, Beneficiary Banks
                  </p>
                  <p className="mt-2 text-xs text-[#219dd2] font-medium">
                    Connect | Route | Approve
                  </p>
                </div>
              </Link>

              {/* 9 */}
              <Link
                className="rounded-lg border border-[#219dd2] bg-[#202c5c] p-6 text-white group relative overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                role="link"
                tabIndex={0}
                to="/products/mylapay-intellepro"
                onClick={() => (window.location.href = "#")}
                onKeyDown={(e) => {
                  if ((e as any).key === "Enter") window.location.href = "#";
                }}
                style={{ cursor: "pointer" }}
              >
                {" "}
                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-[#1b355f] to-[#219dd2] opacity-0 group-hover:opacity-80 transition-opacity duration-300 pointer-events-none"></div>
                <div className="absolute top-4 right-4 z-30 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all text-[#219dd2] flex items-center justify-center" role="presentation">
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 19V6"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M5 12l7-7 7 7"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="flex flex-col items-start relative z-10">
                  <Activity className="h-8 w-8 text-white mb-3" aria-hidden />

                  <h3 className="text-lg font-semibold">IntellePro</h3>
                  <p className="mt-1 text-sm text-white/90">
                    Real-time TMS for UPI Transactions
                  </p>
                  <p className="mt-2 text-xs text-[#219dd2] font-medium">
                    Reconcile | Settle | Recover
                  </p>
                </div>
              </Link>


            </div>
              {/* 10 */}
              <div >
              <Link to="/products/mylapay-switchx">
              <div
                className="rounded-lg border border-[#219dd2] bg-[#202c5c] p-6 text-white group relative overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1 mt-6"
                role="link"
                tabIndex={0}
                
                onClick={() => (window.location.href = "#")}
                onKeyDown={(e) => {
                  if ((e as any).key === "Enter") window.location.href = "#";
                }}
                style={{ cursor: "pointer" }}
              >
                {" "}
                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-[#1b355f] to-[#219dd2] opacity-0 group-hover:opacity-80 transition-opacity duration-300 pointer-events-none"></div>
                <div className="absolute top-4 right-4 z-30 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all text-[#219dd2] flex items-center justify-center" role="presentation">
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 19V6"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M5 12l7-7 7 7"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="flex flex-col items-center relative z-10">
                  <Zap className="h-8 w-8 text-white mb-3" aria-hidden />

                  <h3 className="text-lg font-semibold">Mylapay Switch X</h3>
                  <p className="mt-1 text-sm text-white/90">
                   Payment Orchestration Hub
                  </p>
                  <p className="mt-2 text-xs text-[#219dd2] font-medium">
                    Route | Integrate | Optimize
                  </p>
                </div>
              </div>
              </Link>
              </div>
          </div>
        </ScrollScale>
      </section>
    );
}
