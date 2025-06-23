'use client'

import React, { useState } from 'react'
import { Copy, Plus, Check, X } from 'lucide-react'
import { Button } from '@/ui/button'
import { Input } from '@/ui/input'
import { Card, CardContent } from '@/ui/card'
import { EnhancedWorkoutEntry } from '@/types/exercise-groups'

// ================================================================================================
// COMPONENT PROPS
// ================================================================================================

export interface DuplicateGroupActionProps {
  group: EnhancedWorkoutEntry
  onDuplicate: (duplicatedGroup: EnhancedWorkoutEntry, newLabel?: string) => void
  disabled?: boolean
  compact?: boolean
  showInlineEdit?: boolean
}

// ================================================================================================
// MAIN COMPONENT
// ================================================================================================

export default function DuplicateGroupAction({
  group,
  onDuplicate,
  disabled = false,
  compact = false,
  showInlineEdit = true
}: DuplicateGroupActionProps) {
  
  const [showLabelEdit, setShowLabelEdit] = useState(false)
  const [customLabel, setCustomLabel] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)

  // ================================================================================================
  // EVENT HANDLERS
  // ================================================================================================

  const handleQuickDuplicate = async () => {
    if (disabled || isProcessing) return
    
    setIsProcessing(true)
    
    try {
      const duplicatedGroup: EnhancedWorkoutEntry = {
        ...group,
        id: `${group.id}-copy-${Date.now()}`,
        label: `${group.label} (Copy)`,
        exercises: group.exercises.map(ex => ({ ...ex }))
      }
      
      await onDuplicate(duplicatedGroup)
    } finally {
      setIsProcessing(false)
    }
  }

  const handleCustomDuplicate = async () => {
    if (disabled || isProcessing || !customLabel.trim()) return
    
    setIsProcessing(true)
    
    try {
      const duplicatedGroup: EnhancedWorkoutEntry = {
        ...group,
        id: `${group.id}-copy-${Date.now()}`,
        label: customLabel.trim(),
        exercises: group.exercises.map(ex => ({ ...ex }))
      }
      
      await onDuplicate(duplicatedGroup, customLabel.trim())
      setCustomLabel('')
      setShowLabelEdit(false)
    } finally {
      setIsProcessing(false)
    }
  }

  const handleStartLabelEdit = () => {
    setCustomLabel(group.label)
    setShowLabelEdit(true)
  }

  const handleCancelLabelEdit = () => {
    setCustomLabel('')
    setShowLabelEdit(false)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCustomDuplicate()
    } else if (e.key === 'Escape') {
      handleCancelLabelEdit()
    }
  }

  // ================================================================================================
  // RENDER
  // ================================================================================================

  if (compact) {
    return (
      <div className="flex items-center gap-1">
        <Button
          variant="flat"
          size="icon"
          onClick={handleQuickDuplicate}
          disabled={disabled || isProcessing}
          className="h-6 w-6 p-0"
          title="Duplicate group"
        >
          {isProcessing ? (
            <div className="w-3 h-3 border border-primary border-t-transparent rounded-full animate-spin" />
          ) : (
            <Copy className="w-3 h-3" />
          )}
        </Button>
        
        {showInlineEdit && (
          <Button
            variant="flat"
            size="icon"
            onClick={handleStartLabelEdit}
            disabled={disabled || isProcessing}
            className="h-6 w-6 p-0"
            title="Duplicate with custom label"
          >
            <Plus className="w-3 h-3" />
          </Button>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {/* Quick duplicate button */}
      <Button
        variant="outline"
        onClick={handleQuickDuplicate}
        disabled={disabled || isProcessing}
        className="w-full justify-start gap-2 h-9"
      >
        {isProcessing ? (
          <div className="w-4 h-4 border border-primary border-t-transparent rounded-full animate-spin" />
        ) : (
          <Copy className="w-4 h-4" />
        )}
        Duplicate Group
      </Button>

      {/* Custom label input */}
      {showInlineEdit && !showLabelEdit && (
        <Button
          variant="flat"
          onClick={handleStartLabelEdit}
          disabled={disabled || isProcessing}
          className="w-full justify-start gap-2 h-8 text-sm"
        >
          <Plus className="w-3 h-3" />
          Duplicate with Custom Label
        </Button>
      )}

      {/* Label editing interface */}
      {showLabelEdit && (
        <Card surface="flat" depth="subtle" className="p-3">
          <CardContent className="p-0 space-y-3">
            <div className="text-sm font-medium text-white">
              Duplicate with Custom Label
            </div>
            
            <div className="space-y-2">
              <Input
                value={customLabel}
                onChange={(e) => setCustomLabel(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Enter new group label"
                className="text-sm"
                autoFocus
              />
              
              <div className="flex justify-end gap-2">
                <Button
                  variant="flat"
                  size="icon"
                  onClick={handleCancelLabelEdit}
                  className="h-7 w-7 p-0"
                  title="Cancel"
                >
                  <X className="w-3 h-3" />
                </Button>
                
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleCustomDuplicate}
                  disabled={!customLabel.trim() || isProcessing}
                  className="h-7 w-7 p-0"
                  title="Duplicate"
                >
                  {isProcessing ? (
                    <div className="w-3 h-3 border border-primary border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Check className="w-3 h-3" />
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Preview info */}
      <div className="text-xs text-gray-500">
        💡 Duplicating preserves all configuration: {group.type} group with {group.exercises.length} exercise{group.exercises.length !== 1 ? 's' : ''}, {group.executionStyle?.style || 'standard'} execution, {group.repScheme?.type || 'standard'} rep scheme
      </div>
    </div>
  )
}