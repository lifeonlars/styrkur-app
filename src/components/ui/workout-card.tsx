'use client'

import React, { useState } from 'react'
import { Play, RotateCcw, Clock, Hash, Weight, Triangle, Eye, Copy } from 'lucide-react'
import { Workout } from '@/types'
import { Card } from '@/ui/card'
import { Button } from '@/ui/button'
import { calculateWorkoutMetrics, formatWeight, getGroupTypeLabel } from '@/lib/workoutUtils'
import { getWorkoutGroupTypeIcon } from '@/lib/groupTypeUtils'
import { cn } from '@/lib/utils'
import WorkoutSummaryModal from '@/components/workout/WorkoutSummaryModal'

interface WorkoutCardProps {
  workout: {
    id: number
    title: string
    description?: string
    entries?: Array<{
      id: string
      exercises: Array<{
        exerciseId: string
        sets?: number
        reps?: number
        weight?: number
      }>
      sets: number
    }>
    tags?: string[]
    lastCompleted?: string // ISO date string
    completionCount?: number
  }
  compact?: boolean // For grid layouts vs full layouts
  showLastCompleted?: boolean
  showCompletionCount?: boolean
  onStart?: (workout: any) => void
  onClone?: (workout: any) => void
  onSummaryClick?: (workout: any) => void
  className?: string
  searchTerm?: string
}

export default function WorkoutCard({
  workout,
  compact = false,
  showLastCompleted = true,
  showCompletionCount = true,
  onStart,
  onClone,
  onSummaryClick,
  className,
  searchTerm = ''
}: WorkoutCardProps) {
  const [showSummary, setShowSummary] = useState(false)
  
  // Calculate workout metrics
  const metrics = calculateWorkoutMetrics(workout as Workout)
  
  // Smart duration calculation
  const calculateEstimatedDuration = () => {
    const totalSets = metrics.totalSets
    const exerciseCount = metrics.exerciseNames.length
    
    // Formula: (sets × 45 seconds) + ((sets-1) × 90 seconds rest) + (exercises × 30 seconds setup)
    const estimatedSeconds = (totalSets * 45) + ((totalSets - 1) * 90) + (exerciseCount * 30)
    return Math.round(estimatedSeconds / 60)
  }
  
  const estimatedDuration = calculateEstimatedDuration()
  
  // Exercise preview formatting
  const getExercisePreview = () => {
    const names = metrics.exerciseNames.slice(0, compact ? 2 : 3)
    const remaining = metrics.exerciseNames.length - names.length
    
    if (names.length === 0) return 'No exercises'
    
    const preview = names.join(', ')
    return remaining > 0 ? `${preview} +${remaining} more` : preview
  }
  
  // Last completed date formatting
  const formatLastCompleted = (dateString?: string) => {
    if (!dateString) return null
    
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
    
    if (diffDays === 0) return 'Today'
    if (diffDays === 1) return 'Yesterday'
    if (diffDays < 7) return `${diffDays}d ago`
    if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`
    return `${Math.floor(diffDays / 30)}m ago`
  }
  
  // Highlight search terms
  const highlightText = (text: string, term: string) => {
    if (!term.trim()) return text
    
    const regex = new RegExp(`(${term.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&')})`, 'gi')
    const parts = text.split(regex)
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <span key={index} className="bg-norse-gold/30 text-norse-gold px-1 rounded">
          {part}
        </span>
      ) : part
    )
  }
  
  // Handle summary click
  const handleSummaryClick = () => {
    if (onSummaryClick) {
      onSummaryClick(workout)
    } else {
      setShowSummary(true)
    }
  }
  
  // Handle title click for summary
  const handleTitleClick = () => {
    handleSummaryClick()
  }
  
  // Stats configuration
  const getStatsToShow = () => {
    if (compact) {
      return [
        { icon: Hash, label: 'Exercises', value: metrics.exerciseNames.length },
        { icon: RotateCcw, label: 'Sets', value: metrics.totalSets },
        { icon: Hash, label: 'Reps', value: metrics.totalReps.toLocaleString() }
      ]
    }
    
    return [
      { icon: Hash, label: 'Exercises', value: metrics.exerciseNames.length },
      { icon: RotateCcw, label: 'Sets', value: metrics.totalSets },
      { icon: Hash, label: 'Reps', value: metrics.totalReps.toLocaleString() },
      { icon: Weight, label: 'Volume', value: formatWeight(metrics.totalWeight) },
      { icon: Clock, label: 'Duration', value: `${estimatedDuration}min` },
      { icon: Triangle, label: 'Max Weight', value: `${metrics.totalWeight > 0 ? Math.max(...workout.entries?.flatMap(e => e.exercises.map(ex => ex.weight || 0)) || [0]) : 0}kg` }
    ]
  }
  
  const statsToShow = getStatsToShow()
  
  if (compact) {
    return (
      <>
        <Card 
          depth="subtle" 
          surface="convex" 
          className={cn("p-4 hover:shadow-lg transition-shadow duration-200", className)}
        >
          {/* Title and Type Icon */}
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={handleTitleClick}
              className="flex items-center gap-2 text-left flex-1 hover:text-norse-gold transition-colors"
            >
              <h3 className="text-white font-heading font-medium text-sm truncate">
                {highlightText(workout.title, searchTerm)}
              </h3>
              <div className="text-norse-gold flex-shrink-0" title={getGroupTypeLabel(metrics.hasSuperset, metrics.hasCircuit)}>
                {getWorkoutGroupTypeIcon(metrics.hasSuperset, metrics.hasCircuit, { className: "w-4 h-4" })}
              </div>
            </button>
          </div>
          
          {/* Description */}
          {workout.description && (
            <p className="text-gray-400 text-xs mb-3 line-clamp-2">
              {highlightText(workout.description, searchTerm)}
            </p>
          )}
          
          {/* Exercise Preview */}
          <p className="text-gray-500 text-xs mb-3 truncate">
            {getExercisePreview()}
          </p>
          
          {/* Stats Grid - 3 stats for compact */}
          <div className="grid grid-cols-3 gap-2 mb-3">
            {statsToShow.map((stat, index) => (
              <div key={index} className="flex items-center gap-1">
                <div className="p-1 bg-neu-surface shadow-neu-flat rounded-lg">
                  <stat.icon className="w-3 h-3 text-norse-gold" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide">{stat.label}</p>
                  <p className="text-sm font-semibold text-white">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Footer with Last Completed and Start Button */}
          <div className="flex items-center justify-between">
            <div className="text-xs text-gray-500">
              {showLastCompleted && workout.lastCompleted && (
                <span>{formatLastCompleted(workout.lastCompleted)}</span>
              )}
              {showCompletionCount && workout.completionCount && (
                <span className="ml-2">• {workout.completionCount}x</span>
              )}
            </div>
            <Button
              variant="primary"
              size="icon"
              onClick={() => onStart?.(workout)}
              className="flex-shrink-0"
            >
              <Play className="w-3 h-3" />
            </Button>
          </div>
        </Card>
        
        {/* Summary Modal */}
        <WorkoutSummaryModal
          isOpen={showSummary}
          onClose={() => setShowSummary(false)}
          workout={workout as Workout}
        />
      </>
    )
  }
  
  // Full layout
  return (
    <>
      <Card 
        depth="subtle" 
        surface="convex" 
        className={cn("p-6 hover:shadow-lg transition-shadow duration-200", className)}
      >
        {/* Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
          <div className="flex-1 min-w-0 mb-3 md:mb-0">
            {/* Title with Type Icon */}
            <div className="flex items-center gap-2 mb-2">
              <button
                onClick={handleTitleClick}
                className="text-left hover:text-norse-gold transition-colors"
              >
                <h3 className="text-white font-heading font-medium text-lg">
                  {highlightText(workout.title, searchTerm)}
                </h3>
              </button>
              <div className="text-norse-gold" title={getGroupTypeLabel(metrics.hasSuperset, metrics.hasCircuit)}>
                {getWorkoutGroupTypeIcon(metrics.hasSuperset, metrics.hasCircuit, { className: "w-5 h-5" })}
              </div>
            </div>
            
            {/* Last Completed and Completion Count */}
            {(showLastCompleted || showCompletionCount) && (
              <div className="flex items-center gap-3 text-sm text-gray-400 mb-2">
                {showLastCompleted && workout.lastCompleted && (
                  <span>Last: {formatLastCompleted(workout.lastCompleted)}</span>
                )}
                {showCompletionCount && workout.completionCount && (
                  <span>Completed: {workout.completionCount}x</span>
                )}
              </div>
            )}
            
            {/* Description */}
            {workout.description && (
              <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                {highlightText(workout.description, searchTerm)}
              </p>
            )}
            
            {/* Exercise Preview */}
            <p className="text-gray-500 text-sm truncate">
              {getExercisePreview()}
            </p>
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-2 md:ml-4 flex-shrink-0">
            <Button
              variant="flat"
              size="icon"
              onClick={handleSummaryClick}
              title="View workout summary"
            >
              <Eye className="w-4 h-4" />
            </Button>
            
            {onClone && (
              <Button
                variant="outline"
                size="icon"
                onClick={() => onClone(workout)}
                title="Clone workout"
              >
                <Copy className="w-4 h-4" />
              </Button>
            )}
            
            <Button
              variant="primary"
              onClick={() => onStart?.(workout)}
              className="flex items-center gap-2"
            >
              <Play className="w-4 h-4" />
              <span className="hidden md:inline">Start</span>
            </Button>
          </div>
        </div>
        
        {/* Stats Grid - 6 stats for full layout */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-4">
          {statsToShow.map((stat, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="p-2 bg-neu-surface shadow-neu-flat rounded-lg">
                <stat.icon className="w-4 h-4 text-norse-gold" />
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide">{stat.label}</p>
                <p className="text-lg font-semibold text-white">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Tags */}
        {workout.tags && workout.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {workout.tags.map(tag => (
              <span 
                key={tag} 
                className="px-3 py-1 bg-neu-surface shadow-neu-flat text-gray-300 rounded-full text-sm"
              >
                {highlightText(tag, searchTerm)}
              </span>
            ))}
          </div>
        )}
      </Card>
      
      {/* Summary Modal */}
      <WorkoutSummaryModal
        isOpen={showSummary}
        onClose={() => setShowSummary(false)}
        workout={workout as Workout}
      />
    </>
  )
}