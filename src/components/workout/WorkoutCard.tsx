import { Workout } from '@/types'

interface WorkoutCardProps {
  workout: Workout
  onStart: (workout: Workout) => void
  onNavigate?: (tab: string) => void
}

export default function WorkoutCard({ workout, onStart, onNavigate }: WorkoutCardProps) {
  const handleStart = () => {
    onStart(workout)
    onNavigate?.('train')
  }
  return (
    <div className="bg-gray-800 rounded-xl p-4 card-hover">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-white font-medium">{workout.title}</h3>
        <button
          onClick={handleStart}
          className="btn-primary px-3 py-1 rounded-lg text-sm font-medium"
        >
          Start
        </button>
      </div>
      <p className="text-gray-400 text-sm mb-3">{workout.description}</p>
      <div className="flex items-center justify-between mb-2">
        <div className="text-gray-400 text-xs">
          {workout.exercises.length} exercises
        </div>
        <div className="text-gray-400 text-xs">
          ~{Math.ceil((workout.exercises.length * 3 + workout.supersets.length * 2 + workout.circuits.length * 2) * 1.5)} min
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {workout.tags.map(tag => (
          <span 
            key={tag} 
            className="bg-[#C3A869]/20 text-[#C3A869] px-2 py-1 rounded text-xs"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}