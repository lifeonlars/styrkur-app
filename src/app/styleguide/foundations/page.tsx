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
        <p className="text-gray-400">Design tokens, utilities, typography, and the complete neumorphic system matrix</p>
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

      {/* Utility System */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">🔧 Utility System</h2>
        <p className="text-gray-400 text-sm mb-6">Complete neumorphic utility system with depth, surface, and border utilities that can be combined for maximum design flexibility.</p>
        
        {/* Depth Utilities */}
        <div className="mb-8">
          <h3 className="text-lg font-medium text-white mb-4">Depth Utilities</h3>
          <p className="text-gray-400 text-sm mb-4">4-level neumorphic depth system with consistent dual-shadow physics. Each utility can be applied to any component.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="depth-sunken p-6 bg-neu-card rounded-xl">
              <div className="text-center">
                <h4 className="text-sm font-medium text-white mb-2">depth-sunken</h4>
                <p className="text-xs text-gray-400 mb-2">Content wells, form containers</p>
                <code className="text-xs text-norse-gold">.depth-sunken</code>
              </div>
            </div>
            
            <div className="depth-flat p-6 bg-neu-card rounded-xl">
              <div className="text-center">
                <h4 className="text-sm font-medium text-white mb-2">depth-flat</h4>
                <p className="text-xs text-gray-400 mb-2">Background containers (no shadows)</p>
                <code className="text-xs text-norse-gold">.depth-flat</code>
              </div>
            </div>
            
            <div className="depth-subtle p-6 bg-neu-card rounded-xl">
              <div className="text-center">
                <h4 className="text-sm font-medium text-white mb-2">depth-subtle</h4>
                <p className="text-xs text-gray-400 mb-2">Standard containers</p>
                <code className="text-xs text-norse-gold">.depth-subtle</code>
              </div>
            </div>
            
            <div className="depth-elevated p-6 bg-neu-card rounded-xl">
              <div className="text-center">
                <h4 className="text-sm font-medium text-white mb-2">depth-elevated</h4>
                <p className="text-xs text-gray-400 mb-2">Featured content</p>
                <code className="text-xs text-norse-gold">.depth-elevated</code>
              </div>
            </div>
          </div>
        </div>
        
        {/* Surface Utilities */}
        <div className="mb-8">
          <h3 className="text-lg font-medium text-white mb-4">Surface Utilities</h3>
          <p className="text-gray-400 text-sm mb-4">4 surface gradients following neumorphic physics with 115° light direction consistency.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="depth-subtle surface-concave p-6 rounded-xl">
              <div className="text-center">
                <h4 className="text-sm font-medium text-white mb-2">surface-concave</h4>
                <p className="text-xs text-gray-400 mb-2">Inverted physics for inset elements</p>
                <code className="text-xs text-norse-gold">.surface-concave</code>
              </div>
            </div>
            
            <div className="depth-subtle surface-flat p-6 rounded-xl">
              <div className="text-center">
                <h4 className="text-sm font-medium text-white mb-2">surface-flat</h4>
                <p className="text-xs text-gray-400 mb-2">Minimal variation (2% difference)</p>
                <code className="text-xs text-norse-gold">.surface-flat</code>
              </div>
            </div>
            
            <div className="depth-subtle surface-convex p-6 rounded-xl">
              <div className="text-center">
                <h4 className="text-sm font-medium text-white mb-2">surface-convex</h4>
                <p className="text-xs text-gray-400 mb-2">Standard physics for raised elements</p>
                <code className="text-xs text-norse-gold">.surface-convex</code>
              </div>
            </div>
            
            <div className="depth-subtle surface-gold p-6 rounded-xl">
              <div className="text-center">
                <h4 className="text-sm font-medium mb-2">surface-gold</h4>
                <p className="text-xs text-gray-600 mb-2">Norse accent with readable text</p>
                <code className="text-xs text-gray-700">.surface-gold</code>
              </div>
            </div>
          </div>
        </div>
        
        {/* Border Utilities */}
        <div className="mb-8">
          <h3 className="text-lg font-medium text-white mb-4">Border Utilities</h3>
          <p className="text-gray-400 text-sm mb-4">Tesla Cybertruck-inspired border system with clear visual definition. Fixed to work with surface utilities.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="depth-subtle surface-convex border-transparent p-6 rounded-xl bg-neu-card">
              <div className="text-center">
                <h4 className="text-sm font-medium text-white mb-2">border-transparent</h4>
                <p className="text-xs text-gray-400 mb-2">No visible border</p>
                <code className="text-xs text-norse-gold">.border-transparent</code>
              </div>
            </div>
            
            <div className="depth-subtle surface-convex border-neu-subtle p-6 rounded-xl bg-neu-card">
              <div className="text-center">
                <h4 className="text-sm font-medium text-white mb-2">border-neu-subtle</h4>
                <p className="text-xs text-gray-400 mb-2">Soft definition</p>
                <code className="text-xs text-norse-gold">.border-neu-subtle</code>
              </div>
            </div>
            
            <div className="depth-subtle surface-convex border-neu-crisp p-6 rounded-xl bg-neu-card">
              <div className="text-center">
                <h4 className="text-sm font-medium text-white mb-2">border-neu-crisp</h4>
                <p className="text-xs text-gray-400 mb-2">Tesla Cybertruck style (2px)</p>
                <code className="text-xs text-norse-gold">.border-neu-crisp</code>
              </div>
            </div>
            
            <div className="depth-subtle surface-convex border-neu-glow p-6 rounded-xl bg-neu-card">
              <div className="text-center">
                <h4 className="text-sm font-medium text-white mb-2">border-neu-glow</h4>
                <p className="text-xs text-gray-400 mb-2">Ocean blue glow effect</p>
                <code className="text-xs text-norse-gold">.border-neu-glow</code>
              </div>
            </div>
          </div>
        </div>
        
        {/* Utility Combinations */}
        <div className="mb-8">
          <h3 className="text-lg font-medium text-white mb-4">✨ Utility Combinations</h3>
          <p className="text-gray-400 text-sm mb-4">Examples of how depth + surface + border utilities work together following neumorphic physics principles.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="depth-subtle surface-gold border-neu-glow p-6 rounded-xl">
              <h4 className="text-lg font-semibold mb-2">Primary Action Style</h4>
              <p className="text-sm text-gray-700 mb-3">Perfect for CTAs with Norse branding</p>
              <code className="text-xs text-gray-700 bg-black/10 px-2 py-1 rounded">
                depth="subtle" surface="gold" border="glow"
              </code>
            </div>
            
            <div className="depth-elevated surface-convex border-neu-crisp p-6 rounded-xl bg-neu-card">
              <h4 className="text-lg font-semibold text-white mb-2">Tesla Cybertruck Style</h4>
              <p className="text-sm text-gray-300 mb-3">Premium elevated with sharp definition</p>
              <code className="text-xs text-norse-gold bg-black/20 px-2 py-1 rounded">
                depth="elevated" surface="convex" border="crisp"
              </code>
            </div>
            
            <div className="depth-sunken surface-concave border-transparent p-6 rounded-xl bg-neu-card">
              <h4 className="text-lg font-semibold text-white mb-2">Content Well</h4>
              <p className="text-sm text-gray-300 mb-3">Form containers and content areas</p>
              <code className="text-xs text-norse-gold bg-black/20 px-2 py-1 rounded">
                depth="sunken" surface="concave" border="transparent"
              </code>
            </div>
            
            <div className="depth-flat surface-flat border-transparent p-6 rounded-xl bg-neu-card">
              <h4 className="text-lg font-semibold text-white mb-2">Background Container</h4>
              <p className="text-sm text-gray-300 mb-3">Subtle background for grouping</p>
              <code className="text-xs text-norse-gold bg-black/20 px-2 py-1 rounded">
                depth="flat" surface="flat" border="transparent"
              </code>
            </div>
          </div>
        </div>
      </div>
      
      {/* Legacy Shadow System */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">🗂️ Legacy Shadow System (Deprecated)</h2>
        <div className="p-4 bg-wood-500/10 border border-wood-500/20 rounded-xl mb-4">
          <p className="text-wood-400 text-sm">⚠️ <strong>Use new utility system above instead.</strong> This shadow system is kept for reference but should not be used in new components.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {shadows.map((shadow) => (
            <ShadowSwatch key={shadow.class} {...shadow} />
          ))}
        </div>
      </div>
    </div>
  )
}