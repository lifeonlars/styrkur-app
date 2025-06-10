import { useState } from 'react'
import { Check, Plus, Minus, StickyNote } from 'lucide-react'
import { Exercise, SetLog, ExerciseSessionLog } from '@/types'

interface LoggedExerciseCardProps {
  exercise: Exercise
  exerciseLog: ExerciseSessionLog
  onUpdateSetLog: (setIndex: number, updates: Partial<SetLog>) => void
  onAddSet: () => void
  onRemoveSet: (setIndex: number) => void
  onUpdateNotes: (notes: string) => void
}

export default function LoggedExerciseCard({
  exercise,
  exerciseLog,
  onUpdateSetLog,
  onAddSet,
  onRemoveSet,
  onUpdateNotes
}: LoggedExerciseCardProps) {
  const [showNotes, setShowNotes] = useState(false)
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

  const handleRpeChange = (setIndex: number, rpe: number) => {
    const currentSet = exerciseLog.setLogs[setIndex]
    if (!currentSet) return
    
    onUpdateSetLog(setIndex, { ...currentSet, rpe })
  }

  const completedSets = exerciseLog.setLogs.filter(set => set.isCompleted).length
  const totalSets = exerciseLog.setLogs.length

  return (
    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
      {/* Exercise Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-white font-heading font-medium text-lg mb-1">{exercise.name}</h3>
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <span>{completedSets}/{totalSets} sets completed</span>
            <span className="capitalize">{exercise.target || 'target muscle'}</span>
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
            title="Exercise notes"
          >
            <StickyNote className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Notes Section */}
      {showNotes && (
        <div className="mb-4">
          <textarea
            value={notes}
            onChange={(e) => handleNotesChange(e.target.value)}
            placeholder="Add notes about this exercise..."
            className="w-full bg-gray-700 text-white p-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#C3A869] resize-none"
            rows={2}
          />
        </div>
      )}

      {/* Sets Table */}
      <div className="space-y-2">
        <div className="grid grid-cols-12 gap-2 text-sm font-medium text-gray-400 px-2">
          <div className="col-span-1">Set</div>
          <div className="col-span-3">Reps</div>
          <div className="col-span-3">Weight</div>
          <div className="col-span-2">RPE</div>
          <div className="col-span-2">Complete</div>
          <div className="col-span-1"></div>
        </div>

        {exerciseLog.setLogs.map((setLog, index) => (
          <div
            key={index}
            className={`grid grid-cols-12 gap-2 items-center p-2 rounded-lg transition ${
              setLog.isCompleted 
                ? 'bg-green-900/20 border border-green-700/30' 
                : 'bg-gray-700'
            }`}
          >
            {/* Set Number */}
            <div className="col-span-1 text-center text-white font-medium">
              {setLog.setNumber}
            </div>

            {/* Reps Input */}
            <div className="col-span-3">
              <input
                type="number"
                min="0"
                value={setLog.reps || ''}
                onChange={(e) => handleRepsChange(index, parseInt(e.target.value) || 0)}
                className="w-full bg-gray-600 text-white px-2 py-1 rounded text-center focus:outline-none focus:ring-1 focus:ring-[#C3A869]"
                placeholder="0"
              />
            </div>

            {/* Weight Input */}
            <div className="col-span-3">
              <input
                type="number"
                min="0"
                step="0.5"
                value={setLog.weight || ''}
                onChange={(e) => handleWeightChange(index, parseFloat(e.target.value) || 0)}
                className="w-full bg-gray-600 text-white px-2 py-1 rounded text-center focus:outline-none focus:ring-1 focus:ring-[#C3A869]"
                placeholder="0"
              />
            </div>

            {/* RPE Select */}
            <div className="col-span-2">
              <select
                value={setLog.rpe || ''}
                onChange={(e) => handleRpeChange(index, parseInt(e.target.value) || 0)}
                className="w-full bg-gray-600 text-white px-1 py-1 rounded text-center focus:outline-none focus:ring-1 focus:ring-[#C3A869] text-sm"
              >
                <option value="">-</option>
                {Array.from({ length: 10 }, (_, i) => i + 1).map(rpe => (
                  <option key={rpe} value={rpe}>{rpe}</option>
                ))}
              </select>
            </div>

            {/* Complete Button */}
            <div className="col-span-2 flex justify-center">
              <button
                onClick={() => handleSetComplete(index, !setLog.isCompleted)}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition flex items-center gap-1 ${
                  setLog.isCompleted
                    ? 'bg-green-600 text-white border border-green-500'
                    : 'bg-gray-600 text-gray-300 border border-gray-500 hover:bg-gray-500 hover:border-gray-400'
                }`}
                title={setLog.isCompleted ? 'Mark as incomplete' : 'Mark as complete'}
              >
                <Check className="w-3 h-3" />
                {setLog.isCompleted ? 'Done' : 'Complete'}
              </button>
            </div>

            {/* Remove Set Button */}
            <div className="col-span-1 flex justify-center">
              {exerciseLog.setLogs.length > 1 && (
                <button
                  onClick={() => onRemoveSet(index)}
                  className="w-6 h-6 rounded-full bg-red-900/50 text-red-400 flex items-center justify-center hover:bg-red-900 transition"
                  title="Remove set"
                >
                  <Minus className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>
        ))}

        {/* Add Set Button */}
        <button
          onClick={onAddSet}
          className="w-full mt-2 py-2 border-2 border-dashed border-gray-600 rounded-lg text-gray-400 hover:border-gray-500 hover:text-gray-300 transition flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Set
        </button>
      </div>

      {/* Exercise Instructions/Tips */}
      {exercise.instructions && exercise.instructions.length > 0 && (
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
    </div>
  )
}