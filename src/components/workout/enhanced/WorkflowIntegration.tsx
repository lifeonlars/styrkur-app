'use client'

import React, { createContext, useContext, useReducer, ReactNode } from 'react'
import { WorkoutEntry, Exercise } from '@/types'
import { EnhancedWorkoutEntry } from '@/types/exercise-groups'
import { convertToStandardEntry } from './EntryConversion'

// ================================================================================================
// WORKFLOW STATE MANAGEMENT
// ================================================================================================

type WorkflowStep = 'closed' | 'configuration' | 'exercise-selection' | 'finalizing'

interface WorkflowState {
  currentStep: WorkflowStep
  isEditing: boolean
  editingEntry?: WorkoutEntry
  configuredGroup?: EnhancedWorkoutEntry
  selectedExercises: Exercise[]
  error?: string
  isLoading: boolean
}

type WorkflowAction =
  | { type: 'START_NEW_GROUP' }
  | { type: 'START_EDIT_GROUP'; entry: WorkoutEntry }
  | { type: 'GROUP_CONFIGURED'; group: EnhancedWorkoutEntry }
  | { type: 'EXERCISES_SELECTED'; exercises: Exercise[] }
  | { type: 'BACK_TO_CONFIGURATION' }
  | { type: 'CANCEL_WORKFLOW' }
  | { type: 'COMPLETE_WORKFLOW' }
  | { type: 'SET_ERROR'; error: string }
  | { type: 'CLEAR_ERROR' }
  | { type: 'SET_LOADING'; loading: boolean }

const initialState: WorkflowState = {
  currentStep: 'closed',
  isEditing: false,
  selectedExercises: [],
  isLoading: false
}

function workflowReducer(state: WorkflowState, action: WorkflowAction): WorkflowState {
  switch (action.type) {
    case 'START_NEW_GROUP':
      return {
        ...initialState,
        currentStep: 'configuration',
        isEditing: false
      }

    case 'START_EDIT_GROUP':
      return {
        ...initialState,
        currentStep: 'configuration',
        isEditing: true,
        editingEntry: action.entry
      }

    case 'GROUP_CONFIGURED':
      // If editing and group has exercises, go straight to completion
      if (state.isEditing && action.group.exercises && action.group.exercises.length > 0) {
        return {
          ...state,
          currentStep: 'finalizing',
          configuredGroup: action.group
        }
      }
      // Otherwise, proceed to exercise selection
      return {
        ...state,
        currentStep: 'exercise-selection',
        configuredGroup: action.group
      }

    case 'EXERCISES_SELECTED':
      return {
        ...state,
        currentStep: 'finalizing',
        selectedExercises: action.exercises
      }

    case 'BACK_TO_CONFIGURATION':
      return {
        ...state,
        currentStep: 'configuration'
      }

    case 'CANCEL_WORKFLOW':
      return initialState

    case 'COMPLETE_WORKFLOW':
      return initialState

    case 'SET_ERROR':
      return {
        ...state,
        error: action.error,
        isLoading: false
      }

    case 'CLEAR_ERROR':
      return {
        ...state,
        error: undefined
      }

    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.loading
      }

    default:
      return state
  }
}

// ================================================================================================
// WORKFLOW CONTEXT
// ================================================================================================

interface WorkflowContextValue {
  state: WorkflowState
  actions: {
    startNewGroup: () => void
    startEditGroup: (entry: WorkoutEntry) => void
    groupConfigured: (group: EnhancedWorkoutEntry) => void
    exercisesSelected: (exercises: Exercise[]) => void
    backToConfiguration: () => void
    cancelWorkflow: () => void
    completeWorkflow: (entry: WorkoutEntry) => void
    setError: (error: string) => void
    clearError: () => void
    setLoading: (loading: boolean) => void
  }
}

const WorkflowContext = createContext<WorkflowContextValue | undefined>(undefined)

// ================================================================================================
// WORKFLOW PROVIDER
// ================================================================================================

interface WorkflowProviderProps {
  children: ReactNode
  onAddEntry: (entry: WorkoutEntry) => void
  onEditEntry: (entry: WorkoutEntry) => void
}

export function WorkflowProvider({ children, onAddEntry, onEditEntry }: WorkflowProviderProps) {
  const [state, dispatch] = useReducer(workflowReducer, initialState)

  const actions = {
    startNewGroup: () => {
      dispatch({ type: 'START_NEW_GROUP' })
    },

    startEditGroup: (entry: WorkoutEntry) => {
      dispatch({ type: 'START_EDIT_GROUP', entry })
    },

    groupConfigured: (group: EnhancedWorkoutEntry) => {
      dispatch({ type: 'GROUP_CONFIGURED', group })
    },

    exercisesSelected: (exercises: Exercise[]) => {
      dispatch({ type: 'EXERCISES_SELECTED', exercises })
      
      // Auto-complete the workflow when exercises are selected
      if (state.configuredGroup) {
        const completeGroup: EnhancedWorkoutEntry = {
          ...state.configuredGroup,
          exercises: exercises.map(exercise => ({
            exerciseId: exercise.id,
            reps: 10,
            weight: exercise.isWeighted ? 20 : 0,
            rest: 90,
            tempo: '',
            notes: exercise.cues || ''
          }))
        }

        const standardEntry = convertToStandardEntry(completeGroup)
        
        if (state.isEditing) {
          onEditEntry(standardEntry)
        } else {
          onAddEntry(standardEntry)
        }

        dispatch({ type: 'COMPLETE_WORKFLOW' })
      }
    },

    backToConfiguration: () => {
      dispatch({ type: 'BACK_TO_CONFIGURATION' })
    },

    cancelWorkflow: () => {
      dispatch({ type: 'CANCEL_WORKFLOW' })
    },

    completeWorkflow: (entry: WorkoutEntry) => {
      if (state.isEditing) {
        onEditEntry(entry)
      } else {
        onAddEntry(entry)
      }
      dispatch({ type: 'COMPLETE_WORKFLOW' })
    },

    setError: (error: string) => {
      dispatch({ type: 'SET_ERROR', error })
    },

    clearError: () => {
      dispatch({ type: 'CLEAR_ERROR' })
    },

    setLoading: (loading: boolean) => {
      dispatch({ type: 'SET_LOADING', loading })
    }
  }

  return (
    <WorkflowContext.Provider value={{ state, actions }}>
      {children}
    </WorkflowContext.Provider>
  )
}

// ================================================================================================
// WORKFLOW HOOK
// ================================================================================================

export function useWorkflow() {
  const context = useContext(WorkflowContext)
  if (context === undefined) {
    throw new Error('useWorkflow must be used within a WorkflowProvider')
  }
  return context
}

// ================================================================================================
// WORKFLOW ORCHESTRATOR COMPONENT
// ================================================================================================

interface WorkflowOrchestratorProps {
  availableExercises: Exercise[]
}

export function WorkflowOrchestrator({ availableExercises }: WorkflowOrchestratorProps) {
  const { state, actions } = useWorkflow()

  // Don't render anything if workflow is closed
  if (state.currentStep === 'closed') {
    return null
  }

  // Dynamically import components to avoid circular dependencies
  const renderCurrentStep = () => {
    switch (state.currentStep) {
      case 'configuration':
        // Dynamic import would go here in a real implementation
        // For now, we'll return a placeholder that should be replaced with actual component
        return (
          <div className="fixed inset-0 bg-neu-darkest/90 backdrop-blur-sm flex items-center justify-center z-[100]">
            <div className="bg-neu-modal-bg p-6 rounded-xl">
              <div className="text-white">Progressive Group Configuration</div>
              <div className="text-gray-400">Component should be imported and rendered here</div>
            </div>
          </div>
        )

      case 'exercise-selection':
        if (!state.configuredGroup) {
          actions.setError('No group configuration found')
          return null
        }
        
        // Dynamic import would go here in a real implementation
        return (
          <div className="fixed inset-0 bg-neu-darkest/90 backdrop-blur-sm flex items-center justify-center z-[100]">
            <div className="bg-neu-modal-bg p-6 rounded-xl">
              <div className="text-white">Exercise Selection</div>
              <div className="text-gray-400">Component should be imported and rendered here</div>
            </div>
          </div>
        )

      case 'finalizing':
        return (
          <div className="fixed inset-0 bg-neu-darkest/90 backdrop-blur-sm flex items-center justify-center z-[100]">
            <div className="bg-neu-modal-bg p-6 rounded-xl">
              <div className="text-white">Finalizing...</div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <>
      {renderCurrentStep()}
      
      {/* Error Display */}
      {state.error && (
        <div className="fixed top-4 right-4 bg-red-500 text-white p-4 rounded-lg z-[110]">
          <div className="flex justify-between items-center">
            <span>{state.error}</span>
            <button onClick={actions.clearError} className="ml-4 text-white/80 hover:text-white">
              ×
            </button>
          </div>
        </div>
      )}

      {/* Loading Indicator */}
      {state.isLoading && (
        <div className="fixed inset-0 bg-neu-darkest/50 backdrop-blur-sm flex items-center justify-center z-[110]">
          <div className="bg-neu-modal-bg p-6 rounded-xl">
            <div className="text-white">Loading...</div>
          </div>
        </div>
      )}
    </>
  )
}

// ================================================================================================
// WORKFLOW BUTTON COMPONENT
// ================================================================================================

interface WorkflowButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'outline' | 'dashed'
  size?: 'sm' | 'default' | 'lg'
  className?: string
}

export function StartWorkflowButton({ children, variant = 'primary', size = 'default', className = '' }: WorkflowButtonProps) {
  const { actions } = useWorkflow()

  return (
    <button
      onClick={actions.startNewGroup}
      className={`btn btn-${variant} btn-${size} ${className}`}
    >
      {children}
    </button>
  )
}

// ================================================================================================
// INTEGRATION UTILITIES
// ================================================================================================

/**
 * Hook for integrating workout form with enhanced group configuration workflow
 */
export function useWorkoutFormIntegration(
  workoutEntries: WorkoutEntry[],
  setWorkoutEntries: (entries: WorkoutEntry[]) => void
) {
  const handleAddEntry = (entry: WorkoutEntry) => {
    setWorkoutEntries([...workoutEntries, entry])
  }

  const handleEditEntry = (updatedEntry: WorkoutEntry) => {
    setWorkoutEntries(
      workoutEntries.map(entry => 
        entry.id === updatedEntry.id ? updatedEntry : entry
      )
    )
  }

  return { handleAddEntry, handleEditEntry }
}

/**
 * Validation utilities for workflow steps
 */
export const workflowValidation = {
  validateGroupConfiguration: (group: EnhancedWorkoutEntry): { isValid: boolean; errors: string[] } => {
    const errors: string[] = []

    if (!group.type) {
      errors.push('Group type is required')
    }

    if (!group.executionStyle?.style) {
      errors.push('Execution style is required')
    }

    if (!group.repScheme?.type) {
      errors.push('Rep scheme is required')
    }

    if (group.sets < 1) {
      errors.push('At least one set is required')
    }

    return {
      isValid: errors.length === 0,
      errors
    }
  },

  validateExerciseSelection: (
    exercises: Exercise[], 
    groupType: EnhancedWorkoutEntry['type']
  ): { isValid: boolean; errors: string[] } => {
    const errors: string[] = []

    if (exercises.length === 0) {
      errors.push('At least one exercise is required')
    }

    // Group-specific validation
    switch (groupType) {
      case 'single':
        if (exercises.length !== 1) {
          errors.push('Single exercise groups require exactly 1 exercise')
        }
        break
      case 'superset':
        if (exercises.length < 2 || exercises.length > 3) {
          errors.push('Supersets require 2-3 exercises')
        }
        break
      case 'circuit':
        if (exercises.length < 3) {
          errors.push('Circuits require at least 3 exercises')
        }
        break
      case 'complex':
        if (exercises.length < 2) {
          errors.push('Complex groups require at least 2 exercises')
        }
        break
    }

    return {
      isValid: errors.length === 0,
      errors
    }
  }
}