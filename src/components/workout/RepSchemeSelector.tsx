'use client'

import React, { useMemo, useState } from 'react'
import { 
  Hash, 
  TrendingDown, 
  Triangle, 
  TrendingUp, 
  Info, 
  ChevronDown, 
  ChevronUp,
  Clock
} from 'lucide-react'
import { Chip } from '@/ui/chip'
import { Button } from '@/ui/button'
import { 
  RepSchemeType, 
  ExecutionStyle,
  DescendingRepScheme,
  PyramidRepScheme,
  AscendingRepScheme
} from '@/types/exercise-groups'
import { generatePatternPreview, parsePattern } from '@/utils/exercise-groups'

// ================================================================================================
// COMPONENT PROPS
// ================================================================================================

export interface RepSchemeSelectorProps {
  selectedScheme: RepSchemeType
  selectedPattern?: string
  executionStyle: ExecutionStyle
  onChange: (scheme: RepSchemeType, pattern?: string) => void
  onPatternChange?: (pattern: string) => void
  disabled?: boolean
  compact?: boolean
}

// ================================================================================================
// REP SCHEME OPTION
// ================================================================================================

interface RepSchemeOption {
  type: RepSchemeType
  label: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  patterns?: PatternOption[]
  compatibleExecutionStyles: ExecutionStyle[]
  incompatibleExecutionStyles?: ExecutionStyle[]
}

interface PatternOption {
  id: string
  label: string
  description: string
  preview: string
  config: any
}

const REP_SCHEME_OPTIONS: RepSchemeOption[] = [
  {
    type: 'standard',
    label: 'Standard',
    description: 'Manual entry for sets and reps - full flexibility',
    icon: Hash,
    compatibleExecutionStyles: ['standard', 'HIIT', 'EMOM', 'AMRAP']
  },
  {
    type: 'descending',
    label: 'Descending',
    description: 'Start high, decrease reps each set - great for strength endurance',
    icon: TrendingDown,
    compatibleExecutionStyles: ['standard', 'HIIT'],
    incompatibleExecutionStyles: ['EMOM', 'AMRAP'],
    patterns: [
      {
        id: '10-1',
        label: '10 to 1',
        description: 'Classic descending ladder: 10, 9, 8, 7, 6, 5, 4, 3, 2, 1',
        preview: '10, 9, 8, 7, 6, 5, 4, 3, 2, 1',
        config: { startReps: 10, endReps: 1, increment: 1 }
      },
      {
        id: '21-3',
        label: '21 to 3',
        description: 'Heavy descending: 21, 18, 15, 12, 9, 6, 3',
        preview: '21, 18, 15, 12, 9, 6, 3',
        config: { startReps: 21, endReps: 3, increment: 3 }
      },
      {
        id: '15-3',
        label: '15 to 3',
        description: 'Moderate descending: 15, 12, 9, 6, 3',
        preview: '15, 12, 9, 6, 3',
        config: { startReps: 15, endReps: 3, increment: 3 }
      }
    ]
  },
  {
    type: 'pyramid',
    label: 'Pyramid',
    description: 'Up then down - build to peak then descend for maximum volume',
    icon: Triangle,
    compatibleExecutionStyles: ['standard'],
    incompatibleExecutionStyles: ['HIIT', 'EMOM', 'AMRAP'],
    patterns: [
      {
        id: '10-1-10',
        label: '10-1-10',
        description: 'Full pyramid: 10, 8, 6, 4, 2, 1, 2, 4, 6, 8, 10',
        preview: '10, 8, 6, 4, 2, 1, 2, 4, 6, 8, 10',
        config: { startReps: 10, peakReps: 1, increment: 2 }
      },
      {
        id: '15-3-15',
        label: '15-3-15',
        description: 'Heavy pyramid: 15, 12, 9, 6, 3, 6, 9, 12, 15',
        preview: '15, 12, 9, 6, 3, 6, 9, 12, 15',
        config: { startReps: 15, peakReps: 3, increment: 3 }
      }
    ]
  },
  {
    type: 'ascending',
    label: 'Ascending',
    description: 'Start low, increase each minute - perfect for EMOM workouts',
    icon: TrendingUp,
    compatibleExecutionStyles: ['EMOM'],
    incompatibleExecutionStyles: ['standard', 'HIIT', 'AMRAP'],
    patterns: [
      {
        id: '1-rep',
        label: '1-Rep Ascending',
        description: 'EMOM ascending: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10...',
        preview: '1, 2, 3, 4, 5, 6, 7, 8, 9, 10...',
        config: { startReps: 1, increment: 1, durationMinutes: 10 }
      }
    ]
  }
]

// ================================================================================================
// PATTERN SELECTOR COMPONENT
// ================================================================================================

interface PatternSelectorProps {
  patterns: PatternOption[]
  selectedPattern?: string
  onChange: (pattern: string) => void
  expanded: boolean
  onToggleExpanded: () => void
}

function PatternSelector({ 
  patterns, 
  selectedPattern, 
  onChange, 
  expanded, 
  onToggleExpanded 
}: PatternSelectorProps) {
  return (
    <div className="mt-3 space-y-2">
      <Button
        variant="flat"
        onClick={onToggleExpanded}
        className="w-full justify-between h-8 px-3 text-sm"
      >
        <span>Choose Pattern</span>
        {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </Button>

      {expanded && (
        <div className="space-y-2">
          {patterns.map(pattern => (
            <div key={pattern.id} className="relative">
              <Chip
                selected={selectedPattern === pattern.id}
                onClick={() => onChange(pattern.id)}
                size="label"
                className="w-full justify-start p-3 h-auto"
              >
                <div className="text-left space-y-1">
                  <div className="font-medium text-sm">{pattern.label}</div>
                  <div className="text-xs text-gray-400">{pattern.description}</div>
                  <div className="text-xs font-mono bg-neu-light/10 px-2 py-1 rounded">
                    {pattern.preview}
                  </div>
                </div>
              </Chip>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ================================================================================================
// COMPATIBILITY LOGIC
// ================================================================================================

function isSchemeCompatible(scheme: RepSchemeType, executionStyle: ExecutionStyle): boolean {
  const option = REP_SCHEME_OPTIONS.find(opt => opt.type === scheme)
  if (!option) return false
  
  return option.compatibleExecutionStyles.includes(executionStyle)
}

function getIncompatibilityReason(scheme: RepSchemeType, executionStyle: ExecutionStyle): string {
  if (scheme === 'descending' && (executionStyle === 'EMOM' || executionStyle === 'AMRAP')) {
    return 'Descending rep schemes work best with standard timing or HIIT intervals'
  }
  
  if (scheme === 'pyramid' && executionStyle !== 'standard') {
    return 'Pyramid schemes require standard execution for proper progression'
  }
  
  if (scheme === 'ascending' && executionStyle !== 'EMOM') {
    return 'Ascending reps are designed specifically for EMOM workouts'
  }
  
  return 'This combination may not provide optimal training stimulus'
}

// ================================================================================================
// MAIN COMPONENT
// ================================================================================================

export default function RepSchemeSelector({
  selectedScheme,
  selectedPattern,
  executionStyle,
  onChange,
  onPatternChange,
  disabled = false,
  compact = false
}: RepSchemeSelectorProps) {
  
  const [expandedPatterns, setExpandedPatterns] = useState<Set<RepSchemeType>>(new Set())

  // ================================================================================================
  // DERIVED STATE
  // ================================================================================================

  const optionStates = useMemo(() => {
    return REP_SCHEME_OPTIONS.map(option => {
      const isCompatible = isSchemeCompatible(option.type, executionStyle)
      const isSelected = selectedScheme === option.type
      const incompatibilityReason = !isCompatible ? getIncompatibilityReason(option.type, executionStyle) : null
      const hasPatterns = option.patterns && option.patterns.length > 0

      return {
        option,
        isCompatible,
        isSelected,
        incompatibilityReason,
        hasPatterns
      }
    })
  }, [selectedScheme, executionStyle])

  const selectedOption = REP_SCHEME_OPTIONS.find(opt => opt.type === selectedScheme)

  // ================================================================================================
  // EVENT HANDLERS
  // ================================================================================================

  const handleSchemeSelect = (scheme: RepSchemeType) => {
    if (disabled) return

    const isCompatible = isSchemeCompatible(scheme, executionStyle)
    if (!isCompatible) return

    onChange(scheme)
    
    // Auto-select first pattern if available
    const option = REP_SCHEME_OPTIONS.find(opt => opt.type === scheme)
    if (option?.patterns && option.patterns.length > 0 && onPatternChange) {
      onPatternChange(option.patterns[0].id)
    }
  }

  const handlePatternChange = (pattern: string) => {
    if (onPatternChange) {
      onPatternChange(pattern)
    }
  }

  const handleTogglePatternExpansion = (scheme: RepSchemeType) => {
    const newExpanded = new Set(expandedPatterns)
    if (newExpanded.has(scheme)) {
      newExpanded.delete(scheme)
    } else {
      newExpanded.add(scheme)
    }
    setExpandedPatterns(newExpanded)
  }

  // ================================================================================================
  // RENDER
  // ================================================================================================

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-medium text-white">Rep Scheme</h3>
          <Button
            variant="flat"
            size="icon"
            className="h-5 w-5 p-0"
            title="Rep scheme determines the pattern of reps across sets"
          >
            <Info className="w-3 h-3" />
          </Button>
        </div>
        <div className="text-xs text-gray-400 flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {executionStyle}
        </div>
      </div>

      {/* Rep Scheme Options */}
      <div className={`grid gap-2 ${compact ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2'}`}>
        {optionStates.map(({ option, isCompatible, isSelected, incompatibilityReason, hasPatterns }) => {
          const IconComponent = option.icon
          const isEnabled = !disabled && isCompatible
          
          return (
            <div key={option.type} className="space-y-2">
              <Chip
                selected={isSelected}
                onClick={() => handleSchemeSelect(option.type)}
                disabled={!isEnabled}
                size="label" // 24px height for secondary importance
                variant={isSelected ? 'primary' : 'secondary'}
                className={`
                  w-full justify-start gap-3 px-3 py-2 h-auto min-h-[2rem] transition-all duration-200
                  ${isEnabled ? 'cursor-pointer hover:scale-105' : 'cursor-not-allowed opacity-50'}
                  ${isSelected ? 'shadow-neu-elevated' : 'shadow-neu-flat'}
                `}
                icon={<IconComponent className="w-4 h-4" />}
              >
                <div className="flex-1 text-left">
                  <div className="font-medium text-sm">{option.label}</div>
                  {!compact && (
                    <div className="text-xs text-gray-400 mt-1 line-clamp-2">
                      {option.description}
                    </div>
                  )}
                </div>
              </Chip>

              {/* Pattern Selection */}
              {isSelected && hasPatterns && option.patterns && (
                <PatternSelector
                  patterns={option.patterns}
                  selectedPattern={selectedPattern}
                  onChange={handlePatternChange}
                  expanded={expandedPatterns.has(option.type)}
                  onToggleExpanded={() => handleTogglePatternExpansion(option.type)}
                />
              )}

              {/* Incompatibility Warning */}
              {isSelected && incompatibilityReason && (
                <div className="text-xs text-yellow-400 bg-yellow-500/10 p-2 rounded border border-yellow-500/20">
                  {incompatibilityReason}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Selected Scheme Info */}
      {selectedScheme && selectedOption && (
        <div className="bg-neu-light/5 border border-neu-light/10 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-2">
            <selectedOption.icon className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-white">{selectedOption.label}</span>
          </div>
          <div className="text-xs text-gray-400">
            {selectedOption.description}
          </div>

          {/* Pattern Preview */}
          {selectedPattern && selectedOption.patterns && (
            <div className="mt-3 pt-3 border-t border-neu-light/10">
              <div className="text-xs text-gray-300 mb-2">Selected Pattern:</div>
              {(() => {
                const pattern = selectedOption.patterns.find(p => p.id === selectedPattern)
                return pattern ? (
                  <div className="space-y-1">
                    <div className="text-sm font-medium">{pattern.label}</div>
                    <div className="text-xs font-mono bg-neu-light/10 p-2 rounded">
                      {pattern.preview}
                    </div>
                  </div>
                ) : null
              })()}
            </div>
          )}
        </div>
      )}

      {/* EMOM Ascending Special Notice */}
      {selectedScheme === 'ascending' && executionStyle === 'EMOM' && (
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-medium text-blue-400">EMOM Ascending</span>
          </div>
          <div className="text-xs text-blue-300">
            Perfect combination! Start with 1 rep on minute 1, then 2 reps on minute 2, and so on. 
            Great for building work capacity and mental toughness.
          </div>
        </div>
      )}

      {/* Help Text */}
      {!compact && (
        <div className="text-xs text-gray-500">
          💡 Rep schemes create different training stimuli. Standard offers flexibility, 
          while patterns provide structured progression and variety.
        </div>
      )}
    </div>
  )
}