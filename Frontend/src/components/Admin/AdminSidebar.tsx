import { useState } from "react";
import { Home, Package, Users, TrendingUp, MessageSquare, LogOut, User, Settings } from "lucide-react";

const AdminSidebar = () => {
  const [active, setActive] = useState("Dashboard");

  const menuItems = [
    { name: "Dashboard", icon: <Home size={18} />, path: "/admin/dashboard" },
    { name: "Products", icon: <Package size={18} />, path: "/admin/products", subMenu: ["Create product"] },
    { name: "Chatbot", icon: <MessageSquare size={18} />, path: "/admin/chatbot" },
    { name: "Response", icon: <MessageSquare size={18} />, path: "/admin/response" },
    { name: "Trending Products", icon: <TrendingUp size={18} />, path: "/admin/trending" },
    { name: "User Managements", icon: <Users size={18} />, path: "/admin/users" },
    { name: "Settings", icon: <Settings size={18} />, path: "/admin/settings" },
  ];

  return (
    <div className="w-64 h-screen bg-white shadow-lg flex flex-col p-4">
      {/* Logo */}
      <div className="flex items-center space-x-2 mb-6">
        <img src="/logo.png" alt="Admin Logo" className="w-10 h-10" />
        <span className="text-lg font-semibold">Admin Panel</span>
      </div>

      {/* Menu */}
      <nav className="flex-1">
        {menuItems.map((item, index) => (
          <div key={index} className="mb-2">
            <button
              onClick={() => setActive(item.name)}
              className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg transition ${
                active === item.name ? "bg-black text-white" : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </button>
            {/* Submenu for Products */}
            {item.subMenu && active === item.name && (
              <div className="pl-8 mt-1">
                {item.subMenu.map((sub, i) => (
                  <button key={i} className="block text-sm text-gray-600 hover:text-black py-1">
                    + {sub}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Profile & Logout */}
      <div className="mt-auto border-t pt-4">
        <button className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-100 w-full">
          <User size={18} />
          <span>Profile</span>
        </button>
        <button className="flex items-center space-x-3 px-4 py-2 text-red-600 hover:bg-red-100 w-full">
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
