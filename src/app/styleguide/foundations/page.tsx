'use client'

import { useState } from 'react'
import { 
  ColorSwatch, 
  GradientSwatch, 
  colors, 
  backgroundColors, 
  contextColors, 
  gradients
} from '@/components/styleguide/StyleGuideComponents'
import { Card } from '@/ui/card'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/ui/select'
import { Check, Target, Palette, Type } from 'lucide-react'

export default function FoundationsPage() {
  const [activeTab, setActiveTab] = useState('semantics')

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white font-heading mb-2">Foundations</h1>
        <p className="text-gray-400">Design tokens, semantic colors, and typography for the Norse neumorphic system</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="semantics">
            <Target className="w-4 h-4 mr-2" />
            Semantics
          </TabsTrigger>
          <TabsTrigger value="primitives">
            <Palette className="w-4 h-4 mr-2" />
            Primitives
          </TabsTrigger>
          <TabsTrigger value="typography">
            <Type className="w-4 h-4 mr-2" />
            Typography
          </TabsTrigger>
        </TabsList>

        <TabsContent value="semantics">
          {/* Semantic Token System */}
          <div>
            <h2 className="text-xl font-semibold text-white mb-4">Semantic Token System</h2>
            <p className="text-gray-400 text-sm mb-6">
              Functional color tokens mapped from primitives for specific usage contexts. 
              Components should use semantic tokens, not primitive colors directly.
            </p>
            
            {/* Context Surfaces Demo */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-white mb-4">Context Surfaces</h3>
              <p className="text-gray-400 text-sm mb-4">Context surfaces with consistent gradient structure for different states</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card depth="subtle" surface="success" className="p-4">
                  <h4 className="text-white font-medium mb-2">Success</h4>
                  <p className="text-sm text-white/80 mb-2">Positive actions, completion states</p>
                  <code className="text-xs bg-black/20 px-2 py-1 rounded">--surface-success</code>
                </Card>
                <Card depth="subtle" surface="danger" className="p-4">
                  <h4 className="text-white font-medium mb-2">Danger</h4>
                  <p className="text-sm text-white/80 mb-2">Error states, destructive actions</p>
                  <code className="text-xs bg-black/20 px-2 py-1 rounded">--surface-danger</code>
                </Card>
                <Card depth="subtle" surface="warning" className="p-4">
                  <h4 className="text-white font-medium mb-2">Warning</h4>
                  <p className="text-sm text-white/80 mb-2">Caution, pending actions</p>
                  <code className="text-xs bg-black/20 px-2 py-1 rounded">--surface-warning</code>
                </Card>
                <Card depth="subtle" surface="info" className="p-4">
                  <h4 className="text-white font-medium mb-2">Info</h4>
                  <p className="text-sm text-white/80 mb-2">Information, neutral states</p>
                  <code className="text-xs bg-black/20 px-2 py-1 rounded">--surface-info</code>
                </Card>
              </div>
            </div>
            
            {/* Text Hierarchy Demo */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-white mb-4">Text Hierarchy</h3>
              <p className="text-gray-400 text-sm mb-4">Semantic text tokens mapped from Stone primitive scale</p>
              <div className="space-y-3 p-6 bg-neu-surface rounded-xl">
                <div className="flex items-center justify-between">
                  <p style={{color: 'var(--text-primary)'}} className="text-lg font-medium">Primary text content</p>
                  <code className="text-xs text-norse-gold bg-neu-card px-2 py-1 rounded">--text-primary</code>
                </div>
                <div className="flex items-center justify-between">
                  <p style={{color: 'var(--text-secondary)'}} className="text-base">Secondary text content</p>
                  <code className="text-xs text-norse-gold bg-neu-card px-2 py-1 rounded">--text-secondary</code>
                </div>
                <div className="flex items-center justify-between">
                  <p style={{color: 'var(--text-muted)'}} className="text-sm">Muted text, captions, metadata</p>
                  <code className="text-xs text-norse-gold bg-neu-card px-2 py-1 rounded">--text-muted</code>
                </div>
                <div className="flex items-center justify-between">
                  <p style={{color: 'var(--text-disabled)'}} className="text-sm">Disabled state text</p>
                  <code className="text-xs text-norse-gold bg-neu-card px-2 py-1 rounded">--text-disabled</code>
                </div>
                <div className="border-t border-neu-light/10 pt-3 mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <p style={{color: 'var(--text-success)'}} className="text-sm font-medium">Success message text</p>
                    <code className="text-xs text-norse-gold bg-neu-card px-2 py-1 rounded">--text-success</code>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <p style={{color: 'var(--text-danger)'}} className="text-sm font-medium">Error message text</p>
                    <code className="text-xs text-norse-gold bg-neu-card px-2 py-1 rounded">--text-danger</code>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <p style={{color: 'var(--text-warning)'}} className="text-sm font-medium">Warning message text</p>
                    <code className="text-xs text-norse-gold bg-neu-card px-2 py-1 rounded">--text-warning</code>
                  </div>
                  <div className="flex items-center justify-between">
                    <p style={{color: 'var(--text-info)'}} className="text-sm font-medium">Info message text</p>
                    <code className="text-xs text-norse-gold bg-neu-card px-2 py-1 rounded">--text-info</code>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Border Examples */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-white mb-4">Border System</h3>
              <p className="text-gray-400 text-sm mb-4">Semantic border tokens for different interaction states and contexts</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-neu-surface" style={{border: '1px solid var(--border-subtle)'}}>
                  <h4 className="text-white font-medium mb-2">Subtle</h4>
                  <p className="text-sm text-gray-300 mb-2">Dividers, subtle separation</p>
                  <code className="text-xs text-norse-gold">--border-subtle</code>
                </div>
                <div className="p-4 rounded-lg bg-neu-surface" style={{border: '1px solid var(--border-default)'}}>
                  <h4 className="text-white font-medium mb-2">Default</h4>
                  <p className="text-sm text-gray-300 mb-2">Standard borders</p>
                  <code className="text-xs text-norse-gold">--border-default</code>
                </div>
                <div className="p-4 rounded-lg bg-neu-surface" style={{border: '2px solid var(--border-focus)'}}>
                  <h4 className="text-white font-medium mb-2">Focus</h4>
                  <p className="text-sm text-gray-300 mb-2">Focus rings, active states</p>
                  <code className="text-xs text-norse-gold">--border-focus</code>
                </div>
                <div className="p-4 rounded-lg bg-neu-surface" style={{border: '1px solid var(--border-success)'}}>
                  <h4 className="text-white font-medium mb-2">Success</h4>
                  <p className="text-sm text-gray-300 mb-2">Success state borders</p>
                  <code className="text-xs text-norse-gold">--border-success</code>
                </div>
                <div className="p-4 rounded-lg bg-neu-surface" style={{border: '1px solid var(--border-danger)'}}>
                  <h4 className="text-white font-medium mb-2">Danger</h4>
                  <p className="text-sm text-gray-300 mb-2">Error state borders</p>
                  <code className="text-xs text-norse-gold">--border-danger</code>
                </div>
                <div className="p-4 rounded-lg bg-neu-surface" style={{border: '1px solid var(--border-warning)'}}>
                  <h4 className="text-white font-medium mb-2">Warning</h4>
                  <p className="text-sm text-gray-300 mb-2">Warning state borders</p>
                  <code className="text-xs text-norse-gold">--border-warning</code>
                </div>
              </div>
            </div>
            
            {/* Icon Examples */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-white mb-4">Icon Color System</h3>
              <p className="text-gray-400 text-sm mb-4">Semantic icon tokens for different contexts and states</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex flex-col items-center p-4 bg-neu-surface rounded-lg">
                  <div className="w-8 h-8 rounded-full mb-2 flex items-center justify-center" style={{color: 'var(--icon-primary)'}}>
                    <Check className="w-5 h-5" />
                  </div>
                  <h4 className="text-white font-medium mb-1">Primary</h4>
                  <code className="text-xs text-norse-gold">--icon-primary</code>
                </div>
                <div className="flex flex-col items-center p-4 bg-neu-surface rounded-lg">
                  <div className="w-8 h-8 rounded-full mb-2 flex items-center justify-center" style={{color: 'var(--icon-secondary)'}}>
                    <Check className="w-5 h-5" />
                  </div>
                  <h4 className="text-white font-medium mb-1">Secondary</h4>
                  <code className="text-xs text-norse-gold">--icon-secondary</code>
                </div>
                <div className="flex flex-col items-center p-4 bg-neu-surface rounded-lg">
                  <div className="w-8 h-8 rounded-full mb-2 flex items-center justify-center" style={{color: 'var(--icon-accent)'}}>
                    <Check className="w-5 h-5" />
                  </div>
                  <h4 className="text-white font-medium mb-1">Accent</h4>
                  <code className="text-xs text-norse-gold">--icon-accent</code>
                </div>
                <div className="flex flex-col items-center p-4 bg-neu-surface rounded-lg">
                  <div className="w-8 h-8 rounded-full mb-2 flex items-center justify-center" style={{color: 'var(--icon-success)'}}>
                    <Check className="w-5 h-5" />
                  </div>
                  <h4 className="text-white font-medium mb-1">Success</h4>
                  <code className="text-xs text-norse-gold">--icon-success</code>
                </div>
              </div>
            </div>
            
            {/* Context Surface Integration Testing */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-white mb-4">Context Surface Integration Testing</h3>
              <p className="text-gray-400 text-sm mb-4">Real-world component examples demonstrating context surfaces in action</p>
              
              {/* WorkoutGroup Set Completion Examples */}
              <div className="mb-6">
                <h4 className="text-white font-medium mb-3">WorkoutGroup Set States</h4>
                <div className="space-y-3">
                  <div className="p-4 rounded-lg border border-green-700/20" style={{ background: 'var(--surface-success)' }}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-white">Set 1 ✓</span>
                      <span className="text-xs text-white/80">Completed</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-norse-gold text-black font-medium flex items-center justify-center text-xs">A</span>
                      <span className="text-sm text-white">Barbell Squat</span>
                      <span className="text-sm text-white/90 ml-auto">3 × 12 @ 80kg</span>
                    </div>
                  </div>
                  
                  <div className="p-4 rounded-lg border border-red-700/20" style={{ background: 'var(--surface-danger)' }}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-white">Set 2 ✗</span>
                      <span className="text-xs text-white/80">Failed</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-norse-gold text-black font-medium flex items-center justify-center text-xs">A</span>
                      <span className="text-sm text-white">Barbell Squat</span>
                      <span className="text-sm text-white/90 ml-auto">2 × 12 @ 80kg</span>
                    </div>
                  </div>
                  
                  <div className="p-4 rounded-lg border border-purple-700/20" style={{ background: 'var(--surface-warning)' }}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-white">Set 3 ⚠</span>
                      <span className="text-xs text-white/80">Form Check</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-norse-gold text-black font-medium flex items-center justify-center text-xs">A</span>
                      <span className="text-sm text-white">Barbell Squat</span>
                      <span className="text-sm text-white/90 ml-auto">3 × 12 @ 80kg (RPE 9+)</span>
                    </div>
                  </div>
                  
                  <div className="p-4 rounded-lg border border-blue-700/20" style={{ background: 'var(--surface-info)' }}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-white">Rest Timer</span>
                      <span className="text-xs text-white/80">Active</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-white">Next: Deadlifts</span>
                      <span className="text-sm text-white/90 ml-auto">2:30 remaining</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Component Integration Examples */}
              <div className="mb-6">
                <h4 className="text-white font-medium mb-3">Component Integration Examples</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Card with semantic text tokens */}
                  <Card depth="subtle" surface="convex" className="p-4">
                    <h4 style={{ color: 'var(--text-primary)' }} className="font-medium mb-2">Component with Semantic Tokens</h4>
                    <p style={{ color: 'var(--text-secondary)' }} className="text-sm mb-2">This card uses semantic text tokens for proper hierarchy</p>
                    <p style={{ color: 'var(--text-muted)' }} className="text-xs">Muted helper text with proper contrast</p>
                    <div className="mt-3 flex gap-2">
                      <button 
                        className="px-3 py-1 rounded text-xs font-medium"
                        style={{ 
                          backgroundColor: 'var(--surface-success)', 
                          color: 'var(--text-primary)',
                          border: '1px solid var(--border-success)'
                        }}
                      >
                        Success Action
                      </button>
                      <button 
                        className="px-3 py-1 rounded text-xs font-medium"
                        style={{ 
                          backgroundColor: 'var(--surface-danger)', 
                          color: 'var(--text-primary)',
                          border: '1px solid var(--border-danger)'
                        }}
                      >
                        Danger Action
                      </button>
                    </div>
                  </Card>
                  
                  {/* Form component with semantic tokens */}
                  <Card depth="subtle" surface="convex" className="p-4">
                    <h4 style={{ color: 'var(--text-primary)' }} className="font-medium mb-2">Form with Semantic Styling</h4>
                    <div className="space-y-3">
                      <div>
                        <label style={{ color: 'var(--text-secondary)' }} className="text-sm font-medium block mb-1">
                          Exercise Name
                        </label>
                        <input 
                          type="text" 
                          placeholder="Enter exercise name"
                          className="w-full px-3 py-2 rounded text-sm"
                          style={{ 
                            backgroundColor: 'var(--input-bg)',
                            borderColor: 'var(--border-default)',
                            color: 'var(--text-primary)'
                          }}
                        />
                      </div>
                      <div>
                        <label style={{ color: 'var(--text-secondary)' }} className="text-sm font-medium block mb-1">
                          Weight (kg)
                        </label>
                        <input 
                          type="number" 
                          placeholder="80"
                          className="w-full px-3 py-2 rounded text-sm"
                          style={{ 
                            backgroundColor: 'var(--input-bg)',
                            borderColor: 'var(--border-focus)',
                            color: 'var(--text-primary)'
                          }}
                        />
                        <span style={{ color: 'var(--text-muted)' }} className="text-xs">
                          Focus state with semantic border
                        </span>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
              
              {/* Input State Validation */}
              <div className="mb-6">
                <h4 className="text-white font-medium mb-3">Input State Validation</h4>
                <p className="text-gray-400 text-xs mb-4">Updated input states using new semantic border tokens and context colors</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card depth="subtle" surface="convex" className="p-4">
                    <h5 className="text-white font-medium mb-3">Error & Success States</h5>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm text-gray-300 block mb-1">Success Input</label>
                        <input 
                          type="text" 
                          value="Valid input value"
                          className="input input-default input-success w-full"
                          readOnly
                        />
                        <span className="text-xs text-green-400 mt-1 block">✓ Uses --border-success semantic token</span>
                      </div>
                      <div>
                        <label className="text-sm text-gray-300 block mb-1">Error Input</label>
                        <input 
                          type="text" 
                          value="Invalid input value"
                          className="input input-default input-error w-full"
                          readOnly
                        />
                        <span className="text-xs text-red-400 mt-1 block">✗ Uses --border-danger semantic token</span>
                      </div>
                    </div>
                  </Card>
                  
                  <Card depth="subtle" surface="convex" className="p-4">
                    <h5 className="text-white font-medium mb-3">Warning & Focus States</h5>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm text-gray-300 block mb-1">Warning Input</label>
                        <input 
                          type="text" 
                          value="Amethyst warning state"
                          className="input input-default input-warning w-full"
                          readOnly
                        />
                        <span className="text-xs text-purple-400 mt-1 block">⚠ Uses --border-warning (Amethyst) semantic token</span>
                      </div>
                      <div>
                        <label className="text-sm text-gray-300 block mb-1">Default Focus</label>
                        <input 
                          type="text" 
                          placeholder="Click to see focus state"
                          className="input input-default w-full"
                        />
                        <span className="text-xs text-gray-400 mt-1 block">Uses --border-focus (Norse Gold) semantic token</span>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
              
              {/* Select Dropdown State Validation */}
              <div className="mb-6">
                <h4 className="text-white font-medium mb-3">Select Dropdown State Validation</h4>
                <p className="text-gray-400 text-xs mb-4">Select dropdowns with updated semantic border tokens matching Input component states</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card depth="subtle" surface="convex" className="p-4">
                    <h5 className="text-white font-medium mb-3">Error & Success Selects</h5>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm text-gray-300 block mb-1">Success Select</label>
                        <Select>
                          <SelectTrigger className="w-full" variant="success">
                            <SelectValue placeholder="Valid selection made" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="valid">Valid Option</SelectItem>
                          </SelectContent>
                        </Select>
                        <span className="text-xs text-green-400 mt-1 block">✓ Uses --border-success semantic token</span>
                      </div>
                      <div>
                        <label className="text-sm text-gray-300 block mb-1">Error Select</label>
                        <Select>
                          <SelectTrigger className="w-full" variant="error">
                            <SelectValue placeholder="Invalid selection" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="invalid">Invalid Option</SelectItem>
                          </SelectContent>
                        </Select>
                        <span className="text-xs text-red-400 mt-1 block">✗ Uses --border-danger semantic token</span>
                      </div>
                    </div>
                  </Card>
                  
                  <Card depth="subtle" surface="convex" className="p-4">
                    <h5 className="text-white font-medium mb-3">Warning & Default Selects</h5>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm text-gray-300 block mb-1">Warning Select</label>
                        <Select>
                          <SelectTrigger className="w-full" variant="warning">
                            <SelectValue placeholder="Amethyst warning state" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="warning">Warning Option</SelectItem>
                          </SelectContent>
                        </Select>
                        <span className="text-xs text-purple-400 mt-1 block">⚠ Uses --border-warning (Amethyst) semantic token</span>
                      </div>
                      <div>
                        <label className="text-sm text-gray-300 block mb-1">Default Select</label>
                        <Select>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Click to see focus state" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="default">Default Option</SelectItem>
                          </SelectContent>
                        </Select>
                        <span className="text-xs text-gray-400 mt-1 block">Uses --border-focus (Norse Gold) semantic token</span>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
              
              {/* Validation Checklist */}
              <div className="p-4 bg-neu-surface/50 rounded-lg border border-neu-light/10">
                <h4 className="text-norse-gold font-medium mb-3">Integration Validation Checklist</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="text-white font-medium text-sm mb-2">Context Surfaces ✓</h5>
                    <ul className="text-xs text-gray-300 space-y-1">
                      <li>• Success highlighting with proper gradient + opacity</li>
                      <li>• Danger/error states clearly distinguishable</li>
                      <li>• Warning states with appropriate visual emphasis</li>
                      <li>• Info states subtle but noticeable</li>
                      <li>• Text remains readable on all surface backgrounds</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-white font-medium text-sm mb-2">Component Integration ✓</h5>
                    <ul className="text-xs text-gray-300 space-y-1">
                      <li>• Semantic text tokens provide clear hierarchy</li>
                      <li>• Background tokens work with neumorphic system</li>
                      <li>• Border tokens integrate with component states</li>
                      <li>• Context surfaces compatible with Card component</li>
                      <li>• Input states updated to use semantic border tokens</li>
                      <li>• Select dropdowns updated to match Input semantic tokens</li>
                      <li>• Warning states now use Amethyst (--border-warning)</li>
                      <li>• Error/success states use --border-danger/--border-success</li>
                      <li>• No conflicts with existing utility classes</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-neu-surface rounded-lg border border-neu-light/10">
              <h4 className="text-norse-gold font-medium mb-2">Semantic Token Guidelines:</h4>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• <strong>Component Usage:</strong> Always use semantic tokens in components, not primitive colors directly</li>
                <li>• <strong>Design Reference:</strong> Designers can reference primitive tokens, developers use semantic tokens</li>
                <li>• <strong>Context Surfaces:</strong> Use for cards, backgrounds, and contextual highlighting</li>
                <li>• <strong>Text Hierarchy:</strong> Stone-based progression ensures consistent readability</li>
                <li>• <strong>Border System:</strong> Complete interaction state coverage from subtle to strong</li>
                <li>• <strong>Migration:</strong> Update components gradually from legacy tokens to semantic system</li>
              </ul>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="primitives">
          {/* Norse Gold Palette */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">Norse Gold Palette</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {colors.map((color) => (
                <ColorSwatch key={color.var} {...color} />
              ))}
            </div>
          </div>

          {/* Primitive Color Scales */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">Primitive Color Scales</h2>
            <p className="text-gray-400 text-sm mb-6">
              Unified 9-color scales (100-900) optimized for dark theme with mathematical consistency.
              These are base tokens that map to semantic usage contexts.
            </p>
            
            {[
              {
                name: 'Norse Gold',
                description: 'Primary accent and branding',
                prefix: 'norse-gold',
                colors: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
                anchor: '300'
              },
              {
                name: 'Forest',
                description: 'Success, positive actions, growth',
                prefix: 'forest',
                colors: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
                anchor: '300'
              },
              {
                name: 'Amethyst',
                description: 'Warning, caution, mystical elements',
                prefix: 'amethyst',
                colors: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
                anchor: '300'
              },
              {
                name: 'Ocean',
                description: 'Information, links, trust',
                prefix: 'ocean',
                colors: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
                anchor: '300'
              },
              {
                name: 'Blood',
                description: 'Danger, errors, critical actions',
                prefix: 'blood',
                colors: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
                anchor: '300'
              },
              {
                name: 'Stone',
                description: 'Light utility for text, borders, lighter elements',
                prefix: 'stone',
                colors: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
                anchor: '300'
              },
              {
                name: 'Iron',
                description: 'Dark foundation for app backgrounds, dark surfaces',
                prefix: 'iron',
                colors: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
                anchor: '200'
              }
            ].map((scale) => (
              <div key={scale.prefix} className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <h3 className="text-lg font-medium text-white">{scale.name}</h3>
                  <span className="text-sm text-gray-400">{scale.description}</span>
                </div>
                <div className="grid grid-cols-9 gap-1 max-w-4xl">
                  {scale.colors.map((level) => {
                    const cssVar = `--${scale.prefix}-${level}`;
                    const isAnchor = level === scale.anchor;
                    return (
                      <div 
                        key={level}
                        className="group relative"
                      >
                        <div 
                          className={`w-full h-16 rounded-lg border transition-all ${
                            isAnchor 
                              ? 'border-norse-gold border-2 ring-2 ring-norse-gold/20' 
                              : 'border-neu-light/20 hover:border-norse-gold/50'
                          }`}
                          style={{ backgroundColor: `var(${cssVar})` }}
                        />
                        <div className="mt-2 text-center">
                          <div className={`text-xs font-medium ${isAnchor ? 'text-norse-gold' : 'text-white'}`}>
                            {level}
                            {isAnchor && ' ⚓'}
                          </div>
                          <div className="text-xs text-gray-500 font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                            {cssVar}
                          </div>
                        </div>
                        
                        {/* Hover tooltip */}
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-neu-card border border-neu-light/20 rounded-lg shadow-neu opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 whitespace-nowrap">
                          <div className="text-xs font-medium text-white">{cssVar}</div>
                          <div className="text-xs text-gray-400">
                            Hover to see hex value
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
            
            <div className="mt-6 p-4 bg-neu-surface rounded-lg border border-neu-light/10">
              <h4 className="text-norse-gold font-medium mb-2">Usage Notes:</h4>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• <strong>Primitive vs Semantic:</strong> These are base tokens that will map to semantic usage in Phase CS2</li>
                <li>• <strong>Dark theme optimization:</strong> Level 100 starts at 75% lightness (instead of 95%) for better dark theme usability</li>
                <li>• <strong>Mathematical consistency:</strong> Standard colors use unified 75% → 10% lightness progression with 10% steps</li>
                <li>• <strong>Anchor levels (⚓):</strong> Current colors moved to level 300 for expansion room</li>
                <li>• <strong>Grey system:</strong> Iron (dark foundation) vs Stone (light utility) for comprehensive coverage</li>
              </ul>
            </div>
          </div>
          
          {/* Background Hierarchy */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">Background Hierarchy</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {backgroundColors.map((color) => (
                <ColorSwatch key={color.var} {...color} />
              ))}
            </div>
          </div>

          {/* Legacy Context Colors */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">Legacy Context Colors</h2>
            <p className="text-gray-400 text-sm mb-4">Legacy semantic colors - use primitive color scales above for new implementations</p>
            
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
        </TabsContent>

        <TabsContent value="typography">
          {/* Typography */}
          <div className="mb-8">
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
              <p className="text-gray-400 text-sm mb-4">Neumorphic border system with clear visual definition. Fixed to work with surface utilities.</p>
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
                    <p className="text-xs text-gray-400 mb-2">Sharp neumorphic style (2px)</p>
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
                  <h4 className="text-lg font-semibold text-white mb-2">Premium Neumorphic Style</h4>
                  <p className="text-sm text-gray-300 mb-3">Elevated surface with sharp definition</p>
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
        </TabsContent>
      </Tabs>
      
      {/* Implementation Reference */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">📚 Implementation Reference</h2>
        <Card variant="elevated" className="p-6">
          <h3 className="text-lg font-medium text-white mb-4">Design Token Integration</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-norse-gold font-medium mb-2">CSS Custom Properties:</h4>
              <ul className="space-y-1 text-sm text-gray-300">
                <li>• <code className="text-xs bg-neu-surface px-2 py-1 rounded">--norse-gold</code> - Primary accent</li>
                <li>• <code className="text-xs bg-neu-surface px-2 py-1 rounded">--neu-surface</code> - Card backgrounds</li>
                <li>• <code className="text-xs bg-neu-surface px-2 py-1 rounded">--shadow-neu-*</code> - Depth shadows</li>
                <li>• <code className="text-xs bg-neu-surface px-2 py-1 rounded">--gradient-neu-*</code> - Surface gradients</li>
              </ul>
            </div>
            <div>
              <h4 className="text-norse-gold font-medium mb-2">Component Usage:</h4>
              <ul className="space-y-1 text-sm text-gray-300">
                <li>• Import unified Card component</li>
                <li>• Use depth/surface/border props</li>
                <li>• Follow Norse neumorphic patterns</li>
                <li>• Maintain accessibility standards</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}