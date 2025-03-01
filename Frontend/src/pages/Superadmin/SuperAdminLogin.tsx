import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginForm } from "@/components/AuthCards/Login";
import ihubLogin from "@/assets/ihub-login.png";
import Cookies from "js-cookie";

const SuperAdminLogin = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (email: string, password: string) => {
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
    } catch (err) {
      setError("An error occurred. Please try again later.");
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
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <LoginForm onSubmit={handleLogin} hideForgotPassword />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminLogin;