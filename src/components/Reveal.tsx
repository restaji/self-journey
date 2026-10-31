import type { ReactNode } from 'react'
import { useInView } from '../hooks/useInView'

/** Wraps children in a subtle fade-up that triggers once on scroll-in. */
export function Reveal({
  children,
  delay = 0,
  as: Tag = 'div',
  className = '',
}: {
  children: ReactNode
  delay?: number
  as?: 'div' | 'section'
  className?: string
}) {
  const { ref, inView } = useInView<HTMLDivElement>(0.15)
  return (
    <Tag
      ref={ref as never}
      className={`reveal${inView ? ' is-in' : ''}${className ? ' ' + className : ''}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  )
}
