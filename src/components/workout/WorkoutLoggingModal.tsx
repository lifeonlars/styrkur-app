import { useState, useEffect, useCallback, useRef } from 'react'
import { X, Check, Clock, Target } from 'lucide-react'
import { Workout, Exercise, WorkoutSessionState, GroupSessionLog, GroupSetLog, ExerciseInSetLog, WorkoutSessionSummary } from '@/types'
import { saveWorkoutSession, clearWorkoutSession, saveWorkoutToHistory, savePausedWorkoutSession, hasCompletedSets } from '@/lib/sessionStorage'
import { fetchExercises } from '@/lib/wger'
import LoggedExerciseCard from './LoggedExerciseCard'
import GroupedExerciseCard from './GroupedExerciseCard'

interface WorkoutLoggingModalProps {
  workout: Workout
  initialSession?: WorkoutSessionState
  onFinishSession: (summary: WorkoutSessionSummary) => void
  onClose: () => void
  onPauseSession?: (session: WorkoutSessionState) => void
}

export default function WorkoutLoggingModal({
  workout,
  initialSession,
  onFinishSession,
  onClose,
  onPauseSession
}: WorkoutLoggingModalProps) {
  const [availableExercises, setAvailableExercises] = useState<Exercise[]>([])
  const [isLoadingExercises, setIsLoadingExercises] = useState(true)
  
  const [session, setSession] = useState<WorkoutSessionState>(() => {
    if (initialSession) {
      return initialSession
    }

    // Create new session with grouped structure
    const sessionId = `session_${Date.now()}`
    const groupLogs: Record<string, GroupSessionLog> = {}

    // Initialize group logs for all exercise groups
    const initializeGroupLogs = () => {
      // Handle new unified structure (entries)
      if (workout.entries && workout.entries.length > 0) {
        workout.entries.forEach((entry, entryIndex) => {
          const groupId = entry.id || `entry-${entryIndex}`
          
          // Create placeholder exercise data for now (will be updated when exercises load)
          const exercises: ExerciseInSetLog[] = entry.exercises.map((exerciseConfig) => ({
            exerciseId: exerciseConfig.exerciseId,
            exerciseData: {
              id: exerciseConfig.exerciseId,
              name: exerciseConfig.exerciseId, // Will be updated when exercises load
              bodyPart: 'unknown',
              equipment: 'unknown',
              target: 'unknown',
              primaryMuscles: [],
              secondaryMuscles: [],
              primaryMuscleIds: [],
              secondaryMuscleIds: [],
              muscleGroup: 'full-body',
              instructions: [],
              category: 0,
              uuid: '',
              icon: '💪',
              isWeighted: true
            },
            reps: exerciseConfig.reps || 0,
            weight: exerciseConfig.weight || 0,
            isCompleted: false,
            notes: exerciseConfig.notes
          }))

          groupLogs[groupId] = {
            groupId,
            groupType: entry.type,
            label: entry.label,
            plannedSets: entry.sets,
            setLogs: Array.from({ length: entry.sets }, (_, setIndex) => ({
              setNumber: setIndex + 1,
              exercises: exercises.map(ex => ({ ...ex })), // Clone exercises for each set
              isCompleted: false
            })),
            // RPE configuration based on group type
            ...(entry.type !== 'circuit' && entry.groupRPE && { groupRPE: entry.groupRPE })
            // Circuits have no RPE fields
          }
        })
      }

      // Handle legacy structure (exercises, supersets, circuits)
      if (workout.exercises) {
        workout.exercises.forEach((exercise, index) => {
          const groupId = `single-${index}`
          groupLogs[groupId] = {
            groupId,
            groupType: 'single',
            plannedSets: exercise.sets,
            setLogs: Array.from({ length: exercise.sets }, (_, setIndex) => ({
              setNumber: setIndex + 1,
              exercises: [{
                exerciseId: exercise.exerciseId,
                exerciseData: exercise.exerciseData,
                reps: exercise.reps,
                weight: exercise.weight,
                isCompleted: false,
                notes: exercise.notes
              }],
              isCompleted: false
            }))
          }
        })
      }

      if (workout.supersets) {
        workout.supersets.forEach((superset, supersetIndex) => {
          const groupId = `superset-${supersetIndex}`
          const exercises: ExerciseInSetLog[] = superset.exercises.map((exercise) => ({
            exerciseId: exercise.exerciseId,
            exerciseData: exercise.exerciseData,
            reps: exercise.reps,
            weight: exercise.weight,
            isCompleted: false,
            notes: exercise.notes
          }))

          groupLogs[groupId] = {
            groupId,
            groupType: 'superset',
            label: superset.name,
            plannedSets: superset.rounds,
            setLogs: Array.from({ length: superset.rounds }, (_, setIndex) => ({
              setNumber: setIndex + 1,
              exercises: exercises.map(ex => ({ ...ex })), // Clone exercises for each set
              isCompleted: false
            }))
          }
        })
      }

      if (workout.circuits) {
        workout.circuits.forEach((circuit, circuitIndex) => {
          const groupId = `circuit-${circuitIndex}`
          const exercises: ExerciseInSetLog[] = circuit.exercises.map((exercise) => ({
            exerciseId: exercise.exerciseId,
            exerciseData: exercise.exerciseData,
            reps: exercise.reps,
            weight: exercise.weight,
            isCompleted: false,
            notes: exercise.notes
          }))

          groupLogs[groupId] = {
            groupId,
            groupType: 'circuit',
            label: circuit.name,
            plannedSets: circuit.rounds,
            setLogs: Array.from({ length: circuit.rounds }, (_, setIndex) => ({
              setNumber: setIndex + 1,
              exercises: exercises.map(ex => ({ ...ex })), // Clone exercises for each set
              isCompleted: false
            }))
          }
        })
      }
    }

    initializeGroupLogs()

    return {
      sessionId,
      workout,
      startTime: new Date(),
      currentGroupIndex: 0,
      groupLogs,
      isCompleted: false
    }
  })

  const [startTime] = useState(session.startTime)
  const [elapsedTime, setElapsedTime] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const pausedTimeRef = useRef<number>(0)

  // Load exercises for proper exercise data lookup
  useEffect(() => {
    const loadExercises = async () => {
      try {
        setIsLoadingExercises(true)
        const exercises = await fetchExercises({ limit: 200 })
        setAvailableExercises(exercises)
      } catch (error) {
        console.error('Failed to load exercises:', error)
      } finally {
        setIsLoadingExercises(false)
      }
    }
    
    loadExercises()
  }, [])

  // Timer management with pause/resume support
  useEffect(() => {
    const startTimer = () => {
      if (!isPaused) {
        timerRef.current = setInterval(() => {
          setElapsedTime(Math.floor((Date.now() - startTime.getTime() - pausedTimeRef.current) / 1000))
        }, 1000)
      }
    }

    const stopTimer = () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
    }

    if (isPaused) {
      stopTimer()
    } else {
      startTimer()
    }

    return stopTimer
  }, [startTime, isPaused])

  // Initialize timer on mount (calculate from existing session if resuming)
  useEffect(() => {
    if (initialSession?.pausedAt) {
      // Calculate paused time if resuming from paused state
      const pausedDuration = initialSession.pausedAt.getTime() - startTime.getTime()
      pausedTimeRef.current = 0 // Reset paused time when resuming
      setElapsedTime(Math.floor(pausedDuration / 1000))
    }
  }, [])

  // Auto-save session to localStorage
  useEffect(() => {
    saveWorkoutSession(session)
  }, [session])

  // Update session with proper exercise data once exercises are loaded
  useEffect(() => {
    if (!isLoadingExercises && availableExercises.length > 0) {
      setSession(prevSession => {
        const updatedGroupLogs = { ...prevSession.groupLogs }
        
        Object.keys(updatedGroupLogs).forEach(groupId => {
          const groupLog = updatedGroupLogs[groupId]
          const updatedSetLogs = groupLog.setLogs.map(setLog => ({
            ...setLog,
            exercises: setLog.exercises.map(exercise => {
              const exerciseData = availableExercises.find(ex => ex.id === exercise.exerciseId)
              return exerciseData ? { ...exercise, exerciseData } : exercise
            })
          }))
          
          updatedGroupLogs[groupId] = {
            ...groupLog,
            setLogs: updatedSetLogs
          }
        })
        
        return {
          ...prevSession,
          groupLogs: updatedGroupLogs
        }
      })
    }
  }, [isLoadingExercises, availableExercises])

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const updateGroupSet = useCallback((groupId: string, setIndex: number, updates: Partial<GroupSetLog>) => {
    setSession(prev => ({
      ...prev,
      groupLogs: {
        ...prev.groupLogs,
        [groupId]: {
          ...prev.groupLogs[groupId],
          setLogs: prev.groupLogs[groupId].setLogs.map((setLog, index) =>
            index === setIndex ? { ...setLog, ...updates } : setLog
          )
        }
      }
    }))
  }, [])

  const updateExerciseInSet = useCallback((groupId: string, setIndex: number, exerciseIndex: number, updates: Partial<ExerciseInSetLog>) => {
    setSession(prev => ({
      ...prev,
      groupLogs: {
        ...prev.groupLogs,
        [groupId]: {
          ...prev.groupLogs[groupId],
          setLogs: prev.groupLogs[groupId].setLogs.map((setLog, sIndex) =>
            sIndex === setIndex 
              ? {
                  ...setLog,
                  exercises: setLog.exercises.map((exercise, eIndex) =>
                    eIndex === exerciseIndex ? { ...exercise, ...updates } : exercise
                  )
                }
              : setLog
          )
        }
      }
    }))
  }, [])

  const addGroupSet = useCallback((groupId: string) => {
    setSession(prev => {
      const groupLog = prev.groupLogs[groupId]
      const newSetNumber = groupLog.setLogs.length + 1
      const lastSet = groupLog.setLogs[groupLog.setLogs.length - 1]

      return {
        ...prev,
        groupLogs: {
          ...prev.groupLogs,
          [groupId]: {
            ...groupLog,
            setLogs: [
              ...groupLog.setLogs,
              {
                setNumber: newSetNumber,
                exercises: lastSet.exercises.map(exercise => ({
                  ...exercise,
                  isCompleted: false
                })),
                isCompleted: false
              }
            ]
          }
        }
      }
    })
  }, [])

  const removeGroupSet = useCallback((groupId: string, setIndex: number) => {
    setSession(prev => ({
      ...prev,
      groupLogs: {
        ...prev.groupLogs,
        [groupId]: {
          ...prev.groupLogs[groupId],
          setLogs: prev.groupLogs[groupId].setLogs
            .filter((_, index) => index !== setIndex)
            .map((setLog, index) => ({ ...setLog, setNumber: index + 1 }))
        }
      }
    }))
  }, [])

  const updateGroupNotes = useCallback((groupId: string, notes: string) => {
    setSession(prev => ({
      ...prev,
      groupLogs: {
        ...prev.groupLogs,
        [groupId]: {
          ...prev.groupLogs[groupId],
          groupNotes: notes
        }
      }
    }))
  }, [])

  const updateGroupRPE = useCallback((groupId: string, rpe: number) => {
    setSession(prev => ({
      ...prev,
      groupLogs: {
        ...prev.groupLogs,
        [groupId]: {
          ...prev.groupLogs[groupId],
          groupRPE: rpe
        }
      }
    }))
  }, [])


  const handleFinishSession = () => {
    const endTime = new Date()
    const duration = Math.floor((endTime.getTime() - startTime.getTime()) / 60000) // minutes

    // Calculate summary statistics from grouped structure
    let totalSets = 0
    let completedSets = 0
    let totalWeight = 0
    let totalReps = 0
    const exercises: any[] = []
    const exerciseStats: Record<string, { name: string, sets: number, reps: number, weight: number }> = {}

    Object.values(session.groupLogs).forEach(groupLog => {
      groupLog.setLogs.forEach(setLog => {
        totalSets += 1
        if (setLog.isCompleted) {
          completedSets += 1
        }

        setLog.exercises.forEach(exercise => {
          if (exercise.isCompleted) {
            const exerciseKey = exercise.exerciseId
            if (!exerciseStats[exerciseKey]) {
              exerciseStats[exerciseKey] = {
                name: exercise.exerciseData.name,
                sets: 0,
                reps: 0,
                weight: 0
              }
            }
            
            exerciseStats[exerciseKey].sets += 1
            exerciseStats[exerciseKey].reps += exercise.reps
            exerciseStats[exerciseKey].weight += exercise.weight * exercise.reps
            
            totalReps += exercise.reps
            totalWeight += exercise.weight * exercise.reps
          }
        })
      })
    })

    // Convert exercise stats to array
    Object.values(exerciseStats).forEach(stat => {
      if (stat.sets > 0) {
        exercises.push(stat)
      }
    })

    const summary: WorkoutSessionSummary = {
      sessionId: session.sessionId,
      workoutTitle: workout.title,
      startTime,
      endTime,
      totalSets,
      completedSets,
      totalWeight,
      totalReps,
      duration,
      exercises
    }

    // Save to history and clear active session
    saveWorkoutToHistory(summary)
    clearWorkoutSession()
    
    onFinishSession(summary)
  }

  const handleClose = () => {
    // Smart exit logic based on session completion status
    if (hasCompletedSets(session)) {
      // If any sets have been completed, pause the session
      handlePauseSession()
    } else {
      // If no sets completed, cancel the session completely
      clearWorkoutSession()
      onClose()
    }
  }

  const handlePauseSession = () => {
    // Pause the timer
    setIsPaused(true)
    
    // Save session as paused
    savePausedWorkoutSession(session)
    
    // Notify parent component about the pause
    if (onPauseSession) {
      onPauseSession(session)
    }
    
    onClose()
  }

  const handleCancelSession = () => {
    // Force cancel the session regardless of completion status
    clearWorkoutSession()
    onClose()
  }

  // Calculate progress from grouped structure
  const totalCompletedSets = Object.values(session.groupLogs).reduce((sum, groupLog) => 
    sum + groupLog.setLogs.filter(set => set.isCompleted).length, 0
  )
  const totalPlannedSets = Object.values(session.groupLogs).reduce((sum, groupLog) => 
    sum + groupLog.setLogs.length, 0
  )

  return (
    <div className="fixed inset-0 bg-neu-darkest/90 backdrop-blur-sm z-[100] flex items-center justify-center md:p-4">
      <div className="bg-neu-card shadow-neu-raised-xl md:rounded-xl max-w-4xl w-full h-full md:h-auto md:max-h-[90vh] flex flex-col border border-neu-light/20">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-divider">
          <div className="flex items-center gap-4">
            <div>
              <h2 className="text-white text-xl font-medium">{workout.title}</h2>
              <div className="flex items-center gap-4 text-sm text-gray-400 mt-1">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {formatTime(elapsedTime)}
                </div>
                <div className="flex items-center gap-1">
                  <Target className="w-4 h-4" />
                  {totalCompletedSets}/{totalPlannedSets} sets
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={handleFinishSession}
              className="bg-[#C3A869] text-black px-4 py-2 rounded-lg font-medium hover:bg-[#C3A869]/80 transition flex items-center gap-2"
            >
              <Check className="w-4 h-4" />
              <span className="hidden md:inline">Finish Session</span>
            </button>
            <button
              onClick={handleClose}
              className="bg-gray-700 text-white p-2 rounded-lg hover:bg-gray-600 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Exercise Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {isLoadingExercises && (
            <div className="flex items-center justify-center py-8">
              <div className="text-center">
                <div className="w-8 h-8 border-2 border-[#C3A869] border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                <p className="text-gray-400 text-sm">Loading exercises...</p>
              </div>
            </div>
          )}
          {!isLoadingExercises && Object.entries(session.groupLogs).map(([groupId, groupLog]) => {
            // For single exercises, use the original LoggedExerciseCard
            if (groupLog.groupType === 'single') {
              const exercise = groupLog.setLogs[0]?.exercises[0]
              if (!exercise) return null

              // Convert grouped structure back to legacy format for LoggedExerciseCard
              const legacyExerciseLog = {
                exerciseId: exercise.exerciseId,
                exerciseData: exercise.exerciseData,
                groupId: groupLog.groupId,
                groupType: groupLog.groupType,
                plannedSets: groupLog.plannedSets,
                setLogs: groupLog.setLogs.map(setLog => ({
                  setNumber: setLog.setNumber,
                  reps: setLog.exercises[0]?.reps || 0,
                  weight: setLog.exercises[0]?.weight || 0,
                  rpe: groupLog.groupRPE, // RPE is now at group level for single exercises
                  isCompleted: setLog.exercises[0]?.isCompleted || false,
                  completedAt: setLog.completedAt,
                  notes: setLog.exercises[0]?.notes
                })),
                exerciseNotes: groupLog.groupNotes
              }

              return (
                <LoggedExerciseCard
                  key={groupId}
                  exercise={exercise.exerciseData}
                  exerciseLog={legacyExerciseLog}
                  onUpdateSetLog={(setIndex, updates) => {
                    // Convert legacy updates back to grouped format
                    const groupUpdates: Partial<GroupSetLog> = {
                      isCompleted: updates.isCompleted,
                      completedAt: updates.completedAt
                    }
                    updateGroupSet(groupId, setIndex, groupUpdates)
                    
                    // Update exercise data
                    const exerciseUpdates: Partial<ExerciseInSetLog> = {
                      reps: updates.reps,
                      weight: updates.weight,
                      isCompleted: updates.isCompleted || false,
                      notes: updates.notes
                    }
                    updateExerciseInSet(groupId, setIndex, 0, exerciseUpdates)
                  }}
                  onAddSet={() => addGroupSet(groupId)}
                  onRemoveSet={(setIndex) => removeGroupSet(groupId, setIndex)}
                  onUpdateNotes={(notes) => updateGroupNotes(groupId, notes)}
                  onUpdateGroupRPE={(rpe) => updateGroupRPE(groupId, rpe)}
                />
              )
            }

            // For supersets and circuits, use the new GroupedExerciseCard
            return (
              <GroupedExerciseCard
                key={groupId}
                groupLog={groupLog}
                onUpdateSet={(setIndex, updates) => updateGroupSet(groupId, setIndex, updates)}
                onUpdateExerciseInSet={(setIndex, exerciseIndex, updates) => 
                  updateExerciseInSet(groupId, setIndex, exerciseIndex, updates)
                }
                onAddSet={() => addGroupSet(groupId)}
                onRemoveSet={(setIndex) => removeGroupSet(groupId, setIndex)}
                onUpdateGroupNotes={(notes) => updateGroupNotes(groupId, notes)}
                onUpdateGroupRPE={groupLog.groupType !== 'circuit' ? (rpe) => updateGroupRPE(groupId, rpe) : undefined}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}