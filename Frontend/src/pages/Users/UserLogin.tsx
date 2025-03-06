import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SignUpForm } from "@/components/AuthCards/Signup";
import { ForgotPasswordForm } from "@/components/AuthCards/ForgotPasswordForm";
import { SetPasswordForm } from "@/components/AuthCards/ResetPassword";
import ihubLogin from "@/assets/ihub-login.png";
import Cookies from "js-cookie";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons

const UserLogin = () => {
  const navigate = useNavigate();
  const [formType, setFormType] = useState("login"); // Default to login
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isNewUser, setIsNewUser] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State for password visibility

  const handleLogin = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/user_login/", {
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
        navigate("/products-list");
      } else if (data.error === "User not found") {
        setIsNewUser(true); // Flag for new users
      } else {
        setError(data.error || "Invalid login credentials");
      }
    } catch {
      setError("An error occurred. Please try again later.");
    }
  };

  const cleanupLocalStorage = () => {
    localStorage.removeItem("reset_email");
    localStorage.removeItem("reset_token");
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      handleLogin();
    }
  };

  const renderForm = () => {
    if (isNewUser) {
      return <SignUpForm setFormType={setFormType} />;
    }

    switch (formType) {
      case "login":
        cleanupLocalStorage(); // Clear local storage when navigating to login
        return (
          <div onKeyDown={handleKeyDown}>
            <h2 className="text-2xl font-bold mb-2">Login</h2>
            <h6 className="text-gray-500 text-sm mb-4">Login to access your travelwise account</h6>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border rounded w-full py-2 px-3 text-gray-700"
                placeholder="example@gmail.com"
              />
              {error && error.includes("email") && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>
            <div className="mb-6 relative">
              <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border rounded w-full py-2 px-3 text-gray-700"
                placeholder="Password"
              />
              <span
                className="absolute right-3 top-10 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
              {error && error.includes("password") && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>
            <div className="mb-4 text-right">
              <a
                onClick={() => setFormType("forgotPassword")}
                className="text-[#4A90E7] cursor-pointer"
              >
                Forgot your password?
              </a>
            </div>
            <div className="flex items-center justify-between">
              <button
                onClick={handleLogin}
                className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded w-full"
              >
                Login
              </button>
            </div>

            <div className="mt-4 text-center">
              <a
                onClick={() => setFormType("signup")}
                className="text-gray-500 hover:text-gray-700 cursor-pointer"
              >
                Don't have an account? <span className="text-[#4A90E7]">Sign up</span>
              </a>
            </div>
          </div>
        );
      case "signup":
        return <SignUpForm setFormType={setFormType} />;
      case "forgotPassword":
        return <ForgotPasswordForm setFormType={setFormType} />;
      case "setPassword":
        return <SetPasswordForm setFormType={setFormType} />;
      default:
        return null;
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

            {isNewUser && <p className="text-blue-500 text-sm mb-4">New user detected. Please sign up.</p>}
            {renderForm()}
            {error && !error.includes("email") && !error.includes("password") && (
              <p className="text-red-500 text-sm mb-4">{error}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
