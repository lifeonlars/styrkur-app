import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import EnhancedBodyHighlighter from './enhanced/EnhancedBodyHighlighter';
import { convertWgerToEnhanced, aggregateWorkoutMuscleActivation, getMuscleDisplayName } from './enhanced/enhancedMuscleMapUtils';
import { ExtendedBodyPart } from './enhanced/types';
import styles from './MuscleHighlighter.module.css';

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
    <div className={cn(styles['muscle-highlighter'], className)}>
      {/* Selected body part info */}
      {selectedBodyPart && (
        <div className={styles['selected-info']}>
          <p className={styles['selected-text']}>
            Selected: {getMuscleDisplayName(selectedBodyPart.slug)}
          </p>
        </div>
      )}

      {/* Responsive Body Views */}
      <div className={styles['responsive-wrapper']}>
        {/* Single View with Tabs (Mobile/Tablet or when forced) */}
        <div className={cn(
          forceSingleView ? styles['single-view'] : styles['single-view-responsive']
        )}>
          {/* Tab Navigation */}
          <div className={styles['tab-container']}>
            <button
              onClick={() => setSelectedSide('front')}
              className={cn(
                styles['tab-button'],
                selectedSide === 'front' && styles['tab-button-active']
              )}
            >
              Front
            </button>
            <button
              onClick={() => setSelectedSide('back')}
              className={cn(
                styles['tab-button'],
                selectedSide === 'back' && styles['tab-button-active']
              )}
            >
              Back
            </button>
          </div>

          {/* Single Body View */}
          <div className={styles['body-views']}>
            <div className={styles['body-view']}>
              <EnhancedBodyHighlighter
                data={exerciseData}
                side={selectedSide}
                scale={0.8}
                onBodyPartPress={handleBodyPartPress}
                border="#1E1E1E"
              />
            </div>
          </div>
        </div>

        {/* Desktop: Dual View (only when not forced single) */}
        {!forceSingleView && (
          <div className={styles['dual-view-responsive']}>
            <div className={styles['body-views']}>
              {/* Front View */}
              <div className={styles['body-view']}>
                <EnhancedBodyHighlighter
                  data={exerciseData}
                  side="front"
                  scale={0.7}
                  onBodyPartPress={handleBodyPartPress}
                  border="#1E1E1E"
                />
              </div>

              {/* Back View */}
              <div className={styles['body-view']}>
                <EnhancedBodyHighlighter
                  data={exerciseData}
                  side="back"
                  scale={0.7}
                  onBodyPartPress={handleBodyPartPress}
                  border="#1E1E1E"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Enhanced Legend with Muscle Activation */}
      {showLegend && (
        <div className={styles['legend']}>
          {muscleActivation.length > 0 ? (
            <div>
              {/* Primary Muscles */}
              {muscleActivation.filter(m => m.percentage >= 60).length > 0 && (
                <div className={styles['legend-group']}>
                  <div className={styles['legend-header']}>
                    <div 
                      className={styles['legend-color-dot']} 
                      style={{ backgroundColor: '#ff6b6b' }}
                    ></div>
                    <span className={styles['legend-label']}>Primary muscles</span>
                  </div>
                  <div className={styles['legend-muscles']}>
                    {muscleActivation
                      .filter(m => m.percentage >= 60)
                      .map((activation, index) => (
                        <div key={index} className={styles['legend-muscle-item']}>
                          <span className={styles['legend-muscle-name']}>{activation.muscle}</span>
                          <span className={styles['legend-muscle-percentage']}>{activation.percentage}%</span>
                        </div>
                      ))}
                  </div>
                </div>
              )}
              
              {/* Secondary Muscles */}
              {muscleActivation.filter(m => m.percentage < 60).length > 0 && (
                <div className={styles['legend-group']}>
                  <div className={styles['legend-header']}>
                    <div 
                      className={styles['legend-color-dot']} 
                      style={{ backgroundColor: '#ff8e53' }}
                    ></div>
                    <span className={styles['legend-label']}>Secondary muscles</span>
                  </div>
                  <div className={styles['legend-muscles']}>
                    {muscleActivation
                      .filter(m => m.percentage < 60)
                      .map((activation, index) => (
                        <div key={index} className={styles['legend-muscle-item']}>
                          <span className={styles['legend-muscle-name']}>{activation.muscle}</span>
                          <span className={styles['legend-muscle-percentage']}>{activation.percentage}%</span>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            // Fallback to basic legend
            <div className={styles['legend-basic']}>
              {Object.entries(colorMap).map(([label, color]) => (
                <div key={label} className={styles['legend-basic-item']}>
                  <div
                    className={styles['legend-basic-color']}
                    style={{ backgroundColor: color }}
                  />
                  <span className={styles['legend-basic-text']}>{label}</span>
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