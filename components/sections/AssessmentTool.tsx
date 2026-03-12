'use client'

import { useState, useMemo, useCallback } from 'react'
import Link from 'next/link'
import {
  m,
  AnimatePresence,
  useReducedMotion,
  type HTMLMotionProps,
} from 'framer-motion'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { FadeUp } from '@/components/ui/FadeUp'

type OrgType = 'small-business' | 'nonprofit' | null
type Step = 'intro' | 'quiz' | 'results'

interface Question {
  text: string
  options: {
    text: string
    score: number
  }[]
}

interface MaturityStage {
  name: string
  min: number
  max: number
  description: string
  roiFocus: string
  service: string
  serviceSubtext: string
  closingMessage: string
}

const easing = [0.16, 1, 0.3, 1] as const

const questions: Question[] = [
  {
    text: 'How does your team currently access data for decisions?',
    options: [
      {
        text: 'We dig through emails, spreadsheets, and files scattered across the org',
        score: 1,
      },
      {
        text: 'We have a few tools, but pulling data still takes time and effort',
        score: 2,
      },
      {
        text: 'We have dashboards and reports that most of the team uses regularly',
        score: 3,
      },
      {
        text: 'Data flows automatically and surfaces insights before we ask',
        score: 4,
      },
    ],
  },
  {
    text: 'When leadership needs a number, how long does it take?',
    options: [
      {
        text: 'Days or weeks. Someone has to build a report from scratch',
        score: 1,
      },
      {
        text: 'A few days. We know where to look, but pulling it together takes work',
        score: 2,
      },
      {
        text: 'Hours. We have reporting systems that mostly have what we need',
        score: 3,
      },
      {
        text: 'Minutes. The information is already available in real-time',
        score: 4,
      },
    ],
  },
  {
    text: 'How would you describe data ownership at your organization?',
    options: [
      {
        text: 'One person knows where everything is. If they left, we would be lost',
        score: 1,
      },
      {
        text: 'A few people share the knowledge, but there is no formal structure',
        score: 2,
      },
      {
        text: 'We have clear ownership and shared definitions for key metrics',
        score: 3,
      },
      {
        text: 'Data governance is embedded in how we operate, with documentation and processes',
        score: 4,
      },
    ],
  },
  {
    text: 'How does your team use data in decision-making?',
    options: [
      {
        text: 'Most decisions are made on gut instinct. Data is an afterthought',
        score: 1,
      },
      {
        text: 'We look at data when we can, but it does not consistently drive decisions',
        score: 2,
      },
      {
        text: 'Data informs most major decisions. We have regular reporting rhythms',
        score: 3,
      },
      {
        text: 'Every significant decision is evidence-based. Our team asks data questions naturally',
        score: 4,
      },
    ],
  },
  {
    text: "What is your organization's relationship with AI?",
    options: [
      {
        text: 'We have not started thinking about AI yet',
        score: 1,
      },
      {
        text: 'We are curious but do not know where to start or if we are ready',
        score: 2,
      },
      {
        text: 'We have explored some AI tools but have not integrated them into our workflow',
        score: 3,
      },
      {
        text: 'We are actively using AI agents or tools that are integrated into our processes',
        score: 4,
      },
    ],
  },
]

const maturityStages: MaturityStage[] = [
  {
    name: 'Scattered',
    min: 5,
    max: 8,
    description:
      "Your organization is in the early stages of data utilization. Data lives in multiple disconnected places, and accessing it requires significant manual effort. There's an opportunity to consolidate and centralize, which will immediately recapture time and reduce friction.",
    roiFocus: 'Time Recaptured',
    service: 'AI & Data Health Assessment',
    serviceSubtext:
      'A 2-3 week diagnostic that maps your data landscape and identifies exactly where to start.',
    closingMessage:
      'You are not behind. You are at the beginning, and now you know it. That clarity is worth more than most organizations ever get. The next step is a conversation about what to build first, and it is smaller than you think.',
  },
  {
    name: 'Centralized',
    min: 9,
    max: 12,
    description:
      'You have some foundational tools in place and data is more organized than before. The next lever is enabling your team to access and understand data independently, which accelerates decision speed and builds team capability.',
    roiFocus: 'Decision Speed & Data Literacy',
    service: 'Decision Intelligence Foundation Sprint',
    serviceSubtext:
      'A 6-8 week engagement that builds the decision infrastructure your team needs to operate with clarity.',
    closingMessage:
      'You have the pieces. What is missing is the system that connects them. That is a solvable problem, and the path from here to clarity is shorter than it feels right now.',
  },
  {
    name: 'Integrated',
    min: 13,
    max: 17,
    description:
      'Your organization has strong data discipline and processes are in place. The opportunity now is to use data more strategically to improve the quality and speed of complex decisions. This is where insights compound.',
    roiFocus: 'Decision Quality',
    service: 'Intelligent Data Infrastructure & Agentic AI Systems',
    serviceSubtext:
      '8-20 weeks to implement the AI-powered systems your foundation is ready to support.',
    closingMessage:
      'Your foundation is strong. Most organizations never get here. The question now is not whether to invest in intelligence, but how to do it without losing what you have built.',
  },
  {
    name: 'Intelligent',
    min: 18,
    max: 20,
    description:
      'Data and AI are woven into how your organization operates. You are focused on continuous improvement and capturing compounding value from your investments. The role here is strategic partnership and optimization.',
    roiFocus: 'Compounding Returns',
    service: 'Fractional Head of Decision Intelligence',
    serviceSubtext:
      'Ongoing senior leadership to govern, evolve, and optimize your decision systems.',
    closingMessage:
      'You are operating at a level most organizations aspire to. The work now is stewardship. Making sure the system evolves as fast as you do, and that the advantage you have built keeps compounding.',
  },
]

function getMaturityStage(score: number): MaturityStage {
  const stage = maturityStages.find((s) => score >= s.min && score <= s.max)
  return stage || maturityStages[0]!
}

function MotionDiv(props: HTMLMotionProps<'div'>) {
  return <m.div {...props} />
}

function downloadResults(
  orgType: OrgType,
  score: number,
  stage: MaturityStage
) {
  const content = `FORTE AI SOLUTIONS
Data & AI Readiness Assessment Results

Organization Type: ${orgType === 'small-business' ? 'Small Business' : 'Nonprofit / Mission-Driven'}
Maturity Stage: ${stage.name} (Score: ${score}/20)

What This Means:
${stage.description}

ROI Focus:
${stage.roiFocus}

Recommended Next Step:
${stage.service}
${stage.serviceSubtext}

${stage.closingMessage}

Book a discovery call: https://forteaisolutions.com/contact
Learn more: https://forteaisolutions.com/blog/measuring-the-return-on-data-investment`

  const blob = new Blob([content], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `FORTE-Assessment-Results-${stage.name}.txt`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

interface AnswerCardProps {
  text: string
  onClick: () => void
  isSelected: boolean
  delay: number
  prefersReducedMotion: boolean
}

function AnswerCard({
  text,
  onClick,
  isSelected,
  delay,
  prefersReducedMotion,
}: AnswerCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [glowPos, setGlowPos] = useState({ x: 0, y: 0 })

  function handleMouseMove(e: React.MouseEvent<HTMLButtonElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    setGlowPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  return (
    <m.button
      initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
      animate={prefersReducedMotion ? false : { opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay,
        ease: easing,
      }}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        'relative w-full overflow-hidden rounded-sm border bg-navy-mid p-6 text-left transition-all duration-300',
        isSelected
          ? 'border-brass bg-navy-mid/80'
          : 'border-brass/10 hover:border-brass/40 hover:shadow-[0_8px_32px_rgba(160,120,64,0.12)] hover:-translate-y-1'
      )}
    >
      {/* Glow effect */}
      {isHovered && !prefersReducedMotion && !isSelected && (
        <div
          className="pointer-events-none absolute inset-0 rounded-sm opacity-20 transition-opacity duration-300"
          style={{
            background: `radial-gradient(300px circle at ${glowPos.x}px ${glowPos.y}px, rgba(196, 154, 88, 0.15), transparent 60%)`,
          }}
        />
      )}

      <div className="relative z-10 flex items-start gap-4">
        <p className="flex-1 font-body text-base font-light leading-body text-white/70">
          {text}
        </p>
        {isSelected && (
          <m.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, ease: easing }}
            className="flex-shrink-0 text-brass"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </m.div>
        )}
      </div>
    </m.button>
  )
}

const maturityCurveData = [
  {
    stage: 'Scattered',
    summary: 'Data lives in silos. Reports are manual. Nobody fully trusts the numbers.',
    investIn: 'Data strategy. Get clarity on what decisions matter and where the information lives.',
    roiLayer: 'Layer 1: Time Recaptured',
  },
  {
    stage: 'Centralized',
    summary: 'Data is accessible from one place. Basic reporting works. Shared definitions are forming.',
    investIn: 'Decision infrastructure. Dashboards, reporting rhythms, and team training.',
    roiLayer: 'Layer 2: Decision Speed + Layer 4: Literacy',
  },
  {
    stage: 'Integrated',
    summary: 'Data flows automatically. Dashboards are trusted. The team uses data as a habit.',
    investIn: 'AI agents and advanced analytics. Your foundation is ready to support it.',
    roiLayer: 'Layer 3: Decision Quality',
  },
  {
    stage: 'Intelligent',
    summary: 'AI is embedded in workflows. Evidence-based decisions are how work happens.',
    investIn: 'Fractional leadership to govern, evolve, and optimize the system.',
    roiLayer: 'All four layers compound',
  },
]

function MaturityCurveViz({ currentStageIndex }: { currentStageIndex: number }) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  return (
    <div>
      <p className="mb-4 font-mono text-[10px] font-medium uppercase tracking-mono-wide text-white/60">
        The Data Maturity Curve
      </p>
      <p className="mb-6 font-body text-sm font-light leading-body text-white/40">
        Where you are determines what to invest in. Tap any stage to learn more.
      </p>

      <div className="space-y-3">
        {maturityCurveData.map((item, idx) => {
          const isCurrent = idx === currentStageIndex
          const isPast = idx < currentStageIndex
          const isExpanded = expandedIndex === idx

          return (
            <div key={idx}>
              <button
                onClick={() => setExpandedIndex(isExpanded ? null : idx)}
                className={cn(
                  'w-full rounded-sm border p-4 text-left transition-all duration-300',
                  isCurrent
                    ? 'border-brass/40 bg-brass/[0.08] shadow-[0_0_20px_rgba(160,120,64,0.08)]'
                    : isPast
                      ? 'border-brass/15 bg-navy-mid/60'
                      : 'border-white/[0.06] bg-navy-mid/30'
                )}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {/* Stage indicator */}
                    <div
                      className={cn(
                        'w-2.5 h-2.5 rounded-full transition-all duration-300',
                        isCurrent
                          ? 'bg-brass shadow-[0_0_8px_rgba(196,154,88,0.5)]'
                          : isPast
                            ? 'bg-brass/50'
                            : 'bg-white/15'
                      )}
                    />
                    <span
                      className={cn(
                        'font-display text-base font-normal',
                        isCurrent
                          ? 'text-brass-light'
                          : isPast
                            ? 'text-white/70'
                            : 'text-white/40'
                      )}
                    >
                      Stage {idx + 1}: {item.stage}
                    </span>
                    {isCurrent && (
                      <span className="rounded-full bg-brass/20 px-2 py-0.5 font-mono text-[9px] font-medium uppercase tracking-mono-wide text-brass">
                        You are here
                      </span>
                    )}
                  </div>
                  <svg
                    className={cn(
                      'w-4 h-4 transition-transform duration-300',
                      isCurrent ? 'text-brass' : 'text-white/30',
                      isExpanded && 'rotate-180'
                    )}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </div>
              </button>

              <AnimatePresence>
                {isExpanded && (
                  <m.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: easing }}
                    className="overflow-hidden"
                  >
                    <div
                      className={cn(
                        'rounded-b-sm border border-t-0 px-4 py-5 space-y-4',
                        isCurrent
                          ? 'border-brass/40 bg-brass/[0.04]'
                          : 'border-white/[0.06] bg-navy-mid/20'
                      )}
                    >
                      <p className="font-body text-sm font-light leading-body text-white/60">
                        {item.summary}
                      </p>
                      <div className="flex flex-col gap-3 sm:flex-row sm:gap-6">
                        <div className="flex-1">
                          <p className="mb-1 font-mono text-[9px] font-medium uppercase tracking-mono-wide text-brass/70">
                            Invest In
                          </p>
                          <p className="font-body text-sm font-light leading-body text-white/50">
                            {item.investIn}
                          </p>
                        </div>
                        <div className="flex-1">
                          <p className="mb-1 font-mono text-[9px] font-medium uppercase tracking-mono-wide text-brass/70">
                            ROI Focus
                          </p>
                          <p className="font-body text-sm font-light leading-body text-white/50">
                            {item.roiLayer}
                          </p>
                        </div>
                      </div>
                    </div>
                  </m.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>
    </div>
  )
}

const roiLayersData = [
  {
    name: 'Time Recaptured',
    description: 'Hours your team spends on manual data work that can be eliminated. The fastest, most tangible return.',
    measures: 'Hours pulling reports, reconciling systems, building presentations from raw data',
    stages: [0],
  },
  {
    name: 'Decision Speed',
    description: 'How fast you go from question to confident answer. One averted bad decision can outweigh a year of time savings.',
    measures: 'Time from data request to delivery, decisions delayed waiting for data',
    stages: [1],
  },
  {
    name: 'Decision Quality',
    description: 'Better outcomes from better information. This is where strategies that looked impossible become routine.',
    measures: 'Resources allocated on evidence, problems caught early, lag between decision and outcome',
    stages: [2],
  },
  {
    name: 'Capacity & Literacy',
    description: 'The multiplier that makes everything else permanent. Your team learns to use data without constant translation.',
    measures: 'Staff data confidence, independent report access, data literacy across org',
    stages: [0, 1, 2, 3],
  },
]

function ROILayersViz({ currentStageIndex }: { currentStageIndex: number }) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  // Map stage index to primary ROI layer focus
  const focusLayers: Record<number, number[]> = {
    0: [0],       // Scattered -> Time Recaptured
    1: [1, 3],    // Centralized -> Decision Speed + Literacy
    2: [2],       // Integrated -> Decision Quality
    3: [0, 1, 2, 3], // Intelligent -> All compound
  }

  const activeLayers = focusLayers[currentStageIndex] || [0]

  return (
    <div>
      <p className="mb-4 font-mono text-[10px] font-medium uppercase tracking-mono-wide text-white/60">
        The Four Layers of Return
      </p>
      <p className="mb-6 font-body text-sm font-light leading-body text-white/40">
        Traditional ROI measures cost savings. These four layers capture the full picture. Your focus layers are highlighted.
      </p>

      <div className="space-y-3">
        {roiLayersData.map((layer, idx) => {
          const isFocus = activeLayers.includes(idx)
          const isExpanded = expandedIndex === idx

          return (
            <div key={idx}>
              <button
                onClick={() => setExpandedIndex(isExpanded ? null : idx)}
                className={cn(
                  'w-full rounded-sm border p-4 text-left transition-all duration-300',
                  isFocus
                    ? 'border-brass/40 bg-brass/[0.08] shadow-[0_0_20px_rgba(160,120,64,0.08)]'
                    : 'border-white/[0.06] bg-navy-mid/30'
                )}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {/* Layer number */}
                    <div
                      className={cn(
                        'flex items-center justify-center w-6 h-6 rounded-full border font-mono text-[10px] font-medium',
                        isFocus
                          ? 'border-brass/60 text-brass'
                          : 'border-white/15 text-white/30'
                      )}
                    >
                      {idx + 1}
                    </div>
                    <span
                      className={cn(
                        'font-display text-base font-normal',
                        isFocus ? 'text-brass-light' : 'text-white/40'
                      )}
                    >
                      {layer.name}
                    </span>
                    {isFocus && (
                      <span className="rounded-full bg-brass/20 px-2 py-0.5 font-mono text-[9px] font-medium uppercase tracking-mono-wide text-brass">
                        Your focus
                      </span>
                    )}
                  </div>
                  <svg
                    className={cn(
                      'w-4 h-4 transition-transform duration-300',
                      isFocus ? 'text-brass' : 'text-white/30',
                      isExpanded && 'rotate-180'
                    )}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </div>
              </button>

              <AnimatePresence>
                {isExpanded && (
                  <m.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: easing }}
                    className="overflow-hidden"
                  >
                    <div
                      className={cn(
                        'rounded-b-sm border border-t-0 px-4 py-5 space-y-3',
                        isFocus
                          ? 'border-brass/40 bg-brass/[0.04]'
                          : 'border-white/[0.06] bg-navy-mid/20'
                      )}
                    >
                      <p className="font-body text-sm font-light leading-body text-white/60">
                        {layer.description}
                      </p>
                      <div>
                        <p className="mb-1 font-mono text-[9px] font-medium uppercase tracking-mono-wide text-brass/70">
                          What to Measure
                        </p>
                        <p className="font-body text-sm font-light leading-body text-white/50">
                          {layer.measures}
                        </p>
                      </div>
                    </div>
                  </m.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export function AssessmentTool() {
  const [step, setStep] = useState<Step>('intro')
  const [orgType, setOrgType] = useState<OrgType>(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Map<number, number>>(new Map())
  const [selectedScore, setSelectedScore] = useState<number | null>(null)
  const prefersReducedMotion = useReducedMotion() ?? false

  const totalScore = useMemo(() => {
    let sum = 0
    answers.forEach((score) => {
      sum += score
    })
    return sum
  }, [answers])

  const maturityStage = useMemo(() => {
    return getMaturityStage(totalScore)
  }, [totalScore])

  const lowestScoringQuestionIndex = useMemo(() => {
    let lowestIndex = 0
    let lowestScore = 5
    answers.forEach((score, index) => {
      if (score < lowestScore) {
        lowestScore = score
        lowestIndex = index
      }
    })
    return lowestIndex
  }, [answers])

  const opportunityMessages: Record<number, string> = {
    0: 'Getting your data into one accessible place will unlock everything else.',
    1: 'Shortening the time from question to answer is your highest-leverage move right now.',
    2: 'Establishing clear data ownership will prevent your next investment from failing.',
    3: 'Building a rhythm of evidence-based decisions will change how your entire team operates.',
    4: 'AI readiness starts with the foundation, and your foundation is buildable.',
  }

  const handleSelectOrgType = useCallback((type: OrgType) => {
    setOrgType(type)
    setStep('quiz')
    setAnswers(new Map())
    setCurrentQuestionIndex(0)
    setSelectedScore(null)
  }, [])

  const handleSelectAnswer = useCallback((score: number) => {
    setSelectedScore(score)
  }, [])

  const handleSubmitAnswer = useCallback(() => {
    if (selectedScore === null) return

    const newAnswers = new Map(answers)
    newAnswers.set(currentQuestionIndex, selectedScore)
    setAnswers(newAnswers)

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setSelectedScore(null)
    } else {
      setStep('results')
      setSelectedScore(null)
    }
  }, [selectedScore, answers, currentQuestionIndex])

  const handleGoBack = useCallback(() => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
      const prevAnswer = answers.get(currentQuestionIndex - 1)
      setSelectedScore(prevAnswer ?? null)
    }
  }, [currentQuestionIndex, answers])

  const handleRetake = useCallback(() => {
    setStep('intro')
    setOrgType(null)
    setAnswers(new Map())
    setCurrentQuestionIndex(0)
    setSelectedScore(null)
  }, [])

  const animationVariants = {
    initial: { opacity: 0, x: 20, y: 20 },
    animate: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: -20, y: -20 },
  }

  const introAnimationProps = prefersReducedMotion
    ? {}
    : { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }

  const quizAnimationProps = prefersReducedMotion
    ? {}
    : {
        initial: animationVariants.initial,
        animate: animationVariants.animate,
        exit: animationVariants.exit,
      }

  const resultsAnimationProps = prefersReducedMotion
    ? {}
    : { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }

  const questionAnimationProps = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 },
      }

  const optionsAnimationProps = prefersReducedMotion
    ? {}
    : { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }

  return (
    <main className="min-h-screen bg-navy-deep">
      <AnimatePresence mode="wait">
        {step === 'intro' && (
          <MotionDiv
            key="intro"
            {...introAnimationProps}
            transition={{ duration: 0.6, ease: easing }}
            className="min-h-screen bg-gradient-to-b from-navy via-navy-mid to-navy-deep"
          >
            <section className="relative overflow-hidden bg-navy py-20 md:py-32">
              {/* Layered background effects */}
              <div className="absolute inset-0">
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-brass/4 blur-[120px]" />
                <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-brass/4 blur-[100px]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-brass/[0.02] blur-[80px]" />
              </div>

              {/* Subtle grid pattern */}
              <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(196,154,88,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(196,154,88,0.3) 1px, transparent 1px)',
                  backgroundSize: '60px 60px',
                }}
              />

              <div className="relative z-10 mx-auto max-w-4xl px-6">
                <FadeUp className="mb-6">
                  <SectionLabel label="Free Assessment" />
                </FadeUp>

                <FadeUp delay={0.1} className="mb-6">
                  <h1 className="font-display text-4xl md:text-5xl font-normal leading-display text-white/90">
                    How ready is your organization
                    <br />
                    <span className="text-brass-light">for data and AI?</span>
                  </h1>
                </FadeUp>

                <FadeUp delay={0.2} className="mb-6">
                  <p className="max-w-2xl font-body text-lg font-light leading-body text-white/60">
                    Five questions. Two minutes. A clear picture of where you
                    stand on the data maturity curve and exactly what to do next.
                  </p>
                </FadeUp>

                {/* Value props */}
                <FadeUp delay={0.25} className="mb-12">
                  <div className="flex flex-wrap gap-x-8 gap-y-3">
                    {[
                      'Personalized maturity score',
                      'Tailored next step',
                      'Downloadable results',
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-2"
                      >
                        <div className="w-1 h-1 rounded-full bg-brass" />
                        <span className="font-body text-sm font-light text-white/45">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </FadeUp>

                <FadeUp delay={0.3} className="mb-6">
                  <p className="font-mono text-[10px] font-medium uppercase tracking-mono-wide text-white/30">
                    Select your organization type to begin
                  </p>
                </FadeUp>

                <FadeUp delay={0.35}>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {[
                      {
                        type: 'small-business' as const,
                        label: 'Small Business',
                        description:
                          'Revenue-driven organizations scaling operations and decision-making',
                      },
                      {
                        type: 'nonprofit' as const,
                        label: 'Nonprofit / Mission-Driven',
                        description:
                          'Impact-focused organizations building stronger evidence for outcomes',
                      },
                    ].map((option) => (
                      <button
                        key={option.type}
                        onClick={() => handleSelectOrgType(option.type)}
                        className={cn(
                          'group relative overflow-hidden rounded-sm border bg-navy-mid p-8 text-left transition-all duration-300',
                          'border-brass/10 hover:border-brass/40 hover:shadow-[0_8px_32px_rgba(160,120,64,0.12)] hover:-translate-y-1'
                        )}
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-brass/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                        <div className="relative z-10">
                          <h3 className="mb-3 font-display text-xl font-normal leading-display text-white/90">
                            {option.label}
                          </h3>
                          <p className="font-body text-sm font-light leading-body text-white/60">
                            {option.description}
                          </p>
                        </div>

                        {/* Arrow indicator */}
                        <div className="absolute right-6 top-1/2 -translate-y-1/2 text-brass/0 transition-all duration-300 group-hover:text-brass/60 group-hover:translate-x-1">
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                          </svg>
                        </div>
                      </button>
                    ))}
                  </div>
                </FadeUp>
              </div>
            </section>
          </MotionDiv>
        )}

        {step === 'quiz' && (
          <MotionDiv
            key="quiz"
            {...quizAnimationProps}
            transition={{ duration: 0.5, ease: easing }}
            className="relative min-h-screen bg-navy py-12 md:py-20"
          >
            {/* Subtle background for quiz */}
            <div className="absolute inset-0">
              <div className="absolute top-1/3 right-0 w-[300px] h-[300px] rounded-full bg-brass/[0.02] blur-[80px]" />
            </div>

            <div className="relative z-10 mx-auto max-w-3xl px-6">
              {/* Top bar: Back + Step counter */}
              <div className="mb-10 flex items-center justify-between">
                {currentQuestionIndex > 0 ? (
                  <button
                    onClick={handleGoBack}
                    className="flex items-center gap-2 font-body text-sm font-light text-white/60 transition-colors hover:text-brass"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                    </svg>
                    Back
                  </button>
                ) : (
                  <div />
                )}
                <span className="font-mono text-[10px] font-medium uppercase tracking-mono-wide text-white/40">
                  {currentQuestionIndex + 1} / {questions.length}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="mb-12">
                <div className="flex gap-1.5">
                  {Array.from({ length: questions.length }).map((_, idx) => (
                    <m.div
                      key={idx}
                      className={cn(
                        'flex-1 h-1.5 rounded-full transition-colors duration-500',
                        idx < currentQuestionIndex
                          ? 'bg-brass'
                          : idx === currentQuestionIndex
                            ? 'bg-brass/60'
                            : 'bg-brass/10'
                      )}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{
                        duration: 0.4,
                        delay: idx * 0.05,
                        ease: easing,
                      }}
                      style={{ originX: 0 }}
                    />
                  ))}
                </div>
              </div>

              {/* Question */}
              <AnimatePresence mode="wait">
                <MotionDiv
                  key={`question-${currentQuestionIndex}`}
                  {...questionAnimationProps}
                  transition={{ duration: 0.4, ease: easing }}
                  className="mb-12"
                >
                  <h2 className="mb-12 font-display text-3xl font-normal leading-display text-white/90">
                    {questions[currentQuestionIndex]?.text}
                  </h2>
                </MotionDiv>
              </AnimatePresence>

              {/* Answer Options */}
              <AnimatePresence mode="wait">
                <MotionDiv
                  key={`options-${currentQuestionIndex}`}
                  {...optionsAnimationProps}
                  transition={{ duration: 0.4, ease: easing }}
                  className="space-y-4"
                >
                  {questions[currentQuestionIndex]?.options.map(
                    (option, idx) => (
                      <AnswerCard
                        key={idx}
                        text={option.text}
                        onClick={() => handleSelectAnswer(option.score)}
                        isSelected={selectedScore === option.score}
                        delay={idx * 0.05}
                        prefersReducedMotion={prefersReducedMotion}
                      />
                    )
                  )}
                </MotionDiv>
              </AnimatePresence>

              {/* Submit Button */}
              <m.div
                className="mt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.3, ease: easing }}
              >
                <button
                  onClick={handleSubmitAnswer}
                  disabled={selectedScore === null}
                  className={cn(
                    'w-full rounded-sm border px-9 py-4 font-body text-sm font-semibold uppercase tracking-button transition-all duration-300',
                    selectedScore !== null
                      ? 'border-brass bg-brass/10 text-white hover:bg-brass/20 hover:shadow-[0_0_20px_rgba(160,120,64,0.15)]'
                      : 'border-white/10 bg-transparent text-white/30 cursor-not-allowed'
                  )}
                >
                  {currentQuestionIndex < questions.length - 1
                    ? 'Next Question'
                    : 'See My Results'}
                </button>
              </m.div>
            </div>
          </MotionDiv>
        )}

        {step === 'results' && (
          <MotionDiv
            key="results"
            {...resultsAnimationProps}
            transition={{ duration: 0.6, ease: easing }}
            className="relative min-h-screen bg-navy py-16 md:py-24"
          >
            {/* Results background effects */}
            <div className="absolute inset-0">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-brass/[0.03] blur-[120px]" />
            </div>

            <div className="relative z-10 mx-auto max-w-3xl px-6">
              {/* Maturity Stage - Centered */}
              <FadeUp delay={0} className="mb-12">
                <div className="text-center">
                  <h2 className="mb-4 font-mono text-[10px] font-medium uppercase tracking-mono-wide text-brass">
                    Your Results
                  </h2>
                  <h1 className="mb-2 font-display text-5xl md:text-6xl font-normal leading-display text-white/90">
                    Stage {maturityStages.indexOf(maturityStage) + 1}
                  </h1>
                  <p className="font-display text-3xl font-normal leading-display text-brass-light">
                    {maturityStage.name}
                  </p>
                </div>
              </FadeUp>

              {/* Score Display */}
              <FadeUp delay={0.1} className="mb-12">
                <div className="rounded-sm border border-brass/10 bg-navy-mid/50 p-8 text-center">
                  <p className="mb-4 font-mono text-[10px] font-medium uppercase tracking-mono-wide text-white/40">
                    Your Score
                  </p>
                  <p className="font-display text-4xl font-normal leading-display text-white/90">
                    {totalScore} / 20
                  </p>
                </div>
              </FadeUp>

              {/* Maturity Bar */}
              <FadeUp delay={0.2} className="mb-12">
                <div>
                  <p className="mb-4 font-mono text-[10px] font-medium uppercase tracking-mono-wide text-white/60">
                    Maturity Progression
                  </p>
                  <div className="flex gap-2">
                    {maturityStages.map((stage, idx) => (
                      <div key={idx} className="flex-1">
                        <m.div
                          className={cn(
                            'h-2 rounded-full transition-colors duration-500',
                            totalScore >= stage.min
                              ? 'bg-brass'
                              : 'bg-brass/20'
                          )}
                          {...(prefersReducedMotion
                            ? {}
                            : {
                                initial: { scaleX: 0 },
                                animate: { scaleX: 1 },
                              })}
                          transition={{
                            duration: 0.6,
                            delay: (idx + 1) * 0.1,
                            ease: easing,
                          }}
                          style={{ originX: 0 }}
                        />
                        <p className="mt-2 text-center font-mono text-[9px] font-medium uppercase tracking-mono-wide text-white/40">
                          {stage.name}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeUp>

              {/* Description */}
              <FadeUp delay={0.3} className="mb-12">
                <div className="rounded-sm border border-brass/10 bg-navy-mid/50 p-8">
                  <p className="font-body text-base font-light leading-body text-white/70">
                    {maturityStage.description}
                  </p>
                </div>
              </FadeUp>

              {/* ROI Focus + Recommended Service - 2 Column Grid */}
              <FadeUp delay={0.4} className="mb-12">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="rounded-sm border border-brass/10 bg-navy-mid/50 p-8">
                    <p className="mb-3 font-mono text-[10px] font-medium uppercase tracking-mono-wide text-brass">
                      ROI Focus
                    </p>
                    <p className="font-display text-xl font-normal leading-display text-white/90">
                      {maturityStage.roiFocus}
                    </p>
                  </div>

                  <div className="rounded-sm border border-brass/10 bg-navy-mid/50 p-8">
                    <p className="mb-3 font-mono text-[10px] font-medium uppercase tracking-mono-wide text-brass">
                      Recommended Service
                    </p>
                    <p className="mb-2 font-display text-xl font-normal leading-display text-white/90">
                      {maturityStage.service}
                    </p>
                    <p className="font-body text-sm font-light leading-body text-white/50">
                      {maturityStage.serviceSubtext}
                    </p>
                  </div>
                </div>
              </FadeUp>

              {/* Key Insight */}
              <FadeUp delay={0.5} className="mb-12">
                <div className="rounded-sm border border-brass/10 bg-navy-mid/50 p-8">
                  <p className="mb-3 font-mono text-[10px] font-medium uppercase tracking-mono-wide text-brass">
                    Your Biggest Opportunity
                  </p>
                  <p className="font-body text-base font-light leading-body text-white/70">
                    {opportunityMessages[lowestScoringQuestionIndex]}
                  </p>
                </div>
              </FadeUp>

              {/* Interactive Data Maturity Curve */}
              <FadeUp delay={0.55} className="mb-12">
                <MaturityCurveViz currentStageIndex={maturityStages.indexOf(maturityStage)} />
              </FadeUp>

              {/* Interactive ROI Layers */}
              <FadeUp delay={0.6} className="mb-12">
                <ROILayersViz currentStageIndex={maturityStages.indexOf(maturityStage)} />
              </FadeUp>

              {/* Closing Message */}
              <FadeUp delay={0.65} className="mb-12">
                <div className="rounded-sm border border-brass/10 bg-navy-mid/50 p-8 border-l-2 border-l-brass">
                  <p className="font-body text-base font-light leading-body text-white/70 italic">
                    {maturityStage.closingMessage}
                  </p>
                </div>
              </FadeUp>

              {/* ROI Blog Link */}
              <FadeUp delay={0.7} className="mb-12">
                <Link
                  href="/blog/measuring-the-return-on-data-investment"
                  className="inline-flex font-body text-sm font-light text-brass/70 transition-colors hover:text-brass"
                >
                  Learn more about how we measure the return on data investment →
                </Link>
              </FadeUp>

              {/* Download Button */}
              <FadeUp delay={0.75} className="mb-6">
                <button
                  onClick={() =>
                    downloadResults(orgType, totalScore, maturityStage)
                  }
                  className="w-full rounded-sm border border-white/30 bg-transparent px-9 py-4 font-body text-sm font-semibold uppercase tracking-button text-white transition-all duration-200 hover:border-brass hover:shadow-[0_0_20px_rgba(160,120,64,0.15)]"
                >
                  Download Your Results
                </button>
              </FadeUp>

              {/* CTA */}
              <FadeUp delay={0.8} className="mb-8">
                <Link href="/contact" className="block">
                  <Button variant="primary" size="lg" className="w-full">
                    Book a Discovery Call
                  </Button>
                </Link>
              </FadeUp>

              <FadeUp delay={0.85} className="mb-8 text-center">
                <p className="font-body text-sm font-light leading-body text-white/50">
                  We will walk through your results and map out your next step.
                </p>
              </FadeUp>

              {/* Retake Button */}
              <FadeUp delay={0.9}>
                <button
                  onClick={handleRetake}
                  className="w-full rounded-sm border border-white/30 bg-transparent px-9 py-4 font-body text-sm font-semibold uppercase tracking-button text-white transition-all duration-200 hover:border-brass hover:shadow-[0_0_20px_rgba(160,120,64,0.15)]"
                >
                  Retake Assessment
                </button>
              </FadeUp>
            </div>
          </MotionDiv>
        )}
      </AnimatePresence>
    </main>
  )
}
