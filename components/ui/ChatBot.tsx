'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { m, AnimatePresence } from 'framer-motion'

interface Message {
  role: 'bot' | 'user'
  content: string
  quickReplies?: string[]
}

type ChatStep = 'greeting' | 'name' | 'email' | 'need' | 'complete' | 'freeChat'

interface LeadData {
  name: string
  email: string
  need: string
}

const GREETING_MESSAGE = "Hi there! I'm Forte's AI assistant. I can help you learn about our data intelligence solutions, or connect you with our team."

const STEP_PROMPTS: { [key: string]: string } = {
  name: "Great! To connect you with the right person, what's your name?",
  email: "Thanks! And what's the best email to reach you at?",
  need: "Perfect. In a sentence or two, what data challenge is your organization facing right now?",
  complete: "Thanks! I've captured your info and our team will reach out within one business day. In the meantime, feel free to ask me anything about Forte's services!",
  skipGreeting: "No problem! Feel free to ask me anything about Forte — our services, process, pricing, or anything else. I'm here to help.",
}

const GREETING_QUICK_REPLIES = [
  "Tell me about Forte",
  "I'd like to connect with your team",
  "Just browsing",
]

const FREE_CHAT_QUICK_REPLIES = [
  "What services do you offer?",
  "How much does it cost?",
  "How long does it take?",
  "Talk to a human",
]

// Notification sound as a short base64-encoded beep
function playNotificationSound() {
  try {
    const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
    const oscillator = audioCtx.createOscillator()
    const gainNode = audioCtx.createGain()
    oscillator.connect(gainNode)
    gainNode.connect(audioCtx.destination)
    oscillator.frequency.value = 800
    oscillator.type = 'sine'
    gainNode.gain.value = 0.1
    oscillator.start()
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.15)
    oscillator.stop(audioCtx.currentTime + 0.15)
  } catch {
    // Audio not supported — fail silently
  }
}

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', content: GREETING_MESSAGE, quickReplies: GREETING_QUICK_REPLIES },
  ])
  const [input, setInput] = useState('')
  const [step, setStep] = useState<ChatStep>('greeting')
  const [leadData, setLeadData] = useState<LeadData>({ name: '', email: '', need: '' })
  const [isTyping, setIsTyping] = useState(false)
  const [unreadCount, setUnreadCount] = useState(1)
  const [hasAutoOpened, setHasAutoOpened] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setUnreadCount(0)
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }, [isOpen])

  // Auto-open chat after 30 seconds
  useEffect(() => {
    if (hasAutoOpened) return
    const timer = setTimeout(() => {
      if (!isOpen) {
        setIsOpen(true)
        setHasAutoOpened(true)
        playNotificationSound()
      }
    }, 30000)
    return () => clearTimeout(timer)
  }, [isOpen, hasAutoOpened])

  const addBotMessage = useCallback((content: string, quickReplies?: string[]) => {
    const msg: Message = { role: 'bot', content }
    if (quickReplies) msg.quickReplies = quickReplies
    setMessages((prev) => [...prev, msg])
    if (!isOpen) {
      setUnreadCount((prev) => prev + 1)
    }
    playNotificationSound()
  }, [isOpen])

  async function processMessage(userMsg: string) {
    setMessages((prev) => [...prev, { role: 'user', content: userMsg }])
    setIsTyping(true)

    // Small delay for natural feel
    await new Promise((r) => setTimeout(r, 600 + Math.random() * 400))

    let botResponse = ''
    let quickReplies: string[] | undefined

    switch (step) {
      case 'greeting': {
        // Check if user wants to skip
        const lower = userMsg.toLowerCase()
        if (lower.includes('just browsing') || lower.includes('browse') || lower.includes('skip') || lower.includes('no thanks')) {
          setStep('freeChat')
          botResponse = STEP_PROMPTS['skipGreeting'] ?? ''
          quickReplies = FREE_CHAT_QUICK_REPLIES
        } else if (lower.includes('connect') || lower.includes('team') || lower.includes('talk') || lower.includes('human')) {
          setStep('name')
          botResponse = STEP_PROMPTS['name'] ?? ''
        } else {
          // They asked a question — answer it and skip to free chat
          setStep('freeChat')
          botResponse = getSmartResponse(userMsg)
          quickReplies = ["I'd like to connect with your team", ...FREE_CHAT_QUICK_REPLIES.slice(0, 3)]
        }
        break
      }
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
        quickReplies = [
          "We need better reporting",
          "Our data is siloed",
          "We want predictive analytics",
        ]
        break
      }
      case 'need':
        setLeadData((prev) => ({ ...prev, need: userMsg }))
        setStep('complete')
        botResponse = STEP_PROMPTS['complete'] ?? ''
        quickReplies = FREE_CHAT_QUICK_REPLIES
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
      case 'freeChat': {
        const lower = userMsg.toLowerCase()
        // Check if they now want to connect
        if (
          (lower.includes('connect') || lower.includes('talk') || lower.includes('human') || lower.includes('person') || lower.includes('team')) &&
          !leadData.email
        ) {
          setStep('name')
          botResponse = "I'd love to connect you! " + (STEP_PROMPTS['name'] ?? '')
        } else {
          botResponse = getSmartResponse(userMsg)
          quickReplies = getFollowUpSuggestions(userMsg)
        }
        break
      }
    }

    setIsTyping(false)
    addBotMessage(botResponse, quickReplies)
  }

  async function handleSend() {
    if (!input.trim()) return
    const userMsg = input.trim()
    setInput('')
    await processMessage(userMsg)
  }

  async function handleQuickReply(reply: string) {
    await processMessage(reply)
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

      {/* Unread badge */}
      {!isOpen && unreadCount > 0 && (
        <m.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="fixed bottom-[3.75rem] right-5 z-[51] flex h-5 w-5 items-center justify-center rounded-full bg-red-500 font-body text-[10px] font-bold text-white"
        >
          {unreadCount}
        </m.div>
      )}

      {/* Online indicator */}
      {!isOpen && unreadCount === 0 && (
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
              <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-brass/20">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="6" stroke="#C49A58" strokeWidth="1.5" />
                  <circle cx="8" cy="8" r="2" fill="#C49A58" />
                </svg>
                <div className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-navy-mid bg-green-400" />
              </div>
              <div>
                <p className="font-body text-sm font-medium text-white">Forte AI Assistant</p>
                <p className="font-body text-[10px] text-green-400">Online now</p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
              {messages.map((msg, i) => (
                <div key={i}>
                  <m.div
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
                  {/* Quick Reply Buttons */}
                  {msg.role === 'bot' && msg.quickReplies && i === messages.length - 1 && !isTyping && (
                    <m.div
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                      className="mt-2 flex flex-wrap gap-1.5"
                    >
                      {msg.quickReplies.map((reply) => (
                        <button
                          key={reply}
                          onClick={() => handleQuickReply(reply)}
                          className="rounded-full border border-brass/20 bg-brass/5 px-3 py-1.5 font-body text-xs text-brass-light transition-all hover:bg-brass/15 hover:border-brass/40 hover:shadow-[0_0_8px_rgba(160,120,64,0.15)] active:scale-95"
                        >
                          {reply}
                        </button>
                      ))}
                    </m.div>
                  )}
                </div>
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
                  placeholder={
                    step === 'email'
                      ? 'your@email.com'
                      : step === 'name'
                        ? 'Your name...'
                        : 'Type a message...'
                  }
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

  if (lower.includes('price') || lower.includes('cost') || lower.includes('pricing') || lower.includes('much')) {
    return "Forte's pricing depends on the scope of your engagement. Most projects start with a discovery call where we assess your needs and provide a clear estimate. There are no hidden fees, and you own everything we build."
  }
  if (lower.includes('how long') || lower.includes('timeline') || lower.includes('time') || lower.includes('weeks')) {
    return "Most Forte engagements go live within 12 weeks from kickoff. The exact timeline depends on the complexity of your existing data systems and the scope of work."
  }
  if (lower.includes('pipeline') || lower.includes('integrat')) {
    return "Our Data Pipeline & Integration service connects your siloed systems into a single, clean data infrastructure. We automate the manual exports and transfers that slow your team down."
  }
  if (lower.includes('dashboard') || lower.includes('report') || lower.includes('visual')) {
    return "Our AI Dashboards surface the right information to the right people at the right time. They're designed for non-technical users so your leadership team can act on insights immediately."
  }
  if (lower.includes('ai') || lower.includes('model') || lower.includes('predict') || lower.includes('machine learning')) {
    return "We build custom AI models tailored to your specific business questions — predictive, diagnostic, and prescriptive. Everything is trained on your data and tuned to your outcomes."
  }
  if (lower.includes('service') || lower.includes('offer') || lower.includes('what do you do') || lower.includes('tell me about forte') || lower.includes('about')) {
    return "Forte AI Solutions offers three core services: Data Pipeline & Integration (connecting your siloed systems), AI Dashboards & Reporting (intelligent insights for your team), and Custom AI Model Building (predictive and prescriptive models built on your data). Everything we build, you own."
  }
  if (lower.includes('different') || lower.includes('compet') || lower.includes('vs') || lower.includes('compare')) {
    return "Unlike hiring a full data science team, Forte deploys in weeks not months, costs a fraction of annual salaries, and hands you infrastructure that works independently once built. No lock-in, no black boxes."
  }
  if (lower.includes('technical') || lower.includes('engineer') || lower.includes('need a team')) {
    return "Not at all! Forte is specifically built for organizations without large data or engineering teams. We handle the technical architecture entirely. Your team stays focused on using the insights."
  }
  if (lower.includes('own') || lower.includes('lock') || lower.includes('proprietary')) {
    return "Yes, 100%. Everything Forte builds belongs to your organization. There's no proprietary lock-in, no ongoing licensing, and no dependency on Forte to keep things running."
  }
  if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey') || lower.includes('sup')) {
    return "Hey there! How can I help? I can tell you about our services, our process, or help connect you with our team."
  }
  if (lower.includes('thank')) {
    return "You're welcome! Don't hesitate to reach out if you have more questions. Our team is always happy to help."
  }
  if (lower.includes('demo') || lower.includes('call') || lower.includes('meet') || lower.includes('schedule')) {
    return "We'd love to chat! A discovery call takes just 30 minutes — no pitch, no pressure. Head to our Contact page to schedule, or I can collect your info right here if you'd like."
  }
  if (lower.includes('case stud') || lower.includes('example') || lower.includes('result')) {
    return "We've helped organizations across healthcare, finance, logistics, and more cut reporting cycles from weeks to hours and identify risks 60 days earlier. We'd be happy to share specific examples on a discovery call."
  }
  if (lower.includes('security') || lower.includes('safe') || lower.includes('compliance') || lower.includes('hipaa')) {
    return "Data security is foundational to how we work. We follow industry best practices and can work within your compliance requirements. We'd discuss specifics during the discovery phase."
  }

  return "That's a great question! I'd recommend scheduling a discovery call with our team so they can dig into the specifics of your situation. You can book one on our Contact page, or I can collect your info right now!"
}

function getFollowUpSuggestions(input: string): string[] {
  const lower = input.toLowerCase()

  if (lower.includes('price') || lower.includes('cost')) {
    return ["What's the timeline?", "Book a discovery call", "What services do you offer?"]
  }
  if (lower.includes('service') || lower.includes('offer') || lower.includes('about')) {
    return ["How much does it cost?", "Do I need a tech team?", "Book a discovery call"]
  }
  if (lower.includes('time') || lower.includes('long') || lower.includes('week')) {
    return ["What does the process look like?", "How much does it cost?", "Book a discovery call"]
  }
  if (lower.includes('pipeline') || lower.includes('dashboard') || lower.includes('ai') || lower.includes('model')) {
    return ["How much does it cost?", "How long does it take?", "Book a discovery call"]
  }

  return FREE_CHAT_QUICK_REPLIES
}
