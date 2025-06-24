'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { X, ArrowLeft, Check, Users, User, Layers, Dumbbell } from 'lucide-react'
import { Button } from '@/ui/button'
import { Input } from '@/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/ui/card'
import { Exercise } from '@/types'
import { EnhancedWorkoutEntry, EnhancedExerciseGroupType } from '@/types/exercise-groups'
import ExerciseSearch from './ExerciseSearch'

// ================================================================================================
// COMPONENT PROPS
// ================================================================================================

interface GroupContextExerciseSelectionProps {
  groupContext: EnhancedWorkoutEntry
  availableExercises: Exercise[]
  onSelectExercises: (exercises: Exercise[]) => void
  onBack: () => void
  onCancel: () => void
  preSelectedExercises?: Exercise[]
}

// ================================================================================================
// GROUP CONTEXT DISPLAY
// ================================================================================================

interface GroupContextDisplayProps {
  groupContext: EnhancedWorkoutEntry
}

function GroupContextDisplay({ groupContext }: GroupContextDisplayProps) {
  const getGroupIcon = (type: EnhancedExerciseGroupType) => {
    switch (type) {
      case 'single': return <User className="w-5 h-5" />
      case 'superset': return <Users className="w-5 h-5" />
      case 'circuit': return <Layers className="w-5 h-5" />
      case 'complex': return <Dumbbell className="w-5 h-5" />
    }
  }

  const getRequiredCount = () => {
    switch (groupContext.type) {
      case 'single': return '1 exercise'
      case 'superset': return '2-3 exercises'
      case 'circuit': return '3+ exercises'
      case 'complex': return '2+ exercises (same equipment)'
      default: return 'exercises'
    }
  }

  const getPatternPreview = () => {
    if (!groupContext.repScheme || groupContext.repScheme.type === 'standard') return null
    
    switch (groupContext.repScheme.type) {
      case 'descending':
        if (groupContext.repScheme.pattern === '21-3') return '21, 18, 15, 12, 9, 6, 3'
        if (groupContext.repScheme.pattern === '10-1') return '10, 9, 8, 7, 6, 5, 4, 3, 2, 1'
        break
      case 'pyramid':
        if (groupContext.repScheme.pattern === '10-1-10') return '10, 8, 6, 4, 2, 1, 2, 4, 6, 8, 10'
        break
      case 'ascending':
        return '1, 2, 3, 4, 5, 6, 7, 8, 9, 10...'
    }
    return null
  }

  const patternPreview = getPatternPreview()

  return (
    <Card className="mb-6" style={{ background: 'var(--surface-neu-light-subtle)', borderColor: 'var(--border-neu-gold-light)' }}>
      <CardHeader style={{ padding: 'var(--spacing-4)' }}>
        <CardTitle className="flex items-center gap-3">
          {getGroupIcon(groupContext.type)}
          <div>
            <div className="text-lg font-medium text-white">
              {groupContext.type.charAt(0).toUpperCase() + groupContext.type.slice(1)} Configuration
            </div>
            <div className="text-sm text-gray-400 font-normal">
              Select {getRequiredCount()} for your group
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent style={{ padding: '0 var(--spacing-4) var(--spacing-4)' }}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div>
            <div className="text-xs text-gray-400 mb-1">Execution</div>
            <div className="px-2 py-1 bg-neu-light/10 rounded text-sm font-medium">
              {groupContext.executionStyle?.style || 'Standard'}
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-400 mb-1">Rep Scheme</div>
            <div className="px-2 py-1 bg-neu-light/10 rounded text-sm font-medium">
              {groupContext.repScheme?.type || 'Standard'}
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-400 mb-1">Sets</div>
            <div className="px-2 py-1 bg-neu-light/10 rounded text-sm font-medium">
              {groupContext.sets}
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-400 mb-1">Rest</div>
            <div className="px-2 py-1 bg-neu-light/10 rounded text-sm font-medium">
              {groupContext.restAfterGroup || 90}s
            </div>
          </div>
        </div>
        
        {patternPreview && (
          <div className="mt-3 p-2 bg-neu-dark/50 rounded">
            <div className="text-xs text-gray-400 mb-1">Rep Pattern Preview:</div>
            <div className="text-sm font-mono text-gray-300">{patternPreview}</div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// ================================================================================================
// SELECTION SUMMARY
// ================================================================================================

interface SelectionSummaryProps {
  selectedExercises: Exercise[]
  groupContext: EnhancedWorkoutEntry
  onRemoveExercise: (exerciseId: string) => void
  onClearAll: () => void
}

function SelectionSummary({ selectedExercises, groupContext, onRemoveExercise, onClearAll }: SelectionSummaryProps) {
  const { min, max } = getRequiredCount(groupContext.type)
  const isValidSelection = selectedExercises.length >= min && selectedExercises.length <= max
  
  if (selectedExercises.length === 0) return null

  return (
    <Card className="mb-4">
      <CardHeader style={{ padding: 'var(--spacing-4) var(--spacing-4) 0' }}>
        <div className="flex justify-between items-center">
          <CardTitle className="text-md">
            Selected Exercises ({selectedExercises.length}/{min}-{max})
          </CardTitle>
          <Button onClick={onClearAll} variant="ghost" size="sm" className="text-gray-400">
            Clear All
          </Button>
        </div>
      </CardHeader>
      <CardContent style={{ padding: 'var(--spacing-4)' }}>
        <div className="space-y-2">
          {selectedExercises.map((exercise, index) => (
            <div key={exercise.id} className="flex justify-between items-center p-2 bg-neu-light/5 rounded">
              <div>
                <div className="text-sm font-medium text-white">{exercise.name}</div>
                <div className="text-xs text-gray-400">{exercise.muscleGroup} • {exercise.equipment}</div>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-xs text-gray-400">#{index + 1}</div>
                <Button
                  onClick={() => onRemoveExercise(exercise.id)}
                  variant="ghost"
                  size="sm"
                  className="text-red-400 hover:text-red-300 p-1"
                >
                  <X className="w-3 h-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        {!isValidSelection && (
          <div className="mt-3 p-2 bg-warning/10 border border-warning/20 rounded">
            <div className="text-sm text-warning">
              {selectedExercises.length < min 
                ? `Select at least ${min} exercise${min > 1 ? 's' : ''} for ${groupContext.type}`
                : `Maximum ${max} exercises allowed for ${groupContext.type}`
              }
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// ================================================================================================
// HELPER FUNCTIONS
// ================================================================================================

function getRequiredCount(type: EnhancedExerciseGroupType): { min: number; max: number } {
  switch (type) {
    case 'single':
      return { min: 1, max: 1 }
    case 'superset':
      return { min: 2, max: 3 }
    case 'circuit':
      return { min: 3, max: 10 }
    case 'complex':
      return { min: 2, max: 5 }
    default:
      return { min: 1, max: 10 }
  }
}

// ================================================================================================
// MAIN COMPONENT
// ================================================================================================

export default function GroupContextExerciseSelection({
  groupContext,
  availableExercises,
  onSelectExercises,
  onBack,
  onCancel,
  preSelectedExercises = []
}: GroupContextExerciseSelectionProps) {
  
  const [selectedExercises, setSelectedExercises] = useState<Exercise[]>(preSelectedExercises)
  const [searchQuery, setSearchQuery] = useState('')
  const [muscleGroupFilter, setMuscleGroupFilter] = useState<string>('')

  // ================================================================================================
  // EXERCISE FILTERING
  // ================================================================================================

  const filteredExercises = useMemo(() => {
    return availableExercises.filter(exercise => {
      // Search query filter
      if (searchQuery && !exercise.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false
      }

      // Muscle group filter
      if (muscleGroupFilter && exercise.muscleGroup !== muscleGroupFilter) {
        return false
      }

      // Don't show already selected exercises
      if (selectedExercises.some(selected => selected.id === exercise.id)) {
        return false
      }

      return true
    })
  }, [availableExercises, searchQuery, muscleGroupFilter, selectedExercises])

  const muscleGroups = useMemo(() => {
    const groups = new Set(availableExercises.map(ex => ex.muscleGroup))
    return Array.from(groups).sort()
  }, [availableExercises])

  // ================================================================================================
  // HANDLERS
  // ================================================================================================

  const handleSelectExercise = (exercise: Exercise) => {
    const { max } = getRequiredCount(groupContext.type)
    
    if (selectedExercises.length < max) {
      setSelectedExercises(prev => [...prev, exercise])
    }
  }

  const handleRemoveExercise = (exerciseId: string) => {
    setSelectedExercises(prev => prev.filter(ex => ex.id !== exerciseId))
  }

  const handleClearAll = () => {
    setSelectedExercises([])
  }

  const handleConfirmSelection = () => {
    const { min, max } = getRequiredCount(groupContext.type)
    if (selectedExercises.length >= min && selectedExercises.length <= max) {
      onSelectExercises(selectedExercises)
    }
  }

  // ================================================================================================
  // VALIDATION
  // ================================================================================================

  const { min, max } = getRequiredCount(groupContext.type)
  const isValidSelection = selectedExercises.length >= min && selectedExercises.length <= max
  const canContinue = isValidSelection

  // ================================================================================================
  // RENDER
  // ================================================================================================

  return (
    <div className="fixed inset-0 bg-neu-darkest/90 backdrop-blur-sm flex items-center justify-center z-[100] md:p-4">
      <div className="bg-neu-modal-bg shadow-neu-raised-xl w-full max-w-5xl md:rounded-2xl h-full md:h-auto md:max-h-[90vh] overflow-hidden flex flex-col border border-neu-light/20">
        
        {/* Header */}
        <div className="p-6 border-b border-neu-light/20 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Button onClick={onBack} variant="ghost" size="icon" className="text-gray-400 hover:text-white">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h2 className="text-white text-xl font-medium">
              Select Exercises for {groupContext.type.charAt(0).toUpperCase() + groupContext.type.slice(1)}
            </h2>
          </div>
          <Button onClick={onCancel} variant="flat" size="icon" className="text-gray-400 hover:text-white">
            <X className="w-6 h-6" />
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          
          {/* Group Context Display */}
          <GroupContextDisplay groupContext={groupContext} />

          {/* Selection Summary */}
          <SelectionSummary
            selectedExercises={selectedExercises}
            groupContext={groupContext}
            onRemoveExercise={handleRemoveExercise}
            onClearAll={handleClearAll}
          />

          {/* Search and Filter */}
          <div className="mb-4 space-y-3">
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search exercises..."
              className="w-full"
            />
            
            <div className="flex gap-2 flex-wrap">
              <Button
                onClick={() => setMuscleGroupFilter('')}
                variant={muscleGroupFilter === '' ? 'primary' : 'outline'}
                size="sm"
              >
                All
              </Button>
              {muscleGroups.map(group => (
                <Button
                  key={group}
                  onClick={() => setMuscleGroupFilter(group)}
                  variant={muscleGroupFilter === group ? 'primary' : 'outline'}
                  size="sm"
                >
                  {group}
                </Button>
              ))}
            </div>
          </div>

          {/* Exercise Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredExercises.map(exercise => (
              <Card
                key={exercise.id}
                className="cursor-pointer hover:shadow-neu-elevated transition-all duration-200 hover:scale-[1.02]"
                onClick={() => handleSelectExercise(exercise)}
              >
                <CardContent className="p-4">
                  <div>
                    <h4 className="text-white font-medium mb-1">{exercise.name}</h4>
                    <div className="text-sm text-gray-400 mb-2">
                      {exercise.muscleGroup} • {exercise.equipment}
                    </div>
                    {exercise.cues && (
                      <div className="text-xs text-gray-500 line-clamp-2">
                        {exercise.cues}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredExercises.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              <div className="text-4xl mb-4">🔍</div>
              <div className="text-lg mb-2">No exercises found</div>
              <div className="text-sm">Try adjusting your search or filters</div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-neu-subtle flex gap-3">
          <Button
            onClick={onBack}
            variant="outline"
            size="default"
            className="flex-1 py-3"
          >
            Back to Configuration
          </Button>
          <Button
            onClick={handleConfirmSelection}
            disabled={!canContinue}
            variant="primary"
            size="default"
            className="flex-1 py-3 flex items-center justify-center gap-2"
          >
            <Check className="w-4 h-4" />
            Confirm Selection ({selectedExercises.length})
          </Button>
        </div>
      </div>
    </div>
  )
}