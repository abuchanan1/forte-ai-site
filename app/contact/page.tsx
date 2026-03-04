import type { Metadata } from 'next'
import { createMetadata } from '@/lib/metadata'
import { FadeUp } from '@/components/ui/FadeUp'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { ContactForm } from '@/components/sections/ContactForm'

export const metadata: Metadata = createMetadata({
  title: 'Contact',
  description:
    'Start a conversation with Forte AI Solutions. 30-minute discovery call, response within one business day.',
  path: '/contact',
})

export default function ContactPage() {
  return (
    <section className="bg-navy pt-32 pb-20 md:pt-44 md:pb-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-16 md:grid-cols-2">
          {/* Left */}
          <FadeUp>
            <div>
              <SectionLabel label="Get in Touch" />
              <h1 className="mt-6 font-display text-4xl font-normal leading-display text-white md:text-5xl">
                Let us show you what your data can do.
              </h1>
              <p className="mt-6 font-body text-base font-light leading-body text-white/60">
                A discovery call with Forte takes 30 minutes. We will ask about
                your current data landscape, the decisions you are trying to make
                faster, and whether Forte is the right fit. No pitch. No
                pressure. Just an honest conversation about whether we can help.
              </p>
              <ul className="mt-8 space-y-3">
                {[
                  'Response within one business day',
                  '30-minute discovery call at your convenience',
                  'A clear recommendation, whether that is Forte or not',
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 font-body text-sm font-light leading-body text-white/60"
                  >
                    <span className="mt-2 block h-px w-3 shrink-0 bg-brass" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </FadeUp>

          {/* Right */}
          <FadeUp delay={0.2}>
            <ContactForm />
          </FadeUp>
        </div>
      </div>
    </section>
  )
}
