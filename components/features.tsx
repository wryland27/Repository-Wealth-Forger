import { Mic, Swords, Wine, Building2 } from "lucide-react"
import Link from "next/link"

const pillars = [
  {
    icon: Mic,
    title: "Voice Covenant",
    description: "Speak your money mission. AI scores it. You own it.",
    href: "/covenant",
    color: "emerald",
  },
  {
    icon: Swords,
    title: "Deathmatch Arena",
    description: "12 competitions. Real money habits. Real leaderboards.",
    href: "/deathmatch",
    color: "gold",
  },
  {
    icon: Wine,
    title: "Cigar Lounge",
    description: "Chat with AI investing legends. They roast bad ideas.",
    href: "/cigar-lounge",
    color: "amethyst",
  },
  {
    icon: Building2,
    title: "Broker Arsenal",
    description: "One-click access to the best brokers for your age.",
    href: "/arsenal",
    color: "emerald",
  },
]

const colorStyles = {
  emerald: {
    bg: "bg-primary/10",
    text: "text-primary",
    hover: "group-hover:bg-primary group-hover:text-primary-foreground",
    border: "hover:border-primary/50",
  },
  gold: {
    bg: "bg-accent/10",
    text: "text-accent",
    hover: "group-hover:bg-accent group-hover:text-accent-foreground",
    border: "hover:border-accent/50",
  },
  amethyst: {
    bg: "bg-[#A855F7]/10",
    text: "text-[#A855F7]",
    hover: "group-hover:bg-[#A855F7] group-hover:text-white",
    border: "hover:border-[#A855F7]/50",
  },
}

export function Features() {
  return (
    <section id="features" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-primary">
            The Forge
          </span>
          <h2 className="mb-4 text-balance text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Four Ways to Build Wealth
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Real skills. Real competition. No lectures, no subscriptions.
          </p>
        </div>

        {/* 2x2 Pillar grid */}
        <div className="grid gap-6 sm:grid-cols-2">
          {pillars.map((pillar, index) => {
            const styles = colorStyles[pillar.color as keyof typeof colorStyles]
            return (
              <Link
                key={index}
                href={pillar.href}
                className={`group relative rounded-2xl border border-border bg-card p-8 transition-all ${styles.border}`}
              >
                <div className={`mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl ${styles.bg} ${styles.text} transition-colors ${styles.hover}`}>
                  <pillar.icon className="h-7 w-7" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-foreground">
                  {pillar.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {pillar.description}
                </p>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
