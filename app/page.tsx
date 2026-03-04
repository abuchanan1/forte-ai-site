import type { Metadata } from 'next'
import { createMetadata } from '@/lib/metadata'
import { COMPANY, SERVICES, STATS } from '@/lib/constants'
import { FadeUp } from '@/components/ui/FadeUp'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { StatRow } from '@/components/ui/StatRow'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

export const metadata: Metadata = createMetadata({
  title: 'Data Intelligence. Democratized.',
  description: COMPANY.description,
  path: '/',
})

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy pt-32 pb-20 md:pt-44 md:pb-28">
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(135deg, #060E1C 0%, #162444 50%, rgba(160,120,64,0.12) 100%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
            backgroundSize: '256px 256px',
          }}
        />
        <div className="relative mx-auto max-w-7xl px-6">
          <FadeUp>
            <SectionLabel label="Data Intelligence. Democratized." />
          </FadeUp>
          <FadeUp delay={0.1}>
            <h1 className="mt-6 font-display text-5xl font-normal leading-display text-white md:text-7xl">
              Your data is speaking.
              <br />
              We make it{' '}
              <em className="not-italic text-brass-light" style={{ fontStyle: 'italic' }}>
                unmistakable.
              </em>
            </h1>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="mt-6 max-w-2xl font-body text-lg font-light leading-body text-white/60">
              Most organizations are sitting on more data than they know what to
              do with. Forte connects it, interprets it, and puts it in front of
              the people who need it most, without requiring a PhD to use it.
            </p>
          </FadeUp>
          <FadeUp delay={0.3}>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button href="/services" size="lg">
                See How It Works
              </Button>
              <Button href="/services" variant="ghost" size="lg">
                View Case Studies
              </Button>
            </div>
          </FadeUp>
          <FadeUp delay={0.4}>
            <div className="mt-16">
              <StatRow stats={STATS} />
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Logo Bar */}
      <section className="border-y border-brass/10 bg-navy-deep py-10">
        <div className="mx-auto max-w-7xl px-6">
          <FadeUp>
            <p className="mb-6 text-center font-mono text-[10px] font-normal uppercase tracking-mono text-white/40">
              Trusted by organizations that run on data
            </p>
            <div className="flex flex-wrap items-center justify-center gap-10">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="h-8 w-28 rounded bg-white/5 opacity-25"
                  aria-hidden="true"
                />
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Problem & Solution */}
      <section className="bg-navy py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <FadeUp>
            <SectionLabel label="The Problem" index={1} />
          </FadeUp>
          <div className="mt-10 grid gap-12 md:grid-cols-2 md:gap-16">
            <FadeUp delay={0.1}>
              <div>
                <h2 className="font-display text-3xl font-normal leading-display text-white md:text-4xl">
                  Your data should be your edge. Right now it is a liability.
                </h2>
                <p className="mt-6 font-body text-base font-light leading-body text-white/60">
                  Your teams are pulling reports manually. Your executives are
                  making calls based on last quarter&#39;s numbers. Your data
                  lives in five different systems that have never spoken to each
                  other. And the tools that were supposed to fix this require an
                  engineering team just to maintain.
                </p>
                <p className="mt-4 font-body text-base font-light leading-body text-white/60">
                  You already have the data. What you are missing is the
                  infrastructure to make it work for you.
                </p>
              </div>
            </FadeUp>
            <FadeUp delay={0.2}>
              <div>
                <h2 className="font-display text-3xl font-normal leading-display text-brass-light md:text-4xl">
                  Forte closes the gap between data and decision.
                </h2>
                <p className="mt-6 font-body text-base font-light leading-body text-white/60">
                  We build the pipelines that connect your systems, the
                  dashboards that surface what matters, and the AI models that
                  tell you what is coming before it arrives. Everything designed
                  to be used by the people running your organization, not just
                  the people who built it.
                </p>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="bg-navy-deep py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <FadeUp>
            <SectionLabel label="What We Do" index={2} />
            <h2 className="mt-4 font-display text-3xl font-normal leading-display text-white md:text-4xl">
              Three ways Forte turns your data into a competitive advantage.
            </h2>
          </FadeUp>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {SERVICES.map((service, i) => (
              <FadeUp key={service.id} delay={0.1 * (i + 1)}>
                <Card
                  header={
                    <>
                      <div className="mb-3 h-10 w-10 rounded bg-brass/10" aria-hidden="true" />
                      <h3 className="font-body text-lg font-medium text-white">
                        {service.title}
                      </h3>
                    </>
                  }
                  body={
                    <p className="font-body text-sm font-light leading-body text-white/60">
                      {service.description}
                    </p>
                  }
                />
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="bg-navy py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <FadeUp>
            <blockquote>
              <p className="font-display text-2xl font-normal italic leading-display text-brass-light md:text-3xl">
                Before Forte, our reporting cycle took two weeks and still left
                us guessing. Now our leadership team has answers before they
                finish asking the question.
              </p>
              <footer className="mt-8 flex items-center justify-center gap-3">
                <div className="h-px w-6 bg-brass" />
                <cite className="font-mono text-xs font-normal not-italic uppercase tracking-mono text-white/45">
                  Chief Operating Officer, Regional Healthcare Network
                </cite>
              </footer>
            </blockquote>
          </FadeUp>
        </div>
      </section>

      {/* CTA Banner */}
      <section
        className="relative py-20 md:py-28"
        style={{
          background:
            'linear-gradient(135deg, #060E1C 0%, #162444 50%, rgba(160,120,64,0.12) 100%)',
        }}
      >
        <div className="mx-auto max-w-3xl px-6 text-center">
          <FadeUp>
            <SectionLabel label="Ready when you are" />
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="mt-4 font-display text-4xl font-normal leading-display text-white md:text-5xl">
              Stop guessing. Start knowing.
            </h2>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="mx-auto mt-4 max-w-lg font-body text-base font-light leading-body text-white/60">
              Most implementations are live within 12 weeks. Let us show you
              what your data is already trying to tell you.
            </p>
          </FadeUp>
          <FadeUp delay={0.3}>
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
