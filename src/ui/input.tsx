import * as React from "react"
import { Input as HeroUIInput, InputProps as HeroUIInputProps } from "@heroui/input"
import { cn } from "@/lib/utils"

export interface InputProps extends HeroUIInputProps {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant = "bordered", ...props }, ref) => {
    return (
      <HeroUIInput
        ref={ref}
        variant={variant}
        className={cn(className)}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }