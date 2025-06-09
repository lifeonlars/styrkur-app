'use client'

import { useState } from 'react'
import { Play } from 'lucide-react'
import { Workout } from '@/types'
import WorkoutFormModal from '@/components/workout/WorkoutFormModal'
import TrainScreen from './TrainScreen'

interface WorkoutsScreenProps {
  workouts: Workout[]
  onSaveWorkout: (workout: Workout) => void
  onUpdateWorkout: (workout: Workout) => void
  currentWorkout: Workout | null
  onEndWorkout: () => void
}

export default function WorkoutsScreen({ workouts, onSaveWorkout, onUpdateWorkout, currentWorkout, onEndWorkout }: WorkoutsScreenProps) {
  const [showModal, setShowModal] = useState<'workout' | 'program' | null>(null)
  const [editingWorkout, setEditingWorkout] = useState<Workout | null>(null)

  const handleSaveWorkout = (workout: Workout) => {
    if (editingWorkout) {
      onUpdateWorkout(workout)
    } else {
      onSaveWorkout(workout)
    }
    // Close modal and reset editing state
    setShowModal(null)
    setEditingWorkout(null)
  }

  const handleCloseModal = () => {
    setShowModal(null)
    setEditingWorkout(null)
  }

  const handleEditWorkout = (workout: Workout) => {
    setEditingWorkout(workout)
    setShowModal('workout')
  }

  const handleStartFreeSession = () => {
    // TODO: Create empty workout session for free training
    const freeWorkout: Workout = {
      id: Date.now(),
      title: 'Free Session',
      description: 'Ad-hoc workout session',
      entries: [],
      tags: ['free-session'],
      createdAt: new Date(),
      updatedAt: new Date()
    }
    onSaveWorkout(freeWorkout)
  }

  // If there's an active workout, show the training interface
  if (currentWorkout) {
    return <TrainScreen currentWorkout={currentWorkout} onEndWorkout={onEndWorkout} />
  }

  return (
    <div className="flex-1 overflow-y-auto pb-20 lg:pb-0 lg:pt-20">
      {/* Mobile Header (hidden on desktop) */}
      <div className="lg:hidden bg-gray-900 p-4 border-b border-gray-800">
        <h1 className="text-white text-xl font-medium">Workouts</h1>
        <p className="text-gray-400 text-sm">Create and manage your workouts</p>
      </div>

      {/* Quick Actions */}
      <div className="p-4 lg:p-6 grid grid-cols-2 lg:grid-cols-3 gap-4">
        <button
          onClick={handleStartFreeSession}
          className="bg-[#C3A869]/20 border border-[#C3A869] p-6 rounded-xl text-center hover:bg-[#C3A869]/30 transition card-hover"
        >
          <Play className="w-8 h-8 mx-auto mb-2 text-[#C3A869]" />
          <div className="text-white font-medium">Start Free Session</div>
          <div className="text-gray-400 text-sm">Quick ad-hoc workout</div>
        </button>
        
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
      <div className="p-4">
        <h2 className="text-white font-medium mb-4">Your Workouts</h2>
        {workouts.length > 0 ? (
          <div className="space-y-3">
            {workouts.map(workout => (
              <div key={workout.id} className="bg-gray-800 rounded-xl p-4 card-hover">
                <h3 className="text-white font-medium mb-1">{workout.title}</h3>
                <p className="text-gray-400 text-sm mb-2">{workout.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">
                    {workout.entries?.length || workout.exercises?.length || 0} groups
                  </span>
                  <button 
                    onClick={() => handleEditWorkout(workout)}
                    className="text-primary text-sm hover:text-primary/80"
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-800/50 rounded-xl p-8 text-center border border-gray-700">
            <div className="text-4xl mb-4">🏋️</div>
            <h3 className="text-white font-medium mb-2">No Workouts Yet</h3>
            <p className="text-gray-400 text-sm mb-4">
              You don't have a workout scheduled today — pick one below or start a free session.
            </p>
            <button
              onClick={handleStartFreeSession}
              className="bg-[#C3A869] text-black px-6 py-2 rounded-lg font-medium hover:bg-[#C3A869]/80 transition"
            >
              Start Free Session
            </button>
          </div>
        )}
      </div>

      {/* Modals */}
      {showModal === 'workout' && (
        <WorkoutFormModal
          onSave={handleSaveWorkout}
          onClose={handleCloseModal}
          initialWorkout={editingWorkout || undefined}
        />
      )}
    </div>
  )
}