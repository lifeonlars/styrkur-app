import React from 'react'
import { X } from 'lucide-react'
import { ExerciseMuscleMap, WorkoutMuscleMap } from '@/components/muscle-map'
import { Exercise, Workout } from '@/types'

interface MuscleMapModalProps {
  isOpen: boolean
  onClose: () => void
  exercise?: Exercise
  workout?: Workout
}

const MuscleMapModal: React.FC<MuscleMapModalProps> = ({
  isOpen,
  onClose,
  exercise,
  workout
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-700">
          <h2 className="text-white text-xl font-heading font-medium">
            {exercise ? 'Exercise Muscle Map' : 'Workout Muscle Map'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {exercise && (
            <ExerciseMuscleMap
              exercise={exercise}
              size="large"
              showBothSides={true}
              showLegend={true}
              showMuscleList={true}
              forceSingleView={true}
            />
          )}
          
          {workout && (
            <WorkoutMuscleMap
              workout={workout}
              size="large"
              showBothSides={true}
              showLegend={true}
              forceSingleView={true}
            />
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-700 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default MuscleMapModal