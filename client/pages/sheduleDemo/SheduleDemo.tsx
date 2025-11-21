"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Tag,
  User,
  Mail,
  Phone,
  Building,
  Calendar,
  Clock,
  ArrowRight,
} from "lucide-react";
import Footer from "@/components/layout/Footer";
import axios from "axios";

const scheduleDemoUrl = "/api/sendmail/schedule";

// Small list of countries, add more if needed
const countryCodes = [
  { code: "+91" },
  { code: "+1" },
  { code: "+44" },
  { code: "+61" },
];

export default function DemoForm() {
  const [form, setForm] = useState({
    demoTitle: "",
    name: "",
    email: "",
    phone: "",
    countryCode: "+91",
    company: "",
    date: "",
    time: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const onSave = async (values: any) => {
    try {
      const res = await axios.post(scheduleDemoUrl, values);
      if (res.status === 200) {
        toast.success(
          "Thank you for reaching out to us. We will get back to you soon."
        );
      } else {
        toast.error("Sorry, please try again.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Sorry, please try again.");
    }
  };

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
    setErrors((err) => ({ ...err, [name]: "" }));
  }

  function validate() {
    const e: Record<string, string> = {};
    if (!form.demoTitle.trim()) e.demoTitle = "Required";
    if (!form.name.trim()) e.name = "Required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Invalid email";
    if (!/^\d{6,15}$/.test(form.phone.replace(/\s+/g, ""))) e.phone = "Invalid phone";
    if (!form.company.trim()) e.company = "Required";
    if (!form.date) e.date = "Pick a date";
    if (!form.time) e.time = "Pick a time";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  if (!validate()) return;

  setSubmitting(true);

  try {
    // Combine country code with phone and remove countryCode from payload
    const payload = {
      ...form,
      phone: `${form.countryCode} ${form.phone}`,
    };
    delete payload.countryCode; // remove countryCode from payload

    await onSave(payload);
  } finally {
    setForm({
      demoTitle: "",
      name: "",
      email: "",
      phone: "",
      countryCode: "+91",
      company: "",
      date: "",
      time: "",
    });
    setErrors({});
    setSubmitting(false);
  }
}


  const inputBase =
    "w-full pl-12 pr-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-offset-1";

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto p-6 bg-white/80 dark:bg-slate-900/70 backdrop-blur rounded-2xl shadow-lg mt-[7rem] mb-20"
      >
        <h2 className="text-2xl md:text-3xl font-semibold mb-2">Schedule a Demo</h2>
        <p className="text-sm text-slate-500 mb-6">
          Get a personalized walkthrough with our experts.
        </p>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Demo Title */}
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              <Tag size={18} />
            </div>
            <input
              name="demoTitle"
              value={form.demoTitle}
              onChange={handleChange}
              placeholder="Demo title"
              autoComplete="off"
              className={
                inputBase + (errors.demoTitle ? " border-red-400" : " border-slate-200")
              }
            />
            {errors.demoTitle && (
              <p className="text-xs text-red-500 mt-1">{errors.demoTitle}</p>
            )}
          </div>

          {/* Name */}
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              <User size={18} />
            </div>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your full name"
              autoComplete="off"
              className={
                inputBase + (errors.name ? " border-red-400" : " border-slate-200")
              }
            />
            {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
          </div>

          {/* Email */}
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              <Mail size={18} />
            </div>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@company.com"
              type="email"
              autoComplete="off"
              className={
                inputBase + (errors.email ? " border-red-400" : " border-slate-200")
              }
            />
            {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
          </div>

          {/* Phone with country code */}
          <div className="relative flex items-center gap-2">
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              <Phone size={18} />
            </div>
            <select
              name="countryCode"
              value={form.countryCode}
              onChange={handleChange}
              className="pl-10 pr-2 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-offset-1"
            >
              {countryCodes.map((c) => (
                <option key={c.code} value={c.code}>
                   ({c.code})
                </option>
              ))}
            </select>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              type="tel"
              autoComplete="off"
              className={
                "w-full pl-2 pr-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-offset-1" +
                (errors.phone ? " border-red-400" : " border-slate-200")
              }
            />
          </div>
          {errors.phone && <p className="text-xs text-red-500 mt-1 md:col-span-2">{errors.phone}</p>}

          {/* Company */}
          <div className="relative md:col-span-2">
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              <Building size={18} />
            </div>
            <input
              name="company"
              value={form.company}
              onChange={handleChange}
              placeholder="Company name"
              autoComplete="off"
              className={
                inputBase + (errors.company ? " border-red-400" : " border-slate-200")
              }
            />
            {errors.company && (
              <p className="text-xs text-red-500 mt-1">{errors.company}</p>
            )}
          </div>

          {/* Date */}
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              <Calendar size={18} />
            </div>
            <input
              name="date"
              value={form.date}
              onChange={handleChange}
              type="date"
              className={
                inputBase + (errors.date ? " border-red-400" : " border-slate-200")
              }
            />
            {errors.date && <p className="text-xs text-red-500 mt-1">{errors.date}</p>}
          </div>

          {/* Time */}
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              <Clock size={18} />
            </div>
            <input
              name="time"
              value={form.time}
              onChange={handleChange}
              type="time"
              className={
                inputBase + (errors.time ? " border-red-400" : " border-slate-200")
              }
            />
            {errors.time && <p className="text-xs text-red-500 mt-1">{errors.time}</p>}
          </div>

          {/* Submit */}
          <div className="md:col-span-2 flex items-center justify-end">
            <motion.button
              type="submit"
              whileTap={{ scale: 0.97 }}
              disabled={submitting}
              className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-medium shadow-md"
              aria-live="polite"
            >
              {submitting ? (
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  style={{ display: "inline-block" }}
                >
                  ⏳
                </motion.span>
              ) : (
                <>
                  Submit <ArrowRight size={16} />
                </>
              )}
            </motion.button>
          </div>
        </form>
      </motion.div>

      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />

      <Footer />
    </>
  );
}
