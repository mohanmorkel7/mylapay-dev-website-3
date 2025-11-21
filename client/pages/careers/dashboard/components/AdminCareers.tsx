// pages/admin/index.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type JobType = {
  id: string;
  title: string;
  department: string;
  type: string;
  location: string;
  daysAgo?: string;
  jd: string;
};

export default function AdminPage() {

  const API_URL = import.meta.env.VITE_API_URL;
  // console.log("API_URL:", API_URL);

  const navigate = useNavigate();
  
  const [token, setToken] = useState<string | null>(() => typeof window !== "undefined" ? localStorage.getItem("admin_token") : null);
  const [user, setUser] = useState<string | null>(null);

  const [jobs, setJobs] = useState<JobType[]>([]);
  const [loading, setLoading] = useState(true);

  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [editing, setEditing] = useState<JobType | null>(null);
  const [form, setForm] = useState<JobType>({
    id: "",
    title: "",
    department: "",
    type: "Full time",
    location: "",
    daysAgo: "",
    jd: "",
  });

  useEffect(() => {
    const savedToken = localStorage.getItem("admin_token");
    if (savedToken) {
      setToken(savedToken);
      setLoading(false);
    } else {
      navigate("/login"); 
    }
  }, [navigate]);

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    if (token) localStorage.setItem("admin_token", token);
    else localStorage.removeItem("admin_token");
  }, [token]);

  async function fetchJobs() {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/api/admin/jobs`);
      const data = await res.json();
      setJobs(data);
    } catch (err) {
      console.error(err);
      alert("Could not load jobs");
    } finally {
      setLoading(false);
    }
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginForm),
      });
      if (!res.ok) {
        const msg = await res.json().catch(() => ({}));
        return alert(msg?.message || "Login failed");
      }
      const { token } = await res.json();
      setToken(token);
      setUser(loginForm.username);
      setLoginForm({ username: "", password: "" });
      fetchJobs();
    } catch (err) {
      console.error(err);
      alert("Login error");
    }
  }

  async function handleAddOrUpdate(e?: React.FormEvent) {
    if (e) e.preventDefault();
    if (!form.id || !form.title) return alert("id and title required");
    try {
      const method = editing ? "PUT" : "POST";
      const url = editing
  ? `${API_URL}/api/admin/jobs?id=${editing.id}`
  : `${API_URL}/api/admin/jobs`;
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const msg = await res.json().catch(() => ({}));
        return alert(msg?.message || "Failed");
      }
      await fetchJobs();
      setForm({ id: "", title: "", department: "", type: "Full time", location: "", daysAgo: "", jd: "" });
      setEditing(null);
      alert("Saved");
    } catch (err) {
      console.error(err);
      alert("Save error");
    }
  }

  async function handleEdit(job: JobType) {
    setEditing(job);
    setForm(job);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

async function handleDelete(id: string) {
  if (!confirm("Delete job?")) return;
  if (!token) return alert("Not authorized — please log in again");
  try {
    const res = await fetch(`${API_URL}/api/admin/jobs?id=${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      const msg = await res.json().catch(() => ({}));
      return alert(msg?.message || "Delete failed");
    }
    await fetchJobs();
    alert("Deleted successfully");
  } catch (err) {
    console.error(err);
    alert("Delete error");
  }
}

function logout() {
    setToken(null);
    setUser(null);
    localStorage.removeItem("admin_token");
    navigate("/login");
  }

  if (loading) {
    // 👇 simple loading screen during redirect
    return <div className="text-center mt-20 text-gray-500">Loading...</div>;
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {!token ? (
        <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Admin Login</h2>
          <form onSubmit={handleLogin} className="space-y-3">
            <input className="w-full border p-2 rounded" placeholder="Username" value={loginForm.username} onChange={(e) => setLoginForm(s => ({...s, username: e.target.value}))} />
            <input className="w-full border p-2 rounded" placeholder="Password" type="password" value={loginForm.password} onChange={(e) => setLoginForm(s => ({...s, password: e.target.value}))} />
            <button className="w-full bg-blue-600 text-white py-2 rounded">Login</button>
          </form>
        </div>
      ) : (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Careers — Admin</h2>
            <div>
              <span className="mr-3 text-sm text-gray-600">Signed in as {user}</span>
              <button className="bg-gray-200 px-3 py-1 rounded" onClick={logout}>Logout</button>
            </div>
          </div>

          {/* Add / Edit form */}
          <div className="bg-white p-4 rounded shadow mb-6">
            <h3 className="font-medium mb-2">{editing ? "Edit Job" : "Add Job"}</h3>
            <form onSubmit={handleAddOrUpdate} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input className="border p-2 rounded" placeholder="ID (e.g. J103)" value={form.id} onChange={(e) => setForm(s => ({...s, id: e.target.value}))} required />
              <input className="border p-2 rounded" placeholder="Title" value={form.title} onChange={(e) => setForm(s => ({...s, title: e.target.value}))} required />
              <select
                  className="border p-2 rounded"
                  value={form.department}
                  onChange={(e) => setForm(s => ({ ...s, department: e.target.value }))}
                >
                  {[
                    "All Departments",
                    "Administrative",
                    "Finance",
                    "Development",
                    "Tech Infra",
                    "ISMS",
                    "Product Management",
                    "Database",
                    "Design & Creative",
                  ].map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>

              <input className="border p-2 rounded" placeholder="Type" value={form.type} onChange={(e) => setForm(s => ({...s, type: e.target.value}))} />
              <input className="border p-2 rounded" placeholder="Location" value={form.location} onChange={(e) => setForm(s => ({...s, location: e.target.value}))} />
              <input className="border p-2 rounded" placeholder="daysAgo (text)" value={form.daysAgo} onChange={(e) => setForm(s => ({...s, daysAgo: e.target.value}))} />
              <textarea className="border p-2 rounded col-span-1 sm:col-span-2" rows={4} placeholder="Job description" value={form.jd} onChange={(e) => setForm(s => ({...s, jd: e.target.value}))} />
              <div className="col-span-1 sm:col-span-2 flex gap-2">
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">{editing ? "Update" : "Add"}</button>
                <button type="button" className="bg-gray-200 px-4 py-2 rounded" onClick={() => { setEditing(null); setForm({ id: "", title: "", department: "", type: "Full time", location: "", daysAgo: "", jd: "" }); }}>Reset</button>
              </div>
            </form>
          </div>

          {/* Jobs list */}
          <div className="bg-white p-4 rounded shadow">
            <h4 className="font-medium mb-2">Jobs ({jobs.length})</h4>
            {loading ? (
              <div>Loading...</div>
            ) : (
              <div className="space-y-3">
                {jobs.map((job) => (
                  <div key={job.id} className="border rounded p-3 flex justify-between items-start">
                    <div>
                      <div className="text-blue-700 font-semibold">{job.title} <span className="text-xs text-gray-400 ml-2">({job.id})</span></div>
                      <div className="text-sm text-gray-600">{job.department} • {job.type} • {job.location}</div>
                      <div className="text-sm mt-2">{job.jd?.slice(0, 160)}{job.jd && job.jd.length > 160 ? "…" : ""}</div>
                    </div>
                    <div className="flex flex-col gap-2 ml-4">
                      <button onClick={() => handleEdit(job)} className="bg-yellow-300 px-3 py-1 rounded">Edit</button>
                      <button onClick={() => handleDelete(job.id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
