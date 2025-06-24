'use client'

import React, { useState } from 'react'
import { WorkoutEntry, Exercise } from '@/types'
import { EnhancedWorkoutEntry } from '@/types/exercise-groups'
import ProgressiveGroupConfigurationModal from '../ProgressiveGroupConfigurationModal'
import { createEnhancedGroupHandlers } from './IntegrationHelpers'
import { Button } from '@/ui/button'
import { Plus } from 'lucide-react'

// ================================================================================================
// INTEGRATION EXAMPLE COMPONENT
// ================================================================================================

/**
 * Example component showing how to integrate ProgressiveGroupConfiguration
 * with existing WorkoutFormModal workflow
 */

interface EnhancedWorkoutFormIntegrationProps {
  // Existing workout form state
  workoutEntries: WorkoutEntry[]
  onUpdateEntries: (entries: WorkoutEntry[]) => void
  
  // Available exercises for selection
  availableExercises: Exercise[]
  
  // Modal state management  
  showEnhancedConfig: boolean
  setShowEnhancedConfig: (show: boolean) => void
  
  // Editing state (optional)
  editingEntry?: WorkoutEntry
  setEditingEntry?: (entry: WorkoutEntry | undefined) => void
}

export default function EnhancedWorkoutFormIntegration({
  workoutEntries,
  onUpdateEntries,
  availableExercises,
  showEnhancedConfig,
  setShowEnhancedConfig,
  editingEntry,
  setEditingEntry
}: EnhancedWorkoutFormIntegrationProps) {

  // ================================================================================================
  // STATE MANAGEMENT
  // ================================================================================================

  // Create enhanced group handlers using the integration utilities
  const enhancedHandlers = createEnhancedGroupHandlers(
    // Handle adding new entry
    (newEntry: WorkoutEntry) => {
      const updatedEntries = [...workoutEntries, newEntry]
      onUpdateEntries(updatedEntries)
      setShowEnhancedConfig(false)
    },
    // Handle editing existing entry
    (updatedEntry: WorkoutEntry) => {
      const updatedEntries = workoutEntries.map(entry => 
        entry.id === updatedEntry.id ? updatedEntry : entry
      )
      onUpdateEntries(updatedEntries)
      setShowEnhancedConfig(false)
      setEditingEntry?.(undefined)
    }
  )

  // ================================================================================================
  // ENHANCED GROUP CONFIGURATION HANDLERS
  // ================================================================================================

  const handleSaveEnhancedGroup = (enhancedEntry: EnhancedWorkoutEntry) => {
    if (editingEntry) {
      // Editing existing entry
      enhancedHandlers.handleEditEnhancedGroup(enhancedEntry)
    } else {
      // Adding new entry
      enhancedHandlers.handleAddEnhancedGroup(enhancedEntry)
    }
  }

  const handleCancelEnhancedConfig = () => {
    setShowEnhancedConfig(false)
    setEditingEntry?.(undefined)
  }

  // Convert editing entry to enhanced format
  const enhancedEditingEntry = editingEntry 
    ? enhancedHandlers.convertEntryForEditing(editingEntry)
    : undefined

  // ================================================================================================
  // RENDER INTEGRATION EXAMPLES
  // ================================================================================================

  return (
    <div className="space-y-6">
      
      {/* Enhanced Add Button Example */}
      <div className="flex justify-between items-center">
        <h3 className="text-white font-medium">
          Workout Structure ({workoutEntries.length} groups)
        </h3>
        <Button
          onClick={() => setShowEnhancedConfig(true)}
          variant="primary"
          size="default"
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Enhanced Group
        </Button>
      </div>

      {/* Workout Entries Display */}
      <div className="space-y-4">
        {workoutEntries.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <div className="text-4xl mb-4">💪</div>
            <div className="text-lg mb-2">No exercise groups yet</div>
            <div className="text-sm">Create your first enhanced exercise group</div>
          </div>
        ) : (
          workoutEntries.map((entry, index) => (
            <div key={entry.id} className="bg-neu-surface p-4 rounded-lg border border-neu-light/10">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-white font-medium mb-1">
                    {entry.label || `${entry.type} ${index + 1}`}
                  </h4>
                  <p className="text-sm text-gray-400">
                    {entry.exercises.length} exercise{entry.exercises.length !== 1 ? 's' : ''} • {entry.sets} sets
                    {entry.timingStyle && ` • ${entry.timingStyle}`}
                  </p>
                </div>
                <Button
                  onClick={() => {
                    setEditingEntry?.(entry)
                    setShowEnhancedConfig(true)
                  }}
                  variant="outline"
                  size="sm"
                >
                  Edit Enhanced
                </Button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Enhanced Group Configuration Modal */}
      {showEnhancedConfig && (
        <ProgressiveGroupConfigurationModal
          exercises={availableExercises}
          existingGroup={enhancedEditingEntry}
          onSave={handleSaveEnhancedGroup}
          onCancel={handleCancelEnhancedConfig}
          weightUnit="kg"
          title={editingEntry ? 'Edit Exercise Group' : 'Create Exercise Group'}
        />
      )}

      {/* Integration Status Display */}
      <div className="mt-8 p-4 bg-neu-card rounded-lg">
        <h4 className="text-white font-medium mb-3">Integration Status</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h5 className="text-norse-gold font-medium mb-2">✅ Enhanced Features</h5>
            <ul className="text-gray-400 space-y-1">
              <li>• Progressive disclosure UX</li>
              <li>• Real-time configuration preview</li>
              <li>• Technical filtering with explanations</li>
              <li>• Dual-path EMOM ascending logic</li>
              <li>• Mobile-optimized touch interface</li>
            </ul>
          </div>
          <div>
            <h5 className="text-norse-gold font-medium mb-2">🔄 Backwards Compatibility</h5>
            <ul className="text-gray-400 space-y-1">
              <li>• Existing workout data preserved</li>
              <li>• Standard WorkoutEntry format maintained</li>
              <li>• No breaking changes to storage</li>
              <li>• Seamless editing of existing groups</li>
              <li>• Enhanced features gracefully downgrade</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

// ================================================================================================
// USAGE EXAMPLE FOR EXISTING WORKOUTFORMMODAL
// ================================================================================================

/**
 * Example of how to integrate with existing WorkoutFormModal.tsx:
 * 
 * 1. Replace AddGroupModal import:
 *    import EnhancedWorkoutFormIntegration from './enhanced/EnhancedWorkoutFormIntegration'
 * 
 * 2. Add enhanced modal state to WorkoutFormModal:
 *    const [showEnhancedConfig, setShowEnhancedConfig] = useState(false)
 * 
 * 3. Replace the Add Group Modal section with:
 *    <EnhancedWorkoutFormIntegration
 *      workoutEntries={workoutForm.entries}
 *      onUpdateEntries={(entries) => setWorkoutForm(prev => ({ ...prev, entries }))}
 *      availableExercises={exercises}
 *      showEnhancedConfig={showEnhancedConfig}
 *      setShowEnhancedConfig={setShowEnhancedConfig}
 *      editingEntry={editingEntry}
 *      setEditingEntry={setEditingEntry}
 *    />
 * 
 * 4. Update the "Add Exercises" button to use enhanced config:
 *    <Button onClick={() => setShowEnhancedConfig(true)}>
 *      Add Enhanced Group
 *    </Button>
 * 
 * This provides a complete integration that:
 * - Maintains all existing functionality
 * - Adds progressive disclosure UX
 * - Preserves backwards compatibility
 * - Enhances the configuration experience
 * - Requires minimal changes to existing code
 */