'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

interface TabsContextValue {
  value: string
  onValueChange: (value: string) => void
}

const TabsContext = React.createContext<TabsContextValue | null>(null)

const useTabsContext = () => {
  const context = React.useContext(TabsContext)
  if (!context) {
    throw new Error('Tabs components must be used within Tabs')
  }
  return context
}

interface TabsProps {
  value: string
  onValueChange: (value: string) => void
  children: React.ReactNode
  className?: string
}

const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  ({ value, onValueChange, children, className }, ref) => {
    return (
      <TabsContext.Provider value={{ value, onValueChange }}>
        <div ref={ref} className={cn('w-full', className)}>
          {children}
        </div>
      </TabsContext.Provider>
    )
  }
)
Tabs.displayName = 'Tabs'

interface TabsListProps {
  children: React.ReactNode
  className?: string
}

const TabsList = React.forwardRef<HTMLDivElement, TabsListProps>(
  ({ children, className }, ref) => {
    return (
      <div
        ref={ref}
        role="tablist"
        className={cn(
          'inline-flex h-12 items-center justify-start rounded-xl bg-neu-surface p-1 text-gray-400 border border-neu-light/10',
          'shadow-neu gap-1',
          className
        )}
      >
        {children}
      </div>
    )
  }
)
TabsList.displayName = 'TabsList'

interface TabsTriggerProps {
  value: string
  children: React.ReactNode
  className?: string
}

const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ value, children, className }, ref) => {
    const { value: selectedValue, onValueChange } = useTabsContext()
    const isSelected = selectedValue === value

    return (
      <button
        ref={ref}
        role="tab"
        aria-selected={isSelected}
        aria-controls={`tabpanel-${value}`}
        id={`tab-${value}`}
        onClick={() => onValueChange(value)}
        className={cn(
          'inline-flex items-center justify-center whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition-all',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
          'disabled:pointer-events-none disabled:opacity-50',
          isSelected
            ? 'bg-norse-gold text-black shadow-neu-pressed font-semibold'
            : 'text-gray-400 hover:text-white hover:bg-neu-light/30',
          className
        )}
      >
        {children}
      </button>
    )
  }
)
TabsTrigger.displayName = 'TabsTrigger'

interface TabsContentProps {
  value: string
  children: React.ReactNode
  className?: string
}

const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(
  ({ value, children, className }, ref) => {
    const { value: selectedValue } = useTabsContext()
    const isSelected = selectedValue === value

    if (!isSelected) return null

    return (
      <div
        ref={ref}
        role="tabpanel"
        id={`tabpanel-${value}`}
        aria-labelledby={`tab-${value}`}
        className={cn(
          'mt-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
          className
        )}
      >
        {children}
      </div>
    )
  }
)
TabsContent.displayName = 'TabsContent'

export { Tabs, TabsList, TabsTrigger, TabsContent }