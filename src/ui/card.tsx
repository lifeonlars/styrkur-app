import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const cardVariants = cva(
  "text-white transition-all duration-200",
  {
    variants: {
      variant: {
        // Default card - soft neumorphic depth with crisp light keyline and organic shape
        default: "rounded-neu-lg shadow-neu bg-neu-card border border-neu-light hover:shadow-neu-hover hover:border-neu-lighter",
        
        // Elevated variant - higher elevation with enhanced keyline and larger radius
        elevated: "rounded-neu-xl shadow-neu-lg bg-neu-card border border-neu-lighter hover:shadow-neu-hover hover:border-neu-light",
        
        // Sunken variant - inset appearance with inverted keyline
        sunken: "rounded-neu shadow-neu-inset bg-neu-surface border border-neu-subtle",
        
        // Flat variant - minimal elevation with subtle keyline
        flat: "rounded-neu shadow-neu-flat bg-neu-surface border border-neu-subtle hover:shadow-neu hover:border-neu-light",
        
        // Interactive variant - clear interaction feedback with enhanced keyline
        interactive: "rounded-neu-lg shadow-neu bg-neu-card border border-neu-light hover:shadow-neu-hover hover:border-neu-lighter cursor-pointer transform hover:scale-[1.01]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardVariants({ variant, className }))}
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
    className={cn("flex flex-col space-y-1.5 p-6", className)}
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
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
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
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
