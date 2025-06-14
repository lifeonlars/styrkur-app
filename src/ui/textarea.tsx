import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const textareaVariants = cva(
  "flex w-full rounded-neu shadow-neu-inset bg-neu-surface border border-neu-subtle px-3 py-2 text-white placeholder:text-gray-400 focus-visible:outline-none focus-visible:shadow-neu-focus focus-visible:border-neu-light transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 resize-none",
  {
    variants: {
      size: {
        // Default: Aligns with default button/input height proportions
        default: "min-h-[72px] text-sm",
        
        // Large: Aligns with large button/input height proportions
        large: "min-h-[96px] text-base",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

export interface TextareaProps
  extends React.ComponentProps<"textarea">,
    VariantProps<typeof textareaVariants> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, size, ...props }, ref) => {
    return (
      <textarea
        className={cn(textareaVariants({ size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea, textareaVariants }
