import type { CompanyInfo, NavLink, Service, SocialLink, Stat } from '@/types'

export const COMPANY: CompanyInfo = {
  name: 'Forte AI Solutions',
  tagline: 'Data Intelligence. Democratized.',
  description:
    'Forte designs and implements decision infrastructure — the systems that sit between raw data and leadership decisions. We help organizations turn messy data into clear, trusted metrics that drive action.',
  email: 'hello@forteaisolutions.com',
  founded: 2024,
}

export const NAV_LINKS: NavLink[] = [
  {
    label: 'Solutions',
    href: '/services',
    description: 'Decision infrastructure, agentic AI, and fractional leadership.',
  },
  {
    label: 'About',
    href: '/about',
    description: 'Our mission, story, and values.',
  },
  {
    label: 'Founder',
    href: '/about/founder',
    description: 'Meet Aaron Buchanan, MPP.',
  },
  {
    label: 'Contact',
    href: '/contact',
    description: 'Start a conversation with our team.',
  },
]

export const SERVICES: Service[] = [
  {
    id: 'foundation-sprint',
    title: 'Decision Intelligence Foundation Sprint',
    description:
      'A 6–8 week engagement that gives your leadership team a clear operating system for decision-making. KPI frameworks, metric definitions, dashboard architecture, and a roadmap to implementation.',
    outcomes: [
      'KPI framework and metric definitions your whole organization agrees on',
      'Executive dashboard architecture designed around how leaders actually decide',
      'Reporting governance and decision cadence for leadership',
      'AI readiness evaluation and implementation roadmap',
    ],
    icon: 'pipeline',
  },
  {
    id: 'infrastructure',
    title: 'Intelligent Data Infrastructure and Agentic AI',
    description:
      'Full-scale implementation of the decision infrastructure designed during the Foundation Sprint. Data pipelines, executive dashboards, KPI tracking, and custom AI agents that automate analysis.',
    outcomes: [
      'Data pipelines, warehouse, and quality monitoring built for your systems',
      'Executive dashboards and KPI tracking with automated reporting',
      'Custom agentic AI systems — insight agents, forecasting, operations monitoring',
      'AI-assisted intelligence that supports decisions, not replaces them',
    ],
    icon: 'model',
  },
  {
    id: 'fractional',
    title: 'Fractional Head of Decision Intelligence',
    description:
      'Ongoing senior-level data leadership without a full-time executive hire. We govern your metrics, evolve your dashboards, oversee AI agents, and facilitate the decision cadence that keeps leadership aligned.',
    outcomes: [
      'Metric governance and dashboard evolution as your organization grows',
      'AI agent oversight and analytics strategy',
      'Decision cadence facilitation for leadership teams',
      'Data governance and continuous system optimization',
    ],
    icon: 'advisory',
  },
  {
    id: 'assessment',
    title: 'AI and Data Health Assessment',
    description:
      'A focused 2–3 week diagnostic that evaluates your organization\'s AI readiness, data maturity, and architecture. You walk away with a prioritized roadmap and clear next steps.',
    outcomes: [
      'Data maturity assessment across your current systems',
      'AI risk evaluation and readiness scoring',
      'Architecture recommendations tailored to your stack',
      'Prioritized roadmap with clear, actionable next steps',
    ],
    icon: 'assessment',
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
  { num: '6–8 wks', label: 'Foundation Sprint' },
  { num: '100%', label: 'Client Ownership' },
  { num: '24/7', label: 'Data Monitoring' },
]

export const PAGES = [
  { path: '/', description: 'Homepage with overview of Forte AI Solutions services and value proposition.' },
  { path: '/about', description: 'Mission, founder story, and company values.' },
  { path: '/about/founder', description: 'Meet Aaron Buchanan, MPP — founder of Forte AI Solutions.' },
  { path: '/services', description: 'Four service offerings: Foundation Sprint, Infrastructure & AI, Fractional Leadership, and Assessment.' },
  { path: '/contact', description: 'Contact form and discovery call information.' },
]
