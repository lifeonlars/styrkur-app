import { WorkoutEntry, TimingStyle } from '@/types'
import { EnhancedWorkoutEntry, ExecutionStyle } from '@/types/exercise-groups'

// ================================================================================================
// TYPE CONVERSION UTILITIES
// ================================================================================================

/**
 * Convert EnhancedWorkoutEntry to standard WorkoutEntry for storage
 * Maintains backwards compatibility with existing workout data structure
 */
export function convertToStandardEntry(enhanced: EnhancedWorkoutEntry): WorkoutEntry {
  // Map execution style to timing style for backwards compatibility
  const timingStyleMap: Record<ExecutionStyle, TimingStyle | undefined> = {
    'standard': undefined,
    'HIIT': 'HIIT',
    'EMOM': 'EMOM', 
    'AMRAP': 'AMRAP'
  }

  const timingStyle = enhanced.executionStyle?.style 
    ? timingStyleMap[enhanced.executionStyle.style]
    : undefined

  return {
    id: enhanced.id,
    type: enhanced.type,
    label: enhanced.label,
    exercises: enhanced.exercises,
    sets: enhanced.sets,
    restBetweenExercises: enhanced.restBetweenExercises,
    restAfterGroup: enhanced.restAfterGroup,
    timingStyle,
    groupRPE: enhanced.groupRPE
  }
}

/**
 * Convert standard WorkoutEntry to EnhancedWorkoutEntry for editing
 * Adds enhanced configuration capabilities while maintaining existing data
 */
export function convertToEnhancedEntry(standard: WorkoutEntry): Partial<EnhancedWorkoutEntry> {
  // Map timing style back to execution style
  const executionStyleMap: Record<TimingStyle, ExecutionStyle> = {
    'HIIT': 'HIIT',
    'EMOM': 'EMOM',
    'AMRAP': 'AMRAP'
  }

  const executionStyle = standard.timingStyle 
    ? executionStyleMap[standard.timingStyle]
    : 'standard'

  return {
    id: standard.id,
    type: standard.type,
    label: standard.label,
    exercises: standard.exercises,
    sets: standard.sets,
    restBetweenExercises: standard.restBetweenExercises,
    restAfterGroup: standard.restAfterGroup,
    groupRPE: standard.groupRPE,
    // Add enhanced fields with sensible defaults
    executionStyle: {
      style: executionStyle,
      // Add default configurations based on execution style
      ...(executionStyle === 'HIIT' && {
        workInterval: 45,
        restInterval: 15,
        rounds: 8
      }),
      ...(executionStyle === 'EMOM' && {
        intervalMinutes: 1,
        durationMinutes: 10
      }),
      ...(executionStyle === 'AMRAP' && {
        durationMinutes: 12
      })
    },
    repScheme: {
      type: 'standard', // Default to standard for existing entries
      autoGenerate: false
    }
  }
}

/**
 * Validate that an enhanced entry can be safely converted to standard format
 * Returns validation errors if conversion would lose important data
 */
export function validateEnhancedEntryCompatibility(enhanced: EnhancedWorkoutEntry): string[] {
  const errors: string[] = []

  // Check for features that can't be represented in standard format
  if (enhanced.repScheme?.type !== 'standard' && enhanced.repScheme?.type !== undefined) {
    errors.push(`Rep scheme "${enhanced.repScheme.type}" will be converted to timing style`)
  }

  if (enhanced.weightProgression) {
    errors.push('Weight progression configuration will be lost in standard format')
  }

  // Validate execution style configuration
  if (enhanced.executionStyle?.style === 'EMOM' && enhanced.repScheme?.type === 'ascending') {
    // This is a valid combination that should convert properly
  } else if (enhanced.executionStyle?.style && enhanced.executionStyle.style !== 'standard') {
    // Check if timing style mapping is available
    const timingStyleMap: Record<ExecutionStyle, TimingStyle | undefined> = {
      'standard': undefined,
      'HIIT': 'HIIT',
      'EMOM': 'EMOM',
      'AMRAP': 'AMRAP'
    }
    
    if (!timingStyleMap[enhanced.executionStyle.style]) {
      errors.push(`Execution style "${enhanced.executionStyle.style}" cannot be converted to timing style`)
    }
  }

  return errors
}

/**
 * Get a human-readable summary of what will be preserved/lost in conversion
 */
export function getConversionSummary(enhanced: EnhancedWorkoutEntry): {
  preserved: string[]
  lost: string[]
  warnings: string[]
} {
  const preserved: string[] = [
    'Group type and basic structure',
    'Exercise configurations (reps, weight, etc.)',
    'Sets and rest periods',
    'Group RPE and notes'
  ]

  const lost: string[] = []
  const warnings: string[] = []

  // Check what enhanced features would be lost
  if (enhanced.repScheme?.type !== 'standard' && enhanced.repScheme?.type !== undefined) {
    lost.push(`Rep scheme pattern (${enhanced.repScheme.type})`)
    warnings.push('Rep scheme will be simplified to basic timing style')
  }

  if (enhanced.weightProgression) {
    lost.push('Automatic weight progression configuration')
    warnings.push('Weight progression must be manually configured per exercise')
  }

  if (enhanced.executionStyle?.style !== 'standard' && enhanced.executionStyle?.style) {
    preserved.push(`Execution timing (${enhanced.executionStyle.style})`)
  }

  return { preserved, lost, warnings }
}