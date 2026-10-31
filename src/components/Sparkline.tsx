interface Props {
  /** Raw price series. Renders nothing if fewer than 2 points. */
  points: number[]
  /** Stroke + fill colour (chain colour, hex). */
  color: string
}

/** Tiny 7d price trace rendered in the card art area. No axis, no labels, no numbers —
 *  it's a visual fingerprint of the underlying token, not a chart. Uses the
 *  chain colour so the card stays self-consistent. */
export function Sparkline({ points, color }: Props) {
  if (!points || points.length < 2) return null
  const W = 100
  const H = 28
  const min = Math.min(...points)
  const max = Math.max(...points)
  const range = max - min || 1
  const n = points.length
  const stepX = W / (n - 1)
  const d = points
    .map((v, i) => {
      const x = i * stepX
      const y = H - ((v - min) / range) * (H - 4) - 2
      return `${i === 0 ? 'M' : 'L'}${x.toFixed(2)},${y.toFixed(2)}`
    })
    .join(' ')
  // unique gradient id per render so multiple cards on the page don't collide
  const gid = 'sg-' + Math.random().toString(36).slice(2, 8)

  return (
    <svg
      className="tcard-spark"
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.35" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d={`${d} L${W},${H} L0,${H} Z`}
        fill={`url(#${gid})`}
      />
      <path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}
