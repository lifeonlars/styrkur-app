'use client'

import { Play, X, Clock, Target } from 'lucide-react'
import { WorkoutSessionState } from '@/types'

interface PausedWorkoutPanelProps {
  pausedSession: WorkoutSessionState
  onResumeWorkout: () => void
  onCancelWorkout: () => void
}

export default function PausedWorkoutPanel({ 
  pausedSession, 
  onResumeWorkout, 
  onCancelWorkout 
}: PausedWorkoutPanelProps) {
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  // Calculate progress
  const totalSets = Object.values(pausedSession.groupLogs).reduce(
    (sum, groupLog) => sum + groupLog.plannedSets, 0
  )
  const completedSets = Object.values(pausedSession.groupLogs).reduce(
    (sum, groupLog) => sum + groupLog.setLogs.filter(set => set.isCompleted).length, 0
  )

  // Calculate elapsed time when paused
  const pausedAt = pausedSession.pausedAt || new Date()
  const elapsedSeconds = Math.floor((pausedAt.getTime() - pausedSession.startTime.getTime()) / 1000)

  return (
    <div className="bg-gradient-to-r from-orange-900/20 to-red-900/20 border border-orange-800/30 rounded-xl p-6 mb-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-12 h-12 bg-orange-600/20 rounded-full">
            <Clock className="w-6 h-6 text-orange-400" />
          </div>
          
          <div>
            <h3 className="text-white font-heading font-medium text-lg">
              Workout Paused
            </h3>
            <p className="text-gray-400 text-sm">
              {pausedSession.workout.title}
            </p>
            
            <div className="flex items-center gap-4 mt-2 text-sm text-gray-300">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{formatTime(elapsedSeconds)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Target className="w-4 h-4" />
                <span>{completedSets}/{totalSets} sets</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
          <button
            onClick={onCancelWorkout}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
            <span>Cancel</span>
          </button>
          
          <button
            onClick={onResumeWorkout}
            className="flex items-center justify-center gap-2 px-6 py-2 bg-[#C3A869] hover:bg-[#B19651] text-black font-medium rounded-lg transition-colors"
          >
            <Play className="w-4 h-4" />
            <span>Resume Workout</span>
          </button>
        </div>
      </div>
      
      {/* Progress bar */}
      <div className="mt-4">
        <div className="flex justify-between text-xs text-gray-400 mb-2">
          <span>Progress</span>
          <span>{Math.round((completedSets / totalSets) * 100)}%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(completedSets / totalSets) * 100}%` }}
          />
        </div>
      </div>
    </div>
  )
}