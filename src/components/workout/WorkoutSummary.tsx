'use client'

import React, { useMemo } from 'react'
import { Workout, Exercise } from '@/types'
import { Hash, Weight, RotateCcw, TrendingUp, Calculator } from 'lucide-react'
import MuscleMap from '@/components/muscle-map/MuscleMap'
import { formatWeight } from '@/lib/workoutUtils'

interface WorkoutSummaryProps {
  workout: Workout
  exercises: Exercise[]
}

export default function WorkoutSummary({ workout, exercises }: WorkoutSummaryProps) {
  // Calculate workout metrics and create exercises array for muscle map
  const { metrics, muscleMapExercises } = useMemo(() => {
    let totalExercises = 0
    let totalSets = 0
    let totalReps = 0
    let totalVolume = 0
    let heaviestWeight = 0
    let totalWeightedReps = 0
    let totalWeightedVolume = 0
    
    const uniqueExercises = new Set<string>()
    const muscleMapExercises: Array<{
      primaryMuscleIds: number[]
      secondaryMuscleIds: number[]
    }> = []

    // Process each entry in the workout
    workout.entries?.forEach((entry) => {
      const entrySets = entry.sets || 1
      totalSets += entrySets

      entry.exercises.forEach((exerciseConfig) => {
        const exerciseData = exercises.find(ex => ex.id === exerciseConfig.exerciseId)
        
        if (exerciseData) {
          // Count unique exercises
          if (!uniqueExercises.has(exerciseData.id)) {
            uniqueExercises.add(exerciseData.id)
            totalExercises++
          }

          // Add to muscle map exercises (using the exact same format as individual exercises)
          muscleMapExercises.push({
            primaryMuscleIds: exerciseData.primaryMuscleIds || [],
            secondaryMuscleIds: exerciseData.secondaryMuscleIds || []
          })

          // Calculate reps and volume
          const exerciseReps = exerciseConfig.reps || 0
          const exerciseWeight = exerciseConfig.weight || 0
          
          const totalExerciseReps = entrySets * exerciseReps
          totalReps += totalExerciseReps
          
          if (exerciseWeight > 0) {
            const exerciseVolume = totalExerciseReps * exerciseWeight
            totalVolume += exerciseVolume
            totalWeightedReps += totalExerciseReps
            totalWeightedVolume += exerciseVolume
            
            if (exerciseWeight > heaviestWeight) {
              heaviestWeight = exerciseWeight
            }
          }
        }
      })
    })

    const averageWeight = totalWeightedReps > 0 ? totalWeightedVolume / totalWeightedReps : 0

    return {
      metrics: {
        totalExercises,
        totalSets,
        totalReps,
        totalVolume,
        heaviestWeight,
        averageWeight
      },
      muscleMapExercises
    }
  }, [workout, exercises])

  if (!workout.entries || workout.entries.length === 0) {
    return (
      <div className="bg-gray-800 rounded-xl p-6">
        <h3 className="text-white font-heading font-medium text-lg mb-4">Workout Summary</h3>
        <div className="text-center py-8 text-gray-400">
          <div className="text-4xl mb-4">📊</div>
          <p>Add exercises to see workout summary and muscle activation map</p>
        </div>
      </div>
    )
  }

  return (
    <div className="workout-summary bg-gray-800 rounded-xl p-6 space-y-6">
      <h3 className="text-white font-heading font-medium text-lg mb-4">Workout Summary</h3>
      
      {/* Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-gray-900 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Hash className="w-4 h-4 text-[#C3A869]" />
            <span className="text-xs text-gray-400">Exercises</span>
          </div>
          <div className="text-white font-medium text-lg">{metrics.totalExercises}</div>
        </div>

        <div className="bg-gray-900 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <RotateCcw className="w-4 h-4 text-[#C3A869]" />
            <span className="text-xs text-gray-400">Total Sets</span>
          </div>
          <div className="text-white font-medium text-lg">{metrics.totalSets}</div>
        </div>

        <div className="bg-gray-900 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Calculator className="w-4 h-4 text-[#C3A869]" />
            <span className="text-xs text-gray-400">Total Reps</span>
          </div>
          <div className="text-white font-medium text-lg">{metrics.totalReps.toLocaleString()}</div>
        </div>

        <div className="bg-gray-900 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Weight className="w-4 h-4 text-[#C3A869]" />
            <span className="text-xs text-gray-400">Total Volume</span>
          </div>
          <div className="text-white font-medium text-lg">
            {metrics.totalVolume > 0 ? formatWeight(metrics.totalVolume) : '0 kg'}
          </div>
        </div>

        <div className="bg-gray-900 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-[#C3A869]" />
            <span className="text-xs text-gray-400">Heaviest Weight</span>
          </div>
          <div className="text-white font-medium text-lg">
            {metrics.heaviestWeight > 0 ? `${metrics.heaviestWeight} kg` : '0 kg'}
          </div>
        </div>

        <div className="bg-gray-900 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Weight className="w-4 h-4 text-[#C3A869]" />
            <span className="text-xs text-gray-400">Avg Weight</span>
          </div>
          <div className="text-white font-medium text-lg">
            {metrics.averageWeight > 0 ? `${metrics.averageWeight.toFixed(1)} kg` : '0 kg'}
          </div>
        </div>
      </div>

      {/* Muscle Map */}
      <div>
        <h4 className="text-white font-heading font-medium mb-4">Muscle Activation Map</h4>
        <div className="bg-gray-900 rounded-lg p-4">
          {muscleMapExercises.length > 0 ? (
            <MuscleMap
              exercises={muscleMapExercises}
              showFront={true}
              showBack={true}
              showLegend={true}
              showMuscleList={false}
              size="medium"
              useEnhanced={true}
              exerciseName="Workout Summary"
            />
          ) : (
            <div className="text-center py-8 text-gray-400">
              <div className="text-2xl mb-2">💪</div>
              <p className="text-sm">No muscle data available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}