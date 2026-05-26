"use client"

import { motion } from "framer-motion"

// Placeholder data for recent covenant scores (anonymous)
const recentCovenants = [
  { score: 87, tier: "emerald" },
  { score: 72, tier: "gold" },
  { score: 91, tier: "emerald" },
]

const tierColors = {
  emerald: "bg-primary text-primary-foreground",
  gold: "bg-accent text-accent-foreground",
  amethyst: "bg-[#A855F7] text-white",
  obsidian: "bg-zinc-800 text-zinc-200",
}

export function LiveActivity() {
  return (
    <section className="border-y border-border bg-card/50 py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
            <span className="text-sm font-medium text-muted-foreground">Live Right Now</span>
          </div>
          
          <div className="flex items-center gap-4">
            {recentCovenants.map((covenant, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-2"
              >
                <span className={`inline-flex h-6 items-center rounded-full px-2 text-xs font-bold ${tierColors[covenant.tier as keyof typeof tierColors]}`}>
                  {covenant.score}/100
                </span>
                <span className="text-xs text-muted-foreground capitalize">{covenant.tier}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
