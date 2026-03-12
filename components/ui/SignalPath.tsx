'use client'

import { m, useReducedMotion, useInView } from 'framer-motion'
import { useRef } from 'react'

/**
 * Elegant winding path that flows from lower-left to upper-right,
 * terminating in a softly glowing lightbulb. No labels, no text — purely visual.
 */
export function SignalPath() {
  const reduceMotion = useReducedMotion()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  const drawDuration = reduceMotion ? 0 : 3
  const glowDelay = reduceMotion ? 0 : 2.6

  // Shallower diagonal with wider winding curves
  // viewBox is 400 x 200 — wide and short
  const mainPath = [
    'M 8 180',
    'C 30 170 45 155 65 150',
    'C 90 143 80 165 105 155',
    'C 130 145 125 125 150 120',
    'C 175 115 170 135 195 125',
    'C 220 115 215 100 240 95',
    'C 265 90 260 105 285 95',
    'C 305 87 300 75 320 68',
    'C 340 61 335 50 352 45',
  ].join(' ')

  const echoPath = [
    'M 12 184',
    'C 34 174 49 159 69 154',
    'C 94 147 84 169 109 159',
    'C 134 149 129 129 154 124',
    'C 179 119 174 139 199 129',
    'C 224 119 219 104 244 99',
    'C 269 94 264 109 289 99',
    'C 309 91 304 79 324 72',
    'C 344 65 339 54 356 49',
  ].join(' ')

  return (
    <div ref={ref} className="relative w-full">
      <svg
        viewBox="0 0 400 210"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="pathGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#A07840" stopOpacity="0.1" />
            <stop offset="30%" stopColor="#A07840" stopOpacity="0.35" />
            <stop offset="65%" stopColor="#C49A58" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#C49A58" stopOpacity="1" />
          </linearGradient>

          <linearGradient id="echoGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#A07840" stopOpacity="0" />
            <stop offset="50%" stopColor="#A07840" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#C49A58" stopOpacity="0.12" />
          </linearGradient>

          <filter id="pathGlow" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          <radialGradient id="bulbGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#C49A58" stopOpacity="0.3" />
            <stop offset="40%" stopColor="#A07840" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#A07840" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Echo line */}
        <m.path
          d={echoPath}
          stroke="url(#echoGrad)"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: drawDuration + 0.4, ease: 'easeInOut' }}
        />

        {/* Main line — glow */}
        <m.path
          d={mainPath}
          stroke="#A07840"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
          filter="url(#pathGlow)"
          opacity={0.3}
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: drawDuration, ease: 'easeInOut' }}
        />

        {/* Main line — sharp */}
        <m.path
          d={mainPath}
          stroke="url(#pathGrad)"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: drawDuration, ease: 'easeInOut' }}
        />

        {/* Traveling pulse */}
        <m.circle
          r="2.5"
          fill="#C49A58"
          opacity={0}
          initial={{ opacity: 0 }}
          animate={isInView ? {
            opacity: [0, 0.7, 0],
            offsetDistance: ['0%', '100%'],
          } : {}}
          transition={{
            duration: drawDuration,
            ease: 'easeInOut',
            repeat: Infinity,
            repeatDelay: 2,
          }}
          style={{ offsetPath: `path("${mainPath}")` }}
        />

        {/* Lightbulb — upper right */}
        <g transform="translate(356, 22)">
          {/* Outer glow */}
          <m.circle
            cx="0"
            cy="20"
            r="28"
            fill="url(#bulbGlow)"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1.2, delay: glowDelay, ease: 'easeOut' }}
          />

          {/* Bulb outline */}
          <m.path
            d="M 0 4 C -8 4 -12 10 -12 17 C -12 22 -9 26 -6 28 L -6 31 L 6 31 L 6 28 C 9 26 12 22 12 17 C 12 10 8 4 0 4 Z"
            stroke="#C49A58"
            strokeWidth="1"
            fill="none"
            initial={{ opacity: 0, pathLength: 0 }}
            animate={isInView ? { opacity: 1, pathLength: 1 } : {}}
            transition={{ duration: 0.8, delay: glowDelay - 0.2, ease: 'easeOut' }}
          />

          {/* Filament */}
          <m.path
            d="M -3 21 Q 0 14 3 21"
            stroke="#C49A58"
            strokeWidth="0.8"
            strokeLinecap="round"
            fill="none"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: [0, 1, 0.6, 1] } : {}}
            transition={{
              duration: 2,
              delay: glowDelay + 0.4,
              ease: 'easeInOut',
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          />

          {/* Inner glow */}
          <m.circle
            cx="0"
            cy="17"
            r="5"
            fill="#C49A58"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: [0, 0.18, 0.06, 0.14] } : {}}
            transition={{
              duration: 3.5,
              delay: glowDelay + 0.6,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
            }}
          />

          {/* Base cap */}
          <m.rect
            x="-5"
            y="32"
            width="10"
            height="4"
            rx="1"
            stroke="#C49A58"
            strokeWidth="0.7"
            fill="none"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 0.5 } : {}}
            transition={{ duration: 0.4, delay: glowDelay + 0.2 }}
          />
        </g>
      </svg>
    </div>
  )
}
