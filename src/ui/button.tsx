import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-200 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        // Neumorphic default - soft raised appearance
        default: "shadow-neu bg-neu-surface border-none text-white hover:shadow-neu-hover active:shadow-neu-pressed",
        
        // Norse gold primary - sophisticated metallic appearance
        primary: "shadow-neu-gold bg-norse-gold border-none text-black font-medium hover:shadow-neu-gold-hover active:shadow-neu-gold-pressed",
        
        // Secondary neumorphic surface
        secondary: "shadow-neu bg-neu-surface border-none text-gray-300 hover:shadow-neu-hover hover:text-white active:shadow-neu-pressed",
        
        // Destructive with neumorphic styling using Blood context color
        destructive: "shadow-neu bg-blood-500 border-none text-white hover:bg-blood-400 hover:shadow-neu-hover active:shadow-neu-pressed",
        
        // Success with neumorphic styling using Forest context color
        success: "shadow-neu bg-forest-500 border-none text-white hover:bg-forest-400 hover:shadow-neu-hover active:shadow-neu-pressed",
        
        // Warning with neumorphic styling using Wood context color
        warning: "shadow-neu bg-wood-500 border-none text-white hover:bg-wood-400 hover:shadow-neu-hover active:shadow-neu-pressed",
        
        // Info with neumorphic styling using Ocean context color
        info: "shadow-neu bg-ocean-500 border-none text-white hover:bg-ocean-400 hover:shadow-neu-hover active:shadow-neu-pressed",
        
        // Subtle flat appearance for less important actions
        outline: "shadow-neu-flat bg-neu-surface border-none text-gray-300 hover:shadow-neu hover:text-white active:shadow-neu-pressed",
        
        // Minimal ghost appearance
        ghost: "shadow-none bg-transparent border-none text-gray-400 hover:shadow-neu-flat hover:bg-neu-surface hover:text-white",
        
        // Link styling with Norse gold
        link: "shadow-none bg-transparent border-none text-norse-gold underline-offset-4 hover:underline hover:text-norse-gold-light",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10 rounded-full",
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
