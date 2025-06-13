import { History, Calendar, TrendingUp, Filter, BarChart3 } from 'lucide-react'
import { NavHistory } from '@/components/icons'

export default function HistoryScreen() {
  return (
    <div className="flex-1 overflow-y-auto pb-20 lg:pb-0 lg:pt-24">
      {/* Mobile Header */}
      <div className="lg:hidden bg-background p-4 border-b border-divider">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 pt-1">
            <NavHistory className="w-16 h-16 text-[#C3A869]" />
          </div>
          <div className="flex-1">
            <h1 className="text-white text-xl font-medium font-heading">History</h1>
            <p className="text-gray-400 text-sm">Your workout history and progress</p>
          </div>
        </div>
      </div>

      {/* Page Header */}
      <div className="hidden lg:block p-6">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 pt-1">
            <NavHistory className="w-16 h-16 text-[#C3A869]" />
          </div>
          <div className="flex-1">
            <h1 className="text-white text-2xl font-light mb-2 font-heading">Workout History</h1>
            <p className="text-gray-400">Track your progress and analyze your training</p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <section className="p-4 lg:p-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-content1 rounded-xl p-4 text-center">
            <div className="text-[#C3A869] text-2xl mb-2">💪</div>
            <div className="text-white text-lg font-medium">24</div>
            <div className="text-gray-400 text-sm">Total Workouts</div>
          </div>
          <div className="bg-content1 rounded-xl p-4 text-center">
            <div className="text-[#C3A869] text-2xl mb-2">🔥</div>
            <div className="text-white text-lg font-medium">7</div>
            <div className="text-gray-400 text-sm">Current Streak</div>
          </div>
          <div className="bg-content1 rounded-xl p-4 text-center">
            <div className="text-[#C3A869] text-2xl mb-2">⏱️</div>
            <div className="text-white text-lg font-medium">18h</div>
            <div className="text-gray-400 text-sm">Total Time</div>
          </div>
          <div className="bg-content1 rounded-xl p-4 text-center">
            <div className="text-[#C3A869] text-2xl mb-2">🏆</div>
            <div className="text-white text-lg font-medium">3</div>
            <div className="text-gray-400 text-sm">This Month</div>
          </div>
        </div>
      </section>

      {/* Charts Section */}
      <section className="p-4 lg:p-6">
        <h2 className="text-white font-medium mb-4 flex items-center font-heading">
          <BarChart3 className="w-5 h-5 mr-2 text-[#C3A869]" />
          Progress Charts
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-content1 rounded-xl p-4">
            <h3 className="text-white font-medium mb-3 font-heading">Volume Progression</h3>
            <div className="h-32 bg-content2 rounded flex items-center justify-center">
              <div className="text-center text-gray-400">
                <TrendingUp className="w-8 h-8 mx-auto mb-2" />
                <p className="text-sm">Chart will appear here</p>
              </div>
            </div>
          </div>
          <div className="bg-content1 rounded-xl p-4">
            <h3 className="text-white font-medium mb-3 font-heading">Personal Records</h3>
            <div className="h-32 bg-content2 rounded flex items-center justify-center">
              <div className="text-center text-gray-400">
                <BarChart3 className="w-8 h-8 mx-auto mb-2" />
                <p className="text-sm">PR timeline chart</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="p-4 lg:p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-white font-medium flex items-center font-heading">
            <History className="w-5 h-5 mr-2 text-[#C3A869]" />
            Recent Workouts
          </h2>
          <button className="flex items-center gap-2 text-[#C3A869] text-sm hover:text-[#C3A869]/80">
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>

        {/* Filter Options */}
        <div className="flex gap-2 mb-4 overflow-x-auto">
          {['All', 'This Week', 'This Month', 'By Program', 'By Exercise'].map(filter => (
            <button
              key={filter}
              className={`px-3 py-1 rounded-lg text-sm whitespace-nowrap transition ${
                filter === 'All'
                  ? 'bg-[#C3A869] text-black font-medium'
                  : 'bg-content2 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </section>

      {/* Workout History List */}
      <section className="p-4 lg:p-6">
        <div className="space-y-3">
          {/* Empty State */}
          <div className="bg-content1/50 rounded-xl p-8 text-center border border-divider">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-white font-medium mb-2 font-heading">No Workouts Logged Yet</h3>
            <p className="text-gray-400 text-sm mb-4">
              You haven't logged any workouts yet. Start training to see your history here.
            </p>
            <div className="text-sm text-gray-500 space-y-1">
              <p>• Workout completion tracking</p>
              <p>• Performance metrics</p>
              <p>• Progress visualization</p>
            </div>
          </div>

          {/* Example workout entries - TODO: Replace with real data */}
          {/* 
          <div className="bg-content1 rounded-xl p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-white font-medium font-heading">Odin's Strength</h3>
                <p className="text-gray-400 text-sm">Upper body focus</p>
              </div>
              <div className="text-right">
                <div className="text-gray-400 text-sm">Dec 15, 2024</div>
                <div className="text-[#C3A869] text-sm">45 min</div>
              </div>
            </div>
            <div className="flex gap-4 text-sm text-gray-400">
              <span>5 exercises</span>
              <span>120kg total volume</span>
              <span>RPE 7.5 avg</span>
            </div>
          </div>
          */}
        </div>
      </section>

      {/* Consistency Calendar */}
      <section className="p-4 lg:p-6">
        <h2 className="text-white font-medium mb-4 flex items-center font-heading">
          <Calendar className="w-5 h-5 mr-2 text-[#C3A869]" />
          Training Consistency
        </h2>
        <div className="bg-content1 rounded-xl p-4">
          <div className="text-center text-gray-400 py-8">
            <Calendar className="w-12 h-12 mx-auto mb-3" />
            <p className="text-sm">Consistency calendar will show here</p>
            <p className="text-sm text-gray-500 mt-2">Visual representation of training frequency</p>
          </div>
        </div>
      </section>
    </div>
  )
}