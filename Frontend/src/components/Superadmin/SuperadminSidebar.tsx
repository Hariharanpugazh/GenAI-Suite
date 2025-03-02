import React from "react";
import { FiLogOut } from "react-icons/fi";
import { Link } from "react-router-dom";

const SuperadminSidebar: React.FC = () => {
  return (
    <div className="w-64 h-screen bg-gray-100 p-5 flex flex-col">
      <h1 className="text-xl font-bold text-center mb-5">GenAI Suite</h1>
      <nav className="flex flex-col space-y-3">
        <Link to="/dashboard" className="text-yellow-500 font-semibold">Dashboard</Link>
        <Link to="/products">Products</Link>
        <Link to="/inbox">Inbox</Link>
        <Link to="/edit">Edit</Link>
      </nav>
      <div className="mt-auto">
        <button className="flex items-center text-red-500">
          <FiLogOut className="mr-2" /> Log Out
        </button>
      </div>
    </div>
  );
};

export default SuperadminSidebar;
