import React from 'react'
import MuscleMap from './MuscleMap'
import { Exercise } from '@/types'

interface ExerciseMuscleMapProps {
  exercise: Exercise
  size?: 'small' | 'medium' | 'large'
  showBothSides?: boolean
  showLegend?: boolean
  showMuscleList?: boolean
  className?: string
}

const ExerciseMuscleMap: React.FC<ExerciseMuscleMapProps> = ({
  exercise,
  size = 'small',
  showBothSides = true,
  showLegend = true,
  showMuscleList = true,
  className = ''
}) => {
  return (
    <div className={`exercise-muscle-map ${className}`}>
      <div className="mb-3">
        <h3 className="text-white font-heading font-medium text-lg mb-1">{exercise.name}</h3>
        <p className="text-gray-400 text-sm">
          Primary: {exercise.target} • {exercise.equipment}
        </p>
      </div>
      
      <MuscleMap
        primaryMuscleIds={exercise.primaryMuscleIds}
        secondaryMuscleIds={exercise.secondaryMuscleIds}
        showFront={showBothSides}
        showBack={showBothSides}
        showLegend={showLegend}
        showMuscleList={showMuscleList}
        size={size}
        useEnhanced={true}
        exerciseName={exercise.name}
        className="mb-4"
      />
    </div>
  )
}

export default ExerciseMuscleMap