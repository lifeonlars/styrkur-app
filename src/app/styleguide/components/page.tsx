'use client'

import { useState } from 'react'
import { Button } from '@/ui/button'
import { Input } from '@/ui/input'
import { Textarea } from '@/ui/textarea'
import { ComponentShowcase } from '@/components/styleguide/StyleGuideComponents'
import { Plus, Settings, Heart, Trash2, Check, X, Star, Clock, Calendar, User, Dumbbell, Target } from 'lucide-react'

export default function ComponentsPage() {
  const [activeSubsection, setActiveSubsection] = useState('overview')

  const subsections = [
    { id: 'overview', label: 'Overview' },
    { id: 'buttons', label: 'Buttons' },
    { id: 'cards', label: 'Cards' },
    { id: 'forms', label: 'Forms' },
    { id: 'tabs', label: 'Tabs' },
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

                <div className="p-6 bg-neu-surface shadow-neu rounded-xl">
                  <h4 className="text-white font-medium mb-4">Enhanced Form Example</h4>
                  <p className="text-gray-400 text-sm mb-4">Real-world form using semantic class names and enhanced features</p>
                  <div className="space-y-4 max-w-md">
                    <Input placeholder="Email address" fullWidth />
                    <Input type="password" placeholder="Password" fullWidth />
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

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Radio Buttons */}
                  <div className="p-6 bg-neu-surface shadow-neu rounded-xl">
                    <h4 className="text-white font-medium mb-4">Radio Buttons</h4>
                    <p className="text-gray-400 text-sm mb-4">Single selection from multiple options</p>
                    <div className="space-y-3">
                      {/* Selected */}
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <input type="radio" checked readOnly className="sr-only" id="radio-selected" name="radio-example" />
                          <div className="w-5 h-5 bg-norse-gold rounded-full shadow-neu-gold flex items-center justify-center">
                            <div className="w-2 h-2 bg-black rounded-full"></div>
                          </div>
                        </div>
                        <label htmlFor="radio-selected" className="text-white text-sm font-medium">Selected option</label>
                      </div>

                      {/* Unselected */}
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <input type="radio" readOnly className="sr-only" id="radio-unselected" name="radio-example" />
                          <div className="w-5 h-5 bg-neu-card border border-gray-600 rounded-full shadow-neu-inset"></div>
                        </div>
                        <label htmlFor="radio-unselected" className="text-white text-sm font-medium">Unselected option</label>
                      </div>

                      {/* Disabled */}
                      <div className="flex items-center space-x-3 opacity-50">
                        <div className="relative">
                          <input type="radio" disabled readOnly className="sr-only" id="radio-disabled" name="radio-example" />
                          <div className="w-5 h-5 bg-gray-700 border border-gray-600 rounded-full"></div>
                        </div>
                        <label htmlFor="radio-disabled" className="text-gray-400 text-sm">Disabled option</label>
                      </div>
                    </div>
                  </div>

                  {/* Toggle Switches */}
                  <div className="p-6 bg-neu-surface shadow-neu rounded-xl">
                    <h4 className="text-white font-medium mb-4">Toggle Switches</h4>
                    <p className="text-gray-400 text-sm mb-4">Binary on/off controls</p>
                    <div className="space-y-4">
                      {/* Toggle On */}
                      <div className="flex items-center justify-between">
                        <label className="text-white text-sm font-medium">Enable notifications</label>
                        <div className="relative">
                          <input type="checkbox" checked readOnly className="sr-only" id="toggle-on" />
                          <div className="w-11 h-6 bg-norse-gold rounded-full shadow-neu-gold flex items-center transition-all duration-200">
                            <div className="w-5 h-5 bg-black rounded-full shadow-neu transform translate-x-5 transition-transform duration-200"></div>
                          </div>
                        </div>
                      </div>

                      {/* Toggle Off */}
                      <div className="flex items-center justify-between">
                        <label className="text-white text-sm font-medium">Dark mode</label>
                        <div className="relative">
                          <input type="checkbox" readOnly className="sr-only" id="toggle-off" />
                          <div className="w-11 h-6 bg-neu-card shadow-neu-inset rounded-full flex items-center transition-all duration-200">
                            <div className="w-5 h-5 bg-gray-600 rounded-full shadow-neu transform translate-x-0 transition-transform duration-200"></div>
                          </div>
                        </div>
                      </div>

                      {/* Toggle Disabled */}
                      <div className="flex items-center justify-between opacity-50">
                        <label className="text-gray-400 text-sm">Experimental features</label>
                        <div className="relative">
                          <input type="checkbox" disabled readOnly className="sr-only" id="toggle-disabled" />
                          <div className="w-11 h-6 bg-gray-700 rounded-full flex items-center">
                            <div className="w-5 h-5 bg-gray-600 rounded-full"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Select Dropdown */}
                <div className="p-6 bg-neu-surface shadow-neu rounded-xl">
                  <h4 className="text-white font-medium mb-4">Select Dropdown</h4>
                  <p className="text-gray-400 text-sm mb-4">Single selection from dropdown list</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Default Select */}
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">Workout Type</label>
                      <div className="relative">
                        <select className="w-full px-3 py-2 bg-neu-card text-white border border-gray-600 rounded-lg shadow-neu-inset focus:outline-none focus:ring-2 focus:ring-norse-gold appearance-none">
                          <option>Select workout type...</option>
                          <option>Strength Training</option>
                          <option>Cardio</option>
                          <option>Flexibility</option>
                          <option>Sports</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Large Select */}
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">Equipment</label>
                      <div className="relative">
                        <select className="w-full px-4 py-3 bg-neu-card text-white border border-gray-600 rounded-lg shadow-neu-inset focus:outline-none focus:ring-2 focus:ring-norse-gold appearance-none text-lg">
                          <option>Select equipment...</option>
                          <option>Dumbbells</option>
                          <option>Barbell</option>
                          <option>Bodyweight</option>
                          <option>Machines</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Checkboxes - Moved from UI Elements */}
                <div className="p-6 bg-neu-surface shadow-neu rounded-xl">
                  <h4 className="text-white font-medium mb-4">Checkboxes</h4>
                  <p className="text-gray-400 text-sm mb-4">Multiple selection options</p>
                  <div className="space-y-3">
                    {/* Checked */}
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <input 
                          type="checkbox" 
                          checked 
                          readOnly
                          className="sr-only" 
                          id="checkbox-checked-forms"
                        />
                        <div className="w-5 h-5 bg-norse-gold text-black rounded shadow-neu-gold flex items-center justify-center">
                          <Check className="w-3 h-3" />
                        </div>
                      </div>
                      <label htmlFor="checkbox-checked-forms" className="text-white text-sm font-medium">
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
                          id="checkbox-unchecked-forms"
                        />
                        <div className="w-5 h-5 bg-neu-card border border-gray-600 rounded shadow-neu-inset">
                        </div>
                      </div>
                      <label htmlFor="checkbox-unchecked-forms" className="text-white text-sm font-medium">
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
                          id="checkbox-disabled-forms"
                        />
                        <div className="w-5 h-5 bg-gray-700 border border-gray-600 rounded">
                        </div>
                      </div>
                      <label htmlFor="checkbox-disabled-forms" className="text-gray-400 text-sm">
                        Disabled state
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </ComponentShowcase>
          </div>
        )

      case 'tabs':
        return (
          <div className="space-y-8">
            <ComponentShowcase title="Tabs - Navigation Component">
              <div className="space-y-6 p-6 bg-neu-surface shadow-neu rounded-xl">
                <div>
                  <h4 className="text-white font-medium mb-4">Default Tabs</h4>
                  <p className="text-gray-400 text-sm mb-4">Based on current styleguide secondary navigation pattern</p>
                  
                  {/* Tab Navigation */}
                  <div className="flex flex-wrap gap-2 p-2 bg-neu-surface shadow-neu rounded-xl mb-4">
                    <button className="px-4 py-2 rounded-lg text-sm font-medium bg-norse-gold text-black shadow-neu-gold">
                      Active Tab
                    </button>
                    <button className="px-4 py-2 rounded-lg text-sm font-medium bg-neu-surface text-gray-300 hover:text-white hover:shadow-neu transition-all duration-200">
                      Default Tab
                    </button>
                    <button className="px-4 py-2 rounded-lg text-sm font-medium bg-neu-surface text-gray-300 hover:text-white hover:shadow-neu transition-all duration-200">
                      Another Tab
                    </button>
                    <button className="px-4 py-2 rounded-lg text-sm font-medium bg-neu-surface text-gray-400 opacity-50 cursor-not-allowed">
                      Disabled Tab
                    </button>
                  </div>

                  {/* Tab Content */}
                  <div className="p-4 bg-neu-card shadow-neu-inset rounded-xl">
                    <h5 className="text-white font-medium mb-2">Active Tab Content</h5>
                    <p className="text-gray-300 text-sm">This content corresponds to the currently active tab. Tab content should be contained within a sunken container to show the relationship.</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-white font-medium mb-4">Tab States Reference</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <h5 className="text-norse-gold font-medium mb-2">CSS Classes:</h5>
                      <ul className="text-xs text-gray-400 space-y-1 font-mono">
                        <li>• .tab (base component)</li>
                        <li>• .tab--active (Norse gold)</li>
                        <li>• .tab--disabled (reduced opacity)</li>
                        <li>• .tab__content (sunken container)</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-norse-gold font-medium mb-2">Usage Notes:</h5>
                      <ul className="text-xs text-gray-400 space-y-1">
                        <li>• Only one active tab at a time</li>
                        <li>• Content shows in sunken container</li>
                        <li>• Hover effects on inactive tabs only</li>
                        <li>• Disabled tabs are non-interactive</li>
                      </ul>
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
            {/* Refactoring Notice */}
            <div className="p-4 bg-wood-500/10 border border-wood-500/20 rounded-xl">
              <h3 className="text-wood-400 font-medium mb-2">🔄 Future Refactoring</h3>
              <p className="text-wood-400 text-sm">
                These components will be converted to the utility system in a future update. Currently kept for reference and legacy compatibility.
              </p>
            </div>

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