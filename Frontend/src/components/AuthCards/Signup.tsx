import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function SignUpForm({
  className,
  setFormType,
  ...props
}: React.ComponentPropsWithoutRef<"form"> & { setFormType: (formType: string) => void }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [strength, setStrength] = useState(0);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setMessage(null);

    if (!password) {
      setError("Password cannot be empty.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/user_signup/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName || "", // Make last name optional
          email,
          phone_number: phone,
          password,
          confirm_password: confirmPassword,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("User registered successfully! Redirecting to login...");
        setTimeout(() => setFormType("login"), 3000);
      } else {
        setError(data.error || "Error signing up.");
      }
    } catch (err) {
      setError("An error occurred. Please try again later.");
    }
  };

  const checkPasswordStrength = (password: string) => {
    let strengthScore = 0;
    if (password.length >= 6) strengthScore++;
    if (password.match(/[A-Z]/)) strengthScore++;
    if (password.match(/[a-z]/)) strengthScore++;
    if (password.match(/[0-9]/)) strengthScore++;
    if (password.match(/[@$!%*?&]/)) strengthScore++;
    setStrength(strengthScore);
  };

  const strengthColors = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"];

  return (
    <form className={cn("flex flex-col gap-6", className)} onSubmit={handleSubmit} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-3xl font-bold">Sign up</h1>
        <p className="text-sm text-muted-foreground">
          Let's get you all set up so you can access your personal account.
        </p>
      </div>
      {message && <p className="text-green-500 text-sm">{message}</p>}
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <div className="grid gap-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Hari" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="lastName">Last Name (Optional)</Label>
            <Input id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Krish" />
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="example@gmail.com" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="6382377127" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" value={password} onChange={(e) => { setPassword(e.target.value); checkPasswordStrength(e.target.value); }} required />
          <div className="w-full h-2 mt-2 bg-gray-300 rounded">
            <div className="h-2 rounded" style={{ width: `${(strength / 5) * 100}%`, backgroundColor: strengthColors[strength - 1] || "gray" }}></div>
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input id="confirmPassword" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
        </div>
        <Button type="submit" className="w-full">
          Create account
        </Button>
      </div>
      <div className="text-center text-sm">
        Already have an account?{" "}
        <a onClick={() => setFormType("login")} className="cursor-pointer">
          Login
        </a>
      </div>
    </form>
  );
}