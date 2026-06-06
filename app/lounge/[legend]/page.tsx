"use client"

import { useRef, useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Send, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"

const legends: Record<string, { name: string; avatar: string; color: string; greeting: string }> = {
  buffett: {
    name: "Warren Buffett",
    avatar: "💰",
    color: "bg-gold",
    greeting: "Hello there. What would you like to learn about investing today?",
  },
  musk: {
    name: "Elon Musk",
    avatar: "🚀",
    color: "bg-red-500",
    greeting: "The future is what we make it. What do you want to build?",
  },
  saylor: {
    name: "Michael Saylor",
    avatar: "₿",
    color: "bg-orange-500",
    greeting: "Let's talk about long-term thinking and digital assets. What's on your mind?",
  },
  bezos: {
    name: "Jeff Bezos",
    avatar: "📦",
    color: "bg-amber-500",
    greeting: "It's always Day 1. What are you working on?",
  },
  andreessen: {
    name: "Marc Andreessen",
    avatar: "🖥️",
    color: "bg-blue",
    greeting: "Technology is changing everything. What do you want to understand better?",
  },
  dalio: {
    name: "Ray Dalio",
    avatar: "📊",
    color: "bg-teal-400",
    greeting: "Everything works like a machine. What part of the economy would you like to understand?",
  },
  cuban: {
    name: "Mark Cuban",
    avatar: "🦈",
    color: "bg-sky-500",
    greeting: "Hard work beats talent when talent doesn't work hard. What's your goal?",
  },
  ackman: {
    name: "Bill Ackman",
    avatar: "📈",
    color: "bg-violet-500",
    greeting: "Great investing requires conviction and patience. What would you like to discuss?",
  },
}

function getMessageText(msg: { parts?: Array<{ type: string; text?: string }> }): string {
  if (!msg.parts || !Array.isArray(msg.parts)) return ""
  return msg.parts
    .filter((p) => p.type === "text")
    .map((p) => p.text || "")
    .join("")
}

export default function LegendChatPage() {
  const params = useParams()
  const legendSlug = params.legend as string
  const legend = legends[legendSlug]
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [input, setInput] = useState("")

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/mentor",
      prepareSendMessagesRequest: ({ messages }) => ({
        body: { messages, mentor: legendSlug },
      }),
    }),
  })

  const isLoading = status === "streaming" || status === "submitted"

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return
    sendMessage({ text: input })
    setInput("")
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  if (!legend) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-muted-foreground">Legend not found.</p>
        <Link href="/lounge" className="mt-4 text-emerald hover:underline">
          Back to Lounge
        </Link>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      {/* Chat Header */}
      <div className="border-b border-border bg-surface px-4 py-3">
        <div className="max-w-3xl mx-auto flex items-center gap-4">
          <Link href="/lounge">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
          </Link>
          <div className={`h-10 w-10 rounded-full ${legend.color} flex items-center justify-center text-lg`}>
            {legend.avatar}
          </div>
          <span className="font-display font-bold text-foreground">{legend.name}</span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-3xl mx-auto space-y-4">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {message.role === "assistant" && (
                <div className={`h-8 w-8 rounded-full ${legend.color} flex items-center justify-center text-sm mr-2 flex-shrink-0`}>
                  {legend.avatar}
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-xl px-4 py-3 ${
                  message.role === "user"
                    ? "bg-emerald text-black"
                    : "bg-surface border border-border text-foreground"
                }`}
              >
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
              </div>
            </motion.div>
          ))}
          
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className={`h-8 w-8 rounded-full ${legend.color} flex items-center justify-center text-sm mr-2`}>
                {legend.avatar}
              </div>
              <div className="bg-surface border border-border rounded-xl px-4 py-3">
                <div className="flex gap-1">
                  <span className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </motion.div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="border-t border-border bg-surface px-4 py-4">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="flex gap-3">
            <textarea
              value={input || ""}
              onChange={handleInputChange}
              placeholder={`Ask ${legend.name.split(" ")[0]} a question...`}
              className="flex-1 rounded-xl border border-border bg-surface px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-emerald resize-none"
              rows={1}
              disabled={isLoading}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault()
                  handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>)
                }
              }}
            />
            <Button
              type="submit"
              size="icon"
              className="h-11 w-11 rounded-xl bg-emerald text-black hover:bg-emerald/90"
              disabled={!input?.trim() || isLoading}
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Send className="h-5 w-5" />
              )}
            </Button>
          </form>
          <p className="mt-2 text-center text-xs text-muted-foreground">
            AI personas for educational purposes only. Not financial advice.
          </p>
        </div>
      </div>
    </div>
  )
}
