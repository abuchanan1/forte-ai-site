import type { Metadata } from 'next'
import { COMPANY } from './constants'

interface CreateMetadataOptions {
  title: string
  description: string
  path?: string
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://forteaisolutions.com'

export function createMetadata({
  title,
  description,
  path = '',
}: CreateMetadataOptions): Metadata {
  const fullTitle = `${title} | ${COMPANY.name}`
  const url = `${siteUrl}${path}`

  return {
    title: fullTitle,
    description,
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: COMPANY.name,
      type: 'website',
      images: [
        {
          url: `/api/og?title=${encodeURIComponent(title)}`,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
    },
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
