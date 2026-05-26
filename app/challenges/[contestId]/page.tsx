"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Trophy, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { RealtimeLeaderboard } from "@/components/realtime-leaderboard"

const contestsData: Record<string, {
  title: string
  prize: string
  endsIn: string
}> = {
  "budget-basics": {
    title: "Budget Basics Challenge",
    prize: "500 Points + Gold Badge",
    endsIn: "2 days 14 hours",
  },
  "savings-sprint": {
    title: "Savings Sprint",
    prize: "Champion Badge",
    endsIn: "5 days",
  },
}

export default function LeaderboardPage() {
  const params = useParams()
  const contestId = params.contestId as string
  const contest = contestsData[contestId] || contestsData["budget-basics"]

  return (
    <div className="px-4 py-12">
      <div className="max-w-3xl mx-auto">
        {/* Back Link */}
        <Link href="/challenges">
          <Button variant="ghost" size="sm" className="gap-2 mb-6">
            <ArrowLeft className="h-4 w-4" />
            Back to Challenges
          </Button>
        </Link>

        {/* Contest Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <h1 className="font-display font-black text-3xl sm:text-4xl text-foreground">
            {contest.title}
          </h1>
          <div className="flex items-center gap-4 text-sm">
            <span className="flex items-center gap-2 text-gold">
              <Trophy className="h-4 w-4" />
              {contest.prize}
            </span>
            <span className="flex items-center gap-2 text-muted-foreground">
              <Clock className="h-4 w-4" />
              {contest.endsIn}
            </span>
          </div>
        </div>

        {/* Real-time Leaderboard */}
        <RealtimeLeaderboard challengeId={contestId} />

        {/* Your Rank */}
        <div className="mt-6 p-4 bg-surface border border-border rounded-xl flex items-center justify-between">
          <span className="text-muted-foreground">Your Rank</span>
          <span className="text-foreground font-medium">Sign in to compete</span>
        </div>
      </div>
    </div>
  )
}
