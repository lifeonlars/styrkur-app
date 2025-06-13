'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import { Input } from '@heroui/input'
import { Textarea } from '@heroui/input'
import { Exercise, ExerciseConfig } from '@/types'
import { categoryMapping } from '@/lib/wger'

interface ExerciseConfigModalProps {
  exercise: Exercise
  onConfirm: (config: ExerciseConfig) => void
  onCancel: () => void
}

export default function ExerciseConfigModal({ exercise, onConfirm, onCancel }: ExerciseConfigModalProps) {
  const [config, setConfig] = useState<ExerciseConfig>({
    exerciseId: exercise.id,
    sets: 3,
    reps: 10,
    weight: exercise.isWeighted ? 20 : 0,
    rest: 90,
    tempo: '',
    notes: exercise.cues || '' // Prefill with extracted cues from API
  })
  
  const [imageError, setImageError] = useState(false)
  const [showFullscreenImage, setShowFullscreenImage] = useState(false)
  
  const handleImageError = () => {
    setImageError(true)
  }

  const handleSubmit = () => {
    onConfirm(config)
  }

  const formatExerciseInfo = (exercise: Exercise): string => {
    const equipment = exercise.equipment || 'Unknown'
    
    // Use WGER category if available, otherwise use muscle group
    let category = ''
    if (exercise.category && categoryMapping[exercise.category]) {
      category = categoryMapping[exercise.category]
      // Capitalize first letter
      category = category.charAt(0).toUpperCase() + category.slice(1)
    } else if (exercise.muscleGroup) {
      category = exercise.muscleGroup.charAt(0).toUpperCase() + exercise.muscleGroup.slice(1)
    } else {
      category = 'Unknown'
    }

    return `${equipment} | ${category}`
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[100] md:p-4">
      <div className="bg-background w-full max-w-md lg:max-w-2xl md:rounded-2xl overflow-hidden h-full md:h-auto md:max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="p-4 border-b border-gray-800 flex justify-between items-center">
          <h3 className="text-white text-lg font-medium">Configure Exercise</h3>
          <button onClick={onCancel} className="text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4">
          {/* Exercise Info with Image */}
          <div className="mb-6">
            {/* Exercise Image */}
            <div className="relative mb-4">
              {exercise.imageUrl && !imageError ? (
                <div className="w-full max-w-sm mx-auto">
                  <img
                    src={exercise.imageUrl}
                    alt={exercise.name}
                    className="w-full h-auto object-contain rounded-xl bg-content1 max-h-48 cursor-pointer hover:opacity-80 transition"
                    onError={handleImageError}
                    onClick={() => setShowFullscreenImage(true)}
                  />
                  {exercise.hasRealImage && (
                    <div className="absolute top-2 right-2 bg-[#C3A869] text-black text-xs px-2 py-1 rounded">
                      WGER Image
                    </div>
                  )}
                  <div className="text-center mt-2">
                    <button
                      onClick={() => setShowFullscreenImage(true)}
                      className="text-[#C3A869] text-sm hover:text-[#C3A869]/80"
                    >
                      Click to view fullscreen
                    </button>
                  </div>
                </div>
              ) : (
                <div className="w-24 h-24 mx-auto bg-content1 rounded-xl flex items-center justify-center">
                  <span className="text-2xl text-gray-400">No Image</span>
                </div>
              )}
            </div>
            
            {/* Exercise Details */}
            <div className="bg-content1 rounded-xl p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="text-white font-medium text-lg mb-1">{exercise.name}</div>
                  <div className="text-gray-400 text-sm mb-2">
                    {formatExerciseInfo(exercise)}
                    {exercise.intensity && exercise.intensity !== 'undefined' && (
                      <span className="ml-2 text-[#C3A869]">• {exercise.intensity} Intensity</span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-[#C3A869]/20 text-[#C3A869] text-xs px-2 py-1 rounded">
                      {exercise.muscleGroup.charAt(0).toUpperCase() + exercise.muscleGroup.slice(1)}
                    </span>
                    {exercise.isWeighted && (
                      <span className="bg-blue-500/20 text-blue-400 text-xs px-2 py-1 rounded">
                        Weighted
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Configuration Form */}
          <div className="space-y-4">
            {/* Sets and Reps */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 text-sm mb-2">Sets</label>
                <Input
                  type="number"
                  min="1"
                  max="10"
                  value={config.sets?.toString() || '3'}
                  onChange={(e) => setConfig(prev => ({ ...prev, sets: parseInt(e.target.value) || 1 }))}
                  variant="bordered"
                  classNames={{
                    input: "text-white",
                    inputWrapper: "!bg-content1 !border-divider hover:!border-primary/50 focus-within:!border-primary focus-within:!bg-content2"
                  }}
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-2">Reps</label>
                <Input
                  type="number"
                  min="1"
                  max="50"
                  value={config.reps?.toString() || '10'}
                  onChange={(e) => setConfig(prev => ({ ...prev, reps: parseInt(e.target.value) || 1 }))}
                  variant="bordered"
                  classNames={{
                    input: "text-white",
                    inputWrapper: "!bg-content1 !border-divider hover:!border-primary/50 focus-within:!border-primary focus-within:!bg-content2"
                  }}
                />
              </div>
            </div>

            {/* Weight (if applicable) */}
            {exercise.isWeighted && (
              <div>
                <label className="block text-gray-300 text-sm mb-2">Weight (kg)</label>
                <Input
                  type="number"
                  min="0"
                  step="0.5"
                  value={config.weight?.toString() || '0'}
                  onChange={(e) => setConfig(prev => ({ ...prev, weight: parseFloat(e.target.value) || 0 }))}
                  variant="bordered"
                  classNames={{
                    input: "text-white",
                    inputWrapper: "!bg-content1 !border-divider hover:!border-primary/50 focus-within:!border-primary focus-within:!bg-content2"
                  }}
                />
              </div>
            )}

            {/* Rest and RPE */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 text-sm mb-2">Rest (sec)</label>
                <Input
                  type="number"
                  min="15"
                  max="300"
                  step="15"
                  value={config.rest?.toString() || '90'}
                  onChange={(e) => setConfig(prev => ({ ...prev, rest: parseInt(e.target.value) || 60 }))}
                  variant="bordered"
                  classNames={{
                    input: "text-white",
                    inputWrapper: "!bg-content1 !border-divider hover:!border-primary/50 focus-within:!border-primary focus-within:!bg-content2"
                  }}
                />
              </div>
            </div>

            {/* Tempo */}
            <div>
              <label className="block text-gray-300 text-sm mb-2">Tempo (optional)</label>
              <Input
                type="text"
                placeholder="e.g., 3-0-1-1"
                value={config.tempo}
                onChange={(e) => setConfig(prev => ({ ...prev, tempo: e.target.value }))}
                variant="bordered"
                classNames={{
                  input: "text-white",
                  inputWrapper: "bg-content1 border-divider hover:border-primary/50 focus-within:!border-primary focus-within:!bg-content2"
                }}
              />
            </div>

            {/* Notes */}
            <div>
              <label className="block text-gray-300 text-sm mb-2">Notes (optional)</label>
              <Textarea
                placeholder="Exercise cues, modifications, etc."
                value={config.notes}
                onChange={(e) => setConfig(prev => ({ ...prev, notes: e.target.value }))}
                variant="bordered"
                minRows={3}
                maxRows={4}
                classNames={{
                  input: "text-white",
                  inputWrapper: "bg-content1 border-divider hover:border-primary/50 focus-within:!border-primary focus-within:!bg-content2"
                }}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-6">
            <button
              onClick={handleSubmit}
              className="flex-1 btn-primary py-3 rounded-xl font-medium"
            >
              Add to Workout
            </button>
            <button
              onClick={onCancel}
              className="flex-1 bg-content2 text-white py-3 rounded-xl font-medium hover:bg-gray-600 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>

      {/* Fullscreen Image Modal */}
      {showFullscreenImage && exercise.imageUrl && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-[110] p-4">
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={() => setShowFullscreenImage(false)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
            >
              <X className="w-8 h-8" />
            </button>
            <img
              src={exercise.imageUrl}
              alt={exercise.name}
              className="max-w-full max-h-full object-contain"
              onError={handleImageError}
            />
            <div className="absolute bottom-4 left-4 text-white bg-black bg-opacity-50 px-4 py-2 rounded">
              <div className="font-medium">{exercise.name}</div>
              {exercise.hasRealImage && (
                <div className="text-sm text-[#C3A869]">WGER Exercise Image</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}