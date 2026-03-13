'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { m, AnimatePresence } from 'framer-motion'

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */
interface Message {
  role: 'user' | 'assistant' | 'status'
  content: string
}

interface LeadQualification {
  company_size?: string
  data_maturity?: string
  leadership_need?: string
  ai_interest?: string
  budget_authority?: string
  recommended_service?: string
  fit_score?: string
  notes?: string
}

interface LeadData {
  name: string
  email: string
  captured: boolean
}

/* ------------------------------------------------------------------ */
/*  Parsing helpers — strip hidden blocks from assistant text          */
/* ------------------------------------------------------------------ */
const LEAD_CAPTURE_RE = /<lead_capture>([\s\S]*?)<\/lead_capture>/g
const LEAD_QUAL_RE = /<lead_qualification>([\s\S]*?)<\/lead_qualification>/g

function parseAndStrip(raw: string): {
  visible: string
  captureAction: string | null
  leadInfo: { name?: string; email?: string } | null
  qualification: LeadQualification | null
} {
  let captureAction: string | null = null
  let leadInfo: { name?: string; email?: string } | null = null
  let qualification: LeadQualification | null = null

  // Extract lead_capture blocks
  let captureMatch: RegExpExecArray | null
  const captureRe = new RegExp(LEAD_CAPTURE_RE.source, 'g')
  while ((captureMatch = captureRe.exec(raw)) !== null) {
    try {
      const parsed = JSON.parse(captureMatch[1]!)
      if (parsed.action === 'request_contact') {
        captureAction = 'request_contact'
      } else if (parsed.action === 'save_lead') {
        leadInfo = { name: parsed.name, email: parsed.email }
      }
    } catch { /* malformed JSON, skip */ }
  }

  // Extract lead_qualification blocks
  let qualMatch: RegExpExecArray | null
  const qualRe = new RegExp(LEAD_QUAL_RE.source, 'g')
  while ((qualMatch = qualRe.exec(raw)) !== null) {
    try {
      qualification = JSON.parse(qualMatch[1]!)
    } catch { /* malformed JSON, skip */ }
  }

  // Strip hidden blocks from visible text
  const visible = raw
    .replace(LEAD_CAPTURE_RE, '')
    .replace(LEAD_QUAL_RE, '')
    .trim()

  return { visible, captureAction, leadInfo, qualification }
}

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
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [streaming, setStreaming] = useState(false)
  const [streamingText, setStreamingText] = useState('')
  const [unread, setUnread] = useState(0)
  const [autoOpened, setAutoOpened] = useState(false)
  const [initialized, setInitialized] = useState(false)

  // Lead capture state
  const [lead, setLead] = useState<LeadData>({ name: '', email: '', captured: false })
  const [showLeadForm, setShowLeadForm] = useState(false)
  const [leadFormName, setLeadFormName] = useState('')
  const [leadFormEmail, setLeadFormEmail] = useState('')
  const [leadFormSubmitting, setLeadFormSubmitting] = useState(false)

  // Qualification tracking
  const qualificationRef = useRef<LeadQualification | null>(null)
  const transcriptSentRef = useRef(false)

  const endRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const abortRef = useRef<AbortController | null>(null)

  // Always save transcript on page unload (regardless of email capture)
  useEffect(() => {
    function sendTranscriptBeacon() {
      const msgs = messagesRef.current
      if (msgs.length < 2 || transcriptSentRef.current) return
      transcriptSentRef.current = true

      const transcript = msgs
        .filter((m) => m.role !== 'status')
        .map((m) => `${m.role === 'user' ? 'Visitor' : 'Assistant'}: ${m.content}`)
        .join('\n\n')

      // Use sendBeacon so it works even during page unload
      const payload = JSON.stringify({
        name: leadRef.current.name || 'Anonymous Visitor',
        email: leadRef.current.email || 'not-captured@anonymous',
        message: 'Chatbot transcript (auto-captured on session end)',
        transcript,
        qualification: qualificationRef.current,
      })
      navigator.sendBeacon('/api/chatbot-lead', payload)
    }

    window.addEventListener('beforeunload', sendTranscriptBeacon)
    return () => window.removeEventListener('beforeunload', sendTranscriptBeacon)
  }, [])

  // Keep refs in sync for beacon access
  const messagesRef = useRef<Message[]>([])
  useEffect(() => { messagesRef.current = messages }, [messages])
  const leadRef = useRef(lead)
  useEffect(() => { leadRef.current = lead }, [lead])

  // Scroll on new messages
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, streaming, streamingText, showLeadForm])

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setUnread(0)
      setTimeout(() => inputRef.current?.focus(), 200)
    }
  }, [open])

  // Send initial greeting when first opened
  useEffect(() => {
    if (open && !initialized) {
      setInitialized(true)
      // Trigger the assistant with a hidden system message
      sendToAPI([{ role: 'user', content: '[The user just opened the chat widget on the Forte AI Solutions website. Greet them warmly and concisely. Ask what brings them here today.]' }])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, initialized])

  // Auto-open after 30s
  useEffect(() => {
    if (autoOpened) return
    const t = setTimeout(() => {
      if (!open) {
        setOpen(true)
        setAutoOpened(true)
        playPing()
      }
    }, 30000)
    return () => clearTimeout(t)
  }, [open, autoOpened])

  /* ---- streaming API call ---- */
  const sendToAPI = useCallback(
    async (conversationMessages: Message[]) => {
      setStreaming(true)
      setStreamingText('')

      // Only send user/assistant messages to API
      const apiMessages = conversationMessages
        .filter((m) => m.role === 'user' || m.role === 'assistant')
        .map((m) => ({ role: m.role as 'user' | 'assistant', content: m.content }))

      const controller = new AbortController()
      abortRef.current = controller

      let fullText = ''

      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: apiMessages }),
          signal: controller.signal,
        })

        if (!res.ok) {
          throw new Error(`API error: ${res.status}`)
        }

        const reader = res.body?.getReader()
        if (!reader) throw new Error('No reader')

        const decoder = new TextDecoder()
        let buffer = ''

        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          buffer += decoder.decode(value, { stream: true })
          const lines = buffer.split('\n\n')
          buffer = lines.pop() ?? ''

          for (const line of lines) {
            const trimmed = line.trim()
            if (!trimmed.startsWith('data: ')) continue

            try {
              const event = JSON.parse(trimmed.slice(6))

              if (event.type === 'delta') {
                fullText += event.text
                // Show text without hidden blocks during streaming
                const { visible } = parseAndStrip(fullText)
                setStreamingText(visible)
              } else if (event.type === 'error') {
                fullText += '\n[Error: ' + event.error + ']'
              }
            } catch { /* malformed SSE line */ }
          }
        }

        // Done streaming — process the full text
        const { visible, captureAction, leadInfo, qualification } = parseAndStrip(fullText)

        // Update qualification if provided
        if (qualification) {
          qualificationRef.current = { ...qualificationRef.current, ...qualification }
        }

        // Add the visible message
        if (visible) {
          setMessages((prev) => [...prev, { role: 'assistant', content: visible }])
          if (!open) {
            setUnread((n) => n + 1)
            playPing()
          }
        }

        // Handle lead capture actions
        if (captureAction === 'request_contact' && !lead.captured) {
          setShowLeadForm(true)
        }
        if (leadInfo?.name && leadInfo?.email) {
          // Claude extracted lead info from conversation
          const updatedLead = { name: leadInfo.name, email: leadInfo.email, captured: true }
          setLead(updatedLead)
          submitLead(updatedLead.name, updatedLead.email, conversationMessages)
        }
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          setMessages((prev) => [
            ...prev,
            { role: 'status', content: 'Connection issue. Please try again.' },
          ])
        }
      } finally {
        setStreaming(false)
        setStreamingText('')
        abortRef.current = null
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [open, lead.captured],
  )

  /* ---- submit lead to API ---- */
  async function submitLead(name: string, email: string, conversationMessages: Message[]) {
    // Build transcript
    const transcript = conversationMessages
      .filter((m) => m.role !== 'status')
      .map((m) => `${m.role === 'user' ? 'Visitor' : 'Assistant'}: ${m.content}`)
      .join('\n\n')

    try {
      await fetch('/api/chatbot-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          message: `Chatbot lead captured via AI conversation`,
          transcript,
          qualification: qualificationRef.current,
        }),
      })
    } catch {
      // Silent fail — don't interrupt the conversation
    }
  }

  /* ---- handle lead form submission ---- */
  async function handleLeadFormSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!leadFormName.trim() || !leadFormEmail.trim()) return

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(leadFormEmail)) return

    setLeadFormSubmitting(true)
    const updatedLead = { name: leadFormName, email: leadFormEmail, captured: true }
    setLead(updatedLead)
    setShowLeadForm(false)

    // Add user message with their info
    const infoMsg: Message = { role: 'user', content: `My name is ${leadFormName} and my email is ${leadFormEmail}` }
    const updatedMessages = [...messages, infoMsg]
    setMessages(updatedMessages)

    // Submit lead
    await submitLead(updatedLead.name, updatedLead.email, updatedMessages)

    // Let Claude acknowledge
    await sendToAPI(updatedMessages)
    setLeadFormSubmitting(false)
  }

  /* ---- send user message ---- */
  async function handleSend() {
    const msg = input.trim()
    if (!msg || streaming) return
    setInput('')

    const userMessage: Message = { role: 'user', content: msg }
    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)

    await sendToAPI(updatedMessages)
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
            className="fixed bottom-24 right-6 z-50 flex h-[520px] w-[380px] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-lg border border-brass/20 bg-navy-deep shadow-[0_16px_48px_rgba(0,0,0,0.5)]"
          >
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-brass/15 bg-navy-mid px-4 py-3">
              <div className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brass/20">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="#C49A58" strokeWidth="1.5" /><circle cx="8" cy="8" r="2" fill="#C49A58" /></svg>
                <div className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-navy-mid bg-green-400" />
              </div>
              <div className="min-w-0">
                <p className="font-body text-sm font-medium text-white">Forte AI Assistant</p>
                <p className="font-body text-[10px] text-green-400">
                  {streaming ? 'Thinking...' : 'Online now'}
                </p>
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
                </div>
              ))}

              {/* Streaming text */}
              {streaming && streamingText && (
                <m.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="max-w-[82%] rounded-lg bg-navy-mid border border-brass/10 px-3.5 py-2.5 font-body text-[13px] leading-relaxed text-white/85">
                    {streamingText}
                    <m.span
                      animate={{ opacity: [1, 0] }}
                      transition={{ repeat: Infinity, duration: 0.7 }}
                      className="inline-block ml-0.5 w-[2px] h-[14px] bg-brass-light align-text-bottom"
                    />
                  </div>
                </m.div>
              )}

              {/* Typing indicator — shown when streaming but no text yet */}
              {streaming && !streamingText && (
                <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                  <div className="flex gap-1 rounded-lg bg-navy-mid border border-brass/10 px-4 py-3">
                    <m.span className="h-1.5 w-1.5 rounded-full bg-brass/50" animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.5, delay: 0 }} />
                    <m.span className="h-1.5 w-1.5 rounded-full bg-brass/50" animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.5, delay: 0.12 }} />
                    <m.span className="h-1.5 w-1.5 rounded-full bg-brass/50" animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.5, delay: 0.24 }} />
                  </div>
                </m.div>
              )}

              {/* Lead capture form */}
              {showLeadForm && !lead.captured && (
                <m.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mx-1 rounded-lg border border-brass/25 bg-navy-mid p-4"
                >
                  <p className="mb-3 font-body text-[12px] font-medium text-brass-light">
                    Share your details and we&apos;ll follow up
                  </p>
                  <form onSubmit={handleLeadFormSubmit} className="space-y-2.5">
                    <input
                      type="text"
                      placeholder="Your name"
                      value={leadFormName}
                      onChange={(e) => setLeadFormName(e.target.value)}
                      className="w-full rounded border border-brass/15 bg-navy-deep px-3 py-2 font-body text-[13px] text-white placeholder-white/25 outline-none focus:border-brass/40 transition-colors"
                      required
                    />
                    <input
                      type="email"
                      placeholder="Work email"
                      value={leadFormEmail}
                      onChange={(e) => setLeadFormEmail(e.target.value)}
                      className="w-full rounded border border-brass/15 bg-navy-deep px-3 py-2 font-body text-[13px] text-white placeholder-white/25 outline-none focus:border-brass/40 transition-colors"
                      required
                    />
                    <div className="flex gap-2 pt-1">
                      <button
                        type="submit"
                        disabled={leadFormSubmitting}
                        className="flex-1 rounded bg-brass py-2 font-body text-[12px] font-medium text-navy-deep transition-all hover:shadow-[0_0_12px_rgba(160,120,64,0.3)] disabled:opacity-50"
                      >
                        {leadFormSubmitting ? 'Sending...' : 'Connect me'}
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowLeadForm(false)}
                        className="rounded border border-brass/20 px-3 py-2 font-body text-[12px] text-white/50 transition-colors hover:text-white/80"
                      >
                        Later
                      </button>
                    </div>
                  </form>
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
                  placeholder="Ask anything..."
                  className="flex-1 rounded bg-navy-deep border border-brass/15 px-3 py-2 font-body text-sm text-white placeholder-white/25 outline-none focus:border-brass/40 transition-colors"
                  disabled={streaming}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || streaming}
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
