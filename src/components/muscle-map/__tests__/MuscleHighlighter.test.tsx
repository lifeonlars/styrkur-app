import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import MuscleHighlighter from '../MuscleHighlighter'

// Mock the enhanced muscle map component
jest.mock('../EnhancedMuscleMap', () => {
  return function MockEnhancedMuscleMap(props: any) {
    return (
      <div data-testid="enhanced-muscle-map">
        <div data-testid="muscle-map-props">{JSON.stringify(props)}</div>
        {props.primaryMuscleIds && (
          <div data-testid="primary-muscles">
            Primary: {props.primaryMuscleIds.join(', ')}
          </div>
        )}
        {props.exercises && (
          <div data-testid="workout-exercises">
            Exercises: {props.exercises.length}
          </div>
        )}
      </div>
    )
  }
})

// Mock muscle map utils
jest.mock('@/lib/muscleMapUtils', () => ({
  convertMuscleIdsToBodyHighlighter: jest.fn(),
  aggregateWorkoutMuscleActivation: jest.fn(),
  getMusclesWorkedSummary: jest.fn(() => ({
    primary: ['Chest', 'Biceps'],
    secondary: ['Shoulders', 'Triceps']
  }))
}))

describe('MuscleHighlighter Component', () => {
  const mockExercise = {
    primaryMuscleIds: [4, 1], // Chest, Biceps
    secondaryMuscleIds: [5, 15], // Shoulders, Triceps
    name: 'Bench Press'
  }

  const mockExercises = [
    {
      primaryMuscleIds: [4, 1],
      secondaryMuscleIds: [5, 15],
      name: 'Bench Press'
    },
    {
      primaryMuscleIds: [2, 8],
      secondaryMuscleIds: [1, 13],
      name: 'Pull-ups'
    }
  ]

  describe('Single Exercise Mode', () => {
    it('renders single exercise muscle highlighting', () => {
      render(
        <MuscleHighlighter
          exercise={mockExercise}
          showLegend={true}
          showMuscleList={true}
        />
      )

      expect(screen.getByTestId('enhanced-muscle-map')).toBeInTheDocument()
      expect(screen.getByTestId('primary-muscles')).toHaveTextContent('Primary: 4, 1')
    })

    it('shows muscle list when showMuscleList is true', () => {
      render(
        <MuscleHighlighter
          exercise={mockExercise}
          showMuscleList={true}
        />
      )

      expect(screen.getByText('Muscles Worked')).toBeInTheDocument()
      expect(screen.getByText('Primary:')).toBeInTheDocument()
      expect(screen.getByText('Secondary:')).toBeInTheDocument()
      expect(screen.getByText('Chest')).toBeInTheDocument()
      expect(screen.getByText('Biceps')).toBeInTheDocument()
    })

    it('hides muscle list when showMuscleList is false', () => {
      render(
        <MuscleHighlighter
          exercise={mockExercise}
          showMuscleList={false}
        />
      )

      expect(screen.queryByText('Muscles Worked')).not.toBeInTheDocument()
    })

    it('passes correct props to EnhancedMuscleMap for single exercise', () => {
      render(
        <MuscleHighlighter
          exercise={mockExercise}
          showLegend={true}
          forceSingleView={true}
        />
      )

      const propsElement = screen.getByTestId('muscle-map-props')
      const props = JSON.parse(propsElement.textContent || '{}')
      
      expect(props.primaryMuscleIds).toEqual([4, 1])
      expect(props.secondaryMuscleIds).toEqual([5, 15])
      expect(props.exerciseName).toBe('Bench Press')
      expect(props.isWorkoutMode).toBe(false)
      expect(props.showLegend).toBe(true)
      expect(props.forceSingleView).toBe(true)
    })
  })

  describe('Workout Mode', () => {
    it('renders workout muscle highlighting with multiple exercises', () => {
      render(
        <MuscleHighlighter
          exercises={mockExercises}
          showLegend={true}
          showMuscleList={true}
        />
      )

      expect(screen.getByTestId('enhanced-muscle-map')).toBeInTheDocument()
      expect(screen.getByTestId('workout-exercises')).toHaveTextContent('Exercises: 2')
    })

    it('shows workout summary when showMuscleList is true', () => {
      render(
        <MuscleHighlighter
          exercises={mockExercises}
          showMuscleList={true}
        />
      )

      expect(screen.getByText('Workout Overview (2 exercises)')).toBeInTheDocument()
      expect(screen.getByText(/Heat map shows combined muscle activation/)).toBeInTheDocument()
    })

    it('passes correct props to EnhancedMuscleMap for workout mode', () => {
      render(
        <MuscleHighlighter
          exercises={mockExercises}
          showLegend={false}
          size="large"
        />
      )

      const propsElement = screen.getByTestId('muscle-map-props')
      const props = JSON.parse(propsElement.textContent || '{}')
      
      expect(props.exercises).toHaveLength(2)
      expect(props.isWorkoutMode).toBe(true)
      expect(props.showLegend).toBe(false)
      expect(props.exercises[0]).toEqual({
        primaryMuscles: [4, 1],
        secondaryMuscles: [5, 15],
        name: 'Bench Press'
      })
    })
  })

  describe('Props and Configuration', () => {
    it('applies custom className', () => {
      const { container } = render(
        <MuscleHighlighter
          exercise={mockExercise}
          className="custom-class"
        />
      )

      const muscleHighlighter = container.querySelector('.muscle-highlighter')
      expect(muscleHighlighter).toHaveClass('custom-class')
    })

    it('passes muscle activation data to EnhancedMuscleMap', () => {
      const muscleActivation = [
        { muscle: 'Chest', percentage: 85 },
        { muscle: 'Triceps', percentage: 60 }
      ]

      render(
        <MuscleHighlighter
          exercise={mockExercise}
          muscleActivation={muscleActivation}
        />
      )

      const propsElement = screen.getByTestId('muscle-map-props')
      const props = JSON.parse(propsElement.textContent || '{}')
      
      expect(props.muscleActivation).toEqual(muscleActivation)
    })

    it('defaults to enhanced version when useEnhanced is true', () => {
      render(
        <MuscleHighlighter
          exercise={mockExercise}
          useEnhanced={true}
        />
      )

      expect(screen.getByTestId('enhanced-muscle-map')).toBeInTheDocument()
    })

    it('shows fallback message when useEnhanced is false', () => {
      render(
        <MuscleHighlighter
          exercise={mockExercise}
          useEnhanced={false}
        />
      )

      expect(screen.getByText(/Basic muscle highlighter not implemented/)).toBeInTheDocument()
    })
  })

  describe('Edge Cases', () => {
    it('handles empty exercise arrays gracefully', () => {
      render(
        <MuscleHighlighter
          exercises={[]}
          showMuscleList={true}
        />
      )

      expect(screen.getByText('Workout Overview (0 exercises)')).toBeInTheDocument()
    })

    it('handles missing exercise name', () => {
      const exerciseWithoutName = {
        primaryMuscleIds: [4],
        secondaryMuscleIds: [5]
      }

      render(
        <MuscleHighlighter
          exercise={exerciseWithoutName}
        />
      )

      const propsElement = screen.getByTestId('muscle-map-props')
      const props = JSON.parse(propsElement.textContent || '{}')
      
      expect(props.exerciseName).toBeUndefined()
    })

    it('handles empty muscle arrays', () => {
      const exerciseWithoutMuscles = {
        primaryMuscleIds: [],
        secondaryMuscleIds: [],
        name: 'Test Exercise'
      }

      render(
        <MuscleHighlighter
          exercise={exerciseWithoutMuscles}
        />
      )

      const propsElement = screen.getByTestId('muscle-map-props')
      const props = JSON.parse(propsElement.textContent || '{}')
      
      expect(props.primaryMuscleIds).toEqual([])
      expect(props.secondaryMuscleIds).toEqual([])
    })
  })

  describe('Responsive Behavior', () => {
    it('passes forceSingleView prop correctly', () => {
      render(
        <MuscleHighlighter
          exercise={mockExercise}
          forceSingleView={true}
        />
      )

      const propsElement = screen.getByTestId('muscle-map-props')
      const props = JSON.parse(propsElement.textContent || '{}')
      
      expect(props.forceSingleView).toBe(true)
    })

    it('defaults forceSingleView to false', () => {
      render(
        <MuscleHighlighter
          exercise={mockExercise}
        />
      )

      const propsElement = screen.getByTestId('muscle-map-props')
      const props = JSON.parse(propsElement.textContent || '{}')
      
      expect(props.forceSingleView).toBe(false)
    })
  })
})