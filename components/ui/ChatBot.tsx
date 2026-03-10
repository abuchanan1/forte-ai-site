'use client'

import { useState, useRef, useEffect } from 'react'
import { m, AnimatePresence } from 'framer-motion'

interface Message {
  role: 'bot' | 'user'
  content: string
}

type ChatStep = 'greeting' | 'name' | 'email' | 'need' | 'complete' | 'freeChat'

interface LeadData {
  name: string
  email: string
  need: string
}

const GREETING_MESSAGE = "Hi there! I'm Forte's AI assistant. I can help you learn about our data intelligence solutions, or connect you with our team. Would you like to tell me about what you're looking for?"

const STEP_PROMPTS: { [key: string]: string } = {
  name: "Great! To connect you with the right person, what's your name?",
  email: "Thanks! And what's the best email to reach you at?",
  need: "Perfect. In a sentence or two, what data challenge is your organization facing right now?",
  complete: "Thanks! I've captured your info and our team will reach out within one business day. In the meantime, feel free to ask me anything about Forte's services!",
}

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', content: GREETING_MESSAGE },
  ])
  const [input, setInput] = useState('')
  const [step, setStep] = useState<ChatStep>('greeting')
  const [leadData, setLeadData] = useState<LeadData>({ name: '', email: '', need: '' })
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }, [isOpen])

  async function handleSend() {
    if (!input.trim()) return
    const userMsg = input.trim()
    setInput('')
    setMessages((prev) => [...prev, { role: 'user', content: userMsg }])
    setIsTyping(true)

    // Small delay for natural feel
    await new Promise((r) => setTimeout(r, 600))

    let botResponse = ''

    switch (step) {
      case 'greeting':
        setStep('name')
        botResponse = STEP_PROMPTS['name'] ?? ''
        break
      case 'name':
        setLeadData((prev) => ({ ...prev, name: userMsg }))
        setStep('email')
        botResponse = STEP_PROMPTS['email'] ?? ''
        break
      case 'email': {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(userMsg)) {
          botResponse = "That doesn't look like a valid email. Could you double-check and try again?"
          break
        }
        setLeadData((prev) => ({ ...prev, email: userMsg }))
        setStep('need')
        botResponse = STEP_PROMPTS['need'] ?? ''
        break
      }
      case 'need':
        setLeadData((prev) => ({ ...prev, need: userMsg }))
        setStep('complete')
        botResponse = STEP_PROMPTS['complete'] ?? ''
        // Submit lead data
        try {
          await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: leadData.name,
              email: leadData.email,
              company: '',
              message: `[Chatbot Lead] ${userMsg}`,
            }),
          })
        } catch {
          // Silently fail - lead data is shown in chat
        }
        setStep('freeChat')
        break
      case 'complete':
      case 'freeChat':
        botResponse = getSmartResponse(userMsg)
        break
    }

    setIsTyping(false)
    setMessages((prev) => [...prev, { role: 'bot', content: botResponse }])
  }

  return (
    <>
      {/* Toggle Button */}
      <m.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-brass shadow-[0_4px_24px_rgba(160,120,64,0.4)] transition-all hover:shadow-[0_4px_32px_rgba(160,120,64,0.6)] hover:scale-105"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <m.svg key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }} width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M4 4l12 12M16 4L4 16" stroke="#060E1C" strokeWidth="2" strokeLinecap="round" />
            </m.svg>
          ) : (
            <m.svg key="chat" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }} transition={{ duration: 0.2 }} width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" stroke="#060E1C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </m.svg>
          )}
        </AnimatePresence>
      </m.button>

      {/* Notification dot */}
      {!isOpen && (
        <m.div
          className="fixed bottom-[4.5rem] right-6 z-50 h-3 w-3 rounded-full bg-green-400"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
        />
      )}

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <m.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-24 right-6 z-50 flex h-[480px] w-[380px] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-lg border border-brass/20 bg-navy-deep shadow-[0_16px_48px_rgba(0,0,0,0.5)]"
          >
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-brass/15 bg-navy-mid px-4 py-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brass/20">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="6" stroke="#C49A58" strokeWidth="1.5" />
                  <circle cx="8" cy="8" r="2" fill="#C49A58" />
                </svg>
              </div>
              <div>
                <p className="font-body text-sm font-medium text-white">Forte AI Assistant</p>
                <p className="font-body text-[10px] text-brass-light">Online now</p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
              {messages.map((msg, i) => (
                <m.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg px-3 py-2 font-body text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-brass/20 text-white'
                        : 'bg-navy-mid border border-brass/10 text-white/80'
                    }`}
                  >
                    {msg.content}
                  </div>
                </m.div>
              ))}
              {isTyping && (
                <m.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="flex gap-1 rounded-lg bg-navy-mid border border-brass/10 px-4 py-3">
                    <m.span className="h-2 w-2 rounded-full bg-brass/50" animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} />
                    <m.span className="h-2 w-2 rounded-full bg-brass/50" animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.15 }} />
                    <m.span className="h-2 w-2 rounded-full bg-brass/50" animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.3 }} />
                  </div>
                </m.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t border-brass/15 bg-navy-mid px-3 py-3">
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  handleSend()
                }}
                className="flex gap-2"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={step === 'email' ? 'your@email.com' : 'Type a message...'}
                  className="flex-1 rounded bg-navy-deep border border-brass/15 px-3 py-2 font-body text-sm text-white placeholder-white/30 outline-none focus:border-brass/40 transition-colors"
                />
                <button
                  type="submit"
                  disabled={!input.trim()}
                  className="flex h-9 w-9 items-center justify-center rounded bg-brass text-navy-deep transition-all hover:shadow-[0_0_12px_rgba(160,120,64,0.3)] disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M14 2L7 9M14 2L10 14L7 9M14 2L2 6L7 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </form>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  )
}

function getSmartResponse(input: string): string {
  const lower = input.toLowerCase()

  if (lower.includes('price') || lower.includes('cost') || lower.includes('pricing')) {
    return "Forte's pricing depends on the scope of your engagement. Most projects start with a discovery call where we assess your needs and provide a clear estimate. There are no hidden fees, and you own everything we build."
  }
  if (lower.includes('how long') || lower.includes('timeline') || lower.includes('time')) {
    return "Most Forte engagements go live within 12 weeks from kickoff. The exact timeline depends on the complexity of your existing data systems and the scope of work."
  }
  if (lower.includes('pipeline') || lower.includes('data') || lower.includes('integration')) {
    return "Our Data Pipeline & Integration service connects your siloed systems into a single, clean data infrastructure. We automate the manual exports and transfers that slow your team down. Want to learn more? Visit our Solutions page!"
  }
  if (lower.includes('dashboard') || lower.includes('report')) {
    return "Our AI Dashboards surface the right information to the right people at the right time. They're designed for non-technical users so your leadership team can act on insights immediately."
  }
  if (lower.includes('ai') || lower.includes('model') || lower.includes('predict')) {
    return "We build custom AI models tailored to your specific business questions — predictive, diagnostic, and prescriptive. Everything is trained on your data and tuned to your outcomes."
  }
  if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey')) {
    return "Hey there! How can I help? I can tell you about our services, our process, or help connect you with our team."
  }
  if (lower.includes('thank')) {
    return "You're welcome! Don't hesitate to reach out if you have more questions. Our team is always happy to help."
  }

  return "That's a great question! For a more detailed answer, I'd recommend scheduling a discovery call with our team. They can dig into the specifics of your situation. You can request one on our Contact page, or I've already captured your info if you shared it earlier!"
}
