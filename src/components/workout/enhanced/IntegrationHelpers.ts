import { WorkoutEntry, Exercise } from '@/types'
import { EnhancedWorkoutEntry } from '@/types/exercise-groups'
import { convertToStandardEntry, convertToEnhancedEntry } from './EntryConversion'

// ================================================================================================
// STATE MANAGEMENT INTEGRATION HELPERS
// ================================================================================================

/**
 * Hook-style handler for enhanced group configuration integration
 * Provides all necessary handlers for integrating progressive disclosure with existing workflow
 */
export interface EnhancedGroupHandlers {
  handleAddEnhancedGroup: (enhancedEntry: EnhancedWorkoutEntry) => void
  handleEditEnhancedGroup: (enhancedEntry: EnhancedWorkoutEntry) => void
  convertEntryForEditing: (standardEntry: WorkoutEntry) => Partial<EnhancedWorkoutEntry>
  validateConfiguration: (enhancedEntry: EnhancedWorkoutEntry) => {
    isValid: boolean
    errors: string[]
    warnings: string[]
  }
}

/**
 * Create enhanced group handlers for integration with existing workout form state
 */
export function createEnhancedGroupHandlers(
  onAddEntry: (entry: WorkoutEntry) => void,
  onEditEntry: (entry: WorkoutEntry) => void
): EnhancedGroupHandlers {
  
  const handleAddEnhancedGroup = (enhancedEntry: EnhancedWorkoutEntry) => {
    // Convert enhanced entry to standard format for storage
    const standardEntry = convertToStandardEntry(enhancedEntry)
    onAddEntry(standardEntry)
  }

  const handleEditEnhancedGroup = (enhancedEntry: EnhancedWorkoutEntry) => {
    // Convert enhanced entry to standard format for storage
    const standardEntry = convertToStandardEntry(enhancedEntry)
    onEditEntry(standardEntry)
  }

  const convertEntryForEditing = (standardEntry: WorkoutEntry): Partial<EnhancedWorkoutEntry> => {
    return convertToEnhancedEntry(standardEntry)
  }

  const validateConfiguration = (enhancedEntry: EnhancedWorkoutEntry) => {
    const errors: string[] = []
    const warnings: string[] = []

    // Basic validation
    if (!enhancedEntry.type) {
      errors.push('Group type is required')
    }

    if (!enhancedEntry.exercises || enhancedEntry.exercises.length === 0) {
      errors.push('At least one exercise is required')
    }

    if (enhancedEntry.sets < 1) {
      errors.push('At least one set is required')
    }

    // Group type specific validation
    if (enhancedEntry.type === 'superset' && enhancedEntry.exercises?.length < 2) {
      errors.push('Supersets require at least 2 exercises')
    }

    if (enhancedEntry.type === 'circuit' && enhancedEntry.exercises?.length < 3) {
      errors.push('Circuits require at least 3 exercises')
    }

    // Execution style compatibility validation
    if (enhancedEntry.executionStyle?.style === 'HIIT' && enhancedEntry.repScheme?.type !== 'standard') {
      warnings.push('HIIT execution works best with standard rep schemes')
    }

    if (enhancedEntry.executionStyle?.style === 'AMRAP' && enhancedEntry.repScheme?.type !== 'standard') {
      warnings.push('AMRAP execution works best with standard rep schemes')
    }

    // Rep scheme validation
    if (enhancedEntry.repScheme?.type === 'ascending' && enhancedEntry.executionStyle?.style !== 'EMOM') {
      warnings.push('Ascending rep schemes work best with EMOM execution')
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings
    }
  }

  return {
    handleAddEnhancedGroup,
    handleEditEnhancedGroup,
    convertEntryForEditing,
    validateConfiguration
  }
}

// ================================================================================================
// EXERCISE SELECTION INTEGRATION
// ================================================================================================

/**
 * Enhanced exercise selection state for integration with group configuration
 */
export interface EnhancedExerciseSelectionState {
  selectedExercises: Exercise[]
  availableExercises: Exercise[]
  filterCriteria: {
    muscleGroups: string[]
    equipment: string[]
    searchQuery: string
  }
}

/**
 * Exercise selection handlers that work with enhanced group configuration
 */
export interface EnhancedExerciseSelectionHandlers {
  selectExercise: (exercise: Exercise) => void
  deselectExercise: (exerciseId: string) => void
  clearSelection: () => void
  setFilterCriteria: (criteria: Partial<EnhancedExerciseSelectionState['filterCriteria']>) => void
  getFilteredExercises: () => Exercise[]
}

/**
 * Create exercise selection handlers for enhanced group configuration
 */
export function createEnhancedExerciseSelectionHandlers(
  state: EnhancedExerciseSelectionState,
  setState: React.Dispatch<React.SetStateAction<EnhancedExerciseSelectionState>>
): EnhancedExerciseSelectionHandlers {

  const selectExercise = (exercise: Exercise) => {
    setState(prev => ({
      ...prev,
      selectedExercises: prev.selectedExercises.some(ex => ex.id === exercise.id)
        ? prev.selectedExercises // Already selected
        : [...prev.selectedExercises, exercise]
    }))
  }

  const deselectExercise = (exerciseId: string) => {
    setState(prev => ({
      ...prev,
      selectedExercises: prev.selectedExercises.filter(ex => ex.id !== exerciseId)
    }))
  }

  const clearSelection = () => {
    setState(prev => ({
      ...prev,
      selectedExercises: []
    }))
  }

  const setFilterCriteria = (criteria: Partial<EnhancedExerciseSelectionState['filterCriteria']>) => {
    setState(prev => ({
      ...prev,
      filterCriteria: { ...prev.filterCriteria, ...criteria }
    }))
  }

  const getFilteredExercises = (): Exercise[] => {
    const { muscleGroups, equipment, searchQuery } = state.filterCriteria
    
    return state.availableExercises.filter(exercise => {
      // Muscle group filter
      if (muscleGroups.length > 0 && !muscleGroups.includes(exercise.muscleGroup)) {
        return false
      }

      // Equipment filter
      if (equipment.length > 0 && !equipment.includes(exercise.equipment)) {
        return false
      }

      // Search query filter
      if (searchQuery && !exercise.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false
      }

      return true
    })
  }

  return {
    selectExercise,
    deselectExercise,
    clearSelection,
    setFilterCriteria,
    getFilteredExercises
  }
}

// ================================================================================================
// COMPLETE INTEGRATION WORKFLOW
// ================================================================================================

/**
 * Complete integration state that combines group configuration with exercise selection
 */
export interface CompleteIntegrationState {
  groupConfig: Partial<EnhancedWorkoutEntry>
  exerciseSelection: EnhancedExerciseSelectionState
  currentStep: 'configuration' | 'exercise-selection' | 'review'
  isEditing: boolean
}

/**
 * Complete workflow handlers for the enhanced group configuration integration
 */
export interface CompleteIntegrationHandlers extends EnhancedGroupHandlers, EnhancedExerciseSelectionHandlers {
  proceedToExerciseSelection: () => void
  returnToConfiguration: () => void
  proceedToReview: () => void
  completeConfiguration: () => void
  cancelConfiguration: () => void
}

/**
 * Create complete integration handlers for the full enhanced workflow
 */
export function createCompleteIntegrationHandlers(
  state: CompleteIntegrationState,
  setState: React.Dispatch<React.SetStateAction<CompleteIntegrationState>>,
  onComplete: (entry: WorkoutEntry) => void,
  onCancel: () => void
): CompleteIntegrationHandlers {

  // Create base handlers
  const groupHandlers = createEnhancedGroupHandlers(
    (entry) => onComplete(entry),
    (entry) => onComplete(entry)
  )

  const exerciseHandlers = createEnhancedExerciseSelectionHandlers(
    state.exerciseSelection,
    (exerciseState) => setState(prev => ({ ...prev, exerciseSelection: exerciseState }))
  )

  // Workflow navigation handlers
  const proceedToExerciseSelection = () => {
    setState(prev => ({ ...prev, currentStep: 'exercise-selection' }))
  }

  const returnToConfiguration = () => {
    setState(prev => ({ ...prev, currentStep: 'configuration' }))
  }

  const proceedToReview = () => {
    setState(prev => ({ ...prev, currentStep: 'review' }))
  }

  const completeConfiguration = () => {
    if (state.groupConfig && state.exerciseSelection.selectedExercises.length > 0) {
      const completeEntry: EnhancedWorkoutEntry = {
        ...state.groupConfig,
        exercises: state.exerciseSelection.selectedExercises.map(exercise => ({
          exerciseId: exercise.id,
          reps: 10, // Default values
          weight: exercise.isWeighted ? 20 : 0,
          rest: 90,
          tempo: '',
          notes: exercise.cues || ''
        }))
      } as EnhancedWorkoutEntry

      const standardEntry = convertToStandardEntry(completeEntry)
      onComplete(standardEntry)
    }
  }

  const cancelConfiguration = () => {
    onCancel()
  }

  return {
    ...groupHandlers,
    ...exerciseHandlers,
    proceedToExerciseSelection,
    returnToConfiguration,
    proceedToReview,
    completeConfiguration,
    cancelConfiguration
  }
}