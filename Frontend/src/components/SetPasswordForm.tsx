import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function SetPasswordForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-4xl font-bold">Set a password</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Your previous password has been reset. Please set a new password for your account.
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="password">Create Password</Label>
          <Input id="password" type="password" placeholder="7789BM6X@H&sK_" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="confirmPassword">Re-enter Password</Label>
          <Input id="confirmPassword" type="password" placeholder="7789BM6X@H&sK_" required />
        </div>
        <Button type="submit" className="w-full">
          Set password
        </Button>
      </div>
    </form>
  )
}
