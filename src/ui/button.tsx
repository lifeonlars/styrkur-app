import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import styles from "./button.module.css"

const buttonVariants = cva(
  styles.btn, // Base button class
  {
    variants: {
      variant: {
        // Primary - Norse gold for main actions, CTAs, form submissions
        primary: styles['btn-primary'],
        
        // Outline - Neumorphic surface for secondary actions, cancel buttons
        outline: styles['btn-outline'],
        
        // Flat - Transparent background for navigation, tertiary actions, close buttons
        flat: styles['btn-flat'],
        
        // Dashed - Dashed border for add buttons and secondary actions
        dashed: styles['btn-dashed'],
      },
      size: {
        // Default: 36px height to align with input components
        default: styles['btn-default'],
        
        // Large: 48px height for prominent actions
        large: styles['btn-large'],
        
        // Icon variants
        icon: styles['btn-icon'],
        'icon-large': styles['btn-icon-large'],
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  fullWidth?: boolean
  loading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, fullWidth = false, loading = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    
    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size }),
          fullWidth && styles['btn-full'],
          loading && styles['btn-loading'],
          className
        )}
        disabled={loading || props.disabled}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
