'use client'

import React, { useMemo } from 'react'
import { Card, CardContent } from '@/ui/card'
import { EnhancedExerciseGroupType } from '@/types/exercise-groups'
import { getGroupTypeDisplayName } from '@/utils/exercise-groups'
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
  onChange: (type: EnhancedExerciseGroupType) => void
  disabled?: boolean
  compact?: boolean
}

// ================================================================================================
// GROUP TYPE OPTION
// ================================================================================================

interface GroupTypeOption {
  type: EnhancedExerciseGroupType
  label: string
  description: string
  icon: React.ComponentType<{ color?: string; size?: number }>
}

const GROUP_TYPE_OPTIONS: GroupTypeOption[] = [
  {
    type: 'single',
    label: 'Single',
    description: 'Individual exercises performed separately with full rest between each',
    icon: SingleExerciseIcon
  },
  {
    type: 'superset',
    label: 'Superset',
    description: 'Multiple exercises (2-3) performed back-to-back with minimal rest',
    icon: SupersetIcon
  },
  {
    type: 'circuit',
    label: 'Circuit',
    description: 'Sequence of exercises (3 or more) performed in rounds with rest between rounds',
    icon: CircuitIcon
  },
  {
    type: 'complex',
    label: 'Complex',
    description: 'Multiple exercises (2 or more) using the same equipment without putting it down',
    icon: ComplexIcon
  }
]

// ================================================================================================
// GROUP TYPE CARD COMPONENT
// ================================================================================================

interface GroupTypeCardProps {
  option: GroupTypeOption
  isSelected: boolean
  onClick: () => void
}

function GroupTypeCard({
  option,
  isSelected,
  onClick
}: GroupTypeCardProps) {
  const IconComponent = option.icon

  // Determine card styling
  const cardClass = `
    relative cursor-pointer group hover:scale-[1.02] active:scale-[0.98]
    ${isSelected ? 'shadow-neu-gold border-neu-gold-light' : ''}
  `

  // Apply styling with design tokens
  const cardStyle = {
    transition: 'all var(--transition-default)',
    ...(isSelected && {
      boxShadow: 'var(--shadow-neu-gold)',
      border: '1px solid var(--border-neu-gold-light)'
    })
  }

  return (
    <Card 
      className={cardClass}
      style={cardStyle}
      surface={isSelected ? "convex" : "flat"}
      depth={isSelected ? "elevated" : "subtle"}
      onClick={onClick}
    >
      <CardContent style={{ padding: 'var(--spacing-6)' }} className="text-center">

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
        


        {/* Status Indicator */}
        <div style={{ fontSize: 'var(--font-size-xs)' }}>
          {isSelected ? (
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
  onChange,
  disabled = false,
  compact = false
}: GroupTypeSelectorProps) {
  
  // ================================================================================================
  // DERIVED STATE
  // ================================================================================================

  const optionStates = useMemo(() => {
    return GROUP_TYPE_OPTIONS.map(option => {
      const isSelected = selectedType === option.type
      return {
        option,
        isSelected
      }
    })
  }, [selectedType])

  // ================================================================================================
  // EVENT HANDLERS
  // ================================================================================================

  const handleOptionClick = (type: EnhancedExerciseGroupType) => {
    if (!disabled) {
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
          Select how your exercises should be performed together
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
        {optionStates.map(({ option, isSelected }) => (
          <GroupTypeCard
            key={option.type}
            option={option}
            isSelected={isSelected}
            onClick={() => handleOptionClick(option.type)}
          />
        ))}
      </div>


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