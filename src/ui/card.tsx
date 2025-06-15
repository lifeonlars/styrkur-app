import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import styles from "./card.module.css"

const cardVariants = cva(
  styles.card, // Base card class
  {
    variants: {
      variant: {
        // 4-Depth System
        flat: styles['card-flat'],           // Depth 0: Flat/inset
        default: styles['card-default'],     // Depth 1: Raised (default)
        elevated: styles['card-elevated'],   // Depth 2: Elevated
        floating: styles['card-floating'],   // Depth 3: Floating
        
        // Special variants
        sunken: styles['card-sunken'],       // Inverted depth
        interactive: styles['card-interactive'], // Interactive feedback
        
        // Legacy variants (kept for compatibility)
        gradient: styles['card-gradient'],
        accent: styles['card-accent'],
      },
      size: {
        default: '',
        compact: styles['card-compact'],
        large: styles['card-large'],
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  fullWidth?: boolean
  loading?: boolean
  hoverLift?: boolean
  depth?: 'sunken' | 'flat' | 'subtle' | 'elevated'
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, size, fullWidth = false, loading = false, hoverLift = false, depth, ...props }, ref) => {
    // Determine depth utility class based on variant or explicit depth prop
    const getDepthClass = () => {
      if (depth) {
        return styles[`depth-${depth}`]
      }
      
      // Default depth mapping for variants
      switch (variant) {
        case 'sunken':
          return styles['depth-sunken']
        case 'flat':
          return styles['depth-flat']
        case 'elevated':
          return styles['depth-elevated']
        case 'floating':
          return styles['depth-elevated'] // Same as elevated for now
        case 'interactive':
          return styles['depth-subtle']
        default:
          return styles['depth-subtle'] // Default card state
      }
    }

    return (
      <div
        ref={ref}
        className={cn(
          cardVariants({ variant, size }),
          getDepthClass(),
          fullWidth && styles['card-full'],
          loading && styles['card-loading'],
          hoverLift && styles['card-hover-lift'],
          className
        )}
        {...props}
      />
    )
  }
)
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(styles['card-header'], className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(styles['card-title'], className)}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(styles['card-description'], className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div 
    ref={ref} 
    className={cn(styles['card-content'], className)} 
    {...props} 
  />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(styles['card-footer'], className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
