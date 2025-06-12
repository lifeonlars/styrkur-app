// Muscle groups for filtering
export type MuscleGroup = 'chest' | 'back' | 'shoulders' | 'arms' | 'legs' | 'core' | 'full-body'

// Core Exercise Types
export interface Exercise {
  id: string
  name: string
  bodyPart: string // Legacy field, kept for compatibility
  equipment: string
  target: string
  primaryMuscles: string[]
  secondaryMuscles: string[]
  primaryMuscleIds: number[] // WGER muscle IDs
  secondaryMuscleIds: number[] // WGER muscle IDs
  muscleGroup: MuscleGroup // Computed muscle group for filtering
  instructions: string[]
  category: number
  uuid: string
  icon: string
  isWeighted: boolean
  wgerData?: WgerExercise
  // New image and description fields
  imageUrl?: string
  thumbnailUrl?: string
  description?: string
  hasRealImage?: boolean
  // Additional metadata
  intensity?: string
  cues?: string
}

// WGER API Exercise Structure (supports both mock and real API formats)
export interface WgerExercise {
  id: number
  uuid: string
  name: string
  exercise_base: number
  description: string
  category: number
  muscles: (number | WgerMuscleObject)[]
  muscles_secondary: (number | WgerMuscleObject)[]
  equipment: number[]
  language: number
}

// WGER Muscle Object from API
export interface WgerMuscleObject {
  id: number
  name: string
  name_en: string
  is_front: boolean
  image_url_main: string
  image_url_secondary: string
}

// WGER Exercise Image from API
export interface WgerExerciseImage {
  id: number
  uuid: string
  exercise: number
  exercise_uuid: string
  image: string
  is_main: boolean
  license: number
  license_author: string
  license_title: string
}

// WGER API ExerciseInfo interface (real API structure)
export interface WgerExerciseInfo {
  id: number
  category: number
  muscles: (number | WgerMuscleObject)[] // Can be IDs or full objects
  muscles_secondary: (number | WgerMuscleObject)[]
  equipment: number[]
  variations: number | null
  license_author: string
  uuid: string
  created: string
  last_update: string
  translations: {
    name: string
    description: string
    language: number
  }[]
}

// Exercise Configuration
export interface ExerciseConfig {
  exerciseId: string
  sets?: number
  reps?: number
  weight?: number
  rest?: number
  tempo?: string
  notes?: string
  // RPE is now handled at the group level, not per exercise
}

// Exercise Group Types
export type ExerciseGroupType = 'single' | 'superset' | 'circuit'
export type TimingStyle = 'AMRAP' | 'EMOM' | 'HIIT'

// Workout Entry - supports singles, supersets, and circuits
export interface WorkoutEntry {
  id: string
  type: ExerciseGroupType
  label?: string                      // e.g., "Superset A" or "Circuit 1"
  exercises: ExerciseConfig[]         // 1+ exercises per entry
  sets: number                        // number of sets for the entire group
  restBetweenExercises?: number       // optional: for circuits (seconds)
  rounds?: number                     // optional: for circuits
  timingStyle?: TimingStyle           // optional metadata
  restAfterGroup?: number             // rest after completing the group (seconds)
  // RPE configuration based on group type:
  groupRPE?: number                   // For single and superset groups: one RPE for the entire group
  // Circuits do not have RPE fields
}

// Workout Exercise (Exercise + Configuration)
export interface WorkoutExercise {
  id: number
  exerciseId: string
  exerciseData: Exercise
  sets: number
  reps: number
  weight: number
  load: number
  rest: number
  rpe: number
  tempo?: string
  notes?: string
  type: 'single'
}

// Superset
export interface Superset {
  id: number
  type: 'superset'
  name: string
  exercises: WorkoutExercise[]
  rounds: number
  rest: number
}

// Circuit
export interface Circuit {
  id: number
  type: 'circuit'
  name: string
  exercises: WorkoutExercise[]
  rounds: number
  rest: number
}

// Workout
export interface Workout {
  id: number
  title: string
  description: string
  entries: WorkoutEntry[]              // New unified structure for all exercise groups
  tags: string[]
  createdAt?: Date
  updatedAt?: Date
  // Legacy fields for backward compatibility
  exercises?: WorkoutExercise[]
  supersets?: Superset[]
  circuits?: Circuit[]
}

// Workout Session (for tracking during workout)
export interface WorkoutSession extends Workout {
  startTime: Date
  endTime?: Date
  completedSets: Record<string, boolean>
  logs: Record<string, ExerciseLog>
}

// Exercise Log (for tracking performance)
export interface ExerciseLog {
  exerciseId: string
  setLogs: SetLog[]
  notes?: string
  rpe?: number
}

export interface SetLog {
  setNumber: number
  reps: number
  weight: number
  rpe?: number
  isCompleted: boolean
  completedAt?: Date
  notes?: string
}

// Enhanced Workout Session Types for Logging Modal
export interface WorkoutSessionState {
  sessionId: string
  workout: Workout
  startTime: Date
  currentGroupIndex: number
  groupLogs: Record<string, GroupSessionLog> // Key: groupId
  isCompleted: boolean
  endTime?: Date
  pausedAt?: Date // Timestamp when session was paused
  // Legacy support for backward compatibility
  logs?: Record<string, ExerciseSessionLog>
}

export interface GroupSessionLog {
  groupId: string
  groupType: ExerciseGroupType
  label?: string
  plannedSets: number // For supersets/circuits, this is rounds
  setLogs: GroupSetLog[]
  groupNotes?: string
  // RPE tracking based on group type:
  groupRPE?: number                   // For single and superset groups: one RPE for the entire group
  // Circuits do not have RPE fields
}

export interface GroupSetLog {
  setNumber: number // Set number or round number
  exercises: ExerciseInSetLog[]
  isCompleted: boolean
  completedAt?: Date
  // RPE is no longer stored at the set level - moved to group level for single/superset
  // For circuits: no RPE
}

export interface ExerciseInSetLog {
  exerciseId: string
  exerciseData: Exercise
  reps: number
  weight: number
  isCompleted: boolean
  notes?: string
  // RPE is no longer at the exercise level - moved to group or set level
}

// Legacy interface for backward compatibility
export interface ExerciseSessionLog {
  exerciseId: string
  exerciseData: Exercise
  groupId: string
  groupType: ExerciseGroupType
  plannedSets: number
  setLogs: SetLog[]
  exerciseNotes?: string
  groupRPE?: number
}

export interface WorkoutSessionSummary {
  sessionId: string
  workoutTitle: string
  startTime: Date
  endTime: Date
  totalSets: number
  completedSets: number
  totalWeight: number
  totalReps: number
  duration: number // minutes
  exercises: {
    name: string
    sets: number
    reps: number
    weight: number
  }[]
  notes?: string
}

// Program Types
export interface Program {
  id: number
  name: string
  description: string
  duration: number // weeks
  workouts: Workout[]
  schedule: ProgramSchedule[]
  tags: string[]
  createdAt?: Date
  updatedAt?: Date
}

export interface ProgramSchedule {
  week: number
  day: number
  workoutId: number
  restDay?: boolean
}

// Filter and Search Types
export interface ExerciseFilter {
  bodyPart?: string // Legacy support
  muscleGroup?: MuscleGroup | 'all'
  equipment?: string
  search?: string
  limit?: number
}

// UI State Types
export interface WorkoutForm {
  title: string
  description: string
  entries: WorkoutEntry[]              // New unified structure
  // Legacy fields for backward compatibility
  exercises?: WorkoutExercise[]
  supersets?: Superset[]
  circuits?: Circuit[]
}

// Tab Navigation
export interface NavigationTab {
  id: string
  icon: React.ComponentType<any>
  label: string
}

// Norse themed icons mapping
export interface NorseIcons {
  [key: string]: string
}

// Modal Types
export type ModalType = 'workout' | 'program' | 'exercise' | null

// API Response Types
export interface WgerResponse {
  count: number
  next: string | null
  previous: string | null
  results: WgerExercise[]
}

// Equipment and Muscle Mappings
export interface EquipmentMapping {
  [key: number]: string
}

export interface MuscleMapping {
  [key: number]: string
}

export interface CategoryMapping {
  [key: number]: string
}