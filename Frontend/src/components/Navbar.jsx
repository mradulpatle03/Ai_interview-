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
        className="px-4 py-2 rounded-lg text-indigo-600 border border-indigo-600 hover:bg-indigo-50 transition"
      >
        Login
      </Link>
      <Link
        to="/signup"
        className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
      >
        Register
      </Link>
    </>
  );

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-indigo-600">
            MyApp
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center">
            <Link
              to="/"
              className="text-gray-700 hover:text-indigo-600 font-medium transition"
            >
              Home
            </Link>

            {isAuthenticated ? <AuthLinks /> : <GuestLinks />}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-gray-700 hover:text-indigo-600 focus:outline-none"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-md px-4 pt-2 pb-4 space-y-3">
          <Link
            to="/"
            className="block text-gray-700 hover:text-indigo-600 font-medium"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>

          {isAuthenticated ? (
            <>
              <Link
                to="/profile"
                className="block text-gray-700 hover:text-indigo-600 font-medium"
                onClick={() => setMenuOpen(false)}
              >
                Profile
              </Link>
              <span className="block text-gray-600">Welcome, {user?.name}</span>
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="block px-4 py-2 rounded-lg text-indigo-600 border border-indigo-600 hover:bg-indigo-50 transition"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
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
