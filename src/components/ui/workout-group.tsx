'use client'

import { useState } from 'react'
import { Check, Plus, StickyNote, Info, ChevronDown, ChevronUp, X } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/ui/select'
import { Input } from '@/ui/input'
import { Textarea } from '@/ui/textarea'
import { Button } from '@/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/ui/card'
import { GroupSessionLog, GroupSetLog, ExerciseInSetLog, ExerciseGroupType } from '@/types'
import ExerciseInfoModal from '@/components/workout/ExerciseInfoModal'
import { ExerciseGroupSingle, ExerciseGroupSuperset, ExerciseGroupCircuit } from '@/components/icons'
import { cn } from '@/lib/utils'

// RPE options for select components
const rpeOptions = [
  { value: "6", label: "6 - Light" },
  { value: "6.5", label: "6.5" },
  { value: "7", label: "7 - Moderate" },
  { value: "7.5", label: "7.5" },
  { value: "8", label: "8 - Hard" },
  { value: "8.5", label: "8.5" },
  { value: "9", label: "9 - Very Hard" },
  { value: "9.5", label: "9.5" },
  { value: "10", label: "10 - Max Effort" }
]

interface WorkoutGroupProps {
  groupLog: GroupSessionLog
  onUpdateSet: (setIndex: number, updates: Partial<GroupSetLog>) => void
  onUpdateExerciseInSet: (setIndex: number, exerciseIndex: number, updates: Partial<ExerciseInSetLog>) => void
  onAddSet: () => void
  onRemoveSet: (setIndex: number) => void
  onUpdateGroupNotes: (notes: string) => void
  onUpdateGroupRPE?: (rpe: number) => void
  className?: string
}

export default function WorkoutGroup({
  groupLog,
  onUpdateSet,
  onUpdateExerciseInSet,
  onAddSet,
  onRemoveSet,
  onUpdateGroupNotes,
  onUpdateGroupRPE,
  className
}: WorkoutGroupProps) {
  const [isExpanded, setIsExpanded] = useState(true)
  const [showNotes, setShowNotes] = useState(false)
  const [showExerciseDetail, setShowExerciseDetail] = useState(false)
  const [selectedExerciseIndex, setSelectedExerciseIndex] = useState(0)
  const [notes, setNotes] = useState(groupLog.groupNotes || '')

  const handleNotesChange = (value: string) => {
    setNotes(value)
    onUpdateGroupNotes(value)
  }

  const handleRPEChange = (value: string) => {
    if (onUpdateGroupRPE) {
      onUpdateGroupRPE(parseFloat(value))
    }
  }

  const toggleSetCompletion = (setIndex: number, exerciseIndex?: number) => {
    const set = groupLog.setLogs[setIndex]
    
    if (groupLog.groupType === 'single') {
      // For single exercises, toggle the completion of the entire set
      const exercise = set.exercises[0]
      const newCompleted = !exercise.isCompleted
      
      onUpdateExerciseInSet(setIndex, 0, { isCompleted: newCompleted })
      
      // Update set completion based on exercise completion
      onUpdateSet(setIndex, { 
        isCompleted: newCompleted,
        completedAt: newCompleted ? new Date() : undefined
      })
    } else if (exerciseIndex !== undefined) {
      // For supersets/circuits, toggle individual exercise completion
      const exercise = set.exercises[exerciseIndex]
      const newCompleted = !exercise.isCompleted
      
      onUpdateExerciseInSet(setIndex, exerciseIndex, { isCompleted: newCompleted })
      
      // Check if all exercises in the set are completed
      const updatedExercises = [...set.exercises]
      updatedExercises[exerciseIndex] = { ...exercise, isCompleted: newCompleted }
      const allCompleted = updatedExercises.every(ex => ex.isCompleted)
      
      onUpdateSet(setIndex, { 
        isCompleted: allCompleted,
        completedAt: allCompleted ? new Date() : undefined
      })
    }
  }

  const getVariantSpecificHeader = () => {
    const getIconComponent = () => {
      switch (groupLog.groupType) {
        case 'single':
          return ExerciseGroupSingle
        case 'superset':
          return ExerciseGroupSuperset
        case 'circuit':
          return ExerciseGroupCircuit
        default:
          return ExerciseGroupSingle
      }
    }
    
    const IconComponent = getIconComponent()
    const getGroupTypeLabel = () => {
      switch (groupLog.groupType) {
        case 'single':
          return 'Single Exercise'
        case 'superset':
          return 'Superset'
        case 'circuit':
          return 'Circuit'
        default:
          return 'Single Exercise'
      }
    }
    
    return (
      <div className="flex items-start gap-4">
        {/* Icon on the left */}
        <IconComponent className="w-12 h-12 text-norse-gold flex-shrink-0" />
        <div className="flex-1">
          <div className="mb-3">
            {/* First row: Group chip, exercise list, and expand button */}
            <div className="flex items-start justify-between mb-2">
              <div className="flex flex-col gap-2">
                <span className="px-2 py-1 text-xs font-medium bg-norse-gold text-black rounded-full w-fit">
                  {getGroupTypeLabel()}
                </span>
                {/* Compact exercise list aligned with chip */}
                {renderExerciseList()}
              </div>
              <div className="flex items-start gap-2">
                {/* Expand/collapse button - always visible, aligned to top */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="h-8 w-8 p-0"
                >
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </Button>
              </div>
            </div>
            
            {/* Second row: RPE selector on mobile, inline on desktop */}
            {groupLog.groupType !== 'circuit' && onUpdateGroupRPE && (
              <div className="flex items-center gap-2 md:hidden">
                <span className="text-sm text-gray-400">RPE:</span>
                <Select value={groupLog.groupRPE?.toString() || ""} onValueChange={(value) => onUpdateGroupRPE(parseFloat(value))}>
                  <SelectTrigger className="w-20 h-8">
                    <SelectValue placeholder="RPE" />
                  </SelectTrigger>
                  <SelectContent>
                    {rpeOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            
            {/* Desktop RPE - inline with expand button */}
            {groupLog.groupType !== 'circuit' && onUpdateGroupRPE && (
              <div className="hidden md:flex items-center justify-end gap-2 -mt-10">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-400">RPE:</span>
                  <Select value={groupLog.groupRPE?.toString() || ""} onValueChange={(value) => onUpdateGroupRPE(parseFloat(value))}>
                    <SelectTrigger className="w-20 h-8">
                      <SelectValue placeholder="RPE" />
                    </SelectTrigger>
                    <SelectContent>
                      {rpeOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  const renderExerciseList = () => {
    if (groupLog.groupType === 'single') {
      // For single exercises, show compact single line
      const exercise = groupLog.setLogs[0]?.exercises[0]?.exerciseData
      if (!exercise) return null
      
      return (
        <div 
          className="flex items-center gap-3 py-2 cursor-pointer hover:text-norse-gold transition-colors"
          onClick={() => {
            setSelectedExerciseIndex(0)
            setShowExerciseDetail(true)
          }}
        >
          <span className="text-sm text-white font-medium">{exercise.name}</span>
          <Info className="w-4 h-4 text-gray-400" />
        </div>
      )
    } else {
      // For supersets and circuits, show compact list
      const exercises = groupLog.setLogs[0]?.exercises || []
      
      return (
        <div className="space-y-1">
          {exercises.map((exercise, exerciseIndex) => (
            <div 
              key={exercise.exerciseId}
              className="flex items-center gap-3 py-1 cursor-pointer hover:text-norse-gold transition-colors"
              onClick={() => {
                setSelectedExerciseIndex(exerciseIndex)
                setShowExerciseDetail(true)
              }}
            >
              <span className="w-5 h-5 rounded-full bg-norse-gold text-black font-medium flex items-center justify-center text-xs flex-shrink-0">
                {String.fromCharCode(65 + exerciseIndex)}
              </span>
              <span className="text-sm text-white font-medium">{exercise.exerciseData.name}</span>
              <Info className="w-3 h-3 text-gray-400" />
            </div>
          ))}
        </div>
      )
    }
  }

  const renderSetLoggingTable = () => {
    const isCircuit = groupLog.groupType === 'circuit'
    const setLabel = isCircuit ? 'Round' : 'Set'
    
    return (
      <div className="space-y-3">
        {/* Set rows */}
        <div className="space-y-2">
          {groupLog.setLogs.map((set, setIndex) => (
            <div
              key={setIndex}
              className={cn(
                "p-3 rounded-lg border transition-all",
                set.isCompleted 
                  ? "border-green-700/20"
                  : "bg-neu-surface border-neu-light/10"
              )}
              style={{
                background: set.isCompleted 
                  ? 'var(--surface-success)'
                  : undefined
              }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-300">{setLabel} {set.setNumber}</span>
                  {groupLog.setLogs.length > 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onRemoveSet(setIndex)}
                      className="h-6 w-6 p-0 text-red-400 hover:text-red-300 hover:bg-red-900/20"
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  )}
                </div>
              </div>
              
              {/* Exercise rows */}
              <div className="space-y-3">
                {set.exercises.map((exercise, exerciseIndex) => (
                  <div key={exercise.exerciseId} className="flex items-center gap-3">
                    {groupLog.groupType !== 'single' && (
                      <span className="w-6 h-6 rounded-full bg-norse-gold text-black font-medium flex items-center justify-center text-xs flex-shrink-0">
                        {String.fromCharCode(65 + exerciseIndex)}
                      </span>
                    )}
                    
                    {/* Reps input */}
                    <div className="flex-1">
                      <Input
                        type="number"
                        placeholder="Reps"
                        value={exercise.reps || ''}
                        onChange={(e) => onUpdateExerciseInSet(setIndex, exerciseIndex, { reps: parseInt(e.target.value) || 0 })}
                        className="h-9 text-sm"
                      />
                    </div>
                    
                    {/* Weight input */}
                    <div className="flex-1">
                      <div className="relative">
                        <Input
                          type="number"
                          placeholder="Weight"
                          value={exercise.weight || ''}
                          onChange={(e) => onUpdateExerciseInSet(setIndex, exerciseIndex, { weight: parseFloat(e.target.value) || 0 })}
                          className="h-9 text-sm pr-8"
                        />
                        <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-400">kg</span>
                      </div>
                    </div>
                    
                    {/* Completion checkbox */}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleSetCompletion(setIndex, exerciseIndex)}
                      className={cn(
                        "h-9 w-9 p-0 rounded-lg transition-all border-2 flex-shrink-0",
                        exercise.isCompleted
                          ? "bg-green-600 hover:bg-green-700 text-white border-green-600"
                          : "border-neu-light/30 hover:border-green-500/50 bg-neu-surface"
                      )}
                    >
                      {exercise.isCompleted && <Check className="w-4 h-4" />}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        {/* Add set/round button */}
        <Button
          variant="dashed"
          onClick={onAddSet}
          className="w-full h-10"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add {setLabel}
        </Button>
      </div>
    )
  }


  const renderNotesSection = () => {
    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowNotes(!showNotes)}
            className="flex items-center gap-2 text-gray-400 hover:text-gray-300"
          >
            <StickyNote className="w-4 h-4" />
            Notes {notes && <span className="text-xs">•</span>}
          </Button>
        </div>
        
        {showNotes && (
          <Textarea
            placeholder="Add notes for this group..."
            value={notes}
            onChange={(e) => handleNotesChange(e.target.value)}
            className="min-h-[80px] resize-none"
          />
        )}
      </div>
    )
  }

  return (
    <>
      <Card depth="subtle" surface="convex" className={cn("w-full", className)}>
        <CardHeader className="pb-3">
          {getVariantSpecificHeader()}
        </CardHeader>
        
        {isExpanded && (
          <CardContent className="space-y-4">
            {renderSetLoggingTable()}
            {renderNotesSection()}
          </CardContent>
        )}
      </Card>
      
      {/* Exercise detail modal */}
      {showExerciseDetail && groupLog.setLogs[0]?.exercises[selectedExerciseIndex]?.exerciseData && (
        <ExerciseInfoModal
          exercise={groupLog.setLogs[0].exercises[selectedExerciseIndex].exerciseData}
          isOpen={showExerciseDetail}
          onClose={() => setShowExerciseDetail(false)}
        />
      )}
    </>
  )
}