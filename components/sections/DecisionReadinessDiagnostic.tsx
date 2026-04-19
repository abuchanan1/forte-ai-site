'use client'

import { useEffect, useMemo, useState } from 'react'
import { Button } from '@/components/ui/Button'
import { FadeUp } from '@/components/ui/FadeUp'
import { SectionLabel } from '@/components/ui/SectionLabel'
import {
  DIMENSION_LABELS,
  QUESTIONS,
  STAGE_LABELS,
  type Question,
  type ReportPayload,
  type Track,
} from '@/lib/diagnostic'
import { generateAssessmentPdf } from '@/lib/diagnostic-pdf'

type Step = 'intro' | 'audience' | 'questions' | 'contact' | 'submitting' | 'results' | 'error'

type AnswerValue = number | string | string[]

interface SavedState {
  track?: Track
  answers: Record<string, AnswerValue>
  qIndex: number
}

const STORAGE_KEY = 'forte.diagnostic.v2'

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
  const [report, setReport] = useState<ReportPayload | null>(null)
  const [error, setError] = useState<string>('')
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
    if (qIndex < questions.length - 1) setQIndex(qIndex + 1)
    else setStep('contact')
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

  const submit = async (includeContact: boolean) => {
    setError('')
    if (!track) {
      setError('Please restart the diagnostic.')
      return
    }
    setStep('submitting')
    try {
      const res = await fetch('/api/assessment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          track,
          answers,
          contact: includeContact ? contact : undefined,
        }),
      })
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { message?: string }
        setError(data.message ?? 'Something went wrong. Please try again.')
        setStep('contact')
        return
      }
      const data = (await res.json()) as { report: ReportPayload }
      setReport(data.report)
      clearState()
      setStep('results')
      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    } catch {
      setError('Network error. Please try again.')
      setStep('contact')
    }
  }

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
              About ten minutes. Fifteen questions. Your branded Decision
              Readiness Report appears on screen the moment you finish,
              downloadable as a PDF.
            </p>
          </FadeUp>
          <FadeUp delay={0.2}>
            <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Button onClick={() => setStep('audience')} size="lg">
                Start the Diagnostic →
              </Button>
              {hasResume ? (
                <Button onClick={() => setStep('questions')} variant="ghost" size="sm">
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
              fits best.
            </p>
          </FadeUp>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <AudienceCard
              title="Small Business"
              body="Revenue-driven organizations scaling operations, sales, or service delivery. Typically 50 to 500 employees."
              onClick={() => selectTrack('small-business')}
              cta="Continue as small business →"
            />
            <AudienceCard
              title="Nonprofit or Mission-Driven"
              body="Impact-focused organizations. Nonprofits, schools and districts, foundations, mission-driven entities."
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
              {qIndex === questions.length - 1 ? 'Continue →' : 'Next →'}
            </Button>
          </div>
        </div>
      </section>
    )
  }

  if (step === 'contact' || step === 'submitting') {
    const hasNameAndEmail = contact.name.trim().length > 0 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)
    return (
      <section id="diagnostic" className="bg-navy-deep py-20 md:py-28">
        <div className="mx-auto max-w-2xl px-6">
          <FadeUp>
            <SectionLabel label="Optional" />
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="mt-4 font-display text-3xl font-normal leading-display text-white md:text-4xl">
              Want us to personalize the report?
            </h2>
          </FadeUp>
          <FadeUp delay={0.15}>
            <p className="mt-4 font-body text-base font-light leading-body text-white/65">
              Adding your name and organization personalizes your report
              cover. Leaving this blank is fine — you will still see your
              scores and download the PDF.
            </p>
          </FadeUp>

          <div className="mt-10 space-y-5">
            <Field label="Full name" value={contact.name} onChange={(v) => setContact({ ...contact, name: v })} />
            <Field label="Email address" type="email" value={contact.email} onChange={(v) => setContact({ ...contact, email: v })} />
            <Field label="Organization name" value={contact.organization} onChange={(v) => setContact({ ...contact, organization: v })} />
            <Field label="Role / title" value={contact.role} onChange={(v) => setContact({ ...contact, role: v })} />

            <label className="block">
              <span className="block font-mono text-[10px] uppercase tracking-mono text-white/55">
                Organization size
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

            <Field label="Phone" value={contact.phone} onChange={(v) => setContact({ ...contact, phone: v })} />

            <label
              className={`flex cursor-pointer items-start gap-3 rounded-sm border px-4 py-3 text-sm transition-colors ${
                hasNameAndEmail
                  ? 'border-brass/15 bg-navy-mid/40 text-white/75 hover:border-brass/30'
                  : 'border-white/10 bg-navy-mid/20 text-white/40 cursor-not-allowed'
              }`}
            >
              <input
                type="checkbox"
                className="mt-1 h-4 w-4 accent-[#A07840]"
                checked={contact.requestedCall && hasNameAndEmail}
                disabled={!hasNameAndEmail}
                onChange={(e) => setContact({ ...contact, requestedCall: e.target.checked })}
              />
              <span>
                I&apos;d like a 30-minute discovery call to discuss my results.
                {hasNameAndEmail ? null : (
                  <span className="block text-xs text-white/40">
                    Enabled once name and email are provided.
                  </span>
                )}
              </span>
            </label>

            {error ? (
              <p className="rounded-sm border border-red-500/30 bg-red-900/20 px-4 py-3 font-body text-sm text-red-300">
                {error}
              </p>
            ) : null}

            <div className="flex flex-col gap-3 pt-4 sm:flex-row sm:items-center sm:justify-between">
              <Button onClick={goBack} variant="ghost" size="sm">
                ← Back
              </Button>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button
                  onClick={() => submit(false)}
                  variant="ghost"
                  size="md"
                  disabled={step === 'submitting'}
                >
                  Skip and see my report →
                </Button>
                <Button
                  onClick={() => submit(true)}
                  size="md"
                  disabled={step === 'submitting'}
                >
                  {step === 'submitting' ? 'Generating...' : 'See my report →'}
                </Button>
              </div>
            </div>

            <p className="text-center font-body text-xs font-light leading-body text-white/45">
              Your answers are confidential. Both buttons produce the same
              report. The only difference is whether your contact info is
              saved with your submission.
            </p>
          </div>
        </div>
      </section>
    )
  }

  if (step === 'results' && report) {
    const orgProp = contact.organization ? { organization: contact.organization } : {}
    return <ResultsView report={report} {...orgProp} />
  }

  return null
}

function labelDimension(q: Question): string {
  return DIMENSION_LABELS[q.dimension]
}

// ============================================================
// Results view (in-browser Decision Readiness Report)
// ============================================================

function ResultsView({
  report,
  organization,
}: {
  report: ReportPayload
  organization?: string
}) {
  const [downloading, setDownloading] = useState(false)

  const handleDownload = async () => {
    setDownloading(true)
    try {
      await generateAssessmentPdf(report, organization)
    } finally {
      setDownloading(false)
    }
  }

  const orgLine = organization || 'Prepared for your organization'

  return (
    <section id="diagnostic" className="bg-navy-deep py-20 md:py-28">
      <div className="mx-auto max-w-4xl px-6">
        <FadeUp>
          <SectionLabel label="Your Decision Readiness Report" />
        </FadeUp>
        <FadeUp delay={0.1}>
          <h2 className="mt-4 font-display text-3xl font-normal leading-display text-white md:text-5xl">
            {orgLine}
          </h2>
        </FadeUp>
        <FadeUp delay={0.15}>
          <p className="mt-6 font-mono text-[11px] uppercase tracking-mono text-brass-light">
            Current stage
          </p>
          <p className="mt-1 font-display text-4xl font-normal leading-display text-white md:text-6xl">
            {report.bottleneckStage}
          </p>
          <p className="mt-4 max-w-2xl font-body text-base font-light leading-body text-white/65">
            {report.insight.body}
          </p>
        </FadeUp>

        <FadeUp delay={0.2}>
          <div className="mt-10">
            <Button onClick={handleDownload} size="lg" disabled={downloading}>
              {downloading ? 'Preparing PDF...' : 'Download your branded PDF report'}
            </Button>
          </div>
        </FadeUp>

        <FadeUp delay={0.25}>
          <div className="mt-16 grid gap-4 md:grid-cols-2">
            {report.scores.map((s) => (
              <div key={s.dimension} className="rounded-sm border border-brass/20 bg-navy-mid/50 p-6">
                <p className="font-mono text-[10px] uppercase tracking-mono text-brass-light">
                  {DIMENSION_LABELS[s.dimension]}
                </p>
                <p className="mt-2 font-display text-2xl font-normal leading-display text-white">
                  {s.average.toFixed(1)} / 4.0
                </p>
                <p className="mt-1 font-body text-sm font-light leading-body text-white/60">
                  Stage: {s.stage}
                </p>
                <div className="mt-4 h-[4px] w-full rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-brass"
                    style={{ width: `${(s.average / 4.0) * 100}%` }}
                  />
                </div>
                <div className="mt-3 flex justify-between font-mono text-[9px] uppercase tracking-mono text-white/40">
                  {STAGE_LABELS.map((stage) => (
                    <span key={stage}>{stage}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </FadeUp>

        <FadeUp delay={0.3}>
          <div className="mt-16">
            <p className="font-mono text-[10px] uppercase tracking-mono text-brass-light">
              The unique insight
            </p>
            <h3 className="mt-2 font-display text-2xl font-normal leading-display text-white md:text-3xl">
              {report.insight.headline}
            </h3>
            <p className="mt-4 font-body text-base font-light leading-body text-white/70">
              {report.insight.body}
            </p>
            {report.statedPain ? (
              <div className="mt-6 rounded-sm border border-brass/20 bg-navy-mid/40 p-5">
                <p className="font-mono text-[10px] uppercase tracking-mono text-white/50">
                  You told us the biggest pain to solve is
                </p>
                <p className="mt-2 font-body text-sm font-light italic leading-body text-white/80">
                  &ldquo;{report.statedPain}&rdquo;
                </p>
              </div>
            ) : null}
          </div>
        </FadeUp>

        <FadeUp delay={0.35}>
          <div className="mt-16">
            <p className="font-mono text-[10px] uppercase tracking-mono text-brass-light">
              Your top three priorities
            </p>
            <ol className="mt-6 space-y-6">
              {report.priorities.map((p, i) => (
                <li key={p.title} className="flex gap-5">
                  <span className="font-display text-2xl font-medium text-brass-light">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h4 className="font-body text-base font-medium text-white">
                      {p.title}
                    </h4>
                    <p className="mt-1 font-body text-sm font-light leading-body text-white/65">
                      {p.body}
                    </p>
                    <p className="mt-2 font-mono text-[10px] uppercase tracking-mono text-white/40">
                      Estimate: {p.estimate}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </FadeUp>

        <FadeUp delay={0.4}>
          <div className="mt-16 rounded-sm border border-brass/30 bg-brass/5 p-8">
            <p className="font-mono text-[10px] uppercase tracking-mono text-brass-light">
              Recommended next step
            </p>
            <h3 className="mt-2 font-display text-xl font-normal leading-display text-white md:text-2xl">
              {report.nextStep.headline}
            </h3>
            <p className="mt-4 font-body text-base font-light leading-body text-white/75">
              {report.nextStep.body}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href="/contact" size="md">
                Book a discovery call →
              </Button>
              <Button href={report.nextStep.href} variant="ghost" size="md">
                {report.nextStep.hrefLabel}
              </Button>
            </div>
          </div>
        </FadeUp>

        <FadeUp delay={0.45}>
          <p className="mt-12 font-body text-sm font-light italic leading-body text-white/55">
            This report is yours. Use it however you want. Hire Forte or not.
            If you want to talk through what to do next, book a discovery
            call.
          </p>
        </FadeUp>
      </div>
    </section>
  )
}

// ============================================================
// Sub-components
// ============================================================

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
    if (value.includes(opt)) onChange(value.filter((v) => v !== opt))
    else onChange([...value, opt])
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
}: {
  label: string
  value: string
  onChange: (v: string) => void
  type?: string
}) {
  return (
    <label className="block">
      <span className="block font-mono text-[10px] uppercase tracking-mono text-white/55">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-sm border border-brass/20 bg-navy-mid px-4 py-3 font-body text-base font-light text-white placeholder-white/30 focus:border-brass/60 focus:outline-none"
      />
    </label>
  )
}
