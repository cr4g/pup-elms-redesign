export default function Toast({ toast, onClose }) {
  if (!toast) return null
  const icon = toast.type === 'error' ? '✕' : '✓'

  return (
    <div
      className={`toast toast-${toast.type}`}
      role="status"
      aria-live="polite"
    >
      <span aria-hidden="true">{icon}</span>
      <span>{toast.message}</span>
      <button type="button" onClick={onClose} aria-label="Dismiss message">
        ×
      </button>
    </div>
  )
}