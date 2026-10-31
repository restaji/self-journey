import { useEffect, useRef, useState } from 'react'
import type { Chain } from '../data'
import { Monogram } from './Monogram'

export interface MapNode {
  label: string
  ticker: string
  chain: Chain
  metric: string
  x: number
  y: number
  /** When set, the node renders as a button that calls this on click. Use it to
   *  open internal pages (e.g. project detail). Without onOpen the node is
   *  decorative-only. */
  onOpen?: () => void
}

export interface MapHub {
  label: string
  sub: string
  x: number
  y: number
}

/** Interactive analyst-protocol constellation. Spokes draw on mount, nodes stagger
 *  in, hover lights the spoke + reveals the metric, click runs `node.onOpen`.
 *  Spokes connect each protocol to the central analyst hub. */
export function ProtocolMap({
  nodes,
  hub,
}: {
  nodes: MapNode[]
  hub: MapHub
}) {
  const [mounted, setMounted] = useState(false)
  const [hover, setHover] = useState<number | null>(null)
  const fieldRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60)
    return () => clearTimeout(t)
  }, [])

  // Gentle cursor parallax on the whole field (disabled for reduced motion).
  useEffect(() => {
    const el = fieldRef.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect()
      const dx = (e.clientX - (r.left + r.width / 2)) / r.width
      const dy = (e.clientY - (r.top + r.height / 2)) / r.height
      el.style.setProperty('--px', `${dx * 10}px`)
      el.style.setProperty('--py', `${dy * 10}px`)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <div className={`pmap${mounted ? ' is-mounted' : ''}`} ref={fieldRef}>
      <div className="pmap-grid" aria-hidden />

      <svg className="pmap-wires" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
        {nodes.map((n, i) => (
          <line
            key={n.label}
            x1={hub.x}
            y1={hub.y}
            x2={n.x}
            y2={n.y}
            className={`wire${hover === i ? ' is-active' : ''}`}
            style={{ transitionDelay: `${160 + i * 110}ms` }}
          />
        ))}
      </svg>

      {/* central analyst hub */}
      <div className="hub" style={{ left: `${hub.x}%`, top: `${hub.y}%` }} aria-hidden>
        <span className="hub-dot" />
        <span className="hub-label">{hub.label}</span>
        <span className="hub-sub">{hub.sub}</span>
      </div>

      {/* protocol nodes */}
      {nodes.map((n, i) => {
        const card = (
          <span className="pnode-card">
            <Monogram ticker={n.ticker} chain={n.chain} label={n.label} />
            <span className="pnode-text">
              <span className="pnode-chain">{n.chain}</span>
              <span className="pnode-name">{n.label}</span>
              <span className="pnode-metric">{n.metric}</span>
            </span>
          </span>
        )
        const common = {
          className: 'pnode',
          style: {
            left: `${n.x}%`,
            top: `${n.y}%`,
            transitionDelay: `${260 + i * 110}ms`,
          },
          onMouseEnter: () => setHover(i),
          onMouseLeave: () => setHover(null),
          onFocus: () => setHover(i),
          onBlur: () => setHover(null),
        }
        return n.onOpen ? (
          <button type="button" {...common} onClick={n.onOpen}>
            {card}
          </button>
        ) : (
          <div {...common}>{card}</div>
        )
      })}
    </div>
  )
}
