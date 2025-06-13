import { Settings, User, Scale, Dumbbell, Bot, Shield, Download } from 'lucide-react'
import { NavSettings } from '@/components/icons'

export default function SettingsScreen() {
  return (
    <div className="flex-1 overflow-y-auto pb-20 lg:pb-0 lg:pt-24">
      {/* Mobile Header */}
      <div className="lg:hidden bg-gray-900 p-4 border-b border-gray-800">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 pt-1">
            <NavSettings className="w-16 h-16 text-[#C3A869]" />
          </div>
          <div className="flex-1">
            <h1 className="text-white text-xl font-medium font-heading">Settings</h1>
            <p className="text-gray-400 text-sm">Customize your experience</p>
          </div>
        </div>
      </div>

      {/* Page Header */}
      <div className="hidden lg:block p-6">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 pt-1">
            <NavSettings className="w-16 h-16 text-[#C3A869]" />
          </div>
          <div className="flex-1">
            <h1 className="text-white text-2xl font-light mb-2 font-heading">Settings</h1>
            <p className="text-gray-400">Configure your training preferences</p>
          </div>
        </div>
      </div>

      {/* Personal Units & Preferences */}
      <section className="p-4 lg:p-6">
        <h2 className="text-white font-medium mb-4 flex items-center font-heading">
          <Scale className="w-5 h-5 mr-2 text-[#C3A869]" />
          Personal Units & Preferences
        </h2>
        <div className="space-y-3">
          <div className="bg-gray-800 rounded-xl p-4">
            <h3 className="text-white font-medium mb-2 font-heading">Weight Units</h3>
            <div className="flex gap-2">
              <button className="bg-[#C3A869] text-black px-3 py-1 rounded text-sm font-medium">
                Kilograms (kg)
              </button>
              <button className="bg-gray-700 text-white px-3 py-1 rounded text-sm hover:bg-gray-600">
                Pounds (lbs)
              </button>
            </div>
          </div>
          <div className="bg-gray-800 rounded-xl p-4">
            <h3 className="text-white font-medium mb-2 font-heading">Distance Units</h3>
            <div className="flex gap-2">
              <button className="bg-[#C3A869] text-black px-3 py-1 rounded text-sm font-medium">
                Metric (km/m)
              </button>
              <button className="bg-gray-700 text-white px-3 py-1 rounded text-sm hover:bg-gray-600">
                Imperial (mi/ft)
              </button>
            </div>
          </div>
          <div className="bg-gray-800 rounded-xl p-4">
            <h3 className="text-white font-medium mb-2 font-heading">Default Rest Timer</h3>
            <p className="text-gray-400 text-sm mb-2">Default rest time between sets</p>
            <div className="flex gap-2">
              {['60s', '90s', '120s', '180s'].map(time => (
                <button
                  key={time}
                  className={`px-3 py-1 rounded text-sm ${
                    time === '120s'
                      ? 'bg-[#C3A869] text-black font-medium'
                      : 'bg-gray-700 text-white hover:bg-gray-600'
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Training Defaults */}
      <section className="p-4 lg:p-6">
        <h2 className="text-white font-medium mb-4 flex items-center font-heading">
          <Dumbbell className="w-5 h-5 mr-2 text-[#C3A869]" />
          Training Defaults
        </h2>
        <div className="space-y-3">
          <div className="bg-gray-800 rounded-xl p-4">
            <h3 className="text-white font-medium mb-2 font-heading">Default RPE Scale</h3>
            <p className="text-gray-400 text-sm mb-2">Preferred effort rating system</p>
            <div className="flex gap-2">
              <button className="bg-[#C3A869] text-black px-3 py-1 rounded text-sm font-medium">
                RPE 1-10
              </button>
              <button className="bg-gray-700 text-white px-3 py-1 rounded text-sm hover:bg-gray-600">
                RIR 0-5
              </button>
            </div>
          </div>
          <div className="bg-gray-800 rounded-xl p-4">
            <h3 className="text-white font-medium mb-2 font-heading">Auto-progression</h3>
            <p className="text-gray-400 text-sm mb-2">Automatically suggest weight increases</p>
            <div className="flex items-center gap-3">
              <button className="bg-[#C3A869] text-black px-3 py-1 rounded text-sm font-medium">
                Enabled
              </button>
              <span className="text-gray-400 text-sm">+2.5kg when RPE ≤ 7</span>
            </div>
          </div>
          <div className="bg-gray-800 rounded-xl p-4">
            <h3 className="text-white font-medium mb-2 font-heading">Warm-up Sets</h3>
            <p className="text-gray-400 text-sm mb-2">Include warm-up recommendations</p>
            <button className="bg-[#C3A869] text-black px-3 py-1 rounded text-sm font-medium">
              Auto-generate
            </button>
          </div>
        </div>
      </section>

      {/* OpenAI/API Integrations */}
      <section className="p-4 lg:p-6">
        <h2 className="text-white font-medium mb-4 flex items-center font-heading">
          <Bot className="w-5 h-5 mr-2 text-[#C3A869]" />
          AI & API Integrations
        </h2>
        <div className="bg-gray-800 rounded-xl p-4">
          <div className="text-center text-gray-400 py-4">
            <Bot className="w-8 h-8 mx-auto mb-3" />
            <h3 className="text-white font-medium mb-2 font-heading">AI Features Coming Soon</h3>
            <p className="text-sm mb-4">
              Connect with OpenAI for intelligent workout planning and form analysis
            </p>
            <div className="text-sm text-gray-500 space-y-1">
              <p>• Workout generation</p>
              <p>• Exercise form tips</p>
              <p>• Progress insights</p>
            </div>
          </div>
        </div>
      </section>

      {/* Backup, Export & Reset */}
      <section className="p-4 lg:p-6">
        <h2 className="text-white font-medium mb-4 flex items-center font-heading">
          <Shield className="w-5 h-5 mr-2 text-[#C3A869]" />
          Data Management
        </h2>
        <div className="space-y-3">
          <div className="bg-gray-800 rounded-xl p-4">
            <h3 className="text-white font-medium mb-2 font-heading">Backup & Sync</h3>
            <p className="text-gray-400 text-sm mb-3">Keep your data safe across devices</p>
            <button className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition">
              Setup Cloud Backup
            </button>
          </div>
          <div className="bg-gray-800 rounded-xl p-4">
            <h3 className="text-white font-medium mb-2 font-heading">Export Data</h3>
            <p className="text-gray-400 text-sm mb-3">Download your workout history</p>
            <div className="flex gap-2">
              <button className="bg-gray-700 text-white px-3 py-2 rounded text-sm hover:bg-gray-600 flex items-center gap-1">
                <Download className="w-4 h-4" />
                Export JSON
              </button>
              <button className="bg-gray-700 text-white px-3 py-2 rounded text-sm hover:bg-gray-600 flex items-center gap-1">
                <Download className="w-4 h-4" />
                Export CSV
              </button>
            </div>
          </div>
          <div className="bg-gray-800 rounded-xl p-4 border border-red-900/50">
            <h3 className="text-white font-medium mb-2 font-heading">Reset Application</h3>
            <p className="text-gray-400 text-sm mb-3">Clear all data and start fresh</p>
            <button className="bg-red-900 text-white px-4 py-2 rounded-lg hover:bg-red-800 transition">
              Reset All Data
            </button>
          </div>
        </div>
      </section>

      {/* Profile Section */}
      <section className="p-4 lg:p-6">
        <h2 className="text-white font-medium mb-4 flex items-center font-heading">
          <User className="w-5 h-5 mr-2 text-[#C3A869]" />
          Profile
        </h2>
        <div className="bg-gray-800 rounded-xl p-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-[#C3A869]/20 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-[#C3A869]" />
            </div>
            <div>
              <h3 className="text-white font-medium font-heading">Lars Eriksson</h3>
              <p className="text-gray-400 text-sm">Norse warrior in training</p>
            </div>
          </div>
          <button className="text-[#C3A869] text-sm hover:text-[#C3A869]/80">
            Edit Profile →
          </button>
        </div>
      </section>
    </div>
  )
}