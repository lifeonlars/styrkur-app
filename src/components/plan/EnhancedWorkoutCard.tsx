import { Edit, Trash2, Calendar, Tag, Hash, Weight, RotateCcw } from 'lucide-react'
import { Button } from '@/ui/button'
import { Workout } from '@/types'
import { calculateWorkoutMetrics, formatWeight, getGroupTypeLabel } from '@/lib/workoutUtils'
import { getWorkoutGroupTypeIcon } from '@/lib/groupTypeUtils'

interface EnhancedWorkoutCardProps {
  workout: Workout
  onEdit: (workout: Workout) => void
  onDelete: (workout: Workout) => void
  searchTerm?: string
}

export default function EnhancedWorkoutCard({ 
  workout, 
  onEdit, 
  onDelete, 
  searchTerm = '' 
}: EnhancedWorkoutCardProps) {
  const metrics = calculateWorkoutMetrics(workout)
  
  // Get first 2-3 exercise names for preview
  const exercisePreview = metrics.exerciseNames.slice(0, 3).join(', ')
  const hasMoreExercises = metrics.exerciseNames.length > 3
  
  // Highlight search terms in title and description
  const highlightText = (text: string, term: string) => {
    if (!term.trim()) return text
    
    const regex = new RegExp(`(${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
    const parts = text.split(regex)
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <span key={index} className="bg-norse-gold/30 text-norse-gold px-1 rounded">
          {part}
        </span>
      ) : part
    )
  }

  return (
    <div className="bg-neu-surface depth-subtle surface-flat border-neu-subtle rounded-xl p-4 hover:border-neu-border transition">
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="text-white font-heading font-medium truncate">
              {highlightText(workout.title, searchTerm)}
            </h4>
            <div className="text-norse-gold" title={getGroupTypeLabel(metrics.hasSuperset, metrics.hasCircuit)}>
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
        
        <div className="flex gap-2 ml-4 flex-shrink-0">
          <Button
            onClick={() => onEdit(workout)}
            variant="flat"
            size="icon"
            className="text-white"
            title="Edit workout"
          >
            <Edit className="w-4 h-4" />
          </Button>
          
          <Button
            onClick={() => onDelete(workout)}
            variant="flat"
            size="icon"
            className="text-red-400 hover:text-red-300"
            title="Delete workout"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
          
          {/* Placeholder for future "Assign to Week" functionality */}
          <Button
            variant="flat"
            size="icon"
            className="text-gray-500 cursor-not-allowed"
            title="Assign to Week (Coming Soon)"
            disabled
          >
            <Calendar className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Workout Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
        <div className="flex items-center gap-1 text-sm">
          <Hash className="w-3 h-3 text-norse-gold" />
          <span className="text-gray-400">Sets:</span>
          <span className="text-white font-medium">{metrics.totalSets}</span>
        </div>
        
        <div className="flex items-center gap-1 text-sm">
          <RotateCcw className="w-3 h-3 text-norse-gold" />
          <span className="text-gray-400">Reps:</span>
          <span className="text-white font-medium">{metrics.totalReps}</span>
        </div>
        
        <div className="flex items-center gap-1 text-sm">
          <Weight className="w-3 h-3 text-norse-gold" />
          <span className="text-gray-400">Volume:</span>
          <span className="text-white font-medium">{formatWeight(metrics.totalWeight)}</span>
        </div>
        
        <div className="flex items-center gap-1 text-sm">
          <span className="text-norse-gold">💪</span>
          <span className="text-gray-400">Exercises:</span>
          <span className="text-white font-medium">{metrics.exerciseNames.length}</span>
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
                className="px-2 py-1 bg-neu-card text-gray-300 rounded text-sm"
              >
                {highlightText(tag, searchTerm)}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}