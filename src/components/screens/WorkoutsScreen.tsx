'use client'

import { useState } from 'react'
import { Zap, Calendar, Play, RotateCcw } from 'lucide-react'
import { Workout } from '@/types'
import WorkoutFormModal from '@/components/workout/WorkoutFormModal'
import QuickStartModal from '@/components/workout/QuickStartModal'
import WorkoutSummaryCard from '@/components/workout/WorkoutSummaryCard'
import TrainScreen from './TrainScreen'

interface WorkoutsScreenProps {
  workouts: Workout[]
  onSaveWorkout: (workout: Workout) => void
  onUpdateWorkout: (workout: Workout) => void
  currentWorkout: Workout | null
  onEndWorkout: () => void
}

export default function WorkoutsScreen({ workouts, onSaveWorkout, onUpdateWorkout, currentWorkout, onEndWorkout }: WorkoutsScreenProps) {
  const [showQuickStart, setShowQuickStart] = useState(false)
  const [showWorkoutForm, setShowWorkoutForm] = useState(false)
  const [editingWorkout, setEditingWorkout] = useState<Workout | null>(null)

  const handleSaveWorkout = (workout: Workout) => {
    if (editingWorkout) {
      onUpdateWorkout(workout)
    } else {
      // Save new workout and start it immediately
      onSaveWorkout(workout)
    }
    setShowWorkoutForm(false)
    setEditingWorkout(null)
  }

  const handleCloseWorkoutForm = () => {
    setShowWorkoutForm(false)
    setEditingWorkout(null)
  }

  const handleStartWorkout = (workout: Workout) => {
    onSaveWorkout(workout)
  }

  const handleRepeatWorkout = (workout: Workout) => {
    // Create a copy of the workout with new timestamp
    const repeatedWorkout: Workout = {
      ...workout,
      id: Date.now(),
      title: `${workout.title} (Repeat)`,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    onSaveWorkout(repeatedWorkout)
  }

  const handleCreateWorkout = () => {
    setShowWorkoutForm(true)
  }

  // Mock data for demonstration - in real app this would come from scheduling system
  const todaysScheduledWorkout = null // workouts.find(w => w.scheduledDate === today)
  const recentWorkouts = workouts.slice(-3).reverse() // Last 3 workouts

  // If there's an active workout, show the training interface
  if (currentWorkout) {
    return <TrainScreen currentWorkout={currentWorkout} onEndWorkout={onEndWorkout} />
  }

  return (
    <div className="flex-1 overflow-y-auto pb-20 lg:pb-0 lg:pt-20">
      {/* Mobile Header */}
      <div className="lg:hidden bg-gray-900 p-4 border-b border-gray-800">
        <h1 className="text-white text-xl font-medium">Workouts</h1>
        <p className="text-gray-400 text-sm">Start and log your training sessions</p>
      </div>

      {/* Page Header */}
      <div className="hidden lg:block p-6">
        <h1 className="text-white text-2xl font-light mb-2">Training Sessions</h1>
        <p className="text-gray-400">Ready to train? Start a workout below</p>
      </div>

      {/* Today's Scheduled Workout */}
      {todaysScheduledWorkout && (
        <section className="p-4 lg:p-6">
          <h2 className="text-white font-medium mb-4 flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-[#C3A869]" />
            Today's Schedule
          </h2>
          <WorkoutSummaryCard 
            workout={todaysScheduledWorkout}
            onStart={handleStartWorkout}
            variant="scheduled"
          />
        </section>
      )}

      {/* Resume In-Progress (future implementation) */}
      {/* This would check localStorage for paused workouts */}

      {/* Quick Start Section */}
      <section className="p-4 lg:p-6">
        <div className="bg-[#C3A869]/10 border border-[#C3A869]/30 rounded-xl p-6 text-center">
          <Zap className="w-12 h-12 mx-auto mb-4 text-[#C3A869]" />
          <h2 className="text-white font-medium mb-2">Quick Start</h2>
          <p className="text-gray-400 text-sm mb-4">
            Begin your workout by choosing an existing routine, building a new one, or generating with AI
          </p>
          <button
            onClick={() => setShowQuickStart(true)}
            className="bg-[#C3A869] text-black px-8 py-3 rounded-xl font-medium hover:bg-[#C3A869]/80 transition flex items-center gap-2 mx-auto"
          >
            <Play className="w-5 h-5" />
            Quick Start
          </button>
        </div>
      </section>

      {/* Recent Workouts */}
      {recentWorkouts.length > 0 && (
        <section className="p-4 lg:p-6">
          <h2 className="text-white font-medium mb-4 flex items-center">
            <RotateCcw className="w-5 h-5 mr-2 text-[#C3A869]" />
            Recent Sessions
          </h2>
          <div className="space-y-3">
            {recentWorkouts.map(workout => (
              <WorkoutSummaryCard
                key={workout.id}
                workout={workout}
                onStart={handleStartWorkout}
                onRepeat={handleRepeatWorkout}
                variant="recent"
              />
            ))}
          </div>
        </section>
      )}

      {/* Your Workouts Library */}
      <section className="p-4 lg:p-6">
        <h2 className="text-white font-medium mb-4">Your Workout Library</h2>
        {workouts.length > 0 ? (
          <div className="space-y-3">
            {workouts.map(workout => (
              <WorkoutSummaryCard
                key={workout.id}
                workout={workout}
                onStart={handleStartWorkout}
              />
            ))}
          </div>
        ) : (
          <div className="bg-gray-800/50 rounded-xl p-8 text-center border border-gray-700">
            <div className="text-4xl mb-4">📚</div>
            <h3 className="text-white font-medium mb-2">No Saved Workouts</h3>
            <p className="text-gray-400 text-sm mb-4">
              You haven't created any workouts yet. Use Quick Start to begin training or build your first workout.
            </p>
            <button
              onClick={() => setShowQuickStart(true)}
              className="bg-[#C3A869] text-black px-6 py-2 rounded-lg font-medium hover:bg-[#C3A869]/80 transition"
            >
              Get Started
            </button>
          </div>
        )}
      </section>

      {/* Modals */}
      {showQuickStart && (
        <QuickStartModal
          workouts={workouts}
          onClose={() => setShowQuickStart(false)}
          onStartWorkout={handleStartWorkout}
          onCreateWorkout={handleCreateWorkout}
        />
      )}
      
      {showWorkoutForm && (
        <WorkoutFormModal
          onSave={handleSaveWorkout}
          onClose={handleCloseWorkoutForm}
          initialWorkout={editingWorkout || undefined}
        />
      )}
    </div>
  )
}