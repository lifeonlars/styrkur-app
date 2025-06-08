'use client'

import { useState } from 'react'
import { Workout } from '@/types'
import WorkoutFormModal from '@/components/workout/WorkoutFormModal'

interface BuildScreenProps {
  workouts: Workout[]
  onSaveWorkout: (workout: Workout) => void
}

export default function BuildScreen({ workouts, onSaveWorkout }: BuildScreenProps) {
  const [showModal, setShowModal] = useState<'workout' | 'program' | null>(null)

  return (
    <div className="flex-1 overflow-y-auto pb-20 lg:pb-0 lg:pt-20">
      {/* Mobile Header (hidden on desktop) */}
      <div className="lg:hidden bg-gray-900 p-4 border-b border-gray-800">
        <h1 className="text-white text-xl font-medium">Forge Your Path</h1>
        <p className="text-gray-400 text-sm">Create workouts and programs</p>
      </div>

      {/* Quick Actions */}
      <div className="p-4 lg:p-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
        <button
          onClick={() => setShowModal('workout')}
          className="bg-gray-800 p-6 rounded-xl text-center hover:bg-gray-700 transition card-hover"
        >
          <div className="text-primary text-3xl mb-2">⚡</div>
          <div className="text-white font-medium">New Workout</div>
          <div className="text-gray-400 text-sm">Build custom session</div>
        </button>
        
        <button
          onClick={() => setShowModal('program')}
          className="bg-gray-800 p-6 rounded-xl text-center hover:bg-gray-700 transition card-hover"
        >
          <div className="text-primary text-3xl mb-2">📋</div>
          <div className="text-white font-medium">New Program</div>
          <div className="text-gray-400 text-sm">Multi-week plan</div>
        </button>
      </div>

      {/* Program Templates */}
      <div className="p-4">
        <h2 className="text-white font-medium mb-4">Program Templates</h2>
        <div className="space-y-3">
          <div className="bg-gray-800 rounded-xl p-4 card-hover">
            <h3 className="text-white font-medium mb-1">Valhalla Strength</h3>
            <p className="text-gray-400 text-sm mb-2">12-week progressive overload program</p>
            <div className="flex justify-between items-center">
              <span className="text-primary text-sm">3 blocks • 36 sessions</span>
              <button className="btn-primary px-3 py-1 rounded-lg text-sm">
                Use Template
              </button>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-xl p-4 card-hover">
            <h3 className="text-white font-medium mb-1">Berserker Conditioning</h3>
            <p className="text-gray-400 text-sm mb-2">High-intensity metabolic training</p>
            <div className="flex justify-between items-center">
              <span className="text-primary text-sm">2 blocks • 24 sessions</span>
              <button className="btn-primary px-3 py-1 rounded-lg text-sm">
                Use Template
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Current Workouts */}
      {workouts.length > 0 && (
        <div className="p-4">
          <h2 className="text-white font-medium mb-4">Your Workouts</h2>
          <div className="space-y-3">
            {workouts.map(workout => (
              <div key={workout.id} className="bg-gray-800 rounded-xl p-4 card-hover">
                <h3 className="text-white font-medium mb-1">{workout.title}</h3>
                <p className="text-gray-400 text-sm mb-2">{workout.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">{workout.exercises.length} exercises</span>
                  <button className="text-primary text-sm hover:text-primary/80">
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modals */}
      {showModal === 'workout' && (
        <WorkoutFormModal
          onSave={onSaveWorkout}
          onClose={() => setShowModal(null)}
        />
      )}
    </div>
  )
}