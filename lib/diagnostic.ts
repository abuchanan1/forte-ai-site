export type Dimension =
  | 'data-maturity'
  | 'decision-clarity'
  | 'architecture-health'
  | 'ai-readiness'

export type QuestionType = 'score' | 'context' | 'open'

export interface ScoreOption {
  score: 1 | 2 | 3 | 4
  label: string
}

export interface Question {
  id: string
  type: QuestionType
  dimension: Dimension
  prompt: string
  helper?: string
  options?: ScoreOption[]
  multiSelectOptions?: string[]
}

export type Track = 'small-business' | 'nonprofit'

export const DIMENSION_LABELS: Record<Dimension, string> = {
  'data-maturity': 'Data Maturity',
  'decision-clarity': 'Decision Clarity',
  'architecture-health': 'Architecture Health',
  'ai-readiness': 'AI Readiness',
}

export const STAGE_LABELS = ['Scattered', 'Centralized', 'Integrated', 'Intelligent'] as const
export type Stage = (typeof STAGE_LABELS)[number]

export function scoreToStage(avg: number): Stage {
  if (avg < 2.0) return 'Scattered'
  if (avg < 2.5) return 'Centralized'
  if (avg < 3.3) return 'Integrated'
  return 'Intelligent'
}

const SB: Question[] = [
  {
    id: 'sb-q1',
    type: 'score',
    dimension: 'data-maturity',
    prompt: 'Where does your customer or client data primarily live?',
    options: [
      { score: 1, label: 'Multiple spreadsheets, across laptops, maybe email threads' },
      { score: 2, label: 'In a CRM or system of record, but not everyone uses it consistently' },
      { score: 3, label: 'In a central system that our team uses consistently, though it has gaps' },
      { score: 4, label: 'In a clean, consistently maintained source of truth with automated quality checks' },
    ],
  },
  {
    id: 'sb-q2',
    type: 'score',
    dimension: 'data-maturity',
    prompt: 'If I asked three people on your leadership team to define "active customer" (or your primary entity), would I get the same answer?',
    options: [
      { score: 1, label: 'I am not sure, and I suspect I would not' },
      { score: 2, label: 'Probably not, but we would figure it out in the conversation' },
      { score: 3, label: 'Yes, with minor variations' },
      { score: 4, label: 'Yes. We have a written definition everyone uses' },
    ],
  },
  {
    id: 'sb-q3',
    type: 'score',
    dimension: 'data-maturity',
    prompt: 'How fresh is the data you rely on for weekly or monthly decisions?',
    options: [
      { score: 1, label: 'Often weeks old by the time we see it, or pulled manually from multiple places' },
      { score: 2, label: 'A week old, sometimes fresher, depending on who runs the report' },
      { score: 3, label: 'Updated weekly, automated' },
      { score: 4, label: 'Near real-time for the metrics that matter' },
    ],
  },
  {
    id: 'sb-q4',
    type: 'score',
    dimension: 'data-maturity',
    prompt: 'How much of your data lives in documents (strategy docs, meeting notes, contracts, proposals) versus structured systems?',
    options: [
      { score: 1, label: 'Most of our important stuff is in documents and nobody has a clear inventory' },
      { score: 2, label: 'A lot of it is in documents, scattered across drives' },
      { score: 3, label: 'We have a shared drive system and most documents live there' },
      { score: 4, label: 'Documents are organized, owned, and linkable. We know which are canonical' },
    ],
  },
  {
    id: 'sb-q5',
    type: 'score',
    dimension: 'decision-clarity',
    prompt: 'Can you name the three to five decisions that drive your business forward every quarter?',
    options: [
      { score: 1, label: 'Honestly, no' },
      { score: 2, label: 'Roughly, but my leadership team might not agree on the list' },
      { score: 3, label: 'Yes, and my leadership team would mostly agree' },
      { score: 4, label: 'Yes. We have them written down and we review them regularly' },
    ],
  },
  {
    id: 'sb-q6',
    type: 'score',
    dimension: 'decision-clarity',
    prompt: 'When your leadership team meets, what are you mostly doing?',
    options: [
      { score: 1, label: 'Reporting on what happened' },
      { score: 2, label: 'Catching up and identifying problems' },
      { score: 3, label: 'Debating options and making calls' },
      { score: 4, label: 'Acting on evidence that was already synthesized before the meeting' },
    ],
  },
  {
    id: 'sb-q7',
    type: 'score',
    dimension: 'decision-clarity',
    prompt: 'How quickly can you answer "is this product line, region, or customer segment actually performing well?"',
    options: [
      { score: 1, label: 'Weeks. Someone has to build a report' },
      { score: 2, label: 'Days, if we pull the right person in' },
      { score: 3, label: 'Same day, usually by checking a dashboard' },
      { score: 4, label: 'Now. It is in front of me at all times' },
    ],
  },
  {
    id: 'sb-q8',
    type: 'score',
    dimension: 'decision-clarity',
    prompt: 'In the last 6 months, name a decision your team changed because the data told you something new.',
    options: [
      { score: 1, label: 'I cannot think of one' },
      { score: 2, label: 'One, maybe, but it was a hard process' },
      { score: 3, label: 'A few clear examples' },
      { score: 4, label: 'Regularly. It is how we operate' },
    ],
  },
  {
    id: 'sb-q9',
    type: 'score',
    dimension: 'architecture-health',
    prompt: 'Who owns your data?',
    options: [
      { score: 1, label: 'Nobody officially' },
      { score: 2, label: 'That one person who never takes vacation' },
      { score: 3, label: 'A named person or team, as part of their role' },
      { score: 4, label: 'A dedicated leader or function with documentation and backup' },
    ],
  },
  {
    id: 'sb-q10',
    type: 'context',
    dimension: 'architecture-health',
    prompt: 'What tools does your business actively use for data and operations?',
    helper: 'Select all that apply.',
    multiSelectOptions: [
      'QuickBooks / Xero / accounting tool',
      'HubSpot / Salesforce / CRM',
      'Google Workspace / Microsoft 365',
      'Shopify / e-commerce platform',
      'BigQuery / Snowflake / data warehouse',
      'A BI tool (Looker, Tableau, Power BI, Metabase, Looker Studio)',
      'Project management (Asana, Monday, ClickUp, Notion)',
      'Other',
    ],
  },
  {
    id: 'sb-q11',
    type: 'score',
    dimension: 'architecture-health',
    prompt: 'If your current systems went offline for a week, could your business still make critical decisions?',
    options: [
      { score: 1, label: 'We would fly blind' },
      { score: 2, label: 'We would scramble but probably cope for a few days' },
      { score: 3, label: 'Yes, we have backups and alternative views' },
      { score: 4, label: 'Yes. Our decision process is resilient to any single system' },
    ],
  },
  {
    id: 'sb-q12',
    type: 'score',
    dimension: 'ai-readiness',
    prompt: 'How is your team currently using AI?',
    options: [
      { score: 1, label: 'Not at all, or ChatGPT personal accounts' },
      { score: 2, label: 'Occasional use of AI features built into existing tools' },
      { score: 3, label: 'We have a few specific AI use cases running' },
      { score: 4, label: 'AI is embedded in multiple workflows with clear owners and outcomes' },
    ],
  },
  {
    id: 'sb-q13',
    type: 'score',
    dimension: 'ai-readiness',
    prompt: 'If you deployed an AI agent tomorrow to synthesize your operational data, how confident are you in the outputs?',
    options: [
      { score: 1, label: 'I would not trust them. Our data is a mess' },
      { score: 2, label: 'Skeptical. There are too many gaps' },
      { score: 3, label: 'Reasonably confident, though I would want a human reviewing' },
      { score: 4, label: 'Very confident. Our foundation is tight' },
    ],
  },
  {
    id: 'sb-q14',
    type: 'score',
    dimension: 'ai-readiness',
    prompt: 'If an AI agent gave you a confident but subtly wrong answer, would anyone on your team catch it?',
    options: [
      { score: 1, label: 'Probably not, and that scares me' },
      { score: 2, label: 'Maybe, eventually' },
      { score: 3, label: 'Yes, we have informal review processes' },
      { score: 4, label: 'Yes, we have explicit human-in-the-loop checkpoints' },
    ],
  },
  {
    id: 'sb-q15',
    type: 'open',
    dimension: 'ai-readiness',
    prompt: 'What is the single biggest operational pain you would pay to solve in the next 90 days?',
    helper: 'A few sentences is plenty.',
  },
]

const NP: Question[] = [
  {
    id: 'np-q1',
    type: 'score',
    dimension: 'data-maturity',
    prompt: 'Where does your primary program or participant data live?',
    options: [
      { score: 1, label: 'Spreadsheets, email, paper forms, across sites' },
      { score: 2, label: 'In a program management system, but not everyone uses it the same way' },
      { score: 3, label: 'In a central system, maintained consistently, with some known gaps' },
      { score: 4, label: 'In a clean, governed system with automated quality checks' },
    ],
  },
  {
    id: 'np-q2',
    type: 'score',
    dimension: 'data-maturity',
    prompt: 'If I asked three people on your leadership team to define "active client" (or your primary served population), would I get the same answer?',
    options: [
      { score: 1, label: 'Not a chance' },
      { score: 2, label: 'Probably not, but they would sort it out in conversation' },
      { score: 3, label: 'Yes, with minor variations' },
      { score: 4, label: 'Yes. We have a written definition used across programs' },
    ],
  },
  {
    id: 'np-q3',
    type: 'score',
    dimension: 'data-maturity',
    prompt: 'When you report to your board or funders, how confident are you in the numbers?',
    options: [
      { score: 1, label: 'Honestly, I cross my fingers' },
      { score: 2, label: 'The numbers are mostly right but we caveat a lot' },
      { score: 3, label: 'Confident, with one or two known issues we note' },
      { score: 4, label: 'Fully confident. Our numbers reconcile across sources' },
    ],
  },
  {
    id: 'np-q4',
    type: 'score',
    dimension: 'data-maturity',
    prompt: 'How much of your organizational knowledge lives in documents (strategic plans, program descriptions, board packets, grant applications) that are scattered?',
    options: [
      { score: 1, label: 'A lot, and we cannot easily find current versions' },
      { score: 2, label: 'A lot, but we know where most of it is' },
      { score: 3, label: 'Organized in shared drives, mostly current' },
      { score: 4, label: 'Organized, owned, and versioned. Canonical documents are clear' },
    ],
  },
  {
    id: 'np-q5',
    type: 'score',
    dimension: 'decision-clarity',
    prompt: 'Can your leadership team name the three to five decisions that determine whether your mission advances this year?',
    options: [
      { score: 1, label: 'We would not agree' },
      { score: 2, label: 'We would agree in the room but not have it written down' },
      { score: 3, label: 'Yes, and it is written somewhere' },
      { score: 4, label: 'Yes. We review them at every leadership meeting' },
    ],
  },
  {
    id: 'np-q6',
    type: 'score',
    dimension: 'decision-clarity',
    prompt: 'What do your leadership meetings typically focus on?',
    options: [
      { score: 1, label: 'Updates and firefighting' },
      { score: 2, label: 'Status reports and problem-solving' },
      { score: 3, label: 'Decisions, with data brought in as needed' },
      { score: 4, label: 'Pre-synthesized evidence and strategic calls' },
    ],
  },
  {
    id: 'np-q7',
    type: 'score',
    dimension: 'decision-clarity',
    prompt: 'If your board asked "is this program actually working?" today, how fast could you give a real answer?',
    options: [
      { score: 1, label: 'Weeks. We would build a custom report' },
      { score: 2, label: 'A few days, pulling from several systems' },
      { score: 3, label: 'Same day, from a dashboard' },
      { score: 4, label: 'Immediately. It is tracked continuously' },
    ],
  },
  {
    id: 'np-q8',
    type: 'score',
    dimension: 'decision-clarity',
    prompt: 'When was the last time your team materially changed a program based on what the data showed?',
    options: [
      { score: 1, label: 'I cannot remember' },
      { score: 2, label: 'It happens occasionally' },
      { score: 3, label: 'Every program cycle' },
      { score: 4, label: 'Regularly. It is how we operate' },
    ],
  },
  {
    id: 'np-q9',
    type: 'score',
    dimension: 'architecture-health',
    prompt: 'Who owns your organizational data?',
    options: [
      { score: 1, label: 'Nobody officially' },
      { score: 2, label: 'That one staff member who knows everything' },
      { score: 3, label: 'A named role or team' },
      { score: 4, label: 'A dedicated function with documentation and backup' },
    ],
  },
  {
    id: 'np-q10',
    type: 'context',
    dimension: 'architecture-health',
    prompt: 'Which of the following tools does your organization use?',
    helper: 'Select all that apply.',
    multiSelectOptions: [
      'Salesforce / HubSpot / CRM',
      'Google Workspace / Microsoft 365',
      'Bloomerang / DonorPerfect / donor management',
      'Apricot / CaseWorthy / ETO / program management',
      'PowerSchool / Infinite Campus / student information systems',
      'Grants management tool',
      'QuickBooks / Sage / accounting',
      'Excel / Google Sheets heavily',
      'A BI or reporting tool',
      'Other',
    ],
  },
  {
    id: 'np-q11',
    type: 'score',
    dimension: 'architecture-health',
    prompt: 'If your key systems were unavailable for a week, could you continue making program or operational decisions?',
    options: [
      { score: 1, label: 'We would be stuck' },
      { score: 2, label: 'We would scramble but manage' },
      { score: 3, label: 'Yes, we have workarounds' },
      { score: 4, label: 'Yes, our processes are robust' },
    ],
  },
  {
    id: 'np-q12',
    type: 'score',
    dimension: 'ai-readiness',
    prompt: 'How is your team currently engaging with AI?',
    options: [
      { score: 1, label: 'We are not using it, or people are using personal ChatGPT accounts' },
      { score: 2, label: 'We are exploring AI features inside existing tools' },
      { score: 3, label: 'We have a few AI pilots or use cases in motion' },
      { score: 4, label: 'We have AI embedded in multiple workflows with clear outcomes' },
    ],
  },
  {
    id: 'np-q13',
    type: 'score',
    dimension: 'ai-readiness',
    prompt: 'If you deployed an AI agent to synthesize your program data tomorrow, how confident are you in its output?',
    options: [
      { score: 1, label: 'I would not trust it' },
      { score: 2, label: 'Skeptical' },
      { score: 3, label: 'Cautiously optimistic, with human review' },
      { score: 4, label: 'Confident, with explicit review checkpoints' },
    ],
  },
  {
    id: 'np-q14',
    type: 'score',
    dimension: 'ai-readiness',
    prompt: 'Does your organization have explicit principles or policies for how AI gets used with program or participant data?',
    options: [
      { score: 1, label: 'None. I have not thought about it' },
      { score: 2, label: 'Not formally, but we have discussed it' },
      { score: 3, label: 'Yes, we have informal guidelines' },
      { score: 4, label: 'Yes, we have a written policy that is operationalized' },
    ],
  },
  {
    id: 'np-q15',
    type: 'open',
    dimension: 'ai-readiness',
    prompt: 'What is the single biggest pain your leadership team is trying to solve in the next 90 days?',
    helper: 'A few sentences is plenty.',
  },
]

export const QUESTIONS: Record<Track, Question[]> = {
  'small-business': SB,
  nonprofit: NP,
}

export interface ScoreResult {
  dimension: Dimension
  average: number
  stage: Stage
}

export function computeScores(
  track: Track,
  answers: Record<string, number | string | string[]>,
): ScoreResult[] {
  const questions = QUESTIONS[track]
  const byDimension: Record<Dimension, number[]> = {
    'data-maturity': [],
    'decision-clarity': [],
    'architecture-health': [],
    'ai-readiness': [],
  }

  for (const q of questions) {
    if (q.type !== 'score') continue
    const value = answers[q.id]
    if (typeof value === 'number' && value >= 1 && value <= 4) {
      byDimension[q.dimension].push(value)
    }
  }

  return (Object.keys(byDimension) as Dimension[]).map((dim) => {
    const scores = byDimension[dim]
    const avg = scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : 0
    return {
      dimension: dim,
      average: Number(avg.toFixed(1)),
      stage: scoreToStage(avg),
    }
  })
}

export function overallBottleneckStage(results: ScoreResult[]): Stage {
  const stageRank: Record<Stage, number> = {
    Scattered: 0,
    Centralized: 1,
    Integrated: 2,
    Intelligent: 3,
  }
  return results.reduce<Stage>((lowest, r) => {
    return stageRank[r.stage] < stageRank[lowest] ? r.stage : lowest
  }, 'Intelligent')
}

// ============================================================
// Insight engine + priorities + recommended next step
// ============================================================

export interface Insight {
  id: string
  headline: string
  body: string
}

export interface Priority {
  title: string
  body: string
  estimate: string
}

export interface RecommendedNextStep {
  stage: Stage
  headline: string
  body: string
  href: string
  hrefLabel: string
}

export interface ReportPayload {
  track: Track
  scores: ScoreResult[]
  bottleneckStage: Stage
  insight: Insight
  priorities: Priority[]
  nextStep: RecommendedNextStep
  organization?: string
  statedPain?: string
  toolsSelected: string[]
}

function dimensionByKey(scores: ScoreResult[], dim: Dimension): ScoreResult | undefined {
  return scores.find((s) => s.dimension === dim)
}

function weakestDimension(scores: ScoreResult[]): ScoreResult {
  return [...scores].sort((a, b) => a.average - b.average)[0] ?? scores[0]!
}

function strongestDimension(scores: ScoreResult[]): ScoreResult {
  return [...scores].sort((a, b) => b.average - a.average)[0] ?? scores[0]!
}

function allBelow(scores: ScoreResult[], threshold: number): boolean {
  return scores.every((s) => s.average < threshold)
}

function allAbove(scores: ScoreResult[], threshold: number): boolean {
  return scores.every((s) => s.average >= threshold)
}

export function selectInsight(
  scores: ScoreResult[],
  answers: Record<string, number | string | string[]>,
  track: Track,
): Insight {
  const data = dimensionByKey(scores, 'data-maturity')?.average ?? 0
  const clarity = dimensionByKey(scores, 'decision-clarity')?.average ?? 0
  const arch = dimensionByKey(scores, 'architecture-health')?.average ?? 0
  const ai = dimensionByKey(scores, 'ai-readiness')?.average ?? 0

  const ownerQ = track === 'small-business' ? 'sb-q9' : 'np-q9'
  const ownerAnswer = answers[ownerQ]
  const singlePerson = typeof ownerAnswer === 'number' && ownerAnswer <= 2

  if (allAbove(scores, 2.5)) {
    return {
      id: 'strong-across',
      headline: 'You are in rare company.',
      body: 'You scored in the Integrated range or higher across every dimension. The question is not whether to invest in AI — it is which specific agent or system to build first. A discovery call is probably a better use of your time than another assessment.',
    }
  }

  if (allBelow(scores, 2.0)) {
    return {
      id: 'all-low',
      headline: 'Consistently low is not a problem to be discouraged by.',
      body: 'Your scores are consistently low across every dimension. This is not a bad place to start. It means your biggest opportunity is foundational clarity, not technology. Organizations that start here often move faster than those that have half-built solutions to unwind.',
    }
  }

  if (clarity >= 3.0 && data < 2.5) {
    return {
      id: 'clarity-over-data',
      headline: 'High clarity, low data maturity is the hardest combination.',
      body: 'You scored high on decision clarity but low on data maturity. You know what you want to decide, but you cannot trust the inputs. The urgency to fix the foundation is higher than your scores suggest — the gap is not in thinking, it is in trusting what you measure against.',
    }
  }

  if (ai > arch + 0.4) {
    return {
      id: 'ai-over-arch',
      headline: 'AI readiness ahead of architecture is a trap.',
      body: 'Your AI readiness score is higher than your architecture health score. Teams that jump to AI before fixing architecture spend the next year explaining why their agents are unreliable. Shore up the architecture first; the AI will land on stable ground.',
    }
  }

  if (singlePerson) {
    return {
      id: 'single-person',
      headline: 'There is a single-person dependency in your data ownership.',
      body: 'Your answer on data ownership suggests most of what you know about your data lives in one person\'s head. Before any other investment, audit what happens if that person leaves. That risk is larger than any technology gap on your list.',
    }
  }

  if (data < 2.0 && clarity < 2.0) {
    return {
      id: 'foundation-first',
      headline: 'The foundation problem shows up before the tooling problem.',
      body: 'Your data maturity and decision clarity both landed in the Scattered range. No dashboard, no agent, and no reporting platform will work well until those two are in better shape. Good news: neither requires heavy technology spend to improve.',
    }
  }

  if (data >= 3.0 && clarity < 2.5) {
    return {
      id: 'data-no-decisions',
      headline: 'You have more data than decisions.',
      body: 'Your data maturity is strong, but your decision clarity is not. You are probably measuring more than you need and deciding on less than you should. The next move is not more data — it is naming the three to five decisions your leadership team actually has to get right.',
    }
  }

  const weakest = weakestDimension(scores)
  const strongest = strongestDimension(scores)
  return {
    id: 'general-weakest',
    headline: `Your bottleneck is ${DIMENSION_LABELS[weakest.dimension]}.`,
    body: `You scored strongest on ${DIMENSION_LABELS[strongest.dimension]} (${strongest.average}/4.0) and weakest on ${DIMENSION_LABELS[weakest.dimension]} (${weakest.average}/4.0). The gap between your strongest and weakest is what is slowing the system down. Fixing the weakest dimension is usually higher leverage than pushing the strongest higher.`,
  }
}

export function computePriorities(scores: ScoreResult[]): Priority[] {
  const priorityByDimension: Record<Dimension, Priority> = {
    'data-maturity': {
      title: 'Define your core data model',
      body: 'Write down what an "active client" or "active customer" is, where it lives, who owns the definition. Do this as a leadership conversation, not a technical one. This single artifact unlocks every downstream investment.',
      estimate: '2 to 4 weeks',
    },
    'decision-clarity': {
      title: 'Name the three to five decisions that actually matter',
      body: 'Get your leadership team in a room and list the recurring decisions that determine whether the year goes well. Then trace backwards from each decision to the data that should inform it. Most organizations have more data than decisions — the problem is rarely volume.',
      estimate: '1 to 2 weeks',
    },
    'architecture-health': {
      title: 'Audit ownership and single-person risk',
      body: 'Map every data source to a named owner with documentation and a backup. Note where the answer is "that one person who never takes vacation." Fix those before any new tool investment. Resilience compounds.',
      estimate: '2 to 3 weeks',
    },
    'ai-readiness': {
      title: 'Pick one small, well-scoped agent use case',
      body: 'Do not try to "adopt AI." Pick one specific job that, done well by an agent, would change someone\'s week. Build that, run it for 90 days with explicit human review, and expand from what you learn.',
      estimate: '4 to 8 weeks',
    },
  }

  return [...scores]
    .sort((a, b) => a.average - b.average)
    .slice(0, 3)
    .map((s) => priorityByDimension[s.dimension])
}

export function recommendedNextStep(stage: Stage): RecommendedNextStep {
  if (stage === 'Scattered') {
    return {
      stage,
      headline: 'Start with clarity, not technology.',
      body: 'You are not ready for AI yet, and that is not a criticism. It is clarity. The right next step is an internal readiness conversation or the Forte AI and Data Health Assessment, which formalizes this process.',
      href: '/services',
      hrefLabel: 'See the Assessment engagement →',
    }
  }
  if (stage === 'Centralized') {
    return {
      stage,
      headline: 'Build the foundation once, so every future investment compounds.',
      body: 'Your foundation is uneven. The Foundation Sprint (six to eight weeks) is built for organizations at this stage. It produces a Decision Data Model that gives every downstream investment — dashboards, reporting, AI — something reliable to build on.',
      href: '/services',
      hrefLabel: 'See the Foundation Sprint →',
    }
  }
  if (stage === 'Integrated') {
    return {
      stage,
      headline: 'You are ready to build a Decision Engine.',
      body: 'AI agents can produce reliable outputs on your foundation. The question is which agent to build first. A discovery call is the right next step.',
      href: '/agents',
      hrefLabel: 'See the agents we build →',
    }
  }
  return {
    stage,
    headline: 'Your foundation is strong. Keep the system evolving.',
    body: 'You are in rare company. The Fractional Head of Decision Intelligence engagement is built for organizations that already have the foundation and need ongoing senior leadership to keep it evolving.',
    href: '/services#fractional',
    hrefLabel: 'See the Fractional engagement →',
  }
}

export function buildReport(
  track: Track,
  answers: Record<string, number | string | string[]>,
  organization?: string,
): ReportPayload {
  const scores = computeScores(track, answers)
  const bottleneckStage = overallBottleneckStage(scores)
  const insight = selectInsight(scores, answers, track)
  const priorities = computePriorities(scores)
  const nextStep = recommendedNextStep(bottleneckStage)
  const statedPainQ = track === 'small-business' ? 'sb-q15' : 'np-q15'
  const painRaw = answers[statedPainQ]
  const statedPain = typeof painRaw === 'string' ? painRaw : undefined
  const toolsQ = track === 'small-business' ? 'sb-q10' : 'np-q10'
  const toolsRaw = answers[toolsQ]
  const toolsSelected = Array.isArray(toolsRaw) ? toolsRaw : []

  return {
    track,
    scores,
    bottleneckStage,
    insight,
    priorities,
    nextStep,
    ...(organization ? { organization } : {}),
    ...(statedPain ? { statedPain } : {}),
    toolsSelected,
  }
}
