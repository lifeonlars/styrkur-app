import React, { useState } from 'react'
import { MuscleMap, ExerciseMuscleMap, WorkoutMuscleMap } from '@/components/muscle-map'
import { Exercise, Workout } from '@/types'

const MuscleMapDemo: React.FC = () => {
  const [selectedDemo, setSelectedDemo] = useState<'single' | 'workout'>('single')

  // Sample exercise data
  const sampleExercise: Exercise = {
    id: '2001',
    name: 'Barbell Back Squat',
    icon: '🏔️',
    bodyPart: 'upper legs',
    equipment: 'barbell',
    target: 'quadriceps',
    primaryMuscles: ['quadriceps', 'glutes'],
    secondaryMuscles: ['hamstrings', 'calves'],
    primaryMuscleIds: [10, 8], // Quadriceps, Glutes
    secondaryMuscleIds: [11, 7], // Hamstrings, Calves
    muscleGroup: 'legs',
    instructions: ['Bar on shoulders', 'Squat down', 'Drive up through heels'],
    category: 10,
    uuid: 'bb-back-squat',
    isWeighted: true
  }

  // Sample workout data
  const sampleWorkout: Workout = {
    id: 1,
    title: "Push Day Workout",
    description: "Upper body pushing muscles",
    exercises: [
      {
        id: 1,
        exerciseId: '4001',
        exerciseData: {
          id: '4001',
          name: 'Barbell Bench Press',
          icon: '🛡️',
          bodyPart: 'chest',
          equipment: 'barbell',
          target: 'pectorals',
          primaryMuscles: ['chest'],
          secondaryMuscles: ['triceps', 'front delts'],
          primaryMuscleIds: [4], // Chest
          secondaryMuscleIds: [5, 2], // Triceps, Front delts
          muscleGroup: 'chest',
          instructions: ['Lie on bench', 'Lower bar to chest', 'Press up'],
          category: 8,
          uuid: 'bb-bench-press',
          isWeighted: true
        },
        sets: 4,
        reps: 8,
        weight: 100,
        load: 100,
        rest: 180,
        rpe: 8,
        type: 'single'
      },
      {
        id: 2,
        exerciseId: '5001',
        exerciseData: {
          id: '5001',
          name: 'Overhead Press',
          icon: '🔨',
          bodyPart: 'shoulders',
          equipment: 'barbell',
          target: 'deltoids',
          primaryMuscles: ['front delts'],
          secondaryMuscles: ['triceps'],
          primaryMuscleIds: [2], // Front delts
          secondaryMuscleIds: [5], // Triceps
          muscleGroup: 'shoulders',
          instructions: ['Start at shoulder height', 'Press overhead', 'Lower with control'],
          category: 13,
          uuid: 'bb-overhead-press',
          isWeighted: true
        },
        sets: 3,
        reps: 10,
        weight: 60,
        load: 60,
        rest: 150,
        rpe: 7,
        type: 'single'
      }
    ],
    supersets: [],
    circuits: [],
    tags: ['push', 'upper'],
    entries: []
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-white text-3xl font-heading font-bold mb-2">
          🏋️ Syrkur Saga Muscle Map Demo
        </h1>
        <p className="text-gray-400">
          Interactive muscle visualization using WGER API data
        </p>
      </div>

      {/* Demo Controls */}
      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => setSelectedDemo('single')}
          className={`px-4 py-2 rounded-lg font-medium transition ${
            selectedDemo === 'single'
              ? 'bg-[#C3A869] text-black'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          Single Exercise
        </button>
        <button
          onClick={() => setSelectedDemo('workout')}
          className={`px-4 py-2 rounded-lg font-medium transition ${
            selectedDemo === 'workout'
              ? 'bg-[#C3A869] text-black'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          Workout Overview
        </button>
      </div>

      {/* Demo Content */}
      <div className="bg-gray-800 rounded-xl p-6">
        {selectedDemo === 'single' && (
          <ExerciseMuscleMap
            exercise={sampleExercise}
            size="medium"
            showBothSides={true}
            showLegend={true}
            showMuscleList={true}
          />
        )}

        {selectedDemo === 'workout' && (
          <WorkoutMuscleMap
            workout={sampleWorkout}
            size="medium"
            showBothSides={true}
            showLegend={true}
          />
        )}
      </div>

      {/* Feature List */}
      <div className="bg-gray-800 rounded-xl p-6">
        <h2 className="text-white font-heading font-medium text-xl mb-4">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h3 className="text-[#C3A869] font-medium mb-2">Exercise-Level Visualization</h3>
            <ul className="text-gray-400 space-y-1">
              <li>• Maps WGER muscle IDs to visual regions</li>
              <li>• Shows primary vs secondary muscle activation</li>
              <li>• Color-coded intensity levels</li>
              <li>• Front and back body views</li>
            </ul>
          </div>
          <div>
            <h3 className="text-[#C3A869] font-medium mb-2">Workout-Level Aggregation</h3>
            <ul className="text-gray-400 space-y-1">
              <li>• Combines muscle activation across exercises</li>
              <li>• Heat map shows total muscle involvement</li>
              <li>• Helps identify workout balance</li>
              <li>• Supports supersets and circuits</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Integration Info */}
      <div className="bg-gray-800 rounded-xl p-6">
        <h2 className="text-white font-heading font-medium text-xl mb-4">Integration Points</h2>
        <div className="text-gray-400 space-y-2 text-sm">
          <p>🔗 <strong>Exercise Cards:</strong> Click the eye icon to view muscle maps</p>
          <p>🔗 <strong>Workout Cards:</strong> Click the eye icon to see workout muscle distribution</p>
          <p>🔗 <strong>Exercise Search:</strong> Enhanced cards with muscle map buttons</p>
          <p>🔗 <strong>Workout Planning:</strong> Visual feedback on muscle group coverage</p>
        </div>
      </div>
    </div>
  )
}

export default MuscleMapDemo