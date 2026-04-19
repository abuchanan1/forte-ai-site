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
  title: 'Forte Insights | Services',
  description:
    'Four engagements. One decision infrastructure. AI agents, the data foundation underneath them, and the ongoing partnership that makes everything compound.',
  path: '/services',
})

const PROCESS_STEPS = [
  {
    num: '01',
    title: 'Assess',
    body: 'We evaluate your current data landscape, identify the gaps, and determine your readiness. You leave with the Decision Readiness Report and a clear next step.',
  },
  {
    num: '02',
    title: 'Design',
    body: 'We build the canonical map of your organization. The Decision Data Model, the KPI Framework, the Dashboard Blueprint. Leadership sees the shape of its own business, often for the first time.',
  },
  {
    num: '03',
    title: 'Build',
    body: 'We implement the Decision Engine. Pipelines, warehouse, dashboards, AI agents. Rigorously tested before anyone touches it.',
  },
  {
    num: '04',
    title: 'Evolve',
    body: 'Through fractional leadership, we keep your metrics, dashboards, and agents aligned with where the organization is going, and stay close to the Decision Cadence your team runs.',
  },
]

const FAQS = [
  {
    q: 'Where should we start if we are not sure what we need?',
    a: 'Most organizations start with either the AI and Data Health Assessment to get the Decision Readiness Report, or jump directly into the Foundation Sprint if they know they need a Decision Data Model. A 30-minute discovery call is usually enough to recommend the right starting point.',
  },
  {
    q: 'Do you only build AI agents, or do you still build dashboards?',
    a: 'We build both, but we lead with agents. Most leadership teams we work with already have dashboards, or have tried dashboards, and they still cannot get decisions made quickly. Agents are what move the needle. We still build dashboards where they are genuinely the best tool for the job, because sometimes a human just needs to see the number. But the wedge has shifted. Leaders want their time back, not more reports.',
  },
  {
    q: 'Do we need a technical team to work with Forte?',
    a: 'No. Forte is built for organizations without large data or engineering teams. We handle the technical architecture, data infrastructure, and AI implementation. Your team focuses on using the insights to make better decisions.',
  },
  {
    q: 'What size organization is Forte built for?',
    a: 'Our sweet spot is organizations with 50 to 500 employees. Large enough to have real data complexity, but often without dedicated data leadership. We also work with mission-driven organizations and nonprofits.',
  },
  {
    q: 'Do we own everything Forte builds?',
    a: 'Yes, completely. Every dashboard, data pipeline, AI agent, and framework belongs to your organization. No lock-in, no proprietary dependencies, no ongoing licensing of your own infrastructure.',
  },
  {
    q: 'What does "agentic AI" mean in practice?',
    a: 'Agentic AI systems are intelligent assistants that do specific jobs. Synthesizing meetings into action items. Generating audience-specific reporting. Answering the questions your team used to ask a dashboard. At Forte, every agent we build queries your Decision Data Model directly and keeps a human in the loop on decisions that matter, which is why ours are reliable instead of impressive-sounding.',
  },
  {
    q: 'What tools and platforms do you use?',
    a: 'It depends on the organization. We are vendor-agnostic and do not resell software. Our typical toolkit spans modern data warehouses (BigQuery, Snowflake, Postgres), BI and reporting tools (Looker Studio, Power BI, Tableau, Metabase), AI models (Claude, GPT, Gemini, and open-source options like Llama and Mistral when privacy or budget requires it), workflow platforms (Slack, Microsoft Teams, Notion), and whatever CRMs, program systems, and productivity tools the client already uses. We match the stack to the client, not the other way around. A fuller view of how we pick tools lives on the About page.',
  },
  {
    q: 'How is Forte different from a data engineering contractor?',
    a: 'Contractors require detailed requirements and management capacity that most teams don\'t have. Forte designs the decision infrastructure itself. The Decision Data Model, the governance framework, and the systems that determine what gets built and why. We start with leadership decisions and work backward to the data, not the other way around.',
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
              <span className="text-brass-light">One decision infrastructure.</span>
            </h1>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="mt-6 max-w-2xl font-body text-lg font-light leading-body text-white/60">
              Every Forte engagement produces a named, tangible artifact. Not a
              deck. Not a set of recommendations. A concrete piece of your
              decision infrastructure that your team owns, operates, and builds
              on.
            </p>
          </FadeUp>

          {/* Client Journey */}
          <FadeUp delay={0.3}>
            <div className="mt-12 rounded-sm border border-brass/15 bg-navy-mid/50 px-6 py-5">
              <p className="font-mono text-[10px] uppercase tracking-mono text-brass-light mb-3">Typical Client Journey</p>
              <div className="flex flex-wrap items-center gap-3 font-body text-sm text-white/60">
                <span className="rounded border border-brass/20 bg-brass/5 px-3 py-1.5 text-white/80">Decision Readiness Report</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-brass/40 shrink-0"><path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                <span className="rounded border border-brass/20 bg-brass/5 px-3 py-1.5 text-white/80">Decision Data Model</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-brass/40 shrink-0"><path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                <span className="rounded border border-brass/20 bg-brass/5 px-3 py-1.5 text-white/80">Decision Engine</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-brass/40 shrink-0"><path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                <span className="rounded border border-brass/20 bg-brass/5 px-3 py-1.5 text-white/80">Decision Cadence</span>
              </div>
              <p className="mt-3 font-body text-xs text-white/50">
                Most clients come to us because they want a Decision Engine. The agents. The Foundation Sprint exists because the agents need a clean place to run.
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* OFFERING 1: Building Your Decision Engine (Flagship) */}
      <section id="decision-engine" className="bg-navy-deep py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 md:grid-cols-2 md:gap-16 items-center">
            <div>
              <FadeUp>
                <SectionLabel label="Flagship" index={1} />
              </FadeUp>
              <FadeUp delay={0.1}>
                <div className="mt-4 mb-3">
                  <ServiceIcon icon="model" size={48} />
                </div>
                <h2 className="max-w-3xl font-display text-3xl font-normal leading-display text-white md:text-4xl">
                  Building Your Decision Engine
                </h2>
              </FadeUp>
              <FadeUp delay={0.15}>
                <p className="mt-2 font-body text-sm font-medium text-brass-light">
                  8–20 weeks. The Foundation Sprint, made real.
                </p>
              </FadeUp>
              <FadeUp delay={0.2}>
                <p className="mt-6 max-w-3xl font-body text-base font-light leading-body text-white/60">
                  This is where we build the AI agents that give your leadership
                  team its time back. Agents that synthesize your meetings,
                  draft your weekly reporting, and answer the questions your
                  team used to ask a dashboard. Every agent runs on a clean
                  data foundation we build in tandem, because an agent without
                  a reliable source of truth is just a fast way to get
                  confident wrong answers.
                </p>
              </FadeUp>
              <FadeUp delay={0.25}>
                <div className="mt-6 rounded-sm border border-brass/30 bg-brass/5 px-5 py-4">
                  <p className="font-mono text-[10px] uppercase tracking-mono text-brass-light">
                    Signature deliverable
                  </p>
                  <p className="mt-2 font-display text-xl font-normal leading-display text-white">
                    The Decision Engine
                  </p>
                  <p className="mt-2 font-body text-sm font-light leading-body text-white/70">
                    Your live, operating decision infrastructure. Data flows
                    in. Dashboards update. AI agents surface insights on your
                    canonical data. Leadership makes decisions from a single
                    source of truth.
                  </p>
                </div>
              </FadeUp>
              <FadeUp delay={0.3}>
                <p className="mt-6 font-mono text-[10px] uppercase tracking-mono text-white/50">
                  What you walk away with
                </p>
                <ul className="mt-3 space-y-3">
                  {[
                    {
                      bold: 'Custom AI agents built for specific jobs in your organization.',
                      rest: 'Meeting synthesis, automated reporting, priority alignment, branded collateral, and more',
                    },
                    {
                      bold: 'The data foundation underneath them.',
                      rest: 'Pipelines, warehouse, and the canonical model that makes the agents reliable',
                    },
                    {
                      bold: 'Dashboards where they still add value.',
                      rest: 'Because sometimes a human just needs to see the number',
                    },
                    {
                      bold: 'Complete documentation and full ownership.',
                      rest: 'No lock-in, no proprietary dependencies',
                    },
                  ].map((point) => (
                    <li
                      key={point.bold}
                      className="flex items-start gap-3 font-body text-sm font-light leading-body text-white/65"
                    >
                      <span className="mt-2 block h-px w-3 shrink-0 bg-brass" />
                      <span>
                        <strong className="font-medium text-white/85">{point.bold}</strong>{' '}
                        {point.rest}
                      </span>
                    </li>
                  ))}
                </ul>
              </FadeUp>
            </div>
            <ScaleIn delay={0.3}>
              <InfrastructureGraphic />
            </ScaleIn>
          </div>
        </div>
      </section>

      {/* OFFERING 2: Foundation Sprint */}
      <section id="foundation-sprint" className="bg-navy py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 md:grid-cols-2 md:gap-16 items-center">
            <ScaleIn delay={0.1} className="order-2 md:order-1">
              <FoundationGraphic />
            </ScaleIn>
            <div className="order-1 md:order-2">
              <FadeUp>
                <SectionLabel label="Foundation" index={2} />
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
                  6–8 weeks. The most common starting engagement.
                </p>
              </FadeUp>
              <FadeUp delay={0.2}>
                <p className="mt-6 max-w-3xl font-body text-base font-light leading-body text-white/60">
                  Your leadership team gains a clear operating system for
                  decision-making, and the foundation every AI agent needs to
                  be reliable. We define the metrics that matter, design the
                  canonical model of your organization&apos;s data, and hand off a
                  blueprint that every dashboard, report, and AI agent will
                  build on.
                </p>
              </FadeUp>
              <FadeUp delay={0.25}>
                <div className="mt-6 rounded-sm border border-brass/30 bg-brass/5 px-5 py-4">
                  <p className="font-mono text-[10px] uppercase tracking-mono text-brass-light">
                    Signature deliverable
                  </p>
                  <p className="mt-2 font-display text-xl font-normal leading-display text-white">
                    The Decision Data Model
                  </p>
                  <p className="mt-2 font-body text-sm font-light leading-body text-white/70">
                    The dimensions, facts, and data dictionary that become the
                    canonical map of your organization. Every downstream
                    investment, dashboards, reporting, AI, pulls from this
                    model.
                  </p>
                </div>
              </FadeUp>
              <FadeUp delay={0.3}>
                <p className="mt-6 font-mono text-[10px] uppercase tracking-mono text-white/50">
                  What you walk away with
                </p>
                <ul className="mt-3 space-y-3">
                  {[
                    'The Decision Data Model (the map, the tables, the dictionary)',
                    'The KPI Framework (the metrics that matter, defined and owned)',
                    'The Dashboard Blueprint (what leadership needs to see, and how)',
                    'A build-ready implementation roadmap',
                    'AI readiness evaluation and governance foundation',
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

      {/* OFFERING 3: Assessment */}
      <section id="assessment" className="bg-navy-deep py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 md:grid-cols-2 md:gap-16 items-center">
            <div>
              <FadeUp>
                <SectionLabel label="Starting Point" index={3} />
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
                  2–3 weeks. A diagnostic before you invest.
                </p>
              </FadeUp>
              <FadeUp delay={0.2}>
                <p className="mt-6 max-w-3xl font-body text-base font-light leading-body text-white/60">
                  Before you spend six figures on infrastructure or AI, you
                  should know exactly where you stand. This focused diagnostic
                  evaluates your data maturity, your decision clarity, and your
                  AI readiness, and tells you honestly whether you are ready to
                  build or whether the foundation needs work first.
                </p>
              </FadeUp>
              <FadeUp delay={0.25}>
                <div className="mt-6 rounded-sm border border-brass/30 bg-brass/5 px-5 py-4">
                  <p className="font-mono text-[10px] uppercase tracking-mono text-brass-light">
                    Signature deliverable
                  </p>
                  <p className="mt-2 font-display text-xl font-normal leading-display text-white">
                    The Decision Readiness Report
                  </p>
                  <p className="mt-2 font-body text-sm font-light leading-body text-white/70">
                    A written assessment of your organization&apos;s readiness
                    across four dimensions, scored and prioritized, ending in
                    a specific recommendation for what to do next.
                  </p>
                </div>
              </FadeUp>
              <FadeUp delay={0.3}>
                <p className="mt-6 font-mono text-[10px] uppercase tracking-mono text-white/50">
                  What you walk away with
                </p>
                <ul className="mt-3 space-y-3">
                  {[
                    'The Decision Readiness Report',
                    'A prioritized gap analysis (what to fix first, and why)',
                    'Architecture recommendations tailored to your existing stack',
                    'A clear roadmap for getting to decision-ready',
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
              <AssessmentGraphic />
            </ScaleIn>
          </div>
        </div>
      </section>

      {/* OFFERING 4: Fractional */}
      <section id="fractional" className="bg-navy py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 md:grid-cols-2 md:gap-16 items-center">
            <ScaleIn delay={0.1} className="order-2 md:order-1">
              <FractionalGraphic />
            </ScaleIn>
            <div className="order-1 md:order-2">
              <FadeUp>
                <SectionLabel label="Ongoing Advisory" index={4} />
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
                  We don&apos;t do handoffs. We develop partnerships.
                </p>
              </FadeUp>
              <FadeUp delay={0.2}>
                <p className="mt-6 max-w-3xl font-body text-base font-light leading-body text-white/60">
                  A Decision Engine is not a finished product. It is a living
                  system that needs to evolve as your organization does, and
                  as the AI itself does. Fractional keeps your metrics
                  governed, your dashboards current, and your AI agents sharp.
                  You own the decisions. We own the engine that powers them.
                </p>
              </FadeUp>
              <FadeUp delay={0.25}>
                <div className="mt-6 rounded-sm border border-brass/30 bg-brass/5 px-5 py-4">
                  <p className="font-mono text-[10px] uppercase tracking-mono text-brass-light">
                    Signature deliverable
                  </p>
                  <p className="mt-2 font-display text-xl font-normal leading-display text-white">
                    The Decision Engine Brief
                  </p>
                  <p className="mt-2 font-body text-sm font-light leading-body text-white/70">
                    A monthly written report on your decision engine: status,
                    what we caught, what we shipped, what is emerging in AI
                    that applies to your engine, and the lean-in time
                    available for the month. The watching and tuning is on
                    us. The decisions stay with you. The engine compounds in
                    capability month over month.
                  </p>
                </div>
              </FadeUp>
              <FadeUp delay={0.3}>
                <p className="mt-6 font-mono text-[10px] uppercase tracking-mono text-white/50">
                  What you walk away with (every month)
                </p>
                <ul className="mt-3 space-y-3">
                  {[
                    'The Decision Engine Brief — a monthly written report on engine status, what we shipped, what we are watching, and what is emerging in AI that applies to you',
                    'Continuous tuning of your AI agents — reconfigured as priorities shift, upgraded as models improve',
                    'Ongoing stewardship of your data model and dashboards — kept clean, current, and aligned with your organization',
                    'Up to 2 hours of lean-in time per month — strategic calls, team presentations, or coaching when you want me at the table',
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
              <FadeUp delay={0.35}>
                <div className="mt-8 rounded-sm border border-brass/20 bg-navy-mid/50 px-5 py-4">
                  <p className="font-mono text-[10px] uppercase tracking-mono text-brass-light">
                    Iterative by design
                  </p>
                  <p className="mt-2 font-body text-sm font-light leading-body text-white/70">
                    AI is improving in real time, and so is the work we do.
                    Every system we build is designed to be refined. We ship,
                    we watch, we test, we iterate, alongside the tools and
                    alongside our clients. The agent we deploy today is better
                    in six weeks because we are still in the work with you.
                    This is not a handoff. This is a compounding partnership.
                  </p>
                </div>
              </FadeUp>
            </div>
          </div>
        </div>
      </section>

      {/* CASE STUDY SECTION */}
      <section
        id="case-study"
        className="relative py-20 md:py-28"
        style={{
          background:
            'linear-gradient(135deg, #060E1C 0%, #0f1a33 50%, rgba(160,120,64,0.08) 100%)',
        }}
      >
        <div className="mx-auto max-w-5xl px-6">
          <FadeUp>
            <SectionLabel label="Case Study" />
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="mt-4 font-display text-3xl font-normal leading-display text-white md:text-4xl">
              Our flagship agent: five hours back every week for one executive leader.
            </h2>
          </FadeUp>

          <div className="mt-10 grid gap-10 md:grid-cols-2 md:gap-12">
            <FadeUp delay={0.15}>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-mono text-brass-light">
                  The situation
                </p>
                <p className="mt-3 font-body text-base font-light leading-body text-white/70">
                  An executive leader was spending five-plus hours every week
                  doing the same work by hand: reading back through her Zoom
                  transcripts, sifting through email threads, and trying to
                  pull out what actually needed to happen, who needed to do
                  it, and how it connected to her organization&apos;s strategic
                  priorities. The information was there. The synthesis was
                  killing her Fridays. And without a consistent system for
                  surfacing commitments, accountability across her team was
                  slipping through the cracks.
                </p>
              </div>
            </FadeUp>
            <FadeUp delay={0.2}>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-mono text-brass-light">
                  What we built
                </p>
                <p className="mt-3 font-body text-base font-light leading-body text-white/70">
                  A custom AI agent, built on Claude, that automatically reads
                  her emails and meeting transcripts and produces a weekly
                  brief broken down by team member. Each next step is clearly
                  assigned, with a named owner, and mapped back to the
                  organization&apos;s top strategic priorities.
                </p>
              </div>
            </FadeUp>
          </div>

          {/* Results strip */}
          <FadeUp delay={0.25}>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {[
                {
                  stat: '5+ hours',
                  label: 'Of executive time reclaimed every week',
                },
                {
                  stat: 'Clearer accountability',
                  label:
                    'Next steps are visible, owned, and tied to priorities, so fewer commitments disappear between meetings',
                },
                {
                  stat: 'A decision cadence',
                  label:
                    'That runs on the agent. Her team operates from a shared, synthesized source of truth',
                },
              ].map((r) => (
                <div
                  key={r.stat}
                  className="rounded-sm border border-brass/25 bg-navy-mid/60 p-6"
                >
                  <p className="font-display text-xl font-normal leading-display text-brass-light md:text-2xl">
                    {r.stat}
                  </p>
                  <p className="mt-2 font-body text-sm font-light leading-body text-white/65">
                    {r.label}
                  </p>
                </div>
              ))}
            </div>
          </FadeUp>

          <div className="mt-12 grid gap-10 md:grid-cols-2 md:gap-12">
            <FadeUp delay={0.3}>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-mono text-brass-light">
                  How it keeps getting better
                </p>
                <p className="mt-3 font-body text-base font-light leading-body text-white/70">
                  This engagement is not a one-time deliverable. As AI
                  capabilities advance, and they are advancing fast, we refine
                  the agent alongside them. New models, new features, new
                  integrations. Each iteration surfaces more time savings,
                  better synthesis, and tighter alignment. It is how we work
                  with every client. Rapid feedback, continuous testing, and a
                  system that compounds in value over time.
                </p>
              </div>
            </FadeUp>
            <FadeUp delay={0.35}>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-mono text-brass-light">
                  Why it worked
                </p>
                <p className="mt-3 font-body text-base font-light leading-body text-white/70">
                  This is what an AI agent looks like when it is built right.
                  The agent is not autonomous. It surfaces. The leader
                  decides. And because it queries a canonical set of
                  organizational priorities we defined up front, its
                  recommendations are useful instead of generically plausible.
                  We are still in the work with her, which means the agent
                  gets better every month as Claude gets better, as her team
                  grows, and as her priorities evolve. This is not a product
                  we sold her. It is a system we built with her.
                </p>
              </div>
            </FadeUp>
          </div>

          <FadeUp delay={0.4}>
            <p className="mt-10 font-body text-sm font-light italic leading-body text-white/55">
              See more agent work we build and are building on our{' '}
              <a
                href="/agents"
                className="text-brass-light underline decoration-brass/40 underline-offset-4 transition-colors hover:text-brass"
              >
                Agents
              </a>{' '}
              page.
            </p>
          </FadeUp>
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
