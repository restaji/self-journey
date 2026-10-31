import { chainColor, type Chain } from '../data'
import { logos } from '../logos'

/** Per-protocol identity mark. Uses the real brand logo when available (inlined in logos.ts),
 *  otherwise falls back to a 2-char ticker tile tinted with the chain color. Same frame either
 *  way, so a mixed set (3 real logos + 1 monogram) still reads as one system. */
export function Monogram({
  ticker,
  chain,
  label,
  size = 'md',
}: {
  ticker: string
  chain: Chain
  label?: string
  size?: 'sm' | 'md' | 'lg'
}) {
  const logo = logos[ticker]
  if (logo) {
    return (
      <span className={`mono-mark mono-logo mono-${size}`} aria-hidden="true">
        <img src={logo} alt={label ? `${label} logo` : ''} loading="lazy" decoding="async" />
      </span>
    )
  }
  return (
    <span
      className={`mono-mark mono-${size}`}
      style={{ ['--mk' as string]: chainColor[chain] }}
      aria-hidden="true"
    >
      {ticker}
    </span>
  )
}
