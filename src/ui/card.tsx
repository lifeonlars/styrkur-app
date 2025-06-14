import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import styles from "./card.module.css"

const cardVariants = cva(
  styles.card, // Base card class
  {
    variants: {
      variant: {
        // Default card - soft neumorphic depth with crisp light keyline and organic shape
        default: styles['card-default'],
        
        // Elevated variant - higher elevation with enhanced keyline and larger radius
        elevated: styles['card-elevated'],
        
        // Sunken variant - inset appearance with inverted keyline
        sunken: styles['card-sunken'],
        
        // Flat variant - minimal elevation with subtle keyline
        flat: styles['card-flat'],
        
        // Interactive variant - clear interaction feedback with enhanced keyline
        interactive: styles['card-interactive'],
        
        // Special variants
        gradient: styles['card-gradient'],
        accent: styles['card-accent'],
        
        // State variants
        success: styles['card-success'],
        error: styles['card-error'],
        warning: styles['card-warning'],
        info: styles['card-info'],
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
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, size, fullWidth = false, loading = false, hoverLift = false, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        cardVariants({ variant, size }),
        fullWidth && styles['card-full'],
        loading && styles['card-loading'],
        hoverLift && styles['card-hover-lift'],
        className
      )}
      {...props}
    />
  )
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
