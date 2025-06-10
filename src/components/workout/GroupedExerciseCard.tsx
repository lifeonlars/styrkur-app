import { useState } from 'react'
import { Check, Plus, ChevronDown, ChevronUp, StickyNote } from 'lucide-react'
import { GroupSessionLog, GroupSetLog, ExerciseInSetLog } from '@/types'

interface GroupedExerciseCardProps {
  groupLog: GroupSessionLog
  onUpdateSet: (setIndex: number, updates: Partial<GroupSetLog>) => void
  onUpdateExerciseInSet: (setIndex: number, exerciseIndex: number, updates: Partial<ExerciseInSetLog>) => void
  onAddSet: () => void
  onRemoveSet: (setIndex: number) => void
  onUpdateGroupNotes: (notes: string) => void
}

export default function GroupedExerciseCard({
  groupLog,
  onUpdateSet,
  onUpdateExerciseInSet,
  onAddSet,
  onRemoveSet,
  onUpdateGroupNotes
}: GroupedExerciseCardProps) {
  const [isExpanded, setIsExpanded] = useState(true)
  const [showNotes, setShowNotes] = useState(false)
  const [notes, setNotes] = useState(groupLog.groupNotes || '')

  const handleNotesChange = (value: string) => {
    setNotes(value)
    onUpdateGroupNotes(value)
  }

  const handleSetComplete = (setIndex: number, isCompleted: boolean) => {
    // Update the set completion status
    onUpdateSet(setIndex, {
      isCompleted,
      completedAt: isCompleted ? new Date() : undefined
    })
    
    // When marking a set as complete, also mark all exercises in that set as complete
    // When marking as incomplete, mark all exercises as incomplete
    const setLog = groupLog.setLogs[setIndex]
    if (setLog) {
      setLog.exercises.forEach((_, exerciseIndex) => {
        onUpdateExerciseInSet(setIndex, exerciseIndex, {
          isCompleted
        })
      })
    }
  }

  const handleExerciseUpdate = (setIndex: number, exerciseIndex: number, field: keyof ExerciseInSetLog, value: any) => {
    onUpdateExerciseInSet(setIndex, exerciseIndex, { [field]: value })
    
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

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700">
      {/* Group Header */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="text-lg">{getGroupTypeDisplay()}</span>
            <div>
              <h3 className="text-white font-heading font-medium">
                {groupLog.label || `${groupLog.groupType.charAt(0).toUpperCase() + groupLog.groupType.slice(1)}`}
              </h3>
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

      {/* Sets/Rounds Content */}
      {isExpanded && (
        <div className="p-4 space-y-4">
          {groupLog.setLogs.map((setLog, setIndex) => (
            <div
              key={setIndex}
              className={`border rounded-lg p-4 transition ${
                setLog.isCompleted 
                  ? 'border-green-700/50 bg-green-900/10' 
                  : 'border-gray-600 bg-gray-700/30'
              }`}
            >
              {/* Set/Round Header */}
              <div className="flex justify-between items-center mb-3">
                <h4 className="text-white font-heading font-medium">
                  {setLabel} {setLog.setNumber}
                </h4>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleSetComplete(setIndex, !setLog.isCompleted)}
                    className={`px-3 py-1 rounded-lg text-sm font-medium transition flex items-center gap-1 ${
                      setLog.isCompleted
                        ? 'bg-green-600 text-white border border-green-500'
                        : 'bg-gray-600 text-gray-300 border border-gray-500 hover:bg-gray-500'
                    }`}
                  >
                    <Check className="w-3 h-3" />
                    {setLog.isCompleted ? 'Complete' : 'Mark Complete'}
                  </button>
                  
                  {groupLog.setLogs.length > 1 && (
                    <button
                      onClick={() => onRemoveSet(setIndex)}
                      className="px-2 py-1 bg-red-900/50 text-red-400 rounded-lg text-sm hover:bg-red-900 transition"
                      title={`Remove ${setLabel.toLowerCase()}`}
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>

              {/* Exercise Grid */}
              <div className="space-y-3">
                {/* Headers */}
                <div className="grid grid-cols-12 gap-2 text-sm font-medium text-gray-400 px-2">
                  <div className="col-span-3">Exercise</div>
                  <div className="col-span-2">Reps</div>
                  <div className="col-span-2">Weight</div>
                  <div className="col-span-2">RPE</div>
                  <div className="col-span-2">Done</div>
                  <div className="col-span-1">Notes</div>
                </div>

                {/* Exercise Rows */}
                {setLog.exercises.map((exercise, exerciseIndex) => (
                  <div
                    key={exerciseIndex}
                    className={`grid grid-cols-12 gap-2 items-center p-2 rounded transition ${
                      exercise.isCompleted 
                        ? 'bg-green-900/20 border border-green-700/30' 
                        : 'bg-gray-700/50'
                    }`}
                  >
                    {/* Exercise Name */}
                    <div className="col-span-3">
                      <span className="text-white text-sm font-medium truncate block">
                        {exercise.exerciseData.name}
                      </span>
                    </div>

                    {/* Reps */}
                    <div className="col-span-2">
                      <input
                        type="number"
                        min="0"
                        value={exercise.reps || ''}
                        onChange={(e) => handleExerciseUpdate(setIndex, exerciseIndex, 'reps', parseInt(e.target.value) || 0)}
                        className="w-full bg-gray-600 text-white px-2 py-1 rounded text-center text-sm focus:outline-none focus:ring-1 focus:ring-[#C3A869]"
                        placeholder="0"
                      />
                    </div>

                    {/* Weight */}
                    <div className="col-span-2">
                      <input
                        type="number"
                        min="0"
                        step="0.5"
                        value={exercise.weight || ''}
                        onChange={(e) => handleExerciseUpdate(setIndex, exerciseIndex, 'weight', parseFloat(e.target.value) || 0)}
                        className="w-full bg-gray-600 text-white px-2 py-1 rounded text-center text-sm focus:outline-none focus:ring-1 focus:ring-[#C3A869]"
                        placeholder="0"
                      />
                    </div>

                    {/* RPE */}
                    <div className="col-span-2">
                      <select
                        value={exercise.rpe || ''}
                        onChange={(e) => handleExerciseUpdate(setIndex, exerciseIndex, 'rpe', parseInt(e.target.value) || undefined)}
                        className="w-full bg-gray-600 text-white px-1 py-1 rounded text-center text-sm focus:outline-none focus:ring-1 focus:ring-[#C3A869]"
                      >
                        <option value="">-</option>
                        {Array.from({ length: 10 }, (_, i) => i + 1).map(rpe => (
                          <option key={rpe} value={rpe}>{rpe}</option>
                        ))}
                      </select>
                    </div>

                    {/* Exercise Complete */}
                    <div className="col-span-2 flex justify-center">
                      <button
                        onClick={() => handleExerciseUpdate(setIndex, exerciseIndex, 'isCompleted', !exercise.isCompleted)}
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center transition ${
                          exercise.isCompleted
                            ? 'bg-green-600 border-green-600 text-white'
                            : 'border-gray-500 hover:border-gray-400'
                        }`}
                      >
                        {exercise.isCompleted && <Check className="w-3 h-3" />}
                      </button>
                    </div>

                    {/* Notes */}
                    <div className="col-span-1 flex justify-center">
                      <button
                        className={`w-5 h-5 rounded flex items-center justify-center transition ${
                          exercise.notes?.trim()
                            ? 'bg-[#C3A869]/20 text-[#C3A869]'
                            : 'bg-gray-600 text-gray-400 hover:bg-gray-500'
                        }`}
                        title="Exercise notes"
                      >
                        <StickyNote className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Add Set/Round Button */}
          <button
            onClick={onAddSet}
            className="w-full mt-4 py-3 border-2 border-dashed border-gray-600 rounded-lg text-gray-400 hover:border-gray-500 hover:text-gray-300 transition flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add {setLabel}
          </button>
        </div>
      )}
    </div>
  )
}