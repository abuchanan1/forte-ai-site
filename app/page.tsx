import type { Metadata } from 'next'
import { createMetadata } from '@/lib/metadata'
import { COMPANY, SERVICES, STATS } from '@/lib/constants'
import { FadeUp } from '@/components/ui/FadeUp'
import { ScaleIn } from '@/components/ui/ScaleIn'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { AnimatedCounter } from '@/components/ui/AnimatedCounter'
import { GlowCard } from '@/components/ui/GlowCard'
import { ServiceIcon } from '@/components/ui/ServiceIcon'
import { Button } from '@/components/ui/Button'
import { ParticleField } from '@/components/ui/ParticleField'
import { TextReveal } from '@/components/ui/TextReveal'
import { BrokenFlywheel } from '@/components/ui/BrokenFlywheel'

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
        {/* Particle animation background */}
        <ParticleField />
        {/* Hero image overlay */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
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
              <TextReveal delay={0.2}>Messy data.</TextReveal>
              <br />
              <span className="inline-block">
                <TextReveal delay={0.6}>Clear</TextReveal>{' '}
                <em className="not-italic text-brass-light" style={{ fontStyle: 'italic' }}>
                  <TextReveal delay={0.9}>decisions.</TextReveal>
                </em>
              </span>
            </h1>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="mt-6 max-w-2xl font-body text-lg font-light leading-body text-white/60">
              Most organizations already have data and dashboards. What they lack
              is the decision infrastructure that connects raw data to leadership
              decisions. Forte designs and implements that missing layer.
            </p>
          </FadeUp>
          <FadeUp delay={0.3}>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button href="/services" size="lg">
                Explore Our Solutions
              </Button>
              <Button href="/contact" variant="ghost" size="lg">
                Book a Discovery Call
              </Button>
            </div>
          </FadeUp>
          <FadeUp delay={0.4}>
            <div className="mt-16 flex flex-wrap items-start gap-8 md:gap-0 md:divide-x md:divide-brass/15">
              {STATS.map((stat) => (
                <div key={stat.label} className="md:px-8 first:md:pl-0 last:md:pr-0">
                  <AnimatedCounter value={stat.num} label={stat.label} />
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Logo Bar */}
      <section className="border-y border-brass/10 bg-navy-deep py-10">
        <div className="mx-auto max-w-7xl px-6">
          <FadeUp>
            <p className="mb-6 text-center font-mono text-[10px] font-normal uppercase tracking-mono text-white/40">
              Built for organizations ready to lead with data
            </p>
            <div className="flex flex-wrap items-center justify-center gap-10">
              {['Small Businesses', 'Nonprofits', 'School Districts'].map((org) => (
                <div
                  key={org}
                  className="rounded border border-brass/10 bg-white/[0.03] px-5 py-2 font-mono text-[10px] uppercase tracking-mono text-white/30"
                >
                  {org}
                </div>
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
                  Your data flywheel should be powering every decision. Instead, it stalls at every turn.
                </h2>
                <p className="mt-6 font-body text-base font-light leading-body text-white/60">
                  It starts with collection. Data scattered across a dozen tools,
                  entered manually, duplicated constantly. By the time it reaches
                  quality, nobody agrees on which numbers are right. Access is
                  bottlenecked through one or two people who know where to find
                  anything. Reporting becomes a weekly scramble to compile
                  spreadsheets that are outdated before they are finished.
                </p>
                <p className="mt-4 font-body text-base font-light leading-body text-white/60">
                  And strategic insights? They show up too late, point to the
                  wrong priorities, or land in front of the wrong people at the
                  wrong time. Leadership ends up making decisions on instinct
                  because the system that was supposed to inform them broke down
                  long before the data reached their desk.
                </p>
                <p className="mt-4 font-body text-base font-light leading-body text-white/60">
                  The problem is not that you lack data. It is that every stage
                  of turning data into decisions has fractures that compound on
                  each other. Forte exists to rebuild that flywheel so data flows
                  from collection to insight without breaking down along the way,
                  leading you to better solutions and faster results that actually
                  meet your goals.
                </p>
              </div>
            </FadeUp>
            <FadeUp delay={0.2}>
              <BrokenFlywheel />
              <p className="mt-2 text-center font-mono text-[9px] uppercase tracking-wider text-white/25">
                Hover each segment to see common challenges
              </p>
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
              Four ways to build the decision infrastructure you need.
            </h2>
          </FadeUp>
          <div className="mt-12 grid grid-rows-[1fr] gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((service, i) => (
              <ScaleIn key={service.id} delay={0.1 * (i + 1)} className="flex">
                <GlowCard
                  className="flex-1"
                  header={
                    <>
                      <div className="mb-3">
                        <ServiceIcon icon={service.icon as 'pipeline' | 'dashboard' | 'model' | 'advisory' | 'assessment'} />
                      </div>
                      <h3 className="font-body text-base font-medium text-white">
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
              </ScaleIn>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="relative bg-navy py-20 md:py-28 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1920&q=80")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <FadeUp>
            <blockquote>
              <p className="font-display text-2xl font-normal italic leading-display text-brass-light md:text-3xl">
                We had the data and the dashboards but lacked the ability to
                easily make meaning of what was happening quickly. That is the
                gap decision infrastructure closes.
              </p>
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
              Start with a conversation, not a contract.
            </h2>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="mx-auto mt-4 max-w-lg font-body text-base font-light leading-body text-white/60">
              A 30-minute discovery call is all it takes to understand whether
              Forte is the right fit for your organization. No pitch, no pressure.
            </p>
          </FadeUp>
          <FadeUp delay={0.3}>
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
