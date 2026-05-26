"use client"

import { useState } from "react"
import Link from "next/link"
import { ContactModal } from "@/components/contact-modal"

export function Footer() {
  const [isContactOpen, setIsContactOpen] = useState(false)

  return (
    <>
      <footer className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-4 text-center">
            <p className="text-sm text-muted-foreground max-w-xl">
              WealthForger — Free wealth education for everyone. Learn at your own pace, completely free.
            </p>

            <div className="flex items-center gap-6 text-sm">
              <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                About
              </Link>
              <button 
                onClick={() => setIsContactOpen(true)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Contact
              </button>
              <Link href="/about#mission" className="text-muted-foreground hover:text-foreground transition-colors">
                Mission
              </Link>
            </div>
          </div>
        </div>
      </footer>

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </>
  )
}
