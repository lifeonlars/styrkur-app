import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const inputVariants = cva(
  "flex w-full rounded-neu shadow-neu-inset bg-neu-surface border border-neu-subtle px-3 text-white file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-white placeholder:text-gray-400 focus-visible:outline-none focus-visible:shadow-neu-focus focus-visible:border-neu-light transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      size: {
        // Default: 36px height to align with default buttons
        default: "h-9 text-sm",
        
        // Large: 48px height to align with large buttons
        large: "h-12 text-base",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

export interface InputProps
  extends React.ComponentProps<"input">,
    VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, size, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(inputVariants({ size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input, inputVariants }
