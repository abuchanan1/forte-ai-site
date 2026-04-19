'use client'

import { useEffect, useMemo, useState } from 'react'
import { Button } from '@/components/ui/Button'
import { FadeUp } from '@/components/ui/FadeUp'
import { SectionLabel } from '@/components/ui/SectionLabel'
import {
  QUESTIONS,
  type Question,
  type Track,
} from '@/lib/diagnostic'

type Step = 'intro' | 'audience' | 'questions' | 'contact' | 'submitting' | 'done' | 'error'

type AnswerValue = number | string | string[]

interface SavedState {
  track?: Track
  answers: Record<string, AnswerValue>
  qIndex: number
}

const STORAGE_KEY = 'forte.diagnostic.v1'

function loadState(): SavedState {
  if (typeof window === 'undefined') return { answers: {}, qIndex: 0 }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return { answers: {}, qIndex: 0 }
    const parsed = JSON.parse(raw) as SavedState
    return {
      ...(parsed.track ? { track: parsed.track } : {}),
      answers: parsed.answers ?? {},
      qIndex: typeof parsed.qIndex === 'number' ? parsed.qIndex : 0,
    }
  } catch {
    return { answers: {}, qIndex: 0 }
  }
}

function saveState(state: SavedState) {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // ignore
  }
}

function clearState() {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.removeItem(STORAGE_KEY)
  } catch {
    // ignore
  }
}

export function DecisionReadinessDiagnostic() {
  const [step, setStep] = useState<Step>('intro')
  const [track, setTrack] = useState<Track | undefined>(undefined)
  const [answers, setAnswers] = useState<Record<string, AnswerValue>>({})
  const [qIndex, setQIndex] = useState(0)
  const [contact, setContact] = useState({
    name: '',
    email: '',
    organization: '',
    role: '',
    orgSize: '',
    phone: '',
    requestedCall: false,
  })
  const [formError, setFormError] = useState<string>('')
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    const saved = loadState()
    if (saved.track && Object.keys(saved.answers).length > 0) {
      setTrack(saved.track)
      setAnswers(saved.answers)
      setQIndex(saved.qIndex)
    }
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    saveState({ ...(track ? { track } : {}), answers, qIndex })
  }, [track, answers, qIndex, hydrated])

  const questions = track ? QUESTIONS[track] : []
  const current = questions[qIndex]

  const startDiagnostic = () => setStep('audience')
  const resume = () => setStep('questions')

  const selectTrack = (t: Track) => {
    setTrack(t)
    setQIndex(0)
    setAnswers({})
    setStep('questions')
  }

  const setAnswer = (value: AnswerValue) => {
    if (!current) return
    setAnswers((prev) => ({ ...prev, [current.id]: value }))
  }

  const goNext = () => {
    if (!current) return
    if (qIndex < questions.length - 1) {
      setQIndex(qIndex + 1)
    } else {
      setStep('contact')
    }
  }

  const goBack = () => {
    if (step === 'contact') {
      setStep('questions')
      return
    }
    if (qIndex > 0) setQIndex(qIndex - 1)
    else setStep('audience')
  }

  const canProceed = useMemo(() => {
    if (!current) return false
    const value = answers[current.id]
    if (current.type === 'score') return typeof value === 'number'
    if (current.type === 'context') return Array.isArray(value) && value.length > 0
    if (current.type === 'open') return typeof value === 'string' && value.trim().length > 0
    return false
  }, [current, answers])

  const submit = async () => {
    setFormError('')
    if (!contact.name.trim() || !contact.email.trim() || !contact.organization.trim() || !contact.role.trim()) {
      setFormError('Please fill in name, email, organization, and role.')
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)) {
      setFormError('Please enter a valid email address.')
      return
    }
    if (!track) {
      setFormError('Please restart the diagnostic.')
      return
    }

    setStep('submitting')
    try {
      const res = await fetch('/api/assessment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          track,
          ...contact,
          answers,
        }),
      })
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { message?: string }
        setFormError(data.message ?? 'Something went wrong. Please try again.')
        setStep('contact')
        return
      }
      clearState()
      setStep('done')
    } catch {
      setFormError('Network error. Please try again.')
      setStep('contact')
    }
  }

  // --------------- Renders ---------------

  if (!hydrated) {
    return (
      <section id="diagnostic" className="bg-navy-deep py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-6" />
      </section>
    )
  }

  if (step === 'intro') {
    const saved = loadState()
    const hasResume =
      saved.track && Object.keys(saved.answers).length > 0 && saved.qIndex > 0
    return (
      <section id="diagnostic" className="bg-navy-deep py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <FadeUp>
            <SectionLabel label="Start here" />
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="mt-4 font-display text-3xl font-normal leading-display text-white md:text-4xl">
              Ready to find out where you stand?
            </h2>
          </FadeUp>
          <FadeUp delay={0.15}>
            <p className="mt-6 font-body text-base font-light leading-body text-white/65">
              About ten minutes. Fifteen questions. No credit card, no sales
              call required. Your written Decision Readiness Report lands in
              your inbox within 24 hours.
            </p>
          </FadeUp>
          <FadeUp delay={0.2}>
            <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Button onClick={startDiagnostic} size="lg">
                Start the Diagnostic →
              </Button>
              {hasResume ? (
                <Button onClick={resume} variant="ghost" size="sm">
                  Resume where you left off
                </Button>
              ) : null}
            </div>
          </FadeUp>
        </div>
      </section>
    )
  }

  if (step === 'audience') {
    return (
      <section id="diagnostic" className="bg-navy-deep py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-6">
          <FadeUp>
            <SectionLabel label="Step 1 of 3" />
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="mt-4 font-display text-3xl font-normal leading-display text-white md:text-4xl">
              Start with what you are.
            </h2>
          </FadeUp>
          <FadeUp delay={0.15}>
            <p className="mt-4 font-body text-base font-light leading-body text-white/65">
              The diagnostic is tailored to your context. Pick the one that
              fits best. If neither fits, pick the closest and the report will
              account for it.
            </p>
          </FadeUp>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <AudienceCard
              title="Small Business"
              body="Revenue-driven organizations scaling operations, sales, or service delivery. Typically 50 to 500 employees. You may be a founder, COO, or operational leader."
              onClick={() => selectTrack('small-business')}
              cta="Continue as small business →"
            />
            <AudienceCard
              title="Nonprofit or Mission-Driven"
              body="Impact-focused organizations. Nonprofits, schools and districts, foundations, mission-driven entities. You may be an Executive Director, Superintendent, Head of School, or operational leader."
              onClick={() => selectTrack('nonprofit')}
              cta="Continue as nonprofit/mission-driven →"
            />
          </div>
        </div>
      </section>
    )
  }

  if (step === 'questions' && current) {
    const progress = ((qIndex + 1) / questions.length) * 100
    return (
      <section id="diagnostic" className="bg-navy-deep py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-6">
          <div className="mb-4 flex items-center justify-between">
            <p className="font-mono text-[10px] uppercase tracking-mono text-brass-light">
              Question {qIndex + 1} of {questions.length}
            </p>
            <p className="font-mono text-[10px] uppercase tracking-mono text-white/40">
              {labelDimension(current)}
            </p>
          </div>
          <div className="h-[2px] w-full bg-white/10">
            <div
              className="h-full bg-brass transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>

          <h2 className="mt-10 font-display text-2xl font-normal leading-display text-white md:text-3xl">
            {current.prompt}
          </h2>
          {current.helper ? (
            <p className="mt-3 font-body text-sm font-light leading-body text-white/55">
              {current.helper}
            </p>
          ) : null}

          <div className="mt-8">
            {current.type === 'score' ? (
              <ScoreOptions question={current} value={answers[current.id] as number | undefined} onChange={setAnswer} />
            ) : current.type === 'context' ? (
              <MultiSelect question={current} value={(answers[current.id] as string[] | undefined) ?? []} onChange={setAnswer} />
            ) : (
              <textarea
                className="w-full rounded-sm border border-brass/20 bg-navy-mid px-4 py-3 font-body text-base font-light leading-body text-white placeholder-white/30 focus:border-brass/60 focus:outline-none"
                rows={5}
                placeholder="A few sentences is plenty."
                value={(answers[current.id] as string | undefined) ?? ''}
                onChange={(e) => setAnswer(e.target.value)}
              />
            )}
          </div>

          <div className="mt-10 flex items-center justify-between">
            <Button onClick={goBack} variant="ghost" size="sm">
              ← Back
            </Button>
            <Button onClick={goNext} size="md" disabled={!canProceed}>
              {qIndex === questions.length - 1 ? 'Continue to contact →' : 'Next →'}
            </Button>
          </div>
        </div>
      </section>
    )
  }

  if (step === 'contact' || step === 'submitting') {
    return (
      <section id="diagnostic" className="bg-navy-deep py-20 md:py-28">
        <div className="mx-auto max-w-2xl px-6">
          <FadeUp>
            <SectionLabel label="Last step" />
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="mt-4 font-display text-3xl font-normal leading-display text-white md:text-4xl">
              Where should we send your Decision Readiness Report?
            </h2>
          </FadeUp>
          <FadeUp delay={0.15}>
            <p className="mt-4 font-body text-base font-light leading-body text-white/65">
              Your answers are being processed now. Enter your email and the
              report will be in your inbox within 24 hours.
            </p>
          </FadeUp>

          <form
            className="mt-10 space-y-5"
            onSubmit={(e) => {
              e.preventDefault()
              submit()
            }}
          >
            <Field label="Full name" required value={contact.name} onChange={(v) => setContact({ ...contact, name: v })} />
            <Field label="Email address" type="email" required value={contact.email} onChange={(v) => setContact({ ...contact, email: v })} />
            <Field label="Organization name" required value={contact.organization} onChange={(v) => setContact({ ...contact, organization: v })} />
            <Field label="Role / title" required value={contact.role} onChange={(v) => setContact({ ...contact, role: v })} />

            <label className="block">
              <span className="block font-mono text-[10px] uppercase tracking-mono text-white/55">
                Organization size (optional)
              </span>
              <select
                className="mt-2 w-full rounded-sm border border-brass/20 bg-navy-mid px-4 py-3 font-body text-base font-light text-white focus:border-brass/60 focus:outline-none"
                value={contact.orgSize}
                onChange={(e) => setContact({ ...contact, orgSize: e.target.value })}
              >
                <option value="">Select one</option>
                <option value="Under 50">Under 50</option>
                <option value="50-200">50 to 200</option>
                <option value="200-500">200 to 500</option>
                <option value="Over 500">Over 500</option>
              </select>
            </label>

            <Field label="Phone (optional)" value={contact.phone} onChange={(v) => setContact({ ...contact, phone: v })} />

            <label className="flex cursor-pointer items-start gap-3 rounded-sm border border-brass/15 bg-navy-mid/40 px-4 py-3 text-sm text-white/75 hover:border-brass/30">
              <input
                type="checkbox"
                className="mt-1 h-4 w-4 accent-[#A07840]"
                checked={contact.requestedCall}
                onChange={(e) => setContact({ ...contact, requestedCall: e.target.checked })}
              />
              <span>
                I&apos;d like a 30-minute discovery call to discuss my results.
                <span className="block text-xs text-white/50">
                  Optional — Aaron will reach out if checked.
                </span>
              </span>
            </label>

            {formError ? (
              <p className="rounded-sm border border-red-500/30 bg-red-900/20 px-4 py-3 font-body text-sm text-red-300">
                {formError}
              </p>
            ) : null}

            <div className="flex items-center justify-between gap-4 pt-2">
              <Button onClick={goBack} variant="ghost" size="sm">
                ← Back
              </Button>
              <Button type="submit" size="md" disabled={step === 'submitting'}>
                {step === 'submitting' ? 'Sending...' : 'Send my report →'}
              </Button>
            </div>

            <p className="text-center font-body text-xs font-light leading-body text-white/45">
              Your answers are confidential. We do not sell or share your data.
              You will receive the report, one follow-up if you requested a
              call, and nothing else unless you reach out.
            </p>
          </form>
        </div>
      </section>
    )
  }

  if (step === 'done') {
    return (
      <section id="diagnostic" className="bg-navy-deep py-20 md:py-28">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <FadeUp>
            <SectionLabel label="Received" />
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="mt-4 font-display text-3xl font-normal leading-display text-white md:text-4xl">
              Your report is on the way.
            </h2>
          </FadeUp>
          <FadeUp delay={0.15}>
            <p className="mt-6 font-body text-base font-light leading-body text-white/65">
              Thanks for taking the diagnostic. Your Decision Readiness Report
              will be in your inbox within 24 hours. If you asked for a
              discovery call, Aaron will reach out within the same window.
            </p>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="mt-8 font-body text-sm font-light leading-body text-white/55">
              In the meantime, a few things you might find useful:
            </p>
            <ul className="mt-4 space-y-2 font-body text-sm font-light leading-body text-brass-light">
              <li>
                <a className="underline decoration-brass/40 underline-offset-4 hover:text-brass" href="/services#case-study">
                  Read the Synthesis Agent case study →
                </a>
              </li>
              <li>
                <a className="underline decoration-brass/40 underline-offset-4 hover:text-brass" href="/agents">
                  Explore the Agents we are building →
                </a>
              </li>
              <li>
                <a className="underline decoration-brass/40 underline-offset-4 hover:text-brass" href="/blog">
                  Browse more Forte insights →
                </a>
              </li>
            </ul>
          </FadeUp>
        </div>
      </section>
    )
  }

  return null
}

function labelDimension(q: Question): string {
  const labels: Record<Question['dimension'], string> = {
    'data-maturity': 'Data maturity',
    'decision-clarity': 'Decision clarity',
    'architecture-health': 'Architecture health',
    'ai-readiness': 'AI readiness',
  }
  return labels[q.dimension]
}

function AudienceCard({
  title,
  body,
  cta,
  onClick,
}: {
  title: string
  body: string
  cta: string
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="group rounded-sm border border-brass/20 bg-navy-mid/60 p-8 text-left transition-all hover:border-brass/50 hover:bg-navy-mid"
    >
      <h3 className="font-display text-xl font-normal leading-display text-white">
        {title}
      </h3>
      <p className="mt-3 font-body text-sm font-light leading-body text-white/65">
        {body}
      </p>
      <p className="mt-6 font-mono text-[11px] uppercase tracking-mono text-brass-light group-hover:text-brass">
        {cta}
      </p>
    </button>
  )
}

function ScoreOptions({
  question,
  value,
  onChange,
}: {
  question: Question
  value: number | undefined
  onChange: (v: number) => void
}) {
  if (!question.options) return null
  return (
    <div className="space-y-3">
      {question.options.map((opt) => {
        const selected = value === opt.score
        return (
          <button
            key={opt.score}
            type="button"
            onClick={() => onChange(opt.score)}
            className={`w-full rounded-sm border px-5 py-4 text-left transition-colors ${
              selected
                ? 'border-brass bg-brass/10 text-white'
                : 'border-brass/15 bg-navy-mid/40 text-white/80 hover:border-brass/40 hover:bg-navy-mid'
            }`}
          >
            <span className="font-body text-sm font-light leading-body">
              {opt.label}
            </span>
          </button>
        )
      })}
    </div>
  )
}

function MultiSelect({
  question,
  value,
  onChange,
}: {
  question: Question
  value: string[]
  onChange: (v: string[]) => void
}) {
  if (!question.multiSelectOptions) return null
  const toggle = (opt: string) => {
    if (value.includes(opt)) {
      onChange(value.filter((v) => v !== opt))
    } else {
      onChange([...value, opt])
    }
  }
  return (
    <div className="space-y-2">
      {question.multiSelectOptions.map((opt) => {
        const selected = value.includes(opt)
        return (
          <label
            key={opt}
            className={`flex cursor-pointer items-center gap-3 rounded-sm border px-4 py-3 transition-colors ${
              selected
                ? 'border-brass bg-brass/10'
                : 'border-brass/15 bg-navy-mid/40 hover:border-brass/30'
            }`}
          >
            <input
              type="checkbox"
              checked={selected}
              onChange={() => toggle(opt)}
              className="h-4 w-4 accent-[#A07840]"
            />
            <span className="font-body text-sm font-light leading-body text-white/80">
              {opt}
            </span>
          </label>
        )
      })}
    </div>
  )
}

function Field({
  label,
  value,
  onChange,
  type = 'text',
  required = false,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  type?: string
  required?: boolean
}) {
  return (
    <div>
      <label className="block font-mono text-[10px] uppercase tracking-mono text-white/55">
        {label}
        {required ? <span className="text-brass-light"> *</span> : null}
      </label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-sm border border-brass/20 bg-navy-mid px-4 py-3 font-body text-base font-light text-white placeholder-white/30 focus:border-brass/60 focus:outline-none"
      />
    </div>
  )
}
