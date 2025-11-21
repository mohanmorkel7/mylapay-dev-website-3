import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What is a fintech payment gateway?",
    answer: "A fintech payment gateway securely processes online transactions by connecting merchants, banks, and customers in a seamless way, ensuring safe and quick payments."
  },
  {
    question: "How secure are online payments?",
    answer: "Our platform uses advanced encryption and fraud detection systems to keep your transactions completely safe and protected."
  },
  {
    question: "What currencies are supported?",
    answer: "We support multiple global currencies including USD, EUR, GBP, INR, and more to facilitate international transactions."
  },
  {
    question: "Are there transaction fees?",
    answer: "Yes, a small transaction fee is applied, which varies based on the payment method and the region of operation."
  },
  {
    question: "How fast are settlements?",
    answer: "Settlements are processed within 1-2 business days, ensuring quick access to your funds."
  },
  {
    question: "Can I integrate with my website or app?",
    answer: "Absolutely! We provide easy-to-use APIs and SDKs for smooth integration with your existing website or mobile application."
  }
];

export default function FAQSection() {
  const [selectedQuestion, setSelectedQuestion] = useState<number | null>(0);

  return (
    <section className="relative w-full bg-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#1F2B5C] mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Answers to common queries about our fintech payment gateway and services.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column: Questions */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                onClick={() => setSelectedQuestion(index)}
                className={`flex items-center justify-between cursor-pointer p-4 rounded-lg border transition-all duration-300 
                  ${selectedQuestion === index ? "border-[#1F2B5C]" : "border-gray-200 hover:border-[#1F2B5C]"}`}
              >
                <span
                  className={`text-lg font-medium ${
                    selectedQuestion === index ? "text-[#1F2B5C]" : "text-gray-800"
                  }`}
                >
                  {faq.question}
                </span>
                <motion.div
                  initial={{ rotate: 0 }}
                  animate={{ rotate: selectedQuestion === index ? -90 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-5 h-5 text-gray-600" />
                </motion.div>
              </div>
            ))}
          </div>

          {/* Right Column: Answer */}
          <div className="relative">
            <AnimatePresence mode="wait">
              {selectedQuestion !== null && (
                <motion.div
                  key={selectedQuestion}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.4 }}
                  className="p-6 rounded-lg bg-[#2CADE3] shadow-lg text-white"
                >
                  <h3 className="text-2xl font-semibold mb-3">
                    {faqs[selectedQuestion].question}
                  </h3>
                  <p className="text-lg leading-relaxed">
                    {faqs[selectedQuestion].answer}
                  </p>
                  <div className="mt-4 border-t border-white/20 pt-4">
                    <p className="text-sm opacity-90">
                      For more details, visit our documentation or contact our
                      support team for personalized guidance.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

