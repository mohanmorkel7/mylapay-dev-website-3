import { useParams, useNavigate } from "react-router-dom";
import Footer from "@/components/layout/Footer";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@/components/ui/dialog";

const products = [
  { slug: "mylapay-tokenx", name: "TokenX", fullName: "Mylapay TokenX" },
  { slug: "mylapay-secure", name: "Secure", fullName: "Mylapay Secure" },
  { slug: "mylapay-cswitch", name: "C-Switch", fullName: "Mylapay C-Switch" },
  {
    slug: "mylapay-intellewatch",
    name: "IntelleWatch",
    fullName: "IntelleWatch",
  },
  {
    slug: "mylapay-intellesettle",
    name: "IntelleSettle",
    fullName: "IntelleSettle",
  },
  {
    slug: "mylapay-intellesolve",
    name: "IntelleSolve",
    fullName: "IntelleSolve",
  },
  { slug: "mylapay-intelle360", name: "Intelle360", fullName: "Intelle360" },
  { slug: "mylapay-uswitch", name: "U-Switch", fullName: "Mylapay U-Switch" },
  { slug: "mylapay-intellepro", name: "IntellePro", fullName: "IntellePro" },
  { slug: "mylapay-switchx", name: "SwitchX", fullName: "Mylapay SwitchX" },
];

const faqs = [
  {
    id: 1,
    question: "Can I choose my meals?",
    answer:
      "Quisque rutrum. Aenean imperdi. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget.",
    isOpen: false,
  },
  {
    id: 2,
    question: "When will I receive my order?",
    answer: "",
    isOpen: false,
  },
  {
    id: 3,
    question: "Can I skip a delivery?",
    answer: "",
    isOpen: false,
  },
  {
    id: 4,
    question: "Block title",
    answer: "",
    isOpen: false,
  },
];

export default function PlanComparison() {
  const { productSlug } = useParams<{ productSlug: string }>();
  const navigate = useNavigate();
  const [expandedFaq, setExpandedFaq] = useState<number | null>(1);
  const [billingCycle, setBillingCycle] = useState<"yearly" | "monthly">(
    "yearly",
  );

  const product = products.find((p) => p.slug === productSlug);

  // Trial modal state (local to comparison page)
  const [showTrialModal, setShowTrialModal] = useState(false);
  const [trialEmail, setTrialEmail] = useState("");
  const [trialStage, setTrialStage] = useState<"email" | "otp">("email");
  const [trialOtp, setTrialOtp] = useState("");
  const [trialOtpExpiresAt, setTrialOtpExpiresAt] = useState<number | null>(
    null,
  );

  useEffect(() => {
    // reset OTP stage when modal is opened/closed
    if (!showTrialModal) {
      setTrialStage("email");
      setTrialEmail("");
      setTrialOtp("");
      setTrialOtpExpiresAt(null);
    }
  }, [showTrialModal]);

  async function sendTrialOtp() {
    if (!trialEmail) return alert("Enter an email to receive OTP");
    try {
      const axios = (await import("axios")).default;
      const productName = product?.name ? product.name.toLowerCase() : "tokenx";
      const resp = await axios.post("/api/mylapay/require-otp", {
        email: trialEmail,
        productName,
      });
      const data = resp.data;
      if (data && (data.ok === true || data.ok === "true")) {
        setTrialStage("otp");
        setTrialOtp("");
        setTrialOtpExpiresAt(Date.now() + 5 * 60 * 1000);
        toast({
          title: "OTP sent",
          description:
            "Please check your email and enter the 6-digit OTP (expires in 5 minutes).",
        });
      } else {
        const msg = data?.message || data?.error || JSON.stringify(data);
        toast({ title: "Failed to send OTP", description: String(msg) });
      }
    } catch (err: any) {
      console.error("Send OTP error", err);
      toast({
        title: "Send OTP failed",
        description: err?.message || String(err),
      });
    }
  }

  async function verifyTrialOtp() {
    if (!trialOtp) return alert("Enter the OTP");
    try {
      const axios = (await import("axios")).default;
      const productName = product?.name ? product.name.toLowerCase() : "tokenx";
      const resp = await axios.post("/api/mylapay/require-otp", {
        email: trialEmail,
        productName,
        otp: trialOtp,
      });
      const data = resp.data;
      if (data && (data.ok === true || data.ok === "true")) {
        toast({ title: data.message || "Success", description: "" });
        setShowTrialModal(false);
        setTrialEmail("");
        setTrialStage("email");
        setTrialOtp("");
        setTrialOtpExpiresAt(null);
      } else {
        const msg = data?.message || data?.error || JSON.stringify(data);
        toast({ title: "OTP verification failed", description: String(msg) });
      }
    } catch (err: any) {
      console.error("Verify OTP error", err);
      toast({
        title: "Verify OTP failed",
        description: err?.message || String(err),
      });
    }
  }

  // Checkout modal state (local to comparison page)
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [checkoutPlan, setCheckoutPlan] = useState<{
    key: string;
    title: string;
    price: string;
  } | null>(null);
  const [checkoutEmail, setCheckoutEmail] = useState("");
  const [checkoutFirstName, setCheckoutFirstName] = useState("");
  const [checkoutLastName, setCheckoutLastName] = useState("");
  const [showResultModal, setShowResultModal] = useState(false);
  const [resultDetails, setResultDetails] = useState<any>(null);

  const planDetails: Record<
    string,
    { title: string; priceYearly: string; priceMonthly: string }
  > = {
    trial: {
      title: "Trial",
      priceYearly: "Free (up to 7 days)",
      priceMonthly: "Free",
    },
    basic: {
      title: "Basic Plan",
      priceYearly: "$499 / Year",
      priceMonthly: "$49 / Month",
    },
    pro: {
      title: "Pro Plan",
      priceYearly: "$999 / Year",
      priceMonthly: "$99 / Month",
    },
    enterprise: {
      title: "Enterprise Plan",
      priceYearly: "Contact for pricing",
      priceMonthly: "Contact for pricing",
    },
  };

  function openCheckoutFor(key: string) {
    const details = planDetails[key];
    const price =
      billingCycle === "yearly" ? details.priceYearly : details.priceMonthly;
    setCheckoutPlan({ key, title: details.title, price });
    setShowCheckoutModal(true);
  }

  async function loadRazorpayScript() {
    if (typeof window === "undefined") return false;
    if ((window as any).Razorpay) return true;
    return new Promise<boolean>((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  }

  async function handleProceedToPay() {
    if (!checkoutPlan) return;
    if (!checkoutEmail || !checkoutFirstName || !checkoutLastName) {
      alert("Please provide first name, last name and email to proceed.");
      return;
    }

    const planAmounts: Record<string, number> = {
      basic: billingCycle === "yearly" ? 49900 : 4900,
      pro: billingCycle === "yearly" ? 99900 : 9900,
      enterprise: billingCycle === "yearly" ? 0 : 0,
      trial: 0,
    };

    const amount = planAmounts[checkoutPlan.key] ?? 0;

    try {
      const axios = (await import("axios")).default;
      if (!amount || amount <= 0) {
        alert(
          "This plan requires custom pricing or is free. Please contact sales.",
        );
        setShowCheckoutModal(false);
        return;
      }

      let data: any;
      try {
        const createResp = await axios.post("/api/razorpay/create-order", {
          amount,
          currency: "INR",
          receipt: `rcpt_${Date.now()}`,
          notes: { plan: checkoutPlan.key },
        });
        data = createResp.data;
      } catch (err: any) {
        console.error("Create order axios error:", err?.response || err);
        const serverErr = err?.response?.data || err?.message || String(err);
        alert(
          "Payment initialization failed: " +
            (typeof serverErr === "string"
              ? serverErr
              : JSON.stringify(serverErr)),
        );
        return;
      }

      if (!data || !data.ok) {
        alert(
          "Failed to create order: " + (data?.error || JSON.stringify(data)),
        );
        return;
      }

      const order = data.order;
      const keyId = data.keyId;

      const loaded = await loadRazorpayScript();
      if (!loaded) throw new Error("Failed to load Razorpay SDK");

      setShowCheckoutModal(false);
      await new Promise((res) => setTimeout(res, 120));

      const options: any = {
        key: keyId,
        amount: order.amount,
        currency: order.currency,
        name: "Mylapay",
        description: checkoutPlan.title,
        order_id: order.id,
        handler: async function (response: any) {
          const axios = (await import("axios")).default;
          let verifyData: any = null;
          try {
            const vr = await axios.post("/api/razorpay/verify", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });
            verifyData = vr.data;
          } catch (err: any) {
            verifyData = { ok: false, error: err?.message || String(err) };
          }

          const details = {
            ok: verifyData.ok,
            paymentResponse: response,
            order,
            verifyData,
          };
          setResultDetails(details);
          setShowResultModal(true);
          setShowCheckoutModal(false);
        },
        prefill: {
          name: `${checkoutFirstName} ${checkoutLastName}`,
          email: checkoutEmail,
        },
        theme: { color: "#2CADE3" },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
      rzp.on("payment.failed", function (response: any) {
        const details = { ok: false, paymentResponse: response };
        setResultDetails(details);
        setShowResultModal(true);
        setShowCheckoutModal(false);
      });
    } catch (err: any) {
      console.error("Checkout error:", err);
      alert(err?.message || "Payment failed to initiate");
    }
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <button
            onClick={() => navigate("/pricing")}
            className="text-blue-600 hover:underline"
          >
            Go back to pricing
          </button>
        </div>
      </div>
    );
  }

  const toggleFaq = (id: number) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="w-full bg-white pt-20 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Page Title */}
          <div className="text-center mb-6">
            <h1 className="text-xl md:text-2xl font-bold mb-3">
              <span className="text-blue-900">Choose Your </span>
              <span className="text-[#2CADE3]">Plans</span>
            </h1>
            <p className="text-gray-800 text-xs">With our Products</p>
          </div>

          {/* Product Selection */}
          <div className="flex justify-center mb-8">
            <div className="bg-[#1E3A8A] rounded-lg px-6 py-4">
              <span className="text-white font-semibold text-sm md:text-base">
                {product.fullName}
              </span>
            </div>
          </div>

          {/* Sub-header with Back Button and Feature Table Title */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-8 px-4 lg:px-10">
            <button
              onClick={() => navigate(`/pricing/${productSlug}`)}
              className="flex items-center gap-2 px-4 py-2 border border-black rounded-lg hover:bg-gray-50 transition-colors"
            >
              <svg
                className="w-3 h-6"
                viewBox="0 0 12 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M1.84306 11.2889L7.50006 5.63186L8.91406 7.04586L3.96406 11.9959L8.91406 16.9459L7.50006 18.3599L1.84306 12.7029C1.65559 12.5153 1.55028 12.261 1.55028 11.9959C1.55028 11.7307 1.65559 11.4764 1.84306 11.2889Z"
                  fill="black"
                />
              </svg>
              <span className="text-black font-semibold">Back to products</span>
            </button>

            <div className="flex-1 max-w-xl">
              <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-2">
                Feature Table
              </h2>
              <p className="text-gray-900 text-xs md:text-sm">
                Choose the perfect plan for your business needs
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 ml-auto">
              <div className="text-right whitespace-nowrap">
                <span className="text-xs font-bold mr-2">Save 15%</span>
                <span className="text-xs text-gray-600">on yearly plan!</span>
              </div>
              <div className="flex items-center gap-1 p-1 border border-gray-200 rounded-full bg-white">
                <button
                  onClick={() => setBillingCycle("yearly")}
                  className={`px-3 py-1 rounded-full text-[11px] font-semibold transition-all ${
                    billingCycle === "yearly"
                      ? "bg-blue-900 text-white"
                      : "text-gray-800"
                  }`}
                >
                  Yearly
                </button>
                <button
                  onClick={() => setBillingCycle("monthly")}
                  className={`px-3 py-1 rounded-full text-[11px] font-semibold transition-all ${
                    billingCycle === "monthly"
                      ? "bg-blue-900 text-white"
                      : "text-gray-800"
                  }`}
                >
                  Monthly
                </button>
              </div>
            </div>
          </div>

          {/* Plan Cards Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-0 border border-[#E6E9F5] mb-6">
            {/* Compare Plans Column */}
            <div className="bg-white p-4 md:p-6 border-b md:border-b-0 md:border-r border-[#E6E9F5] flex flex-col justify-between">
              <div>
                <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2">
                  Compare plans
                </h3>
                {/* <div className="inline-flex items-center justify-center px-3 py-1 rounded-full border border-gray-400 mb-2">
                  <span className="text-gray-900 font-medium">40% Off</span>
                </div> */}
                <p className="text-xs text-gray-500">
                  Choose your workspace plan according to your organisational
                  plan
                </p>
              </div>
            </div>

            {/* Trial Plan */}
            <div className="bg-white p-6 md:p-7 border-b md:border-b-0 md:border-r border-[#E6E9F5] flex flex-col justify-between text-center">
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-1">
                  Trial
                </h3>
                <p className="text-xs text-gray-500 mb-6">/Free (7 days)</p>
              </div>
              <button
                onClick={() => setShowTrialModal(true)}
                className="w-full bg-[#2CADE3] text-white py-2 md:py-3 text-xs font-bold rounded hover:bg-[#2399c9] transition-colors"
              >
                Try now
              </button>
            </div>

            {/* $25 Plan */}
            <div className="bg-white p-6 md:p-7 border-b md:border-b-0 md:border-r border-[#E6E9F5] flex flex-col justify-between text-center">
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-1">
                  $25
                </h3>
                <p className="text-xs text-gray-500 mb-6">/Month</p>
              </div>
              <button
                onClick={() => openCheckoutFor("basic")}
                className="w-full bg-[#2CADE3] text-white py-2 md:py-3 text-xs font-bold rounded hover:bg-[#2399c9] transition-colors"
              >
                Choose This Plan
              </button>
            </div>

            {/* $40 Plan */}
            <div className="bg-white p-6 md:p-7 border-b md:border-b-0 md:border-r border-[#E6E9F5] flex flex-col justify-between text-center">
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-1">
                  $40
                </h3>
                <p className="text-xs text-gray-500 mb-6">/Month</p>
              </div>
              <button
                onClick={() => openCheckoutFor("pro")}
                className="w-full bg-[#2CADE3] text-white py-2 md:py-3 text-xs font-bold rounded hover:bg-[#2399c9] transition-colors"
              >
                Choose This Plan
              </button>
            </div>

            {/* Custom Plan */}
            <div className="bg-white p-6 md:p-7 border-b md:border-b-0 border-[#E6E9F5] flex flex-col justify-between text-center">
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">
                  Custom
                </h3>
              </div>
              <button
                onClick={() => navigate("/contact")}
                className="w-full bg-[#2CADE3] text-white py-2 md:py-3 text-xs font-bold rounded hover:bg-[#2399c9] transition-colors"
              >
                Contact Now
              </button>
            </div>
          </div>

          {/* Feature Comparison Table */}
          <div className="border border-[#E6E9F5] mb-6">
            <div className="grid grid-cols-1 md:grid-cols-5">
              {/* Feature Names Column */}
              <div className="bg-white border-r border-[#E6E9F5]">
                {[
                  "Daily Throughput",
                  "Monthly Transaction Quota",
                  "Overage Charges",
                  "Deployment",
                  "Value-Added Services (VAS)",
                  "Support",
                  "Best For",
                ].map((feature, idx) => (
                  <div
                    key={idx}
                    className="p-2 border-b border-[#E6E9F5] h-14 flex items-center"
                  >
                    <span className="text-gray-900 font-medium text-xs md:text-sm">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {/* Trial Column */}
              <div className="bg-white border-r border-[#E6E9F5]">
                {[
                  "100 trans/day",
                  <CloseIcon key="close1" />,
                  <CloseIcon key="close2" />,
                  <CloseIcon key="close3" />,
                  <CloseIcon key="close4" />,
                  "Email",
                  "Evaluation & Testing",
                ].map((value, idx) => (
                  <div
                    key={idx}
                    className="p-2 border-b border-[#E6E9F5] h-14 flex items-center justify-center"
                  >
                    {typeof value === "string" ? (
                      <span className="text-gray-900 font-medium text-sm text-center">
                        {value}
                      </span>
                    ) : (
                      value
                    )}
                  </div>
                ))}
              </div>

              {/* $25 Column */}
              <div className="bg-white border-r border-[#E6E9F5]">
                {[
                  "500 trans/day",
                  "limited",
                  "Per-transaction",
                  <CloseIcon key="close5" />,
                  <CloseIcon key="close6" />,
                  "Standard Support",
                  "Small Businesses",
                ].map((value, idx) => (
                  <div
                    key={idx}
                    className="p-2 border-b border-[#E6E9F5] h-14 flex items-center justify-center"
                  >
                    {typeof value === "string" ? (
                      <span
                        className={`text-gray-900 font-medium text-sm text-center ${idx === 1 ? "font-semibold" : ""}`}
                      >
                        {value}
                      </span>
                    ) : (
                      value
                    )}
                  </div>
                ))}
              </div>

              {/* $40 Column */}
              <div className="bg-white border-r border-[#E6E9F5]">
                {[
                  "1,000+ trans/day",
                  "Standard",
                  "Reduced rate",
                  <CloseIcon key="close7" />,
                  <CheckIcon key="check1" />,
                  "Priority Support",
                  "Growing Merchants",
                ].map((value, idx) => (
                  <div
                    key={idx}
                    className="p-2 border-b border-[#E6E9F5] h-14 flex items-center justify-center"
                  >
                    {typeof value === "string" ? (
                      <span
                        className={`text-gray-900 font-medium text-sm text-center ${idx === 1 ? "font-semibold" : ""}`}
                      >
                        {value}
                      </span>
                    ) : (
                      value
                    )}
                  </div>
                ))}
              </div>

              {/* Custom Column */}
              <div className="bg-white">
                {[
                  "5,000+ trans/day",
                  "High",
                  "Volume-based",
                  "Client-side Deployment",
                  <CheckIcon key="check2" />,
                  "24×7 Dedicated Support",
                  "High-Volume Enterprises",
                ].map((value, idx) => (
                  <div
                    key={idx}
                    className="p-2 border-b border-[#E6E9F5] h-14 flex items-center justify-center"
                  >
                    {typeof value === "string" ? (
                      <span
                        className={`text-gray-900 font-medium text-sm text-center ${idx === 1 ? "font-semibold" : ""}`}
                      >
                        {value}
                      </span>
                    ) : (
                      value
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="max-w-4xl mx-auto py-12">
            <h2 className="text-xl md:text-2xl font-bold text-[#1E3A8A] text-center mb-8">
              Frequently Asked Question
            </h2>

            <div className="space-y-3">
              {faqs.map((faq) => (
                <div
                  key={faq.id}
                  className="bg-white rounded-lg border border-gray-100"
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full flex items-center justify-between p-4 md:p-6 text-left hover:bg-gray-50 transition-colors"
                  >
                    <h3 className="text-sm md:text-base font-bold text-gray-900 pr-4">
                      {faq.question}
                    </h3>
                    {expandedFaq === faq.id ? (
                      <ChevronDown className="w-4 h-4 text-[#2CADE3] flex-shrink-0" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-[#2CADE3] flex-shrink-0" />
                    )}
                  </button>

                  {expandedFaq === faq.id && faq.answer && (
                    <div className="px-4 md:px-6 pb-4 md:pb-6">
                      <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Trial Signup Modal (local to comparison page) */}
      <Dialog open={showTrialModal} onOpenChange={setShowTrialModal}>
        <DialogPortal>
          <DialogOverlay className="bg-white/70 backdrop-blur-md" />
          <DialogContent className="max-w-md p-4 sm:p-6 rounded-xl shadow-2xl">
            <DialogTitle className="sr-only">{`Join Our Trial on ${product?.name || "Product"}`}</DialogTitle>

            <div className="p-4 sm:p-6">
              <div className="text-center mb-4">
                <h2 className="text-xl md:text-2xl font-bold text-[#1E3A8A] mb-1">
                  Join Our Trial on
                </h2>
                <h3 className="text-xl md:text-2xl font-bold text-[#2CADE3]">
                  {product?.name}
                </h3>
              </div>

              <div className="space-y-3">
                {trialStage === "email" ? (
                  <>
                    <input
                      type="email"
                      placeholder="Email address"
                      value={trialEmail}
                      onChange={(e) => setTrialEmail(e.target.value)}
                      className="w-full px-3 py-2 border border-black/30 rounded-md text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2CADE3] focus:border-transparent"
                    />

                    <button
                      onClick={sendTrialOtp}
                      className="w-full bg-[#2CADE3] text-white py-2 rounded-md text-sm font-medium hover:bg-[#2399c9] transition-colors"
                    >
                      Send OTP
                    </button>
                  </>
                ) : (
                  <>
                    <p className="text-sm text-gray-600">
                      Enter the 6-digit OTP sent to your email. Expires in 5
                      minutes.
                    </p>
                    <input
                      type="text"
                      placeholder="Enter OTP"
                      value={trialOtp}
                      onChange={(e) => setTrialOtp(e.target.value)}
                      className="w-full px-3 py-2 border border-black/30 rounded-md text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2CADE3] focus:border-transparent"
                    />

                    <div className="flex gap-2">
                      <button
                        onClick={verifyTrialOtp}
                        className="flex-1 bg-[#2CADE3] text-white py-2 rounded-md text-sm font-medium hover:bg-[#2399c9] transition-colors"
                      >
                        Verify OTP
                      </button>
                      <button
                        onClick={sendTrialOtp}
                        className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors"
                      >
                        Resend
                      </button>
                    </div>
                  </>
                )}
              </div>

              <p className="text-center text-gray-500 text-xs mt-4">
                Submit your email address to join the trial plan
              </p>
            </div>
          </DialogContent>
        </DialogPortal>
      </Dialog>

      {/* Checkout Modal */}
      <Dialog open={showCheckoutModal} onOpenChange={setShowCheckoutModal}>
        <DialogPortal>
          <DialogOverlay className="bg-white/80 backdrop-blur-md" />
          <DialogContent className="max-w-md p-4 sm:p-6 rounded-xl shadow-2xl">
            <DialogTitle className="sr-only">Checkout</DialogTitle>

            <div className="p-4 sm:p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold text-[#1E3A8A]">Checkout</h2>
                  <p className="text-sm text-gray-600">
                    Please confirm your details to proceed to payment
                  </p>
                </div>
              </div>

              {checkoutPlan && (
                <div className="mb-4 p-3 border border-gray-100 rounded-md bg-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Selected plan</p>
                      <p className="font-semibold text-gray-900">
                        {checkoutPlan.title}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Amount</p>
                      <p className="font-semibold text-gray-900">
                        {checkoutPlan.price}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="First name"
                    value={checkoutFirstName}
                    onChange={(e) => setCheckoutFirstName(e.target.value)}
                    className="w-full px-3 py-2 border border-black/30 rounded-md text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2CADE3] focus:border-transparent"
                  />
                  <input
                    type="text"
                    placeholder="Last name"
                    value={checkoutLastName}
                    onChange={(e) => setCheckoutLastName(e.target.value)}
                    className="w-full px-3 py-2 border border-black/30 rounded-md text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2CADE3] focus:border-transparent"
                  />
                </div>

                <input
                  type="email"
                  placeholder="Email address"
                  value={checkoutEmail}
                  onChange={(e) => setCheckoutEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-black/30 rounded-md text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2CADE3] focus:border-transparent"
                />

                <div className="flex gap-2">
                  <button
                    onClick={handleProceedToPay}
                    className="flex-1 bg-[#2CADE3] text-white py-2 rounded-md text-sm font-medium hover:bg-[#2399c9] transition-colors"
                  >
                    Proceed to Pay
                  </button>
                  <button
                    onClick={() => setShowCheckoutModal(false)}
                    className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>

              <p className="text-center text-gray-500 text-xs mt-4">
                You will be redirected to the payment gateway after clicking
                "Proceed to Pay".
              </p>
            </div>
          </DialogContent>
        </DialogPortal>
      </Dialog>

      {/* Payment result modal */}
      <Dialog open={showResultModal} onOpenChange={setShowResultModal}>
        <DialogPortal>
          <DialogOverlay className="bg-black/50 backdrop-blur-sm" />
          <DialogContent className="max-w-md p-4 sm:p-6 rounded-xl shadow-2xl">
            <DialogTitle className="sr-only">Payment Result</DialogTitle>
            {resultDetails && (
              <div>
                <h2 className="text-xl font-bold mb-2">
                  {resultDetails.ok ? "Payment Successful" : "Payment Failed"}
                </h2>
                <pre className="text-xs text-gray-700 max-h-40 overflow-auto">
                  {JSON.stringify(resultDetails, null, 2)}
                </pre>
                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => setShowResultModal(false)}
                    className="flex-1 bg-[#2CADE3] text-white py-2 rounded-md text-sm font-medium"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </DialogContent>
        </DialogPortal>
      </Dialog>

      <Footer />
    </div>
  );
}

const CloseIcon = () => (
  <svg
    className="w-5 h-5"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10 1.25C5.125 1.25 1.25 5.125 1.25 10C1.25 14.875 5.125 18.75 10 18.75C14.875 18.75 18.75 14.875 18.75 10C18.75 5.125 14.875 1.25 10 1.25ZM13.375 14.375L10 11L6.625 14.375L5.625 13.375L9 10L5.625 6.625L6.625 5.625L10 9L13.375 5.625L14.375 6.625L11 10L14.375 13.375L13.375 14.375Z"
      fill="black"
    />
  </svg>
);

const CheckIcon = () => (
  <svg
    className="w-5 h-5"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.6125 1.36104C10.6812 0.574966 9.3188 0.574967 8.38749 1.36104L7.53932 2.07692C7.14349 2.41102 6.65365 2.61394 6.1375 2.65759L5.03155 2.75111C3.81717 2.85381 2.85381 3.81717 2.75111 5.03155L2.65759 6.1375C2.61394 6.65365 2.41102 7.14349 2.07692 7.53934L1.36104 8.38749C0.574966 9.3188 0.574967 10.6812 1.36104 11.6125L2.07692 12.4607C2.41102 12.8565 2.61394 13.3464 2.65759 13.8625L2.75111 14.9685C2.85381 16.1829 3.81717 17.1462 5.03155 17.2489L6.1375 17.3424C6.65365 17.3861 7.14349 17.589 7.53934 17.9231L8.38749 18.639C9.3188 19.425 10.6812 19.425 11.6125 18.639L12.4607 17.9231C12.8565 17.589 13.3464 17.3861 13.8625 17.3424L14.9685 17.2489C16.1829 17.1462 17.1462 16.1829 17.2489 14.9685L17.3424 13.8625C17.3861 13.3464 17.589 12.8565 17.9231 12.4607L18.639 11.6125C19.425 10.6812 19.425 9.3188 18.639 8.38749L17.9231 7.53932C17.589 7.14349 17.3861 6.65365 17.3424 6.1375L17.2489 5.03155C17.1462 3.81717 16.1829 2.85381 14.9685 2.75111L13.8625 2.65759C13.3464 2.61394 12.8565 2.41102 12.4607 2.07692L11.6125 1.36104ZM14.546 8.29555C14.9854 7.85621 14.9854 7.1439 14.546 6.70456C14.1067 6.26521 13.3944 6.26521 12.955 6.70456L8.75054 10.9091L7.04604 9.20456C6.6067 8.76521 5.89439 8.76521 5.45505 9.20456C5.0157 9.6439 5.0157 10.3562 5.45505 10.7956L7.95505 13.2955C8.39439 13.7349 9.1067 13.7349 9.54604 13.2955L14.546 8.29555Z"
      fill="#252430"
    />
  </svg>
);
