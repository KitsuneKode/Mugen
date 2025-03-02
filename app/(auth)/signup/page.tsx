import Link from "next/link"
import { Brain } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function SignUp() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 star-bg">
      <div className="w-full max-w-md">
        <div className="bg-card border border-border rounded-xl p-8 shadow-xl">
          <div className="flex flex-col items-center mb-8">
            <Brain className="h-12 w-12 text-primary mb-4" />
            <h1 className="text-2xl font-bold halloween-font">Create Your Second Brain</h1>
            <p className="text-muted-foreground text-center mt-2">Sign up to start organizing your digital life</p>
          </div>

          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="firstName" className="text-sm font-medium">
                  First Name
                </label>
                <input
                  id="firstName"
                  type="text"
                  placeholder="John"
                  className="w-full px-3 py-2 bg-background border border-input rounded-lg focus:outline-hidden focus:ring-2 focus:ring-primary/50"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="lastName" className="text-sm font-medium">
                  Last Name
                </label>
                <input
                  id="lastName"
                  type="text"
                  placeholder="Doe"
                  className="w-full px-3 py-2 bg-background border border-input rounded-lg focus:outline-hidden focus:ring-2 focus:ring-primary/50"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="w-full px-3 py-2 bg-background border border-input rounded-lg focus:outline-hidden focus:ring-2 focus:ring-primary/50"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                className="w-full px-3 py-2 bg-background border border-input rounded-lg focus:outline-hidden focus:ring-2 focus:ring-primary/50"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                id="terms"
                type="checkbox"
                className="h-4 w-4 rounded border-input bg-background text-primary focus:outline-hidden focus:ring-2 focus:ring-primary/50"
              />
              <label htmlFor="terms" className="text-xs text-muted-foreground">
                I agree to the{" "}
                <Link href="/terms" className="text-primary hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-primary hover:underline">
                  Privacy Policy
                </Link>
              </label>
            </div>

            <Button className="w-full">Create Account</Button>
          </form>

          <div className="mt-6 pt-6 border-t border-border text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/signin" className="text-primary hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

