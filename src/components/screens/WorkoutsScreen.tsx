'use client'

import { useState, useEffect } from 'react'
import { Zap, Calendar, Play } from 'lucide-react'
import { Workout, WorkoutSessionState, WorkoutSessionSummary } from '@/types'
import { NavWorkouts } from '@/components/icons'
import { loadWorkoutSession, hasActiveSession, loadPausedWorkoutSession, hasPausedSession, resumePausedSession, clearPausedWorkoutSession } from '@/lib/sessionStorage'
import WorkoutFormModal from '@/components/workout/WorkoutFormModal'
import QuickStartModal from '@/components/workout/QuickStartModal'
import WorkoutSummaryCard from '@/components/workout/WorkoutSummaryCard'
import WorkoutTabs from '@/components/workouts/WorkoutTabs'
import WorkoutLoggingModal from '@/components/workout/WorkoutLoggingModal'
import WorkoutSessionSummaryModal from '@/components/workout/WorkoutSessionSummary'
import PausedWorkoutPanel from '@/components/workout/PausedWorkoutPanel'
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
  const [activeSession, setActiveSession] = useState<WorkoutSessionState | null>(null)
  const [pausedSession, setPausedSession] = useState<WorkoutSessionState | null>(null)
  const [loggingWorkout, setLoggingWorkout] = useState<Workout | null>(null)
  const [sessionSummary, setSessionSummary] = useState<WorkoutSessionSummary | null>(null)

  // Check for existing active and paused sessions on mount
  useEffect(() => {
    // Check for active session first
    if (hasActiveSession()) {
      const existingSession = loadWorkoutSession()
      if (existingSession) {
        setActiveSession(existingSession)
        setLoggingWorkout(existingSession.workout)
        return
      }
    }

    // Check for paused session if no active session
    if (hasPausedSession()) {
      const pausedSessionState = loadPausedWorkoutSession()
      if (pausedSessionState) {
        setPausedSession(pausedSessionState)
      }
    }
  }, [])

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
    setLoggingWorkout(workout)
    setActiveSession(null) // Clear any existing session to start fresh
  }

  const handleRepeatWorkout = (workout: Workout) => {
    // Create a copy of the workout with new timestamp
    const repeatedWorkout: Workout = {
      ...workout,
      id: Date.now(),
      title: `${workout.title}`,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    setLoggingWorkout(repeatedWorkout)
    setActiveSession(null) // Clear any existing session to start fresh
  }

  const handleCreateWorkout = () => {
    setShowWorkoutForm(true)
  }

  const handleFinishSession = (summary: WorkoutSessionSummary) => {
    setSessionSummary(summary)
    setLoggingWorkout(null)
    setActiveSession(null)
  }

  const handleCloseLoggingModal = () => {
    // Check if a paused session was created
    if (hasPausedSession()) {
      const pausedSessionState = loadPausedWorkoutSession()
      if (pausedSessionState) {
        setPausedSession(pausedSessionState)
      }
    }
    // Hide the modal
    setLoggingWorkout(null)
  }

  const handleCloseSummary = () => {
    setSessionSummary(null)
  }

  const handleReturnToWorkouts = () => {
    setSessionSummary(null)
  }

  const handleResumeWorkout = () => {
    if (pausedSession) {
      // Resume the paused session by moving it back to active
      const resumedSession = resumePausedSession()
      if (resumedSession) {
        setActiveSession(resumedSession)
        setLoggingWorkout(resumedSession.workout)
        setPausedSession(null)
      }
    }
  }

  const handleCancelPausedWorkout = () => {
    // Cancel the paused session completely
    clearPausedWorkoutSession()
    setPausedSession(null)
  }

  // Mock data for demonstration - in real app this would come from scheduling system
  const todaysScheduledWorkout = null // workouts.find(w => w.scheduledDate === today)
  const recentWorkouts = workouts.slice(-5).reverse() // Last 5 workouts for recent sessions

  // If there's an active workout, show the training interface
  if (currentWorkout) {
    return <TrainScreen currentWorkout={currentWorkout} onEndWorkout={onEndWorkout} />
  }

  return (
    <div className="flex-1 overflow-y-auto pb-20 lg:pb-0 lg:pt-24">
      {/* Mobile Header */}
      <div className="lg:hidden bg-background p-4 border-b border-divider">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 pt-1">
            <NavWorkouts className="w-16 h-16 text-[#C3A869]" />
          </div>
          <div className="flex-1">
            <h1 className="text-white text-xl font-heading font-medium">Workouts</h1>
            <p className="text-gray-400 text-sm">Start and log your training sessions</p>
          </div>
        </div>
      </div>

      {/* Page Header */}
      <div className="hidden lg:block p-6">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 pt-1">
            <NavWorkouts className="w-16 h-16 text-[#C3A869]" />
          </div>
          <div className="flex-1">
            <h1 className="text-white text-2xl font-heading font-light mb-2">Training Sessions</h1>
            <p className="text-gray-400">Ready to train? Start a workout below</p>
          </div>
        </div>
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

      {/* Resume Paused Workout */}
      {pausedSession ? (
        <section className="p-4 lg:p-6">
          <PausedWorkoutPanel
            pausedSession={pausedSession}
            onResumeWorkout={handleResumeWorkout}
            onCancelWorkout={handleCancelPausedWorkout}
          />
        </section>
      ) : (
        /* Quick Start Section */
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
      )}

      {/* Tabbed Workout Interface */}
      <section className="p-4 lg:p-6">
        <WorkoutTabs
          workouts={workouts}
          recentSessions={recentWorkouts}
          onStartWorkout={handleStartWorkout}
          onRepeatWorkout={handleRepeatWorkout}
        />
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

      {/* Workout Logging Modal */}
      {loggingWorkout && (
        <WorkoutLoggingModal
          workout={loggingWorkout}
          initialSession={activeSession || undefined}
          onFinishSession={handleFinishSession}
          onClose={handleCloseLoggingModal}
        />
      )}

      {/* Session Summary Modal */}
      {sessionSummary && (
        <WorkoutSessionSummaryModal
          summary={sessionSummary}
          onClose={handleCloseSummary}
          onReturnToWorkouts={handleReturnToWorkouts}
        />
      )}
    </div>
  )
}