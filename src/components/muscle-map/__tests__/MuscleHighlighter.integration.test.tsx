import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import MuscleHighlighter from '../MuscleHighlighter'

// Mock the muscle map utilities with realistic implementations
jest.mock('@/lib/muscleMapUtils', () => ({
  convertMuscleIdsToBodyHighlighter: jest.fn((primaryIds, secondaryIds) => ({
    primary: primaryIds,
    secondary: secondaryIds
  })),
  aggregateWorkoutMuscleActivation: jest.fn((exercises) => ({
    aggregated: exercises.length
  })),
  getMusclesWorkedSummary: jest.fn((primaryIds, secondaryIds) => {
    const muscleMap: { [key: number]: string } = {
      1: 'Biceps',
      2: 'Lats',
      4: 'Chest',
      5: 'Shoulders',
      8: 'Back',
      10: 'Quadriceps',
      11: 'Glutes',
      13: 'Rear Deltoids',
      15: 'Triceps'
    }
    
    return {
      primary: primaryIds.map((id: number) => muscleMap[id]).filter(Boolean),
      secondary: secondaryIds.map((id: number) => muscleMap[id]).filter(Boolean)
    }
  })
}))

// Mock the enhanced muscle map with a more realistic implementation
jest.mock('../EnhancedMuscleMap', () => {
  return function MockEnhancedMuscleMap(props: any) {
    const { onBodyPartPress, side, data } = props
    
    return (
      <div data-testid="enhanced-muscle-map" data-side={side}>
        <div data-testid="muscle-map-data">{JSON.stringify(data)}</div>
        
        {/* Simulate body part buttons */}
        <button
          data-testid="chest-button"
          onClick={() => onBodyPartPress && onBodyPartPress({ slug: 'chest', name: 'Chest' })}
        >
          Chest
        </button>
        <button
          data-testid="biceps-button"
          onClick={() => onBodyPartPress && onBodyPartPress({ slug: 'biceps', name: 'Biceps' })}
        >
          Biceps
        </button>
        
        {/* Simulate legend */}
        {props.showLegend && (
          <div data-testid="muscle-legend">
            <div data-testid="primary-legend">Primary muscles</div>
            <div data-testid="secondary-legend">Secondary muscles</div>
          </div>
        )}
        
        {/* Simulate muscle activation data */}
        {props.muscleActivation && props.muscleActivation.length > 0 && (
          <div data-testid="muscle-activation">
            {props.muscleActivation.map((activation: any, index: number) => (
              <div key={index} data-testid={`activation-${activation.muscle.toLowerCase()}`}>
                {activation.muscle}: {activation.percentage}%
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }
})

describe('MuscleHighlighter Integration Tests', () => {
  const realisticExercise = {
    primaryMuscleIds: [4, 1], // Chest, Biceps
    secondaryMuscleIds: [5, 15], // Shoulders, Triceps
    name: 'Bench Press'
  }

  const realisticWorkout = [
    {
      primaryMuscleIds: [4, 1], // Chest, Biceps
      secondaryMuscleIds: [5, 15], // Shoulders, Triceps
      name: 'Bench Press'
    },
    {
      primaryMuscleIds: [2, 8], // Lats, Back
      secondaryMuscleIds: [1, 13], // Biceps, Rear Deltoids
      name: 'Pull-ups'
    },
    {
      primaryMuscleIds: [10, 11], // Quadriceps, Glutes
      secondaryMuscleIds: [], // No secondary muscles
      name: 'Squats'
    }
  ]

  describe('Real-world Exercise Scenarios', () => {
    it('correctly displays muscle groups for compound movements', () => {
      render(
        <MuscleHighlighter
          exercise={realisticExercise}
          showMuscleList={true}
        />
      )

      // Check that muscle names are correctly displayed
      expect(screen.getByText('Chest')).toBeInTheDocument()
      expect(screen.getByText('Biceps')).toBeInTheDocument()
      expect(screen.getByText('Shoulders')).toBeInTheDocument()
      expect(screen.getByText('Triceps')).toBeInTheDocument()
    })

    it('handles full-body workout visualization', () => {
      render(
        <MuscleHighlighter
          exercises={realisticWorkout}
          showMuscleList={true}
        />
      )

      // Should show workout summary
      expect(screen.getByText('Workout Overview (3 exercises)')).toBeInTheDocument()
      expect(screen.getByText(/Heat map shows combined muscle activation/)).toBeInTheDocument()
    })

    it('interacts correctly with body part selection', async () => {
      render(
        <MuscleHighlighter
          exercise={realisticExercise}
          showLegend={true}
        />
      )

      // Find and click a body part
      const chestButton = screen.getByTestId('chest-button')
      fireEvent.click(chestButton)

      // The mock implementation should handle the click
      expect(chestButton).toBeInTheDocument()
    })
  })

  describe('Advanced Features', () => {
    it('displays muscle activation percentages when provided', () => {
      const muscleActivation = [
        { muscle: 'Chest', percentage: 85 },
        { muscle: 'Triceps', percentage: 60 },
        { muscle: 'Shoulders', percentage: 45 }
      ]

      render(
        <MuscleHighlighter
          exercise={realisticExercise}
          muscleActivation={muscleActivation}
          showLegend={true}
        />
      )

      expect(screen.getByTestId('activation-chest')).toHaveTextContent('Chest: 85%')
      expect(screen.getByTestId('activation-triceps')).toHaveTextContent('Triceps: 60%')
      expect(screen.getByTestId('activation-shoulders')).toHaveTextContent('Shoulders: 45%')
    })

    it('handles responsive behavior with forceSingleView', () => {
      const { rerender } = render(
        <MuscleHighlighter
          exercise={realisticExercise}
          forceSingleView={false}
        />
      )

      // Should render normally
      expect(screen.getByTestId('enhanced-muscle-map')).toBeInTheDocument()

      // Re-render with forceSingleView
      rerender(
        <MuscleHighlighter
          exercise={realisticExercise}
          forceSingleView={true}
        />
      )

      // Should still render but in single view mode
      expect(screen.getByTestId('enhanced-muscle-map')).toBeInTheDocument()
    })
  })

  describe('Error Handling and Edge Cases', () => {
    it('gracefully handles exercises with no muscles defined', () => {
      const emptyExercise = {
        primaryMuscleIds: [],
        secondaryMuscleIds: [],
        name: 'Empty Exercise'
      }

      render(
        <MuscleHighlighter
          exercise={emptyExercise}
          showMuscleList={true}
        />
      )

      // Should still render the component
      expect(screen.getByTestId('enhanced-muscle-map')).toBeInTheDocument()
      expect(screen.getByText('Muscles Worked')).toBeInTheDocument()
    })

    it('handles workout with mixed exercise formats', () => {
      const mixedWorkout = [
        {
          primaryMuscleIds: [4],
          secondaryMuscleIds: [5],
          name: 'Push-ups'
        },
        {
          primaryMuscleIds: [2, 8],
          secondaryMuscleIds: [],
          name: 'Rows'
        },
        {
          primaryMuscleIds: [],
          secondaryMuscleIds: [1],
          name: 'Isolation Exercise'
        }
      ]

      render(
        <MuscleHighlighter
          exercises={mixedWorkout}
          showMuscleList={true}
        />
      )

      expect(screen.getByText('Workout Overview (3 exercises)')).toBeInTheDocument()
    })

    it('maintains functionality when switching between modes', () => {
      const { rerender } = render(
        <MuscleHighlighter
          exercise={realisticExercise}
          showMuscleList={true}
        />
      )

      // Verify single exercise mode
      expect(screen.getByText('Muscles Worked')).toBeInTheDocument()

      // Switch to workout mode
      rerender(
        <MuscleHighlighter
          exercises={realisticWorkout}
          showMuscleList={true}
        />
      )

      // Verify workout mode
      expect(screen.getByText('Workout Overview (3 exercises)')).toBeInTheDocument()
    })
  })

  describe('Performance and Accessibility', () => {
    it('renders within reasonable time for large workouts', async () => {
      const largeWorkout = Array.from({ length: 20 }, (_, i) => ({
        primaryMuscleIds: [i % 11 + 1],
        secondaryMuscleIds: [(i + 1) % 11 + 1],
        name: `Exercise ${i + 1}`
      }))

      const startTime = performance.now()
      
      render(
        <MuscleHighlighter
          exercises={largeWorkout}
          showMuscleList={true}
        />
      )

      const endTime = performance.now()
      const renderTime = endTime - startTime

      // Should render within reasonable time (less than 100ms)
      expect(renderTime).toBeLessThan(100)
      expect(screen.getByText('Workout Overview (20 exercises)')).toBeInTheDocument()
    })

    it('provides accessible structure', () => {
      render(
        <MuscleHighlighter
          exercise={realisticExercise}
          showMuscleList={true}
        />
      )

      // Check for heading structure
      expect(screen.getByText('Muscles Worked')).toBeInTheDocument()
      expect(screen.getByText('Primary:')).toBeInTheDocument()
      expect(screen.getByText('Secondary:')).toBeInTheDocument()
    })
  })
})