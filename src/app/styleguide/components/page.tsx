'use client'

import { useState } from 'react'
import { Button } from '@/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/ui/card'
import { Input } from '@/ui/input'
import { Textarea } from '@/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/ui/select'
import { ComponentShowcase } from '@/components/styleguide/StyleGuideComponents'
import { Plus, Settings, Heart, Share, Download, Edit, Trash2, Search, Check, X, Star, Clock, Calendar, User, Dumbbell, Target } from 'lucide-react'

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
                <div>
                  <h4 className="text-white font-medium mb-4">4-Depth Utility Classes</h4>
                  <p className="text-gray-400 text-sm mb-4">Reusable neumorphic depth utilities with consistent dual-shadow system. Each utility can be applied to any component.</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card depth="sunken">
                      <CardHeader>
                        <CardTitle>depth-sunken</CardTitle>
                        <CardDescription>Content wells</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-xs text-gray-400">Deep inset shadows, carved into surface</p>
                        <code className="text-xs text-norse-gold">.depth-sunken</code>
                      </CardContent>
                    </Card>

                    <Card depth="flat">
                      <CardHeader>
                        <CardTitle>depth-flat</CardTitle>
                        <CardDescription>Background containers</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-xs text-gray-400">Subtle inset, barely visible until hover</p>
                        <code className="text-xs text-norse-gold">.depth-flat</code>
                      </CardContent>
                    </Card>

                    <Card depth="subtle">
                      <CardHeader>
                        <CardTitle>depth-subtle</CardTitle>
                        <CardDescription>Standard containers</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-xs text-gray-400">Gentle elevation, Tesla Cybertruck style</p>
                        <code className="text-xs text-norse-gold">.depth-subtle</code>
                      </CardContent>
                    </Card>

                    <Card depth="elevated">
                      <CardHeader>
                        <CardTitle>depth-elevated</CardTitle>
                        <CardDescription>Featured content</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-xs text-gray-400">Prominent raised, dramatic shadows</p>
                        <code className="text-xs text-norse-gold">.depth-elevated</code>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <div>
                  <h4 className="text-white font-medium mb-4">Surface Gradient Utilities</h4>
                  <p className="text-gray-400 text-sm mb-4">4 surface gradients that follow neumorphic physics with 115° light direction.</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card depth="subtle" surface="concave" border="transparent">
                      <CardHeader>
                        <CardTitle>surface-concave</CardTitle>
                        <CardDescription>Inverted physics</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-xs text-gray-400">Dark to light gradient for inset/pressed elements</p>
                        <code className="text-xs text-norse-gold">.surface-concave</code>
                      </CardContent>
                    </Card>

                    <Card depth="subtle" surface="flat" border="transparent">
                      <CardHeader>
                        <CardTitle>surface-flat</CardTitle>
                        <CardDescription>Minimal variation</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-xs text-gray-400">Near solid color with subtle 2% variation</p>
                        <code className="text-xs text-norse-gold">.surface-flat</code>
                      </CardContent>
                    </Card>

                    <Card depth="subtle" surface="convex" border="transparent">
                      <CardHeader>
                        <CardTitle>surface-convex</CardTitle>
                        <CardDescription>Standard physics</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-xs text-gray-400">Light to dark gradient for raised elements</p>
                        <code className="text-xs text-norse-gold">.surface-convex</code>
                      </CardContent>
                    </Card>

                    <Card depth="subtle" surface="gold" border="transparent">
                      <CardHeader>
                        <CardTitle>surface-gold</CardTitle>
                        <CardDescription>Norse accent</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-xs text-gray-400">Rich Norse gold with concave physics</p>
                        <code className="text-xs text-norse-gold">.surface-gold</code>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <div>
                  <h4 className="text-white font-medium mb-4">Border Gradient Utilities</h4>
                  <p className="text-gray-400 text-sm mb-4">Tesla Cybertruck-inspired border system with gradient definition.</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card depth="subtle" surface="convex" border="transparent">
                      <CardHeader>
                        <CardTitle>border-transparent</CardTitle>
                        <CardDescription>No definition</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-xs text-gray-400">Complete blend with background</p>
                        <code className="text-xs text-norse-gold">.border-transparent</code>
                      </CardContent>
                    </Card>

                    <Card depth="subtle" surface="convex" border="subtle">
                      <CardHeader>
                        <CardTitle>border-neu-subtle</CardTitle>
                        <CardDescription>Soft definition</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-xs text-gray-400">Gentle gradient border for standard elements</p>
                        <code className="text-xs text-norse-gold">.border-neu-subtle</code>
                      </CardContent>
                    </Card>

                    <Card depth="subtle" surface="convex" border="crisp">
                      <CardHeader>
                        <CardTitle>border-neu-crisp</CardTitle>
                        <CardDescription>Tesla definition</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-xs text-gray-400">Prominent Cybertruck-style edges</p>
                        <code className="text-xs text-norse-gold">.border-neu-crisp</code>
                      </CardContent>
                    </Card>

                    <Card depth="subtle" surface="convex" border="glow">
                      <CardHeader>
                        <CardTitle>border-neu-glow</CardTitle>
                        <CardDescription>Norse accent</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-xs text-gray-400">Gold accent highlighting</p>
                        <code className="text-xs text-norse-gold">.border-neu-glow</code>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <div>
                  <h4 className="text-white font-medium mb-4">Special Variants</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Card variant="sunken">
                      <CardHeader>
                        <CardTitle>Sunken Card</CardTitle>
                        <CardDescription>Inverted depth effect</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-300">Inverted gradient for inset appearance</p>
                      </CardContent>
                    </Card>

                    <Card variant="interactive" hoverLift>
                      <CardHeader>
                        <CardTitle>Interactive Card</CardTitle>
                        <CardDescription>Enhanced feedback</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-300">Hover and active states with transform</p>
                      </CardContent>
                    </Card>

                    <Card variant="accent">
                      <CardHeader>
                        <CardTitle>Norse Gold Accent</CardTitle>
                        <CardDescription>Gold-tinted variant</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-300">Gold-tinted gradient and border</p>
                      </CardContent>
                    </Card>
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