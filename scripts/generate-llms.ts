import * as fs from 'fs'
import * as path from 'path'

// Import constants inline since this is a build script
const COMPANY = {
  name: 'Forte AI Solutions',
  tagline: 'Data Intelligence. Democratized.',
  description:
    'Forte transforms fragmented enterprise data into structured intelligence, enabling faster decisions, leaner operations, and compounding advantage at scale.',
  email: 'hello@forteaisolutions.com',
  founded: 2024,
}

const SERVICES = [
  {
    id: 'data-pipeline',
    title: 'Data Pipeline and Integration',
    description:
      'Forte connects siloed systems into a single, clean, reliable data infrastructure. Automated pipelines replace manual data exports and transfers. Unified data layer across all existing systems and tools. Real-time sync so numbers are never behind. Built to scale as organizations grow without rebuilding from scratch.',
  },
  {
    id: 'ai-dashboards',
    title: 'AI Dashboards and Reporting',
    description:
      'Forte builds intelligent dashboards that surface the right information to the right people at the right time. Executive dashboards surface priorities, not just metrics. Operational views built for teams running the day-to-day. Automated alerts when something needs attention. Designed for non-technical users.',
  },
  {
    id: 'custom-ai',
    title: 'Custom AI Model Building',
    description:
      'Forte designs and deploys AI models tailored to specific business questions. Predictive models anticipate outcomes. Diagnostic models surface root causes. Prescriptive recommendations tell teams what to do next. Explainable outputs leadership can trust and act on.',
  },
]

const PAGES = [
  {
    path: '/',
    description:
      'Homepage with overview of Forte AI Solutions services and value proposition.',
  },
  {
    path: '/about',
    description: 'Mission, founder story, and company values.',
  },
  {
    path: '/services',
    description:
      'Detailed service offerings, process timeline, and FAQ.',
  },
  {
    path: '/contact',
    description: 'Contact form and discovery call information.',
  },
]

const content = `# ${COMPANY.name}

> ${COMPANY.tagline}

## About

${COMPANY.description}

Forte was founded in ${COMPANY.founded}. The company believes every organization deserves the clarity that data can provide, not just the ones who can afford a team of data scientists.

## Who Forte Serves

Forte serves organizations of all sizes that are drowning in data and starving for insight. Typical clients include mid-market and enterprise organizations without large in-house data or engineering teams. Forte is specifically built for non-technical leadership teams who need data intelligence without the complexity.

## Pages

${PAGES.map((page) => `- ${page.path}: ${page.description}`).join('\n')}

## Services

${SERVICES.map(
  (service) => `### ${service.title}

${service.description}`,
).join('\n\n')}

## Contact

Email: ${COMPANY.email}
Discovery calls take 30 minutes. Response within one business day.

## What Forte Does Not Do

Forte does not sell off-the-shelf software products. Forte does not offer ongoing managed services or IT support. Forte does not replace existing systems. Forte builds custom data infrastructure, integrates it with existing tools, and hands over full ownership to the client. There is no proprietary lock-in.
`

const outPath = path.join(process.cwd(), 'public', 'llms.txt')
fs.writeFileSync(outPath, content, 'utf-8')

// eslint-disable-next-line no-console
console.log('Generated llms.txt at', outPath)
