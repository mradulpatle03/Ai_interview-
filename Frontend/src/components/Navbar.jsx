import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout()); // clears Redux + localStorage
    navigate("/login");
  };

  const AuthLinks = () => (
    <>
      <Link
        to="/profile"
        className="text-gray-700 hover:text-indigo-600 font-medium transition"
      >
        Profile
      </Link>
      <span className="text-gray-600">Welcome, {user?.name}</span>
      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
      >
        Logout
      </button>
    </>
  );

  const GuestLinks = () => (
    <>
      <Link
        to="/login"
        className="px-4 py-2 rounded-lg text-yellow-600 border border-yellow-600 hover:bg-indigo-50 transition"
      >
        Login
      </Link>
      <Link
        to="/signup"
        className="px-4 py-2 bg-yellow-600 text-white rounded-lg shadow hover:bg-yellow-700 transition"
      >
        Register
      </Link>
    </>
  );

  return (
    <nav className="bg-neutral-700 shadow-lg sticky top-0 z-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex justify-between items-center h-16">
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold text-yellow-400 hover:text-yellow-300 transition">
        MyApp
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex space-x-6 items-center">
        <Link
          to="/"
          className="text-yellow-200 hover:text-yellow-400 font-medium transition"
        >
          Home
        </Link>

        {isAuthenticated ? (
          <AuthLinks />
        ) : (
          <GuestLinks />
        )}
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="md:hidden text-yellow-200 hover:text-yellow-400 focus:outline-none"
      >
        {menuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
    </div>
  </div>

  {/* Mobile Menu Dropdown */}
  {menuOpen && (
    <div className="md:hidden bg-black shadow-lg px-4 pt-2 pb-4 space-y-3">
      <Link
        to="/"
        className="block text-yellow-200 hover:text-yellow-400 font-medium"
        onClick={() => setMenuOpen(false)}
      >
        Home
      </Link>

      {isAuthenticated ? (
        <>
          <Link
            to="/profile"
            className="block text-yellow-200 hover:text-yellow-400 font-medium"
            onClick={() => setMenuOpen(false)}
          >
            Profile
          </Link>
          <span className="block text-yellow-300">Welcome, {user?.name}</span>
          <button
            onClick={() => {
              handleLogout();
              setMenuOpen(false);
            }}
            className="w-full px-4 py-2 bg-yellow-500 text-black rounded-lg shadow hover:bg-yellow-400 transition"
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <Link
            to="/login"
            className="block px-4 py-2 rounded-lg text-yellow-500 border border-yellow-500 hover:bg-yellow-50 hover:text-black transition"
            onClick={() => setMenuOpen(false)}
          >
            Login
          </Link>
          <Link
            to="/register"
            className="block px-4 py-2 bg-yellow-500 text-black rounded-lg shadow hover:bg-yellow-400 transition"
            onClick={() => setMenuOpen(false)}
          >
            Register
          </Link>
        </>
      )}
    </div>
  )}
</nav>

  );
};

export default Navbar;
