import type { Metadata } from 'next'
import { createMetadata } from '@/lib/metadata'
import { AssessmentTool } from '@/components/sections/AssessmentTool'

export const metadata: Metadata = createMetadata({
  title: 'Data & AI Readiness Assessment',
  description:
    'Find out where your organization stands on the data maturity curve and get a personalized recommendation for your next step.',
  path: '/assessment',
})

export default function AssessmentPage() {
  return <AssessmentTool />
}
