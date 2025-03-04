import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ihubLogin from "@/assets/ihub-login.png";
import Cookies from "js-cookie";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const SuperAdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false); 

  const handleLogin = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/superadmin_login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        credentials: "include", // Ensures cookies & authentication headers are sent
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        Cookies.set("jwt", data.token.jwt, { expires: 1, secure: true, sameSite: "Strict" });
        navigate("/superadmin-dashboard");
      } else {
        setError(data.error || "Invalid login credentials");
      }
    } catch {
      setError("An error occurred. Please try again later.");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden bg-white lg:block">
        <div className="absolute inset-0 flex items-center justify-center p-10">
          <img
            src={ihubLogin || "/placeholder.svg"}
            alt="Login background"
            className="max-h-[80%] w-auto object-contain"
          />
        </div>
      </div>
      <div className="flex flex-col gap-4 p-6 md:p-10 bg-white">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-3xl pr-20">
            
            <h2 className="text-2xl font-bold mb-2">Login</h2>
            <h6 className="text-gray-500 text-sm mb-4">Login to access your travelwise account</h6>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={handleKeyDown}
                className=" border rounded w-full py-2 px-3 text-gray-700 "
                placeholder="example@gmail.com"
              />
            </div>
            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="border rounded w-full py-2 px-3 text-gray-700 pr-10"
                  placeholder="Password"
                />
                <span
                  className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </span>
                </div>
            </div>
            <div className="flex items-center justify-between">
              <button
                onClick={handleLogin}
                className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded w-full"
              >
                Login
              </button>
            </div>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminLogin;
