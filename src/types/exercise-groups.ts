// Enhanced Exercise Groups System - Phase 1A
// This extends the existing WorkoutEntry system with advanced rep schemes and execution styles

import { ExerciseGroupType, TimingStyle, ExerciseConfig } from './index'

// ================================================================================================
// CORE ENHANCED TYPES
// ================================================================================================

// Extended Exercise Group Types (maintains backwards compatibility)
export type EnhancedExerciseGroupType = ExerciseGroupType | 'complex'

// Enhanced Execution Styles (extends existing TimingStyle)
export type ExecutionStyle = TimingStyle | 'standard'

// Rep Scheme Types
export type RepSchemeType = 'standard' | 'descending' | 'pyramid' | 'ascending'

// Rep Scheme Pattern Types
export type DescendingPattern = '10-1' | '21-3' | '15-3'
export type PyramidPattern = '10-1-10' | '15-3-15'
export type AscendingPattern = '1-rep' // Used primarily with EMOM

// ================================================================================================
// REP SCHEME INTERFACES
// ================================================================================================

/**
 * Base rep scheme configuration
 */
export interface BaseRepScheme {
  type: RepSchemeType
  autoGenerate: boolean // Whether to auto-generate sets based on pattern
}

/**
 * Standard rep scheme - manual set/rep entry (existing functionality)
 */
export interface StandardRepScheme extends BaseRepScheme {
  type: 'standard'
  autoGenerate: false
  // Uses manual ExerciseConfig.sets/reps configuration
}

/**
 * Descending rep scheme - patterns like 10-1, 21-3, 15-3
 */
export interface DescendingRepScheme extends BaseRepScheme {
  type: 'descending'
  pattern: DescendingPattern
  autoGenerate: true
  // Pattern details
  startReps: number // e.g., 10 for "10-1"
  endReps: number   // e.g., 1 for "10-1"
  increment: number // e.g., 1 for "10-1", 3 for "21-3"
}

/**
 * Pyramid rep scheme - patterns like 10-1-10, 15-3-15
 */
export interface PyramidRepScheme extends BaseRepScheme {
  type: 'pyramid'
  pattern: PyramidPattern
  autoGenerate: true
  // Pattern details
  startReps: number    // e.g., 10 for "10-1-10"
  peakReps: number     // e.g., 1 for "10-1-10"
  increment: number    // e.g., 1 for "10-1-10"
  // Weight progression
  startWeight?: number // Starting weight
  peakWeight?: number  // Weight at peak (heaviest)
  autoProgressWeight: boolean // Whether to auto-calculate weight progression
}

/**
 * Ascending rep scheme - 1-rep ascending, typically used with EMOM
 */
export interface AscendingRepScheme extends BaseRepScheme {
  type: 'ascending'
  pattern: AscendingPattern
  autoGenerate: true
  // Pattern details
  startReps: number    // Usually 1
  maxReps?: number     // Optional max reps (stops at this number)
  increment: number    // Usually 1
  // Duration-based (especially for EMOM)
  durationMinutes?: number // How long to continue ascending
}

/**
 * Union type for all rep schemes
 */
export type RepScheme = StandardRepScheme | DescendingRepScheme | PyramidRepScheme | AscendingRepScheme

// ================================================================================================
// EXECUTION STYLE INTERFACES
// ================================================================================================

/**
 * Base execution style configuration
 */
export interface BaseExecutionStyle {
  style: ExecutionStyle
}

/**
 * Standard execution style - traditional rest between sets
 */
export interface StandardExecutionStyle extends BaseExecutionStyle {
  style: 'standard'
  restBetweenSets?: number // seconds
}

/**
 * HIIT execution style - high-intensity intervals
 */
export interface HIITExecutionStyle extends BaseExecutionStyle {
  style: 'HIIT'
  workInterval: number     // seconds
  restInterval: number     // seconds
  rounds?: number          // total rounds (overrides sets if specified)
}

/**
 * EMOM execution style - every minute on the minute
 */
export interface EMOMExecutionStyle extends BaseExecutionStyle {
  style: 'EMOM'
  intervalMinutes: number  // usually 1, but could be 2 or more
  durationMinutes: number  // total workout duration
  // Special compatibility with ascending rep scheme
  ascendingReps?: boolean  // true when used with ascending pattern
}

/**
 * AMRAP execution style - as many rounds/reps as possible
 */
export interface AMRAPExecutionStyle extends BaseExecutionStyle {
  style: 'AMRAP'
  durationMinutes: number  // time limit
  targetRounds?: number    // optional target for tracking
}

/**
 * Union type for all execution styles
 */
export type ExecutionStyleConfig = StandardExecutionStyle | HIITExecutionStyle | EMOMExecutionStyle | AMRAPExecutionStyle

// ================================================================================================
// ENHANCED WORKOUT ENTRY
// ================================================================================================

/**
 * Enhanced Exercise Configuration (extends existing ExerciseConfig)
 */
export interface EnhancedExerciseConfig extends ExerciseConfig {
  // Weight progression for pyramids
  weightProgression?: number[] // Array of weights for each set
  // Auto-generated sets from rep schemes
  generatedSets?: GeneratedSet[]
}

/**
 * Generated set from rep scheme patterns
 */
export interface GeneratedSet {
  setNumber: number
  reps: number
  weight?: number
  notes?: string
}

/**
 * Enhanced Workout Entry (extends existing WorkoutEntry)
 */
export interface EnhancedWorkoutEntry {
  // Base fields from WorkoutEntry
  id: string
  type: EnhancedExerciseGroupType
  label?: string
  exercises: EnhancedExerciseConfig[]
  sets: number
  restBetweenExercises?: number
  rounds?: number
  timingStyle?: TimingStyle // Kept for backwards compatibility
  restAfterGroup?: number
  groupRPE?: number

  // Enhanced fields
  repScheme?: RepScheme           // Rep scheme configuration
  executionStyle?: ExecutionStyleConfig // Execution style configuration
  
  // Auto-generated content
  totalSets?: number              // Calculated total sets (useful for pyramids)
  estimatedDuration?: number      // Estimated duration in minutes
}

// ================================================================================================
// VALIDATION AND COMPATIBILITY TYPES
// ================================================================================================

/**
 * Valid combinations matrix
 */
export interface ValidCombination {
  groupType: EnhancedExerciseGroupType
  repScheme: RepSchemeType
  executionStyle: ExecutionStyle
  isValid: boolean
  reason?: string
}

/**
 * Type guard for checking if a combination is valid
 */
export type CombinationValidator = (
  groupType: EnhancedExerciseGroupType,
  repScheme: RepSchemeType,
  executionStyle: ExecutionStyle
) => boolean

// ================================================================================================
// UTILITY TYPES
// ================================================================================================

/**
 * Set generation configuration
 */
export interface SetGenerationConfig {
  repScheme: RepScheme
  executionStyle: ExecutionStyleConfig
  baseWeight?: number
}

/**
 * Weight progression calculation result
 */
export interface WeightProgression {
  sets: Array<{
    setNumber: number
    reps: number
    weight: number
    percentage: number // Percentage of max weight
  }>
}

/**
 * Pattern validation result
 */
export interface PatternValidation {
  isValid: boolean
  estimatedSets: number
  estimatedDuration: number
  warnings?: string[]
}

// ================================================================================================
// MIGRATION COMPATIBILITY
// ================================================================================================

/**
 * Migration helper - converts legacy WorkoutEntry to EnhancedWorkoutEntry
 */
export interface WorkoutEntryMigration {
  legacy: boolean
  enhanced: EnhancedWorkoutEntry
  preservedFields: string[]
}

/**
 * Backward compatibility checker
 */
export interface CompatibilityCheck {
  isCompatible: boolean
  requiresUpgrade: boolean
  upgradePath?: string[]
}

// ================================================================================================
// CONSTANTS AND PRESETS
// ================================================================================================

/**
 * Predefined rep scheme patterns
 */
export const REP_SCHEME_PATTERNS = {
  DESCENDING: {
    '10-1': { start: 10, end: 1, increment: 1 },
    '21-3': { start: 21, end: 3, increment: 3 },
    '15-3': { start: 15, end: 3, increment: 3 }
  },
  PYRAMID: {
    '10-1-10': { start: 10, peak: 1, increment: 1 },
    '15-3-15': { start: 15, peak: 3, increment: 3 }
  },
  ASCENDING: {
    '1-rep': { start: 1, increment: 1 }
  }
} as const

/**
 * Invalid combination rules
 */
export const INVALID_COMBINATIONS = [
  { repScheme: 'pyramid', executionStyle: 'AMRAP', reason: 'AMRAP conflicts with structured pyramid progression' },
  { repScheme: 'descending', executionStyle: 'AMRAP', reason: 'AMRAP conflicts with structured descending progression' },
  { groupType: 'complex', repScheme: 'pyramid', reason: 'Complex exercises work best with consistent rep schemes' }
] as const

/**
 * Recommended combinations
 */
export const RECOMMENDED_COMBINATIONS = [
  { groupType: 'single', repScheme: 'pyramid', executionStyle: 'standard' },
  { groupType: 'superset', repScheme: 'descending', executionStyle: 'standard' },
  { groupType: 'circuit', repScheme: 'standard', executionStyle: 'HIIT' },
  { groupType: 'complex', repScheme: 'standard', executionStyle: 'standard' },
  { groupType: 'single', repScheme: 'ascending', executionStyle: 'EMOM' }
] as const