import type { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/blog'

const STATIC_PAGES_LASTMOD = '2026-04-19'

export default function sitemap(): MetadataRoute.Sitemap {
  const rawUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? 'https://forteaisolutions.com'
  const baseUrl = rawUrl.replace(/\/+$/, '')

  const posts = getAllPosts()
  const blogUrls = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const mostRecentPost = posts[0]?.publishedAt ?? STATIC_PAGES_LASTMOD
  const blogIndexLastmod = new Date(mostRecentPost)
  const staticLastmod = new Date(STATIC_PAGES_LASTMOD)

  return [
    {
      url: baseUrl,
      lastModified: staticLastmod,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: staticLastmod,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/agents`,
      lastModified: staticLastmod,
      changeFrequency: 'monthly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: staticLastmod,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about/founder`,
      lastModified: staticLastmod,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: blogIndexLastmod,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/assessment`,
      lastModified: staticLastmod,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    ...blogUrls,
    {
      url: `${baseUrl}/learn`,
      lastModified: staticLastmod,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/labs`,
      lastModified: staticLastmod,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: staticLastmod,
      changeFrequency: 'yearly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: staticLastmod,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: staticLastmod,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]
}
