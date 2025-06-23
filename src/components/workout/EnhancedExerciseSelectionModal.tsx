'use client'

import React, { useState, useReducer, useEffect, useCallback } from 'react'
import { X, Users, User, ChevronLeft, Check } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/ui/card'
import { Button } from '@/ui/button'
import { Exercise } from '@/types'
import {
  EnhancedExerciseSelectionProps,
  ExerciseSelectionState,
  ExerciseSelectionAction,
  ExerciseGroupSelection,
  GroupTypeSuggestion,
  EquipmentCompatibilityResult
} from '@/types/exercise-selection'
import { EnhancedExerciseGroupType } from '@/types/exercise-groups'
import {
  suggestGroupType,
  getGroupTypeDisplayName,
  canFormComplex,
  getSharedEquipment
} from '@/utils/exercise-groups'
import { validateGroupSize } from '@/validation/exercise-group-validation'
import MultiSelectExerciseSearch from './MultiSelectExerciseSearch'
import SelectionSummary from './SelectionSummary'
import GroupingOptionsSelector from './GroupingOptionsSelector'
import GroupingPreview from './GroupingPreview'

// ================================================================================================
// STATE MANAGEMENT
// ================================================================================================

const initialState: ExerciseSelectionState = {
  isMultiSelectMode: false,
  selectedExercises: [],
  selectedExerciseIds: new Set(),
  groupingMode: null,
  suggestedGroupType: null,
  selectedGroupType: null,
  showGroupingOptions: false,
  currentStep: 'selection',
  equipmentCompatibility: null
}

function exerciseSelectionReducer(
  state: ExerciseSelectionState,
  action: ExerciseSelectionAction
): ExerciseSelectionState {
  switch (action.type) {
    case 'TOGGLE_MULTI_SELECT_MODE':
      return {
        ...state,
        isMultiSelectMode: !state.isMultiSelectMode,
        selectedExercises: [],
        selectedExerciseIds: new Set(),
        currentStep: 'selection'
      }

    case 'SELECT_EXERCISE':
      if (state.selectedExerciseIds.has(action.exercise.id)) {
        return state // Already selected
      }
      const newSelectedExercises = [...state.selectedExercises, action.exercise]
      const newSelectedIds = new Set(state.selectedExerciseIds).add(action.exercise.id)
      
      return {
        ...state,
        selectedExercises: newSelectedExercises,
        selectedExerciseIds: newSelectedIds
      }

    case 'DESELECT_EXERCISE':
      const filteredExercises = state.selectedExercises.filter(ex => ex.id !== action.exerciseId)
      const filteredIds = new Set(state.selectedExerciseIds)
      filteredIds.delete(action.exerciseId)
      
      return {
        ...state,
        selectedExercises: filteredExercises,
        selectedExerciseIds: filteredIds
      }

    case 'CLEAR_SELECTION':
      return {
        ...state,
        selectedExercises: [],
        selectedExerciseIds: new Set(),
        currentStep: 'selection',
        groupingMode: null,
        selectedGroupType: null,
        showGroupingOptions: false
      }

    case 'SELECT_ALL':
      const allIds = new Set(action.exercises.map(ex => ex.id))
      return {
        ...state,
        selectedExercises: action.exercises,
        selectedExerciseIds: allIds
      }

    case 'SET_GROUPING_MODE':
      return {
        ...state,
        groupingMode: action.mode,
        currentStep: action.mode ? 'grouping' : 'selection'
      }

    case 'SET_GROUP_TYPE':
      return {
        ...state,
        selectedGroupType: action.groupType
      }

    case 'SET_STEP':
      return {
        ...state,
        currentStep: action.step,
        showGroupingOptions: action.step === 'grouping'
      }

    case 'SET_EQUIPMENT_COMPATIBILITY':
      return {
        ...state,
        equipmentCompatibility: action.compatibility
      }

    case 'RESET_STATE':
      return initialState

    default:
      return state
  }
}

// ================================================================================================
// MAIN COMPONENT
// ================================================================================================

export default function EnhancedExerciseSelectionModal({
  isOpen,
  onClose,
  onExerciseSelect,
  onMultipleExercisesSelect,
  selectedExercises = [],
  excludeExercises = [],
  allowMultiSelect = true,
  defaultToMultiSelect = false,
  maxSelections = 15,
  allowedGroupTypes,
  forceGroupType,
  title = "Select Exercises",
  confirmButtonText = "Add to Workout",
  showPreview = true
}: EnhancedExerciseSelectionProps) {
  const [state, dispatch] = useReducer(exerciseSelectionReducer, {
    ...initialState,
    isMultiSelectMode: defaultToMultiSelect
  })

  const [suggestions, setSuggestions] = useState<GroupTypeSuggestion[]>([])

  // ================================================================================================
  // EFFECTS
  // ================================================================================================

  // Initialize pre-selected exercises
  useEffect(() => {
    if (selectedExercises.length > 0 && isOpen) {
      // This would need to be implemented with actual exercise lookup
      // For now, we'll just track the IDs
    }
  }, [selectedExercises, isOpen])

  // Generate group type suggestions when selection changes
  useEffect(() => {
    if (state.selectedExercises.length > 0) {
      generateGroupTypeSuggestions()
      analyzeEquipmentCompatibility()
    }
  }, [state.selectedExercises])

  // ================================================================================================
  // SUGGESTION GENERATION
  // ================================================================================================

  const generateGroupTypeSuggestions = useCallback(() => {
    const exerciseCount = state.selectedExercises.length
    const suggestedTypes = suggestGroupType(exerciseCount)
    
    const suggestions: GroupTypeSuggestion[] = suggestedTypes.map(groupType => {
      const validation = validateGroupSize(groupType, exerciseCount)
      const isValid = validation.isValid
      
      let reasoning = ''
      let isPrimary = false
      let compatibilityScore = 0.5
      
      switch (groupType) {
        case 'single':
          reasoning = 'Individual exercises for focused training'
          isPrimary = exerciseCount === 1
          compatibilityScore = exerciseCount === 1 ? 1.0 : 0.1
          break
        
        case 'superset':
          reasoning = 'Perfect for 2-3 exercises performed back-to-back'
          isPrimary = exerciseCount >= 2 && exerciseCount <= 3
          compatibilityScore = exerciseCount >= 2 && exerciseCount <= 3 ? 0.9 : 0.3
          break
        
        case 'circuit':
          reasoning = 'Great for 3+ exercises in sequence'
          isPrimary = exerciseCount >= 3 && exerciseCount <= 8
          compatibilityScore = exerciseCount >= 3 ? 0.8 : 0.2
          break
        
        case 'complex':
          reasoning = 'Uses same equipment throughout'
          isPrimary = false // Will be set based on equipment compatibility
          compatibilityScore = 0.6 // Will be updated based on equipment
          break
      }
      
      return {
        groupType,
        isPrimary,
        isRecommended: isValid && compatibilityScore > 0.7,
        reasoning,
        exerciseCountRange: { min: 1, max: 15 }, // This should come from validation utils
        compatibilityScore
      }
    })

    // Filter by allowed group types if specified
    const filteredSuggestions = allowedGroupTypes 
      ? suggestions.filter(s => allowedGroupTypes.includes(s.groupType))
      : suggestions

    setSuggestions(filteredSuggestions.sort((a, b) => b.compatibilityScore - a.compatibilityScore))
  }, [state.selectedExercises, allowedGroupTypes])

  const analyzeEquipmentCompatibility = useCallback(() => {
    if (state.selectedExercises.length < 2) {
      dispatch({ type: 'SET_EQUIPMENT_COMPATIBILITY', compatibility: null })
      return
    }

    const sharedEquipment = getSharedEquipment(state.selectedExercises)
    const isCompatible = canFormComplex(state.selectedExercises)
    
    // Calculate compatibility score
    const totalEquipment = new Set(
      state.selectedExercises.flatMap(ex => 
        ex.equipment.toLowerCase().split(/[\s,&]+/).filter(Boolean)
      )
    ).size
    
    const compatibilityScore = sharedEquipment.length / Math.max(totalEquipment, 1)
    
    const result: EquipmentCompatibilityResult = {
      isCompatible,
      sharedEquipment,
      conflictingEquipment: [], // Could be calculated more thoroughly
      compatibilityScore,
      recommendComplex: isCompatible && compatibilityScore > 0.5
    }

    dispatch({ type: 'SET_EQUIPMENT_COMPATIBILITY', compatibility: result })

    // Update complex suggestion based on equipment compatibility
    if (result.recommendComplex) {
      setSuggestions(prev => prev.map(s => 
        s.groupType === 'complex' 
          ? { ...s, isPrimary: true, compatibilityScore: 0.85, isRecommended: true }
          : s
      ))
    }
  }, [state.selectedExercises])

  // ================================================================================================
  // EVENT HANDLERS
  // ================================================================================================

  const handleExerciseSelect = (exercise: Exercise) => {
    if (state.isMultiSelectMode) {
      if (state.selectedExerciseIds.has(exercise.id)) {
        dispatch({ type: 'DESELECT_EXERCISE', exerciseId: exercise.id })
      } else {
        if (state.selectedExercises.length < maxSelections) {
          dispatch({ type: 'SELECT_EXERCISE', exercise })
        }
      }
    } else {
      // Single select mode - call the callback and close
      onExerciseSelect?.(exercise)
      onClose()
    }
  }

  const handleToggleMultiSelect = () => {
    dispatch({ type: 'TOGGLE_MULTI_SELECT_MODE' })
  }

  const handleProceedToGrouping = () => {
    if (state.selectedExercises.length === 1) {
      // Skip grouping for single exercise
      handleConfirmSelection('individual', 'single')
    } else {
      dispatch({ type: 'SET_STEP', step: 'grouping' })
    }
  }

  const handleGroupingModeChange = (mode: 'individual' | 'grouped') => {
    dispatch({ type: 'SET_GROUPING_MODE', mode })
    
    if (mode === 'individual') {
      // Auto-select single group type for individual mode
      dispatch({ type: 'SET_GROUP_TYPE', groupType: 'single' })
    } else {
      // Reset group type to let user choose
      dispatch({ type: 'SET_GROUP_TYPE', groupType: null })
    }
  }

  const handleGroupTypeSelect = (groupType: EnhancedExerciseGroupType) => {
    dispatch({ type: 'SET_GROUP_TYPE', groupType })
  }

  const handleConfirmSelection = (
    groupingMode: 'individual' | 'grouped' = state.groupingMode || 'individual',
    groupType: EnhancedExerciseGroupType = state.selectedGroupType || 'single'
  ) => {
    if (groupingMode === 'individual') {
      // Create individual groups for each exercise
      const selections: ExerciseGroupSelection[] = state.selectedExercises.map((exercise, index) => ({
        id: `individual-${exercise.id}-${Date.now()}-${index}`,
        groupType: 'single',
        exercises: [exercise],
        label: exercise.name
      }))
      
      onMultipleExercisesSelect?.(selections)
    } else {
      // Create single group with all exercises
      const selection: ExerciseGroupSelection = {
        id: `group-${Date.now()}`,
        groupType,
        exercises: state.selectedExercises,
        label: `${getGroupTypeDisplayName(groupType)} (${state.selectedExercises.length} exercises)`
      }
      
      onMultipleExercisesSelect?.([selection])
    }
    
    onClose()
  }

  const handleBack = () => {
    if (state.currentStep === 'grouping') {
      dispatch({ type: 'SET_STEP', step: 'selection' })
    } else if (state.currentStep === 'confirmation') {
      dispatch({ type: 'SET_STEP', step: 'grouping' })
    }
  }

  const handleClose = () => {
    dispatch({ type: 'RESET_STATE' })
    onClose()
  }

  // ================================================================================================
  // RENDER CONDITIONS
  // ================================================================================================

  if (!isOpen) return null

  const canProceed = state.selectedExercises.length > 0
  const showBackButton = state.currentStep !== 'selection'
  const isGroupingStep = state.currentStep === 'grouping'
  const canConfirm = state.groupingMode && (
    state.groupingMode === 'individual' || 
    (state.groupingMode === 'grouped' && state.selectedGroupType)
  )

  // ================================================================================================
  // RENDER
  // ================================================================================================

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-hidden" surface="convex" depth="elevated">
        <CardHeader className="border-b border-neu-light/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {showBackButton && (
                <Button
                  variant="flat"
                  size="default"
                  onClick={handleBack}
                  className="p-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
              )}
              <div>
                <CardTitle className="text-h3">
                  {state.currentStep === 'selection' && title}
                  {state.currentStep === 'grouping' && 'Configure Groups'}
                  {state.currentStep === 'confirmation' && 'Confirm Selection'}
                </CardTitle>
                {state.isMultiSelectMode && state.selectedExercises.length > 0 && (
                  <p className="text-sm text-gray-400 mt-1">
                    {state.selectedExercises.length} exercise{state.selectedExercises.length !== 1 ? 's' : ''} selected
                  </p>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              {allowMultiSelect && state.currentStep === 'selection' && (
                <Button
                  variant={state.isMultiSelectMode ? "primary" : "outline"}
                  size="default"
                  onClick={handleToggleMultiSelect}
                  className="gap-2"
                >
                  {state.isMultiSelectMode ? <Users className="w-4 h-4" /> : <User className="w-4 h-4" />}
                  {state.isMultiSelectMode ? 'Multi-Select' : 'Single'}
                </Button>
              )}
              
              <Button
                variant="flat"
                size="default"
                onClick={handleClose}
                className="p-2"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0 overflow-hidden">
          <div className="flex flex-col h-[calc(90vh-8rem)]">
            {state.currentStep === 'selection' && (
              <>
                <div className="flex-1 overflow-hidden">
                  <MultiSelectExerciseSearch
                    isMultiSelectMode={state.isMultiSelectMode}
                    selectedExercises={state.selectedExercises}
                    selectedExerciseIds={state.selectedExerciseIds}
                    onExerciseSelect={handleExerciseSelect}
                    onExerciseDeselect={(exerciseId) => 
                      dispatch({ type: 'DESELECT_EXERCISE', exerciseId })
                    }
                    excludeExercises={excludeExercises}
                    maxSelections={maxSelections}
                  />
                </div>

                {state.isMultiSelectMode && state.selectedExercises.length > 0 && (
                  <div className="border-t border-neu-light/10 p-4">
                    <SelectionSummary
                      selectedExercises={state.selectedExercises}
                      onRemoveExercise={(exerciseId) => 
                        dispatch({ type: 'DESELECT_EXERCISE', exerciseId })
                      }
                      onClearAll={() => dispatch({ type: 'CLEAR_SELECTION' })}
                      compact={true}
                    />
                  </div>
                )}
              </>
            )}

            {state.currentStep === 'grouping' && (
              <div className="flex-1 p-6 overflow-y-auto">
                <GroupingOptionsSelector
                  selectedExercises={state.selectedExercises}
                  onGroupingModeChange={handleGroupingModeChange}
                  onGroupTypeSelect={handleGroupTypeSelect}
                  suggestions={suggestions}
                  equipmentCompatibility={state.equipmentCompatibility}
                  currentGroupingMode={state.groupingMode}
                  currentGroupType={state.selectedGroupType}
                />
              </div>
            )}

            {state.currentStep === 'confirmation' && showPreview && (
              <div className="flex-1 p-6 overflow-y-auto">
                <GroupingPreview
                  selectedExercises={state.selectedExercises}
                  groupingMode={state.groupingMode!}
                  groupType={state.selectedGroupType}
                />
              </div>
            )}
          </div>
        </CardContent>

        <div className="border-t border-neu-light/10 p-4">
          <div className="flex justify-between items-center">
            <div>
              {state.currentStep === 'selection' && state.isMultiSelectMode && (
                <Button
                  variant="outline"
                  onClick={() => dispatch({ type: 'CLEAR_SELECTION' })}
                  disabled={state.selectedExercises.length === 0}
                >
                  Clear All
                </Button>
              )}
            </div>
            
            <div className="flex gap-2">
              {state.currentStep === 'selection' && canProceed && (
                <Button onClick={handleProceedToGrouping}>
                  Continue
                </Button>
              )}
              
              {state.currentStep === 'grouping' && canConfirm && (
                <Button onClick={() => handleConfirmSelection()}>
                  <Check className="w-4 h-4 mr-2" />
                  {confirmButtonText}
                </Button>
              )}
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}