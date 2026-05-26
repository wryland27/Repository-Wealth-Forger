import Link from "next/link"
import { Swords, User, Trophy, Scroll } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function ProfilePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center px-4 pt-24 pb-12">
        <div className="w-full max-w-md text-center">
          {/* Coming Soon Card */}
          <div className="rounded-2xl border border-border bg-card p-8">
            <div className="mx-auto mb-6 h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-8 w-8 text-primary" />
            </div>
            
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Profile Coming Soon
            </h1>
            <p className="text-muted-foreground mb-8">
              Sign up to claim your squad rank and track your progress.
            </p>

            {/* Preview Features */}
            <div className="space-y-4 mb-8 text-left">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary">
                <Scroll className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm font-medium text-foreground">Covenant History</p>
                  <p className="text-xs text-muted-foreground">View all your past covenants</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary">
                <Trophy className="h-5 w-5 text-accent" />
                <div>
                  <p className="text-sm font-medium text-foreground">Badges and Rank</p>
                  <p className="text-xs text-muted-foreground">Earn badges and climb the ranks</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary">
                <Swords className="h-5 w-5 text-[#A855F7]" />
                <div>
                  <p className="text-sm font-medium text-foreground">Deathmatch Stats</p>
                  <p className="text-xs text-muted-foreground">Track your competition results</p>
                </div>
              </div>
            </div>

            <Link href="/auth/sign-up">
              <Button className="w-full h-12 rounded-full bg-primary font-bold text-primary-foreground">
                Join the Squad
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
