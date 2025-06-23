'use client'

import React, { useMemo, useState } from 'react'
import { Weight, TrendingUp, AlertTriangle, Info, RotateCcw, Calculator } from 'lucide-react'
import { Button } from '@/ui/button'
import { Input } from '@/ui/input'
import { calculatePyramidWeights, suggestPyramidWeights } from '@/utils/exercise-groups'

// ================================================================================================
// COMPONENT PROPS
// ================================================================================================

export interface WeightProgressionConfigProps {
  repPattern: number[]
  startWeight: number
  peakWeight: number
  onStartWeightChange: (weight: number) => void
  onPeakWeightChange: (weight: number) => void
  weightUnit: 'kg' | 'lbs'
  disabled?: boolean
  showPreview?: boolean
  exerciseName?: string
}

// ================================================================================================
// WEIGHT INPUT COMPONENT
// ================================================================================================

interface WeightInputProps {
  label: string
  value: number
  onChange: (value: number) => void
  unit: 'kg' | 'lbs'
  min?: number
  max?: number
  step?: number
  disabled?: boolean
  error?: string
  suggestion?: number
}

function WeightInput({
  label,
  value,
  onChange,
  unit,
  min = 0,
  max = 500,
  step = 2.5,
  disabled = false,
  error,
  suggestion
}: WeightInputProps) {
  const [displayValue, setDisplayValue] = useState(value.toString())

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setDisplayValue(newValue)
    
    const numericValue = parseFloat(newValue)
    if (!isNaN(numericValue) && numericValue >= min && numericValue <= max) {
      onChange(numericValue)
    }
  }

  const handleBlur = () => {
    setDisplayValue(value.toString())
  }

  const applySuggestion = () => {
    if (suggestion !== undefined) {
      onChange(suggestion)
      setDisplayValue(suggestion.toString())
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-white">{label}</label>
        {suggestion !== undefined && suggestion !== value && (
          <Button
            variant="flat"
            size="default"
            onClick={applySuggestion}
            className="h-6 px-2 text-xs"
          >
            Use {suggestion} {unit}
          </Button>
        )}
      </div>
      
      <div className="relative">
        <Input
          type="number"
          value={displayValue}
          onChange={handleChange}
          onBlur={handleBlur}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          className={`pr-12 ${error ? 'border-red-500' : ''}`}
          placeholder={`Enter weight in ${unit}`}
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-400">
          {unit}
        </div>
      </div>
      
      {error && (
        <div className="text-xs text-red-400 flex items-center gap-1">
          <AlertTriangle className="w-3 h-3" />
          {error}
        </div>
      )}
    </div>
  )
}

// ================================================================================================
// PROGRESSION PREVIEW COMPONENT
// ================================================================================================

interface ProgressionPreviewProps {
  weights: number[]
  repPattern: number[]
  unit: 'kg' | 'lbs'
  compact?: boolean
}

function ProgressionPreview({ weights, repPattern, unit, compact = false }: ProgressionPreviewProps) {
  if (weights.length === 0 || repPattern.length === 0) return null

  const totalVolume = weights.reduce((sum, weight, index) => {
    return sum + weight * (repPattern[index] || 0)
  }, 0)

  const averageWeight = weights.reduce((sum, weight) => sum + weight, 0) / weights.length
  const weightRange = Math.max(...weights) - Math.min(...weights)

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium text-white">Weight Progression Preview</h4>
        <div className="text-xs text-gray-400">
          {weights.length} set{weights.length !== 1 ? 's' : ''}
        </div>
      </div>

      {/* Weight progression visualization */}
      <div className="bg-neu-light/5 border border-neu-light/10 rounded-lg p-3">
        <div className="grid grid-cols-2 gap-4 mb-3">
          <div className="text-center">
            <div className="text-xs text-gray-400 mb-1">Total Volume</div>
            <div className="text-sm font-medium text-white">
              {totalVolume.toFixed(1)} {unit}
            </div>
          </div>
          <div className="text-center">
            <div className="text-xs text-gray-400 mb-1">Avg Weight</div>
            <div className="text-sm font-medium text-white">
              {averageWeight.toFixed(1)} {unit}
            </div>
          </div>
        </div>

        {/* Set-by-set breakdown */}
        <div className="space-y-1">
          <div className="text-xs text-gray-400 mb-2">Set-by-set breakdown:</div>
          <div className={`grid gap-1 ${compact ? 'grid-cols-3' : 'grid-cols-2'}`}>
            {weights.slice(0, compact ? 6 : 10).map((weight, index) => (
              <div
                key={index}
                className="text-xs bg-neu-light/10 rounded px-2 py-1 flex justify-between"
              >
                <span>Set {index + 1}:</span>
                <span className="font-mono">
                  {repPattern[index]} × {weight}{unit}
                </span>
              </div>
            ))}
            {weights.length > (compact ? 6 : 10) && (
              <div className="text-xs text-gray-400 col-span-full text-center">
                ...and {weights.length - (compact ? 6 : 10)} more sets
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Progression insights */}
      <div className="space-y-2">
        {weightRange > 0 && (
          <div className="text-xs text-blue-400 bg-blue-500/10 p-2 rounded border border-blue-500/20">
            <div className="flex items-center gap-1 mb-1">
              <TrendingUp className="w-3 h-3" />
              <span className="font-medium">Progression Insight</span>
            </div>
            <span>
              Weight progression spans {weightRange.toFixed(1)} {unit} 
              ({((weightRange / Math.min(...weights)) * 100).toFixed(0)}% increase)
            </span>
          </div>
        )}

        {/* Validation warnings */}
        {weightRange > Math.min(...weights) * 0.5 && (
          <div className="text-xs text-yellow-400 bg-yellow-500/10 p-2 rounded border border-yellow-500/20">
            <div className="flex items-center gap-1 mb-1">
              <AlertTriangle className="w-3 h-3" />
              <span className="font-medium">Large Weight Jumps</span>
            </div>
            <span>
              Consider smaller increments for smoother progression and better form maintenance.
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

// ================================================================================================
// MAIN COMPONENT
// ================================================================================================

export default function WeightProgressionConfig({
  repPattern,
  startWeight,
  peakWeight,
  onStartWeightChange,
  onPeakWeightChange,
  weightUnit,
  disabled = false,
  showPreview = true,
  exerciseName
}: WeightProgressionConfigProps) {
  
  // ================================================================================================
  // DERIVED STATE
  // ================================================================================================

  const calculatedWeights = useMemo(() => {
    if (repPattern.length === 0 || startWeight <= 0 || peakWeight <= 0) {
      return []
    }
    return calculatePyramidWeights(startWeight, peakWeight, repPattern)
  }, [repPattern, startWeight, peakWeight])

  const suggestions = useMemo(() => {
    if (repPattern.length === 0 || startWeight <= 0) {
      return { startWeight: 0, peakWeight: 0 }
    }
    
    const repRange = {
      start: Math.max(...repPattern),
      peak: Math.min(...repPattern)
    }
    
    return suggestPyramidWeights(startWeight, repRange)
  }, [repPattern, startWeight])

  const validation = useMemo(() => {
    const errors: string[] = []
    
    if (startWeight <= 0) {
      errors.push('Start weight must be greater than 0')
    }
    
    if (peakWeight <= 0) {
      errors.push('Peak weight must be greater than 0')
    }
    
    if (startWeight > 0 && peakWeight > 0 && peakWeight <= startWeight) {
      errors.push('Peak weight should be higher than start weight')
    }
    
    if (startWeight > 0 && peakWeight > 0) {
      const ratio = peakWeight / startWeight
      if (ratio > 3) {
        errors.push('Very large weight progression - consider smaller jumps')
      }
    }

    return {
      isValid: errors.length === 0,
      errors
    }
  }, [startWeight, peakWeight])

  // ================================================================================================
  // EVENT HANDLERS
  // ================================================================================================

  const handleReset = () => {
    onStartWeightChange(0)
    onPeakWeightChange(0)
  }

  const handleAutoCalculate = () => {
    if (suggestions.peakWeight > 0) {
      onPeakWeightChange(suggestions.peakWeight)
    }
  }

  // ================================================================================================
  // RENDER
  // ================================================================================================

  if (repPattern.length === 0) {
    return (
      <div className="bg-gray-500/10 border border-gray-500/20 rounded-lg p-4 text-center">
        <Calculator className="w-8 h-8 text-gray-400 mx-auto mb-2" />
        <div className="text-sm text-gray-400">
          Weight progression is only available for pyramid rep schemes
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Weight className="w-5 h-5 text-primary" />
          <h3 className="text-sm font-medium text-white">Weight Progression</h3>
          <Button
            variant="flat"
            size="icon"
            className="h-5 w-5 p-0"
            title="Configure automatic weight progression for pyramid sets"
          >
            <Info className="w-3 h-3" />
          </Button>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="flat"
            size="default"
            onClick={handleAutoCalculate}
            disabled={disabled || startWeight <= 0}
            className="h-6 px-2 text-xs"
          >
            Auto-Calculate
          </Button>
          <Button
            variant="flat"
            size="icon"
            onClick={handleReset}
            disabled={disabled}
            className="h-6 w-6 p-0"
            title="Reset weights"
          >
            <RotateCcw className="w-3 h-3" />
          </Button>
        </div>
      </div>

      {/* Exercise context */}
      {exerciseName && (
        <div className="text-sm text-gray-400">
          Configuring progression for <span className="text-white font-medium">{exerciseName}</span>
        </div>
      )}

      {/* Weight inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <WeightInput
          label="Start Weight"
          value={startWeight}
          onChange={onStartWeightChange}
          unit={weightUnit}
          disabled={disabled}
          error={validation.errors.find(e => e.includes('start weight')) || undefined}
          suggestion={suggestions.startWeight > 0 ? suggestions.startWeight : undefined}
        />
        
        <WeightInput
          label="Peak Weight"
          value={peakWeight}
          onChange={onPeakWeightChange}
          unit={weightUnit}
          disabled={disabled}
          error={validation.errors.find(e => e.includes('peak weight') || e.includes('higher than')) || undefined}
          suggestion={suggestions.peakWeight > 0 ? suggestions.peakWeight : undefined}
        />
      </div>

      {/* Rep pattern context */}
      <div className="bg-neu-light/5 border border-neu-light/10 rounded-lg p-3">
        <div className="text-sm font-medium text-white mb-2">Rep Pattern</div>
        <div className="text-xs text-gray-400 mb-2">
          Your pyramid will follow this rep pattern:
        </div>
        <div className="text-sm font-mono bg-neu-light/10 p-2 rounded">
          {repPattern.slice(0, 8).join(', ')}
          {repPattern.length > 8 && `, ...+${repPattern.length - 8} more`}
        </div>
      </div>

      {/* Progression preview */}
      {showPreview && calculatedWeights.length > 0 && validation.isValid && (
        <ProgressionPreview
          weights={calculatedWeights}
          repPattern={repPattern}
          unit={weightUnit}
        />
      )}

      {/* Validation errors */}
      {validation.errors.length > 0 && (
        <div className="space-y-1">
          {validation.errors.map((error, index) => (
            <div key={index} className="text-xs text-red-400 bg-red-500/10 p-2 rounded border border-red-500/20">
              <div className="flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" />
                {error}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Help text */}
      <div className="text-xs text-gray-500">
        💡 Weight progression automatically calculates weights for each set based on your rep pattern. 
        Start with a weight you can handle for high reps, peak with your heaviest weight for low reps.
      </div>
    </div>
  )
}