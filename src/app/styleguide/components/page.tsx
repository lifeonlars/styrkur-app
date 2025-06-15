'use client'

import { useState } from 'react'
import { Button } from '@/ui/button'
import { Input } from '@/ui/input'
import { Textarea } from '@/ui/textarea'
import { ComponentShowcase } from '@/components/styleguide/StyleGuideComponents'
import { Plus, Settings, Heart, Edit, Check, X, Star, Clock, Calendar, User, Dumbbell, Target } from 'lucide-react'

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
            <ComponentShowcase title="Button System - Utility-Based Variants">
              <div className="space-y-6 p-6 bg-neu-surface shadow-neu rounded-xl">
                <div>
                  <h4 className="text-white font-medium mb-2">🎯 Three Essential Variants</h4>
                  <p className="text-gray-400 text-sm mb-4">Each variant maps to specific utility combinations following neumorphic physics</p>
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-4">
                      <Button variant="primary">Primary Action</Button>
                      <Button variant="outline">Secondary Action</Button>
                      <Button variant="flat">Tertiary Action</Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                      <div className="bg-black/20 p-3 rounded">
                        <p className="text-norse-gold font-medium mb-1">Primary Button</p>
                        <code className="text-gray-300">depth-elevated + surface-gold + border-crisp</code>
                        <p className="text-gray-400 mt-1">For main actions, CTAs</p>
                      </div>
                      <div className="bg-black/20 p-3 rounded">
                        <p className="text-white font-medium mb-1">Secondary Button</p>
                        <code className="text-gray-300">depth-subtle + surface-convex + border-subtle</code>
                        <p className="text-gray-400 mt-1">For secondary actions</p>
                      </div>
                      <div className="bg-black/20 p-3 rounded">
                        <p className="text-gray-300 font-medium mb-1">Tertiary Button</p>
                        <code className="text-gray-300">depth-flat + surface-flat + border-transparent</code>
                        <p className="text-gray-400 mt-1">For subtle actions</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-white font-medium mb-2">Context Through Icons</h4>
                  <p className="text-gray-400 text-sm mb-4">Buttons remain semantically clean - context provided by icons and toast feedback</p>
                  <div className="flex flex-wrap gap-4">
                    <Button variant="primary"><Check className="w-4 h-4" />Confirm Action</Button>
                    <Button variant="outline"><X className="w-4 h-4" />Cancel Action</Button>
                    <Button variant="flat"><Edit className="w-4 h-4" />Edit Mode</Button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">No "success", "danger", "warning" variants - states handled by icons + toasts</p>
                </div>
                
                <div>
                  <h4 className="text-white font-medium mb-2">Perfect Size System</h4>
                  <p className="text-gray-400 text-sm mb-4">Dedicated icon sizes maintain consistent alignment</p>
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-4 items-center">
                      <Button variant="primary" size="default">Default (36px)</Button>
                      <Button variant="primary" size="icon"><Plus className="w-4 h-4" /></Button>
                      <Button variant="outline" size="icon"><Settings className="w-4 h-4" /></Button>
                      <Button variant="flat" size="icon"><Heart className="w-4 h-4" /></Button>
                    </div>
                    <div className="flex flex-wrap gap-4 items-center">
                      <Button variant="primary" size="large">Large (48px)</Button>
                      <Button variant="primary" size="icon-large"><Plus className="w-5 h-5" /></Button>
                      <Button variant="outline" size="icon-large"><Settings className="w-5 h-5" /></Button>
                      <Button variant="flat" size="icon-large"><Heart className="w-5 h-5" /></Button>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-white font-medium mb-2">Enhanced Features</h4>
                  <p className="text-gray-400 text-sm mb-4">Clean props system with semantic class output</p>
                  <div className="space-y-3">
                    <div className="flex gap-4">
                      <Button variant="primary" fullWidth>Full Width Primary</Button>
                    </div>
                    <div className="flex gap-4">
                      <Button variant="primary" loading>Loading State</Button>
                      <Button variant="outline" disabled>Disabled State</Button>
                      <Button variant="flat" disabled>Disabled Flat</Button>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 mt-2">
                    <p>Output: <code className="text-norse-gold">btn btn-primary btn-default btn-loading</code></p>
                    <p>vs. Previous: <code className="text-gray-400">50+ utility classes</code></p>
                  </div>
                </div>

                <div>
                  <h4 className="text-white font-medium mb-2">Form Integration</h4>
                  <p className="text-gray-400 text-sm mb-4">Perfect height matching via CSS custom properties</p>
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
            <ComponentShowcase title="Card Utility Combinations - Complete Archetype System">
              <div className="space-y-8">
                <div className="p-6 bg-neu-surface shadow-neu rounded-xl border border-ocean-500/20">
                  <h4 className="text-ocean-400 font-medium mb-3">🎯 Utility Combination Focus</h4>
                  <p className="text-gray-300 text-sm mb-4">
                    Cards showcase proper utility combinations rather than custom variants. Each archetype demonstrates 
                    specific depth + surface + border combinations. For complete utility documentation, see the 
                    <a href="/styleguide/foundations" className="text-norse-gold hover:text-norse-gold-light underline ml-1">
                      Foundations section
                    </a>.
                  </p>
                </div>
                
                <div>
                  <h4 className="text-white font-medium mb-4">🔧 Standard Archetypes</h4>
                  <p className="text-gray-400 text-sm mb-4">Core utility combinations for most use cases</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Sunken Transparent */}
                    <div className="depth-sunken border-transparent p-6 rounded-xl bg-neu-card">
                      <h5 className="text-white font-medium mb-2">Sunken Transparent</h5>
                      <p className="text-xs text-gray-400 mb-3">Form containers, content wells</p>
                      <code className="text-xs text-norse-gold bg-black/20 px-2 py-1 rounded block">
                        depth-sunken + border-transparent
                      </code>
                    </div>
                    
                    {/* Sunken Concave */}
                    <div className="depth-sunken surface-concave border-transparent p-6 rounded-xl">
                      <h5 className="text-white font-medium mb-2">Sunken Concave</h5>
                      <p className="text-xs text-gray-400 mb-3">Pressed buttons, input fields</p>
                      <code className="text-xs text-norse-gold bg-black/20 px-2 py-1 rounded block">
                        depth-sunken + surface-concave
                      </code>
                    </div>
                    
                    {/* Flat */}
                    <div className="depth-flat surface-flat border-transparent p-6 rounded-xl bg-neu-card">
                      <h5 className="text-white font-medium mb-2">Flat Background</h5>
                      <p className="text-xs text-gray-400 mb-3">Background grouping, sidebars</p>
                      <code className="text-xs text-norse-gold bg-black/20 px-2 py-1 rounded block">
                        depth-flat + surface-flat
                      </code>
                    </div>
                    
                    {/* Subtle Convex */}
                    <div className="depth-subtle surface-convex border-neu-subtle p-6 rounded-xl bg-neu-card">
                      <h5 className="text-white font-medium mb-2">Subtle Convex</h5>
                      <p className="text-xs text-gray-400 mb-3">Standard cards, containers</p>
                      <code className="text-xs text-norse-gold bg-black/20 px-2 py-1 rounded block">
                        depth-subtle + surface-convex + border-subtle
                      </code>
                    </div>
                    
                    {/* Subtle Concave */}
                    <div className="depth-subtle surface-concave border-neu-subtle p-6 rounded-xl bg-neu-card">
                      <h5 className="text-white font-medium mb-2">Subtle Concave</h5>
                      <p className="text-xs text-gray-400 mb-3">Secondary buttons, panels</p>
                      <code className="text-xs text-norse-gold bg-black/20 px-2 py-1 rounded block">
                        depth-subtle + surface-concave + border-subtle
                      </code>
                    </div>
                    
                    {/* Elevated Convex */}
                    <div className="depth-elevated surface-convex border-neu-crisp p-6 rounded-xl bg-neu-card">
                      <h5 className="text-white font-medium mb-2">Elevated Convex</h5>
                      <p className="text-xs text-gray-400 mb-3">Featured content, hero cards</p>
                      <code className="text-xs text-norse-gold bg-black/20 px-2 py-1 rounded block">
                        depth-elevated + surface-convex + border-crisp
                      </code>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-white font-medium mb-4">✨ Premium Archetypes</h4>
                  <p className="text-gray-400 text-sm mb-4">Special combinations for primary actions and interactive elements</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Gold Primary */}
                    <div className="depth-elevated surface-gold border-neu-crisp p-6 rounded-xl">
                      <h5 className="text-lg font-semibold mb-2">Gold Primary</h5>
                      <p className="text-sm text-gray-700 mb-3">Primary actions, CTAs, brand elements</p>
                      <code className="text-xs text-gray-700 bg-black/10 px-2 py-1 rounded block">
                        depth-elevated + surface-gold + border-crisp
                      </code>
                    </div>
                    
                    {/* Interactive Glow */}
                    <div className="depth-subtle surface-convex border-neu-glow p-6 rounded-xl bg-neu-card">
                      <h5 className="text-white font-medium mb-2">Interactive Glow</h5>
                      <p className="text-xs text-gray-400 mb-3">Hover states, active selections</p>
                      <code className="text-xs text-norse-gold bg-black/20 px-2 py-1 rounded block">
                        depth-subtle + surface-convex + border-glow
                      </code>
                    </div>
                    
                    {/* Elevated Concave */}
                    <div className="depth-elevated surface-concave border-neu-crisp p-6 rounded-xl bg-neu-card">
                      <h5 className="text-white font-medium mb-2">Elevated Concave</h5>
                      <p className="text-xs text-gray-400 mb-3">Specialized inputs, unique states</p>
                      <code className="text-xs text-norse-gold bg-black/20 px-2 py-1 rounded block">
                        depth-elevated + surface-concave + border-crisp
                      </code>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-white font-medium mb-4">🎮 Interactive Examples</h4>
                  <p className="text-gray-400 text-sm mb-4">Real components using utility combinations</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Card with Content */}
                    <div className="depth-subtle surface-convex border-neu-subtle p-6 rounded-xl bg-neu-card">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-white mb-1">Workout Plan</h3>
                          <p className="text-sm text-gray-400">Morning Strength Session</p>
                        </div>
                        <button className="depth-flat surface-flat border-transparent p-2 rounded-lg hover:depth-subtle">
                          <Settings className="w-4 h-4 text-gray-400" />
                        </button>
                      </div>
                      <div className="depth-sunken surface-concave border-transparent p-4 rounded-lg mb-4">
                        <p className="text-sm text-gray-300">3 exercises • 45 minutes</p>
                        <p className="text-xs text-gray-500 mt-1">Next: Deadlifts</p>
                      </div>
                      <button className="depth-elevated surface-gold border-neu-crisp w-full py-2 rounded-lg font-medium">
                        Start Workout
                      </button>
                    </div>
                    
                    {/* Interactive States */}
                    <div className="space-y-4">
                      <div className="depth-flat surface-flat border-transparent p-4 rounded-xl bg-neu-card">
                        <h5 className="text-white font-medium mb-2">Flat State (Default)</h5>
                        <p className="text-xs text-gray-400">Background element, no interaction</p>
                      </div>
                      <div className="depth-subtle surface-convex border-neu-subtle p-4 rounded-xl bg-neu-card cursor-pointer">
                        <h5 className="text-white font-medium mb-2">Hover State</h5>
                        <p className="text-xs text-gray-400">Interactive element, subtle elevation</p>
                      </div>
                      <div className="depth-sunken surface-concave border-transparent p-4 rounded-xl bg-neu-card">
                        <h5 className="text-white font-medium mb-2">Active/Pressed State</h5>
                        <p className="text-xs text-gray-400">Button pressed, form focus</p>
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
              </div>
            </ComponentShowcase>
          </div>
        )

      case 'ui-elements':
        return (
          <div className="space-y-8">
            <div className="p-6 bg-wood-500/10 border border-wood-500/20 rounded-xl mb-6">
              <h4 className="text-wood-400 font-medium mb-2">🛠️ UI Elements Cleanup</h4>
              <p className="text-gray-300 text-sm mb-3">
                Action buttons and status indicators have been removed as they're superseded by the standard button system. 
                Context and state are now handled through icons and toast notifications.
              </p>
              <p className="text-xs text-gray-400">
                Remaining elements (chips, icons) will be refined in future phases to follow utility system patterns.
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
                <div className="text-xs text-gray-400">Removable chip example with close button. Future: utility-based variants.</div>
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
                <div className="text-xs text-gray-400">Icon containers using standard utility combinations</div>
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