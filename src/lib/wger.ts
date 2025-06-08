import { 
  Exercise, 
  WgerExercise, 
  ExerciseFilter,
  EquipmentMapping,
  MuscleMapping,
  CategoryMapping,
  NorseIcons
} from '@/types'

// Norse mythology icons mapping for body parts and equipment
export const norseIcons: NorseIcons = {
  // Body parts
  'chest': '🛡️',
  'back': '🌲', 
  'shoulders': '🔨',
  'upper arms': '⚔️',
  'lower arms': '🗡️',
  'upper legs': '🏔️',
  'lower legs': '⛰️',
  'waist': '🔥',
  'cardio': '⚡',
  'neck': '👑',
  // Equipment
  'barbell': '🏔️',
  'dumbbell': '🪓',
  'cable': '⛓️',
  'body weight': '⚡',
  'kettlebell': '🪓',
  'assisted': '🛡️',
  'machine': '⚙️',
  'stability ball': '🔵',
  'default': '⚔️'
}

// Equipment ID mapping from WGER
export const equipmentMapping: EquipmentMapping = {
  1: 'barbell',
  3: 'dumbbell', 
  7: 'body weight',
  8: 'bench',
  9: 'incline bench',
  10: 'kettlebell',
  12: 'pull-up bar',
  15: 'cable'
}

// WGER Muscle API data structure
export interface WgerMuscle {
  id: number
  name: string
  name_en: string
  is_front: boolean
  image_url_main: string
  image_url_secondary: string
}

// Muscle groups for filtering
export type MuscleGroup = 'chest' | 'back' | 'shoulders' | 'arms' | 'legs' | 'core' | 'full-body'

// Muscle ID mapping from WGER API (accurate data)
export const muscleMapping: MuscleMapping = {
  1: 'biceps', // Biceps brachii
  2: 'anterior deltoid', // Anterior deltoid
  3: 'serratus anterior', // Serratus anterior
  4: 'chest', // Pectoralis major
  5: 'triceps', // Triceps brachii
  6: 'rectus abdominis', // Rectus abdominis
  7: 'calves', // Gastrocnemius
  8: 'glutes', // Gluteus maximus
  9: 'trapezius', // Trapezius
  10: 'quadriceps', // Quadriceps femoris
  11: 'hamstrings', // Biceps femoris
  12: 'latissimus dorsi', // Latissimus dorsi
  13: 'brachialis', // Brachialis
  14: 'obliques', // Obliquus externus abdominis
  15: 'soleus' // Soleus
}

// Map muscle ID to muscle group for filtering
export const mapMuscleIdToGroup = (muscleId: number): MuscleGroup => {
  switch (muscleId) {
    // Chest
    case 4: // Pectoralis major
      return 'chest'
    
    // Back
    case 12: // Latissimus dorsi
    case 9: // Trapezius (primarily back, but also shoulders)
      return 'back'
    
    // Shoulders
    case 2: // Anterior deltoid
      return 'shoulders'
    
    // Arms
    case 1: // Biceps brachii
    case 5: // Triceps brachii
    case 13: // Brachialis
      return 'arms'
    
    // Legs
    case 10: // Quadriceps femoris
    case 11: // Biceps femoris (hamstrings)
    case 7: // Gastrocnemius (calves)
    case 15: // Soleus (calves)
    case 8: // Gluteus maximus
      return 'legs'
    
    // Core
    case 6: // Rectus abdominis
    case 3: // Serratus anterior
    case 14: // Obliquus externus abdominis
      return 'core'
    
    default:
      return 'full-body'
  }
}

// Get primary muscle group from an exercise's muscle array
export const getExerciseMuscleGroup = (primaryMuscles: number[], secondaryMuscles: number[] = []): MuscleGroup => {
  if (!primaryMuscles || primaryMuscles.length === 0) {
    return 'full-body'
  }
  
  // If exercise has 3+ primary muscles, consider it full body
  if (primaryMuscles.length >= 3) {
    return 'full-body'
  }
  
  // Get unique muscle groups from primary muscles
  const muscleGroups = primaryMuscles.map(mapMuscleIdToGroup)
  const uniqueGroups = Array.from(new Set(muscleGroups))
  
  // If multiple different muscle groups are targeted, it's full body
  if (uniqueGroups.length >= 2) {
    return 'full-body'
  }
  
  // Return the primary muscle group
  return uniqueGroups[0] || 'full-body'
}

// Filter options for the UI
export const muscleGroupFilters = [
  { id: 'all', label: 'All', icon: '⚔️' },
  { id: 'chest', label: 'Chest', icon: '🛡️' },
  { id: 'back', label: 'Back', icon: '🌲' },
  { id: 'shoulders', label: 'Shoulders', icon: '🔨' },
  { id: 'arms', label: 'Arms', icon: '⚔️' },
  { id: 'legs', label: 'Legs', icon: '🏔️' },
  { id: 'core', label: 'Core', icon: '🔥' },
  { id: 'full-body', label: 'Full Body', icon: '⚡' }
] as const

// Fetch muscles from WGER API
export const fetchMuscles = async (): Promise<WgerMuscle[]> => {
  try {
    const response = await fetch('https://wger.de/api/v2/muscle/')
    const data = await response.json()
    return data.results
  } catch (error) {
    console.error('Failed to fetch muscles from WGER:', error)
    return []
  }
}

// Category mapping from WGER
export const categoryMapping: CategoryMapping = {
  8: 'upper arms', // Arms
  9: 'upper legs', // Legs
  10: 'waist', // Abs
  11: 'chest', // Chest
  12: 'back', // Back
  13: 'shoulders', // Shoulders  
  14: 'lower legs' // Calves
}

// Body part to category mapping
export const bodyPartToCategory: Record<string, number> = {
  'chest': 11,
  'back': 12,
  'shoulders': 13,
  'upper arms': 8,
  'lower arms': 8,
  'upper legs': 9,
  'lower legs': 14,
  'waist': 10
}

// Mock WGER exercise database
export const mockWgerData: WgerExercise[] = [
  // Kettlebell Exercises
  {
    id: 345,
    uuid: "c788d643-150a-4ac7-97ef-84643c6419bf",
    name: "Kettlebell Swing",
    exercise_base: 9,
    description: "<p>Two Handed Russian Style Kettlebell swing. Stand with feet wide apart. Swing kettlebell between legs using hip drive.</p>",
    category: 10,
    muscles: [8],
    muscles_secondary: [14, 6],
    equipment: [10],
    language: 2
  },
  {
    id: 1001,
    uuid: "kb-goblet-squat",
    name: "Kettlebell Goblet Squat",
    exercise_base: 10,
    description: "<p>Hold kettlebell at chest level. Squat down keeping chest up. Drive through heels to stand.</p>",
    category: 9,
    muscles: [10],
    muscles_secondary: [8],
    equipment: [10],
    language: 2
  },
  {
    id: 1002,
    uuid: "kb-turkish-getup",
    name: "Turkish Get-Up",
    exercise_base: 11,
    description: "<p>Start lying with kettlebell overhead. Slowly stand up while keeping bell overhead. Reverse the movement.</p>",
    category: 10,
    muscles: [6],
    muscles_secondary: [2, 10],
    equipment: [10],
    language: 2
  },
  {
    id: 1003,
    uuid: "kb-clean-press",
    name: "Kettlebell Clean and Press",
    exercise_base: 12,
    description: "<p>Clean kettlebell to rack position. Press overhead. Lower with control.</p>",
    category: 13,
    muscles: [2],
    muscles_secondary: [5, 6],
    equipment: [10],
    language: 2
  },
  {
    id: 1004,
    uuid: "kb-deadlift",
    name: "Kettlebell Deadlift",
    exercise_base: 13,
    description: "<p>Stand over kettlebell. Hinge at hips and grip handle. Drive hips forward to lift.</p>",
    category: 12,
    muscles: [11],
    muscles_secondary: [8, 9],
    equipment: [10],
    language: 2
  },
  {
    id: 1005,
    uuid: "kb-snatch",
    name: "Kettlebell Snatch",
    exercise_base: 14,
    description: "<p>Start with kettlebell between legs. Explosively pull to overhead. Lower with control.</p>",
    category: 13,
    muscles: [2],
    muscles_secondary: [11, 6],
    equipment: [10],
    language: 2
  },

  // Barbell Exercises
  {
    id: 2001,
    uuid: "bb-back-squat",
    name: "Barbell Back Squat",
    exercise_base: 1,
    description: "<p>Bar on upper back. Feet shoulder-width apart. Squat down and drive up through heels.</p>",
    category: 9,
    muscles: [10],
    muscles_secondary: [8, 9],
    equipment: [1],
    language: 2
  },
  {
    id: 2002,
    uuid: "bb-deadlift",
    name: "Barbell Deadlift",
    exercise_base: 2,
    description: "<p>Stand with feet hip-width apart. Hinge at hips and grip bar. Drive through heels to lift.</p>",
    category: 12,
    muscles: [11],
    muscles_secondary: [8, 9],
    equipment: [1],
    language: 2
  },
  {
    id: 2003,
    uuid: "bb-bench-press",
    name: "Barbell Bench Press",
    exercise_base: 3,
    description: "<p>Lie on bench with feet flat. Lower bar to chest. Press up explosively.</p>",
    category: 11,
    muscles: [4],
    muscles_secondary: [5, 2],
    equipment: [1],
    language: 2
  },
  {
    id: 2004,
    uuid: "bb-overhead-press",
    name: "Barbell Overhead Press",
    exercise_base: 4,
    description: "<p>Start with bar at shoulder height. Press overhead in straight line. Lower with control.</p>",
    category: 13,
    muscles: [2],
    muscles_secondary: [5, 6],
    equipment: [1],
    language: 2
  },
  {
    id: 2005,
    uuid: "bb-row",
    name: "Barbell Bent Over Row",
    exercise_base: 5,
    description: "<p>Hinge at hips with bar in hands. Pull bar to lower chest. Lower with control.</p>",
    category: 12,
    muscles: [11],
    muscles_secondary: [13, 1],
    equipment: [1],
    language: 2
  },

  // Bodyweight Exercises
  {
    id: 3001,
    uuid: "bw-pushups",
    name: "Push-ups",
    exercise_base: 6,
    description: "<p>Start in plank position. Lower chest to floor. Push back up to starting position.</p>",
    category: 11,
    muscles: [4],
    muscles_secondary: [5, 2],
    equipment: [7],
    language: 2
  },
  {
    id: 3002,
    uuid: "bw-pullups",
    name: "Pull-ups",
    exercise_base: 7,
    description: "<p>Hang from bar with palms away. Pull chest to bar. Lower with control.</p>",
    category: 12,
    muscles: [11],
    muscles_secondary: [1],
    equipment: [7],
    language: 2
  },
  {
    id: 3003,
    uuid: "bw-squats",
    name: "Bodyweight Squats",
    exercise_base: 8,
    description: "<p>Feet shoulder-width apart. Squat down keeping chest up. Drive through heels to stand.</p>",
    category: 9,
    muscles: [10],
    muscles_secondary: [8],
    equipment: [7],
    language: 2
  },
  {
    id: 3004,
    uuid: "bw-plank",
    name: "Plank",
    exercise_base: 15,
    description: "<p>Start in push-up position. Hold straight line from head to heels. Engage core throughout.</p>",
    category: 10,
    muscles: [6],
    muscles_secondary: [2],
    equipment: [7],
    language: 2
  },
  {
    id: 3005,
    uuid: "bw-burpees",
    name: "Burpees",
    exercise_base: 16,
    description: "<p>Start standing. Drop to push-up position. Jump back up with hands overhead.</p>",
    category: 10,
    muscles: [6],
    muscles_secondary: [4, 10],
    equipment: [7],
    language: 2
  },

  // Dumbbell Exercises
  {
    id: 4001,
    uuid: "db-bench-press",
    name: "Dumbbell Bench Press",
    exercise_base: 17,
    description: "<p>Lie on bench with dumbbells. Press dumbbells up and together. Lower with control.</p>",
    category: 11,
    muscles: [4],
    muscles_secondary: [5, 2],
    equipment: [3],
    language: 2
  },
  {
    id: 4002,
    uuid: "db-rows",
    name: "Dumbbell Bent Over Row",
    exercise_base: 18,
    description: "<p>Hinge at hips holding dumbbells. Pull dumbbells to hip. Lower with control.</p>",
    category: 12,
    muscles: [11],
    muscles_secondary: [13, 1],
    equipment: [3],
    language: 2
  },
  {
    id: 4003,
    uuid: "db-shoulder-press",
    name: "Dumbbell Shoulder Press",
    exercise_base: 19,
    description: "<p>Hold dumbbells at shoulder height. Press overhead. Lower with control.</p>",
    category: 13,
    muscles: [2],
    muscles_secondary: [5],
    equipment: [3],
    language: 2
  },
  
  // Arm-specific exercises
  {
    id: 5001,
    uuid: "db-bicep-curl",
    name: "Dumbbell Bicep Curl",
    exercise_base: 20,
    description: "<p>Hold dumbbells at sides. Curl weights up while keeping elbows stationary. Lower with control.</p>",
    category: 8,
    muscles: [1],
    muscles_secondary: [13],
    equipment: [3],
    language: 2
  },
  {
    id: 5002,
    uuid: "db-tricep-extension",
    name: "Dumbbell Tricep Extension",
    exercise_base: 21,
    description: "<p>Hold dumbbell overhead with both hands. Lower behind head by bending elbows. Extend back up.</p>",
    category: 8,
    muscles: [5],
    muscles_secondary: [2],
    equipment: [3],
    language: 2
  },
  {
    id: 5003,
    uuid: "hammer-curl",
    name: "Hammer Curl",
    exercise_base: 22,
    description: "<p>Hold dumbbells with neutral grip. Curl up keeping wrists straight. Focus on brachialis.</p>",
    category: 8,
    muscles: [13],
    muscles_secondary: [1],
    equipment: [3],
    language: 2
  },
  
  // Full-body exercises (3+ primary muscles)
  {
    id: 6001,
    uuid: "db-thrusters",
    name: "Dumbbell Thrusters",
    exercise_base: 23,
    description: "<p>Hold dumbbells at shoulders. Squat down then explosively stand and press overhead.</p>",
    category: 10,
    muscles: [10, 2, 8],
    muscles_secondary: [5, 6],
    equipment: [3],
    language: 2
  },
  {
    id: 6002,
    uuid: "man-makers",
    name: "Man Makers",
    exercise_base: 24,
    description: "<p>Burpee with dumbbells, add rows at bottom and overhead press at top.</p>",
    category: 10,
    muscles: [4, 12, 10],
    muscles_secondary: [1, 5, 6],
    equipment: [3],
    language: 2
  }
]

// Utility functions
export const mapEquipmentArray = (equipmentArray: number[]): string => {
  if (!equipmentArray || equipmentArray.length === 0) return 'body weight'
  return equipmentMapping[equipmentArray[0]] || 'unknown'
}

export const getTargetMuscle = (muscleArray: number[]): string => {
  if (!muscleArray || muscleArray.length === 0) return 'general'
  return muscleMapping[muscleArray[0]] || `muscle_${muscleArray[0]}`
}

export const mapCategoryToBodyPart = (categoryId: number): string => {
  return categoryMapping[categoryId] || 'general'
}

export const getNorseIconForCategory = (categoryId: number): string => {
  const bodyPart = mapCategoryToBodyPart(categoryId)
  return norseIcons[bodyPart] || norseIcons.default
}

export const determineIfWeighted = (equipmentArray: number[]): boolean => {
  return equipmentArray && equipmentArray.length > 0 && equipmentArray[0] !== 7
}

export const parseInstructions = (htmlDescription: string): string[] => {
  if (!htmlDescription) return ['Perform exercise with proper form']
  
  const plainText = htmlDescription.replace(/<[^>]*>/g, '').trim()
  const instructions = plainText
    .split(/[.\n•]/)
    .map(instruction => instruction.trim())
    .filter(instruction => instruction.length > 10)
  
  return instructions.length > 0 ? instructions : ['Perform exercise with proper form']
}

export const mapWgerToExercise = (wgerExercise: WgerExercise): Exercise => {
  const primaryMuscleIds = wgerExercise.muscles || []
  const secondaryMuscleIds = wgerExercise.muscles_secondary || []
  const muscleGroup = getExerciseMuscleGroup(primaryMuscleIds, secondaryMuscleIds)
  
  return {
    id: wgerExercise.id.toString(),
    name: wgerExercise.name,
    bodyPart: mapCategoryToBodyPart(wgerExercise.category), // Legacy compatibility
    equipment: mapEquipmentArray(wgerExercise.equipment),
    target: getTargetMuscle(primaryMuscleIds),
    primaryMuscles: primaryMuscleIds.map(id => muscleMapping[id] || `muscle_${id}`),
    secondaryMuscles: secondaryMuscleIds.map(id => muscleMapping[id] || `muscle_${id}`),
    primaryMuscleIds,
    secondaryMuscleIds,
    muscleGroup,
    instructions: parseInstructions(wgerExercise.description),
    category: wgerExercise.category,
    uuid: wgerExercise.uuid,
    icon: getMuscleGroupIcon(muscleGroup),
    isWeighted: determineIfWeighted(wgerExercise.equipment),
    wgerData: wgerExercise
  }
}

// Get icon based on muscle group (more accurate than category)
export const getMuscleGroupIcon = (muscleGroup: MuscleGroup): string => {
  const iconMap = {
    'chest': '🛡️',
    'back': '🌲',
    'shoulders': '🔨',
    'arms': '⚔️',
    'legs': '🏔️',
    'core': '🔥',
    'full-body': '⚡'
  }
  return iconMap[muscleGroup] || '⚔️'
}

// Exercise cache
let exerciseCache: Exercise[] = []

// Main API function
export const fetchExercises = async (filter: ExerciseFilter = {}): Promise<Exercise[]> => {
  const { bodyPart = '', muscleGroup, search = '', limit = 50 } = filter
  
  try {
    console.log('Using mock WGER API...', filter)
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 400))
    
    // If we have cached exercises and only searching, filter locally
    if (exerciseCache.length > 0 && search.length > 0) {
      console.log('Using cached exercises for search')
      const searchTerm = search.toLowerCase()
      let filtered = exerciseCache.filter(ex => 
        ex.name.toLowerCase().includes(searchTerm) ||
        ex.target.toLowerCase().includes(searchTerm) ||
        ex.bodyPart.toLowerCase().includes(searchTerm) ||
        ex.equipment.toLowerCase().includes(searchTerm) ||
        ex.instructions.some(instruction => instruction.toLowerCase().includes(searchTerm))
      )
      
      // Apply muscle group filter
      if (muscleGroup && muscleGroup !== 'all') {
        filtered = filtered.filter(ex => ex.muscleGroup === muscleGroup)
      }
      
      return filtered.slice(0, limit)
    }
    
    // Filter mock data
    let filtered = mockWgerData
    
    // Legacy body part filter (for backward compatibility)
    if (bodyPart && bodyPart !== 'all') {
      const categoryId = bodyPartToCategory[bodyPart]
      if (categoryId) {
        filtered = filtered.filter(ex => ex.category === categoryId)
      }
    }
    
    // Search filter
    if (search && search.length > 0) {
      const searchTerm = search.toLowerCase()
      filtered = filtered.filter(ex => 
        ex.name.toLowerCase().includes(searchTerm) ||
        ex.description.toLowerCase().includes(searchTerm)
      )
    }
    
    // Map to our format
    let mappedExercises = filtered.map(mapWgerToExercise)
    
    // Apply muscle group filter after mapping (since muscleGroup is computed)
    if (muscleGroup && muscleGroup !== 'all') {
      mappedExercises = mappedExercises.filter(ex => ex.muscleGroup === muscleGroup)
    }
    
    console.log(`Mock API returned ${mappedExercises.length} exercises`)
    
    // Cache results
    if (!search && !bodyPart) {
      exerciseCache = mappedExercises
    }
    
    return mappedExercises.slice(0, limit)
    
  } catch (error) {
    console.error('Mock API error:', error)
    return getFallbackExercises()
  }
}

// Fallback exercises
export const getFallbackExercises = (): Exercise[] => {
  return [
    { 
      id: 'fb1', 
      name: 'Kettlebell Swing', 
      bodyPart: 'waist', 
      equipment: 'kettlebell', 
      target: 'glutes', 
      icon: '🏔️', 
      instructions: ['Stand with feet wide', 'Swing kettlebell between legs', 'Drive hips forward'],
      isWeighted: true,
      primaryMuscles: ['glutes'],
      secondaryMuscles: ['core'],
      primaryMuscleIds: [8], // Gluteus maximus
      secondaryMuscleIds: [6], // Rectus abdominis
      muscleGroup: 'legs',
      category: 10,
      uuid: 'fb1'
    },
    { 
      id: 'fb2', 
      name: 'Push-ups', 
      bodyPart: 'chest', 
      equipment: 'body weight', 
      target: 'chest', 
      icon: '🛡️', 
      instructions: ['Start in plank position', 'Lower chest to floor', 'Push back up'],
      isWeighted: false,
      primaryMuscles: ['chest'],
      secondaryMuscles: ['triceps'],
      primaryMuscleIds: [4], // Pectoralis major
      secondaryMuscleIds: [5], // Triceps brachii
      muscleGroup: 'chest',
      category: 11,
      uuid: 'fb2'
    },
    { 
      id: 'fb3', 
      name: 'Barbell Squat', 
      bodyPart: 'upper legs', 
      equipment: 'barbell', 
      target: 'quadriceps', 
      icon: '🏔️', 
      instructions: ['Bar on shoulders', 'Squat down', 'Drive up through heels'],
      isWeighted: true,
      primaryMuscles: ['quadriceps'],
      secondaryMuscles: ['glutes'],
      primaryMuscleIds: [10], // Quadriceps femoris
      secondaryMuscleIds: [8], // Gluteus maximus
      muscleGroup: 'legs',
      category: 9,
      uuid: 'fb3'
    }
  ]
}

// Get exercise by ID
export const getExerciseById = (id: string, exercises: Exercise[] = exerciseCache): Exercise | undefined => {
  return exercises.find(ex => ex.id === id)
}