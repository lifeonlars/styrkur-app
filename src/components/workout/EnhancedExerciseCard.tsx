import React, { useState } from 'react'
import { Exercise } from '@/types'
import { Plus, Eye } from 'lucide-react'
import { categoryMapping } from '@/lib/wger'
import ExerciseInfoModal from '@/components/workout/ExerciseInfoModal'

interface EnhancedExerciseCardProps {
  exercise: Exercise
  onAdd: (exercise: Exercise) => void
  showAddButton?: boolean
  showMuscleMapButton?: boolean
}

export default function EnhancedExerciseCard({ 
  exercise, 
  onAdd, 
  showAddButton = true,
  showMuscleMapButton = true 
}: EnhancedExerciseCardProps) {
  const [showExerciseInfo, setShowExerciseInfo] = useState(false)

  const handleInfoClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setShowExerciseInfo(true)
  }

  const handleAddClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    onAdd(exercise)
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

  return (
    <>
      <div className="bg-gray-800 p-4 rounded-lg flex items-center hover:bg-gray-700 transition w-full">
        <div className="flex-1 min-w-0">
          <div className="text-white text-sm font-medium truncate">{exercise.name}</div>
          <div className="text-gray-400 text-sm">
            {formatExerciseInfo(exercise)}
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {exercise.isWeighted && (
            <span className="text-sm bg-gray-700 text-gray-300 px-2 py-1 rounded">
              Weighted
            </span>
          )}
          
          {showMuscleMapButton && (
            <button
              onClick={handleInfoClick}
              className="p-2 bg-gray-700 text-gray-400 rounded hover:bg-gray-600 hover:text-[#C3A869] transition"
              title="View exercise info"
            >
              <Eye className="w-4 h-4" />
            </button>
          )}
          
          {showAddButton && (
            <button
              onClick={handleAddClick}
              className="p-2 bg-[#C3A869] text-black rounded hover:bg-[#C3A869]/80 transition"
              title="Add exercise"
            >
              <Plus className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Exercise Info Modal */}
      <ExerciseInfoModal
        isOpen={showExerciseInfo}
        onClose={() => setShowExerciseInfo(false)}
        exercise={exercise}
      />
    </>
  )
}