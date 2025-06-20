'use client'

import { useState } from 'react'
import { Dumbbell, Target } from 'lucide-react'
import { Workout } from '@/types'
import { NavPlan } from '@/components/icons'
import ActiveTrainingSection from '@/components/plan/ActiveTrainingSection'
import WorkoutTab from '@/components/plan/WorkoutTab'
import TrainingBlockTab from '@/components/plan/TrainingBlockTab'

interface PlanScreenProps {
  workouts?: Workout[]
  onSaveWorkout?: (workout: Workout) => void
  onUpdateWorkout?: (workout: Workout) => void
  onDeleteWorkout?: (workoutId: number) => void
}

export default function PlanScreen({ 
  workouts = [], 
  onSaveWorkout, 
  onUpdateWorkout,
  onDeleteWorkout 
}: PlanScreenProps) {
  const [activeTab, setActiveTab] = useState<'workouts' | 'blocks'>('workouts')
  return (
    <div className="flex-1 overflow-y-auto pb-20 lg:pb-0 lg:pt-24">
      {/* Mobile Header */}
      <div className="lg:hidden bg-background p-4 border-b border-divider">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 pt-1">
            <NavPlan className="w-16 h-16 text-[#C3A869]" />
          </div>
          <div className="flex-1">
            <h1 className="text-white text-xl font-heading font-medium">Plan</h1>
            <p className="text-gray-400 text-sm">Training planning and organization</p>
          </div>
        </div>
      </div>

      {/* Page Header */}
      <div className="hidden lg:block p-6">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 pt-1">
            <NavPlan className="w-16 h-16 text-[#C3A869]" />
          </div>
          <div className="flex-1">
            <h1 className="text-white text-2xl font-heading font-light mb-2">Training Plan</h1>
            <p className="text-gray-400">Organize your workouts and training blocks</p>
          </div>
        </div>
      </div>

      {/* 1. Active Training Context Section */}
      <ActiveTrainingSection />

      {/* 2. Workout & Block Tabs */}
      <section className="p-4 lg:p-6">
        {/* Tab Navigation */}
        <div className="bg-content1 rounded-xl overflow-hidden mb-6">
          <div className="flex">
            <button
              onClick={() => setActiveTab('workouts')}
              className={`flex-1 px-6 py-4 text-sm font-medium transition flex items-center justify-center gap-2 ${
                activeTab === 'workouts'
                  ? 'bg-[#C3A869] text-black'
                  : 'text-gray-400 hover:text-white hover:bg-content2'
              }`}
            >
              <Dumbbell className="w-4 h-4" />
              Workouts
            </button>
            <button
              onClick={() => setActiveTab('blocks')}
              className={`flex-1 px-6 py-4 text-sm font-medium transition flex items-center justify-center gap-2 ${
                activeTab === 'blocks'
                  ? 'bg-[#C3A869] text-black'
                  : 'text-gray-400 hover:text-white hover:bg-content2'
              }`}
            >
              <Target className="w-4 h-4" />
              Training Blocks
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="min-h-[500px]">
          {activeTab === 'workouts' && (
            <WorkoutTab
              workouts={workouts}
              onSaveWorkout={onSaveWorkout!}
              onUpdateWorkout={onUpdateWorkout!}
              onDeleteWorkout={onDeleteWorkout}
            />
          )}
          
          {activeTab === 'blocks' && (
            <TrainingBlockTab />
          )}
        </div>
      </section>
    </div>
  )
}