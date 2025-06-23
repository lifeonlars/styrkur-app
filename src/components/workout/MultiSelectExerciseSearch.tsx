'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { Search, Check, Plus, Eye, Filter } from 'lucide-react'
import { Input } from '@/ui/input'
import { Button } from '@/ui/button'
import { Card } from '@/ui/card'
import { Exercise, MuscleGroup } from '@/types'
import { fetchExercises, muscleGroupFilters, categoryMapping } from '@/lib/wger'
import { EnhancedSearchState } from '@/types/exercise-selection'
import ExerciseInfoModal from './ExerciseInfoModal'

// ================================================================================================
// COMPONENT PROPS
// ================================================================================================

interface MultiSelectExerciseSearchProps {
  isMultiSelectMode: boolean
  selectedExercises: Exercise[]
  selectedExerciseIds: Set<string>
  onExerciseSelect: (exercise: Exercise) => void
  onExerciseDeselect: (exerciseId: string) => void
  excludeExercises?: string[]
  maxSelections?: number
}

// ================================================================================================
// ENHANCED EXERCISE CARD
// ================================================================================================

interface MultiSelectExerciseCardProps {
  exercise: Exercise
  isSelected: boolean
  isDisabled: boolean
  isMultiSelectMode: boolean
  onSelect: (exercise: Exercise) => void
  onInfo: (exercise: Exercise) => void
}

function MultiSelectExerciseCard({
  exercise,
  isSelected,
  isDisabled,
  isMultiSelectMode,
  onSelect,
  onInfo
}: MultiSelectExerciseCardProps) {
  const formatExerciseInfo = (exercise: Exercise): string => {
    const equipment = exercise.equipment || 'Unknown'
    
    let category = ''
    if (exercise.category && categoryMapping[exercise.category]) {
      category = categoryMapping[exercise.category]
      category = category.charAt(0).toUpperCase() + category.slice(1)
    } else if (exercise.muscleGroup) {
      category = exercise.muscleGroup.charAt(0).toUpperCase() + exercise.muscleGroup.slice(1)
    } else {
      category = 'Unknown'
    }

    return `${equipment} | ${category}`
  }

  const handleCardClick = () => {
    if (!isDisabled) {
      onSelect(exercise)
    }
  }

  const handleInfoClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    onInfo(exercise)
  }

  return (
    <Card 
      className={`p-4 cursor-pointer transition-all duration-200 ${
        isSelected 
          ? 'border-2 border-primary bg-primary/5' 
          : 'hover:border-neu-light/20 hover:bg-neu-light/5'
      } ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      surface={isSelected ? "flat" : "convex"}
      depth={isSelected ? "subtle" : "subtle"}
      onClick={handleCardClick}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3">
            {isMultiSelectMode && (
              <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition ${
                isSelected 
                  ? 'bg-primary border-primary' 
                  : 'border-neu-light/30 hover:border-neu-light/50'
              }`}>
                {isSelected && <Check className="w-3 h-3 text-background" />}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <div className="text-white text-sm font-medium truncate">{exercise.name}</div>
              <div className="text-gray-400 text-xs mt-1">
                {formatExerciseInfo(exercise)}
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2 ml-4">
          {exercise.isWeighted && (
            <span className="text-xs bg-neu-light/10 text-neu-light px-2 py-1 rounded">
              Weighted
            </span>
          )}
          
          <Button
            variant="flat"
            size="default"
            onClick={handleInfoClick}
            className="p-2 h-8 w-8"
            title="View exercise info"
          >
            <Eye className="w-4 h-4" />
          </Button>
          
          {!isMultiSelectMode && (
            <Button
              variant="primary"
              size="default"
              className="p-2 h-8 w-8"
              title="Add exercise"
              disabled={isDisabled}
            >
              <Plus className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </Card>
  )
}

// ================================================================================================
// MAIN COMPONENT
// ================================================================================================

export default function MultiSelectExerciseSearch({
  isMultiSelectMode,
  selectedExercises,
  selectedExerciseIds,
  onExerciseSelect,
  onExerciseDeselect,
  excludeExercises = [],
  maxSelections = 15
}: MultiSelectExerciseSearchProps) {
  const [exercises, setExercises] = useState<Exercise[]>([])
  const [filteredExercises, setFilteredExercises] = useState<Exercise[]>([])
  const [loading, setLoading] = useState(false)
  const [showExerciseInfo, setShowExerciseInfo] = useState(false)
  const [selectedExerciseForInfo, setSelectedExerciseForInfo] = useState<Exercise | null>(null)
  const [showFilters, setShowFilters] = useState(false)
  
  const [searchState, setSearchState] = useState<EnhancedSearchState>({
    searchTerm: '',
    selectedMuscleGroup: 'all',
    selectedEquipment: [],
    showSelectedOnly: false,
    sortBy: 'name',
    resultsCount: 0,
    preserveSelection: true
  })

  // ================================================================================================
  // EFFECTS
  // ================================================================================================

  useEffect(() => {
    loadExercises()
  }, [])

  useEffect(() => {
    filterAndSortExercises()
  }, [searchState, exercises, selectedExercises, excludeExercises])

  // ================================================================================================
  // DATA LOADING
  // ================================================================================================

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

  // ================================================================================================
  // FILTERING AND SORTING
  // ================================================================================================

  const filterAndSortExercises = useCallback(() => {
    let filtered = [...exercises]

    // Apply search filter
    if (searchState.searchTerm.length > 0) {
      const searchTerm = searchState.searchTerm.toLowerCase()
      filtered = filtered.filter(ex => 
        ex.name.toLowerCase().includes(searchTerm) ||
        ex.target.toLowerCase().includes(searchTerm) ||
        ex.bodyPart.toLowerCase().includes(searchTerm) ||
        ex.equipment.toLowerCase().includes(searchTerm) ||
        ex.primaryMuscles.some(muscle => muscle.toLowerCase().includes(searchTerm))
      )
    }

    // Apply muscle group filter
    if (searchState.selectedMuscleGroup !== 'all') {
      filtered = filtered.filter(ex => ex.muscleGroup === searchState.selectedMuscleGroup)
    }

    // Apply equipment filter
    if (searchState.selectedEquipment.length > 0) {
      filtered = filtered.filter(ex => 
        searchState.selectedEquipment.some(equipment => 
          ex.equipment.toLowerCase().includes(equipment.toLowerCase())
        )
      )
    }

    // Apply exclusions
    if (excludeExercises.length > 0) {
      filtered = filtered.filter(ex => !excludeExercises.includes(ex.id))
    }

    // Apply "show selected only" filter
    if (searchState.showSelectedOnly) {
      filtered = filtered.filter(ex => selectedExerciseIds.has(ex.id))
    }

    // Sort exercises
    filtered.sort((a, b) => {
      switch (searchState.sortBy) {
        case 'name':
          return a.name.localeCompare(b.name)
        case 'muscle_group':
          return (a.muscleGroup || '').localeCompare(b.muscleGroup || '')
        case 'equipment':
          return a.equipment.localeCompare(b.equipment)
        default:
          return 0
      }
    })

    // Update state
    setFilteredExercises(filtered.slice(0, 50)) // Limit results
    setSearchState(prev => ({ ...prev, resultsCount: filtered.length }))
  }, [exercises, searchState, selectedExerciseIds, excludeExercises])

  // ================================================================================================
  // EVENT HANDLERS
  // ================================================================================================

  const handleSearch = (value: string) => {
    setSearchState(prev => ({ ...prev, searchTerm: value }))
  }

  const handleMuscleGroupFilter = (muscleGroup: string) => {
    setSearchState(prev => ({ 
      ...prev, 
      selectedMuscleGroup: muscleGroup as MuscleGroup | 'all'
    }))
  }

  const handleExerciseSelect = (exercise: Exercise) => {
    if (selectedExerciseIds.has(exercise.id)) {
      onExerciseDeselect(exercise.id)
    } else {
      onExerciseSelect(exercise)
    }
  }

  const handleExerciseInfo = (exercise: Exercise) => {
    setSelectedExerciseForInfo(exercise)
    setShowExerciseInfo(true)
  }

  const handleToggleFilters = () => {
    setShowFilters(!showFilters)
  }

  const handleToggleShowSelectedOnly = () => {
    setSearchState(prev => ({ 
      ...prev, 
      showSelectedOnly: !prev.showSelectedOnly 
    }))
  }

  const handleSortChange = (sortBy: EnhancedSearchState['sortBy']) => {
    setSearchState(prev => ({ ...prev, sortBy }))
  }

  // ================================================================================================
  // DERIVED STATE
  // ================================================================================================

  const isSelectionFull = selectedExercises.length >= maxSelections
  const hasActiveFilters = (
    searchState.selectedMuscleGroup !== 'all' ||
    searchState.selectedEquipment.length > 0 ||
    searchState.showSelectedOnly
  )

  // ================================================================================================
  // RENDER
  // ================================================================================================

  return (
    <div className="flex flex-col h-full">
      {/* Search Bar */}
      <div className="p-4 border-b border-neu-light/10">
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search exercises... (e.g., kettlebell, squat, press)"
            value={searchState.searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-10 pr-12"
          />
          <Button
            variant="flat"
            size="default"
            onClick={handleToggleFilters}
            className={`absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 ${
              hasActiveFilters ? 'text-primary' : 'text-gray-400'
            }`}
          >
            <Filter className="w-4 h-4" />
          </Button>
        </div>

        {/* Quick Filters */}
        {showFilters && (
          <div className="space-y-3 pt-3 border-t border-neu-light/10">
            {/* Muscle Group Filter */}
            <div>
              <label className="text-xs text-gray-400 mb-2 block">Muscle Group</label>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {muscleGroupFilters.map(filter => (
                  <Button
                    key={filter.id}
                    variant={searchState.selectedMuscleGroup === filter.id ? "primary" : "outline"}
                    size="default"
                    onClick={() => handleMuscleGroupFilter(filter.id)}
                    className="whitespace-nowrap"
                  >
                    {filter.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Advanced Options */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {isMultiSelectMode && (
                  <Button
                    variant={searchState.showSelectedOnly ? "primary" : "outline"}
                    size="default"
                    onClick={handleToggleShowSelectedOnly}
                    className="text-xs"
                  >
                    Selected ({selectedExercises.length})
                  </Button>
                )}
                
                <select
                  value={searchState.sortBy}
                  onChange={(e) => handleSortChange(e.target.value as EnhancedSearchState['sortBy'])}
                  className="text-xs bg-neu-dark border border-neu-light/20 rounded px-2 py-1"
                >
                  <option value="name">Sort by Name</option>
                  <option value="muscle_group">Sort by Muscle</option>
                  <option value="equipment">Sort by Equipment</option>
                </select>
              </div>
              
              <div className="text-xs text-gray-400">
                {searchState.resultsCount} result{searchState.resultsCount !== 1 ? 's' : ''}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Selection Status */}
      {isMultiSelectMode && (
        <div className="px-4 py-2 bg-neu-light/5 border-b border-neu-light/10">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">
              {selectedExercises.length} of {maxSelections} exercises selected
            </span>
            {isSelectionFull && (
              <span className="text-xs text-primary bg-primary/10 px-2 py-1 rounded">
                Selection Full
              </span>
            )}
          </div>
        </div>
      )}

      {/* Exercise List */}
      <div className="flex-1 overflow-y-auto p-4">
        {loading ? (
          <div className="text-center py-8">
            <div className="text-primary text-2xl mb-2">⚡</div>
            <div className="text-gray-400">Loading exercises...</div>
          </div>
        ) : filteredExercises.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-gray-400 text-sm">
              {searchState.searchTerm.length > 0 
                ? `No exercises found for "${searchState.searchTerm}"`
                : searchState.showSelectedOnly 
                  ? 'No exercises selected yet'
                  : 'No exercises available'
              }
            </div>
            {searchState.searchTerm.length > 0 && (
              <div className="text-gray-500 text-xs mt-2">
                Try: "kettlebell", "squat", "press", "deadlift"
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredExercises.map(exercise => (
              <MultiSelectExerciseCard
                key={exercise.id}
                exercise={exercise}
                isSelected={selectedExerciseIds.has(exercise.id)}
                isDisabled={!selectedExerciseIds.has(exercise.id) && isSelectionFull}
                isMultiSelectMode={isMultiSelectMode}
                onSelect={handleExerciseSelect}
                onInfo={handleExerciseInfo}
              />
            ))}
            
            {searchState.resultsCount > 50 && (
              <div className="text-center py-4 text-gray-400 text-sm">
                Showing first 50 of {searchState.resultsCount} results. Refine your search to see more.
              </div>
            )}
          </div>
        )}
      </div>

      {/* Exercise Info Modal */}
      {selectedExerciseForInfo && (
        <ExerciseInfoModal
          isOpen={showExerciseInfo}
          onClose={() => {
            setShowExerciseInfo(false)
            setSelectedExerciseForInfo(null)
          }}
          exercise={selectedExerciseForInfo}
        />
      )}
    </div>
  )
}