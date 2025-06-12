import { WorkoutSessionState, WorkoutSessionSummary } from '@/types'

const SESSION_STORAGE_KEY = 'styrkur_active_session'
const PAUSED_SESSION_STORAGE_KEY = 'styrkur_paused_session'
const HISTORY_STORAGE_KEY = 'styrkur_session_history'

/**
 * Save active workout session to localStorage
 */
export function saveWorkoutSession(session: WorkoutSessionState): void {
  try {
    const serializedSession = JSON.stringify({
      ...session,
      startTime: session.startTime.toISOString(),
      endTime: session.endTime?.toISOString(),
      groupLogs: Object.fromEntries(
        Object.entries(session.groupLogs).map(([key, groupLog]) => [
          key,
          {
            ...groupLog,
            setLogs: groupLog.setLogs.map(setLog => ({
              ...setLog,
              completedAt: setLog.completedAt?.toISOString(),
              exercises: setLog.exercises.map(exercise => ({
                ...exercise,
                // No date fields in ExerciseInSetLog to serialize
              }))
            }))
          }
        ])
      ),
      // Legacy support - keeping this for backward compatibility but it might be empty
      logs: session.logs ? Object.fromEntries(
        Object.entries(session.logs).map(([key, log]) => [
          key,
          {
            ...log,
            setLogs: log.setLogs.map(setLog => ({
              ...setLog,
              completedAt: setLog.completedAt?.toISOString()
            }))
          }
        ])
      ) : {}
    })
    localStorage.setItem(SESSION_STORAGE_KEY, serializedSession)
  } catch (error) {
    console.error('Failed to save workout session:', error)
  }
}

/**
 * Load active workout session from localStorage
 */
export function loadWorkoutSession(): WorkoutSessionState | null {
  try {
    const serializedSession = localStorage.getItem(SESSION_STORAGE_KEY)
    if (!serializedSession) return null

    const session = JSON.parse(serializedSession)
    
    // Deserialize dates
    return {
      ...session,
      startTime: new Date(session.startTime),
      endTime: session.endTime ? new Date(session.endTime) : undefined,
      groupLogs: Object.fromEntries(
        Object.entries(session.groupLogs || {}).map(([key, groupLog]: [string, any]) => [
          key,
          {
            ...groupLog,
            setLogs: groupLog.setLogs.map((setLog: any) => ({
              ...setLog,
              completedAt: setLog.completedAt ? new Date(setLog.completedAt) : undefined,
              exercises: setLog.exercises.map((exercise: any) => ({
                ...exercise,
                // No date fields in ExerciseInSetLog to deserialize
              }))
            }))
          }
        ])
      ),
      // Legacy support
      logs: session.logs ? Object.fromEntries(
        Object.entries(session.logs).map(([key, log]: [string, any]) => [
          key,
          {
            ...log,
            setLogs: log.setLogs.map((setLog: any) => ({
              ...setLog,
              completedAt: setLog.completedAt ? new Date(setLog.completedAt) : undefined
            }))
          }
        ])
      ) : {}
    }
  } catch (error) {
    console.error('Failed to load workout session:', error)
    return null
  }
}

/**
 * Clear active workout session from localStorage
 */
export function clearWorkoutSession(): void {
  try {
    localStorage.removeItem(SESSION_STORAGE_KEY)
  } catch (error) {
    console.error('Failed to clear workout session:', error)
  }
}

/**
 * Save completed workout session to history
 */
export function saveWorkoutToHistory(summary: WorkoutSessionSummary): void {
  try {
    const existingHistory = getWorkoutHistory()
    const updatedHistory = [
      {
        ...summary,
        startTime: summary.startTime.toISOString(),
        endTime: summary.endTime.toISOString()
      },
      ...existingHistory
    ].slice(0, 100) // Keep only last 100 sessions

    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(updatedHistory))
  } catch (error) {
    console.error('Failed to save workout to history:', error)
  }
}

/**
 * Get workout history from localStorage
 */
export function getWorkoutHistory(): any[] {
  try {
    const history = localStorage.getItem(HISTORY_STORAGE_KEY)
    return history ? JSON.parse(history) : []
  } catch (error) {
    console.error('Failed to load workout history:', error)
    return []
  }
}

/**
 * Check if there's an active workout session
 */
export function hasActiveSession(): boolean {
  return localStorage.getItem(SESSION_STORAGE_KEY) !== null
}

/**
 * Save paused workout session to localStorage
 */
export function savePausedWorkoutSession(session: WorkoutSessionState): void {
  try {
    const serializedSession = JSON.stringify({
      ...session,
      startTime: session.startTime.toISOString(),
      endTime: session.endTime?.toISOString(),
      pausedAt: new Date().toISOString(),
      groupLogs: Object.fromEntries(
        Object.entries(session.groupLogs).map(([key, groupLog]) => [
          key,
          {
            ...groupLog,
            setLogs: groupLog.setLogs.map(setLog => ({
              ...setLog,
              completedAt: setLog.completedAt?.toISOString(),
              exercises: setLog.exercises.map(exercise => ({
                ...exercise,
              }))
            }))
          }
        ])
      ),
      logs: session.logs ? Object.fromEntries(
        Object.entries(session.logs).map(([key, log]) => [
          key,
          {
            ...log,
            setLogs: log.setLogs.map(setLog => ({
              ...setLog,
              completedAt: setLog.completedAt?.toISOString()
            }))
          }
        ])
      ) : {}
    })
    localStorage.setItem(PAUSED_SESSION_STORAGE_KEY, serializedSession)
    // Clear active session when pausing
    clearWorkoutSession()
  } catch (error) {
    console.error('Failed to save paused workout session:', error)
  }
}

/**
 * Load paused workout session from localStorage
 */
export function loadPausedWorkoutSession(): WorkoutSessionState | null {
  try {
    const serializedSession = localStorage.getItem(PAUSED_SESSION_STORAGE_KEY)
    if (!serializedSession) return null

    const session = JSON.parse(serializedSession)
    
    // Deserialize dates
    return {
      ...session,
      startTime: new Date(session.startTime),
      endTime: session.endTime ? new Date(session.endTime) : undefined,
      pausedAt: session.pausedAt ? new Date(session.pausedAt) : undefined,
      groupLogs: Object.fromEntries(
        Object.entries(session.groupLogs || {}).map(([key, groupLog]: [string, any]) => [
          key,
          {
            ...groupLog,
            setLogs: groupLog.setLogs.map((setLog: any) => ({
              ...setLog,
              completedAt: setLog.completedAt ? new Date(setLog.completedAt) : undefined,
              exercises: setLog.exercises.map((exercise: any) => ({
                ...exercise,
              }))
            }))
          }
        ])
      ),
      logs: session.logs ? Object.fromEntries(
        Object.entries(session.logs).map(([key, log]: [string, any]) => [
          key,
          {
            ...log,
            setLogs: log.setLogs.map((setLog: any) => ({
              ...setLog,
              completedAt: setLog.completedAt ? new Date(setLog.completedAt) : undefined
            }))
          }
        ])
      ) : {}
    }
  } catch (error) {
    console.error('Failed to load paused workout session:', error)
    return null
  }
}

/**
 * Clear paused workout session from localStorage
 */
export function clearPausedWorkoutSession(): void {
  try {
    localStorage.removeItem(PAUSED_SESSION_STORAGE_KEY)
  } catch (error) {
    console.error('Failed to clear paused workout session:', error)
  }
}

/**
 * Check if there's a paused workout session
 */
export function hasPausedSession(): boolean {
  return localStorage.getItem(PAUSED_SESSION_STORAGE_KEY) !== null
}

/**
 * Resume paused session by moving it back to active storage
 */
export function resumePausedSession(): WorkoutSessionState | null {
  const pausedSession = loadPausedWorkoutSession()
  if (pausedSession) {
    // Remove pausedAt timestamp and save as active session
    const { pausedAt, ...activeSession } = pausedSession
    saveWorkoutSession(activeSession)
    clearPausedWorkoutSession()
    return activeSession
  }
  return null
}

/**
 * Check if a session has any completed sets
 */
export function hasCompletedSets(session: WorkoutSessionState): boolean {
  return Object.values(session.groupLogs).some(groupLog =>
    groupLog.setLogs.some(setLog => setLog.isCompleted)
  )
}