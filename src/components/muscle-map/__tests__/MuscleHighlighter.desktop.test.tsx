import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import MuscleHighlighter from '../MuscleHighlighter'

// Mock EnhancedMuscleMap to test desktop dual view layout
jest.mock('../EnhancedMuscleMap', () => {
  return function MockEnhancedMuscleMap(props: any) {
    return (
      <div 
        data-testid="enhanced-muscle-map" 
        className={props.className}
        data-force-single={props.forceSingleView}
      >
        {/* Mock dual view structure when not forced single */}
        {!props.forceSingleView && (
          <div data-testid="dual-view-container" className="dual-view-responsive">
            <div data-testid="body-views" className="body-views">
              <div data-testid="front-view" className="body-view">
                Front Body (scale: {props.scale || 0.7})
              </div>
              <div data-testid="back-view" className="body-view">
                Back Body (scale: {props.scale || 0.7})
              </div>
            </div>
          </div>
        )}
        
        {/* Mock single view structure when forced single */}
        {props.forceSingleView && (
          <div data-testid="single-view-container" className="single-view">
            <div data-testid="body-views" className="body-views">
              <div data-testid="single-body-view" className="body-view">
                Single Body - {props.side || 'front'} (scale: {props.scale || 0.8})
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
})

// Mock CSS modules with responsive classes
jest.mock('../MuscleHighlighter.module.css', () => ({
  'muscle-highlighter': 'muscle-highlighter',
  'enhanced-wrapper': 'enhanced-wrapper',
  'body-views': 'body-views',
  'body-view': 'body-view',
  'body-view-small': 'body-view-small',
  'body-view-medium': 'body-view-medium',
  'body-view-large': 'body-view-large',
  'single-view': 'single-view',
  'single-view-responsive': 'single-view-responsive',
  'dual-view-responsive': 'dual-view-responsive',
}))

// Mock utils
jest.mock('@/lib/muscleMapUtils', () => ({
  convertMuscleIdsToBodyHighlighter: jest.fn(),
  aggregateWorkoutMuscleActivation: jest.fn(),
  getMusclesWorkedSummary: jest.fn(() => ({ primary: [], secondary: [] }))
}))

describe('MuscleHighlighter Desktop Dual View', () => {
  const mockExercise = {
    primaryMuscleIds: [4, 1],
    secondaryMuscleIds: [5, 15],
    name: 'Bench Press'
  }

  // Mock window.matchMedia for desktop testing
  beforeEach(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: query.includes('min-width: 1024px'), // Desktop
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    })
  })

  describe('Desktop Dual View Layout', () => {
    it('shows dual view on desktop when not forced single', () => {
      render(
        <MuscleHighlighter
          exercise={mockExercise}
          forceSingleView={false}
        />
      )

      const enhancedMap = screen.getByTestId('enhanced-muscle-map')
      expect(enhancedMap).toHaveAttribute('data-force-single', 'false')
      
      // Should have dual view container
      expect(screen.getByTestId('dual-view-container')).toBeInTheDocument()
      expect(screen.getByTestId('body-views')).toBeInTheDocument()
      expect(screen.getByTestId('front-view')).toBeInTheDocument()
      expect(screen.getByTestId('back-view')).toBeInTheDocument()
    })

    it('applies proper CSS classes for dual view layout', () => {
      const { container } = render(
        <MuscleHighlighter
          exercise={mockExercise}
          forceSingleView={false}
        />
      )

      const bodyViews = container.querySelector('.body-views')
      expect(bodyViews).toBeInTheDocument()

      const bodyViewElements = container.querySelectorAll('.body-view')
      expect(bodyViewElements).toHaveLength(2) // Front and back views
    })

    it('maintains proper structure for different sizes', () => {
      const sizes = ['small', 'medium', 'large'] as const

      sizes.forEach(size => {
        const { container, unmount } = render(
          <MuscleHighlighter
            exercise={mockExercise}
            size={size}
            forceSingleView={false}
          />
        )

        expect(container.querySelector('.body-views')).toBeInTheDocument()
        const bodyViews = container.querySelectorAll('.body-view')
        expect(bodyViews).toHaveLength(2)

        unmount()
      })
    })
  })

  describe('Single View Mode (Forced)', () => {
    it('shows single view when forceSingleView is true', () => {
      render(
        <MuscleHighlighter
          exercise={mockExercise}
          forceSingleView={true}
        />
      )

      const enhancedMap = screen.getByTestId('enhanced-muscle-map')
      expect(enhancedMap).toHaveAttribute('data-force-single', 'true')
      
      // Should have single view container
      expect(screen.getByTestId('single-view-container')).toBeInTheDocument()
      expect(screen.getByTestId('single-body-view')).toBeInTheDocument()
      
      // Should NOT have dual view elements
      expect(screen.queryByTestId('dual-view-container')).not.toBeInTheDocument()
      expect(screen.queryByTestId('front-view')).not.toBeInTheDocument()
      expect(screen.queryByTestId('back-view')).not.toBeInTheDocument()
    })

    it('applies proper CSS classes for single view', () => {
      const { container } = render(
        <MuscleHighlighter
          exercise={mockExercise}
          forceSingleView={true}
        />
      )

      const bodyViews = container.querySelector('.body-views')
      expect(bodyViews).toBeInTheDocument()

      const bodyViewElements = container.querySelectorAll('.body-view')
      expect(bodyViewElements).toHaveLength(1) // Only single view
    })
  })

  describe('Responsive Behavior', () => {
    it('handles workout mode with dual view properly', () => {
      const exercises = [
        mockExercise,
        {
          primaryMuscleIds: [2, 8],
          secondaryMuscleIds: [1, 13],
          name: 'Pull-ups'
        }
      ]

      render(
        <MuscleHighlighter
          exercises={exercises}
          forceSingleView={false}
        />
      )

      // Should show dual view for workout mode too
      expect(screen.getByTestId('dual-view-container')).toBeInTheDocument()
      expect(screen.getByTestId('front-view')).toBeInTheDocument()
      expect(screen.getByTestId('back-view')).toBeInTheDocument()
    })

    it('maintains layout consistency across mode switches', () => {
      const { rerender } = render(
        <MuscleHighlighter
          exercise={mockExercise}
          forceSingleView={false}
        />
      )

      // Initial dual view
      expect(screen.getByTestId('dual-view-container')).toBeInTheDocument()

      // Switch to forced single view
      rerender(
        <MuscleHighlighter
          exercise={mockExercise}
          forceSingleView={true}
        />
      )

      expect(screen.getByTestId('single-view-container')).toBeInTheDocument()
      expect(screen.queryByTestId('dual-view-container')).not.toBeInTheDocument()

      // Switch back to dual view
      rerender(
        <MuscleHighlighter
          exercise={mockExercise}
          forceSingleView={false}
        />
      )

      expect(screen.getByTestId('dual-view-container')).toBeInTheDocument()
      expect(screen.queryByTestId('single-view-container')).not.toBeInTheDocument()
    })
  })

  describe('Layout Stability', () => {
    it('handles container overflow gracefully', () => {
      // Test with large size that might cause overflow
      const { container } = render(
        <MuscleHighlighter
          exercise={mockExercise}
          size="large"
          forceSingleView={false}
        />
      )

      const bodyViews = container.querySelector('.body-views')
      expect(bodyViews).toBeInTheDocument()
      
      // Should still have both views even with large size
      const bodyViewElements = container.querySelectorAll('.body-view')
      expect(bodyViewElements).toHaveLength(2)
    })

    it('applies correct scaling for dual view', () => {
      render(
        <MuscleHighlighter
          exercise={mockExercise}
          forceSingleView={false}
        />
      )

      // Mock should show the scale value used for dual view
      expect(screen.getByText(/scale: 0\.7/)).toBeInTheDocument()
    })

    it('applies correct scaling for single view', () => {
      render(
        <MuscleHighlighter
          exercise={mockExercise}
          forceSingleView={true}
        />
      )

      // Mock should show the scale value used for single view
      expect(screen.getByText(/scale: 0\.8/)).toBeInTheDocument()
    })
  })
})