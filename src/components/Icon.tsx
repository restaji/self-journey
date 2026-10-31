import type { ReactElement } from 'react'

/** Minimal inline line-icon set. 1-color (currentColor), 1.5 stroke, 16px default.
 *  Kept tiny and consistent — icons are wayfinding, not decoration. */
export type IconName =
  | 'mail'
  | 'dune'
  | 'x'
  | 'telegram'
  | 'external'
  | 'work'
  | 'experience'
  | 'skills'
  | 'about'

const PATHS: Record<IconName, ReactElement> = {
  mail: (
    <>
      <rect x="2.5" y="4" width="15" height="12" rx="1.5" />
      <path d="M3 5.5 10 11l7-5.5" />
    </>
  ),
  dune: (
    <>
      <path d="M3 14.5h14" />
      <path d="M5.5 14.5V9" />
      <path d="M9 14.5V5.5" />
      <path d="M12.5 14.5v-6" />
      <path d="M16 14.5v-3.5" />
    </>
  ),
  x: <path d="M4 4l12 12M16 4L4 16" />,
  telegram: <path d="M17.5 3.5 2.8 9.3c-.5.2-.5.9 0 1l3.6 1.1 1.4 4.2c.1.4.6.5.9.2l2-1.9 3.6 2.7c.3.2.8.1.9-.3l2.7-12c.1-.5-.4-.9-.9-.8Z" />,
  external: (
    <>
      <path d="M8 4H5a1.5 1.5 0 0 0-1.5 1.5v9A1.5 1.5 0 0 0 5 16h9a1.5 1.5 0 0 0 1.5-1.5v-3" />
      <path d="M11 4h5v5M16 4l-7 7" />
    </>
  ),
  work: (
    <>
      <rect x="3" y="3" width="6" height="6" rx="1" />
      <rect x="11" y="3" width="6" height="6" rx="1" />
      <rect x="3" y="11" width="6" height="6" rx="1" />
      <rect x="11" y="11" width="6" height="6" rx="1" />
    </>
  ),
  experience: (
    <>
      <path d="M4 16V8M10 16V4M16 16v-6" />
    </>
  ),
  skills: (
    <>
      <path d="M4 6l3 3-3 3" />
      <path d="M10 14h6" />
    </>
  ),
  about: (
    <>
      <circle cx="10" cy="6.5" r="3" />
      <path d="M4 16.5c0-3 2.7-5 6-5s6 2 6 5" />
    </>
  ),
}

export function Icon({
  name,
  size = 16,
  className = '',
}: {
  name: IconName
  size?: number
  className?: string
}) {
  return (
    <svg
      className={`icon${className ? ' ' + className : ''}`}
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {PATHS[name]}
    </svg>
  )
}

/** Resolve a contact/link href or label to the right brand icon. */
export function iconForLink(hrefOrLabel: string): IconName {
  const s = hrefOrLabel.toLowerCase()
  if (s.startsWith('mailto:') || s.includes('email')) return 'mail'
  if (s.includes('dune')) return 'dune'
  if (s.includes('x.com') || s === 'x' || s.includes('x thread')) return 'x'
  if (s.includes('t.me') || s.includes('telegram')) return 'telegram'
  return 'external'
}
