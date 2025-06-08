'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import { Workout, WorkoutForm, Exercise, ExerciseConfig, WorkoutExercise } from '@/types'
import ExerciseSearch from './ExerciseSearch'
import ExerciseConfigModal from './ExerciseConfigModal'

interface WorkoutFormModalProps {
  onSave: (workout: Workout) => void
  onClose: () => void
}

export default function WorkoutFormModal({ onSave, onClose }: WorkoutFormModalProps) {
  const [workoutForm, setWorkoutForm] = useState<WorkoutForm>({
    title: '',
    description: '',
    exercises: [],
    supersets: [],
    circuits: []
  })
  const [showExerciseConfig, setShowExerciseConfig] = useState<Exercise | null>(null)

  const handleExerciseSelect = (exercise: Exercise) => {
    setShowExerciseConfig(exercise)
  }

  const handleExerciseConfig = (config: ExerciseConfig) => {
    if (!showExerciseConfig) return
    
    const newExercise: WorkoutExercise = {
      id: Date.now(),
      exerciseId: showExerciseConfig.id,
      exerciseData: showExerciseConfig,
      sets: config.sets,
      reps: config.reps,
      weight: config.weight,
      load: config.weight,
      rest: config.rest,
      rpe: config.rpe,
      tempo: config.tempo,
      notes: config.notes,
      type: 'single'
    }
    
    setWorkoutForm(prev => ({
      ...prev,
      exercises: [...prev.exercises, newExercise]
    }))
    
    setShowExerciseConfig(null)
  }

  const removeExercise = (exerciseId: number) => {
    setWorkoutForm(prev => ({
      ...prev,
      exercises: prev.exercises.filter(ex => ex.id !== exerciseId)
    }))
  }

  const handleSave = () => {
    if (!workoutForm.title || workoutForm.exercises.length === 0) return
    
    const newWorkout: Workout = {
      id: Date.now(),
      title: workoutForm.title,
      description: workoutForm.description,
      exercises: workoutForm.exercises,
      supersets: workoutForm.supersets,
      circuits: workoutForm.circuits,
      tags: ['custom'],
      createdAt: new Date()
    }
    
    onSave(newWorkout)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-end lg:items-center lg:justify-center z-50">
      <div className="bg-gray-900 w-full h-5/6 lg:h-4/5 lg:max-w-4xl lg:max-h-[90vh] rounded-t-2xl lg:rounded-2xl overflow-hidden lg:mx-4">
        {/* Modal Header */}
        <div className="p-4 border-b border-gray-800 flex justify-between items-center">
          <h2 className="text-white text-lg font-medium">Create Workout</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {/* Workout Details */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Workout name (e.g., Odin's Power)"
              value={workoutForm.title}
              onChange={(e) => setWorkoutForm(prev => ({ ...prev, title: e.target.value }))}
              className="w-full bg-gray-800 text-white p-3 rounded-xl mb-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <textarea
              placeholder="Description (optional)"
              value={workoutForm.description}
              onChange={(e) => setWorkoutForm(prev => ({ ...prev, description: e.target.value }))}
              className="w-full bg-gray-800 text-white p-3 rounded-xl placeholder-gray-400 h-20 resize-none focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Exercise Search */}
          <div className="mb-6">
            <h3 className="text-white font-medium mb-3">Add Exercises</h3>
            <ExerciseSearch onExerciseSelect={handleExerciseSelect} />
          </div>

          {/* Current Workout Structure */}
          {workoutForm.exercises.length > 0 && (
            <div className="mb-6">
              <h3 className="text-white font-medium mb-3">Workout Structure</h3>
              <div className="space-y-3">
                {workoutForm.exercises.map((exercise) => (
                  <div key={exercise.id} className="bg-gray-800 p-3 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="text-xl mr-2">{exercise.exerciseData?.icon}</span>
                        <div>
                          <div className="text-white text-sm font-medium">{exercise.exerciseData?.name}</div>
                          <div className="text-gray-400 text-xs">
                            {exercise.sets} × {exercise.reps}
                            {exercise.weight > 0 && ` @ ${exercise.weight}kg`}
                            {exercise.rpe && ` • RPE ${exercise.rpe}`}
                          </div>
                        </div>
                      </div>
                      <button 
                        onClick={() => removeExercise(exercise.id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Save Button */}
        <div className="p-4 border-t border-gray-800">
          <button
            onClick={handleSave}
            disabled={!workoutForm.title || workoutForm.exercises.length === 0}
            className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed py-3 rounded-xl font-medium"
          >
            Save Workout
          </button>
        </div>
      </div>

      {/* Exercise Configuration Modal */}
      {showExerciseConfig && (
        <ExerciseConfigModal
          exercise={showExerciseConfig}
          onConfirm={handleExerciseConfig}
          onCancel={() => setShowExerciseConfig(null)}
        />
      )}
    </div>
  )
}