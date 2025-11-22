"use client";

import Favicon from "@/pages/about/assets/logo.webp";
import { Facebook, Linkedin, Youtube } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function Footer() {
  const location = useLocation();

  // Utility to check active link
  const isActive = (path: string) =>
    location.pathname === path
      ? "text-white font-semibold"
      : "text-slate-400 hover:text-white transition-colors";
  const email = "contactus@mylapay.com";
  // const subject = encodeURIComponent("Hello");
  // const body = encodeURIComponent("I want to contact you.");

  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}`;
  return (
    <footer className="bg-[#202c5c] text-white pt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Logo + Copy */}
          <div className="md:col-span-3">
            <div className="flex items-center gap-3">
              <img src={Favicon} alt="Mylapay" className="h-10 w-auto bg-white rounded " />
              {/* <span className="font-semibold text-lg"></span> */}
            </div>

            <p className="mt-4 text-sm text-slate-400 leading-relaxed">
              Copyright © {new Date().getFullYear()} Mylapay.com
            </p>
            <p className="mt-2 text-xs text-slate-500 leading-relaxed">
              For grievance resolution, contact our Grievance Officer at{" "}
              <a
                // href="mailto:grievance@mylapay.com"
                className=" transition-colors"
              >
                grievance@mylapay.com
              </a>
              .
            </p>
          </div>

          {/* Links */}
          <div className="md:col-span-6 grid grid-cols-3 sm:grid-cols-3 gap-6">
            <div>
              <h4 className="text-sm font-semibold mb-3 text-slate-200">
                Resources
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/casestudy" className={isActive("/casestudy")}>
                    Case Study
                  </Link>
                </li>
                <li>
                  <Link to="/blog" className={isActive("/blog")}>
                    Blog
                  </Link>
                </li>
                <li>
                  <Link to="/faq" className={isActive("/faq")}>
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link to="/about" className={isActive("/about")}>
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/careers" className={isActive("/careers")}>
                    Careers
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className={isActive("/contact")}>
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            
                <div>
              <h4 className="text-sm font-semibold mb-3 text-slate-200">
                Products
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/products/mylapay-tokenx"
                    className={isActive("/products/mylapay-tokenx")}
                  >
                    Mylapay TokenX
                  </Link>
                </li>
                <li>
                  
                  <Link
                    to="/products/mylapay-secure"
                    className={isActive("/products/mylapay-secure")}
                  >
                    Mylapay Secure
                  </Link>
                </li>
                <li>
                  <Link
                    to="/products/mylapay-cswitch"
                    className={isActive("/products/mylapay-cswitch")}
                  >
                    Mylapay C Switch
                  </Link>
                </li>
                <li>
                  <Link
                    to="/products/mylapay-intellewatch"
                    className={isActive("/products/mylapay-intellewatch")}
                  >
                    Intelle Watch
                  </Link>
                </li>
                <li>
                  <Link
                    to="/products/mylapay-intellesettle"
                    className={isActive("/products/mylapay-intellesettle")}
                  >
                    IntelleSettle
                  </Link>
                </li>
                <li>
                  <Link
                    to="/products/mylapay-intellesolve"
                    className={isActive("/products/mylapay-intellesolve")}
                  >
                    IntelleSolve
                  </Link>
                </li>
                <li>
                  <Link
                    to="/products/mylapay-intelle360"
                    className={isActive("/products/mylapay-intelle360")}
                  >
                    Intelle360
                  </Link>
                </li>
                <li>
                  <Link
                    to="/products/mylapay-uswitch"
                    className={isActive("/products/mylapay-uswitch")}
                  >
                    Mylapay U Switch
                  </Link>
                </li>
                 <li>
                  <Link
                    to="/products/mylapay-intellepro"
                    className={isActive("/products/mylapay-intellepro")}
                  >
                    IntellePro
                  </Link>
                </li>
                <li>
                  <Link
                    to="/products/mylapay-switchx"
                    className={isActive("/products/mylapay-switchx")}
                  >
                    Mylapay SwitchX
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold mb-3 text-slate-200">
                Solutions
              </h4>
              <ul className="space-y-2">
                 <li>
                  <Link to="/solutions/acquiring" className={isActive("//solutions/acquiring")}>
                    Acquiring Support
                  </Link>
                </li>
                <li>
                  <Link to="/solutions/card-payments" className={isActive("/solutions/card-payments")}>
                    Card Payments
                  </Link>
                </li>
                <li>
                  <Link to="/solutions/upi-payments" className={isActive("/solutions/upi-payments")}>
                    UPI Payments
                  </Link>
                </li>
                <li>
                  <Link to = "/solutions/payment-orchestration" className={isActive("/solutions/payment-orchestration")}>
                  Payment Orchestration</Link>
                </li>
              </ul>
            </div>


          </div>

          {/* Location + Contact */}
          <div className="md:col-span-3">
            <h4 className="text-sm font-semibold mb-3 text-slate-200">
              Our Location
            </h4>
            <h5 className="mb-2">Corporate Office</h5>
            <a href="https://maps.app.goo.gl/w7hZ92HJsPeDaNLb8" target="_blank" rel="noopener noreferrer" className="hover:text-white ">
              <p className="text-sm text-slate-400 leading-relaxed hover:text-white ">
              No 17/3, (Old No 8C), 2nd Floor, Pembroke,
              <br />
              Shafee Mohammad Road, Nungambakkam,
              <br />
              Chennai, Tamil Nadu, India, 600006.
            </p>
            </a>
            <h5 className="mb-2 mt-2">Business Center</h5>
            <a  target="_blank" href="https://maps.app.goo.gl/mAbj2wYzi84eXRks9" rel="noopener noreferrer"  >
              <p className="text-sm text-slate-400 leading-relaxed hover:text-white ">
              202B, Pinnacle Corporate Park B Wing,
              <br />
              Second Floor, Bandra Kurla Complex, East, 
              <br />
              Mumbai, Maharashtra 400051.
            </p>
            </a>
            

            <div className="mt-2 text-sm text-slate-400">
              <a
      href={gmailUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-white transition-colors block  "
    >
               contactus@mylapay.com
              </a>
              {/* <div className="mt-2">contactus@mylapay.com</div> */}
              <div className="mt-2">+91 81222 28396</div>
            </div>

            {/* Social Links */}
            <div className="mt-6 flex items-center gap-4">
              <a
                href="https://www.facebook.com/mylapay?mibextid=9R9pXO"
                target="_blank" rel="noopener noreferrer"
                className="p-2 rounded-full bg-slate-700/40 hover:bg-[#1877F2] transition-all duration-300 hover:scale-110"
              >
                <Facebook className="h-5 w-5 text-slate-300 hover:text-white" />
              </a>
              <a
                href="https://www.linkedin.com/company/mylapay/mycompany/"
                target="_blank" rel="noopener noreferrer"
                className="p-2 rounded-full bg-slate-700/40 hover:bg-[#0A66C2] transition-all duration-300 hover:scale-110"
              >
                <Linkedin className="h-5 w-5 text-slate-300 hover:text-white" />
              </a>
              <a
                href="https://www.youtube.com/@mylapay6480"
                target="_blank" rel="noopener noreferrer"
                className="p-2 rounded-full bg-slate-700/40 hover:bg-[#FF0000] transition-all duration-300 hover:scale-110"
              >
                <Youtube className="h-5 w-5 text-slate-300 hover:text-white" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 border-t border-slate-700 pt-6">
          <div className="flex gap-6 mb-2 md:mb-0">
            <Link to="/terms" className={isActive("/terms")}>
              Acceptance Policy
            </Link>
            <Link to="/privacy" className={isActive("/privacy")}>
              Privacy
            </Link>
          </div>
          <div className="text-slate-500">
            © {new Date().getFullYear()} Mylapay. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
