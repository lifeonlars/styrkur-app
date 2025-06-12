'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { Exercise, WgerExerciseInfo } from '@/types'
import { categoryMapping, fetchExerciseInfo, calculateMuscleActivation, mapWgerToExercise } from '@/lib/wger'
import MuscleMap from '@/components/muscle-map/MuscleMap'

interface ExerciseInfoModalProps {
  exercise?: Exercise
  exerciseId?: string
  isOpen: boolean
  onClose: () => void
}

interface ExerciseDetailsResponse {
  exercise: Exercise
  wgerInfo?: WgerExerciseInfo
  description?: string
  cues?: string[]
  muscleActivation?: { muscle: string; percentage: number }[]
}

export default function ExerciseInfoModal({ 
  exercise: propExercise, 
  exerciseId, 
  isOpen, 
  onClose 
}: ExerciseInfoModalProps) {
  const [exercise, setExercise] = useState<Exercise | null>(propExercise || null)
  const [exerciseDetails, setExerciseDetails] = useState<ExerciseDetailsResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  // Fetch exercise details from WGER API
  const fetchExerciseDetails = async (id: string): Promise<ExerciseDetailsResponse | null> => {
    try {
      const numericId = parseInt(id)
      if (isNaN(numericId)) {
        throw new Error('Invalid exercise ID')
      }

      const wgerInfo = await fetchExerciseInfo(numericId)
      if (!wgerInfo) {
        throw new Error('Exercise not found')
      }
      
      // Get English translation
      const englishTranslation = wgerInfo.translations.find(t => t.language === 2) || wgerInfo.translations[0]
      
      if (!englishTranslation) {
        throw new Error('No English translation available')
      }
      
      // Use our mapping function to convert to Exercise format
      const baseExercise = {
        id: wgerInfo.id,
        uuid: wgerInfo.uuid,
        name: englishTranslation.name,
        exercise_base: wgerInfo.id,
        description: englishTranslation.description || '',
        category: wgerInfo.category,
        muscles: wgerInfo.muscles || [],
        muscles_secondary: wgerInfo.muscles_secondary || [],
        equipment: wgerInfo.equipment || [],
        language: 2
      }
      
      const exerciseData = mapWgerToExercise(baseExercise)
      
      // Parse description for cues
      const description = englishTranslation.description
        .replace(/<[^>]*>/g, '') // Remove HTML tags
        .trim()
      
      const cues = description
        .split(/[.\n•]/)
        .map(cue => cue.trim())
        .filter(cue => cue.length > 10)
        .slice(0, 4) // Limit to 4 cues
      
      // Calculate muscle activation percentages using enhanced function
      const muscleActivation = calculateMuscleActivation(exerciseData.primaryMuscleIds, exerciseData.secondaryMuscleIds)
      
      return {
        exercise: exerciseData,
        wgerInfo,
        description,
        cues,
        muscleActivation
      }
    } catch (error) {
      console.error('Failed to fetch exercise details:', error)
      throw error
    }
  }
  
  // Load exercise data when modal opens
  useEffect(() => {
    if (!isOpen) {
      setExerciseDetails(null)
      setError(null)
      return
    }
    
    const loadExercise = async () => {
      setLoading(true)
      setError(null)
      
      try {
        if (propExercise) {
          // Use provided exercise
          setExercise(propExercise)
          setExerciseDetails({
            exercise: propExercise,
            description: propExercise.description,
            cues: propExercise.instructions.slice(0, 4),
            muscleActivation: calculateMuscleActivation(propExercise.primaryMuscleIds, propExercise.secondaryMuscleIds)
          })
        } else if (exerciseId) {
          // Fetch from WGER API
          const details = await fetchExerciseDetails(exerciseId)
          if (details) {
            setExercise(details.exercise)
            setExerciseDetails(details)
          }
        } else {
          throw new Error('No exercise or exercise ID provided')
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load exercise')
        console.error('Exercise loading error:', err)
      } finally {
        setLoading(false)
      }
    }
    
    loadExercise()
  }, [isOpen, propExercise, exerciseId])
  
  if (!isOpen) return null
  
  const formatExerciseInfo = (exercise: Exercise): string => {
    const equipment = exercise.equipment || 'Unknown'
    const category = exercise.category && categoryMapping[exercise.category] 
      ? categoryMapping[exercise.category].charAt(0).toUpperCase() + categoryMapping[exercise.category].slice(1)
      : (exercise.muscleGroup?.charAt(0).toUpperCase() + exercise.muscleGroup?.slice(1)) || 'Unknown'
    
    return `${category} | ${equipment}`
  }
  
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-xl max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-700">
          <div>
            {exercise && (
              <>
                <h2 className="text-white text-xl font-heading font-medium mb-1">
                  {exercise.name}
                </h2>
                <p className="text-gray-400 text-sm">
                  {formatExerciseInfo(exercise)}
                </p>
              </>
            )}
            {loading && (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-[#C3A869] border-t-transparent rounded-full animate-spin"></div>
                <span className="text-gray-400">Loading exercise details...</span>
              </div>
            )}
            {error && (
              <div className="text-red-400">
                Error: {error}
              </div>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {exercise && exerciseDetails && (
            <div className="p-6">
              {/* Desktop: Side by side layout, Mobile: Stacked */}
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Muscle Map Section */}
                <div className="flex-1 lg:max-w-2xl">
                  <MuscleMap
                    primaryMuscleIds={exercise.primaryMuscleIds}
                    secondaryMuscleIds={exercise.secondaryMuscleIds}
                    showFront={true}
                    showBack={true}
                    showLegend={true} // Use the enhanced internal legend
                    showMuscleList={false}
                    size="large"
                    useEnhanced={true}
                    exerciseName="" // Empty to hide title
                    className="muscle-map-no-titles"
                    muscleActivation={exerciseDetails.muscleActivation}
                  />
                </div>

                {/* Right Side Content - Desktop only */}
                <div className="hidden lg:flex lg:flex-col lg:min-w-80 lg:flex-1 gap-6">
                  {/* How to Perform */}
                  {exerciseDetails.description && (
                    <div className="bg-gray-800 rounded-xl p-4">
                      <h3 className="text-white font-medium mb-3">How to Perform</h3>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        {exerciseDetails.description}
                      </p>
                    </div>
                  )}

                  {/* Exercise Cues */}
                  {exerciseDetails.cues && exerciseDetails.cues.length > 0 && (
                    <div className="bg-gray-800 rounded-xl p-4">
                      <h3 className="text-white font-medium mb-3">Key Cues</h3>
                      <ul className="space-y-2">
                        {exerciseDetails.cues.map((cue, index) => (
                          <li key={index} className="text-gray-300 text-sm flex items-start gap-2">
                            <span className="text-[#C3A869] mt-1">•</span>
                            <span>{cue}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {/* Mobile Content - Below muscle map */}
              <div className="lg:hidden mt-6 space-y-6">
                {/* How to Perform */}
                {exerciseDetails.description && (
                  <div className="bg-gray-800 rounded-xl p-4">
                    <h3 className="text-white font-medium mb-3">How to Perform</h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {exerciseDetails.description}
                    </p>
                  </div>
                )}

                {/* Exercise Cues */}
                {exerciseDetails.cues && exerciseDetails.cues.length > 0 && (
                  <div className="bg-gray-800 rounded-xl p-4">
                    <h3 className="text-white font-medium mb-3">Key Cues</h3>
                    <ul className="space-y-2">
                      {exerciseDetails.cues.map((cue, index) => (
                        <li key={index} className="text-gray-300 text-sm flex items-start gap-2">
                          <span className="text-[#C3A869] mt-1">•</span>
                          <span>{cue}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {loading && (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="w-8 h-8 border-2 border-[#C3A869] border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
                <p className="text-gray-400">Loading exercise information...</p>
              </div>
            </div>
          )}
          
          {error && (
            <div className="flex items-center justify-center py-12">
              <div className="text-center max-w-md">
                <p className="text-red-400 mb-2">Failed to load exercise information</p>
                <p className="text-gray-500 text-sm">{error}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}