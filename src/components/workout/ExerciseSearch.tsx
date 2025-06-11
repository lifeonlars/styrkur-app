'use client'

import { useState, useEffect } from 'react'
import { Search } from 'lucide-react'
import { Exercise, ExerciseFilter, MuscleGroup } from '@/types'
import { fetchExercises, muscleGroupFilters } from '@/lib/wger'
import EnhancedExerciseCard from './EnhancedExerciseCard'

interface ExerciseSearchProps {
  onExerciseSelect?: (exercise: Exercise) => void
  onSelectExercise?: (exercise: Exercise) => void // Alternative prop name for consistency
  onClose?: () => void
  selectedExercises?: string[] // Array of exercise IDs that are already selected
}

export default function ExerciseSearch({ 
  onExerciseSelect, 
  onSelectExercise, 
  onClose,
  selectedExercises = []
}: ExerciseSearchProps) {
  const [exercises, setExercises] = useState<Exercise[]>([])
  const [filteredExercises, setFilteredExercises] = useState<Exercise[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState<MuscleGroup | 'all'>('all')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadExercises()
  }, [])

  const loadExercises = async () => {
    setLoading(true)
    try {
      const results = await fetchExercises({ limit: 100 })
      setExercises(results)
      setFilteredExercises(results)
    } catch (error) {
      console.error('Failed to load exercises:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = async (query: string) => {
    setSearchTerm(query)
    
    // Always apply both search and muscle group filter together
    setLoading(true)
    try {
      if (query.length === 0) {
        // No search term - just filter by muscle group
        const results = await fetchExercises({ 
          muscleGroup: selectedMuscleGroup,
          limit: 50 
        })
        setFilteredExercises(results)
      } else if (query.length < 3) {
        // Filter locally for 1-2 characters
        let filtered = exercises.filter(ex => {
          const matchesSearch = ex.name.toLowerCase().includes(query.toLowerCase()) ||
            ex.target.toLowerCase().includes(query.toLowerCase()) ||
            ex.bodyPart.toLowerCase().includes(query.toLowerCase()) ||
            ex.equipment.toLowerCase().includes(query.toLowerCase()) ||
            ex.primaryMuscles.some(muscle => muscle.toLowerCase().includes(query.toLowerCase()))
          
          const matchesMuscleGroup = selectedMuscleGroup === 'all' || ex.muscleGroup === selectedMuscleGroup
          
          return matchesSearch && matchesMuscleGroup
        })
        
        setFilteredExercises(filtered.slice(0, 15))
      } else {
        // Search API for 3+ characters with muscle group filter
        const results = await fetchExercises({ 
          search: query, 
          muscleGroup: selectedMuscleGroup,
          limit: 15 
        })
        setFilteredExercises(results)
      }
    } catch (error) {
      console.error('Search failed:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleMuscleGroupFilter = async (muscleGroup: MuscleGroup | 'all') => {
    setSelectedMuscleGroup(muscleGroup)
    // DON'T clear search term - preserve it across filter switches
    
    setLoading(true)
    try {
      const results = await fetchExercises({ 
        muscleGroup,
        search: searchTerm, // Include current search term
        limit: 50 
      })
      setFilteredExercises(results)
    } catch (error) {
      console.error('Filter failed:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      {/* Header with Close Button */}
      {onClose && (
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h3 className="text-white font-medium">Select Exercise</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}
      
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search exercises... (e.g., kettlebell, squat, press)"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full bg-gray-800 text-white pl-10 pr-4 py-3 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
        />
        {searchTerm.length > 0 && searchTerm.length < 3 && (
          <div className="absolute right-3 top-3 text-xs text-gray-500">
            {3 - searchTerm.length} more chars for search
          </div>
        )}
        {loading && (
          <div className="absolute right-3 top-3">
            <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>

      {/* Muscle Group Filter */}
      <div className="flex gap-2 overflow-x-auto">
        {muscleGroupFilters.map(filter => (
          <button
            key={filter.id}
            onClick={() => handleMuscleGroupFilter(filter.id as MuscleGroup | 'all')}
            className={`px-3 py-1 rounded-lg text-xs whitespace-nowrap transition flex items-center gap-1 ${
              selectedMuscleGroup === filter.id
                ? 'bg-[#C3A869] text-black font-medium'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            <span className="text-sm">{filter.icon}</span>
            {filter.label}
          </button>
        ))}
      </div>
      
      {/* Exercise List */}
      <div className="max-h-60 overflow-y-auto">
        {loading ? (
          <div className="text-center py-8">
            <div className="text-primary text-2xl mb-2">⚡</div>
            <div className="text-gray-400">
              {searchTerm.length >= 3 ? `Searching for "${searchTerm}"...` : 'Loading exercises...'}
            </div>
          </div>
        ) : filteredExercises.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-gray-400 text-sm">
              {searchTerm.length > 0 
                ? `No exercises found for "${searchTerm}". Try different keywords.`
                : 'No exercises available'
              }
            </div>
            {searchTerm.length > 0 && (
              <div className="text-gray-500 text-xs mt-2">
                Try: "kettlebell", "squat", "press", "pull"
              </div>
            )}
          </div>
        ) : (
          <>
            <div className="space-y-2">
              {filteredExercises
                .filter(exercise => !selectedExercises.includes(exercise.id))
                .slice(0, 15)
                .map(exercise => (
                <EnhancedExerciseCard
                  key={exercise.id}
                  exercise={exercise}
                  onAdd={onExerciseSelect || onSelectExercise || (() => {})}
                />
              ))}
            </div>
            {filteredExercises.length > 15 && (
              <div className="text-center py-2 text-gray-400 text-xs">
                Showing first 15 of {filteredExercises.length} results. Be more specific to narrow down.
              </div>
            )}
            {searchTerm.length > 0 && (
              <div className="text-center py-2">
                <button
                  onClick={() => handleSearch('')}
                  className="text-xs text-gray-400 hover:text-gray-300"
                >
                  Clear search
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}