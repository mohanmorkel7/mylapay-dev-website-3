// pages/careers/dashboard/login.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:1989/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        const msg = await res.json().catch(() => ({}));
        console.log(msg);
        return alert(msg?.message || "Login failed");
      }

      const { token } = await res.json();
      localStorage.setItem("admin_token", token);
      navigate("/admin"); // redirect to dashboard
    } catch (err) {
      console.error(err);
      alert("Login error");
    }
  };

  return (
    <>
    <section className="h-screen flex justify-center items-center">
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow mt-20">
      <h2 className="text-xl font-semibold mb-4">Admin Login</h2>
      <form onSubmit={handleLogin} className="space-y-3">
        <input
          type="text"
          placeholder="Username"
          className="w-full border p-2 rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="w-full bg-blue-600 text-white py-2 rounded">Login</button>
      </form>
    </div>
    </section>
    </>
  );
};

export default Login;
