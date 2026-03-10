'use client'

import { useRef, useState } from 'react'
import { cn } from '@/lib/utils'

interface GlowCardProps {
  header?: React.ReactNode
  body?: React.ReactNode
  footer?: React.ReactNode
  className?: string
}

export function GlowCard({ header, body, footer, className }: GlowCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [glowPos, setGlowPos] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  function handleMouseMove(e: React.MouseEvent) {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    setGlowPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        'relative rounded-sm border border-brass/10 bg-navy-mid p-6 transition-all duration-300 hover:border-brass/40 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(160,120,64,0.12)]',
        className,
      )}
    >
      {/* Glow effect */}
      {isHovered && (
        <div
          className="pointer-events-none absolute inset-0 rounded-sm opacity-20 transition-opacity duration-300"
          style={{
            background: `radial-gradient(300px circle at ${glowPos.x}px ${glowPos.y}px, rgba(196, 154, 88, 0.15), transparent 60%)`,
          }}
        />
      )}
      <div className="relative z-10">
        {header && <div className="mb-4">{header}</div>}
        {body && <div>{body}</div>}
        {footer && (
          <div className="mt-6 border-t border-brass/10 pt-4">{footer}</div>
        )}
      </div>
    </div>
  )
}
