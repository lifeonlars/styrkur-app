'use client'

import React, { useMemo } from 'react'
import { User, Zap, RotateCcw, Target, Info } from 'lucide-react'
import { Chip } from '@/ui/chip'
import { Button } from '@/ui/button'
import { Exercise } from '@/types'
import { EnhancedExerciseGroupType } from '@/types/exercise-groups'
import { 
  validateGroupSize
} from '@/validation/exercise-group-validation'
import { 
  canFormComplex, 
  getSharedEquipment,
  suggestGroupType,
  getGroupTypeDisplayName 
} from '@/utils/exercise-groups'

// ================================================================================================
// COMPONENT PROPS
// ================================================================================================

export interface GroupTypeSelectorProps {
  selectedType: EnhancedExerciseGroupType
  exerciseCount: number
  exercises: Exercise[]
  onChange: (type: EnhancedExerciseGroupType) => void
  disabled?: boolean
  showTooltips?: boolean
  compact?: boolean
}

// ================================================================================================
// GROUP TYPE OPTION
// ================================================================================================

interface GroupTypeOption {
  type: EnhancedExerciseGroupType
  label: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  minExercises: number
  maxExercises: number
  requiresCompatibility?: boolean
}

const GROUP_TYPE_OPTIONS: GroupTypeOption[] = [
  {
    type: 'single',
    label: 'Single',
    description: 'Individual exercises performed separately with full rest between each',
    icon: User,
    minExercises: 1,
    maxExercises: 1
  },
  {
    type: 'superset',
    label: 'Superset',
    description: 'Multiple exercises performed back-to-back with minimal rest',
    icon: Zap,
    minExercises: 2,
    maxExercises: 3
  },
  {
    type: 'circuit',
    label: 'Circuit',
    description: 'Sequence of exercises performed in rounds with rest between rounds',
    icon: RotateCcw,
    minExercises: 3,
    maxExercises: 15
  },
  {
    type: 'complex',
    label: 'Complex',
    description: 'Multiple exercises using the same equipment without putting it down',
    icon: Target,
    minExercises: 2,
    maxExercises: 8,
    requiresCompatibility: true
  }
]

// ================================================================================================
// TOOLTIP COMPONENT
// ================================================================================================

interface GroupTypeTooltipProps {
  option: GroupTypeOption
  exerciseCount: number
  exercises: Exercise[]
  isEnabled: boolean
  isSelected: boolean
}

function GroupTypeTooltip({ 
  option, 
  exerciseCount, 
  exercises, 
  isEnabled, 
  isSelected 
}: GroupTypeTooltipProps) {
  const validation = validateGroupSize(option.type, exerciseCount)
  const compatibilityInfo = option.requiresCompatibility && exercises.length > 1 
    ? {
        isCompatible: canFormComplex(exercises),
        sharedEquipment: getSharedEquipment(exercises)
      }
    : null

  return (
    <div className="absolute z-50 bg-neu-dark border border-neu-light/20 rounded-lg p-3 shadow-neu-elevated max-w-xs -top-2 left-1/2 transform -translate-x-1/2 -translate-y-full">
      <div className="text-sm text-white font-medium mb-2">{option.label}</div>
      <div className="text-xs text-gray-400 mb-2">{option.description}</div>
      
      <div className="space-y-1">
        <div className="text-xs text-gray-300">
          Exercises: {option.minExercises}
          {option.maxExercises !== option.minExercises && `-${option.maxExercises}`}
        </div>
        
        {compatibilityInfo && (
          <div className="text-xs">
            <span className={compatibilityInfo.isCompatible ? 'text-green-400' : 'text-yellow-400'}>
              Equipment: {compatibilityInfo.isCompatible ? 'Compatible' : 'Mixed'}
            </span>
            {compatibilityInfo.sharedEquipment.length > 0 && (
              <div className="text-gray-400 mt-1">
                Shared: {compatibilityInfo.sharedEquipment.join(', ')}
              </div>
            )}
          </div>
        )}
        
        {!validation.isValid && (
          <div className="text-xs text-red-400">
            {validation.errors.map(error => error.message).join(', ')}
          </div>
        )}
        
        {validation.errors.filter(error => error.suggestion).length > 0 && (
          <div className="text-xs text-blue-400">
            {validation.errors.filter(error => error.suggestion).map(error => error.suggestion).join(', ')}
          </div>
        )}
        
        {validation.warnings.length > 0 && (
          <div className="text-xs text-yellow-400">
            {validation.warnings.map(warning => warning.message).join(', ')}
          </div>
        )}
      </div>
      
      {/* Tooltip arrow */}
      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-neu-light/20"></div>
    </div>
  )
}

// ================================================================================================
// MAIN COMPONENT
// ================================================================================================

export default function GroupTypeSelector({
  selectedType,
  exerciseCount,
  exercises,
  onChange,
  disabled = false,
  showTooltips = true,
  compact = false
}: GroupTypeSelectorProps) {
  
  // ================================================================================================
  // DERIVED STATE
  // ================================================================================================

  const suggestions = useMemo(() => {
    return suggestGroupType(exerciseCount)
  }, [exerciseCount])

  const optionStates = useMemo(() => {
    return GROUP_TYPE_OPTIONS.map(option => {
      const validation = validateGroupSize(option.type, exerciseCount)
      const isWithinRange = exerciseCount >= option.minExercises && exerciseCount <= option.maxExercises
      const isCompatible = option.requiresCompatibility ? canFormComplex(exercises) : true
      const isEnabled = !disabled && validation.isValid && isWithinRange && isCompatible
      const isRecommended = suggestions.includes(option.type)
      const isSelected = selectedType === option.type

      return {
        option,
        validation,
        isEnabled,
        isRecommended,
        isSelected,
        isCompatible
      }
    })
  }, [selectedType, exerciseCount, exercises, disabled, suggestions])

  // ================================================================================================
  // EVENT HANDLERS
  // ================================================================================================

  const handleOptionClick = (type: EnhancedExerciseGroupType, isEnabled: boolean) => {
    if (isEnabled && !disabled) {
      onChange(type)
    }
  }

  // ================================================================================================
  // RENDER
  // ================================================================================================

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-medium text-white">Group Type</h3>
          {showTooltips && (
            <Button
              variant="flat"
              size="icon"
              className="h-5 w-5 p-0"
              title="Group type determines how exercises are performed together"
            >
              <Info className="w-3 h-3" />
            </Button>
          )}
        </div>
        <div className="text-xs text-gray-400">
          {exerciseCount} exercise{exerciseCount !== 1 ? 's' : ''}
        </div>
      </div>

      {/* Group Type Options */}
      <div className={`grid gap-3 ${compact ? 'grid-cols-2' : 'grid-cols-1 sm:grid-cols-2'}`}>
        {optionStates.map(({ option, isEnabled, isRecommended, isSelected }) => {
          const IconComponent = option.icon
          
          return (
            <div key={option.type} className="relative group">
              <Chip
                selected={isSelected}
                onClick={() => handleOptionClick(option.type, isEnabled)}
                disabled={!isEnabled}
                size="default" // 36px height for primary importance
                variant={isSelected ? 'primary' : 'secondary'}
                className={`
                  w-full justify-start gap-3 px-4 py-3 h-12 transition-all duration-200
                  ${isEnabled ? 'cursor-pointer hover:scale-105' : 'cursor-not-allowed opacity-50'}
                  ${isRecommended && !isSelected ? 'ring-2 ring-primary/30' : ''}
                  ${isSelected ? 'shadow-neu-elevated' : 'shadow-neu-flat'}
                `}
                icon={<IconComponent className="w-5 h-5" />}
              >
                <div className="flex-1 text-left">
                  <div className="font-medium text-sm">{option.label}</div>
                  {!compact && (
                    <div className="text-xs text-gray-400 mt-1 line-clamp-1">
                      {option.description}
                    </div>
                  )}
                </div>
                
                {isRecommended && (
                  <div className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">
                    Recommended
                  </div>
                )}
              </Chip>

              {/* Tooltip on hover */}
              {showTooltips && (
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                  <GroupTypeTooltip
                    option={option}
                    exerciseCount={exerciseCount}
                    exercises={exercises}
                    isEnabled={isEnabled}
                    isSelected={isSelected}
                  />
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Selected Type Info */}
      {selectedType && (
        <div className="bg-neu-light/5 border border-neu-light/10 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-2">
            {(() => {
              const selectedOption = GROUP_TYPE_OPTIONS.find(opt => opt.type === selectedType)
              const IconComponent = selectedOption?.icon || User
              return <IconComponent className="w-4 h-4 text-primary" />
            })()}
            <span className="text-sm font-medium text-white">
              {getGroupTypeDisplayName(selectedType)}
            </span>
          </div>
          <div className="text-xs text-gray-400">
            {GROUP_TYPE_OPTIONS.find(opt => opt.type === selectedType)?.description}
          </div>
        </div>
      )}

      {/* Validation Messages */}
      {!disabled && (
        <div className="space-y-1">
          {optionStates
            .filter(({ validation, isEnabled }) => !validation.isValid && !isEnabled)
            .map(({ option, validation }) => (
              <div key={option.type} className="text-xs text-yellow-400 bg-yellow-500/10 p-2 rounded border border-yellow-500/20">
                <span className="font-medium">{option.label}:</span> {validation.errors.join(', ')}
              </div>
            ))}
        </div>
      )}
    </div>
  )
}