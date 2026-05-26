export default function AboutPage() {
  return (
    <div className="px-4 py-12">
      <div className="max-w-[760px] mx-auto">
        {/* Headline */}
        <h1 className="font-display font-black text-4xl sm:text-5xl text-foreground mb-8">
          We Built This Because Nobody Taught Us
        </h1>

        {/* Lead */}
        <div className="border-l-[3px] border-emerald pl-6 mb-12">
          <p className="text-lg text-muted-foreground leading-relaxed">
            WealthForger was built for people who never had a trusted, free place to learn how money actually works.
          </p>
        </div>

        {/* Our Mission */}
        <section className="mb-12" id="mission">
          <h2 className="font-display font-bold text-2xl text-foreground mb-4">Our Mission</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              We believe financial literacy is a right, not a privilege. Too many young people grow up without understanding how money works, how to build wealth, or how to protect themselves from bad financial decisions.
            </p>
            <p>
              WealthForger exists to change that. We created a platform where anyone can learn the fundamentals of investing, test their knowledge against others, and get advice from AI versions of the greatest financial minds - all for free.
            </p>
            <p>
              No subscriptions. No paywalls. No selling your data. Just free education for anyone who wants to learn.
            </p>
          </div>
        </section>

        {/* What We Believe */}
        <section className="mb-12">
          <h2 className="font-display font-bold text-2xl text-foreground mb-6">What We Believe</h2>
          <div className="space-y-4">
            <div className="bg-surface border-l-[3px] border-emerald rounded-r-xl p-4">
              <p className="text-foreground">
                Wealth education should be free. If it costs money to learn how money works, the system is rigged against the people who need it most.
              </p>
            </div>
            <div className="bg-surface border-l-[3px] border-emerald rounded-r-xl p-4">
              <p className="text-foreground">
                Competition makes learning stick. You remember the leaderboard. You don&apos;t remember the textbook.
              </p>
            </div>
            <div className="bg-surface border-l-[3px] border-emerald rounded-r-xl p-4">
              <p className="text-foreground">
                No subscriptions, no ads, no data selling. We earn only when we deliver verified results to broker partners. That&apos;s the deal.
              </p>
            </div>
            <div className="bg-surface border-l-[3px] border-emerald rounded-r-xl p-4">
              <p className="text-foreground">
                Real advice, not hype. The Cigar Lounge exists because finance influencers lie. The legends don&apos;t.
              </p>
            </div>
          </div>
        </section>


      </div>
    </div>
  )
}
