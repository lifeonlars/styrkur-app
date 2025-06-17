"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, toast } from "sonner"
import { cn } from "@/lib/utils"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast: cn(
            // Base toast styling with neumorphic design
            "group toast group-[.toaster]:shadow-lg group-[.toaster]:pointer-events-auto",
            "group-[.toaster]:relative group-[.toaster]:flex group-[.toaster]:w-full",
            "group-[.toaster]:items-center group-[.toaster]:justify-start",
            "group-[.toaster]:space-x-4 group-[.toaster]:overflow-hidden group-[.toaster]:p-4",
            "group-[.toaster]:pr-8 group-[.toaster]:transition-all group-[.toaster]:border",
            "group-[.toaster]:text-left"
          ),
          description: "group-[.toast]:text-sm group-[.toast]:opacity-90",
          actionButton: cn(
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
            "group-[.toast]:hover:bg-primary/90"
          ),
          cancelButton: cn(
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
            "group-[.toast]:hover:bg-muted/80"
          ),
        },
        style: {
          background: 'var(--neu-card)',
          borderRadius: 'var(--radius-neu)',
          boxShadow: 'var(--shadow-neu-lg)',
          border: '1px solid var(--border-neu-light)',
          color: 'var(--text-primary)',
        },
      }}
      {...props}
    />
  )
}

// Toast variants for different states with Norse design
export const showToast = {
  success: (message: string) => toast.success(message, {
    style: {
      background: 'var(--neu-card)',
      border: '2px solid var(--forest-400)',
      borderLeft: '8px solid var(--forest-400)',
      color: 'var(--text-primary)',
      borderRadius: 'var(--radius-neu)',
      boxShadow: 'var(--shadow-neu-lg)',
      textAlign: 'left',
    },
  }),
  error: (message: string) => toast.error(message, {
    style: {
      background: 'var(--neu-card)',
      border: '2px solid var(--blood-400)',
      borderLeft: '8px solid var(--blood-400)',
      color: 'var(--text-primary)',
      borderRadius: 'var(--radius-neu)',
      boxShadow: 'var(--shadow-neu-lg)',
      textAlign: 'left',
    },
  }),
  warning: (message: string) => toast.warning(message, {
    style: {
      background: 'var(--neu-card)',
      border: '2px solid var(--wood-400)',
      borderLeft: '8px solid var(--wood-400)',
      color: 'var(--text-primary)',
      borderRadius: 'var(--radius-neu)',
      boxShadow: 'var(--shadow-neu-lg)',
      textAlign: 'left',
    },
  }),
  info: (message: string) => toast.info(message, {
    style: {
      background: 'var(--neu-card)',
      border: '2px solid var(--ocean-400)',
      borderLeft: '8px solid var(--ocean-400)',
      color: 'var(--text-primary)',
      borderRadius: 'var(--radius-neu)',
      boxShadow: 'var(--shadow-neu-lg)',
      textAlign: 'left',
    },
  }),
  default: (message: string) => toast(message, {
    style: {
      background: 'var(--neu-card)',
      border: '1px solid var(--border-neu-light)',
      color: 'var(--text-primary)',
      borderRadius: 'var(--radius-neu)',
      boxShadow: 'var(--shadow-neu-lg)',
      textAlign: 'left',
    },
  }),
}

export { Toaster }
