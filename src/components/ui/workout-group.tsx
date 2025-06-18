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
    
    switch (groupLog.groupType) {
      case 'single':
        const singleExercise = groupLog.setLogs[0]?.exercises[0]?.exerciseData
        return (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <IconComponent className="w-5 h-5 text-norse-gold" />
              <div>
                <h3 className="text-white font-medium">{singleExercise?.name || 'Single Exercise'}</h3>
                <p className="text-sm text-gray-400">
                  {singleExercise?.muscleGroup} • Set {groupLog.setLogs.filter(s => s.isCompleted).length + 1} of {groupLog.plannedSets}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {/* Exercise info button */}
              {singleExercise && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowExerciseDetail(true)}
                  className="h-8 w-8 p-0"
                >
                  <Info className="w-4 h-4" />
                </Button>
              )}
              {/* Expand/collapse button */}
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
        )
      
      case 'superset':
        return (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <IconComponent className="w-5 h-5 text-norse-gold" />
              <div>
                <h3 className="text-white font-medium">
                  Superset ({groupLog.setLogs[0]?.exercises.length || 0} exercises)
                </h3>
                <p className="text-sm text-gray-400">
                  Set {groupLog.setLogs.filter(s => s.isCompleted).length + 1} of {groupLog.plannedSets}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
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
        )
      
      case 'circuit':
        return (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <IconComponent className="w-5 h-5 text-norse-gold" />
              <div>
                <h3 className="text-white font-medium">
                  Circuit ({groupLog.setLogs[0]?.exercises.length || 0} exercises)
                </h3>
                <p className="text-sm text-gray-400">
                  Round {groupLog.setLogs.filter(s => s.isCompleted).length + 1} of {groupLog.plannedSets}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
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
        )
      
      default:
        return null
    }
  }

  const renderSetLoggingTable = () => {
    if (groupLog.groupType === 'single') {
      return renderSingleExerciseTable()
    } else {
      return renderGroupedExerciseTable()
    }
  }

  const renderSingleExerciseTable = () => {
    return (
      <div className="space-y-3">
        {/* Table header */}
        <div className="grid grid-cols-12 gap-2 px-3 py-2 text-sm font-medium text-gray-400 border-b border-neu-light/10">
          <div className="col-span-1">Set</div>
          <div className="col-span-3">Reps</div>
          <div className="col-span-3">Weight</div>
          <div className="col-span-4">Done</div>
          <div className="col-span-1"></div>
        </div>
        
        {/* Set rows */}
        <div className="space-y-2">
          {groupLog.setLogs.map((set, setIndex) => {
            const exercise = set.exercises[0]
            const isCompleted = exercise?.isCompleted || false
            
            return (
              <div
                key={setIndex}
                className={cn(
                  "grid grid-cols-12 gap-2 p-3 rounded-lg border transition-all",
                  isCompleted 
                    ? "surface-success border-green-700/30" 
                    : "bg-neu-surface border-neu-light/10"
                )}
              >
                {/* Set number */}
                <div className="col-span-1 flex items-center">
                  <span className="text-sm font-medium text-gray-300">{set.setNumber}</span>
                </div>
                
                {/* Reps input */}
                <div className="col-span-3">
                  <Input
                    type="number"
                    placeholder="Reps"
                    value={exercise?.reps || ''}
                    onChange={(e) => onUpdateExerciseInSet(setIndex, 0, { reps: parseInt(e.target.value) || 0 })}
                    className="h-8 text-sm"
                  />
                </div>
                
                {/* Weight input */}
                <div className="col-span-3">
                  <div className="relative">
                    <Input
                      type="number"
                      placeholder="Weight"
                      value={exercise?.weight || ''}
                      onChange={(e) => onUpdateExerciseInSet(setIndex, 0, { weight: parseFloat(e.target.value) || 0 })}
                      className="h-8 text-sm pr-8"
                    />
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-400">kg</span>
                  </div>
                </div>
                
                {/* Completion checkbox */}
                <div className="col-span-4 flex items-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleSetCompletion(setIndex)}
                    className={cn(
                      "h-8 w-8 p-0 rounded-lg transition-all",
                      isCompleted
                        ? "bg-green-600 hover:bg-green-700 text-white"
                        : "border border-neu-light/20 hover:border-green-500/50"
                    )}
                  >
                    {isCompleted && <Check className="w-4 h-4" />}
                  </Button>
                </div>
                
                {/* Remove set button */}
                <div className="col-span-1 flex items-center justify-end">
                  {groupLog.setLogs.length > 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onRemoveSet(setIndex)}
                      className="h-8 w-8 p-0 text-red-400 hover:text-red-300 hover:bg-red-900/20"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
        
        {/* Add set button */}
        <Button
          variant="outline"
          onClick={onAddSet}
          className="w-full h-10 border-dashed border-neu-light/30 hover:border-norse-gold/50 bg-transparent"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Set
        </Button>
      </div>
    )
  }

  const renderGroupedExerciseTable = () => {
    if (!groupLog.setLogs[0]?.exercises) return null
    
    const isCircuit = groupLog.groupType === 'circuit'
    const setLabel = isCircuit ? 'Round' : 'Set'
    
    return (
      <div className="space-y-4">
        {/* Exercise labels for superset/circuit */}
        <div className="flex gap-2 px-3">
          {groupLog.setLogs[0].exercises.map((exercise, exerciseIndex) => (
            <div
              key={exercise.exerciseId}
              className="flex items-center gap-2 text-sm"
            >
              <span className="w-6 h-6 rounded-full bg-norse-gold text-black font-medium flex items-center justify-center text-xs">
                {String.fromCharCode(65 + exerciseIndex)}
              </span>
              <span className="text-gray-300">{exercise.exerciseData.name}</span>
            </div>
          ))}
        </div>
        
        {/* Table header */}
        <div className="grid gap-2 px-3 py-2 text-sm font-medium text-gray-400 border-b border-neu-light/10"
             style={{ gridTemplateColumns: `1fr repeat(${groupLog.setLogs[0].exercises.length}, 1fr) 1fr` }}>
          <div>{setLabel}</div>
          {groupLog.setLogs[0].exercises.map((_, exerciseIndex) => (
            <div key={exerciseIndex} className="text-center">
              {String.fromCharCode(65 + exerciseIndex)}
            </div>
          ))}
          <div></div>
        </div>
        
        {/* Set rows */}
        <div className="space-y-2">
          {groupLog.setLogs.map((set, setIndex) => (
            <div
              key={setIndex}
              className={cn(
                "grid gap-2 p-3 rounded-lg border transition-all",
                set.isCompleted 
                  ? "surface-success border-green-700/30" 
                  : "bg-neu-surface border-neu-light/10"
              )}
              style={{ gridTemplateColumns: `1fr repeat(${set.exercises.length}, 1fr) 1fr` }}
            >
              {/* Set/Round number */}
              <div className="flex items-center">
                <span className="text-sm font-medium text-gray-300">{set.setNumber}</span>
              </div>
              
              {/* Exercise inputs */}
              {set.exercises.map((exercise, exerciseIndex) => (
                <div key={exercise.exerciseId} className="space-y-2">
                  <div className="grid grid-cols-3 gap-1">
                    <Input
                      type="number"
                      placeholder="Reps"
                      value={exercise.reps || ''}
                      onChange={(e) => onUpdateExerciseInSet(setIndex, exerciseIndex, { reps: parseInt(e.target.value) || 0 })}
                      className="h-8 text-xs"
                    />
                    <div className="relative">
                      <Input
                        type="number"
                        placeholder="kg"
                        value={exercise.weight || ''}
                        onChange={(e) => onUpdateExerciseInSet(setIndex, exerciseIndex, { weight: parseFloat(e.target.value) || 0 })}
                        className="h-8 text-xs pr-6"
                      />
                      <span className="absolute right-1 top-1/2 -translate-y-1/2 text-xs text-gray-500">kg</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleSetCompletion(setIndex, exerciseIndex)}
                      className={cn(
                        "h-8 w-8 p-0 rounded transition-all",
                        exercise.isCompleted
                          ? "bg-green-600 hover:bg-green-700 text-white"
                          : "border border-neu-light/20 hover:border-green-500/50"
                      )}
                    >
                      {exercise.isCompleted && <Check className="w-3 h-3" />}
                    </Button>
                  </div>
                </div>
              ))}
              
              {/* Remove set button */}
              <div className="flex items-center justify-end">
                {groupLog.setLogs.length > 1 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onRemoveSet(setIndex)}
                    className="h-8 w-8 p-0 text-red-400 hover:text-red-300 hover:bg-red-900/20"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
        
        {/* Add set/round button */}
        <Button
          variant="outline"
          onClick={onAddSet}
          className="w-full h-10 border-dashed border-neu-light/30 hover:border-norse-gold/50 bg-transparent"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add {setLabel}
        </Button>
      </div>
    )
  }

  const renderRPESelector = () => {
    // Only show RPE for single exercises and supersets, not circuits
    if (groupLog.groupType === 'circuit' || !onUpdateGroupRPE) return null
    
    return (
      <div className="flex items-center gap-3 p-3 bg-neu-card rounded-lg">
        <span className="text-sm font-medium text-gray-300">Group RPE:</span>
        <Select value={groupLog.groupRPE?.toString() || ""} onValueChange={handleRPEChange}>
          <SelectTrigger className="w-32 h-8">
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
            {renderRPESelector()}
            {renderNotesSection()}
          </CardContent>
        )}
      </Card>
      
      {/* Exercise detail modal */}
      {showExerciseDetail && groupLog.setLogs[0]?.exercises[0]?.exerciseData && (
        <ExerciseInfoModal
          exercise={groupLog.setLogs[0].exercises[0].exerciseData}
          isOpen={showExerciseDetail}
          onClose={() => setShowExerciseDetail(false)}
        />
      )}
    </>
  )
}