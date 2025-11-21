"use client";
import React, { useState } from "react";
import CareersAdmin from "./components/AdminCareers";
import BlogAdmin from "./components/AdminBlog";
import AboutAdmin from "./components/AdminAbout";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<"careers" | "blog" | "about">("careers");

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Fixed Sidebar */}
      <aside className="fixed top-0 left-0 h-full w-64 bg-gray-900 text-white flex flex-col shadow-lg">
        <div className="p-4 text-2xl font-bold border-b border-gray-700">
          Admin Panel
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <button
            className={`w-full text-left px-3 py-2 rounded ${
              activeTab === "careers" ? "bg-blue-600" : "hover:bg-gray-700"
            }`}
            onClick={() => setActiveTab("careers")}
          >
            Careers
          </button>

          <button
            className={`w-full text-left px-3 py-2 rounded ${
              activeTab === "blog" ? "bg-blue-600" : "hover:bg-gray-700"
            }`}
            onClick={() => setActiveTab("blog")}
          >
            Blog
          </button>

          <button
            className={`w-full text-left px-3 py-2 rounded ${
              activeTab === "about" ? "bg-blue-600" : "hover:bg-gray-700"
            }`}
            onClick={() => setActiveTab("about")}
          >
            About
          </button>
        </nav>

        <div className="p-4 border-t border-gray-700 text-sm text-gray-400">
          © 2025 Mylapay.com
        </div>
      </aside>

      {/* Main Content (with left padding to make room for sidebar) */}
      <main className="flex-1 ml-64 p-6 overflow-y-auto">
        {activeTab === "careers" && <CareersAdmin />}
        {activeTab === "blog" && <BlogAdmin />}
        {activeTab === "about" && <AboutAdmin />}
      </main>
    </div>
  );
}
