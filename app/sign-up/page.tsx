"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function SignUpPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    ageConfirmed: false,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters"
    }
    if (!formData.email.includes("@")) {
      newErrors.email = "Please enter a valid email"
    }
    if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters"
    }
    if (!formData.ageConfirmed) {
      newErrors.age = "You must confirm your age"
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsLoading(false)
    setSuccess(true)
  }

  if (success) {
    return (
      <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="text-6xl mb-6">✓</div>
          <h1 className="font-display font-black text-3xl text-foreground mb-4">
            Welcome, @{formData.username}!
          </h1>
          <p className="text-muted-foreground mb-8">
            Your account is ready. Start learning.
          </p>
          <Button asChild className="bg-gold text-black font-bold rounded-full hover:bg-gold/90">
            <Link href="/covenant">Build My Covenant</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-[420px]">
        {/* Card */}
        <div className="bg-surface border border-border rounded-[20px] p-8">
          {/* Header */}
          <h1 className="font-display font-extrabold text-2xl text-foreground text-center mb-2">
            Create Your Account
          </h1>
          <p className="text-muted-foreground text-center text-sm mb-8">
            Free forever. No credit card required.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <input
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="w-full rounded-xl border border-border bg-card px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-emerald"
                placeholder="@yourname"
                required
              />
              {errors.username && (
                <p className="text-destructive text-xs mt-1">{errors.username}</p>
              )}
            </div>

            <div>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full rounded-xl border border-border bg-card px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-emerald"
                placeholder="Email"
                required
              />
              {errors.email && (
                <p className="text-destructive text-xs mt-1">{errors.email}</p>
              )}
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
              {errors.password && (
                <p className="text-destructive text-xs mt-1">{errors.password}</p>
              )}
            </div>

            {/* Age checkbox */}
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.ageConfirmed}
                onChange={(e) => setFormData({ ...formData, ageConfirmed: e.target.checked })}
                className="mt-1 h-4 w-4 rounded border-border bg-card text-emerald focus:ring-emerald"
              />
              <span className="text-sm text-muted-foreground">
                I am 15 or older. If I am under 18, I understand some features require a parent or guardian.
              </span>
            </label>
            {errors.age && (
              <p className="text-destructive text-xs">{errors.age}</p>
            )}

            <Button
              type="submit"
              className="w-full h-12 bg-gold text-black font-bold rounded-full hover:bg-gold/90"
              disabled={isLoading}
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
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/sign-in" className="text-emerald hover:underline font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
