// src/pages/Login.jsx
import { useState } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", form);
      const token = res.data.token;
      localStorage.setItem("token", token);
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-white px-4">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 space-y-5"
      >
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">Welcome Back</h2>
          <p className="text-sm text-gray-500 mt-1">Log in to continue</p>
        </div>

        <input
          type="email"
          name="email"
          value={form.email}
          onChange={onChange}
          placeholder="Email Address"
          className="w-full rounded-lg border border-gray-300 p-3 text-gray-700 focus:border-indigo-500 focus:ring focus:ring-indigo-200 outline-none transition"
        />

        <input
          type="password"
          name="password"
          value={form.password}
          onChange={onChange}
          placeholder="Password"
          className="w-full rounded-lg border border-gray-300 p-3 text-gray-700 focus:border-indigo-500 focus:ring focus:ring-indigo-200 outline-none transition"
        />

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-lg transition"
        >
          Log In
        </button>

        <p className="text-center text-sm text-gray-500">
          Don’t have an account?{" "}
          <a href="/register" className="text-indigo-600 hover:underline">
            Create one
          </a>
        </p>
      </form>
    </div>
  );
}
