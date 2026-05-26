import { Hero } from "@/components/hero"
import { Pillars } from "@/components/pillars"
import { FAQ } from "@/components/faq"
import { AskAI } from "@/components/ask-ai"

export default function Home() {
  return (
    <>
      <Hero />
      <Pillars />
      <FAQ />
      <AskAI />
    </>
  )
}
