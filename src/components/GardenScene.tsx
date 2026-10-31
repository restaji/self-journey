import { useEffect, useRef, useState } from 'react'

type View = 'projects' | 'thoughts' | 'about'

/** The signature: an isometric floating garden you explore like a game map.
 *  SVG draws the illustration; the labelled wooden signs are real HTML buttons that
 *  navigate to each section. Garden colors come from CSS vars so the day/dusk toggle works. */
export function GardenScene({ go }: { go: (v: View) => void }) {
  const [mounted, setMounted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60)
    return () => clearTimeout(t)
  }, [])

  // gentle cursor parallax on sky elements
  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect()
      const dx = (e.clientX - (r.left + r.width / 2)) / r.width
      const dy = (e.clientY - (r.top + r.height / 2)) / r.height
      el.style.setProperty('--px', `${dx * 12}px`)
      el.style.setProperty('--py', `${dy * 12}px`)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <div className={`garden${mounted ? ' is-mounted' : ''}`} ref={ref}>
      <svg className="garden-art" viewBox="0 0 1000 700" fill="none" aria-hidden="true">
        <defs>
          <pattern id="sunstripe" width="10" height="10" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
            <rect width="10" height="10" fill="var(--g-sun)" />
            <rect width="5" height="10" fill="var(--g-sun2)" />
          </pattern>
          <radialGradient id="grassgrad" cx="45%" cy="38%" r="70%">
            <stop offset="0%" stopColor="var(--g-grass1)" />
            <stop offset="100%" stopColor="var(--g-grass2)" />
          </radialGradient>
        </defs>

        {/* ---- sky ---- */}
        <g className="g-sky">
          <circle cx="840" cy="130" r="74" fill="url(#sunstripe)" />
          <g className="g-cloud g-cloud-1">
            <ellipse cx="210" cy="140" rx="52" ry="22" fill="var(--g-cloud)" />
            <ellipse cx="250" cy="128" rx="34" ry="20" fill="var(--g-cloud)" />
            <ellipse cx="172" cy="130" rx="30" ry="18" fill="var(--g-cloud)" />
          </g>
          <g className="g-cloud g-cloud-2">
            <ellipse cx="660" cy="92" rx="40" ry="17" fill="var(--g-cloud)" />
            <ellipse cx="692" cy="83" rx="26" ry="15" fill="var(--g-cloud)" />
          </g>
        </g>

        {/* ---- floating island ---- */}
        <g className="g-isle">
          {/* dangling roots */}
          <path d="M360 560 q-8 40 6 70 q10 -26 2 -70Z" fill="var(--g-soil2)" />
          <path d="M560 575 q10 54 -4 84 q-14 -34 -6 -84Z" fill="var(--g-soil2)" />
          {/* soil underside */}
          <ellipse cx="500" cy="430" rx="398" ry="150" fill="var(--g-soil)" />
          <ellipse cx="500" cy="438" rx="360" ry="130" fill="var(--g-soil2)" opacity="0.5" />
          {/* grass top */}
          <ellipse cx="500" cy="395" rx="400" ry="158" fill="url(#grassgrad)" />
          <ellipse cx="455" cy="360" rx="330" ry="120" fill="var(--g-grass1)" opacity="0.45" />
          {/* darker meadow patches */}
          <ellipse cx="360" cy="430" rx="120" ry="40" fill="var(--g-grass-dark)" opacity="0.35" />
          <ellipse cx="640" cy="440" rx="150" ry="46" fill="var(--g-grass-dark)" opacity="0.3" />

          {/* stone path */}
          {[[500, 520], [472, 486], [506, 456], [474, 428], [508, 402]].map(([x, y], i) => (
            <ellipse key={i} cx={x} cy={y} rx="16" ry="8" fill="var(--g-soil)" opacity="0.55" />
          ))}

          {/* pond */}
          <g>
            <ellipse cx="415" cy="470" rx="92" ry="40" fill="var(--g-pond)" />
            <ellipse cx="415" cy="464" rx="74" ry="30" fill="var(--g-pond2)" opacity="0.7" />
            <ellipse className="g-ripple" cx="400" cy="466" rx="18" ry="7" fill="var(--g-cloud)" opacity="0.35" />
            <ellipse cx="455" cy="480" rx="14" ry="6" fill="var(--g-tree)" />
            <ellipse cx="388" cy="452" rx="12" ry="5" fill="var(--g-tree2)" />
            <circle cx="458" cy="478" r="3" fill="var(--g-flowerC)" />
          </g>

          {/* --- Projects: flower bed (4 blooms = 4 protocols) --- */}
          <g className="g-feature">
            <path d="M250 372 l150 -30 40 34 -150 30Z" fill="var(--g-soil)" />
            <path d="M250 372 l150 -30 40 34 -150 30Z" fill="var(--g-soil2)" opacity="0.3" />
            {[
              { x: 292, y: 352, c: 'var(--g-flowerA)' },
              { x: 330, y: 345, c: 'var(--g-flowerB)' },
              { x: 368, y: 338, c: 'var(--g-flowerD)' },
              { x: 406, y: 331, c: 'var(--g-flowerC)' },
            ].map((f, i) => (
              <g key={i} className="g-bloom" style={{ transformOrigin: `${f.x}px ${f.y + 26}px`, animationDelay: `${i * 0.4}s` }}>
                <line x1={f.x} y1={f.y + 26} x2={f.x} y2={f.y + 6} stroke="var(--g-tree2)" strokeWidth="2.5" />
                <circle cx={f.x} cy={f.y} r="8" fill={f.c} />
                <circle cx={f.x} cy={f.y} r="3" fill="var(--g-sun)" />
              </g>
            ))}
          </g>

          {/* --- Thoughts: greenhouse --- */}
          <g className="g-feature">
            <rect x="614" y="300" width="96" height="70" rx="3" fill="var(--g-glass)" />
            <rect x="614" y="300" width="96" height="70" rx="3" fill="none" stroke="var(--g-frame)" strokeWidth="4" />
            <path d="M610 300 l52 -30 52 30Z" fill="var(--g-roof)" />
            <line x1="662" y1="300" x2="662" y2="370" stroke="var(--g-frame)" strokeWidth="3" />
            <line x1="638" y1="300" x2="638" y2="370" stroke="var(--g-frame)" strokeWidth="2" opacity="0.7" />
            <line x1="686" y1="300" x2="686" y2="370" stroke="var(--g-frame)" strokeWidth="2" opacity="0.7" />
            <rect x="652" y="338" width="20" height="32" fill="var(--g-tree2)" opacity="0.6" />
            <line x1="662" y1="270" x2="662" y2="250" stroke="var(--g-wood)" strokeWidth="2" />
            <path className="g-flag" d="M662 250 l20 6 -20 8Z" fill="var(--g-flowerA)" />
          </g>

          {/* --- About: tree + bench --- */}
          <g className="g-feature">
            <rect x="706" y="372" width="12" height="54" rx="4" fill="var(--g-trunk)" />
            <g className="g-tree">
              <circle cx="712" cy="356" r="44" fill="var(--g-tree)" />
              <circle cx="678" cy="372" r="30" fill="var(--g-tree2)" />
              <circle cx="744" cy="372" r="30" fill="var(--g-tree2)" />
              <circle cx="712" cy="340" r="30" fill="var(--g-grass1)" opacity="0.6" />
            </g>
            {/* bench */}
            <g>
              <rect x="676" y="430" width="52" height="7" rx="2" fill="var(--g-wood)" />
              <rect x="680" y="437" width="5" height="14" fill="var(--g-wood)" />
              <rect x="719" y="437" width="5" height="14" fill="var(--g-wood)" />
            </g>
          </g>

          {/* --- small decor --- */}
          <g>
            {/* watering can */}
            <g transform="translate(470 352)">
              <rect x="0" y="0" width="22" height="18" rx="4" fill="var(--g-flowerD)" />
              <path d="M22 4 l12 -8 2 4 -12 8Z" fill="var(--g-flowerD)" />
              <path d="M2 2 q-10 -2 -8 10" stroke="var(--g-flowerD)" strokeWidth="3" fill="none" />
            </g>
            {/* grass tufts */}
            {[[300, 500], [600, 505], [700, 470], [360, 480], [560, 500]].map(([x, y], i) => (
              <path key={i} d={`M${x} ${y} l-5 -14 M${x} ${y} l0 -18 M${x} ${y} l5 -14`} stroke="var(--g-grass-dark)" strokeWidth="2" />
            ))}
            {/* scattered tiny flowers */}
            {[[330, 470, 'var(--g-flowerB)'], [585, 465, 'var(--g-flowerA)'], [650, 485, 'var(--g-flowerC)']].map(
              ([x, y, c], i) => (
                <circle key={i} cx={x as number} cy={y as number} r="4" fill={c as string} />
              ),
            )}
          </g>

          {/* butterflies */}
          <g className="g-bfly g-bfly-1" fill="var(--g-flowerA)">
            <ellipse cx="-5" cy="0" rx="5" ry="7" />
            <ellipse cx="5" cy="0" rx="5" ry="7" />
          </g>
          <g className="g-bfly g-bfly-2" fill="var(--g-flowerD)">
            <ellipse cx="-4" cy="0" rx="4" ry="6" />
            <ellipse cx="4" cy="0" rx="4" ry="6" />
          </g>
        </g>
      </svg>

      {/* --- interactive signs --- */}
      <button className="landmark lm-projects" style={{ left: '32%', top: '48%' }} onClick={() => go('projects')}>
        <span className="sign-no">01</span>
        <span className="sign-name">Projects</span>
        <span className="sign-arrow" aria-hidden>↗</span>
      </button>
      <button className="landmark lm-thoughts" style={{ left: '66.5%', top: '38%' }} onClick={() => go('thoughts')}>
        <span className="sign-no">02</span>
        <span className="sign-name">Thoughts</span>
        <span className="sign-arrow" aria-hidden>↗</span>
      </button>
      <button className="landmark lm-about" style={{ left: '70.5%', top: '63%' }} onClick={() => go('about')}>
        <span className="sign-no">03</span>
        <span className="sign-name">About</span>
        <span className="sign-arrow" aria-hidden>↗</span>
      </button>

      {/* annotation */}
      <span className="garden-note note-grow">still growing</span>
    </div>
  )
}
