import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function ForgotPasswordForm({
  className,
  setFormType,
  ...props
}: React.ComponentPropsWithoutRef<"form"> & { setFormType: (formType: string) => void }) {
  const [email, setEmail] = useState(localStorage.getItem("reset_email") || "");
  const [token, setToken] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isCodeSent, setIsCodeSent] = useState(!!localStorage.getItem("reset_token"));

  const handleForgotPassword = async (event: React.FormEvent) => {
    event.preventDefault();
    setMessage(null);
    setError(null);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/forgot_password/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("reset_email", email);
        localStorage.setItem("reset_token", data.token);
        setMessage("Verification code sent to your email.");
        setIsCodeSent(true);
      } else {
        setError(data.error || "Error sending verification code.");
      }
    } catch  {
      setError("An error occurred. Please try again later.");
    }
  };

  const handleVerifyCode = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/verify_reset_token/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, token }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("reset_token", token);
        setFormType("setPassword");
      } else {
        setError(data.error || "Invalid verification code");
      }
    } catch  {
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <form className={cn("flex flex-col gap-6", className)} onSubmit={isCodeSent ? handleVerifyCode : handleForgotPassword} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-4xl font-bold">Forgot Password</h1>
        <p className="text-sm text-muted-foreground">
          {isCodeSent ? "Enter the verification code sent to your email." : "Enter your email below to receive a verification code."}
        </p>
      </div>
      {message && <p className="text-green-500 text-sm">{message}</p>}
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="example@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            readOnly={isCodeSent}
            className={isCodeSent ? "bg-gray-100 cursor-not-allowed" : ""}
          />
        </div>
        {isCodeSent && (
          <div className="grid gap-2">
            <Label htmlFor="code">Enter Code</Label>
            <Input id="code" type="text" placeholder="123456" value={token} onChange={(e) => setToken(e.target.value)} required />
          </div>
        )}
        <Button type="submit" className="w-full">{isCodeSent ? "Verify" : "Submit"}</Button>
      </div>
      <div className="text-center text-sm">
        <a onClick={() => setFormType("login")} className="cursor-pointer">Back to Login</a>
      </div>
    </form>
  );
}
