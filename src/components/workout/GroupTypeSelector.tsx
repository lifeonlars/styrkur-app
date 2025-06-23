'use client'

import React, { useMemo, useState } from 'react'
import { Info } from 'lucide-react'
import { Button } from '@/ui/button'
import { Card, CardContent } from '@/ui/card'
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
import { 
  SingleExerciseIcon, 
  SupersetIcon, 
  CircuitIcon, 
  ComplexIcon 
} from './icons/GroupTypeIcons'

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
    icon: SingleExerciseIcon,
    minExercises: 1,
    maxExercises: 1
  },
  {
    type: 'superset',
    label: 'Superset',
    description: 'Multiple exercises performed back-to-back with minimal rest',
    icon: SupersetIcon,
    minExercises: 2,
    maxExercises: 3
  },
  {
    type: 'circuit',
    label: 'Circuit',
    description: 'Sequence of exercises performed in rounds with rest between rounds',
    icon: CircuitIcon,
    minExercises: 3,
    maxExercises: 15
  },
  {
    type: 'complex',
    label: 'Complex',
    description: 'Multiple exercises using the same equipment without putting it down',
    icon: ComplexIcon,
    minExercises: 2,
    maxExercises: 8,
    requiresCompatibility: true
  }
]

// ================================================================================================
// GROUP TYPE CARD COMPONENT
// ================================================================================================

interface GroupTypeCardProps {
  option: GroupTypeOption
  exerciseCount: number
  exercises: Exercise[]
  isSelected: boolean
  isEnabled: boolean
  isRecommended: boolean
  onClick: () => void
  showTooltip?: boolean
}

function GroupTypeCard({
  option,
  exerciseCount,
  exercises,
  isSelected,
  isEnabled,
  isRecommended,
  onClick,
  showTooltip = true
}: GroupTypeCardProps) {
  const IconComponent = option.icon
  
  // Get equipment compatibility info for complex type
  const compatibilityInfo = option.requiresCompatibility && exercises.length > 1 
    ? {
        isCompatible: canFormComplex(exercises),
        sharedEquipment: getSharedEquipment(exercises)
      }
    : null

  // Get exercise count range
  const exerciseRange = option.minExercises === option.maxExercises 
    ? `${option.minExercises} exercise${option.minExercises > 1 ? 's' : ''}`
    : `${option.minExercises}-${option.maxExercises} exercises`

  // Determine card styling
  const cardClass = `
    relative cursor-pointer group
    ${isEnabled ? 'hover:scale-[1.02] active:scale-[0.98]' : 'cursor-not-allowed'}
    ${isSelected ? 'shadow-neu-gold border-neu-gold-light' : ''}
    ${isRecommended && !isSelected ? 'border-neu-gold-subtle' : ''}
  `

  // Apply styling with design tokens
  const cardStyle = {
    transition: 'all var(--transition-default)',
    ...(isSelected && {
      boxShadow: 'var(--shadow-neu-gold)',
      border: '1px solid var(--border-neu-gold-light)'
    }),
    ...(isRecommended && !isSelected && {
      border: '1px solid var(--border-neu-gold-subtle)'
    })
  }

  return (
    <Card 
      className={cardClass}
      style={cardStyle}
      surface={isSelected ? "convex" : "flat"}
      depth={isSelected ? "elevated" : "subtle"}
      onClick={() => isEnabled && onClick()}
    >
      <CardContent style={{ padding: 'var(--spacing-6)' }} className="text-center">
        {/* Recommended Badge */}
        {isRecommended && (
          <div 
            className="absolute font-medium"
            style={{
              top: 'calc(-1 * var(--spacing-2))',
              right: 'calc(-1 * var(--spacing-2))',
              background: 'var(--norse-gold-300)',
              color: 'var(--iron-900)',
              fontSize: 'var(--font-size-xs)',
              padding: 'var(--spacing-1) var(--spacing-2)',
              borderRadius: 'var(--radius-full)'
            }}
          >
            Recommended
          </div>
        )}

        {/* Large Icon */}
        <div style={{ marginBottom: 'var(--spacing-4)' }} className="flex justify-center">
          <IconComponent 
            color={isSelected ? 'accent' : 'primary'}
            size={48} 
          />
        </div>

        {/* Title */}
        <h3 
          style={{
            fontSize: 'var(--font-size-lg)',
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--text-primary)',
            marginBottom: 'var(--spacing-2)'
          }}
        >
          {option.label}
        </h3>

        {/* Description */}
        <p 
          style={{
            fontSize: 'var(--font-size-xs)',
            color: 'var(--text-secondary)',
            marginBottom: 'var(--spacing-2)',
            lineHeight: 'var(--line-height-tight)'
          }}
        >
          {option.description}
        </p>
        
        {/* Exercise Count */}
        <p 
          style={{
            fontSize: 'var(--font-size-sm)',
            color: 'var(--text-secondary)',
            marginBottom: 'var(--spacing-3)'
          }}
        >
          {exerciseRange}
        </p>

        {/* Equipment Compatibility (for complex) */}
        {compatibilityInfo && (
          <div style={{ marginBottom: 'var(--spacing-3)' }}>
            <div 
              style={{
                fontSize: 'var(--font-size-xs)',
                padding: 'var(--spacing-1) var(--spacing-2)',
                borderRadius: 'var(--radius-sm)',
                border: compatibilityInfo.isCompatible 
                  ? '1px solid var(--border-success)' 
                  : '1px solid var(--border-warning)',
                background: 'transparent',
                color: compatibilityInfo.isCompatible 
                  ? 'var(--text-success)' 
                  : 'var(--text-warning)'
              }}
            >
              {compatibilityInfo.isCompatible ? '✓ Equipment Compatible' : '⚠ Mixed Equipment'}
            </div>
          </div>
        )}

        {/* Status Indicator */}
        <div style={{ fontSize: 'var(--font-size-xs)' }}>
          {!isEnabled ? (
            <span style={{ color: 'var(--text-danger)' }}>Not Available</span>
          ) : isSelected ? (
            <span style={{ color: 'var(--text-accent)', fontWeight: 'var(--font-weight-medium)' }}>Selected</span>
          ) : (
            <span style={{ color: 'var(--text-muted)' }}>Available</span>
          )}
        </div>

      </CardContent>
    </Card>
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-6)' }}>
      {/* Header */}
      <div className="text-center">
        <h3 
          style={{
            fontSize: 'var(--font-size-xl)',
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--text-primary)',
            marginBottom: 'var(--spacing-2)'
          }}
        >
          Choose Group Type
        </h3>
        <p 
          style={{
            fontSize: 'var(--font-size-sm)',
            color: 'var(--text-secondary)'
          }}
        >
          Select how your {exerciseCount} exercise{exerciseCount !== 1 ? 's' : ''} should be performed together
        </p>
      </div>

      {/* Group Type Cards */}
      <div 
        className={`grid ${
          compact 
            ? 'grid-cols-2 md:grid-cols-4' 
            : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-4'
        }`}
        style={{ gap: 'var(--spacing-4)' }}
      >
        {optionStates.map(({ option, isEnabled, isRecommended, isSelected }) => (
          <GroupTypeCard
            key={option.type}
            option={option}
            exerciseCount={exerciseCount}
            exercises={exercises}
            isSelected={isSelected}
            isEnabled={isEnabled}
            isRecommended={isRecommended}
            onClick={() => handleOptionClick(option.type, isEnabled)}
            showTooltip={showTooltips}
          />
        ))}
      </div>

      {/* Smart Recommendations */}
      {suggestions.length > 0 && !selectedType && (
        <div 
          style={{
            background: 'transparent',
            border: '1px solid var(--border-neu-gold-light)',
            borderRadius: 'var(--radius-lg)',
            padding: 'var(--spacing-4)'
          }}
        >
          <h4 
            style={{
              fontSize: 'var(--font-size-sm)',
              fontWeight: 'var(--font-weight-medium)',
              color: 'var(--text-accent)',
              marginBottom: 'var(--spacing-2)'
            }}
          >
            💡 Smart Recommendations
          </h4>
          <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)' }}>
            Based on your {exerciseCount} exercise{exerciseCount !== 1 ? 's' : ''}, we recommend: {' '}
            <span 
              style={{ 
                color: 'var(--text-accent)', 
                fontWeight: 'var(--font-weight-medium)' 
              }}
            >
              {suggestions.map(type => 
                GROUP_TYPE_OPTIONS.find(opt => opt.type === type)?.label
              ).join(' or ')}
            </span>
          </p>
        </div>
      )}

      {/* Selected Type Summary */}
      {selectedType && (
        <div 
          className="depth-sunken surface-concave"
          style={{
            border: '1px solid var(--border-neu-subtle)',
            borderRadius: 'var(--radius-lg)',
            padding: 'var(--spacing-4)'
          }}
        >
          <div className="flex items-start" style={{ gap: 'var(--spacing-3)' }}>
            {(() => {
              const selectedOption = GROUP_TYPE_OPTIONS.find(opt => opt.type === selectedType)
              const IconComponent = selectedOption?.icon || SingleExerciseIcon
              return (
                <IconComponent 
                  color="accent"
                  size={24}
                  style={{ marginTop: 'var(--spacing-1)' }}
                />
              )
            })()}
            <div className="flex-1">
              <h4 
                style={{
                  fontSize: 'var(--font-size-sm)',
                  fontWeight: 'var(--font-weight-medium)',
                  color: 'var(--text-primary)',
                  marginBottom: 'var(--spacing-1)'
                }}
              >
                {getGroupTypeDisplayName(selectedType)} Selected
              </h4>
              <p 
                style={{
                  fontSize: 'var(--font-size-xs)',
                  color: 'var(--text-secondary)'
                }}
              >
                {GROUP_TYPE_OPTIONS.find(opt => opt.type === selectedType)?.description}
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}