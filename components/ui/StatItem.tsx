interface StatItemProps {
  num: string
  label: string
}

export function StatItem({ num, label }: StatItemProps) {
  return (
    <div className="flex flex-col gap-1">
      <span className="font-display text-4xl font-medium leading-none text-brass-light">
        {num}
      </span>
      <span className="font-body text-[11px] font-light uppercase tracking-label text-white/45">
        {label}
      </span>
    </div>
  )
}
