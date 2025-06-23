'use client'

import React, { useState, useReducer, useEffect, useMemo } from 'react'
import { X, ChevronLeft, ChevronRight, Check, Settings, Save } from 'lucide-react'
import { Button } from '@/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/ui/card'
import { Exercise } from '@/types'
import {
  EnhancedWorkoutEntry,
  EnhancedExerciseGroupType,
  ExecutionStyle,
  RepSchemeType,
  ExecutionStyleConfig,
  RepScheme
} from '@/types/exercise-groups'

// Import our Phase 2B components
import GroupTypeSelector from './GroupTypeSelector'
import ExecutionStyleSelector from './ExecutionStyleSelector'
import RepSchemeSelector from './RepSchemeSelector'
import WeightProgressionConfig from './WeightProgressionConfig'
import GroupPreview from './GroupPreview'
import ValidationFeedback, { 
  ValidationMessage, 
  createValidationMessages 
} from './ValidationFeedback'

// Import Phase 1B validation utilities
import {
  validateGroupSize,
  validateExecutionStyleCompatibility,
  validateRepSchemePattern
} from '@/validation/exercise-group-validation'

// ================================================================================================
// COMPONENT PROPS
// ================================================================================================

export interface GroupConfigurationModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (group: EnhancedWorkoutEntry) => void
  exercises: Exercise[]
  initialGroup?: Partial<EnhancedWorkoutEntry>
  title?: string
  weightUnit?: 'kg' | 'lbs'
  showPreview?: boolean
  allowDuplication?: boolean
}

// ================================================================================================
// CONFIGURATION STATE
// ================================================================================================

interface ConfigurationState {
  // Basic group info
  groupType: EnhancedExerciseGroupType
  label: string
  
  // Execution configuration
  executionStyle: ExecutionStyle
  executionStyleConfig: ExecutionStyleConfig
  
  // Rep scheme configuration
  repScheme: RepSchemeType
  repSchemePattern?: string
  repSchemeConfig: RepScheme
  
  // Weight progression (for pyramid schemes)
  startWeight: number
  peakWeight: number
  enableWeightProgression: boolean
  
  // Basic settings
  sets: number
  restBetweenSets: number
  restAfterGroup: number
  groupRPE?: number
  notes: string
  
  // Flow state
  currentStep: 'type' | 'execution' | 'repscheme' | 'weights' | 'preview'
  isValid: boolean
}

type ConfigurationAction =
  | { type: 'SET_GROUP_TYPE'; groupType: EnhancedExerciseGroupType }
  | { type: 'SET_EXECUTION_STYLE'; style: ExecutionStyle; config?: ExecutionStyleConfig }
  | { type: 'SET_REP_SCHEME'; scheme: RepSchemeType; pattern?: string }
  | { type: 'SET_WEIGHT_PROGRESSION'; startWeight: number; peakWeight: number }
  | { type: 'SET_BASIC_SETTING'; field: string; value: any }
  | { type: 'SET_STEP'; step: ConfigurationState['currentStep'] }
  | { type: 'RESET_STATE' }
  | { type: 'LOAD_INITIAL_STATE'; group: Partial<EnhancedWorkoutEntry> }

// ================================================================================================
// STATE REDUCER
// ================================================================================================

const initialState: ConfigurationState = {
  groupType: 'single',
  label: '',
  executionStyle: 'standard',
  executionStyleConfig: { style: 'standard', restBetweenSets: 90 },
  repScheme: 'standard',
  repSchemeConfig: { type: 'standard', autoGenerate: false },
  startWeight: 0,
  peakWeight: 0,
  enableWeightProgression: false,
  sets: 3,
  restBetweenSets: 90,
  restAfterGroup: 0,
  notes: '',
  currentStep: 'type',
  isValid: false
}

function configurationReducer(
  state: ConfigurationState,
  action: ConfigurationAction
): ConfigurationState {
  switch (action.type) {
    case 'SET_GROUP_TYPE':
      return {
        ...state,
        groupType: action.groupType,
        label: state.label || `${action.groupType} Group`
      }

    case 'SET_EXECUTION_STYLE':
      return {
        ...state,
        executionStyle: action.style,
        executionStyleConfig: action.config || { style: action.style }
      }

    case 'SET_REP_SCHEME':
      return {
        ...state,
        repScheme: action.scheme,
        repSchemePattern: action.pattern,
        repSchemeConfig: {
          type: action.scheme,
          autoGenerate: action.scheme !== 'standard',
          pattern: action.pattern
        }
      }

    case 'SET_WEIGHT_PROGRESSION':
      return {
        ...state,
        startWeight: action.startWeight,
        peakWeight: action.peakWeight,
        enableWeightProgression: action.startWeight > 0 && action.peakWeight > 0
      }

    case 'SET_BASIC_SETTING':
      return {
        ...state,
        [action.field]: action.value
      }

    case 'SET_STEP':
      return {
        ...state,
        currentStep: action.step
      }

    case 'LOAD_INITIAL_STATE':
      return {
        ...state,
        groupType: action.group.type || 'single',
        label: action.group.label || '',
        executionStyle: action.group.executionStyle?.style || 'standard',
        executionStyleConfig: action.group.executionStyle || { style: 'standard' },
        repScheme: action.group.repScheme?.type || 'standard',
        repSchemeConfig: action.group.repScheme || { type: 'standard', autoGenerate: false },
        sets: action.group.sets || 3,
        restAfterGroup: action.group.restAfterGroup || 0,
        notes: action.group.notes || ''
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

export default function GroupConfigurationModal({
  isOpen,
  onClose,
  onSave,
  exercises,
  initialGroup,
  title = 'Configure Exercise Group',
  weightUnit = 'kg',
  showPreview = true,
  allowDuplication = false
}: GroupConfigurationModalProps) {
  
  const [state, dispatch] = useReducer(configurationReducer, initialState)
  const [dismissedMessages, setDismissedMessages] = useState<Set<string>>(new Set())

  // ================================================================================================
  // EFFECTS
  // ================================================================================================

  // Load initial state when modal opens
  useEffect(() => {
    if (isOpen && initialGroup) {
      dispatch({ type: 'LOAD_INITIAL_STATE', group: initialGroup })
    } else if (isOpen) {
      dispatch({ type: 'RESET_STATE' })
    }
  }, [isOpen, initialGroup])

  // Auto-configure execution style for EMOM ascending
  useEffect(() => {
    if (state.repScheme === 'ascending' && state.executionStyle !== 'EMOM') {
      dispatch({
        type: 'SET_EXECUTION_STYLE',
        style: 'EMOM',
        config: { style: 'EMOM', intervalMinutes: 1, durationMinutes: 10 }
      })
    }
  }, [state.repScheme])

  // Auto-configure rep scheme for EMOM
  useEffect(() => {
    if (state.executionStyle === 'EMOM' && state.repScheme === 'standard') {
      dispatch({
        type: 'SET_REP_SCHEME',
        scheme: 'ascending',
        pattern: '1-rep'
      })
    }
  }, [state.executionStyle])

  // ================================================================================================
  // VALIDATION
  // ================================================================================================

  const validationMessages = useMemo(() => {
    const messages: ValidationMessage[] = []

    // Group type validation
    const groupSizeValidation = validateGroupSize(state.groupType, exercises.length)
    if (!groupSizeValidation.isValid) {
      const suggestions = groupSizeValidation.errors
        .filter(error => error.suggestion)
        .map(error => error.suggestion)
        .join(', ')
        
      messages.push({
        id: 'group-size',
        type: 'error',
        title: 'Invalid Group Size',
        message: groupSizeValidation.errors.map(error => error.message).join(', '),
        suggestion: suggestions || undefined
      })
    }

    // Execution style compatibility
    const executionCompatibility = validateExecutionStyleCompatibility(
      state.executionStyle,
      state.repScheme
    )
    if (!executionCompatibility.isValid) {
      const suggestions = executionCompatibility.errors
        .filter(error => error.suggestion)
        .map(error => error.suggestion)
        .join(', ')
        
      messages.push({
        id: 'execution-compatibility',
        type: 'warning',
        title: 'Style Compatibility',
        message: executionCompatibility.errors.map(error => error.message).join(', '),
        suggestion: suggestions || undefined
      })
    }

    // Rep scheme validation
    if (state.repSchemeConfig.autoGenerate) {
      const repSchemeValidation = validateRepSchemePattern(state.repSchemeConfig)
      if (!repSchemeValidation.isValid) {
        messages.push({
          id: 'rep-scheme',
          type: 'error',
          title: 'Invalid Rep Scheme',
          message: 'Rep scheme configuration is invalid',
          suggestion: repSchemeValidation.warnings?.join(', ')
        })
      }
    }

    // Weight progression validation
    if (state.enableWeightProgression) {
      if (state.startWeight <= 0 || state.peakWeight <= 0) {
        messages.push({
          id: 'weight-progression',
          type: 'error',
          title: 'Invalid Weight Progression',
          message: 'Both start and peak weights must be greater than 0'
        })
      } else if (state.peakWeight <= state.startWeight) {
        messages.push({
          id: 'weight-order',
          type: 'error',
          title: 'Invalid Weight Order',
          message: 'Peak weight must be higher than start weight'
        })
      }
    }

    // Filter out dismissed messages
    return messages.filter(msg => !dismissedMessages.has(msg.id))
  }, [state, exercises.length, dismissedMessages])

  const hasErrors = validationMessages.some(msg => msg.type === 'error')

  // ================================================================================================
  // STEP CONFIGURATION
  // ================================================================================================

  const steps = [
    { id: 'type', label: 'Group Type', required: true },
    { id: 'execution', label: 'Execution Style', required: true },
    { id: 'repscheme', label: 'Rep Scheme', required: true },
    { id: 'weights', label: 'Weight Progression', required: false, condition: () => state.repScheme === 'pyramid' },
    { id: 'preview', label: 'Preview', required: false, condition: () => showPreview }
  ].filter(step => !step.condition || step.condition())

  const currentStepIndex = steps.findIndex(step => step.id === state.currentStep)
  const canGoNext = currentStepIndex < steps.length - 1
  const canGoPrevious = currentStepIndex > 0

  // ================================================================================================
  // EVENT HANDLERS
  // ================================================================================================

  const handleClose = () => {
    dispatch({ type: 'RESET_STATE' })
    setDismissedMessages(new Set())
    onClose()
  }

  const handleNext = () => {
    if (canGoNext) {
      const nextStep = steps[currentStepIndex + 1]
      dispatch({ type: 'SET_STEP', step: nextStep.id as ConfigurationState['currentStep'] })
    }
  }

  const handlePrevious = () => {
    if (canGoPrevious) {
      const prevStep = steps[currentStepIndex - 1]
      dispatch({ type: 'SET_STEP', step: prevStep.id as ConfigurationState['currentStep'] })
    }
  }

  const handleSave = () => {
    if (hasErrors) return

    const group: EnhancedWorkoutEntry = {
      id: initialGroup?.id || `group-${Date.now()}`,
      type: state.groupType,
      label: state.label || `${state.groupType} Group`,
      exercises: exercises.map(ex => ({
        exerciseId: ex.id,
        sets: state.sets,
        reps: 0, // Will be determined by rep scheme
        weight: 0, // Will be set by user later
        rest: state.restBetweenSets
      })),
      sets: state.sets,
      restAfterGroup: state.restAfterGroup,
      groupRPE: state.groupRPE,
      notes: state.notes,
      repScheme: state.repSchemeConfig,
      executionStyle: state.executionStyleConfig,
      estimatedDuration: 0, // Will be calculated
      totalSets: state.sets
    }

    onSave(group)
    handleClose()
  }

  const handleDismissMessage = (messageId: string) => {
    setDismissedMessages(prev => new Set([...prev, messageId]))
  }

  // ================================================================================================
  // RENDER STEP CONTENT
  // ================================================================================================

  const renderStepContent = () => {
    switch (state.currentStep) {
      case 'type':
        return (
          <GroupTypeSelector
            selectedType={state.groupType}
            exerciseCount={exercises.length}
            exercises={exercises}
            onChange={(type) => dispatch({ type: 'SET_GROUP_TYPE', groupType: type })}
          />
        )

      case 'execution':
        return (
          <ExecutionStyleSelector
            selectedStyle={state.executionStyle}
            repScheme={state.repScheme}
            onChange={(style) => dispatch({ type: 'SET_EXECUTION_STYLE', style })}
            onStyleConfigChange={(config) => dispatch({ type: 'SET_EXECUTION_STYLE', style: config.style, config })}
          />
        )

      case 'repscheme':
        return (
          <RepSchemeSelector
            selectedScheme={state.repScheme}
            selectedPattern={state.repSchemePattern}
            executionStyle={state.executionStyle}
            onChange={(scheme, pattern) => dispatch({ type: 'SET_REP_SCHEME', scheme, pattern })}
          />
        )

      case 'weights':
        return (
          <WeightProgressionConfig
            repPattern={[]} // Would need to generate from rep scheme
            startWeight={state.startWeight}
            peakWeight={state.peakWeight}
            onStartWeightChange={(weight) => dispatch({ type: 'SET_WEIGHT_PROGRESSION', startWeight: weight, peakWeight: state.peakWeight })}
            onPeakWeightChange={(weight) => dispatch({ type: 'SET_WEIGHT_PROGRESSION', startWeight: state.startWeight, peakWeight: weight })}
            weightUnit={weightUnit}
            exerciseName={exercises.length === 1 ? exercises[0].name : undefined}
          />
        )

      case 'preview':
        return (
          <GroupPreview
            group={{
              ...state,
              type: state.groupType,
              label: state.label,
              exercises: exercises.map(ex => ({ exerciseId: ex.id })),
              repScheme: state.repSchemeConfig,
              executionStyle: state.executionStyleConfig
            }}
            exercises={exercises}
            expanded={true}
            showDuration={true}
          />
        )

      default:
        return null
    }
  }

  // ================================================================================================
  // RENDER
  // ================================================================================================

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-hidden" surface="convex" depth="elevated">
        <CardHeader className="border-b border-neu-light/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {canGoPrevious && (
                <Button
                  variant="flat"
                  size="icon"
                  onClick={handlePrevious}
                  className="h-8 w-8 p-0"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
              )}
              <div>
                <CardTitle className="text-h3 flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  {title}
                </CardTitle>
                <div className="text-sm text-gray-400 mt-1">
                  Step {currentStepIndex + 1} of {steps.length}: {steps[currentStepIndex]?.label}
                </div>
              </div>
            </div>
            
            <Button
              variant="flat"
              size="icon"
              onClick={handleClose}
              className="h-8 w-8 p-0"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Step Progress */}
          <div className="flex items-center gap-2 mt-4">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`flex-1 h-2 rounded-full transition-colors ${
                  index <= currentStepIndex ? 'bg-primary' : 'bg-neu-light/20'
                }`}
              />
            ))}
          </div>
        </CardHeader>

        <CardContent className="p-0 overflow-hidden">
          <div className="flex flex-col h-[calc(90vh-12rem)]">
            {/* Validation Messages */}
            {validationMessages.length > 0 && (
              <div className="p-4 border-b border-neu-light/10">
                <ValidationFeedback
                  messages={validationMessages}
                  onDismiss={handleDismissMessage}
                  compact={true}
                  maxVisible={3}
                />
              </div>
            )}

            {/* Step Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {renderStepContent()}
            </div>
          </div>
        </CardContent>

        {/* Footer */}
        <div className="border-t border-neu-light/10 p-4">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-400">
              {exercises.length} exercise{exercises.length !== 1 ? 's' : ''} selected
            </div>
            
            <div className="flex gap-2">
              {canGoNext ? (
                <Button onClick={handleNext}>
                  Next
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              ) : (
                <Button
                  onClick={handleSave}
                  disabled={hasErrors}
                  className="gap-2"
                >
                  <Save className="w-4 h-4" />
                  Save Configuration
                </Button>
              )}
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}