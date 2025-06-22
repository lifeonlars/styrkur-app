// Exercise Groups Validation - Phase 1B
// Comprehensive validation utilities for the exercise groups system

import { Exercise } from '../types'
import {
  EnhancedExerciseGroupType,
  ExecutionStyle,
  RepSchemeType,
  RepScheme,
  EnhancedWorkoutEntry,
  DescendingPattern,
  PyramidPattern,
  AscendingPattern
} from '../types/exercise-groups'

// ================================================================================================
// ERROR TYPES AND INTERFACES
// ================================================================================================

export type ValidationErrorType = 
  | 'group_size' 
  | 'compatibility' 
  | 'pattern' 
  | 'equipment' 
  | 'configuration'
  | 'weight_progression'

export interface ValidationError {
  type: ValidationErrorType
  field?: string
  message: string
  details?: any
  severity: 'error' | 'warning'
  suggestion?: string
}

export interface ValidationResult {
  isValid: boolean
  errors: ValidationError[]
  warnings: ValidationError[]
}

export interface GroupSizeRange {
  min: number
  max: number
}

// ================================================================================================
// GROUP SIZE VALIDATION
// ================================================================================================

/**
 * Get valid exercise count range for a group type
 */
export function getValidExerciseCountRange(groupType: EnhancedExerciseGroupType): GroupSizeRange {
  switch (groupType) {
    case 'single':
      return { min: 1, max: 1 }
    
    case 'superset':
      return { min: 2, max: 3 }
    
    case 'circuit':
      return { min: 3, max: 15 }
    
    case 'complex':
      return { min: 3, max: 15 }
    
    default:
      return { min: 1, max: 15 }
  }
}

/**
 * Validate group size for a specific group type
 */
export function validateGroupSize(
  groupType: EnhancedExerciseGroupType, 
  exerciseCount: number
): ValidationResult {
  const range = getValidExerciseCountRange(groupType)
  const isValid = exerciseCount >= range.min && exerciseCount <= range.max
  
  if (isValid) {
    return { isValid: true, errors: [], warnings: [] }
  }

  const error: ValidationError = {
    type: 'group_size',
    field: 'exercises',
    message: `${groupType} requires ${range.min === range.max ? range.min : `${range.min}-${range.max}`} exercise${range.max > 1 ? 's' : ''}, but got ${exerciseCount}`,
    severity: 'error',
    suggestion: generateGroupSizeSuggestion(groupType, exerciseCount, range),
    details: { groupType, exerciseCount, range }
  }

  return {
    isValid: false,
    errors: [error],
    warnings: []
  }
}

function generateGroupSizeSuggestion(
  groupType: EnhancedExerciseGroupType,
  exerciseCount: number,
  range: GroupSizeRange
): string {
  if (exerciseCount < range.min) {
    if (groupType === 'single') {
      return 'Single exercises can only contain one exercise. Consider using a superset for multiple exercises.'
    }
    return `Add ${range.min - exerciseCount} more exercise${range.min - exerciseCount > 1 ? 's' : ''} to create a valid ${groupType}.`
  }
  
  if (exerciseCount > range.max) {
    if (exerciseCount <= 3 && groupType === 'circuit') {
      return 'Consider changing to a superset (2-3 exercises) or add more exercises for a full circuit.'
    }
    return `Remove ${exerciseCount - range.max} exercise${exerciseCount - range.max > 1 ? 's' : ''} or consider splitting into multiple groups.`
  }
  
  return `Valid ${groupType} requires ${range.min}-${range.max} exercises.`
}

// ================================================================================================
// EXECUTION STYLE COMPATIBILITY VALIDATION
// ================================================================================================

/**
 * Check if execution style is compatible with rep scheme
 */
export function isExecutionStyleCompatible(
  executionStyle: ExecutionStyle,
  repScheme: RepSchemeType
): boolean {
  // Standard execution style works with everything
  if (executionStyle === 'standard') {
    return true
  }

  // Special case: EMOM + Ascending is allowed
  if (executionStyle === 'EMOM' && repScheme === 'ascending') {
    return true
  }

  // EMOM also works with standard for traditional EMOM workouts
  if (executionStyle === 'EMOM' && repScheme === 'standard') {
    return true
  }

  // HIIT and AMRAP only work with standard rep schemes
  if ((executionStyle === 'HIIT' || executionStyle === 'AMRAP') && repScheme === 'standard') {
    return true
  }

  return false
}

/**
 * Get compatible rep schemes for an execution style
 */
export function getCompatibleRepSchemes(executionStyle: ExecutionStyle): RepSchemeType[] {
  switch (executionStyle) {
    case 'standard':
      return ['standard', 'descending', 'pyramid', 'ascending']
    
    case 'EMOM':
      return ['standard', 'ascending']
    
    case 'HIIT':
    case 'AMRAP':
      return ['standard']
    
    default:
      return ['standard']
  }
}

/**
 * Get compatible execution styles for a rep scheme
 */
export function getCompatibleExecutionStyles(repScheme: RepSchemeType): ExecutionStyle[] {
  switch (repScheme) {
    case 'standard':
      return ['standard', 'HIIT', 'EMOM', 'AMRAP']
    
    case 'ascending':
      return ['standard', 'EMOM']
    
    case 'descending':
    case 'pyramid':
      return ['standard']
    
    default:
      return ['standard']
  }
}

/**
 * Validate execution style compatibility
 */
export function validateExecutionStyleCompatibility(
  executionStyle: ExecutionStyle,
  repScheme: RepSchemeType
): ValidationResult {
  const isCompatible = isExecutionStyleCompatible(executionStyle, repScheme)
  
  if (isCompatible) {
    return { isValid: true, errors: [], warnings: [] }
  }

  const compatibleRepSchemes = getCompatibleRepSchemes(executionStyle)
  const compatibleExecutionStyles = getCompatibleExecutionStyles(repScheme)

  const error: ValidationError = {
    type: 'compatibility',
    field: 'executionStyle',
    message: `${executionStyle} execution style is not compatible with ${repScheme} rep scheme`,
    severity: 'error',
    suggestion: `Try using ${compatibleRepSchemes.join(' or ')} rep scheme with ${executionStyle}, or use ${compatibleExecutionStyles.join(' or ')} execution style with ${repScheme}`,
    details: { executionStyle, repScheme, compatibleRepSchemes, compatibleExecutionStyles }
  }

  return {
    isValid: false,
    errors: [error],
    warnings: []
  }
}

// ================================================================================================
// REP SCHEME PATTERN VALIDATION
// ================================================================================================

/**
 * Validate descending pattern format
 */
function validateDescendingPattern(pattern: string): boolean {
  const validPatterns: DescendingPattern[] = ['10-1', '21-3', '15-3']
  return validPatterns.includes(pattern as DescendingPattern)
}

/**
 * Validate pyramid pattern format
 */
function validatePyramidPattern(pattern: string): boolean {
  const validPatterns: PyramidPattern[] = ['10-1-10', '15-3-15']
  return validPatterns.includes(pattern as PyramidPattern)
}

/**
 * Validate ascending pattern format
 */
function validateAscendingPattern(pattern: string): boolean {
  const validPatterns: AscendingPattern[] = ['1-rep']
  return validPatterns.includes(pattern as AscendingPattern)
}

/**
 * Validate rep scheme pattern based on type
 */
export function validateRepSchemePattern(
  repSchemeType: RepSchemeType,
  pattern?: string
): ValidationResult {
  if (repSchemeType === 'standard') {
    return { isValid: true, errors: [], warnings: [] }
  }

  if (!pattern) {
    const error: ValidationError = {
      type: 'pattern',
      field: 'pattern',
      message: `${repSchemeType} rep scheme requires a pattern`,
      severity: 'error',
      suggestion: `Specify a valid pattern for ${repSchemeType} rep scheme`,
      details: { repSchemeType }
    }
    
    return {
      isValid: false,
      errors: [error],
      warnings: []
    }
  }

  let isValidPattern = false
  let validPatterns: string[] = []

  switch (repSchemeType) {
    case 'descending':
      isValidPattern = validateDescendingPattern(pattern)
      validPatterns = ['10-1', '21-3', '15-3']
      break
    
    case 'pyramid':
      isValidPattern = validatePyramidPattern(pattern)
      validPatterns = ['10-1-10', '15-3-15']
      break
    
    case 'ascending':
      isValidPattern = validateAscendingPattern(pattern)
      validPatterns = ['1-rep']
      break
  }

  if (isValidPattern) {
    return { isValid: true, errors: [], warnings: [] }
  }

  const error: ValidationError = {
    type: 'pattern',
    field: 'pattern',
    message: `Invalid pattern "${pattern}" for ${repSchemeType} rep scheme`,
    severity: 'error',
    suggestion: `Use one of these valid patterns: ${validPatterns.join(', ')}`,
    details: { repSchemeType, pattern, validPatterns }
  }

  return {
    isValid: false,
    errors: [error],
    warnings: []
  }
}

/**
 * Parse rep scheme pattern into number array
 */
export function parseRepSchemePattern(pattern: string, type: RepSchemeType): number[] {
  switch (type) {
    case 'descending':
      return parseDescendingPattern(pattern)
    
    case 'pyramid':
      return parsePyramidPattern(pattern)
    
    case 'ascending':
      return parseAscendingPattern(pattern)
    
    default:
      return []
  }
}

function parseDescendingPattern(pattern: string): number[] {
  const reps: number[] = []
  
  switch (pattern) {
    case '10-1':
      for (let i = 10; i >= 1; i--) reps.push(i)
      break
    
    case '21-3':
      for (let i = 21; i >= 3; i -= 3) reps.push(i)
      break
    
    case '15-3':
      for (let i = 15; i >= 3; i -= 3) reps.push(i)
      break
  }
  
  return reps
}

function parsePyramidPattern(pattern: string): number[] {
  const reps: number[] = []
  
  switch (pattern) {
    case '10-1-10':
      // Up: 10, 8, 6, 4, 2, 1
      for (let i = 10; i >= 1; i -= 2) reps.push(i)
      // Down: 2, 4, 6, 8, 10
      for (let i = 2; i <= 10; i += 2) reps.push(i)
      break
    
    case '15-3-15':
      // Up: 15, 12, 9, 6, 3
      for (let i = 15; i >= 3; i -= 3) reps.push(i)
      // Down: 6, 9, 12, 15
      for (let i = 6; i <= 15; i += 3) reps.push(i)
      break
  }
  
  return reps
}

function parseAscendingPattern(pattern: string, maxMinutes: number = 10): number[] {
  const reps: number[] = []
  
  if (pattern === '1-rep') {
    for (let i = 1; i <= maxMinutes; i++) {
      reps.push(i)
    }
  }
  
  return reps
}

// ================================================================================================
// EXERCISE COMPATIBILITY FOR COMPLEXES
// ================================================================================================

/**
 * Validate that exercises can form a complex (same equipment)
 */
export function validateComplexEquipment(exercises: Exercise[]): ValidationResult {
  if (exercises.length < 2) {
    return { isValid: true, errors: [], warnings: [] }
  }

  const sharedEquipment = getSharedEquipment(exercises)
  
  if (sharedEquipment.length === 0) {
    const error: ValidationError = {
      type: 'equipment',
      field: 'exercises',
      message: 'Complex exercises must share common equipment',
      severity: 'error',
      suggestion: 'Select exercises that use the same equipment (e.g., all barbell exercises)',
      details: { 
        exercises: exercises.map(ex => ({ name: ex.name, equipment: ex.equipment })),
        sharedEquipment 
      }
    }
    
    return {
      isValid: false,
      errors: [error],
      warnings: []
    }
  }

  // Warning if only minimal equipment overlap
  if (sharedEquipment.length === 1) {
    const warning: ValidationError = {
      type: 'equipment',
      field: 'exercises',
      message: 'Complex has minimal equipment overlap',
      severity: 'warning',
      suggestion: 'Consider using exercises with more equipment commonality for smoother transitions',
      details: { sharedEquipment }
    }
    
    return {
      isValid: true,
      errors: [],
      warnings: [warning]
    }
  }

  return { isValid: true, errors: [], warnings: [] }
}

/**
 * Get equipment shared between exercises
 */
export function getSharedEquipment(exercises: Exercise[]): string[] {
  if (exercises.length === 0) return []
  if (exercises.length === 1) return [exercises[0].equipment]

  // Find equipment common to all exercises
  const equipmentSets = exercises.map(ex => 
    new Set(ex.equipment.toLowerCase().split(/[\s,&]+/).filter(Boolean))
  )

  const sharedEquipment = Array.from(equipmentSets[0]).filter(equipment =>
    equipmentSets.every(set => set.has(equipment))
  )

  return sharedEquipment
}

/**
 * Check if exercises can form a complex
 */
export function canFormComplex(exercises: Exercise[]): boolean {
  const validation = validateComplexEquipment(exercises)
  return validation.isValid
}

// ================================================================================================
// COMPREHENSIVE GROUP VALIDATION
// ================================================================================================

/**
 * Validate complete exercise group configuration
 */
export function validateExerciseGroup(group: EnhancedWorkoutEntry): ValidationResult {
  const errors: ValidationError[] = []
  const warnings: ValidationError[] = []

  // Validate group size
  const sizeValidation = validateGroupSize(group.type, group.exercises.length)
  errors.push(...sizeValidation.errors)
  warnings.push(...sizeValidation.warnings)

  // Validate execution style compatibility if both are present
  if (group.repScheme && group.executionStyle) {
    const compatibilityValidation = validateExecutionStyleCompatibility(
      group.executionStyle.style,
      group.repScheme.type
    )
    errors.push(...compatibilityValidation.errors)
    warnings.push(...compatibilityValidation.warnings)
  }

  // Validate rep scheme pattern if present
  if (group.repScheme && group.repScheme.type !== 'standard') {
    const patternValidation = validateRepSchemePattern(
      group.repScheme.type,
      'pattern' in group.repScheme ? (group.repScheme as any).pattern : undefined
    )
    errors.push(...patternValidation.errors)
    warnings.push(...patternValidation.warnings)
  }

  // Validate configuration completeness
  const configValidation = validateGroupConfiguration(group)
  errors.push(...configValidation.errors)
  warnings.push(...configValidation.warnings)

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  }
}

/**
 * Validate group configuration completeness
 */
function validateGroupConfiguration(group: EnhancedWorkoutEntry): ValidationResult {
  const errors: ValidationError[] = []
  const warnings: ValidationError[] = []

  // Check required fields
  if (!group.id) {
    errors.push({
      type: 'configuration',
      field: 'id',
      message: 'Group ID is required',
      severity: 'error',
      suggestion: 'Provide a unique identifier for this exercise group'
    })
  }

  if (!group.type) {
    errors.push({
      type: 'configuration',
      field: 'type',
      message: 'Group type is required',
      severity: 'error',
      suggestion: 'Specify whether this is a single, superset, circuit, or complex'
    })
  }

  if (!group.exercises || group.exercises.length === 0) {
    errors.push({
      type: 'configuration',
      field: 'exercises',
      message: 'At least one exercise is required',
      severity: 'error',
      suggestion: 'Add exercises to this group'
    })
  }

  // Check for incomplete exercise configurations
  group.exercises?.forEach((exercise, index) => {
    if (!exercise.exerciseId) {
      errors.push({
        type: 'configuration',
        field: `exercises[${index}].exerciseId`,
        message: `Exercise ${index + 1} is missing exercise ID`,
        severity: 'error',
        suggestion: 'Select a valid exercise for this position'
      })
    }
  })

  // Warnings for optional but recommended fields
  if (!group.label) {
    warnings.push({
      type: 'configuration',
      field: 'label',
      message: 'Group label is recommended for clarity',
      severity: 'warning',
      suggestion: 'Add a descriptive label like "Chest Superset A" or "Full Body Circuit"'
    })
  }

  if (group.sets === undefined || group.sets <= 0) {
    warnings.push({
      type: 'configuration',
      field: 'sets',
      message: 'Number of sets should be specified',
      severity: 'warning',
      suggestion: 'Specify how many sets/rounds to perform'
    })
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  }
}

// ================================================================================================
// UTILITY FUNCTIONS
// ================================================================================================

/**
 * Get user-friendly validation error message
 */
export function getValidationErrorMessage(error: ValidationError): string {
  return error.message
}

/**
 * Get suggestion for fixing validation error
 */
export function getSuggestionForError(error: ValidationError): string {
  return error.suggestion || 'Please review and correct the configuration'
}

/**
 * Check if validation result has critical errors
 */
export function hasCriticalErrors(result: ValidationResult): boolean {
  return result.errors.some(error => error.severity === 'error')
}

/**
 * Filter validation errors by type
 */
export function filterErrorsByType(
  result: ValidationResult, 
  type: ValidationErrorType
): ValidationError[] {
  return [...result.errors, ...result.warnings].filter(error => error.type === type)
}

/**
 * Get validation summary
 */
export function getValidationSummary(result: ValidationResult): {
  totalIssues: number
  errorCount: number
  warningCount: number
  isValid: boolean
} {
  return {
    totalIssues: result.errors.length + result.warnings.length,
    errorCount: result.errors.length,
    warningCount: result.warnings.length,
    isValid: result.isValid
  }
}