import React from 'react'
import MuscleMap from './MuscleMap'
import { Workout, Exercise } from '@/types'

interface WorkoutMuscleMapProps {
  workout: Workout
  size?: 'small' | 'medium' | 'large'
  showBothSides?: boolean
  showLegend?: boolean
  className?: string
}

const WorkoutMuscleMap: React.FC<WorkoutMuscleMapProps> = ({
  workout,
  size = 'medium',
  showBothSides = true,
  showLegend = true,
  className = ''
}) => {
  // Extract exercises from workout structure
  const getExercisesFromWorkout = (workout: Workout): Array<{
    primaryMuscleIds: number[]
    secondaryMuscleIds: number[]
    name: string
  }> => {
    const exercises: Array<{
      primaryMuscleIds: number[]
      secondaryMuscleIds: number[]
      name: string
    }> = []

    // Handle new unified structure (entries)
    if (workout.entries && workout.entries.length > 0) {
      workout.entries.forEach(entry => {
        entry.exercises.forEach(exerciseConfig => {
          // For now, we'll need to look up the full exercise data
          // This is a placeholder - you might need to fetch exercise data
          exercises.push({
            primaryMuscleIds: [], // Would need to fetch from exercise ID
            secondaryMuscleIds: [],
            name: exerciseConfig.exerciseId
          })
        })
      })
    }

    // Handle legacy structure
    if (workout.exercises && workout.exercises.length > 0) {
      workout.exercises.forEach(exercise => {
        if (exercise.exerciseData) {
          exercises.push({
            primaryMuscleIds: exercise.exerciseData.primaryMuscleIds || [],
            secondaryMuscleIds: exercise.exerciseData.secondaryMuscleIds || [],
            name: exercise.exerciseData.name
          })
        }
      })
    }

    // Handle supersets
    if (workout.supersets && workout.supersets.length > 0) {
      workout.supersets.forEach(superset => {
        superset.exercises.forEach(exercise => {
          if (exercise.exerciseData) {
            exercises.push({
              primaryMuscleIds: exercise.exerciseData.primaryMuscleIds || [],
              secondaryMuscleIds: exercise.exerciseData.secondaryMuscleIds || [],
              name: exercise.exerciseData.name
            })
          }
        })
      })
    }

    // Handle circuits
    if (workout.circuits && workout.circuits.length > 0) {
      workout.circuits.forEach(circuit => {
        circuit.exercises.forEach(exercise => {
          if (exercise.exerciseData) {
            exercises.push({
              primaryMuscleIds: exercise.exerciseData.primaryMuscleIds || [],
              secondaryMuscleIds: exercise.exerciseData.secondaryMuscleIds || [],
              name: exercise.exerciseData.name
            })
          }
        })
      })
    }

    return exercises
  }

  const exercises = getExercisesFromWorkout(workout)
  const exerciseCount = exercises.length

  return (
    <div className={`workout-muscle-map ${className}`}>
      <div className="mb-4">
        <h3 className="text-white font-heading font-medium text-lg mb-1">{workout.title}</h3>
        <p className="text-gray-400 text-sm">
          {exerciseCount} exercise{exerciseCount !== 1 ? 's' : ''} • Muscle activation heat map
        </p>
      </div>
      
      {exercises.length > 0 ? (
        <MuscleMap
          exercises={exercises}
          showFront={showBothSides}
          showBack={showBothSides}
          showLegend={showLegend}
          showMuscleList={true}
          size={size}
          useEnhanced={true}
          exerciseName={workout.title}
        />
      ) : (
        <div className="bg-neu-card shadow-neu-raised rounded-lg p-6 text-center">
          <div className="text-2xl mb-2">💪</div>
          <p className="text-gray-400 text-sm">
            No exercises found in this workout
          </p>
        </div>
      )}
    </div>
  )
}

export default WorkoutMuscleMap