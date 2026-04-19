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
