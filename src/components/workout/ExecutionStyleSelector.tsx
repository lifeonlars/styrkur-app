'use client'

import React, { useMemo } from 'react'
import { Play, Zap, Clock, Infinity } from 'lucide-react'
import { Chip } from '@/ui/chip'
import { 
  ExecutionStyle, 
  ExecutionStyleConfig 
} from '@/types/exercise-groups'

// ================================================================================================
// COMPONENT PROPS
// ================================================================================================

export interface ExecutionStyleSelectorProps {
  selectedStyle: ExecutionStyle
  onChange: (style: ExecutionStyle) => void
  onStyleConfigChange?: (config: ExecutionStyleConfig) => void
  disabled?: boolean
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
  defaultConfig?: Partial<ExecutionStyleConfig>
}

const EXECUTION_STYLE_OPTIONS: ExecutionStyleOption[] = [
  {
    style: 'standard',
    label: 'Standard',
    description: 'Traditional rest between sets',
    icon: Play,
    defaultConfig: {
      style: 'standard',
      restBetweenSets: 90
    }
  },
  {
    style: 'HIIT',
    label: 'HIIT',
    description: 'High-intensity intervals',
    icon: Zap,
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
    description: 'Every minute on the minute',
    icon: Clock,
    defaultConfig: {
      style: 'EMOM',
      intervalMinutes: 1,
      durationMinutes: 10
    }
  },
  {
    style: 'AMRAP',
    label: 'AMRAP',
    description: 'As many rounds as possible',
    icon: Infinity,
    defaultConfig: {
      style: 'AMRAP',
      durationMinutes: 12
    }
  }
]


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
        <div className="space-y-3">
          <div>
            <label className="text-xs text-gray-400 block mb-1">Pattern</label>
            <select
              value={(config as any).pattern || 'standard'}
              onChange={(e) => updateConfig({ pattern: e.target.value })}
              className="w-full h-8 px-2 text-sm bg-neu-surface border border-neu-light/20 rounded"
            >
              <option value="standard">Standard</option>
              <option value="ascending">Ascending</option>
            </select>
          </div>
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
          {(config as any).pattern === 'ascending' && (
            <div className="text-xs text-blue-300 bg-blue-500/10 p-2 rounded border border-blue-500/20">
              Ascending EMOM: Start with 1 rep on minute 1, then 2 reps on minute 2, continuing until time expires
            </div>
          )}
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
  onChange,
  onStyleConfigChange,
  disabled = false,
  compact = false
}: ExecutionStyleSelectorProps) {
  
  // ================================================================================================
  // DERIVED STATE
  // ================================================================================================

  const optionStates = useMemo(() => {
    return EXECUTION_STYLE_OPTIONS.map(option => {
      const isSelected = selectedStyle === option.style
      return {
        option,
        isSelected
      }
    })
  }, [selectedStyle])

  const selectedOption = EXECUTION_STYLE_OPTIONS.find(opt => opt.style === selectedStyle)
  const currentConfig = selectedOption?.defaultConfig || { style: selectedStyle }

  // ================================================================================================
  // EVENT HANDLERS
  // ================================================================================================

  const handleStyleSelect = (style: ExecutionStyle) => {
    if (disabled) return

    const option = EXECUTION_STYLE_OPTIONS.find(opt => opt.style === style)
    onChange(style)
    
    if (onStyleConfigChange && option?.defaultConfig) {
      onStyleConfigChange(option.defaultConfig as ExecutionStyleConfig)
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
      <div>
        <h3 className="text-sm font-medium text-white mb-1">Execution Style</h3>
        <p className="text-xs text-gray-400">Choose how you want to perform your sets</p>
      </div>

      {/* Execution Style Options */}
      <div className={`grid gap-2 ${compact ? 'grid-cols-2' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'}`}>
        {optionStates.map(({ option, isSelected }) => {
          const IconComponent = option.icon
          
          return (
            <Chip
              key={option.style}
              selected={isSelected}
              onClick={() => handleStyleSelect(option.style)}
              disabled={disabled}
              size="label" // 24px height for secondary importance
              variant={isSelected ? 'gold' : 'gold-outline'}
              className="w-full justify-center gap-2 px-3 py-2 h-8 transition-all duration-200 cursor-pointer hover:scale-105"
              icon={<IconComponent className="w-4 h-4" />}
            >
              <span className="text-sm font-medium">{option.label}</span>
            </Chip>
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


    </div>
  )
}