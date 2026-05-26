"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { motion, AnimatePresence } from "framer-motion"
import { Trophy, Medal, Award } from "lucide-react"

interface LeaderboardEntry {
  id: string
  username: string
  score: number
  challenge_id: string
  created_at: string
}

export function RealtimeLeaderboard({ challengeId }: { challengeId: string }) {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient()

    // Initial fetch
    const fetchLeaderboard = async () => {
      const { data, error } = await supabase
        .from("leaderboard")
        .select("*")
        .eq("challenge_id", challengeId)
        .order("score", { ascending: false })
        .limit(10)

      if (!error && data) {
        setEntries(data)
      }
      setLoading(false)
    }

    fetchLeaderboard()

    // Real-time subscription
    const channel = supabase
      .channel(`leaderboard-${challengeId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "leaderboard",
          filter: `challenge_id=eq.${challengeId}`,
        },
        () => {
          // Refetch on any change
          fetchLeaderboard()
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [challengeId])

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Trophy className="w-5 h-5 text-gold" />
      case 1:
        return <Medal className="w-5 h-5 text-slate-300" />
      case 2:
        return <Award className="w-5 h-5 text-amber-600" />
      default:
        return <span className="w-5 h-5 flex items-center justify-center text-sm text-muted-foreground font-mono">{index + 1}</span>
    }
  }

  const getRankBg = (index: number) => {
    switch (index) {
      case 0:
        return "bg-gold/10 border-gold/30"
      case 1:
        return "bg-slate-300/10 border-slate-300/30"
      case 2:
        return "bg-amber-600/10 border-amber-600/30"
      default:
        return "bg-surface border-border"
    }
  }

  if (loading) {
    return (
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-16 bg-surface rounded-xl animate-pulse" />
        ))}
      </div>
    )
  }

  if (entries.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No entries yet. Be the first!</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <AnimatePresence mode="popLayout">
        {entries.map((entry, index) => (
          <motion.div
            key={entry.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            layout
            className={`flex items-center gap-4 p-4 rounded-xl border ${getRankBg(index)}`}
          >
            <div className="w-8 flex items-center justify-center">
              {getRankIcon(index)}
            </div>
            <div className="flex-1">
              <p className="font-semibold text-foreground">{entry.username}</p>
            </div>
            <div className="text-right">
              <p className="font-mono text-lg font-bold text-emerald">
                {entry.score.toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground">points</p>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
