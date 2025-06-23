'use client'

import React from 'react'
import { X, Trash2, Eye } from 'lucide-react'
import { Button } from '@/ui/button'
import { Card, CardContent } from '@/ui/card'
import { Exercise } from '@/types'
import { SelectionSummaryProps } from '@/types/exercise-selection'
import { categoryMapping } from '@/lib/wger'

// ================================================================================================
// SELECTED EXERCISE ITEM
// ================================================================================================

interface SelectedExerciseItemProps {
  exercise: Exercise
  onRemove: (exerciseId: string) => void
  compact?: boolean
}

function SelectedExerciseItem({ exercise, onRemove, compact = false }: SelectedExerciseItemProps) {
  const formatExerciseInfo = (exercise: Exercise): string => {
    const equipment = exercise.equipment || 'Unknown'
    
    let category = ''
    if (exercise.category && categoryMapping[exercise.category]) {
      category = categoryMapping[exercise.category]
      category = category.charAt(0).toUpperCase() + category.slice(1)
    } else if (exercise.muscleGroup) {
      category = exercise.muscleGroup.charAt(0).toUpperCase() + exercise.muscleGroup.slice(1)
    } else {
      category = 'Unknown'
    }

    return compact ? category : `${equipment} | ${category}`
  }

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation()
    onRemove(exercise.id)
  }

  if (compact) {
    return (
      <div className="flex items-center gap-2 bg-neu-light/10 rounded-lg px-3 py-2">
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium truncate">{exercise.name}</div>
          <div className="text-xs text-gray-400 truncate">
            {formatExerciseInfo(exercise)}
          </div>
        </div>
        <Button
          variant="flat"
          size="default"
          onClick={handleRemove}
          className="h-6 w-6 p-0 hover:bg-red-500/20 hover:text-red-400"
          title="Remove exercise"
        >
          <X className="w-3 h-3" />
        </Button>
      </div>
    )
  }

  return (
    <Card className="p-3" surface="flat" depth="subtle">
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium truncate">{exercise.name}</div>
          <div className="text-xs text-gray-400 mt-1">
            {formatExerciseInfo(exercise)}
          </div>
          {exercise.isWeighted && (
            <div className="mt-2">
              <span className="text-xs bg-neu-light/10 text-neu-light px-2 py-1 rounded">
                Weighted
              </span>
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-2 ml-4">
          <Button
            variant="flat"
            size="default"
            onClick={handleRemove}
            className="h-8 w-8 p-0 hover:bg-red-500/20 hover:text-red-400"
            title="Remove exercise"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  )
}

// ================================================================================================
// MAIN COMPONENT
// ================================================================================================

export default function SelectionSummary({
  selectedExercises,
  onRemoveExercise,
  onClearAll,
  maxHeight = "300px",
  compact = false
}: SelectionSummaryProps) {
  
  // ================================================================================================
  // DERIVED DATA
  // ================================================================================================

  const exercisesByMuscleGroup = selectedExercises.reduce((acc, exercise) => {
    const group = exercise.muscleGroup || 'Unknown'
    if (!acc[group]) {
      acc[group] = []
    }
    acc[group].push(exercise)
    return acc
  }, {} as Record<string, Exercise[]>)

  const uniqueEquipment = Array.from(
    new Set(selectedExercises.map(ex => ex.equipment))
  ).filter(Boolean)

  const weightedExercises = selectedExercises.filter(ex => ex.isWeighted)

  // ================================================================================================
  // RENDER
  // ================================================================================================

  if (selectedExercises.length === 0) {
    return (
      <div className="text-center py-8 text-gray-400">
        <div className="text-sm">No exercises selected</div>
        <div className="text-xs mt-1">Select exercises to see them here</div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Summary Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">
            Selected Exercises ({selectedExercises.length})
          </h3>
          {!compact && (
            <div className="text-sm text-gray-400 mt-1">
              {Object.keys(exercisesByMuscleGroup).length} muscle group{Object.keys(exercisesByMuscleGroup).length !== 1 ? 's' : ''}
              {uniqueEquipment.length > 0 && ` • ${uniqueEquipment.length} equipment type${uniqueEquipment.length !== 1 ? 's' : ''}`}
              {weightedExercises.length > 0 && ` • ${weightedExercises.length} weighted`}
            </div>
          )}
        </div>
        
        <Button
          variant="outline"
          size="default"
          onClick={onClearAll}
          className="gap-2 hover:bg-red-500/20 hover:text-red-400 hover:border-red-500/50"
        >
          <Trash2 className="w-4 h-4" />
          Clear All
        </Button>
      </div>

      {/* Equipment Summary */}
      {!compact && uniqueEquipment.length > 0 && (
        <div>
          <div className="text-sm font-medium mb-2">Equipment Needed</div>
          <div className="flex flex-wrap gap-2">
            {uniqueEquipment.map(equipment => (
              <span
                key={equipment}
                className="text-xs bg-neu-light/10 text-neu-light px-2 py-1 rounded"
              >
                {equipment}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Exercise List */}
      <div 
        className="space-y-2 overflow-y-auto"
        style={{ maxHeight }}
      >
        {compact ? (
          // Compact view - simple list
          selectedExercises.map(exercise => (
            <SelectedExerciseItem
              key={exercise.id}
              exercise={exercise}
              onRemove={onRemoveExercise}
              compact={true}
            />
          ))
        ) : (
          // Full view - grouped by muscle group
          Object.entries(exercisesByMuscleGroup).map(([muscleGroup, exercises]) => (
            <div key={muscleGroup}>
              <div className="text-sm font-medium text-gray-300 mb-2 px-1">
                {muscleGroup.charAt(0).toUpperCase() + muscleGroup.slice(1)} ({exercises.length})
              </div>
              <div className="space-y-2 ml-4">
                {exercises.map(exercise => (
                  <SelectedExerciseItem
                    key={exercise.id}
                    exercise={exercise}
                    onRemove={onRemoveExercise}
                    compact={false}
                  />
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Selection Tips */}
      {!compact && selectedExercises.length > 0 && (
        <div className="text-xs text-gray-400 bg-neu-light/5 p-3 rounded-lg">
          <div className="font-medium mb-1">💡 Tips:</div>
          <ul className="space-y-1">
            {selectedExercises.length === 1 && (
              <li>• Single exercise will be added individually</li>
            )}
            {selectedExercises.length >= 2 && selectedExercises.length <= 3 && (
              <li>• Perfect for a superset (2-3 exercises back-to-back)</li>
            )}
            {selectedExercises.length >= 4 && selectedExercises.length <= 8 && (
              <li>• Great for a circuit (multiple exercises in sequence)</li>
            )}
            {uniqueEquipment.length === 1 && selectedExercises.length >= 2 && (
              <li>• All exercises use {uniqueEquipment[0]} - perfect for a complex</li>
            )}
            {selectedExercises.length > 8 && (
              <li>• Consider breaking into smaller groups for better workout flow</li>
            )}
          </ul>
        </div>
      )}
    </div>
  )
}