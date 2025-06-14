import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all duration-200 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        // Primary - Norse gold for main actions, CTAs, form submissions with Cybertruck-style highlighting keyline
        primary: "rounded-neu-pill shadow-neu-gold bg-gradient-to-br from-norse-gold-light via-norse-gold to-norse-gold-dark border-2 border-norse-gold-light/30 text-black font-semibold hover:shadow-neu-gold-hover hover:from-norse-gold hover:to-norse-gold-light hover:border-norse-gold-light/50 active:shadow-neu-gold-pressed transform hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden before:absolute before:inset-0 before:rounded-neu-pill before:border before:border-white/20 before:pointer-events-none",
        
        // Outline - Neumorphic surface for secondary actions, cancel buttons
        outline: "rounded-neu shadow-neu bg-neu-surface border border-neu-light text-gray-300 hover:shadow-neu-hover hover:text-white hover:border-neu-lighter active:shadow-neu-pressed",
        
        // Flat - Transparent background for navigation, tertiary actions, close buttons
        flat: "rounded-neu shadow-none bg-transparent border border-transparent text-gray-400 hover:shadow-neu-flat hover:bg-neu-surface hover:text-white hover:border-neu-subtle active:shadow-neu-pressed",
      },
      size: {
        // Default: 36px height to align with input components
        default: "h-9 px-4 text-sm",
        
        // Large: 48px height for prominent actions
        large: "h-12 px-6 text-base font-semibold",
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
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
