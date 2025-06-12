import { 
  Exercise, 
  WgerExercise, 
  WgerExerciseInfo,
  WgerExerciseImage,
  WgerMuscleObject,
  ExerciseFilter,
  EquipmentMapping,
  MuscleMapping,
  CategoryMapping,
  NorseIcons
} from '@/types'
import Fuse, { IFuseOptions } from 'fuse.js'

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

// Improved equipment and weighted logic
export const determineIfWeighted = (equipmentArray: number[]): boolean => {
  if (!equipmentArray || equipmentArray.length === 0) return false
  
  // Equipment IDs that indicate weighted exercises
  const weightedEquipment = [1, 3, 10, 15] // barbell, dumbbell, kettlebell, cable
  
  return equipmentArray.some(id => weightedEquipment.includes(id))
}

// Get equipment category for display
export const getEquipmentCategory = (equipmentArray: number[]): string => {
  if (!equipmentArray || equipmentArray.length === 0) return 'Bodyweight'
  
  const equipment = equipmentArray[0] // Use primary equipment
  const equipmentName = equipmentMapping[equipment]
  
  if (equipmentName) {
    return equipmentName.charAt(0).toUpperCase() + equipmentName.slice(1)
  }
  
  // Fallback categories based on equipment ID
  if ([1, 3, 10].includes(equipment)) return 'Free Weights'
  if ([15].includes(equipment)) return 'Cable'
  if ([8, 9].includes(equipment)) return 'Bench'
  if ([7, 12].includes(equipment)) return 'Bodyweight'
  
  return 'Equipment'
}

// Get exercise intensity/difficulty indicator
export const getExerciseIntensity = (category: number, isWeighted: boolean): string => {
  // Categories: 8=Arms, 9=Legs, 10=Abs, 11=Chest, 12=Back, 13=Shoulders, 14=Calves
  if (isWeighted) {
    if ([9, 12].includes(category)) return 'High' // Legs, Back (typically compound)
    if ([11, 13].includes(category)) return 'Medium' // Chest, Shoulders
    return 'Medium'
  } else {
    if ([10].includes(category)) return 'Low' // Abs
    if ([9, 12].includes(category)) return 'Medium' // Bodyweight legs/back
    return 'Low'
  }
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

// Extract exercise cues from instructions for prefilling
export const extractExerciseCues = (instructions: string[]): string => {
  if (!instructions || instructions.length === 0) return ''
  
  // Look for actionable cues and form tips
  const cueKeywords = [
    'keep', 'maintain', 'ensure', 'focus', 'squeeze', 'engage', 'breathe',
    'control', 'slow', 'pause', 'drive', 'push', 'pull', 'hold'
  ]
  
  const cues = instructions
    .filter(instruction => {
      const lower = instruction.toLowerCase()
      return cueKeywords.some(keyword => lower.includes(keyword)) ||
             lower.includes('form') || 
             lower.includes('position') ||
             lower.includes('movement')
    })
    .map(cue => {
      // Clean up and shorten cues
      return cue
        .replace(/^(step \d+:?\s*)/i, '') // Remove step numbers
        .replace(/\s+/g, ' ') // Normalize whitespace
        .trim()
    })
    .filter(cue => cue.length > 0 && cue.length < 100) // Reasonable length
    .slice(0, 3) // Max 3 cues
  
  return cues.join('. ')
}

// Parse HTML description to clean text
export const parseDescription = (htmlDescription: string): string => {
  if (!htmlDescription) return ''
  
  // Remove HTML tags and decode entities
  const cleanText = htmlDescription
    .replace(/<[^>]*>/g, '') // Remove all HTML tags
    .replace(/&nbsp;/g, ' ') // Replace non-breaking spaces
    .replace(/&amp;/g, '&') // Replace HTML entities
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim()
  
  // Limit length and add ellipsis if needed
  if (cleanText.length > 200) {
    return cleanText.substring(0, 200).trim() + '...'
  }
  
  return cleanText
}

// Convert image URL to base64 data URL to bypass CORS
const fetchImageAsBase64 = async (imageUrl: string): Promise<string | null> => {
  try {
    // Use a CORS proxy service to fetch the image
    const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(imageUrl)}`
    console.log(`🔄 Proxying image: ${imageUrl}`)
    
    const response = await fetch(proxyUrl, {
      method: 'GET',
      mode: 'cors'
    })
    
    if (!response.ok) {
      throw new Error(`Proxy fetch failed: ${response.status}`)
    }
    
    const blob = await response.blob()
    
    return new Promise((resolve) => {
      const reader = new FileReader()
      reader.onloadend = () => resolve(reader.result as string)
      reader.onerror = () => resolve(null)
      reader.readAsDataURL(blob)
    })
  } catch (error) {
    console.warn(`Failed to convert image to base64: ${imageUrl}`, error)
    return null
  }
}

// Fetch exercise images from WGER API
export const fetchExerciseImages = async (exerciseId: number): Promise<WgerExerciseImage[]> => {
  try {
    const url = `https://wger.de/api/v2/exerciseimage/?exercise=${exerciseId}&format=json`
    console.log(`🖼️ Fetching images for exercise ${exerciseId}:`, url)
    
    const response = await fetch(url, {
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
      }
    })
    
    console.log(`Image fetch response for ${exerciseId}:`, response.status, response.statusText)
    
    if (!response.ok) {
      if (response.status === 404) {
        console.log(`No images found for exercise ${exerciseId}`)
        return []
      }
      throw new Error(`Failed to fetch images: ${response.status} ${response.statusText}`)
    }
    
    const data = await response.json()
    const images = data.results || []
    console.log(`📸 Found ${images.length} images for exercise ${exerciseId}:`, images.map((img: WgerExerciseImage) => img.image))
    return images
  } catch (error) {
    console.warn(`Failed to fetch images for exercise ${exerciseId}:`, error)
    return []
  }
}

// Get the best image URL for an exercise with CORS workaround
export const getExerciseImageUrl = async (images: WgerExerciseImage[]): Promise<{ imageUrl?: string; thumbnailUrl?: string }> => {
  if (!images || images.length === 0) {
    return {}
  }
  
  // Prefer main image, fallback to first available
  const mainImage = images.find(img => img.is_main) || images[0]
  
  if (!mainImage?.image) {
    return {}
  }
  
  // Convert WGER image to base64 to bypass CORS restrictions
  console.log(`🔄 Converting WGER image to base64: ${mainImage.image}`)
  const base64Image = await fetchImageAsBase64(mainImage.image)
  
  if (base64Image) {
    console.log(`✅ Successfully converted image to base64`)
    return {
      imageUrl: base64Image,
      thumbnailUrl: base64Image
    }
  } else {
    console.log(`❌ Failed to convert image, using original URL as fallback`)
    return {
      imageUrl: mainImage.image,
      thumbnailUrl: mainImage.image
    }
  }
}

// Default placeholder image for exercises without images
export const getPlaceholderImage = (muscleGroup: MuscleGroup): string => {
  // Return a data URL for a simple SVG placeholder
  const color = {
    'chest': '#C3A869',
    'back': '#8B9DC3',
    'shoulders': '#C3A869',
    'arms': '#DEB887',
    'legs': '#8FBC8F',
    'core': '#CD853F',
    'full-body': '#9370DB'
  }[muscleGroup] || '#6B7280'
  
  const svg = `
    <svg width="80" height="80" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
      <rect width="80" height="80" rx="8" fill="${color}" opacity="0.2"/>
      <circle cx="40" cy="35" r="8" fill="${color}" opacity="0.5"/>
      <rect x="32" y="45" width="16" height="20" rx="4" fill="${color}" opacity="0.5"/>
      <rect x="28" y="50" width="6" height="12" rx="3" fill="${color}" opacity="0.3"/>
      <rect x="46" y="50" width="6" height="12" rx="3" fill="${color}" opacity="0.3"/>
    </svg>
  `
  
  return `data:image/svg+xml;base64,${btoa(svg)}`
}

export const mapWgerToExercise = (wgerExercise: WgerExercise): Exercise => {
  // Handle both number arrays (mock data) and mixed arrays (real API data) 
  const primaryMuscleIds = Array.isArray(wgerExercise.muscles) 
    ? wgerExercise.muscles.map(m => typeof m === 'number' ? m : m.id)
    : []
  const secondaryMuscleIds = Array.isArray(wgerExercise.muscles_secondary)
    ? wgerExercise.muscles_secondary.map(m => typeof m === 'number' ? m : m.id)
    : []
    
  const muscleGroup = getExerciseMuscleGroup(primaryMuscleIds, secondaryMuscleIds)
  
  // Handle potential missing fields from real WGER API
  const equipment = wgerExercise.equipment || []
  const category = wgerExercise.category || 10 // Default to 'waist' category
  const description = wgerExercise.description || ''
  const uuid = wgerExercise.uuid || `wger_${wgerExercise.id}`
  
  // Extract muscle names properly
  const primaryMuscleNames = Array.isArray(wgerExercise.muscles)
    ? wgerExercise.muscles.map(m => typeof m === 'number' ? (muscleMapping[m] || `muscle_${m}`) : (m.name_en || m.name || muscleMapping[m.id] || `muscle_${m.id}`))
    : []
  const secondaryMuscleNames = Array.isArray(wgerExercise.muscles_secondary)
    ? wgerExercise.muscles_secondary.map(m => typeof m === 'number' ? (muscleMapping[m] || `muscle_${m}`) : (m.name_en || m.name || muscleMapping[m.id] || `muscle_${m.id}`))
    : []
  
  const instructions = parseInstructions(description)
  const isWeighted = determineIfWeighted(equipment)
  
  return {
    id: wgerExercise.id.toString(),
    name: wgerExercise.name || 'Unknown Exercise',
    bodyPart: mapCategoryToBodyPart(category), // Legacy compatibility
    equipment: getEquipmentCategory(equipment), // Improved equipment display
    target: getTargetMuscle(primaryMuscleIds),
    primaryMuscles: primaryMuscleNames,
    secondaryMuscles: secondaryMuscleNames,
    primaryMuscleIds,
    secondaryMuscleIds,
    muscleGroup,
    instructions,
    category,
    uuid,
    icon: getMuscleGroupIcon(muscleGroup),
    isWeighted,
    wgerData: wgerExercise,
    // New fields for images and description
    description: parseDescription(description),
    imageUrl: getPlaceholderImage(muscleGroup), // Default placeholder, will be updated with real images
    thumbnailUrl: getPlaceholderImage(muscleGroup),
    hasRealImage: false,
    // Additional metadata
    intensity: getExerciseIntensity(category, isWeighted),
    cues: extractExerciseCues(instructions)
  }
}

// Helper functions to handle muscle data from real WGER API
export const extractMuscleId = (muscle: number | WgerMuscleObject): number => {
  return typeof muscle === 'number' ? muscle : muscle.id
}

export const extractMuscleName = (muscle: number | WgerMuscleObject): string => {
  if (typeof muscle === 'number') {
    return muscleMapping[muscle] || `muscle_${muscle}`
  }
  // Use name_en if available, otherwise use name, otherwise fallback to mapping
  return muscle.name_en || muscle.name || muscleMapping[muscle.id] || `muscle_${muscle.id}`
}

export const extractMuscleIds = (muscles: (number | WgerMuscleObject)[]): number[] => {
  return muscles.map(extractMuscleId)
}

export const extractMuscleNames = (muscles: (number | WgerMuscleObject)[]): string[] => {
  return muscles.map(extractMuscleName)
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

// Enhance exercises with real images from WGER API
export const enhanceExercisesWithImages = async (exercises: Exercise[]): Promise<Exercise[]> => {
  console.log(`🎯 Enhancing ${exercises.length} exercises with images...`)
  
  const enhancedExercises = await Promise.all(
    exercises.map(async (exercise) => {
      try {
        // Only fetch images for exercises from real WGER API (not mock data)
        const exerciseId = parseInt(exercise.id)
        if (isNaN(exerciseId)) {
          console.log(`⏭️ Skipping mock exercise: ${exercise.name} (ID: ${exercise.id})`)
          return exercise // Keep mock exercises as-is
        }
        
        console.log(`🔍 Checking images for: ${exercise.name} (ID: ${exerciseId})`)
        
        // Fetch images for this exercise
        const images = await fetchExerciseImages(exerciseId)
        
        if (images.length > 0) {
          const { imageUrl, thumbnailUrl } = await getExerciseImageUrl(images)
          console.log(`✅ Enhanced ${exercise.name} with image: ${imageUrl ? 'base64 data' : 'original URL'}`)
          return {
            ...exercise,
            imageUrl: imageUrl || exercise.imageUrl,
            thumbnailUrl: thumbnailUrl || exercise.thumbnailUrl,
            hasRealImage: !!imageUrl
          }
        } else {
          console.log(`❌ No images found for: ${exercise.name} (ID: ${exerciseId})`)
        }
        
        return exercise
      } catch (error) {
        console.warn(`Failed to enhance exercise ${exercise.id} with images:`, error)
        return exercise
      }
    })
  )
  
  console.log(`🏁 Image enhancement complete. ${enhancedExercises.filter(ex => ex.hasRealImage).length} exercises have real images.`)
  return enhancedExercises
}

// Search relevance scoring function
export const calculateSearchRelevance = (exercise: Exercise, searchTerm: string): number => {
  const query = searchTerm.toLowerCase().trim()
  const name = exercise.name.toLowerCase()
  const description = exercise.instructions.join(' ').toLowerCase()
  const muscles = exercise.primaryMuscles.join(' ').toLowerCase()
  
  let score = 0
  
  // Exact name match gets highest score
  if (name === query) score += 100
  
  // Name starts with query gets high score
  else if (name.startsWith(query)) score += 80
  
  // Name contains query gets good score
  else if (name.includes(query)) {
    // Prioritize matches at word boundaries
    if (name.includes(` ${query}`) || name.includes(`${query} `)) score += 60
    else score += 40
  }
  
  // Check for individual words in query
  const queryWords = query.split(' ').filter(word => word.length > 2)
  queryWords.forEach(word => {
    if (name.includes(word)) score += 20
    if (muscles.includes(word)) score += 10
    if (description.includes(word)) score += 5
  })
  
  // Bonus for exercise variations that include common terms
  const variationBonus = [
    'dumbbell', 'barbell', 'cable', 'machine', 'smith',
    'incline', 'decline', 'flat', 'seated', 'standing'
  ]
  
  variationBonus.forEach(term => {
    if (query.includes(term) && name.includes(term)) score += 15
  })
  
  // Penalty for very long names (often less specific)
  if (name.length > 40) score -= 5
  
  return score
}

// Sort exercises by search relevance
export const sortByRelevance = (exercises: Exercise[], searchTerm: string): Exercise[] => {
  if (!searchTerm || searchTerm.length < 2) {
    return exercises // No sorting for very short queries
  }
  
  return exercises
    .map(exercise => ({
      exercise,
      score: calculateSearchRelevance(exercise, searchTerm)
    }))
    .sort((a, b) => b.score - a.score) // Highest score first
    .map(item => item.exercise)
}

// Exercise cache
let exerciseCache: Exercise[] = []

// Fuse.js configuration for fuzzy search
const fuseOptions: IFuseOptions<Exercise> = {
  keys: [
    {
      name: 'name',
      weight: 3 // Highest weight for exercise name
    },
    {
      name: 'description',
      weight: 2 // Medium weight for description
    },
    {
      name: 'instructions',
      weight: 1.5 // Medium-low weight for instructions
    },
    {
      name: 'primaryMuscles',
      weight: 1.2 // Low-medium weight for muscle groups
    },
    {
      name: 'target',
      weight: 1 // Lower weight for target muscle
    },
    {
      name: 'equipment',
      weight: 0.8 // Lower weight for equipment
    },
    {
      name: 'bodyPart',
      weight: 0.5 // Lowest weight for body part
    }
  ],
  threshold: 0.4, // Lower threshold = more strict matching (0.0 = perfect match, 1.0 = match anything)
  distance: 100, // Maximum allowed distance for fuzzy matching
  minMatchCharLength: 2, // Minimum characters to trigger search
  ignoreLocation: true, // Don't care about match location in string
  includeScore: true, // Include relevance score in results
  includeMatches: true, // Include match information
  shouldSort: true, // Sort results by relevance
  findAllMatches: false, // Stop at first match per field
  useExtendedSearch: false // Don't use advanced search syntax
}

// Perform fuzzy search on exercises
export const fuzzySearchExercises = (exercises: Exercise[], searchQuery: string): Exercise[] => {
  if (!searchQuery || searchQuery.trim().length < 2) {
    return exercises
  }

  // Create a new fuse instance for each search to ensure fresh data
  const fuse = new Fuse(exercises, fuseOptions)
  const results = fuse.search(searchQuery)
  
  // Extract exercises from fuse results and maintain their scores
  return results.map(result => {
    const exercise = result.item
    // Add search score as metadata (lower score = better match)
    ;(exercise as any)._fuseScore = result.score
    return exercise
  })
}

// Real WGER API function
export const fetchExercisesFromWger = async (filter: ExerciseFilter = {}): Promise<WgerExercise[]> => {
  const { search = '', limit = 50 } = filter
  
  try {
    // Use exerciseinfo endpoint which has actual names and descriptions
    let url = 'https://wger.de/api/v2/exerciseinfo/?format=json'
    
    // Add search parameter if provided
    if (search && search.length > 0) {
      url += `&search=${encodeURIComponent(search)}`
    }
    
    // Add limit
    url += `&limit=${limit}`
    
    console.log('Fetching from real WGER API (exerciseinfo):', url)
    
    const response = await fetch(url)
    
    if (!response.ok) {
      throw new Error(`WGER API error: ${response.status} ${response.statusText}`)
    }
    
    const data = await response.json()
    console.log(`WGER API returned ${data.results?.length || 0} exercise info objects`)
    
    // Convert WgerExerciseInfo to WgerExercise format
    const convertedExercises: WgerExercise[] = (data.results || []).map((info: WgerExerciseInfo) => {
      // Get English translation (language=2) or first available
      const englishTranslation = info.translations.find(t => t.language === 2) || info.translations[0]
      
      // Extract muscle IDs from potentially mixed format (objects or IDs)
      const primaryMuscleIds = extractMuscleIds(info.muscles || [])
      const secondaryMuscleIds = extractMuscleIds(info.muscles_secondary || [])
      
      return {
        id: info.id,
        uuid: info.uuid,
        name: englishTranslation?.name || 'Unknown Exercise',
        exercise_base: info.id, // Use id as exercise_base
        description: englishTranslation?.description || '',
        category: info.category,
        muscles: primaryMuscleIds,
        muscles_secondary: secondaryMuscleIds,
        equipment: info.equipment || [],
        language: 2 // English
      }
    })
    
    console.log('Converted exercises:', convertedExercises.map(ex => ({ id: ex.id, name: ex.name })))
    
    return convertedExercises
    
  } catch (error) {
    console.error('Failed to fetch from WGER API:', error)
    throw error
  }
}

// Main API function with real WGER integration
export const fetchExercises = async (filter: ExerciseFilter = {}): Promise<Exercise[]> => {
  const { bodyPart = '', muscleGroup, search = '', limit = 50 } = filter
  
  try {
    // Try real WGER API first
    if (search && search.length >= 3) {
      console.log('Searching real WGER API for:', search)
      
      try {
        const wgerExercises = await fetchExercisesFromWger({ search, limit: limit * 2 })
        
        if (wgerExercises.length > 0) {
          // Map WGER exercises to our format
          let mappedExercises = wgerExercises.map(mapWgerToExercise)
          
          // Apply muscle group filter after mapping
          if (muscleGroup && muscleGroup !== 'all') {
            mappedExercises = mappedExercises.filter(ex => ex.muscleGroup === muscleGroup)
          }
          
          // Apply fuzzy search for better relevance
          mappedExercises = fuzzySearchExercises(mappedExercises, search)
          
          // Enhance with real images (only for first few results to avoid too many API calls)
          const limitedResults = mappedExercises.slice(0, limit)
          const enhancedResults = await enhanceExercisesWithImages(limitedResults.slice(0, 10))
          
          // Combine enhanced results with remaining results
          const finalResults = [
            ...enhancedResults,
            ...limitedResults.slice(10)
          ]
          
          console.log(`Real WGER API returned ${finalResults.length} filtered, sorted, and enhanced exercises`)
          return finalResults
        }
      } catch (apiError) {
        console.warn('WGER API failed, falling back to mock data:', apiError)
      }
    }
    
    // Fallback to mock data for short searches or when API fails
    console.log('Using mock WGER data...', filter)
    
    // If we have cached exercises and only searching, use fuzzy search locally
    if (exerciseCache.length > 0 && search.length > 0) {
      console.log('Using cached exercises for fuzzy search')
      
      // Apply muscle group filter first if specified
      let searchableExercises = exerciseCache
      if (muscleGroup && muscleGroup !== 'all') {
        searchableExercises = exerciseCache.filter(ex => ex.muscleGroup === muscleGroup)
      }
      
      // Perform fuzzy search
      const fuzzyResults = fuzzySearchExercises(searchableExercises, search)
      
      console.log(`🔍 Fuzzy search for "${search}" returned ${fuzzyResults.length} results`)
      
      return fuzzyResults.slice(0, limit)
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
    
    // Map to our format first
    let mappedExercises = filtered.map(mapWgerToExercise)
    
    // Apply muscle group filter after mapping (since muscleGroup is computed)
    if (muscleGroup && muscleGroup !== 'all') {
      mappedExercises = mappedExercises.filter(ex => ex.muscleGroup === muscleGroup)
    }
    
    // Apply fuzzy search if searching
    if (search && search.length > 0) {
      mappedExercises = fuzzySearchExercises(mappedExercises, search)
      console.log(`🔍 Fuzzy search on mock data for "${search}" returned ${mappedExercises.length} results`)
    }
    
    console.log(`Mock API returned ${mappedExercises.length} exercises`)
    
    // Cache results
    if (!search && !bodyPart && !muscleGroup) {
      exerciseCache = mappedExercises
    }
    
    return mappedExercises.slice(0, limit)
    
  } catch (error) {
    console.error('All API methods failed:', error)
    return getFallbackExercises()
  }
}

// Use real WGER exercises as fallbacks (converted to our format)
export const getFallbackExercises = (): Exercise[] => {
  // Using real WGER exercise data but with our custom images for better UX
  const realWgerFallbacks: WgerExercise[] = [
    {
      id: 167,
      uuid: "b186f1f8-4957-44dc-bf30-d0b00064ce6f",
      name: "Crunches",
      exercise_base: 84,
      description: "<p>Lay down on your back a soft surface, the feet are on the floor. Ask a partner or use some other help to ensure your feet remain stable. Place your hands behind your head.</p><p>Now crunch your upper body up, do not use momentum but make it a controlled movement. Go up as much as you can, hold the contraction briefly and slowly let your body down till your head almost touches the floor.</p><p>Don't forget to breathe regularly.</p>",
      category: 10,
      muscles: [6], // Rectus abdominis
      muscles_secondary: [14], // Obliques
      equipment: [7], // Body weight
      language: 2
    },
    {
      id: 135,
      uuid: "833c5f85-3ee0-4cc5-aceb-9ec097f24d60", 
      name: "Butterfly",
      exercise_base: 61,
      description: "<p>Sit on the butterfly machine, the feet have a good contact with the floor, the upper arms are parallel to the floor. Grab the handles and push your arms together in a hugging motion.</p><p>Slowly let your arms back to the starting position and repeat the movement.</p>",
      category: 11,
      muscles: [4], // Pectoralis major
      muscles_secondary: [2], // Anterior deltoid
      equipment: [], // Machine (no specific equipment ID)
      language: 2
    },
    {
      id: 74,
      uuid: "test-uuid-3",
      name: "Squat", 
      exercise_base: 74,
      description: "<p>Stand with feet shoulder-width apart. Lower your body by pushing your hips back and down as if sitting in a chair. Keep your chest up and core engaged. Lower until your thighs are parallel to the floor, then drive through your heels to return to standing.</p>",
      category: 9,
      muscles: [10], // Quadriceps
      muscles_secondary: [8], // Glutes
      equipment: [7], // Body weight
      language: 2
    }
  ]

  return realWgerFallbacks.map((wgerEx, index) => {
    const mapped = mapWgerToExercise(wgerEx)
    
    // Override with our custom images for better visual consistency
    const customImages = [
      '/assets/exercise-images/crunches.png', // Use the WGER image we downloaded
      '/assets/exercise-images/butterfly.png', // Use the WGER image we downloaded
      '/assets/exercise-images/barbell-squat.svg' // Use our custom SVG
    ]
    
    return {
      ...mapped,
      imageUrl: customImages[index],
      thumbnailUrl: customImages[index],
      hasRealImage: true
    }
  })
}

// Get exercise by ID
export const getExerciseById = (id: string, exercises: Exercise[] = exerciseCache): Exercise | undefined => {
  return exercises.find(ex => ex.id === id)
}

// Test function for fuzzy search
export const testFuzzySearch = async (searchTerm = 'goblit'): Promise<void> => {
  console.log(`🧪 Testing fuzzy search with: "${searchTerm}"`)
  
  try {
    const startTime = Date.now()
    const exercises = await fetchExercises({ search: searchTerm, limit: 10 })
    const duration = Date.now() - startTime
    
    console.log(`✅ Fuzzy search test completed in ${duration}ms`)
    console.log(`📊 Found ${exercises.length} exercises:`)
    
    exercises.forEach((ex, index) => {
      const fuseScore = (ex as any)._fuseScore
      console.log(`  ${index + 1}. ${ex.name} (ID: ${ex.id})`)
      console.log(`     Equipment: ${ex.equipment} | Group: ${ex.muscleGroup}`)
      if (fuseScore !== undefined) {
        console.log(`     Fuse Score: ${fuseScore.toFixed(3)} (lower = better match)`)
      }
      if (ex.primaryMuscles.length > 0) {
        console.log(`     Muscles: ${ex.primaryMuscles.join(', ')}`)
      }
    })
    
    // Test specific typo tolerance
    if (searchTerm.toLowerCase() === 'goblit') {
      const gobletMatches = exercises.filter(ex => 
        ex.name.toLowerCase().includes('goblet')
      )
      
      if (gobletMatches.length > 0) {
        console.log(`\n✅ SUCCESS: Fuzzy search found ${gobletMatches.length} "goblet" matches for typo "${searchTerm}"`)
        gobletMatches.forEach(match => {
          console.log(`  - ${match.name}`)
        })
      } else {
        console.log(`\n❌ FAIL: No "goblet" matches found for typo "${searchTerm}"`)
      }
    }
    
  } catch (error) {
    console.error('❌ Fuzzy search test failed:', error)
  }
}

// Fetch detailed exercise information from WGER API
export const fetchExerciseInfo = async (exerciseId: number): Promise<WgerExerciseInfo | null> => {
  try {
    const url = `https://wger.de/api/v2/exerciseinfo/${exerciseId}/`
    console.log(`🔍 Fetching exercise info for ID: ${exerciseId}`)
    
    const response = await fetch(url, {
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
      }
    })
    
    if (!response.ok) {
      if (response.status === 404) {
        console.log(`Exercise ${exerciseId} not found`)
        return null
      }
      throw new Error(`Failed to fetch exercise info: ${response.status} ${response.statusText}`)
    }
    
    const exerciseInfo: WgerExerciseInfo = await response.json()
    console.log(`📋 Exercise info for ${exerciseId}:`, exerciseInfo)
    
    return exerciseInfo
  } catch (error) {
    console.error(`Failed to fetch exercise info for ${exerciseId}:`, error)
    throw error
  }
}

// Calculate muscle activation percentages (enhanced version)
export const calculateMuscleActivation = (primaryMuscleIds: number[], secondaryMuscleIds: number[] = []): { muscle: string; percentage: number }[] => {
  const activations: { muscle: string; percentage: number }[] = []
  
  // Primary muscles get 80-100% activation
  primaryMuscleIds.forEach((muscleId, index) => {
    const muscleName = muscleMapping[muscleId] || `Muscle ${muscleId}`
    const percentage = Math.max(100 - (index * 15), 70) // First primary muscle gets 100%, subsequent get less
    activations.push({
      muscle: muscleName.charAt(0).toUpperCase() + muscleName.slice(1),
      percentage
    })
  })
  
  // Secondary muscles get 40-60% activation
  secondaryMuscleIds.forEach((muscleId, index) => {
    const muscleName = muscleMapping[muscleId] || `Muscle ${muscleId}`
    const percentage = Math.max(60 - (index * 10), 30) // First secondary muscle gets 60%, subsequent get less
    activations.push({
      muscle: muscleName.charAt(0).toUpperCase() + muscleName.slice(1),
      percentage
    })
  })
  
  return activations.sort((a, b) => b.percentage - a.percentage) // Sort by activation level
}

// Test function for WGER API integration
export const testWgerApi = async (searchTerm = 'chest fly'): Promise<void> => {
  console.log(`🧪 Testing WGER API with search: "${searchTerm}"`)
  
  try {
    const startTime = Date.now()
    const exercises = await fetchExercises({ search: searchTerm, limit: 10 })
    const duration = Date.now() - startTime
    
    console.log(`✅ WGER API test completed in ${duration}ms`)
    console.log(`📊 Found ${exercises.length} exercises:`)
    
    exercises.forEach((ex, index) => {
      const isFromRealAPI = !mockWgerData.some(mock => mock.id.toString() === ex.id)
      const relevanceScore = calculateSearchRelevance(ex, searchTerm)
      console.log(`  ${index + 1}. ${ex.name} (ID: ${ex.id}) [Score: ${relevanceScore}]`)
      console.log(`     Group: ${ex.muscleGroup} | Equipment: ${ex.equipment}`)
      console.log(`     Source: ${isFromRealAPI ? '🌐 Real WGER API' : '📂 Mock Data'}`)
      if (ex.primaryMuscles.length > 0) {
        console.log(`     Muscles: ${ex.primaryMuscles.join(', ')}`)
      }
      if (ex.primaryMuscles.some(m => m.includes('[Object object]'))) {
        console.log(`     ⚠️  Found muscle mapping issue!`)
      }
    })
    
    // Check if we got real API results vs mock data
    const realApiResults = exercises.filter(ex => 
      !mockWgerData.some(mock => mock.id.toString() === ex.id)
    )
    
    if (realApiResults.length > 0) {
      console.log(`\n🌐 ${realApiResults.length} results from real WGER API`)
      console.log(`📂 ${exercises.length - realApiResults.length} results from mock data`)
    } else {
      console.log(`\n📂 All ${exercises.length} results from mock data (API may have failed or returned no results)`)
    }
    
  } catch (error) {
    console.error('❌ WGER API test failed:', error)
  }
}