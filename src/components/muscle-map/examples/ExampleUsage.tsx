import React from 'react'
import MuscleHighlighter from '../MuscleHighlighter'

// Example usage patterns for the unified MuscleHighlighter component

// 1. Single Exercise Usage
export const SingleExerciseExample: React.FC = () => {
  const exercise = {
    primaryMuscleIds: [4, 1], // Chest, Biceps
    secondaryMuscleIds: [5, 15], // Shoulders, Triceps
    name: "Bench Press"
  }

  return (
    <MuscleHighlighter
      exercise={exercise}
      showLegend={true}
      showMuscleList={true}
      size="medium"
    />
  )
}

// 2. Workout Overview Usage
export const WorkoutOverviewExample: React.FC = () => {
  const exercises = [
    {
      primaryMuscleIds: [4, 1], // Chest, Biceps
      secondaryMuscleIds: [5, 15], // Shoulders, Triceps
      name: "Bench Press"
    },
    {
      primaryMuscleIds: [2, 8], // Lats, Back
      secondaryMuscleIds: [1, 13], // Biceps, Rear Delts
      name: "Pull-ups"
    },
    {
      primaryMuscleIds: [10, 11], // Quads, Glutes
      secondaryMuscleIds: [7, 9], // Hamstrings, Calves
      name: "Squats"
    }
  ]

  return (
    <MuscleHighlighter
      exercises={exercises}
      showLegend={true}
      showMuscleList={true}
      size="large"
    />
  )
}

// 3. Mobile-Optimized Usage
export const MobileOptimizedExample: React.FC = () => {
  const exercise = {
    primaryMuscleIds: [4], // Chest
    secondaryMuscleIds: [5, 15], // Shoulders, Triceps
    name: "Push-ups"
  }

  return (
    <MuscleHighlighter
      exercise={exercise}
      showLegend={true}
      showMuscleList={false}
      size="small"
      forceSingleView={true}
    />
  )
}

// 4. Advanced Usage with Muscle Activation Data
export const AdvancedExample: React.FC = () => {
  const exercise = {
    primaryMuscleIds: [4, 1], // Chest, Biceps
    secondaryMuscleIds: [5, 15], // Shoulders, Triceps
    name: "Incline Dumbbell Press"
  }

  const muscleActivation = [
    { muscle: "Pectoralis Major", percentage: 85 },
    { muscle: "Anterior Deltoid", percentage: 65 },
    { muscle: "Triceps Brachii", percentage: 45 },
    { muscle: "Biceps Brachii", percentage: 25 }
  ]

  return (
    <MuscleHighlighter
      exercise={exercise}
      showLegend={true}
      showMuscleList={true}
      size="medium"
      muscleActivation={muscleActivation}
    />
  )
}

// 5. Integration Example for Exercise Detail Modal
export const ExerciseDetailModalExample: React.FC<{
  exercise: {
    id: number
    name: string
    primaryMuscleIds: number[]
    secondaryMuscleIds: number[]
  }
}> = ({ exercise }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-white">{exercise.name}</h3>
      
      <MuscleHighlighter
        exercise={{
          primaryMuscleIds: exercise.primaryMuscleIds,
          secondaryMuscleIds: exercise.secondaryMuscleIds,
          name: exercise.name
        }}
        showLegend={true}
        showMuscleList={true}
        size="medium"
        className="border border-neu-light rounded-xl"
      />
    </div>
  )
}

// 6. Integration Example for Workout Summary
export const WorkoutSummaryExample: React.FC<{
  workoutExercises: Array<{
    name: string
    primaryMuscleIds: number[]
    secondaryMuscleIds: number[]
  }>
}> = ({ workoutExercises }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-white">
        Muscle Groups Targeted ({workoutExercises.length} exercises)
      </h3>
      
      <MuscleHighlighter
        exercises={workoutExercises}
        showLegend={true}
        showMuscleList={true}
        size="large"
        className="bg-neu-surface shadow-neu rounded-xl p-4"
      />
    </div>
  )
}