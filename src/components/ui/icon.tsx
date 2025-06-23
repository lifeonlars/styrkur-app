'use client'

import React from 'react'

// ================================================================================================
// REUSABLE ICON COMPONENT WITH SOFT GRID AND DESIGN TOKEN SUPPORT
// ================================================================================================

// Valid sizes following 4px soft grid increments
export type IconSize = 
  | 12 | 16 | 20 | 24 | 28 | 32 | 36 | 40 | 44 | 48 | 52 | 56 | 60 | 64 | 68 | 72

// Design token color options
export type IconColor = 
  | 'primary'     // var(--text-primary) - white
  | 'secondary'   // var(--text-secondary) - light gray
  | 'muted'       // var(--text-muted) - darker gray
  | 'accent'      // var(--text-accent) - gold
  | 'success'     // var(--text-success) - green
  | 'danger'      // var(--text-danger) - red
  | 'warning'     // var(--text-warning) - purple
  | 'info'        // var(--text-info) - blue
  | 'disabled'    // var(--text-disabled) - very dark gray
  | 'inverse'     // var(--text-inverse) - dark for light backgrounds

// Icon component props
export interface IconProps {
  /**
   * Size in pixels - must be 4px increment for soft grid compliance
   * @default 24
   */
  size?: IconSize
  
  /**
   * Color using design token semantic names
   * @default 'primary'
   */
  color?: IconColor
  
  /**
   * Additional CSS classes
   */
  className?: string
  
  /**
   * Additional inline styles (use sparingly)
   */
  style?: React.CSSProperties
  
  /**
   * SVG path data or React element content
   */
  children: React.ReactNode
  
  /**
   * SVG viewBox - defaults to 64x64 for our exercise group icons
   * @default "0 0 64 64"
   */
  viewBox?: string
  
  /**
   * Accessible label for the icon
   */
  'aria-label'?: string
  
  /**
   * Whether icon is decorative (hidden from screen readers)
   * @default false
   */
  'aria-hidden'?: boolean
}

// Map color props to CSS custom properties
const colorMap: Record<IconColor, string> = {
  primary: 'var(--text-primary)',
  secondary: 'var(--text-secondary)', 
  muted: 'var(--text-muted)',
  accent: 'var(--text-accent)',
  success: 'var(--text-success)',
  danger: 'var(--text-danger)',
  warning: 'var(--text-warning)',
  info: 'var(--text-info)',
  disabled: 'var(--text-disabled)',
  inverse: 'var(--text-inverse)'
}

/**
 * Reusable Icon component with soft grid sizing and design token colors
 * 
 * @example
 * ```tsx
 * <Icon size={48} color="accent">
 *   <path d="M 15 0 A 8.99927..." />
 * </Icon>
 * ```
 */
export function Icon({
  size = 24,
  color = 'primary',
  className = '',
  style = {},
  children,
  viewBox = '0 0 64 64',
  'aria-label': ariaLabel,
  'aria-hidden': ariaHidden = false,
  ...props
}: IconProps) {
  // Validate size is 4px increment
  if (size % 4 !== 0) {
    console.warn(`Icon size ${size} is not a 4px increment. Use: 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 68, 72`)
  }

  const iconStyle: React.CSSProperties = {
    color: colorMap[color],
    ...style
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox}
      width={size}
      height={size}
      className={className}
      style={iconStyle}
      fill="currentColor"
      aria-label={ariaLabel}
      aria-hidden={ariaHidden}
      {...props}
    >
      {children}
    </svg>
  )
}

// Re-export types for convenience
export type { IconSize, IconColor }