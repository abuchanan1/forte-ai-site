import type { CompanyInfo, NavLink, Service, SocialLink, Stat } from '@/types'

export const COMPANY: CompanyInfo = {
  name: 'Forte AI Solutions',
  tagline: 'Data Intelligence. Democratized.',
  description:
    'Forte transforms fragmented enterprise data into structured intelligence, enabling faster decisions, leaner operations, and compounding advantage at scale.',
  email: 'hello@forteaisolutions.com',
  founded: 2024,
}

export const NAV_LINKS: NavLink[] = [
  {
    label: 'Solutions',
    href: '/services',
    description: 'Data pipelines, dashboards, and custom AI models.',
  },
  {
    label: 'About',
    href: '/about',
    description: 'Our mission, story, and values.',
  },
  {
    label: 'Contact',
    href: '/contact',
    description: 'Start a conversation with our team.',
  },
]

export const SERVICES: Service[] = [
  {
    id: 'data-pipeline',
    title: 'Data Pipeline and Integration',
    description:
      'We connect your siloed systems into a single, clean, reliable data infrastructure. No more manual exports, no more conflicting numbers, no more waiting on engineering.',
    outcomes: [
      'Automated pipelines that replace manual data exports and transfers',
      'Unified data layer across all your existing systems and tools',
      'Real-time sync so your numbers are never a day, a week, or a quarter behind',
      'Built to scale as your organization grows without rebuilding from scratch',
    ],
    icon: 'pipeline',
  },
  {
    id: 'ai-dashboards',
    title: 'AI Dashboards and Reporting',
    description:
      'We build intelligent dashboards that surface the right information to the right people at the right time. Executives get clarity. Operators get direction. Everyone gets less noise.',
    outcomes: [
      'Executive dashboards that surface priorities, not just metrics',
      'Operational views built for the teams running the day-to-day',
      'Automated alerts when something needs attention before it becomes a problem',
      'Designed for non-technical users so insights reach the people who act on them',
    ],
    icon: 'dashboard',
  },
  {
    id: 'custom-ai',
    title: 'Custom AI Model Building',
    description:
      'We design and deploy AI models tailored to your specific business questions. Predictive, diagnostic, prescriptive, built on your data, tuned to your outcomes.',
    outcomes: [
      'Predictive models that anticipate outcomes before they happen',
      'Diagnostic models that surface root causes instead of symptoms',
      'Prescriptive recommendations that tell your team what to do next',
      'Explainable outputs your leadership can trust and act on',
    ],
    icon: 'model',
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
  { num: '12 wks', label: 'Avg. Deployment' },
  { num: '5+', label: 'Industries Served' },
  { num: '100%', label: 'Client Ownership' },
  { num: '24/7', label: 'Data Monitoring' },
]

export const PAGES = [
  { path: '/', description: 'Homepage with overview of Forte AI Solutions services and value proposition.' },
  { path: '/about', description: 'Mission, founder story, and company values.' },
  { path: '/services', description: 'Detailed service offerings, process timeline, and FAQ.' },
  { path: '/contact', description: 'Contact form and discovery call information.' },
]
