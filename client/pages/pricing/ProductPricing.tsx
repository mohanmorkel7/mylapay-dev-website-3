import { useParams, useNavigate } from "react-router-dom";
import { Check, X } from "lucide-react";
import { useState } from "react";
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

const planDetails: Record<string, { title: string; priceYearly: string; priceMonthly: string }> = {
  trial: { title: "Trial", priceYearly: "Free (up to 7 days)", priceMonthly: "Free" },
  basic: { title: "Basic Plan", priceYearly: "$499 / Year", priceMonthly: "$49 / Month" },
  pro: { title: "Pro Plan", priceYearly: "$999 / Year", priceMonthly: "$99 / Month" },
  enterprise: { title: "Enterprise Plan", priceYearly: "Contact for pricing", priceMonthly: "Contact for pricing" },
};

export default function ProductPricing() {
  const { productSlug } = useParams<{ productSlug: string }>();
  const navigate = useNavigate();
  const [billingCycle, setBillingCycle] = useState<"yearly" | "monthly">("yearly");

  // Trial modal state
  const [showTrialModal, setShowTrialModal] = useState(false);
  const [trialEmail, setTrialEmail] = useState("");

  // Checkout modal state
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [checkoutPlan, setCheckoutPlan] = useState<{ key: string; title: string; price: string } | null>(null);
  const [checkoutEmail, setCheckoutEmail] = useState("");
  const [checkoutFirstName, setCheckoutFirstName] = useState("");
  const [checkoutLastName, setCheckoutLastName] = useState("");

  const product = products.find((p) => p.slug === productSlug);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <button onClick={() => navigate("/pricing")} className="text-blue-600 hover:underline">
            Go back to pricing
          </button>
        </div>
      </div>
    );
  }

  function openCheckoutFor(key: string) {
    const details = planDetails[key];
    const price = billingCycle === "yearly" ? details.priceYearly : details.priceMonthly;
    setCheckoutPlan({ key, title: details.title, price });
    setShowCheckoutModal(true);
  }

  const [showResultModal, setShowResultModal] = useState(false);
  const [resultDetails, setResultDetails] = useState<any>(null);

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
    // Basic validation
    if (!checkoutEmail || !checkoutFirstName || !checkoutLastName) {
      alert("Please provide first name, last name and email to proceed.");
      return;
    }

    // amount mapping (in INR paise)
    const planAmounts: Record<string, number> = {
      basic: billingCycle === "yearly" ? 49900 : 4900,
      pro: billingCycle === "yearly" ? 99900 : 9900,
      enterprise: billingCycle === "yearly" ? 0 : 0,
      trial: 0,
    };

    const amount = planAmounts[checkoutPlan.key] ?? 0;

    try {
      // Create order on server
      const resp = await fetch("/api/razorpay/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, currency: "INR", receipt: `rcpt_${Date.now()}`, notes: { plan: checkoutPlan.key } }),
      });
      const data = await resp.json();
      if (!data.ok) throw new Error(data.error || "Failed to create order");
      const order = data.order;
      const keyId = data.keyId;

      // Load script
      const loaded = await loadRazorpayScript();
      if (!loaded) throw new Error("Failed to load Razorpay SDK");

      // Open Razorpay Checkout
      const options: any = {
        key: keyId,
        amount: order.amount,
        currency: order.currency,
        name: "Mylapay",
        description: checkoutPlan.title,
        order_id: order.id,
        handler: async function (response: any) {
          // Verify signature on server
          const verifyRes = await fetch("/api/razorpay/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });
          const verifyData = await verifyRes.json();

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

      // handle failures
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

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-white pt-16 md:pt-20 pb-8 lg:pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            <span className="text-blue-900">Choose Your Plan for </span>
            <span className="text-[#2CADE3]">{product.name}</span>
          </h1>

          {/* Billing Toggle */}
          <div className="flex items-center justify-end gap-3 mt-8">
            <div className="text-right whitespace-nowrap">
              <span className="text-xs font-semibold mr-2">Save 15%</span>
              <span className="text-xs text-gray-600">on yearly plan!</span>
            </div>
            <div className="flex items-center gap-1 p-1 border border-gray-200 rounded-full bg-white">
              <button
                onClick={() => setBillingCycle("yearly")}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                  billingCycle === "yearly" ? "bg-blue-900 text-white" : "text-gray-800"
                }`}
              >
                Yearly
              </button>
              <button
                onClick={() => setBillingCycle("monthly")}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                  billingCycle === "monthly" ? "bg-blue-900 text-white" : "text-gray-800"
                }`}
              >
                Monthly
              </button>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
          {/* Trial Plan */}
          <div className="relative overflow-hidden group bg-white rounded-2xl shadow-xl p-6 md:p-8 flex flex-col min-h-[14rem]">
            <div className="absolute inset-0 bg-gradient-to-b from-[#2CADE3] to-[#052343] opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

            <div className="relative z-10 text-gray-900 group-hover:text-white">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-semibold mb-2">{planDetails.trial.title}</h3>
                <p className="text-[#2CADE3] text-lg mb-3 group-hover:text-white">{planDetails.trial.priceYearly}</p>
                <p className="text-xs text-gray-600 group-hover:text-gray-100">Best for initial evaluation and integration testing</p>
              </div>

              <div className="space-y-3 mb-6 flex-grow">
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-gray-800 group-hover:text-white flex-shrink-0 mt-0.5" />
                  <span className="text-xs text-gray-600 group-hover:text-gray-100">Upto 100 transactions per day</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-gray-800 group-hover:text-white flex-shrink-0 mt-0.5" />
                  <span className="text-xs text-gray-600 group-hover:text-gray-100">Email support</span>
                </div>
              </div>

              <button onClick={() => setShowTrialModal(true)} className="w-full bg-[#2CADE3] text-white py-3 text-sm rounded font-medium transition-colors group-hover:bg-white group-hover:text-[#052343]">
                Try Now
              </button>
              <div className="flex justify-center mt-3">
                <button onClick={() => navigate(`/pricing/${productSlug}/compare`)} className="text-xs text-gray-600 underline group-hover:text-gray-100 cursor-pointer hover:text-[#2CADE3]">
                  See more
                </button>
              </div>
            </div>
          </div>

          {/* Basic Plan */}
          <div className="relative overflow-hidden group bg-white rounded-2xl shadow-xl p-6 md:p-8 flex flex-col min-h-[22rem]">
            <div className="absolute inset-0 bg-gradient-to-b from-[#2CADE3] to-[#052343] opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

            <div className="relative z-10 text-gray-900 group-hover:text-white">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-semibold mb-2">{planDetails.basic.title}</h3>
                <p className="text-gray-600 text-lg mb-3 group-hover:text-white">{billingCycle === 'yearly' ? planDetails.basic.priceYearly : planDetails.basic.priceMonthly}</p>
                <p className="text-xs text-gray-600 group-hover:text-gray-100">Ideal for small to mid-size merchants starting transaction processing</p>
              </div>

              <div className="space-y-3 mb-6 flex-grow">
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-gray-800 group-hover:text-white flex-shrink-0 mt-0.5" />
                  <span className="text-xs text-gray-600 group-hover:text-gray-100">Upto 500 transactions per day</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-gray-800 group-hover:text-white flex-shrink-0 mt-0.5" />
                  <span className="text-xs text-gray-600 group-hover:text-gray-100">Standard monthly transaction limit</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-gray-800 group-hover:text-white flex-shrink-0 mt-0.5" />
                  <span className="text-xs text-gray-600 group-hover:text-gray-100">Standard support</span>
                </div>
              </div>

              <button onClick={() => openCheckoutFor('basic')} className="w-full bg-[#2CADE3] text-white py-3 text-sm rounded font-medium transition-colors group-hover:bg-white group-hover:text-[#052343]">
                Buy Now
              </button>
              <div className="flex justify-center mt-3">
                <button onClick={() => navigate(`/pricing/${productSlug}/compare`)} className="text-xs text-gray-600 underline group-hover:text-gray-100 cursor-pointer hover:text-[#2CADE3]">
                  See more
                </button>
              </div>
            </div>
          </div>

          {/* Pro Plan - Best Seller */}
          <div className="relative overflow-hidden group bg-white rounded-2xl shadow-xl p-6 md:p-8 flex flex-col min-h-[28rem]">
            <div className="absolute top-2 right-2 bg-[#FFCD38] px-3 py-1 rounded text-xs font-medium z-20">Best Seller</div>

            <div className="absolute inset-0 bg-gradient-to-b from-[#2CADE3] to-[#052343] opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

            <div className="relative z-10 text-gray-900 group-hover:text-white">
              <div className="text-center mb-6">
                <h3 className="text-2xl md:text-3xl font-semibold mb-2">{planDetails.pro.title}</h3>
                <p className="text-base mb-3 group-hover:text-white">{billingCycle === 'yearly' ? planDetails.pro.priceYearly : planDetails.pro.priceMonthly}</p>
                <p className="text-xs text-gray-600 group-hover:text-gray-100">For growing merchants needing higher throughput and stability</p>
              </div>

              <div className="space-y-3 mb-6 flex-grow">
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-gray-800 group-hover:text-white flex-shrink-0 mt-0.5" />
                  <span className="text-sm group-hover:text-gray-100">1,000+ transactions per day</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-gray-800 group-hover:text-white flex-shrink-0 mt-0.5" />
                  <span className="text-sm group-hover:text-gray-100">Reduced per-transaction rate</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-gray-800 group-hover:text-white flex-shrink-0 mt-0.5" />
                  <span className="text-sm group-hover:text-gray-100">High transaction limits</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-gray-800 group-hover:text-white flex-shrink-0 mt-0.5" />
                  <span className="text-sm group-hover:text-gray-100">Priority support</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-gray-800 group-hover:text-white flex-shrink-0 mt-0.5" />
                  <span className="text-sm group-hover:text-gray-100">Access to Value-Added Services (VAS)</span>
                </div>
              </div>

              <button onClick={() => openCheckoutFor('pro')} className="w-full bg-[#2CADE3] text-white py-3 text-sm rounded font-medium transition-colors group-hover:bg-white group-hover:text-[#052343]">
                Buy Now
              </button>
              <div className="flex justify-center mt-3">
                <button onClick={() => navigate(`/pricing/${productSlug}/compare`)} className="text-xs text-gray-600 underline group-hover:text-gray-100 cursor-pointer hover:text-[#2CADE3]">
                  See more
                </button>
              </div>
            </div>
          </div>

          {/* Enterprise Plan */}
          <div className="relative overflow-hidden group bg-white rounded-2xl shadow-xl p-6 md:p-8 flex flex-col min-h-[28rem]">
            <div className="absolute inset-0 bg-gradient-to-b from-[#2CADE3] to-[#052343] opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

            <div className="relative z-10 text-gray-900 group-hover:text-white">
              <div className="text-center mb-6">
                <h3 className="text-2xl md:text-3xl font-semibold mb-2">{planDetails.enterprise.title}</h3>
                <p className="text-sm text-gray-600 mb-4 group-hover:text-gray-100">{billingCycle === 'yearly' ? planDetails.enterprise.priceYearly : planDetails.enterprise.priceMonthly}</p>
                <p className="text-xs text-gray-600 group-hover:text-gray-100">For large-scale merchants requiring dedicated infrastructure</p>
              </div>

              <div className="space-y-3 mb-6 flex-grow">
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-gray-800 group-hover:text-white flex-shrink-0 mt-0.5" />
                  <span className="text-xs text-gray-600 group-hover:text-gray-100">5,000+ transactions per day</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-gray-800 group-hover:text-white flex-shrink-0 mt-0.5" />
                  <span className="text-xs text-gray-600 group-hover:text-gray-100">Unlimited transactions</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-gray-800 group-hover:text-white flex-shrink-0 mt-0.5" />
                  <span className="text-xs text-gray-600 group-hover:text-gray-100">Volume-based pricing</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-gray-800 group-hover:text-white flex-shrink-0 mt-0.5" />
                  <span className="text-xs text-gray-600 group-hover:text-gray-100">24×7 dedicated support</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-gray-800 group-hover:text-white flex-shrink-0 mt-0.5" />
                  <span className="text-xs text-gray-600 group-hover:text-gray-100">Client-side deployment options</span>
                </div>
              </div>

              <button className="w-full bg-[#2CADE3] text-white py-3 text-sm rounded font-medium transition-colors group-hover:bg-white group-hover:text-[#052343]">
                Contact Now
              </button>
              <div className="flex justify-center mt-3">
                <button onClick={() => navigate(`/pricing/${productSlug}/compare`)} className="text-xs text-gray-600 underline group-hover:text-gray-100 cursor-pointer hover:text-[#2CADE3]">
                  See more
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trial Signup Modal */}
      <Dialog open={showTrialModal} onOpenChange={setShowTrialModal}>
        <DialogPortal>
          <DialogOverlay className="bg-white/70 backdrop-blur-md" />
          <DialogContent className="max-w-md p-4 sm:p-6 rounded-xl shadow-2xl">
            <DialogTitle className="sr-only">Join Our Trial on Token X</DialogTitle>

            <div className="p-4 sm:p-6">
              <div className="text-center mb-4">
                <h2 className="text-xl md:text-2xl font-bold text-[#1E3A8A] mb-1">Join Our Trial on</h2>
                <h3 className="text-xl md:text-2xl font-bold text-[#2CADE3]">Token X</h3>
              </div>

              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="Email address"
                  value={trialEmail}
                  onChange={(e) => setTrialEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-black/30 rounded-md text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2CADE3] focus:border-transparent"
                />

                <button
                  onClick={() => {
                    console.log("Trial signup with email:", trialEmail);
                    setShowTrialModal(false);
                    setTrialEmail("");
                  }}
                  className="w-full bg-[#2CADE3] text-white py-2 rounded-md text-sm font-medium hover:bg-[#2399c9] transition-colors"
                >
                  Try now the trial
                </button>
              </div>

              <p className="text-center text-gray-500 text-xs mt-4">Submit your email address to join the trial plan</p>
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
                  <p className="text-sm text-gray-600">Please confirm your details to proceed to payment</p>
                </div>
              </div>

              {checkoutPlan && (
                <div className="mb-4 p-3 border border-gray-100 rounded-md bg-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Selected plan</p>
                      <p className="font-semibold text-gray-900">{checkoutPlan.title}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Amount</p>
                      <p className="font-semibold text-gray-900">{checkoutPlan.price}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input type="text" placeholder="First name" value={checkoutFirstName} onChange={(e) => setCheckoutFirstName(e.target.value)} className="w-full px-3 py-2 border border-black/30 rounded-md text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2CADE3] focus:border-transparent" />
                  <input type="text" placeholder="Last name" value={checkoutLastName} onChange={(e) => setCheckoutLastName(e.target.value)} className="w-full px-3 py-2 border border-black/30 rounded-md text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2CADE3] focus:border-transparent" />
                </div>

                <input type="email" placeholder="Email address" value={checkoutEmail} onChange={(e) => setCheckoutEmail(e.target.value)} className="w-full px-3 py-2 border border-black/30 rounded-md text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2CADE3] focus:border-transparent" />

                <button onClick={handleProceedToPay} className="w-full bg-[#2CADE3] text-white py-2 rounded-md text-sm font-medium hover:bg-[#2399c9] transition-colors">Proceed to Pay</button>
              </div>

              <p className="text-center text-gray-500 text-xs mt-4">You will be redirected to the payment gateway after clicking "Proceed to Pay".</p>
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

            <div className="p-4 sm:p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold text-[#1E3A8A]">Payment Result</h2>
                  <p className="text-sm text-gray-600">Transaction details</p>
                </div>
              </div>

              {resultDetails ? (
                <div className="space-y-3">
                  <div className="p-3 border rounded-md bg-white">
                    <p className="text-sm text-gray-600">Status</p>
                    <p className="font-semibold">{resultDetails.ok ? "Success" : "Failed"}</p>
                  </div>

                  {resultDetails.paymentResponse?.razorpay_payment_id && (
                    <div className="p-3 border rounded-md bg-white">
                      <p className="text-sm text-gray-600">Payment ID</p>
                      <p className="font-semibold">{resultDetails.paymentResponse.razorpay_payment_id}</p>
                    </div>
                  )}

                  {resultDetails.paymentResponse?.razorpay_order_id && (
                    <div className="p-3 border rounded-md bg-white">
                      <p className="text-sm text-gray-600">Order ID</p>
                      <p className="font-semibold">{resultDetails.paymentResponse.razorpay_order_id}</p>
                    </div>
                  )}

                  {resultDetails.verifyData && (
                    <div className="p-3 border rounded-md bg-white">
                      <p className="text-sm text-gray-600">Verification</p>
                      <p className="font-semibold">{resultDetails.verifyData.ok ? "Signature valid" : resultDetails.verifyData.error}</p>
                    </div>
                  )}

                  <button onClick={() => setShowResultModal(false)} className="w-full bg-[#2CADE3] text-white py-2 rounded-md text-sm font-medium hover:bg-[#2399c9] transition-colors">Close</button>
                </div>
              ) : (
                <p className="text-sm text-gray-600">No transaction details available.</p>
              )}
            </div>
          </DialogContent>
        </DialogPortal>
      </Dialog>
    </div>
  );
}
