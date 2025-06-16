"use client"

import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { Check, ChevronDown, ChevronUp } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const Select = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Root>
>((props, ref) => {
  // Prevent scrollbar compensation that causes pixel shift
  React.useEffect(() => {
    const style = document.createElement('style')
    style.textContent = `
      [data-radix-select-content] {
        margin-right: 0 !important;
      }
      body[data-scroll-locked] {
        padding-right: 0 !important;
        margin-right: 0 !important;
      }
    `
    document.head.appendChild(style)
    
    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style)
      }
    }
  }, [])
  
  return (
    <SelectPrimitive.Root 
      {...props} 
      // Prevent layout shift by disabling modal behavior and scrollbar compensation
      modal={false}
    />
  )
})
Select.displayName = SelectPrimitive.Root.displayName

const SelectGroup = SelectPrimitive.Group

const SelectValue = SelectPrimitive.Value

const selectTriggerVariants = cva(
  // Base styling to match Input exactly using design tokens
  "flex w-full items-center justify-between font-inherit cursor-pointer transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
  {
    variants: {
      size: {
        // Match Input component sizing exactly
        default: "h-[var(--height-component-default)] px-3 text-sm", // 36px
        large: "h-[var(--height-component-lg)] px-4 text-base", // 48px
      },
      variant: {
        default: "",
        error: "",
        success: "",
        warning: "",
      },
    },
    defaultVariants: {
      size: "default",
      variant: "default",
    },
  }
)

export interface SelectTriggerProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>,
    VariantProps<typeof selectTriggerVariants> {}

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  SelectTriggerProps
>(({ className, children, size, variant, ...props }, ref) => {
  const [isOpen, setIsOpen] = React.useState(false)
  
  const getBaseStyle = () => ({
    borderRadius: 'var(--radius-neu)',
    boxShadow: 'var(--shadow-neu-inset)',
    background: 'var(--neu-surface)',
    border: '1px solid var(--border-neu-subtle)',
    borderColor: 'var(--border-neu-subtle)', // Explicit border color to match Input exactly
    color: 'var(--text-primary)',
    outline: 'none',
  })

  const getVariantStyle = () => {
    switch (variant) {
      case 'error':
        return {
          borderColor: 'var(--blood-500)',
          boxShadow: 'var(--shadow-neu-inset), 0 0 0 1px var(--blood-500)',
        }
      case 'success':
        return {
          borderColor: 'var(--forest-500)', 
          boxShadow: 'var(--shadow-neu-inset), 0 0 0 1px var(--forest-500)',
        }
      case 'warning':
        return {
          borderColor: 'var(--wood-500)',
          boxShadow: 'var(--shadow-neu-inset), 0 0 0 1px var(--wood-500)',
        }
      default:
        return {}
    }
  }

  const getFocusStyle = () => {
    switch (variant) {
      case 'error':
        return {
          boxShadow: '0 0 0 2px rgba(168, 50, 50, 0.3), var(--shadow-neu-inset)',
          borderColor: 'var(--blood-400)',
        }
      case 'success':
        return {
          boxShadow: '0 0 0 2px rgba(46, 125, 95, 0.3), var(--shadow-neu-inset)',
          borderColor: 'var(--forest-400)',
        }
      case 'warning':
        return {
          boxShadow: '0 0 0 2px rgba(92, 69, 51, 0.3), var(--shadow-neu-inset)',
          borderColor: 'var(--wood-400)',
        }
      default:
        return {
          boxShadow: 'var(--shadow-neu-focus)',
          borderColor: 'var(--border-neu-light)',
        }
    }
  }

  return (
    <SelectPrimitive.Trigger
      ref={ref}
      className={cn(selectTriggerVariants({ size, variant }), className)}
      style={{
        ...getBaseStyle(),
        ...getVariantStyle(),
        ...(isOpen ? getFocusStyle() : {}),
      }}
      onFocus={(e) => {
        setIsOpen(true)
        Object.assign(e.target.style, getFocusStyle())
        props.onFocus?.(e)
      }}
      onBlur={(e) => {
        setIsOpen(false)
        Object.assign(e.target.style, { ...getBaseStyle(), ...getVariantStyle() })
        props.onBlur?.(e)
      }}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDown 
          className="h-4 w-4 shrink-0" 
          style={{ opacity: 0.5, color: 'var(--text-secondary)' }} 
        />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
})
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <ChevronUp className="h-4 w-4" />
  </SelectPrimitive.ScrollUpButton>
))
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <ChevronDown className="h-4 w-4" />
  </SelectPrimitive.ScrollDownButton>
))
SelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        // Standard shadcn approach - relative positioning with proper width matching
        "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border text-popover-foreground shadow-md",
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        // Use CSS class for width matching instead of inline styles
        "w-[--radix-select-trigger-width]",
        className
      )}
      style={{
        // Match neumorphic design with design tokens
        borderRadius: 'var(--radius-neu)',
        boxShadow: 'var(--shadow-neu-lg)',
        background: 'var(--neu-card)',
        border: '1px solid var(--border-neu-light)',
        color: 'var(--text-primary)',
        // Prevent scrollbar width compensation
        marginRight: '0 !important',
        transform: 'none !important',
      }}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          "p-1",
          position === "popper" &&
            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
))
SelectContent.displayName = SelectPrimitive.Content.displayName

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className)}
    {...props}
  />
))
SelectLabel.displayName = SelectPrimitive.Label.displayName

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => {
  const [isHovered, setIsHovered] = React.useState(false)
  const [isFocused, setIsFocused] = React.useState(false)

  const getItemStyle = () => ({
    color: 'var(--text-primary)',
    borderRadius: 'var(--radius-sm)',
    background: (isHovered || isFocused) ? 'var(--neu-elevated)' : 'transparent',
    transition: 'all var(--transition-default)',
  })

  return (
    <SelectPrimitive.Item
      ref={ref}
      className={cn(
        "relative flex w-full cursor-default select-none items-center py-1.5 pl-8 pr-2 text-sm outline-none",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      )}
      style={getItemStyle()}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <Check className="h-4 w-4" style={{ color: 'var(--norse-gold)' }} />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
})
SelectItem.displayName = SelectPrimitive.Item.displayName

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
))
SelectSeparator.displayName = SelectPrimitive.Separator.displayName

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
  selectTriggerVariants,
  type SelectTriggerProps,
}
