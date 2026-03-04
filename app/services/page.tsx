import type { Metadata } from 'next'
import { createMetadata } from '@/lib/metadata'
import { FadeUp } from '@/components/ui/FadeUp'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { StatItem } from '@/components/ui/StatItem'
import { Button } from '@/components/ui/Button'

export const metadata: Metadata = createMetadata({
  title: 'Solutions',
  description:
    'Data pipelines, AI dashboards, and custom model building. From kickoff to live in 12 weeks.',
  path: '/services',
})

const PROCESS_STEPS = [
  {
    num: '01',
    title: 'Discovery',
    body: 'We map your current data landscape, identify gaps and opportunities, and define the outcomes that matter most to your organization.',
  },
  {
    num: '02',
    title: 'Architecture',
    body: 'We design the infrastructure, integrations, and model specifications tailored to your systems and your goals.',
  },
  {
    num: '03',
    title: 'Build and Test',
    body: 'We build, connect, and rigorously test everything before a single user touches it.',
  },
  {
    num: '04',
    title: 'Deploy and Enable',
    body: 'We go live, train your team, and stay close through the first 30 days to make sure everything performs as promised.',
  },
]

const FAQS = [
  {
    q: 'Do we need a technical team in-house to work with Forte?',
    a: 'No. Forte is specifically built for organizations without large data or engineering teams. We handle the technical architecture entirely. Your team stays focused on using the insights, not building the infrastructure.',
  },
  {
    q: 'How long does a typical Forte engagement take?',
    a: 'Most organizations are fully deployed within 12 weeks from kickoff. The timeline depends on the complexity of your existing systems and the scope of your engagement. We will give you an accurate estimate during your discovery call.',
  },
  {
    q: 'Do we own the data infrastructure and models Forte builds?',
    a: 'Yes, completely. Everything Forte builds belongs to your organization. There is no proprietary lock-in, no ongoing licensing of your own infrastructure, and no dependency on Forte to keep things running.',
  },
  {
    q: 'Can Forte integrate with the tools we already use?',
    a: 'In most cases, yes. Forte is built to connect existing systems rather than replace them. During discovery we map your current stack and confirm compatibility before any work begins.',
  },
  {
    q: 'How is Forte different from hiring a data science team?',
    a: 'A data science hire takes months to recruit, costs significantly more annually, and typically focuses on one problem at a time. Forte brings a full team with cross-industry experience, deploys in weeks, and hands you infrastructure that works independently once it is built.',
  },
]

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy pt-32 pb-20 md:pt-44 md:pb-28">
        <div className="mx-auto max-w-7xl px-6">
          <FadeUp>
            <SectionLabel label="Our Solutions" />
          </FadeUp>
          <FadeUp delay={0.1}>
            <h1 className="mt-6 font-display text-5xl font-normal leading-display text-white md:text-7xl">
              Three services. One outcome.
              <br />
              <span className="text-brass-light">Better decisions, faster.</span>
            </h1>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="mt-6 max-w-2xl font-body text-lg font-light leading-body text-white/60">
              Every Forte engagement is built around a single question: what does
              your organization need to know, and how do we get you there as
              directly as possible?
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Service 1 */}
      <section className="bg-navy-deep py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <FadeUp>
            <SectionLabel label="Foundation" index={1} />
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="mt-4 max-w-3xl font-display text-3xl font-normal leading-display text-white md:text-4xl">
              Your data should work together. We make that happen.
            </h2>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="mt-2 font-body text-sm font-medium text-brass-light">
              What you get: one source of truth across your entire organization.
            </p>
          </FadeUp>
          <FadeUp delay={0.3}>
            <p className="mt-6 max-w-3xl font-body text-base font-light leading-body text-white/60">
              Most organizations are not missing data. They are missing connected
              data. Your CRM, your ERP, your spreadsheets, your third-party
              tools, they each tell part of the story. Forte builds the
              infrastructure that brings them together into a single, clean,
              reliable data layer your entire organization can build on.
            </p>
          </FadeUp>
          <FadeUp delay={0.4}>
            <ul className="mt-6 space-y-3">
              {[
                'Automated pipelines that replace manual data exports and transfers',
                'Unified data layer across all your existing systems and tools',
                'Real-time sync so your numbers are never a day, a week, or a quarter behind',
                'Built to scale as your organization grows without rebuilding from scratch',
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
          <FadeUp delay={0.5}>
            <div className="mt-8">
              <StatItem num="70%" label="Reduction in manual reporting" />
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Service 2 */}
      <section className="bg-navy py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <FadeUp>
            <SectionLabel label="Visibility" index={2} />
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="mt-4 max-w-3xl font-display text-3xl font-normal leading-display text-white md:text-4xl">
              Stop reading reports. Start reading your business.
            </h2>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="mt-2 font-body text-sm font-medium text-brass-light">
              What you get: the right information, in front of the right people,
              at the right moment.
            </p>
          </FadeUp>
          <FadeUp delay={0.3}>
            <p className="mt-6 max-w-3xl font-body text-base font-light leading-body text-white/60">
              Most dashboards tell you what happened. Forte dashboards tell you
              what it means. We design intelligent reporting systems built around
              how your leadership actually makes decisions, not around what your
              data warehouse happens to export. No more decoding charts. No more
              chasing analysts for context.
            </p>
          </FadeUp>
          <FadeUp delay={0.4}>
            <ul className="mt-6 space-y-3">
              {[
                'Executive dashboards that surface priorities, not just metrics',
                'Operational views built for the teams running the day-to-day',
                'Automated alerts when something needs attention before it becomes a problem',
                'Designed for non-technical users so insights reach the people who act on them',
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
          <FadeUp delay={0.5}>
            <div className="mt-8">
              <StatItem num="Weeks → Hours" label="Reporting cycle reduction" />
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Service 3 */}
      <section className="bg-navy-deep py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <FadeUp>
            <SectionLabel label="Intelligence" index={3} />
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="mt-4 max-w-3xl font-display text-3xl font-normal leading-display text-white md:text-4xl">
              Your data knows what is coming. Let us prove it.
            </h2>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="mt-2 font-body text-sm font-medium text-brass-light">
              What you get: AI models built on your data, tuned to your specific
              business questions.
            </p>
          </FadeUp>
          <FadeUp delay={0.3}>
            <p className="mt-6 max-w-3xl font-body text-base font-light leading-body text-white/60">
              Off-the-shelf AI tools answer generic questions. Forte builds
              models that answer yours. Whether you need to predict customer
              churn, forecast demand, identify operational inefficiencies, or
              surface risks before they materialize, we design, train, and deploy
              models tuned to your industry, your data, and your outcomes.
            </p>
          </FadeUp>
          <FadeUp delay={0.4}>
            <ul className="mt-6 space-y-3">
              {[
                'Predictive models that anticipate outcomes before they happen',
                'Diagnostic models that surface root causes instead of symptoms',
                'Prescriptive recommendations that tell your team what to do next',
                'Explainable outputs your leadership can trust and act on',
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
          <FadeUp delay={0.5}>
            <div className="mt-8">
              <StatItem num="60 days" label="Earlier risk identification" />
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Process */}
      <section className="bg-navy py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <FadeUp>
            <SectionLabel label="How It Works" />
            <h2 className="mt-4 font-display text-3xl font-normal leading-display text-white md:text-4xl">
              From kickoff to live in 12 weeks.
            </h2>
          </FadeUp>
          <div className="mt-12 grid gap-8 md:grid-cols-4">
            {PROCESS_STEPS.map((step, i) => (
              <FadeUp key={step.num} delay={0.1 * (i + 1)}>
                <div>
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

      {/* FAQ */}
      <section className="bg-navy-deep py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-6">
          <FadeUp>
            <SectionLabel label="Common Questions" />
          </FadeUp>
          <div className="mt-10 space-y-4">
            {FAQS.map((faq, i) => (
              <FadeUp key={faq.q} delay={0.1 * (i + 1)}>
                <details className="group rounded-sm border border-brass/10 bg-navy-mid open:border-brass/30">
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
              See which solution fits your organization.
            </h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <div className="mt-8">
              <Button href="/contact" size="lg">
                Request a Demo
              </Button>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  )
}
