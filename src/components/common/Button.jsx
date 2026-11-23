// variant: 'primary' | 'secondary' | 'danger-link'
export default function Button({
  variant = 'primary',
  type = 'button',
  className = '',
  children,
  ...props
}) {
  const base = variant === 'danger-link' ? 'btn-danger-link' : `btn btn-${variant}`
  return (
    <button type={type} className={`${base} ${className}`.trim()} {...props}>
      {children}
    </button>
  )
}