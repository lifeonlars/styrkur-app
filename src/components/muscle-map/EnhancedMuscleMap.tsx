import React, { useState } from 'react';
import EnhancedBodyHighlighter from './enhanced/EnhancedBodyHighlighter';
import { convertWgerToEnhanced, aggregateWorkoutMuscleActivation, getMuscleDisplayName } from './enhanced/enhancedMuscleMapUtils';
import { ExtendedBodyPart } from './enhanced/types';

interface EnhancedMuscleMapProps {
  primaryMuscleIds?: number[];
  secondaryMuscleIds?: number[];
  exercises?: Array<{
    primaryMuscles?: number[];
    secondaryMuscles?: number[];
    name?: string;
  }>;
  isWorkoutMode?: boolean;
  exerciseName?: string;
  showLegend?: boolean;
  className?: string;
  /** Force single view mode (useful for mobile or specific layouts) */
  forceSingleView?: boolean;
}

const EnhancedMuscleMap: React.FC<EnhancedMuscleMapProps> = ({
  primaryMuscleIds = [],
  secondaryMuscleIds = [],
  exercises = [],
  isWorkoutMode = false,
  exerciseName,
  showLegend = true,
  className,
  forceSingleView = false,
}) => {
  const [selectedSide, setSelectedSide] = useState<'front' | 'back'>('front');
  const [selectedBodyPart, setSelectedBodyPart] = useState<ExtendedBodyPart | null>(null);

  // Determine if we should show dual view based on screen size (unless forced single)
  const shouldShowDualView = !forceSingleView;

  // Convert muscle data to enhanced format
  const { exerciseData, colorMap } = isWorkoutMode 
    ? aggregateWorkoutMuscleActivation(exercises)
    : {
        exerciseData: convertWgerToEnhanced(primaryMuscleIds, secondaryMuscleIds, exerciseName),
        colorMap: {
          'Primary muscles': '#ff6b6b',
          'Secondary muscles': '#ff8e53',
        }
      };

  const handleBodyPartPress = (bodyPart: ExtendedBodyPart, side?: 'left' | 'right') => {
    setSelectedBodyPart(bodyPart);
    console.log(`Clicked on ${getMuscleDisplayName(bodyPart.slug)}${side ? ` (${side})` : ''}`);
  };

  return (
    <div className={`flex flex-col space-y-4 ${className}`}>
      {/* Title */}
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {isWorkoutMode ? 'Workout Muscle Activation' : `${exerciseName || 'Exercise'} Muscles`}
        </h3>
        {selectedBodyPart && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Selected: {getMuscleDisplayName(selectedBodyPart.slug)}
          </p>
        )}
      </div>

      {/* Responsive Body Views */}
      <div className="w-full">
        {/* Single View with Tabs (Mobile/Tablet or when forced) */}
        <div className={forceSingleView ? 'block' : 'lg:hidden'}>
          {/* Tab Navigation */}
          <div className="flex bg-gray-800 rounded-lg p-1 mb-4 max-w-xs mx-auto">
            <button
              onClick={() => setSelectedSide('front')}
              className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors ${
                selectedSide === 'front'
                  ? 'bg-[#C3A869] text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700'
              }`}
            >
              Front
            </button>
            <button
              onClick={() => setSelectedSide('back')}
              className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors ${
                selectedSide === 'back'
                  ? 'bg-[#C3A869] text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700'
              }`}
            >
              Back
            </button>
          </div>

          {/* Single Body View */}
          <div className="flex justify-center">
            <EnhancedBodyHighlighter
              data={exerciseData}
              side={selectedSide}
              scale={0.8}
              onBodyPartPress={handleBodyPartPress}
              border="#1f2937"
              className="drop-shadow-md"
            />
          </div>
        </div>

        {/* Desktop: Dual View (only when not forced single) */}
        {!forceSingleView && (
          <div className="hidden lg:block">
            <div className="flex justify-center gap-8">
              {/* Front View */}
              <div className="text-center">
                <h4 className="text-sm font-medium text-gray-400 mb-2">Front</h4>
                <EnhancedBodyHighlighter
                  data={exerciseData}
                  side="front"
                  scale={0.7}
                  onBodyPartPress={handleBodyPartPress}
                  border="#1f2937"
                  className="drop-shadow-md"
                />
              </div>

              {/* Back View */}
              <div className="text-center">
                <h4 className="text-sm font-medium text-gray-400 mb-2">Back</h4>
                <EnhancedBodyHighlighter
                  data={exerciseData}
                  side="back"
                  scale={0.7}
                  onBodyPartPress={handleBodyPartPress}
                  border="#1f2937"
                  className="drop-shadow-md"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Legend */}
      {showLegend && Object.keys(colorMap).length > 0 && (
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 w-full max-w-md">
          <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Legend</h4>
          <div className="space-y-2">
            {Object.entries(colorMap).map(([label, color]) => (
              <div key={label} className="flex items-center space-x-2">
                <div
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: color }}
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">{label}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Activated Muscles List */}
      {exerciseData.length > 0 && (
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 w-full max-w-md">
          <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
            Activated Muscles
          </h4>
          <div className="grid grid-cols-2 gap-2">
            {exerciseData
              .sort((a, b) => (b.intensity || 0) - (a.intensity || 0))
              .map((muscle) => (
                <div
                  key={muscle.slug}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="text-gray-700 dark:text-gray-300">
                    {getMuscleDisplayName(muscle.slug)}
                  </span>
                  <div className="flex items-center space-x-1">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: muscle.color }}
                    />
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {Math.round((muscle.intensity || 0) * 100)}%
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EnhancedMuscleMap;