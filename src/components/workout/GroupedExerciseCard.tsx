import { useState } from 'react'
import { Check, Plus, ChevronDown, ChevronUp, StickyNote, Info, X } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/ui/select'
import { Input } from '@/ui/input'
import { Textarea } from '@/ui/textarea'
import { GroupSessionLog, GroupSetLog, ExerciseInSetLog } from '@/types'
import ExerciseInfoModal from '@/components/workout/ExerciseInfoModal'
import { getGroupTypeIconComponent } from '@/lib/groupTypeUtils'

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

interface GroupedExerciseCardProps {
  groupLog: GroupSessionLog
  onUpdateSet: (setIndex: number, updates: Partial<GroupSetLog>) => void
  onUpdateExerciseInSet: (setIndex: number, exerciseIndex: number, updates: Partial<ExerciseInSetLog>) => void
  onAddSet: () => void
  onRemoveSet: (setIndex: number) => void
  onUpdateGroupNotes: (notes: string) => void
  onUpdateGroupRPE?: (rpe: number) => void // For single and superset groups
}

export default function GroupedExerciseCard({
  groupLog,
  onUpdateSet,
  onUpdateExerciseInSet,
  onAddSet,
  onRemoveSet,
  onUpdateGroupNotes,
  onUpdateGroupRPE
}: GroupedExerciseCardProps) {
  const [isExpanded, setIsExpanded] = useState(true)
  const [showNotes, setShowNotes] = useState(false)
  const [showExerciseDetail, setShowExerciseDetail] = useState(false)
  const [selectedExerciseIndex, setSelectedExerciseIndex] = useState(0)
  const [notes, setNotes] = useState(groupLog.groupNotes || '')

  const handleNotesChange = (value: string) => {
    setNotes(value)
    onUpdateGroupNotes(value)
  }


  const handleExerciseUpdate = (setIndex: number, exerciseIndex: number, field: keyof ExerciseInSetLog, value: any) => {
    // Create a more defensive update that preserves existing data
    const currentExercise = groupLog.setLogs[setIndex]?.exercises[exerciseIndex]
    if (!currentExercise) return

    // Always preserve existing data when updating
    const updates = {
      ...currentExercise,
      [field]: value
    }
    
    onUpdateExerciseInSet(setIndex, exerciseIndex, updates)
    
    // If we're updating the completion status of an exercise, check if the whole set should be marked complete
    if (field === 'isCompleted') {
      const setLog = groupLog.setLogs[setIndex]
      if (setLog) {
        // Check if all exercises in this set are completed
        const allExercisesCompleted = setLog.exercises.every((exercise, idx) => {
          if (idx === exerciseIndex) {
            return value // Use the new value being set
          }
          return exercise.isCompleted
        })
        
        // Update the set completion status accordingly
        onUpdateSet(setIndex, {
          isCompleted: allExercisesCompleted,
          completedAt: allExercisesCompleted ? new Date() : undefined
        })
      }
    }
  }

  const completedSets = groupLog.setLogs.filter(set => set.isCompleted).length
  const totalSets = groupLog.setLogs.length
  const setLabel = groupLog.groupType === 'circuit' ? 'Round' : 'Set'

  const getGroupTypeDisplay = () => {
    return getGroupTypeIconComponent(groupLog.groupType, { className: 'w-9 h-9' })
  }

  // Get unique exercises from the first set (all sets should have the same exercises)
  const getUniqueExercises = () => {
    if (groupLog.setLogs.length === 0) return []
    return groupLog.setLogs[0].exercises.map(ex => ex.exerciseData)
  }

  const handleShowExerciseDetail = (exerciseIndex: number) => {
    setSelectedExerciseIndex(exerciseIndex)
    setShowExerciseDetail(true)
  }

  return (
    <div className="shadow-neu-card-raised bg-gradient-to-br from-content1 to-content2 rounded-lg border-none">
      {/* Group Header */}
      <div className="p-4 border-b border-divider">
        <div className="flex justify-between items-center">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 mt-1">{getGroupTypeDisplay()}</div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-xs px-2 py-1 rounded font-medium ${
                  groupLog.groupType === 'superset' ? 'bg-blue-500/20 text-blue-400' :
                  groupLog.groupType === 'circuit' ? 'bg-purple-500/20 text-purple-400' :
                  'bg-gray-500/20 text-gray-400'
                }`}>
                  {groupLog.groupType.charAt(0).toUpperCase() + groupLog.groupType.slice(1)}
                </span>
                {groupLog.label && (
                  <span className="text-white font-heading font-medium">{groupLog.label}</span>
                )}
              </div>
              
              {/* Exercise Legends */}
              <div className="space-y-1 mb-2">
                {getUniqueExercises().map((exercise, index) => {
                  const label = String.fromCharCode(65 + index) // A, B, C, etc.
                  return (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <span className="text-white font-medium">{label}:</span>
                      <span className="text-gray-300">{exercise.name}</span>
                      <button
                        onClick={() => handleShowExerciseDetail(index)}
                        className="p-1 rounded bg-content2 text-gray-400 hover:bg-gray-600 transition"
                        title="Exercise details & muscle map"
                      >
                        <Info className="w-3 h-3" />
                      </button>
                    </div>
                  )
                })}
              </div>
              
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <span>{completedSets}/{totalSets} {setLabel.toLowerCase()}s completed</span>
                <span>{groupLog.setLogs[0]?.exercises.length || 0} exercises</span>
              </div>
            </div>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => setShowNotes(!showNotes)}
              className={`p-2 rounded-lg transition-all duration-200 ${
                showNotes || notes.trim()
                  ? 'shadow-neu-pressed bg-gradient-to-br from-primary-200 to-primary-300 text-primary-800 scale-95'
                  : 'shadow-neu-raised bg-gradient-to-br from-content2 to-content1 text-gray-400 hover:shadow-neu-raised-hover hover:scale-105'
              }`}
              title="Group notes"
            >
              <StickyNote className="w-4 h-4" />
            </button>
            
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-2 shadow-neu-raised bg-gradient-to-br from-content2 to-content1 text-gray-400 rounded-lg hover:shadow-neu-raised-hover hover:scale-105 active:shadow-neu-pressed active:scale-95 transition-all duration-200"
              title={isExpanded ? 'Collapse' : 'Expand'}
            >
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Group Notes */}
        {showNotes && (
          <div className="mt-4">
            <Textarea
              value={notes}
              onChange={(e) => handleNotesChange(e.target.value)}
              placeholder={`Add notes about this ${groupLog.groupType}...`}
              className="min-h-[60px]"
            />
          </div>
        )}
      </div>

      {/* Group RPE (for single and superset groups) */}
      {isExpanded && groupLog.groupType !== 'circuit' && (
        <div className="p-4 pb-0">
          <div className="mb-4 bg-content2/30 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-300 font-medium">
                {groupLog.groupType === 'single' ? 'Exercise RPE (all sets):' : 'Superset RPE (all sets):'}
              </span>
              <div className="w-32">
                <Select 
                  value={(groupLog.groupRPE || 7).toString()} 
                  onValueChange={(value) => onUpdateGroupRPE?.(parseFloat(value))}
                >
                  <SelectTrigger className="h-8">
                    <SelectValue />
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
          </div>
        </div>
      )}

      {/* Exercise Table */}
      {isExpanded && (
        <div className="px-4 pb-4">
          <div className="space-y-6 overflow-x-auto">
            {/* Headers */}
            <div className="grid grid-cols-8 gap-1 md:gap-2 text-sm font-medium text-gray-400 px-2 min-w-[380px] md:min-w-0">
              <div className="col-span-1 text-center">Remove</div>
              <div className="col-span-1 text-center">Round</div>
              <div className="col-span-1 text-center">Ex</div>
              <div className="col-span-2 text-center">Reps</div>
              <div className="col-span-2 text-center">Weight (kgs)</div>
              <div className="col-span-1 text-center">Done</div>
            </div>

            {/* Round Groups */}
            {groupLog.setLogs.map((setLog, setIndex) => (
              <div key={setIndex} className="relative">
                {/* Round Container */}
                <div className="space-y-1">
                  {setLog.exercises.map((exercise, exerciseIndex) => (
                    <div
                      key={`${setIndex}-${exerciseIndex}`}
                      className={`grid grid-cols-8 gap-1 md:gap-2 items-center p-2 rounded-lg transition min-w-[380px] md:min-w-0 ${
                        exercise.isCompleted 
                          ? 'bg-green-900/20 border border-green-700/30' 
                          : 'bg-content2'
                      }`}
                    >
                      {/* Delete Round Button - only show for first exercise and if more than 1 round */}
                      <div className="col-span-1 flex justify-center">
                        {exerciseIndex === 0 && groupLog.setLogs.length > 1 && (
                          <button
                            onClick={() => onRemoveSet(setIndex)}
                            className="p-1 bg-red-900/50 text-red-400 rounded hover:bg-red-900 transition flex items-center justify-center"
                            title={`Remove round ${setIndex + 1}`}
                          >
                            <X className="w-3 h-3" />
                          </button>
                        )}
                      </div>

                      {/* Round Number - only show for first exercise */}
                      <div className="col-span-1 text-center">
                        {exerciseIndex === 0 && (
                          <div className="text-white font-bold text-lg">
                            {setLog.setNumber}
                          </div>
                        )}
                      </div>

                      {/* Exercise Letter (A, B, C) */}
                      <div className="col-span-1 text-center text-white font-medium">
                        {String.fromCharCode(65 + exerciseIndex)}
                      </div>

                      {/* Reps */}
                      <div className="col-span-2">
                        <Input
                          type="text"
                          inputMode="numeric"
                          value={exercise.reps?.toString() || ''}
                          onChange={(e) => handleExerciseUpdate(setIndex, exerciseIndex, 'reps', parseInt(e.target.value) || 0)}
                          placeholder="0"
                          className="h-8 text-center"
                        />
                      </div>

                      {/* Weight */}
                      <div className="col-span-2">
                        <Input
                          type="text"
                          inputMode="decimal"
                          value={exercise.weight?.toString() || ''}
                          onChange={(e) => handleExerciseUpdate(setIndex, exerciseIndex, 'weight', parseFloat(e.target.value) || 0)}
                          placeholder="0"
                          className="h-8 text-center"
                        />
                      </div>

                      {/* Exercise Complete */}
                      <div className="col-span-1 flex justify-center">
                        <button
                          onClick={() => handleExerciseUpdate(setIndex, exerciseIndex, 'isCompleted', !exercise.isCompleted)}
                          className={`p-1 rounded text-sm font-medium transition flex items-center justify-center ${
                            exercise.isCompleted
                              ? 'bg-green-600 text-white border border-green-500'
                              : 'bg-gray-600 text-gray-300 border border-gray-500 hover:bg-gray-500 hover:border-gray-400'
                          }`}
                          title={exercise.isCompleted ? 'Mark as incomplete' : 'Mark as complete'}
                        >
                          <Check className="w-3 h-3" />
                        </button>
                      </div>

                    </div>
                  ))}
                </div>
              </div>
            ))}

          </div>

          {/* Add Set/Round Button */}
          <button
            onClick={onAddSet}
            className="w-full mt-4 py-3 border-2 border-dashed border-gray-600 rounded-lg text-gray-400 hover:border-gray-500 hover:text-gray-300 transition flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden md:inline">Add {setLabel}</span>
          </button>

        </div>
      )}

      {/* Exercise Detail Modal */}
      {getUniqueExercises().length > 0 && (
        <ExerciseInfoModal
          isOpen={showExerciseDetail}
          onClose={() => setShowExerciseDetail(false)}
          exercise={getUniqueExercises()[selectedExerciseIndex]}
        />
      )}
    </div>
  )
}