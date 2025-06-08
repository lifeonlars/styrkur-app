import { Edit3 } from 'lucide-react'

export default function LogScreen() {
  return (
    <div className="flex-1 flex items-center justify-center pb-20 lg:pb-0 lg:pt-20">
      <div className="text-center">
        <Edit3 className="w-16 h-16 mx-auto mb-4 text-[#C3A869]" />
        <h2 className="text-white text-xl mb-2">Training Log</h2>
        <p className="text-gray-400">View your progress and history</p>
        <div className="mt-6 space-y-2 text-gray-500 text-sm">
          <p>• Workout history</p>
          <p>• Performance analytics</p>
          <p>• Progress tracking</p>
        </div>
      </div>
    </div>
  )
}