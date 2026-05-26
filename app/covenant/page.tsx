"use client"

import { useState, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Mic, Square, Loader2, AlertCircle, Save, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

type CovenantTier = "emerald" | "gold" | "amethyst" | "obsidian"

interface CovenantResult {
  score: number
  tier: CovenantTier
  covenant: string
}

interface NextStepItemProps {
  number: number
  title: string
  description: string
  href?: string
  onClick?: () => void
}

function NextStepItem({ number, title, description, href, onClick }: NextStepItemProps) {
  const content = (
    <div className="flex items-start gap-4 p-4 rounded-xl bg-surface border border-border hover:border-emerald/50 transition-colors group cursor-pointer">
      <div className="w-8 h-8 rounded-full bg-emerald/10 flex items-center justify-center shrink-0">
        <span className="font-mono font-bold text-emerald text-sm">{number}</span>
      </div>
      <div className="flex-1">
        <h4 className="font-semibold text-foreground mb-1">{title}</h4>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-emerald transition-colors shrink-0 mt-1" />
    </div>
  )

  if (href) {
    return <Link href={href}>{content}</Link>
  }

  return <button onClick={onClick} className="w-full text-left">{content}</button>
}

const tierConfig = {
  emerald: { label: "Emerald", range: "85-100", color: "bg-emerald", textColor: "text-emerald", icon: "🟢" },
  gold: { label: "Gold", range: "70-84", color: "bg-gold", textColor: "text-gold", icon: "🟡" },
  amethyst: { label: "Amethyst", range: "55-69", color: "bg-amethyst", textColor: "text-amethyst", icon: "🟣" },
  obsidian: { label: "Obsidian", range: "0-54", color: "bg-zinc-600", textColor: "text-zinc-400", icon: "⚫" },
}

export default function CovenantPage() {
  const [isRecording, setIsRecording] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<CovenantResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [browserSupported, setBrowserSupported] = useState(true)
  const recognitionRef = useRef<SpeechRecognition | null>(null)

  const startRecording = useCallback(() => {
    setError(null)
    setTranscript("")
    setResult(null)

    if (typeof window === "undefined") return

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    
    if (!SpeechRecognition) {
      setBrowserSupported(false)
      return
    }

    const recognition = new SpeechRecognition()
    recognition.continuous = true
    recognition.interimResults = true
    recognition.lang = "en-US"

    recognition.onresult = (event) => {
      let finalTranscript = ""
      for (let i = 0; i < event.results.length; i++) {
        finalTranscript += event.results[i][0].transcript
      }
      setTranscript(finalTranscript)
    }

    recognition.onerror = (event) => {
      if (event.error === "not-allowed") {
        setError("Microphone access denied. Please allow microphone permissions and try again.")
      } else {
        setError("An error occurred with speech recognition. Please try again.")
      }
      setIsRecording(false)
    }

    recognition.onend = () => {
      setIsRecording(false)
    }

    recognitionRef.current = recognition
    recognition.start()
    setIsRecording(true)
  }, [])

  const stopRecording = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
      setIsRecording(false)
    }
  }, [])

  const scoreCovenantMock = useCallback(async () => {
    if (!transcript.trim()) {
      setError("Please record your covenant first.")
      return
    }

    setIsLoading(true)
    setError(null)

    await new Promise(resolve => setTimeout(resolve, 2000))

    const wordCount = transcript.trim().split(/\s+/).length
    let score = Math.min(100, Math.max(30, 40 + wordCount * 2 + Math.random() * 20))
    score = Math.round(score)

    let tier: CovenantTier
    if (score >= 85) tier = "emerald"
    else if (score >= 70) tier = "gold"
    else if (score >= 55) tier = "amethyst"
    else tier = "obsidian"

    setResult({
      score,
      tier,
      covenant: `I commit to building wealth by ${transcript.toLowerCase().includes("save") ? "saving consistently" : "investing wisely"} and making informed financial decisions. My goal is to achieve financial independence through disciplined habits and continuous learning.`,
    })
    setIsLoading(false)
  }, [transcript])

  const resetCovenant = () => {
    setTranscript("")
    setResult(null)
    setError(null)
  }

  return (
    <div className="min-h-screen px-4 py-12">
      <div className="max-w-[680px] mx-auto">
        <AnimatePresence mode="wait">
          {result ? (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-center"
            >
              {/* Result Card */}
              <div className="border-2 border-emerald rounded-[20px] p-8 mb-8">
                {/* Tier Badge */}
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${tierConfig[result.tier].color} text-black font-bold mb-6`}>
                  {tierConfig[result.tier].icon} {tierConfig[result.tier].label}
                </div>

                {/* Score */}
                <div className="mb-6">
                  <span className="font-mono text-7xl font-bold text-emerald">
                    {result.score}
                  </span>
                  <span className="text-3xl text-muted-foreground">/100</span>
                </div>

                {/* Covenant Text */}
                <p className="text-muted-foreground italic leading-relaxed mb-8">
                  {result.covenant}
                </p>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild className="bg-emerald text-black font-bold rounded-full hover:bg-emerald/90">
                    <Link href="/sign-up">
                      <Save className="mr-2 h-5 w-5" />
                      Save Covenant
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="rounded-full"
                    onClick={resetCovenant}
                  >
                    Try Again
                  </Button>
                </div>
              </div>

              {/* Personalized Next Steps */}
              <div className="bg-card border border-border rounded-2xl p-6 mt-8">
                <h3 className="font-display font-bold text-xl text-foreground mb-4">
                  Your Next Steps
                </h3>
                <div className="space-y-4">
                  {result.tier === "emerald" && (
                    <>
                      <NextStepItem 
                        number={1} 
                        title="Challenge yourself" 
                        description="Your goals are solid. Test your knowledge in a Deathmatch challenge."
                        href="/challenges"
                      />
                      <NextStepItem 
                        number={2} 
                        title="Talk to the legends" 
                        description="Get wisdom from AI mentors like Warren Buffett in the Lounge."
                        href="/lounge"
                      />
                      <NextStepItem 
                        number={3} 
                        title="Open a real account" 
                        description="Ready to invest? Check out our recommended brokers."
                        href="/arsenal"
                      />
                    </>
                  )}
                  {result.tier === "gold" && (
                    <>
                      <NextStepItem 
                        number={1} 
                        title="Refine your knowledge" 
                        description="Ask our AI assistant questions to deepen your understanding."
                        href="/#ask-ai"
                      />
                      <NextStepItem 
                        number={2} 
                        title="Learn from the best" 
                        description="Chat with AI mentors in the Lounge to sharpen your mindset."
                        href="/lounge"
                      />
                      <NextStepItem 
                        number={3} 
                        title="Compete and learn" 
                        description="Join a challenge to test what you know."
                        href="/challenges"
                      />
                    </>
                  )}
                  {(result.tier === "amethyst" || result.tier === "obsidian") && (
                    <>
                      <NextStepItem 
                        number={1} 
                        title="Start with the basics" 
                        description="Ask our AI assistant about budgeting and saving fundamentals."
                        href="/#ask-ai"
                      />
                      <NextStepItem 
                        number={2} 
                        title="Get inspired" 
                        description="Talk to Warren Buffett AI to understand long-term thinking."
                        href="/lounge/buffett"
                      />
                      <NextStepItem 
                        number={3} 
                        title="Set a clear goal" 
                        description="Try recording your covenant again with a specific money goal."
                        onClick={resetCovenant}
                      />
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="recorder"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center"
            >
              {/* Header */}
              <h1 className="font-display font-black text-4xl sm:text-5xl text-foreground mb-4">
                What Is Your Goal?
              </h1>
              <p className="text-muted-foreground mb-12">
                60 seconds. No second takes. Tell the truth.
              </p>

              {/* Fallback for unsupported browsers */}
              {!browserSupported && (
                <div className="bg-card border border-border rounded-xl p-6 mb-8">
                  <div className="flex items-center gap-3 mb-4 justify-center">
                    <AlertCircle className="h-5 w-5 text-gold" />
                    <span className="font-medium text-foreground">Voice not supported on this browser</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Type your covenant below instead.
                  </p>
                  <textarea
                    className="w-full h-32 rounded-xl border border-border bg-surface p-4 text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-emerald"
                    placeholder="Type your money mission here..."
                    value={transcript}
                    onChange={(e) => setTranscript(e.target.value)}
                  />
                </div>
              )}

              {/* Mic Button */}
              {browserSupported && (
                <div className="mb-8">
                  <button
                    onClick={isRecording ? stopRecording : startRecording}
                    disabled={isLoading}
                    className={`relative h-[120px] w-[120px] rounded-full transition-all ${
                      isRecording
                        ? "bg-destructive"
                        : "bg-emerald hover:bg-emerald/90"
                    }`}
                  >
                    {isRecording && (
                      <span className="absolute inset-0 animate-pulse-ring rounded-full bg-destructive" />
                    )}
                    <span className="relative flex items-center justify-center">
                      {isRecording ? (
                        <Square className="h-10 w-10 text-white" />
                      ) : (
                        <Mic className="h-10 w-10 text-black" />
                      )}
                    </span>
                  </button>
                  <p className="mt-4 text-sm text-muted-foreground">
                    {isRecording ? "Recording... Click to stop" : "Click to start recording"}
                  </p>
                </div>
              )}

              {/* Transcript Display */}
              {transcript && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-surface border border-border rounded-xl p-6 mb-8 text-left"
                >
                  <p className="text-muted-foreground italic">{transcript}</p>
                </motion.div>
              )}

              {/* Error Display */}
              {error && (
                <div className="rounded-xl border border-destructive/50 bg-destructive/10 p-4 mb-8">
                  <p className="text-sm text-destructive">{error}</p>
                </div>
              )}

              {/* Submit Button */}
              {transcript && !isRecording && (
                <Button
                  size="lg"
                  onClick={scoreCovenantMock}
                  disabled={isLoading}
                  className="bg-gold text-black font-bold rounded-full hover:bg-gold/90 mb-12"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Scoring your covenant...
                    </>
                  ) : (
                    "Get My Covenant"
                  )}
                </Button>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tier Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8">
          {(Object.keys(tierConfig) as CovenantTier[]).map((tier) => (
            <div
              key={tier}
              className="bg-card border border-border rounded-xl p-4 text-center"
            >
              <span className="text-2xl">{tierConfig[tier].icon}</span>
              <p className={`font-bold ${tierConfig[tier].textColor} mt-1`}>
                {tierConfig[tier].label}
              </p>
              <p className="text-xs text-muted-foreground">
                {tierConfig[tier].range}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
