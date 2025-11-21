"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, X } from "lucide-react";
import logo from "@/pages/assets/images/fav.png";
import Footer from "@/components/layout/Footer";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type JobType = {
  id: string;
  title: string;
  department: string;
  type: string;
  location: string;
  daysAgo?: string;
  jd: string;
};

const departments = [
  "All Departments",
  "Administrative",
  "Finance",
  "Development",
  "Tech Infra",
  "ISMS",
  "Product Management",
  "Database",
  "Design & Creative",
];

export default function CareersPage() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDept, setSelectedDept] = useState("All Departments");
  const [selectedJob, setSelectedJob] = useState<JobType | null>(null);
  const [jobs, setJobs] = useState<JobType[]>([]);
  const [loadingJobs, setLoadingJobs] = useState(true);
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    linkedIn: "",
    portfolio: "",
    resume: null as File | null,
    message: "",
  });

  // Fetch jobs from API (server-side JSON)
useEffect(() => {
  let mounted = true;
  (async () => {
    try {
      setLoadingJobs(true);

      // Replace /api/admin/jobs with your backend server URL
      const res = await fetch("http://localhost:1989/api/admin/jobs");

      if (!res.ok) throw new Error("Failed to load jobs");

      const data: JobType[] = await res.json();

      if (mounted) setJobs(data);
    } catch (err) {
      console.error("Error fetching jobs:", err);
      toast.error("Unable to load jobs. Try again later.");
    } finally {
      if (mounted) setLoadingJobs(false);
    }
  })();

  return () => {
    mounted = false;
  };
}, []);


  // Filter jobs
  const filteredJobs = jobs.filter((job) => {
    const matchesDept = selectedDept === "All Departments" || job.department === selectedDept;

    const q = searchTerm.trim().toLowerCase();
    const matchesSearch =
      job.title.toLowerCase().includes(q) ||
      job.department.toLowerCase().includes(q) ||
      job.location.toLowerCase().includes(q);

    return matchesDept && matchesSearch;
  });

  // Input change handler
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  // File upload handler
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size exceeds 5 MB limit.");
        return;
      }

      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      if (!allowedTypes.includes(file.type)) {
        toast.error("Only PDF, DOC, and DOCX files are allowed.");
        return;
      }

      setFormValues((prev) => ({ ...prev, resume: file }));
    }
  };

  // Form submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedJob) return;

    if (!formValues.resume) {
      toast.warn("Please upload your resume before submitting.");
      return;
    }

    const data = new FormData();
    data.append("job_title", selectedJob.title);
    data.append("job_id", selectedJob.id);
    data.append("department", selectedJob.department);
    data.append("location", selectedJob.location);
    data.append("first_name", formValues.firstName);
    data.append("last_name", formValues.lastName);
    data.append("email", formValues.email);
    data.append("phone", formValues.phone);
    data.append("linkedin", formValues.linkedIn);
    data.append("portfolio", formValues.portfolio);
    data.append("message", formValues.message);
    data.append("resume", formValues.resume);

    try {
      const res = await fetch("/api/sendmail/apply-job", {
        method: "POST",
        body: data,
      });

      if (res.ok) {
        toast.success("✅ Application sent successfully!");
        setSelectedJob(null);
        setFormValues({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          linkedIn: "",
          portfolio: "",
          resume: null,
          message: "",
        });
      } else {
        toast.error("❌ Failed to send application. Please try again!");
      }
    } catch (err) {
      console.error(err);
      toast.error("⚠️ Error submitting form. Please try again!");
    }
  };

  // Prevent background scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = selectedJob ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedJob]);

  return (
    <>
      <div className="min-h-screen bg-[#f7f6fb] px-4 md:px-10 py-10 mt-20">
        <div className="flex flex-col items-center text-center mb-10">
          <div className="flex items-center justify-center">
            <img src={logo} alt="Logo" className="w-10 h-10 mr-3" />
            <h1 className="text-2xl md:text-3xl font-semibold secondarycolormylapay">
              Jumpstart Your Future
            </h1>
          </div>
          <p className="mt-2 text-gray-600 text-sm md:text-base">
            Find your next career at Mylapay
          </p>
          <p className="mt-2 text-gray-600 text-sm md:text-base">
            Together, we create great working culture, build best technology
            products for Payments.
          </p>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mt-6 w-full max-w-xl border rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        {/* Sidebar + Job Cards */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar (Desktop) */}
          <div className="hidden md:block w-full md:w-1/4 bg-white rounded-lg shadow p-4 h-fit">
            <ul className="space-y-2">
              {departments.map((dept, idx) => (
                <motion.li
                  key={idx}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setSelectedDept(dept)}
                  className={`px-3 py-2 rounded-md cursor-pointer text-sm md:text-base transition ${
                    selectedDept === dept
                      ? "bg-blue-100 text-blue-700 font-medium"
                      : "hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  {dept}
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Dropdown (Mobile) */}
          <div className="relative block md:hidden mb-4">
            <motion.button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full flex justify-between items-center border border-gray-300 rounded-lg p-3 text-gray-700 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
              whileTap={{ scale: 0.97 }}
            >
              <span>{selectedDept}</span>
              <motion.span
                animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                ▼
              </motion.span>
            </motion.button>

            <AnimatePresence>
              {isDropdownOpen && (
                <motion.ul
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute z-20 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden"
                >
                  {departments.map((dept, idx) => (
                    <li
                      key={idx}
                      onClick={() => {
                        setSelectedDept(dept);
                        setIsDropdownOpen(false);
                      }}
                      className={`px-4 py-2 text-sm cursor-pointer transition ${
                        selectedDept === dept
                          ? "bg-blue-100 text-blue-700 font-medium"
                          : "hover:bg-gray-100 text-gray-700"
                      }`}
                    >
                      {dept}
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>

          {/* Job Listings */}
          <div className="flex-1">
            {filteredJobs.length === 0 ? (
              <p className="text-gray-500 text-center mt-10">No jobs found.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredJobs.map((job, idx) => (
                  <motion.div
                    key={idx}
                    // whileHover={{ scale: 1.03 }}
                    // transition={{ type: "spring", stiffness: 200 }}
                    className="bg-white rounded-lg shadow p-5 flex flex-col gap-2 hover:shadow-md transition"
                  >
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="w-4 h-4 mr-1 text-blue-600" />
                      {job.location}
                    </div>
                    <h3 className="text-blue-700 font-semibold text-lg">
                      {job.title}
                    </h3>
                    <p className="text-sm text-gray-600">{job.department}</p>
                    <p className="text-sm text-gray-600">{job.type}</p>
                    <p className="text-xs text-gray-400">{job.daysAgo}</p>

                    <button
                      onClick={() => setSelectedJob(job)}
                      className="mt-2 bg-blue-600 text-white text-sm py-2 px-4 rounded hover:bg-blue-700 transition"
                    >
                      Apply
                    </button>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ======= Modal ======= */}
      <AnimatePresence>
        {selectedJob && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-hidden"
            style={{ overscrollBehavior: "contain" }}
          >
            <motion.div
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 30, opacity: 0 }}
              className="bg-white rounded-xl shadow-xl w-full max-w-2xl p-6 relative mx-auto overflow-y-auto"
              style={{ maxHeight: "90vh" }}
            >
              <button
                onClick={() => setSelectedJob(null)}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 transition"
              >
                <X className="w-6 h-6" />
              </button>

              <h2 className="text-xl md:text-2xl font-semibold text-blue-700 mb-2">
                {selectedJob.title}
              </h2>
              <p className="text-gray-600 mb-4 text-sm md:text-base">
                {selectedJob.jd}
              </p>

              <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                <input
                  type="text"
                  value={selectedJob.title}
                  readOnly
                  className="border p-2 rounded bg-gray-50"
                />
                <input
                  type="text"
                  value={selectedJob.id}
                  readOnly
                  className="border p-2 rounded bg-gray-50"
                />
                <input
                  type="text"
                  value={selectedJob.department}
                  readOnly
                  className="border p-2 rounded bg-gray-50"
                />
                <input
                  type="text"
                  value={selectedJob.location}
                  readOnly
                  className="border p-2 rounded bg-gray-50"
                />

                <input
                  name="firstName"
                  value={formValues.firstName}
                  onChange={handleChange}
                  type="text"
                  placeholder="First Name"
                  className="border p-2 rounded"
                  required
                />
                <input
                  name="lastName"
                  value={formValues.lastName}
                  onChange={handleChange}
                  type="text"
                  placeholder="Last Name"
                  className="border p-2 rounded"
                  required
                />
                <input
                  name="email"
                  value={formValues.email}
                  onChange={handleChange}
                  type="email"
                  placeholder="Email"
                  className="border p-2 rounded"
                  required
                />
                <input
                  name="phone"
                  value={formValues.phone}
                  onChange={handleChange}
                  type="tel"
                  placeholder="Phone"
                  className="border p-2 rounded"
                  required
                />

                <input
                  name="linkedIn"
                  value={formValues.linkedIn}
                  onChange={handleChange}
                  type="text"
                  placeholder="LinkedIn Profile (Optional)"
                  className="border p-2 rounded sm:col-span-2"
                />

                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="border p-2 rounded sm:col-span-2"
                  required
                />
                <small className="sm:col-span-2 text-gray-500 text-xs">
                  * Accepted formats: PDF, DOC, DOCX — Max size: 5MB
                </small>

                <input
                  name="portfolio"
                  value={formValues.portfolio}
                  onChange={handleChange}
                  type="text"
                  placeholder="Portfolio Link (Optional)"
                  className="border p-2 rounded sm:col-span-2"
                />

                <textarea
                  name="message"
                  value={formValues.message}
                  onChange={handleChange}
                  placeholder="Message"
                  className="border p-2 rounded sm:col-span-2"
                  rows={3}
                ></textarea>

                <button
                  type="submit"
                  className="sm:col-span-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                >
                  Submit Application
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast container */}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
      />

      <Footer />
    </>
  );
}
