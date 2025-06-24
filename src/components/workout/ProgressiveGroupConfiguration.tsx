'use client'

import React, { useState, useCallback, useEffect, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/ui/card'
import { Button } from '@/ui/button'
import { Exercise } from '@/types'
import {
  EnhancedWorkoutEntry,
  EnhancedExerciseGroupType,
  ExecutionStyle,
  RepSchemeType,
  ExecutionStyleConfig,
  RepScheme
} from '@/types/exercise-groups'

// Import Phase 2B components
import GroupTypeSelector from './GroupTypeSelector'
import ExecutionStyleSelector from './ExecutionStyleSelector'
import RepSchemeSelector from './RepSchemeSelector'
import WeightProgressionConfig from './WeightProgressionConfig'

// Import validation utilities
import {
  validateGroupSize,
  validateExecutionStyleCompatibility,
  validateRepSchemePattern
} from '@/validation/exercise-group-validation'

// ================================================================================================
// COMPONENT PROPS
// ================================================================================================

export interface ProgressiveGroupConfigurationProps {
  exercises: Exercise[]
  existingGroup?: Partial<EnhancedWorkoutEntry>
  onSave: (group: EnhancedWorkoutEntry) => void
  onCancel: () => void
  weightUnit?: 'kg' | 'lbs'
  compact?: boolean
  title?: string
}

// ================================================================================================
// CONFIGURATION STATE
// ================================================================================================

interface ConfigurationState {
  // Basic group info
  groupType: EnhancedExerciseGroupType
  label: string
  
  // Execution configuration
  executionStyle: ExecutionStyle
  executionStyleConfig: ExecutionStyleConfig
  
  // Rep scheme configuration
  repScheme: RepSchemeType
  repSchemePattern?: string
  repSchemeConfig: RepScheme
  
  // Weight progression (for pyramid schemes)
  startWeight: number
  peakWeight: number
  enableWeightProgression: boolean
  
  // Basic settings
  sets: number
  restBetweenSets: number
  restAfterGroup: number
  groupRPE?: number
  notes: string
}

// ================================================================================================
// SECTION COMPONENT
// ================================================================================================

interface ConfigurationSectionProps {
  title: string
  description: string
  isComplete: boolean
  isActive: boolean
  children: React.ReactNode
  onTitleClick?: () => void
}

function ConfigurationSection({ 
  title, 
  description, 
  isComplete, 
  isActive, 
  children, 
  onTitleClick 
}: ConfigurationSectionProps) {
  return (
    <Card 
      className={`transition-all duration-300 ${
        isActive ? 'shadow-neu-elevated border-neu-gold-light' : 'shadow-neu'
      }`}
      style={{
        background: isActive ? 'var(--surface-neu-light-subtle)' : 'var(--surface-neu)',
        borderColor: isActive ? 'var(--border-neu-gold-light)' : 'var(--border-neu-subtle)'
      }}
    >
      <CardHeader 
        className={`cursor-pointer transition-colors ${onTitleClick ? 'hover:bg-neu-light/5' : ''}`}
        onClick={onTitleClick}
        style={{ padding: 'var(--spacing-4) var(--spacing-6)' }}
      >
        <div className="flex items-center justify-between">
          <div>
            <CardTitle 
              className="flex items-center gap-2"
              style={{
                fontSize: 'var(--font-size-lg)',
                fontWeight: 'var(--font-weight-semibold)',
                color: 'var(--text-primary)',
                marginBottom: 'var(--spacing-1)'
              }}
            >
              {title}
              {isComplete && (
                <span 
                  className="w-5 h-5 rounded-full flex items-center justify-center text-xs"
                  style={{
                    background: 'var(--surface-success)',
                    color: 'var(--text-success)'
                  }}
                >
                  ✓
                </span>
              )}
            </CardTitle>
            <p 
              style={{
                fontSize: 'var(--font-size-sm)',
                color: 'var(--text-secondary)',
                margin: 0
              }}
            >
              {description}
            </p>
          </div>
        </div>
      </CardHeader>
      
      {isActive && (
        <CardContent style={{ padding: '0 var(--spacing-6) var(--spacing-6)' }}>
          {children}
        </CardContent>
      )}
    </Card>
  )
}

// ================================================================================================
// CONFIGURATION PREVIEW COMPONENT  
// ================================================================================================

interface ConfigurationPreviewProps {
  config: ConfigurationState
  exercises: Exercise[]
}

function ConfigurationPreview({ config, exercises }: ConfigurationPreviewProps) {
  const getRepPatternPreview = () => {
    if (config.repScheme === 'standard') return null
    
    if (config.repScheme === 'descending' && config.repSchemePattern === '21-3') {
      return '21, 18, 15, 12, 9, 6, 3'
    }
    if (config.repScheme === 'descending' && config.repSchemePattern === '10-1') {
      return '10, 9, 8, 7, 6, 5, 4, 3, 2, 1'
    }
    if (config.repScheme === 'pyramid' && config.repSchemePattern === '10-1-10') {
      return '10, 8, 6, 4, 2, 1, 2, 4, 6, 8, 10'
    }
    if (config.repScheme === 'ascending') {
      return '1, 2, 3, 4, 5, 6, 7, 8, 9, 10...'
    }
    
    return null
  }

  const patternPreview = getRepPatternPreview()
  
  return (
    <div 
      className="depth-sunken surface-concave"
      style={{
        border: '1px solid var(--border-neu-subtle)',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--spacing-4)',
        marginTop: 'var(--spacing-6)'
      }}
    >
      <h4 
        style={{
          fontSize: 'var(--font-size-md)',
          fontWeight: 'var(--font-weight-medium)',
          color: 'var(--text-primary)',
          marginBottom: 'var(--spacing-3)'
        }}
      >
        Configuration Preview
      </h4>
      
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span 
            style={{
              fontSize: 'var(--font-size-sm)',
              color: 'var(--text-secondary)'
            }}
          >
            Group Type:
          </span>
          <span 
            className="px-2 py-1 rounded"
            style={{
              fontSize: 'var(--font-size-sm)',
              background: 'var(--surface-neu-light)',
              color: 'var(--text-primary)',
              fontWeight: 'var(--font-weight-medium)'
            }}
          >
            {config.groupType}
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <span 
            style={{
              fontSize: 'var(--font-size-sm)',
              color: 'var(--text-secondary)'
            }}
          >
            Execution:
          </span>
          <span 
            className="px-2 py-1 rounded"
            style={{
              fontSize: 'var(--font-size-sm)',
              background: 'var(--surface-neu-light)',
              color: 'var(--text-primary)',
              fontWeight: 'var(--font-weight-medium)'
            }}
          >
            {config.executionStyle}
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <span 
            style={{
              fontSize: 'var(--font-size-sm)',
              color: 'var(--text-secondary)'
            }}
          >
            Rep Scheme:
          </span>
          <span 
            className="px-2 py-1 rounded"
            style={{
              fontSize: 'var(--font-size-sm)',
              background: 'var(--surface-neu-light)',
              color: 'var(--text-primary)',
              fontWeight: 'var(--font-weight-medium)'
            }}
          >
            {config.repScheme}
          </span>
        </div>
        
        {patternPreview && (
          <div 
            className="mt-2 p-2 rounded"
            style={{
              background: 'var(--surface-neu-dark)',
              border: '1px solid var(--border-neu-subtle)'
            }}
          >
            <div 
              style={{
                fontSize: 'var(--font-size-xs)',
                color: 'var(--text-secondary)',
                marginBottom: 'var(--spacing-1)'
              }}
            >
              Pattern Preview:
            </div>
            <div 
              style={{
                fontSize: 'var(--font-size-sm)',
                fontFamily: 'var(--font-mono)',
                color: 'var(--text-primary)'
              }}
            >
              {patternPreview}
            </div>
          </div>
        )}
        
        <div className="flex items-center gap-2">
          <span 
            style={{
              fontSize: 'var(--font-size-sm)',
              color: 'var(--text-secondary)'
            }}
          >
            Sets:
          </span>
          <span 
            style={{
              fontSize: 'var(--font-size-sm)',
              color: 'var(--text-primary)',
              fontWeight: 'var(--font-weight-medium)'
            }}
          >
            {config.sets}
          </span>
        </div>
      </div>
    </div>
  )
}

// ================================================================================================
// MAIN COMPONENT
// ================================================================================================

export default function ProgressiveGroupConfiguration({
  exercises,
  existingGroup,
  onSave,
  onCancel,
  weightUnit = 'kg',
  compact = false,
  title = 'Configure Exercise Group'
}: ProgressiveGroupConfigurationProps) {
  
  // ================================================================================================
  // STATE MANAGEMENT
  // ================================================================================================
  
  const [config, setConfig] = useState<ConfigurationState>({
    groupType: existingGroup?.type || 'single',
    label: existingGroup?.label || '',
    executionStyle: existingGroup?.executionStyle?.style || 'standard',
    executionStyleConfig: existingGroup?.executionStyle || { style: 'standard' },
    repScheme: existingGroup?.repScheme?.type || 'standard',
    repSchemePattern: existingGroup?.repScheme?.pattern,
    repSchemeConfig: existingGroup?.repScheme || { type: 'standard', autoGenerate: false },
    startWeight: 20,
    peakWeight: 40,
    enableWeightProgression: false,
    sets: existingGroup?.sets || 3,
    restBetweenSets: existingGroup?.restBetweenSets || 90,
    restAfterGroup: existingGroup?.restAfterGroup || 0,
    groupRPE: existingGroup?.groupRPE,
    notes: existingGroup?.notes || ''
  })

  const [activeSection, setActiveSection] = useState('groupType')
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})

  // ================================================================================================
  // DERIVED STATE
  // ================================================================================================

  // Determine which sections should be visible based on current configuration
  const sectionVisibility = {
    groupType: true, // Always visible
    executionStyle: !!config.groupType, // Visible when group type is selected
    repScheme: !!config.groupType && !!config.executionStyle, // Visible when execution style is selected
    weights: config.repScheme === 'pyramid', // Only visible for pyramid schemes
    preview: !!config.groupType // Visible when any configuration exists
  }

  // Determine completion status for each section
  const sectionCompletion = {
    groupType: !!config.groupType,
    executionStyle: !!config.executionStyle,
    repScheme: !!config.repScheme,
    weights: config.repScheme !== 'pyramid' || config.enableWeightProgression,
    preview: !!config.groupType && !!config.executionStyle && !!config.repScheme
  }

  // ================================================================================================
  // EVENT HANDLERS
  // ================================================================================================

  const handleGroupTypeChange = useCallback((groupType: EnhancedExerciseGroupType) => {
    setConfig(prev => ({ ...prev, groupType }))
    
    // Auto-scroll to next section when selection is made
    if (!config.executionStyle) {
      setTimeout(() => {
        setActiveSection('executionStyle')
        sectionRefs.current.executionStyle?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        })
      }, 300)
    }
  }, [config.executionStyle])

  const handleExecutionStyleChange = useCallback((style: ExecutionStyle, styleConfig?: ExecutionStyleConfig) => {
    setConfig(prev => ({ 
      ...prev, 
      executionStyle: style,
      executionStyleConfig: styleConfig || { style }
    }))

    // Handle dual-path EMOM ascending logic
    if (style === 'EMOM' && config.repScheme === 'standard') {
      setConfig(prev => ({ 
        ...prev, 
        repScheme: 'ascending',
        repSchemePattern: '1-rep'
      }))
    }

    // Auto-scroll to next section when selection is made
    if (!config.repScheme || style === 'EMOM') {
      setTimeout(() => {
        setActiveSection('repScheme')
        sectionRefs.current.repScheme?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        })
      }, 300)
    }
  }, [config.repScheme])

  const handleRepSchemeChange = useCallback((scheme: RepSchemeType, pattern?: string) => {
    setConfig(prev => ({ 
      ...prev, 
      repScheme: scheme,
      repSchemePattern: pattern
    }))

    // Handle dual-path EMOM ascending logic
    if (scheme === 'ascending' && config.executionStyle !== 'EMOM') {
      setConfig(prev => ({ 
        ...prev, 
        executionStyle: 'EMOM',
        executionStyleConfig: { style: 'EMOM', intervalMinutes: 1, durationMinutes: 10 }
      }))
    }

    // Auto-scroll to weights section if pyramid is selected
    if (scheme === 'pyramid') {
      setTimeout(() => {
        setActiveSection('weights')
        sectionRefs.current.weights?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        })
      }, 300)
    }
  }, [config.executionStyle])

  const handleWeightProgressionChange = useCallback((startWeight: number, peakWeight: number) => {
    setConfig(prev => ({ 
      ...prev, 
      startWeight, 
      peakWeight,
      enableWeightProgression: true 
    }))
  }, [])

  // ================================================================================================
  // TECHNICAL FILTERING LOGIC
  // ================================================================================================

  const getCompatibleRepSchemes = (executionStyle: ExecutionStyle): RepSchemeType[] => {
    switch (executionStyle) {
      case 'HIIT':
      case 'AMRAP':
        return ['standard'] // Timed intervals conflict with pattern-based rep schemes
      case 'EMOM':
        return ['standard', 'ascending'] // EMOM works with ascending patterns
      case 'standard':
      default:
        return ['standard', 'descending', 'pyramid', 'ascending'] // All schemes available
    }
  }

  const getFilteringExplanation = (executionStyle: ExecutionStyle): string | null => {
    switch (executionStyle) {
      case 'HIIT':
        return 'HIIT uses timed intervals - standard rep scheme works best'
      case 'AMRAP':
        return 'AMRAP focuses on maximum rounds - standard rep scheme recommended'
      case 'EMOM':
        return 'EMOM works well with standard sets or ascending patterns'
      default:
        return null
    }
  }

  // ================================================================================================
  // SAVE HANDLER
  // ================================================================================================

  const handleSave = useCallback(() => {
    // Validate configuration before saving
    const isValid = sectionCompletion.groupType && 
                   sectionCompletion.executionStyle && 
                   sectionCompletion.repScheme &&
                   sectionCompletion.weights

    if (!isValid) {
      return // Should not reach here with proper UI state management
    }

    // Create enhanced workout entry
    const enhancedEntry: EnhancedWorkoutEntry = {
      id: existingGroup?.id || `entry_${Date.now()}`,
      type: config.groupType,
      label: config.label || undefined,
      exercises: existingGroup?.exercises || [], // This will be populated by exercise selection
      sets: config.sets,
      restBetweenSets: config.restBetweenSets,
      restAfterGroup: config.restAfterGroup,
      groupRPE: config.groupRPE,
      notes: config.notes,
      executionStyle: config.executionStyleConfig,
      repScheme: {
        type: config.repScheme,
        pattern: config.repSchemePattern,
        ...config.repSchemeConfig
      },
      // Add weight progression if enabled
      ...(config.enableWeightProgression && {
        weightProgression: {
          startWeight: config.startWeight,
          peakWeight: config.peakWeight
        }
      })
    }

    onSave(enhancedEntry)
  }, [config, existingGroup, sectionCompletion, onSave])

  // ================================================================================================
  // RENDER
  // ================================================================================================

  const compatibleRepSchemes = getCompatibleRepSchemes(config.executionStyle)
  const filteringExplanation = getFilteringExplanation(config.executionStyle)

  return (
    <div className="space-y-6" style={{ padding: 'var(--spacing-6)' }}>
      {/* Header */}
      <div className="text-center" style={{ marginBottom: 'var(--spacing-8)' }}>
        <h2 
          style={{
            fontSize: 'var(--font-size-xl)',
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--text-primary)',
            marginBottom: 'var(--spacing-2)'
          }}
        >
          {title}
        </h2>
        <p 
          style={{
            fontSize: 'var(--font-size-sm)',
            color: 'var(--text-secondary)'
          }}
        >
          Configure your exercise group step by step. Previous choices remain visible and editable.
        </p>
      </div>

      {/* Group Type Selection */}
      <div ref={el => sectionRefs.current.groupType = el}>
        <ConfigurationSection
          title="Group Type"
          description="Choose how exercises should be performed together"
          isComplete={sectionCompletion.groupType}
          isActive={activeSection === 'groupType' || !config.groupType}
          onTitleClick={() => setActiveSection('groupType')}
        >
          <GroupTypeSelector
            selectedType={config.groupType}
            onChange={handleGroupTypeChange}
            compact={compact}
          />
        </ConfigurationSection>
      </div>

      {/* Execution Style Selection */}
      {sectionVisibility.executionStyle && (
        <div ref={el => sectionRefs.current.executionStyle = el}>
          <ConfigurationSection
            title="Execution Style"
            description="Choose timing and structure for your sets"
            isComplete={sectionCompletion.executionStyle}
            isActive={activeSection === 'executionStyle' || !config.executionStyle}
            onTitleClick={() => setActiveSection('executionStyle')}
          >
            <ExecutionStyleSelector
              selectedStyle={config.executionStyle}
              onChange={handleExecutionStyleChange}
              onStyleConfigChange={(styleConfig) => 
                setConfig(prev => ({ ...prev, executionStyleConfig: styleConfig }))
              }
              compact={compact}
            />
          </ConfigurationSection>
        </div>
      )}

      {/* Rep Scheme Selection */}
      {sectionVisibility.repScheme && (
        <div ref={el => sectionRefs.current.repScheme = el}>
          <ConfigurationSection
            title="Rep Scheme"
            description="Choose how reps change across sets"
            isComplete={sectionCompletion.repScheme}
            isActive={activeSection === 'repScheme' || !config.repScheme}
            onTitleClick={() => setActiveSection('repScheme')}
          >
            <div className="space-y-4">
              {filteringExplanation && (
                <div 
                  className="p-3 rounded-lg"
                  style={{
                    background: 'var(--surface-info)',
                    border: '1px solid var(--border-info)'
                  }}
                >
                  <p 
                    style={{
                      fontSize: 'var(--font-size-sm)',
                      color: 'var(--text-info)',
                      margin: 0
                    }}
                  >
                    💡 {filteringExplanation}
                  </p>
                </div>
              )}
              
              <RepSchemeSelector
                selectedScheme={config.repScheme}
                selectedPattern={config.repSchemePattern}
                executionStyle={config.executionStyle}
                onChange={handleRepSchemeChange}
                onPatternChange={(pattern) => 
                  setConfig(prev => ({ ...prev, repSchemePattern: pattern }))
                }
                compact={compact}
              />
            </div>
          </ConfigurationSection>
        </div>
      )}

      {/* Weight Progression Configuration */}
      {sectionVisibility.weights && (
        <div ref={el => sectionRefs.current.weights = el}>
          <ConfigurationSection
            title="Weight Progression"
            description="Configure weight changes for pyramid sets"
            isComplete={sectionCompletion.weights}
            isActive={activeSection === 'weights'}
            onTitleClick={() => setActiveSection('weights')}
          >
            <WeightProgressionConfig
              repScheme={config.repScheme}
              startWeight={config.startWeight}
              peakWeight={config.peakWeight}
              weightUnit={weightUnit}
              onChange={handleWeightProgressionChange}
              compact={compact}
            />
          </ConfigurationSection>
        </div>
      )}

      {/* Configuration Preview */}
      {sectionVisibility.preview && (
        <ConfigurationPreview config={config} exercises={exercises} />
      )}

      {/* Action Buttons */}
      <div 
        className="flex gap-3 pt-4"
        style={{ borderTop: '1px solid var(--border-neu-subtle)' }}
      >
        <Button
          onClick={handleSave}
          disabled={!sectionCompletion.preview}
          variant="primary"
          size="default"
          className="flex-1 py-3"
        >
          Save Configuration
        </Button>
        <Button
          onClick={onCancel}
          variant="outline"
          size="default"
          className="flex-1 py-3"
        >
          Cancel
        </Button>
      </div>
    </div>
  )
}