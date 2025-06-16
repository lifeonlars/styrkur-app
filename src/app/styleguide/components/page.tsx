'use client'

import { useState } from 'react'
import { Button } from '@/ui/button'
import { Input } from '@/ui/input'
import { Textarea } from '@/ui/textarea'
import { ComponentShowcase } from '@/components/styleguide/StyleGuideComponents'
import { Plus, Settings, Heart, Share, Download, Edit, Trash2, Search, Check, X, Star, Clock, Calendar, User, Dumbbell, Target } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/ui/select'

export default function ComponentsPage() {
  const [activeSubsection, setActiveSubsection] = useState('overview')

  const subsections = [
    { id: 'overview', label: 'Overview' },
    { id: 'buttons', label: 'Buttons' },
    { id: 'cards', label: 'Cards' },
    { id: 'forms', label: 'Forms' },
    { id: 'ui-elements', label: 'UI Elements' },
  ]

  const renderContent = () => {
    switch (activeSubsection) {
      case 'overview':
        return (
          <div className="space-y-8">
            <div className="p-6 bg-neu-card shadow-neu-lg rounded-xl border border-norse-gold/20">
              <h3 className="text-xl font-semibold text-white mb-4">🎯 CSS Modules Refactor Complete</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-norse-gold font-medium mb-3">✅ Before & After</h4>
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="text-white font-medium">Before (Tailwind):</p>
                      <code className="text-xs text-gray-400 break-all">
                        "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all duration-200 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 rounded-neu-pill shadow-neu-gold bg-gradient-to-br from-norse-gold-light via-norse-gold to-norse-gold-dark border-2 border-norse-gold-light/30..."
                      </code>
                    </div>
                    <div>
                      <p className="text-white font-medium">After (CSS Modules):</p>
                      <code className="text-norse-gold text-sm">
                        "btn btn-primary btn-default"
                      </code>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-norse-gold font-medium mb-3">🚀 Key Benefits</h4>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li>• <strong>90% reduction</strong> in class name verbosity</li>
                    <li>• <strong>Single source of truth</strong> via CSS custom properties</li>
                    <li>• <strong>Semantic class names</strong> for better debugging</li>
                    <li>• <strong>Enhanced component features</strong> with clean props</li>
                    <li>• <strong>Maintained accessibility</strong> and TypeScript support</li>
                    <li>• <strong>Perfect alignment system</strong> via design tokens</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )

      case 'buttons':
        return (
          <div className="space-y-8">
            <ComponentShowcase title="Button System - BEM + CSS Modules Approach">
              <div className="space-y-6 p-6 bg-neu-surface shadow-neu rounded-xl">
                <div>
                  <h4 className="text-white font-medium mb-2">Clean, Semantic Class Names</h4>
                  <p className="text-gray-400 text-sm mb-4">Replaced verbose Tailwind utilities with maintainable BEM-style classes</p>
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-4">
                      <Button variant="primary">Primary Action</Button>
                      <Button variant="outline">Secondary Action</Button>
                      <Button variant="flat">Tertiary Action</Button>
                    </div>
                    <div className="text-xs text-gray-500 space-y-1">
                      <p>HTML Output: <code className="text-norse-gold">&lt;button class="btn btn-primary btn-default"&gt;</code></p>
                      <p>Previously: <code className="text-gray-400">50+ utility classes</code></p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-white font-medium mb-2">Minimalist Approach</h4>
                  <p className="text-gray-400 text-sm mb-4">Three essential variants only - states conveyed through icons and toasts</p>
                  <div className="flex flex-wrap gap-4">
                    <Button variant="primary"><Check className="w-4 h-4" />Success Action</Button>
                    <Button variant="outline"><X className="w-4 h-4" />Cancel Action</Button>
                    <Button variant="flat"><Trash2 className="w-4 h-4" />Delete</Button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Icons and toasts provide context - buttons remain semantically clean</p>
                </div>
                
                <div>
                  <h4 className="text-white font-medium mb-2">Size System with Icon Variants</h4>
                  <p className="text-gray-400 text-sm mb-4">Perfect alignment system with dedicated icon button sizes</p>
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-4 items-center">
                      <Button variant="primary" size="default">Default (36px)</Button>
                      <Button variant="primary" size="icon"><Plus className="w-4 h-4" /></Button>
                      <Button variant="outline" size="icon"><Settings className="w-4 h-4" /></Button>
                    </div>
                    <div className="flex flex-wrap gap-4 items-center">
                      <Button variant="primary" size="large">Large (48px)</Button>
                      <Button variant="primary" size="icon-large"><Heart className="w-5 h-5" /></Button>
                      <Button variant="outline" size="icon-large"><X className="w-5 h-5" /></Button>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-white font-medium mb-2">Enhanced Props System</h4>
                  <p className="text-gray-400 text-sm mb-4">New component features with clean prop-based styling</p>
                  <div className="space-y-3">
                    <div className="flex gap-4">
                      <Button variant="primary" fullWidth>Full Width Button</Button>
                    </div>
                    <div className="flex gap-4">
                      <Button variant="primary" loading>Loading State</Button>
                      <Button variant="outline" disabled>Disabled State</Button>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-white font-medium mb-2">Perfect Form Alignment</h4>
                  <p className="text-gray-400 text-sm mb-4">CSS custom properties ensure exact height matching</p>
                  <div className="space-y-4 max-w-md">
                    <div className="flex gap-2">
                      <Input placeholder="Default input (36px)" />
                      <Button variant="primary">Submit</Button>
                    </div>
                    <div className="flex gap-2">
                      <Input inputSize="large" placeholder="Large input (48px)" />
                      <Button variant="primary" size="large">Submit</Button>
                    </div>
                  </div>
                </div>
              </div>
            </ComponentShowcase>
          </div>
        )

      case 'cards':
        return (
          <div className="space-y-8">
            <ComponentShowcase title="Card Component - Depth Utility System">
              <div className="space-y-8">
                <div className="p-6 bg-neu-surface shadow-neu rounded-xl border border-ocean-500/20">
                  <h4 className="text-ocean-400 font-medium mb-3">📚 Utility System Reference</h4>
                  <p className="text-gray-300 text-sm mb-4">
                    The card component uses the complete utility system for depth, surface, and border styling. 
                    For detailed utility documentation and examples, see the 
                    <a href="/styleguide/foundations" className="text-norse-gold hover:text-norse-gold-light underline ml-1">
                      Foundations section
                    </a>.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <h5 className="text-white font-medium mb-2">Depth Utilities:</h5>
                      <ul className="text-xs text-gray-400 space-y-1">
                        <li>• depth-flat (no shadows)</li>
                        <li>• depth-subtle (standard)</li>
                        <li>• depth-sunken (inset)</li>
                        <li>• depth-elevated (prominent)</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-white font-medium mb-2">Surface Utilities:</h5>
                      <ul className="text-xs text-gray-400 space-y-1">
                        <li>• surface-flat (minimal)</li>
                        <li>• surface-convex (raised)</li>
                        <li>• surface-concave (inset)</li>
                        <li>• surface-gold (Norse accent)</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-white font-medium mb-2">Border Utilities:</h5>
                      <ul className="text-xs text-gray-400 space-y-1">
                        <li>• border-transparent</li>
                        <li>• border-neu-subtle</li>
                        <li>• border-neu-crisp (2px)</li>
                        <li>• border-neu-glow (blue)</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-white font-medium mb-4">📦 9-Card Archetype System</h4>
                  <p className="text-gray-400 text-sm mb-6">Complete utility combination reference showcasing proper depth + surface + border combinations for consistent neumorphic styling.</p>
                  
                  {/* Sunken Cards */}
                  <div className="mb-8">
                    <h5 className="text-white font-medium mb-3">Sunken Cards</h5>
                    <p className="text-gray-400 text-sm mb-4">Pressed into surface</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="depth-sunken surface-concave" style={{borderRadius: '1.5rem', padding: '1.5rem'}}>
                        <h3 className="text-white font-semibold mb-2">Sunken Concave</h3>
                        <p className="text-gray-300 text-sm mb-3">Pressed buttons, input fields</p>
                        <span className="utility-combo">depth-sunken + surface-concave</span>
                      </div>
                      
                      <div className="depth-sunken border-transparent" style={{borderRadius: '1.5rem', padding: '1.5rem'}}>
                        <h3 className="text-white font-semibold mb-2">Sunken Transparent</h3>
                        <p className="text-gray-300 text-sm mb-3">Form containers, content wells</p>
                        <span className="utility-combo">depth-sunken + border-transparent</span>
                      </div>
                    </div>
                  </div>

                  {/* Flat Cards */}
                  <div className="mb-8">
                    <h5 className="text-white font-medium mb-3">Flat Cards</h5>
                    <p className="text-gray-400 text-sm mb-4">Level with surface</p>
                    <div className="grid grid-cols-1 gap-4">
                      <div className="depth-flat surface-flat" style={{borderRadius: '1.5rem', padding: '1.5rem'}}>
                        <h3 className="text-white font-semibold mb-2">Flat</h3>
                        <p className="text-gray-300 text-sm mb-3">Background grouping, sidebars</p>
                        <span className="utility-combo">depth-flat + surface-flat</span>
                      </div>
                    </div>
                  </div>

                  {/* Subtle Cards */}
                  <div className="mb-8">
                    <h5 className="text-white font-medium mb-3">Subtle Cards</h5>
                    <p className="text-gray-400 text-sm mb-4">Barely emerging from surface</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="depth-subtle surface-convex border-neu-subtle" style={{borderRadius: '1.5rem', padding: '1.5rem'}}>
                        <h3 className="text-white font-semibold mb-2">Subtle Convex</h3>
                        <p className="text-gray-300 text-sm mb-3">Standard cards, containers</p>
                        <span className="utility-combo">depth-subtle + surface-convex + border-neu-subtle</span>
                      </div>
                      
                      <div className="depth-subtle surface-concave border-neu-subtle" style={{borderRadius: '1.5rem', padding: '1.5rem'}}>
                        <h3 className="text-white font-semibold mb-2">Subtle Concave</h3>
                        <p className="text-gray-300 text-sm mb-3">Secondary buttons, panels</p>
                        <span className="utility-combo">depth-subtle + surface-concave + border-neu-subtle</span>
                      </div>
                    </div>
                  </div>

                  {/* Elevated Cards */}
                  <div className="mb-8">
                    <h5 className="text-white font-medium mb-3">Elevated Cards</h5>
                    <p className="text-gray-400 text-sm mb-4">Prominently emerging from surface</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="depth-elevated surface-convex border-neu-crisp" style={{borderRadius: '1.5rem', padding: '1.5rem'}}>
                        <h3 className="text-white font-semibold mb-2">Elevated Convex</h3>
                        <p className="text-gray-300 text-sm mb-3">Featured content, hero cards</p>
                        <span className="utility-combo">depth-elevated + surface-convex + border-neu-crisp</span>
                      </div>
                      
                      <div className="depth-elevated surface-concave border-neu-crisp" style={{borderRadius: '1.5rem', padding: '1.5rem'}}>
                        <h3 className="text-white font-semibold mb-2">Elevated Concave</h3>
                        <p className="text-gray-300 text-sm mb-3">Specialized inputs, unique states</p>
                        <span className="utility-combo">depth-elevated + surface-concave + border-neu-crisp</span>
                      </div>
                    </div>
                  </div>

                  {/* Special Cards */}
                  <div className="mb-8">
                    <h5 className="text-white font-medium mb-3">Special Cards</h5>
                    <p className="text-gray-400 text-sm mb-4">Primary actions and interactive states</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="depth-elevated surface-gold border-neu-crisp" style={{borderRadius: '1.5rem', padding: '1.5rem'}}>
                        <h3 className="font-semibold mb-2">Gold Primary</h3>
                        <p className="text-sm mb-3">Primary actions, CTA elements</p>
                        <span className="utility-combo" style={{color: 'rgba(0, 0, 0, 0.6)', background: 'rgba(255, 255, 255, 0.2)'}}>depth-elevated + surface-gold + border-neu-crisp</span>
                      </div>
                      
                      <div className="depth-subtle surface-convex border-neu-glow hover:transform hover:-translate-y-1 transition-all duration-200" style={{borderRadius: '1.5rem', padding: '1.5rem', cursor: 'pointer'}}>
                        <h3 className="text-white font-semibold mb-2">Interactive Glow</h3>
                        <p className="text-gray-300 text-sm mb-3">Hover states, active selections</p>
                        <span className="utility-combo">depth-subtle + surface-convex + border-neu-glow + hover</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ComponentShowcase>
          </div>
        )

      case 'forms':
        return (
          <div className="space-y-8">
            <ComponentShowcase title="Form Components - Enhanced with CSS Modules">
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="p-6 bg-neu-surface shadow-neu rounded-xl">
                    <h4 className="text-white font-medium mb-4">Input States - Essential for Accessibility</h4>
                    <p className="text-gray-400 text-xs mb-4">Form validation states are kept for accessibility and UX - different from button context variants</p>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-white mb-2">Default Input</label>
                        <Input placeholder="Default input (.input .input-default)" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-white mb-2">Large Input</label>
                        <Input inputSize="large" placeholder="Large input (.input .input-large)" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-white mb-2">Success State</label>
                        <Input variant="success" placeholder="Valid email format" />
                        <p className="text-xs text-forest-400 mt-1">✓ Form validation feedback</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-white mb-2">Error State</label>
                        <Input variant="error" placeholder="Invalid email format" />
                        <p className="text-xs text-blood-400 mt-1">✗ Required for accessibility</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-white mb-2">Warning State</label>
                        <Input variant="warning" placeholder="Password too weak" />
                        <p className="text-xs text-wood-400 mt-1">⚠ UX guidance feedback</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 bg-neu-surface shadow-neu rounded-xl">
                    <h4 className="text-white font-medium mb-4">Textarea Enhanced Features</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-white mb-2">Default Textarea</label>
                        <Textarea placeholder="Default textarea (.textarea .textarea-default)" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-white mb-2">Large with Counter</label>
                        <Textarea 
                          size="large" 
                          placeholder="Large textarea with character counter..." 
                          showCounter 
                          maxLength={200}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-white mb-2">Resizable Textarea</label>
                        <Textarea 
                          resize="vertical" 
                          placeholder="Resizable textarea (.textarea .textarea-resizable)" 
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-white mb-2">Compact Size</label>
                        <Textarea 
                          size="compact" 
                          placeholder="Compact textarea (.textarea .textarea-compact)" 
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Select Dropdown - Enhanced with Size and State Variants */}
                <div className="p-6 bg-neu-surface shadow-neu rounded-xl">
                  <h4 className="text-white font-medium mb-4">Select Dropdown - Enhanced</h4>
                  <p className="text-gray-400 text-sm mb-4">
                    Select component with size variants and state management, styled to match Input/Textarea exactly using design tokens.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Default Size Examples */}
                    <div className="space-y-4">
                      <h5 className="text-white font-medium mb-2">Default Size (36px)</h5>
                      
                      {/* Default State */}
                      <div>
                        <label className="block text-sm font-medium text-white mb-2">Workout Type</label>
                        <Select>
                          <SelectTrigger size="default" variant="default">
                            <SelectValue placeholder="Select workout type..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="strength">Strength Training</SelectItem>
                            <SelectItem value="cardio">Cardio</SelectItem>
                            <SelectItem value="flexibility">Flexibility</SelectItem>
                            <SelectItem value="sports">Sports</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Error State */}
                      <div>
                        <label className="block text-sm font-medium text-white mb-2">Required Selection</label>
                        <Select>
                          <SelectTrigger size="default" variant="error">
                            <SelectValue placeholder="Please select an option..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="option1">Option 1</SelectItem>
                            <SelectItem value="option2">Option 2</SelectItem>
                          </SelectContent>
                        </Select>
                        <p className="text-xs text-blood-400 mt-1">✗ This field is required</p>
                      </div>

                      {/* Success State */}
                      <div>
                        <label className="block text-sm font-medium text-white mb-2">Validated Selection</label>
                        <Select>
                          <SelectTrigger size="default" variant="success">
                            <SelectValue placeholder="Valid selection made" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="valid">Valid Option</SelectItem>
                          </SelectContent>
                        </Select>
                        <p className="text-xs text-forest-400 mt-1">✓ Selection validated</p>
                      </div>
                    </div>

                    {/* Large Size Examples */}
                    <div className="space-y-4">
                      <h5 className="text-white font-medium mb-2">Large Size (48px)</h5>
                      
                      {/* Large Default */}
                      <div>
                        <label className="block text-sm font-medium text-white mb-2">Equipment</label>
                        <Select>
                          <SelectTrigger size="large" variant="default">
                            <SelectValue placeholder="Select equipment..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="dumbbells">Dumbbells</SelectItem>
                            <SelectItem value="barbell">Barbell</SelectItem>
                            <SelectItem value="bodyweight">Bodyweight</SelectItem>
                            <SelectItem value="machines">Machines</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Large Warning */}
                      <div>
                        <label className="block text-sm font-medium text-white mb-2">Advanced Selection</label>
                        <Select>
                          <SelectTrigger size="large" variant="warning">
                            <SelectValue placeholder="Advanced option..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="advanced1">Advanced Option 1</SelectItem>
                            <SelectItem value="advanced2">Advanced Option 2</SelectItem>
                          </SelectContent>
                        </Select>
                        <p className="text-xs text-wood-400 mt-1">⚠ Advanced users only</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-neu-card rounded-lg">
                    <h5 className="text-white font-medium mb-2">Dropdown Improvements</h5>
                    <ul className="text-xs text-gray-400 space-y-1">
                      <li>• Select component matches Input/Textarea shadow depth exactly</li>
                      <li>• Size variants align with form component system (36px/48px)</li>
                      <li>• Fixed content shifting using modal={false} and proper positioning</li>
                      <li>• Width automatically matches trigger using CSS custom properties</li>
                      <li>• Uses standard shadcn/ui positioning approach for reliability</li>
                      <li>• Maintains neumorphic design with design token integration</li>
                    </ul>
                  </div>
                </div>

                <div className="p-6 bg-neu-surface shadow-neu rounded-xl">
                  <h4 className="text-white font-medium mb-4">Enhanced Form Example</h4>
                  <p className="text-gray-400 text-sm mb-4">Real-world form with unified visual consistency across all form components</p>
                  <div className="space-y-4 max-w-md">
                    <Input placeholder="Email address" fullWidth />
                    <Input type="password" placeholder="Password" fullWidth />
                    <Select>
                      <SelectTrigger size="default" variant="default">
                        <SelectValue placeholder="Account type..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="personal">Personal</SelectItem>
                        <SelectItem value="business">Business</SelectItem>
                        <SelectItem value="enterprise">Enterprise</SelectItem>
                      </SelectContent>
                    </Select>
                    <Textarea 
                      placeholder="Optional message..." 
                      showCounter 
                      maxLength={150}
                      fullWidth
                    />
                    <div className="flex gap-2">
                      <Button variant="primary" fullWidth>Sign Up</Button>
                      <Button variant="outline">Cancel</Button>
                    </div>
                  </div>
                </div>
              </div>
            </ComponentShowcase>
          </div>
        )

      case 'ui-elements':
        return (
          <div className="space-y-8">
            <ComponentShowcase title="Action Buttons">
              <div className="flex flex-wrap gap-4 p-6 bg-neu-surface shadow-neu rounded-xl">
                <button className="p-2 bg-neu-surface shadow-neu rounded-lg hover:shadow-neu-hover active:shadow-neu-pressed transition-all duration-200">
                  <Edit className="w-5 h-5 text-gray-300" />
                </button>
                <button className="p-2 bg-ocean-500 shadow-neu rounded-lg hover:bg-ocean-400 hover:shadow-neu-hover active:shadow-neu-pressed transition-all duration-200">
                  <Share className="w-5 h-5 text-white" />
                </button>
                <button className="p-2 bg-forest-500 shadow-neu rounded-lg hover:bg-forest-400 hover:shadow-neu-hover active:shadow-neu-pressed transition-all duration-200">
                  <Download className="w-5 h-5 text-white" />
                </button>
                <button className="p-2 bg-blood-500 shadow-neu rounded-lg hover:bg-blood-400 hover:shadow-neu-hover active:shadow-neu-pressed transition-all duration-200">
                  <Trash2 className="w-5 h-5 text-white" />
                </button>
              </div>
            </ComponentShowcase>

            <ComponentShowcase title="Status Indicators">
              <div className="flex flex-wrap gap-4 p-6 bg-neu-surface shadow-neu rounded-xl">
                <div className="flex items-center space-x-2 px-3 py-2 bg-forest-500 text-white shadow-neu rounded-lg">
                  <Check className="w-4 h-4" />
                  <span className="text-sm font-medium">Success</span>
                </div>
                <div className="flex items-center space-x-2 px-3 py-2 bg-blood-500 text-white shadow-neu rounded-lg">
                  <X className="w-4 h-4" />
                  <span className="text-sm font-medium">Error</span>
                </div>
                <div className="flex items-center space-x-2 px-3 py-2 bg-wood-500 text-white shadow-neu rounded-lg">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm font-medium">Warning</span>
                </div>
                <div className="flex items-center space-x-2 px-3 py-2 bg-ocean-500 text-white shadow-neu rounded-lg">
                  <Search className="w-4 h-4" />
                  <span className="text-sm font-medium">Info</span>
                </div>
                <div className="flex items-center space-x-2 px-3 py-2 bg-iron-500 text-gray-300 shadow-neu rounded-lg">
                  <Settings className="w-4 h-4" />
                  <span className="text-sm font-medium">Neutral</span>
                </div>
              </div>
            </ComponentShowcase>

            <ComponentShowcase title="Checkboxes">
              <div className="space-y-4 p-6 bg-neu-surface shadow-neu rounded-xl max-w-md">
                {/* Checked */}
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <input 
                      type="checkbox" 
                      checked 
                      readOnly
                      className="sr-only" 
                      id="checkbox-checked"
                    />
                    <div className="w-5 h-5 bg-norse-gold text-black rounded shadow-neu-gold flex items-center justify-center">
                      <Check className="w-3 h-3" />
                    </div>
                  </div>
                  <label htmlFor="checkbox-checked" className="text-white text-sm font-medium">
                    Checked state
                  </label>
                </div>
                
                {/* Unchecked */}
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <input 
                      type="checkbox" 
                      readOnly
                      className="sr-only" 
                      id="checkbox-unchecked"
                    />
                    <div className="w-5 h-5 bg-neu-card border border-gray-600 rounded shadow-neu-inset">
                    </div>
                  </div>
                  <label htmlFor="checkbox-unchecked" className="text-white text-sm font-medium">
                    Unchecked state
                  </label>
                </div>
                
                {/* Disabled */}
                <div className="flex items-center space-x-3 opacity-50">
                  <div className="relative">
                    <input 
                      type="checkbox" 
                      disabled 
                      readOnly
                      className="sr-only" 
                      id="checkbox-disabled"
                    />
                    <div className="w-5 h-5 bg-gray-700 border border-gray-600 rounded">
                    </div>
                  </div>
                  <label htmlFor="checkbox-disabled" className="text-gray-400 text-sm">
                    Disabled state
                  </label>
                </div>
              </div>
            </ComponentShowcase>

            <ComponentShowcase title="Chips">
              <div className="space-y-4 p-6 bg-neu-surface shadow-neu rounded-xl">
                <div className="flex flex-wrap gap-2">
                  <div className="flex items-center space-x-2 px-3 py-1 bg-norse-gold text-black rounded-full shadow-neu-gold text-sm font-medium">
                    <Star className="w-3 h-3" />
                    <span>Featured</span>
                  </div>
                  <div className="flex items-center space-x-2 px-3 py-1 bg-neu-card text-gray-300 rounded-full shadow-neu text-sm">
                    <Dumbbell className="w-3 h-3" />
                    <span>Strength</span>
                  </div>
                  <div className="flex items-center space-x-2 px-3 py-1 bg-neu-card text-gray-300 rounded-full shadow-neu text-sm">
                    <Target className="w-3 h-3" />
                    <span>Cardio</span>
                  </div>
                  <div className="flex items-center space-x-2 px-3 py-1 bg-neu-card text-gray-300 rounded-full shadow-neu text-sm">
                    <Clock className="w-3 h-3" />
                    <span>30 min</span>
                    <button className="text-gray-400 hover:text-white">
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                </div>
                <div className="text-xs text-gray-400">Removable chip example with close button</div>
              </div>
            </ComponentShowcase>

            <ComponentShowcase title="Icon Variations">
              <div className="space-y-4 p-6 bg-neu-surface shadow-neu rounded-xl">
                <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
                  {[
                    { icon: Star, name: 'Star' },
                    { icon: Heart, name: 'Heart' },
                    { icon: Calendar, name: 'Calendar' },
                    { icon: Clock, name: 'Clock' },
                    { icon: User, name: 'User' },
                    { icon: Settings, name: 'Settings' },
                    { icon: Dumbbell, name: 'Dumbbell' },
                    { icon: Target, name: 'Target' },
                  ].map(({ icon: Icon, name }) => (
                    <div key={name} className="flex flex-col items-center space-y-2">
                      <div className="p-3 bg-neu-card shadow-neu rounded-xl group hover:shadow-neu-hover transition-all duration-200">
                        <Icon className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" />
                      </div>
                      <span className="text-xs text-gray-400">{name}</span>
                    </div>
                  ))}
                </div>
                <div className="text-xs text-gray-400">Hover to see interactive states</div>
              </div>
            </ComponentShowcase>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white font-heading mb-2">Components</h1>
        <p className="text-gray-400">All components with states: hover, focus, active, disabled, loading</p>
      </div>

      {/* Secondary Navigation */}
      <div className="flex flex-wrap gap-2 p-2 bg-neu-surface shadow-neu rounded-xl">
        {subsections.map((subsection) => (
          <button
            key={subsection.id}
            onClick={() => setActiveSubsection(subsection.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeSubsection === subsection.id
                ? 'bg-norse-gold text-black shadow-neu-gold'
                : 'bg-neu-surface text-gray-300 hover:text-white hover:shadow-neu'
            }`}
          >
            {subsection.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="space-y-8">
        {renderContent()}
      </div>
    </div>
  )
}