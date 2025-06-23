// Enhanced Exercise Selection Types - Phase 2A
// Types for multi-select exercise selection modal with grouping options

import { Exercise } from './index'
import { EnhancedExerciseGroupType } from './exercise-groups'

// ================================================================================================
// SELECTION STATE TYPES
// ================================================================================================

/**
 * Multi-select exercise selection state
 */
export interface ExerciseSelectionState {
  // Selection mode
  isMultiSelectMode: boolean
  
  // Selected exercises
  selectedExercises: Exercise[]
  selectedExerciseIds: Set<string>
  
  // Grouping configuration
  groupingMode: 'individual' | 'grouped' | null
  suggestedGroupType: EnhancedExerciseGroupType | null
  selectedGroupType: EnhancedExerciseGroupType | null
  
  // Modal flow state
  showGroupingOptions: boolean
  currentStep: 'selection' | 'grouping' | 'confirmation'
  
  // Equipment compatibility (for complex groups)
  equipmentCompatibility: EquipmentCompatibilityResult | null
}

/**
 * Equipment compatibility analysis result
 */
export interface EquipmentCompatibilityResult {
  isCompatible: boolean
  sharedEquipment: string[]
  conflictingEquipment: string[]
  compatibilityScore: number // 0-1, higher is better
  recommendComplex: boolean
}

/**
 * Group type suggestion with reasoning
 */
export interface GroupTypeSuggestion {
  groupType: EnhancedExerciseGroupType
  isPrimary: boolean
  isRecommended: boolean
  reasoning: string
  exerciseCountRange: { min: number; max: number }
  compatibilityScore: number
}

// ================================================================================================
// MODAL PROPS AND CONFIGURATION
// ================================================================================================

/**
 * Enhanced exercise selection modal props
 */
export interface EnhancedExerciseSelectionProps {
  // Basic modal props
  isOpen: boolean
  onClose: () => void
  
  // Selection callbacks
  onExerciseSelect?: (exercise: Exercise) => void // Single select (backwards compatibility)
  onMultipleExercisesSelect?: (selections: ExerciseGroupSelection[]) => void // Multi select
  
  // Pre-selection
  selectedExercises?: string[] // Pre-selected exercise IDs
  excludeExercises?: string[] // Exercises to exclude from selection
  
  // Configuration
  allowMultiSelect?: boolean // Enable/disable multi-select functionality
  defaultToMultiSelect?: boolean // Start in multi-select mode
  maxSelections?: number // Limit number of exercises that can be selected
  
  // Group type restrictions
  allowedGroupTypes?: EnhancedExerciseGroupType[]
  forceGroupType?: EnhancedExerciseGroupType // Skip group type selection
  
  // UI customization
  title?: string
  confirmButtonText?: string
  showPreview?: boolean // Show selection preview before confirming
}

/**
 * Exercise group selection result
 */
export interface ExerciseGroupSelection {
  id: string // Unique ID for this selection
  groupType: EnhancedExerciseGroupType
  exercises: Exercise[]
  label?: string // User-provided or auto-generated label
}

// ================================================================================================
// COMPONENT PROPS
// ================================================================================================

/**
 * Multi-select exercise card props
 */
export interface MultiSelectExerciseCardProps {
  exercise: Exercise
  isSelected: boolean
  isDisabled?: boolean
  selectionMode: 'single' | 'multi'
  onSelect: (exercise: Exercise) => void
  onDeselect: (exercise: Exercise) => void
  onToggleSelect: (exercise: Exercise) => void
  onInfo: (exercise: Exercise) => void
  showSelectionIndicator?: boolean
  compact?: boolean
}

/**
 * Selection summary props
 */
export interface SelectionSummaryProps {
  selectedExercises: Exercise[]
  onRemoveExercise: (exerciseId: string) => void
  onClearAll: () => void
  maxHeight?: string
  compact?: boolean
}

/**
 * Grouping options selector props
 */
export interface GroupingOptionsSelectorProps {
  selectedExercises: Exercise[]
  onGroupingModeChange: (mode: 'individual' | 'grouped') => void
  onGroupTypeSelect: (groupType: EnhancedExerciseGroupType) => void
  suggestions: GroupTypeSuggestion[]
  equipmentCompatibility: EquipmentCompatibilityResult | null
  currentGroupingMode: 'individual' | 'grouped' | null
  currentGroupType: EnhancedExerciseGroupType | null
}

/**
 * Group type suggestion card props
 */
export interface GroupTypeSuggestionCardProps {
  suggestion: GroupTypeSuggestion
  isSelected: boolean
  isDisabled: boolean
  onClick: (groupType: EnhancedExerciseGroupType) => void
  exerciseCount: number
}

// ================================================================================================
// SELECTION ACTIONS
// ================================================================================================

/**
 * Exercise selection actions
 */
export type ExerciseSelectionAction =
  | { type: 'TOGGLE_MULTI_SELECT_MODE' }
  | { type: 'SELECT_EXERCISE'; exercise: Exercise }
  | { type: 'DESELECT_EXERCISE'; exerciseId: string }
  | { type: 'CLEAR_SELECTION' }
  | { type: 'SELECT_ALL'; exercises: Exercise[] }
  | { type: 'SET_GROUPING_MODE'; mode: 'individual' | 'grouped' | null }
  | { type: 'SET_GROUP_TYPE'; groupType: EnhancedExerciseGroupType | null }
  | { type: 'SET_STEP'; step: 'selection' | 'grouping' | 'confirmation' }
  | { type: 'SET_EQUIPMENT_COMPATIBILITY'; compatibility: EquipmentCompatibilityResult | null }
  | { type: 'RESET_STATE' }

// ================================================================================================
// UTILITY TYPES
// ================================================================================================

/**
 * Selection validation result
 */
export interface SelectionValidationResult {
  isValid: boolean
  canProceed: boolean
  errors: string[]
  warnings: string[]
  suggestions: string[]
}

/**
 * Grouping preview data
 */
export interface GroupingPreview {
  groupingMode: 'individual' | 'grouped'
  groupType?: EnhancedExerciseGroupType
  resultDescription: string
  groupCount: number
  exerciseCount: number
  estimatedDuration?: number
  warnings?: string[]
}

/**
 * Search and filter state for multi-select
 */
export interface EnhancedSearchState {
  searchTerm: string
  selectedMuscleGroup: string
  selectedEquipment: string[]
  showSelectedOnly: boolean
  sortBy: 'name' | 'muscle_group' | 'equipment' | 'recent'
  resultsCount: number
  preserveSelection: boolean // Preserve selection during filter changes
}