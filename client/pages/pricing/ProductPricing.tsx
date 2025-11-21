import { useParams, useNavigate } from "react-router-dom";
import { Check } from "lucide-react";
import { useState } from "react";

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

export default function ProductPricing() {
  const { productSlug } = useParams<{ productSlug: string }>();
  const navigate = useNavigate();
  const [billingCycle, setBillingCycle] = useState<"yearly" | "monthly">(
    "yearly",
  );

  const product = products.find((p) => p.slug === productSlug);

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
          <div className="flex items-center justify-center gap-3 mt-8">
            <span className="text-sm font-bold">Save 15%</span>
            <span className="text-sm">on yearly plan!</span>
            <div className="flex items-center gap-1 p-1 border border-gray-200 rounded-full bg-white">
              <button
                onClick={() => setBillingCycle("yearly")}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  billingCycle === "yearly"
                    ? "bg-blue-900 text-white"
                    : "text-gray-800"
                }`}
              >
                Yearly
              </button>
              <button
                onClick={() => setBillingCycle("monthly")}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
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

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
          {/* Trial Plan */}
          <div className="relative overflow-hidden group bg-white rounded-2xl shadow-xl p-6 md:p-8 flex flex-col min-h-[16rem]">
            <div className="absolute inset-0 bg-gradient-to-b from-[#2CADE3] to-[#052343] opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

            <div className="relative z-10 text-gray-900 group-hover:text-white">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-semibold mb-2">Trial</h3>
                <p className="text-[#2CADE3] text-lg mb-3 group-hover:text-white">Free (up to 7 days)</p>
                <p className="text-xs text-gray-600 group-hover:text-gray-100">
                  Best for initial evaluation and integration testing
                </p>
              </div>

              <div className="space-y-3 mb-6 flex-grow">
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-gray-800 group-hover:text-white flex-shrink-0 mt-0.5" />
                  <span className="text-xs text-gray-600 group-hover:text-gray-100">
                    Upto 100 transactions per day
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-gray-800 group-hover:text-white flex-shrink-0 mt-0.5" />
                  <span className="text-xs text-gray-600 group-hover:text-gray-100">Email support</span>
                </div>
              </div>

              <button className="w-full bg-[#2CADE3] text-white py-3 text-sm rounded font-medium transition-colors group-hover:bg-white group-hover:text-[#052343]">
                Try Now
              </button>
              <a
                href="#"
                className="text-center text-xs text-gray-600 underline mt-2 block group-hover:text-gray-100"
              >
                See more
              </a>
            </div>
          </div>

          {/* Basic Plan */}
          <div className="relative overflow-hidden group bg-white rounded-2xl shadow-xl p-6 md:p-8 flex flex-col min-h-[20rem]">
            <div className="absolute inset-0 bg-gradient-to-b from-[#2CADE3] to-[#052343] opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

            <div className="relative z-10 text-gray-900 group-hover:text-white">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-semibold mb-2">Basic Plan</h3>
                <p className="text-gray-600 text-lg mb-3 group-hover:text-white">$$$$/ Year</p>
                <p className="text-xs text-gray-600 group-hover:text-gray-100">
                  Ideal for small to mid-size merchants starting transaction
                  processing
                </p>
              </div>

              <div className="space-y-3 mb-6 flex-grow">
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-gray-800 group-hover:text-white flex-shrink-0 mt-0.5" />
                  <span className="text-xs text-gray-600 group-hover:text-gray-100">
                    Upto 500 transactions per day
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-gray-800 group-hover:text-white flex-shrink-0 mt-0.5" />
                  <span className="text-xs text-gray-600 group-hover:text-gray-100">
                    Standard monthly transaction limit
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-gray-800 group-hover:text-white flex-shrink-0 mt-0.5" />
                  <span className="text-xs text-gray-600 group-hover:text-gray-100">Standard support</span>
                </div>
              </div>

              <button className="w-full bg-[#2CADE3] text-white py-3 text-sm rounded font-medium transition-colors group-hover:bg-white group-hover:text-[#052343]">
                Buy Now
              </button>
              <a
                href="#"
                className="text-center text-xs text-gray-600 underline mt-2 block group-hover:text-gray-100"
              >
                See more
              </a>
            </div>
          </div>

          {/* Pro Plan - Best Seller */}
          <div className="relative overflow-hidden group bg-white rounded-2xl shadow-xl p-6 md:p-8 flex flex-col min-h-[24rem]">
            <div className="absolute top-2 right-2 bg-[#FFCD38] px-3 py-1 rounded text-xs font-medium z-20">
              Best Seller
            </div>

            <div className="absolute inset-0 bg-gradient-to-b from-[#2CADE3] to-[#052343] opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

            <div className="relative z-10 text-gray-900 group-hover:text-white">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-semibold mb-2">Pro Plan</h3>
                <p className="text-lg mb-3 group-hover:text-white">$$$/ Year</p>
                <p className="text-xs text-gray-600 group-hover:text-gray-100">
                  For growing merchants needing higher throughput and stability
                </p>
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
                  <span className="text-sm group-hover:text-gray-100">
                    Access to Value-Added Services (VAS)
                  </span>
                </div>
              </div>

              <button className="w-full bg-[#2CADE3] text-white py-3 text-sm rounded font-medium transition-colors group-hover:bg-white group-hover:text-[#052343]">
                Buy Now
              </button>
              <a
                href="#"
                className="text-center text-xs text-gray-600 underline mt-2 block group-hover:text-gray-100"
              >
                See more
              </a>
            </div>
          </div>

          {/* Enterprise Plan */}
          <div className="relative overflow-hidden group bg-white rounded-2xl shadow-xl p-6 md:p-8 flex flex-col min-h-[28rem]">
            <div className="absolute inset-0 bg-gradient-to-b from-[#2CADE3] to-[#052343] opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

            <div className="relative z-10 text-gray-900 group-hover:text-white">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-semibold mb-2">Enterprise Plan</h3>
                <p className="text-sm text-gray-600 mb-4 group-hover:text-gray-100">
                  For large-scale merchants requiring dedicated infrastructure
                </p>
              </div>

              <div className="space-y-3 mb-6 flex-grow">
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-gray-800 group-hover:text-white flex-shrink-0 mt-0.5" />
                  <span className="text-xs text-gray-600 group-hover:text-gray-100">
                    5,000+ transactions per day
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-gray-800 group-hover:text-white flex-shrink-0 mt-0.5" />
                  <span className="text-xs text-gray-600 group-hover:text-gray-100">
                    Unlimited transactions
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-gray-800 group-hover:text-white flex-shrink-0 mt-0.5" />
                  <span className="text-xs text-gray-600 group-hover:text-gray-100">
                    Volume-based pricing
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-gray-800 group-hover:text-white flex-shrink-0 mt-0.5" />
                  <span className="text-xs text-gray-600 group-hover:text-gray-100">
                    24×7 dedicated support
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-gray-800 group-hover:text-white flex-shrink-0 mt-0.5" />
                  <span className="text-xs text-gray-600 group-hover:text-gray-100">
                    Client-side deployment options
                  </span>
                </div>
              </div>

              <button className="w-full bg-[#2CADE3] text-white py-3 text-sm rounded font-medium transition-colors group-hover:bg-white group-hover:text-[#052343]">
                Contact Now
              </button>
              <a
                href="#"
                className="text-center text-xs text-gray-600 underline mt-2 block group-hover:text-gray-100"
              >
                See more
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
