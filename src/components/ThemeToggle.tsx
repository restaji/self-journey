import { useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

function getStored(): Theme {
  try {
    if (localStorage.getItem('theme') === 'dark') return 'dark'
  } catch {
    /* ignore */
  }
  return 'light'
}

function apply(theme: Theme) {
  const root = document.documentElement
  if (theme === 'dark') root.setAttribute('data-theme', 'dark')
  else root.removeAttribute('data-theme')
  try {
    localStorage.setItem('theme', theme)
  } catch {
    /* ignore */
  }
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('light')

  useEffect(() => {
    setTheme(getStored())
  }, [])

  const toggle = () => {
    const next: Theme = theme === 'light' ? 'dark' : 'light'
    setTheme(next)
    apply(next)
  }

  const label = theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'

  return (
    <button className="theme-toggle" onClick={toggle} aria-label={label} title={label}>
      <span aria-hidden>{theme === 'light' ? '●' : '○'}</span>
    </button>
  )
}
