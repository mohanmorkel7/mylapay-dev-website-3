import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom"; // <-- for navigation

const faqs = [
  {
    question: "What is a fintech payment gateway?",
    answer:
      "A fintech payment gateway securely processes online transactions by connecting merchants, banks, and customers in a seamless way, ensuring safe and quick payments."
  },
  {
    question: "How secure are online payments?",
    answer:
      "Our platform uses advanced encryption and fraud detection systems to keep your transactions completely safe and protected."
  },
  {
    question: "What currencies are supported?",
    answer:
      "We support multiple global currencies including USD, EUR, GBP, INR, and more to facilitate international transactions."
  },
  {
    question: "Are there transaction fees?",
    answer:
      "Yes, a small transaction fee is applied, which varies based on the payment method and the region of operation."
  },
  {
    question: "How fast are settlements?",
    answer:
      "Settlements are processed within 1-2 business days, ensuring quick access to your funds."
  },
  {
    question: "Can I integrate with my website or app?",
    answer:
      "Absolutely! We provide easy-to-use APIs and SDKs for smooth integration with your existing website or mobile application."
  }
];

export default function FAQSection() {
  const [selectedQuestion, setSelectedQuestion] = useState<number | null>(0);

  const handleClick = (index: number) => {
    setSelectedQuestion(selectedQuestion === index ? null : index);
  };

  return (
    <section className="relative w-full bg-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#1F2B5C] mb-4">
            Frequently Asked <span className="text-[#2CADE3]">Questions</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Answers to common queries about our fintech payment gateway and services.
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {/* Left Column: Questions */}
          <div className="space-y-2 pr-0 md:pr-6">
            {faqs.map((faq, index) => {
              const isSelected = selectedQuestion === index;

              return (
                <div key={index} className="w-full">
                  {/* Question Box */}
                  <div
                    onClick={() => handleClick(index)}
                    className={`flex items-center justify-between cursor-pointer p-4 rounded-lg transition-all duration-300 ease-in-out
                      ${
                        isSelected
                          ? "bg-[#2CADE3] text-white"
                          : "bg-white text-gray-800 hover:border-[#2CADE3] border"
                      }`}
                  >
                    <span className="text-lg font-medium">{faq.question}</span>
                    <motion.div
                      initial={{ rotate: 0 }}
                      animate={{
                        rotate: isSelected
                          ? -90
                          : window.innerWidth < 768
                          ? 90
                          : 0,
                      }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <ChevronDown
                        className={`w-5 h-5 ${
                          isSelected ? "text-white" : "text-gray-600"
                        }`}
                      />
                    </motion.div>
                  </div>

                  {/* Mobile Dropdown Answer */}
                  <AnimatePresence>
                    {isSelected && (
                      <motion.div
                        key={index}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="md:hidden overflow-hidden mt-2"
                      >
                        <div className="p-4 bg-[#2CADE3] text-white rounded-lg">
                          <p className="text-base leading-relaxed">{faq.answer}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Right Column: Desktop Answer Area */}
          <div className="hidden md:block relative">
            <AnimatePresence mode="wait">
              {selectedQuestion !== null && (
                <motion.div
                  key={selectedQuestion}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="relative h-full p-8 bg-[#2CADE3] text-white rounded-lg shadow-xl"
                >
                  <h3 className="text-2xl font-semibold mb-4">
                    {faqs[selectedQuestion].question}
                  </h3>
                  <p className="text-lg leading-relaxed">
                    {faqs[selectedQuestion].answer}
                  </p>

                  <div className="mt-6 border-t border-white/30 pt-4">
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

        {/* Read More Button */}
        <div className=" mt-12">
          <Link
            to="/faq"
            className="px-6 py-3 bg-[#2CADE3] text-white rounded-lg font-semibold hover:bg-[#1fa7c8] transition-colors duration-300"
          >
            Read More
          </Link>
        </div>
      </div>
    </section>
  );
}
