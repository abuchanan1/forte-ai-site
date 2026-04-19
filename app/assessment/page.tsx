import type { Metadata } from 'next'
import { createMetadata } from '@/lib/metadata'
import { FadeUp } from '@/components/ui/FadeUp'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Button } from '@/components/ui/Button'
import { DecisionReadinessDiagnostic } from '@/components/sections/DecisionReadinessDiagnostic'

export const metadata: Metadata = createMetadata({
  title: 'Decision Readiness Report',
  description:
    'A diagnostic for leadership teams at 50 to 500 person organizations. Ten minutes to answer. A branded Decision Readiness Report generated on the spot, downloadable as a PDF.',
  path: '/assessment',
})

const DIMENSIONS = [
  {
    title: 'Data maturity',
    question: 'How complete, accessible, and trustworthy is your data today?',
    body: 'If your team argues about which numbers are right, if nobody can tell you where the data lives, if dashboards contradict each other, this is the dimension that will land low. Most organizations start here.',
  },
  {
    title: 'Decision clarity',
    question: 'Does your leadership team know what decisions it actually needs to make better?',
    body: 'AI and data only amplify what you already know. Without clarity on which decisions matter most, even the best tools sit idle. A clear top-five decision list is rarer than most leaders think.',
  },
  {
    title: 'Architecture health',
    question: 'Does your current stack support where you are trying to go?',
    body: 'This includes where your data lives, who owns it, whether your systems talk to each other, and whether the people maintaining it would be hard to replace.',
  },
  {
    title: 'AI readiness',
    question: 'Could an AI agent produce reliable outputs on your foundation today?',
    body: 'This is the newest and least-understood dimension. Most organizations score lower here than they expect. A confident wrong answer from an agent is worse than no answer. The report tells you whether you can trust what an agent would produce.',
  },
]

const WHO_IT_IS_FOR = [
  {
    title: 'Executive Directors and CEOs',
    body: 'Your board is asking about AI. Your team is asking about dashboards. Before you commit budget, know exactly where you stand and where to invest first.',
  },
  {
    title: 'Operations and Program Leaders',
    body: 'You see the decisions that are not getting made fast enough. The report tells you whether the problem is your data, your process, or the people using them.',
  },
  {
    title: 'Anyone leading a data or AI initiative',
    body: 'Whether you just got funding or just got told to "figure out AI," the report gives you a defensible starting point and a plan.',
  },
]

const HOW_IT_WORKS = [
  {
    num: '01',
    title: 'Pick your track',
    body: 'The diagnostic is tailored by organization type. You answer the version built for you, not a generic quiz.',
  },
  {
    num: '02',
    title: 'Answer 15 questions',
    body: 'Most are about your systems and decisions. A few are about your team and your strategy. About ten minutes. No fluff.',
  },
  {
    num: '03',
    title: 'View and download your report',
    body: 'As soon as you finish, your Decision Readiness Report appears on screen. Four dimension scores. A prioritized gap analysis. A key insight tailored to your answers. A recommended next step. Download the PDF. Yours to keep, hire Forte or not.',
  },
]

const WHAT_YOU_WILL_NOT_GET = [
  {
    bold: 'It will not tell you "you need AI" because you took an AI readiness diagnostic.',
    rest: 'We are not in the business of telling everyone they need AI. If your answers suggest you are not ready yet, the report will say so and name the foundation work that comes first.',
  },
  {
    bold: 'It will not put you on an aggressive sales cadence.',
    rest: 'The report is generated for you on the spot. You are free to use it however you want.',
  },
  {
    bold: 'It will not replace a real conversation.',
    rest: 'If your situation is nuanced, the report will say so and suggest a discovery call as the right next step.',
  },
]

export default function AssessmentPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy pt-32 pb-20 md:pt-40 md:pb-24">
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(135deg, #060E1C 0%, #162444 50%, rgba(160,120,64,0.12) 100%)',
          }}
        />
        <div className="relative mx-auto max-w-4xl px-6">
          <FadeUp>
            <SectionLabel label="Decision Readiness Report" />
          </FadeUp>
          <FadeUp delay={0.1}>
            <h1 className="mt-6 font-display text-4xl font-normal leading-display text-white md:text-6xl">
              Before you invest in AI, find out if you&apos;re ready.
            </h1>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="mt-6 max-w-2xl font-body text-lg font-light leading-body text-white/70">
              A diagnostic for leadership teams at 50-to-500 person
              organizations. Ten minutes to answer. A branded Decision
              Readiness Report generated on the spot, downloadable as a PDF.
            </p>
          </FadeUp>
          <FadeUp delay={0.3}>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button href="#diagnostic" size="lg">
                Start the Diagnostic →
              </Button>
              <Button href="/contact" variant="ghost" size="lg">
                Book a discovery call instead →
              </Button>
            </div>
          </FadeUp>
          <FadeUp delay={0.4}>
            <ul className="mt-12 flex flex-wrap gap-x-8 gap-y-3 font-mono text-[11px] uppercase tracking-mono text-white/55">
              <li className="flex items-center gap-2">
                <span className="inline-block h-1 w-1 rounded-full bg-brass" />
                10 minutes · 15 questions
              </li>
              <li className="flex items-center gap-2">
                <span className="inline-block h-1 w-1 rounded-full bg-brass" />
                Instant PDF report · No sales call required
              </li>
              <li className="flex items-center gap-2">
                <span className="inline-block h-1 w-1 rounded-full bg-brass" />
                Confidential and yours to keep
              </li>
            </ul>
          </FadeUp>
        </div>
      </section>

      {/* Section 2: What the Diagnostic Answers */}
      <section className="bg-navy-deep py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-6">
          <FadeUp>
            <SectionLabel label="What the report tells you" />
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="mt-4 font-display text-3xl font-normal leading-display text-white md:text-4xl">
              Four questions your leadership team deserves a real answer to.
            </h2>
          </FadeUp>
          <FadeUp delay={0.15}>
            <p className="mt-6 max-w-3xl font-body text-base font-light leading-body text-white/65">
              Most organizations cannot honestly answer whether their
              foundation is ready for AI. Boards are asking about it. Teams
              are asking about dashboards. Vendors are pitching agents. In
              the middle of all that noise, leaders are making commitments
              they are not sure they can back up. The Decision Readiness
              Report gives you a written answer built from the same framework
              I use with paid clients during the first phase of any Forte
              engagement.
            </p>
          </FadeUp>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {DIMENSIONS.map((d, i) => (
              <FadeUp key={d.title} delay={0.1 * (i + 1)}>
                <div className="h-full rounded-sm border border-brass/20 bg-navy-mid/50 p-6">
                  <h3 className="font-display text-xl font-normal leading-display text-white">
                    {d.title}
                  </h3>
                  <p className="mt-2 font-body text-sm font-light italic leading-body text-brass-light">
                    {d.question}
                  </p>
                  <p className="mt-4 font-body text-sm font-light leading-body text-white/65">
                    {d.body}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Who This Is For */}
      <section className="bg-navy py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-6">
          <FadeUp>
            <SectionLabel label="Built for" />
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="mt-4 font-display text-3xl font-normal leading-display text-white md:text-4xl">
              Leaders making the call, not watching someone else make it.
            </h2>
          </FadeUp>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {WHO_IT_IS_FOR.map((w, i) => (
              <FadeUp key={w.title} delay={0.1 * (i + 1)}>
                <div className="h-full rounded-sm border border-brass/15 bg-navy-mid/40 p-6">
                  <h3 className="font-body text-base font-medium text-white">
                    {w.title}
                  </h3>
                  <p className="mt-3 font-body text-sm font-light leading-body text-white/65">
                    {w.body}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: How It Works */}
      <section className="bg-navy-deep py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-6">
          <FadeUp>
            <SectionLabel label="The flow" />
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="mt-4 font-display text-3xl font-normal leading-display text-white md:text-4xl">
              Ten minutes to answer. Your report generated on the spot.
            </h2>
          </FadeUp>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {HOW_IT_WORKS.map((step, i) => (
              <FadeUp key={step.num} delay={0.1 * (i + 1)}>
                <div className="relative">
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
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: Social Proof */}
      <section
        className="py-20 md:py-28"
        style={{
          background:
            'linear-gradient(135deg, #060E1C 0%, #0f1a33 50%, rgba(160,120,64,0.08) 100%)',
        }}
      >
        <div className="mx-auto max-w-3xl px-6">
          <FadeUp>
            <SectionLabel label="From a real client" />
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="mt-4 font-display text-3xl font-normal leading-display text-white md:text-4xl">
              &ldquo;I got my Fridays back.&rdquo;
            </h2>
          </FadeUp>
          <FadeUp delay={0.15}>
            <blockquote className="mt-8 border-l-2 border-brass pl-6 font-body text-base font-light italic leading-body text-white/75">
              &ldquo;I was spending five hours a week turning meeting notes
              into action items. Forte built an agent that reads my emails
              and Zoom transcripts and hands me a prioritized list of next
              steps for every person on my team, already tied to our
              strategic priorities. I got my Fridays back, and my team is
              more accountable than it has ever been.&rdquo;
              <footer className="mt-4 font-body text-sm not-italic text-white/55">
                — Executive leader, Forte client
              </footer>
            </blockquote>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="mt-6 font-body text-sm font-light italic leading-body text-white/55">
              <a
                href="/services#case-study"
                className="text-brass-light underline decoration-brass/40 underline-offset-4 hover:text-brass"
              >
                Read the full case study →
              </a>
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Section 6: What You Will Not Get */}
      <section className="bg-navy py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-6">
          <FadeUp>
            <SectionLabel label="Honest expectations" />
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="mt-4 font-display text-3xl font-normal leading-display text-white md:text-4xl">
              Things the diagnostic will not do.
            </h2>
          </FadeUp>
          <ul className="mt-10 space-y-5">
            {WHAT_YOU_WILL_NOT_GET.map((item, i) => (
              <FadeUp key={item.bold} delay={0.05 * (i + 1)}>
                <li className="flex gap-4 font-body text-base font-light leading-body text-white/70">
                  <span className="mt-2 block h-px w-4 shrink-0 bg-brass" />
                  <span>
                    <strong className="font-medium text-white">{item.bold}</strong>{' '}
                    {item.rest}
                  </span>
                </li>
              </FadeUp>
            ))}
          </ul>
        </div>
      </section>

      {/* The diagnostic itself */}
      <DecisionReadinessDiagnostic />

      {/* Closing CTA */}
      <section className="bg-navy-deep py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <FadeUp>
            <h2 className="font-display text-4xl font-normal leading-display text-white md:text-5xl">
              Find out where you stand.
            </h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p className="mx-auto mt-6 max-w-2xl font-body text-base font-light leading-body text-white/65">
              The Decision Readiness Report is the first step of Forte&apos;s
              engagement ladder. It is the same diagnostic we run with paid
              clients, opened up because we would rather have a clear
              starting conversation than sell you the wrong engagement.
            </p>
          </FadeUp>
          <FadeUp delay={0.15}>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Button href="#diagnostic" size="lg">
                Start the Diagnostic →
              </Button>
              <Button href="/contact" variant="ghost" size="lg">
                Book a discovery call instead →
              </Button>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  )
}
