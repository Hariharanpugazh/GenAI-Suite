import React from "react";
import { FiUsers, FiShoppingCart, FiClock } from "react-icons/fi";
import { FaDollarSign } from "react-icons/fa";
import AdminSidebar from "@/components/Admin/AdminSidebar";

const AdminDashboard: React.FC = () => {
  const stats = [
    {
      title: "Total Users",
      value: "40,689",
      icon: <FiUsers size={24} className="text-purple-500" />,
      trend: "+8.5% Up from yesterday",
      trendColor: "text-green-500",
    },
    {
      title: "Total Orders",
      value: "10,293",
      icon: <FiShoppingCart size={24} className="text-yellow-500" />,
      trend: "+1.3% Up from past week",
      trendColor: "text-green-500",
    },
    {
      title: "Total Sales",
      value: "$89,000",
      icon: <FaDollarSign size={24} className="text-green-500" />,
      trend: "-4.2% Down from yesterday",
      trendColor: "text-red-500",
    },
    {
      title: "Total Pending",
      value: "2,040",
      icon: <FiClock size={24} className="text-orange-500" />,
      trend: "+1.8% Up from yesterday",
      trendColor: "text-green-500",
    },
  ];

  return (
    <div className="flex">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold">Welcome Back Admin!</h1>
        <p className="text-gray-600">Here is your dashboard analytics.</p>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-5 rounded-lg shadow-md flex items-center space-x-4">
              <div className="p-3 bg-gray-100 rounded-full">{stat.icon}</div>
              <div>
                <p className="text-lg font-semibold">{stat.value}</p>
                <p className="text-gray-500">{stat.title}</p>
                <p className={`text-sm ${stat.trendColor}`}>{stat.trend}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
