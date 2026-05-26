"use client"

import { useState } from "react"
import Link from "next/link"
import { Swords, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function SignUpPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    ageConfirmed: false,
    isUnder18: false,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate API call - in production this calls Supabase Auth
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsLoading(false)
    // Redirect would happen here
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center gap-2 mb-8">
          <Swords className="w-8 h-8 text-primary" />
          <span className="font-bold text-xl text-foreground tracking-tight">WealthForger</span>
        </Link>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-foreground mb-2">Join the Squad</h1>
          <p className="text-muted-foreground">Start building wealth skills today. Free forever.</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-foreground mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              className="w-full rounded-xl border border-border bg-card px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Choose a username"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full rounded-xl border border-border bg-card px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full rounded-xl border border-border bg-card px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Create a strong password"
              required
              minLength={8}
            />
          </div>

          {/* Age checkbox */}
          <div className="space-y-3">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isUnder18}
                onChange={(e) => setFormData({ ...formData, isUnder18: e.target.checked })}
                className="mt-1 h-4 w-4 rounded border-border bg-card text-primary focus:ring-primary"
              />
              <span className="text-sm text-muted-foreground">
                I am under 18 years old
              </span>
            </label>

            {formData.isUnder18 && (
              <div className="rounded-xl border border-accent/50 bg-accent/10 p-4">
                <p className="text-sm text-muted-foreground">
                  Some features like broker sign-ups require parental consent. 
                  You can still access all educational content and competitions.
                </p>
              </div>
            )}

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.ageConfirmed}
                onChange={(e) => setFormData({ ...formData, ageConfirmed: e.target.checked })}
                className="mt-1 h-4 w-4 rounded border-border bg-card text-primary focus:ring-primary"
                required
              />
              <span className="text-sm text-muted-foreground">
                I confirm I am at least 15 years old and agree to the{" "}
                <Link href="#" className="text-primary hover:underline">Terms of Service</Link>
                {" "}and{" "}
                <Link href="#" className="text-primary hover:underline">Privacy Policy</Link>
              </span>
            </label>
          </div>

          <Button
            type="submit"
            className="w-full h-12 rounded-full bg-primary font-bold text-primary-foreground"
            disabled={isLoading || !formData.ageConfirmed}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Creating account...
              </>
            ) : (
              "Create Account"
            )}
          </Button>
        </form>

        {/* Sign in link */}
        <p className="mt-8 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/auth/sign-in" className="text-primary hover:underline font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
