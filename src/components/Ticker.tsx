import { useEffect } from 'react'
import { useMarket } from '../hooks/useMarket'
import { fmtPrice, refreshMarket } from '../lib/market'

/** The four tokens surfaced in the ticker — the canonical crypto trio plus AAVE,
 *  which is the only one of his dashboarded protocols with reliable CoinGecko data. */
const TOKENS = [
  { id: 'bitcoin',  symbol: 'BTC',  name: 'Bitcoin' },
  { id: 'ethereum', symbol: 'ETH',  name: 'Ethereum' },
  { id: 'solana',   symbol: 'SOL',  name: 'Solana' },
  { id: 'aave',     symbol: 'AAVE', name: 'Aave' },
]

const POLL_MS = 60_000

/** Thin, full-bleed tape under the nav. Live prices, color-coded 24h change,
 *  a pulsing status dot. Reads from the shared market cache via `useMarket`
 *  (subscribes so it re-renders on every refresh). Polling happens here too so
 *  the tape keeps ticking even when no project cards are mounted. */
export function Ticker() {
  const s = useMarket()

  // Poll on a fixed cadence, gated by document visibility so we don't burn quota
  // when nobody is looking.
  useEffect(() => {
    refreshMarket()
    const tick = () => {
      if (typeof document !== 'undefined' && document.visibilityState === 'visible') {
        refreshMarket()
      }
    }
    const id = setInterval(tick, POLL_MS)
    const onVis = () => tick()
    document.addEventListener('visibilitychange', onVis)
    return () => {
      clearInterval(id)
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [])

  const data = s.data ?? []
  // Status priority: stale (error) > sync (loading or no data yet) > live.
  const status: 'live' | 'sync' | 'stale' = s.error
    ? 'stale'
    : !s.data || s.loading
    ? 'sync'
    : 'live'
  const statusLabel =
    status === 'stale' ? 'STALE · STATIC SNAPSHOT' : status === 'sync' ? 'SYNCING' : 'LIVE'

  return (
    <div className="ticker" role="region" aria-label="Live market data">
      <div className="ticker-inner wrap">
        <span className={`ticker-status is-${status}`} aria-live="polite">
          <span className="ticker-dot" aria-hidden />
          <span className="ticker-status-label">{statusLabel}</span>
        </span>
        <span className="ticker-sep" aria-hidden>·</span>
        {TOKENS.map((t) => {
          const m = data.find((x) => x.id === t.id)
          const price = m?.price
          const ch = m?.change24h
          const up = ch != null ? ch >= 0 : true
          return (
            <a
              key={t.id}
              className="ticker-tile"
              href={`https://www.coingecko.com/en/coins/${t.id}`}
              target="_blank"
              rel="noopener noreferrer"
              title={t.name}
            >
              <span className="ticker-sym">{t.symbol}</span>
              <span className="ticker-price">${fmtPrice(price)}</span>
              <span className={`ticker-ch${up ? ' is-up' : ' is-down'}`}>
                {ch != null ? `${up ? '▲' : '▼'} ${Math.abs(ch).toFixed(2)}%` : ''}
              </span>
            </a>
          )
        })}
        <span className="ticker-src" aria-hidden>
          source · CoinGecko
        </span>
      </div>
    </div>
  )
}
