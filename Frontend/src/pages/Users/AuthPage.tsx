import React, { useState } from 'react';
import ihubLogin from "@/assets/ihub-login.png";
import { LoginForm } from "@/components/AuthCards/Login";
import { SignUpForm } from "@/components/AuthCards/Signup";
import { ForgotPasswordForm } from "@/components/AuthCards/ForgotPasswordForm";
import { VerifyCodeForm } from "@/components/AuthCards/Verification";
import { SetPasswordForm } from "@/components/AuthCards/ResetPassword";
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
  const [formType, setFormType] = useState('login');
  const navigate = useNavigate();

  const handleFormSubmit = () => {
    switch (formType) {
      case 'login':
        navigate('/home');
        break;
      case 'signup':
        setFormType('login');
        break;
      case 'forgotPassword':
        setFormType('verifyCode');
        break;
      case 'verifyCode':
        setFormType('setPassword');
        break;
      case 'setPassword':
        setFormType('login');
        break;
      default:
        break;
    }
  };

  const renderForm = () => {
    switch (formType) {
      case 'login':
        return <LoginForm onSubmit={handleFormSubmit} setFormType={setFormType} />

      case 'signup':
        return <SignUpForm onSubmit={handleFormSubmit} setFormType={setFormType}/>;
      case 'forgotPassword':
        return <ForgotPasswordForm onSubmit={handleFormSubmit} setFormType={setFormType}/>;
      case 'verifyCode':
        return <VerifyCodeForm onSubmit={handleFormSubmit} />;
      case 'setPassword':
        return <SetPasswordForm onSubmit={handleFormSubmit} />;
      default:
        return <LoginForm onSubmit={handleFormSubmit} setFormType={setFormType} />;
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
            {renderForm()}
            {formType !== 'login' && (
              <div className="text-center text-sm mt-4">
                <button
                  onClick={() => setFormType('login')}
                  className="underline underline-offset-4"
                >
                  Back to Login
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
