// Migration and Compatibility Layer - Phase 1B
// Handles migration from existing WorkoutEntry to EnhancedWorkoutEntry
// Ensures backwards compatibility with existing workout data

import { 
  WorkoutEntry, 
  Workout, 
  ExerciseConfig,
  TimingStyle
} from '../types'
import {
  EnhancedWorkoutEntry,
  EnhancedExerciseConfig,
  ExecutionStyleConfig,
  WorkoutEntryMigration,
  CompatibilityCheck
} from '../types/exercise-groups'
import { estimateWorkoutDuration } from './exercise-groups'

// ================================================================================================
// MIGRATION FUNCTIONS
// ================================================================================================

/**
 * Migrate a legacy WorkoutEntry to EnhancedWorkoutEntry
 */
export function migrateWorkoutEntry(legacy: WorkoutEntry): EnhancedWorkoutEntry {
  // Start with base enhanced structure
  const enhanced: EnhancedWorkoutEntry = {
    ...legacy,
    // Convert exercises to enhanced format
    exercises: legacy.exercises.map(migrateExerciseConfig),
    // Set default rep scheme to standard (maintains existing behavior)
    repScheme: {
      type: 'standard',
      autoGenerate: false
    },
    // Convert timingStyle to executionStyle if present
    executionStyle: legacy.timingStyle ? migrateTimingStyle(legacy.timingStyle) : {
      style: 'standard',
      restBetweenSets: 90 // Default rest
    }
  }

  // Calculate estimated duration and total sets
  enhanced.estimatedDuration = estimateWorkoutDuration(enhanced)
  enhanced.totalSets = enhanced.sets

  return enhanced
}

/**
 * Migrate ExerciseConfig to EnhancedExerciseConfig
 */
function migrateExerciseConfig(legacy: ExerciseConfig): EnhancedExerciseConfig {
  return {
    ...legacy,
    // Enhanced fields are optional and will be undefined initially
    weightProgression: undefined,
    generatedSets: undefined
  }
}

/**
 * Migrate legacy TimingStyle to ExecutionStyleConfig
 */
function migrateTimingStyle(timingStyle: TimingStyle): ExecutionStyleConfig {
  switch (timingStyle) {
    case 'AMRAP':
      return {
        style: 'AMRAP',
        durationMinutes: 15 // Default 15-minute AMRAP
      }
    
    case 'EMOM':
      return {
        style: 'EMOM',
        intervalMinutes: 1,
        durationMinutes: 10 // Default 10-minute EMOM
      }
    
    case 'HIIT':
      return {
        style: 'HIIT',
        workInterval: 30,
        restInterval: 30,
        rounds: 8 // Default 8 rounds
      }
    
    default:
      return {
        style: 'standard',
        restBetweenSets: 90
      }
  }
}

/**
 * Migrate entire workout to use enhanced structure
 */
export function migrateWorkout(workout: Workout): Workout {
  if (!workout.entries || workout.entries.length === 0) {
    // Legacy workout - need to convert from exercises/supersets/circuits
    return migrateLegacyWorkout(workout)
  }

  // Modern workout - just enhance the entries
  const enhancedEntries = workout.entries.map(migrateWorkoutEntry)
  
  return {
    ...workout,
    entries: enhancedEntries as WorkoutEntry[]
  }
}

/**
 * Migrate legacy workout structure (exercises, supersets, circuits arrays)
 */
function migrateLegacyWorkout(workout: Workout): Workout {
  const entries: EnhancedWorkoutEntry[] = []

  // Migrate individual exercises
  if (workout.exercises) {
    workout.exercises.forEach((exercise, index) => {
      entries.push({
        id: `legacy-exercise-${index}`,
        type: 'single',
        label: exercise.exerciseData.name,
        exercises: [{
          exerciseId: exercise.exerciseId,
          sets: exercise.sets,
          reps: exercise.reps,
          weight: exercise.weight,
          rest: exercise.rest,
          tempo: exercise.tempo,
          notes: exercise.notes
        }],
        sets: exercise.sets,
        groupRPE: exercise.rpe,
        repScheme: {
          type: 'standard',
          autoGenerate: false
        },
        executionStyle: {
          style: 'standard',
          restBetweenSets: exercise.rest
        },
        estimatedDuration: Math.ceil((exercise.sets * 2) + ((exercise.sets - 1) * exercise.rest / 60)),
        totalSets: exercise.sets
      })
    })
  }

  // Migrate supersets
  if (workout.supersets) {
    workout.supersets.forEach((superset, index) => {
      entries.push({
        id: `legacy-superset-${index}`,
        type: 'superset',
        label: superset.name,
        exercises: superset.exercises.map(ex => ({
          exerciseId: ex.exerciseId,
          sets: ex.sets,
          reps: ex.reps,
          weight: ex.weight,
          rest: ex.rest,
          tempo: ex.tempo,
          notes: ex.notes
        })),
        sets: superset.rounds,
        restAfterGroup: superset.rest,
        repScheme: {
          type: 'standard',
          autoGenerate: false
        },
        executionStyle: {
          style: 'standard',
          restBetweenSets: superset.rest
        },
        estimatedDuration: Math.ceil((superset.rounds * superset.exercises.length * 2) + ((superset.rounds - 1) * superset.rest / 60)),
        totalSets: superset.rounds
      })
    })
  }

  // Migrate circuits
  if (workout.circuits) {
    workout.circuits.forEach((circuit, index) => {
      entries.push({
        id: `legacy-circuit-${index}`,
        type: 'circuit',
        label: circuit.name,
        exercises: circuit.exercises.map(ex => ({
          exerciseId: ex.exerciseId,
          sets: ex.sets,
          reps: ex.reps,
          weight: ex.weight,
          rest: ex.rest,
          tempo: ex.tempo,
          notes: ex.notes
        })),
        sets: circuit.rounds,
        rounds: circuit.rounds,
        restAfterGroup: circuit.rest,
        repScheme: {
          type: 'standard',
          autoGenerate: false
        },
        executionStyle: {
          style: 'standard',
          restBetweenSets: circuit.rest
        },
        estimatedDuration: Math.ceil((circuit.rounds * circuit.exercises.length * 2) + ((circuit.rounds - 1) * circuit.rest / 60)),
        totalSets: circuit.rounds
      })
    })
  }

  return {
    ...workout,
    entries: entries as WorkoutEntry[]
  }
}

// ================================================================================================
// COMPATIBILITY CHECKING
// ================================================================================================

/**
 * Check if a workout is compatible with the enhanced system
 */
export function checkWorkoutCompatibility(workout: Workout): CompatibilityCheck {
  // If workout has no entries, it needs migration from legacy structure
  if (!workout.entries || workout.entries.length === 0) {
    return {
      isCompatible: false,
      requiresUpgrade: true,
      upgradePath: [
        'Migrate legacy exercises array to entries format',
        'Migrate legacy supersets array to entries format', 
        'Migrate legacy circuits array to entries format',
        'Add default rep schemes and execution styles',
        'Calculate estimated durations'
      ]
    }
  }

  // Check if entries are already enhanced
  const hasEnhancedFeatures = workout.entries.some(entry => 
    'repScheme' in entry || 'executionStyle' in entry || 'estimatedDuration' in entry
  )

  if (hasEnhancedFeatures) {
    return {
      isCompatible: true,
      requiresUpgrade: false
    }
  }

  // Modern format but not enhanced
  return {
    isCompatible: true,
    requiresUpgrade: true,
    upgradePath: [
      'Add rep scheme configurations to entries',
      'Add execution style configurations to entries',
      'Calculate estimated durations',
      'Validate exercise combinations'
    ]
  }
}

/**
 * Check if a WorkoutEntry is compatible with enhanced features
 */
export function checkEntryCompatibility(entry: WorkoutEntry): CompatibilityCheck {
  const enhanced = entry as any

  const hasRepScheme = 'repScheme' in enhanced && enhanced.repScheme !== undefined
  const hasExecutionStyle = 'executionStyle' in enhanced && enhanced.executionStyle !== undefined
  const hasEstimatedDuration = 'estimatedDuration' in enhanced && enhanced.estimatedDuration !== undefined

  if (hasRepScheme && hasExecutionStyle && hasEstimatedDuration) {
    return {
      isCompatible: true,
      requiresUpgrade: false
    }
  }

  const upgradePath: string[] = []
  if (!hasRepScheme) upgradePath.push('Add rep scheme configuration')
  if (!hasExecutionStyle) upgradePath.push('Add execution style configuration')
  if (!hasEstimatedDuration) upgradePath.push('Calculate estimated duration')

  return {
    isCompatible: true,
    requiresUpgrade: true,
    upgradePath
  }
}

// ================================================================================================
// TYPE GUARDS AND PREDICATES
// ================================================================================================

/**
 * Runtime type checking for enhanced workout entries
 */
export function isValidExerciseGroup(obj: any): obj is EnhancedWorkoutEntry {
  return (
    obj &&
    typeof obj === 'object' &&
    typeof obj.id === 'string' &&
    typeof obj.type === 'string' &&
    Array.isArray(obj.exercises) &&
    typeof obj.sets === 'number'
  )
}

/**
 * Check if a group has complete configuration
 */
export function isCompleteGroup(group: EnhancedWorkoutEntry): boolean {
  return !!(
    group.id &&
    group.type &&
    group.exercises &&
    group.exercises.length > 0 &&
    group.sets &&
    group.sets > 0
  )
}

/**
 * Check if group has valid enhanced configuration
 */
export function hasValidConfiguration(group: EnhancedWorkoutEntry): boolean {
  if (!isCompleteGroup(group)) return false
  
  // Check if enhanced features are properly configured
  if (group.repScheme && group.repScheme.type !== 'standard') {
    // Advanced rep schemes should have proper configuration
    if (group.repScheme.autoGenerate) {
      return true // Auto-generated schemes are valid if they have the autoGenerate flag
    }
  }
  
  if (group.executionStyle && group.executionStyle.style !== 'standard') {
    // Advanced execution styles should have proper configuration
    switch (group.executionStyle.style) {
      case 'HIIT':
        const hiit = group.executionStyle as any
        return !!(hiit.workInterval && hiit.restInterval)
      
      case 'EMOM':
        const emom = group.executionStyle as any
        return !!(emom.intervalMinutes && emom.durationMinutes)
      
      case 'AMRAP':
        const amrap = group.executionStyle as any
        return !!amrap.durationMinutes
    }
  }
  
  return true
}

// ================================================================================================
// BATCH MIGRATION
// ================================================================================================

/**
 * Migrate multiple workouts in batch
 */
export function batchMigrateWorkouts(workouts: Workout[]): {
  migrated: Workout[]
  summary: {
    total: number
    migrated: number
    alreadyCompatible: number
    errors: Array<{ workoutId: number; error: string }>
  }
} {
  const migrated: Workout[] = []
  const errors: Array<{ workoutId: number; error: string }> = []
  let migratedCount = 0
  let alreadyCompatibleCount = 0

  for (const workout of workouts) {
    try {
      const compatibility = checkWorkoutCompatibility(workout)
      
      if (compatibility.requiresUpgrade) {
        const migratedWorkout = migrateWorkout(workout)
        migrated.push(migratedWorkout)
        migratedCount++
      } else {
        migrated.push(workout)
        alreadyCompatibleCount++
      }
    } catch (error) {
      errors.push({
        workoutId: workout.id,
        error: error instanceof Error ? error.message : 'Unknown error'
      })
      // Include original workout to avoid data loss
      migrated.push(workout)
    }
  }

  return {
    migrated,
    summary: {
      total: workouts.length,
      migrated: migratedCount,
      alreadyCompatible: alreadyCompatibleCount,
      errors
    }
  }
}

// ================================================================================================
// MIGRATION REPORTING
// ================================================================================================

/**
 * Create migration report for a workout
 */
export function createMigrationReport(
  original: Workout,
  migrated: Workout
): WorkoutEntryMigration[] {
  const reports: WorkoutEntryMigration[] = []

  migrated.entries.forEach((entry, index) => {
    const isLegacy = entry.id.startsWith('legacy-')
    const preservedFields: string[] = []

    // Identify what was preserved from original
    if (original.exercises && index < original.exercises.length) {
      const originalExercise = original.exercises[index]
      if (entry.exercises[0]) {
        if (entry.exercises[0].sets === originalExercise.sets) preservedFields.push('sets')
        if (entry.exercises[0].reps === originalExercise.reps) preservedFields.push('reps')
        if (entry.exercises[0].weight === originalExercise.weight) preservedFields.push('weight')
        if (entry.exercises[0].rest === originalExercise.rest) preservedFields.push('rest')
      }
    }

    reports.push({
      legacy: isLegacy,
      enhanced: entry,
      preservedFields
    })
  })

  return reports
}

/**
 * Generate migration summary statistics
 */
export function generateMigrationSummary(reports: WorkoutEntryMigration[]): {
  totalEntries: number
  legacyEntries: number
  modernEntries: number
  preservedDataPercentage: number
  commonPreservedFields: string[]
} {
  const totalEntries = reports.length
  const legacyEntries = reports.filter(r => r.legacy).length
  const modernEntries = totalEntries - legacyEntries
  
  // Calculate preserved data percentage
  const allPreservedFields = reports.flatMap(r => r.preservedFields)
  const preservedDataPercentage = allPreservedFields.length > 0 
    ? Math.round((allPreservedFields.length / (totalEntries * 4)) * 100) // Assuming 4 main fields
    : 0
  
  // Find most commonly preserved fields
  const fieldCounts: Record<string, number> = {}
  allPreservedFields.forEach(field => {
    fieldCounts[field] = (fieldCounts[field] || 0) + 1
  })
  
  const commonPreservedFields = Object.entries(fieldCounts)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 3)
    .map(([field]) => field)

  return {
    totalEntries,
    legacyEntries,
    modernEntries,
    preservedDataPercentage,
    commonPreservedFields
  }
}