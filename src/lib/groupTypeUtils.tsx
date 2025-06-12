import React from 'react'
import { ExerciseGroupSingle, ExerciseGroupSuperset, ExerciseGroupCircuit } from '@/components/icons'
import { ExerciseGroupType } from '@/types'

interface GroupTypeIconProps {
  className?: string
}

export function getGroupTypeIconComponent(type: ExerciseGroupType, props?: GroupTypeIconProps): React.ReactNode {
  const defaultClassName = "w-4 h-4"
  const className = props?.className || defaultClassName
  
  switch (type) {
    case 'single':
      return <ExerciseGroupSingle className={className} />
    case 'superset':
      return <ExerciseGroupSuperset className={className} />
    case 'circuit':
      return <ExerciseGroupCircuit className={className} />
    default:
      return <ExerciseGroupSingle className={className} />
  }
}

export function getWorkoutGroupTypeIcon(hasSuperset: boolean, hasCircuit: boolean, props?: GroupTypeIconProps): React.ReactNode {
  const defaultClassName = "w-4 h-4"
  const className = props?.className || defaultClassName
  
  if (hasSuperset && hasCircuit) {
    // For mixed workouts, show superset icon (could be enhanced to show both)
    return <ExerciseGroupSuperset className={className} />
  }
  if (hasSuperset) {
    return <ExerciseGroupSuperset className={className} />
  }
  if (hasCircuit) {
    return <ExerciseGroupCircuit className={className} />
  }
  return <ExerciseGroupSingle className={className} />
}

export function getGroupTypeLabel(type: ExerciseGroupType): string {
  switch (type) {
    case 'single':
      return 'Single Exercise'
    case 'superset':
      return 'Superset'
    case 'circuit':
      return 'Circuit'
    default:
      return 'Single Exercise'
  }
}