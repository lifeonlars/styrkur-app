/**
 * Muscle mapping utilities for react-body-highlighter integration
 * Maps WGER API muscle IDs to react-body-highlighter muscle regions
 */

// react-body-highlighter muscle regions (from the actual package)
export type BodyHighlighterMuscle = 
  | 'chest' | 'biceps' | 'triceps' | 'forearm' | 'back-deltoids' | 'front-deltoids'
  | 'abs' | 'obliques' | 'adductor' | 'hamstring' | 'quadriceps' | 'abductors' 
  | 'calves' | 'gluteal' | 'trapezius' | 'upper-back' | 'lower-back'
  | 'head' | 'neck' | 'knees' | 'left-soleus' | 'right-soleus'

// Mapping from WGER muscle IDs to react-body-highlighter muscle regions
export const wgerToBodyHighlighterMapping: Record<number, BodyHighlighterMuscle[]> = {
  1: ['biceps'], // Biceps brachii
  2: ['front-deltoids'], // Anterior deltoid  
  3: ['abs'], // Serratus anterior (close to abs)
  4: ['chest'], // Pectoralis major
  5: ['triceps'], // Triceps brachii
  6: ['abs'], // Rectus abdominis
  7: ['calves'], // Gastrocnemius
  8: ['gluteal'], // Gluteus maximus
  9: ['trapezius', 'upper-back'], // Trapezius
  10: ['quadriceps'], // Quadriceps femoris
  11: ['hamstring'], // Biceps femoris (hamstrings)
  12: ['upper-back', 'lower-back'], // Latissimus dorsi
  13: ['biceps'], // Brachialis (close to biceps)
  14: ['obliques'], // Obliquus externus abdominis
  15: ['calves', 'left-soleus', 'right-soleus'] // Soleus
}

// Color intensity levels for muscle activation
export interface MuscleActivation {
  intensity: 'low' | 'medium' | 'high'
  color: string
}

export const muscleActivationColors: Record<MuscleActivation['intensity'], string> = {
  low: '#FCD34D',     // Yellow - secondary muscles
  medium: '#F97316',  // Orange - primary muscles
  high: '#DC2626'     // Red - heavily worked muscles
}

/**
 * Convert WGER muscle IDs to react-body-highlighter IExerciseData format
 */
export function convertMuscleIdsToBodyHighlighter(
  primaryMuscleIds: number[] = [],
  secondaryMuscleIds: number[] = [],
  exerciseName: string = 'Exercise'
): { exerciseData: any[], colorMap: Record<string, string> } {
  const muscles: BodyHighlighterMuscle[] = []
  const colorMap: Record<string, string> = {}

  // Process primary muscles (high intensity)
  primaryMuscleIds.forEach(muscleId => {
    const bodyParts = wgerToBodyHighlighterMapping[muscleId]
    if (bodyParts) {
      bodyParts.forEach(bodyPart => {
        if (!muscles.includes(bodyPart)) {
          muscles.push(bodyPart)
          colorMap[bodyPart] = muscleActivationColors.high
        }
      })
    }
  })

  // Process secondary muscles (medium intensity, but don't override primary)
  secondaryMuscleIds.forEach(muscleId => {
    const bodyParts = wgerToBodyHighlighterMapping[muscleId]
    if (bodyParts) {
      bodyParts.forEach(bodyPart => {
        if (!muscles.includes(bodyPart)) {
          muscles.push(bodyPart)
          colorMap[bodyPart] = muscleActivationColors.medium
        }
      })
    }
  })

  const exerciseData = [{
    name: exerciseName,
    muscles: muscles,
    frequency: 1
  }]

  return { exerciseData, colorMap }
}

/**
 * Aggregate muscle activation from multiple exercises (for workout-level visualization)
 */
export function aggregateWorkoutMuscleActivation(
  exercises: Array<{
    primaryMuscleIds: number[]
    secondaryMuscleIds: number[]
    name?: string
  }>
): { exerciseData: any[], colorMap: Record<string, string> } {
  const muscleActivationCount: Record<BodyHighlighterMuscle, number> = {} as any
  const maxActivation = exercises.length

  // Count activations for each muscle
  exercises.forEach(exercise => {
    const { exerciseData } = convertMuscleIdsToBodyHighlighter(
      exercise.primaryMuscleIds,
      exercise.secondaryMuscleIds,
      exercise.name || 'Exercise'
    )

    exerciseData[0].muscles.forEach((muscle: BodyHighlighterMuscle) => {
      if (!muscleActivationCount[muscle]) {
        muscleActivationCount[muscle] = 0
      }
      
      // Weight based on whether it's primary or secondary
      const isPrimary = exercise.primaryMuscleIds.some(id => 
        wgerToBodyHighlighterMapping[id]?.includes(muscle)
      )
      const weight = isPrimary ? 2 : 1
      muscleActivationCount[muscle] += weight
    })
  })

  // Convert counts to intensity levels and colors
  const allMuscles: BodyHighlighterMuscle[] = []
  const colorMap: Record<string, string> = {}

  Object.entries(muscleActivationCount).forEach(([muscle, count]) => {
    const muscleKey = muscle as BodyHighlighterMuscle
    const normalizedIntensity = count / (maxActivation * 2) // *2 because primary muscles count double

    let color: string
    if (normalizedIntensity >= 0.6) {
      color = muscleActivationColors.high
    } else if (normalizedIntensity >= 0.3) {
      color = muscleActivationColors.medium
    } else {
      color = muscleActivationColors.low
    }

    allMuscles.push(muscleKey)
    colorMap[muscleKey] = color
  })

  const aggregateExerciseData = [{
    name: 'Workout',
    muscles: allMuscles,
    frequency: 1
  }]

  return { exerciseData: aggregateExerciseData, colorMap }
}

/**
 * Get readable muscle names for display
 */
export const muscleDisplayNames: Record<BodyHighlighterMuscle, string> = {
  chest: 'Chest',
  biceps: 'Biceps',
  triceps: 'Triceps',
  forearm: 'Forearms',
  'back-deltoids': 'Rear Delts',
  'front-deltoids': 'Front Delts',
  abs: 'Abs',
  obliques: 'Obliques',
  adductor: 'Adductors',
  hamstring: 'Hamstrings',
  quadriceps: 'Quadriceps',
  abductors: 'Abductors',
  calves: 'Calves',
  gluteal: 'Glutes',
  trapezius: 'Trapezius',
  'upper-back': 'Upper Back',
  'lower-back': 'Lower Back',
  head: 'Head',
  neck: 'Neck',
  knees: 'Knees',
  'left-soleus': 'Left Soleus',
  'right-soleus': 'Right Soleus'
}

/**
 * Get muscles worked summary for display
 */
export function getMusclesWorkedSummary(
  primaryMuscleIds: number[] = [],
  secondaryMuscleIds: number[] = []
): { primary: string[], secondary: string[] } {
  const primaryMuscles = new Set<string>()
  const secondaryMuscles = new Set<string>()

  primaryMuscleIds.forEach(muscleId => {
    const bodyParts = wgerToBodyHighlighterMapping[muscleId]
    if (bodyParts) {
      bodyParts.forEach(bodyPart => {
        primaryMuscles.add(muscleDisplayNames[bodyPart])
      })
    }
  })

  secondaryMuscleIds.forEach(muscleId => {
    const bodyParts = wgerToBodyHighlighterMapping[muscleId]
    if (bodyParts) {
      bodyParts.forEach(bodyPart => {
        const displayName = muscleDisplayNames[bodyPart]
        if (!primaryMuscles.has(displayName)) {
          secondaryMuscles.add(displayName)
        }
      })
    }
  })

  return {
    primary: Array.from(primaryMuscles).sort(),
    secondary: Array.from(secondaryMuscles).sort()
  }
}