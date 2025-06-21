import { useState, useEffect } from 'react'
import { X, Timer, Check } from 'lucide-react'
import { Workout, WorkoutSession } from '@/types'

interface TrainScreenProps {
  currentWorkout: Workout | null
  onEndWorkout: () => void
}

export default function TrainScreen({ currentWorkout, onEndWorkout }: TrainScreenProps) {
  const [workoutSession, setWorkoutSession] = useState<WorkoutSession | null>(null)

  // Update workoutSession when currentWorkout changes
  useEffect(() => {
    if (currentWorkout && !workoutSession) {
      setWorkoutSession({
        ...currentWorkout,
        startTime: new Date(),
        completedSets: {},
        logs: {}
      })
    } else if (!currentWorkout) {
      setWorkoutSession(null)
    }
  }, [currentWorkout, workoutSession])

  const handleEndWorkout = () => {
    onEndWorkout()
  }

  const handleCloseWorkout = () => {
    onEndWorkout()
  }

  const completeSet = (exerciseIndex: number, setIndex: number) => {
    if (!workoutSession) return
    
    const key = `${exerciseIndex}-${setIndex}`
    setWorkoutSession(prev => prev ? {
      ...prev,
      completedSets: {
        ...prev.completedSets,
        [key]: !prev.completedSets[key]
      }
    } : null)
  }

  if (!workoutSession) {
    return (
      <div className="flex-1 flex items-center justify-center pb-20 lg:pb-0 lg:pt-24">
        <div className="text-center">
          <div className="text-6xl mb-4">⚔️</div>
          <h2 className="text-h2 text-white mb-2">Ready for Battle</h2>
          <p className="text-gray-400 mb-6">Starting workout session...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-y-auto pb-20 lg:pb-0 lg:pt-24">
      {/* Workout Header */}
      <div className="bg-background p-4 border-b border-divider sticky top-0 lg:top-24 z-10">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-h1 text-white" style={{fontSize: '1.125rem'}}>{workoutSession.title}</h1>
            <p className="text-gray-400 text-sm">
              {workoutSession.startTime.toLocaleTimeString()}
            </p>
          </div>
          <button
            onClick={handleCloseWorkout}
            className="bg-gray-800 p-2 rounded-lg text-[#C3A869] hover:bg-gray-700 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Exercise List */}
      <div className="p-4 lg:p-6 grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        {workoutSession.exercises?.map((exercise, exerciseIndex) => {
          const exerciseData = exercise.exerciseData
          return (
            <div key={exerciseIndex} className="bg-gray-800 rounded-xl p-4">
              <div className="flex items-center mb-3">
                <span className="text-2xl mr-3">{exerciseData?.icon}</span>
                <div className="flex-1">
                  <h3 className="text-h3 text-white">{exerciseData?.name}</h3>
                  <p className="text-gray-400 text-sm">
                    {exercise.sets} × {exercise.reps} @ {exercise.weight || exercise.load}kg
                  </p>
                </div>
              </div>
              
              {/* Set Tracking */}
              <div className="grid grid-cols-4 gap-2">
                {Array.from({ length: exercise.sets }).map((_, setIndex) => {
                  const isCompleted = workoutSession.completedSets[`${exerciseIndex}-${setIndex}`]
                  return (
                    <button
                      key={setIndex}
                      onClick={() => completeSet(exerciseIndex, setIndex)}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        isCompleted
                          ? 'bg-primary border-primary text-black'
                          : 'bg-gray-700 border-gray-600 text-white hover:border-gray-500'
                      }`}
                    >
                      <div className="text-sm font-medium">Set {setIndex + 1}</div>
                      <div className="text-sm opacity-75">{exercise.reps} reps</div>
                      {isCompleted && <Check className="w-4 h-4 mx-auto mt-1" />}
                    </button>
                  )
                })}
              </div>
              
              {/* Rest Timer */}
              <div className="mt-3 pt-3 border-t border-gray-700">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400 flex items-center">
                    <Timer className="w-4 h-4 mr-1" />
                    Rest: {exercise.rest}s
                  </span>
                  <span className="text-primary text-sm">RPE: {exercise.rpe}</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Complete Workout Button */}
      <div className="fixed bottom-20 lg:bottom-6 left-4 right-4 lg:left-6 lg:right-6 xl:left-1/4 xl:right-1/4">
        <button
          onClick={handleEndWorkout}
          className="w-full btn-primary py-4 rounded-xl font-medium text-lg"
        >
          Complete Workout 🏆
        </button>
      </div>
    </div>
  )
}