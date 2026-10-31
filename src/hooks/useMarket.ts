import { useEffect, useState } from 'react'
import { subscribeMarket, refreshMarket, getMarketState } from '../lib/market'

/** Subscribes the calling component to the shared market cache. Triggers an initial
 *  fetch on mount and re-renders the component whenever the cache updates. */
export function useMarket() {
  const [, setTick] = useState(0)
  useEffect(() => {
    const unsub = subscribeMarket(() => setTick((t) => t + 1))
    refreshMarket()
    return () => {
      unsub()
    }
  }, [])
  return getMarketState()
}
