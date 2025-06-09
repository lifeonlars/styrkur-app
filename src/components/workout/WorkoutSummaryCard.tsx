import { Clock, Tag, RotateCcw, Play } from 'lucide-react'
import { Workout } from '@/types'

interface WorkoutSummaryCardProps {
  workout: Workout
  onStart?: (workout: Workout) => void
  onRepeat?: (workout: Workout) => void
  showActions?: boolean
  variant?: 'default' | 'recent' | 'scheduled'
}

export default function WorkoutSummaryCard({ 
  workout, 
  onStart, 
  onRepeat, 
  showActions = true,
  variant = 'default'
}: WorkoutSummaryCardProps) {
  const estimateWorkoutTime = (workout: Workout): string => {
    const exerciseCount = workout.entries?.length || workout.exercises?.length || 0
    const estimatedMinutes = exerciseCount * 8 // Rough estimate: 8 minutes per exercise group
    if (estimatedMinutes < 30) return '20-30 min'
    if (estimatedMinutes < 60) return '45-60 min'
    return '60+ min'
  }

  const formatDate = (date: Date | string): string => {
    const d = typeof date === 'string' ? new Date(date) : date
    return d.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    })
  }

  const getVariantStyles = () => {
    switch (variant) {
      case 'recent':
        return 'bg-gray-800/70 border border-gray-700'
      case 'scheduled':
        return 'bg-[#C3A869]/10 border border-[#C3A869]/30'
      default:
        return 'bg-gray-800 border border-gray-700'
    }
  }

  return (
    <div className={`rounded-xl p-4 hover:bg-opacity-80 transition card-hover ${getVariantStyles()}`}>
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h3 className="text-white font-medium mb-1">{workout.title}</h3>
          <p className="text-gray-400 text-sm mb-2">{workout.description}</p>
          
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <Tag className="w-3 h-3" />
              {workout.tags?.join(', ') || 'No tags'}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {estimateWorkoutTime(workout)}
            </span>
            {variant === 'recent' && workout.updatedAt && (
              <span className="text-[#C3A869]">
                {formatDate(workout.updatedAt)}
              </span>
            )}
          </div>
        </div>
        
        {showActions && (
          <div className="flex gap-2 ml-4">
            {variant === 'recent' && onRepeat && (
              <button
                onClick={() => onRepeat(workout)}
                className="bg-gray-700 text-white px-3 py-1 rounded text-sm hover:bg-gray-600 transition flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                Repeat
              </button>
            )}
            {onStart && (
              <button
                onClick={() => onStart(workout)}
                className="bg-[#C3A869] text-black px-3 py-1 rounded text-sm font-medium hover:bg-[#C3A869]/80 transition flex items-center gap-1"
              >
                <Play className="w-3 h-3" />
                {variant === 'scheduled' ? 'Start Workout' : 'Start'}
              </button>
            )}
          </div>
        )}
      </div>
      
      {variant === 'scheduled' && (
        <div className="text-xs text-[#C3A869] bg-[#C3A869]/10 px-2 py-1 rounded inline-block">
          Today's Scheduled Workout
        </div>
      )}
    </div>
  )
}