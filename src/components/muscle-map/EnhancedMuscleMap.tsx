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
  /** Optional muscle activation data for enhanced legend */
  muscleActivation?: Array<{
    muscle: string;
    percentage: number;
  }>;
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
  muscleActivation = [],
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
      {/* Selected body part info only */}
      {selectedBodyPart && (
        <div className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Selected: {getMuscleDisplayName(selectedBodyPart.slug)}
          </p>
        </div>
      )}

      {/* Responsive Body Views */}
      <div className="w-full">
        {/* Single View with Tabs (Mobile/Tablet or when forced) */}
        <div className={forceSingleView ? 'block' : 'lg:hidden'}>
          {/* Tab Navigation */}
          <div className="flex bg-neu-card shadow-neu-raised rounded-lg p-1 mb-4 max-w-xs mx-auto">
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
              border="#1E1E1E"
              className="shadow-neu"
            />
          </div>
        </div>

        {/* Desktop: Dual View (only when not forced single) */}
        {!forceSingleView && (
          <div className="hidden lg:block">
            <div className="flex justify-center gap-8">
              {/* Front View */}
              <div>
                <EnhancedBodyHighlighter
                  data={exerciseData}
                  side="front"
                  scale={0.7}
                  onBodyPartPress={handleBodyPartPress}
                  border="#1E1E1E"
                  className="shadow-neu"
                />
              </div>

              {/* Back View */}
              <div>
                <EnhancedBodyHighlighter
                  data={exerciseData}
                  side="back"
                  scale={0.7}
                  onBodyPartPress={handleBodyPartPress}
                  border="#1E1E1E"
                  className="shadow-neu"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Enhanced Legend with Muscle Activation */}
      {showLegend && (
        <div className="bg-gray-50 dark:bg-neu-card shadow-neu-raised rounded-lg p-4 w-full">
          
          {muscleActivation.length > 0 ? (
            <div className="space-y-3">
              {/* Primary Muscles */}
              {muscleActivation.filter(m => m.percentage >= 60).length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#ff6b6b' }}></div>
                    <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Primary muscles</span>
                  </div>
                  <div className="space-y-1 ml-5">
                    {muscleActivation
                      .filter(m => m.percentage >= 60)
                      .map((activation, index) => (
                        <div key={index} className="flex justify-between text-xs">
                          <span className="text-gray-600 dark:text-gray-400">{activation.muscle}</span>
                          <span className="text-gray-900 dark:text-white font-medium">{activation.percentage}%</span>
                        </div>
                      ))}
                  </div>
                </div>
              )}
              
              {/* Secondary Muscles */}
              {muscleActivation.filter(m => m.percentage < 60).length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#ff8e53' }}></div>
                    <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Secondary muscles</span>
                  </div>
                  <div className="space-y-1 ml-5">
                    {muscleActivation
                      .filter(m => m.percentage < 60)
                      .map((activation, index) => (
                        <div key={index} className="flex justify-between text-xs">
                          <span className="text-gray-600 dark:text-gray-400">{activation.muscle}</span>
                          <span className="text-gray-900 dark:text-white font-medium">{activation.percentage}%</span>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            // Fallback to basic legend
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
          )}
        </div>
      )}

    </div>
  );
};

export default EnhancedMuscleMap;