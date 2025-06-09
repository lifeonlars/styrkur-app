import { Trophy, Plus, Calendar, TrendingUp, Target } from 'lucide-react'
import { Workout } from '@/types'
import WorkoutCard from '@/components/workout/WorkoutCard'

interface DashboardScreenProps {
  workouts: Workout[]
  onStartWorkout: (workout: Workout) => void
  onNavigate?: (tab: string) => void
}

export default function DashboardScreen({ workouts, onStartWorkout, onNavigate }: DashboardScreenProps) {
  // Sample workouts for demo
  const sampleWorkouts: Workout[] = [
    {
      id: 1,
      title: "Odin's Strength",
      description: "Core compound movements",
      entries: [
        {
          id: 'entry_1',
          type: 'single',
          sets: 5,
          exercises: [
            {
              exerciseId: '2001',
              reps: 5,
              weight: 100,
              rest: 180,
              rpe: 8
            }
          ]
        }
      ],
      exercises: [
        { 
          id: 1, 
          exerciseId: '2001', 
          exerciseData: { 
            id: '2001', 
            name: 'Barbell Back Squat', 
            icon: '🏔️',
            bodyPart: 'upper legs',
            equipment: 'barbell',
            target: 'quadriceps',
            primaryMuscles: ['quadriceps'],
            secondaryMuscles: ['glutes'],
            primaryMuscleIds: [10],
            secondaryMuscleIds: [8],
            muscleGroup: 'legs' as const,
            instructions: ['Bar on shoulders', 'Squat down', 'Drive up through heels'],
            category: 9,
            uuid: 'bb-back-squat',
            isWeighted: true
          }, 
          sets: 5, 
          reps: 5, 
          weight: 100, 
          load: 100, 
          rest: 180, 
          rpe: 8, 
          type: 'single' 
        }
      ],
      supersets: [],
      circuits: [],
      tags: ['strength', 'compound']
    },
    {
      id: 2,
      title: "Thor's Hammer",
      description: "Upper body power",
      entries: [
        {
          id: 'entry_2',
          type: 'single',
          sets: 4,
          exercises: [
            {
              exerciseId: '2004',
              reps: 6,
              weight: 60,
              rest: 150,
              rpe: 7
            }
          ]
        }
      ],
      exercises: [
        { 
          id: 2, 
          exerciseId: '2004', 
          exerciseData: { 
            id: '2004', 
            name: 'Barbell Overhead Press', 
            icon: '🔨',
            bodyPart: 'shoulders',
            equipment: 'barbell',
            target: 'anterior deltoid',
            primaryMuscles: ['anterior deltoid'],
            secondaryMuscles: ['triceps'],
            primaryMuscleIds: [2],
            secondaryMuscleIds: [5],
            muscleGroup: 'shoulders' as const,
            instructions: ['Start with bar at shoulder height', 'Press overhead', 'Lower with control'],
            category: 13,
            uuid: 'bb-overhead-press',
            isWeighted: true
          }, 
          sets: 4, 
          reps: 6, 
          weight: 60, 
          load: 60, 
          rest: 150, 
          rpe: 7, 
          type: 'single' 
        }
      ],
      supersets: [],
      circuits: [],
      tags: ['upper', 'power']
    }
  ]

  const displayWorkouts = workouts.length > 0 ? workouts : sampleWorkouts

  return (
    <div className="flex-1 overflow-y-auto pb-20 lg:pb-0 lg:pt-20">
      {/* Mobile Header (hidden on desktop) */}
      <div className="lg:hidden bg-gray-900 p-6 border-b border-gray-800">
        <h1 className="text-2xl font-light text-white mb-2">Styrkurheim</h1>
        <p className="text-gray-400 text-sm">Strength through the ages</p>
      </div>

      {/* Greeting Header */}
      <div className="hidden lg:block p-6">
        <h1 className="text-white text-2xl font-light mb-2">Welcome back, Lars</h1>
        <p className="text-gray-400">Ready to conquer today's challenges</p>
      </div>

      {/* Upcoming Workout Section */}
      <section className="p-4 lg:p-6">
        <h2 className="text-white font-medium mb-4 flex items-center">
          <Calendar className="w-5 h-5 mr-2 text-[#C3A869]" />
          Today's Focus
        </h2>
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
          <div className="text-center text-gray-400">
            <div className="text-2xl mb-2">📅</div>
            <p className="text-sm">No workout scheduled for today</p>
            <button 
              onClick={() => onNavigate?.('workouts')}
              className="mt-3 text-[#C3A869] text-sm hover:text-[#C3A869]/80"
            >
              Start Free Session →
            </button>
          </div>
        </div>
      </section>

      {/* Weekly Progress Card */}
      <section className="p-4 lg:p-6">
        <h2 className="text-white font-medium mb-4 flex items-center">
          <TrendingUp className="w-5 h-5 mr-2 text-[#C3A869]" />
          This Week
        </h2>
        <div className="bg-gray-800 rounded-xl p-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-white text-lg font-medium">3</div>
              <div className="text-gray-400 text-xs">Workouts</div>
            </div>
            <div>
              <div className="text-white text-lg font-medium">2.5h</div>
              <div className="text-gray-400 text-xs">Time</div>
            </div>
            <div>
              <div className="text-white text-lg font-medium">95%</div>
              <div className="text-gray-400 text-xs">Consistency</div>
            </div>
          </div>
        </div>
      </section>

      {/* PR Highlight */}
      <section className="p-4 lg:p-6">
        <h2 className="text-white font-medium mb-4 flex items-center">
          <Target className="w-5 h-5 mr-2 text-[#C3A869]" />
          Recent Achievement
        </h2>
        <div className="bg-gray-800 rounded-xl p-4 border border-[#C3A869]/20">
          <div className="text-center">
            <div className="text-2xl mb-2">🏆</div>
            <p className="text-white font-medium">New Deadlift PR!</p>
            <p className="text-gray-400 text-sm">140kg x 5 reps</p>
            <p className="text-[#C3A869] text-xs mt-1">2 days ago</p>
          </div>
        </div>
      </section>

      {/* Quick Stats (mobile only) */}
      <div className="lg:hidden p-4 grid grid-cols-3 gap-4">
        <div className="bg-gray-800 rounded-xl p-4 text-center card-hover">
          <div className="text-[#C3A869] text-2xl mb-1">⚡</div>
          <div className="text-white font-medium">12</div>
          <div className="text-gray-400 text-xs">Sessions</div>
        </div>
        <div className="bg-gray-800 rounded-xl p-4 text-center card-hover">
          <div className="text-[#C3A869] text-2xl mb-1">🏔️</div>
          <div className="text-white font-medium">3</div>
          <div className="text-gray-400 text-xs">PRs</div>
        </div>
        <div className="bg-gray-800 rounded-xl p-4 text-center card-hover">
          <div className="text-[#C3A869] text-2xl mb-1">🔥</div>
          <div className="text-white font-medium">7</div>
          <div className="text-gray-400 text-xs">Streak</div>
        </div>
      </div>

      {/* Recent Workouts */}
      <div className="p-4 lg:p-6">
        <h2 className="text-white font-medium mb-4 flex items-center">
          <Trophy className="w-5 h-5 mr-2 text-[#C3A869]" />
          Your Arsenal
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {displayWorkouts.map(workout => (
            <WorkoutCard
              key={workout.id}
              workout={workout}
              onStart={onStartWorkout}
              onNavigate={onNavigate}
            />
          ))}
        </div>
      </div>

      {/* Floating Action Button */}
      <button
        className="fixed bottom-24 lg:bottom-6 right-6 btn-primary w-14 h-14 rounded-full flex items-center justify-center shadow-lg z-40"
      >
        <Plus className="w-6 h-6" />
      </button>
    </div>
  )
}