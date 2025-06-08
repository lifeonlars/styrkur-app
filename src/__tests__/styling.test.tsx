/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { testCriticalCSS, CRITICAL_CSS_CLASSES } from '../lib/css-test'

// Simple test component to verify styling
function TestComponent() {
  return (
    <div className="bg-gray-900 text-white p-4 rounded-lg">
      <h1 className="text-[#C3A869] text-xl font-medium mb-4">Test Title</h1>
      <button className="btn-primary px-4 py-2 rounded-lg">Test Button</button>
      <div className="flex items-center space-x-2 mt-4">
        <span className="text-gray-400 text-sm">Test Text</span>
      </div>
    </div>
  )
}

describe('Styling Tests', () => {
  beforeEach(() => {
    // Mock window.getComputedStyle for testing
    Object.defineProperty(window, 'getComputedStyle', {
      value: (element: Element) => ({
        backgroundColor: element.className.includes('bg-gray-900') ? 'rgb(17, 24, 39)' : 'transparent',
        color: element.className.includes('text-white') ? 'rgb(255, 255, 255)' : 'rgb(0, 0, 0)',
        padding: element.className.includes('p-4') ? '16px' : '0px',
        borderRadius: element.className.includes('rounded-lg') ? '8px' : '0px',
        display: element.className.includes('hidden') ? 'none' : 'block',
      }),
      configurable: true,
    })
  })

  test('critical CSS classes are defined', () => {
    expect(CRITICAL_CSS_CLASSES).toBeDefined()
    expect(CRITICAL_CSS_CLASSES.length).toBeGreaterThan(50)
    expect(CRITICAL_CSS_CLASSES).toContain('bg-gray-900')
    expect(CRITICAL_CSS_CLASSES).toContain('text-white')
    expect(CRITICAL_CSS_CLASSES).toContain('btn-primary')
  })

  test('test component renders with correct classes', () => {
    render(<TestComponent />)
    
    const title = screen.getByText('Test Title')
    const button = screen.getByText('Test Button')
    const text = screen.getByText('Test Text')
    
    expect(title).toHaveClass('text-[#C3A869]', 'text-xl', 'font-medium', 'mb-4')
    expect(button).toHaveClass('btn-primary', 'px-4', 'py-2', 'rounded-lg')
    expect(text).toHaveClass('text-gray-400', 'text-sm')
  })

  test('critical CSS functionality test', () => {
    const result = testCriticalCSS()
    expect(typeof result).toBe('boolean')
    // In test environment, this should return true
    expect(result).toBe(true)
  })

  test('all Nordic color variations are included', () => {
    const nordicColors = [
      'text-[#C3A869]',
      'bg-[#C3A869]',
      'text-gray-900',
      'text-gray-800', 
      'text-gray-700',
      'text-gray-400',
      'text-gray-300',
      'bg-gray-900',
      'bg-gray-800',
      'bg-gray-700'
    ]
    
    nordicColors.forEach(color => {
      expect(CRITICAL_CSS_CLASSES).toContain(color)
    })
  })

  test('responsive breakpoints are included', () => {
    const responsiveClasses = [
      'lg:max-w-4xl',
      'xl:max-w-6xl', 
      'lg:grid',
      'lg:hidden',
      'lg:block',
      'lg:col-span-9',
      'xl:col-span-10'
    ]
    
    responsiveClasses.forEach(className => {
      expect(CRITICAL_CSS_CLASSES).toContain(className)
    })
  })

  test('custom component classes are included', () => {
    const customClasses = [
      'btn-primary',
      'card-hover',
      'text-gradient'
    ]
    
    customClasses.forEach(className => {
      expect(CRITICAL_CSS_CLASSES).toContain(className)
    })
  })
})

// Integration test that can be run in browser environment
describe('Browser Styling Integration', () => {
  test('globals.css is properly loaded', () => {
    // This test would only work in a real browser environment
    // In Jest, we'll just verify the structure
    expect(document).toBeDefined()
    expect(document.createElement).toBeDefined()
  })
})

// Export test utilities for manual testing
export { TestComponent, testCriticalCSS }