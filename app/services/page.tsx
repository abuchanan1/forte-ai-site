import type { Metadata } from 'next'
import { createMetadata } from '@/lib/metadata'
import { FadeUp } from '@/components/ui/FadeUp'
import { ScaleIn } from '@/components/ui/ScaleIn'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Button } from '@/components/ui/Button'
import { ServiceIcon } from '@/components/ui/ServiceIcon'
import {
  FoundationGraphic,
  InfrastructureGraphic,
  FractionalGraphic,
  AssessmentGraphic,
} from '@/components/ui/ServiceGraphics'

export const metadata: Metadata = createMetadata({
  title: 'Solutions',
  description:
    'Decision infrastructure for organizations ready to lead with data. Foundation Sprint, Intelligent Infrastructure, Fractional Leadership, and AI Readiness Assessment.',
  path: '/services',
})

const PROCESS_STEPS = [
  {
    num: '01',
    title: 'Assess',
    body: 'We evaluate your current data landscape, identify gaps, and determine your AI readiness. This can be a standalone engagement or the first step in a longer relationship.',
  },
  {
    num: '02',
    title: 'Design',
    body: 'We define the KPI framework, metric governance, dashboard architecture, and decision cadence your leadership needs to operate with clarity.',
  },
  {
    num: '03',
    title: 'Build',
    body: 'We implement the infrastructure — data pipelines, executive dashboards, reporting governance, and custom AI agents — rigorously tested before anyone touches it.',
  },
  {
    num: '04',
    title: 'Evolve',
    body: 'Decision infrastructure is not static. Through fractional leadership, we govern your metrics, evolve your dashboards, and ensure AI stays aligned with your goals.',
  },
]

const FAQS = [
  {
    q: 'Where should we start if we are not sure what we need?',
    a: 'Most organizations start with either the AI and Data Health Assessment (2–3 weeks) to get a clear picture of where they stand, or jump directly into a Foundation Sprint if they know they need better decision infrastructure. A discovery call helps us recommend the right starting point.',
  },
  {
    q: 'Do we need a technical team to work with Forte?',
    a: 'No. Forte is built for organizations without large data or engineering teams. We handle the technical architecture, data infrastructure, and AI implementation. Your team focuses on using the insights to make better decisions.',
  },
  {
    q: 'What size organization is Forte built for?',
    a: 'Our sweet spot is organizations with 50 to 500 employees — large enough to have real data complexity, but often without dedicated data leadership. We also work with mission-driven organizations and nonprofits.',
  },
  {
    q: 'Do we own everything Forte builds?',
    a: 'Yes, completely. Every dashboard, data pipeline, AI agent, and framework belongs to your organization. No lock-in, no proprietary dependencies, no ongoing licensing of your own infrastructure.',
  },
  {
    q: 'What does "agentic AI" mean in practice?',
    a: 'Agentic AI systems are intelligent assistants that automate specific analytical tasks — generating executive insight summaries, monitoring data quality, running forecasts, or flagging operational anomalies. They support human decision-making rather than replacing it.',
  },
  {
    q: 'How is Forte different from a data engineering contractor?',
    a: 'Contractors require detailed requirements and management capacity that most teams don\'t have. Forte designs the decision infrastructure itself — the frameworks, governance, and systems that determine what gets built and why. We start with leadership decisions and work backward to the data, not the other way around.',
  },
]


export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-navy pt-32 pb-20 md:pt-44 md:pb-28 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=1920&q=80")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="relative mx-auto max-w-7xl px-6">
          <FadeUp>
            <SectionLabel label="Our Solutions" />
          </FadeUp>
          <FadeUp delay={0.1}>
            <h1 className="mt-6 font-display text-5xl font-normal leading-display text-white md:text-7xl">
              Four engagements.
              <br />
              <span className="text-brass-light">One goal: better decisions.</span>
            </h1>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="mt-6 max-w-2xl font-body text-lg font-light leading-body text-white/60">
              Every Forte engagement is designed around a single question: what
              does your leadership team need to know, and how do we build the
              infrastructure to deliver it?
            </p>
          </FadeUp>

          {/* Client Journey */}
          <FadeUp delay={0.3}>
            <div className="mt-12 rounded-sm border border-brass/15 bg-navy-mid/50 px-6 py-5">
              <p className="font-mono text-[10px] uppercase tracking-mono text-brass-light mb-3">Typical Client Journey</p>
              <div className="flex flex-wrap items-center gap-3 font-body text-sm text-white/60">
                <span className="rounded border border-brass/20 bg-brass/5 px-3 py-1.5 text-white/80">Assessment</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-brass/40 shrink-0"><path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                <span className="rounded border border-brass/20 bg-brass/5 px-3 py-1.5 text-white/80">Foundation Sprint</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-brass/40 shrink-0"><path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                <span className="rounded border border-brass/20 bg-brass/5 px-3 py-1.5 text-white/80">Infrastructure</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-brass/40 shrink-0"><path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                <span className="rounded border border-brass/20 bg-brass/5 px-3 py-1.5 text-white/80">Fractional Advisory</span>
              </div>
              <p className="mt-3 font-body text-xs text-white/40">Many organizations start directly with the Foundation Sprint.</p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Service 1: Foundation Sprint */}
      <section className="bg-navy-deep py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 md:grid-cols-2 md:gap-16 items-center">
            <div>
              <FadeUp>
                <SectionLabel label="Most Popular" index={1} />
              </FadeUp>
              <FadeUp delay={0.1}>
                <div className="mt-4 mb-3">
                  <ServiceIcon icon="pipeline" size={48} />
                </div>
                <h2 className="max-w-3xl font-display text-3xl font-normal leading-display text-white md:text-4xl">
                  Decision Intelligence Foundation Sprint
                </h2>
              </FadeUp>
              <FadeUp delay={0.15}>
                <p className="mt-2 font-body text-sm font-medium text-brass-light">
                  6–8 weeks — The most common starting engagement
                </p>
              </FadeUp>
              <FadeUp delay={0.2}>
                <p className="mt-6 max-w-3xl font-body text-base font-light leading-body text-white/60">
                  Your leadership team gains a clear operating system for
                  decision-making. We define the metrics that matter, design the
                  dashboards that surface them, and build the governance framework
                  that keeps everyone aligned.
                </p>
              </FadeUp>
              <FadeUp delay={0.3}>
                <ul className="mt-6 space-y-3">
                  {[
                    'KPI framework and metric definitions the whole organization agrees on',
                    'Executive dashboard architecture designed for how leaders actually decide',
                    'Reporting governance and decision cadence for leadership',
                    'AI readiness evaluation and implementation roadmap',
                  ].map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-3 font-body text-sm font-light leading-body text-white/60"
                    >
                      <span className="mt-2 block h-px w-3 shrink-0 bg-brass" />
                      {point}
                    </li>
                  ))}
                </ul>
              </FadeUp>
            </div>
            <ScaleIn delay={0.3}>
              <FoundationGraphic />
            </ScaleIn>
          </div>
        </div>
      </section>

      {/* Service 2: Infrastructure & AI */}
      <section className="bg-navy py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 md:grid-cols-2 md:gap-16 items-center">
            <ScaleIn delay={0.1} className="order-2 md:order-1">
              <InfrastructureGraphic />
            </ScaleIn>
            <div className="order-1 md:order-2">
              <FadeUp>
                <SectionLabel label="Full Implementation" index={2} />
              </FadeUp>
              <FadeUp delay={0.1}>
                <div className="mt-4 mb-3">
                  <ServiceIcon icon="model" size={48} />
                </div>
                <h2 className="max-w-3xl font-display text-3xl font-normal leading-display text-white md:text-4xl">
                  Intelligent Data Infrastructure and Agentic AI Systems
                </h2>
              </FadeUp>
              <FadeUp delay={0.15}>
                <p className="mt-2 font-body text-sm font-medium text-brass-light">
                  8–20 weeks — Implements the full decision infrastructure
                </p>
              </FadeUp>
              <FadeUp delay={0.2}>
                <p className="mt-6 max-w-3xl font-body text-base font-light leading-body text-white/60">
                  This is where the Foundation Sprint comes to life. We build the
                  data pipelines, executive dashboards, KPI tracking, and custom
                  agentic AI systems that automate analysis and surface the
                  insights your leadership needs.
                </p>
              </FadeUp>
              <FadeUp delay={0.3}>
                <ul className="mt-6 space-y-3">
                  {[
                    'Data pipelines, warehouse, and quality monitoring built for your systems',
                    'Executive dashboards and KPI tracking with automated reporting',
                    'Custom AI agents — insight summaries, forecasting, operations monitoring',
                    'AI-assisted intelligence that supports decisions, not replaces them',
                  ].map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-3 font-body text-sm font-light leading-body text-white/60"
                    >
                      <span className="mt-2 block h-px w-3 shrink-0 bg-brass" />
                      {point}
                    </li>
                  ))}
                </ul>
              </FadeUp>
            </div>
          </div>
        </div>
      </section>

      {/* Service 3: Fractional Leadership */}
      <section className="bg-navy-deep py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 md:grid-cols-2 md:gap-16 items-center">
            <div>
              <FadeUp>
                <SectionLabel label="Ongoing Advisory" index={3} />
              </FadeUp>
              <FadeUp delay={0.1}>
                <div className="mt-4 mb-3">
                  <ServiceIcon icon="advisory" size={48} />
                </div>
                <h2 className="max-w-3xl font-display text-3xl font-normal leading-display text-white md:text-4xl">
                  Fractional Head of Decision Intelligence
                </h2>
              </FadeUp>
              <FadeUp delay={0.15}>
                <p className="mt-2 font-body text-sm font-medium text-brass-light">
                  Monthly advisory — Senior data leadership without a full-time hire
                </p>
              </FadeUp>
              <FadeUp delay={0.2}>
                <p className="mt-6 max-w-3xl font-body text-base font-light leading-body text-white/60">
                  Decision infrastructure is not a one-time project. As your
                  organization evolves, your metrics, dashboards, and AI systems
                  need to evolve with it. Forte provides ongoing senior-level
                  leadership to keep everything aligned.
                </p>
              </FadeUp>
              <FadeUp delay={0.3}>
                <ul className="mt-6 space-y-3">
                  {[
                    'Metric governance and dashboard evolution as your organization grows',
                    'AI agent oversight and analytics strategy',
                    'Decision cadence facilitation for leadership teams',
                    'Data governance and continuous system optimization',
                  ].map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-3 font-body text-sm font-light leading-body text-white/60"
                    >
                      <span className="mt-2 block h-px w-3 shrink-0 bg-brass" />
                      {point}
                    </li>
                  ))}
                </ul>
              </FadeUp>
            </div>
            <ScaleIn delay={0.3}>
              <FractionalGraphic />
            </ScaleIn>
          </div>
        </div>
      </section>

      {/* Service 4: Assessment */}
      <section className="bg-navy py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 md:grid-cols-2 md:gap-16 items-center">
            <ScaleIn delay={0.1} className="order-2 md:order-1">
              <AssessmentGraphic />
            </ScaleIn>
            <div className="order-1 md:order-2">
              <FadeUp>
                <SectionLabel label="Starting Point" index={4} />
              </FadeUp>
              <FadeUp delay={0.1}>
                <div className="mt-4 mb-3">
                  <ServiceIcon icon="assessment" size={48} />
                </div>
                <h2 className="max-w-3xl font-display text-3xl font-normal leading-display text-white md:text-4xl">
                  AI and Data Health Assessment
                </h2>
              </FadeUp>
              <FadeUp delay={0.15}>
                <p className="mt-2 font-body text-sm font-medium text-brass-light">
                  2–3 weeks — A diagnostic before you invest
                </p>
              </FadeUp>
              <FadeUp delay={0.2}>
                <p className="mt-6 max-w-3xl font-body text-base font-light leading-body text-white/60">
                  Not sure where you stand? This focused diagnostic evaluates
                  your data maturity, AI readiness, and current architecture.
                  You walk away with a clear picture of what to prioritize and
                  a roadmap for getting there.
                </p>
              </FadeUp>
              <FadeUp delay={0.3}>
                <ul className="mt-6 space-y-3">
                  {[
                    'Data maturity assessment across your current systems and tools',
                    'AI risk evaluation and organizational readiness scoring',
                    'Architecture recommendations tailored to your stack',
                    'Prioritized roadmap with clear, actionable next steps',
                  ].map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-3 font-body text-sm font-light leading-body text-white/60"
                    >
                      <span className="mt-2 block h-px w-3 shrink-0 bg-brass" />
                      {point}
                    </li>
                  ))}
                </ul>
              </FadeUp>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-navy-deep py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <FadeUp>
            <SectionLabel label="How We Work" />
            <h2 className="mt-4 font-display text-3xl font-normal leading-display text-white md:text-4xl">
              A clear path from assessment to ongoing leadership.
            </h2>
          </FadeUp>
          <div className="mt-12 grid gap-8 md:grid-cols-4">
            {PROCESS_STEPS.map((step, i) => (
              <ScaleIn key={step.num} delay={0.1 * (i + 1)}>
                <div className="relative">
                  {/* Connecting line */}
                  {i < PROCESS_STEPS.length - 1 && (
                    <div className="absolute top-6 left-[calc(100%+0.5rem)] hidden h-px w-[calc(100%-1rem)] bg-gradient-to-r from-brass/30 to-brass/5 md:block" />
                  )}
                  <span className="font-display text-3xl font-medium text-brass-light">
                    {step.num}
                  </span>
                  <h3 className="mt-2 font-body text-base font-medium text-white">
                    {step.title}
                  </h3>
                  <p className="mt-2 font-body text-sm font-light leading-body text-white/60">
                    {step.body}
                  </p>
                </div>
              </ScaleIn>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-navy py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-6">
          <FadeUp>
            <SectionLabel label="Common Questions" />
          </FadeUp>
          <div className="mt-10 space-y-4">
            {FAQS.map((faq, i) => (
              <FadeUp key={faq.q} delay={0.1 * (i + 1)}>
                <details className="group rounded-sm border border-brass/10 bg-navy-mid transition-all duration-300 open:border-brass/30 open:shadow-[0_0_24px_rgba(160,120,64,0.06)]">
                  <summary className="cursor-pointer px-6 py-4 font-body text-sm font-medium text-white transition-colors hover:text-brass-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass">
                    {faq.q}
                  </summary>
                  <div className="px-6 pb-4">
                    <p className="font-body text-sm font-light leading-body text-white/60">
                      {faq.a}
                    </p>
                  </div>
                </details>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-20 md:py-28"
        style={{
          background:
            'linear-gradient(135deg, #060E1C 0%, #162444 50%, rgba(160,120,64,0.12) 100%)',
        }}
      >
        <div className="mx-auto max-w-3xl px-6 text-center">
          <FadeUp>
            <h2 className="font-display text-4xl font-normal leading-display text-white md:text-5xl">
              Start with a conversation, not a contract.
            </h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p className="mx-auto mt-4 max-w-lg font-body text-base font-light leading-body text-white/60">
              A 30-minute discovery call is all it takes to understand where you
              stand and which engagement makes sense. No pitch, no pressure.
            </p>
          </FadeUp>
          <FadeUp delay={0.2}>
            <div className="mt-8">
              <Button href="/contact" size="lg">
                Book a Discovery Call
              </Button>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  )
}
