import type { Stat } from '@/types'
import { StatItem } from './StatItem'

interface StatRowProps {
  stats: Stat[]
}

export function StatRow({ stats }: StatRowProps) {
  return (
    <div className="flex flex-wrap items-start gap-8 md:gap-0 md:divide-x md:divide-brass/15">
      {stats.map((stat) => (
        <div key={stat.label} className="md:px-8 first:md:pl-0 last:md:pr-0">
          <StatItem num={stat.num} label={stat.label} />
        </div>
      ))}
    </div>
  )
}
