'use client'

import { useState } from 'react'
import { m } from 'framer-motion'

interface ValueCardProps {
  title: string
  body: string
  id: string
  index: number
}

/**
 * Interactive value card with animated icon, hover glow,
 * and a sleek Apple-style aesthetic.
 */
export function ValueCard({ title, body, id, index }: ValueCardProps) {
  const [hovered, setHovered] = useState(false)

  const iconPaths: Record<string, JSX.Element> = {
    clarity: (
      <>
        <circle cx="24" cy="24" r="10" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <m.path
          d="M24 18v12M18 24h12"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          animate={hovered ? { rotate: 45 } : { rotate: 0 }}
          transition={{ duration: 0.3 }}
          style={{ transformOrigin: '24px 24px' }}
        />
      </>
    ),
    outcomes: (
      <>
        <m.path
          d="M14 30l6-8 5 4 7-12"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          animate={hovered ? { y: -2 } : { y: 0 }}
          transition={{ duration: 0.3 }}
        />
        <m.circle
          cx="32"
          cy="14"
          r="3"
          fill="currentColor"
          animate={hovered ? { scale: 1.3 } : { scale: 1 }}
          transition={{ duration: 0.3 }}
        />
      </>
    ),
    access: (
      <>
        {/* Key head — circle with notch */}
        <m.circle
          cx="18"
          cy="18"
          r="6"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
          animate={hovered ? { rotate: -15 } : { rotate: 0 }}
          transition={{ duration: 0.3 }}
          style={{ transformOrigin: '18px 18px' }}
        />
        <circle cx="18" cy="18" r="2.5" fill="currentColor" opacity="0.4" />
        {/* Key shaft */}
        <m.path
          d="M23 22l10 10"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          animate={hovered ? { rotate: -15 } : { rotate: 0 }}
          transition={{ duration: 0.3 }}
          style={{ transformOrigin: '18px 18px' }}
        />
        {/* Key teeth — jagged bits */}
        <m.g
          animate={hovered ? { rotate: -15 } : { rotate: 0 }}
          transition={{ duration: 0.3 }}
          style={{ transformOrigin: '18px 18px' }}
        >
          <path d="M28 27l3 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M30 29l2.5 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M31.5 31l2 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </m.g>
      </>
    ),
    trust: (
      <>
        <m.rect
          x="14"
          y="14"
          width="20"
          height="20"
          rx="3"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
          animate={hovered ? { strokeDasharray: '0 0', strokeDashoffset: 0 } : {}}
          transition={{ duration: 0.3 }}
        />
        <m.path
          d="M20 24l3 3 5-6"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={hovered ? { pathLength: 1 } : { pathLength: 0.7 }}
          transition={{ duration: 0.4 }}
        />
      </>
    ),
  }

  return (
    <m.div
      className="group relative rounded-lg border border-brass/10 bg-navy-mid/50 p-8 transition-colors duration-300 hover:border-brass/30 overflow-hidden cursor-default"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {/* Background glow on hover */}
      <m.div
        className="pointer-events-none absolute inset-0 rounded-lg"
        animate={hovered ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.3 }}
        style={{
          background: 'radial-gradient(circle at 50% 0%, rgba(160,120,64,0.08) 0%, transparent 70%)',
        }}
      />

      {/* Icon */}
      <div className="relative mb-5">
        <m.div
          className="flex h-12 w-12 items-center justify-center rounded-lg bg-brass/10 text-brass-light"
          animate={hovered ? { scale: 1.05 } : { scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            {iconPaths[id] || iconPaths['clarity']}
          </svg>
        </m.div>
        {/* Subtle ring on hover */}
        <m.div
          className="absolute -inset-1 rounded-xl border border-brass/20"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={hovered ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Content */}
      <h3 className="relative font-body text-lg font-medium text-white mb-3">
        {title}
      </h3>
      <p className="relative font-body text-sm font-light leading-body text-white/55 group-hover:text-white/70 transition-colors duration-300">
        {body}
      </p>

      {/* Bottom accent line */}
      <m.div
        className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-brass/60 to-transparent"
        initial={{ width: '0%' }}
        animate={hovered ? { width: '100%' } : { width: '0%' }}
        transition={{ duration: 0.4 }}
      />
    </m.div>
  )
}
