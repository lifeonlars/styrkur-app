import { useState } from 'react'
import { Plus, Search, Tag, Edit, Trash2, Calendar } from 'lucide-react'
import { Workout } from '@/types'
import WorkoutFormModal from '@/components/workout/WorkoutFormModal'

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

  const handleSaveWorkout = (workout: Workout) => {
    if (editingWorkout) {
      onUpdateWorkout(workout)
    } else {
      onSaveWorkout(workout)
    }
    setShowCreateWorkout(false)
    setEditingWorkout(null)
  }

  const handleCloseModal = () => {
    setShowCreateWorkout(false)
    setEditingWorkout(null)
  }

  const handleEditWorkout = (workout: Workout) => {
    setEditingWorkout(workout)
    setShowCreateWorkout(true)
  }

  const handleDeleteWorkout = (workout: Workout) => {
    if (window.confirm(`Delete "${workout.title}"? This action cannot be undone.`)) {
      onDeleteWorkout?.(workout.id)
    }
  }

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
          <h3 className="text-white font-medium mb-2">Create New Workout</h3>
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
                className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs hover:bg-gray-600 transition"
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
          <h3 className="text-white font-medium">
            Your Workouts ({filteredWorkouts.length})
          </h3>
          {workouts.length > 0 && (
            <div className="text-xs text-gray-500">
              {workouts.length} total workout{workouts.length !== 1 ? 's' : ''}
            </div>
          )}
        </div>

        {filteredWorkouts.length > 0 ? (
          <div className="space-y-3">
            {filteredWorkouts.map(workout => (
              <div key={workout.id} className="bg-gray-800 rounded-xl p-4 border border-gray-700 hover:border-gray-600 transition">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h4 className="text-white font-medium mb-1">{workout.title}</h4>
                    <p className="text-gray-400 text-sm mb-2">{workout.description}</p>
                    
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span>{workout.entries?.length || workout.exercises?.length || 0} exercises</span>
                      {workout.tags && workout.tags.length > 0 && (
                        <div className="flex items-center gap-1">
                          <Tag className="w-3 h-3" />
                          <span>{workout.tags.join(', ')}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => handleEditWorkout(workout)}
                      className="bg-gray-700 text-white p-1 rounded hover:bg-gray-600 transition"
                      title="Edit workout"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    
                    {onDeleteWorkout && (
                      <button
                        onClick={() => handleDeleteWorkout(workout)}
                        className="bg-red-900/50 text-red-400 p-1 rounded hover:bg-red-900 transition"
                        title="Delete workout"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                    
                    {/* Placeholder for future "Assign to Week" functionality */}
                    <button
                      className="bg-gray-700/50 text-gray-500 p-1 rounded cursor-not-allowed"
                      title="Assign to Week (Coming Soon)"
                      disabled
                    >
                      <Calendar className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-800/50 rounded-xl p-8 text-center border border-gray-700">
            <div className="text-4xl mb-4">💪</div>
            <h3 className="text-white font-medium mb-2">
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
    </div>
  )
}