'use client'

import React, { useState, useReducer, useEffect, useMemo } from 'react'
import { X, ChevronLeft, ChevronRight, Check, Save, Play, Info } from 'lucide-react'
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
  createValidationMessage 
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

export interface GroupConfigurationPanelProps {
  exercises: Exercise[]
  existingGroup?: Partial<EnhancedWorkoutEntry>
  onSave: (group: EnhancedWorkoutEntry) => void
  onCancel: () => void
  weightUnit?: 'kg' | 'lbs'
  autoAdvance?: boolean
  showPreview?: boolean
  compact?: boolean
  title?: string
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
  currentStep: number
  stepComplete: boolean[]
  isValid: boolean
}

type ConfigurationAction =
  | { type: 'SET_GROUP_TYPE'; groupType: EnhancedExerciseGroupType }
  | { type: 'SET_EXECUTION_STYLE'; style: ExecutionStyle; config?: ExecutionStyleConfig }
  | { type: 'SET_REP_SCHEME'; scheme: RepSchemeType; pattern?: string }
  | { type: 'SET_WEIGHT_PROGRESSION'; startWeight: number; peakWeight: number }
  | { type: 'SET_BASIC_SETTING'; field: string; value: any }
  | { type: 'SET_STEP'; step: number }
  | { type: 'NEXT_STEP' }
  | { type: 'PREV_STEP' }
  | { type: 'RESET_STATE' }
  | { type: 'LOAD_INITIAL_STATE'; group: Partial<EnhancedWorkoutEntry> }
  | { type: 'SET_STEP_COMPLETE'; step: number; complete: boolean }

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
  currentStep: 0,
  stepComplete: [false, false, false, false, false],
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
        label: state.label || `${action.groupType} Group`,
        stepComplete: state.stepComplete.map((complete, index) => 
          index === 0 ? true : complete
        )
      }

    case 'SET_EXECUTION_STYLE':
      return {
        ...state,
        executionStyle: action.style,
        executionStyleConfig: action.config || { style: action.style },
        stepComplete: state.stepComplete.map((complete, index) => 
          index === 1 ? true : complete
        )
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
        },
        stepComplete: state.stepComplete.map((complete, index) => 
          index === 2 ? true : complete
        )
      }

    case 'SET_WEIGHT_PROGRESSION':
      return {
        ...state,
        startWeight: action.startWeight,
        peakWeight: action.peakWeight,
        enableWeightProgression: action.startWeight > 0 && action.peakWeight > 0,
        stepComplete: state.stepComplete.map((complete, index) => 
          index === 3 ? (action.startWeight > 0 && action.peakWeight > 0) : complete
        )
      }

    case 'SET_BASIC_SETTING':
      return {
        ...state,
        [action.field]: action.value
      }

    case 'SET_STEP':
      return {
        ...state,
        currentStep: Math.max(0, Math.min(4, action.step))
      }

    case 'NEXT_STEP':
      return {
        ...state,
        currentStep: Math.min(4, state.currentStep + 1)
      }

    case 'PREV_STEP':
      return {
        ...state,
        currentStep: Math.max(0, state.currentStep - 1)
      }

    case 'SET_STEP_COMPLETE':
      return {
        ...state,
        stepComplete: state.stepComplete.map((complete, index) => 
          index === action.step ? action.complete : complete
        )
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
        notes: action.group.notes || '',
        stepComplete: [true, true, true, false, false]
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

export default function GroupConfigurationPanel({
  exercises,
  existingGroup,
  onSave,
  onCancel,
  weightUnit = 'kg',
  autoAdvance = true,
  showPreview = true,
  compact = false,
  title = 'Configure Exercise Group'
}: GroupConfigurationPanelProps) {
  
  const [state, dispatch] = useReducer(configurationReducer, initialState)
  const [dismissedMessages, setDismissedMessages] = useState<Set<string>>(new Set())

  // ================================================================================================
  // EFFECTS
  // ================================================================================================

  // Load initial state when component mounts
  useEffect(() => {
    if (existingGroup) {
      dispatch({ type: 'LOAD_INITIAL_STATE', group: existingGroup })
    } else {
      dispatch({ type: 'RESET_STATE' })
    }
  }, [existingGroup])

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

  // Auto-advance to next step when current step is complete
  useEffect(() => {
    if (autoAdvance && state.stepComplete[state.currentStep] && state.currentStep < 4) {
      setTimeout(() => {
        dispatch({ type: 'NEXT_STEP' })
      }, 500)
    }
  }, [state.stepComplete, state.currentStep, autoAdvance])

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
      
      messages.push(
        createValidationMessage(
          'error',
          'Invalid Group Size',
          groupSizeValidation.errors.map(error => error.message).join(', '),
          { suggestion: suggestions || undefined }
        )
      )
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
      
      messages.push(
        createValidationMessage(
          'warning',
          'Style Compatibility',
          executionCompatibility.errors.map(error => error.message).join(', '),
          { suggestion: suggestions || undefined }
        )
      )
    }

    // Rep scheme validation
    if (state.repSchemeConfig.autoGenerate) {
      const repSchemeValidation = validateRepSchemePattern(state.repSchemeConfig)
      if (!repSchemeValidation.isValid) {
        messages.push(
          createValidationMessage(
            'error',
            'Invalid Rep Scheme',
            'Rep scheme configuration is invalid',
            { suggestion: repSchemeValidation.warnings?.join(', ') }
          )
        )
      }
    }

    // Weight progression validation
    if (state.enableWeightProgression) {
      if (state.startWeight <= 0 || state.peakWeight <= 0) {
        messages.push(
          createValidationMessage(
            'error',
            'Invalid Weight Progression',
            'Both start and peak weights must be greater than 0'
          )
        )
      } else if (state.peakWeight <= state.startWeight) {
        messages.push(
          createValidationMessage(
            'error',
            'Invalid Weight Order',
            'Peak weight must be higher than start weight'
          )
        )
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
    { id: 0, label: 'Group Type', required: true },
    { id: 1, label: 'Execution Style', required: true },
    { id: 2, label: 'Rep Scheme', required: true },
    { id: 3, label: 'Weight Progression', required: false, condition: () => state.repScheme === 'pyramid' },
    { id: 4, label: 'Preview', required: false, condition: () => showPreview }
  ].filter(step => !step.condition || step.condition())

  const canGoNext = state.currentStep < steps.length - 1
  const canGoPrevious = state.currentStep > 0
  const canSave = !hasErrors && state.stepComplete.slice(0, 3).every(complete => complete)

  // ================================================================================================
  // EVENT HANDLERS
  // ================================================================================================

  const handleNext = () => {
    if (canGoNext) {
      dispatch({ type: 'NEXT_STEP' })
    }
  }

  const handlePrevious = () => {
    if (canGoPrevious) {
      dispatch({ type: 'PREV_STEP' })
    }
  }

  const handleSave = () => {
    if (!canSave) return

    const group: EnhancedWorkoutEntry = {
      id: existingGroup?.id || `group-${Date.now()}`,
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
  }

  const handleDismissMessage = (messageId: string) => {
    setDismissedMessages(prev => new Set([...prev, messageId]))
  }

  const handleStepClick = (stepIndex: number) => {
    dispatch({ type: 'SET_STEP', step: stepIndex })
  }

  // ================================================================================================
  // RENDER STEP CONTENT
  // ================================================================================================

  const renderStepContent = () => {
    switch (state.currentStep) {
      case 0:
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <h3 className="text-lg font-medium text-white">Select Group Type</h3>
              <Button variant="flat" size="icon" className="h-5 w-5 p-0">
                <Info className="w-3 h-3" />
              </Button>
            </div>
            <GroupTypeSelector
              selectedType={state.groupType}
              exerciseCount={exercises.length}
              exercises={exercises}
              onChange={(type) => dispatch({ type: 'SET_GROUP_TYPE', groupType: type })}
            />
          </div>
        )

      case 1:
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <h3 className="text-lg font-medium text-white">Choose Execution Style</h3>
              <Button variant="flat" size="icon" className="h-5 w-5 p-0">
                <Info className="w-3 h-3" />
              </Button>
            </div>
            <ExecutionStyleSelector
              selectedStyle={state.executionStyle}
              repScheme={state.repScheme}
              onChange={(style) => dispatch({ type: 'SET_EXECUTION_STYLE', style })}
              onStyleConfigChange={(config) => 
                dispatch({ type: 'SET_EXECUTION_STYLE', style: config.style, config })
              }
            />
          </div>
        )

      case 2:
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <h3 className="text-lg font-medium text-white">Select Rep Scheme</h3>
              <Button variant="flat" size="icon" className="h-5 w-5 p-0">
                <Info className="w-3 h-3" />
              </Button>
            </div>
            <RepSchemeSelector
              selectedScheme={state.repScheme}
              selectedPattern={state.repSchemePattern}
              executionStyle={state.executionStyle}
              onChange={(scheme, pattern) => 
                dispatch({ type: 'SET_REP_SCHEME', scheme, pattern })
              }
            />
          </div>
        )

      case 3:
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <h3 className="text-lg font-medium text-white">Configure Weight Progression</h3>
              <Button variant="flat" size="icon" className="h-5 w-5 p-0">
                <Info className="w-3 h-3" />
              </Button>
            </div>
            <WeightProgressionConfig
              repPattern={[]} // Would need to generate from rep scheme
              startWeight={state.startWeight}
              peakWeight={state.peakWeight}
              onStartWeightChange={(weight) => 
                dispatch({ 
                  type: 'SET_WEIGHT_PROGRESSION', 
                  startWeight: weight, 
                  peakWeight: state.peakWeight 
                })
              }
              onPeakWeightChange={(weight) => 
                dispatch({ 
                  type: 'SET_WEIGHT_PROGRESSION', 
                  startWeight: state.startWeight, 
                  peakWeight: weight 
                })
              }
              weightUnit={weightUnit}
              exerciseName={exercises.length === 1 ? exercises[0].name : undefined}
            />
          </div>
        )

      case 4:
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <h3 className="text-lg font-medium text-white">Preview Configuration</h3>
              <Button variant="flat" size="icon" className="h-5 w-5 p-0">
                <Info className="w-3 h-3" />
              </Button>
            </div>
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
          </div>
        )

      default:
        return null
    }
  }

  // ================================================================================================
  // RENDER
  // ================================================================================================

  return (
    <Card className="w-full max-w-4xl mx-auto" surface="convex" depth="elevated">
      <CardHeader className="border-b border-neu-light/10">
        <div className="flex items-center justify-between">
          <CardTitle className="text-h3 flex items-center gap-2">
            <Play className="w-5 h-5" />
            {title}
          </CardTitle>
          
          <Button
            variant="flat"
            size="icon"
            onClick={onCancel}
            className="h-8 w-8 p-0"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Step Progress */}
        <div className="flex items-center gap-2 mt-4">
          {steps.map((step, index) => (
            <div key={step.id} className="flex-1 flex items-center gap-2">
              <button
                onClick={() => handleStepClick(index)}
                className={`flex-1 h-2 rounded-full transition-colors cursor-pointer ${
                  index <= state.currentStep ? 'bg-primary' : 'bg-neu-light/20'
                } ${index === state.currentStep ? 'ring-2 ring-primary/50' : ''}`}
                title={`Step ${index + 1}: ${step.label}`}
              />
              {state.stepComplete[index] && (
                <Check className="w-3 h-3 text-primary" />
              )}
            </div>
          ))}
        </div>

        <div className="text-sm text-gray-400 mt-2">
          Step {state.currentStep + 1} of {steps.length}: {steps[state.currentStep]?.label}
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <div className="flex flex-col min-h-[500px]">
          {/* Validation Messages */}
          {validationMessages.length > 0 && (
            <div className="p-4 border-b border-neu-light/10">
              <ValidationFeedback
                messages={validationMessages}
                onDismiss={handleDismissMessage}
                compact={compact}
                maxVisible={3}
              />
            </div>
          )}

          {/* Step Content */}
          <div className="flex-1 p-6">
            {renderStepContent()}
          </div>

          {/* Navigation Footer */}
          <div className="border-t border-neu-light/10 p-4">
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-400">
                {exercises.length} exercise{exercises.length !== 1 ? 's' : ''} selected
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant="flat"
                  onClick={handlePrevious}
                  disabled={!canGoPrevious}
                  className="gap-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </Button>
                
                {canGoNext ? (
                  <Button
                    variant="primary"
                    onClick={handleNext}
                    className="gap-2"
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button
                    variant="primary"
                    onClick={handleSave}
                    disabled={!canSave}
                    className="gap-2"
                  >
                    <Save className="w-4 h-4" />
                    Save Group
                  </Button>
                )}
                
                <Button
                  variant="outline"
                  onClick={onCancel}
                  className="gap-2"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}