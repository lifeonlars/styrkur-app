'use client'

import React, { useState } from 'react'
import { Plus, Edit, Trash2, ChevronUp, ChevronDown } from 'lucide-react'
import { Button } from '@/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/ui/card'
import { WorkoutEntry, Exercise } from '@/types'
import { WorkflowProvider, useWorkflow, WorkflowOrchestrator } from './WorkflowIntegration'
import ProgressiveGroupConfigurationModal from '../ProgressiveGroupConfigurationModal'
import GroupContextExerciseSelection from '../GroupContextExerciseSelection'
import { convertToEnhancedEntry } from './EntryConversion'

// ================================================================================================
// INTEGRATED WORKOUT FORM COMPONENT
// ================================================================================================

interface IntegratedWorkoutFormProps {
  availableExercises: Exercise[]
}

function IntegratedWorkoutFormContent({ availableExercises }: IntegratedWorkoutFormProps) {
  const [workoutEntries, setWorkoutEntries] = useState<WorkoutEntry[]>([])
  const { state, actions } = useWorkflow()

  // ================================================================================================
  // ENTRY MANAGEMENT
  // ================================================================================================

  const handleAddEntry = (entry: WorkoutEntry) => {
    setWorkoutEntries(prev => [...prev, entry])
  }

  const handleEditEntry = (updatedEntry: WorkoutEntry) => {
    setWorkoutEntries(prev => 
      prev.map(entry => entry.id === updatedEntry.id ? updatedEntry : entry)
    )
  }

  const handleDeleteEntry = (entryId: string) => {
    setWorkoutEntries(prev => prev.filter(entry => entry.id !== entryId))
  }

  const moveEntryUp = (index: number) => {
    if (index > 0) {
      setWorkoutEntries(prev => {
        const newEntries = [...prev]
        ;[newEntries[index - 1], newEntries[index]] = [newEntries[index], newEntries[index - 1]]
        return newEntries
      })
    }
  }

  const moveEntryDown = (index: number) => {
    if (index < workoutEntries.length - 1) {
      setWorkoutEntries(prev => {
        const newEntries = [...prev]
        ;[newEntries[index], newEntries[index + 1]] = [newEntries[index + 1], newEntries[index]]
        return newEntries
      })
    }
  }

  // ================================================================================================
  // WORKFLOW INTEGRATION
  // ================================================================================================

  const handleStartEdit = (entry: WorkoutEntry) => {
    actions.startEditGroup(entry)
  }

  const handleGroupConfigured = (enhancedEntry: any) => {
    actions.groupConfigured(enhancedEntry)
  }

  const handleExercisesSelected = (exercises: Exercise[]) => {
    actions.exercisesSelected(exercises)
  }

  // ================================================================================================
  // RENDER FUNCTIONS
  // ================================================================================================

  const renderWorkflowModals = () => {
    switch (state.currentStep) {
      case 'configuration':
        return (
          <ProgressiveGroupConfigurationModal
            exercises={availableExercises}
            existingGroup={state.editingEntry ? convertToEnhancedEntry(state.editingEntry) : undefined}
            onSave={handleGroupConfigured}
            onCancel={actions.cancelWorkflow}
            weightUnit="kg"
            title={state.isEditing ? 'Edit Exercise Group' : 'Create Exercise Group'}
          />
        )

      case 'exercise-selection':
        if (!state.configuredGroup) return null
        return (
          <GroupContextExerciseSelection
            groupContext={state.configuredGroup}
            availableExercises={availableExercises}
            onSelectExercises={handleExercisesSelected}
            onBack={actions.backToConfiguration}
            onCancel={actions.cancelWorkflow}
            preSelectedExercises={state.selectedExercises}
          />
        )

      default:
        return null
    }
  }

  const renderWorkoutEntry = (entry: WorkoutEntry, index: number) => (
    <Card key={entry.id} className="transition-all hover:shadow-neu-elevated">
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h4 className="text-white font-medium">
                {entry.label || `${entry.type.charAt(0).toUpperCase() + entry.type.slice(1)} ${index + 1}`}
              </h4>
              <span className="px-2 py-1 bg-neu-light/10 rounded text-xs text-gray-400">
                {entry.type}
              </span>
              {entry.timingStyle && (
                <span className="px-2 py-1 bg-norse-gold/20 rounded text-xs text-norse-gold">
                  {entry.timingStyle}
                </span>
              )}
            </div>
            <div className="text-sm text-gray-400 space-y-1">
              <div>{entry.exercises.length} exercise{entry.exercises.length !== 1 ? 's' : ''}</div>
              <div>{entry.sets} sets</div>
              {entry.restAfterGroup && <div>{entry.restAfterGroup}s rest after group</div>}
              {entry.groupRPE && <div>RPE {entry.groupRPE}</div>}
            </div>
          </div>
          
          <div className="flex items-center gap-1">
            {/* Move buttons */}
            <Button
              onClick={() => moveEntryUp(index)}
              disabled={index === 0}
              variant="ghost"
              size="icon"
              className="w-8 h-8 text-gray-400 hover:text-white disabled:opacity-30"
            >
              <ChevronUp className="w-4 h-4" />
            </Button>
            <Button
              onClick={() => moveEntryDown(index)}
              disabled={index === workoutEntries.length - 1}
              variant="ghost"
              size="icon"
              className="w-8 h-8 text-gray-400 hover:text-white disabled:opacity-30"
            >
              <ChevronDown className="w-4 h-4" />
            </Button>
            
            {/* Edit button */}
            <Button
              onClick={() => handleStartEdit(entry)}
              variant="ghost"
              size="icon"
              className="w-8 h-8 text-gray-400 hover:text-white"
            >
              <Edit className="w-4 h-4" />
            </Button>
            
            {/* Delete button */}
            <Button
              onClick={() => handleDeleteEntry(entry.id)}
              variant="ghost"
              size="icon"
              className="w-8 h-8 text-red-400 hover:text-red-300"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  // ================================================================================================
  // MAIN RENDER
  // ================================================================================================

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white mb-2">Enhanced Workout Configuration</h1>
        <p className="text-gray-400">
          Demonstration of the integrated progressive disclosure workflow for exercise group configuration.
        </p>
      </div>

      {/* Workout Entries Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>Workout Structure ({workoutEntries.length} groups)</span>
            <Button
              onClick={actions.startNewGroup}
              variant="primary"
              size="default"
              className="flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Exercise Group
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {workoutEntries.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <div className="text-4xl mb-4">💪</div>
              <div className="text-lg mb-2">No exercise groups yet</div>
              <div className="text-sm">
                Create your first exercise group with enhanced progressive disclosure
              </div>
              <Button
                onClick={actions.startNewGroup}
                variant="outline"
                size="default"
                className="mt-4"
              >
                Get Started
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {workoutEntries.map((entry, index) => renderWorkoutEntry(entry, index))}
              
              <Button
                onClick={actions.startNewGroup}
                variant="dashed"
                size="default"
                className="w-full py-4 flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Another Group
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Feature Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Enhanced Features Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h5 className="text-norse-gold font-medium mb-3">✨ Progressive Disclosure UX</h5>
              <ul className="text-sm text-gray-400 space-y-2">
                <li>• Previous choices always visible and editable</li>
                <li>• Real-time configuration preview</li>
                <li>• Clear cause-and-effect relationships</li>
                <li>• Single screen experience</li>
                <li>• Mobile-optimized interactions</li>
              </ul>
            </div>
            <div>
              <h5 className="text-norse-gold font-medium mb-3">🎯 Smart Configuration</h5>
              <ul className="text-sm text-gray-400 space-y-2">
                <li>• Technical filtering with explanations</li>
                <li>• Dual-path EMOM ascending logic</li>
                <li>• Automatic weight progression for pyramids</li>
                <li>• Rep pattern previews</li>
                <li>• Context-aware exercise selection</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Workflow Status (Development Only) */}
      {process.env.NODE_ENV === 'development' && (
        <Card>
          <CardHeader>
            <CardTitle>Workflow Status (Dev Only)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <div className="text-gray-400">Current Step</div>
                <div className="text-white font-medium">{state.currentStep}</div>
              </div>
              <div>
                <div className="text-gray-400">Is Editing</div>
                <div className="text-white font-medium">{state.isEditing ? 'Yes' : 'No'}</div>
              </div>
              <div>
                <div className="text-gray-400">Configured Group</div>
                <div className="text-white font-medium">
                  {state.configuredGroup ? state.configuredGroup.type : 'None'}
                </div>
              </div>
              <div>
                <div className="text-gray-400">Selected Exercises</div>
                <div className="text-white font-medium">{state.selectedExercises.length}</div>
              </div>
            </div>
            {state.error && (
              <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded text-red-400 text-sm">
                Error: {state.error}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Render Workflow Modals */}
      {renderWorkflowModals()}
    </div>
  )
}

// ================================================================================================
// MAIN INTEGRATION DEMO COMPONENT
// ================================================================================================

export default function IntegrationDemo({ availableExercises }: IntegratedWorkoutFormProps) {
  const [workoutEntries, setWorkoutEntries] = useState<WorkoutEntry[]>([])

  const handleAddEntry = (entry: WorkoutEntry) => {
    setWorkoutEntries(prev => [...prev, entry])
  }

  const handleEditEntry = (updatedEntry: WorkoutEntry) => {
    setWorkoutEntries(prev => 
      prev.map(entry => entry.id === updatedEntry.id ? updatedEntry : entry)
    )
  }

  return (
    <WorkflowProvider onAddEntry={handleAddEntry} onEditEntry={handleEditEntry}>
      <IntegratedWorkoutFormContent availableExercises={availableExercises} />
    </WorkflowProvider>
  )
}

// ================================================================================================
// USAGE INSTRUCTIONS
// ================================================================================================

/**
 * Integration Instructions for Existing WorkoutFormModal:
 * 
 * 1. Wrap your component with WorkflowProvider:
 *    <WorkflowProvider onAddEntry={handleAddEntry} onEditEntry={handleEditEntry}>
 *      <YourWorkoutForm />
 *    </WorkflowProvider>
 * 
 * 2. Use the useWorkflow hook in your component:
 *    const { state, actions } = useWorkflow()
 * 
 * 3. Replace "Add Group" button with:
 *    <Button onClick={actions.startNewGroup}>Add Exercise Group</Button>
 * 
 * 4. Replace edit handlers with:
 *    <Button onClick={() => actions.startEditGroup(entry)}>Edit</Button>
 * 
 * 5. Add workflow modal rendering:
 *    {state.currentStep === 'configuration' && <ProgressiveGroupConfigurationModal ... />}
 *    {state.currentStep === 'exercise-selection' && <GroupContextExerciseSelection ... />}
 * 
 * 6. Handle workflow events:
 *    onSave={actions.groupConfigured}
 *    onSelectExercises={actions.exercisesSelected}
 *    onCancel={actions.cancelWorkflow}
 *    onBack={actions.backToConfiguration}
 * 
 * This provides:
 * ✅ Complete progressive disclosure UX
 * ✅ Seamless integration with existing code
 * ✅ Proper state management throughout workflow
 * ✅ Error handling and validation
 * ✅ Mobile-optimized experience
 * ✅ Backwards compatibility with existing workout data
 */