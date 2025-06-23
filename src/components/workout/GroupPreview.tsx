'use client'

import React, { useMemo, useState } from 'react'
import { 
  ChevronDown, 
  ChevronUp, 
  Clock, 
  Hash, 
  Weight, 
  RotateCcw,
  Play,
  Zap,
  Target,
  User,
  Calendar
} from 'lucide-react'
import { Button } from '@/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/ui/card'
import { Exercise } from '@/types'
import { 
  EnhancedWorkoutEntry,
  GeneratedSet,
  EnhancedExerciseGroupType 
} from '@/types/exercise-groups'
import { 
  generateSetsFromRepScheme, 
  estimateWorkoutDuration,
  getGroupTypeDisplayName 
} from '@/utils/exercise-groups'

// ================================================================================================
// COMPONENT PROPS
// ================================================================================================

export interface GroupPreviewProps {
  group: Partial<EnhancedWorkoutEntry>
  exercises: Exercise[]
  expanded?: boolean
  onToggleExpanded?: () => void
  showDuration?: boolean
  compact?: boolean
}

// ================================================================================================
// SET PREVIEW COMPONENT
// ================================================================================================

interface SetPreviewProps {
  sets: GeneratedSet[]
  groupType: EnhancedExerciseGroupType
  exercises: Exercise[]
  compact?: boolean
}

function SetPreview({ sets, groupType, exercises, compact = false }: SetPreviewProps) {
  if (sets.length === 0) return null

  const isMultiExercise = groupType !== 'single'
  const displaySets = compact ? sets.slice(0, 5) : sets

  return (
    <div className="space-y-2">
      <div className="text-sm font-medium text-white mb-3">
        Generated Sets ({sets.length} total)
      </div>
      
      <div className="space-y-2">
        {displaySets.map((set, index) => (
          <div 
            key={index}
            className="bg-neu-light/10 border border-neu-light/10 rounded-lg p-3"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-white">
                {groupType === 'circuit' ? `Round ${set.setNumber}` : `Set ${set.setNumber}`}
              </span>
              {set.notes && (
                <span className="text-xs text-gray-400">{set.notes}</span>
              )}
            </div>
            
            {isMultiExercise ? (
              // Multiple exercises - show each exercise in the set
              <div className="space-y-1">
                {exercises.map((exercise, exerciseIndex) => (
                  <div key={exercise.id} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 bg-neu-light/20 rounded text-xs flex items-center justify-center">
                        {String.fromCharCode(65 + exerciseIndex)}
                      </span>
                      <span className="text-gray-300">{exercise.name}</span>
                    </div>
                    <div className="font-mono text-white">
                      {set.reps} reps
                      {set.weight && ` @ ${set.weight}kg`}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              // Single exercise
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-300">{exercises[0]?.name}</span>
                <div className="font-mono text-white">
                  {set.reps} reps
                  {set.weight && ` @ ${set.weight}kg`}
                </div>
              </div>
            )}
          </div>
        ))}
        
        {compact && sets.length > 5 && (
          <div className="text-center text-xs text-gray-400 py-2">
            ...and {sets.length - 5} more sets
          </div>
        )}
      </div>
    </div>
  )
}

// ================================================================================================
// SUMMARY STATS COMPONENT
// ================================================================================================

interface SummaryStatsProps {
  group: Partial<EnhancedWorkoutEntry>
  sets: GeneratedSet[]
  exercises: Exercise[]
}

function SummaryStats({ group, sets, exercises }: SummaryStatsProps) {
  const totalSets = sets.length
  const totalReps = sets.reduce((sum, set) => sum + set.reps, 0)
  const totalVolume = sets.reduce((sum, set) => sum + (set.reps * (set.weight || 0)), 0)
  const estimatedDuration = group.estimatedDuration || 
    (group as EnhancedWorkoutEntry).estimatedDuration ||
    estimateWorkoutDuration(group as EnhancedWorkoutEntry)

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="text-center">
        <div className="flex items-center justify-center gap-1 text-primary mb-1">
          <Hash className="w-4 h-4" />
        </div>
        <div className="text-lg font-bold text-white">{totalSets}</div>
        <div className="text-xs text-gray-400">Sets</div>
      </div>
      
      <div className="text-center">
        <div className="flex items-center justify-center gap-1 text-primary mb-1">
          <RotateCcw className="w-4 h-4" />
        </div>
        <div className="text-lg font-bold text-white">{totalReps}</div>
        <div className="text-xs text-gray-400">Total Reps</div>
      </div>
      
      <div className="text-center">
        <div className="flex items-center justify-center gap-1 text-primary mb-1">
          <Weight className="w-4 h-4" />
        </div>
        <div className="text-lg font-bold text-white">
          {totalVolume > 0 ? `${totalVolume.toFixed(0)}kg` : '-'}
        </div>
        <div className="text-xs text-gray-400">Volume</div>
      </div>
      
      <div className="text-center">
        <div className="flex items-center justify-center gap-1 text-primary mb-1">
          <Clock className="w-4 h-4" />
        </div>
        <div className="text-lg font-bold text-white">
          {estimatedDuration ? `${estimatedDuration}min` : '-'}
        </div>
        <div className="text-xs text-gray-400">Duration</div>
      </div>
    </div>
  )
}

// ================================================================================================
// EXECUTION FLOW COMPONENT
// ================================================================================================

interface ExecutionFlowProps {
  group: Partial<EnhancedWorkoutEntry>
  exercises: Exercise[]
  compact?: boolean
}

function ExecutionFlow({ group, exercises, compact = false }: ExecutionFlowProps) {
  const groupType = group.type || 'single'
  const executionStyle = group.executionStyle?.style || 'standard'

  const getFlowDescription = () => {
    switch (groupType) {
      case 'single':
        return {
          title: 'Single Exercise Flow',
          steps: [
            `Perform ${exercises[0]?.name || 'exercise'}`,
            'Rest between sets',
            'Repeat for all sets'
          ]
        }
      
      case 'superset':
        return {
          title: 'Superset Flow',
          steps: [
            exercises.map(ex => ex.name).join(' → '),
            'Minimal rest between exercises',
            'Rest 60-90s between rounds',
            'Repeat superset'
          ]
        }
      
      case 'circuit':
        return {
          title: 'Circuit Flow',
          steps: [
            `Round: ${exercises.map((ex, i) => `${String.fromCharCode(65 + i)}. ${ex.name}`).join(' → ')}`,
            'Rest 1-2 minutes between rounds',
            'Repeat circuit for prescribed rounds'
          ]
        }
      
      case 'complex':
        return {
          title: 'Complex Flow',
          steps: [
            'Pick up equipment',
            exercises.map(ex => ex.name).join(' → '),
            'Put down equipment',
            'Rest and repeat'
          ]
        }
      
      default:
        return {
          title: 'Exercise Flow',
          steps: ['Complete all exercises', 'Rest as needed']
        }
    }
  }

  const getExecutionStyleNotes = () => {
    switch (executionStyle) {
      case 'HIIT':
        const hiitConfig = group.executionStyle as any
        return `${hiitConfig?.workInterval || 45}s work, ${hiitConfig?.restInterval || 15}s rest`
      
      case 'EMOM':
        const emomConfig = group.executionStyle as any
        return `Every ${emomConfig?.intervalMinutes || 1} minute for ${emomConfig?.durationMinutes || 10} minutes`
      
      case 'AMRAP':
        const amrapConfig = group.executionStyle as any
        return `As many rounds as possible in ${amrapConfig?.durationMinutes || 12} minutes`
      
      default:
        return 'Standard timing with full rest between sets'
    }
  }

  const flowInfo = getFlowDescription()

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        {groupType === 'single' && <User className="w-4 h-4 text-primary" />}
        {groupType === 'superset' && <Zap className="w-4 h-4 text-primary" />}
        {groupType === 'circuit' && <RotateCcw className="w-4 h-4 text-primary" />}
        {groupType === 'complex' && <Target className="w-4 h-4 text-primary" />}
        <span className="text-sm font-medium text-white">{flowInfo.title}</span>
      </div>
      
      <div className="space-y-2">
        {flowInfo.steps.slice(0, compact ? 2 : flowInfo.steps.length).map((step, index) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <div className="w-5 h-5 bg-primary/20 rounded-full flex items-center justify-center text-xs font-medium text-primary">
              {index + 1}
            </div>
            <span className="text-gray-300">{step}</span>
          </div>
        ))}
        
        {compact && flowInfo.steps.length > 2 && (
          <div className="text-xs text-gray-400 ml-7">
            ...{flowInfo.steps.length - 2} more steps
          </div>
        )}
      </div>
      
      <div className="bg-neu-light/5 border border-neu-light/10 rounded p-2">
        <div className="text-xs text-gray-400 mb-1">Execution Style:</div>
        <div className="text-sm text-white">{getExecutionStyleNotes()}</div>
      </div>
    </div>
  )
}

// ================================================================================================
// MAIN COMPONENT
// ================================================================================================

export default function GroupPreview({
  group,
  exercises,
  expanded = false,
  onToggleExpanded,
  showDuration = true,
  compact = false
}: GroupPreviewProps) {
  
  const [localExpanded, setLocalExpanded] = useState(expanded)
  
  // ================================================================================================
  // DERIVED STATE
  // ================================================================================================

  const generatedSets = useMemo(() => {
    if (!group.repScheme) return []
    
    try {
      return generateSetsFromRepScheme(
        group.repScheme,
        undefined, // base weight - would come from exercise config
        undefined  // max weight - would come from exercise config
      )
    } catch (error) {
      console.warn('Failed to generate sets:', error)
      return []
    }
  }, [group.repScheme])

  const isExpanded = onToggleExpanded ? expanded : localExpanded
  const toggleExpanded = onToggleExpanded || (() => setLocalExpanded(!localExpanded))

  const groupTypeIcon = () => {
    switch (group.type) {
      case 'single': return <User className="w-4 h-4" />
      case 'superset': return <Zap className="w-4 h-4" />
      case 'circuit': return <RotateCcw className="w-4 h-4" />
      case 'complex': return <Target className="w-4 h-4" />
      default: return <Play className="w-4 h-4" />
    }
  }

  // ================================================================================================
  // RENDER
  // ================================================================================================

  if (!group.type || exercises.length === 0) {
    return (
      <div className="bg-gray-500/10 border border-gray-500/20 rounded-lg p-4 text-center">
        <Calendar className="w-8 h-8 text-gray-400 mx-auto mb-2" />
        <div className="text-sm text-gray-400">
          Configure your group to see the preview
        </div>
      </div>
    )
  }

  return (
    <Card surface="convex" depth="subtle" className="w-full">
      <CardHeader 
        className="cursor-pointer" 
        onClick={toggleExpanded}
      >
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-base">
            {groupTypeIcon()}
            {group.label || `${getGroupTypeDisplayName(group.type)} Preview`}
          </CardTitle>
          
          <div className="flex items-center gap-2">
            {showDuration && group.estimatedDuration && (
              <div className="text-xs text-gray-400 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {group.estimatedDuration}min
              </div>
            )}
            <Button
              variant="flat"
              size="icon"
              className="h-6 w-6 p-0"
            >
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      </CardHeader>

      {isExpanded && (
        <CardContent className="pt-0 space-y-4">
          {/* Summary Stats */}
          <SummaryStats 
            group={group}
            sets={generatedSets}
            exercises={exercises}
          />

          {/* Execution Flow */}
          {!compact && (
            <ExecutionFlow 
              group={group}
              exercises={exercises}
              compact={compact}
            />
          )}

          {/* Generated Sets */}
          {generatedSets.length > 0 && (
            <SetPreview 
              sets={generatedSets}
              groupType={group.type}
              exercises={exercises}
              compact={compact}
            />
          )}

          {/* Configuration Summary */}
          <div className="bg-neu-light/5 border border-neu-light/10 rounded-lg p-3">
            <div className="text-sm font-medium text-white mb-2">Configuration</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-gray-400">Group Type:</span>
                <span className="text-white ml-2">{getGroupTypeDisplayName(group.type)}</span>
              </div>
              <div>
                <span className="text-gray-400">Execution:</span>
                <span className="text-white ml-2">{group.executionStyle?.style || 'Standard'}</span>
              </div>
              <div>
                <span className="text-gray-400">Rep Scheme:</span>
                <span className="text-white ml-2">{group.repScheme?.type || 'Standard'}</span>
              </div>
              <div>
                <span className="text-gray-400">Exercises:</span>
                <span className="text-white ml-2">{exercises.length}</span>
              </div>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  )
}