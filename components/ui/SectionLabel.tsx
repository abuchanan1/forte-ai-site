interface SectionLabelProps {
  label: string
  index?: number
}

export function SectionLabel({ label, index }: SectionLabelProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="h-px w-6 bg-brass" />
      <span className="font-mono text-[10px] font-medium uppercase tracking-mono-wide text-brass">
        {index !== undefined && (
          <span className="mr-2">
            {String(index).padStart(2, '0')}
          </span>
        )}
        {label}
      </span>
    </div>
  )
}
