import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../slices/authSlice";

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    experienceLevel: "",
    preferences: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (res.ok) {
        // save user + token in redux + localStorage
        dispatch(setCredentials({ user: data.user, token: data.token }));

        setMessage("✅ Account created successfully!");
        navigate("/profile"); // redirect after signup
      } else {
        setMessage("❌ " + (data.message || "Signup failed"));
      }
    } catch (err) {
      setMessage("❌ Something went wrong!");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Create Account
        </h2>
        {message && <p className="text-center mb-4 text-sm">{message}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-indigo-400 outline-none"
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-indigo-400 outline-none"
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-indigo-400 outline-none"
            />
            <button
              type="button"
              className="absolute right-3 top-3 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          <input
            type="text"
            name="experienceLevel"
            placeholder="Experience Level"
            value={form.experienceLevel}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-indigo-400 outline-none"
          />
          <input
            type="text"
            name="preferences"
            placeholder="Preferences"
            value={form.preferences}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-indigo-400 outline-none"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg font-semibold shadow-md hover:opacity-90 transition"
          >
            {loading ? "Creating..." : "Sign Up"}
          </button>
        </form>
        <p className="text-sm text-gray-600 mt-6 text-center">
          Already have an account?{" "}
          <Link to={"/login"} className="text-indigo-500 font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;

