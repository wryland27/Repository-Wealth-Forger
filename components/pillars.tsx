"use client"

import Link from "next/link"
import { motion } from "framer-motion"

const pillars = [
  {
    icon: "🎙️",
    iconBg: "bg-emerald/10",
    title: "Voice Covenant",
    description: "Speak your money goals aloud. Our AI scores your commitment across 15 dimensions. Your personal wealth mission.",
    link: "/covenant",
    linkText: "Build yours",
    linkColor: "text-emerald",
    hoverBorder: "hover:border-emerald",
  },
  {
    icon: "🏆",
    iconBg: "bg-gold/10",
    title: "Challenges",
    description: "Compete in weekly financial literacy challenges. Budget tracking, saving streaks, investment quizzes. Climb the leaderboard.",
    link: "/challenges",
    linkText: "View challenges",
    linkColor: "text-gold",
    hoverBorder: "hover:border-gold",
  },
  {
    icon: "💬",
    iconBg: "bg-amethyst/10",
    title: "The Lounge",
    description: "Chat with AI versions of legendary investors like Buffett, Musk, and Cuban. Get real wisdom from the greatest minds.",
    link: "/lounge",
    linkText: "Start chatting",
    linkColor: "text-amethyst",
    hoverBorder: "hover:border-amethyst",
  },
  {
    icon: "🛠️",
    iconBg: "bg-blue/10",
    title: "Tools & Brokers",
    description: "Discover the best beginner-friendly brokers and investing tools, ranked honestly by our community.",
    link: "/arsenal",
    linkText: "Explore tools",
    linkColor: "text-blue",
    hoverBorder: "hover:border-blue",
  },
]

export function Pillars() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-emerald text-sm uppercase tracking-widest font-medium mb-3">
            FOUR WAYS TO LEARN
          </p>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-foreground">
            Everything you need to build real wealth
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Link
                href={pillar.link}
                className={`block h-full p-6 bg-card border border-border rounded-2xl transition-colors ${pillar.hoverBorder}`}
              >
                <div className={`w-12 h-12 ${pillar.iconBg} rounded-full flex items-center justify-center text-2xl mb-4`}>
                  {pillar.icon}
                </div>
                <h3 className="font-display font-bold text-xl text-foreground mb-2">
                  {pillar.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {pillar.description}
                </p>
                <span className={`text-sm font-medium ${pillar.linkColor}`}>
                  {pillar.linkText} →
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
