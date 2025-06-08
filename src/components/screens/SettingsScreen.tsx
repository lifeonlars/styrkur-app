import { Settings } from 'lucide-react'

export default function SettingsScreen() {
  return (
    <div className="flex-1 flex items-center justify-center pb-20 lg:pb-0 lg:pt-20">
      <div className="text-center">
        <Settings className="w-16 h-16 mx-auto mb-4 text-[#C3A869]" />
        <h2 className="text-white text-xl mb-2">Settings</h2>
        <p className="text-gray-400">Customize your experience</p>
        <div className="mt-6 space-y-2 text-gray-500 text-sm">
          <p>• Profile settings</p>
          <p>• Units & preferences</p>
          <p>• Backup & sync</p>
        </div>
      </div>
    </div>
  )
}