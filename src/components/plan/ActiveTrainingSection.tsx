import { Calendar, Play, Eye } from 'lucide-react'

interface ActiveTrainingSectionProps {
  // Future props for active plans and schedules
}

export default function ActiveTrainingSection(props: ActiveTrainingSectionProps) {
  // Mock data - in real app this would come from active program state
  const hasActivePlan = false
  const activePlan = {
    name: "Valhalla Strength",
    block: "Strength Block 1",
    description: "Foundation building phase"
  }

  const weeklySchedule = [
    { day: 'Mon', workout: 'Upper Power', assigned: true },
    { day: 'Tue', workout: 'Rest', assigned: false },
    { day: 'Wed', workout: 'Lower Power', assigned: true },
    { day: 'Thu', workout: 'Rest', assigned: false },
    { day: 'Fri', workout: 'Upper Hypertrophy', assigned: true },
    { day: 'Sat', workout: 'Lower Hypertrophy', assigned: true },
    { day: 'Sun', workout: 'Rest', assigned: false }
  ]

  const nextWorkout = {
    name: "Upper Power",
    day: "Wednesday",
    exercises: 5,
    estimatedTime: "45 min"
  }

  const today = new Date().getDay() // 0 = Sunday, 1 = Monday, etc.
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const todayName = dayNames[today]

  return (
    <section className="p-4 lg:p-6">
      <h2 className="text-white font-heading font-medium mb-4 flex items-center">
        <Calendar className="w-5 h-5 mr-2 text-[#C3A869]" />
        Active Training Context
      </h2>

      {hasActivePlan ? (
        <div className="space-y-4">
          {/* Active Plan Summary */}
          <div className="bg-[#C3A869]/10 border border-[#C3A869]/30 rounded-xl p-4">
            <h3 className="text-white font-heading font-medium mb-1">{activePlan.name}</h3>
            <p className="text-[#C3A869] text-sm mb-1">{activePlan.block}</p>
            <p className="text-gray-400 text-sm">{activePlan.description}</p>
          </div>

          {/* Weekly Schedule Overview */}
          <div className="bg-gray-800 rounded-xl p-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-white font-heading font-medium text-sm">This Week</h3>
              <button className="text-[#C3A869] text-sm hover:text-[#C3A869]/80">
                Edit Schedule
              </button>
            </div>
            <div className="grid grid-cols-7 gap-1">
              {weeklySchedule.map((day, index) => (
                <div 
                  key={day.day} 
                  className={`rounded p-2 text-center text-sm ${
                    day.day === todayName 
                      ? 'bg-[#C3A869]/20 border border-[#C3A869]/30' 
                      : 'bg-gray-700'
                  }`}
                >
                  <div className="text-white font-medium mb-1">{day.day}</div>
                  <div className={`text-sm ${
                    day.assigned ? 'text-[#C3A869]' : 'text-gray-400'
                  }`}>
                    {day.workout}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Next Workout Card */}
          <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-white font-heading font-medium mb-1">Next: {nextWorkout.name}</h3>
                <p className="text-gray-400 text-sm mb-2">{nextWorkout.day}</p>
                <div className="flex gap-4 text-sm text-gray-500">
                  <span>{nextWorkout.exercises} exercises</span>
                  <span>{nextWorkout.estimatedTime}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="bg-gray-700 text-white px-3 py-1 rounded text-sm hover:bg-gray-600 transition flex items-center gap-1">
                  <Eye className="w-3 h-3" />
                  View
                </button>
                <button className="bg-[#C3A869] text-black px-3 py-1 rounded text-sm font-medium hover:bg-[#C3A869]/80 transition flex items-center gap-1">
                  <Play className="w-3 h-3" />
                  Start
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-gray-800/50 rounded-xl p-6 text-center border border-gray-700">
          <div className="text-3xl mb-3">🎯</div>
          <h3 className="text-white font-heading font-medium mb-2">No Active Training Plan</h3>
          <p className="text-gray-400 text-sm mb-4">
            Create workouts and organize them into training blocks to get started
          </p>
          <div className="text-sm text-gray-500 space-y-1">
            <p>• Build individual workouts</p>
            <p>• Organize into training blocks</p>
            <p>• Schedule your weekly routine</p>
          </div>
        </div>
      )}
    </section>
  )
}