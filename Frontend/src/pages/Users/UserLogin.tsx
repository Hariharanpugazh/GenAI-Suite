import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginForm } from "@/components/AuthCards/Login";
import { SignUpForm } from "@/components/AuthCards/Signup";
import { ForgotPasswordForm } from "@/components/AuthCards/ForgotPasswordForm";
import { SetPasswordForm } from "@/components/AuthCards/ResetPassword";
import ihubLogin from "@/assets/ihub-login.png";
import Cookies from "js-cookie";

const UserLogin = () => {
  const navigate = useNavigate();
  const [formType, setFormType] = useState("login");
  const [error, setError] = useState<string | null>(null);
  const [isNewUser, setIsNewUser] = useState(false);

  const handleLogin = async (email: string, password: string) => {
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
        return <LoginForm onSubmit={handleLogin} setFormType={setFormType} />;
      case "signup":
        return <SignUpForm setFormType={setFormType} />;
      case "forgotPassword":
        return <ForgotPasswordForm setFormType={setFormType} />;
      case "setPassword":
        return <SetPasswordForm setFormType={setFormType} />;
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