'use client'

import { useState } from 'react'
import { FadeUp } from '@/components/ui/FadeUp'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Button } from '@/components/ui/Button'

const CAPABILITIES = [
  {
    title: 'Adaptive by design',
    body: 'Learning that responds to how each student actually processes information — not a single path bent into branching quizzes.',
  },
  {
    title: 'Comprehension in real time',
    body: 'Teachers see where understanding is forming and where it is breaking down, while it still matters. Not a test score weeks later.',
  },
  {
    title: 'Built for K-12 classrooms',
    body: 'Designed for the realities of elementary, middle, and high school instruction. Not corporate training repackaged for kids.',
  },
  {
    title: 'AI underneath, not on top',
    body: 'The intelligence is in the engine — adapting content, surfacing gaps, supporting teachers. Not a chatbot bolted onto a worksheet.',
  },
]

export default function LearnPage() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email || status === 'loading') return
    setStatus('loading')
    setErrorMsg('')
    try {
      const res = await fetch('/api/learn-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (res.ok && data.success) {
        setStatus('success')
      } else {
        setStatus('error')
        setErrorMsg(data.message ?? 'Something went wrong. Try again.')
      }
    } catch {
      setStatus('error')
      setErrorMsg('Network error. Try again.')
    }
  }

  return (
    <>
      {/* Hero */}
      <section className="relative bg-navy pt-32 pb-20 md:pt-44 md:pb-28 overflow-hidden">
        <div className="relative mx-auto max-w-7xl px-6">
          <FadeUp>
            <div className="inline-flex items-center gap-2 rounded-sm border border-brass/30 bg-brass/5 px-3 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-brass-light" />
              <span className="font-mono text-[10px] uppercase tracking-mono text-brass-light">
                Coming Soon
              </span>
            </div>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h1 className="mt-6 font-display text-5xl font-normal leading-display text-white md:text-7xl">
              Forte Learn.
              <br />
              <span className="text-brass-light">
                Education that adapts to the student.
              </span>
            </h1>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="mt-6 max-w-2xl font-body text-lg font-light leading-body text-white/60">
              A K-12 learning platform. Built for teachers, not around
              them.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Problem */}
      <section className="bg-navy-deep py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-6">
          <FadeUp>
            <SectionLabel label="The Problem" />
          </FadeUp>
          <FadeUp delay={0.1}>
            <p className="mt-6 font-display text-3xl font-normal leading-display text-white md:text-4xl">
              The same way organizations lose decisions to bad data
              infrastructure, classrooms lose students to curriculum that
              can&rsquo;t adapt.
            </p>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="mt-6 font-body text-base font-light leading-body text-white/60">
              Forte Learn is building the fix. Not a tutor bolted onto a
              textbook. Not another dashboard for administrators. A learning
              system that meets students where they are and gives teachers a
              clear view of what is actually landing.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Capabilities */}
      <section className="bg-navy py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <FadeUp>
            <SectionLabel label="What We Are Building" />
            <h2 className="mt-4 max-w-3xl font-display text-3xl font-normal leading-display text-white md:text-4xl">
              Four ideas at the core.
            </h2>
          </FadeUp>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {CAPABILITIES.map((cap, i) => (
              <FadeUp key={cap.title} delay={0.1 * (i + 1)}>
                <div className="rounded-sm border border-brass/10 bg-navy-mid/40 p-6">
                  <h3 className="font-body text-base font-medium text-white">
                    {cap.title}
                  </h3>
                  <p className="mt-3 font-body text-sm font-light leading-body text-white/60">
                    {cap.body}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Email Capture */}
      <section
        className="py-20 md:py-28"
        style={{
          background:
            'linear-gradient(135deg, #060E1C 0%, #162444 50%, rgba(160,120,64,0.12) 100%)',
        }}
      >
        <div className="mx-auto max-w-2xl px-6 text-center">
          <FadeUp>
            <SectionLabel label="Early Access" />
            <h2 className="mt-4 font-display text-4xl font-normal leading-display text-white md:text-5xl">
              Get early access.
            </h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p className="mx-auto mt-4 max-w-lg font-body text-base font-light leading-body text-white/60">
              We are working with a small group of teachers and schools as we
              build. Leave your email if you want to be part of it.
            </p>
          </FadeUp>
          <FadeUp delay={0.2}>
            {status === 'success' ? (
              <p className="mt-8 font-body text-sm text-brass-light">
                Thanks. We will be in touch.
              </p>
            ) : (
              <>
                <form
                  onSubmit={handleSubmit}
                  className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
                >
                  <label htmlFor="learn-email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="learn-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@school.org"
                    className="flex-1 rounded-sm border border-brass/20 bg-navy-deep/60 px-4 py-3 font-body text-sm text-white placeholder:text-white/30 focus:border-brass focus:outline-none"
                  />
                  <Button type="submit" size="md" loading={status === 'loading'}>
                    Request Access
                  </Button>
                </form>
                {status === 'error' && (
                  <p className="mt-4 font-body text-xs text-red-400/80">{errorMsg}</p>
                )}
              </>
            )}
          </FadeUp>
          <FadeUp delay={0.3}>
            <div className="mt-10">
              <Button href="/blog" variant="ghost" size="md">
                Follow Our Progress
              </Button>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  )
}
