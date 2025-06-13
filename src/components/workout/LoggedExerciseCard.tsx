import { useState } from 'react'
import { Check, Plus, StickyNote, Info, ChevronDown, ChevronUp, X } from 'lucide-react'
import { Select, SelectItem } from '@/ui/select-neu'
import { Input } from '@/ui/input-neu'
import { Textarea } from '@/ui/textarea-neu'
import { Exercise, SetLog, ExerciseSessionLog } from '@/types'
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

interface LoggedExerciseCardProps {
  exercise: Exercise
  exerciseLog: ExerciseSessionLog
  onUpdateSetLog: (setIndex: number, updates: Partial<SetLog>) => void
  onAddSet: () => void
  onRemoveSet: (setIndex: number) => void
  onUpdateNotes: (notes: string) => void
  onUpdateGroupRPE?: (rpe: number) => void
}

export default function LoggedExerciseCard({
  exercise,
  exerciseLog,
  onUpdateSetLog,
  onAddSet,
  onRemoveSet,
  onUpdateNotes,
  onUpdateGroupRPE
}: LoggedExerciseCardProps) {
  const [isExpanded, setIsExpanded] = useState(true)
  const [showNotes, setShowNotes] = useState(false)
  const [showExerciseDetail, setShowExerciseDetail] = useState(false)
  const [notes, setNotes] = useState(exerciseLog.exerciseNotes || '')

  const handleNotesChange = (value: string) => {
    setNotes(value)
    onUpdateNotes(value)
  }

  const handleSetComplete = (setIndex: number, isCompleted: boolean) => {
    // Get current set data to preserve existing values
    const currentSet = exerciseLog.setLogs[setIndex]
    if (!currentSet) return

    // Preserve all existing data when updating completion status
    onUpdateSetLog(setIndex, {
      ...currentSet,
      isCompleted,
      completedAt: isCompleted ? new Date() : undefined
    })
  }

  const handleRepsChange = (setIndex: number, reps: number) => {
    const currentSet = exerciseLog.setLogs[setIndex]
    if (!currentSet) return
    
    onUpdateSetLog(setIndex, { ...currentSet, reps })
  }

  const handleWeightChange = (setIndex: number, weight: number) => {
    const currentSet = exerciseLog.setLogs[setIndex]
    if (!currentSet) return
    
    onUpdateSetLog(setIndex, { ...currentSet, weight })
  }


  const completedSets = exerciseLog.setLogs.filter(set => set.isCompleted).length
  const totalSets = exerciseLog.setLogs.length

  return (
    <div className="shadow-neu-card-raised bg-gradient-to-br from-content1 to-content2 rounded-lg p-4 border-none">
      {/* Exercise Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-start gap-3 flex-1">
          {/* Group Type Icon */}
          <div className="flex-shrink-0 mt-1">
            {getGroupTypeIconComponent('single', { className: 'w-9 h-9' })}
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs px-2 py-1 rounded font-medium bg-gray-500/20 text-gray-400">
                Single
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm mb-2">
              <span className="text-gray-300">{exercise.name}</span>
              <button
                onClick={() => setShowExerciseDetail(true)}
                className="p-1 rounded bg-content2 text-gray-400 hover:bg-gray-600 transition"
                title="Exercise details & muscle map"
              >
                <Info className="w-3 h-3" />
              </button>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span>{completedSets}/{totalSets} sets completed</span>
              <span className="capitalize">{exercise.target || 'target muscle'}</span>
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
            title="Exercise notes"
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

      {/* Notes Section */}
      {showNotes && isExpanded && (
        <div className="mb-4">
          <Textarea
            value={notes}
            onChange={(e) => handleNotesChange(e.target.value)}
            placeholder="Add notes about this exercise..."
            variant="bordered"
            minRows={2}
            maxRows={3}
            classNames={{
              input: "text-white",
              inputWrapper: "!bg-content2 !border-divider hover:!border-primary/50 focus-within:!border-primary focus-within:!bg-content2"
            }}
          />
        </div>
      )}

      {/* Group RPE */}
      {isExpanded && (
        <div className="mb-4 shadow-neu-inset bg-gradient-to-br from-content2 to-content1 rounded-lg p-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-300 font-medium">Exercise RPE (all sets):</span>
          <div className="w-32">
            <Select
              size="sm"
              selectedKeys={[(exerciseLog.groupRPE || 7).toString()]}
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
      )}

      {/* Sets Table */}
      {isExpanded && (
      <div className="space-y-2 overflow-x-auto">
        <div className="grid grid-cols-7 gap-1 md:gap-2 text-sm font-medium text-gray-400 px-2 min-w-[350px] md:min-w-0">
          <div className="col-span-1 text-center">Remove</div>
          <div className="col-span-1 text-center">Set</div>
          <div className="col-span-2 text-center">Reps</div>
          <div className="col-span-2 text-center">Weight (kgs)</div>
          <div className="col-span-1 text-center">Done</div>
        </div>

        {exerciseLog.setLogs.map((setLog, index) => (
          <div
            key={index}
            className={`grid grid-cols-7 gap-1 md:gap-2 items-center p-2 rounded-lg transition-all duration-200 min-w-[350px] md:min-w-0 ${
              setLog.isCompleted 
                ? 'shadow-neu-inset bg-gradient-to-br from-green-900/30 to-green-800/20' 
                : 'shadow-neu-subtle bg-gradient-to-br from-content2 to-content1 hover:shadow-neu-raised'
            }`}
          >
            {/* Remove Set Button */}
            <div className="col-span-1 flex justify-center">
              {exerciseLog.setLogs.length > 1 && (
                <button
                  onClick={() => onRemoveSet(index)}
                  className="p-1 shadow-neu-raised bg-gradient-to-br from-red-900/50 to-red-800/30 text-red-400 rounded hover:shadow-neu-raised-hover hover:scale-105 active:shadow-neu-pressed active:scale-95 transition-all duration-200 flex items-center justify-center"
                  title={`Remove set ${index + 1}`}
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Set Number */}
            <div className="col-span-1 text-center text-white font-medium">
              {setLog.setNumber}
            </div>

            {/* Reps Input */}
            <div className="col-span-2">
              <Input
                type="text"
                inputMode="numeric"
                value={setLog.reps?.toString() || ''}
                onChange={(e) => handleRepsChange(index, parseInt(e.target.value) || 0)}
                placeholder="0"
                variant="bordered"
                size="sm"
                classNames={{
                  input: "text-white text-center",
                  inputWrapper: "!bg-content2 !border-divider hover:!border-primary/50 focus-within:!border-primary focus-within:!bg-content2 min-h-8"
                }}
              />
            </div>

            {/* Weight Input */}
            <div className="col-span-2">
              <Input
                type="text"
                inputMode="decimal"
                value={setLog.weight?.toString() || ''}
                onChange={(e) => handleWeightChange(index, parseFloat(e.target.value) || 0)}
                placeholder="0"
                variant="bordered"
                size="sm"
                classNames={{
                  input: "text-white text-center",
                  inputWrapper: "!bg-content2 !border-divider hover:!border-primary/50 focus-within:!border-primary focus-within:!bg-content2 min-h-8"
                }}
              />
            </div>

            {/* Complete Button */}
            <div className="col-span-1 flex justify-center">
              <button
                onClick={() => handleSetComplete(index, !setLog.isCompleted)}
                className={`p-1 rounded text-sm font-medium transition-all duration-200 flex items-center justify-center ${
                  setLog.isCompleted
                    ? 'shadow-neu-pressed bg-gradient-to-br from-green-600 to-green-700 text-white scale-95'
                    : 'shadow-neu-raised bg-gradient-to-br from-content3 to-content2 text-gray-300 hover:shadow-neu-raised-hover hover:scale-105 active:shadow-neu-pressed active:scale-95'
                }`}
                title={setLog.isCompleted ? 'Mark as incomplete' : 'Mark as complete'}
              >
                <Check className="w-3 h-3" />
              </button>
            </div>


          </div>
        ))}

        {/* Add Set Button */}
        <button
          onClick={onAddSet}
          className="w-full mt-2 py-2 shadow-neu-raised bg-gradient-to-br from-content2 to-content1 border-2 border-dashed border-gray-600/50 rounded-lg text-gray-400 hover:shadow-neu-raised-hover hover:text-gray-300 hover:scale-[1.01] active:shadow-neu-pressed active:scale-[0.99] transition-all duration-200 flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden md:inline">Add Set</span>
        </button>

      </div>

      )}

      {/* Exercise Instructions/Tips */}
      {isExpanded && exercise.instructions && exercise.instructions.length > 0 && (
        <details className="mt-4">
          <summary className="text-sm text-gray-400 cursor-pointer hover:text-gray-300">
            View exercise instructions
          </summary>
          <div className="mt-2 text-sm text-gray-500 space-y-1">
            {exercise.instructions.slice(0, 3).map((instruction, index) => (
              <p key={index}>• {instruction}</p>
            ))}
          </div>
        </details>
      )}

      {/* Exercise Detail Modal */}
      <ExerciseInfoModal
        isOpen={showExerciseDetail}
        onClose={() => setShowExerciseDetail(false)}
        exercise={exercise}
      />
    </div>
  )
}