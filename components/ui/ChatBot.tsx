'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { m, AnimatePresence } from 'framer-motion'

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */
interface Message {
  role: 'bot' | 'user' | 'status'
  content: string
  quickReplies?: string[]
}

type ChatStep = 'greeting' | 'name' | 'email' | 'need' | 'freeChat'

interface LeadData {
  name: string
  email: string
  need: string
}

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */
const GREETING = "Hi! I'm Forte's assistant. I can answer questions about our data intelligence solutions or connect you with the team."

const PROMPTS: Record<string, string> = {
  name: "I'd love to connect you. What's your name?",
  email: "And the best email to reach you?",
  need: "Last one — in a sentence, what data challenge are you facing?",
  captured: "Got it — our team will reach out within one business day. Ask me anything else in the meantime!",
  skip: "No problem! Ask me anything about Forte.",
}

const GREETING_REPLIES = [
  "Tell me about Forte",
  "Connect me with your team",
  "Just browsing",
]

const CHAT_REPLIES = [
  "What services do you offer?",
  "How much does it cost?",
  "How long does it take?",
  "Talk to someone",
]

/* ------------------------------------------------------------------ */
/*  Audio                                                              */
/* ------------------------------------------------------------------ */
function playPing() {
  try {
    const ctx = new AudioContext()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.frequency.value = 880
    osc.type = 'sine'
    gain.gain.value = 0.08
    osc.start()
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12)
    osc.stop(ctx.currentTime + 0.12)
  } catch { /* no audio support */ }
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */
export function ChatBot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', content: GREETING, quickReplies: GREETING_REPLIES },
  ])
  const [input, setInput] = useState('')
  const [step, setStep] = useState<ChatStep>('greeting')
  const [lead, setLead] = useState<LeadData>({ name: '', email: '', need: '' })
  const [typing, setTyping] = useState(false)
  const [unread, setUnread] = useState(1)
  const [autoOpened, setAutoOpened] = useState(false)
  const endRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Scroll on new messages
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setUnread(0)
      setTimeout(() => inputRef.current?.focus(), 200)
    }
  }, [open])

  // Auto-open after 25s
  useEffect(() => {
    if (autoOpened) return
    const t = setTimeout(() => {
      if (!open) {
        setOpen(true)
        setAutoOpened(true)
        playPing()
      }
    }, 25000)
    return () => clearTimeout(t)
  }, [open, autoOpened])

  /* ---- helpers ---- */
  const pushBot = useCallback(
    (content: string, quickReplies?: string[]) => {
      const msg: Message = { role: 'bot', content }
      if (quickReplies) msg.quickReplies = quickReplies
      setMessages((prev) => [...prev, msg])
      if (!open) setUnread((n) => n + 1)
      playPing()
    },
    [open],
  )

  const pushStatus = useCallback((content: string) => {
    setMessages((prev) => [...prev, { role: 'status', content }])
  }, [])

  /* ---- submit lead to API ---- */
  async function submitLead(name: string, email: string, need: string) {
    try {
      const res = await fetch('/api/chatbot-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message: need }),
      })
      const data = await res.json()

      if (!res.ok || !data.success) {
        pushStatus('Could not submit your info. Please try the Contact page.')
        return
      }
      if (data.emailSent === false) {
        pushStatus('Your info was saved. Our team will follow up soon.')
      }
    } catch {
      pushStatus('Network error submitting your info. Please try the Contact page.')
    }
  }

  /* ---- process a message ---- */
  async function process(userMsg: string) {
    setMessages((prev) => [...prev, { role: 'user', content: userMsg }])
    setTyping(true)

    // Natural typing delay — short for simple steps, slightly longer for answers
    const delay = step === 'freeChat' ? 400 + Math.random() * 300 : 300 + Math.random() * 200
    await new Promise((r) => setTimeout(r, delay))

    let reply = ''
    let qr: string[] | undefined

    switch (step) {
      case 'greeting': {
        const lo = userMsg.toLowerCase()
        if (lo.includes('just browsing') || lo.includes('browse') || lo.includes('skip') || lo.includes('no thanks')) {
          setStep('freeChat')
          reply = PROMPTS['skip'] ?? ''
          qr = CHAT_REPLIES
        } else if (lo.includes('connect') || lo.includes('team') || lo.includes('talk') || lo.includes('human') || lo.includes('someone')) {
          setStep('name')
          reply = PROMPTS['name'] ?? ''
        } else {
          setStep('freeChat')
          reply = answer(userMsg)
          qr = ["Connect me with your team", ...CHAT_REPLIES.slice(0, 3)]
        }
        break
      }

      case 'name':
        setLead((prev) => ({ ...prev, name: userMsg }))
        setStep('email')
        reply = `Nice to meet you, ${userMsg.split(' ')[0]}! ${PROMPTS['email'] ?? ''}`
        break

      case 'email': {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userMsg)) {
          reply = "Hmm, that doesn't look right. Can you try your email again?"
          break
        }
        setLead((prev) => ({ ...prev, email: userMsg }))
        setStep('need')
        reply = PROMPTS['need'] ?? ''
        qr = ["We need better reporting", "Our data is siloed", "We want predictive analytics"]
        break
      }

      case 'need': {
        const updatedLead = { ...lead, need: userMsg }
        setLead(updatedLead)
        setStep('freeChat')
        reply = PROMPTS['captured'] ?? ''
        qr = CHAT_REPLIES
        // Submit in background — don't block the response
        submitLead(updatedLead.name, updatedLead.email, userMsg)
        break
      }

      case 'freeChat': {
        const lo = userMsg.toLowerCase()
        if (
          (lo.includes('connect') || lo.includes('talk') || lo.includes('human') || lo.includes('person') || lo.includes('someone') || lo.includes('team')) &&
          !lead.email
        ) {
          setStep('name')
          reply = PROMPTS['name'] ?? ''
        } else {
          reply = answer(userMsg)
          qr = followUps(userMsg)
        }
        break
      }
    }

    setTyping(false)
    pushBot(reply, qr)
  }

  async function handleSend() {
    const msg = input.trim()
    if (!msg) return
    setInput('')
    await process(msg)
  }

  /* ---- render ---- */
  return (
    <>
      {/* FAB */}
      <m.button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-brass shadow-[0_4px_24px_rgba(160,120,64,0.4)] transition-all hover:shadow-[0_4px_32px_rgba(160,120,64,0.6)]"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        aria-label={open ? 'Close chat' : 'Open chat'}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <m.svg key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }} width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M4 4l12 12M16 4L4 16" stroke="#060E1C" strokeWidth="2" strokeLinecap="round" />
            </m.svg>
          ) : (
            <m.svg key="c" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} transition={{ duration: 0.15 }} width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" stroke="#060E1C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </m.svg>
          )}
        </AnimatePresence>
      </m.button>

      {/* Badge / online dot */}
      {!open && unread > 0 && (
        <m.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="fixed bottom-[3.75rem] right-5 z-[51] flex h-5 w-5 items-center justify-center rounded-full bg-red-500 font-body text-[10px] font-bold text-white">
          {unread}
        </m.div>
      )}
      {!open && unread === 0 && (
        <m.div className="fixed bottom-[4.5rem] right-6 z-50 h-3 w-3 rounded-full bg-green-400" animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }} />
      )}

      {/* Window */}
      <AnimatePresence>
        {open && (
          <m.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-24 right-6 z-50 flex h-[500px] w-[380px] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-lg border border-brass/20 bg-navy-deep shadow-[0_16px_48px_rgba(0,0,0,0.5)]"
          >
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-brass/15 bg-navy-mid px-4 py-3">
              <div className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brass/20">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="#C49A58" strokeWidth="1.5" /><circle cx="8" cy="8" r="2" fill="#C49A58" /></svg>
                <div className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-navy-mid bg-green-400" />
              </div>
              <div className="min-w-0">
                <p className="font-body text-sm font-medium text-white">Forte AI Assistant</p>
                <p className="font-body text-[10px] text-green-400">Online now</p>
              </div>
              <button onClick={() => setOpen(false)} className="ml-auto text-white/40 hover:text-white transition-colors" aria-label="Minimize chat">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 scroll-smooth">
              {messages.map((msg, i) => (
                <div key={i}>
                  {msg.role === 'status' ? (
                    <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
                      <span className="inline-block rounded-full bg-brass/10 px-3 py-1 font-body text-[11px] text-brass-light">{msg.content}</span>
                    </m.div>
                  ) : (
                    <m.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[82%] rounded-lg px-3.5 py-2.5 font-body text-[13px] leading-relaxed ${
                        msg.role === 'user'
                          ? 'bg-brass/20 text-white'
                          : 'bg-navy-mid border border-brass/10 text-white/85'
                      }`}>
                        {msg.content}
                      </div>
                    </m.div>
                  )}

                  {/* Quick replies — only on latest bot message */}
                  {msg.role === 'bot' && msg.quickReplies && i === messages.length - 1 && !typing && (
                    <m.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25, delay: 0.15 }} className="mt-2 flex flex-wrap gap-1.5">
                      {msg.quickReplies.map((r) => (
                        <button key={r} onClick={() => process(r)} className="rounded-full border border-brass/20 bg-brass/5 px-3 py-1.5 font-body text-[11px] text-brass-light transition-all hover:bg-brass/15 hover:border-brass/40 active:scale-95">
                          {r}
                        </button>
                      ))}
                    </m.div>
                  )}
                </div>
              ))}

              {typing && (
                <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                  <div className="flex gap-1 rounded-lg bg-navy-mid border border-brass/10 px-4 py-3">
                    <m.span className="h-1.5 w-1.5 rounded-full bg-brass/50" animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.5, delay: 0 }} />
                    <m.span className="h-1.5 w-1.5 rounded-full bg-brass/50" animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.5, delay: 0.12 }} />
                    <m.span className="h-1.5 w-1.5 rounded-full bg-brass/50" animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.5, delay: 0.24 }} />
                  </div>
                </m.div>
              )}
              <div ref={endRef} />
            </div>

            {/* Input */}
            <div className="border-t border-brass/15 bg-navy-mid px-3 py-2.5">
              <form onSubmit={(e) => { e.preventDefault(); handleSend() }} className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={step === 'email' ? 'your@email.com' : step === 'name' ? 'Your name...' : 'Ask anything...'}
                  className="flex-1 rounded bg-navy-deep border border-brass/15 px-3 py-2 font-body text-sm text-white placeholder-white/25 outline-none focus:border-brass/40 transition-colors"
                  disabled={typing}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || typing}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded bg-brass text-navy-deep transition-all hover:shadow-[0_0_12px_rgba(160,120,64,0.3)] disabled:opacity-25 disabled:cursor-not-allowed"
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

/* ------------------------------------------------------------------ */
/*  Knowledge base                                                     */
/* ------------------------------------------------------------------ */
function answer(input: string): string {
  const lo = input.toLowerCase()

  if (/^(hi|hey|hello|sup|yo|howdy)\b/.test(lo)) {
    return "Hey! How can I help? I can tell you about our services, pricing, timeline, or connect you with the team."
  }
  if (lo.includes('service') || lo.includes('offer') || lo.includes('what do you do') || lo.includes('tell me about forte') || lo.includes('about forte')) {
    return "Forte offers three core services: Data Pipeline & Integration (connecting siloed systems), AI Dashboards & Reporting (actionable insights for your team), and Custom AI Model Building (predictive models on your data). You own everything we build — no lock-in."
  }
  if (lo.includes('price') || lo.includes('cost') || lo.includes('pricing') || lo.includes('how much') || lo.includes('budget') || lo.includes('afford')) {
    return "Pricing depends on scope — we tailor every engagement. A discovery call lets us give you a clear estimate with no surprises. No hidden fees, and you own the final product outright."
  }
  if (lo.includes('how long') || lo.includes('timeline') || lo.includes('weeks') || lo.includes('duration') || lo.includes('turnaround')) {
    return "Most engagements go live within 12 weeks from kickoff. Exact timing depends on the complexity of your systems and scope of work."
  }
  if (lo.includes('pipeline') || (lo.includes('connect') && lo.includes('data')) || lo.includes('integrat')) {
    return "Our Data Pipeline service connects your siloed systems — CRM, ERP, spreadsheets, third-party tools — into a single, clean data layer with real-time sync. No more manual exports."
  }
  if (lo.includes('dashboard') || lo.includes('report') || lo.includes('visual') || lo.includes('analytics')) {
    return "Our AI Dashboards go beyond charts — they surface priorities, not just metrics. Built for non-technical users with automated alerts when something needs attention."
  }
  if (lo.includes('ai') || lo.includes('model') || lo.includes('predict') || lo.includes('machine learning') || lo.includes('forecast')) {
    return "We build custom AI models on your data — predictive (what's coming), diagnostic (why it happened), and prescriptive (what to do next). Explainable outputs your leadership can trust."
  }
  if (lo.includes('technical') || lo.includes('engineer') || lo.includes('developer') || lo.includes('need a team') || lo.includes('in-house')) {
    return "No technical team needed! Forte handles the architecture entirely. Your team focuses on using the insights, not building the infrastructure."
  }
  if (lo.includes('own') || lo.includes('lock') || lo.includes('proprietary') || lo.includes('keep')) {
    return "100% yours. Everything we build belongs to your organization — no lock-in, no licensing, no dependency on Forte to keep it running."
  }
  if (lo.includes('process') || lo.includes('how does it work') || lo.includes('steps') || lo.includes('methodology')) {
    return "Four phases: Discovery (map your data landscape), Architecture (design the solution), Build & Test (we build and validate everything), Deploy & Enable (go live + 30 days of support). Kickoff to live in ~12 weeks."
  }
  if (lo.includes('different') || lo.includes('compet') || lo.includes('vs') || lo.includes('compare') || lo.includes('better than')) {
    return "Unlike hiring a data science team (months to recruit, one problem at a time), Forte deploys in weeks with cross-industry expertise. Unlike off-the-shelf tools, everything is custom-built for your specific questions."
  }
  if (lo.includes('demo') || lo.includes('call') || lo.includes('meet') || lo.includes('schedule') || lo.includes('book')) {
    return "A discovery call takes 30 minutes — no pitch, no pressure. Head to our Contact page, or I can collect your info right here!"
  }
  if (lo.includes('case stud') || lo.includes('example') || lo.includes('result') || lo.includes('success')) {
    return "We've helped organizations across healthcare, finance, logistics, and energy cut reporting cycles from weeks to hours and identify risks 60+ days earlier. Happy to share specifics on a discovery call."
  }
  if (lo.includes('security') || lo.includes('safe') || lo.includes('compliance') || lo.includes('hipaa') || lo.includes('gdpr') || lo.includes('encrypt')) {
    return "Security is foundational to our work. We follow industry best practices, encrypt data in transit and at rest, and can work within your specific compliance requirements (HIPAA, SOC 2, etc.)."
  }
  if (lo.includes('industr') || lo.includes('healthcare') || lo.includes('finance') || lo.includes('logistics') || lo.includes('energy') || lo.includes('sector')) {
    return "We serve organizations across healthcare, finance, logistics, energy, and technology. Our approach adapts to your industry's specific data challenges and compliance needs."
  }
  if (lo.includes('thank') || lo.includes('appreciate')) {
    return "Happy to help! Anything else you'd like to know?"
  }

  return "Great question! I'd love to give you a detailed answer — our team can dig into the specifics on a discovery call. Want me to collect your info, or you can visit our Contact page!"
}

function followUps(input: string): string[] {
  const lo = input.toLowerCase()

  if (lo.includes('price') || lo.includes('cost') || lo.includes('much')) {
    return ["What's the timeline?", "Book a discovery call", "What services do you offer?"]
  }
  if (lo.includes('service') || lo.includes('offer') || lo.includes('about')) {
    return ["How much does it cost?", "Do I need a tech team?", "Book a discovery call"]
  }
  if (lo.includes('time') || lo.includes('long') || lo.includes('week')) {
    return ["What's the process?", "How much does it cost?", "Book a discovery call"]
  }
  if (lo.includes('pipeline') || lo.includes('dashboard') || lo.includes('ai') || lo.includes('model')) {
    return ["How much does it cost?", "How long does it take?", "Book a discovery call"]
  }
  if (lo.includes('security') || lo.includes('compliance')) {
    return ["What industries do you serve?", "How does the process work?", "Book a discovery call"]
  }

  return CHAT_REPLIES
}
