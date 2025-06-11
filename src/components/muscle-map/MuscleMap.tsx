import React from 'react'
import BodyHighlighter, { IExerciseData, Muscle } from 'react-body-highlighter'
import { 
  convertMuscleIdsToBodyHighlighter, 
  aggregateWorkoutMuscleActivation, 
  getMusclesWorkedSummary,
  muscleDisplayNames,
  type BodyHighlighterMuscle,
  type MuscleActivation 
} from '@/lib/muscleMapUtils'
import EnhancedMuscleMap from './EnhancedMuscleMap'

interface MuscleMapProps {
  /** Single exercise mode */
  primaryMuscleIds?: number[]
  secondaryMuscleIds?: number[]
  /** Workout mode - multiple exercises */
  exercises?: Array<{
    primaryMuscleIds: number[]
    secondaryMuscleIds: number[]
  }>
  /** Display options */
  showFront?: boolean
  showBack?: boolean
  showLegend?: boolean
  showMuscleList?: boolean
  className?: string
  /** Size control */
  size?: 'small' | 'medium' | 'large'
  /** Use enhanced version with higher quality SVGs */
  useEnhanced?: boolean
  /** Exercise name for display */
  exerciseName?: string
}

const MuscleMap: React.FC<MuscleMapProps> = ({
  primaryMuscleIds = [],
  secondaryMuscleIds = [],
  exercises = [],
  showFront = true,
  showBack = true,
  showLegend = true,
  showMuscleList = false,
  className = '',
  size = 'medium',
  useEnhanced = true,
  exerciseName
}) => {
  // Determine if we're in workout mode or single exercise mode
  const isWorkoutMode = exercises.length > 0

  // Use enhanced version if requested
  if (useEnhanced) {
    // Convert old exercise format to new format for compatibility
    const enhancedExercises = exercises.map(ex => ({
      primaryMuscles: ex.primaryMuscleIds,
      secondaryMuscles: ex.secondaryMuscleIds,
      name: exerciseName
    }))

    return (
      <EnhancedMuscleMap
        primaryMuscleIds={primaryMuscleIds}
        secondaryMuscleIds={secondaryMuscleIds}
        exercises={enhancedExercises}
        isWorkoutMode={isWorkoutMode}
        exerciseName={exerciseName}
        showLegend={showLegend}
        className={className}
      />
    )
  }
  
  // Get muscle activation data
  const { exerciseData, colorMap } = isWorkoutMode 
    ? aggregateWorkoutMuscleActivation(exercises)
    : convertMuscleIdsToBodyHighlighter(primaryMuscleIds, secondaryMuscleIds, 'Exercise')

  // Create the data format for react-body-highlighter
  const bodyHighlighterData = exerciseData

  // Get muscles worked summary for display
  const musclesSummary = isWorkoutMode
    ? { primary: [], secondary: [] } // Could aggregate this if needed
    : getMusclesWorkedSummary(primaryMuscleIds, secondaryMuscleIds)

  // Size configurations
  const sizeConfig = {
    small: { width: 150, height: 200 },
    medium: { width: 200, height: 280 },
    large: { width: 300, height: 420 }
  }

  const { width, height } = sizeConfig[size]

  return (
    <div className={`muscle-map ${className}`}>
      {/* Body visualizations */}
      <div className="flex justify-center gap-4 mb-4">
        {showFront && (
          <div className="text-center">
            <h4 className="text-white font-heading font-medium mb-2 text-sm">Front</h4>
            <div className="bg-gray-800 rounded-lg p-4">
              <BodyHighlighter
                data={bodyHighlighterData}
                type="anterior"
                highlightedColors={Object.values(colorMap)}
                style={{ width, height }}
              />
            </div>
          </div>
        )}
        
        {showBack && (
          <div className="text-center">
            <h4 className="text-white font-heading font-medium mb-2 text-sm">Back</h4>
            <div className="bg-gray-800 rounded-lg p-4">
              <BodyHighlighter
                data={bodyHighlighterData}
                type="posterior"
                highlightedColors={Object.values(colorMap)}
                style={{ width, height }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Legend */}
      {showLegend && (
        <div className="bg-gray-800 rounded-lg p-4 mb-4">
          <h4 className="text-white font-heading font-medium mb-3 text-sm">Intensity Legend</h4>
          <div className="flex gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: '#DC2626' }}></div>
              <span className="text-gray-300">Primary</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: '#F97316' }}></div>
              <span className="text-gray-300">Secondary</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: '#FCD34D' }}></div>
              <span className="text-gray-300">Light</span>
            </div>
          </div>
        </div>
      )}

      {/* Muscles worked list */}
      {showMuscleList && !isWorkoutMode && (
        <div className="bg-gray-800 rounded-lg p-4">
          <h4 className="text-white font-heading font-medium mb-3 text-sm">Muscles Worked</h4>
          
          {musclesSummary.primary.length > 0 && (
            <div className="mb-3">
              <h5 className="text-[#C3A869] font-medium text-sm mb-1">Primary:</h5>
              <div className="flex flex-wrap gap-1">
                {musclesSummary.primary.map(muscle => (
                  <span key={muscle} className="px-2 py-1 bg-red-900/30 text-red-300 rounded text-sm">
                    {muscle}
                  </span>
                ))}
              </div>
            </div>
          )}

          {musclesSummary.secondary.length > 0 && (
            <div>
              <h5 className="text-[#C3A869] font-medium text-sm mb-1">Secondary:</h5>
              <div className="flex flex-wrap gap-1">
                {musclesSummary.secondary.map(muscle => (
                  <span key={muscle} className="px-2 py-1 bg-orange-900/30 text-orange-300 rounded text-sm">
                    {muscle}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Workout mode summary */}
      {isWorkoutMode && showMuscleList && (
        <div className="bg-gray-800 rounded-lg p-4">
          <h4 className="text-white font-heading font-medium mb-3 text-sm">
            Workout Overview ({exercises.length} exercises)
          </h4>
          <p className="text-gray-400 text-sm">
            Heat map shows combined muscle activation across all exercises in this workout.
          </p>
        </div>
      )}
    </div>
  )
}

export default MuscleMap