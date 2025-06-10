import { useState, useCallback } from 'react'
import { Plus, Search, CheckCircle } from 'lucide-react'
import { Workout } from '@/types'
import WorkoutFormModal from '@/components/workout/WorkoutFormModal'
import EnhancedWorkoutCard from './EnhancedWorkoutCard'

interface WorkoutTabProps {
  workouts: Workout[]
  onSaveWorkout: (workout: Workout) => void
  onUpdateWorkout: (workout: Workout) => void
  onDeleteWorkout?: (workoutId: number) => void
}

export default function WorkoutTab({ 
  workouts, 
  onSaveWorkout, 
  onUpdateWorkout,
  onDeleteWorkout 
}: WorkoutTabProps) {
  const [showCreateWorkout, setShowCreateWorkout] = useState(false)
  const [editingWorkout, setEditingWorkout] = useState<Workout | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')

  const showSuccessToast = useCallback((message: string) => {
    setToastMessage(message)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }, [])

  const handleSaveWorkout = useCallback((workout: Workout) => {
    // Ensure unique ID for new workouts to prevent duplicates
    if (!editingWorkout) {
      const newWorkout = {
        ...workout,
        id: Date.now(), // Use timestamp for unique ID
        createdAt: new Date(),
        updatedAt: new Date()
      }
      onSaveWorkout(newWorkout)
      showSuccessToast('Workout created successfully!')
    } else {
      const updatedWorkout = {
        ...workout,
        updatedAt: new Date()
      }
      onUpdateWorkout(updatedWorkout)
      showSuccessToast('Workout updated successfully!')
    }
    
    setShowCreateWorkout(false)
    setEditingWorkout(null)
  }, [editingWorkout, onSaveWorkout, onUpdateWorkout, showSuccessToast])

  const handleCloseModal = useCallback(() => {
    setShowCreateWorkout(false)
    setEditingWorkout(null)
  }, [])

  const handleEditWorkout = useCallback((workout: Workout) => {
    setEditingWorkout(workout)
    setShowCreateWorkout(true)
  }, [])

  const handleDeleteWorkout = useCallback((workout: Workout) => {
    if (window.confirm(`Delete "${workout.title}"? This action cannot be undone.`)) {
      onDeleteWorkout?.(workout.id)
      showSuccessToast('Workout deleted successfully!')
    }
  }, [onDeleteWorkout, showSuccessToast])

  const filteredWorkouts = workouts.filter(workout =>
    workout.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    workout.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    workout.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  return (
    <div className="space-y-6">
      {/* Create Workout Section */}
      <div className="bg-gray-800 rounded-xl p-6">
        <div className="text-center">
          <div className="w-12 h-12 bg-[#C3A869]/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Plus className="w-6 h-6 text-[#C3A869]" />
          </div>
          <h3 className="text-white font-heading font-medium mb-2">Create New Workout</h3>
          <p className="text-gray-400 text-sm mb-4">
            Build standalone workouts with exercises, supersets, and circuits
          </p>
          <button
            onClick={() => setShowCreateWorkout(true)}
            className="bg-[#C3A869] text-black px-6 py-3 rounded-xl font-medium hover:bg-[#C3A869]/80 transition flex items-center gap-2 mx-auto"
          >
            <Plus className="w-5 h-5" />
            Create Workout
          </button>
        </div>
      </div>

      {/* Search and Filter */}
      {workouts.length > 0 && (
        <div className="space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search workouts by name, description, or tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-800 text-white pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C3A869] border border-gray-700"
            />
          </div>
          
          {/* Tag Filter Placeholder */}
          <div className="flex gap-2 flex-wrap">
            <span className="text-gray-400 text-sm">Tags:</span>
            {['strength', 'upper', 'lower', 'cardio', 'circuit'].map(tag => (
              <button
                key={tag}
                className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-sm hover:bg-gray-600 transition"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Workout List */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-white font-heading font-medium">
            Your Workouts ({filteredWorkouts.length})
          </h3>
          {workouts.length > 0 && (
            <div className="text-sm text-gray-500">
              {workouts.length} total workout{workouts.length !== 1 ? 's' : ''}
            </div>
          )}
        </div>

        {filteredWorkouts.length > 0 ? (
          <div className="space-y-3">
            {filteredWorkouts.map(workout => (
              <EnhancedWorkoutCard
                key={`workout-${workout.id}-${workout.updatedAt?.getTime() || workout.createdAt?.getTime()}`}
                workout={workout}
                onEdit={handleEditWorkout}
                onDelete={handleDeleteWorkout}
                searchTerm={searchTerm}
              />
            ))}
          </div>
        ) : (
          <div className="bg-gray-800/50 rounded-xl p-8 text-center border border-gray-700">
            <div className="text-4xl mb-4">💪</div>
            <h3 className="text-white font-heading font-medium mb-2">
              {searchTerm ? 'No workouts found' : 'No workouts yet'}
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              {searchTerm 
                ? 'Try adjusting your search terms or filters'
                : 'Create your first workout to get started with your training plan'
              }
            </p>
            {!searchTerm && (
              <button
                onClick={() => setShowCreateWorkout(true)}
                className="bg-[#C3A869] text-black px-6 py-2 rounded-lg font-medium hover:bg-[#C3A869]/80 transition"
              >
                Create First Workout
              </button>
            )}
          </div>
        )}
      </div>

      {/* Create Workout Modal */}
      {showCreateWorkout && (
        <WorkoutFormModal
          onSave={handleSaveWorkout}
          onClose={handleCloseModal}
          initialWorkout={editingWorkout || undefined}
        />
      )}

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-4 right-4 z-[100] animate-in slide-in-from-top duration-300">
          <div className="bg-green-800 border border-green-600 text-green-100 px-4 py-3 rounded-lg shadow-lg flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <span className="text-sm font-medium">{toastMessage}</span>
          </div>
        </div>
      )}
    </div>
  )
}