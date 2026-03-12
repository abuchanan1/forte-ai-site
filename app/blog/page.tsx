import type { Metadata } from 'next'
import { createMetadata } from '@/lib/metadata'
import { getAllPosts, PILLAR_LABELS } from '@/lib/blog'
import { FadeUp } from '@/components/ui/FadeUp'
import { SectionLabel } from '@/components/ui/SectionLabel'
import Link from 'next/link'

export const metadata: Metadata = createMetadata({
  title: 'Insights',
  description:
    'Thought leadership on data strategy, decision infrastructure, and bridging the gap between technical and non-technical teams. Written by Aaron Buchanan, MPP.',
  path: '/blog',
})

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <>
      {/* Hero */}
      <section className="relative bg-navy pt-32 pb-16 md:pt-44 md:pb-20 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'radial-gradient(ellipse at 50% 50%, rgba(160,120,64,0.15), transparent 70%)',
          }}
        />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <FadeUp>
            <SectionLabel label="Insights" />
          </FadeUp>
          <FadeUp delay={0.1}>
            <h1 className="mt-6 font-display text-4xl font-normal leading-display text-white md:text-5xl">
              Thinking Out Loud
            </h1>
            <p className="mx-auto mt-4 max-w-2xl font-body text-base font-light leading-body text-white/50">
              On data strategy, decision infrastructure, and the space between
              what organizations need and what gets built.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="bg-navy-deep py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, i) => (
              <FadeUp key={post.slug} delay={i * 0.05}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex h-full flex-col rounded-lg border border-white/[0.06] bg-navy/60 px-6 py-5 transition-all hover:border-brass/20 hover:bg-brass/[0.03]"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[10px] font-medium uppercase tracking-mono-wide text-brass/60">
                      {PILLAR_LABELS[post.pillar]}
                    </span>
                    <span className="text-white/20">·</span>
                    <span className="font-mono text-[10px] font-medium uppercase tracking-mono-wide text-white/30">
                      {post.readTime}
                    </span>
                  </div>
                  <h2 className="mt-3 font-display text-lg font-normal leading-display text-white/90 transition-colors group-hover:text-brass-light">
                    {post.title}
                  </h2>
                  <p className="mt-2 font-body text-sm font-light leading-body text-white/40 line-clamp-3">
                    {post.description}
                  </p>
                  <div className="mt-auto pt-4 flex items-center gap-2">
                    <span className="font-body text-sm font-light text-brass/70 transition-colors group-hover:text-brass">
                      Read article
                    </span>
                    <span className="text-brass/50 transition-transform group-hover:translate-x-1">
                      →
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
