"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Menu, X, Swords } from "lucide-react"
import { Button } from "@/components/ui/button"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/covenant", label: "Covenant" },
  { href: "/cigar-lounge", label: "Lounge" },
  { href: "/deathmatch", label: "Deathmatch" },
  { href: "/arsenal", label: "Arsenal" },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Swords className="w-6 h-6 text-primary" />
            <span className="font-bold text-lg text-foreground tracking-tight">WealthForger</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  pathname === link.href 
                    ? "text-primary" 
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/auth/sign-in">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground hover:bg-secondary">
                Sign In
              </Button>
            </Link>
            <Link href="/auth/sign-up">
              <Button size="sm" className="font-semibold rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
                Join the Squad
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-muted-foreground hover:text-foreground min-h-[48px] min-w-[48px] flex items-center justify-center"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu - Full screen slide-over */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 bg-background z-40">
          <nav className="flex flex-col px-6 py-8 gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-lg font-medium py-4 min-h-[48px] flex items-center border-b border-border transition-colors ${
                  pathname === link.href 
                    ? "text-primary" 
                    : "text-foreground hover:text-primary"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex flex-col gap-3 pt-8">
              <Link href="/auth/sign-in" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="outline" size="lg" className="w-full justify-center text-foreground border-border hover:bg-secondary min-h-[48px]">
                  Sign In
                </Button>
              </Link>
              <Link href="/auth/sign-up" onClick={() => setMobileMenuOpen(false)}>
                <Button size="lg" className="w-full justify-center font-semibold rounded-full bg-primary text-primary-foreground hover:bg-primary/90 min-h-[48px]">
                  Join the Squad
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
