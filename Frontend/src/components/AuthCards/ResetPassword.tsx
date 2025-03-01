import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function SetPasswordForm({
  className,
  setFormType,
  ...props
}: React.ComponentPropsWithoutRef<"form"> & { setFormType: (formType: string) => void }) {
  const [email] = useState(localStorage.getItem("reset_email") || "");
  const [token] = useState(localStorage.getItem("reset_token") || "");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setError(null);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/reset_password/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, token, new_password: newPassword }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("Password reset successfully! Redirecting to login...");
        setTimeout(() => {
          localStorage.removeItem("reset_email"); // Clear stored data
          localStorage.removeItem("reset_token");
          setFormType("login");
        }, 3000);
      } else {
        setError(data.error || "Error resetting password.");
      }
    } catch (err) {
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <form className={cn("flex flex-col gap-6", className)} onSubmit={handleSubmit} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-4xl font-bold">Set a password</h1>
        <p className="text-sm text-muted-foreground">Enter your new password below.</p>
      </div>
      {message && <p className="text-green-500 text-sm">{message}</p>}
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label>Email</Label>
          <Input type="email" value={email} readOnly className="bg-gray-100 cursor-not-allowed" />
        </div>
        <div className="grid gap-2">
          <Label>Verification Code</Label>
          <Input type="text" value={token} readOnly className="bg-gray-100 cursor-not-allowed" />
        </div>
        <div className="grid gap-2">
          <Label>New Password</Label>
          <Input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
        </div>
        <div className="grid gap-2">
          <Label>Confirm Password</Label>
          <Input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
        </div>
        <Button type="submit" className="w-full">Reset Password</Button>
      </div>
    </form>
  );
}
