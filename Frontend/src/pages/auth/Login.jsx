import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import api from "../../utils/api";
import { setCredentials } from "../../redux/authSlice";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", form);
      const { token, user } = res.data;

      dispatch(setCredentials({ user, token }));
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      navigate("/profile");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="h-full flex flex-col md:flex-row">
      {/* Left Panel: Welcome / Illustration */}
      <div className="md:w-1/2 flex flex-col justify-center items-center bg-gradient-to-br from-purple-400 via-pink-500 to-red-400 text-white p-10">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 h-full">Welcome Back!</h1>
        <p className="text-lg md:text-xl opacity-90">
          Sign in to continue to your dashboard and access all features.
        </p>
        <div className="mt-10 w-full md:w-3/4">
          <img
            src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=800&q=80"
            alt="Illustration"
            className="rounded-xl shadow-2xl"
          />
        </div>
      </div>

      {/* Right Panel: Login Form */}
      <div className="md:w-1/2 flex items-center justify-center bg-gray-50 p-8">
        <form
          onSubmit={onSubmit}
          className="w-full max-w-md bg-white backdrop-blur-md bg-opacity-80 rounded-3xl shadow-2xl p-10 space-y-6"
        >
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-1">Log In</h2>
            <p className="text-gray-500">Access your account to continue</p>
          </div>

          <div className="flex flex-col gap-4">
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={onChange}
              placeholder="Email Address"
              className="w-full px-5 py-3 rounded-2xl border border-gray-300 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition"
            />

            <input
              type="password"
              name="password"
              value={form.password}
              onChange={onChange}
              placeholder="Password"
              className="w-full px-5 py-3 rounded-2xl border border-gray-300 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white font-semibold shadow-lg hover:scale-105 transform transition"
          >
            Log In
          </button>

          <p className="text-center text-gray-500">
            Don’t have an account?{" "}
            <Link to={"/signup"} className="text-purple-600 font-medium hover:underline">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
