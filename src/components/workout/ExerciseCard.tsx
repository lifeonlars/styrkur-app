import { Exercise } from '@/types'
import { Plus } from 'lucide-react'

interface ExerciseCardProps {
  exercise: Exercise
  onAdd: (exercise: Exercise) => void
  showAddButton?: boolean
}

export default function ExerciseCard({ exercise, onAdd, showAddButton = true }: ExerciseCardProps) {
  return (
    <button
      onClick={() => onAdd(exercise)}
      className="bg-gray-800 p-3 rounded-lg flex items-center hover:bg-gray-700 transition w-full text-left"
    >
      <span className="text-2xl mr-3">{exercise.icon}</span>
      <div className="flex-1">
        <div className="text-white text-sm font-medium">{exercise.name}</div>
        <div className="text-gray-400 text-xs">
          {exercise.target} • {exercise.equipment}
        </div>
      </div>
      <div className="flex items-center">
        {exercise.isWeighted && (
          <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded mr-2">
            Weighted
          </span>
        )}
        {showAddButton && <Plus className="w-5 h-5 text-[#C3A869]" />}
      </div>
    </button>
  )
}