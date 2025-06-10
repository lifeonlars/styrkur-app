'use client'

import { useState, useEffect } from 'react'
import { Search, Filter } from 'lucide-react'
import { Exercise, MuscleGroup } from '@/types'
import { 
  fetchExercises, 
  muscleGroupFilters, 
  fetchMuscles,
  mapMuscleIdToGroup,
  getExerciseMuscleGroup 
} from '@/lib/wger'

/**
 * Demo component showcasing the improved muscle group filtering
 * This demonstrates how to use the new WGER API-based muscle groupings
 */
export default function MuscleGroupDemo() {
  const [exercises, setExercises] = useState<Exercise[]>([])
  const [selectedGroup, setSelectedGroup] = useState<MuscleGroup | 'all'>('all')
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  // Load all exercises on mount
  useEffect(() => {
    loadExercises()
  }, [])

  const loadExercises = async () => {
    setLoading(true)
    try {
      const results = await fetchExercises({ limit: 100 })
      setExercises(results)
      console.log('Loaded exercises with muscle groups:', results.map(ex => ({
        name: ex.name,
        muscleGroup: ex.muscleGroup,
        primaryMuscles: ex.primaryMuscles
      })))
    } catch (error) {
      console.error('Failed to load exercises:', error)
    } finally {
      setLoading(false)
    }
  }

  const filterByMuscleGroup = async (group: MuscleGroup | 'all') => {
    setSelectedGroup(group)
    setLoading(true)
    
    try {
      const results = await fetchExercises({
        muscleGroup: group,
        search: searchTerm,
        limit: 50
      })
      setExercises(results)
    } catch (error) {
      console.error('Filter failed:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = async (term: string) => {
    setSearchTerm(term)
    setLoading(true)
    
    try {
      const results = await fetchExercises({
        search: term,
        muscleGroup: selectedGroup,
        limit: 50
      })
      setExercises(results)
    } catch (error) {
      console.error('Search failed:', error)
    } finally {
      setLoading(false)
    }
  }

  // Group exercises by muscle group for stats
  const exerciseStats = exercises.reduce((acc, exercise) => {
    acc[exercise.muscleGroup] = (acc[exercise.muscleGroup] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-white mb-2">
          🏋️ Syrkur Saga Muscle Group Filter Demo
        </h1>
        <p className="text-gray-400">
          Improved filtering using actual WGER API muscle data
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search exercises..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full bg-gray-800 text-white pl-10 pr-4 py-3 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C3A869]"
        />
      </div>

      {/* Muscle Group Filter Buttons */}
      <div className="space-y-3">
        <h3 className="text-white font-medium flex items-center gap-2">
          <Filter className="w-4 h-4" />
          Filter by Muscle Group
        </h3>
        <div className="flex flex-wrap gap-2">
          {muscleGroupFilters.map(filter => (
            <button
              key={filter.id}
              onClick={() => filterByMuscleGroup(filter.id as MuscleGroup | 'all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                selectedGroup === filter.id
                  ? 'bg-[#C3A869] text-black shadow-lg'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              <span className="text-lg">{filter.icon}</span>
              {filter.label}
              {exerciseStats[filter.id] && (
                <span className={`px-2 py-1 rounded-full text-xs ${
                  selectedGroup === filter.id 
                    ? 'bg-black/20 text-black' 
                    : 'bg-gray-600 text-gray-300'
                }`}>
                  {exerciseStats[filter.id]}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Exercise Results */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="text-white font-medium">
            {selectedGroup === 'all' ? 'All Exercises' : `${muscleGroupFilters.find(f => f.id === selectedGroup)?.label} Exercises`}
          </h3>
          <span className="text-gray-400 text-sm">
            {exercises.length} exercise{exercises.length !== 1 ? 's' : ''}
          </span>
        </div>

        {loading ? (
          <div className="text-center py-8">
            <div className="text-[#C3A869] text-2xl mb-2">⚡</div>
            <div className="text-gray-400">Loading exercises...</div>
          </div>
        ) : exercises.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-gray-500 text-sm">
              No exercises found for the current filter
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {exercises.map(exercise => (
              <div
                key={exercise.id}
                className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{exercise.icon}</span>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-white font-medium text-sm mb-1">
                      {exercise.name}
                    </h4>
                    <div className="flex flex-wrap gap-2 text-xs">
                      <span className="bg-[#C3A869]/20 text-[#C3A869] px-2 py-1 rounded">
                        {exercise.muscleGroup.charAt(0).toUpperCase() + exercise.muscleGroup.slice(1)}
                      </span>
                      <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded">
                        {exercise.equipment}
                      </span>
                      {exercise.isWeighted && (
                        <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded">
                          Weighted
                        </span>
                      )}
                    </div>
                    <div className="mt-2 text-xs text-gray-400">
                      Primary: {exercise.primaryMuscles.join(', ')}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* API Info */}
      <div className="bg-gray-800 rounded-lg p-4">
        <h3 className="text-white font-medium mb-2">🔧 Technical Details</h3>
        <div className="text-sm text-gray-300 space-y-1">
          <p>• Using real WGER API muscle data (15 muscles mapped to 7 logical groups)</p>
          <p>• Smart "Full Body" detection for exercises with 3+ primary muscles</p>
          <p>• Improved filtering logic with muscle group precedence</p>
          <p>• Backward compatible with existing bodyPart filters</p>
        </div>
      </div>
    </div>
  )
}

// Example usage in your main app:
/*
import MuscleGroupDemo from '@/components/workout/MuscleGroupDemo'

// In your component
<MuscleGroupDemo />
*/