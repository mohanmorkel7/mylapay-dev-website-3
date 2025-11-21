"use client";

import Favicon from "../../assets/images/fav.png"
import { Facebook, Linkedin, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#202c5c] text-white">
      <div className="container mx-auto py-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Logo + Copy */}
          <div className="md:col-span-3">
            <div className="flex items-center gap-3">
              <img src={Favicon} alt="Mylapay" className="h-6 w-auto bg-white" />
              <span className="font-semibold text-lg">Mylapay</span>
            </div>

            <p className="mt-4 text-sm text-slate-400 leading-relaxed">
              Copyright © {new Date().getFullYear()} Mylapay.com
            </p>
            <p className="mt-2 text-xs text-slate-500 leading-relaxed">
              For grievance resolution, contact our Grievance Officer at{" "}
              <a
                href="mailto:grievance@mylapay.com"
                className="hover:text-white transition-colors"
              >
                grievance@mylapay.com
              </a>
              .
            </p>
          </div>

          {/* Links */}
          <div className="md:col-span-6 grid grid-cols-2 sm:grid-cols-4 gap-6">
            <div>
              <h4 className="text-sm font-semibold mb-3 text-slate-200">
                Resources
              </h4>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Case Study
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold mb-3 text-slate-200">
                Developers
              </h4>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    API Reference
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    SDKs
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold mb-3 text-slate-200">
                Company
              </h4>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold mb-3 text-slate-200">
                Products
              </h4>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Mylapay Secure
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Mylapay Switch
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    IntelleWatch
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Location + Contact */}
          <div className="md:col-span-3">
            <h4 className="text-sm font-semibold mb-3 text-slate-200">
              Our Location
            </h4>
            <p className="text-sm text-slate-400 leading-relaxed">
              No 17/3, (Old No 8C), 2nd Floor, Pembroke,
              <br />
              Shafee Mohammad Road, Nungambakkam,
              <br />
              Chennai, Tamil Nadu, India, 600006.
            </p>

            <div className="mt-4 text-sm text-slate-400">
              <a
                href="mailto:contactus@mylapay.com"
                className="hover:text-white transition-colors block"
              >
                contactus@mylapay.com
              </a>
              <div className="mt-2">+91 89254 61317</div>
            </div>

            {/* Social Links */}
            <div className="mt-6 flex items-center gap-4">
              <a
                href="#"
                className="p-2 rounded-full bg-slate-700/40 hover:bg-[#1877F2] transition-all duration-300 hover:scale-110"
              >
                <Facebook className="h-5 w-5 text-slate-300 hover:text-white" />
              </a>
              <a
                href="#"
                className="p-2 rounded-full bg-slate-700/40 hover:bg-[#0A66C2] transition-all duration-300 hover:scale-110"
              >
                <Linkedin className="h-5 w-5 text-slate-300 hover:text-white" />
              </a>
              <a
                href="#"
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
            <a href="#" className="hover:text-white transition-colors">
              Acceptance Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Privacy
            </a>
          </div>
          <div className="text-slate-500">
            © {new Date().getFullYear()} Mylapay. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
