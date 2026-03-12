import type { BlogPost } from '@/types'

export const PILLAR_LABELS: Record<BlogPost['pillar'], string> = {
  'data-ai': 'Data & AI for Small Orgs',
  'tech-gap': 'Bridging the Tech Gap',
  'decision-infrastructure': 'Decision Infrastructure',
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'the-mismatch-problem',
    title: 'The Mismatch Problem: Why Your Technical Team Builds the Wrong Thing',
    description:
      'The gap between what gets requested and what actually moves the needle is the most expensive problem most organizations never name.',
    pillar: 'tech-gap',
    publishedAt: '2026-03-15',
    readTime: '6 min read',
    featured: true,
    faq: [
      {
        question: 'What is the mismatch problem in technical teams?',
        answer:
          'The mismatch problem is the gap between what an organization requests from its technical team and what the organization actually needs. Technical teams build exactly what was specified, but the specification itself missed the real business need.',
      },
      {
        question: 'Why do technical teams build the wrong thing?',
        answer:
          'Non-technical staff often lack the language to describe their needs in terms a technical team can act on, while technical teams lack enough business context to fill in the gaps. Both sides are guessing, and the result is a product that technically works but nobody uses.',
      },
      {
        question: 'How much does a data mismatch cost an organization?',
        answer:
          'Data mismatches can cost organizations six figures on abandoned analytics platforms, entire grant cycles on reporting systems that still require manual entry, and years of lost decision-making capacity.',
      },
    ],
  },
  {
    slug: 'you-dont-need-a-data-team',
    title: "You Don't Need a Data Team. You Need a Data Strategy.",
    description:
      'Most small organizations are already sitting on the data they need. What they are missing is a plan for turning it into decisions.',
    pillar: 'data-ai',
    publishedAt: '2026-03-15',
    readTime: '5 min read',
    featured: true,
    faq: [
      {
        question: 'Do small businesses need a data team?',
        answer:
          'Most small businesses and nonprofits do not need a dedicated data team. What they need is a data strategy that clarifies what decisions they make, what information supports those decisions, and where that information already lives.',
      },
      {
        question: 'What is a data strategy for small organizations?',
        answer:
          'A data strategy is a clarity decision, not a technology decision. It answers three questions: What decisions does your organization make regularly? What information would make those decisions better? Where does that information already live?',
      },
      {
        question: 'Should I start with data or decisions?',
        answer:
          'Start with decisions, not data. Map the decisions your leadership makes regularly, then trace backwards to the data that supports them. Nine times out of ten, you need less data than you thought, from fewer sources, presented in simpler ways.',
      },
    ],
  },
  {
    slug: 'what-is-decision-infrastructure',
    title: 'What Is Decision Infrastructure? (And Why Your Organization Needs It)',
    description:
      'The connective tissue between raw information and better decisions. Most organizations skip it entirely and wonder why nothing changes.',
    pillar: 'decision-infrastructure',
    publishedAt: '2026-03-15',
    readTime: '7 min read',
    featured: true,
    faq: [
      {
        question: 'What is decision infrastructure?',
        answer:
          'Decision infrastructure is the combination of systems, processes, and habits that allow an organization to consistently turn information into action. It has three layers: collection, synthesis, and action.',
      },
      {
        question: 'What are the three layers of decision infrastructure?',
        answer:
          'Layer one is collection: where your data lives and whether you can access it. Layer two is synthesis: turning raw data into something a human can understand in five minutes. Layer three is action: ensuring the right information reaches the right person at the right time.',
      },
      {
        question: 'Do small organizations need decision infrastructure?',
        answer:
          'Small organizations need it most. Large companies can absorb the waste from poor data practices. Small businesses, nonprofits, and school districts cannot afford to waste a grant cycle or a product decision on bad information.',
      },
      {
        question: 'Does decision infrastructure require expensive software?',
        answer:
          'No. Decision infrastructure does not require a data team, expensive software, or a twelve-month implementation plan. It requires someone who understands your organization well enough to ask the right questions about how decisions get made.',
      },
    ],
  },
  {
    slug: 'both-sides-of-the-table',
    title: "I've Sat on Both Sides of the Table. Here's What Nobody Tells You.",
    description:
      'What happens when you have been the person waiting for data and the person building reports nobody uses. The problem is not on either end. It is in the middle.',
    pillar: 'tech-gap',
    publishedAt: '2026-03-15',
    readTime: '5 min read',
    featured: true,
    faq: [
      {
        question: 'What is the gap between technical and non-technical teams?',
        answer:
          'There is a space between what the organization needs and what gets built where nobody is in charge. The business side assumes the technical team will figure it out. The technical team assumes the business side knows what they want. Both assumptions are wrong.',
      },
      {
        question: 'Why do non-technical teams struggle to get the right data?',
        answer:
          'Non-technical teams often do not know how to ask for what they need in terms a technical team can act on. They ask for what they have seen before, usually a dashboard or a report, and hope it gets them closer to the answer.',
      },
      {
        question: 'How do you bridge the gap between technical and non-technical teams?',
        answer:
          'Stop waiting for perfect requirements and start watching how teams actually work. Understand what they pull up when decisions need to be made, what they wish they had, and where they waste time. Build from that reality instead of from specifications.',
      },
    ],
  },
  {
    slug: 'ai-agents-are-not-automation',
    title: 'AI Agents Are Not Automation. Here Is Why That Matters.',
    description:
      'Most people describing AI agents are really describing automation with a new name. The difference matters, especially for organizations that cannot afford to chase the wrong trend.',
    pillar: 'data-ai',
    publishedAt: '2026-03-20',
    readTime: '7 min read',
    featured: true,
    faq: [
      {
        question: 'What is the difference between AI agents and automation?',
        answer:
          'Automation follows a set of predefined instructions and executes them the same way every time. AI agents can reason about information in context, identify patterns, surface insights, and connect data across sources in ways that automation cannot.',
      },
      {
        question: 'What does AI-assisted decision-making mean?',
        answer:
          'AI-assisted decision-making means using AI agents to enhance and speed up human decisions, not replace them. The agent surfaces information, identifies patterns, and presents options. The human decides. Human plus AI makes the best equation for strategic outcomes.',
      },
      {
        question: 'Can small organizations benefit from AI agents?',
        answer:
          'Yes. Small businesses and nonprofits have the same need for faster, better-informed decisions as large companies. AI agents built into the right decision infrastructure can remove hours of manual data synthesis and surface insights that would otherwise take weeks to find.',
      },
    ],
  },
  {
    slug: 'ai-agents-are-only-as-good-as-your-infrastructure',
    title: 'AI Agents Are Only as Good as Your Infrastructure',
    description:
      'Without the right data and a clear strategy, the smartest AI agent in the world is just a faster way to get bad answers. The foundation comes first.',
    pillar: 'data-ai',
    publishedAt: '2026-03-22',
    readTime: '8 min read',
    featured: true,
    faq: [
      {
        question: 'Why do AI implementations fail at small organizations?',
        answer:
          'Most AI implementations fail not because the technology is wrong but because the underlying data infrastructure is broken. Incomplete data, inconsistent entry, and disconnected systems mean the AI generates confident answers built on unreliable information.',
      },
      {
        question: 'What does AI need to work effectively?',
        answer:
          'AI agents need three things: data they can trust, context about the organization goals and constraints, and a clear path to action that gets the right insight to the right person at the right time. If any of those are missing, AI just adds complexity.',
      },
      {
        question: 'What is the relationship between AI and decision infrastructure?',
        answer:
          'Decision infrastructure is the foundation. AI is the accelerant. A strong foundation with AI on top gives your team faster, sharper decisions. An accelerant on a weak foundation just amplifies the problems you already have.',
      },
      {
        question: 'Is my organization ready for AI?',
        answer:
          'AI readiness is not about budget or buy-in. It is about having data that is reasonably complete and accessible, a clear strategy for what decisions you need to improve, and systems where information flows to the people who need it. Building that foundation is the first step.',
      },
    ],
  },
  {
    slug: 'how-to-know-if-your-organization-is-ready-for-ai',
    title: 'How to Know If Your Organization Is Ready for AI',
    description:
      '42% of AI projects fail, almost never because of the technology. Five honest questions that tell you whether your data, strategy, and team are ready.',
    pillar: 'data-ai',
    publishedAt: '2026-03-25',
    readTime: '6 min read',
    featured: true,
    faq: [
      {
        question: 'How do I know if my organization is ready for AI?',
        answer:
          'AI readiness is not about budget or technical talent. It comes down to three things: data you can trust, clarity on which decisions matter most, and a team that will actually use what you build. If any of those are missing, start there before investing in AI.',
      },
      {
        question: 'What are the signs an organization is not ready for AI?',
        answer:
          'Key warning signs include: leadership cannot agree on which decisions drive the organization, teams argue about which numbers are right, data lives in disconnected silos, nobody formally owns the data, and the organization has never used data to change an actual decision.',
      },
      {
        question: 'What should I do before implementing AI?',
        answer:
          'Start with a data strategy conversation, not a tool purchase. Identify your key decisions, assess whether your data is trustworthy and accessible, and determine who owns it. The right next step might be infrastructure, not AI.',
      },
    ],
  },
  {
    slug: 'why-nobody-owns-your-data',
    title: 'Why Nobody Owns Your Data (And What It Is Costing You)',
    description:
      'The biggest data problem most organizations have is not technical. It is structural. Nobody owns the data, and when that one person leaves, everything breaks.',
    pillar: 'tech-gap',
    publishedAt: '2026-03-27',
    readTime: '6 min read',
    featured: true,
    faq: [
      {
        question: 'What is data ownership and why does it matter?',
        answer:
          'Data ownership means someone is accountable for data quality, there are shared definitions for key metrics, documentation exists outside of one persons head, and there is a rhythm for maintaining data. Without ownership, data becomes a liability instead of an asset.',
      },
      {
        question: 'What happens when nobody owns the data?',
        answer:
          'Teams waste hours hunting for information, reports show conflicting numbers, leadership makes decisions on incomplete data, and institutional knowledge walks out the door when key employees leave. The cost shows up in time, money, trust, and missed opportunities.',
      },
      {
        question: 'How do I fix data ownership at my organization?',
        answer:
          'Start with an audit: Where does your data live? Who maintains it? What happens if they stop? The answers reveal your risk. From there, assign accountability, create shared metric definitions, document processes, and build a maintenance rhythm.',
      },
    ],
  },
  {
    slug: 'measuring-the-return-on-data-investment',
    title: 'Measuring the Return on Your Data Investment (A Framework That Actually Works)',
    description:
      'Traditional ROI was built for factories. Data investment returns are strategic: faster decisions, smarter allocation, a team that compounds. Here is how to measure all four layers.',
    pillar: 'decision-infrastructure',
    publishedAt: '2026-03-29',
    readTime: '8 min read',
    featured: true,
    faq: [
      {
        question: 'How do you measure ROI on a data investment?',
        answer:
          'Measure four layers: Time Recaptured (hours saved on manual work), Decision Speed (how fast you get from question to answer), Decision Quality (are better decisions being made), and Capacity and Literacy Created (what can your team do now that they could not before).',
      },
      {
        question: 'What is data maturity and how does it affect ROI?',
        answer:
          'Data maturity has four stages: Scattered, Centralized, Integrated, and Intelligent. The ROI layer you should focus on depends on your stage. Stage 1 organizations measure time savings. Stage 3 organizations measure decision quality. Investing at the wrong layer for your maturity is the most expensive mistake.',
      },
      {
        question: 'Why do data investments fail to show ROI?',
        answer:
          'Most organizations measure only cost savings, which misses the biggest returns. They also invest at the wrong altitude for their maturity level, buying Stage 3 tools when they are still at Stage 1. The investment is real but the organization is not ready for it.',
      },
      {
        question: 'What is a data maturity model for small organizations?',
        answer:
          'Four stages: Scattered (data in silos, manual reports), Centralized (data accessible, basic reporting), Integrated (automatic flows, trusted dashboards), and Intelligent (AI embedded, evidence-based rhythm). Each stage has a different ROI focus and investment priority.',
      },
    ],
  },
]

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug)
}

export function getAllPosts(): BlogPost[] {
  return [...BLOG_POSTS].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )
}
