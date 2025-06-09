'use client'

import { Workout, Program } from '@/types'

const WORKOUTS_KEY = 'styrkur_workouts'
const PROGRAMS_KEY = 'styrkur_programs'

export const workoutStorage = {
  getWorkouts(): Workout[] {
    if (typeof window === 'undefined') return []
    try {
      const stored = localStorage.getItem(WORKOUTS_KEY)
      if (!stored) return []
      const workouts = JSON.parse(stored)
      // Convert date strings back to Date objects
      return workouts.map((workout: any) => ({
        ...workout,
        createdAt: workout.createdAt ? new Date(workout.createdAt) : undefined,
        updatedAt: workout.updatedAt ? new Date(workout.updatedAt) : undefined
      }))
    } catch (error) {
      console.error('Error loading workouts from localStorage:', error)
      return []
    }
  },

  saveWorkouts(workouts: Workout[]): void {
    if (typeof window === 'undefined') return
    try {
      localStorage.setItem(WORKOUTS_KEY, JSON.stringify(workouts))
    } catch (error) {
      console.error('Error saving workouts to localStorage:', error)
    }
  },

  addWorkout(workout: Workout): Workout[] {
    const workouts = this.getWorkouts()
    const updatedWorkouts = [...workouts, workout]
    this.saveWorkouts(updatedWorkouts)
    return updatedWorkouts
  },

  updateWorkout(updatedWorkout: Workout): Workout[] {
    const workouts = this.getWorkouts()
    const updatedWorkouts = workouts.map(workout => 
      workout.id === updatedWorkout.id ? updatedWorkout : workout
    )
    this.saveWorkouts(updatedWorkouts)
    return updatedWorkouts
  },

  deleteWorkout(workoutId: number): Workout[] {
    const workouts = this.getWorkouts()
    const updatedWorkouts = workouts.filter(workout => workout.id !== workoutId)
    this.saveWorkouts(updatedWorkouts)
    return updatedWorkouts
  }
}

export const programStorage = {
  getPrograms(): Program[] {
    if (typeof window === 'undefined') return []
    try {
      const stored = localStorage.getItem(PROGRAMS_KEY)
      if (!stored) return []
      const programs = JSON.parse(stored)
      // Convert date strings back to Date objects
      return programs.map((program: any) => ({
        ...program,
        createdAt: program.createdAt ? new Date(program.createdAt) : undefined,
        updatedAt: program.updatedAt ? new Date(program.updatedAt) : undefined
      }))
    } catch (error) {
      console.error('Error loading programs from localStorage:', error)
      return []
    }
  },

  savePrograms(programs: Program[]): void {
    if (typeof window === 'undefined') return
    try {
      localStorage.setItem(PROGRAMS_KEY, JSON.stringify(programs))
    } catch (error) {
      console.error('Error saving programs to localStorage:', error)
    }
  },

  addProgram(program: Program): Program[] {
    const programs = this.getPrograms()
    const updatedPrograms = [...programs, program]
    this.savePrograms(updatedPrograms)
    return updatedPrograms
  },

  updateProgram(updatedProgram: Program): Program[] {
    const programs = this.getPrograms()
    const updatedPrograms = programs.map(program => 
      program.id === updatedProgram.id ? updatedProgram : program
    )
    this.savePrograms(updatedPrograms)
    return updatedPrograms
  },

  deleteProgram(programId: number): Program[] {
    const programs = this.getPrograms()
    const updatedPrograms = programs.filter(program => program.id !== programId)
    this.savePrograms(updatedPrograms)
    return updatedPrograms
  }
}