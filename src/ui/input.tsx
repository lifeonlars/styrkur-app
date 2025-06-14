import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-neu shadow-neu-inset bg-neu-surface border border-neu-subtle px-3 py-2 text-base text-white file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-white placeholder:text-gray-400 focus-visible:outline-none focus-visible:shadow-neu-focus focus-visible:border-neu-light transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
