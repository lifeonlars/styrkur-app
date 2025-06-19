import * as React from "react"
import { X } from "lucide-react"
import styles from "./chip.module.css"

export interface ChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "neutral" | "neutral-bordered" | "success" | "danger" | "warning" | "info" | "gold"
  size?: "default" | "label"
  selected?: boolean
  removable?: boolean
  icon?: React.ReactNode
  onRemove?: () => void
}

const Chip = React.forwardRef<HTMLButtonElement, ChipProps>(
  ({ 
    className, 
    variant = "neutral", 
    size = "default", 
    selected = false, 
    removable, 
    icon, 
    children, 
    onRemove, 
    onClick, 
    disabled, 
    ...props 
  }, ref) => {
    const handleRemove = (e: React.MouseEvent) => {
      e.stopPropagation()
      onRemove?.()
    }

    // Build CSS classes
    const chipClasses = [
      styles.chip,
      styles[`chip-${size}`],
      styles[`chip-${variant}`],
      selected && styles['chip-selected'],
      className
    ].filter(Boolean).join(' ')

    return (
      <button
        className={chipClasses}
        ref={ref}
        onClick={onClick}
        disabled={disabled}
        aria-pressed={selected}
        aria-label={removable ? `${children}, removable` : String(children)}
        {...props}
      >
        {icon && (
          <span className={`${styles['chip-icon']}`}>
            {React.cloneElement(icon as React.ReactElement, {
              className: `${styles['chip-icon']} ${(icon as React.ReactElement).props.className || ''}`
            })}
          </span>
        )}
        <span className={styles['chip-text']}>{children}</span>
        {removable && (
          <span
            className={styles['chip-remove']}
            onClick={handleRemove}
            aria-label="Remove"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                handleRemove(e as any)
              }
            }}
          >
            <X className={styles['chip-icon']} />
          </span>
        )}
      </button>
    )
  }
)
Chip.displayName = "Chip"

export { Chip }