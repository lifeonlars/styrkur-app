'use client'

import { useState, useEffect } from 'react'
import { 
  NavDashboard, NavWorkouts, NavPlan, NavHistory, NavSettings 
} from '@/components/icons'
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
    { id: 'dashboard', icon: NavDashboard, label: 'Dashboard' },
    { id: 'workouts', icon: NavWorkouts, label: 'Workouts' },
    { id: 'plan', icon: NavPlan, label: 'Plan' },
    { id: 'history', icon: NavHistory, label: 'History' },
    { id: 'settings', icon: NavSettings, label: 'Settings' }
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
    <div className="min-h-screen bg-neu-base text-white flex flex-col">
      <div className="flex-1">
        {/* Main Content */}
        <div className="w-full lg:pt-20">
          <ClientOnly fallback={<div className="p-4 text-center text-gray-400">Loading...</div>}>
            {renderActiveScreen()}
          </ClientOnly>
        </div>
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
      <div className="hidden lg:block fixed top-0 left-0 right-0 bg-neu-surface shadow-neu border-b border-neu-light/20 z-50">
        <div className="w-full max-w-md mx-auto lg:max-w-4xl xl:max-w-6xl px-6 py-4">
          <ClientOnly>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-8">
                <div className="h-8">
                  <img 
                    src="/assets/branding/LogoHorizontal.svg" 
                    alt="Styrkur" 
                    className="h-full w-auto"
                  />
                </div>
                <nav className="flex space-x-6">
                  {navigationTabs.map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200 ${
                        activeTab === tab.id 
                          ? 'bg-norse-gold text-black shadow-neu-gold font-medium' 
                          : 'bg-neu-surface text-gray-300 shadow-neu hover:shadow-neu-hover hover:text-white'
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