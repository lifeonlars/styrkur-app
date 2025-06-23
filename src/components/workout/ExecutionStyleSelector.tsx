'use client'

import React, { useMemo } from 'react'
import { Play, Zap, Clock, Infinity, Info, AlertTriangle } from 'lucide-react'
import { Chip } from '@/ui/chip'
import { Button } from '@/ui/button'
import { 
  ExecutionStyle, 
  RepSchemeType, 
  ExecutionStyleConfig 
} from '@/types/exercise-groups'

// ================================================================================================
// COMPONENT PROPS
// ================================================================================================

export interface ExecutionStyleSelectorProps {
  selectedStyle: ExecutionStyle
  repScheme: RepSchemeType
  onChange: (style: ExecutionStyle) => void
  onStyleConfigChange?: (config: ExecutionStyleConfig) => void
  disabled?: boolean
  showIncompatibleOptions?: boolean
  compact?: boolean
}

// ================================================================================================
// EXECUTION STYLE OPTION
// ================================================================================================

interface ExecutionStyleOption {
  style: ExecutionStyle
  label: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  compatibleRepSchemes: RepSchemeType[]
  incompatibleRepSchemes?: RepSchemeType[]
  defaultConfig?: Partial<ExecutionStyleConfig>
}

const EXECUTION_STYLE_OPTIONS: ExecutionStyleOption[] = [
  {
    style: 'standard',
    label: 'Standard',
    description: 'Traditional set and rest approach with full recovery between sets',
    icon: Play,
    compatibleRepSchemes: ['standard', 'descending', 'pyramid', 'ascending'],
    defaultConfig: {
      style: 'standard',
      restBetweenSets: 90
    }
  },
  {
    style: 'HIIT',
    label: 'HIIT',
    description: 'High-intensity intervals with specific work and rest periods',
    icon: Zap,
    compatibleRepSchemes: ['standard', 'descending'],
    incompatibleRepSchemes: ['pyramid', 'ascending'],
    defaultConfig: {
      style: 'HIIT',
      workInterval: 45,
      restInterval: 15,
      rounds: 8
    }
  },
  {
    style: 'EMOM',
    label: 'EMOM',
    description: 'Every Minute on the Minute - perform exercise at start of each minute',
    icon: Clock,
    compatibleRepSchemes: ['standard', 'ascending'],
    incompatibleRepSchemes: ['descending', 'pyramid'],
    defaultConfig: {
      style: 'EMOM',
      intervalMinutes: 1,
      durationMinutes: 10
    }
  },
  {
    style: 'AMRAP',
    label: 'AMRAP',
    description: 'As Many Rounds/Reps As Possible within a time limit',
    icon: Infinity,
    compatibleRepSchemes: ['standard'],
    incompatibleRepSchemes: ['descending', 'pyramid', 'ascending'],
    defaultConfig: {
      style: 'AMRAP',
      durationMinutes: 12
    }
  }
]

// ================================================================================================
// COMPATIBILITY LOGIC
// ================================================================================================

function isStyleCompatible(style: ExecutionStyle, repScheme: RepSchemeType): boolean {
  const option = EXECUTION_STYLE_OPTIONS.find(opt => opt.style === style)
  if (!option) return false
  
  return option.compatibleRepSchemes.includes(repScheme)
}

function getIncompatibilityReason(style: ExecutionStyle, repScheme: RepSchemeType): string {
  if (style === 'HIIT' && (repScheme === 'pyramid' || repScheme === 'ascending')) {
    return 'HIIT works best with standard or descending rep schemes'
  }
  
  if (style === 'EMOM' && (repScheme === 'descending' || repScheme === 'pyramid')) {
    return 'EMOM is designed for standard reps or ascending patterns'
  }
  
  if (style === 'AMRAP' && repScheme !== 'standard') {
    return 'AMRAP requires standard rep schemes for consistent pacing'
  }
  
  return 'This combination may not provide optimal training stimulus'
}

// ================================================================================================
// STYLE CONFIG COMPONENT
// ================================================================================================

interface StyleConfigProps {
  style: ExecutionStyle
  config: ExecutionStyleConfig
  onChange: (config: ExecutionStyleConfig) => void
}

function StyleConfig({ style, config, onChange }: StyleConfigProps) {
  if (style === 'standard') return null

  const updateConfig = (updates: Partial<ExecutionStyleConfig>) => {
    onChange({ ...config, ...updates })
  }

  return (
    <div className="mt-3 p-3 bg-neu-light/5 border border-neu-light/10 rounded-lg space-y-3">
      <div className="text-sm font-medium text-white">Configuration</div>
      
      {style === 'HIIT' && (
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-gray-400 block mb-1">Work (seconds)</label>
            <input
              type="number"
              value={(config as any).workInterval || 45}
              onChange={(e) => updateConfig({ workInterval: parseInt(e.target.value) })}
              className="w-full h-8 px-2 text-sm bg-neu-surface border border-neu-light/20 rounded"
              min="10"
              max="300"
            />
          </div>
          <div>
            <label className="text-xs text-gray-400 block mb-1">Rest (seconds)</label>
            <input
              type="number"
              value={(config as any).restInterval || 15}
              onChange={(e) => updateConfig({ restInterval: parseInt(e.target.value) })}
              className="w-full h-8 px-2 text-sm bg-neu-surface border border-neu-light/20 rounded"
              min="5"
              max="180"
            />
          </div>
          <div className="col-span-2">
            <label className="text-xs text-gray-400 block mb-1">Rounds</label>
            <input
              type="number"
              value={(config as any).rounds || 8}
              onChange={(e) => updateConfig({ rounds: parseInt(e.target.value) })}
              className="w-full h-8 px-2 text-sm bg-neu-surface border border-neu-light/20 rounded"
              min="1"
              max="20"
            />
          </div>
        </div>
      )}
      
      {style === 'EMOM' && (
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-gray-400 block mb-1">Interval (minutes)</label>
            <select
              value={(config as any).intervalMinutes || 1}
              onChange={(e) => updateConfig({ intervalMinutes: parseInt(e.target.value) })}
              className="w-full h-8 px-2 text-sm bg-neu-surface border border-neu-light/20 rounded"
            >
              <option value={1}>1 minute</option>
              <option value={2}>2 minutes</option>
              <option value={3}>3 minutes</option>
            </select>
          </div>
          <div>
            <label className="text-xs text-gray-400 block mb-1">Duration (minutes)</label>
            <input
              type="number"
              value={(config as any).durationMinutes || 10}
              onChange={(e) => updateConfig({ durationMinutes: parseInt(e.target.value) })}
              className="w-full h-8 px-2 text-sm bg-neu-surface border border-neu-light/20 rounded"
              min="3"
              max="30"
            />
          </div>
        </div>
      )}
      
      {style === 'AMRAP' && (
        <div>
          <label className="text-xs text-gray-400 block mb-1">Duration (minutes)</label>
          <input
            type="number"
            value={(config as any).durationMinutes || 12}
            onChange={(e) => updateConfig({ durationMinutes: parseInt(e.target.value) })}
            className="w-full h-8 px-2 text-sm bg-neu-surface border border-neu-light/20 rounded"
            min="3"
            max="30"
          />
        </div>
      )}
    </div>
  )
}

// ================================================================================================
// MAIN COMPONENT
// ================================================================================================

export default function ExecutionStyleSelector({
  selectedStyle,
  repScheme,
  onChange,
  onStyleConfigChange,
  disabled = false,
  showIncompatibleOptions = false,
  compact = false
}: ExecutionStyleSelectorProps) {
  
  // ================================================================================================
  // DERIVED STATE
  // ================================================================================================

  const optionStates = useMemo(() => {
    return EXECUTION_STYLE_OPTIONS.map(option => {
      const isCompatible = isStyleCompatible(option.style, repScheme)
      const isSelected = selectedStyle === option.style
      const isVisible = isCompatible || showIncompatibleOptions || isSelected
      const incompatibilityReason = !isCompatible ? getIncompatibilityReason(option.style, repScheme) : null

      return {
        option,
        isCompatible,
        isSelected,
        isVisible,
        incompatibilityReason
      }
    })
  }, [selectedStyle, repScheme, showIncompatibleOptions])

  const selectedOption = EXECUTION_STYLE_OPTIONS.find(opt => opt.style === selectedStyle)
  const currentConfig = selectedOption?.defaultConfig || { style: selectedStyle }

  // ================================================================================================
  // EVENT HANDLERS
  // ================================================================================================

  const handleStyleSelect = (style: ExecutionStyle) => {
    if (disabled) return

    const option = EXECUTION_STYLE_OPTIONS.find(opt => opt.style === style)
    const isCompatible = isStyleCompatible(style, repScheme)

    if (isCompatible || showIncompatibleOptions) {
      onChange(style)
      
      if (onStyleConfigChange && option?.defaultConfig) {
        onStyleConfigChange(option.defaultConfig as ExecutionStyleConfig)
      }
    }
  }

  const handleConfigChange = (config: ExecutionStyleConfig) => {
    if (onStyleConfigChange) {
      onStyleConfigChange(config)
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
          <h3 className="text-sm font-medium text-white">Execution Style</h3>
          <Button
            variant="flat"
            size="icon"
            className="h-5 w-5 p-0"
            title="Execution style determines the timing and structure of your sets"
          >
            <Info className="w-3 h-3" />
          </Button>
        </div>
        <div className="text-xs text-gray-400">
          Rep scheme: {repScheme}
        </div>
      </div>

      {/* Execution Style Options */}
      <div className={`grid gap-2 ${compact ? 'grid-cols-2' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'}`}>
        {optionStates
          .filter(({ isVisible }) => isVisible)
          .map(({ option, isCompatible, isSelected, incompatibilityReason }) => {
            const IconComponent = option.icon
            const isEnabled = !disabled && (isCompatible || showIncompatibleOptions)
            
            return (
              <div key={option.style} className="relative">
                <Chip
                  selected={isSelected}
                  onClick={() => handleStyleSelect(option.style)}
                  disabled={!isEnabled}
                  size="label" // 24px height for secondary importance
                  variant={isSelected ? 'primary' : 'secondary'}
                  className={`
                    w-full justify-center gap-2 px-3 py-2 h-8 transition-all duration-200
                    ${isEnabled ? 'cursor-pointer hover:scale-105' : 'cursor-not-allowed'}
                    ${!isCompatible ? 'opacity-60' : ''}
                    ${isSelected ? 'shadow-neu-elevated' : 'shadow-neu-flat'}
                  `}
                  icon={<IconComponent className="w-4 h-4" />}
                >
                  <span className="text-sm font-medium">{option.label}</span>
                </Chip>

                {/* Incompatibility warning */}
                {!isCompatible && (
                  <div className="absolute -top-1 -right-1">
                    <div className="w-4 h-4 bg-yellow-500 rounded-full flex items-center justify-center">
                      <AlertTriangle className="w-2 h-2 text-black" />
                    </div>
                  </div>
                )}
              </div>
            )
          })}
      </div>

      {/* Selected Style Info */}
      {selectedStyle && selectedOption && (
        <div className="bg-neu-light/5 border border-neu-light/10 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-2">
            <selectedOption.icon className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-white">{selectedOption.label}</span>
          </div>
          <div className="text-xs text-gray-400 mb-3">
            {selectedOption.description}
          </div>

          {/* Style-specific configuration */}
          {onStyleConfigChange && (
            <StyleConfig
              style={selectedStyle}
              config={currentConfig as ExecutionStyleConfig}
              onChange={handleConfigChange}
            />
          )}
        </div>
      )}

      {/* Compatibility Warnings */}
      {optionStates.some(({ isSelected, isCompatible }) => isSelected && !isCompatible) && (
        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-medium text-yellow-400">Compatibility Warning</span>
          </div>
          <div className="text-xs text-yellow-300">
            {optionStates.find(({ isSelected }) => isSelected)?.incompatibilityReason}
          </div>
        </div>
      )}

      {/* Help Text */}
      {!compact && (
        <div className="text-xs text-gray-500">
          💡 Execution style affects how you perform your sets. Standard is most versatile, 
          while specialized styles create specific training stimuli.
        </div>
      )}
    </div>
  )
}