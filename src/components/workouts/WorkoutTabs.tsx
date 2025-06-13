import { useState, useMemo } from 'react'
import { Search, Clock, Dumbbell } from 'lucide-react'
import { Input } from '@heroui/input'
import { Workout } from '@/types'
import { searchWorkouts } from '@/lib/fuzzySearch'
import WorkoutCard from './WorkoutCard'
import TagFilter from './TagFilter'

interface WorkoutTabsProps {
  workouts: Workout[]
  recentSessions: Workout[] // Mock data for recent sessions
  onStartWorkout: (workout: Workout) => void
  onRepeatWorkout?: (workout: Workout) => void
}

type TabType = 'recent' | 'library'

export default function WorkoutTabs({ 
  workouts, 
  recentSessions, 
  onStartWorkout, 
  onRepeatWorkout 
}: WorkoutTabsProps) {
  const [activeTab, setActiveTab] = useState<TabType>('recent')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  // Get all available tags from workouts
  const availableTags = useMemo(() => {
    const tagSet = new Set<string>()
    const currentWorkouts = activeTab === 'recent' ? recentSessions : workouts
    
    currentWorkouts.forEach(workout => {
      workout.tags?.forEach(tag => tagSet.add(tag))
    })
    
    return Array.from(tagSet).sort()
  }, [workouts, recentSessions, activeTab])

  // Filter and search workouts
  const filteredWorkouts = useMemo(() => {
    const currentWorkouts = activeTab === 'recent' ? recentSessions : workouts
    
    // Apply tag filters first
    let filtered = currentWorkouts
    if (selectedTags.length > 0) {
      filtered = currentWorkouts.filter(workout =>
        workout.tags?.some(tag => selectedTags.includes(tag))
      )
    }

    // Apply search
    if (searchTerm.trim()) {
      const searchResults = searchWorkouts(filtered, searchTerm)
      return searchResults.map(result => result.item)
    }

    return filtered
  }, [workouts, recentSessions, activeTab, searchTerm, selectedTags])

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }

  const handleClearAllTags = () => {
    setSelectedTags([])
  }

  const tabs = [
    { id: 'recent' as TabType, label: 'Recent Sessions', icon: Clock },
    { id: 'library' as TabType, label: 'Workout Library', icon: Dumbbell }
  ]

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-800 p-1 rounded-xl">
        {tabs.map(tab => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition ${
                isActive
                  ? 'bg-[#C3A869] text-black'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
        {/* Search Bar */}
        <Input
          type="text"
          placeholder={`Search ${activeTab === 'recent' ? 'recent sessions' : 'workout library'}...`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          startContent={<Search className="w-4 h-4 text-default-400" />}
          variant="bordered"
          size="lg"
          classNames={{
            input: "text-white",
            inputWrapper: "!bg-content1 !border-divider hover:!border-primary/50 focus-within:!border-primary focus-within:!bg-content2"
          }}
        />

        {/* Tag Filter */}
        <TagFilter
          availableTags={availableTags}
          selectedTags={selectedTags}
          onTagToggle={handleTagToggle}
          onClearAll={handleClearAllTags}
        />
      </div>

      {/* Workout Results */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-white font-medium">
            {activeTab === 'recent' ? 'Recent Sessions' : 'Your Workouts'} ({filteredWorkouts.length})
          </h3>
          
          {(searchTerm || selectedTags.length > 0) && (
            <button
              onClick={() => {
                setSearchTerm('')
                setSelectedTags([])
              }}
              className="text-[#C3A869] text-sm hover:text-[#C3A869]/80 transition"
            >
              Clear filters
            </button>
          )}
        </div>

        {filteredWorkouts.length > 0 ? (
          <div className="space-y-3">
            {filteredWorkouts.map(workout => (
              <WorkoutCard
                key={`${activeTab}-${workout.id}`}
                workout={workout}
                variant={activeTab}
                onStart={onStartWorkout}
                onRepeat={activeTab === 'recent' ? onRepeatWorkout : undefined}
                searchTerm={searchTerm}
              />
            ))}
          </div>
        ) : (
          <div className="bg-gray-800/50 rounded-xl p-8 text-center border border-gray-700">
            <div className="text-4xl mb-4">
              {activeTab === 'recent' ? '📅' : '💪'}
            </div>
            <h3 className="text-white font-medium mb-2">
              {searchTerm || selectedTags.length > 0 
                ? 'No workouts found' 
                : activeTab === 'recent' 
                  ? 'No recent sessions' 
                  : 'No workouts yet'
              }
            </h3>
            <p className="text-gray-400 text-sm">
              {searchTerm || selectedTags.length > 0
                ? 'Try adjusting your search terms or filters'
                : activeTab === 'recent'
                  ? 'Start your first workout to see it here'
                  : 'Create your first workout to get started'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  )
}