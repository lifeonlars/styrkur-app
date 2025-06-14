import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import styles from "./input.module.css"

const inputVariants = cva(
  styles.input, // Base input class
  {
    variants: {
      inputSize: {
        // Default: 36px height to align with default buttons
        default: styles['input-default'],
        
        // Large: 48px height to align with large buttons
        large: styles['input-large'],
      },
      variant: {
        // Default neumorphic input
        default: '',
        
        // State variants
        error: styles['input-error'],
        success: styles['input-success'],
        warning: styles['input-warning'],
        
        // Special variants
        search: styles['input-search'],
      },
    },
    defaultVariants: {
      inputSize: "default",
      variant: "default",
    },
  }
)

export interface InputProps
  extends React.ComponentProps<"input">,
    VariantProps<typeof inputVariants> {
  fullWidth?: boolean
  withIcon?: 'left' | 'right' | boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, inputSize, variant, fullWidth = false, withIcon, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          inputVariants({ inputSize, variant }),
          fullWidth && styles['input-full'],
          withIcon === 'left' && styles['input-with-icon'],
          withIcon === 'right' && styles['input-with-icon-right'],
          withIcon === true && styles['input-with-icon'], // Default to left
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input, inputVariants }
