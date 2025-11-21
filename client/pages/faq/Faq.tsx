import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Footer from "@/components/layout/Footer"

const faqs = [
  // {
  //   question: "Can I integrate with my website or app?",
  //   answer:
  //     "Absolutely! We provide easy-to-use APIs and SDKs for smooth integration with your existing website or mobile application."
  // }

  
{
             question: "Is Mylapay a Payment aggregator?",

            answer: 'No, Mylapay is not a payment aggregator; it operates as a payment enabler known as Acquiring side of Processor TSP in the card payment industry. Mylapay provides comprehensive solutions for payment aggregators and Gateway banks to enhance their business. While it works closely with payment aggregators, it does not function as a standalone payment aggregator.',

},

        {


            question: "What are the core products that Mylapay has?",

            answer: 'Mylapay has three core products: 3DS Authentication Solution, Authorization Switch, and IntelleEngine(Post auth Processing solution) , offering comprehensive solutions for end-to-end card payment processing.',

        },

        {



            question: "What are Mylapay's Gateway Products?",

            answer: "Mylapay's Gateway Products comprise a suite of services, including 3DS Authentication Solution, Authorization Switch, and IntelleEngine. Combination of these products enable end-to-end processing of card payments with own bin sponsorship benefits for Payment Aggregators . ",

        },

        {


            question: "What services does Mylapay Switch offer?",

            answer: 'Mylapay Switch combines core products like 3DS Authentication Solution, Authorization Switch, and IntelleEngine to provide end-to-end card payment processing services. It caters to banks providing gateway services and payment aggregators offering card payment collection platforms.',

        },

        {



            question: "What is IntelleEngine, and how does it benefit acquirers?",

            answer: 'IntelleEngine is a technology-driven solution designed for acquirers (Banks or Payment Aggregators) to manage end-to-end transaction processing. It includes functions like FRM-Risk, Clearing, Settlements, Reconciliation, Nodal accounting, Transaction level profitability (Interchange, scheme cost calculations), and Dispute management.',

        },

        {



            question: "Can Mylapay's products handle both card-present and card-not-present transactions?",

            answer: "Yes, Mylapay's Gateway Products and Switch processing services along with IntelleEngine, are designed to handle both card-present (POS) and card-not-present (Payment gateway) transactions.",

        },

        {

 

            question: "How does Mylapay benefit payment aggregators and Banks? ",

            answer: "Mylapay, with its error free and zero revenue leakage products, provides payment aggregators and Banks with a intuitive dashboard and comprehensive view of their transactions, enhancing transparency and efficiency in payment processing. ",

        },

        {



            question: "How does Mylapay ensure data security for its clients? ",

            answer: "Mylapay products are hosted at highly secured cloud-based environment and following industry best security standards & audits, which results in maximum uptime and security.  ",

        },

        {



            question: "What is Mylapay's promise to clients? ",

            answer: "With Mylapay, clients enter into an integrated ecosystem designed to meet all acquiring card payment processing needs in a single place with no revenue leakage and highest processing efficiency.  ",

        },

        {



            question: "How do I contact Mylapay customer support?  ",

            answer: "If you have any questions or need assistance, you can reach our customer support team by Contactus@mylapay.com . Our support team is available 365 days 24/7 hours.",

        },


        {



            question: "What is the deployment model for Mylapay? ",

            answer: "They offer solutions in both the self Hosted  Model and On-Premises Model, providing flexibility in deployment options.",

        },

        {



            question: "Is Mylapay a global product? ",

            answer: "Yes, Mylapay is designed to cater to a global market, providing solutions to Payment Aggregators and Banks worldwide. ",

        },

        {

            question: "What is the key advantage of Mylapay as a one-stop solution for payment processing? ",

            answer: "Mylapay serves as a one-stop solution for complete payment processing, eliminating the need for banks or payment aggregators to engage multiple vendors for processing the same transaction. ",

        },

        {


            question: "What makes Mylapay different from other fintech solutions? ",

            answer: "Mylapay stands out with its integrated ecosystem, providing end-to-end solutions for payment processing. Our cloud-based, versatile offerings cater to both Payment Aggregators and Banks worldwide. ",

        },

        {


            question: "Can Mylapay's solutions be customized to fit specific business needs? ",

            answer: "Yes, as a Technology Service Provider (TSP), Mylapay offers flexibility in adapting to dynamic business models. We provide customizable solutions and flexible pricing strategies. ",

        },

        {



            question: "What is the key advantage of Mylapay as a one-stop solution for payment processing? ",

            answer: "Mylapay serves as a one-stop solution for complete payment processing, eliminating the need for banks or payment aggregators to engage multiple vendors for processing the same transaction. ",

        },

        {



            question: "Is Mylapay only suitable for large businesses, or can small businesses benefit as well? ",

            answer: "Mylapay caters to businesses of all sizes. Our solutions are scalable and can be tailored to meet the specific needs of both small and large enterprises. ",

        },

        {



            question: "What is the deployment model for Mylapay? ",

            answer: "They offer solutions in both the self hosted Model and client premises hosting model, providing flexibility in deployment options. ",

        },

        {



            question: "What is Mylapay Secure? ",

            answer: "Mylapay Secure is a Merchant plug in (MPI) designed for secure online Payment transactions. ",

        },

        {



            question: "What version of 3D Secure does Mylapay Secure support? ",

            answer: "Mylapay Secure supports the latest version 2.3.1.1 of 3D Secure, certified with EMVCo. ",

        },

        {



            question: "What experience does Mylapay Secure offer during the authentication process? ",

            answer: "Mylapay Secure provides a highly secured and frictionless authentication process for users. ",

        },

        {


            question: "How does Mylapay Secure handle fraud risk? ",

            answer: "Mylapay Secure incorporates an integrated risk engine that completely mitigates fraud risk. ",

        },

        {



            question: "What value-added services does Mylapay Secure offer? ",

            answer: "Mylapay Secure provides value-added services like interchange, scheme cost, BIN data, FX rates for DCC, and Pre-auth Risk. ",

        },

        {



            question: "Who can use Mylapay Secure?",

            answer: "Online Payment gateway providers & Merchants , who wants to enable MPI can use Mylapay Secure for secure and reliable transactions.",

        },

        {



            question: "What services does Mylapay Switch offer?",

            answer: "Mylapay Switch combines core products like 3DS Authentication Solution, Authorization Switch, and IntelleEngine to provide end-to-end card payment processing services. It caters to banks providing gateway services and payment aggregators offering payment collection platforms. ",

        },

        {



            question: "How does Mylapay utilize its role as a Technology Service Provider (TSP)? ",

            answer: "As a TSP, Mylapay utilizes its technological expertise to accommodate dynamic business models, provide flexible pricing strategies, and minimize per-transaction costs. ",

        },

        {



            question: "Who are the primary clients catered to by Mylapay Switch? ",

            answer: "Mylapay Switch caters to: a) Banks providing gateway services to payment aggregators. b) Payment Aggregators offering payment collection platforms to merchants. ",

        },

        {



            question: "What value-added services does Mylapay Secure offer? ",

            answer: "Mylapay Secure provides value-added services like interchange, scheme cost, BIN data, FX rates for DCC, and Card type and product. ",

        },

        {



            question: "What is the uptime guarantee for Mylapay Switch’s cloud-based processing? ",

            answer: "Mylapay Switch’s cloud-based processing ensures a robust 99. 90% uptime. ",

        },

        {



            question: "What is IntelleEngine, and what role does it play in the Mylapay ecosystem? ",

            answer: "IntelleEngine is an innovative, technology-driven solution designed for acquirers (Banks or Payment Aggregators) to manage end-to-end Post Authorization transaction processing within the Mylapay ecosystem. ",

        },

        {



            question: "What functions does IntelleEngine encompass in payment processing? ",

            answer: "IntelleEngine covers functions such as FRM-Risk, Clearing, Settlements, transaction-level Reconciliation, Nodal accounting, real-time profitability calculations, and Dispute management—all seamlessly integrated within a unified platform. ",

        },

        {



            question: "How does IntelleEngine streamline day-to-day processing for acquirers? ",

            answer: "IntelleEngine systematically streamlines day-to-day processing, eliminating the necessity for manual interventions and optimizing costs. ",

        },

        {

            question: "What is IntelleEngine's proficiency in managing payment scenarios? ",

            answer: "IntelleEngine is proficient in managing both card-present (POS) and card-not-present (PG) payment scenarios with complete automation and a remarkable accuracy rate of 99.999%. ",

        },

        {


            question: "Is IntelleEngine compatible with cloud technology, and how does it ensure data security? ",

            answer: "Yes, IntelleEngine is cloud-compatible and can be hosted or deployed within an acquirer's infrastructure for data Compliance. This ensures that the data does not leave the premises of the bank or payment aggregator. ",

        },
];

export default function FAQSection() {
  const [selectedQuestion, setSelectedQuestion] = useState<number | null>(0);

  const handleClick = (index: number) => {
    setSelectedQuestion(selectedQuestion === index ? null : index);
  };

  return (
    <>
    <section className="relative w-full bg-white py-16 mt-12">
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
        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-0"> */}
          {/* Left Column: Questions */}


     <div className="w-full">
      {faqs.map((faq, index) => (
        <div key={index} className="mb-4">
          {/* Question Header */}
          <button
            onClick={() =>
              setSelectedQuestion(selectedQuestion === index ? null : index)
            }
            className="flex justify-between items-center w-full p-4 bg-gray-100 rounded-lg"
          >
            <h3 className="text-l ">{faq.question}</h3>

            {/* Arrow Icon */}
            <motion.div
              animate={{ rotate: selectedQuestion === index ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown size={20} />
            </motion.div>
          </button>

          {/* Answer */}
          <AnimatePresence>
            {selectedQuestion === index && (
              <motion.div
                key={index}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden mt-2"
              >
                <div className="p-4 bg-[#2CADE3] text-white rounded-lg">
                  <p className="text-base leading-relaxed">{faq.answer}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>

        </div>
      {/* </div> */}
    </section>
    <Footer/>
    </>
  );
}








