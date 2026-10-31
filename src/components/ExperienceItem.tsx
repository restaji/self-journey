import { useRef, useState } from 'react'
import type { Job } from '../data'

/** Clickable experience entry that expands/collapses its detail with a height transition. */
export function ExperienceItem({ job, defaultOpen = false }: { job: Job; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen)
  const bodyRef = useRef<HTMLDivElement>(null)

  return (
    <article className={`job${open ? ' is-open' : ''}`}>
      <button
        className="job-head"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <span className="job-toggle" aria-hidden>
          {open ? '−' : '+'}
        </span>
        <span className="job-headings">
          <span className="job-role">{job.role}</span>
          <span className="job-org">{job.org}</span>
        </span>
        <span className="job-date">{job.period}</span>
      </button>

      <div
        className="job-body"
        style={{ maxHeight: open ? (bodyRef.current?.scrollHeight ?? 999) + 40 : 0 }}
      >
        <div ref={bodyRef} className="job-body-inner">
          <ul className="points">
            {job.points.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ul>
          {job.dune && (
            <a className="tag-dune" href={job.dune.href} target="_blank" rel="noopener noreferrer">
              {job.dune.label}
            </a>
          )}
        </div>
      </div>
    </article>
  )
}
