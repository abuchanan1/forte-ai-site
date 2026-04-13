import type { Metadata } from 'next'
import Link from 'next/link'
import { createMetadata } from '@/lib/metadata'
import { FadeUp } from '@/components/ui/FadeUp'

export const metadata: Metadata = createMetadata({
  title: 'Forte Labs',
  description:
    'Forte Labs is where we test ideas before they become products. Research and development at Forte AI Solutions.',
  path: '/labs',
})

const FOCUS_AREAS = [
  {
    label: 'Prediction Markets',
    body: 'Algorithmic trading systems for prediction markets. Currently in rebuild, paper trading before anything goes live.',
  },
  {
    label: 'Blockchain & DeFi',
    body: 'Stablecoin infrastructure and decentralized finance research. Still in the early thinking stage.',
  },
]

export default function LabsPage() {
  return (
    <section className="bg-navy-deep pt-32 pb-24 md:pt-44 md:pb-32 min-h-screen">
      <div className="mx-auto max-w-3xl px-6">
        <FadeUp>
          <h1 className="font-display text-5xl font-normal leading-display text-white md:text-7xl">
            Forte Labs
          </h1>
        </FadeUp>

        <FadeUp delay={0.1}>
          <p className="mt-10 font-body text-lg font-light leading-body text-white/70">
            Most companies talk about R&amp;D. We actually do it. Forte Labs is
            where we test ideas before they become products. We build things,
            break them, and figure out what works. Not everything here will
            ship. That is the point.
          </p>
        </FadeUp>

        <div className="mt-16 space-y-10 border-t border-brass/15 pt-12">
          {FOCUS_AREAS.map((area, i) => (
            <FadeUp key={area.label} delay={0.15 + i * 0.1}>
              <div>
                <p className="font-mono text-[11px] uppercase tracking-mono text-brass-light">
                  {area.label}
                </p>
                <p className="mt-3 font-body text-base font-light leading-body text-white/60">
                  {area.body}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>

        <FadeUp delay={0.45}>
          <div className="mt-20">
            <Link
              href="/blog"
              className="font-body text-sm text-white/50 underline decoration-brass/40 underline-offset-4 transition-colors hover:text-brass-light"
            >
              Read our thinking
            </Link>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}
