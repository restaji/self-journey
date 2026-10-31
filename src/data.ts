export type Chain = 'Base' | 'Solana' | 'Sonic' | 'Robinhood' | 'Multi-chain'

/** Muted identity color per chain — used only on the small monogram tiles (categorical meaning). */
export const chainColor: Record<Chain, string> = {
  Base: '#1557ff',
  Sonic: '#e0863a',
  Solana: '#8457ff',
  Robinhood: '#12a06a',
  'Multi-chain': '#8a8880',
}

/** Every figure links to the dashboard where it can be verified — no unsourced vanity stats.
 *  Kept on the role that produced it (see `work.metrics`). */
export interface Metric {
  value: string
  label: string
  href: string
  source: string
}

export interface Job {
  role: string
  org: string
  period: string
  points: string[]
  dune?: { label: string; href: string }
}

export interface Project {
  title: string
  short: string
  ticker: string
  /** A short, dry one-liner — the card's personality. Says what the project *is about*
   *  in three or four words, so the card can stay light and the detail page can carry
   *  the explanation. */
  tagline: string
  blurb: string
  chain: Chain
  type: string
  rarity: number
  /** Card shows only the essentials — the chain dot, monogram, name, and type.
   *  Stats live on the project detail page where there is room to cite them. */
  stats: { k: string; v: string }[]
  /** What the dashboard covers — verifiable facts the user can click into. */
  highlights?: string[]
  /** What I actually did: the queries, the model, the choices behind the dashboard.
   *  This is the substance the card was too small to carry. */
  work?: string[]
  /** CoinGecko token id — when present, the card shows a real 7d price sparkline
   *  sourced from the public CoinGecko markets endpoint. Leave undefined for
   *  projects without a tracked token. */
  tokenId?: string
  links: { label: string; href: string }[]
}

export interface SkillGroup {
  category: string
  items: string[]
}

export const profile = {
  name: 'Bre Syarestaji',
  role: 'On-chain analyst',
  location: 'Indonesia',
  tagline: 'I turn raw on-chain data into decisions on trader behavior, risk, and growth.',
  summary:
    'On-chain analyst with 3+ years in Web3. I model trading data in ClickHouse and turn it into Grafana and Dune dashboards covering perp DEXs, DeFi lending, and Layer-1 networks — volume, open interest, funding, fees, LP/vault risk, and trader segmentation. Most of my work starts with a question someone asked twice, then a query nobody had written yet.',
  contacts: [
    { label: 'bresyarestaji19@gmail.com', href: 'mailto:bresyarestaji19@gmail.com' },
    { label: 'dune.com/restaji', href: 'https://dune.com/restaji' },
    { label: 'x.com/rztaji', href: 'https://x.com/rztaji' },
    { label: 't.me/arestaji', href: 'https://t.me/arestaji' },
  ],
}

export const jobs: Job[] = [
  {
    role: 'Analyst Contributor',
    org: 'Nusa Finance — lending & governance',
    period: '2025 Aug — Sep',
    points: [
      'Lending market: analyzed TVL, utilization rate, APYs, and per-market risk, plus transaction volume and users involved per market.',
      'Tracked user growth and identified top lenders and borrowers across markets.',
      "Governance (veNusa): measured the revenue-share governance token and computed each user's Return on Invested Capital (ROIC), retention, and demand trend.",
    ],
    dune: {
      label: 'Nusa dashboard',
      href: 'https://dune.com/nusa_io/nusa-finance-lending-market',
    },
  },
  {
    role: 'Analyst — Solhedge',
    org: 'AI hedging strategy on Meteora pools',
    period: '2025 Apr',
    points: [
      "Measured the agent's performance deploying capital into Meteora LP positions while hedging on Jupiter Perps.",
    ],
    dune: {
      label: 'Solhedge dashboard',
      href: 'https://dune.com/house_of_wizard/solhedge',
    },
  },
]

/** Where he works now — kept separate from `projects` (things he shipped on his own).
 *  Veranta is his employer, so it lives here with the numbers that came out of the role. */
export interface Role {
  org: string
  ticker: string
  chain: Chain
  role: string
  period: string
  lede: string
  scope: string[]
  metrics: Metric[]
  links: { label: string; href: string }[]
}

export const work: Role = {
  org: 'Veranta',
  ticker: 'Ve',
  chain: 'Base',
  role: 'Data Analyst',
  period: '2025 Nov — Present',
  lede:
    'I own the analytics delivery layer at a perpetual DEX on Base: the models behind every internal dashboard, and the competitor-intelligence pipeline that keeps us honest about where volume goes.',
  scope: [
    'Model and query on-chain trading data in ClickHouse — PnL, open interest, funding, fees, LP and vault risk, trader behaviour.',
    'Turn that model into Grafana dashboards the team actually opens each morning.',
    'Pull rival perp venues’ APIs (Hyperliquid, GRVT, Pacifica) into the same pipeline to benchmark volume, OI, funding and fees.',
    'Modelled funding rates and fees across perp venues so each Veranta-anchored carry decision is priced by cost and bid-ask spread — shipped as the public funding-arb tracker.',
    'Segment wallets by size tier and retention, then track cross-protocol migration flows.',
  ],
  metrics: [
    {
      value: '$100B+',
      label: 'Cumulative perp volume modelled',
      href: 'https://dune.com/restaji/avantis-base-perpetual-dex',
      source: 'Veranta dashboard',
    },
    {
      value: '80k',
      label: 'Wallets segmented by trading behaviour',
      href: 'https://dune.com/restaji/avantis-base-perpetual-dex',
      source: 'Veranta dashboard',
    },
    {
      value: '8',
      label: 'Perp venues benchmarked on cost & flow',
      href: 'https://dune.com/restaji',
      source: 'Dune profile',
    },
  ],
  links: [
    { label: 'Funding-rate arb tracker', href: 'https://funding-arb-avantis.vercel.app/' },
    { label: 'Veranta dashboard', href: 'https://dune.com/restaji/avantis-base-perpetual-dex' },
  ],
}

export const projects: Project[] = [
  {
    title: 'Vantis — $VANTIS Tokenomics',
    short: 'Vantis',
    ticker: 'Va',
    tagline: 'Tokenomics, but legible',
    chain: 'Robinhood',
    type: 'Token Analytics',
    rarity: 3,
    stats: [
      { k: 'Supply', v: '1B' },
      { k: 'Holders', v: '698' },
    ],
    blurb:
      'Token analytics for $VANTIS on Robinhood Chain: supply and float, vesting-vault balances, a labelled holder map, and DEX volume with trader counts.',
    highlights: [
      'Fixed 1B cap, no mint — 19.4% circulating against a 555.8M vesting vault.',
      'Holder map labelled by vesting vault, ACF treasury, DEX pool and ACF pool.',
      'DEX volume, trader counts and token burn tracked on Robinhood Chain.',
    ],
    work: [
      'Decoded the $VANTIS contract on Robinhood Chain and built supply, float and vesting-vault tracking from raw transfer events.',
      'Designed the holder classifier — every address bucketed into Vesting Vault, ACF Treasury, DEX Pool, ACF Pool or EOA — to surface who actually controls float.',
      'Modelled DEX activity on Robinhood Chain: cumulative volume, trader counts, and token burn over time.',
    ],
    tokenId: 'avantis',
    links: [{ label: 'Dune dashboard', href: 'https://dune.com/restaji/vantis' }],
  },
  {
    title: 'Aave v3 on Sonic Chain',
    short: 'Aave v3',
    ticker: 'Aa',
    tagline: 'Who is actually lending',
    chain: 'Sonic',
    type: 'Lending',
    rarity: 2,
    stats: [
      { k: 'Depositors', v: 'Top-100' },
      { k: 'Metrics', v: 'TVL · util' },
    ],
    blurb:
      'TVL, users, transactions, reserves, utilization, and flash-loan metrics for Aave v3 on Sonic — including the top-100 depositors and a classification of DeFi user behavior.',
    highlights: [
      'Reserve-level view of TVL, utilization, and supply/borrow APYs.',
      'Ranked the top-100 depositors and their share of liquidity.',
      'Classified DeFi user behavior into distinct activity cohorts.',
    ],
    work: [
      'Modelled Aave v3 reserves on Sonic from raw supply, borrow and liquidation events — TVL, utilization, and APYs per market.',
      'Classified the top-100 depositors by activity pattern and protocol history to separate sticky LPs from mercenary capital.',
      'Built the per-market risk view: utilization curve, APY spread, and liquidation-distance distribution.',
    ],
    tokenId: 'aave',
    links: [{ label: 'Dune dashboard', href: 'https://dune.com/restaji/aave-v3-on-sonic' }],
  },
  {
    title: 'Silo Finance — User Behavior',
    short: 'Silo',
    ticker: 'Si',
    tagline: 'Vaults vs. vibes',
    chain: 'Multi-chain',
    type: 'User Behavior',
    rarity: 2,
    stats: [
      { k: 'Focus', v: 'Vaults' },
      { k: 'Signal', v: 'F&G · TVL' },
    ],
    blurb:
      'User preferences across isolated markets vs. managed vaults in Silo Finance, and the correlation between the market fear & greed index and protocol TVL.',
    highlights: [
      'Compared adoption of isolated markets vs. managed vaults.',
      'Correlated the fear & greed index against protocol TVL over time.',
      'Mapped how depositor preferences shift across market regimes.',
    ],
    work: [
      "Modelled Silo's market structure — which assets sit in isolated markets vs the managed vault — and tracked TVL migration between them.",
      'Correlated the market fear & greed index against protocol TVL to surface regime-dependent depositor behaviour.',
      'Cohort analysis: which depositors stick to one market, and which arbitrage across markets as conditions change.',
    ],
    links: [
      { label: 'Dune dashboard', href: 'https://dune.com/restaji/silo-finance-user-behavior' },
    ],
  },
  {
    title: 'Solhedge — LP + Perp Hedge',
    short: 'Solhedge',
    ticker: 'So',
    tagline: 'Teaching a bot to hedge',
    chain: 'Solana',
    type: 'LP + Hedge',
    rarity: 2,
    stats: [
      { k: 'Venue', v: 'Meteora' },
      { k: 'Hedge', v: 'Jupiter' },
    ],
    blurb:
      'Performance tracking for an AI agent deploying capital into Meteora LPs while hedging exposure on Jupiter Perps.',
    highlights: [
      'Measured agent PnL across Meteora LP positions over time.',
      'Tracked hedge effectiveness against Jupiter Perps exposure.',
    ],
    work: [
      'Tracked the Solhedge hedged-LP strategy: Meteora inventory vs Jupiter perp hedge legs, surfacing directional exposure per position.',
      'Modelled PnL decomposition — fee yield, impermanent loss, and hedge cost — to show net-of-hedge performance.',
    ],
    links: [{ label: 'Dune dashboard', href: 'https://dune.com/house_of_wizard/solhedge' }],
  },
]

export const skills: SkillGroup[] = [
  {
    category: 'Languages',
    items: [
      'SQL · ClickHouse',
      'SQL · Trino / Dune',
      'SQL · Postgres',
      'Python · pandas',
      'numpy',
      'scikit-learn',
      'LightGBM',
    ],
  },
  {
    category: 'Analytics',
    items: ['Causal inference (DiD)', 'Monte Carlo', 'Bootstrap inference', 'Time-series CV'],
  },
  {
    category: 'On-chain',
    items: [
      'EVM · Base',
      'Ethereum',
      'Arbitrum',
      'Solana',
      'DEX / Perp mechanics',
      'MEV / wash detection',
    ],
  },
  {
    category: 'Tooling',
    items: ['Dune', 'Grafana', 'Envio', 'dbt'],
  },
  {
    category: 'Spoken',
    items: ['Indonesian · Native', 'English · Intermediate'],
  },
]

/** Writing / threads — the "Thoughts" category, kept separate from shipped dashboards. */
export interface Thought {
  title: string
  blurb: string
  date: string
  kind: string
  href: string
}

/** Newest first. */
export const thoughts: Thought[] = [
  {
    title: "Meteora's fee power law",
    blurb:
      'Across Mar–Jun 2026 the #1 earner took ~35% of top-5 fees on an average day. Fees and volume rank differently — the edge is effective rate and liquidity concentration, not size.',
    date: 'Jun 2026',
    kind: 'X article',
    href: 'https://x.com/rztaji/status/2067226383626191263',
  },
  {
    title: 'The fall of GameFi: an industry once worth billions',
    blurb:
      'Peak: $64M in NFT volume (Feb 2022, Sandbox $35M / 55%), $2.4M creator royalties in a month, 5,200 monthly active users (Dec 2021, ~$7,300 traded per user). Then royalties fell to $1K, Alice has no items trading and a $17M FDV — a $2B valuation on ~4,300 products. Data on Dune.',
    date: 'Jan 2026',
    kind: 'X article · House of Wizard',
    href: 'https://x.com/House_of_Wizard/status/2016541239534092391',
  },
  {
    title: 'Isolated markets vs. managed vaults in Silo Finance',
    blurb:
      'How depositor preference shifts with the market fear & greed index, and what that correlation implies for protocol TVL across regimes.',
    date: 'Jun 2025',
    kind: 'X thread',
    href: 'https://x.com/rztaji/status/1934673816929874085',
  },
  {
    title: 'Who actually supplies liquidity to Aave v3 on Sonic',
    blurb:
      'Ranked the top-100 depositors and classified DeFi users into activity cohorts — who provides the liquidity, and how sticky they are.',
    date: 'May 2025',
    kind: 'X thread',
    href: 'https://x.com/rztaji/status/1922699901743268301',
  },
]

export const sections = [
  { id: 'work', label: 'Work' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'about', label: 'About' },
] as const

export type SectionId = (typeof sections)[number]['id']

export const footerLinks = [
  { label: 'Email', href: 'mailto:bresyarestaji19@gmail.com' },
  { label: 'Dune', href: 'https://dune.com/restaji' },
  { label: 'X', href: 'https://x.com/rztaji' },
  { label: 'Telegram', href: 'https://t.me/arestaji' },
]
