import { X } from 'lucide-react'

interface TagFilterProps {
  availableTags: string[]
  selectedTags: string[]
  onTagToggle: (tag: string) => void
  onClearAll: () => void
}

export default function TagFilter({ 
  availableTags, 
  selectedTags, 
  onTagToggle, 
  onClearAll 
}: TagFilterProps) {
  if (availableTags.length === 0) {
    return null
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-gray-400 text-sm font-medium">Filter by tags:</span>
        {selectedTags.length > 0 && (
          <button
            onClick={onClearAll}
            className="text-[#C3A869] text-xs hover:text-[#C3A869]/80 transition flex items-center gap-1"
          >
            <X className="w-3 h-3" />
            Clear all
          </button>
        )}
      </div>
      
      <div className="flex gap-2 flex-wrap">
        {availableTags.map(tag => {
          const isSelected = selectedTags.includes(tag)
          return (
            <button
              key={tag}
              onClick={() => onTagToggle(tag)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition ${
                isSelected
                  ? 'bg-[#C3A869] text-black'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {tag}
            </button>
          )
        })}
      </div>
    </div>
  )
}