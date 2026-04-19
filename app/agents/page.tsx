import type { Metadata } from 'next'
import { createMetadata } from '@/lib/metadata'
import { FadeUp } from '@/components/ui/FadeUp'
import { ScaleIn } from '@/components/ui/ScaleIn'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Button } from '@/components/ui/Button'

export const metadata: Metadata = createMetadata({
  title: 'AI Agents for Leadership Teams',
  description:
    'We build AI agents that give leadership teams their time back. The agent surfaces. The humans decide. Every agent runs on a clean data foundation.',
  path: '/agents',
})

const ROADMAP_ARCHETYPES = [
  {
    name: 'The Priority Agent',
    body: 'An agent that answers specific questions about how work aligns to organizational priorities. A leader asks, "Is this project still aligned with our Q2 goals?" and the agent pulls from strategy docs, recent decisions, and project data to answer with evidence, not opinion.',
    bestFor:
      'Leaders who are making alignment calls every week and want a second set of eyes grounded in their own strategy documents.',
  },
  {
    name: 'The Reporting Agent',
    body: 'An agent that generates automated reporting for specific audiences, tailored to what each audience actually needs to see. Board members get one version. Program staff get another. Funders get a third. All drawn from the same underlying model, all refreshed on a cadence, all written in a voice that matches the audience.',
    bestFor:
      'Organizations whose team is spending multiple hours per month producing repetitive reports that draw from the same data in different shapes.',
  },
  {
    name: 'The Question Agent',
    body: 'An agent that answers the questions people used to open a dashboard to answer. "How are enrollments tracking this month?" "Which programs are over budget?" "Who on our team has an outstanding commitment to the board?" Delivered in a sentence, with a cited answer, queryable from wherever the leader already works (Slack, email, chat).',
    bestFor: 'Leadership teams who have dashboards nobody looks at.',
  },
  {
    name: 'The Collateral Agent',
    body: 'An agent that produces branded visual artifacts on demand. Charts, graphs, one-pagers, board slides. Every output is styled to the organization\u2019s brand and sourced from the canonical data model.',
    bestFor:
      'Organizations whose communications team spends hours every week making the same chart in the same style with slightly different numbers.',
  },
]

const HOW_STEPS = [
  {
    num: '01',
    title: 'Start with a job.',
    body: 'We do not build agents in search of a problem. We find a specific, repeated piece of work a human is doing today that an agent could do better, and we scope from there.',
  },
  {
    num: '02',
    title: 'Ground it in the data.',
    body: 'Agents work when they query a clean, canonical source of truth. If the client has one, we build on it. If they do not, we build a Decision Data Model first. Skipping this step is how most AI projects fail.',
  },
  {
    num: '03',
    title: 'Ship a minimum viable version fast.',
    body: 'The first version of an agent is never the best version. We get something real running, put it in front of the human who will use it, and refine based on how they actually use it.',
  },
  {
    num: '04',
    title: 'Keep refining.',
    body: 'AI improves constantly. Agents we shipped last quarter are more capable today than they were then, because we are still in the work. This is the Decision Cadence, and it is how value compounds instead of decays.',
  },
]

export default function AgentsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-navy pt-32 pb-20 md:pt-44 md:pb-28 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(135deg, #060E1C 0%, #162444 50%, rgba(160,120,64,0.12) 100%)',
          }}
        />
        <div className="relative mx-auto max-w-7xl px-6">
          <FadeUp>
            <SectionLabel label="Our Work" />
          </FadeUp>
          <FadeUp delay={0.1}>
            <h1 className="mt-6 max-w-4xl font-display text-5xl font-normal leading-display text-white md:text-7xl">
              We build AI agents that make{' '}
              <span className="text-brass-light">leadership teams faster.</span>
            </h1>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="mt-6 max-w-2xl font-body text-lg font-light leading-body text-white/65">
              Every agent we build is designed around a single principle. The
              agent surfaces. The human decides. We build the data foundation
              underneath, so when the agent answers, it is answering from the
              same canonical source of truth every dashboard and report runs
              on.
            </p>
          </FadeUp>
          <FadeUp delay={0.3}>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button href="/contact" size="lg">
                Book a Discovery Call
              </Button>
              <Button href="#flagship" variant="ghost" size="lg">
                See the Flagship
              </Button>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* SECTION 1: What we believe */}
      <section className="bg-navy-deep py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-6">
          <FadeUp>
            <SectionLabel label="What we believe" index={1} />
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="mt-4 font-display text-3xl font-normal leading-display text-white md:text-4xl">
              What we believe about AI agents.
            </h2>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="mt-6 font-body text-base font-light leading-body text-white/65">
              The best agent is not the most autonomous one. It is the one
              that compresses messy reality into something a leader can act on
              in under a minute, without taking the judgment out of their
              hands.
            </p>
            <p className="mt-4 font-body text-base font-light leading-body text-white/65">
              We build agents for leadership teams at 50-to-500 person
              organizations. These are leaders whose entire value to their
              board is judgment. You cannot automate judgment away. You can
              amplify it.
            </p>
          </FadeUp>
          <FadeUp delay={0.3}>
            <p className="mt-8 font-body text-base font-medium text-white">
              Every agent we ship follows three rules:
            </p>
            <ul className="mt-4 space-y-4">
              {[
                {
                  bold: 'It surfaces. A human decides.',
                  rest: 'Agents propose. Agents synthesize. Agents draft. They do not send, publish, or commit without a human in the loop on the decisions that matter.',
                },
                {
                  bold: 'It queries a canonical source of truth.',
                  rest: 'Every agent we build runs on top of a Decision Data Model, which is why ours produce reliable outputs instead of confident guesses.',
                },
                {
                  bold: 'It improves over time.',
                  rest: 'AI is getting better every month. We stay in the work with our clients, refining the agent as the tools evolve.',
                },
              ].map((rule) => (
                <li
                  key={rule.bold}
                  className="flex items-start gap-3 font-body text-base font-light leading-body text-white/70"
                >
                  <span className="mt-3 block h-px w-3 shrink-0 bg-brass" />
                  <span>
                    <strong className="font-medium text-white">{rule.bold}</strong>{' '}
                    {rule.rest}
                  </span>
                </li>
              ))}
            </ul>
          </FadeUp>
        </div>
      </section>

      {/* SECTION 2: The Flagship (Deployed) */}
      <section
        id="flagship"
        className="relative py-24 md:py-32"
        style={{
          background:
            'linear-gradient(135deg, #060E1C 0%, #0f1a33 50%, rgba(160,120,64,0.12) 100%)',
        }}
      >
        <div className="mx-auto max-w-6xl px-6">
          <FadeUp>
            <div className="inline-flex items-center gap-2 rounded-sm border border-brass/40 bg-brass/10 px-3 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-brass-light" />
              <span className="font-mono text-[10px] uppercase tracking-mono text-brass-light">
                Deployed
              </span>
            </div>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="mt-5 font-display text-4xl font-normal leading-display text-white md:text-5xl">
              The Synthesis Agent
            </h2>
          </FadeUp>
          <FadeUp delay={0.15}>
            <p className="mt-4 font-body text-lg font-light leading-body text-brass-light">
              Five hours a week, back in a leader&apos;s hands.
            </p>
          </FadeUp>

          <FadeUp delay={0.2}>
            <div className="mt-10 rounded-sm border border-brass/30 bg-navy-deep/60 p-8 md:p-10">
              <p className="font-body text-base font-light leading-body text-white/75">
                The first agent we deployed reads an executive leader&apos;s emails
                and Zoom transcripts every week and produces a prioritized
                brief of next steps, broken down by team member, each one
                mapped to the organization&apos;s strategic priorities.
              </p>
              <p className="mt-4 font-body text-base font-light leading-body text-white/75">
                Before the agent, she was spending more than five hours every
                week doing that synthesis by hand. Now she opens her inbox on
                Friday morning and the work is already done.
              </p>
            </div>
          </FadeUp>

          <div className="mt-10 grid gap-8 md:grid-cols-2">
            <FadeUp delay={0.25}>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-mono text-brass-light">
                  What it does
                </p>
                <ul className="mt-3 space-y-2.5">
                  {[
                    'Reads emails and meeting transcripts automatically',
                    'Identifies commitments, action items, and open questions',
                    'Assigns each next step to a named owner on her team',
                    "Maps every item back to the organization's top strategic priorities",
                    'Delivers a single weekly brief to her inbox',
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 font-body text-sm font-light leading-body text-white/65"
                    >
                      <span className="mt-2 block h-px w-3 shrink-0 bg-brass" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeUp>
            <FadeUp delay={0.3}>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-mono text-brass-light">
                  What changed
                </p>
                <ul className="mt-3 space-y-2.5">
                  {[
                    'Five-plus hours of executive time reclaimed every week',
                    'Clearer accountability across her leadership team, because commitments are visible and owned',
                    'A weekly decision cadence that runs on the agent, not in spite of it',
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 font-body text-sm font-light leading-body text-white/65"
                    >
                      <span className="mt-2 block h-px w-3 shrink-0 bg-brass" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeUp>
          </div>

          <FadeUp delay={0.35}>
            <div className="mt-10 rounded-sm border border-brass/15 bg-navy/40 p-6 md:p-8">
              <p className="font-mono text-[10px] uppercase tracking-mono text-brass-light">
                Why it works
              </p>
              <p className="mt-3 font-body text-base font-light leading-body text-white/70">
                The agent is not just summarizing meetings. It pulls against a
                defined set of organizational priorities, part of the client&apos;s
                Decision Data Model, which is what makes its recommendations
                useful instead of generically plausible.
              </p>
              <p className="mt-4 font-body text-sm font-light italic leading-body text-white/55">
                Read the full{' '}
                <a
                  href="/services#case-study"
                  className="text-brass-light underline decoration-brass/40 underline-offset-4 transition-colors hover:text-brass"
                >
                  case study
                </a>{' '}
                on the Solutions page.
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* SECTION 3: What we are building next */}
      <section className="bg-navy py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <FadeUp>
            <SectionLabel label="Roadmap" index={3} />
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="mt-4 font-display text-3xl font-normal leading-display text-white md:text-4xl">
              What we are building next.
            </h2>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="mt-6 max-w-3xl font-body text-base font-light leading-body text-white/65">
              Every agent we build starts with a client problem, not a
              product. The Synthesis Agent came from one leader&apos;s weekly
              bottleneck. These are the archetypes we are extending the
              practice into, based on the conversations we are having with
              current and prospective clients.
            </p>
            <p className="mt-4 max-w-3xl font-body text-base font-light leading-body text-white/65">
              If any of these sound like a job you want done inside your own
              organization, we would rather co-develop with you than sell you
              something off a shelf.
            </p>
          </FadeUp>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {ROADMAP_ARCHETYPES.map((a, i) => (
              <ScaleIn key={a.name} delay={0.1 * (i + 1)}>
                <div className="flex h-full flex-col rounded-sm border border-white/10 bg-navy-mid/40 p-6 md:p-8">
                  <div className="inline-flex items-center gap-2 self-start rounded-sm border border-white/20 bg-white/5 px-2.5 py-1">
                    <span className="h-1 w-1 rounded-full bg-white/60" />
                    <span className="font-mono text-[9px] uppercase tracking-mono text-white/60">
                      Roadmap
                    </span>
                  </div>
                  <h3 className="mt-4 font-display text-xl font-normal leading-display text-white md:text-2xl">
                    {a.name}
                  </h3>
                  <p className="mt-4 font-body text-sm font-light leading-body text-white/65">
                    {a.body}
                  </p>
                  <p className="mt-4 font-body text-xs font-light leading-body text-white/45">
                    <span className="font-medium uppercase tracking-mono text-brass/70">
                      Best for:
                    </span>{' '}
                    {a.bestFor}
                  </p>
                </div>
              </ScaleIn>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: How we build */}
      <section className="bg-navy-deep py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <FadeUp>
            <SectionLabel label="How we build" index={4} />
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="mt-4 font-display text-3xl font-normal leading-display text-white md:text-4xl">
              How we build agents.
            </h2>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="mt-6 max-w-3xl font-body text-base font-light leading-body text-white/65">
              Every agent engagement follows the same rhythm.
            </p>
          </FadeUp>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {HOW_STEPS.map((step, i) => (
              <FadeUp key={step.num} delay={0.1 * (i + 1)}>
                <div className="flex gap-5">
                  <span className="font-display text-3xl font-medium text-brass-light">
                    {step.num}
                  </span>
                  <div>
                    <h3 className="font-body text-lg font-medium text-white">
                      {step.title}
                    </h3>
                    <p className="mt-2 font-body text-sm font-light leading-body text-white/65">
                      {step.body}
                    </p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>

          <FadeUp delay={0.5}>
            <div className="mt-12 rounded-sm border border-brass/20 bg-navy-mid/50 p-6 md:p-8">
              <p className="font-body text-base font-light leading-body text-white/70">
                We build with whatever stack best fits the client. Claude and
                the Anthropic API are our most frequent choice for the
                reasoning layer, but we match the model and the orchestration
                tooling to the client&apos;s scale, data environment, and budget.
              </p>
              <p className="mt-4 font-body text-sm font-light italic leading-body text-white/55">
                For the deeper story on why this matters, read{' '}
                <a
                  href="/blog/ai-agents-are-only-as-good-as-your-infrastructure"
                  className="text-brass-light underline decoration-brass/40 underline-offset-4 transition-colors hover:text-brass"
                >
                  AI Agents Are Only as Good as Your Infrastructure
                </a>
                .
              </p>
            </div>
          </FadeUp>
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
              Have a job you want an agent to do?
            </h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p className="mx-auto mt-6 max-w-xl font-body text-base font-light leading-body text-white/60">
              We build one at a time, in partnership with the leader who will
              use it. If you have a weekly task, a reporting burden, or a
              question your team keeps asking and never getting a clean answer
              to, we should talk.
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
