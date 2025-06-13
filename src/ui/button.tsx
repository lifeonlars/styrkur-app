import * as React from "react"
import { Button as HeroUIButton, ButtonProps as HeroUIButtonProps } from "@heroui/button"
import { cn } from "@/lib/utils"

// Map shadcn variants to HeroUI variants
const variantMap = {
  default: { color: "primary" as const, variant: "solid" as const },
  destructive: { color: "danger" as const, variant: "solid" as const },
  outline: { color: "default" as const, variant: "bordered" as const },
  secondary: { color: "secondary" as const, variant: "solid" as const },
  ghost: { color: "default" as const, variant: "ghost" as const },
  link: { color: "primary" as const, variant: "light" as const },
}

// Map shadcn sizes to HeroUI sizes
const sizeMap = {
  default: "md" as const,
  sm: "sm" as const,
  lg: "lg" as const,
  icon: "sm" as const,
}

export interface ButtonProps extends Omit<HeroUIButtonProps, 'color' | 'variant' | 'size'> {
  variant?: keyof typeof variantMap
  size?: keyof typeof sizeMap
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
    const mappedVariant = variantMap[variant]
    const mappedSize = sizeMap[size]
    const isIconOnly = size === "icon"

    if (asChild) {
      // For asChild functionality, we'd need to implement this separately
      console.warn("asChild prop is not supported with HeroUI Button")
    }

    return (
      <HeroUIButton
        ref={ref}
        color={mappedVariant.color}
        variant={mappedVariant.variant}
        size={mappedSize}
        isIconOnly={isIconOnly}
        className={cn(className)}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }