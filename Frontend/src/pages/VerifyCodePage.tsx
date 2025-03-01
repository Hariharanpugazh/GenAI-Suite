import ihubLogin from "@/assets/ihub-login.png"
import { VerifyCodeForm } from "@/components/VerifyCodeForm"
import { useNavigate } from 'react-router-dom';

export default function VerifyCodePage() {
  const navigate = useNavigate();

  const handleVerifyCode = () => {
    navigate('/set-password');
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
            <VerifyCodeForm onSubmit={handleVerifyCode}/>
          </div>
        </div>
      </div>
    </div>
  )
}
