import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function VerifyCodeForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-4xl font-bold">Verify code</h1>
        <p className="text-balance text-sm text-muted-foreground">
          An authentication code has been sent to your email.
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="code">Enter Code</Label>
          <Input id="code" type="text" placeholder="7789BM6X" required />
        </div>
        <Button type="submit" className="w-full">
          Verify
        </Button>
        <div className="text-center text-sm">
          Didn't receive a code? <a href="/resend-code" className="underline underline-offset-4">Resend</a>
        </div>
      </div>
    </form>
  )
}
