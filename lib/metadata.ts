import type { Metadata } from 'next'
import { COMPANY } from './constants'

interface CreateMetadataOptions {
  title: string
  description: string
  path?: string
  article?: {
    publishedTime: string
    modifiedTime?: string
    author?: string
  }
}

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://forteaisolutions.com').replace(/\/+$/, '')

export function createMetadata({
  title,
  description,
  path = '',
  article,
}: CreateMetadataOptions): Metadata {
  const fullTitle = `${title} | ${COMPANY.name}`
  const url = `${siteUrl}${path}`
  const images = [
    {
      url: `/api/og?title=${encodeURIComponent(title)}`,
      width: 1200,
      height: 630,
      alt: fullTitle,
    },
  ]

  const openGraph: NonNullable<Metadata['openGraph']> = article
    ? {
        title: fullTitle,
        description,
        url,
        siteName: COMPANY.name,
        type: 'article',
        publishedTime: article.publishedTime,
        modifiedTime: article.modifiedTime ?? article.publishedTime,
        ...(article.author ? { authors: [article.author] } : {}),
        images,
      }
    : {
        title: fullTitle,
        description,
        url,
        siteName: COMPANY.name,
        type: 'website',
        images,
      }

  return {
    title: fullTitle,
    description,
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: url,
    },
    openGraph,
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}
