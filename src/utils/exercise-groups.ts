// Exercise Groups Utilities - Phase 1B
// Helper functions, weight progression, and set generation for exercise groups

import { Exercise } from '../types'
import {
  EnhancedExerciseGroupType,
  ExecutionStyle,
  RepSchemeType,
  RepScheme,
  ExecutionStyleConfig,
  EnhancedWorkoutEntry,
  GeneratedSet,
  WeightProgression,
  PatternValidation,
  SetGenerationConfig,
  DescendingRepScheme,
  PyramidRepScheme,
  AscendingRepScheme,
  HIITExecutionStyle,
  EMOMExecutionStyle,
  AMRAPExecutionStyle
} from '../types/exercise-groups'

// ================================================================================================
// WEIGHT PROGRESSION CALCULATORS
// ================================================================================================

/**
 * Calculate weight progression for pyramid rep schemes
 */
export function calculatePyramidWeights(
  startWeight: number,
  peakWeight: number,
  repPattern: number[],
  increment: number = 2.5
): number[] {
  if (repPattern.length === 0) return []
  
  const weights: number[] = []
  const totalSets = repPattern.length
  const midPoint = Math.floor(totalSets / 2)
  
  // For pyramid patterns, weight increases as reps decrease (first half)
  // then decreases as reps increase (second half)
  for (let i = 0; i < totalSets; i++) {
    let weight: number
    
    if (i <= midPoint) {
      // Ascending weight phase (decreasing reps)
      const progress = i / midPoint
      weight = startWeight + (peakWeight - startWeight) * progress
    } else {
      // Descending weight phase (increasing reps)
      const progress = (totalSets - 1 - i) / (totalSets - 1 - midPoint)
      weight = startWeight + (peakWeight - startWeight) * progress
    }
    
    // Round to nearest increment
    weights.push(Math.round(weight / increment) * increment)
  }
  
  return weights
}

/**
 * Suggest optimal weight progression for pyramid schemes
 */
export function suggestWeightProgression(
  repScheme: RepScheme,
  baseWeight: number,
  maxWeight?: number
): number[] {
  if (repScheme.type !== 'pyramid') {
    return [baseWeight] // For non-pyramid schemes, use base weight
  }
  
  const pyramidScheme = repScheme as PyramidRepScheme
  const suggestedMax = maxWeight || Math.round(baseWeight * 1.3) // 30% increase default
  
  // Generate rep pattern to determine progression
  const repPattern = generateRepPattern(pyramidScheme)
  
  return calculatePyramidWeights(baseWeight, suggestedMax, repPattern)
}

/**
 * Suggest optimal weight progression based on rep range
 */
export function suggestPyramidWeights(
  baseWeight: number,
  repRange: { start: number; peak: number }
): { startWeight: number; peakWeight: number } {
  // Use inverse relationship between reps and weight
  // Higher reps = lower weight, lower reps = higher weight
  const repRatio = repRange.peak / repRange.start
  const weightMultiplier = 1 + (1 - repRatio) * 0.5 // 50% increase at peak
  
  return {
    startWeight: baseWeight,
    peakWeight: Math.round(baseWeight * weightMultiplier)
  }
}

// ================================================================================================
// SET AUTO-GENERATION
// ================================================================================================

/**
 * Generate sets based on rep scheme configuration
 */
export function generateSetsFromRepScheme(
  repScheme: RepScheme,
  baseWeight?: number,
  maxWeight?: number
): GeneratedSet[] {
  if (!repScheme.autoGenerate) {
    return [] // Don't generate for manual schemes
  }
  
  switch (repScheme.type) {
    case 'descending':
      return generateDescendingSets(repScheme as DescendingRepScheme, baseWeight)
    
    case 'pyramid':
      return generatePyramidSets(repScheme as PyramidRepScheme, baseWeight, maxWeight)
    
    case 'ascending':
      return generateAscendingSets(repScheme as AscendingRepScheme, baseWeight)
    
    default:
      return []
  }
}

/**
 * Generate sets for EMOM workouts
 */
export function generateEMOMSets(
  maxReps: number,
  weight?: number
): GeneratedSet[] {
  const sets: GeneratedSet[] = []
  
  for (let i = 1; i <= maxReps; i++) {
    sets.push({
      setNumber: i,
      reps: i,
      weight,
      notes: `EMOM Minute ${i}`
    })
  }
  
  return sets
}

/**
 * Generate sets from any set generation configuration
 */
export function generateSets(config: SetGenerationConfig): GeneratedSet[] {
  const { repScheme, executionStyle, baseWeight } = config
  
  // Special handling for EMOM + Ascending combination
  if (isEMOMExecutionStyle(executionStyle) && isAscendingRepScheme(repScheme)) {
    const maxMinutes = executionStyle.durationMinutes / executionStyle.intervalMinutes
    return generateEMOMSets(maxMinutes, baseWeight)
  }
  
  // Use rep scheme to generate sets
  return generateSetsFromRepScheme(repScheme, baseWeight)
}

// ================================================================================================
// PATTERN GENERATION HELPERS
// ================================================================================================

function generateDescendingSets(
  scheme: DescendingRepScheme,
  baseWeight?: number
): GeneratedSet[] {
  const sets: GeneratedSet[] = []
  let setNumber = 1
  
  for (let reps = scheme.startReps; reps >= scheme.endReps; reps -= scheme.increment) {
    sets.push({
      setNumber,
      reps,
      weight: baseWeight,
      notes: `Descending set ${setNumber}`
    })
    setNumber++
  }
  
  return sets
}

function generatePyramidSets(
  scheme: PyramidRepScheme,
  baseWeight?: number,
  maxWeight?: number
): GeneratedSet[] {
  const sets: GeneratedSet[] = []
  let setNumber = 1
  
  // Generate rep pattern
  const repPattern = generateRepPattern(scheme)
  
  // Generate weight progression if enabled
  let weights: number[] = []
  if (scheme.autoProgressWeight && baseWeight && (maxWeight || scheme.peakWeight)) {
    const peakWeight = maxWeight || scheme.peakWeight || baseWeight * 1.3
    weights = calculatePyramidWeights(baseWeight, peakWeight, repPattern)
  }
  
  // Create sets
  repPattern.forEach((reps, index) => {
    const isAscending = index < Math.floor(repPattern.length / 2)
    const weight = weights[index] || baseWeight
    
    sets.push({
      setNumber,
      reps,
      weight,
      notes: `Pyramid ${isAscending ? 'up' : 'down'} - Set ${setNumber}`
    })
    setNumber++
  })
  
  return sets
}

function generateAscendingSets(
  scheme: AscendingRepScheme,
  baseWeight?: number
): GeneratedSet[] {
  const sets: GeneratedSet[] = []
  let setNumber = 1
  let currentReps = scheme.startReps
  
  // Determine stopping condition
  const maxSets = scheme.durationMinutes || 10 // Default 10 sets if no duration
  
  for (let i = 0; i < maxSets; i++) {
    sets.push({
      setNumber,
      reps: currentReps,
      weight: baseWeight,
      notes: `Ascending - Set ${setNumber}`
    })
    
    setNumber++
    currentReps += scheme.increment
    
    // Stop if we reach max reps
    if (scheme.maxReps && currentReps > scheme.maxReps) {
      break
    }
  }
  
  return sets
}

// ================================================================================================
// PATTERN RECOGNITION AND PARSING
// ================================================================================================

/**
 * Parse pattern string and return structured data
 */
export function parsePattern(pattern: string): { 
  type: 'descending' | 'pyramid' | 'ascending',
  reps: number[],
  isValid: boolean 
} {
  // Try descending patterns
  if (['10-1', '21-3', '15-3'].includes(pattern)) {
    return {
      type: 'descending',
      reps: parseDescendingPattern(pattern),
      isValid: true
    }
  }
  
  // Try pyramid patterns
  if (['10-1-10', '15-3-15'].includes(pattern)) {
    return {
      type: 'pyramid',
      reps: parsePyramidPattern(pattern),
      isValid: true
    }
  }
  
  // Try ascending patterns
  if (pattern === '1-rep') {
    return {
      type: 'ascending',
      reps: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], // Default 10 minutes
      isValid: true
    }
  }
  
  return {
    type: 'descending',
    reps: [],
    isValid: false
  }
}

/**
 * Generate pattern preview string for UI display
 */
export function generatePatternPreview(repScheme: RepScheme): string {
  if (repScheme.type === 'standard') {
    return 'Manual set/rep entry'
  }
  
  const reps = generateRepPattern(repScheme)
  const preview = reps.slice(0, 5).join(', ')
  const total = reps.length
  
  return total > 5 ? `${preview}... (${total} sets total)` : preview
}

/**
 * Format rep scheme for display
 */
export function formatRepSchemeDisplay(repScheme: RepScheme): string {
  switch (repScheme.type) {
    case 'standard':
      return 'Standard Sets'
    
    case 'descending':
      const desc = repScheme as DescendingRepScheme
      return `Descending ${desc.pattern} (${desc.startReps} → ${desc.endReps})`
    
    case 'pyramid':
      const pyr = repScheme as PyramidRepScheme
      return `Pyramid ${pyr.pattern} (${pyr.startReps} → ${pyr.peakReps} → ${pyr.startReps})`
    
    case 'ascending':
      const asc = repScheme as AscendingRepScheme
      return `Ascending (${asc.startReps}, ${asc.startReps + asc.increment}, ${asc.startReps + asc.increment * 2}...)`
    
    default:
      return 'Unknown Rep Scheme'
  }
}

// ================================================================================================
// GROUP TYPE UTILITIES
// ================================================================================================

/**
 * Suggest appropriate group types based on exercise count
 */
export function suggestGroupType(exerciseCount: number): EnhancedExerciseGroupType[] {
  const suggestions: EnhancedExerciseGroupType[] = []
  
  if (exerciseCount === 1) {
    suggestions.push('single')
  }
  
  if (exerciseCount >= 2 && exerciseCount <= 3) {
    suggestions.push('superset')
  }
  
  if (exerciseCount >= 3 && exerciseCount <= 15) {
    suggestions.push('circuit', 'complex')
  }
  
  return suggestions
}

/**
 * Check if group type change is valid
 */
export function canChangeGroupType(
  currentType: EnhancedExerciseGroupType,
  newType: EnhancedExerciseGroupType,
  exerciseCount: number
): boolean {
  const validTypes = suggestGroupType(exerciseCount)
  return validTypes.includes(newType)
}

/**
 * Get display name for group type
 */
export function getGroupTypeDisplayName(groupType: EnhancedExerciseGroupType): string {
  switch (groupType) {
    case 'single':
      return 'Single Exercise'
    case 'superset':
      return 'Superset'
    case 'circuit':
      return 'Circuit'
    case 'complex':
      return 'Complex'
    default:
      return 'Unknown Group'
  }
}

// ================================================================================================
// DURATION AND ESTIMATION
// ================================================================================================

/**
 * Check if exercises can form a complex based on equipment compatibility
 */
export function canFormComplex(exercises: Exercise[]): boolean {
  if (exercises.length < 2) return false
  
  const equipmentSets = exercises.map(ex => {
    // Handle both string and array equipment formats
    const equipmentStr = Array.isArray(ex.equipment) 
      ? ex.equipment.join(' ')
      : ex.equipment || ''
    return new Set(equipmentStr.toLowerCase().split(/[\s,&]+/).filter(Boolean))
  })
  
  // Find intersection of all equipment sets
  const sharedEquipment = equipmentSets.reduce((intersection, currentSet) => {
    return new Set(Array.from(intersection).filter(item => currentSet.has(item)))
  })
  
  return sharedEquipment.size > 0
}

/**
 * Get shared equipment across exercises
 */
export function getSharedEquipment(exercises: Exercise[]): string[] {
  if (exercises.length === 0) return []
  
  const equipmentSets = exercises.map(ex => {
    // Handle both string and array equipment formats
    const equipmentStr = Array.isArray(ex.equipment) 
      ? ex.equipment.join(' ')
      : ex.equipment || ''
    return new Set(equipmentStr.toLowerCase().split(/[\s,&]+/).filter(Boolean))
  })
  
  // Find intersection of all equipment sets
  let sharedEquipment = equipmentSets[0]
  for (let i = 1; i < equipmentSets.length; i++) {
    sharedEquipment = new Set(Array.from(sharedEquipment).filter(item => equipmentSets[i].has(item)))
  }
  
  return Array.from(sharedEquipment)
}

/**
 * Estimate group duration based on type and exercise count
 */
export function estimateGroupDuration(
  groupType: EnhancedExerciseGroupType,
  exerciseCount: number
): number {
  const baseTimePerExercise = 3 // minutes
  const setupTime = 2 // minutes
  
  switch (groupType) {
    case 'single':
      return baseTimePerExercise + setupTime
    
    case 'superset':
      // Less rest between exercises in superset
      return (exerciseCount * baseTimePerExercise * 0.8) + setupTime
    
    case 'circuit':
      // Multiple rounds, more total time
      return (exerciseCount * baseTimePerExercise * 1.2) + setupTime
    
    case 'complex':
      // Minimal transitions, more efficient
      return (exerciseCount * baseTimePerExercise * 0.7) + setupTime
    
    default:
      return exerciseCount * baseTimePerExercise + setupTime
  }
}

/**
 * Estimate workout duration for an enhanced workout entry
 */
export function estimateWorkoutDuration(entry: EnhancedWorkoutEntry): number {
  let duration = 0
  
  const exerciseCount = entry.exercises.length
  const assumedSetDuration = 45 // seconds per set
  const assumedRestBetweenSets = 90 // seconds
  const assumedSetupTime = 30 // seconds per exercise
  
  // Calculate base duration
  if (entry.repScheme && entry.repScheme.autoGenerate) {
    // Use generated sets for calculation
    const generatedSets = generateSetsFromRepScheme(entry.repScheme)
    const totalSets = generatedSets.length
    duration += totalSets * assumedSetDuration * exerciseCount
    duration += (totalSets - 1) * assumedRestBetweenSets
  } else {
    // Use manual sets configuration
    const totalSets = entry.sets || 1
    duration += totalSets * assumedSetDuration * exerciseCount
    duration += (totalSets - 1) * assumedRestBetweenSets
  }
  
  // Add execution style specific timing
  if (entry.executionStyle) {
    switch (entry.executionStyle.style) {
      case 'HIIT':
        if (isHIITExecutionStyle(entry.executionStyle)) {
          const totalInterval = entry.executionStyle.workInterval + entry.executionStyle.restInterval
          const rounds = entry.executionStyle.rounds || entry.sets || 1
          duration = totalInterval * rounds
        }
        break
        
      case 'EMOM':
        if (isEMOMExecutionStyle(entry.executionStyle)) {
          duration = entry.executionStyle.durationMinutes * 60
        }
        break
        
      case 'AMRAP':
        if (isAMRAPExecutionStyle(entry.executionStyle)) {
          duration = entry.executionStyle.durationMinutes * 60
        }
        break
    }
  }
  
  // Add setup time and transitions
  duration += exerciseCount * assumedSetupTime
  
  if (entry.restBetweenExercises && exerciseCount > 1) {
    duration += (exerciseCount - 1) * entry.restBetweenExercises
  }
  
  if (entry.restAfterGroup) {
    duration += entry.restAfterGroup
  }
  
  // Convert to minutes and round up
  return Math.ceil(duration / 60)
}

/**
 * Validate rep scheme pattern configuration
 */
export function validateRepSchemePattern(repScheme: RepScheme): PatternValidation {
  const validation: PatternValidation = {
    isValid: true,
    estimatedSets: 0,
    estimatedDuration: 0,
    warnings: []
  }
  
  if (!repScheme.autoGenerate) {
    validation.estimatedSets = 3 // Default assumption
    validation.estimatedDuration = 6 // 6 minutes for 3 sets
    return validation
  }
  
  const generatedSets = generateSetsFromRepScheme(repScheme)
  validation.estimatedSets = generatedSets.length
  validation.estimatedDuration = generatedSets.length * 2 // 2 minutes per set estimate
  
  // Add warnings based on set count
  if (generatedSets.length > 15) {
    validation.warnings?.push('Large number of sets may be fatiguing')
  }
  
  if (generatedSets.length > 25) {
    validation.warnings?.push('Very long workout - consider reducing scope')
  }
  
  // Specific warnings for pyramid schemes
  if (repScheme.type === 'pyramid') {
    const pyramidScheme = repScheme as PyramidRepScheme
    if (pyramidScheme.autoProgressWeight && (!pyramidScheme.startWeight || !pyramidScheme.peakWeight)) {
      validation.isValid = false
      validation.warnings?.push('Weight progression requires both start and peak weights')
    }
  }
  
  return validation
}

// ================================================================================================
// INTERNAL HELPER FUNCTIONS
// ================================================================================================

function generateRepPattern(scheme: RepScheme): number[] {
  switch (scheme.type) {
    case 'descending':
      return generateDescendingPattern(scheme as DescendingRepScheme)
    
    case 'pyramid':
      return generatePyramidPattern(scheme as PyramidRepScheme)
    
    case 'ascending':
      return generateAscendingPattern(scheme as AscendingRepScheme)
    
    default:
      return []
  }
}

function generateDescendingPattern(scheme: DescendingRepScheme): number[] {
  const reps: number[] = []
  for (let i = scheme.startReps; i >= scheme.endReps; i -= scheme.increment) {
    reps.push(i)
  }
  return reps
}

function generatePyramidPattern(scheme: PyramidRepScheme): number[] {
  const reps: number[] = []
  
  // Up phase
  for (let i = scheme.startReps; i >= scheme.peakReps; i -= scheme.increment) {
    reps.push(i)
  }
  
  // Down phase (skip the peak as it's already included)
  for (let i = scheme.peakReps + scheme.increment; i <= scheme.startReps; i += scheme.increment) {
    reps.push(i)
  }
  
  return reps
}

function generateAscendingPattern(scheme: AscendingRepScheme): number[] {
  const reps: number[] = []
  const maxSets = scheme.durationMinutes || 10
  
  for (let i = 0; i < maxSets; i++) {
    const currentReps = scheme.startReps + (i * scheme.increment)
    if (scheme.maxReps && currentReps > scheme.maxReps) break
    reps.push(currentReps)
  }
  
  return reps
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
      for (let i = 10; i >= 1; i -= 2) reps.push(i)
      for (let i = 2; i <= 10; i += 2) reps.push(i)
      break
    case '15-3-15':
      for (let i = 15; i >= 3; i -= 3) reps.push(i)
      for (let i = 6; i <= 15; i += 3) reps.push(i)
      break
  }
  
  return reps
}

// Type guards for execution styles
function isHIITExecutionStyle(style: ExecutionStyleConfig): style is HIITExecutionStyle {
  return style.style === 'HIIT'
}

function isEMOMExecutionStyle(style: ExecutionStyleConfig): style is EMOMExecutionStyle {
  return style.style === 'EMOM'
}

function isAMRAPExecutionStyle(style: ExecutionStyleConfig): style is AMRAPExecutionStyle {
  return style.style === 'AMRAP'
}

// Type guards for rep schemes
function isAscendingRepScheme(scheme: RepScheme): scheme is AscendingRepScheme {
  return scheme.type === 'ascending'
}