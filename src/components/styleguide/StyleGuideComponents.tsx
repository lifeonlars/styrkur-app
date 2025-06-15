// Shared components and data for the StyleGuide system

import React from 'react'

// Utility component for displaying color swatches
export const ColorSwatch = ({ name, value, var: varName }: { name: string; value: string; var: string }) => (
  <div className="flex flex-col items-center space-y-2 p-4 bg-neu-surface shadow-neu rounded-xl">
    <div 
      className="w-16 h-16 rounded-lg border border-neu-light/20"
      style={{ backgroundColor: value }}
    />
    <div className="text-center">
      <div className="text-sm font-medium text-white">{name}</div>
      <div className="text-xs text-gray-400">{varName}</div>
      <div className="text-xs text-gray-500 font-mono">{value}</div>
    </div>
  </div>
)

// Utility component for displaying gradient swatches
export const GradientSwatch = ({ name, value, var: varName }: { name: string; value: string; var: string }) => (
  <div className="flex flex-col items-center space-y-2 p-4 bg-neu-surface shadow-neu rounded-xl">
    <div 
      className="w-16 h-16 rounded-lg border border-neu-light/20"
      style={{ background: value }}
    />
    <div className="text-center">
      <div className="text-sm font-medium text-white">{name}</div>
      <div className="text-xs text-gray-400">{varName}</div>
    </div>
  </div>
)

// Utility component for displaying shadow variations
export const ShadowSwatch = ({ name, class: className, description }: { name: string; class: string; description: string }) => (
  <div className="flex flex-col items-center space-y-2 p-4 bg-neu-surface rounded-xl">
    <div className={`w-16 h-16 bg-neu-card rounded-lg ${className}`} />
    <div className="text-center">
      <div className="text-sm font-medium text-white">{name}</div>
      <div className="text-xs text-gray-400">{className}</div>
      <div className="text-xs text-gray-500 text-center">{description}</div>
    </div>
  </div>
)

// Wrapper component for organizing content sections
export const ComponentShowcase = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold text-white border-b border-neu-light/20 pb-2">{title}</h3>
    <div className="space-y-4">
      {children}
    </div>
  </div>
)

// Data structures for design system documentation

export const colors = [
  { name: 'Norse Gold', value: '#C3A869', var: 'norse-gold' },
  { name: 'Norse Gold Light', value: '#D4BC7F', var: 'norse-gold-light' },
  { name: 'Norse Gold Dark', value: '#A89253', var: 'norse-gold-dark' },
  { name: 'Norse Gold Darker', value: '#8D7A42', var: 'norse-gold-darker' },
  { name: 'Norse Accent', value: '#B8A260', var: 'norse-accent' },
]

export const backgroundColors = [
  { name: 'Background', value: '#2c2f36', var: 'neu-background' },
  { name: 'Surface', value: '#343940', var: 'neu-surface' },
  { name: 'Card', value: '#3d424f', var: 'neu-card' },
  { name: 'Elevated', value: '#454a57', var: 'neu-elevated' },
]

export const contextColors = [
  // Forest (Success) - Green tones
  { name: 'Forest 300', value: '#4AE5A8', var: 'forest-300', description: 'Light success, hover states' },
  { name: 'Forest 400', value: '#3BC692', var: 'forest-400', description: 'Success accent' },
  { name: 'Forest 500', value: '#2E7D5F', var: 'forest-500', description: 'Primary success color' },
  { name: 'Forest 600', value: '#25654C', var: 'forest-600', description: 'Dark success' },
  { name: 'Forest 700', value: '#1C4D39', var: 'forest-700', description: 'Darker success' },
  
  // Blood (Error) - Red tones
  { name: 'Blood 300', value: '#F87171', var: 'blood-300', description: 'Light error, hover states' },
  { name: 'Blood 400', value: '#EF4444', var: 'blood-400', description: 'Error accent' },
  { name: 'Blood 500', value: '#A83232', var: 'blood-500', description: 'Primary error color' },
  { name: 'Blood 600', value: '#8B2828', var: 'blood-600', description: 'Dark error' },
  { name: 'Blood 700', value: '#6F1F1F', var: 'blood-700', description: 'Darker error' },
  
  // Ocean (Info) - Blue tones
  { name: 'Ocean 300', value: '#7DD3FC', var: 'ocean-300', description: 'Light info, hover states' },
  { name: 'Ocean 400', value: '#38BDF8', var: 'ocean-400', description: 'Info accent' },
  { name: 'Ocean 500', value: '#375A74', var: 'ocean-500', description: 'Primary info color' },
  { name: 'Ocean 600', value: '#2D4A5F', var: 'ocean-600', description: 'Dark info' },
  { name: 'Ocean 700', value: '#243A4A', var: 'ocean-700', description: 'Darker info' },
  
  // Wood (Warning) - Brown tones
  { name: 'Wood 300', value: '#A78BFA', var: 'wood-300', description: 'Light warning, hover states' },
  { name: 'Wood 400', value: '#8B5CF6', var: 'wood-400', description: 'Warning accent' },
  { name: 'Wood 500', value: '#5C4533', var: 'wood-500', description: 'Primary warning color' },
  { name: 'Wood 600', value: '#4A3729', var: 'wood-600', description: 'Dark warning' },
  { name: 'Wood 700', value: '#38291F', var: 'wood-700', description: 'Darker warning' },
  
  // Iron (Neutral) - Gray tones
  { name: 'Iron 200', value: '#4B5563', var: 'iron-200', description: 'Lightest neutral' },
  { name: 'Iron 300', value: '#3B3F46', var: 'iron-300', description: 'Light neutral' },
  { name: 'Iron 400', value: '#374151', var: 'iron-400', description: 'Neutral accent' },
  { name: 'Iron 500', value: '#2D3138', var: 'iron-500', description: 'Primary neutral' },
  { name: 'Iron 600', value: '#1F2937', var: 'iron-600', description: 'Dark neutral' },
  { name: 'Iron 700', value: '#111827', var: 'iron-700', description: 'Darkest neutral' },
]

export const gradients = [
  { name: 'Gold Metallic', value: 'linear-gradient(145deg, #C3A869, #B8A260, #A89253)', var: 'neu-gold-metallic' },
  { name: 'Gold Light', value: 'linear-gradient(145deg, #D4BC7F, #C3A869, #B8A260)', var: 'neu-gold-light' },
  { name: 'Gold Dark', value: 'linear-gradient(145deg, #B8A260, #A89253, #8D7A42)', var: 'neu-gold-dark' },
  { name: 'Card Background', value: 'radial-gradient(ellipse at center, #363942, #2a2d33), linear-gradient(135deg, #31343b, #252831)', var: 'neu-card-bg' },
  { name: 'Modal Background', value: 'radial-gradient(ellipse at center, #3a3d45, #2d3037), linear-gradient(145deg, #34373e, #282a30)', var: 'neu-modal-bg' },
]

export const shadows = [
  { name: 'Flat', class: 'shadow-neu-flat', description: 'Minimal elevation for background elements' },
  { name: 'Default', class: 'shadow-neu', description: 'Standard neumorphic depth for cards' },
  { name: 'Large', class: 'shadow-neu-lg', description: 'Higher elevation for important content' },
  { name: 'Inset', class: 'shadow-neu-inset', description: 'Sunken appearance for inputs' },
  { name: 'Hover', class: 'shadow-neu-hover', description: 'Enhanced depth on hover' },
  { name: 'Pressed', class: 'shadow-neu-pressed', description: 'Inset effect when pressed' },
  { name: 'Gold', class: 'shadow-neu-gold', description: 'Norse gold accent shadow' },
  { name: 'Gold Hover', class: 'shadow-neu-gold-hover', description: 'Enhanced gold shadow' },
]