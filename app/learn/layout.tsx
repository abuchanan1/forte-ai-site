import type { Metadata } from 'next'
import { createMetadata } from '@/lib/metadata'

export const metadata: Metadata = createMetadata({
  title: 'Forte Learn',
  description:
    'AI-powered K-12 education that adapts to how each student learns. Built for teachers, not to replace them. Coming soon.',
  path: '/learn',
})

export default function LearnLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
