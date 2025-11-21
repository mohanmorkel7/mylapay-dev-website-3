import { useParams, useNavigate } from "react-router-dom";
import { Check } from "lucide-react";
import { useState } from "react";

const products = [
  { slug: "mylapay-tokenx", name: "TokenX", fullName: "Mylapay TokenX" },
  { slug: "mylapay-secure", name: "Secure", fullName: "Mylapay Secure" },
  { slug: "mylapay-cswitch", name: "C-Switch", fullName: "Mylapay C-Switch" },
  { slug: "mylapay-intellewatch", name: "IntelleWatch", fullName: "IntelleWatch" },
  { slug: "mylapay-intellesettle", name: "IntelleSettle", fullName: "IntelleSettle" },
  { slug: "mylapay-intellesolve", name: "IntelleSolve", fullName: "IntelleSolve" },
  { slug: "mylapay-intelle360", name: "Intelle360", fullName: "Intelle360" },
  { slug: "mylapay-uswitch", name: "U-Switch", fullName: "Mylapay U-Switch" },
  { slug: "mylapay-intellepro", name: "IntellePro", fullName: "IntellePro" },
  { slug: "mylapay-switchx", name: "SwitchX", fullName: "Mylapay SwitchX" },
];

export default function ProductPricing() {
  const { productSlug } = useParams<{ productSlug: string }>();
  const navigate = useNavigate();
  const [billingCycle, setBillingCycle] = useState<"yearly" | "monthly">("yearly");

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
    <div className="min-h-[calc(100vh-4rem)] bg-white py-8 lg:py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4 items-end">
          {/* Trial Plan */}
          <div className="bg-white rounded-2xl shadow-xl p-6 flex flex-col h-auto lg:h-[428px]">
            <div className="text-center mb-6">
              <h3 className="text-3xl font-semibold mb-3">Trial</h3>
              <p className="text-[#2CADE3] text-xl mb-4">Free (up to 7 days)</p>
              <p className="text-sm text-gray-600">
                Best for initial evaluation and integration testing
              </p>
            </div>

            <div className="space-y-3 mb-6 flex-grow">
              <div className="flex items-start gap-2">
                <Check className="w-5 h-5 text-gray-800 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-600">
                  Upto 100 transactions per day
                </span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-5 h-5 text-gray-800 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-600">Email support</span>
              </div>
            </div>

            <button className="w-full bg-[#2CADE3] text-white py-3 rounded font-medium hover:bg-[#2399c9] transition-colors">
              Try Now
            </button>
            <a
              href="#"
              className="text-center text-sm text-gray-600 underline mt-3 block"
            >
              See more
            </a>
          </div>

          {/* Basic Plan */}
          <div className="bg-white rounded-2xl shadow-xl p-6 flex flex-col h-auto lg:h-[500px]">
            <div className="text-center mb-6">
              <h3 className="text-3xl font-semibold mb-3">Basic Plan</h3>
              <p className="text-gray-600 text-xl mb-4">$$$$/ Year</p>
              <p className="text-sm text-gray-600">
                Ideal for small to mid-size merchants starting transaction processing
              </p>
            </div>

            <div className="space-y-3 mb-6 flex-grow">
              <div className="flex items-start gap-2">
                <Check className="w-5 h-5 text-gray-800 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-600">
                  Upto 500 transactions per day
                </span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-5 h-5 text-gray-800 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-600">
                  Standard monthly transaction limit
                </span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-5 h-5 text-gray-800 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-600">Standard support</span>
              </div>
            </div>

            <button className="w-full bg-[#2CADE3] text-white py-3 rounded font-medium hover:bg-[#2399c9] transition-colors">
              Buy Now
            </button>
            <a
              href="#"
              className="text-center text-sm text-gray-600 underline mt-3 block"
            >
              See more
            </a>
          </div>

          {/* Pro Plan - Best Seller */}
          <div className="bg-white rounded-2xl shadow-xl p-6 flex flex-col h-auto lg:h-[563px] relative">
            <div className="absolute top-2 right-2 bg-[#FFCD38] px-3 py-1 rounded text-xs font-medium">
              Best Seller
            </div>
            <div className="text-center mb-6">
              <h3 className="text-3xl font-semibold mb-3">Pro Plan</h3>
              <p className="text-xl mb-4">$$$/ Year</p>
              <p className="text-sm text-gray-600">
                For growing merchants needing higher throughput and stability
              </p>
            </div>

            <div className="space-y-3 mb-6 flex-grow">
              <div className="flex items-start gap-2">
                <Check className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span className="text-sm">1,000+ transactions per day</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span className="text-sm">Reduced per-transaction rate</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span className="text-sm">High transaction limits</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span className="text-sm">Priority support</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span className="text-sm">
                  Access to Value-Added Services (VAS)
                </span>
              </div>
            </div>

            <button className="w-full bg-[#2CADE3] text-white py-3 rounded font-medium hover:bg-[#2399c9] transition-colors">
              Buy Now
            </button>
            <a
              href="#"
              className="text-center text-sm text-gray-600 underline mt-3 block"
            >
              See more
            </a>
          </div>

          {/* Enterprise Plan */}
          <div className="bg-white rounded-2xl shadow-xl p-6 flex flex-col h-auto lg:h-[563px]">
            <div className="text-center mb-6">
              <h3 className="text-3xl font-semibold mb-3">Enterprise Plan</h3>
              <p className="text-sm text-gray-600 mb-4">
                For large-scale merchants requiring dedicated infrastructure
              </p>
            </div>

            <div className="space-y-3 mb-6 flex-grow">
              <div className="flex items-start gap-2">
                <Check className="w-5 h-5 text-gray-800 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-600">
                  5,000+ transactions per day
                </span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-5 h-5 text-gray-800 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-600">Unlimited transactions</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-5 h-5 text-gray-800 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-600">Volume-based pricing</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-5 h-5 text-gray-800 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-600">24×7 dedicated support</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-5 h-5 text-gray-800 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-600">
                  Client-side deployment options
                </span>
              </div>
            </div>

            <button className="w-full bg-[#2CADE3] text-white py-3 rounded font-medium hover:bg-[#2399c9] transition-colors">
              Contact Now
            </button>
            <a
              href="#"
              className="text-center text-sm text-gray-600 underline mt-3 block"
            >
              See more
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
