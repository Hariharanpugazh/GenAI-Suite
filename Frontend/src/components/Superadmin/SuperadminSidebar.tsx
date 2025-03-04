import React from "react";
import { FiLogOut, FiInbox, FiEdit, FiGrid } from "react-icons/fi";
import { FaBoxOpen } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const SuperadminSidebar: React.FC = () => {
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", path: "/superadmin-dashboard", icon: <FiGrid size={18} /> },
    { name: "Products", path: "/products", icon: <FaBoxOpen size={18} /> },
    { name: "Inbox", path: "/inbox", icon: <FiInbox size={18} /> },
    { name: "Edit", path: "/edit", icon: <FiEdit size={18} /> },
  ];

  return (
    <div className="w-64 h-screen bg-white shadow-lg flex flex-col p-4">
      {/* Logo */}
      <h1 className="text-xl font-bold text-center text-gray-900 mb-6">GenAI Suite</h1>

      {/* Navigation Menu */}
      <nav className="flex flex-col space-y-2">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition ${
              location.pathname === item.path ? "bg-black text-white" : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            {item.icon}
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>

      {/* Logout Button */}
      <div className="mt-auto">
        <button className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-100 w-full">
          <FiLogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default SuperadminSidebar;
