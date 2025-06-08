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
}

// WGER API Exercise Structure
export interface WgerExercise {
  id: number
  uuid: string
  name: string
  exercise_base: number
  description: string
  category: number
  muscles: number[]
  muscles_secondary: number[]
  equipment: number[]
  language: number
}

// Exercise Configuration
export interface ExerciseConfig {
  sets: number
  reps: number
  weight: number
  rest: number
  rpe: number
  tempo: string
  notes: string
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
  exercises: WorkoutExercise[]
  supersets: Superset[]
  circuits: Circuit[]
  tags: string[]
  createdAt?: Date
  updatedAt?: Date
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
  completedAt: Date
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
  exercises: WorkoutExercise[]
  supersets: Superset[]
  circuits: Circuit[]
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