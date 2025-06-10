'use client'

import { useState, useEffect } from 'react'
import { X, Plus } from 'lucide-react'
import { Workout, WorkoutForm, WorkoutEntry, ExerciseConfig, Exercise } from '@/types'
import { fetchExercises } from '@/lib/wger'
import WorkoutEntryCard from './WorkoutEntryCard'
import AddGroupModal from './AddGroupModal'

interface WorkoutFormModalProps {
  onSave: (workout: Workout) => void
  onClose: () => void
  initialWorkout?: Workout
}

export default function WorkoutFormModal({ onSave, onClose, initialWorkout }: WorkoutFormModalProps) {
  const [workoutForm, setWorkoutForm] = useState<WorkoutForm>({
    title: initialWorkout?.title || '',
    description: initialWorkout?.description || '',
    entries: initialWorkout?.entries || []
  })
  const [exercises, setExercises] = useState<Exercise[]>([])
  const [showAddGroup, setShowAddGroup] = useState(false)
  const [editingEntry, setEditingEntry] = useState<WorkoutEntry | null>(null)

  // Load exercises for lookup
  useEffect(() => {
    const loadExercises = async () => {
      try {
        const allExercises = await fetchExercises({ limit: 100 })
        setExercises(allExercises)
      } catch (error) {
        console.error('Failed to load exercises:', error)
      }
    }
    loadExercises()
  }, [])

  const handleAddGroup = (entry: WorkoutEntry) => {
    setWorkoutForm(prev => ({
      ...prev,
      entries: [...prev.entries, entry]
    }))
    setShowAddGroup(false)
  }

  const handleEditGroup = (entry: WorkoutEntry) => {
    setWorkoutForm(prev => ({
      ...prev,
      entries: prev.entries.map(e => e.id === entry.id ? entry : e)
    }))
    setEditingEntry(null)
  }

  const handleDeleteGroup = (entryId: string) => {
    setWorkoutForm(prev => ({
      ...prev,
      entries: prev.entries.filter(e => e.id !== entryId)
    }))
  }

  const handleEditExercise = (entryId: string, exerciseIndex: number, config: ExerciseConfig) => {
    setWorkoutForm(prev => ({
      ...prev,
      entries: prev.entries.map(entry => 
        entry.id === entryId
          ? {
              ...entry,
              exercises: entry.exercises.map((ex, i) => 
                i === exerciseIndex ? { ...ex, ...config } : ex
              )
            }
          : entry
      )
    }))
  }

  const moveEntryUp = (index: number) => {
    if (index > 0) {
      setWorkoutForm(prev => {
        const newEntries = [...prev.entries]
        const temp = newEntries[index]
        newEntries[index] = newEntries[index - 1]
        newEntries[index - 1] = temp
        return { ...prev, entries: newEntries }
      })
    }
  }

  const moveEntryDown = (index: number) => {
    if (index < workoutForm.entries.length - 1) {
      setWorkoutForm(prev => {
        const newEntries = [...prev.entries]
        const temp = newEntries[index]
        newEntries[index] = newEntries[index + 1]
        newEntries[index + 1] = temp
        return { ...prev, entries: newEntries }
      })
    }
  }

  const handleSave = () => {
    const workout: Workout = {
      id: initialWorkout?.id || Date.now(),
      title: workoutForm.title,
      description: workoutForm.description,
      entries: workoutForm.entries,
      tags: initialWorkout?.tags || [],
      createdAt: initialWorkout?.createdAt || new Date(),
      updatedAt: new Date()
    }
    onSave(workout)
  }

  const canSave = workoutForm.title.trim() && workoutForm.entries.length > 0

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[100] p-4">
      <div className="bg-gray-900 w-full max-w-4xl rounded-2xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-800 flex justify-between items-center">
          <h2 className="text-white text-xl font-medium">
            {initialWorkout ? 'Edit Workout' : 'Create Workout'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-6">
            {/* Workout Details */}
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Workout Name</label>
                <input
                  type="text"
                  value={workoutForm.title}
                  onChange={(e) => setWorkoutForm(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="e.g., Upper Body Strength, HIIT Circuit"
                  className="w-full bg-gray-800 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C3A869]"
                />
              </div>
              
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Description (optional)</label>
                <textarea
                  value={workoutForm.description}
                  onChange={(e) => setWorkoutForm(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Brief description of the workout..."
                  className="w-full bg-gray-800 text-white p-3 rounded-lg h-20 resize-none focus:outline-none focus:ring-2 focus:ring-[#C3A869]"
                />
              </div>
            </div>

            {/* Workout Entries */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-white font-medium">
                  Workout Structure ({workoutForm.entries.length} groups)
                </h3>
                <button
                  onClick={() => setShowAddGroup(true)}
                  className="flex items-center gap-2 bg-[#C3A869] text-black px-4 py-2 rounded-lg font-medium hover:bg-[#C3A869]/80 transition"
                >
                  <Plus className="w-4 h-4" />
                  Add Group
                </button>
              </div>

              {workoutForm.entries.length === 0 ? (
                <div className="text-center py-12 text-gray-400">
                  <div className="text-4xl mb-4">💪</div>
                  <div className="text-lg mb-2">No exercises yet</div>
                  <div className="text-sm">Add your first exercise, superset, or circuit</div>
                </div>
              ) : (
                <div className="space-y-4">
                  {workoutForm.entries.map((entry, index) => (
                    <WorkoutEntryCard
                      key={entry.id}
                      entry={entry}
                      exercises={exercises}
                      onEdit={(entry) => setEditingEntry(entry)}
                      onDelete={handleDeleteGroup}
                      onEditExercise={handleEditExercise}
                      onMoveUp={() => moveEntryUp(index)}
                      onMoveDown={() => moveEntryDown(index)}
                      canMoveUp={index > 0}
                      canMoveDown={index < workoutForm.entries.length - 1}
                    />
                  ))}
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
            {initialWorkout ? 'Update Workout' : 'Create Workout'}
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-gray-700 text-white py-3 rounded-xl font-medium hover:bg-gray-600 transition"
          >
            Cancel
          </button>
        </div>
      </div>

      {/* Add Group Modal */}
      {showAddGroup && (
        <AddGroupModal
          onSave={handleAddGroup}
          onCancel={() => setShowAddGroup(false)}
        />
      )}

      {/* Edit Group Modal */}
      {editingEntry && (
        <AddGroupModal
          onSave={handleEditGroup}
          onCancel={() => setEditingEntry(null)}
          initialEntry={editingEntry}
        />
      )}
    </div>
  )
}