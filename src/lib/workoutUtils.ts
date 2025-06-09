import { Workout, WorkoutEntry, ExerciseConfig } from '@/types'

export interface WorkoutMetrics {
  totalSets: number
  totalReps: number
  totalWeight: number
  exerciseNames: string[]
  hasSuperset: boolean
  hasCircuit: boolean
  groupTypes: string[]
}

export function calculateWorkoutMetrics(workout: Workout): WorkoutMetrics {
  let totalSets = 0
  let totalReps = 0
  let totalWeight = 0
  const exerciseNames: string[] = []
  let hasSuperset = false
  let hasCircuit = false
  const groupTypes: string[] = []

  // Handle new unified structure (entries)
  if (workout.entries && workout.entries.length > 0) {
    workout.entries.forEach((entry: WorkoutEntry) => {
      // Track group types
      if (entry.type === 'superset') {
        hasSuperset = true
        groupTypes.push('superset')
      } else if (entry.type === 'circuit') {
        hasCircuit = true
        groupTypes.push('circuit')
      } else {
        groupTypes.push('single')
      }

      // Calculate sets for this entry
      const entrySets = entry.sets || 1
      totalSets += entrySets

      // Process each exercise in the entry
      entry.exercises.forEach((exerciseConfig: ExerciseConfig) => {
        // Get exercise name (we'll need to look this up from exercise database)
        // For now, we'll use the exerciseId or a placeholder
        const exerciseName = exerciseConfig.exerciseId // This should be replaced with actual exercise name lookup
        if (!exerciseNames.includes(exerciseName)) {
          exerciseNames.push(exerciseName)
        }

        // Calculate reps and weight for this exercise
        const exerciseReps = exerciseConfig.reps || 0
        const exerciseWeight = exerciseConfig.weight || 0
        
        // For each set in the entry, add the reps and weight
        totalReps += entrySets * exerciseReps
        totalWeight += entrySets * exerciseReps * exerciseWeight
      })
    })
  }

  // Handle legacy structure (exercises, supersets, circuits)
  if (workout.exercises && workout.exercises.length > 0) {
    workout.exercises.forEach((exercise) => {
      totalSets += exercise.sets
      totalReps += exercise.sets * exercise.reps
      totalWeight += exercise.sets * exercise.reps * exercise.weight
      
      if (exercise.exerciseData?.name && !exerciseNames.includes(exercise.exerciseData.name)) {
        exerciseNames.push(exercise.exerciseData.name)
      }
    })
  }

  if (workout.supersets && workout.supersets.length > 0) {
    hasSuperset = true
    workout.supersets.forEach((superset) => {
      const supersetSets = superset.rounds || 1
      superset.exercises.forEach((exercise) => {
        totalSets += supersetSets
        totalReps += supersetSets * exercise.reps
        totalWeight += supersetSets * exercise.reps * exercise.weight
        
        if (exercise.exerciseData?.name && !exerciseNames.includes(exercise.exerciseData.name)) {
          exerciseNames.push(exercise.exerciseData.name)
        }
      })
    })
  }

  if (workout.circuits && workout.circuits.length > 0) {
    hasCircuit = true
    workout.circuits.forEach((circuit) => {
      const circuitSets = circuit.rounds || 1
      circuit.exercises.forEach((exercise) => {
        totalSets += circuitSets
        totalReps += circuitSets * exercise.reps
        totalWeight += circuitSets * exercise.reps * exercise.weight
        
        if (exercise.exerciseData?.name && !exerciseNames.includes(exercise.exerciseData.name)) {
          exerciseNames.push(exercise.exerciseData.name)
        }
      })
    })
  }

  return {
    totalSets,
    totalReps,
    totalWeight,
    exerciseNames,
    hasSuperset,
    hasCircuit,
    groupTypes
  }
}

export function formatWeight(weight: number): string {
  if (weight >= 1000) {
    return `${(weight / 1000).toFixed(1)}k kg`
  }
  return `${weight.toFixed(0)} kg`
}

export function getGroupTypeIcon(hasSuperset: boolean, hasCircuit: boolean): string {
  if (hasSuperset && hasCircuit) return '🔗🔄'
  if (hasSuperset) return '🔗'
  if (hasCircuit) return '🔄'
  return '💪'
}

export function getGroupTypeLabel(hasSuperset: boolean, hasCircuit: boolean): string {
  if (hasSuperset && hasCircuit) return 'Superset + Circuit'
  if (hasSuperset) return 'Superset'
  if (hasCircuit) return 'Circuit'
  return 'Standard'
}