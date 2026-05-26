"use client"

import { useChat } from "@ai-sdk/react"
import { Send, Loader2, Bot } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function AskAI() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/chat",
  })

  return (
    <section className="py-16 px-4">
      <div className="max-w-[680px] mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue/10 text-blue text-sm font-medium mb-4">
            <Bot className="h-4 w-4" />
            AI Assistant
          </div>
          <h2 className="font-display font-bold text-3xl text-foreground mb-2">
            Ask Anything About Money
          </h2>
          <p className="text-muted-foreground">
            Have a question? Our AI assistant is here to help you learn.
          </p>
        </div>

        {/* Chat Container */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          {/* Messages */}
          <div className="min-h-[200px] max-h-[400px] overflow-y-auto p-4 space-y-4">
            {messages.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground text-sm">
                  Ask a question about saving, investing, budgeting, or anything money-related.
                </p>
                <div className="flex flex-wrap gap-2 justify-center mt-4">
                  {["What is investing?", "How do I budget?", "What is compound interest?"].map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => {
                        handleInputChange({ target: { value: suggestion } } as React.ChangeEvent<HTMLInputElement>)
                      }}
                      className="px-3 py-1.5 text-sm bg-surface border border-border rounded-full text-muted-foreground hover:text-foreground hover:border-emerald transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] px-4 py-3 rounded-2xl ${
                      msg.role === "user"
                        ? "bg-emerald text-black"
                        : "bg-surface border border-border text-foreground"
                    }`}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                  </div>
                </div>
              ))
            )}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-surface border border-border px-4 py-3 rounded-2xl">
                  <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="border-t border-border p-4">
            <div className="flex gap-2">
              <Input
                type="text"
                value={input || ""}
                onChange={handleInputChange}
                placeholder="Type your question..."
                className="flex-1 rounded-full bg-surface border-border"
                disabled={isLoading}
              />
              <Button
                type="submit"
                size="icon"
                disabled={!input?.trim() || isLoading}
                className="rounded-full bg-emerald text-black hover:bg-emerald/90 shrink-0"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </div>

        <p className="text-xs text-muted-foreground text-center mt-4">
          This AI provides general educational information, not financial advice.
        </p>
      </div>
    </section>
  )
}
