import type { Metadata } from 'next'
import { createMetadata } from '@/lib/metadata'
import { FadeUp } from '@/components/ui/FadeUp'
import { ScaleIn } from '@/components/ui/ScaleIn'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Button } from '@/components/ui/Button'
import Image from 'next/image'

export const metadata: Metadata = createMetadata({
  title: 'Meet the Founder',
  description:
    'Aaron Buchanan, MPP — Founder of Forte AI Solutions. Building decision infrastructure for organizations that deserve better.',
  path: '/about/founder',
})

export default function FounderPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-navy pt-32 pb-20 md:pt-44 md:pb-28 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'radial-gradient(ellipse at 30% 50%, rgba(160,120,64,0.15), transparent 70%)',
          }}
        />
        <div className="relative mx-auto max-w-7xl px-6">
          <FadeUp>
            <SectionLabel label="Meet the Founder" />
          </FadeUp>
          <div className="mt-10 grid gap-12 md:grid-cols-3 md:gap-16 items-start">
            {/* Photo Column */}
            <div className="md:col-span-1 max-w-xs mx-auto md:mx-0">
              <ScaleIn>
                <div className="relative">
                  <div className="relative overflow-hidden rounded-2xl border border-white/10">
                    <Image
                      src="/aaron-buchanan.jpg"
                      alt="Aaron Buchanan, Founder of Forte AI Solutions"
                      width={400}
                      height={480}
                      className="w-full object-cover"
                      priority
                    />
                    {/* Subtle brass gradient overlay at bottom */}
                    <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-navy/80 to-transparent" />
                  </div>
                  {/* Caption below photo */}
                  <p className="mt-4 font-body text-xs font-light italic tracking-wide text-white/30 text-center">
                    Find the problem. Build something better. Keep pushing.
                  </p>
                </div>
              </ScaleIn>
            </div>

            {/* Bio Column */}
            <div className="md:col-span-2">
              <FadeUp delay={0.1}>
                <h1 className="font-display text-4xl font-normal leading-display text-white md:text-5xl">
                  Aaron Buchanan
                  <span className="text-brass">, MPP</span>
                </h1>
                <p className="mt-2 font-body text-base font-light text-brass-light/70">
                  Founder, Forte AI Solutions
                </p>
              </FadeUp>

              <FadeUp delay={0.2}>
                <div className="mt-8 space-y-5">
                  <p className="font-body text-base font-light leading-body text-white/60">
                    Every organization I have ever worked in had the same
                    problem. Not a lack of data. A lack of clarity about what to
                    do with it.
                  </p>

                  <p className="font-body text-base font-light leading-body text-white/60">
                    The pattern was always the same. Smaller organizations, the
                    ones doing the hardest work with the fewest resources, were
                    the last to get access to real data intelligence. The
                    enterprise tools were too expensive, or teams did not know
                    how to implement and fully leverage them. The consultants
                    built systems only they could maintain. And the internal
                    teams were stretched too thin to fix it themselves.
                  </p>
                </div>
              </FadeUp>

              <FadeUp delay={0.3}>
                <p className="mt-8 font-display text-2xl font-normal leading-display text-white md:text-3xl">
                  I started Forte AI Solutions because I got tired of watching
                  it happen.
                </p>
              </FadeUp>
            </div>
          </div>
        </div>
      </section>

      {/* Journey */}
      <section className="bg-navy-deep py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <FadeUp>
            <SectionLabel label="The Path" index={1} />
          </FadeUp>
          <div className="mt-10 max-w-3xl">
            <FadeUp delay={0.1}>
              <div className="space-y-5">
                <p className="font-body text-base font-light leading-body text-white/60">
                  My path here was not a straight line. I started as a Teach For
                  America corps member, then served on TFA staff, working inside
                  institutions that were meant to serve people but lacked the
                  infrastructure to make good decisions. That stuck with me. I
                  went on to earn my master&apos;s from the University of Chicago,
                  and before and after that spent years in higher education,
                  nonprofits, and startups. Sometimes I was building and
                  managing data and insights teams. Sometimes I was in
                  operational roles, waiting six weeks for a report I needed
                  yesterday. Sometimes I was the technical lead who could not
                  get a straight answer on what the business actually needed.
                </p>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Superpower */}
      <section className="bg-navy py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <FadeUp>
            <SectionLabel label="The Insight" index={2} />
          </FadeUp>
          <div className="mt-10 grid gap-12 md:grid-cols-2 md:gap-16 items-start">
            <FadeUp delay={0.1}>
              <div className="space-y-5">
                <p className="font-body text-base font-light leading-body text-white/60">
                  Every role taught me the same lesson. The problem is rarely
                  the data itself. It is the mismatch. Technical teams building
                  tools that do not match what the business actually needs.
                  Leadership requesting reports without understanding what is
                  possible. Everyone working hard, nobody moving in the same
                  direction.
                </p>
                <p className="font-body text-base font-light leading-body text-white/60">
                  Finding that mismatch is my superpower. I have sat on both
                  sides of the table enough times to see where the wires get
                  crossed, and I have built a career around helping teams
                  untangle them. Not with more tools or bigger budgets, but with
                  the right questions, the right architecture, and solutions
                  elegant enough that people actually use them.
                </p>
              </div>
            </FadeUp>

            {/* Pull quote */}
            <FadeUp delay={0.2}>
              <div className="rounded-2xl border border-brass/20 bg-brass/[0.04] p-8 md:p-10">
                <div className="mb-4 h-1 w-12 rounded-full bg-brass/40" />
                <p className="font-display text-2xl font-normal leading-display text-white/90 md:text-3xl">
                  Finding the mismatch is my superpower.
                </p>
                <p className="mt-4 font-body text-sm font-light text-white/40">
                  Technical teams struggle to build the right thing.
                  Non-technical teams struggle to ask for it. That gap
                  is where I work.
                </p>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Mission + CTA */}
      <section className="relative bg-navy-deep py-20 md:py-28 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'radial-gradient(ellipse at 70% 50%, rgba(160,120,64,0.2), transparent 60%)',
          }}
        />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <FadeUp>
            <div className="space-y-5">
              <p className="font-body text-lg font-light leading-body text-white/60">
                Forte exists to bring that skill to every engagement. We do not
                just build dashboards. We find the gap between what your team
                needs and what your data can deliver, then we close it. Every
                organization, regardless of size or budget, deserves that
                clarity.
              </p>
              <p className="font-display text-3xl font-normal leading-display text-white md:text-4xl">
                Not someday. <span className="text-brass">Now.</span>
              </p>
            </div>
          </FadeUp>
          <FadeUp delay={0.15}>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button href="/contact" size="lg">
                Book a Discovery Call
              </Button>
              <Button href="/about" variant="ghost" size="lg">
                About Forte
              </Button>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  )
}
