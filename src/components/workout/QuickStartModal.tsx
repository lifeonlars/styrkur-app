'use client'

import { useState } from 'react'
import { X, Play, Plus, Zap, Clock, Tag, Bot } from 'lucide-react'
import { Workout } from '@/types'

interface QuickStartModalProps {
  workouts: Workout[]
  onClose: () => void
  onStartWorkout: (workout: Workout) => void
  onCreateWorkout: () => void
}

export default function QuickStartModal({ workouts, onClose, onStartWorkout, onCreateWorkout }: QuickStartModalProps) {
  const [selectedTab, setSelectedTab] = useState<'existing' | 'build' | 'ai'>('existing')

  const handleStartExisting = (workout: Workout) => {
    onStartWorkout(workout)
    onClose()
  }

  const handleBuildNew = () => {
    onCreateWorkout()
    onClose()
  }

  const estimateWorkoutTime = (workout: Workout): string => {
    const exerciseCount = workout.entries?.length || workout.exercises?.length || 0
    const estimatedMinutes = exerciseCount * 8 // Rough estimate: 8 minutes per exercise group
    if (estimatedMinutes < 30) return '20-30 min'
    if (estimatedMinutes < 60) return '45-60 min'
    return '60+ min'
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center md:p-4">
      <div className="bg-gray-900 md:rounded-2xl w-full max-w-2xl h-full md:h-auto md:max-h-[90vh] overflow-hidden border border-gray-700">
        {/* Header */}
        <div className="p-6 border-b border-gray-800">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-white text-xl font-medium font-heading">Quick Start</h2>
              <p className="text-gray-400 text-sm">Choose how to begin your workout</p>
            </div>
            <button
              onClick={onClose}
              className="bg-gray-800 p-2 rounded-lg text-gray-400 hover:bg-gray-700 hover:text-white transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-800">
          <button
            onClick={() => setSelectedTab('existing')}
            className={`flex-1 px-6 py-4 text-sm font-medium transition ${
              selectedTab === 'existing'
                ? 'text-[#C3A869] border-b-2 border-[#C3A869] bg-gray-800/50'
                : 'text-gray-400 hover:text-white hover:bg-gray-800/30'
            }`}
          >
            <Play className="w-4 h-4 mr-2 inline" />
            Choose Existing
          </button>
          <button
            onClick={() => setSelectedTab('build')}
            className={`flex-1 px-6 py-4 text-sm font-medium transition ${
              selectedTab === 'build'
                ? 'text-[#C3A869] border-b-2 border-[#C3A869] bg-gray-800/50'
                : 'text-gray-400 hover:text-white hover:bg-gray-800/30'
            }`}
          >
            <Plus className="w-4 h-4 mr-2 inline" />
            Build New
          </button>
          <button
            onClick={() => setSelectedTab('ai')}
            className={`flex-1 px-6 py-4 text-sm font-medium transition ${
              selectedTab === 'ai'
                ? 'text-[#C3A869] border-b-2 border-[#C3A869] bg-gray-800/50'
                : 'text-gray-400 hover:text-white hover:bg-gray-800/30'
            }`}
          >
            <Bot className="w-4 h-4 mr-2 inline" />
            Generate with AI
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {selectedTab === 'existing' && (
            <div className="space-y-4">
              <p className="text-gray-400 text-sm mb-4">Select a saved workout to start immediately</p>
              
              {workouts.length > 0 ? (
                <div className="space-y-3">
                  {workouts.map(workout => (
                    <div key={workout.id} className="bg-gray-800 rounded-xl p-4 hover:bg-gray-700 transition">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <h3 className="text-white font-medium mb-1 font-heading">{workout.title}</h3>
                          <p className="text-gray-400 text-sm mb-2">{workout.description}</p>
                          
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <Tag className="w-3 h-3" />
                              {workout.tags?.join(', ') || 'No tags'}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {estimateWorkoutTime(workout)}
                            </span>
                          </div>
                        </div>
                        
                        <button
                          onClick={() => handleStartExisting(workout)}
                          className="bg-[#C3A869] text-black px-4 py-2 rounded-lg font-medium hover:bg-[#C3A869]/80 transition flex items-center gap-2"
                        >
                          <Play className="w-4 h-4" />
                          Start This Workout
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="text-4xl mb-4">📋</div>
                  <h3 className="text-white font-medium mb-2 font-heading">No Saved Workouts</h3>
                  <p className="text-gray-400 text-sm mb-4">
                    You haven't created any workouts yet. Try building a new one!
                  </p>
                  <button
                    onClick={() => setSelectedTab('build')}
                    className="text-[#C3A869] text-sm hover:text-[#C3A869]/80"
                  >
                    Build New Workout →
                  </button>
                </div>
              )}
            </div>
          )}

          {selectedTab === 'build' && (
            <div className="text-center py-8">
              <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
                <Zap className="w-12 h-12 mx-auto mb-4 text-[#C3A869]" />
                <h3 className="text-white font-medium mb-2 font-heading">Build New Workout</h3>
                <p className="text-gray-400 text-sm mb-6">
                  Create a custom workout from scratch. After saving, you'll immediately start the training session.
                </p>
                <button
                  onClick={handleBuildNew}
                  className="bg-[#C3A869] text-black px-6 py-3 rounded-xl font-medium hover:bg-[#C3A869]/80 transition flex items-center gap-2 mx-auto"
                >
                  <Plus className="w-5 h-5" />
                  Open Workout Builder
                </button>
              </div>
            </div>
          )}

          {selectedTab === 'ai' && (
            <div className="text-center py-8">
              <div className="bg-gray-800/50 rounded-xl p-8 border border-gray-700 border-dashed">
                <Bot className="w-12 h-12 mx-auto mb-4 text-gray-500" />
                <h3 className="text-white font-medium mb-2 font-heading">AI Workout Generation</h3>
                <p className="text-gray-400 text-sm mb-4">
                  Generate personalized workouts using AI based on your goals, available time, and equipment.
                </p>
                <div className="bg-gray-700/50 rounded-lg px-4 py-2 inline-block">
                  <span className="text-gray-500 text-sm">Coming Soon</span>
                </div>
                <div className="mt-4 text-sm text-gray-500 space-y-1">
                  <p>• Personalized workout plans</p>
                  <p>• Equipment-based suggestions</p>
                  <p>• Goal-oriented programming</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}