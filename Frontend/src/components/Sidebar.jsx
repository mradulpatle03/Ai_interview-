import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars } from "react-icons/fa";

export default function Sidebar() {
  const [open, setOpen] = useState(true);
  const location = useLocation();

  const links = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Flashcards", path: "/flashcards" },
    { name: "Mock Interview", path: "/interview" },
    { name: "Settings", path: "/settings" },
  ];

  return (
    <div
      className={`${
        open ? "w-56" : "w-16"
      } bg-gray-900 text-gray-200 h-screen transition-all duration-300 flex flex-col`}
    >
      {/* Toggle Button */}
      <button
        className="p-2 text-center hover:bg-gray-700"
        onClick={() => setOpen(!open)}
      >
        <FaBars />
      </button>

      {/* Nav Links */}
      <nav className="flex flex-col mt-4 space-y-2">
        {links.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            className={`px-4 py-2 hover:bg-gray-700 rounded ${
              location.pathname === link.path ? "bg-gray-700" : ""
            }`}
          >
            {open ? link.name : link.name.charAt(0)}
          </Link>
        ))}
      </nav>
    </div>
  );
}
