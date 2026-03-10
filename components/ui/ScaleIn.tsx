'use client'

import { useRef } from 'react'
import {
  m,
  useInView,
  useReducedMotion,
  type HTMLMotionProps,
} from 'framer-motion'

interface ScaleInProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode
  delay?: number
  className?: string
}

export function ScaleIn({
  children,
  delay = 0,
  className,
  ...props
}: ScaleInProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-64px' })
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    )
  }

  return (
    <m.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9, y: 32 }}
      animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.9, y: 32 }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
      {...props}
    >
      {children}
    </m.div>
  )
}
