/**
 * CSS Test Utility
 * This file ensures all critical CSS classes are included in the build
 * by importing them explicitly to prevent Tailwind purging
 */

// Export all critical CSS classes used in the app
export const CRITICAL_CSS_CLASSES = [
  // Layout classes
  'min-h-screen',
  'bg-gray-900',
  'text-white',
  'flex',
  'flex-col',
  'flex-1',
  'w-full',
  'max-w-md',
  'mx-auto',
  'lg:max-w-4xl',
  'xl:max-w-6xl',
  
  // Grid and responsive
  'lg:grid',
  'lg:grid-cols-12',
  'lg:gap-6',
  'lg:col-span-9',
  'xl:col-span-10',
  'lg:col-span-3',
  'xl:col-span-2',
  'hidden',
  'lg:hidden',
  'lg:block',
  
  // Colors and theme
  'bg-gray-800',
  'bg-gray-700',
  'bg-gray-600',
  'text-gray-400',
  'text-gray-300',
  'text-[#C3A869]',
  'border-gray-800',
  'border-gray-700',
  
  // Buttons and interactions
  'btn-primary',
  'hover:bg-gray-600',
  'hover:text-white',
  'hover:bg-gray-700',
  'transition-colors',
  'cursor-pointer',
  
  // Spacing
  'p-4',
  'p-6',
  'mb-2',
  'mb-4',
  'mt-2',
  'space-y-4',
  'gap-2',
  'gap-4',
  
  // Borders and shapes
  'rounded-lg',
  'rounded-xl',
  'rounded-full',
  'border',
  'border-l',
  'border-b',
  
  // Typography
  'font-medium',
  'font-light',
  'text-sm',
  'text-xs',
  'text-xl',
  'text-2xl',
  
  // Positioning
  'fixed',
  'absolute',
  'relative',
  'top-0',
  'left-0',
  'right-0',
  'bottom-6',
  'z-40',
  'z-50',
  
  // Flex and grid items
  'items-center',
  'justify-center',
  'justify-between',
  'space-x-2',
  'space-x-6',
  'space-x-8',
  
  // Custom classes
  'card-hover',
  'text-gradient',
  'animate-spin',
  
  // Form elements
  'placeholder-gray-400',
  'focus:outline-none',
  'focus:ring-2',
  'focus:ring-primary',
  'focus:ring-[#C3A869]',
  
  // Specific component classes
  'overflow-y-auto',
  'overflow-x-auto',
  'pb-20',
  'lg:pb-0',
  'lg:pt-24',
  'min-w-0',
  'text-center',
  'whitespace-nowrap'
] as const

// Test function to verify CSS classes are working
export function testCriticalCSS(): boolean {
  if (typeof window === 'undefined') {
    return true // Server-side, assume OK
  }
  
  try {
    // Create test element
    const testEl = document.createElement('div')
    testEl.className = 'bg-gray-900 text-white p-4 rounded-lg hidden'
    document.body.appendChild(testEl)
    
    // Get computed styles
    const styles = window.getComputedStyle(testEl)
    const bgColor = styles.backgroundColor
    const color = styles.color
    const padding = styles.padding
    const borderRadius = styles.borderRadius
    const display = styles.display
    
    // Clean up
    document.body.removeChild(testEl)
    
    // Verify styles are applied
    const hasBackground = Boolean(bgColor && bgColor !== 'rgba(0, 0, 0, 0)' && bgColor !== 'transparent')
    const hasTextColor = Boolean(color && color !== 'rgba(0, 0, 0, 0)' && color !== 'transparent')
    const hasPadding = Boolean(padding && padding !== '0px')
    const hasRadius = Boolean(borderRadius && borderRadius !== '0px')
    const isHidden = display === 'none'
    
    console.log('CSS Test Results:', {
      backgroundColor: bgColor,
      textColor: color,
      padding,
      borderRadius,
      display,
      allWorking: hasBackground && hasTextColor && hasPadding && hasRadius && isHidden
    })
    
    return hasBackground && hasTextColor && hasPadding && hasRadius && isHidden
    
  } catch (error) {
    console.error('CSS test failed:', error)
    return false
  }
}

// Function to force include all classes in build
export function forceIncludeClasses(): string {
  return CRITICAL_CSS_CLASSES.join(' ')
}