'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import { Exercise, ExerciseConfig } from '@/types'

interface ExerciseConfigModalProps {
  exercise: Exercise
  onConfirm: (config: ExerciseConfig) => void
  onCancel: () => void
}

export default function ExerciseConfigModal({ exercise, onConfirm, onCancel }: ExerciseConfigModalProps) {
  const [config, setConfig] = useState<ExerciseConfig>({
    sets: 3,
    reps: 10,
    weight: exercise.isWeighted ? 20 : 0,
    rest: 90,
    rpe: 7,
    tempo: '',
    notes: ''
  })

  const handleSubmit = () => {
    onConfirm(config)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 w-full max-w-md lg:max-w-lg rounded-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="p-4 border-b border-gray-800 flex justify-between items-center">
          <h3 className="text-white text-lg font-medium">Configure Exercise</h3>
          <button onClick={onCancel} className="text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4">
          {/* Exercise Info */}
          <div className="flex items-center mb-6 p-3 bg-gray-800 rounded-xl">
            <span className="text-2xl mr-3">{exercise.icon}</span>
            <div>
              <div className="text-white font-medium">{exercise.name}</div>
              <div className="text-gray-400 text-sm">{exercise.target}</div>
            </div>
          </div>

          {/* Configuration Form */}
          <div className="space-y-4">
            {/* Sets and Reps */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 text-sm mb-2">Sets</label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={config.sets}
                  onChange={(e) => setConfig(prev => ({ ...prev, sets: parseInt(e.target.value) || 1 }))}
                  className="w-full bg-gray-800 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-2">Reps</label>
                <input
                  type="number"
                  min="1"
                  max="50"
                  value={config.reps}
                  onChange={(e) => setConfig(prev => ({ ...prev, reps: parseInt(e.target.value) || 1 }))}
                  className="w-full bg-gray-800 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            {/* Weight (if applicable) */}
            {exercise.isWeighted && (
              <div>
                <label className="block text-gray-300 text-sm mb-2">Weight (kg)</label>
                <input
                  type="number"
                  min="0"
                  step="0.5"
                  value={config.weight}
                  onChange={(e) => setConfig(prev => ({ ...prev, weight: parseFloat(e.target.value) || 0 }))}
                  className="w-full bg-gray-800 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            )}

            {/* Rest and RPE */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 text-sm mb-2">Rest (sec)</label>
                <input
                  type="number"
                  min="15"
                  max="300"
                  step="15"
                  value={config.rest}
                  onChange={(e) => setConfig(prev => ({ ...prev, rest: parseInt(e.target.value) || 60 }))}
                  className="w-full bg-gray-800 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-2">RPE Target</label>
                <select
                  value={config.rpe}
                  onChange={(e) => setConfig(prev => ({ ...prev, rpe: parseInt(e.target.value) }))}
                  className="w-full bg-gray-800 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {[6, 7, 8, 9, 10].map(rpe => (
                    <option key={rpe} value={rpe}>{rpe}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Tempo */}
            <div>
              <label className="block text-gray-300 text-sm mb-2">Tempo (optional)</label>
              <input
                type="text"
                placeholder="e.g., 3-0-1-1"
                value={config.tempo}
                onChange={(e) => setConfig(prev => ({ ...prev, tempo: e.target.value }))}
                className="w-full bg-gray-800 text-white p-3 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Notes */}
            <div>
              <label className="block text-gray-300 text-sm mb-2">Notes (optional)</label>
              <textarea
                placeholder="Exercise cues, modifications, etc."
                value={config.notes}
                onChange={(e) => setConfig(prev => ({ ...prev, notes: e.target.value }))}
                className="w-full bg-gray-800 text-white p-3 rounded-lg placeholder-gray-400 h-20 resize-none focus:outline-none focus:ring-2 focus:ring-primary"
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
              className="flex-1 bg-gray-700 text-white py-3 rounded-xl font-medium hover:bg-gray-600 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}