import type { Metadata } from 'next'
import { createMetadata } from '@/lib/metadata'
import { FadeUp } from '@/components/ui/FadeUp'
import { ScaleIn } from '@/components/ui/ScaleIn'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { GlowCard } from '@/components/ui/GlowCard'
import { Button } from '@/components/ui/Button'

export const metadata: Metadata = createMetadata({
  title: 'About',
  description:
    'Our mission, story, and values. Forte was built to democratize data intelligence.',
  path: '/about',
})

const VALUES = [
  {
    title: 'Clarity over complexity',
    body: 'We believe the best solution is the one your team will actually use. We build for the person making the decision, not the person who built the model.',
    icon: '✦',
  },
  {
    title: 'Outcomes over outputs',
    body: 'We do not measure success by dashboards delivered or models deployed. We measure it by the decisions your organization makes better because of them.',
    icon: '◆',
  },
  {
    title: 'Access over exclusivity',
    body: 'Data intelligence should not require a Fortune 100 budget. We price, package, and build for organizations at every stage.',
    icon: '●',
  },
  {
    title: 'Trust through transparency',
    body: 'You own your data, your models, and your infrastructure. We build it. We hand it over. No lock-in, no black boxes.',
    icon: '▲',
  },
]

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-navy pt-32 pb-20 md:pt-44 md:pb-28 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&q=80")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="relative mx-auto max-w-7xl px-6">
          <FadeUp>
            <SectionLabel label="Our Mission" />
          </FadeUp>
          <FadeUp delay={0.1}>
            <h1 className="mt-6 max-w-3xl font-display text-5xl font-normal leading-display text-white md:text-7xl">
              Intelligence should not be a privilege.
            </h1>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="mt-6 max-w-2xl font-body text-lg font-light leading-body text-white/60">
              For too long, the organizations with the deepest data capabilities
              have been the ones with the biggest budgets. Forte was built to
              change that.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Story */}
      <section className="bg-navy-deep py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <FadeUp>
            <SectionLabel label="How We Got Here" index={1} />
          </FadeUp>
          <div className="mt-10 grid gap-12 md:grid-cols-2 md:gap-16">
            <FadeUp delay={0.1}>
              <div>
                <h2 className="font-display text-3xl font-normal leading-display text-white md:text-4xl">
                  Built by people who lived the problem.
                </h2>
                <div className="mt-6 space-y-4">
                  <p className="font-body text-base font-light leading-body text-white/60">
                    Forte was founded on a simple observation: organizations of
                    all sizes are drowning in data and starving for insight. Not
                    because the data is bad, but because the infrastructure to
                    use it has always been too expensive, too technical, or too
                    slow to build.
                  </p>
                  <p className="font-body text-base font-light leading-body text-white/60">
                    We spent years watching talented teams spend more time
                    wrangling spreadsheets than making decisions. We watched
                    executives fly blind through quarters that their own data
                    could have predicted. We decided there was a better way.
                  </p>
                  <p className="font-body text-base font-light leading-body text-white/60">
                    Forte exists to give every organization, regardless of size
                    or technical resources, the data intelligence that used to
                    require a full data science team to achieve. That is what we
                    mean when we say democratized.
                  </p>
                </div>
              </div>
            </FadeUp>
            <ScaleIn delay={0.2}>
              <div className="relative flex items-center justify-center overflow-hidden rounded-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&q=80"
                  alt="Modern office workspace with data analytics on screens"
                  className="aspect-[4/5] w-full max-w-sm rounded-sm object-cover opacity-80"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/80 via-transparent to-navy-deep/20 rounded-sm" />
              </div>
            </ScaleIn>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-navy py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <FadeUp>
            <SectionLabel label="What We Stand For" index={2} />
            <h2 className="mt-4 font-display text-3xl font-normal leading-display text-white md:text-4xl">
              Four principles that shape how we work.
            </h2>
          </FadeUp>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {VALUES.map((value, i) => (
              <ScaleIn key={value.title} delay={0.1 * (i + 1)}>
                <GlowCard
                  header={
                    <>
                      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded bg-brass/10 text-brass-light text-lg">
                        {value.icon}
                      </div>
                      <h3 className="font-body text-lg font-medium text-white">
                        {value.title}
                      </h3>
                    </>
                  }
                  body={
                    <p className="font-body text-sm font-light leading-body text-white/60">
                      {value.body}
                    </p>
                  }
                />
              </ScaleIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative bg-navy-deep py-20 md:py-28 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1920&q=80")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <FadeUp>
            <h2 className="font-display text-4xl font-normal leading-display text-white md:text-5xl">
              See what Forte can do for your organization.
            </h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <div className="mt-8">
              <Button href="/services" size="lg">
                Explore Our Solutions
              </Button>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  )
}
