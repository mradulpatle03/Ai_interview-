import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiHome, FiBookOpen, FiUserCheck, FiSettings, FiArrowLeft, FiArrowRight } from "react-icons/fi";

const navItems = [
  { name: "Dashboard", path: "/", icon: <FiHome /> },
  { name: "Flashcards", path: "/flashcards", icon: <FiBookOpen /> },
  { name: "Mock Interview", path: "/interview", icon: <FiUserCheck /> },
  { name: "Settings", path: "/settings", icon: <FiSettings /> },
];

export default function Sidebar() {
  const [open, setOpen] = useState(true);
  const location = useLocation();

  return (
    <div
      className={`${
        open ? "w-56" : "w-16"
      } bg-gray-900 text-gray-200 h-screen transition-all duration-300 flex flex-col`}
    >
      
      <button
        className="p-2 m-2 rounded hover:bg-gray-700 transition-colors"
        onClick={() => setOpen(!open)}
      >
        {open ? <FiArrowLeft /> : <FiArrowRight />}
      </button>

      {/* Nav Links */}
      <nav className="flex flex-col mt-4 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-2 rounded hover:bg-gray-700 transition-colors ${
              location.pathname === item.path ? "bg-gray-800 font-semibold" : ""
            }`}
          >
            {item.icon}
            {open && <span>{item.name}</span>}
          </Link>
        ))}
      </nav>
    </div>
  );
}
