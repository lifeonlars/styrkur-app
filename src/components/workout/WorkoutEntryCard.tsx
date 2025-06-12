'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp, Edit, Trash2, Clock, Repeat } from 'lucide-react'
import { WorkoutEntry, Exercise } from '@/types'
import { categoryMapping } from '@/lib/wger'
import ExerciseInfoModal from '@/components/workout/ExerciseInfoModal'

interface WorkoutEntryCardProps {
  entry: WorkoutEntry
  exercises: Exercise[] // Available exercises for lookup
  onEdit: (entry: WorkoutEntry) => void
  onDelete: (entryId: string) => void
  onMoveUp?: () => void
  onMoveDown?: () => void
  canMoveUp?: boolean
  canMoveDown?: boolean
}

export default function WorkoutEntryCard({ 
  entry, 
  exercises, 
  onEdit, 
  onDelete, 
  onMoveUp,
  onMoveDown,
  canMoveUp,
  canMoveDown
}: WorkoutEntryCardProps) {
  const [isExpanded, setIsExpanded] = useState(true)
  const [showExerciseDetail, setShowExerciseDetail] = useState(false)
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null)

  const getExerciseData = (exerciseId: string): Exercise | undefined => {
    return exercises.find(ex => ex.id === exerciseId)
  }

  const formatExerciseInfo = (exercise: Exercise): string => {
    const equipment = exercise.equipment || 'Unknown'
    
    // Use WGER category if available, otherwise use muscle group
    let category = ''
    if (exercise.category && categoryMapping[exercise.category]) {
      category = categoryMapping[exercise.category]
      // Capitalize first letter
      category = category.charAt(0).toUpperCase() + category.slice(1)
    } else if (exercise.muscleGroup) {
      category = exercise.muscleGroup.charAt(0).toUpperCase() + exercise.muscleGroup.slice(1)
    } else {
      category = 'Unknown'
    }

    return `${equipment} | ${category}`
  }

  const handleShowExerciseDetail = (exerciseId: string) => {
    const exercise = getExerciseData(exerciseId)
    if (exercise) {
      setSelectedExercise(exercise)
      setShowExerciseDetail(true)
    }
  }


  const getTypeBadge = () => {
    const baseClass = "text-xs px-2 py-1 rounded font-medium"
    
    switch (entry.type) {
      case 'superset':
        return <span className={`${baseClass} bg-blue-500/20 text-blue-400`}>Superset</span>
      case 'circuit':
        return <span className={`${baseClass} bg-purple-500/20 text-purple-400`}>Circuit</span>
      default:
        return <span className={`${baseClass} bg-gray-500/20 text-gray-400`}>Single</span>
    }
  }

  const getHeaderLabel = () => {
    if (entry.label) return entry.label
    
    switch (entry.type) {
      case 'superset':
        return 'Superset'
      case 'circuit':
        return 'Circuit'
      default:
        return 'Exercise'
    }
  }

  const formatRestTime = (seconds?: number) => {
    if (!seconds) return ''
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    if (mins > 0) {
      return `${mins}:${secs.toString().padStart(2, '0')}`
    }
    return `${secs}s`
  }

  return (
    <div className="bg-gray-800 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-white font-medium">{getHeaderLabel()}</h3>
                {getTypeBadge()}
                {entry.timingStyle && (
                  <span className="text-xs bg-[#C3A869]/20 text-[#C3A869] px-2 py-1 rounded">
                    {entry.timingStyle}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-4 mt-1 text-xs text-gray-400">
                <span>{entry.sets} set{entry.sets !== 1 ? 's' : ''}</span>
                {entry.exercises.length > 1 && (
                  <span>{entry.exercises.length} exercises</span>
                )}
                {entry.rounds && entry.rounds > 1 && (
                  <span className="flex items-center gap-1">
                    <Repeat className="w-3 h-3" />
                    {entry.rounds} rounds
                  </span>
                )}
                {entry.restBetweenExercises && (
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {formatRestTime(entry.restBetweenExercises)} between
                  </span>
                )}
                {entry.restAfterGroup && (
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {formatRestTime(entry.restAfterGroup)} after
                  </span>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {(onMoveUp || onMoveDown) && (
              <>
                <button
                  onClick={onMoveUp}
                  disabled={!canMoveUp}
                  className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronUp className="w-4 h-4" />
                </button>
                <button
                  onClick={onMoveDown}
                  disabled={!canMoveDown}
                  className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
              </>
            )}
            <button
              onClick={() => onEdit(entry)}
              className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition"
            >
              <Edit className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(entry.id)}
              className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition"
            >
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Exercise List */}
      {isExpanded && (
        <div className="p-4 space-y-3">
          {entry.exercises.map((exerciseConfig, index) => {
            const exerciseData = getExerciseData(exerciseConfig.exerciseId)
            
            return (
              <div
                key={`${exerciseConfig.exerciseId}-${index}`}
                className="bg-gray-900 rounded-lg p-3 hover:bg-gray-700/50 transition"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="flex-1">
                      <button
                        onClick={() => handleShowExerciseDetail(exerciseConfig.exerciseId)}
                        className="text-white font-medium text-sm hover:text-[#C3A869] transition text-left block"
                        title="View exercise details & muscle map"
                      >
                        {exerciseData?.name || 'Unknown Exercise'}
                      </button>
                      <div className="text-xs text-gray-400">
                        {exerciseData ? formatExerciseInfo(exerciseData) : 'Unknown'}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className="text-right">
                      <div className="text-white text-sm font-medium">
                        {entry.sets} × {exerciseConfig.reps && exerciseConfig.reps > 0 ? exerciseConfig.reps : '-'}
                        {exerciseConfig.weight && exerciseConfig.weight > 0 && (
                          <span className="text-[#C3A869] ml-1">@ {exerciseConfig.weight}kg</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Exercise Detail Modal */}
      {selectedExercise && (
        <ExerciseInfoModal
          isOpen={showExerciseDetail}
          onClose={() => setShowExerciseDetail(false)}
          exercise={selectedExercise}
        />
      )}
    </div>
  )
}