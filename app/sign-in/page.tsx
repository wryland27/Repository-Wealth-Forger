"use client"

import { useState } from "react"
import Link from "next/link"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function SignInPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsLoading(false)
  }

  const handleForgotPassword = () => {
    alert("Password reset coming soon")
  }

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-[420px]">
        {/* Card */}
        <div className="bg-surface border border-border rounded-[20px] p-8">
          {/* Header */}
          <h1 className="font-display font-extrabold text-2xl text-foreground text-center mb-8">
            Welcome Back
          </h1>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full rounded-xl border border-border bg-card px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-emerald"
                placeholder="Email"
                required
              />
            </div>

            <div>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full rounded-xl border border-border bg-card px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-emerald"
                placeholder="Password"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-emerald text-black font-bold rounded-full hover:bg-emerald/90"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          {/* Links */}
          <div className="mt-6 space-y-4 text-center text-sm">
            <p className="text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link href="/sign-up" className="text-emerald hover:underline font-medium">
                Sign up
              </Link>
            </p>
            <button
              onClick={handleForgotPassword}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Forgot password?
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
