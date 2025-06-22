import { Plus, Edit, Trash2, Calendar, Target } from 'lucide-react'
import { Button } from '@/ui/button'

interface TrainingBlock {
  id: number
  name: string
  duration: string
  focus: string
  description: string
  workouts: number
  status: 'planned' | 'active' | 'completed'
}

interface TrainingBlockTabProps {
  // Future props for training blocks
}

export default function TrainingBlockTab(props: TrainingBlockTabProps) {
  // Mock data - in real app this would come from training block state
  const trainingBlocks: TrainingBlock[] = [
    {
      id: 1,
      name: "Foundation Block",
      duration: "4 weeks",
      focus: "Movement patterns & base strength",
      description: "Establish proper form and build base conditioning",
      workouts: 16,
      status: 'completed'
    },
    {
      id: 2,
      name: "Strength Block",
      duration: "6 weeks", 
      focus: "Max strength development",
      description: "Heavy compound movements with progressive overload",
      workouts: 24,
      status: 'active'
    },
    {
      id: 3,
      name: "Hypertrophy Block",
      duration: "4 weeks",
      focus: "Muscle building & volume",
      description: "Higher volume training for muscle growth",
      workouts: 16,
      status: 'planned'
    }
  ]

  const handleEditBlock = (block: TrainingBlock) => {
    // TODO: Open edit modal
    console.log('Edit block:', block.name)
  }

  const handleDeleteBlock = (block: TrainingBlock) => {
    if (window.confirm(`Delete "${block.name}"? This action cannot be undone.`)) {
      // TODO: Delete block
      console.log('Delete block:', block.name)
    }
  }

  const getStatusColor = (status: TrainingBlock['status']) => {
    switch (status) {
      case 'active':
        return 'bg-norse-gold/20 border-norse-gold/30 text-norse-gold'
      case 'completed':
        return 'bg-green-900/20 border-green-700/30 text-green-400'
      case 'planned':
        return 'bg-gray-700/50 border-gray-600/30 text-gray-400'
      default:
        return 'bg-gray-700/50 border-gray-600/30 text-gray-400'
    }
  }

  const getStatusLabel = (status: TrainingBlock['status']) => {
    switch (status) {
      case 'active':
        return 'Active'
      case 'completed':
        return 'Completed'
      case 'planned':
        return 'Planned'
      default:
        return 'Unknown'
    }
  }

  return (
    <div className="space-y-6">
      {/* Create Block Section */}
      <div className="bg-neu-surface depth-subtle surface-flat border-neu-subtle rounded-xl p-6">
        <div className="text-center">
          <div className="w-12 h-12 bg-norse-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Target className="w-6 h-6 text-norse-gold" />
          </div>
          <h3 className="text-white font-heading font-medium mb-2">Create Training Block</h3>
          <p className="text-gray-400 text-sm mb-4">
            Organize workouts into focused training phases (3-8 weeks)
          </p>
          <Button
            variant="flat"
            size="default"
            className="text-gray-500 cursor-not-allowed"
            disabled
          >
            <Plus className="w-5 h-5 mr-2" />
            Create Block (Coming Soon)
          </Button>
        </div>
      </div>

      {/* Training Blocks List */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-white font-heading font-medium">Training Blocks ({trainingBlocks.length})</h3>
          <div className="text-sm text-gray-500">
            Organize your training progression
          </div>
        </div>

        {trainingBlocks.length > 0 ? (
          <div className="space-y-3">
            {trainingBlocks.map(block => (
              <div key={block.id} className={`rounded-xl p-4 border transition ${getStatusColor(block.status)}`}>
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-white font-heading font-medium">{block.name}</h4>
                      <span className={`px-2 py-1 rounded text-sm border ${getStatusColor(block.status)}`}>
                        {getStatusLabel(block.status)}
                      </span>
                    </div>
                    
                    <p className="text-gray-400 text-sm mb-2">{block.description}</p>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {block.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <Target className="w-3 h-3" />
                        {block.focus}
                      </span>
                      <span>{block.workouts} workouts</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 ml-4">
                    <Button
                      onClick={() => handleEditBlock(block)}
                      variant="flat"
                      size="icon"
                      className="text-gray-500 cursor-not-allowed"
                      title="Edit block (Coming Soon)"
                      disabled
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    
                    <Button
                      onClick={() => handleDeleteBlock(block)}
                      variant="flat"
                      size="icon"
                      className="text-red-500 cursor-not-allowed"
                      title="Delete block (Coming Soon)"
                      disabled
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {block.status === 'active' && (
                  <div className="mt-3 pt-3 border-t border-norse-gold/20">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-400">Week 2 of 6</span>
                      <span className="text-norse-gold">33% complete</span>
                    </div>
                    <div className="mt-2 bg-neu-card rounded-full h-1">
                      <div className="bg-norse-gold h-1 rounded-full" style={{ width: '33%' }}></div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-neu-surface/50 depth-subtle surface-flat border-neu-subtle rounded-xl p-8 text-center">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-white font-heading font-medium mb-2">No Training Blocks</h3>
            <p className="text-gray-400 text-sm mb-4">
              Create training blocks to organize your workouts into focused phases
            </p>
            <div className="text-sm text-gray-500 space-y-1">
              <p>• 3-8 week training phases</p>
              <p>• Specific focus (strength, hypertrophy, etc.)</p>
              <p>• Progressive workout planning</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}