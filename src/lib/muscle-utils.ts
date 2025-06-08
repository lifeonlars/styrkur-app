/**
 * Utility functions for working with WGER muscle data
 * This file demonstrates how to use the improved muscle filtering system
 */

import { MuscleGroup } from '@/types'
import { WgerMuscle } from './wger'
import { mapMuscleIdToGroup, getExerciseMuscleGroup, fetchMuscles } from './wger'

/**
 * Demo function showing how to fetch and categorize muscles from WGER API
 */
export async function demonstrateMuscleGrouping() {
  console.log('🏋️ Styrkurheim Muscle Grouping Demo')
  console.log('=====================================')
  
  try {
    // Fetch muscles from real WGER API
    const muscles = await fetchMuscles()
    console.log(`Fetched ${muscles.length} muscles from WGER API`)
    
    // Group muscles by our custom categories
    const musclesByGroup: Record<MuscleGroup, WgerMuscle[]> = {
      'chest': [],
      'back': [],
      'shoulders': [],
      'arms': [],
      'legs': [],
      'core': [],
      'full-body': []
    }
    
    muscles.forEach(muscle => {
      const group = mapMuscleIdToGroup(muscle.id)
      musclesByGroup[group].push(muscle)
    })
    
    // Display grouped results
    Object.entries(musclesByGroup).forEach(([group, muscles]) => {
      if (muscles.length > 0) {
        console.log(`\n${group.toUpperCase()}:`)
        muscles.forEach(muscle => {
          console.log(`  - ${muscle.name_en || muscle.name} (ID: ${muscle.id})`)
        })
      }
    })
    
    return musclesByGroup
    
  } catch (error) {
    console.error('Failed to fetch muscles:', error)
    return null
  }
}

/**
 * Example: Determine muscle group for different exercise configurations
 */
export function demonstrateExerciseGrouping() {
  console.log('\n🎯 Exercise Muscle Group Examples')
  console.log('=================================')
  
  const examples = [
    {
      name: 'Bench Press',
      primaryMuscles: [4], // Pectoralis major
      secondaryMuscles: [5, 2], // Triceps, anterior deltoid
    },
    {
      name: 'Pull-ups',
      primaryMuscles: [12], // Latissimus dorsi
      secondaryMuscles: [1], // Biceps
    },
    {
      name: 'Squats',
      primaryMuscles: [10], // Quadriceps
      secondaryMuscles: [8], // Glutes
    },
    {
      name: 'Deadlift',
      primaryMuscles: [12, 8, 10], // Lats, glutes, quads
      secondaryMuscles: [9], // Trapezius
    },
    {
      name: 'Burpees',
      primaryMuscles: [4, 10, 6], // Chest, quads, abs
      secondaryMuscles: [5, 8], // Triceps, glutes
    }
  ]
  
  examples.forEach(exercise => {
    const group = getExerciseMuscleGroup(exercise.primaryMuscles, exercise.secondaryMuscles)
    console.log(`${exercise.name}: ${group}`)
    console.log(`  Primary muscles: ${exercise.primaryMuscles.join(', ')}`)
    console.log(`  Secondary muscles: ${exercise.secondaryMuscles.join(', ')}`)
  })
}

/**
 * Utility to get muscle group statistics from a list of exercises
 */
export function getMuscleGroupStats(exercises: { muscleGroup: MuscleGroup }[]) {
  const stats: Record<MuscleGroup, number> = {
    'chest': 0,
    'back': 0,
    'shoulders': 0,
    'arms': 0,
    'legs': 0,
    'core': 0,
    'full-body': 0
  }
  
  exercises.forEach(exercise => {
    if (exercise.muscleGroup && exercise.muscleGroup in stats) {
      stats[exercise.muscleGroup]++
    }
  })
  
  return stats
}

/**
 * Filter exercises by muscle group with optional search
 */
export function filterExercisesByMuscleGroup(
  exercises: { 
    muscleGroup: MuscleGroup
    name: string
    primaryMuscles: string[]
    equipment: string
  }[], 
  muscleGroup: MuscleGroup | 'all',
  searchTerm?: string
) {
  let filtered = exercises
  
  // Filter by muscle group
  if (muscleGroup !== 'all') {
    filtered = filtered.filter(ex => ex.muscleGroup === muscleGroup)
  }
  
  // Apply search filter
  if (searchTerm && searchTerm.length > 0) {
    const term = searchTerm.toLowerCase()
    filtered = filtered.filter(ex =>
      ex.name.toLowerCase().includes(term) ||
      ex.primaryMuscles.some((muscle: string) => muscle.toLowerCase().includes(term)) ||
      ex.equipment.toLowerCase().includes(term)
    )
  }
  
  return filtered
}

/**
 * Create a workout recommendation based on muscle group balance
 */
export function recommendWorkoutBalance(exercises: { muscleGroup: MuscleGroup }[]) {
  const stats = getMuscleGroupStats(exercises)
  const recommendations: string[] = []
  
  const totalExercises = Object.values(stats).reduce((sum, count) => sum + count, 0)
  
  if (totalExercises === 0) {
    return ['Add some exercises to get started!']
  }
  
  // Check for muscle group balance
  if (stats.chest > 0 && stats.back === 0) {
    recommendations.push('Consider adding back exercises to balance your chest work')
  }
  
  if (stats.legs === 0 && totalExercises > 2) {
    recommendations.push('Add leg exercises for a more complete workout')
  }
  
  if (stats.core === 0 && totalExercises > 3) {
    recommendations.push('Include core exercises for stability and strength')
  }
  
  if (stats['full-body'] === 0 && totalExercises > 4) {
    recommendations.push('Try adding a compound full-body movement')
  }
  
  if (recommendations.length === 0) {
    recommendations.push('Great muscle group balance! 💪')
  }
  
  return recommendations
}

// Export for easy testing
export const muscleGroupingExamples = {
  demonstrateMuscleGrouping,
  demonstrateExerciseGrouping,
  getMuscleGroupStats,
  filterExercisesByMuscleGroup,
  recommendWorkoutBalance
}