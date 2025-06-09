import { Calendar, Plus, Target, RotateCcw, Clock, Settings } from 'lucide-react'

export default function PlanScreen() {
  return (
    <div className="flex-1 overflow-y-auto pb-20 lg:pb-0 lg:pt-20">
      {/* Mobile Header */}
      <div className="lg:hidden bg-gray-900 p-4 border-b border-gray-800">
        <h1 className="text-white text-xl font-medium">Plan</h1>
        <p className="text-gray-400 text-sm">Program planning and scheduling</p>
      </div>

      {/* Active Program Section */}
      <section className="p-4 lg:p-6">
        <h2 className="text-white font-medium mb-4 flex items-center">
          <Target className="w-5 h-5 mr-2 text-[#C3A869]" />
          Current Program
        </h2>
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
          <div className="text-center text-gray-400">
            <div className="text-2xl mb-2">🎯</div>
            <p className="text-sm mb-2">No active program</p>
            <button className="bg-[#C3A869] text-black px-4 py-2 rounded-lg font-medium hover:bg-[#C3A869]/80 transition">
              Set Active Cycle
            </button>
          </div>
        </div>
      </section>

      {/* Macrocycle Planner */}
      <section className="p-4 lg:p-6">
        <h2 className="text-white font-medium mb-4 flex items-center">
          <Calendar className="w-5 h-5 mr-2 text-[#C3A869]" />
          Macrocycle Planner
        </h2>
        <div className="bg-gray-800 rounded-xl p-6">
          <div className="text-center text-gray-400">
            <div className="text-3xl mb-3">📅</div>
            <h3 className="text-white font-medium mb-2">Long-term Planning</h3>
            <p className="text-sm mb-4">Plan your training cycles over months and seasons</p>
            {/* TODO: Add macrocycle planning interface */}
            <div className="text-xs text-gray-500">
              <p>• Annual periodization</p>
              <p>• Competition prep cycles</p>
              <p>• Recovery phases</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mesocycle/Block Creator */}
      <section className="p-4 lg:p-6">
        <h2 className="text-white font-medium mb-4 flex items-center">
          <RotateCcw className="w-5 h-5 mr-2 text-[#C3A869]" />
          Mesocycle Creator
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-gray-800 rounded-xl p-4">
            <h3 className="text-white font-medium mb-2">Strength Block</h3>
            <p className="text-gray-400 text-sm mb-3">3-6 week strength focus</p>
            {/* TODO: Add mesocycle templates */}
            <button className="w-full bg-gray-700 text-white py-2 rounded-lg hover:bg-gray-600 transition">
              Create Block
            </button>
          </div>
          <div className="bg-gray-800 rounded-xl p-4">
            <h3 className="text-white font-medium mb-2">Hypertrophy Block</h3>
            <p className="text-gray-400 text-sm mb-3">4-8 week muscle building</p>
            {/* TODO: Add mesocycle templates */}
            <button className="w-full bg-gray-700 text-white py-2 rounded-lg hover:bg-gray-600 transition">
              Create Block
            </button>
          </div>
        </div>
      </section>

      {/* Microcycle Editor */}
      <section className="p-4 lg:p-6">
        <h2 className="text-white font-medium mb-4 flex items-center">
          <Clock className="w-5 h-5 mr-2 text-[#C3A869]" />
          Microcycle Editor
        </h2>
        <div className="bg-gray-800 rounded-xl p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-white font-medium">Weekly Schedule</h3>
            <button className="text-[#C3A869] text-sm hover:text-[#C3A869]/80">
              Edit Calendar
            </button>
          </div>
          {/* TODO: Add weekly calendar view */}
          <div className="grid grid-cols-7 gap-2">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
              <div key={day} className="bg-gray-700 rounded p-2 text-center">
                <div className="text-white text-xs font-medium mb-1">{day}</div>
                <div className="text-gray-400 text-xs">Rest</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Create Program CTA */}
      <section className="p-4 lg:p-6">
        <div className="bg-gradient-to-r from-[#C3A869]/20 to-[#C3A869]/10 rounded-xl p-6 border border-[#C3A869]/30">
          <div className="text-center">
            <Plus className="w-8 h-8 mx-auto mb-3 text-[#C3A869]" />
            <h3 className="text-white font-medium mb-2">Create Custom Program</h3>
            <p className="text-gray-400 text-sm mb-4">
              Build a complete training program from scratch
            </p>
            <button className="bg-[#C3A869] text-black px-6 py-3 rounded-xl font-medium hover:bg-[#C3A869]/80 transition">
              + Create Program
            </button>
          </div>
        </div>
      </section>

      {/* Program Templates */}
      <section className="p-4 lg:p-6">
        <h2 className="text-white font-medium mb-4 flex items-center">
          <Settings className="w-5 h-5 mr-2 text-[#C3A869]" />
          Program Templates
        </h2>
        <div className="space-y-3">
          <div className="bg-gray-800 rounded-xl p-4">
            <h3 className="text-white font-medium mb-1">Valhalla Strength</h3>
            <p className="text-gray-400 text-sm mb-2">12-week progressive strength program</p>
            <div className="flex justify-between items-center">
              <span className="text-[#C3A869] text-sm">3 blocks • 36 sessions</span>
              <button className="text-[#C3A869] text-sm hover:text-[#C3A869]/80">
                Use Template
              </button>
            </div>
          </div>
          <div className="bg-gray-800 rounded-xl p-4">
            <h3 className="text-white font-medium mb-1">Berserker Conditioning</h3>
            <p className="text-gray-400 text-sm mb-2">8-week metabolic conditioning</p>
            <div className="flex justify-between items-center">
              <span className="text-[#C3A869] text-sm">2 blocks • 24 sessions</span>
              <button className="text-[#C3A869] text-sm hover:text-[#C3A869]/80">
                Use Template
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}