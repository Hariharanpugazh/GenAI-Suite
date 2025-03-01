import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SignUpForm } from "@/components/AuthCards/Signup";
import { ForgotPasswordForm } from "@/components/AuthCards/ForgotPasswordForm";
import { SetPasswordForm } from "@/components/AuthCards/ResetPassword";
import ihubLogin from "@/assets/ihub-login.png";
import Cookies from "js-cookie";

const UserLogin = () => {
  const navigate = useNavigate();
  const [formType, setFormType] = useState("login"); // Default to login
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isNewUser, setIsNewUser] = useState(false);

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
        navigate("/user-dashboard");
      } else if (data.error === "User not found") {
        setIsNewUser(true); // Flag for new users
      } else {
        setError(data.error || "Invalid login credentials");
      }
    } catch (err) {
      setError("An error occurred. Please try again later.");
    }
  };

  const renderForm = () => {
    if (isNewUser) {
      return <SignUpForm setFormType={setFormType} />;
    }

    switch (formType) {
      case "login":
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6">Login</h2>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="example@gmail.com"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Password"
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                onClick={handleLogin}
                className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              >
                Login
              </button>
            </div>
            <div className="mt-4 text-center">
              <a
                onClick={() => setFormType("forgotPassword")}
                className="text-gray-500 hover:text-gray-700 cursor-pointer"
              >
                Forgot your password?
              </a>
            </div>
            <div className="mt-4 text-center">
              <a
                onClick={() => setFormType("signup")}
                className="text-gray-500 hover:text-gray-700 cursor-pointer"
              >
                Don't have an account? Sign up
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
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            {isNewUser && <p className="text-blue-500 text-sm mb-4">New user detected. Please sign up.</p>}
            {renderForm()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
