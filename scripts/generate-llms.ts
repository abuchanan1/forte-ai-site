import * as fs from 'fs'
import * as path from 'path'

const COMPANY = {
  name: 'Forte AI Solutions',
  description:
    'Forte builds AI agents that give leadership teams their time back, and the clean, canonical data foundation that makes those agents reliable. The agent surfaces. The humans decide.',
  email: 'hello@forteaisolutions.com',
  founded: 2024,
}

const WHO_WE_SERVE =
  'Forte serves leadership teams at 50 to 500 person organizations: small businesses, mid-market companies, and mission-driven organizations without large in-house data or engineering teams. We build for non-technical leadership teams who need reliable AI agents to support decisions, not a stack of dashboards to maintain.'

const PAGES = [
  { path: '/', description: 'Homepage. Positioning, hero case study, and the core claim: we build AI agents that give leadership teams their time back.' },
  { path: '/agents', description: 'AI agent portfolio. The first agent we deployed (an executive Synthesis Agent returning 5+ hours a week) and the archetypes we are extending the practice into.' },
  { path: '/services', description: 'The four engagements: AI and Data Health Assessment, Foundation Sprint (Decision Data Model), Custom Build (Decision Engine), and Fractional Head of Decision Intelligence.' },
  { path: '/about', description: 'Mission, founder story, values, and "How we build" — the full tech stack and vendor-agnostic approach.' },
  { path: '/about/founder', description: 'Founder page for Aaron Buchanan, MPP.' },
  { path: '/assessment', description: 'AI and Data Health Assessment — a self-serve readiness assessment producing the Decision Readiness Report.' },
  { path: '/blog', description: 'Insights on decision infrastructure, AI agents, data strategy, and the gap between technical and non-technical teams.' },
  { path: '/labs', description: 'Forte Labs: research and experiments at the edge of the decision infrastructure practice.' },
  { path: '/learn', description: 'Forte Learn: AI-powered K-12 education initiative, adaptive learning for classrooms.' },
  { path: '/contact', description: 'Contact form and 30-minute discovery call booking.' },
]

const ENGAGEMENTS = [
  {
    title: 'AI and Data Health Assessment',
    body: "A diagnostic engagement that evaluates an organization's data landscape, readiness, and decision maturity. Ends in the Decision Readiness Report: a scored, prioritized written assessment across four dimensions with a specific recommendation for what to do next.",
  },
  {
    title: 'Foundation Sprint',
    body: "A fixed-scope sprint that produces the Decision Data Model, KPI Framework, and Dashboard Blueprint. The canonical model of your organization's data, the foundation every AI agent needs to be reliable, and the deliverable you hand off so every future dashboard, report, and agent builds on the same source of truth.",
  },
  {
    title: 'Custom Build',
    body: 'The Decision Engine: pipelines, warehouse, dashboards, and AI agents implemented against the Decision Data Model. Clients own the code, the infrastructure, and the AI agents. No proprietary lock-in.',
  },
  {
    title: 'Fractional Head of Decision Intelligence',
    body: 'Ongoing stewardship of the Decision Engine. We keep your metrics governed, your dashboards current, and your AI agents sharp as the organization evolves and as AI itself evolves. Signature deliverable: the Decision Engine Brief, a monthly written report covering engine status, what we caught, what we shipped, what is emerging in AI that applies to your engine, and lean-in time available. You own the decisions. We own the engine that powers them.',
  },
]

const CORE_CLAIMS = [
  'An agent is a dashboard that talks back. A dashboard waits for you to find it; an agent finds you, tells you what the number means, and asks a team member to take the action.',
  'Every agent Forte builds runs against a clean, canonical data foundation. That is what makes the outputs reliable instead of confident guesses.',
  'The agent surfaces. The humans decide. Forte does not build autonomous decision-makers.',
  'Forte is deliberately vendor-agnostic. We do not resell software, take commissions, or push a proprietary stack.',
  "Clients own 100 percent of the work. No lock-in, no proprietary dependencies, no ongoing licensing of the client's own infrastructure.",
  'The system is iterative by design. It compounds in capability as AI and the client organization evolve.',
]

const TECH_STACK = [
  { category: 'Data warehousing and storage', body: 'BigQuery, Snowflake, Postgres, and other modern databases depending on scale and existing stack.' },
  { category: 'Dashboards, reporting, and BI', body: 'Looker Studio, Power BI, Tableau, Metabase. We match the tool to the team that will actually use it.' },
  { category: 'AI and language models', body: 'Default: Claude (Anthropic API). Also GPT models, Gemini, and open-source models (Llama, Mistral, Qwen) when budget or privacy requires.' },
  { category: 'Agent orchestration', body: 'LangGraph, Claude native tool use, CrewAI, and direct API orchestration. Simpler patterns beat framework-heavy ones for most engagements at our scale.' },
  { category: 'Workflow and collaboration', body: 'Slack, Microsoft Teams, Notion, Asana, Monday, ClickUp. We build agents that post into existing channels rather than forcing new interfaces.' },
  { category: 'Productivity and source data', body: 'Google Workspace, Microsoft 365, Zoom and Google Meet transcripts as agent inputs.' },
  { category: 'Data pipelines', body: 'Fivetran, Airbyte, or custom connectors. dbt for transformation when the client has a real warehouse.' },
  { category: 'CRMs and operational systems', body: 'Salesforce, HubSpot, Bloomerang, DonorPerfect, Apricot, CaseWorthy, PowerSchool, Infinite Campus, and whatever else the client already uses.' },
]

interface BlogPostSummary {
  slug: string
  title: string
  description: string
  publishedAt: string
}

function loadBlogPosts(): BlogPostSummary[] {
  const blogFile = fs.readFileSync(path.join(process.cwd(), 'lib', 'blog.ts'), 'utf-8')
  const posts: BlogPostSummary[] = []

  const postBlocks = blogFile.match(/\{\s*slug:[\s\S]*?publishedAt:[\s\S]*?\}(?=\s*,|\s*\])/g) ?? []
  for (const block of postBlocks) {
    const slug = block.match(/slug:\s*['"]([^'"]+)['"]/)?.[1]
    const title = block.match(/title:\s*(?:\n\s*)?['"]([^'"]+)['"]/)?.[1]
    const description = block.match(/description:\s*(?:\n\s*)?['"]([^'"]+)['"]/)?.[1]
    const publishedAt = block.match(/publishedAt:\s*['"]([^'"]+)['"]/)?.[1]
    if (slug && title && description && publishedAt) {
      posts.push({ slug, title, description, publishedAt })
    }
  }

  return posts.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
}

function loadBlogBody(slug: string): string {
  try {
    return fs.readFileSync(path.join(process.cwd(), 'content', 'blog', `${slug}.md`), 'utf-8')
  } catch {
    return ''
  }
}

const posts = loadBlogPosts()

const llmsShort = `# ${COMPANY.name}

> AI agents that give leadership teams their time back, built on a clean data foundation.

## About

${COMPANY.description}

Forte was founded in ${COMPANY.founded}.

## Who Forte Serves

${WHO_WE_SERVE}

## Core Claims

${CORE_CLAIMS.map((c) => `- ${c}`).join('\n')}

## Pages

${PAGES.map((p) => `- ${p.path}: ${p.description}`).join('\n')}

## Engagements

${ENGAGEMENTS.map((e) => `### ${e.title}\n\n${e.body}`).join('\n\n')}

## Tech Stack

Forte is vendor-agnostic. Tools are chosen based on the client's size, budget, existing infrastructure, and direction.

${TECH_STACK.map((t) => `- **${t.category}**: ${t.body}`).join('\n')}

## Blog Posts

${posts
  .map(
    (p) =>
      `- [/blog/${p.slug}](/blog/${p.slug}) (${p.publishedAt}): ${p.title}. ${p.description}`,
  )
  .join('\n')}

## Contact

Email: ${COMPANY.email}
Discovery calls take 30 minutes. Response within one business day.

## What Forte Does Not Do

- Forte does not sell off-the-shelf software products.
- Forte does not resell software or take commissions on any tools or platforms.
- Forte does not build fully autonomous AI agents that make decisions without human review.
- Forte does not replace existing systems wholesale; we build on top of what clients already use.
- Forte does not lock clients into proprietary infrastructure. Every engagement ends with the client owning the work.
`

const llmsFull = `# ${COMPANY.name} — Full Content

> AI agents that give leadership teams their time back, built on a clean data foundation.

## About

${COMPANY.description}

Forte was founded in ${COMPANY.founded}.

## Who Forte Serves

${WHO_WE_SERVE}

## Core Claims

${CORE_CLAIMS.map((c) => `- ${c}`).join('\n')}

## Engagements

${ENGAGEMENTS.map((e) => `### ${e.title}\n\n${e.body}`).join('\n\n')}

## Tech Stack

Forte is deliberately vendor-agnostic. We do not resell software, take commissions, or push any specific platform. We meet clients where they are, build on what they already pay for when it makes sense, and recommend alternatives when it does not. Every engagement ends with the client owning the work, free to run it, modify it, or migrate it without us.

${TECH_STACK.map((t) => `### ${t.category}\n\n${t.body}`).join('\n\n')}

## Blog Posts (full content)

${posts
  .map((p) => {
    const body = loadBlogBody(p.slug)
    return `---\n\n### ${p.title}\n\nURL: /blog/${p.slug}\nPublished: ${p.publishedAt}\n\n${body}`
  })
  .join('\n\n')}

## Contact

Email: ${COMPANY.email}
Discovery calls take 30 minutes. Response within one business day.
`

fs.writeFileSync(path.join(process.cwd(), 'public', 'llms.txt'), llmsShort, 'utf-8')
fs.writeFileSync(path.join(process.cwd(), 'public', 'llms-full.txt'), llmsFull, 'utf-8')

// eslint-disable-next-line no-console
console.log('Generated llms.txt and llms-full.txt')
