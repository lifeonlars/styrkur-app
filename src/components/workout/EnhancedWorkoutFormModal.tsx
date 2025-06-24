'use client'

import { useState, useEffect } from 'react'
import { X, Plus } from 'lucide-react'
import { Input } from '@/ui/input'
import { Textarea } from '@/ui/textarea'
import { Button } from '@/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/ui/dialog'
import { Workout, WorkoutForm, WorkoutEntry, Exercise } from '@/types'
import { EnhancedWorkoutEntry } from '@/types/exercise-groups'
import { fetchExercises } from '@/lib/wger'
import WorkoutEntryCard from './WorkoutEntryCard'
import WorkoutSummary from './WorkoutSummary'

// Enhanced imports
import ProgressiveGroupConfigurationModal from './ProgressiveGroupConfigurationModal'
import GroupContextExerciseSelection from './GroupContextExerciseSelection'
import { createEnhancedGroupHandlers } from './enhanced/IntegrationHelpers'
import { convertToEnhancedEntry } from './enhanced/EntryConversion'

interface EnhancedWorkoutFormModalProps {
  onSave: (workout: Workout) => void
  onClose: () => void
  initialWorkout?: Workout
}

// ================================================================================================
// ENHANCED USER FLOW STATES
// ================================================================================================

type FlowState = 'workout-form' | 'group-configuration' | 'exercise-selection' | 'finalizing'

interface FlowData {
  configuredGroup?: EnhancedWorkoutEntry
  selectedExercises: Exercise[]
  isEditing: boolean
  editingEntry?: WorkoutEntry
}

export default function EnhancedWorkoutFormModal({ onSave, onClose, initialWorkout }: EnhancedWorkoutFormModalProps) {
  const [workoutForm, setWorkoutForm] = useState<WorkoutForm>({
    title: initialWorkout?.title || '',
    description: initialWorkout?.description || '',
    entries: initialWorkout?.entries || []
  })
  
  const [exercises, setExercises] = useState<Exercise[]>([])
  const [flowState, setFlowState] = useState<FlowState>('workout-form')
  const [flowData, setFlowData] = useState<FlowData>({
    selectedExercises: [],
    isEditing: false
  })

  // ================================================================================================
  // EFFECTS
  // ================================================================================================

  // Load exercises for lookup
  useEffect(() => {
    const loadExercises = async () => {
      try {
        const allExercises = await fetchExercises({ limit: 100 })
        setExercises(allExercises)
      } catch (error) {
        console.error('Failed to load exercises:', error)
      }
    }
    loadExercises()
  }, [])

  // ================================================================================================
  // ENHANCED GROUP HANDLERS
  // ================================================================================================

  const enhancedHandlers = createEnhancedGroupHandlers(
    // Handle adding new entry
    (newEntry: WorkoutEntry) => {
      setWorkoutForm(prev => ({
        ...prev,
        entries: [...prev.entries, newEntry]
      }))
      handleFlowComplete()
    },
    // Handle editing existing entry
    (updatedEntry: WorkoutEntry) => {
      setWorkoutForm(prev => ({
        ...prev,
        entries: prev.entries.map(e => e.id === updatedEntry.id ? updatedEntry : e)
      }))
      handleFlowComplete()
    }
  )

  // ================================================================================================
  // FLOW NAVIGATION HANDLERS
  // ================================================================================================

  const handleStartGroupConfiguration = () => {
    setFlowData({
      selectedExercises: [],
      isEditing: false,
      configuredGroup: undefined,
      editingEntry: undefined
    })
    setFlowState('group-configuration')
  }

  const handleEditGroup = (entry: WorkoutEntry) => {
    setFlowData({
      selectedExercises: [],
      isEditing: true,
      editingEntry: entry,
      configuredGroup: undefined
    })
    setFlowState('group-configuration')
  }

  const handleGroupConfigurationComplete = (enhancedEntry: EnhancedWorkoutEntry) => {
    setFlowData(prev => ({
      ...prev,
      configuredGroup: enhancedEntry
    }))
    
    // If group already has exercises (editing), finalize immediately
    if (enhancedEntry.exercises && enhancedEntry.exercises.length > 0) {
      handleFinalizeGroup(enhancedEntry)
    } else {
      // Proceed to exercise selection
      setFlowState('exercise-selection')
    }
  }

  const handleExerciseSelectionComplete = (selectedExercises: Exercise[]) => {
    if (flowData.configuredGroup) {
      // Add selected exercises to the configured group
      const completeGroup: EnhancedWorkoutEntry = {
        ...flowData.configuredGroup,
        exercises: selectedExercises.map(exercise => ({
          exerciseId: exercise.id,
          reps: 10, // Default values - can be configured later
          weight: exercise.isWeighted ? 20 : 0,
          rest: 90,
          tempo: '',
          notes: exercise.cues || ''
        }))
      }
      
      handleFinalizeGroup(completeGroup)
    }
  }

  const handleFinalizeGroup = (completeGroup: EnhancedWorkoutEntry) => {
    setFlowState('finalizing')
    
    // Use enhanced handlers to add/edit the group
    if (flowData.isEditing) {
      enhancedHandlers.handleEditEnhancedGroup(completeGroup)
    } else {
      enhancedHandlers.handleAddEnhancedGroup(completeGroup)
    }
  }

  const handleFlowComplete = () => {
    setFlowState('workout-form')
    setFlowData({
      selectedExercises: [],
      isEditing: false
    })
  }

  const handleFlowCancel = () => {
    setFlowState('workout-form')
    setFlowData({
      selectedExercises: [],
      isEditing: false
    })
  }

  // ================================================================================================
  // EXISTING HANDLERS (maintained for compatibility)
  // ================================================================================================

  const handleDeleteGroup = (entryId: string) => {
    setWorkoutForm(prev => ({
      ...prev,
      entries: prev.entries.filter(e => e.id !== entryId)
    }))
  }

  const moveEntryUp = (index: number) => {
    if (index > 0) {
      setWorkoutForm(prev => {
        const newEntries = [...prev.entries]
        const temp = newEntries[index]
        newEntries[index] = newEntries[index - 1]
        newEntries[index - 1] = temp
        return { ...prev, entries: newEntries }
      })
    }
  }

  const moveEntryDown = (index: number) => {
    if (index < workoutForm.entries.length - 1) {
      setWorkoutForm(prev => {
        const newEntries = [...prev.entries]
        const temp = newEntries[index]
        newEntries[index] = newEntries[index + 1]
        newEntries[index + 1] = temp
        return { ...prev, entries: newEntries }
      })
    }
  }

  const handleSave = () => {
    const workout: Workout = {
      id: initialWorkout?.id || Date.now(),
      title: workoutForm.title,
      description: workoutForm.description,
      entries: workoutForm.entries,
      tags: initialWorkout?.tags || [],
      createdAt: initialWorkout?.createdAt || new Date(),
      updatedAt: new Date()
    }
    onSave(workout)
  }

  const canSave = workoutForm.title.trim() && workoutForm.entries.length > 0

  // ================================================================================================
  // FLOW-SPECIFIC RENDER FUNCTIONS
  // ================================================================================================

  const renderGroupConfiguration = () => (
    <ProgressiveGroupConfigurationModal
      exercises={exercises}
      existingGroup={flowData.editingEntry ? convertToEnhancedEntry(flowData.editingEntry) : undefined}
      onSave={handleGroupConfigurationComplete}
      onCancel={handleFlowCancel}
      weightUnit="kg"
      title={flowData.isEditing ? 'Edit Exercise Group' : 'Create Exercise Group'}
    />
  )

  const renderExerciseSelection = () => {
    if (!flowData.configuredGroup) return null
    
    return (
      <GroupContextExerciseSelection
        groupContext={flowData.configuredGroup}
        availableExercises={exercises}
        onSelectExercises={handleExerciseSelectionComplete}
        onBack={() => setFlowState('group-configuration')}
        onCancel={handleFlowCancel}
        preSelectedExercises={flowData.selectedExercises}
      />
    )
  }

  const getRequiredExerciseCount = () => {
    if (!flowData.configuredGroup) return { min: 1, max: 10 }
    
    switch (flowData.configuredGroup.type) {
      case 'single':
        return { min: 1, max: 1 }
      case 'superset':
        return { min: 2, max: 3 }
      case 'circuit':
        return { min: 3, max: 10 }
      case 'complex':
        return { min: 2, max: 5 }
      default:
        return { min: 1, max: 10 }
    }
  }

  // ================================================================================================
  // MAIN RENDER
  // ================================================================================================

  // Render flow-specific modals
  if (flowState === 'group-configuration') {
    return renderGroupConfiguration()
  }

  if (flowState === 'exercise-selection') {
    return renderExerciseSelection()
  }

  // Main workout form interface
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>
            {initialWorkout ? 'Edit Workout' : 'Create Workout'}
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-6">
            {/* Workout Details */}
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">Workout Name</label>
              <Input
                type="text"
                value={workoutForm.title}
                onChange={(e) => setWorkoutForm(prev => ({ ...prev, title: e.target.value }))}
                placeholder="e.g., Upper Body Strength, HIIT Circuit"
              />
            </div>

            {/* Enhanced Workout Entries */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-white font-medium">
                  Workout Structure ({workoutForm.entries.length} groups)
                </h3>
                <div className="flex gap-2">
                  <Button
                    onClick={handleStartGroupConfiguration}
                    variant="primary"
                    size="default"
                    className="flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add Exercise Group
                  </Button>
                </div>
              </div>

              {workoutForm.entries.length === 0 ? (
                <div className="text-center py-12 text-gray-400">
                  <div className="text-4xl mb-4">💪</div>
                  <div className="text-lg mb-2">No exercise groups yet</div>
                  <div className="text-sm">Add your first exercise group with enhanced configuration</div>
                </div>
              ) : (
                <div className="space-y-4">
                  {workoutForm.entries.map((entry, index) => (
                    <WorkoutEntryCard
                      key={entry.id}
                      entry={entry}
                      exercises={exercises}
                      onEdit={() => handleEditGroup(entry)}
                      onDelete={handleDeleteGroup}
                      onMoveUp={() => moveEntryUp(index)}
                      onMoveDown={() => moveEntryDown(index)}
                      canMoveUp={index > 0}
                      canMoveDown={index < workoutForm.entries.length - 1}
                    />
                  ))}
                  
                  {/* Enhanced Add Another Group Button */}
                  <Button
                    onClick={handleStartGroupConfiguration}
                    variant="dashed"
                    size="default"
                    className="w-full py-4 flex items-center justify-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add Exercise Group
                  </Button>
                </div>
              )}
            </div>

            {/* Workout Summary */}
            {workoutForm.entries.length > 0 && (
              <WorkoutSummary
                workout={{
                  ...workoutForm,
                  id: initialWorkout?.id || Date.now(),
                  tags: initialWorkout?.tags || [],
                  createdAt: initialWorkout?.createdAt || new Date(),
                  updatedAt: new Date()
                }}
                exercises={exercises}
              />
            )}

            {/* Description */}
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">Description (optional)</label>
              <Textarea
                value={workoutForm.description}
                onChange={(e) => setWorkoutForm(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Brief description of the workout..."
                className="min-h-[80px]"
              />
            </div>

            {/* Enhanced Features Info */}
            <div className="mt-6 p-4 bg-neu-card rounded-lg">
              <h5 className="text-white font-medium mb-2">Enhanced Features</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h6 className="text-norse-gold font-medium mb-1">✨ Progressive Configuration</h6>
                  <ul className="text-xs text-gray-400 space-y-1">
                    <li>• Previous choices always visible</li>
                    <li>• Easy modification of any selection</li>
                    <li>• Real-time configuration preview</li>
                    <li>• Technical filtering with explanations</li>
                  </ul>
                </div>
                <div>
                  <h6 className="text-norse-gold font-medium mb-1">🎯 Smart Configuration</h6>
                  <ul className="text-xs text-gray-400 space-y-1">
                    <li>• Dual-path EMOM ascending logic</li>
                    <li>• Rep pattern previews</li>
                    <li>• Weight progression for pyramids</li>
                    <li>• Mobile-optimized interface</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-neu-subtle flex gap-3">
          <Button
            onClick={handleSave}
            disabled={!canSave}
            variant="primary"
            size="default"
            className="flex-1 py-3"
          >
            {initialWorkout ? 'Update Workout' : 'Create Workout'}
          </Button>
          <Button
            onClick={onClose}
            variant="outline"
            size="default"
            className="flex-1 py-3"
          >
            Cancel
          </Button>
        </div>
      </DialogContent>

      {/* Flow State Indicator (for debugging - can be removed in production) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed top-4 right-4 bg-black/80 text-white px-3 py-2 rounded text-xs z-[110]">
          Flow: {flowState}
          {flowData.configuredGroup && ` | Group: ${flowData.configuredGroup.type}`}
        </div>
      )}
    </Dialog>
  )
}