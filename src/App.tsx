import { useEffect, useState } from 'react'
import { profile, work, jobs, projects, skills, thoughts, footerLinks, chainColor, type Project } from './data'
import { ThemeToggle } from './components/ThemeToggle'
import { ExperienceItem } from './components/ExperienceItem'
import { ProjectCard } from './components/ProjectCard'
import { Monogram } from './components/Monogram'
import { Icon, iconForLink } from './components/Icon'
import { Ticker } from './components/Ticker'
import { ProtocolMap, type MapNode, type MapHub } from './components/ProtocolMap'

type View = 'home' | 'work' | 'projects' | 'project' | 'thoughts' | 'about'

const nav: { id: View; label: string }[] = [
  { id: 'work', label: 'Work' },
  { id: 'projects', label: 'Projects' },
  { id: 'thoughts', label: 'Thoughts' },
  { id: 'about', label: 'About' },
]

const fan = [-7, -2.5, 2.5, 7]

function TopBar({ view, go }: { view: View; go: (v: View) => void }) {
  return (
    <header className="nav">
      <div className="wrap nav-inner">
        <button className="nav-brand" onClick={() => go('home')}>
          {profile.name}
          <span className="nav-brand-role">{profile.role}</span>
        </button>
        <nav className="nav-links" aria-label="Sections">
          {nav.map((n) => (
            <button
              key={n.id}
              onClick={() => go(n.id)}
              className={view === n.id ? 'is-active' : ''}
            >
              {n.label}
            </button>
          ))}
        </nav>
        <div className="nav-right">
          <a className="nav-cta" href={profile.contacts[0].href}>
            Email
          </a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}

function Home({ go, openProject }: { go: (v: View) => void; openProject: (p: Project) => void }) {
  return (
    <section className="home deck-home">
      <div className="wrap deck-head enter">
        <p className="deck-kicker">
          {profile.name} · {profile.role}, {profile.location}
        </p>
        <h1 className="deck-title">A deck of dashboards.</h1>
        <p className="deck-lede">
          Data analyst at Veranta, a perpetual DEX on Base. These are the dashboards I've shipped
          — <span className="hint-hover">click a card to read the project.</span>
          <span className="hint-touch">tap a card to read the project.</span>
        </p>
        <p className="deck-aside">
          Every figure on this site links to the dashboard where you can check it.
        </p>
      </div>

      <div className="deck enter" style={{ animationDelay: '140ms' }}>
        {projects.map((p, i) => (
          <div className="deck-slot" key={p.title} style={{ ['--i' as string]: i }}>
            <ProjectCard project={p} tilt={fan[i] ?? 0} onOpen={openProject} />
          </div>
        ))}
      </div>

      <div className="wrap deck-cta enter" style={{ animationDelay: '320ms' }}>
        <button className="btn btn-primary" onClick={() => go('projects')}>
          See all projects <span aria-hidden>→</span>
        </button>
        <button className="btn btn-ghost" onClick={() => go('work')}>
          Where I work
        </button>
        <button className="btn btn-ghost" onClick={() => go('thoughts')}>
          Read thoughts
        </button>
        <a className="btn btn-ghost" href={profile.contacts[0].href}>
          Say hello
        </a>
      </div>
    </section>
  )
}

function ViewHead({ title, note }: { title: string; note: string }) {
  return (
    <div className="sec-head">
      <h2 className="sec-title">{title}</h2>
      <span className="sec-note">{note}</span>
    </div>
  )
}

/** Where he works now. Separate from Projects: Veranta is the employer, not a portfolio piece. */
function Work() {
  return (
    <section className="view">
      <div className="wrap">
        <ViewHead title="Work" note={`${work.org} · ${work.period}`} />

        <div className="role" style={{ ['--chain' as string]: chainColor[work.chain] }}>
          <div className="role-head">
            <Monogram ticker={work.ticker} chain={work.chain} label={work.org} size="lg" />
            <div className="role-headings">
              <h3 className="role-title">{work.role}</h3>
              <p className="role-org">
                {work.org} <span className="role-org-sub">· perpetual DEX on Base</span>
              </p>
            </div>
            <span className="role-period">{work.period}</span>
          </div>

          <p className="role-lede">{work.lede}</p>

          <h3 className="sub-label">What I own</h3>
          <ul className="role-scope">
            {work.scope.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>

          <h3 className="sub-label">Numbers from the role</h3>
          <div className="role-metrics">
            {work.metrics.map((m) => (
              <a
                className="role-metric"
                key={m.label}
                href={m.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="role-metric-value">{m.value}</span>
                <span className="role-metric-label">{m.label}</span>
                <span className="role-metric-source">{m.source}</span>
              </a>
            ))}
          </div>

          <div className="role-links">
            {work.links.map((l) => (
              <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer">
                <Icon name="dune" size={15} />
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Projects({ openProject }: { openProject: (p: Project) => void }) {
  // The protocol constellation — same 4 dashboards, now interactive.
  // Each node opens the same project detail page as the matching card.
  const hub: MapHub = { label: '@restaji', sub: 'on-chain analyst', x: 50, y: 50 }
  const mapNodes: MapNode[] = projects.map((p, i) => {
    const layouts = [
      { metric: '999M cap · 698 holders', x: 27, y: 27 },
      { metric: 'TVL · top-100 LPs',     x: 73, y: 23 },
      { metric: 'LP + perp hedge PnL',   x: 25, y: 74 },
      { metric: 'vaults vs. isolated',   x: 75, y: 72 },
    ] as const
    const layout = layouts[i] ?? { metric: p.tagline, x: 50, y: 50 }
    return {
      label: p.short,
      ticker: p.ticker,
      chain: p.chain,
      metric: layout.metric,
      x: layout.x,
      y: layout.y,
      onOpen: () => openProject(p),
    }
  })

  return (
    <section className="view">
      <div className="wrap">
        <ViewHead title="Projects" note={`${projects.length} dashboards · live on Dune`} />

        <p className="pmap-hint">
          Hover a node to light the wire · click to open the dashboard.
        </p>
        <div className="home-scene">
          <ProtocolMap nodes={mapNodes} hub={hub} />
        </div>

        <p className="pmap-hint pmap-hint-grid">or browse the grid</p>
        <div className="deck-grid">
          {projects.map((p) => (
            <ProjectCard key={p.title} project={p} onOpen={openProject} />
          ))}
        </div>
      </div>
    </section>
  )
}

/** The project detail page — what the dashboard covers, what I built, the numbers,
 *  and the link to the live Dune dashboard. Reached by clicking any project card. */
function ProjectDetail({ project, back }: { project: Project; back: () => void }) {
  const color = chainColor[project.chain]
  return (
    <section className="view pview">
      <div className="wrap">
        <button className="pback" type="button" onClick={back}>
          <span aria-hidden>←</span> All projects
        </button>

        <div className="prole" style={{ ['--chain' as string]: color }}>
          <div className="prole-head">
            <Monogram
              ticker={project.ticker}
              chain={project.chain}
              label={project.short}
              size="lg"
            />
            <div className="prole-headings">
              <p className="prole-kicker">
                <span className="prole-dot" aria-hidden /> {project.chain}
                <span className="prole-rarity" aria-hidden>
                  {'★'.repeat(project.rarity)}
                </span>
              </p>
              <h2 className="prole-title">{project.short}</h2>
              <p className="prole-tagline">{project.tagline}</p>
              <p className="prole-type">{project.type}</p>
            </div>
          </div>

          <p className="prole-blurb">{project.blurb}</p>

          {project.highlights && project.highlights.length > 0 && (
            <>
              <h3 className="sub-label">What's on the dashboard</h3>
              <ul className="prole-list">
                {project.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </>
          )}

          {project.work && project.work.length > 0 && (
            <>
              <h3 className="sub-label">How I built it</h3>
              <ul className="prole-list prole-list-work">
                {project.work.map((w) => (
                  <li key={w}>{w}</li>
                ))}
              </ul>
            </>
          )}

          {project.stats.length > 0 && (
            <>
              <h3 className="sub-label">Numbers worth quoting</h3>
              <div className="prole-stats">
                {project.stats.map((s) => (
                  <span className="prole-stat" key={s.k}>
                    <span className="prole-stat-k">{s.k}</span>
                    <span className="prole-stat-v">{s.v}</span>
                  </span>
                ))}
              </div>
            </>
          )}

          <div className="prole-links">
            {project.links.map((l) => (
              <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer">
                <Icon name={iconForLink(l.href)} size={15} />
                {l.label}
                <Icon name="external" size={13} className="prole-link-ext" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Thoughts() {
  return (
    <section className="view">
      <div className="wrap">
        <ViewHead title="Thoughts" note={`${thoughts.length} pieces · more coming`} />
        <div className="thought-list">
          {thoughts.map((t) => (
            <a
              className="thought-row"
              key={t.href}
              href={t.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="thought-meta">
                <span className="thought-kind">{t.kind}</span>
                <span className="thought-date">{t.date}</span>
              </div>
              <div className="thought-main">
                <h3 className="thought-title">{t.title}</h3>
                <p className="thought-blurb">{t.blurb}</p>
              </div>
              <Icon name="external" size={15} className="thought-arrow" />
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

function About() {
  return (
    <section className="view">
      <div className="wrap">
        <ViewHead title="About" note="Background & contact" />
        <p className="about-text">{profile.summary}</p>

        <h3 className="sub-label">Experience</h3>
        <p className="about-note">
          Current role is on the <span className="about-note-strong">Work</span> page. Earlier:
        </p>
        <div className="jobs">
          {jobs.map((job, i) => (
            <ExperienceItem key={job.role + job.period} job={job} defaultOpen={i === 0} />
          ))}
        </div>

        <h3 className="sub-label">Skills</h3>
        <dl className="skills">
          {skills.map((g) => (
            <div className="skill-row" key={g.category}>
              <dt className="skill-cat">{g.category}</dt>
              <dd className="chips">
                {g.items.map((it) => (
                  <span className="chip" key={it}>
                    {it}
                  </span>
                ))}
              </dd>
            </div>
          ))}
        </dl>

        <h3 className="sub-label">Contact</h3>
        <ul className="contact">
          {profile.contacts.map((c) => (
            <li key={c.href}>
              <a href={c.href} target="_blank" rel="noopener noreferrer">
                <Icon name={iconForLink(c.href)} size={15} />
                {c.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="wrap foot">
        <span>
          {profile.name} — {profile.role}, {profile.location}
        </span>
        <div className="foot-links">
          {footerLinks.map((l) => (
            <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" aria-label={l.label}>
              <Icon name={iconForLink(l.label)} size={16} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  const [view, setView] = useState<View>('home')
  const [activeProject, setActiveProject] = useState<Project | null>(null)

  const go = (v: View) => {
    setView(v)
    if (v !== 'project') setActiveProject(null)
  }

  const openProject = (p: Project) => {
    setActiveProject(p)
    setView('project')
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [view, activeProject?.title])

  return (
    <>
      <TopBar view={view} go={go} />
      <Ticker />
      <main>
        <div key={view + ':' + (activeProject?.title ?? '')} className="view-wrap">
          {view === 'home' && <Home go={go} openProject={openProject} />}
          {view === 'work' && <Work />}
          {view === 'projects' && <Projects openProject={openProject} />}
          {view === 'project' && activeProject && (
            <ProjectDetail project={activeProject} back={() => go('projects')} />
          )}
          {view === 'thoughts' && <Thoughts />}
          {view === 'about' && <About />}
        </div>
      </main>
      <Footer />
    </>
  )
}
