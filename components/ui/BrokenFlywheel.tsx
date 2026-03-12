'use client'

import { useState, useRef, useEffect } from 'react'
import { m, AnimatePresence } from 'framer-motion'

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */
interface Segment {
  id: string
  label: string
  problems: string[]
  startAngle: number
  sweepAngle: number
}

const SEGMENTS: Segment[] = [
  {
    id: 'collection',
    label: 'Collection',
    problems: [
      'Scattered across 5+ tools nobody owns',
      'Manual entry creating duplicate records',
      'No single source of truth for anything',
    ],
    startAngle: -14,
    sweepAngle: 58,
  },
  {
    id: 'quality',
    label: 'Quality',
    problems: [
      'Different reports show different numbers',
      'Nobody trusts the dashboards',
      'Months-old data driving today\'s decisions',
    ],
    startAngle: 52,
    sweepAngle: 58,
  },
  {
    id: 'access',
    label: 'Access',
    problems: [
      'Only one person knows how to pull reports',
      'Weeks to get a simple data request fulfilled',
      'Leadership flying blind between board meetings',
    ],
    startAngle: 118,
    sweepAngle: 58,
  },
  {
    id: 'reporting',
    label: 'Reporting',
    problems: [
      'Teams arguing over which metrics matter',
      'Beautiful dashboards nobody actually looks at',
      'Hours spent compiling instead of analyzing',
    ],
    startAngle: 184,
    sweepAngle: 58,
  },
  {
    id: 'insights',
    label: 'Insights',
    problems: [
      'Decisions made on gut instinct, not data',
      'AI investments with no data foundation',
      'Always reactive, never predictive',
    ],
    startAngle: 250,
    sweepAngle: 58,
  },
]

/* ------------------------------------------------------------------ */
/*  Geometry helpers                                                    */
/* ------------------------------------------------------------------ */
const CX = 220
const CY = 220
const OUTER = 170
const INNER = 105
const GAP = 8 // gap between segments in degrees

function polarToXY(cx: number, cy: number, r: number, deg: number) {
  const rad = ((deg - 90) * Math.PI) / 180
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
}

/** Thick arc sector path (annular wedge) */
function sectorPath(
  cx: number,
  cy: number,
  outerR: number,
  innerR: number,
  startDeg: number,
  endDeg: number,
) {
  const oStart = polarToXY(cx, cy, outerR, startDeg)
  const oEnd = polarToXY(cx, cy, outerR, endDeg)
  const iStart = polarToXY(cx, cy, innerR, endDeg)
  const iEnd = polarToXY(cx, cy, innerR, startDeg)
  const large = endDeg - startDeg > 180 ? 1 : 0

  return [
    `M ${oStart.x} ${oStart.y}`,
    `A ${outerR} ${outerR} 0 ${large} 1 ${oEnd.x} ${oEnd.y}`,
    `L ${iStart.x} ${iStart.y}`,
    `A ${innerR} ${innerR} 0 ${large} 0 ${iEnd.x} ${iEnd.y}`,
    'Z',
  ].join(' ')
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */
export function BrokenFlywheel() {
  const [hovered, setHovered] = useState<string | null>(null)
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 })
  const svgRef = useRef<SVGSVGElement>(null)

  // Position the tooltip card near the hovered segment
  useEffect(() => {
    if (!hovered) return
    const seg = SEGMENTS.find((s) => s.id === hovered)
    if (!seg) return
    const midAngle = seg.startAngle + seg.sweepAngle / 2
    const midR = (OUTER + INNER) / 2
    const pos = polarToXY(CX, CY, midR + 30, midAngle)
    setTooltipPos({ x: pos.x, y: pos.y })
  }, [hovered])

  return (
    <div className="relative w-full max-w-lg mx-auto">
      <svg
        ref={svgRef}
        viewBox="0 0 440 440"
        fill="none"
        className="w-full"
      >
        <defs>
          {/* Crack glow filter */}
          <filter id="crack-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Segment hover glow */}
          <filter id="seg-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Radial background glow */}
          <radialGradient id="bg-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#A07840" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#A07840" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Background */}
        <circle cx={CX} cy={CY} r="210" fill="url(#bg-glow)" />

        {/* Faint guide circle */}
        <circle
          cx={CX}
          cy={CY}
          r={(OUTER + INNER) / 2}
          stroke="#C49A58"
          strokeWidth="0.3"
          strokeDasharray="2 6"
          fill="none"
          opacity="0.1"
        />

        {/* Arc segments */}
        {SEGMENTS.map((seg) => {
          const isActive = hovered === seg.id
          const endAngle = seg.startAngle + seg.sweepAngle
          const midAngle = seg.startAngle + seg.sweepAngle / 2

          // Offset direction for the "broken" / exploded feel
          const offsetRad = ((midAngle - 90) * Math.PI) / 180
          const dist = isActive ? 10 : 4
          const tx = Math.cos(offsetRad) * dist
          const ty = Math.sin(offsetRad) * dist

          // Label position — centered in the arc
          const labelR = (OUTER + INNER) / 2
          const labelPos = polarToXY(CX, CY, labelR, midAngle)

          return (
            <m.g
              key={seg.id}
              onMouseEnter={() => setHovered(seg.id)}
              onMouseLeave={() => setHovered(null)}
              style={{ cursor: 'pointer' }}
              animate={{ x: tx, y: ty }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Glow layer behind active segment */}
              {isActive && (
                <m.path
                  d={sectorPath(CX, CY, OUTER + 4, INNER - 4, seg.startAngle, endAngle)}
                  fill="#C49A58"
                  filter="url(#seg-glow)"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.12 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                />
              )}

              {/* Main segment */}
              <m.path
                d={sectorPath(CX, CY, OUTER, INNER, seg.startAngle, endAngle)}
                fill={isActive ? 'rgba(160,120,64,0.18)' : 'rgba(160,120,64,0.06)'}
                stroke="#C49A58"
                animate={{
                  strokeWidth: isActive ? 1.5 : 0.8,
                  strokeOpacity: isActive ? 0.8 : 0.25,
                  fillOpacity: isActive ? 1 : 0.6,
                }}
                transition={{ duration: 0.3 }}
              />

              {/* Label inside the arc */}
              <m.text
                x={labelPos.x}
                y={labelPos.y}
                textAnchor="middle"
                dominantBaseline="middle"
                className="font-body pointer-events-none select-none"
                fontWeight="500"
                fontSize="12"
                letterSpacing="0.5"
                animate={{
                  fill: isActive ? '#C49A58' : 'rgba(255,255,255,0.55)',
                  fontSize: isActive ? '13px' : '12px',
                }}
                transition={{ duration: 0.25 }}
              >
                {seg.label}
              </m.text>
            </m.g>
          )
        })}

        {/* Crack marks in the gaps between segments */}
        {SEGMENTS.map((seg, i) => {
          const gapCenter = seg.startAngle + seg.sweepAngle + GAP / 2
          const crackMid = polarToXY(CX, CY, (OUTER + INNER) / 2, gapCenter)

          // Jagged crack — zigzag between outer and inner
          const p1 = polarToXY(CX, CY, OUTER + 2, gapCenter - 1)
          const p2 = polarToXY(CX, CY, OUTER - 12, gapCenter + 2.5)
          const p3 = polarToXY(CX, CY, (OUTER + INNER) / 2 + 5, gapCenter - 1.5)
          const p4 = polarToXY(CX, CY, (OUTER + INNER) / 2 - 10, gapCenter + 2)
          const p5 = polarToXY(CX, CY, INNER + 10, gapCenter - 1)
          const p6 = polarToXY(CX, CY, INNER - 2, gapCenter + 1.5)

          const crackPath = `M ${p1.x} ${p1.y} L ${p2.x} ${p2.y} L ${p3.x} ${p3.y} L ${p4.x} ${p4.y} L ${p5.x} ${p5.y} L ${p6.x} ${p6.y}`

          return (
            <m.g key={`crack-${i}`}>
              {/* Crack line */}
              <m.path
                d={crackPath}
                stroke="#C49A58"
                strokeWidth="0.8"
                strokeLinecap="round"
                fill="none"
                filter="url(#crack-glow)"
                animate={{ opacity: [0.2, 0.5, 0.2] }}
                transition={{ repeat: Infinity, duration: 3.5, delay: i * 0.6 }}
              />
              {/* Warm glow bleed through crack */}
              <m.circle
                cx={crackMid.x}
                cy={crackMid.y}
                r="8"
                fill="#A07840"
                animate={{ opacity: [0.03, 0.1, 0.03] }}
                transition={{ repeat: Infinity, duration: 3, delay: i * 0.5 }}
              />
            </m.g>
          )
        })}

        {/* Center content */}
        <circle cx={CX} cy={CY} r="60" fill="rgba(6,14,28,0.8)" />
        <circle cx={CX} cy={CY} r="60" stroke="#C49A58" strokeWidth="0.5" fill="none" opacity="0.15" />

        <text
          x={CX}
          y={CY - 10}
          textAnchor="middle"
          className="font-display"
          fontSize="16"
          fill="white"
          opacity="0.65"
        >
          The Data Flywheel
        </text>
        <text
          x={CX}
          y={CY + 12}
          textAnchor="middle"
          className="font-display italic"
          fontSize="15"
          fill="#C49A58"
          opacity="0.7"
        >
          is broken
        </text>
      </svg>

      {/* Tooltip card anchored near hovered segment */}
      <AnimatePresence>
        {hovered && (
          <m.div
            key={hovered}
            initial={{ opacity: 0, scale: 0.92, y: 6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 4 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute z-10 w-[260px] rounded-xl border border-brass/20 bg-navy-deep/95 backdrop-blur-md p-5 shadow-[0_12px_40px_rgba(0,0,0,0.5)]"
            style={{
              left: `${(tooltipPos.x / 440) * 100}%`,
              top: `${(tooltipPos.y / 440) * 100}%`,
              transform: 'translate(-50%, -50%)',
              pointerEvents: 'none',
            }}
          >
            {/* Top accent */}
            <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-xl bg-gradient-to-r from-transparent via-brass/50 to-transparent" />

            <p className="font-body text-[11px] font-medium uppercase tracking-wider text-brass-light mb-3">
              {SEGMENTS.find((s) => s.id === hovered)?.label}
            </p>
            <ul className="space-y-2">
              {SEGMENTS.find((s) => s.id === hovered)?.problems.map((problem, j) => (
                <m.li
                  key={problem}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: j * 0.06 }}
                  className="flex items-start gap-2.5 font-body text-[12px] leading-relaxed text-white/60"
                >
                  <span className="mt-[7px] block h-[3px] w-[3px] shrink-0 rounded-full bg-brass/60" />
                  {problem}
                </m.li>
              ))}
            </ul>
          </m.div>
        )}
      </AnimatePresence>

      {/* Hint text */}
      <p className="mt-3 text-center font-mono text-[9px] uppercase tracking-widest text-white/20">
        Hover each segment to explore
      </p>
    </div>
  )
}
