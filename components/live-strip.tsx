"use client"

const activities = [
  "Alex just completed the Budgeting Basics challenge",
  "Morgan earned 500 points this week",
  "Jordan recorded their first Voice Covenant",
  "Taylor chatted with Warren Buffett in the Lounge",
  "Riley opened their first investment account",
  "Casey reached Gold tier on their covenant",
  "Drew finished the Investing 101 challenge",
  "Quinn joined the WealthForger community",
]

export function LiveStrip() {
  const doubledActivities = [...activities, ...activities]

  return (
    <div className="border-y border-border bg-surface/50 py-3 overflow-hidden">
      <div className="animate-scroll-left flex whitespace-nowrap">
        {doubledActivities.map((activity, index) => (
          <div
            key={index}
            className="inline-flex items-center gap-2 px-4 py-1.5 mx-2 bg-card rounded-full border border-border text-sm"
          >
            <span className="w-2 h-2 bg-emerald rounded-full animate-pulse" />
            <span className="text-muted-foreground">{activity}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
