import { useState } from 'react'
import { Check, Plus, ChevronDown, ChevronUp, StickyNote, Info } from 'lucide-react'
import { Select, SelectItem } from '@heroui/select'
import { GroupSessionLog, GroupSetLog, ExerciseInSetLog } from '@/types'
import ExerciseInfoModal from '@/components/workout/ExerciseInfoModal'

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
    if (groupLog.groupType === 'superset') return '🔗'
    if (groupLog.groupType === 'circuit') return '🔄'
    return '💪'
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
    <div className="bg-gray-800 rounded-lg border border-gray-700">
      {/* Group Header */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="text-lg">{getGroupTypeDisplay()}</span>
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
                        className="p-1 rounded bg-gray-700 text-gray-400 hover:bg-gray-600 transition"
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
              className={`p-2 rounded-lg transition ${
                showNotes || notes.trim()
                  ? 'bg-[#C3A869]/20 text-[#C3A869]'
                  : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
              }`}
              title="Group notes"
            >
              <StickyNote className="w-4 h-4" />
            </button>
            
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-2 bg-gray-700 text-gray-400 rounded-lg hover:bg-gray-600 transition"
              title={isExpanded ? 'Collapse' : 'Expand'}
            >
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Group Notes */}
        {showNotes && (
          <div className="mt-4">
            <textarea
              value={notes}
              onChange={(e) => handleNotesChange(e.target.value)}
              placeholder={`Add notes about this ${groupLog.groupType}...`}
              className="w-full bg-gray-700 text-white p-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#C3A869] resize-none"
              rows={2}
            />
          </div>
        )}
      </div>

      {/* Group RPE (for single and superset groups) */}
      {isExpanded && groupLog.groupType !== 'circuit' && (
        <div className="p-4 pb-0">
          <div className="mb-4 bg-gray-700/30 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-300 font-medium">
                {groupLog.groupType === 'single' ? 'Exercise RPE (all sets):' : 'Superset RPE (all sets):'}
              </span>
              <div className="w-32">
                <Select
                  size="sm"
                  selectedKeys={[(groupLog.groupRPE || 7).toString()]}
                  onSelectionChange={(keys) => {
                    const value = Array.from(keys)[0] as string
                    onUpdateGroupRPE?.(parseFloat(value))
                  }}
                  variant="bordered"
                  classNames={{
                    trigger: "bg-content2 border-divider min-h-8",
                    value: "text-white text-sm"
                  }}
                >
                  {rpeOptions.map((option) => (
                    <SelectItem key={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </Select>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Exercise Table */}
      {isExpanded && (
        <div className="px-4 pb-4">
          <div className="space-y-2 overflow-x-auto">
            {/* Headers */}
            <div className="grid grid-cols-6 gap-1 md:gap-2 text-sm font-medium text-gray-400 px-2 min-w-[300px] md:min-w-0">
              <div className="col-span-1">Set</div>
              <div className="col-span-2">Reps</div>
              <div className="col-span-2">Weight (kgs)</div>
              <div className="col-span-1">Done</div>
            </div>

            {/* Exercise Rows - flattened from all sets */}
            {groupLog.setLogs.map((setLog, setIndex) => 
              setLog.exercises.map((exercise, exerciseIndex) => (
                <div
                  key={`${setIndex}-${exerciseIndex}`}
                  className={`grid grid-cols-6 gap-1 md:gap-2 items-center p-2 rounded-lg transition min-w-[300px] md:min-w-0 ${
                    exercise.isCompleted 
                      ? 'bg-green-900/20 border border-green-700/30' 
                      : 'bg-gray-700'
                  }`}
                >
                  {/* Set Label (e.g., 1A, 1B, 2A, 2B) */}
                  <div className="col-span-1 text-center text-white font-medium">
                    {setLog.setNumber}{String.fromCharCode(65 + exerciseIndex)}
                  </div>

                  {/* Reps */}
                  <div className="col-span-2">
                    <input
                      type="text"
                      inputMode="numeric"
                      value={exercise.reps || ''}
                      onChange={(e) => handleExerciseUpdate(setIndex, exerciseIndex, 'reps', parseInt(e.target.value) || 0)}
                      className="w-full bg-gray-600 text-white px-2 py-1 rounded text-center focus:outline-none focus:ring-1 focus:ring-[#C3A869]"
                      placeholder="0"
                    />
                  </div>

                  {/* Weight */}
                  <div className="col-span-2">
                    <input
                      type="text"
                      inputMode="decimal"
                      value={exercise.weight || ''}
                      onChange={(e) => handleExerciseUpdate(setIndex, exerciseIndex, 'weight', parseFloat(e.target.value) || 0)}
                      className="w-full bg-gray-600 text-white px-2 py-1 rounded text-center focus:outline-none focus:ring-1 focus:ring-[#C3A869]"
                      placeholder="0"
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
              ))
            )}

          </div>

          {/* Add Set/Round Button */}
          <button
            onClick={onAddSet}
            className="w-full mt-4 py-3 border-2 border-dashed border-gray-600 rounded-lg text-gray-400 hover:border-gray-500 hover:text-gray-300 transition flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden md:inline">Add {setLabel}</span>
          </button>

          {/* Remove Set Buttons */}
          {groupLog.setLogs.length > 1 && (
            <div className="mt-2 text-center">
              <div className="text-xs text-gray-400 mb-2">Remove sets:</div>
              <div className="flex justify-center gap-2">
                {groupLog.setLogs.map((_, setIndex) => (
                  <button
                    key={setIndex}
                    onClick={() => onRemoveSet(setIndex)}
                    className="px-2 py-1 bg-red-900/50 text-red-400 rounded text-xs hover:bg-red-900 transition"
                    title={`Remove set ${setIndex + 1}`}
                  >
                    Set {setIndex + 1}
                  </button>
                ))}
              </div>
            </div>
          )}
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