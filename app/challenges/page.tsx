"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Bell, X, Check } from "lucide-react"

const contests = [
  {
    id: "budget-basics",
    title: "Budget Basics Challenge",
    status: "live",
    endsIn: "2 days 14 hours",
    description: "Track your spending for 7 days and learn to categorize every expense.",
    prize: "500 Points + Gold Badge",
  },
  {
    id: "savings-sprint",
    title: "Savings Sprint",
    status: "live",
    endsIn: "5 days",
    description: "Save the highest percentage of your income this week. Every dollar counts.",
    prize: "Champion Badge",
  },
  {
    id: "investment-quiz",
    title: "Investment IQ Challenge",
    status: "upcoming",
    startsIn: "3 days",
    description: "Test your knowledge with 50 questions about stocks, bonds, and investing.",
    prize: "1000 Points",
  },
  {
    id: "save-streak",
    title: "30-Day Save Streak",
    status: "upcoming",
    startsIn: "6 days",
    description: "Build a habit by saving at least $1 every day for 30 consecutive days.",
    prize: "Legend Badge",
  },
]

export default function ChallengesPage() {
  const [notifyModal, setNotifyModal] = useState<string | null>(null)
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState<string[]>([])

  const handleNotify = (contestId: string) => {
    setNotifyModal(contestId)
    setEmail("")
  }

  const handleSubmitNotify = (e: React.FormEvent) => {
    e.preventDefault()
    if (email && notifyModal) {
      setSubmitted([...submitted, notifyModal])
      setNotifyModal(null)
      setEmail("")
    }
  }

  return (
    <div className="px-4 py-12">
      {/* Notification Modal */}
      <AnimatePresence>
        {notifyModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
            onClick={() => setNotifyModal(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-card border border-border rounded-2xl p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                    <Bell className="w-5 h-5 text-gold" />
                  </div>
                  <h3 className="font-display font-bold text-xl text-foreground">
                    Get Notified
                  </h3>
                </div>
                <button
                  onClick={() => setNotifyModal(null)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <p className="text-muted-foreground text-sm mb-6">
                Enter your email and we will notify you when{" "}
                <span className="text-foreground font-medium">
                  {contests.find(c => c.id === notifyModal)?.title}
                </span>{" "}
                goes live.
              </p>

              <form onSubmit={handleSubmitNotify} className="space-y-4">
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-background border-border rounded-xl"
                />
                <Button
                  type="submit"
                  className="w-full rounded-full bg-gold text-black font-bold hover:bg-gold/90"
                >
                  Notify Me
                </Button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="font-display font-black text-4xl sm:text-5xl text-foreground mb-4">
            Challenges
          </h1>
          <p className="text-muted-foreground text-lg">
            Build real money habits. Compete with others. Climb the leaderboard.
          </p>
        </div>

        {/* Contest Cards */}
        <div className="grid sm:grid-cols-2 gap-6">
          {contests.map((contest, index) => (
            <motion.div
              key={contest.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-card border border-border rounded-2xl p-6 hover:border-gold transition-colors hover:-translate-y-0.5"
            >
              {/* Status Badge */}
              <div className="flex items-center gap-2 mb-4">
                {contest.status === "live" ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald/10 text-emerald text-xs font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald animate-pulse" />
                    LIVE
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/10 text-gold text-xs font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                    COMING SOON
                  </span>
                )}
              </div>

              {/* Title */}
              <h2 className="font-display font-bold text-xl text-foreground mb-2">
                {contest.title}
              </h2>

              {/* Meta */}
              <p className="text-sm text-muted-foreground mb-3">
                {contest.status === "live" 
                  ? `Ends in ${contest.endsIn}` 
                  : `Starts in ${contest.startsIn}`
                }
              </p>

              {/* Description */}
              <p className="text-muted-foreground text-sm mb-4">
                {contest.description}
              </p>

              {/* Prize */}
              <p className="text-gold text-sm font-medium mb-6">
                Prize: {contest.prize}
              </p>

              {/* CTA */}
              {contest.status === "live" ? (
                <Button asChild className="w-full rounded-full bg-emerald text-black font-bold hover:bg-emerald/90">
                  <Link href={`/challenges/${contest.id}`}>View Leaderboard</Link>
                </Button>
              ) : submitted.includes(contest.id) ? (
                <Button variant="outline" className="w-full rounded-full border-emerald text-emerald" disabled>
                  <Check className="w-4 h-4 mr-2" />
                  Notification Set
                </Button>
              ) : (
                <Button 
                  variant="outline" 
                  className="w-full rounded-full hover:border-gold hover:text-gold"
                  onClick={() => handleNotify(contest.id)}
                >
                  <Bell className="w-4 h-4 mr-2" />
                  Get Notified
                </Button>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
