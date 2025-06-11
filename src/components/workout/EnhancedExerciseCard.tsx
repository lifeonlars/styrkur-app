import React, { useState } from 'react'
import { Exercise } from '@/types'
import { Plus, Eye } from 'lucide-react'
import MuscleMapModal from '@/components/muscle-map/MuscleMapModal'

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
  const [showMuscleMap, setShowMuscleMap] = useState(false)

  const handleMuscleMapClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setShowMuscleMap(true)
  }

  const handleAddClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    onAdd(exercise)
  }

  return (
    <>
      <div className="bg-gray-800 p-4 rounded-lg flex items-center hover:bg-gray-700 transition w-full">
        <div className="flex-1 min-w-0">
          <div className="text-white text-sm font-medium truncate">{exercise.name}</div>
          <div className="text-gray-400 text-sm">
            {exercise.equipment}
            {exercise.primaryMuscles && exercise.primaryMuscles.length > 0 && (
              <span className="text-[#C3A869] ml-2">
                • {exercise.primaryMuscles.slice(0, 2).join(', ')}
                {exercise.primaryMuscles.length > 2 && ` +${exercise.primaryMuscles.length - 2}`}
              </span>
            )}
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
              onClick={handleMuscleMapClick}
              className="p-2 bg-gray-700 text-gray-400 rounded hover:bg-gray-600 hover:text-[#C3A869] transition"
              title="View muscle map"
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

      {/* Muscle Map Modal */}
      <MuscleMapModal
        isOpen={showMuscleMap}
        onClose={() => setShowMuscleMap(false)}
        exercise={exercise}
      />
    </>
  )
}