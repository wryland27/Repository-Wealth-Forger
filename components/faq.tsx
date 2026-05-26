"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

const faqs = [
  {
    question: "Is WealthForger really free?",
    answer: "Yes, completely free. No subscriptions, no hidden fees, no paywalls. All of our educational content, challenges, and tools are available to everyone at no cost.",
  },
  {
    question: "How old do I need to be to join?",
    answer: "WealthForger is designed for learners 15 and up. Some broker features may require a parent or guardian for users under 18, which we clearly indicate throughout the platform.",
  },
  {
    question: "Do I need any prior knowledge about money or investing?",
    answer: "Not at all. WealthForger is built for complete beginners. We start with the basics and guide you step by step. Whether you know nothing about money or just want to learn more, you're in the right place.",
  },
  {
    question: "What will I actually learn here?",
    answer: "You'll learn practical money skills: budgeting, saving, understanding compound interest, how the stock market works, building good financial habits, and more. Everything is designed to be useful in real life.",
  },
  {
    question: "How do the challenges work?",
    answer: "Challenges are friendly competitions where you test your knowledge against other learners. Complete quizzes, earn points, and climb the leaderboard. It's a fun way to stay motivated and see how much you've learned.",
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="py-20 px-4">
      <div className="max-w-2xl mx-auto">
        <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-foreground text-center mb-12">
          Questions? Answered.
        </h2>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-border rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-4 text-left bg-card hover:bg-surface transition-colors"
              >
                <span className="font-medium text-foreground">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-muted-foreground transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-96" : "max-h-0"
                }`}
              >
                <p className="p-4 pt-0 text-muted-foreground text-sm leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
