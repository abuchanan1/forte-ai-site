import type { Metadata } from 'next'
import { Cormorant, IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google'
import { GoogleAnalytics } from '@next/third-parties/google'
import { Analytics } from '@vercel/analytics/react'
import { Providers } from '@/components/providers'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { ChatBot } from '@/components/ui/ChatBot'
import { CookieBanner } from '@/components/ui/CookieBanner'
import { COMPANY } from '@/lib/constants'
import './globals.css'

const cormorant = Cormorant({
  subsets: ['latin'],
  weight: ['400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
})

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
})

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: COMPANY.name,
    template: `%s | ${COMPANY.name}`,
  },
  description: COMPANY.description,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${ibmPlexSans.variable} ${ibmPlexMono.variable}`}
    >
      <body className="min-h-screen bg-navy-deep font-body text-white antialiased">
        <Providers>
          <Navbar />
          <main id="main-content">{children}</main>
          <Footer />
          <ChatBot />
          <CookieBanner />
        </Providers>
        <JsonLd />
        {process.env.NODE_ENV === 'production' &&
          process.env.NEXT_PUBLIC_GA_ID && (
            <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
          )}
        <Analytics />
      </body>
    </html>
  )
}

function JsonLd() {
  const siteUrl = (
    process.env.NEXT_PUBLIC_SITE_URL ?? 'https://forteaisolutions.com'
  ).replace(/\/+$/, '')
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: COMPANY.name,
    url: siteUrl,
    logo: `${siteUrl}/forte-logo.svg`,
    description: COMPANY.description,
    foundingDate: String(COMPANY.founded),
    contactPoint: {
      '@type': 'ContactPoint',
      email: COMPANY.email,
      contactType: 'sales',
      availableLanguage: 'English',
    },
    sameAs: ['https://www.linkedin.com/company/forte-ai-solutions/'],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
