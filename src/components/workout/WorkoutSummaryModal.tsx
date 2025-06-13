'use client'

import React, { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { Workout, Exercise } from '@/types'
import { fetchExercises } from '@/lib/wger'
import WorkoutSummary from './WorkoutSummary'

interface WorkoutSummaryModalProps {
  workout: Workout
  isOpen: boolean
  onClose: () => void
}

export default function WorkoutSummaryModal({ workout, isOpen, onClose }: WorkoutSummaryModalProps) {
  const [exercises, setExercises] = useState<Exercise[]>([])
  const [loading, setLoading] = useState(true)

  // Load exercises for lookup
  useEffect(() => {
    const loadExercises = async () => {
      try {
        setLoading(true)
        const allExercises = await fetchExercises({ limit: 100 })
        setExercises(allExercises)
      } catch (error) {
        console.error('Failed to load exercises:', error)
      } finally {
        setLoading(false)
      }
    }

    if (isOpen) {
      loadExercises()
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[100] md:p-4">
      <div className="bg-gray-900 w-full max-w-4xl md:rounded-2xl h-full md:h-auto md:max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-800 flex justify-between items-center">
          <div>
            <h2 className="text-white text-xl font-medium font-heading">{workout.title}</h2>
            {workout.description && (
              <p className="text-gray-400 text-sm mt-1">{workout.description}</p>
            )}
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#C3A869]"></div>
              </div>
            ) : (
              <WorkoutSummary workout={workout} exercises={exercises} />
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-800">
          <button
            onClick={onClose}
            className="w-full bg-gray-700 text-white py-3 rounded-xl font-medium hover:bg-gray-600 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}