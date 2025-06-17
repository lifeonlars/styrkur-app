'use client'

import React, { useState, useEffect } from 'react'
import { Workout, Exercise } from '@/types'
import { fetchExercises } from '@/lib/wger'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/ui/dialog'
import { calculateWorkoutMetrics, formatWeight } from '@/lib/workoutUtils'
import { Hash, Weight, RotateCcw, TrendingUp, Calculator, Clock } from 'lucide-react'
import MuscleHighlighter from '@/components/muscle-map/MuscleHighlighter'

interface WorkoutSummaryModalProps {
  workout: Workout
  isOpen: boolean
  onClose: () => void
}

export default function WorkoutSummaryModal({ workout, isOpen, onClose }: WorkoutSummaryModalProps) {
  const [exercises, setExercises] = useState<Exercise[]>([])
  const [loading, setLoading] = useState(true)

  // Calculate workout metrics
  const metrics = calculateWorkoutMetrics(workout)
  
  // Estimate duration (rough calculation: 3 min per set + rest)
  const estimatedDuration = Math.ceil(metrics.totalSets * 3.5)

  // Load exercises for lookup
  useEffect(() => {
    const loadExercises = async () => {
      try {
        setLoading(true)
        const allExercises = await fetchExercises({ limit: 100 })
        setExercises(allExercises)
      } catch (error) {
        console.error('Failed to load exercises:', error)
      } finally {
        setLoading(false)
      }
    }

    if (isOpen) {
      loadExercises()
    }
  }, [isOpen])

  // Prepare exercises for muscle map
  const muscleMapExercises = workout.entries?.flatMap(entry => 
    entry.exercises.map(exerciseConfig => {
      const exerciseData = exercises.find(ex => ex.id === exerciseConfig.exerciseId)
      return exerciseData ? {
        primaryMuscleIds: exerciseData.primaryMuscleIds || [],
        secondaryMuscleIds: exerciseData.secondaryMuscleIds || [],
        name: exerciseData.name
      } : null
    }).filter(Boolean)
  ) || []

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-4">
          <DialogTitle className="text-xl font-heading font-medium text-white">
            {workout.title}
          </DialogTitle>
          {workout.description && (
            <p className="text-gray-400 text-sm mt-1">{workout.description}</p>
          )}
        </DialogHeader>
        
        <div className="overflow-y-auto flex-1">
          <div className="p-6 pt-0 space-y-6">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-norse-gold"></div>
              </div>
            ) : (
              <>
                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  <div className="bg-neu-surface shadow-neu-flat rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Hash className="w-4 h-4 text-norse-gold" />
                      <span className="text-xs text-gray-400">Exercises</span>
                    </div>
                    <div className="text-white font-medium text-lg">{metrics.exerciseNames.length}</div>
                  </div>

                  <div className="bg-neu-surface shadow-neu-flat rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <RotateCcw className="w-4 h-4 text-norse-gold" />
                      <span className="text-xs text-gray-400">Total Sets</span>
                    </div>
                    <div className="text-white font-medium text-lg">{metrics.totalSets}</div>
                  </div>

                  <div className="bg-neu-surface shadow-neu-flat rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Calculator className="w-4 h-4 text-norse-gold" />
                      <span className="text-xs text-gray-400">Total Reps</span>
                    </div>
                    <div className="text-white font-medium text-lg">{metrics.totalReps.toLocaleString()}</div>
                  </div>

                  <div className="bg-neu-surface shadow-neu-flat rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Weight className="w-4 h-4 text-norse-gold" />
                      <span className="text-xs text-gray-400">Total Volume</span>
                    </div>
                    <div className="text-white font-medium text-lg">
                      {formatWeight(metrics.totalWeight)}
                    </div>
                  </div>

                  <div className="bg-neu-surface shadow-neu-flat rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-4 h-4 text-norse-gold" />
                      <span className="text-xs text-gray-400">Heaviest Set</span>
                    </div>
                    <div className="text-white font-medium text-lg">
                      {metrics.heaviestWeight > 0 ? `${metrics.heaviestWeight} kg` : '0 kg'}
                    </div>
                  </div>

                  <div className="bg-neu-surface shadow-neu-flat rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-4 h-4 text-norse-gold" />
                      <span className="text-xs text-gray-400">~Duration</span>
                    </div>
                    <div className="text-white font-medium text-lg">{estimatedDuration}min</div>
                  </div>
                </div>

                {/* Two Column Layout for Exercise List and Muscle Map */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Exercise List */}
                  <div className="bg-neu-surface shadow-neu-flat rounded-xl p-6">
                    <h3 className="text-white font-heading font-medium text-lg mb-4">Exercise List</h3>
                    <div className="space-y-3 max-h-80 overflow-y-auto">
                      {workout.entries?.map((entry, entryIndex) => (
                        <div key={entryIndex} className="border-b border-gray-700 pb-3 last:border-b-0">
                          {entry.exercises.map((exerciseConfig, exerciseIndex) => {
                            const exerciseData = exercises.find(ex => ex.id === exerciseConfig.exerciseId)
                            return (
                              <div key={exerciseIndex} className="flex justify-between items-center">
                                <div className="flex-1">
                                  <p className="text-white font-medium text-sm">
                                    {exerciseData?.name || `Exercise ${exerciseConfig.exerciseId}`}
                                  </p>
                                  <p className="text-gray-400 text-xs">
                                    {entry.sets || 1} sets × {exerciseConfig.reps || 0} reps
                                    {exerciseConfig.weight ? ` @ ${exerciseConfig.weight}kg` : ''}
                                  </p>
                                </div>
                                <div className="text-gray-500 text-xs">
                                  {exerciseConfig.weight && exerciseConfig.reps 
                                    ? `${(entry.sets || 1) * exerciseConfig.reps * exerciseConfig.weight}kg`
                                    : '0kg'
                                  }
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Muscle Map */}
                  <div className="bg-neu-surface shadow-neu-flat rounded-xl p-6">
                    <h3 className="text-white font-heading font-medium text-lg mb-4">Muscle Activation</h3>
                    {muscleMapExercises.length > 0 ? (
                      <MuscleHighlighter
                        exercises={muscleMapExercises}
                        showLegend={true}
                        showMuscleList={false}
                        size="medium"
                        useEnhanced={true}
                        className="muscle-map-container"
                      />
                    ) : (
                      <div className="text-center py-8 text-gray-400">
                        <div className="text-2xl mb-2">💪</div>
                        <p className="text-sm">No muscle data available</p>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}