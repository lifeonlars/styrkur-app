import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import styles from "./textarea.module.css"

const textareaVariants = cva(
  styles.textarea, // Base textarea class
  {
    variants: {
      size: {
        // Default: Aligns with default button/input height proportions
        default: styles['textarea-default'],
        
        // Large: Aligns with large button/input height proportions
        large: styles['textarea-large'],
        
        // Additional size options
        compact: styles['textarea-compact'],
        expanded: styles['textarea-expanded'],
      },
      variant: {
        // Default neumorphic textarea
        default: '',
        
        // State variants
        error: styles['textarea-error'],
        success: styles['textarea-success'],
        warning: styles['textarea-warning'],
      },
      resize: {
        none: styles['textarea-fixed'],
        vertical: styles['textarea-resizable'],
        auto: styles['textarea-auto'],
      },
    },
    defaultVariants: {
      size: "default",
      variant: "default",
      resize: "none",
    },
  }
)

export interface TextareaProps
  extends React.ComponentProps<"textarea">,
    VariantProps<typeof textareaVariants> {
  fullWidth?: boolean
  showCounter?: boolean
  maxLength?: number
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, size, variant, resize, fullWidth = false, showCounter = false, maxLength, ...props }, ref) => {
    const [charCount, setCharCount] = React.useState(0)
    
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCharCount(e.target.value.length)
      props.onChange?.(e)
    }

    const getCounterVariant = () => {
      if (!maxLength) return ''
      const percentage = (charCount / maxLength) * 100
      if (percentage >= 100) return styles['textarea-counter-error']
      if (percentage >= 80) return styles['textarea-counter-warning']
      return ''
    }

    if (showCounter) {
      return (
        <div className={styles['textarea-container']}>
          <textarea
            className={cn(
              textareaVariants({ size, variant, resize }),
              fullWidth && styles['textarea-full'],
              className
            )}
            ref={ref}
            maxLength={maxLength}
            onChange={handleChange}
            {...props}
          />
          <div className={cn(styles['textarea-counter'], getCounterVariant())}>
            {charCount}{maxLength ? `/${maxLength}` : ''}
          </div>
        </div>
      )
    }

    return (
      <textarea
        className={cn(
          textareaVariants({ size, variant, resize }),
          fullWidth && styles['textarea-full'],
          className
        )}
        ref={ref}
        maxLength={maxLength}
        onChange={handleChange}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea, textareaVariants }
