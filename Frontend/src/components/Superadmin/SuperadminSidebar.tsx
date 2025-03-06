import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Import navigation hooks
import { Home, Package, Users, TrendingUp, MessageSquare, LogOut, User, Settings } from "lucide-react";
import logo  from "../../assets/ihub.png"

const SuperadminSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [active, setActive] = useState(location.pathname);
  const [projectsDropdown, setProjectsDropdown] = useState(false); // State to toggle dropdown

  const handleLogout = () => {
    // Clear all storage
    localStorage.clear();
    sessionStorage.clear();
    document.cookie.split(";").forEach((c) => {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
    });

    // Redirect to home page
    navigate("/");
  };

  const menuItems = [
    { name: "Dashboard", icon: <Home size={18} />, path: "/superadmin-dashboard" },
    {
      name: "Products",
      icon: <Package size={18} />,
      path: "/products",
      subMenu: [
        { name: "Manage Products", path: "/manage-products" },
        { name: "Create Product", path: "/post-product" },
      ],
    },
    { name: "Chatbot", icon: <MessageSquare size={18} />, path: "/superadmin/chatbot" },
    { name: "Response", icon: <MessageSquare size={18} />, path: "/superadmin/response" },
    { name: "Trending Products", icon: <TrendingUp size={18} />, path: "/superadmin/trending" },
    { name: "User Managements", icon: <Users size={18} />, path: "/superadmin/users" },
    { name: "Settings", icon: <Settings size={18} />, path: "/superadmin/settings" },
  ];

  return (
    <div className="w-64 h-screen bg-white shadow-lg flex flex-col p-4">
      {/* Logo */}
      <div className="flex items-center space-x-2 mb-6">
        <img src={logo} alt="Superadmin Logo" className="w-10 h-10" />
        <span className="text-lg font-semibold">Superadmin Panel</span>
      </div>

      {/* Menu */}
      <nav className="flex-1">
        {menuItems.map((item, index) => (
          <div key={index} className="mb-2">
            <button
              onClick={() => {
                if (item.subMenu) {
                  setProjectsDropdown(!projectsDropdown);
                } else {
                  setActive(item.path);
                  navigate(item.path);
                }
              }}
              className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg transition ${
                active === item.path ? "bg-black text-white" : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </button>

            {/* Submenu for Products */}
            {item.subMenu && projectsDropdown && (
              <div className="pl-8 mt-1">
                {item.subMenu.map((sub, i) => (
                  <button
                    key={i}
                    className="block text-sm text-gray-600 hover:text-black py-1"
                    onClick={() => {
                      setActive(sub.path);
                      navigate(sub.path);
                    }}
                  >
                    + {sub.name}
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
        <button
          onClick={handleLogout}
          className="flex items-center space-x-3 px-4 py-2 text-red-600 hover:bg-red-100 w-full"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default SuperadminSidebar;
