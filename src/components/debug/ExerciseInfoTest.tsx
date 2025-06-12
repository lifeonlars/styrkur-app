'use client'

import { useState } from 'react'
import { Exercise } from '@/types'
import ExerciseInfoModal from '@/components/workout/ExerciseInfoModal'

// Test exercise data with more realistic muscle activation
const testExercise: Exercise = {
  id: '345',
  name: 'Kettlebell Swing',
  bodyPart: 'waist',
  equipment: 'Kettlebell',
  target: 'glutes',
  primaryMuscles: ['glutes', 'hamstrings'],
  secondaryMuscles: ['obliques', 'abs', 'trapezius'],
  primaryMuscleIds: [8, 11], // Glutes, Hamstrings
  secondaryMuscleIds: [14, 6, 9], // Obliques, Abs, Trapezius
  muscleGroup: 'full-body',
  instructions: [
    'Stand with feet wide apart, toes slightly turned out',
    'Hinge at hips and swing kettlebell between legs using explosive hip drive',
    'Drive through heels and snap hips forward to propel kettlebell to chest height',
    'Keep core engaged and maintain neutral spine throughout movement'
  ],
  category: 10,
  uuid: 'c788d643-150a-4ac7-97ef-84643c6419bf',
  icon: '🪓',
  isWeighted: true,
  description: 'Two Handed Russian Style Kettlebell swing. Stand with feet wide apart. Swing kettlebell between legs using hip drive to chest height.'
}

export default function ExerciseInfoTest() {
  const [showModal, setShowModal] = useState(false)
  const [showApiModal, setShowApiModal] = useState(false)

  return (
    <div className="p-8 space-y-4">
      <h2 className="text-white text-xl font-bold">Exercise Info Modal Test</h2>
      
      <div className="space-y-4">
        <button
          onClick={() => setShowModal(true)}
          className="bg-[#C3A869] text-black px-4 py-2 rounded-lg font-medium hover:bg-[#C3A869]/80"
        >
          Test with Mock Exercise (Kettlebell Swing)
        </button>
        
        <button
          onClick={() => setShowApiModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-500"
        >
          Test with WGER API (Exercise ID: 167 - Crunches)
        </button>
        
        <div className="text-gray-400 text-sm">
          <p>✅ Enhanced muscle map with custom SVGs and helmets</p>
          <p>✅ Mobile front/back toggle tabs</p>
          <p>✅ Hidden redundant titles and labels</p>
          <p>✅ Desktop: Side-by-side layout with "How to Perform" and "Key Cues" on the right</p>
          <p>✅ Expanded "Activated Muscles" card that fills available width</p>
          <p>✅ Mobile: Stacked layout with content below muscle map</p>
        </div>
      </div>

      {/* Modal with mock exercise */}
      <ExerciseInfoModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        exercise={testExercise}
      />

      {/* Modal with WGER API fetch */}
      <ExerciseInfoModal
        isOpen={showApiModal}
        onClose={() => setShowApiModal(false)}
        exerciseId="167"
      />
    </div>
  )
}