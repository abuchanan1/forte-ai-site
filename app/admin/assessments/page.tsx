import type { Metadata } from 'next'
import { upstashCreds } from '@/lib/upstash'

export const metadata: Metadata = {
  title: 'Assessments — Admin',
  robots: { index: false, follow: false },
}

interface SubmissionRecord {
  submissionId: string
  timestamp: string
  sessionId: string
  track: 'small-business' | 'nonprofit'
  scores: Array<{ dimension: string; average: number; stage: string }>
  bottleneckStage: string
  insight: { id: string; headline: string; body: string }
  contact: {
    name: string
    email: string
    organization: string
    role: string
    orgSize: string
    phone: string
    requestedCall: boolean
  }
}

async function loadSubmissions(): Promise<SubmissionRecord[]> {
  const creds = upstashCreds()
  if (!creds) return []
  const { Redis } = await import('@upstash/redis')
  const redis = new Redis({ url: creds.url, token: creds.token })
  const ids = (await redis.zrange('assessment:index', 0, 99, {
    rev: true,
  })) as string[]
  if (ids.length === 0) return []
  const records = await Promise.all(
    ids.map((id) => redis.get<SubmissionRecord>(`assessment:${id}`)),
  )
  return records.filter((r): r is SubmissionRecord => r !== null)
}

export default async function AssessmentsAdminPage() {
  const submissions = await loadSubmissions()

  return (
    <main className="min-h-screen bg-navy-deep px-6 py-20 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-end justify-between">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-mono text-brass-light">
              Admin
            </p>
            <h1 className="mt-2 font-display text-3xl font-normal leading-display text-white md:text-4xl">
              Decision Readiness submissions
            </h1>
          </div>
          <p className="font-mono text-[11px] uppercase tracking-mono text-white/50">
            {submissions.length} {submissions.length === 1 ? 'record' : 'records'}
          </p>
        </div>

        {submissions.length === 0 ? (
          <p className="mt-12 font-body text-base font-light text-white/60">
            No submissions yet.
          </p>
        ) : (
          <div className="mt-10 space-y-4">
            {submissions.map((s) => (
              <details
                key={s.submissionId}
                className="group rounded-sm border border-brass/15 bg-navy-mid/40 open:border-brass/40"
              >
                <summary className="cursor-pointer list-none px-5 py-4">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <p className="font-body text-sm font-medium text-white">
                        {s.contact.organization || (
                          <span className="italic text-white/50">
                            (anonymous)
                          </span>
                        )}
                      </p>
                      <p className="mt-1 font-mono text-[10px] uppercase tracking-mono text-white/45">
                        {new Date(s.timestamp).toLocaleString()} ·{' '}
                        {s.track === 'small-business'
                          ? 'Small Business'
                          : 'Nonprofit'}{' '}
                        ·{' '}
                        <span className="text-brass-light">
                          {s.bottleneckStage}
                        </span>
                        {s.contact.requestedCall ? (
                          <span className="ml-2 text-brass-light">
                            · requested call
                          </span>
                        ) : null}
                      </p>
                    </div>
                    <div className="flex gap-3 font-mono text-[10px] uppercase tracking-mono text-white/60">
                      {s.scores.map((sc) => (
                        <span key={sc.dimension}>
                          {sc.dimension.slice(0, 4)}: {sc.average}
                        </span>
                      ))}
                    </div>
                  </div>
                </summary>
                <div className="border-t border-brass/10 px-5 py-5 text-sm">
                  <dl className="grid gap-3 md:grid-cols-2">
                    <DetailRow label="Submission ID" value={s.submissionId} />
                    <DetailRow label="Session ID" value={s.sessionId} />
                    <DetailRow label="Name" value={s.contact.name || '—'} />
                    <DetailRow label="Email" value={s.contact.email || '—'} />
                    <DetailRow label="Role" value={s.contact.role || '—'} />
                    <DetailRow
                      label="Org size"
                      value={s.contact.orgSize || '—'}
                    />
                    <DetailRow label="Phone" value={s.contact.phone || '—'} />
                    <DetailRow
                      label="Requested call"
                      value={s.contact.requestedCall ? 'Yes' : 'No'}
                    />
                  </dl>
                  <p className="mt-6 font-mono text-[10px] uppercase tracking-mono text-brass-light">
                    Insight
                  </p>
                  <p className="mt-1 font-body text-sm font-light leading-body text-white/75">
                    <strong className="text-white">{s.insight.headline}</strong>{' '}
                    {s.insight.body}
                  </p>
                </div>
              </details>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-3">
      <dt className="w-32 shrink-0 font-mono text-[10px] uppercase tracking-mono text-white/45">
        {label}
      </dt>
      <dd className="font-body text-sm font-light text-white/80">{value}</dd>
    </div>
  )
}
