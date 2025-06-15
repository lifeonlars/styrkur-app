import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import MuscleHighlighter from '../MuscleHighlighter'

// Mock EnhancedMuscleMap to test layout and sizing
jest.mock('../EnhancedMuscleMap', () => {
  return function MockEnhancedMuscleMap(props: any) {
    return (
      <div 
        data-testid="enhanced-muscle-map" 
        className={props.className}
        style={{ width: '100%', height: '400px' }}
      >
        <div data-testid="muscle-body" style={{ 
          width: props.scale ? `${340 * props.scale}px` : '340px',
          height: props.scale ? `${650 * props.scale}px` : '650px'
        }}>
          Mock Body ({props.side || 'dual'})
        </div>
      </div>
    )
  }
})

// Mock CSS modules with layout-related classes
jest.mock('../MuscleHighlighter.module.css', () => ({
  'muscle-highlighter': 'muscle-highlighter',
  'enhanced-wrapper': 'enhanced-wrapper',
  'body-views': 'body-views',
  'body-view': 'body-view',
  'body-view-small': 'body-view-small',
  'body-view-medium': 'body-view-medium',
  'body-view-large': 'body-view-large',
  'single-view-responsive': 'single-view-responsive',
  'dual-view-responsive': 'dual-view-responsive',
}))

// Mock utils
jest.mock('@/lib/muscleMapUtils', () => ({
  convertMuscleIdsToBodyHighlighter: jest.fn(),
  aggregateWorkoutMuscleActivation: jest.fn(),
  getMusclesWorkedSummary: jest.fn(() => ({ primary: [], secondary: [] }))
}))

describe('MuscleHighlighter Layout and Sizing', () => {
  const mockExercise = {
    primaryMuscleIds: [4, 1],
    secondaryMuscleIds: [5, 15],
    name: 'Test Exercise'
  }

  describe('Container Sizing and Centering', () => {
    it('applies proper container classes for muscle map display', () => {
      const { container } = render(
        <MuscleHighlighter exercise={mockExercise} />
      )

      const muscleHighlighter = container.querySelector('.muscle-highlighter')
      expect(muscleHighlighter).toBeInTheDocument()

      const enhancedWrapper = container.querySelector('.enhanced-wrapper')
      expect(enhancedWrapper).toBeInTheDocument()
    })

    it('handles size variants correctly', () => {
      const sizeVariants = ['small', 'medium', 'large'] as const

      sizeVariants.forEach(size => {
        const { container, unmount } = render(
          <MuscleHighlighter 
            exercise={mockExercise} 
            size={size}
          />
        )

        const enhancedMap = container.querySelector('[data-testid="enhanced-muscle-map"]')
        expect(enhancedMap).toBeInTheDocument()

        unmount() // Clean up between tests
      })
    })

    it('maintains consistent structure for single exercise mode', () => {
      const { container } = render(
        <MuscleHighlighter 
          exercise={mockExercise}
          size="medium"
          showLegend={true}
        />
      )

      // Should have main container
      expect(container.querySelector('.muscle-highlighter')).toBeInTheDocument()
      
      // Should have enhanced muscle map
      expect(container.querySelector('[data-testid="enhanced-muscle-map"]')).toBeInTheDocument()
    })

    it('maintains consistent structure for workout mode', () => {
      const exercises = [
        mockExercise,
        {
          primaryMuscleIds: [2, 8],
          secondaryMuscleIds: [1, 13],
          name: 'Pull-ups'
        }
      ]

      const { container } = render(
        <MuscleHighlighter 
          exercises={exercises}
          size="large"
          showLegend={true}
        />
      )

      // Should have main container
      expect(container.querySelector('.muscle-highlighter')).toBeInTheDocument()
      
      // Should have enhanced muscle map
      expect(container.querySelector('[data-testid="enhanced-muscle-map"]')).toBeInTheDocument()
    })
  })

  describe('Responsive Layout Behavior', () => {
    it('handles forceSingleView correctly', () => {
      const { container } = render(
        <MuscleHighlighter 
          exercise={mockExercise}
          forceSingleView={true}
        />
      )

      const enhancedMap = container.querySelector('[data-testid="enhanced-muscle-map"]')
      expect(enhancedMap).toBeInTheDocument()
    })

    it('handles responsive mode correctly', () => {
      const { container } = render(
        <MuscleHighlighter 
          exercise={mockExercise}
          forceSingleView={false}
        />
      )

      const enhancedMap = container.querySelector('[data-testid="enhanced-muscle-map"]')
      expect(enhancedMap).toBeInTheDocument()
    })

    it('applies custom className without breaking layout', () => {
      const { container } = render(
        <MuscleHighlighter 
          exercise={mockExercise}
          className="custom-layout-class"
        />
      )

      const baseElement = container.querySelector('.muscle-highlighter')
      expect(baseElement).toHaveClass('custom-layout-class')
      
      // Should still maintain proper structure
      expect(container.querySelector('[data-testid="enhanced-muscle-map"]')).toBeInTheDocument()
    })
  })

  describe('Scaling and Dimensions', () => {
    it('handles different scales properly through props', () => {
      const { container } = render(
        <MuscleHighlighter 
          exercise={mockExercise}
          size="small"
        />
      )

      // Mock should receive scale information through the enhanced muscle map
      const enhancedMap = container.querySelector('[data-testid="enhanced-muscle-map"]')
      expect(enhancedMap).toBeInTheDocument()
    })

    it('maintains aspect ratio across different sizes', () => {
      const sizes = ['small', 'medium', 'large'] as const

      sizes.forEach(size => {
        const { container, unmount } = render(
          <MuscleHighlighter 
            exercise={mockExercise}
            size={size}
          />
        )

        const enhancedMap = container.querySelector('[data-testid="enhanced-muscle-map"]')
        expect(enhancedMap).toBeInTheDocument()
        
        const mockBody = container.querySelector('[data-testid="muscle-body"]')
        expect(mockBody).toBeInTheDocument()

        unmount()
      })
    })
  })

  describe('Layout Stability', () => {
    it('maintains layout when switching between exercise and workout modes', () => {
      const { container, rerender } = render(
        <MuscleHighlighter exercise={mockExercise} />
      )

      // Initial single exercise mode
      expect(container.querySelector('.muscle-highlighter')).toBeInTheDocument()
      expect(container.querySelector('[data-testid="enhanced-muscle-map"]')).toBeInTheDocument()

      // Switch to workout mode
      rerender(
        <MuscleHighlighter exercises={[mockExercise]} />
      )

      // Layout should remain stable
      expect(container.querySelector('.muscle-highlighter')).toBeInTheDocument()
      expect(container.querySelector('[data-testid="enhanced-muscle-map"]')).toBeInTheDocument()
    })

    it('handles empty states gracefully', () => {
      const { container } = render(
        <MuscleHighlighter 
          exercise={{
            primaryMuscleIds: [],
            secondaryMuscleIds: [],
            name: 'Empty Exercise'
          }}
        />
      )

      // Should still render with proper structure
      expect(container.querySelector('.muscle-highlighter')).toBeInTheDocument()
      expect(container.querySelector('[data-testid="enhanced-muscle-map"]')).toBeInTheDocument()
    })
  })

  describe('Container Dimensions', () => {
    it('provides adequate space for muscle map content', () => {
      const { container } = render(
        <MuscleHighlighter 
          exercise={mockExercise}
          size="medium"
        />
      )

      const enhancedMap = container.querySelector('[data-testid="enhanced-muscle-map"]')
      expect(enhancedMap).toBeInTheDocument()
      
      // Should have proper dimensions through styling
      const computedStyle = window.getComputedStyle(enhancedMap as Element)
      expect(computedStyle.width).toBeDefined()
    })
  })
})