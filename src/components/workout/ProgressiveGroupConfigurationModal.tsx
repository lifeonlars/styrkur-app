'use client'

import React from 'react'
import { X } from 'lucide-react'
import { Button } from '@/ui/button'
import { Exercise } from '@/types'
import { EnhancedWorkoutEntry } from '@/types/exercise-groups'
import ProgressiveGroupConfiguration, { ProgressiveGroupConfigurationProps } from './ProgressiveGroupConfiguration'

// ================================================================================================
// MODAL WRAPPER COMPONENT
// ================================================================================================

interface ProgressiveGroupConfigurationModalProps extends Omit<ProgressiveGroupConfigurationProps, 'onCancel'> {
  onCancel: () => void
}

export default function ProgressiveGroupConfigurationModal({
  exercises,
  existingGroup,
  onSave,
  onCancel,
  weightUnit = 'kg',
  compact = false,
  title = 'Configure Exercise Group'
}: ProgressiveGroupConfigurationModalProps) {

  return (
    <div className="fixed inset-0 bg-neu-darkest/90 backdrop-blur-sm flex items-center justify-center z-[100] md:p-4">
      <div className="bg-neu-modal-bg shadow-neu-raised-xl w-full max-w-4xl md:rounded-2xl h-full md:h-auto md:max-h-[90vh] overflow-hidden flex flex-col border border-neu-light/20">
        
        {/* Header */}
        <div className="p-6 border-b border-neu-light/20 flex justify-between items-center">
          <h2 className="text-white text-xl font-medium">
            {title}
          </h2>
          <Button 
            onClick={onCancel} 
            variant="flat" 
            size="icon" 
            className="text-gray-400 hover:text-white"
          >
            <X className="w-6 h-6" />
          </Button>
        </div>

        {/* Progressive Disclosure Content */}
        <div className="flex-1 overflow-y-auto">
          <ProgressiveGroupConfiguration
            exercises={exercises}
            existingGroup={existingGroup}
            onSave={onSave}
            onCancel={onCancel}
            weightUnit={weightUnit}
            compact={compact}
            title="" // Empty title since modal header handles it
          />
        </div>
      </div>
    </div>
  )
}