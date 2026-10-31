/** Live market data — CoinGecko public API, cached, with a static fallback so the
 *  portfolio stays intact even if the network is flaky. Module-level cache + subscriber
 *  pattern: one fetch, many consumers (ticker, sparklines). */

export interface MarketToken {
  id: string
  symbol: string
  name: string
  price: number
  change24h: number
  sparkline7d: number[]
}

interface State {
  data: MarketToken[] | null
  ts: number
  loading: boolean
  error: boolean
}

let state: State = { data: null, ts: 0, loading: false, error: false }
let inflight: Promise<void> | null = null
const subs = new Set<() => void>()
const TTL = 60_000

/** Honest fallback: real numbers captured from a live fetch earlier today. If the
 *  network fails, the ticker still shows plausible prices instead of crashing. */
const FALLBACK: MarketToken[] = [
  { id: 'bitcoin',     symbol: 'BTC',     name: 'Bitcoin',    price: 80498,    change24h: -0.04, sparkline7d: [] },
  { id: 'ethereum',    symbol: 'ETH',     name: 'Ethereum',   price: 2339.64,  change24h: -1.02, sparkline7d: [] },
  { id: 'solana',      symbol: 'SOL',     name: 'Solana',     price: 101.17,   change24h: -0.22, sparkline7d: [] },
  { id: 'aave',        symbol: 'AAVE',    name: 'Aave',       price: 136.58,   change24h: -2.63, sparkline7d: [] },
  { id: 'avantis',     symbol: 'AVANTIS', name: 'Avantis',    price: 0.114143, change24h:  0.08, sparkline7d: [] },
  { id: 'silo-finance', symbol: 'SILO',   name: 'Silo Finance', price: 0.00058703, change24h: 0, sparkline7d: [] },
]

export function subscribeMarket(fn: () => void): () => void {
  subs.add(fn)
  return () => {
    subs.delete(fn)
  }
}
export function getMarketState(): State {
  return state
}
export function getToken(tokenId: string): MarketToken | undefined {
  return state.data?.find((x) => x.id === tokenId)
}

export async function refreshMarket(): Promise<void> {
  if (inflight) return inflight
  // fresh cache? skip
  if (state.data && Date.now() - state.ts < TTL) return
  state = { ...state, loading: true }
  notify()
  inflight = (async () => {
    try {
      const ids = ['bitcoin', 'ethereum', 'solana', 'aave', 'avantis', 'silo-finance']
      const url =
        'https://api.coingecko.com/api/v3/coins/markets' +
        `?vs_currency=usd&ids=${ids.join(',')}&sparkline=true&price_change_percentage=24h`
      const r = await fetch(url)
      if (!r.ok) throw new Error('http ' + r.status)
      const j = await r.json()
      const data: MarketToken[] = (Array.isArray(j) ? j : []).map((x: any) => ({
        id: x.id,
        symbol: (x.symbol || '').toUpperCase(),
        name: x.name || x.symbol,
        price: Number(x.current_price) || 0,
        change24h: Number(x.price_change_percentage_24h) || 0,
        sparkline7d: Array.isArray(x.sparkline_in_7d?.price) ? x.sparkline_in_7d.price : [],
      }))
      state = { data, ts: Date.now(), loading: false, error: false }
    } catch {
      // keep last good data if any; otherwise show fallback snapshot
      state = {
        data: state.data ?? FALLBACK,
        ts: Date.now(),
        loading: false,
        error: !state.data,
      }
    } finally {
      inflight = null
      notify()
    }
  })()
  return inflight
}

function notify() {
  subs.forEach((fn) => fn())
}

/** Compact price formatter used by the ticker. */
export function fmtPrice(n: number | undefined): string {
  if (n == null || !isFinite(n)) return '—'
  if (n >= 100) return n.toLocaleString('en-US', { maximumFractionDigits: 0 })
  if (n >= 1) return n.toLocaleString('en-US', { maximumFractionDigits: 2 })
  return n.toLocaleString('en-US', { maximumFractionDigits: 5 })
}
