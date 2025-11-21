import "./global.css";
import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useEffect } from "react";
import { initUserTracking } from "../src/utlis/userTracker";
import { initTracking } from "../src/utlis/Visit";

import Index from "./pages/Home/Index";
import NotFound from "./pages/NotFound";
import Header from "@/components/layout/Header";
import About from "@/pages/about/About";
import Faq from "@/pages/faq/Faq";
import Contact from "@/pages/contact/contact";
import Terms from "@/pages/acceptence/Acceptence";
import Privacy from "@/pages/privacy/Privacy";
import Demo from "@/pages/sheduleDemo/SheduleDemo";
import Careers from "@/pages/careers/Careers";
import CaseStudy from "@/pages/caseStudy/CaseStudy";
import Blog from "@/pages/blog/Blog";
import PaymentResourceBlog from "./pages/blog/pages/PaymentResource";
import Insights from "@/pages/blog/pages/InsightsAndTrends";
import Paymentresorce2 from "@/pages/blog/pages/PaymentResource2";
import InsightsOfPayments from "@/pages/blog/pages/InsightsOfPayments";
import Acquiring from "./pages/solutions/acquiring/Acquiring";
import Upi from "./pages/solutions/upiPayments/UpiPayments";
import CardPayments from "./pages/solutions/CardPayments/CardPayments";
import PaymentOrchestration from "./pages/solutions/PaymentOrchestration/PaymentOrchestration";
import MylapaySecure from "./pages/products/mylapaySecure/MylapaySecure";
import MylapayCSwitch from "./pages/products/mylapayCSwitch/MylapayCSwitch";
import MylapayUSwitch from "./pages/products/mylapayUSwitch/MylapayUSwitch";
import MylapayTokenX from "./pages/products/mylapayTokenX/MylapayTokenX";
import MylapaySwitchX from "./pages/products/mylapaySwitchX/MylapaySwitchX";
import MylapayIntelle360 from "@/pages/products/MylapayIntelle360/MylapayIntelle360";
import MylapayIntellePro from "./pages/products/mylapayIntellePro/MylapayIntellePro";
import MylapayIntelleSolve from "./pages/products/mylapayIntelleSolve/MylapayIntelleSolve";
import MylapayIntelleSettle from "./pages/products/mylapayIntelleSettle/MylapayIntelleSettle";
import MylapayIntelleWatch from "./pages/products/mylapayIntelleWatch/MylapayIntelleWatch";

import ScrollToTop from "./components/ui/ScrollToTop";
import Login from "@/pages/careers/dashboard/LoginPage";
import Dashboard from "./pages/careers/dashboard/index";

import Pricing from "@/pages/pricing/Pricing";

const queryClient = new QueryClient();

// ProtectedRoute component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  // Optionally, show a loading state while checking
  const token = localStorage.getItem("admin_token");
  if (!token) return null; // or <div>Loading...</div>

  return <>{children}</>;
};

// Wrapper that hides Header for specific routes
const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const hideHeader =
    location.pathname.startsWith("/admin") || location.pathname === "/login";

  return (
    <>
      {!hideHeader && <Header />}
      {children}
    </>
  );
};

const App = () => {
  useEffect(() => {
    initUserTracking();
    initTracking();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Layout>
            <Routes>
              {/* Public pages */}
              <Route path="*" element={<NotFound />} />
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/casestudy" element={<CaseStudy />} />
              <Route path="/faq" element={<Faq />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/schedule-demo" element={<Demo />} />
              <Route path="/pricing" element={<Pricing />} />

              {/* Blog */}
              <Route path="/blog" element={<Blog />} />
              <Route
                path="/blog/payment-resources"
                element={<PaymentResourceBlog />}
              />
              <Route path="/blog/reconciliation" element={<Insights />} />
              <Route
                path="/blog/payment-resources2"
                element={<Paymentresorce2 />}
              />
              <Route
                path="/blog/insitesofpayments"
                element={<InsightsOfPayments />}
              />

              {/* Solutions */}
              <Route path="/solutions/acquiring" element={<Acquiring />} />
              <Route path="/solutions/upi-payments" element={<Upi />} />
              <Route
                path="/solutions/card-payments"
                element={<CardPayments />}
              />
              <Route
                path="/solutions/payment-orchestration"
                element={<PaymentOrchestration />}
              />

              {/* Products */}
              <Route
                path="/products/mylapay-secure"
                element={<MylapaySecure />}
              />
              <Route
                path="/products/mylapay-cswitch"
                element={<MylapayCSwitch />}
              />
              <Route
                path="/products/mylapay-uswitch"
                element={<MylapayUSwitch />}
              />
              <Route
                path="/products/mylapay-tokenx"
                element={<MylapayTokenX />}
              />
              <Route
                path="/products/mylapay-switchx"
                element={<MylapaySwitchX />}
              />
              <Route
                path="/products/mylapay-intelle360"
                element={<MylapayIntelle360 />}
              />
              <Route
                path="/products/mylapay-intellepro"
                element={<MylapayIntellePro />}
              />
              <Route
                path="/products/mylapay-intellesolve"
                element={<MylapayIntelleSolve />}
              />
              <Route
                path="/products/mylapay-intellesettle"
                element={<MylapayIntelleSettle />}
              />
              <Route
                path="/products/mylapay-intellewatch"
                element={<MylapayIntelleWatch />}
              />

              {/* Admin Login */}
              <Route
                path="/login"
                element={
                  localStorage.getItem("admin_token") ? (
                    <Navigate to="/admin" replace />
                  ) : (
                    <Login />
                  )
                }
              />

              {/* Protected Admin Dashboard */}
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Layout>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

const rootEl = document.getElementById("root");
if (rootEl) {
  createRoot(rootEl).render(<App />);
} else {
  // Fail gracefully if root element is missing
  // This prevents runtime exceptions during non-browser execution
  // and provides a clear console message for debugging
  // eslint-disable-next-line no-console
  console.error("Root element not found: cannot mount React application.");
}
