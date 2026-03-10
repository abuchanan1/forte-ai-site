'use client'

import { useRef, useEffect, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'

interface AnimatedCounterProps {
  value: string
  label: string
}

export function AnimatedCounter({ value, label }: AnimatedCounterProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-64px' })
  const prefersReducedMotion = useReducedMotion()
  const [displayValue, setDisplayValue] = useState(prefersReducedMotion ? value : '')

  useEffect(() => {
    if (!isInView || prefersReducedMotion) {
      if (isInView) setDisplayValue(value)
      return
    }

    // Extract numeric part
    const numMatch = value.match(/(\d+)/)
    if (!numMatch || !numMatch[1]) {
      setDisplayValue(value)
      return
    }

    const numStr = numMatch[1]
    const target = parseInt(numStr, 10)
    const matchIndex = value.indexOf(numStr)
    const prefix = value.slice(0, matchIndex)
    const suffix = value.slice(matchIndex + numStr.length)
    const duration = 1500
    const startTime = performance.now()

    function animate(currentTime: number) {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = Math.round(eased * target)
      setDisplayValue(`${prefix}${current}${suffix}`)

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [isInView, value, prefersReducedMotion])

  return (
    <div ref={ref} className="flex flex-col gap-1">
      <span className="font-display text-4xl font-medium leading-none text-brass-light">
        {displayValue || value}
      </span>
      <span className="font-body text-[11px] font-light uppercase tracking-label text-white/45">
        {label}
      </span>
    </div>
  )
}
