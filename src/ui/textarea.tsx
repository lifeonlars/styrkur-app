import * as React from "react"

import { cn } from "@/lib/utils"

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[80px] w-full rounded-neu shadow-neu-inset bg-neu-surface border border-neu-subtle px-3 py-2 text-base text-white placeholder:text-gray-400 focus-visible:outline-none focus-visible:shadow-neu-focus focus-visible:border-neu-light transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm resize-none",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Textarea.displayName = "Textarea"

export { Textarea }
