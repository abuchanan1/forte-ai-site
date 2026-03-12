'use client'

import { m, useReducedMotion } from 'framer-motion'

/**
 * Animated SVG graphic showing data flowing through a pipeline
 * into structured decisions — representing Forte's core value prop.
 */
export function DataFlowGraphic() {
  const reduceMotion = useReducedMotion()
  const dur = reduceMotion ? 0 : 1

  return (
    <div className="relative flex items-center justify-center">
      <svg
        viewBox="0 0 400 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full max-w-sm"
      >
        {/* Background glow */}
        <defs>
          <radialGradient id="glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#A07840" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#A07840" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="flowLine" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#C49A58" stopOpacity="0" />
            <stop offset="50%" stopColor="#C49A58" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#C49A58" stopOpacity="0" />
          </linearGradient>
        </defs>

        <circle cx="200" cy="250" r="180" fill="url(#glow)" />

        {/* Scattered data nodes (top) */}
        {[
          { cx: 80, cy: 60, r: 6, delay: 0 },
          { cx: 160, cy: 40, r: 8, delay: 0.2 },
          { cx: 260, cy: 50, r: 5, delay: 0.4 },
          { cx: 320, cy: 80, r: 7, delay: 0.1 },
          { cx: 120, cy: 100, r: 5, delay: 0.3 },
          { cx: 220, cy: 90, r: 6, delay: 0.5 },
          { cx: 340, cy: 130, r: 4, delay: 0.6 },
          { cx: 60, cy: 130, r: 5, delay: 0.15 },
        ].map((node, i) => (
          <m.circle
            key={i}
            cx={node.cx}
            cy={node.cy}
            r={node.r}
            fill="#C49A58"
            initial={{ opacity: 0.15 }}
            animate={{ opacity: [0.15, 0.6, 0.15] }}
            transition={{
              repeat: Infinity,
              duration: 3 * dur || 3,
              delay: node.delay,
              ease: 'easeInOut',
            }}
          />
        ))}

        {/* Flow lines converging to center */}
        {[
          { x1: 80, y1: 60, x2: 200, y2: 220 },
          { x1: 160, y1: 40, x2: 200, y2: 220 },
          { x1: 260, y1: 50, x2: 200, y2: 220 },
          { x1: 320, y1: 80, x2: 200, y2: 220 },
          { x1: 120, y1: 100, x2: 200, y2: 220 },
          { x1: 220, y1: 90, x2: 200, y2: 220 },
        ].map((line, i) => (
          <m.line
            key={`line-${i}`}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke="#C49A58"
            strokeWidth="1"
            initial={{ opacity: 0, pathLength: 0 }}
            animate={{ opacity: [0, 0.25, 0], pathLength: [0, 1, 1] }}
            transition={{
              repeat: Infinity,
              duration: 4 * dur || 4,
              delay: i * 0.3,
              ease: 'easeInOut',
            }}
          />
        ))}

        {/* Central processing node */}
        <m.circle
          cx="200"
          cy="220"
          r="28"
          stroke="#C49A58"
          strokeWidth="1.5"
          fill="rgba(160,120,64,0.08)"
          animate={{ r: [28, 32, 28] }}
          transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
        />
        <m.circle
          cx="200"
          cy="220"
          r="14"
          fill="#C49A58"
          initial={{ opacity: 0.6 }}
          animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        />

        {/* Inner highlight dot */}
        <circle cx="200" cy="220" r="6" fill="#060E1C" opacity="0.5" />

        {/* Output lines diverging from center */}
        {[
          { x2: 120, y2: 380 },
          { x2: 200, y2: 400 },
          { x2: 280, y2: 380 },
        ].map((line, i) => (
          <m.line
            key={`out-${i}`}
            x1="200"
            y1="248"
            x2={line.x2}
            y2={line.y2}
            stroke="#C49A58"
            strokeWidth="1.5"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.4, 0] }}
            transition={{
              repeat: Infinity,
              duration: 4,
              delay: 1.5 + i * 0.4,
              ease: 'easeInOut',
            }}
          />
        ))}

        {/* Structured output nodes (bottom) */}
        {[
          { cx: 120, cy: 390, label: 'KPIs' },
          { cx: 200, cy: 410, label: 'Dashboards' },
          { cx: 280, cy: 390, label: 'AI Agents' },
        ].map((node, i) => (
          <m.g
            key={`out-node-${i}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.3, 0.9, 0.3] }}
            transition={{
              repeat: Infinity,
              duration: 3,
              delay: 2 + i * 0.3,
              ease: 'easeInOut',
            }}
          >
            <rect
              x={node.cx - 36}
              y={node.cy - 12}
              width="72"
              height="24"
              rx="4"
              stroke="#C49A58"
              strokeWidth="1"
              fill="rgba(160,120,64,0.06)"
            />
            <text
              x={node.cx}
              y={node.cy + 4}
              textAnchor="middle"
              className="font-mono"
              fontSize="9"
              fill="#C49A58"
              opacity="0.8"
            >
              {node.label}
            </text>
          </m.g>
        ))}

        {/* Label: messy data */}
        <text x="200" y="20" textAnchor="middle" className="font-mono" fontSize="9" fill="white" opacity="0.25" letterSpacing="2">
          RAW DATA
        </text>
        {/* Label: clear decisions */}
        <text x="200" y="460" textAnchor="middle" className="font-mono" fontSize="9" fill="#C49A58" opacity="0.5" letterSpacing="2">
          CLEAR DECISIONS
        </text>

        {/* Subtle orbit ring */}
        <m.circle
          cx="200"
          cy="220"
          r="60"
          stroke="#C49A58"
          strokeWidth="0.5"
          fill="none"
          strokeDasharray="4 8"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
          style={{ transformOrigin: '200px 220px' }}
        />
      </svg>
    </div>
  )
}
