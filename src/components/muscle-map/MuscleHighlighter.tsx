import React, { useState } from 'react'
import { cn } from '@/lib/utils'
import styles from './MuscleHighlighter.module.css'

// Import the existing muscle map utilities
import { 
  convertMuscleIdsToBodyHighlighter, 
  aggregateWorkoutMuscleActivation, 
  getMusclesWorkedSummary 
} from '@/lib/muscleMapUtils'

// Import enhanced muscle map for better quality
import EnhancedMuscleMap from './EnhancedMuscleMap'

interface Exercise {
  primaryMuscleIds: number[]
  secondaryMuscleIds: number[]
  name?: string
}

interface MuscleActivation {
  muscle: string
  percentage: number
}

interface MuscleHighlighterProps {
  /** Single exercise mode */
  exercise?: {
    primaryMuscleIds: number[]
    secondaryMuscleIds: number[]
    name?: string
  }
  
  /** Workout mode - multiple exercises */
  exercises?: Exercise[]
  
  /** Display options */
  showLegend?: boolean
  showMuscleList?: boolean
  className?: string
  
  /** Size control */
  size?: 'small' | 'medium' | 'large'
  
  /** Force single view mode (useful for mobile or specific layouts) */
  forceSingleView?: boolean
  
  /** Use enhanced version with higher quality SVGs (default: true) */
  useEnhanced?: boolean
  
  /** Optional muscle activation data for enhanced legend */
  muscleActivation?: MuscleActivation[]
}

const MuscleHighlighter: React.FC<MuscleHighlighterProps> = ({
  exercise,
  exercises = [],
  showLegend = true,
  showMuscleList = false,
  className,
  size = 'medium',
  forceSingleView = false,
  useEnhanced = true,
  muscleActivation = []
}) => {
  const [selectedSide, setSelectedSide] = useState<'front' | 'back'>('front')

  // Determine mode based on props
  const isWorkoutMode = exercises.length > 0
  const isSingleExerciseMode = exercise && !isWorkoutMode

  // Extract muscle data for single exercise mode
  const primaryMuscleIds = isSingleExerciseMode ? exercise.primaryMuscleIds : []
  const secondaryMuscleIds = isSingleExerciseMode ? exercise.secondaryMuscleIds : []
  const exerciseName = isSingleExerciseMode ? exercise.name : undefined

  // Use enhanced version when available
  if (useEnhanced) {
    // Convert exercises to enhanced format
    const enhancedExercises = exercises.map(ex => ({
      primaryMuscles: ex.primaryMuscleIds,
      secondaryMuscles: ex.secondaryMuscleIds,
      name: ex.name
    }))

    return (
      <div className={cn(styles['muscle-highlighter'], className)}>
        <EnhancedMuscleMap
          primaryMuscleIds={primaryMuscleIds}
          secondaryMuscleIds={secondaryMuscleIds}
          exercises={enhancedExercises}
          isWorkoutMode={isWorkoutMode}
          exerciseName={exerciseName}
          showLegend={showLegend}
          forceSingleView={forceSingleView}
          muscleActivation={muscleActivation}
          className={styles['enhanced-wrapper']}
        />
        
        {/* Additional muscle list for single exercise mode */}
        {showMuscleList && isSingleExerciseMode && (
          <MuscleList 
            primaryMuscleIds={primaryMuscleIds}
            secondaryMuscleIds={secondaryMuscleIds}
          />
        )}
        
        {/* Workout summary for workout mode */}
        {showMuscleList && isWorkoutMode && (
          <WorkoutSummary exerciseCount={exercises.length} />
        )}
      </div>
    )
  }

  // Fallback to basic implementation (deprecated but kept for compatibility)
  return (
    <div className={cn(styles['muscle-highlighter'], className)}>
      <div className={styles['body-views']}>
        <div className="text-center text-muted-foreground text-sm">
          Basic muscle highlighter not implemented. Please use enhanced version.
        </div>
      </div>
    </div>
  )
}

// Helper component for muscle list
const MuscleList: React.FC<{
  primaryMuscleIds: number[]
  secondaryMuscleIds: number[]
}> = ({ primaryMuscleIds, secondaryMuscleIds }) => {
  const musclesSummary = getMusclesWorkedSummary(primaryMuscleIds, secondaryMuscleIds)

  return (
    <div className={styles['muscle-list']}>
      <h4 className={styles['muscle-list-title']}>Muscles Worked</h4>
      
      {musclesSummary.primary.length > 0 && (
        <div className={styles['muscle-group']}>
          <h5 className={styles['muscle-group-title']}>Primary:</h5>
          <div className={styles['muscle-tags']}>
            {musclesSummary.primary.map(muscle => (
              <span key={muscle} className={cn(styles['muscle-tag'], styles['muscle-tag-primary'])}>
                {muscle}
              </span>
            ))}
          </div>
        </div>
      )}

      {musclesSummary.secondary.length > 0 && (
        <div className={styles['muscle-group']}>
          <h5 className={styles['muscle-group-title']}>Secondary:</h5>
          <div className={styles['muscle-tags']}>
            {musclesSummary.secondary.map(muscle => (
              <span key={muscle} className={cn(styles['muscle-tag'], styles['muscle-tag-secondary'])}>
                {muscle}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// Helper component for workout summary
const WorkoutSummary: React.FC<{ exerciseCount: number }> = ({ exerciseCount }) => {
  return (
    <div className={styles['workout-summary']}>
      <h4 className={styles['workout-summary-title']}>
        Workout Overview ({exerciseCount} exercises)
      </h4>
      <p className={styles['workout-summary-text']}>
        Heat map shows combined muscle activation across all exercises in this workout.
      </p>
    </div>
  )
}

export default MuscleHighlighter

// Export type for external use
export type { MuscleHighlighterProps, Exercise, MuscleActivation }