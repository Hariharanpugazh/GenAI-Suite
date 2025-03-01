import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">& { setFormType: (formType: string) => void }) {
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-4xl font-bold">Forgot your password?</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Don't worry, happens to all of us. Enter your email below to recover your password
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="john.doe@gmail.com" required />
        </div>
        <Button type="submit" className="w-full">
          Submit
        </Button>
      </div>
      <div className="text-center text-sm">
        <a href="/login" className="underline underline-offset-4">
          Back to login
        </a>
      </div>
    </form>
  )
}
