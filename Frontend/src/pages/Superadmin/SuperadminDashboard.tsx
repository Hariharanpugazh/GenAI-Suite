import React from "react";
import SuperadminSidebar from "../../components/Superadmin/SuperadminSidebar";
import { FiSearch, FiBell } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";

const SuperadminDashboard: React.FC = () => {
  return (
    <div className="flex">
      <SuperadminSidebar />
      <div className="flex-1 p-6 bg-white">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Welcome Back Super Admin!</h2>
          <div className="flex items-center space-x-4">
            <FiSearch className="text-xl" />
            <FiBell className="text-xl" />
            <FaUserCircle className="text-2xl" />
          </div>
        </div>
        <div className="grid grid-cols-4 gap-4 mt-6">
          {[
            { title: "Total Project Listings", count: 10 },
            { title: "Total Approved Projects", count: 12 },
            { title: "Pending Approvals", count: 20 },
            { title: "Rejected Approvals", count: 3 },
          ].map((item, index) => (
            <div key={index} className="bg-gray-200 p-4 rounded-lg">
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-3xl font-bold">{item.count}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 bg-gray-100 p-4 rounded-lg">
          <h3 className="text-lg font-bold">Recent Approval Requests</h3>
          <table className="w-full mt-3 border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Project Name</th>
                <th className="border p-2">Category</th>
                <th className="border p-2">Admin Name</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: "Full Stack Developer", category: "SNS Innovation Hub", admin: "Elson" },
                { name: "ML Engineer", category: "TC", admin: "Frances" },
              ].map((project, index) => (
                <tr key={index}>
                  <td className="border p-2">{project.name}</td>
                  <td className="border p-2">{project.category}</td>
                  <td className="border p-2">{project.admin}</td>
                  <td className="border p-2 text-blue-500 cursor-pointer">View Details</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SuperadminDashboard;
