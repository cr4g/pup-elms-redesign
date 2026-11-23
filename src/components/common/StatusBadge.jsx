// variant: 'warning' | 'success' | 'danger' | 'neutral'
// May icon + text para hindi lang kulay ang nagsasabi ng status (accessibility)
const ICONS = { warning: '⏰', success: '✓', danger: '!', neutral: '•' }

export default function StatusBadge({ variant = 'neutral', children }) {
  return (
    <span className={`badge badge-${variant}`}>
      <span aria-hidden="true">{ICONS[variant]}</span> {children}
    </span>
  )
}