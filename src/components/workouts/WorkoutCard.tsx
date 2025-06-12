import React, { useState } from 'react'
import { Play, RotateCcw, Clock, Hash, Weight, Tag, Eye } from 'lucide-react'
import { Workout } from '@/types'
import { calculateWorkoutMetrics, formatWeight, getGroupTypeLabel } from '@/lib/workoutUtils'
import { getWorkoutGroupTypeIcon } from '@/lib/groupTypeUtils'
import MuscleMapModal from '@/components/muscle-map/MuscleMapModal'

interface WorkoutCardProps {
  workout: Workout
  variant: 'recent' | 'library'
  onStart: (workout: Workout) => void
  onRepeat?: (workout: Workout) => void
  searchTerm?: string
}

export default function WorkoutCard({ 
  workout, 
  variant, 
  onStart, 
  onRepeat, 
  searchTerm = '' 
}: WorkoutCardProps) {
  const [showMuscleMap, setShowMuscleMap] = useState(false)
  const metrics = calculateWorkoutMetrics(workout)
  
  // Get first 2-3 exercise names for preview
  const exercisePreview = metrics.exerciseNames.slice(0, 3).join(', ')
  const hasMoreExercises = metrics.exerciseNames.length > 3
  
  // Estimate duration (rough calculation: 3 min per set + rest)
  const estimatedDuration = Math.ceil(metrics.totalSets * 3.5)
  
  // Highlight search terms in text
  const highlightText = (text: string, term: string) => {
    if (!term.trim()) return text
    
    const regex = new RegExp(`(${term.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&')})`, 'gi')
    const parts = text.split(regex)
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <span key={index} className="bg-[#C3A869]/30 text-[#C3A869] px-1 rounded">
          {part}
        </span>
      ) : part
    )
  }

  return (
    <div className="bg-gray-800 rounded-xl p-4 border border-gray-700 hover:border-gray-600 transition">
      <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-3">
        <div className="flex-1 min-w-0 mb-3 md:mb-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-white font-heading font-medium truncate">
              {highlightText(workout.title, searchTerm)}
            </h3>
            <div className="text-[#C3A869]" title={getGroupTypeLabel(metrics.hasSuperset, metrics.hasCircuit)}>
              {getWorkoutGroupTypeIcon(metrics.hasSuperset, metrics.hasCircuit, { className: "w-5 h-5" })}
            </div>
          </div>
          
          {workout.description && (
            <p className="text-gray-400 text-sm mb-2 line-clamp-2">
              {highlightText(workout.description, searchTerm)}
            </p>
          )}
          
          {/* Exercise Preview */}
          {exercisePreview && (
            <p className="text-gray-500 text-sm mb-2 truncate">
              {exercisePreview}
              {hasMoreExercises && (
                <span className="text-gray-600"> +{metrics.exerciseNames.length - 3} more</span>
              )}
            </p>
          )}
        </div>
        
        <div className="flex gap-2 md:ml-4 flex-shrink-0">
          <button
            onClick={(e) => {
              e.stopPropagation()
              setShowMuscleMap(true)
            }}
            className="bg-gray-700 text-gray-400 p-2 rounded-lg hover:bg-gray-600 hover:text-[#C3A869] transition"
            title="View muscle map"
          >
            <Eye className="w-4 h-4" />
          </button>
          
          {variant === 'recent' && onRepeat && (
            <button
              onClick={() => onRepeat(workout)}
              className="bg-gray-700 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-600 transition flex items-center gap-1"
              title="Repeat workout"
            >
              <RotateCcw className="w-4 h-4" />
              <span className="hidden md:inline">Repeat</span>
            </button>
          )}
          
          <button
            onClick={() => onStart(workout)}
            className="bg-[#C3A869] text-black px-3 py-2 rounded-lg text-sm font-medium hover:bg-[#C3A869]/80 transition flex items-center gap-1"
            title={variant === 'recent' ? 'Start new session' : 'Start workout'}
          >
            <Play className="w-4 h-4" />
            <span className="hidden md:inline">Start</span>
          </button>
        </div>
      </div>

      {/* Workout Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
        <div className="flex items-center gap-1 text-sm">
          <Hash className="w-3 h-3 text-[#C3A869]" />
          <span className="text-gray-400">Sets:</span>
          <span className="text-white font-medium">{metrics.totalSets}</span>
        </div>
        
        <div className="flex items-center gap-1 text-sm">
          <RotateCcw className="w-3 h-3 text-[#C3A869]" />
          <span className="text-gray-400">Reps:</span>
          <span className="text-white font-medium">{metrics.totalReps}</span>
        </div>
        
        <div className="flex items-center gap-1 text-sm">
          <Weight className="w-3 h-3 text-[#C3A869]" />
          <span className="text-gray-400">Volume:</span>
          <span className="text-white font-medium">{formatWeight(metrics.totalWeight)}</span>
        </div>
        
        <div className="flex items-center gap-1 text-sm">
          <Clock className="w-3 h-3 text-[#C3A869]" />
          <span className="text-gray-400">~Duration:</span>
          <span className="text-white font-medium">{estimatedDuration}min</span>
        </div>
      </div>

      {/* Tags */}
      {workout.tags && workout.tags.length > 0 && (
        <div className="flex items-center gap-1 text-sm">
          <Tag className="w-3 h-3 text-gray-500" />
          <div className="flex gap-1 flex-wrap">
            {workout.tags.map(tag => (
              <span 
                key={tag} 
                className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-sm"
              >
                {highlightText(tag, searchTerm)}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Muscle Map Modal */}
      <MuscleMapModal
        isOpen={showMuscleMap}
        onClose={() => setShowMuscleMap(false)}
        workout={workout}
      />
    </div>
  )
}