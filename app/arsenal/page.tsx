const brokers = [
  {
    slug: "fidelity-youth",
    name: "Fidelity Youth Account",
    badge: "BEST FOR UNDER 18",
    badgeColor: "bg-emerald/10 text-emerald",
    description: "Zero fees. No minimums. Parents co-manage. Best overall for anyone under 18 who wants a real brokerage account with training wheels built in.",
    note: "Requires parent/guardian for under 18",
  },
  {
    slug: "acorns",
    name: "Acorns",
    badge: "SET & FORGET",
    badgeColor: "bg-teal-400/10 text-teal-400",
    description: "Round-up investing. Every purchase rounds up to the nearest dollar and invests the difference. Best for people who know they won't manually invest.",
    note: null,
  },
  {
    slug: "robinhood",
    name: "Robinhood",
    badge: "BEST FOR ACTIVE",
    badgeColor: "bg-blue/10 text-blue",
    description: "Commission-free. Clean interface. Best for active traders 18+. No fractional bonds but strong for stocks and options once you know what you're doing.",
    note: "Must be 18+",
  },
  {
    slug: "coinbase",
    name: "Coinbase",
    badge: "BEST FOR CRYPTO",
    badgeColor: "bg-orange-500/10 text-orange-500",
    description: "Most regulated crypto exchange in the US. Best place to start if you want Bitcoin or Ethereum. Not for meme coins - for real accumulation.",
    note: "Must be 18+",
  },
]

export default function ArsenalPage() {
  return (
    <div className="px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="font-display font-black text-4xl sm:text-5xl text-foreground mb-4">
            Tools & Brokers
          </h1>
          <p className="text-muted-foreground text-lg">
            The best brokers for your age, recommended for beginners.
          </p>
        </div>

        {/* Info Notice */}
        <div className="bg-surface border-l-[3px] border-emerald rounded-r-xl p-4 mb-8">
          <p className="text-sm text-muted-foreground">
            These are brokers we recommend for beginners. Do your own research before opening any account.
          </p>
        </div>

        {/* Broker Cards */}
        <div className="grid sm:grid-cols-2 gap-6">
          {brokers.map((broker) => (
            <div
              key={broker.slug}
              className="bg-card border border-border rounded-2xl p-6 hover:border-blue transition-colors flex flex-col"
            >
              {/* Badge */}
              <span className={`inline-flex self-start items-center px-3 py-1 rounded-full text-xs font-semibold mb-4 ${broker.badgeColor}`}>
                {broker.badge}
              </span>

              {/* Title */}
              <h2 className="font-display font-bold text-xl text-foreground mb-3">
                {broker.name}
              </h2>

              {/* Description */}
              <p className="text-muted-foreground text-sm mb-4 flex-1">
                {broker.description}
              </p>

              {/* Learn More */}
              <p className="text-sm text-blue">
                Search for &quot;{broker.name}&quot; to learn more
              </p>

              {/* Note */}
              {broker.note && (
                <p className="text-xs text-muted-foreground text-center mt-3">
                  {broker.note}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
