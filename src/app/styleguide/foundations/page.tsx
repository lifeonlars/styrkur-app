'use client'

import { 
  ColorSwatch, 
  GradientSwatch, 
  ShadowSwatch, 
  colors, 
  backgroundColors, 
  contextColors, 
  gradients, 
  shadows 
} from '@/components/styleguide/StyleGuideComponents'

export default function FoundationsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white font-heading mb-2">Foundations</h1>
        <p className="text-gray-400">Colors, typography, neumorphic system matrix, spacing scale</p>
      </div>

      {/* Norse Gold Palette */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">Norse Gold Palette</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {colors.map((color) => (
            <ColorSwatch key={color.var} {...color} />
          ))}
        </div>
      </div>

      {/* Background Hierarchy */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">Background Hierarchy</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {backgroundColors.map((color) => (
            <ColorSwatch key={color.var} {...color} />
          ))}
        </div>
      </div>

      {/* Context Colors */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">Context Colors</h2>
        <p className="text-gray-400 text-sm mb-4">Semantic colors for feedback, states, and context</p>
        
        {/* Group colors by type */}
        {[
          { name: 'Forest (Success)', colors: contextColors.filter(c => c.var.includes('forest')) },
          { name: 'Blood (Error)', colors: contextColors.filter(c => c.var.includes('blood')) },
          { name: 'Ocean (Info)', colors: contextColors.filter(c => c.var.includes('ocean')) },
          { name: 'Wood (Warning)', colors: contextColors.filter(c => c.var.includes('wood')) },
          { name: 'Iron (Neutral)', colors: contextColors.filter(c => c.var.includes('iron')) },
        ].map((group) => (
          <div key={group.name} className="mb-6">
            <h3 className="text-lg font-medium text-white mb-3">{group.name}</h3>
            <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
              {group.colors.map((color) => (
                <div key={color.var} className="flex flex-col items-center space-y-2 p-3 bg-neu-surface shadow-neu rounded-lg">
                  <div 
                    className="w-12 h-12 rounded-lg border border-neu-light/20"
                    style={{ backgroundColor: color.value }}
                  />
                  <div className="text-center">
                    <div className="text-xs font-medium text-white">{color.name}</div>
                    <div className="text-xs text-gray-500 font-mono">{color.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Gradients */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">Gradients</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {gradients.map((gradient) => (
            <GradientSwatch key={gradient.var} {...gradient} />
          ))}
        </div>
      </div>

      {/* Typography */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">Typography Styles</h2>
        <div className="space-y-4 p-6 bg-neu-surface shadow-neu rounded-xl">
          <h1 className="text-4xl font-bold text-white font-heading">Heading 1 - Cinzel</h1>
          <h2 className="text-3xl font-semibold text-white font-heading">Heading 2 - Cinzel</h2>
          <h3 className="text-2xl font-medium text-white">Heading 3 - Inter</h3>
          <h4 className="text-xl font-medium text-white">Heading 4 - Inter</h4>
          <p className="text-base text-white">Body text - Inter Regular</p>
          <p className="text-sm text-gray-300">Small text - Inter Regular</p>
          <p className="text-xs text-gray-400">Extra small text - Inter Regular</p>
          <p className="text-base font-medium text-norse-gold">Norse Gold Text</p>
          <p className="text-base text-gradient">Gradient Text</p>
        </div>
      </div>

      {/* Neumorphic Shadow System */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">Neumorphic Shadow System</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {shadows.map((shadow) => (
            <ShadowSwatch key={shadow.class} {...shadow} />
          ))}
        </div>
      </div>
    </div>
  )
}