'use client'

import { useState } from 'react'
import { 
  Home, Calendar, Wrench, Edit3, Settings 
} from 'lucide-react'
import HomeScreen from '@/components/screens/HomeScreen'
import TrainScreen from '@/components/screens/TrainScreen'
import BuildScreen from '@/components/screens/BuildScreen'
import LogScreen from '@/components/screens/LogScreen'
import SettingsScreen from '@/components/screens/SettingsScreen'
import BottomNavigation from '@/components/navigation/BottomNavigation'
import { Workout, Program, Exercise } from '@/types'

export default function StyrkurheimApp() {
  const [activeTab, setActiveTab] = useState('home')
  const [workouts, setWorkouts] = useState<Workout[]>([])
  const [programs, setPrograms] = useState<Program[]>([])
  const [currentWorkout, setCurrentWorkout] = useState<Workout | null>(null)

  const navigationTabs = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'train', icon: Calendar, label: 'Train' },
    { id: 'build', icon: Wrench, label: 'Build' },
    { id: 'log', icon: Edit3, label: 'Log' },
    { id: 'settings', icon: Settings, label: 'Settings' }
  ]

  const renderActiveScreen = () => {
    switch (activeTab) {
      case 'home':
        return <HomeScreen workouts={workouts} onStartWorkout={setCurrentWorkout} onNavigate={setActiveTab} />
      case 'train':
        return <TrainScreen currentWorkout={currentWorkout} onEndWorkout={() => setCurrentWorkout(null)} onNavigate={setActiveTab} />
      case 'build':
        return <BuildScreen workouts={workouts} onSaveWorkout={(workout) => setWorkouts(prev => [...prev, workout])} />
      case 'log':
        return <LogScreen />
      case 'settings':
        return <SettingsScreen />
      default:
        return <HomeScreen workouts={workouts} onStartWorkout={setCurrentWorkout} />
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <div className="flex-1 lg:grid lg:grid-cols-12 lg:gap-6">
        {/* Main Content */}
        <div className="lg:col-span-9 xl:col-span-10">
          {renderActiveScreen()}
        </div>
        
        {/* Desktop Sidebar (hidden on mobile) */}
        <div className="hidden lg:block lg:col-span-3 xl:col-span-2 bg-gray-800 border-l border-gray-700">
          <div className="p-6">
            <h3 className="text-white font-medium mb-4">Quick Stats</h3>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-[#C3A869] text-2xl mb-1">⚡</div>
                <div className="text-white font-medium">12</div>
                <div className="text-gray-400 text-xs">Sessions</div>
              </div>
              <div className="text-center">
                <div className="text-[#C3A869] text-2xl mb-1">🏔️</div>
                <div className="text-white font-medium">3</div>
                <div className="text-gray-400 text-xs">PRs</div>
              </div>
              <div className="text-center">
                <div className="text-[#C3A869] text-2xl mb-1">🔥</div>
                <div className="text-white font-medium">7</div>
                <div className="text-gray-400 text-xs">Streak</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden">
        <BottomNavigation 
          tabs={navigationTabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </div>
      
      {/* Desktop Top Navigation */}
      <div className="hidden lg:block fixed top-0 left-0 right-0 bg-gray-900 border-b border-gray-800 z-50">
        <div className="w-full max-w-md mx-auto lg:max-w-4xl xl:max-w-6xl px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <h1 className="text-xl font-light text-white">Styrkurheim</h1>
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
        </div>
      </div>
    </div>
  )
}