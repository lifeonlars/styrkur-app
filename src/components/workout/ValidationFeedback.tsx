'use client'

import React from 'react'
import { 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  Info, 
  Lightbulb,
  ArrowRight,
  AlertCircle
} from 'lucide-react'
import { Button } from '@/ui/button'

// ================================================================================================
// COMPONENT PROPS
// ================================================================================================

export interface ValidationMessage {
  id: string
  type: 'error' | 'warning' | 'info' | 'success'
  title: string
  message: string
  suggestion?: string
  action?: {
    label: string
    onClick: () => void
  }
  dismissible?: boolean
}

export interface ValidationFeedbackProps {
  messages: ValidationMessage[]
  onDismiss?: (messageId: string) => void
  compact?: boolean
  maxVisible?: number
  showIcons?: boolean
  className?: string
}

// ================================================================================================
// MESSAGE ITEM COMPONENT
// ================================================================================================

interface MessageItemProps {
  message: ValidationMessage
  onDismiss?: (messageId: string) => void
  compact?: boolean
  showIcon?: boolean
}

function MessageItem({ message, onDismiss, compact = false, showIcon = true }: MessageItemProps) {
  const getIconAndColors = () => {
    switch (message.type) {
      case 'error':
        return {
          icon: XCircle,
          bgColor: 'bg-red-500/10',
          borderColor: 'border-red-500/20',
          textColor: 'text-red-400',
          titleColor: 'text-red-300'
        }
      case 'warning':
        return {
          icon: AlertTriangle,
          bgColor: 'bg-yellow-500/10',
          borderColor: 'border-yellow-500/20',
          textColor: 'text-yellow-400',
          titleColor: 'text-yellow-300'
        }
      case 'info':
        return {
          icon: Info,
          bgColor: 'bg-blue-500/10',
          borderColor: 'border-blue-500/20',
          textColor: 'text-blue-400',
          titleColor: 'text-blue-300'
        }
      case 'success':
        return {
          icon: CheckCircle,
          bgColor: 'bg-green-500/10',
          borderColor: 'border-green-500/20',
          textColor: 'text-green-400',
          titleColor: 'text-green-300'
        }
      default:
        return {
          icon: AlertCircle,
          bgColor: 'bg-gray-500/10',
          borderColor: 'border-gray-500/20',
          textColor: 'text-gray-400',
          titleColor: 'text-gray-300'
        }
    }
  }

  const { icon: IconComponent, bgColor, borderColor, textColor, titleColor } = getIconAndColors()

  return (
    <div className={`${bgColor} ${borderColor} border rounded-lg p-3 transition-all duration-200`}>
      <div className="flex items-start gap-3">
        {showIcon && (
          <div className={`${textColor} mt-0.5`}>
            <IconComponent className="w-4 h-4" />
          </div>
        )}
        
        <div className="flex-1 min-w-0">
          <div className={`font-medium ${titleColor} ${compact ? 'text-sm' : 'text-sm'}`}>
            {message.title}
          </div>
          
          <div className={`${textColor} mt-1 ${compact ? 'text-xs' : 'text-sm'}`}>
            {message.message}
          </div>
          
          {message.suggestion && (
            <div className={`${textColor} mt-2 ${compact ? 'text-xs' : 'text-sm'} flex items-start gap-2`}>
              <Lightbulb className="w-3 h-3 mt-0.5 flex-shrink-0" />
              <span>{message.suggestion}</span>
            </div>
          )}
          
          {message.action && (
            <div className="mt-3">
              <Button
                variant="outline"
                size="default"
                onClick={message.action.onClick}
                className={`h-7 px-3 text-xs ${textColor} border-current hover:bg-current hover:bg-opacity-10`}
              >
                {message.action.label}
                <ArrowRight className="w-3 h-3 ml-1" />
              </Button>
            </div>
          )}
        </div>
        
        {message.dismissible && onDismiss && (
          <Button
            variant="flat"
            size="icon"
            onClick={() => onDismiss(message.id)}
            className="h-6 w-6 p-0 opacity-50 hover:opacity-100"
          >
            <XCircle className="w-3 h-3" />
          </Button>
        )}
      </div>
    </div>
  )
}

// ================================================================================================
// VALIDATION SUMMARY COMPONENT
// ================================================================================================

interface ValidationSummaryProps {
  messages: ValidationMessage[]
  compact?: boolean
}

function ValidationSummary({ messages, compact = false }: ValidationSummaryProps) {
  const counts = messages.reduce((acc, msg) => {
    acc[msg.type] = (acc[msg.type] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const hasErrors = counts.error > 0
  const hasWarnings = counts.warning > 0
  const hasInfo = counts.info > 0
  const hasSuccess = counts.success > 0

  if (messages.length === 0) return null

  return (
    <div className={`bg-neu-light/5 border border-neu-light/10 rounded-lg p-3 ${compact ? 'text-xs' : 'text-sm'}`}>
      <div className="flex items-center justify-between">
        <div className="font-medium text-white">Validation Summary</div>
        <div className="flex items-center gap-3">
          {hasErrors && (
            <div className="flex items-center gap-1 text-red-400">
              <XCircle className="w-3 h-3" />
              <span>{counts.error}</span>
            </div>
          )}
          {hasWarnings && (
            <div className="flex items-center gap-1 text-yellow-400">
              <AlertTriangle className="w-3 h-3" />
              <span>{counts.warning}</span>
            </div>
          )}
          {hasInfo && (
            <div className="flex items-center gap-1 text-blue-400">
              <Info className="w-3 h-3" />
              <span>{counts.info}</span>
            </div>
          )}
          {hasSuccess && (
            <div className="flex items-center gap-1 text-green-400">
              <CheckCircle className="w-3 h-3" />
              <span>{counts.success}</span>
            </div>
          )}
        </div>
      </div>
      
      {hasErrors && (
        <div className="text-red-400 mt-2">
          Configuration has errors that must be resolved before proceeding.
        </div>
      )}
    </div>
  )
}

// ================================================================================================
// MAIN COMPONENT
// ================================================================================================

export default function ValidationFeedback({
  messages,
  onDismiss,
  compact = false,
  maxVisible,
  showIcons = true,
  className = ''
}: ValidationFeedbackProps) {
  
  // ================================================================================================
  // DERIVED STATE
  // ================================================================================================

  const sortedMessages = [...messages].sort((a, b) => {
    const order = { error: 0, warning: 1, info: 2, success: 3 }
    return order[a.type] - order[b.type]
  })

  const visibleMessages = maxVisible 
    ? sortedMessages.slice(0, maxVisible)
    : sortedMessages

  const hiddenCount = sortedMessages.length - visibleMessages.length

  const hasErrors = messages.some(msg => msg.type === 'error')
  const hasWarnings = messages.some(msg => msg.type === 'warning')

  // ================================================================================================
  // RENDER
  // ================================================================================================

  if (messages.length === 0) return null

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Summary (only show if there are multiple messages or errors) */}
      {(messages.length > 1 || hasErrors) && (
        <ValidationSummary messages={messages} compact={compact} />
      )}

      {/* Messages */}
      <div className="space-y-2">
        {visibleMessages.map(message => (
          <MessageItem
            key={message.id}
            message={message}
            onDismiss={onDismiss}
            compact={compact}
            showIcon={showIcons}
          />
        ))}
        
        {hiddenCount > 0 && (
          <div className="text-center py-2">
            <div className="text-sm text-gray-400">
              {hiddenCount} more message{hiddenCount !== 1 ? 's' : ''} not shown
            </div>
          </div>
        )}
      </div>

      {/* Status indicator for errors */}
      {hasErrors && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
          <div className="flex items-center gap-2 text-red-400">
            <XCircle className="w-4 h-4" />
            <span className="font-medium text-sm">Configuration Invalid</span>
          </div>
          <div className="text-red-300 text-sm mt-1">
            Please resolve all errors before proceeding with your workout configuration.
          </div>
        </div>
      )}

      {/* Success state */}
      {!hasErrors && !hasWarnings && messages.some(msg => msg.type === 'success') && (
        <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
          <div className="flex items-center gap-2 text-green-400">
            <CheckCircle className="w-4 h-4" />
            <span className="font-medium text-sm">Configuration Valid</span>
          </div>
          <div className="text-green-300 text-sm mt-1">
            Your group configuration is ready to use.
          </div>
        </div>
      )}
    </div>
  )
}

// ================================================================================================
// UTILITY FUNCTIONS
// ================================================================================================

/**
 * Create validation messages from validation results
 */
export function createValidationMessages(
  validationResults: Array<{
    isValid: boolean
    errors: string[]
    warnings?: string[]
    suggestions?: string[]
  }>,
  context: string = 'configuration'
): ValidationMessage[] {
  const messages: ValidationMessage[] = []

  validationResults.forEach((result, index) => {
    // Add errors
    result.errors.forEach((error, errorIndex) => {
      messages.push({
        id: `error-${index}-${errorIndex}`,
        type: 'error',
        title: 'Configuration Error',
        message: error,
        dismissible: false
      })
    })

    // Add warnings
    result.warnings?.forEach((warning, warningIndex) => {
      messages.push({
        id: `warning-${index}-${warningIndex}`,
        type: 'warning',
        title: 'Configuration Warning',
        message: warning,
        dismissible: true
      })
    })

    // Add suggestions as info
    result.suggestions?.forEach((suggestion, suggestionIndex) => {
      messages.push({
        id: `suggestion-${index}-${suggestionIndex}`,
        type: 'info',
        title: 'Suggestion',
        message: suggestion,
        dismissible: true
      })
    })
  })

  // Add success message if everything is valid
  if (validationResults.every(result => result.isValid) && messages.length === 0) {
    messages.push({
      id: 'success',
      type: 'success',
      title: 'Valid Configuration',
      message: `Your ${context} is properly configured and ready to use.`,
      dismissible: true
    })
  }

  return messages
}

/**
 * Create a single validation message
 */
export function createValidationMessage(
  type: ValidationMessage['type'],
  title: string,
  message: string,
  options: Partial<Pick<ValidationMessage, 'suggestion' | 'action' | 'dismissible'>> = {}
): ValidationMessage {
  return {
    id: `${type}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    type,
    title,
    message,
    ...options
  }
}