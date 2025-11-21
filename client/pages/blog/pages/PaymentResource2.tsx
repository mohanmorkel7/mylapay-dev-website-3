"use client";

import React from "react";
import { motion } from "framer-motion";
import Footer from "@/components/layout/Footer"
import {Link} from "react-router-dom"
import img from "@/pages/assets/images/blog/3.jpg"

const BlogPage: React.FC = () => {
  return (
    <>
    <div className="-mt-[136px] flex-grow lg:-mt-[106px] bg-gray-50 !mt-5 !mb-20">
      <div className="pt-[82px] lg:pt-[106px]">
        <div className="relative container-xl container bg-white rounded-2xl shadow-lg px-6 lg:px-12 py-10">
          
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="my-4"
          >
            <Link
              to="/blog"
              className="text-bluelight hover:underline font-medium"
            >
              ← Back
            </Link>
          </motion.div>

          {/* Blog Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-8 text-left"
          >
            <h6 className="text-left font-medium text-lg mb-1 text-gray-500">
              Payment Resources
            </h6>
            <h1 className="text-black text-2xl lg:text-3xl xl:text-4xl secondarycolormylapay font-bold leading-snug">
              Navigating the Risk Landscape: Strategies for Effective <span className="primarycolormylapay">Risk Management</span>
            </h1>
            <ul className="flex items-center text-sm text-gray-500 mt-3 space-x-4">
              <li>Poornima</li>
              <li>2024-Jan-09</li>
            </ul>
          </motion.div>

          {/* Blog Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="overflow-hidden rounded-xl shadow-md"
          >
            <img
              src={img}
              alt="Reconciliation and Accounting of Acquiring Payments"
              className="mx-auto h-80 object-cover sm:h-[350px] xl:h-[500px] w-full hover:scale-105 transition-transform duration-500"
            />
          </motion.div>

          {/* Blog Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="mt-10 text-gray-700 text-md leading-relaxed space-y-6"
          >
            <p>In the dynamic realm of electronic transactions, the term "risk" carries multifaceted implications. Risk in the context of payment processing refers to the potential threats and vulnerabilities that can compromise the confidentiality, integrity, and availability of sensitive information. Effectively managing these risks is not just a compliance requirement but a strategic imperative for businesses aiming to thrive in the digital age.</p>

            <h3 className="font-semibold text-xl text-gray-900">
              Identifying Potential Threats: The Varied Faces of Risk
            </h3>
            <p>
              Risk management begins with a thorough identification of potential threats. These threats can range from cyberattacks and data breaches to internal vulnerabilities and system failures. A comprehensive risk assessment is crucial for businesses to understand the landscape they operate in and tailor their risk management strategies accordingly.</p>

              <h3 className="font-semibold text-xl text-gray-900">
              Embracing Industry Standards: The Role of Compliance
            </h3>
              <p>Industry standards, such as the Payment Card Industry Data Security Standard (PCI DSS) and ISO/IEC 27001, serve as guiding beacons in the risk management journey. Adhering to these standards not only ensures compliance but also provides a structured framework for implementing robust security controls. Businesses that embrace these standards establish a solid foundation for effective risk management.</p>

            <h3 className="font-semibold text-xl text-gray-900">
              Developing a Robust Risk Management Framework: Proactive Strategies
            </h3>

              <p>Risk management is not a reactive process but a proactive one. Businesses need to develop a robust risk management framework that includes preventive measures, detection mechanisms, and response strategies. This involves implementing encryption technologies, access controls, training programs and regular security assessments to identify and address vulnerabilities before they can be exploited.</p>

            <h3 className="font-semibold text-xl text-gray-900">
              Cultivating a Culture of Security: Employee Awareness and Training
            </h3>

              <p>Often overlooked but critically important, a culture of security is cultivated through employee awareness and training. Human error is a significant contributor to security breaches, and educating staff about potential risks and best practices creates a frontline defense. Employees should be empowered to recognize and report potential threats, reinforcing the organization's overall risk management strategy.</p>

            <h3 className="font-semibold text-xl text-gray-900">
              Continuous Monitoring and Adaptation: The Essence of Resilience
            </h3>
            <p>
              The digital landscape is ever-evolving, and so are the risks associated with it. Continuous monitoring of security controls and a commitment to adapting to emerging threats are fundamental to building resilience. Regular security audits, threat intelligence updates, and staying informed about industry trends contribute to an agile risk management approach.
              </p>
              <h3 className="font-semibold text-xl text-gray-900">
              Incident Response: Navigating Challenges When They Arise
            </h3>
              <p>Despite meticulous preventive measures, incidents may still occur. A well-defined incident response plan is essential for minimizing the impact of a security breach. This involves clear communication protocols, swift identification and containment of the incident, and a thorough post-incident analysis to strengthen defences against similar future threats.</p>
              
          </motion.div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default BlogPage;
