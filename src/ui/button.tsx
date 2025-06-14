import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all duration-200 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        // Neumorphic default - soft raised appearance with light keyline
        default: "rounded-neu shadow-neu bg-neu-surface border border-neu-light text-white hover:shadow-neu-hover hover:border-neu-lighter active:shadow-neu-pressed",
        
        // Norse gold primary - Cybertruck-inspired pill shape with enhanced depth
        primary: "rounded-neu-pill shadow-neu-gold bg-gradient-to-br from-norse-gold-light via-norse-gold to-norse-gold-dark border border-neu-gold-light text-black font-semibold hover:shadow-neu-gold-hover hover:from-norse-gold hover:to-norse-gold-light hover:border-neu-gold-subtle active:shadow-neu-gold-pressed transform hover:scale-[1.02] active:scale-[0.98]",
        
        // Secondary neumorphic surface with subtle keyline
        secondary: "rounded-neu shadow-neu bg-neu-surface border border-neu-subtle text-gray-300 hover:shadow-neu-hover hover:text-white hover:border-neu-light active:shadow-neu-pressed",
        
        // Destructive with neumorphic styling using Blood context color
        destructive: "rounded-neu shadow-neu bg-blood-500 border border-neu-subtle text-white hover:bg-blood-400 hover:shadow-neu-hover hover:border-neu-light active:shadow-neu-pressed",
        
        // Success with neumorphic styling using Forest context color
        success: "rounded-neu shadow-neu bg-forest-500 border border-neu-subtle text-white hover:bg-forest-400 hover:shadow-neu-hover hover:border-neu-light active:shadow-neu-pressed",
        
        // Warning with neumorphic styling using Wood context color
        warning: "rounded-neu shadow-neu bg-wood-500 border border-neu-subtle text-white hover:bg-wood-400 hover:shadow-neu-hover hover:border-neu-light active:shadow-neu-pressed",
        
        // Info with neumorphic styling using Ocean context color
        info: "rounded-neu shadow-neu bg-ocean-500 border border-neu-subtle text-white hover:bg-ocean-400 hover:shadow-neu-hover hover:border-neu-light active:shadow-neu-pressed",
        
        // Subtle flat appearance for less important actions
        outline: "rounded-neu shadow-neu-flat bg-neu-surface border border-neu-light text-gray-300 hover:shadow-neu hover:text-white hover:border-neu-lighter active:shadow-neu-pressed",
        
        // Minimal ghost appearance with subtle keyline on hover
        ghost: "rounded-neu shadow-none bg-transparent border border-transparent text-gray-400 hover:shadow-neu-flat hover:bg-neu-surface hover:border-neu-subtle hover:text-white",
        
        // Link styling with Norse gold - no keyline needed
        link: "rounded-none shadow-none bg-transparent border border-transparent text-norse-gold underline-offset-4 hover:underline hover:text-norse-gold-light",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-12 px-8 text-base font-semibold",
        icon: "h-10 w-10 !rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
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
