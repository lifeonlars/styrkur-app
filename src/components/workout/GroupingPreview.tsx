'use client'

import React from 'react'
import { User, Users, Clock, Target, AlertTriangle, CheckCircle, Info } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/ui/card'
import { Exercise } from '@/types'
import { EnhancedExerciseGroupType } from '@/types/exercise-groups'
import { GroupingPreview } from '@/types/exercise-selection'
import { getGroupTypeDisplayName, estimateGroupDuration } from '@/utils/exercise-groups'
import { categoryMapping } from '@/lib/wger'

// ================================================================================================
// COMPONENT PROPS
// ================================================================================================

interface GroupingPreviewProps {
  selectedExercises: Exercise[]
  groupingMode: 'individual' | 'grouped'
  groupType?: EnhancedExerciseGroupType | null
}

// ================================================================================================
// EXERCISE PREVIEW ITEM
// ================================================================================================

interface ExercisePreviewItemProps {
  exercise: Exercise
  index: number
  isGrouped: boolean
}

function ExercisePreviewItem({ exercise, index, isGrouped }: ExercisePreviewItemProps) {
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

    return `${equipment} | ${category}`
  }

  return (
    <div className="flex items-center gap-3 p-3 bg-neu-light/5 rounded-lg border border-neu-light/10">
      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
        isGrouped 
          ? 'bg-primary text-background' 
          : 'bg-neu-light/20 text-neu-light'
      }`}>
        {isGrouped ? index + 1 : index + 1}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="font-medium truncate">{exercise.name}</div>
        <div className="text-sm text-gray-400 truncate">
          {formatExerciseInfo(exercise)}
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        {exercise.isWeighted && (
          <span className="text-xs bg-neu-light/10 text-neu-light px-2 py-1 rounded">
            Weighted
          </span>
        )}
      </div>
    </div>
  )
}

// ================================================================================================
// PREVIEW SUMMARY CARD
// ================================================================================================

interface PreviewSummaryCardProps {
  preview: GroupingPreview
}

function PreviewSummaryCard({ preview }: PreviewSummaryCardProps) {
  const getGroupIcon = (groupingMode: 'individual' | 'grouped') => {
    return groupingMode === 'individual' ? (
      <User className="w-5 h-5" />
    ) : (
      <Users className="w-5 h-5" />
    )
  }

  return (
    <Card surface="flat" depth="elevated">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          {getGroupIcon(preview.groupingMode)}
          Selection Summary
        </CardTitle>
      </CardHeader>
      
      <CardContent className="pt-0 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{preview.groupCount}</div>
            <div className="text-sm text-gray-400">
              Workout {preview.groupCount === 1 ? 'Entry' : 'Entries'}
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{preview.exerciseCount}</div>
            <div className="text-sm text-gray-400">
              Exercise{preview.exerciseCount !== 1 ? 's' : ''}
            </div>
          </div>
        </div>
        
        <div className="text-center py-3 border-t border-neu-light/10">
          <div className="text-lg font-medium mb-1">{preview.resultDescription}</div>
          {preview.estimatedDuration && (
            <div className="flex items-center justify-center gap-1 text-sm text-gray-400">
              <Clock className="w-4 h-4" />
              ~{preview.estimatedDuration} min estimated
            </div>
          )}
        </div>
        
        {preview.warnings && preview.warnings.length > 0 && (
          <div className="space-y-2">
            {preview.warnings.map((warning, index) => (
              <div key={index} className="flex items-start gap-2 text-sm text-yellow-400 bg-yellow-500/10 p-2 rounded border border-yellow-500/20">
                <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>{warning}</span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// ================================================================================================
// WORKOUT FLOW PREVIEW
// ================================================================================================

interface WorkoutFlowPreviewProps {
  exercises: Exercise[]
  groupType?: EnhancedExerciseGroupType | null
  groupingMode: 'individual' | 'grouped'
}

function WorkoutFlowPreview({ exercises, groupType, groupingMode }: WorkoutFlowPreviewProps) {
  const getFlowDescription = () => {
    if (groupingMode === 'individual') {
      return {
        title: 'Individual Exercise Flow',
        description: 'Each exercise will be performed as a separate set with full rest between',
        flow: exercises.map(ex => `${ex.name} → Rest → Repeat`),
        icon: <User className="w-5 h-5" />
      }
    }

    switch (groupType) {
      case 'superset':
        return {
          title: 'Superset Flow',
          description: 'Perform exercises back-to-back with minimal rest',
          flow: exercises.length === 2 
            ? [`${exercises[0].name} → ${exercises[1].name} → Rest → Repeat`]
            : [`${exercises[0].name} → ${exercises[1].name} → ${exercises[2].name} → Rest → Repeat`],
          icon: <Target className="w-5 h-5" />
        }
      
      case 'circuit':
        return {
          title: 'Circuit Flow',
          description: 'Rotate through all exercises for multiple rounds',
          flow: [`Round 1: ${exercises.map(ex => ex.name).join(' → ')}`, 'Rest between rounds', 'Repeat for multiple rounds'],
          icon: <Users className="w-5 h-5" />
        }
      
      case 'complex':
        return {
          title: 'Complex Flow',
          description: 'Perform all exercises with the same equipment without rest',
          flow: [`${exercises.map(ex => ex.name).join(' → ')} → Rest → Repeat`],
          icon: <Target className="w-5 h-5" />
        }
      
      default:
        return {
          title: 'Grouped Exercises',
          description: 'Exercises will be performed together',
          flow: exercises.map(ex => ex.name),
          icon: <Users className="w-5 h-5" />
        }
    }
  }

  const flowInfo = getFlowDescription()

  return (
    <Card surface="convex" depth="subtle">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          {flowInfo.icon}
          {flowInfo.title}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="pt-0 space-y-3">
        <div className="text-sm text-gray-400">
          {flowInfo.description}
        </div>
        
        <div className="space-y-2">
          {flowInfo.flow.map((step, index) => (
            <div key={index} className="text-sm bg-neu-light/5 p-2 rounded border border-neu-light/10">
              {step}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

// ================================================================================================
// MAIN COMPONENT
// ================================================================================================

export default function GroupingPreview({
  selectedExercises,
  groupingMode,
  groupType
}: GroupingPreviewProps) {
  
  // ================================================================================================
  // GENERATE PREVIEW DATA
  // ================================================================================================

  const generatePreview = (): GroupingPreview => {
    const exerciseCount = selectedExercises.length
    
    if (groupingMode === 'individual') {
      return {
        groupingMode: 'individual',
        resultDescription: `${exerciseCount} Individual Exercise${exerciseCount !== 1 ? 's' : ''}`,
        groupCount: exerciseCount,
        exerciseCount,
        estimatedDuration: exerciseCount * 8, // ~8 minutes per individual exercise
        warnings: exerciseCount > 8 ? ['Consider breaking into multiple sessions for better focus'] : undefined
      }
    }

    // Grouped mode
    const estimatedDuration = estimateGroupDuration(groupType || 'superset', exerciseCount)
    const warnings: string[] = []
    
    // Add warnings based on group type and exercise count
    if (groupType === 'superset' && exerciseCount > 3) {
      warnings.push('Supersets work best with 2-3 exercises')
    }
    
    if (groupType === 'circuit' && exerciseCount < 3) {
      warnings.push('Circuits typically need 3+ exercises for effectiveness')
    }
    
    if (groupType === 'complex') {
      const uniqueEquipment = new Set(selectedExercises.map(ex => ex.equipment))
      if (uniqueEquipment.size > 1) {
        warnings.push('Complex works best when all exercises use the same equipment')
      }
    }

    const displayName = getGroupTypeDisplayName(groupType || 'superset')
    
    return {
      groupingMode: 'grouped',
      groupType: groupType || undefined,
      resultDescription: `1 ${displayName} with ${exerciseCount} exercises`,
      groupCount: 1,
      exerciseCount,
      estimatedDuration,
      warnings: warnings.length > 0 ? warnings : undefined
    }
  }

  const preview = generatePreview()

  // ================================================================================================
  // RENDER
  // ================================================================================================

  return (
    <div className="space-y-6">
      {/* Preview Summary */}
      <PreviewSummaryCard preview={preview} />
      
      {/* Exercise List */}
      <div>
        <h3 className="text-lg font-medium mb-4">
          {groupingMode === 'individual' ? 'Individual Exercises' : 'Exercise Order'}
        </h3>
        
        <div className="space-y-3">
          {selectedExercises.map((exercise, index) => (
            <ExercisePreviewItem
              key={exercise.id}
              exercise={exercise}
              index={index}
              isGrouped={groupingMode === 'grouped'}
            />
          ))}
        </div>
      </div>
      
      {/* Workout Flow */}
      <WorkoutFlowPreview
        exercises={selectedExercises}
        groupType={groupType}
        groupingMode={groupingMode}
      />
      
      {/* Tips and Recommendations */}
      <Card surface="flat" depth="subtle">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <Info className="w-4 h-4 text-primary" />
            <span className="font-medium">Tips for Success</span>
          </div>
          
          <div className="text-sm text-gray-400 space-y-2">
            {groupingMode === 'individual' && (
              <>
                <p>• Take 1-3 minutes rest between exercises</p>
                <p>• Focus on proper form for each movement</p>
                <p>• Track weights and reps independently</p>
              </>
            )}
            
            {groupType === 'superset' && (
              <>
                <p>• Minimize rest between exercises in the superset</p>
                <p>• Take 60-90 seconds rest between superset rounds</p>
                <p>• Choose exercises that don't interfere with each other</p>
              </>
            )}
            
            {groupType === 'circuit' && (
              <>
                <p>• Move quickly between exercises</p>
                <p>• Rest 1-2 minutes between complete circuits</p>
                <p>• Start with 3 rounds and build up</p>
              </>
            )}
            
            {groupType === 'complex' && (
              <>
                <p>• Don't put down the equipment between exercises</p>
                <p>• Use a weight that works for your weakest exercise</p>
                <p>• Focus on smooth transitions</p>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}