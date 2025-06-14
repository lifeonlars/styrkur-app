import { NavigationTab } from '@/types'

interface BottomNavigationProps {
  tabs: NavigationTab[]
  activeTab: string
  onTabChange: (tabId: string) => void
}

export default function BottomNavigation({ tabs, activeTab, onTabChange }: BottomNavigationProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-neu-card shadow-neu-raised border-t border-neu-light/20">
      <div className="flex">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex-1 py-3 px-2 flex flex-col items-center transition-colors relative ${
              activeTab === tab.id ? 'text-[var(--primary-color)]' : 'text-gray-400'
            }`}
          >
            <tab.icon className="w-8 h-8 mb-1" />
            <span className="text-sm">{tab.label}</span>
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-[var(--primary-color)]" />
            )}
          </button>
        ))}
      </div>
    </div>
  )
}