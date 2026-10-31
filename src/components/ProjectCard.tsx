import { chainColor, type Project } from '../data'
import { Monogram } from './Monogram'
import { Sparkline } from './Sparkline'
import { useMarket } from '../hooks/useMarket'

/** A clean tile for one project — chain, monogram, name, type. The card itself doesn't
 *  carry the substance; clicking it opens the project detail page where the blurb,
 *  highlights, and the work behind it live. Cards with a `tokenId` render a real 7d
 *  price sparkline in the art area, sourced from CoinGecko via the shared market hook. */
export function ProjectCard({
  project,
  tilt = 0,
  onOpen,
}: {
  project: Project
  tilt?: number
  onOpen: (project: Project) => void
}) {
  const name = project.short
  const color = chainColor[project.chain]
  const market = useMarket()
  // Look up the token by id; default to empty array (no sparkline rendered) until the
  // fetch completes. Cards without `tokenId` never render a sparkline.
  const sparkPoints = project.tokenId
    ? market.data?.find((x) => x.id === project.tokenId)?.sparkline7d ?? []
    : []

  return (
    <button
      className="tcard"
      type="button"
      onClick={() => onOpen(project)}
      style={{ ['--chain' as string]: color, ['--tilt' as string]: `${tilt}deg` }}
    >
      <span className="tcard-head">
        <span className="tcard-chain">
          <i className="tcard-dot" />
          {project.chain}
        </span>
        <span className="tcard-rarity" aria-hidden>
          {'★'.repeat(project.rarity)}
        </span>
      </span>

      <span className="tcard-art">
        <span className="tcard-art-mark">
          <Monogram ticker={project.ticker} chain={project.chain} label={name} size="lg" />
        </span>
        {sparkPoints.length > 1 && (
          <Sparkline points={sparkPoints} color={color} />
        )}
      </span>

      <span className="tcard-name">{name}</span>
      <span className="tcard-tagline">{project.tagline}</span>
      <span className="tcard-type">{project.type}</span>

      <span className="tcard-foot">
        View project <span aria-hidden>→</span>
      </span>
    </button>
  )
}
