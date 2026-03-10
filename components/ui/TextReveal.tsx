'use client'

import { useRef } from 'react'
import {
  m,
  useInView,
  useReducedMotion,
} from 'framer-motion'

interface TextRevealProps {
  children: string
  className?: string
  delay?: number
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
}

export function TextReveal({
  children,
  className,
  delay = 0,
  as: Tag = 'span',
}: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-64px' })
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return <Tag className={className}>{children}</Tag>
  }

  const words = children.split(' ')

  return (
    <Tag className={className}>
      <span ref={ref} className="inline">
        {words.map((word, i) => (
          <span key={i} className="inline-block overflow-hidden">
            <m.span
              className="inline-block"
              initial={{ y: '100%', opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: '100%', opacity: 0 }}
              transition={{
                duration: 0.5,
                delay: delay + i * 0.04,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {word}
              {i < words.length - 1 ? '\u00A0' : ''}
            </m.span>
          </span>
        ))}
      </span>
    </Tag>
  )
}
