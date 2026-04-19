import type { CompanyInfo, NavLink, Service, SocialLink, Stat } from '@/types'

export const COMPANY: CompanyInfo = {
  name: 'Forte AI Solutions',
  tagline: 'Data Intelligence. Democratized.',
  description:
    'Forte builds AI agents that give leadership teams their time back, and the clean, canonical data foundation that makes those agents reliable. The agent surfaces. The humans decide.',
  email: 'hello@forteaisolutions.com',
  founded: 2024,
}

export const NAV_LINKS: NavLink[] = [
  {
    label: 'Services',
    href: '/services',
    description: 'Four engagements across assessment, foundation, build, and ongoing stewardship.',
  },
  {
    label: 'Agents',
    href: '/agents',
    description: 'AI agents we build for leadership teams.',
  },
  {
    label: 'About',
    href: '/about',
    description: 'Our mission, story, and values.',
  },
  {
    label: 'Assessment',
    href: '/assessment',
    description: 'Find out where you stand on the data maturity curve.',
  },
  {
    label: 'Blog',
    href: '/blog',
    description: 'Thought leadership on data, decisions, and AI.',
  },
  {
    label: 'Learn',
    href: '/learn',
    description: 'AI-powered K-12 education. Coming soon.',
  },
  {
    label: 'Labs',
    href: '/labs',
    description: 'Research and development at the frontier of AI.',
  },
  {
    label: 'Contact',
    href: '/contact',
    description: 'Start a conversation with our team.',
  },
]

export const SERVICES: Service[] = [
  {
    id: 'decision-engine',
    title: 'Building Your Decision Engine',
    description:
      "Flagship. This is where we build the AI agents that give your leadership team its time back. Every agent runs on a clean data foundation we build in tandem, because an agent without a reliable source of truth is just a fast way to get confident wrong answers.",
    outcomes: [
      'Custom AI agents built for specific jobs in your organization',
      'The data foundation underneath them: pipelines, warehouse, canonical model',
      'Dashboards where they still add value',
      'Complete documentation and full ownership, no lock-in',
    ],
    icon: 'model',
  },
  {
    id: 'foundation-sprint',
    title: 'Decision Intelligence Foundation Sprint',
    description:
      'A 6–8 week engagement that gives your leadership team a clear operating system for decision-making, and the foundation every AI agent needs to be reliable. Metrics, the Decision Data Model, and a blueprint every dashboard, report, and agent builds on.',
    outcomes: [
      'The Decision Data Model (the map, the tables, the dictionary)',
      'KPI Framework and Dashboard Blueprint',
      'A build-ready implementation roadmap',
      'AI readiness evaluation and governance foundation',
    ],
    icon: 'pipeline',
  },
  {
    id: 'assessment',
    title: 'AI and Data Health Assessment',
    description:
      "A focused 2–3 week diagnostic that tells you honestly whether you are ready to build or whether the foundation needs work first. You walk away with the Decision Readiness Report and a clear next step.",
    outcomes: [
      'The Decision Readiness Report',
      'Prioritized gap analysis, what to fix first and why',
      'Architecture recommendations tailored to your existing stack',
      'A clear roadmap for getting to decision-ready',
    ],
    icon: 'assessment',
  },
  {
    id: 'fractional',
    title: 'Fractional Head of Decision Intelligence',
    description:
      'Ongoing senior-level data leadership without a full-time executive hire. We run the Decision Cadence that keeps your metrics, dashboards, and AI agents sharp as your organization evolves. Iterative by design.',
    outcomes: [
      'Facilitated leadership decision cadence',
      'Metric governance and dashboard evolution',
      'AI agent oversight and analytics strategy',
      'Continuous refinement of the Decision Data Model',
    ],
    icon: 'advisory',
  },
]

export const SOCIAL_LINKS: SocialLink[] = [
  {
    platform: 'LinkedIn',
    href: 'https://linkedin.com/company/forteaisolutions',
    label: 'Follow us on LinkedIn',
  },
]

export const STATS: Stat[] = [
  { num: 'Agents shipped,', label: 'not demos shown' },
  { num: '100% client ownership,', label: 'no lock-in' },
  { num: 'Iterative by design,', label: 'so your system compounds' },
]

export const PAGES = [
  { path: '/', description: 'Homepage with overview of Forte AI Solutions services and value proposition.' },
  { path: '/about', description: 'Mission, founder story, and company values.' },
  { path: '/about/founder', description: 'Meet Aaron Buchanan, MPP. Founder of Forte AI Solutions.' },
  { path: '/services', description: 'Four engagements. One decision infrastructure: Building Your Decision Engine (Flagship), Foundation Sprint, AI and Data Health Assessment, and Fractional Head of Decision Intelligence.' },
  { path: '/agents', description: 'AI agents we have built and are building for leadership teams. The agent surfaces. The humans decide.' },
  { path: '/blog', description: 'Thought leadership on data strategy, decision infrastructure, and bridging technical and non-technical teams.' },
  { path: '/learn', description: 'AI-powered K-12 education. Coming soon.' },
  { path: '/labs', description: 'Research and development at the frontier of AI.' },
  { path: '/contact', description: 'Contact form and discovery call information.' },
  { path: '/privacy', description: 'Privacy Policy for Forte AI Solutions.' },
  { path: '/terms', description: 'Terms of Service for Forte AI Solutions.' },
]
