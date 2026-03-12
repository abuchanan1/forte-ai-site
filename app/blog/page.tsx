import type { Metadata } from 'next'
import Link from 'next/link'
import { createMetadata } from '@/lib/metadata'
import { getAllPosts, PILLAR_LABELS } from '@/lib/blog'
import { FadeUp } from '@/components/ui/FadeUp'
import { SectionLabel } from '@/components/ui/SectionLabel'

export const metadata: Metadata = createMetadata({
  title: 'Insights',
  description:
    'Articles on data strategy, decision infrastructure, and bridging the gap between technical teams and business leadership.',
  path: '/blog',
})

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <>
      {/* Hero */}
      <section className="bg-navy pt-32 pb-20 md:pt-44 md:pb-28">
        <div className="mx-auto max-w-7xl px-6">
          <FadeUp>
            <SectionLabel label="Insights" />
          </FadeUp>
          <FadeUp delay={0.1}>
            <h1 className="mt-6 max-w-3xl font-display text-5xl font-normal leading-display text-white md:text-7xl">
              Thinking about data, decisions, and the gap in between.
            </h1>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="mt-6 max-w-2xl font-body text-lg font-light leading-body text-white/60">
              Practical perspectives on building the systems that turn messy data
              into clear leadership decisions.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="bg-navy-deep py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-6 md:grid-cols-2">
            {posts.map((post, i) => (
              <FadeUp key={post.slug} delay={0.1 * (i + 1)}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group block rounded-sm border border-brass/10 bg-navy-mid p-6 transition-all duration-200 hover:border-brass/40 hover:shadow-[0_0_24px_rgba(160,120,64,0.08)] md:p-8"
                >
                  <div className="mb-3 flex items-center gap-3">
                    <span className="font-mono text-[10px] font-medium uppercase tracking-mono-wide text-brass">
                      {PILLAR_LABELS[post.pillar]}
                    </span>
                    <span className="font-mono text-[10px] font-normal uppercase tracking-mono text-white/30">
                      {post.readTime}
                    </span>
                  </div>
                  <h2 className="font-display text-2xl font-normal leading-display text-white transition-colors group-hover:text-brass-light">
                    {post.title}
                  </h2>
                  <p className="mt-3 font-body text-sm font-light leading-body text-white/50">
                    {post.description}
                  </p>
                  <div className="mt-4 flex items-center gap-2">
                    <span className="font-body text-xs font-medium uppercase tracking-button text-brass/70 transition-colors group-hover:text-brass">
                      Read article
                    </span>
                    <span className="text-brass/50 transition-transform group-hover:translate-x-1">
                      &rarr;
                    </span>
                  </div>
                </Link>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
