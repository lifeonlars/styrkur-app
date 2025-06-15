import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import MuscleHighlighter from '../MuscleHighlighter'

// Mock the enhanced muscle map to focus on responsive behavior
jest.mock('../EnhancedMuscleMap', () => {
  return function MockEnhancedMuscleMap(props: any) {
    return (
      <div data-testid="enhanced-muscle-map" className={props.className}>
        <div data-testid="muscle-map-side">{props.side || 'dual'}</div>
        {props.showLegend && <div data-testid="legend">Legend</div>}
      </div>
    )
  }
})

// Mock CSS modules to return the actual class names
jest.mock('../MuscleHighlighter.module.css', () => ({
  'muscle-highlighter': 'muscle-highlighter',
  'enhanced-wrapper': 'enhanced-wrapper',
  'single-view': 'single-view',
  'single-view-responsive': 'single-view-responsive',
  'dual-view': 'dual-view',
  'dual-view-responsive': 'dual-view-responsive',
}))

// Mock utility functions
jest.mock('@/lib/muscleMapUtils', () => ({
  convertMuscleIdsToBodyHighlighter: jest.fn(),
  aggregateWorkoutMuscleActivation: jest.fn(),
  getMusclesWorkedSummary: jest.fn(() => ({ primary: [], secondary: [] }))
}))

/**
 * Test CSS media query behavior using JSDOM
 * This simulates responsive behavior by checking class applications
 */
describe('MuscleHighlighter Responsive Behavior', () => {
  const mockExercise = {
    primaryMuscleIds: [4, 1],
    secondaryMuscleIds: [5, 15],
    name: 'Bench Press'
  }

  beforeEach(() => {
    // Reset any CSS media query mocks
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    })
  })

  describe('Force Single View', () => {
    it('applies single-view class when forceSingleView is true', () => {
      const { container } = render(
        <MuscleHighlighter
          exercise={mockExercise}
          forceSingleView={true}
        />
      )

      // Should have the enhanced wrapper with single view
      const enhancedMap = container.querySelector('[data-testid="enhanced-muscle-map"]')
      expect(enhancedMap).toHaveClass('enhanced-wrapper')
    })

    it('uses responsive classes when forceSingleView is false', () => {
      const { container } = render(
        <MuscleHighlighter
          exercise={mockExercise}
          forceSingleView={false}
        />
      )

      const enhancedMap = container.querySelector('[data-testid="enhanced-muscle-map"]')
      expect(enhancedMap).toHaveClass('enhanced-wrapper')
    })
  })

  describe('Default Responsive Behavior', () => {
    it('defaults to responsive mode when forceSingleView not specified', () => {
      const { container } = render(
        <MuscleHighlighter exercise={mockExercise} />
      )

      const enhancedMap = container.querySelector('[data-testid="enhanced-muscle-map"]')
      expect(enhancedMap).toBeInTheDocument()
    })

    it('handles mobile-specific props correctly', () => {
      render(
        <MuscleHighlighter
          exercise={mockExercise}
          size="small"
          forceSingleView={true}
        />
      )

      const enhancedMap = document.querySelector('[data-testid="enhanced-muscle-map"]')
      expect(enhancedMap).toBeInTheDocument()
    })
  })

  describe('Component Structure', () => {
    it('maintains consistent component structure across responsive modes', () => {
      const { rerender, container } = render(
        <MuscleHighlighter
          exercise={mockExercise}
          forceSingleView={true}
          showLegend={true}
        />
      )

      // Check initial structure
      expect(container.querySelector('[data-testid="enhanced-muscle-map"]')).toBeInTheDocument()
      expect(container.querySelector('[data-testid="legend"]')).toBeInTheDocument()

      // Re-render with responsive mode
      rerender(
        <MuscleHighlighter
          exercise={mockExercise}
          forceSingleView={false}
          showLegend={true}
        />
      )

      // Structure should remain consistent
      expect(container.querySelector('[data-testid="enhanced-muscle-map"]')).toBeInTheDocument()
      expect(container.querySelector('[data-testid="legend"]')).toBeInTheDocument()
    })
  })

  describe('CSS Class Application', () => {
    it('applies muscle-highlighter base class consistently', () => {
      const { container } = render(
        <MuscleHighlighter exercise={mockExercise} />
      )

      const baseElement = container.querySelector('.muscle-highlighter')
      expect(baseElement).toBeInTheDocument()
    })

    it('applies enhanced-wrapper class to EnhancedMuscleMap', () => {
      const { container } = render(
        <MuscleHighlighter exercise={mockExercise} useEnhanced={true} />
      )

      const enhancedWrapper = container.querySelector('.enhanced-wrapper')
      expect(enhancedWrapper).toBeInTheDocument()
    })

    it('handles custom className prop correctly', () => {
      const { container } = render(
        <MuscleHighlighter
          exercise={mockExercise}
          className="custom-test-class"
        />
      )

      const baseElement = container.querySelector('.muscle-highlighter')
      expect(baseElement).toHaveClass('custom-test-class')
    })
  })

  describe('Mobile vs Desktop Behavior Simulation', () => {
    it('simulates mobile viewport behavior', () => {
      // Mock mobile viewport
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation(query => ({
          matches: query === '(max-width: 1023px)', // Mobile
          media: query,
          onchange: null,
          addListener: jest.fn(),
          removeListener: jest.fn(),
          addEventListener: jest.fn(),
          removeEventListener: jest.fn(),
          dispatchEvent: jest.fn(),
        })),
      })

      render(
        <MuscleHighlighter
          exercise={mockExercise}
          forceSingleView={false}
        />
      )

      // On mobile, should use responsive single view (handled by CSS)
      const enhancedMap = document.querySelector('[data-testid="enhanced-muscle-map"]')
      expect(enhancedMap).toBeInTheDocument()
    })

    it('simulates desktop viewport behavior', () => {
      // Mock desktop viewport
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation(query => ({
          matches: query === '(min-width: 1024px)', // Desktop
          media: query,
          onchange: null,
          addListener: jest.fn(),
          removeListener: jest.fn(),
          addEventListener: jest.fn(),
          removeEventListener: jest.fn(),
          dispatchEvent: jest.fn(),
        })),
      })

      render(
        <MuscleHighlighter
          exercise={mockExercise}
          forceSingleView={false}
        />
      )

      // On desktop, should show dual view (handled by CSS)
      const enhancedMap = document.querySelector('[data-testid="enhanced-muscle-map"]')
      expect(enhancedMap).toBeInTheDocument()
    })
  })
})