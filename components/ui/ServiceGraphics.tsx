'use client'

import { m, useInView } from 'framer-motion'
import { useRef } from 'react'

/* ------------------------------------------------------------------ */
/* Shared wrapper                                                      */
/* ------------------------------------------------------------------ */
function GraphicWrapper({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <div
      ref={ref}
      className="relative flex items-center justify-center rounded-sm bg-navy-mid/50 border border-brass/10 aspect-[4/3] overflow-hidden"
    >
      {/* Background glow */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(160,120,64,0.06) 0%, transparent 70%)',
        }}
      />
      {inView && children}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* 1. Foundation Sprint — KPI framework nodes connecting              */
/* ------------------------------------------------------------------ */
export function FoundationGraphic() {
  const nodes = [
    { cx: 80, cy: 60, label: 'Revenue' },
    { cx: 220, cy: 50, label: 'Churn' },
    { cx: 340, cy: 70, label: 'NPS' },
    { cx: 120, cy: 160, label: 'Pipeline' },
    { cx: 280, cy: 150, label: 'Costs' },
    { cx: 200, cy: 250, label: 'Growth' },
  ]

  return (
    <GraphicWrapper>
      <svg viewBox="0 0 420 300" fill="none" className="w-full h-full p-6">
        {/* Connection lines */}
        {nodes.map((from, i) =>
          nodes.slice(i + 1).map((to, j) => (
            <m.line
              key={`${i}-${j}`}
              x1={from.cx}
              y1={from.cy}
              x2={to.cx}
              y2={to.cy}
              stroke="#C49A58"
              strokeWidth="0.5"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.2, 0.1] }}
              transition={{ duration: 2, delay: 0.5 + i * 0.15 + j * 0.1, ease: 'easeOut' }}
            />
          )),
        )}

        {/* Central framework hub */}
        <m.rect
          x="160"
          y="120"
          width="100"
          height="40"
          rx="6"
          stroke="#C49A58"
          strokeWidth="1.5"
          fill="rgba(160,120,64,0.08)"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{ transformOrigin: '210px 140px' }}
        />
        <m.text
          x="210"
          y="144"
          textAnchor="middle"
          className="font-mono"
          fontSize="9"
          fill="#C49A58"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ delay: 0.6 }}
        >
          KPI FRAMEWORK
        </m.text>

        {/* Metric nodes */}
        {nodes.map((node, i) => (
          <m.g
            key={node.label}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 + i * 0.12, type: 'spring', stiffness: 200 }}
            style={{ transformOrigin: `${node.cx}px ${node.cy}px` }}
          >
            <circle cx={node.cx} cy={node.cy} r="20" stroke="#C49A58" strokeWidth="1" fill="rgba(160,120,64,0.05)" />
            <m.circle
              cx={node.cx}
              cy={node.cy}
              r="4"
              fill="#C49A58"
              animate={{ r: [4, 5, 4], opacity: [0.6, 1, 0.6] }}
              transition={{ repeat: Infinity, duration: 2.5, delay: i * 0.3 }}
            />
            <text
              x={node.cx}
              y={node.cy + 32}
              textAnchor="middle"
              className="font-mono"
              fontSize="8"
              fill="white"
              opacity="0.35"
            >
              {node.label}
            </text>
          </m.g>
        ))}

        {/* Pulse rings from center */}
        {[0, 1, 2].map((i) => (
          <m.circle
            key={`pulse-${i}`}
            cx="210"
            cy="140"
            r="30"
            stroke="#C49A58"
            strokeWidth="0.5"
            fill="none"
            initial={{ r: 30, opacity: 0.3 }}
            animate={{ r: 120, opacity: 0 }}
            transition={{ repeat: Infinity, duration: 3, delay: i * 1, ease: 'easeOut' }}
          />
        ))}
      </svg>
    </GraphicWrapper>
  )
}

/* ------------------------------------------------------------------ */
/* 2. Infrastructure — Data flowing through layers                    */
/* ------------------------------------------------------------------ */
export function InfrastructureGraphic() {
  const layers = [
    { y: 40, label: 'DATA SOURCES', width: 320 },
    { y: 110, label: 'PIPELINES', width: 260 },
    { y: 180, label: 'AI AGENTS', width: 200 },
    { y: 250, label: 'DECISIONS', width: 140 },
  ]

  return (
    <GraphicWrapper>
      <svg viewBox="0 0 420 300" fill="none" className="w-full h-full p-6">
        {/* Layer boxes */}
        {layers.map((layer, i) => (
          <m.g key={layer.label}>
            <m.rect
              x={(420 - layer.width) / 2}
              y={layer.y}
              width={layer.width}
              height="36"
              rx="4"
              stroke="#C49A58"
              strokeWidth="1"
              fill="rgba(160,120,64,0.04)"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              style={{ transformOrigin: `210px ${layer.y + 18}px` }}
            />
            <m.text
              x="210"
              y={layer.y + 22}
              textAnchor="middle"
              className="font-mono"
              fontSize="8"
              fill="#C49A58"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ delay: 0.3 + i * 0.2 }}
              letterSpacing="2"
            >
              {layer.label}
            </m.text>
          </m.g>
        ))}

        {/* Flowing data particles */}
        {[0, 1, 2, 3, 4].map((i) => (
          <m.circle
            key={`particle-${i}`}
            cx={170 + i * 30}
            r="3"
            fill="#C49A58"
            initial={{ cy: 58, opacity: 0 }}
            animate={{ cy: [58, 128, 198, 268], opacity: [0, 0.8, 0.6, 0] }}
            transition={{
              repeat: Infinity,
              duration: 3,
              delay: i * 0.5,
              ease: 'easeInOut',
              times: [0, 0.33, 0.66, 1],
            }}
          />
        ))}

        {/* Connector lines between layers */}
        {[0, 1, 2].map((i) => {
          const from = layers[i]!
          const to = layers[i + 1]!
          return (
            <m.line
              key={`conn-${i}`}
              x1="210"
              y1={from.y + 36}
              x2="210"
              y2={to.y}
              stroke="#C49A58"
              strokeWidth="1"
              strokeDasharray="4 4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.25 }}
              transition={{ delay: 0.5 + i * 0.2 }}
            />
          )
        })}

        {/* Side agent icons */}
        {['Insight', 'Forecast', 'Monitor'].map((label, i) => (
          <m.g
            key={label}
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1 + i * 0.15 }}
          >
            <circle cx={330 + i * 3} cy={185 + i * 5} r="8" stroke="#C49A58" strokeWidth="0.8" fill="rgba(160,120,64,0.06)" />
            <m.circle
              cx={330 + i * 3}
              cy={185 + i * 5}
              r="3"
              fill="#C49A58"
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ repeat: Infinity, duration: 2, delay: i * 0.4 }}
            />
          </m.g>
        ))}
      </svg>
    </GraphicWrapper>
  )
}

/* ------------------------------------------------------------------ */
/* 3. Fractional Advisory — Orbit / leadership system                 */
/* ------------------------------------------------------------------ */
export function FractionalGraphic() {
  const satellites = [
    { angle: 0, label: 'Metrics', r: 90 },
    { angle: 72, label: 'Dashboards', r: 90 },
    { angle: 144, label: 'AI Agents', r: 90 },
    { angle: 216, label: 'Governance', r: 90 },
    { angle: 288, label: 'Strategy', r: 90 },
  ]

  return (
    <GraphicWrapper>
      <svg viewBox="0 0 420 300" fill="none" className="w-full h-full p-6">
        {/* Orbit rings */}
        {[60, 90, 120].map((r, i) => (
          <m.circle
            key={`orbit-${i}`}
            cx="210"
            cy="150"
            r={r}
            stroke="#C49A58"
            strokeWidth="0.5"
            fill="none"
            strokeDasharray={i === 1 ? undefined : '3 6'}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.1, 0.2, 0.1] }}
            transition={{ repeat: Infinity, duration: 4, delay: i * 0.5 }}
          />
        ))}

        {/* Central leader node */}
        <m.circle
          cx="210"
          cy="150"
          r="24"
          stroke="#C49A58"
          strokeWidth="1.5"
          fill="rgba(160,120,64,0.08)"
          animate={{ r: [24, 26, 24] }}
          transition={{ repeat: Infinity, duration: 3 }}
        />
        <m.circle
          cx="210"
          cy="150"
          r="10"
          fill="#C49A58"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ repeat: Infinity, duration: 2.5 }}
        />
        <text x="210" y="154" textAnchor="middle" className="font-mono" fontSize="7" fill="#060E1C" fontWeight="600">
          CDO
        </text>

        {/* Satellite nodes orbiting */}
        {satellites.map((sat, i) => {
          const rad = ((sat.angle - 90) * Math.PI) / 180
          const cx = 210 + sat.r * Math.cos(rad)
          const cy = 150 + sat.r * Math.sin(rad)
          return (
            <m.g
              key={sat.label}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + i * 0.15, type: 'spring', stiffness: 150 }}
              style={{ transformOrigin: `${cx}px ${cy}px` }}
            >
              <line x1="210" y1="150" x2={cx} y2={cy} stroke="#C49A58" strokeWidth="0.5" opacity="0.2" />
              <circle cx={cx} cy={cy} r="14" stroke="#C49A58" strokeWidth="1" fill="rgba(160,120,64,0.05)" />
              <m.circle
                cx={cx}
                cy={cy}
                r="4"
                fill="#C49A58"
                animate={{ opacity: [0.4, 0.9, 0.4] }}
                transition={{ repeat: Infinity, duration: 2, delay: i * 0.3 }}
              />
              <text
                x={cx}
                y={cy + 24}
                textAnchor="middle"
                className="font-mono"
                fontSize="7"
                fill="white"
                opacity="0.3"
              >
                {sat.label}
              </text>
            </m.g>
          )
        })}

        {/* Rotating accent */}
        <m.circle
          cx="210"
          cy="150"
          r="90"
          stroke="#C49A58"
          strokeWidth="2"
          fill="none"
          strokeDasharray="8 72"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
          style={{ transformOrigin: '210px 150px' }}
        />
      </svg>
    </GraphicWrapper>
  )
}

/* ------------------------------------------------------------------ */
/* 4. Assessment — Diagnostic scan effect                             */
/* ------------------------------------------------------------------ */
export function AssessmentGraphic() {
  const items = [
    { label: 'Data Maturity', x: 60, score: 0.4 },
    { label: 'AI Readiness', x: 60, score: 0.25 },
    { label: 'Architecture', x: 60, score: 0.6 },
    { label: 'Governance', x: 60, score: 0.35 },
    { label: 'Integration', x: 60, score: 0.5 },
  ]

  return (
    <GraphicWrapper>
      <svg viewBox="0 0 420 300" fill="none" className="w-full h-full p-6">
        {/* Scan line sweeping */}
        <m.line
          x1="40"
          x2="380"
          stroke="#C49A58"
          strokeWidth="1"
          initial={{ y1: 30, y2: 30, opacity: 0 }}
          animate={{ y1: [30, 270, 30], y2: [30, 270, 30], opacity: [0.4, 0.2, 0.4] }}
          transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
        />

        {/* Assessment bars */}
        {items.map((item, i) => {
          const y = 45 + i * 48
          const barWidth = item.score * 240
          return (
            <m.g key={item.label}>
              <m.text
                x={item.x}
                y={y}
                className="font-mono"
                fontSize="8"
                fill="white"
                opacity="0.4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                transition={{ delay: 0.3 + i * 0.15 }}
              >
                {item.label}
              </m.text>

              {/* Track */}
              <rect x={item.x} y={y + 8} width="240" height="12" rx="2" fill="rgba(160,120,64,0.06)" stroke="#C49A58" strokeWidth="0.5" opacity="0.3" />

              {/* Fill bar */}
              <m.rect
                x={item.x}
                y={y + 8}
                height="12"
                rx="2"
                fill="rgba(196,154,88,0.25)"
                initial={{ width: 0 }}
                animate={{ width: barWidth }}
                transition={{ duration: 1, delay: 0.6 + i * 0.15, ease: 'easeOut' }}
              />

              {/* Score pulse */}
              <m.circle
                cx={item.x + barWidth}
                cy={y + 14}
                r="4"
                fill="#C49A58"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.8, 0.4], scale: [0, 1, 1] }}
                transition={{ delay: 1 + i * 0.15, duration: 0.5 }}
              />

              {/* Score label */}
              <m.text
                x={320}
                y={y + 18}
                className="font-mono"
                fontSize="9"
                fill="#C49A58"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                transition={{ delay: 1.2 + i * 0.15 }}
              >
                {Math.round(item.score * 100)}%
              </m.text>
            </m.g>
          )
        })}

        {/* Overall score */}
        <m.g
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 }}
        >
          <rect x="140" y="260" width="140" height="28" rx="4" stroke="#C49A58" strokeWidth="1" fill="rgba(160,120,64,0.06)" />
          <text x="210" y="278" textAnchor="middle" className="font-mono" fontSize="9" fill="#C49A58" letterSpacing="1.5">
            READINESS: MODERATE
          </text>
        </m.g>
      </svg>
    </GraphicWrapper>
  )
}
