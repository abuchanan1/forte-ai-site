import type { BlogPost } from '@/types'

export const PILLAR_LABELS: Record<BlogPost['pillar'], string> = {
  'data-ai': 'Data & AI Strategy',
  'tech-gap': 'Bridging the Gap',
  'decision-infrastructure': 'Decision Infrastructure',
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'what-is-decision-infrastructure',
    title:
      'What Is Decision Infrastructure? (And Why Your Organization Needs It)',
    description:
      'Most organizations have data and dashboards but still struggle to make timely decisions. Decision infrastructure is the missing layer that connects raw data to leadership action.',
    pillar: 'decision-infrastructure',
    publishedAt: '2026-03-15',
    readTime: '7 min read',
    featured: true,
    faq: [
      {
        question: 'What is decision infrastructure?',
        answer:
          'Decision infrastructure is the complete system that connects raw data to leadership decisions. It includes KPI frameworks, metric definitions, dashboard architecture, reporting governance, and the decision cadences that ensure insights reach the right people at the right time.',
      },
      {
        question: 'How is decision infrastructure different from business intelligence?',
        answer:
          'Business intelligence focuses on reporting what happened. Decision infrastructure goes further by defining which metrics matter, who sees them, how often decisions are reviewed, and what actions follow. It is the operating system for how your organization makes decisions, not just a set of dashboards.',
      },
      {
        question: 'What size organization needs decision infrastructure?',
        answer:
          'Any organization where leadership makes decisions based on data, typically those with 50 or more employees. At that scale, informal data sharing breaks down and a structured system becomes necessary to maintain alignment and speed.',
      },
      {
        question: 'How long does it take to implement decision infrastructure?',
        answer:
          'A Foundation Sprint that designs the framework takes 6 to 8 weeks. Full implementation including data pipelines, dashboards, and AI agents takes 8 to 20 weeks depending on the complexity of your existing systems.',
      },
    ],
  },
  {
    slug: 'the-mismatch-problem',
    title:
      'The Mismatch Problem: Why Your Technical Team Builds the Wrong Thing',
    description:
      'Technical teams build what they are asked for. The problem is that nobody asks for the right thing. The gap between technical capability and business need is where most data projects fail.',
    pillar: 'tech-gap',
    publishedAt: '2026-03-15',
    readTime: '6 min read',
    faq: [
      {
        question: 'Why do data projects fail even with good technical teams?',
        answer:
          'Most data projects fail not because of technical shortcomings but because of a mismatch between what leadership needs and what the technical team builds. Requirements get lost in translation, priorities shift without communication, and the final product solves the wrong problem.',
      },
      {
        question: 'How do you bridge the gap between technical and non-technical teams?',
        answer:
          'Start by defining decisions, not requirements. Instead of asking what dashboard you want, ask what decision you need to make faster. Work backward from leadership outcomes to the data and tools needed to support them.',
      },
      {
        question: 'What is the most common cause of the technical-business mismatch?',
        answer:
          'The most common cause is that technical teams receive requirements in the form of outputs (build this dashboard, pull this report) rather than outcomes (help us reduce churn by identifying at-risk accounts earlier). When the request is an output, the team builds exactly what was asked for, which is rarely what was needed.',
      },
    ],
  },
  {
    slug: 'you-dont-need-a-data-team',
    title:
      "You Don't Need a Data Team. You Need a Data Strategy.",
    description:
      'Hiring a data analyst will not fix your data problems if you do not know what questions to ask. Strategy comes first. The team comes after.',
    pillar: 'data-ai',
    publishedAt: '2026-03-15',
    readTime: '5 min read',
    faq: [
      {
        question: 'Should we hire a data analyst or a data strategist first?',
        answer:
          'Strategy first. A data analyst without a clear framework of what to measure, why, and for whom will spend most of their time reacting to ad hoc requests. Define your KPI framework and decision cadence first, then hire the analyst to execute within that structure.',
      },
      {
        question: 'What is the difference between a data strategy and a data team?',
        answer:
          'A data strategy defines what your organization needs to know, how data flows from collection to decision, and who is responsible for each stage. A data team executes that strategy. Without the strategy, a data team is a group of talented people solving the wrong problems.',
      },
      {
        question: 'How do small organizations build a data strategy without a big budget?',
        answer:
          'Start with the three to five decisions your leadership makes most often. Define the metrics that inform those decisions. Identify where that data lives today and what it takes to get it in front of decision-makers reliably. That is your initial data strategy, and it does not require a large budget to define.',
      },
      {
        question: 'When is the right time to invest in data infrastructure?',
        answer:
          'When your leadership team is making decisions based on gut instinct because the data is too slow, too scattered, or too unreliable to use. If your reporting cycle takes more than a few hours, or if different teams use different numbers for the same metric, it is time.',
      },
    ],
  },
  {
    slug: 'both-sides-of-the-table',
    title:
      "I've Sat on Both Sides of the Table. Here's What Nobody Tells You.",
    description:
      'After years as both the person requesting data and the person building the systems, the biggest insight is simple: both sides think the other one does not get it. They are both right.',
    pillar: 'tech-gap',
    publishedAt: '2026-03-15',
    readTime: '6 min read',
    faq: [
      {
        question: 'Why do technical and non-technical teams struggle to communicate?',
        answer:
          'Each side operates with different mental models. Technical teams think in systems, constraints, and data structures. Business teams think in outcomes, timelines, and stakeholder needs. Neither model is wrong, but without a translator who understands both, critical context gets lost.',
      },
      {
        question: 'What does a fractional head of decision intelligence do?',
        answer:
          'A fractional head of decision intelligence serves as the bridge between your leadership team and your data systems. They define what metrics matter, design how information flows to decision-makers, oversee AI and analytics strategy, and facilitate the cadence that keeps everyone aligned, without requiring a full-time executive hire.',
      },
      {
        question: 'How do you know if your organization has a communication gap around data?',
        answer:
          'Common signs include leadership requesting reports that take weeks to produce, technical teams building tools that go unused, different departments using different numbers for the same metric, and executives making decisions based on intuition despite having a data team.',
      },
    ],
  },
]

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug)
}

export function getAllPosts(): BlogPost[] {
  return [...BLOG_POSTS].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  )
}
