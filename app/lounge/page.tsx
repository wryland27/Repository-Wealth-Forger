"use client"

import Link from "next/link"
import { motion } from "framer-motion"

const legends = [
  {
    slug: "buffett",
    name: "Warren Buffett",
    avatar: "💰",
    tagline: "Value investing. Plain English. No hype.",
    color: "bg-gold",
    hoverBorder: "hover:border-gold",
  },
  {
    slug: "musk",
    name: "Elon Musk",
    avatar: "🚀",
    tagline: "First principles thinking. Build the future. Move fast.",
    color: "bg-red-500",
    hoverBorder: "hover:border-red-500",
  },
  {
    slug: "saylor",
    name: "Michael Saylor",
    avatar: "₿",
    tagline: "Bitcoin maximalist. Long time horizon. Conviction above all.",
    color: "bg-orange-500",
    hoverBorder: "hover:border-orange-500",
  },
  {
    slug: "bezos",
    name: "Jeff Bezos",
    avatar: "📦",
    tagline: "Day one mindset. Customer obsession. Think long term.",
    color: "bg-amber-500",
    hoverBorder: "hover:border-amber-500",
  },
  {
    slug: "andreessen",
    name: "Marc Andreessen",
    avatar: "🖥️",
    tagline: "Software eats the world. Build or die.",
    color: "bg-blue",
    hoverBorder: "hover:border-blue",
  },
  {
    slug: "dalio",
    name: "Ray Dalio",
    avatar: "📊",
    tagline: "Principles. Cycles. Calm analytical thinking.",
    color: "bg-teal-400",
    hoverBorder: "hover:border-teal-400",
  },
  {
    slug: "cuban",
    name: "Mark Cuban",
    avatar: "🦈",
    tagline: "Hustle beats talent. Sales solves everything.",
    color: "bg-sky-500",
    hoverBorder: "hover:border-sky-500",
  },
  {
    slug: "ackman",
    name: "Bill Ackman",
    avatar: "📈",
    tagline: "Activist investing. High conviction bets. Speak your mind.",
    color: "bg-violet-500",
    hoverBorder: "hover:border-violet-500",
  },
]

export default function LoungePage() {
  return (
    <div className="px-4 py-12">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="font-display font-black text-4xl sm:text-5xl text-foreground mb-4">
            The Lounge
          </h1>
          <p className="text-muted-foreground text-lg">
            Chat with AI versions of legendary investors. Ask anything about wealth.
          </p>
        </div>

        {/* Legend Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {legends.map((legend, index) => (
            <motion.div
              key={legend.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.03 }}
            >
              <Link
                href={`/lounge/${legend.slug}`}
                className={`block h-full p-6 bg-card border border-border rounded-2xl transition-colors ${legend.hoverBorder}`}
              >
                <div className={`w-14 h-14 ${legend.color} rounded-full flex items-center justify-center text-2xl mb-4`}>
                  {legend.avatar}
                </div>
                <h2 className="font-display font-bold text-lg text-foreground mb-2">
                  {legend.name}
                </h2>
                <p className="text-muted-foreground text-sm leading-snug">
                  {legend.tagline}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
