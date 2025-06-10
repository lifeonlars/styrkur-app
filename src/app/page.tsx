'use client'

import { useState, useEffect } from 'react'
import { 
  LayoutDashboard, Dumbbell, Calendar, History, Settings 
} from 'lucide-react'
import DashboardScreen from '@/components/screens/DashboardScreen'
import WorkoutsScreen from '@/components/screens/WorkoutsScreen'
import PlanScreen from '@/components/screens/PlanScreen'
import HistoryScreen from '@/components/screens/HistoryScreen'
import SettingsScreen from '@/components/screens/SettingsScreen'
import BottomNavigation from '@/components/navigation/BottomNavigation'
import ClientOnly from '@/components/ClientOnly'
import { Workout, Program } from '@/types'
import { workoutStorage, programStorage } from '@/lib/localStorage'

export default function SyrkurSagaApp() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [workouts, setWorkouts] = useState<Workout[]>([])
  const [programs, setPrograms] = useState<Program[]>([])
  const [currentWorkout, setCurrentWorkout] = useState<Workout | null>(null)

  // Load data from localStorage on startup
  useEffect(() => {
    const storedWorkouts = workoutStorage.getWorkouts()
    const storedPrograms = programStorage.getPrograms()
    setWorkouts(storedWorkouts)
    setPrograms(storedPrograms)
  }, [])

  const navigationTabs = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'workouts', icon: Dumbbell, label: 'Workouts' },
    { id: 'plan', icon: Calendar, label: 'Plan' },
    { id: 'history', icon: History, label: 'History' },
    { id: 'settings', icon: Settings, label: 'Settings' }
  ]

  const handleSaveWorkout = (workout: Workout) => {
    const updatedWorkouts = workoutStorage.addWorkout(workout)
    setWorkouts(updatedWorkouts)
  }

  const handleUpdateWorkout = (workout: Workout) => {
    const updatedWorkouts = workoutStorage.updateWorkout(workout)
    setWorkouts(updatedWorkouts)
  }

  const handleDeleteWorkout = (workoutId: number) => {
    const updatedWorkouts = workoutStorage.deleteWorkout(workoutId)
    setWorkouts(updatedWorkouts)
  }

  const renderActiveScreen = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardScreen workouts={workouts} onStartWorkout={setCurrentWorkout} onNavigate={setActiveTab} />
      case 'workouts':
        return <WorkoutsScreen workouts={workouts} onSaveWorkout={handleSaveWorkout} onUpdateWorkout={handleUpdateWorkout} currentWorkout={currentWorkout} onEndWorkout={() => setCurrentWorkout(null)} />
      case 'plan':
        return <PlanScreen workouts={workouts} onSaveWorkout={handleSaveWorkout} onUpdateWorkout={handleUpdateWorkout} onDeleteWorkout={handleDeleteWorkout} />
      case 'history':
        return <HistoryScreen />
      case 'settings':
        return <SettingsScreen />
      default:
        return <DashboardScreen workouts={workouts} onStartWorkout={setCurrentWorkout} onNavigate={setActiveTab} />
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <div className="flex-1 lg:grid lg:grid-cols-12 lg:gap-6">
        {/* Main Content */}
        <div className={`${activeTab === 'dashboard' ? 'lg:col-span-9 xl:col-span-10' : 'lg:col-span-12'}`}>
          <ClientOnly fallback={<div className="p-4 text-center text-gray-400">Loading...</div>}>
            {renderActiveScreen()}
          </ClientOnly>
        </div>
        
        {/* Desktop Sidebar (hidden on mobile, only show on dashboard screen) */}
        {activeTab === 'dashboard' && (
          <div className="hidden lg:block lg:col-span-3 xl:col-span-2 bg-gray-800 border-l border-gray-700">
            <div className="p-6">
              <h3 className="text-white font-heading font-medium mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-[#C3A869] text-2xl mb-1">⚡</div>
                  <div className="text-white font-medium">12</div>
                  <div className="text-gray-400 text-sm">Sessions</div>
                </div>
                <div className="text-center">
                  <div className="text-[#C3A869] text-2xl mb-1">🏔️</div>
                  <div className="text-white font-medium">3</div>
                  <div className="text-gray-400 text-sm">PRs</div>
                </div>
                <div className="text-center">
                  <div className="text-[#C3A869] text-2xl mb-1">🔥</div>
                  <div className="text-white font-medium">7</div>
                  <div className="text-gray-400 text-sm">Streak</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden">
        <ClientOnly>
          <BottomNavigation 
            tabs={navigationTabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        </ClientOnly>
      </div>
      
      {/* Desktop Top Navigation */}
      <div className="hidden lg:block fixed top-0 left-0 right-0 bg-gray-900 border-b border-gray-800 z-50">
        <div className="w-full max-w-md mx-auto lg:max-w-4xl xl:max-w-6xl px-6 py-4">
          <ClientOnly>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-8">
                <h1 className="text-xl font-heading font-light text-white">Syrkur Saga</h1>
                <nav className="flex space-x-6">
                  {navigationTabs.map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                        activeTab === tab.id 
                          ? 'bg-[#C3A869] text-black' 
                          : 'text-gray-400 hover:text-white hover:bg-gray-800'
                      }`}
                    >
                      <tab.icon className="w-4 h-4" />
                      <span className="text-sm">{tab.label}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          </ClientOnly>
        </div>
      </div>
    </div>
  )
}