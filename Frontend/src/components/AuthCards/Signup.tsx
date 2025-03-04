import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaEye, FaEyeSlash } from "react-icons/fa";

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
  const [passwordStrengthMessage, setPasswordStrengthMessage] = useState<string>("");
  const [passwordMatchMessage, setPasswordMatchMessage] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    if (confirmPassword && password !== confirmPassword) {
      setPasswordMatchMessage("Passwords do not match.");
    } else {
      setPasswordMatchMessage("");
    }
  }, [password, confirmPassword]);

  useEffect(() => {
    const isValid = !!(firstName && email && phone && password && confirmPassword && password === confirmPassword && passwordStrengthMessage === "Password is strong.");
    setIsFormValid(isValid);
  }, [firstName, email, phone, password, confirmPassword, passwordStrengthMessage]);

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
    } catch {
      setError("An error occurred. Please try again later.");
    }
  };

  const checkPasswordStrength = (password: string) => {
    const requirements = [];
    if (password.length < 6) requirements.push("at least 6 characters");
    if (!password.match(/[A-Z]/)) requirements.push("an uppercase letter");
    if (!password.match(/[a-z]/)) requirements.push("a lowercase letter");
    if (!password.match(/[0-9]/)) requirements.push("a number");
    if (!password.match(/[@$!%*?&]/)) requirements.push("a special character");

    if (requirements.length === 0) {
      setPasswordStrengthMessage("Password is strong.");
    } else {
      setPasswordStrengthMessage(`Password must contain: ${requirements.join(", ")}`);
    }
  };

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
            <Input id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First Name" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="lastName">Last Name (Optional)</Label>
            <Input id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last Name" />
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
        <div className="grid gap-2 relative">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input id="password" type={showPassword ? "text" : "password"} value={password} onChange={(e) => { setPassword(e.target.value); checkPasswordStrength(e.target.value); }} required />
            <span className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>
          <p className="text-sm text-gray-900">{passwordStrengthMessage}</p>
        </div>
        <div className="grid gap-2 relative">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <div className="relative">
            <Input id="confirmPassword" type={showConfirmPassword ? "text" : "password"} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
            <span className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
              {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>
          <p className="text-sm text-grey-500">{passwordMatchMessage}</p>
        </div>
        <Button type="submit" className="w-full" disabled={!isFormValid}>
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
