import { useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import Fulllogo from "@/pages/assets/images/logo-full.webp"

const navItems = [
  // { label: "Our Capabilities", href: "/capabilities" },
  { label: "Our Products", href: "/products", hasMegaMenu: true },
  { label: "Our Solutions", href: "/solutions", hasSolutionsMenu: true },
  // { label: "Developer", href: "https://apitest.mylapay.com/", external: true },
  { label: "Resources", href: "/resources", hasResourcesMenu: true },
  { label: "Pricing", href: "/pricing", hasPricingMenu: true },
  { label: "API Resources", href: "https://api.mylapay.com", external: true },
];

// Products menu
const products = [
  { label: "Mylapay TokenX", desc: "Card Tokenization - COF & Alt ID", href: "/products/mylapay-tokenx", sub:"Encrypt | Process | Tokenize", pricingHref: "/pricing/mylapay-tokenx" },
  { label: "Mylapay Secure", desc: "3DS Server certified by EMVCo", href: "/products/mylapay-secure",sub:"Detect | Prevent | Authenticate", pricingHref: "/pricing/mylapay-secure" },
  { label: "Mylapay C-Switch", desc: "Base I Auth Switch for Card Payments", href: "/products/mylapay-cswitch",sub:"Integrate | Transact | Authorize", pricingHref: "/pricing/mylapay-cswitch" },
  { label: "IntelleWatch", desc: "Fraud Risk Management (FRM) System", href: "/products/mylapay-intellewatch", sub:"Monitor | Block | Safeguard", pricingHref: "/pricing/mylapay-intellewatch" },
  { label: "IntelleSettle", desc: "Base II Clearing & Settlement System", href: "/products/mylapay-intellesettle",sub:"Submit | Collect | Settle", pricingHref: "/pricing/mylapay-intellesettle" },
  { label: "IntelleSolve", desc: "Chargeback Management System", href: "/products/mylapay-intellesolve",sub:"Defend | Resolve | Recover", pricingHref: "/pricing/mylapay-intellesolve" },
  { label: "Intelle360", desc: "Analytics Suite for Acquiring Payments", href: "/products/mylapay-intelle360",sub:"Intelligence | Protection | Growth", pricingHref: "/pricing/mylapay-intelle360" },
  { label: "Mylapay U-Switch", desc: "UPI Switch for PSPs, Beneficiary Banks", href: "/products/mylapay-uswitch",sub:"Connect | Route | Approve", pricingHref: "/pricing/mylapay-uswitch" },
  { label: "IntellePro", desc: "Real-time TMS for UPI Transactions", href: "/products/mylapay-intellepro",sub:"Reconcile | Settle | Recover", pricingHref: "/pricing/mylapay-intellepro" },
  { label: "Mylapay SwitchX", desc: "Payment Orchestration Hub", href: "/products/mylapay-switchx",sub:"Route | Integrate | Optimize", pricingHref: "/pricing/mylapay-switchx" },
];

// Solutions menu
const solutions = [
  {
    key: "acquiring",
    title: "Acquiring support",
    description: "Standalone, Modular solutions for acquiring payments.",
    href: "/solutions/acquiring",
  },
  {
    key: "card",
    title: "Card Payments",
    description: "End-to-end card acceptance: tokenization, authorization, settlement, recon & reporting.",
    href: "/solutions/card-payments",
  },
  {
    key: "upi",
    title: "UPI payments",
    description: "Fast, low-cost UPI acceptance with instant settlement & reconciliation.",
    href: "/solutions/upi-payments",
  },
  {
    key: "orchestration",
    title: "Payment Orchestration",
    description: "Smart routing, failover & optimization across multiple providers to maximize success rates.",
    href: "/solutions/payment-orchestration",
  },
];

// Resources menu
const resources = [
  { key: "about", title: "About Us", href: "/about" },
  { key: "careers", title: "Careers", href: "/careers" },
  { key: "contact", title: "Contact Us", href: "/contact" },
  { key: "CaseStudy", title: "Case Study", href: "/casestudy" },
  { key: "blog", title: "Blog", href: "/blog" },
  { key: "faq", title: "FAQ", href: "/faq" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [productsMenuOpen, setProductsMenuOpen] = useState(false);
  const [resourcesMenuOpen, setResourcesMenuOpen] = useState(false);
  const [pricingMenuOpen, setPricingMenuOpen] = useState(false);
  const [pricingAlign, setPricingAlign] = useState<'center' | 'left' | 'right'>('center');
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const location = useLocation();
  const pricingBtnRef = useRef<HTMLButtonElement | null>(null);

  const computeAlignment = () => {
    try {
      const btn = pricingBtnRef.current;
      if (!btn || typeof window === 'undefined') return;
      const rect = btn.getBoundingClientRect();
      const vw = window.innerWidth || document.documentElement.clientWidth;
      const menuMax = Math.min(780, Math.floor(vw * 0.9));
      const leftSpace = rect.left;
      const rightSpace = vw - rect.right;

      // If there's not enough right space for half the menu, anchor to right
      if (rightSpace < menuMax / 2) {
        setPricingAlign('right');
        return;
      }

      // If there's not enough left space for half the menu, anchor to left
      if (leftSpace < menuMax / 2) {
        setPricingAlign('left');
        return;
      }

      // Otherwise center
      setPricingAlign('center');
    } catch (err) {
      // noop
    }
  };

  const handleEnter = (menu: string) => {
    if (timerRef.current) clearTimeout(timerRef.current);

    if (menu === "ourProducts") {
      setMegaMenuOpen(true);
      setProductsMenuOpen(false);
      setResourcesMenuOpen(false);
      setPricingMenuOpen(false);
    }
    if (menu === "products") {
      setProductsMenuOpen(true);
      setMegaMenuOpen(false);
      setResourcesMenuOpen(false);
      setPricingMenuOpen(false);
    }
    if (menu === "resources") {
      setResourcesMenuOpen(true);
      setMegaMenuOpen(false);
      setProductsMenuOpen(false);
      setPricingMenuOpen(false);
    }
    if (menu === "pricing") {
      computeAlignment();
      setPricingMenuOpen(true);
      setMegaMenuOpen(false);
      setProductsMenuOpen(false);
      setResourcesMenuOpen(false);
    }
  };

  const handleLeave = (menu: string) => {
    timerRef.current = setTimeout(() => {
      if (menu === "ourProducts") setMegaMenuOpen(false);
      if (menu === "products") setProductsMenuOpen(false);
      if (menu === "resources") setResourcesMenuOpen(false);
      if (menu === "pricing") setPricingMenuOpen(false);
    }, 200);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 backdrop-blur border-b border-white/20 bg-white/80">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img
            src={Fulllogo}
            alt="Company logo"
            className="h-8 w-auto rounded-sm"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 relative">
          {navItems.map((item) =>
            item.hasMegaMenu ? (
              // Products
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => handleEnter("ourProducts")}
                onMouseLeave={() => handleLeave("ourProducts")}
              >
                <button
                  className={cn(
                    "flex items-center gap-1 text-sm font-medium relative after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-slate-900 after:transition-all after:duration-300 after:ease-out after:w-0",
                    megaMenuOpen || location.pathname.startsWith("/products")
                      ? "text-slate-900 after:w-full"
                      : "text-slate-800/90 hover:text-slate-900 hover:after:w-full"
                  )}
                >
                  {item.label}
                  <ChevronDown size={14} className="mt-[1px]" />
                </button>
                {megaMenuOpen && (
                  <div className="absolute left-1/2 -translate-x-1/2 mt-4 w-[780px] max-w-[90vw] bg-white shadow-xl rounded-lg p-6 grid grid-cols-3 gap-6 z-50 border border-slate-100">
                    {products.map((p) => (
                      <Link
                        key={p.label}
                        to={p.href}
                        onClick={() => {
                          setOpen(false);
                          setMegaMenuOpen(false);
                        }}
                        className={cn(
                          "block text-sm p-2 rounded-md hover:bg-slate-50",
                          location.pathname === p.href
                            ? "text-slate-900 font-bold bg-slate-100"
                            : "text-slate-700 hover:text-slate-900"
                        )}
                      >
                        <span className="font-semibold secondarycolormylapay">{p.label}</span>
                        <p className="text-xs text-slate-600">{p.desc}</p>
                        <p className="text-xs text-slate-600">{p.sub}</p>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : item.hasSolutionsMenu ? (
              // Solutions
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => handleEnter("products")}
                onMouseLeave={() => handleLeave("products")}
              >
                <button
                  className={cn(
                    "flex items-center gap-1 text-sm font-medium relative after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-slate-900 after:transition-all after:duration-300 after:ease-out after:w-0",
                    productsMenuOpen || location.pathname.startsWith("/solutions")
                      ? "text-slate-900 after:w-full"
                      : "text-slate-800/90 hover:text-slate-900 hover:after:w-full"
                  )}
                >
                  {item.label}
                  <ChevronDown size={14} className="mt-[1px]" />
                </button>
                {productsMenuOpen && (
                  <div className="absolute left-1/2 -translate-x-1/2 mt-4 w-[620px] max-w-[90vw] bg-white shadow-xl rounded-lg p-6 grid grid-cols-2 gap-6 z-50 border border-slate-100">
                    {solutions.map((p) => (
                      <Link
                        key={p.key}
                        to={p.href}
                        onClick={() => {
                          setOpen(false);
                          setProductsMenuOpen(false);
                        }}
                        className={cn(
                          "block text-sm p-2 rounded-md hover:bg-slate-50",
                          location.pathname === p.href
                            ? "text-slate-900 font-bold bg-slate-100"
                            : "text-slate-700 hover:text-slate-900"
                        )}
                      >
                        <span className="font-semibold secondarycolormylapay">{p.title}</span>
                        <p className="text-xs text-slate-600">{p.description}</p>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : item.hasResourcesMenu ? (
              // ✅ Resources dropdown (3 top + 3 bottom)
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => handleEnter("resources")}
                onMouseLeave={() => handleLeave("resources")}
              >
                <button
                  className={cn(
                    "flex items-center gap-1 text-sm font-medium relative after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-slate-900 after:transition-all after:duration-300 after:ease-out after:w-0",
                    resourcesMenuOpen || location.pathname.startsWith("/resources")
                      ? "text-slate-900 after:w-full"
                      : "text-slate-800/90 hover:text-slate-900 hover:after:w-full"
                  )}
                >
                  {item.label}
                  <ChevronDown size={14} className="mt-[1px]" />
                </button>
                {resourcesMenuOpen && (
                  <div className="absolute right-0 mt-4 w-[450px] bg-white shadow-xl rounded-lg p-6 grid grid-cols-3 gap-4 z-50 border border-slate-100">
                    {resources.map((r) => (
                      <Link
                        key={r.key}
                        to={r.href}
                        onClick={() => {
                          setOpen(false);
                          setResourcesMenuOpen(false);
                        }}
                        className={cn(
                          "block text-sm p-2 rounded-md hover:bg-slate-50",
                          location.pathname === r.href
                            ? "text-slate-900 font-bold bg-slate-100"
                            : "text-slate-700 hover:text-slate-900"
                        )}
                      >
                        <span className="font-semibold secondarycolormylapay">
                          {r.title}
                        </span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : item.hasPricingMenu ? (
              // Pricing dropdown
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => handleEnter("pricing")}
                onMouseLeave={() => handleLeave("pricing")}
              >
                <button
                  ref={pricingBtnRef}
                  className={cn(
                    "flex items-center gap-1 text-sm font-medium relative after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-slate-900 after:transition-all after:duration-300 after:ease-out after:w-0",
                    pricingMenuOpen || location.pathname.startsWith("/pricing")
                      ? "text-slate-900 after:w-full"
                      : "text-slate-800/90 hover:text-slate-900 hover:after:w-full"
                  )}
                  onMouseEnter={() => handleEnter('pricing')}
                >
                  {item.label}
                  <ChevronDown size={14} className="mt-[1px]" />
                </button>
                {pricingMenuOpen && (
                  <div className={cn(
                    "absolute mt-4 w-[780px] max-w-[90vw] bg-white shadow-xl rounded-lg p-6 grid grid-cols-3 gap-6 z-50 border border-slate-100",
                    pricingAlign === 'center' ? 'left-1/2 -translate-x-1/2' : pricingAlign === 'right' ? 'right-0' : 'left-0'
                  )}>
                    {products.map((p) => (
                      <Link
                        key={p.label}
                        to={p.pricingHref}
                        onClick={() => {
                          setOpen(false);
                          setPricingMenuOpen(false);
                        }}
                        className={cn(
                          "block text-sm p-2 rounded-md hover:bg-slate-50 break-words",
                          location.pathname === p.pricingHref
                            ? "text-slate-900 font-bold bg-slate-100"
                            : "text-slate-700 hover:text-slate-900"
                        )}
                      >
                        <span className="font-semibold secondarycolormylapay">{p.label}</span>
                        <p className="text-xs text-slate-600">{p.desc}</p>
                        <p className="text-xs text-slate-600">{p.sub}</p>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) 
            : item.external ? (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-slate-800/90 hover:text-slate-900"
              >
                {item.label}
              </a>
            )  :
            (
              // Normal link
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "text-sm font-medium relative after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-slate-900 after:transition-all after:duration-300 after:ease-out after:w-0",
                  location.pathname === item.href
                    ? "text-slate-900 after:w-full"
                    : "text-slate-800/90 hover:text-slate-900 hover:after:w-full"
                )}
              >
                {item.label}
              </Link>
            )
          )}
         
        
        </nav>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-slate-800/90 hover:text-slate-900 hover:bg-white/10 transition"
          aria-label="Toggle Menu"
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "md:hidden border-t bg-white/80 transition-all",
          open ? "block" : "hidden"
        )}
      >
        <div className="container py-3 flex flex-col max-h-[80vh] overflow-y-auto">
          {navItems.map((item) =>
            item.hasMegaMenu ? (
              <div key={item.href} className="flex flex-col">
                <button
                  onClick={() => setMegaMenuOpen((v) => !v)}
                  className="py-2 flex items-center justify-between text-base font-medium"
                >
                  {item.label}
                  <ChevronDown
                    size={16}
                    className={cn("transition-transform", megaMenuOpen ? "rotate-180" : "rotate-0")}
                  />
                </button>
                {megaMenuOpen && (
                  <div className="pl-4 grid grid-cols-1 gap-3 mt-2">
                    {products.map((p) => (
                      <Link
                        key={p.label}
                        to={p.href}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "block text-sm p-2 rounded-md",
                          location.pathname === p.href
                            ? "text-slate-900 font-bold bg-slate-100"
                            : "text-slate-700 hover:text-slate-900 hover:bg-slate-50"
                        )}
                      >
                        <span className="font-semibold">{p.label}</span>
                        <p className="text-xs text-slate-600">{p.desc}</p>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : item.hasSolutionsMenu ? (
              <div key={item.href} className="flex flex-col">
                <button
                  onClick={() => setProductsMenuOpen((v) => !v)}
                  className="py-2 flex items-center justify-between text-base font-medium"
                >
                  {item.label}
                  <ChevronDown
                    size={16}
                    className={cn("transition-transform", productsMenuOpen ? "rotate-180" : "rotate-0")}
                  />
                </button>
                {productsMenuOpen && (
                  <div className="pl-4 grid grid-cols-1 gap-3 mt-2">
                    {solutions.map((p) => (
                      <Link
                        key={p.key}
                        to={p.href}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "block text-sm p-2 rounded-md",
                          location.pathname === p.href
                            ? "text-slate-900 font-bold bg-slate-100"
                            : "text-slate-700 hover:text-slate-900 hover:bg-slate-50"
                        )}
                      >
                        <span className="font-semibold">{p.title}</span>
                        <p className="text-xs text-slate-600">{p.description}</p>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : item.hasResourcesMenu ? (
              <div key={item.href} className="flex flex-col">
                <button
                  onClick={() => setResourcesMenuOpen((v) => !v)}
                  className="py-2 flex items-center justify-between text-base font-medium"
                >
                  {item.label}
                  <ChevronDown
                    size={16}
                    className={cn("transition-transform", resourcesMenuOpen ? "rotate-180" : "rotate-0")}
                  />
                </button>
                {resourcesMenuOpen && (
                  <div className="pl-4 grid grid-cols-1 gap-3 mt-2">
                    {resources.map((r) => (
                      <Link
                        key={r.key}
                        to={r.href}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "block text-sm p-2 rounded-md",
                          location.pathname === r.href
                            ? "text-slate-900 font-bold bg-slate-100"
                            : "text-slate-700 hover:text-slate-900 hover:bg-slate-50"
                        )}
                      >
                        <span className="font-semibold">{r.title}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : item.hasPricingMenu ? (
              <div key={item.href} className="flex flex-col">
                <button
                  onClick={() => setPricingMenuOpen((v) => !v)}
                  className="py-2 flex items-center justify-between text-base font-medium"
                >
                  {item.label}
                  <ChevronDown
                    size={16}
                    className={cn("transition-transform", pricingMenuOpen ? "rotate-180" : "rotate-0")}
                  />
                </button>
                {pricingMenuOpen && (
                  <div className="pl-4 grid grid-cols-1 gap-3 mt-2">
                    {products.map((p) => (
                      <Link
                        key={p.label}
                        to={p.pricingHref}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "block text-sm p-2 rounded-md",
                          location.pathname === p.pricingHref
                            ? "text-slate-900 font-bold bg-slate-100"
                            : "text-slate-700 hover:text-slate-900 hover:bg-slate-50"
                        )}
                      >
                        <span className="font-semibold">{p.label}</span>
                        <p className="text-xs text-slate-600">{p.desc}</p>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )
            :
            // : item.external ? (
            //   <a
            //     key={item.href}
            //     href={item.href}
            //     target="_blank"
            //     rel="noopener noreferrer"
            //     className="py-2 text-base text-slate-800/90 hover:text-slate-900"
            //   >
            //     {item.label}
            //   </a>
            // )
             (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "py-2 text-base",
                  location.pathname === item.href
                    ? "text-slate-900 font-bold"
                    : "text-slate-800/90 hover:text-slate-900"
                )}
              >
                {item.label}
              </Link>
            )
          )}
        </div>
      </div>
    </header>
  );
}
