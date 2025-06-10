import { CheckCircle, Clock, Weight, Hash, RotateCcw, Trophy } from 'lucide-react'
import { WorkoutSessionSummary as Summary } from '@/types'

interface WorkoutSessionSummaryProps {
  summary: Summary
  onClose: () => void
  onReturnToWorkouts: () => void
}

export default function WorkoutSessionSummary({
  summary,
  onClose,
  onReturnToWorkouts
}: WorkoutSessionSummaryProps) {
  const formatTime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    
    if (hours > 0) {
      return `${hours}h ${mins}m`
    }
    return `${mins}m`
  }

  const formatWeight = (weight: number): string => {
    // Format with spaces for thousands separator
    const formattedNumber = new Intl.NumberFormat('en-US', {
      useGrouping: true,
      maximumFractionDigits: 1
    }).format(weight).replace(/,/g, ' ')
    
    return `${formattedNumber} kg`
  }

  const completionRate = Math.round((summary.completedSets / summary.totalSets) * 100)

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="text-center p-6 border-b border-gray-700">
          <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Trophy className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-white text-2xl font-heading font-medium mb-2">Workout Complete!</h2>
          <p className="text-gray-400">Great job finishing your workout</p>
        </div>

        {/* Workout Info */}
        <div className="p-6 border-b border-gray-700">
          <h3 className="text-white font-heading font-medium text-lg mb-4">{summary.workoutTitle}</h3>
          
          {/* Key Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-[#C3A869] mb-1">
                <Clock className="w-4 h-4" />
              </div>
              <div className="text-white font-medium">{formatTime(summary.duration)}</div>
              <div className="text-gray-400 text-sm">Duration</div>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-[#C3A869] mb-1">
                <Hash className="w-4 h-4" />
              </div>
              <div className="text-white font-medium">{summary.completedSets}/{summary.totalSets}</div>
              <div className="text-gray-400 text-sm">Sets</div>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-[#C3A869] mb-1">
                <RotateCcw className="w-4 h-4" />
              </div>
              <div className="text-white font-medium">{summary.totalReps}</div>
              <div className="text-gray-400 text-sm">Total Reps</div>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-[#C3A869] mb-1">
                <Weight className="w-4 h-4" />
              </div>
              <div className="text-white font-medium">{formatWeight(summary.totalWeight)}</div>
              <div className="text-gray-400 text-sm">Volume</div>
            </div>
          </div>

          {/* Completion Rate */}
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-400 text-sm">Completion Rate</span>
              <span className="text-white font-medium">{completionRate}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div 
                className="bg-[#C3A869] h-2 rounded-full transition-all duration-500" 
                style={{ width: `${completionRate}%` }}
              />
            </div>
          </div>
        </div>

        {/* Exercise Breakdown */}
        <div className="p-6 border-b border-gray-700">
          <h4 className="text-white font-heading font-medium mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            Exercises Completed
          </h4>
          
          <div className="space-y-3">
            {summary.exercises.map((exercise, index) => (
              <div key={index} className="bg-gray-800 rounded-lg p-3">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-white font-medium">{exercise.name}</div>
                    <div className="text-gray-400 text-sm">
                      {exercise.sets} sets • {exercise.reps} reps
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[#C3A869] font-medium">
                      {formatWeight(exercise.weight)}
                    </div>
                    <div className="text-gray-400 text-sm">Total Volume</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Session Notes */}
        {summary.notes && (
          <div className="p-6 border-b border-gray-700">
            <h4 className="text-white font-heading font-medium mb-2">Session Notes</h4>
            <p className="text-gray-400 text-sm">{summary.notes}</p>
          </div>
        )}

        {/* Actions */}
        <div className="p-6 flex gap-3">
          <button
            onClick={onReturnToWorkouts}
            className="flex-1 bg-[#C3A869] text-black py-3 rounded-lg font-medium hover:bg-[#C3A869]/80 transition"
          >
            Back to Workouts
          </button>
          <button
            onClick={onClose}
            className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}