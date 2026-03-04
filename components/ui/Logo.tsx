interface LogoProps {
  size?: number
  onDark?: boolean
}

export function LogoMark({ size = 40 }: { size?: number }) {
  const scale = size / 40
  const barHeight = 3 * scale
  const gap = 3 * scale
  const radius = 1 * scale
  const widths = [28 * scale, 20 * scale, 12 * scale]

  return (
    <svg
      width={widths[0]}
      height={barHeight * 3 + gap * 2}
      viewBox={`0 0 ${widths[0]} ${barHeight * 3 + gap * 2}`}
      fill="none"
      aria-hidden="true"
    >
      <rect
        width={widths[0]}
        height={barHeight}
        rx={radius}
        fill="#A07840"
        opacity={1}
      />
      <rect
        y={barHeight + gap}
        width={widths[1]}
        height={barHeight}
        rx={radius}
        fill="#C49A58"
        opacity={0.75}
      />
      <rect
        y={(barHeight + gap) * 2}
        width={widths[2]}
        height={barHeight}
        rx={radius}
        fill="#7A5C2E"
        opacity={0.45}
      />
    </svg>
  )
}

export function Logo({ size = 40, onDark = true }: LogoProps) {
  const textColor = onDark ? '#F7F4EE' : '#0C1B33'

  return (
    <div className="flex items-center" aria-label="Forte AI Solutions">
      <LogoMark size={size} />
      <div className="ml-3.5 flex flex-col">
        <span
          className="font-display font-medium uppercase leading-none"
          style={{
            color: textColor,
            letterSpacing: '0.18em',
            fontSize: `${size * 0.4}px`,
          }}
        >
          Forte
        </span>
        <span
          className="font-body font-light uppercase leading-none"
          style={{
            color: textColor,
            letterSpacing: '0.30em',
            opacity: 0.5,
            fontSize: `${size * 0.2}px`,
            marginTop: '2px',
          }}
        >
          AI Solutions
        </span>
      </div>
    </div>
  )
}
