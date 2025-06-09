'use client'

import { useState, useEffect } from 'react'
import { X, Plus, Minus, ChevronUp, ChevronDown } from 'lucide-react'
import { ExerciseGroupType, TimingStyle, WorkoutEntry, ExerciseConfig, Exercise } from '@/types'
import { fetchExercises } from '@/lib/wger'
import ExerciseSearch from './ExerciseSearch'

interface AddGroupModalProps {
  onSave: (entry: WorkoutEntry) => void
  onCancel: () => void
  initialEntry?: WorkoutEntry // For editing existing entries
}

export default function AddGroupModal({ onSave, onCancel, initialEntry }: AddGroupModalProps) {
  const [groupType, setGroupType] = useState<ExerciseGroupType>(initialEntry?.type || 'single')
  const [label, setLabel] = useState(initialEntry?.label || '')
  const [exercises, setExercises] = useState<ExerciseConfig[]>(initialEntry?.exercises || [])
  const [sets, setSets] = useState(initialEntry?.sets || 3)
  const [rounds, setRounds] = useState(initialEntry?.rounds || 3)
  const [restBetweenExercises, setRestBetweenExercises] = useState(initialEntry?.restBetweenExercises || 15)
  const [restAfterGroup, setRestAfterGroup] = useState(initialEntry?.restAfterGroup || 90)
  const [timingStyle, setTimingStyle] = useState<TimingStyle | ''>(initialEntry?.timingStyle || '')
  const [showExerciseSearch, setShowExerciseSearch] = useState(false)
  const [availableExercises, setAvailableExercises] = useState<Exercise[]>([])

  // Load exercises for lookup
  useEffect(() => {
    const loadExercises = async () => {
      try {
        const allExercises = await fetchExercises({ limit: 100 })
        setAvailableExercises(allExercises)
      } catch (error) {
        console.error('Failed to load exercises:', error)
      }
    }
    loadExercises()
  }, [])

  const getExerciseData = (exerciseId: string): Exercise | undefined => {
    return availableExercises.find(ex => ex.id === exerciseId)
  }

  const getMinExercises = () => {
    switch (groupType) {
      case 'superset': return 2
      case 'circuit': return 3
      default: return 1
    }
  }

  const getMaxExercises = () => {
    switch (groupType) {
      case 'superset': return 3
      case 'circuit': return 10
      default: return 1
    }
  }

  const canAddExercise = exercises.length < getMaxExercises()
  const canRemoveExercise = exercises.length > getMinExercises()
  const canSave = exercises.length >= getMinExercises()

  const addExercise = (exercise: Exercise) => {
    const newConfig: ExerciseConfig = {
      exerciseId: exercise.id,
      reps: 10,
      weight: exercise.isWeighted ? 20 : 0,
      rest: groupType === 'single' ? 90 : 0,
      rpe: 7,
      tempo: '',
      notes: exercise.cues || ''
    }
    
    setExercises(prev => [...prev, newConfig])
    setShowExerciseSearch(false)
  }

  const removeExercise = (index: number) => {
    setExercises(prev => prev.filter((_, i) => i !== index))
  }

  const updateExercise = (index: number, updates: Partial<ExerciseConfig>) => {
    setExercises(prev => prev.map((ex, i) => 
      i === index ? { ...ex, ...updates } : ex
    ))
  }

  const moveExerciseUp = (index: number) => {
    if (index > 0) {
      setExercises(prev => {
        const newExercises = [...prev]
        const temp = newExercises[index]
        newExercises[index] = newExercises[index - 1]
        newExercises[index - 1] = temp
        return newExercises
      })
    }
  }

  const moveExerciseDown = (index: number) => {
    if (index < exercises.length - 1) {
      setExercises(prev => {
        const newExercises = [...prev]
        const temp = newExercises[index]
        newExercises[index] = newExercises[index + 1]
        newExercises[index + 1] = temp
        return newExercises
      })
    }
  }

  const handleSave = () => {
    const entry: WorkoutEntry = {
      id: initialEntry?.id || `entry_${Date.now()}`,
      type: groupType,
      label: label.trim() || undefined,
      exercises,
      sets,
      rounds: groupType === 'circuit' && rounds > 1 ? rounds : undefined,
      restBetweenExercises: groupType === 'circuit' && restBetweenExercises > 0 ? restBetweenExercises : undefined,
      restAfterGroup: restAfterGroup > 0 ? restAfterGroup : undefined,
      timingStyle: timingStyle || undefined
    }
    
    onSave(entry)
  }

  const getDefaultLabel = () => {
    switch (groupType) {
      case 'superset': return 'Superset A'
      case 'circuit': return 'Circuit 1'
      default: return ''
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 w-full max-w-4xl rounded-2xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-800 flex justify-between items-center">
          <h2 className="text-white text-xl font-medium">
            {initialEntry ? 'Edit Group' : 'Add Group'}
          </h2>
          <button onClick={onCancel} className="text-gray-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-6">
          {/* Group Type Selection */}
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-3">Group Type</label>
            <div className="grid grid-cols-3 gap-3">
              {(['single', 'superset', 'circuit'] as ExerciseGroupType[]).map(type => (
                <button
                  key={type}
                  onClick={() => setGroupType(type)}
                  className={`p-4 rounded-xl border text-center transition ${
                    groupType === type
                      ? 'border-[#C3A869] bg-[#C3A869]/10 text-[#C3A869]'
                      : 'border-gray-700 text-gray-300 hover:border-gray-600'
                  }`}
                >
                  <div className="text-2xl mb-2">
                    {type === 'single' ? '💪' : type === 'superset' ? '🔗' : '⚡'}
                  </div>
                  <div className="font-medium capitalize">{type}</div>
                  <div className="text-xs opacity-75 mt-1">
                    {type === 'single' && '1 exercise'}
                    {type === 'superset' && '2-3 exercises'}
                    {type === 'circuit' && '3-10 exercises'}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Label */}
          {groupType !== 'single' && (
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">Label (optional)</label>
              <input
                type="text"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                placeholder={getDefaultLabel()}
                className="w-full bg-gray-800 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C3A869]"
              />
            </div>
          )}

          {/* Sets */}
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">Sets</label>
            <input
              type="number"
              min="1"
              max="10"
              value={sets}
              onChange={(e) => setSets(parseInt(e.target.value) || 1)}
              className="w-full bg-gray-800 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C3A869]"
            />
          </div>

          {/* Circuit Settings */}
          {groupType === 'circuit' && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Rounds</label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={rounds}
                  onChange={(e) => setRounds(parseInt(e.target.value) || 1)}
                  className="w-full bg-gray-800 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C3A869]"
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Rest Between Exercises (sec)</label>
                <input
                  type="number"
                  min="0"
                  max="120"
                  step="5"
                  value={restBetweenExercises}
                  onChange={(e) => setRestBetweenExercises(parseInt(e.target.value) || 0)}
                  className="w-full bg-gray-800 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C3A869]"
                />
              </div>
            </div>
          )}

          {/* Timing Style */}
          {groupType === 'circuit' && (
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">Timing Style (optional)</label>
              <select
                value={timingStyle}
                onChange={(e) => setTimingStyle(e.target.value as TimingStyle | '')}
                className="w-full bg-gray-800 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C3A869]"
              >
                <option value="">None</option>
                <option value="AMRAP">AMRAP (As Many Rounds As Possible)</option>
                <option value="EMOM">EMOM (Every Minute On the Minute)</option>
                <option value="HIIT">HIIT (High Intensity Interval Training)</option>
              </select>
            </div>
          )}

          {/* Rest After Group */}
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">Rest After Group (sec)</label>
            <input
              type="number"
              min="0"
              max="300"
              step="15"
              value={restAfterGroup}
              onChange={(e) => setRestAfterGroup(parseInt(e.target.value) || 0)}
              className="w-full bg-gray-800 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C3A869]"
            />
          </div>

          {/* Exercises */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <label className="text-gray-300 text-sm font-medium">
                Exercises ({exercises.length}/{getMinExercises()}-{getMaxExercises()})
              </label>
              {canAddExercise && (
                <button
                  onClick={() => setShowExerciseSearch(true)}
                  className="flex items-center gap-2 bg-[#C3A869] text-black px-3 py-2 rounded-lg font-medium hover:bg-[#C3A869]/80 transition"
                >
                  <Plus className="w-4 h-4" />
                  Add Exercise
                </button>
              )}
            </div>

            <div className="space-y-3">
              {exercises.map((exerciseConfig, index) => {
                const exerciseData = getExerciseData(exerciseConfig.exerciseId)
                return (
                  <div key={index} className="bg-gray-800 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-lg">{exerciseData?.icon || '💪'}</span>
                        <div>
                          <div className="text-white font-medium">
                            {exerciseData?.name || 'Unknown Exercise'}
                          </div>
                          <div className="text-xs text-gray-400">
                            {exerciseData?.target} • {exerciseData?.equipment}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        {exercises.length > 1 && (
                          <>
                            <button
                              onClick={() => moveExerciseUp(index)}
                              disabled={index === 0}
                              className="p-1 text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                            >
                              <ChevronUp className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => moveExerciseDown(index)}
                              disabled={index === exercises.length - 1}
                              className="p-1 text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                            >
                              <ChevronDown className="w-4 h-4" />
                            </button>
                          </>
                        )}
                        {canRemoveExercise && (
                          <button
                            onClick={() => removeExercise(index)}
                            className="p-1 text-red-400 hover:text-red-300"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-gray-400 text-xs mb-1">Reps</label>
                      <input
                        type="number"
                        min="1"
                        max="50"
                        value={exerciseConfig.reps || 10}
                        onChange={(e) => updateExercise(index, { reps: parseInt(e.target.value) || 10 })}
                        className="w-full bg-gray-700 text-white p-2 rounded text-sm focus:outline-none focus:ring-1 focus:ring-[#C3A869]"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-xs mb-1">Weight (kg)</label>
                      <input
                        type="number"
                        min="0"
                        step="0.5"
                        value={exerciseConfig.weight || 0}
                        onChange={(e) => updateExercise(index, { weight: parseFloat(e.target.value) || 0 })}
                        className="w-full bg-gray-700 text-white p-2 rounded text-sm focus:outline-none focus:ring-1 focus:ring-[#C3A869]"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-xs mb-1">RPE</label>
                      <select
                        value={exerciseConfig.rpe || 7}
                        onChange={(e) => updateExercise(index, { rpe: parseInt(e.target.value) })}
                        className="w-full bg-gray-700 text-white p-2 rounded text-sm focus:outline-none focus:ring-1 focus:ring-[#C3A869]"
                      >
                        {[6, 7, 8, 9, 10].map(rpe => (
                          <option key={rpe} value={rpe}>{rpe}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  </div>
                )
              })}
            </div>

            {exercises.length < getMinExercises() && (
              <div className="text-center py-8 text-gray-400">
                <div className="text-lg mb-2">👆</div>
                <div>Add at least {getMinExercises()} exercise{getMinExercises() > 1 ? 's' : ''} to continue</div>
              </div>
            )}
          </div>
        </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-800 flex gap-3">
          <button
            onClick={handleSave}
            disabled={!canSave}
            className="flex-1 bg-[#C3A869] text-black py-3 rounded-xl font-medium hover:bg-[#C3A869]/80 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {initialEntry ? 'Update Group' : 'Add Group'}
          </button>
          <button
            onClick={onCancel}
            className="flex-1 bg-gray-700 text-white py-3 rounded-xl font-medium hover:bg-gray-600 transition"
          >
            Cancel
          </button>
        </div>
      </div>

      {/* Exercise Search Modal */}
      {showExerciseSearch && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-60 p-4">
          <div className="bg-gray-800 w-full max-w-2xl rounded-xl max-h-[80vh] overflow-hidden">
            <ExerciseSearch
              onSelectExercise={addExercise}
              onClose={() => setShowExerciseSearch(false)}
              selectedExercises={exercises.map(ex => ex.exerciseId)}
            />
          </div>
        </div>
      )}
    </div>
  )
}