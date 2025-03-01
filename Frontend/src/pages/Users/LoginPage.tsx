import ihubLogin from "@/assets/ihub-login.png"
import { LoginForm } from "@/components/login-form"
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/home');
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
          <div className="w-full max-w-2xl pr-20">
            <LoginForm onSubmit={handleLogin} />
          </div>
        </div>
      </div>
    </div>
  )
}
