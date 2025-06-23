'use client'

import React from 'react'
import { User, Users, CheckCircle, AlertCircle, Info, Zap, Target, RotateCcw, Repeat } from 'lucide-react'
import { Button } from '@/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/ui/card'
import { Exercise } from '@/types'
import { EnhancedExerciseGroupType } from '@/types/exercise-groups'
import {
  GroupingOptionsSelectorProps,
  GroupTypeSuggestion,
  EquipmentCompatibilityResult
} from '@/types/exercise-selection'
import { getGroupTypeDisplayName } from '@/utils/exercise-groups'

// ================================================================================================
// GROUP TYPE SUGGESTION CARD
// ================================================================================================

interface GroupTypeSuggestionCardProps {
  suggestion: GroupTypeSuggestion
  isSelected: boolean
  isDisabled: boolean
  onClick: (groupType: EnhancedExerciseGroupType) => void
  exerciseCount: number
}

function GroupTypeSuggestionCard({
  suggestion,
  isSelected,
  isDisabled,
  onClick,
  exerciseCount
}: GroupTypeSuggestionCardProps) {
  const getGroupTypeIcon = (groupType: EnhancedExerciseGroupType) => {
    switch (groupType) {
      case 'single':
        return <User className="w-5 h-5" />
      case 'superset':
        return <Zap className="w-5 h-5" />
      case 'circuit':
        return <RotateCcw className="w-5 h-5" />
      case 'complex':
        return <Target className="w-5 h-5" />
      default:
        return <Repeat className="w-5 h-5" />
    }
  }

  const getCompatibilityColor = (score: number) => {
    if (score >= 0.8) return 'text-green-400'
    if (score >= 0.6) return 'text-primary'
    if (score >= 0.4) return 'text-yellow-400'
    return 'text-red-400'
  }

  const getCompatibilityIndicator = (score: number) => {
    if (score >= 0.7) return <CheckCircle className="w-4 h-4 text-green-400" />
    if (score >= 0.4) return <AlertCircle className="w-4 h-4 text-yellow-400" />
    return <AlertCircle className="w-4 h-4 text-red-400" />
  }

  const handleClick = () => {
    if (!isDisabled) {
      onClick(suggestion.groupType)
    }
  }

  return (
    <Card
      className={`cursor-pointer transition-all duration-200 ${
        isSelected 
          ? 'border-2 border-primary bg-primary/10' 
          : 'hover:border-neu-light/30 hover:bg-neu-light/5'
      } ${
        isDisabled ? 'opacity-50 cursor-not-allowed' : ''
      } ${
        suggestion.isPrimary ? 'ring-2 ring-primary/30' : ''
      }`}
      surface={isSelected ? "flat" : "convex"}
      depth={isSelected ? "subtle" : "subtle"}
      onClick={handleClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${
              isSelected ? 'bg-primary text-background' : 'bg-neu-light/10 text-neu-light'
            }`}>
              {getGroupTypeIcon(suggestion.groupType)}
            </div>
            <div>
              <CardTitle className="text-base">
                {getGroupTypeDisplayName(suggestion.groupType)}
              </CardTitle>
              {suggestion.isPrimary && (
                <div className="text-xs text-primary font-medium mt-1">
                  Recommended
                </div>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {getCompatibilityIndicator(suggestion.compatibilityScore)}
            <div className={`text-sm font-medium ${getCompatibilityColor(suggestion.compatibilityScore)}`}>
              {Math.round(suggestion.compatibilityScore * 100)}%
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="text-sm text-gray-400 mb-3">
          {suggestion.reasoning}
        </div>
        
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>
            {suggestion.exerciseCountRange.min}-{suggestion.exerciseCountRange.max} exercises
          </span>
          <span>
            Current: {exerciseCount}
          </span>
        </div>
        
        {suggestion.isRecommended && (
          <div className="mt-2 text-xs text-green-400 flex items-center gap-1">
            <CheckCircle className="w-3 h-3" />
            Great fit for your selection
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// ================================================================================================
// EQUIPMENT COMPATIBILITY DISPLAY
// ================================================================================================

interface EquipmentCompatibilityDisplayProps {
  compatibility: EquipmentCompatibilityResult
  exerciseCount: number
}

function EquipmentCompatibilityDisplay({ 
  compatibility, 
  exerciseCount 
}: EquipmentCompatibilityDisplayProps) {
  return (
    <Card surface="flat" depth="subtle">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm flex items-center gap-2">
          <Target className="w-4 h-4" />
          Equipment Compatibility
        </CardTitle>
      </CardHeader>
      
      <CardContent className="pt-0 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-400">Compatibility Score</span>
          <div className="flex items-center gap-2">
            <div className={`text-sm font-medium ${
              compatibility.compatibilityScore >= 0.7 ? 'text-green-400' :
              compatibility.compatibilityScore >= 0.4 ? 'text-yellow-400' : 'text-red-400'
            }`}>
              {Math.round(compatibility.compatibilityScore * 100)}%
            </div>
            {compatibility.isCompatible ? (
              <CheckCircle className="w-4 h-4 text-green-400" />
            ) : (
              <AlertCircle className="w-4 h-4 text-yellow-400" />
            )}
          </div>
        </div>
        
        {compatibility.sharedEquipment.length > 0 && (
          <div>
            <div className="text-sm text-gray-400 mb-2">Shared Equipment</div>
            <div className="flex flex-wrap gap-2">
              {compatibility.sharedEquipment.map(equipment => (
                <span
                  key={equipment}
                  className="text-xs bg-green-500/10 text-green-400 px-2 py-1 rounded border border-green-500/20"
                >
                  {equipment}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {compatibility.conflictingEquipment.length > 0 && (
          <div>
            <div className="text-sm text-gray-400 mb-2">Different Equipment</div>
            <div className="flex flex-wrap gap-2">
              {compatibility.conflictingEquipment.map(equipment => (
                <span
                  key={equipment}
                  className="text-xs bg-yellow-500/10 text-yellow-400 px-2 py-1 rounded border border-yellow-500/20"
                >
                  {equipment}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {compatibility.recommendComplex && (
          <div className="text-xs text-green-400 bg-green-500/10 p-2 rounded border border-green-500/20">
            <div className="flex items-center gap-1 mb-1">
              <Info className="w-3 h-3" />
              <span className="font-medium">Complex Recommended</span>
            </div>
            <span>All exercises use similar equipment - perfect for a complex workout!</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// ================================================================================================
// MAIN COMPONENT
// ================================================================================================

export default function GroupingOptionsSelector({
  selectedExercises,
  onGroupingModeChange,
  onGroupTypeSelect,
  suggestions,
  equipmentCompatibility,
  currentGroupingMode,
  currentGroupType
}: GroupingOptionsSelectorProps) {
  
  // ================================================================================================
  // DERIVED STATE
  // ================================================================================================

  const exerciseCount = selectedExercises.length
  const hasMultipleExercises = exerciseCount > 1
  
  // Auto-select single for single exercise
  const effectiveGroupingMode = exerciseCount === 1 ? 'individual' : currentGroupingMode
  
  // Filter suggestions based on grouping mode
  const filteredSuggestions = currentGroupingMode === 'individual'
    ? suggestions.filter(s => s.groupType === 'single')
    : suggestions.filter(s => s.groupType !== 'single')

  // ================================================================================================
  // EVENT HANDLERS
  // ================================================================================================

  const handleGroupingModeChange = (mode: 'individual' | 'grouped') => {
    onGroupingModeChange(mode)
    
    // Auto-select appropriate group type
    if (mode === 'individual') {
      onGroupTypeSelect('single')
    } else {
      // Select the top suggestion for grouped mode
      const topSuggestion = suggestions
        .filter(s => s.groupType !== 'single')
        .sort((a, b) => b.compatibilityScore - a.compatibilityScore)[0]
      
      if (topSuggestion) {
        onGroupTypeSelect(topSuggestion.groupType)
      }
    }
  }

  // ================================================================================================
  // RENDER
  // ================================================================================================

  return (
    <div className="space-y-6">
      {/* Grouping Mode Selection */}
      <div>
        <h3 className="text-lg font-medium mb-4">How would you like to organize these exercises?</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Individual Mode */}
          <Card
            className={`cursor-pointer transition-all duration-200 ${
              effectiveGroupingMode === 'individual'
                ? 'border-2 border-primary bg-primary/10'
                : 'hover:border-neu-light/30 hover:bg-neu-light/5'
            } ${exerciseCount === 1 ? 'ring-2 ring-primary/30' : ''}`}
            surface={effectiveGroupingMode === 'individual' ? "flat" : "convex"}
            depth={effectiveGroupingMode === 'individual' ? "subtle" : "subtle"}
            onClick={() => handleGroupingModeChange('individual')}
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className={`p-2 rounded-lg ${
                  effectiveGroupingMode === 'individual' 
                    ? 'bg-primary text-background' 
                    : 'bg-neu-light/10 text-neu-light'
                }`}>
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-medium">Add Individually</div>
                  {exerciseCount === 1 && (
                    <div className="text-xs text-primary font-medium">
                      Automatic for single exercise
                    </div>
                  )}
                </div>
              </div>
              
              <div className="text-sm text-gray-400 mb-3">
                Each exercise will be added as a separate entry to your workout
              </div>
              
              <div className="text-xs text-gray-500">
                • {exerciseCount} separate workout entries
                • Track each exercise independently
                • Full flexibility for sets and reps
              </div>
            </CardContent>
          </Card>

          {/* Grouped Mode */}
          <Card
            className={`cursor-pointer transition-all duration-200 ${
              currentGroupingMode === 'grouped'
                ? 'border-2 border-primary bg-primary/10'
                : 'hover:border-neu-light/30 hover:bg-neu-light/5'
            } ${!hasMultipleExercises ? 'opacity-50 cursor-not-allowed' : ''}`}
            surface={currentGroupingMode === 'grouped' ? "flat" : "convex"}
            depth={currentGroupingMode === 'grouped' ? "subtle" : "subtle"}
            onClick={() => hasMultipleExercises && handleGroupingModeChange('grouped')}
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className={`p-2 rounded-lg ${
                  currentGroupingMode === 'grouped' 
                    ? 'bg-primary text-background' 
                    : 'bg-neu-light/10 text-neu-light'
                }`}>
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-medium">Group Together</div>
                  {!hasMultipleExercises && (
                    <div className="text-xs text-gray-500">
                      Requires 2+ exercises
                    </div>
                  )}
                </div>
              </div>
              
              <div className="text-sm text-gray-400 mb-3">
                Combine exercises into a single structured group
              </div>
              
              <div className="text-xs text-gray-500">
                • 1 workout entry with {exerciseCount} exercises
                • Structured workout patterns
                • Advanced rep schemes and timing
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Group Type Selection */}
      {currentGroupingMode === 'grouped' && hasMultipleExercises && (
        <div>
          <h3 className="text-lg font-medium mb-4">Choose your group type</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredSuggestions.map(suggestion => (
              <GroupTypeSuggestionCard
                key={suggestion.groupType}
                suggestion={suggestion}
                isSelected={currentGroupType === suggestion.groupType}
                isDisabled={false}
                onClick={onGroupTypeSelect}
                exerciseCount={exerciseCount}
              />
            ))}
          </div>
        </div>
      )}

      {/* Equipment Compatibility */}
      {equipmentCompatibility && hasMultipleExercises && (
        <div>
          <EquipmentCompatibilityDisplay
            compatibility={equipmentCompatibility}
            exerciseCount={exerciseCount}
          />
        </div>
      )}

      {/* Group Type Explanation */}
      {currentGroupType && currentGroupType !== 'single' && (
        <Card surface="flat" depth="subtle">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Info className="w-4 h-4 text-primary" />
              <span className="font-medium">About {getGroupTypeDisplayName(currentGroupType)}</span>
            </div>
            
            <div className="text-sm text-gray-400 space-y-2">
              {currentGroupType === 'superset' && (
                <>
                  <p>Supersets involve performing 2-3 exercises back-to-back with minimal rest between them.</p>
                  <p>Perfect for: Muscle building, time efficiency, increased intensity</p>
                </>
              )}
              
              {currentGroupType === 'circuit' && (
                <>
                  <p>Circuits involve rotating through multiple exercises in sequence for multiple rounds.</p>
                  <p>Perfect for: Conditioning, full-body workouts, metabolic training</p>
                </>
              )}
              
              {currentGroupType === 'complex' && (
                <>
                  <p>Complexes use the same piece of equipment throughout all exercises without putting it down.</p>
                  <p>Perfect for: Strength-power development, equipment efficiency, flow training</p>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}