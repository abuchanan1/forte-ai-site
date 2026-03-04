import { cn } from '@/lib/utils'

interface CardProps {
  header?: React.ReactNode
  body?: React.ReactNode
  footer?: React.ReactNode
  className?: string
}

export function Card({ header, body, footer, className }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-sm border border-brass/10 bg-navy-mid p-6 transition-all duration-200 hover:border-brass/40 hover:shadow-[0_0_24px_rgba(160,120,64,0.08)]',
        className,
      )}
    >
      {header && <div className="mb-4">{header}</div>}
      {body && <div>{body}</div>}
      {footer && (
        <div className="mt-6 border-t border-brass/10 pt-4">{footer}</div>
      )}
    </div>
  )
}
