import { notFound } from 'next/navigation'
import fs from 'fs'
import path from 'path'
import type { Metadata } from 'next'
import { createMetadata } from '@/lib/metadata'
import { getPostBySlug, getAllPosts, PILLAR_LABELS } from '@/lib/blog'
import { FadeUp } from '@/components/ui/FadeUp'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Button } from '@/components/ui/Button'

interface PageProps {
  params: { slug: string }
}

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }))
}

export function generateMetadata({ params }: PageProps): Metadata {
  const post = getPostBySlug(params.slug)
  if (!post) return {}

  return createMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
  })
}

function parseMarkdown(md: string): string {
  let html = md

  // Headings (## and ###)
  html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>')
  html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>')

  // Bold
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')

  // Italic
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>')

  // Paragraphs: wrap lines that are not headings and not empty
  const lines = html.split('\n')
  const result: string[] = []
  let inParagraph = false

  for (const line of lines) {
    const trimmed = line.trim()

    if (trimmed === '') {
      if (inParagraph) {
        result.push('</p>')
        inParagraph = false
      }
    } else if (trimmed.startsWith('<h')) {
      if (inParagraph) {
        result.push('</p>')
        inParagraph = false
      }
      result.push(trimmed)
    } else {
      if (!inParagraph) {
        result.push('<p>')
        inParagraph = true
      }
      result.push(trimmed)
    }
  }

  if (inParagraph) {
    result.push('</p>')
  }

  return result.join('\n')
}

export default function BlogPostPage({ params }: PageProps) {
  const post = getPostBySlug(params.slug)
  if (!post) notFound()

  const filePath = path.join(
    process.cwd(),
    'content',
    'blog',
    `${params.slug}.md`,
  )

  let contentHtml = ''
  try {
    const raw = fs.readFileSync(filePath, 'utf-8')
    contentHtml = parseMarkdown(raw)
  } catch {
    notFound()
  }

  const siteUrl = (
    process.env.NEXT_PUBLIC_SITE_URL ?? 'https://forteaisolutions.com'
  ).replace(/\/+$/, '')

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    author: {
      '@type': 'Person',
      name: 'Aaron Buchanan',
      url: `${siteUrl}/about/founder`,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Forte AI Solutions',
      url: siteUrl,
    },
    url: `${siteUrl}/blog/${post.slug}`,
  }

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: post.faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }

  return (
    <>
      <article>
        {/* Hero */}
        <section className="bg-navy pt-32 pb-16 md:pt-44 md:pb-20">
          <div className="mx-auto max-w-3xl px-6">
            <FadeUp>
              <SectionLabel label={PILLAR_LABELS[post.pillar]} />
            </FadeUp>
            <FadeUp delay={0.1}>
              <h1 className="mt-6 font-display text-4xl font-normal leading-display text-white md:text-5xl">
                {post.title}
              </h1>
            </FadeUp>
            <FadeUp delay={0.2}>
              <div className="mt-4 flex items-center gap-4">
                <time
                  dateTime={post.publishedAt}
                  className="font-mono text-[10px] font-normal uppercase tracking-mono text-white/40"
                >
                  {new Date(post.publishedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
                <span className="font-mono text-[10px] font-normal uppercase tracking-mono text-white/30">
                  {post.readTime}
                </span>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* Content */}
        <section className="bg-navy-deep py-16 md:py-20">
          <FadeUp>
            <div
              className="prose-forte mx-auto max-w-3xl px-6"
              dangerouslySetInnerHTML={{ __html: contentHtml }}
            />
          </FadeUp>
        </section>

        {/* FAQ */}
        {post.faq.length > 0 && (
          <section className="bg-navy py-16 md:py-20">
            <div className="mx-auto max-w-3xl px-6">
              <FadeUp>
                <SectionLabel label="Frequently Asked Questions" />
              </FadeUp>
              <div className="mt-8 space-y-4">
                {post.faq.map((item, i) => (
                  <FadeUp key={item.question} delay={0.1 * (i + 1)}>
                    <details className="group rounded-sm border border-brass/10 bg-navy-mid transition-all duration-300 open:border-brass/30 open:shadow-[0_0_24px_rgba(160,120,64,0.06)]">
                      <summary className="cursor-pointer px-6 py-4 font-body text-sm font-medium text-white transition-colors hover:text-brass-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass">
                        {item.question}
                      </summary>
                      <div className="px-6 pb-4">
                        <p className="font-body text-sm font-light leading-body text-white/60">
                          {item.answer}
                        </p>
                      </div>
                    </details>
                  </FadeUp>
                ))}
              </div>
            </div>
          </section>
        )}
      </article>

      {/* CTA */}
      <section className="bg-navy-deep py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <FadeUp>
            <h2 className="font-display text-3xl font-normal leading-display text-white md:text-4xl">
              Ready to build your decision infrastructure?
            </h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <div className="mt-6 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button href="/contact" size="lg">
                Book a Discovery Call
              </Button>
              <Button href="/blog" variant="ghost" size="sm">
                More Insights
              </Button>
            </div>
          </FadeUp>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </>
  )
}
