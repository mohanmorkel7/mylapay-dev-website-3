"use client";

import React from "react";
import { motion } from "framer-motion";
import Footer from "@/components/layout/Footer"
import {Link} from "react-router-dom"
import img from "@/pages/assets/images/blog/1.webp"
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
              Reconciliation and Accounting of <span className="primarycolormylapay">Acquiring Payments</span>
            </h1>
            <ul className="flex items-center text-sm text-gray-500 mt-3 space-x-4">
              <li>Sundar Balasubramanian</li>
              <li>2024-Jan-12</li>
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
            <p>Welcome to the Blog on the topic given above… we normally feel that reconciliation of a transaction is a back-end work and it involves matching two numbers… even better some say they will do 3 way reconciliation or 4 way reconciliation etc… what happens if its 6 way… like the junction at southend circle in south Bangalore 😊
            </p>

            <p>
              Reconciliation is 360 degrees it cannot be one way two way etc…. every minute aspect of a transaction must be kept in mind to close the journey of the transaction and individually identify the status of that transaction at any given point in time. This is what is reconciliation in any cases and especially in the acquiring payment side.
            </p>

                        <h3 className="font-semibold text-xl text-gray-900">
              Let’s start with what’s acquiring payment:
            </h3>
            <p>
              What do you mean by Acquiring Payment… Let’s say you buy a product either in store or online and you use your card (either debit or credit) to purchase the product, from that point the acquiring payment meaning settles in.</p>
              <p>The transaction passes through 4 phases during this stage, Authentication & Authorization of your card transaction, clearing and settlement, Merchant payout, Reconciliation and Accounting.</p>
              <p>Authentication happens only during online purchase, where the end customer enters card number and get an OTP to be punched into the system this process is authentication post which Authorization of card transaction is the first step that your transaction to buy the product is authorized and you get the product as you wished, yay… but wait what does it mean? This means that your card bank account has approved the transaction which in turn would result in money going out of your account for the amount that you sought authorization for. That’s as easy as is.</p>
              <p>The above process involves a technology getting approval from your card bank and letting merchant know that he can part away with the product. This technology we can name as Financial Transaction Switch.</p>

            <h3 className="font-semibold text-xl text-gray-900">
              Let’s now move to the 2nd phase of what is clearing and settlement:
            </h3>
            <p>
              When the transaction is registered in the switch as a record of what happened during the day with n Number of transactions that has happened during the entire day with other merchants too, will consolidate all entries that are authorized by the switch and send it to the intermediary.</p>
              <p>Hey, wait now you are bringing in a new term called intermediary what is it? 😊, okay the intermediaries are VISA, Mastercard, Amex, NPCI etc… if you are holding a card issued by your banker you can say you hold an X bank’s card but at the face of the card you will see the emblem of the intermediaries as banks issue card that is proprietary rights of the intermediaries. Hence though we have individual banks card it is called as visa card or master card…</p>
              <p>With the clarity above let’s understand what switch does, It takes the entire transactions that it has registered the previous day and sends it by segregating according to the intermediaries to them. Intermediary with their records sends the data further to those banks which has issued the cards, meaning those bank cards which was used to buy product from merchant outlet.</p>
              <p>Wait why is this happening? This is because the merchant must get the payment for the goods that he has sold right? How will he get the money as he has accepted only card payment. The above process will facilitate in this. By clearing system, the switch will communicate to intermediary to make them know that the switch must get XXXX amount on these transactions from each intermediary. Now intermediary will in turn ask the card banks to pay that amount to them and settle it to the switch. This is called as settlement. I hope now clearing and settlement is through… yesssss to an extent (I can hear the voice say… 😊).</p>
              <p>Now introducing another dynamic, now who is the switch owner? This could be any person authorized and approved by intermediaries to function as switch service providers, ok that’s fine then how do intermediaries believe these service providers and give the money… yes the new dynamics comes here, the money is settled to an acquiring bank. The acquiring bank is a bank which is certified by intermediaries to collect money from card issuing banks on behalf of the merchants. This certification is never given to any individual companies. Now the switch will align with an acquiring bank to get the payment from intermediaries.</p>
              <p>Third part is very easy.. once the money comes in the merchant payment is made… as simple as this? Yes, it is, each merchant transaction must be settled to the merchant without fail the acquiring bank cannot hold merchant money with themselves without any valid reasons. Hence, the money is paid back to the merchants for the product they sold.</p>
            <h3 className="font-semibold text-xl text-gray-900">
              Last and interesting part is the Reconciliation and Accounitng…
            </h3>
            <p>Now one may ask as to what is so difficult in this card is swiped, transaction happens, it is approved by the card issuer and intermediary, money is given by my card issuing bank to acquirer and acquirer has paid the merchant so what’s so complicated in this process…</p>
            <p>The entire crux depends on the reconciliation that the system must find out whether all transactions that has hit the switch has been addressed or not.</p>

            <h3 className="font-semibold text-xl text-gray-900">
              Do you know…
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>There is a cost for each transaction that is charged by card issuing bank on each transaction this means you buy a product for INR 100 and the settlement from your bank to the acquirer could be INR 98… INR 2 is the fee that issuing bank takes for this transaction.</li>
              <li>Now merchant expects INR 100 so what does the switch service provider or acquirer do, they tell merchant that for conducting a cash less and seamless transaction it charges INR 2 for this transaction and they settle merchant INR 98</li>
              <li>So this results in income and expenditure inclusion in a transaction</li>
              <li>Reconciliation & Accounting</li>
            </ul>
            <p>
              Each phase plays a critical role in ensuring that the merchant gets
              their money, the customer’s bank processes correctly, and disputes
              or refunds are managed smoothly.
            </p>
            <p>Now imagine what happens if goods are returned, if goods are defective and merchant wants to refund the customer, what happens if there is a fraudulent transaction for which card issuer is not willing to pay but merchant has already given away the goods…</p>
            <p>These are multiple dynamics to understand each transaction that hits the switch clearing sent and settlement received and merchant is paid out, refund is made, dispute is addressed and all resulting in multi level transaction which will result in a huge reconciliation work.</p>
            <p>Imagine as per RBI data the cards that were used for transactions are 16 million transactions a day for both POS and online put together even if a person is addressing 10% of this volume he deals with 50 million transactions in a month. This will result in huge exercises to track each transaction line item wise to reconcile and see what happens.</p>
            <p>Also remember each transaction does go by count but value could be humoungous, if you loose one transaction in the bargain approx INR 4400… this is the hit that one has to keep a watch through reconciliation.</p>


            <p>
              Now imagine what happens if goods are returned, defective, or if
              there’s fraud. Each of these creates reconciliation challenges.
            </p>

            <blockquote className="border-l-4 border-bluelight pl-4 italic text-gray-600">
              “Imagine from Authentication to Last leg of Reconciliation if one gives an automated system with seamless service and no manual interference and no loss of even one rupee to all the stake holders it would be great right?  — that’s what we do at Mylapay.”
            </blockquote>

            <p className="font-bold text-lg text-gray-900">
              Hope this gives a bit of clarity on the Reconciliation and
              Accounting terminology as per acquiring payments.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default BlogPage;
