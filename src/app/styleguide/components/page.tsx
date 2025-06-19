'use client'

import { useState } from 'react'
import { Button } from '@/ui/button'
import { Input } from '@/ui/input'
import { Textarea } from '@/ui/textarea'
import { ComponentShowcase } from '@/components/styleguide/StyleGuideComponents'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/ui/card'
import { Plus, Settings, Heart, Share, Download, Edit, Trash2, Search, Check, X, Star, Clock, Calendar, User, Dumbbell, Target, Tag, Filter, Bell, Zap, Award, Users } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/ui/select'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/ui/dialog'
import { showToast } from '@/ui/sonner'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/ui/sheet'
import { Chip } from '@/ui/chip'

export default function ComponentsPage() {
  const [activeSubsection, setActiveSubsection] = useState('overview')

  const subsections = [
    { id: 'overview', label: 'Overview' },
    { id: 'buttons', label: 'Buttons' },
    { id: 'cards', label: 'Cards' },
    { id: 'forms', label: 'Forms' },
    { id: 'tabs', label: 'Tabs' },
    { id: 'modals', label: 'Modals' },
    { id: 'notifications', label: 'Toasts' },
    { id: 'mobile', label: 'Mobile Nav' },
    { id: 'chips', label: 'Chips' },
  ]

  const renderContent = () => {
    switch (activeSubsection) {
      case 'overview':
        return (
          <div className="space-y-8">
            <Card variant="elevated" border="glow">
              <CardHeader>
                <CardTitle className="text-xl">🎯 CSS Modules Refactor Complete</CardTitle>
              </CardHeader>
              <CardContent>
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
              </CardContent>
            </Card>
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
                      <Button variant="dashed">Add Action</Button>
                    </div>
                    <div className="text-xs text-gray-500 space-y-1">
                      <p>HTML Output: <code className="text-norse-gold">&lt;button class="btn btn-primary btn-default"&gt;</code></p>
                      <p>Previously: <code className="text-gray-400">50+ utility classes</code></p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-white font-medium mb-2">Minimalist Approach</h4>
                  <p className="text-gray-400 text-sm mb-4">Four essential variants only - states conveyed through icons and toasts</p>
                  <div className="flex flex-wrap gap-4">
                    <Button variant="primary"><Check className="w-4 h-4" />Success Action</Button>
                    <Button variant="outline"><X className="w-4 h-4" />Cancel Action</Button>
                    <Button variant="flat"><Trash2 className="w-4 h-4" />Delete</Button>
                    <Button variant="dashed"><Plus className="w-4 h-4" />Add Item</Button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Icons and toasts provide context - buttons remain semantically clean</p>
                </div>
                
                <div>
                  <h4 className="text-white font-medium mb-2">Size System with Icon Variants</h4>
                  <p className="text-gray-400 text-sm mb-4">Perfect alignment system with dedicated icon button sizes</p>
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-4 items-center">
                      <Button variant="primary" size="default">Default (36px)</Button>
                      <Button variant="dashed" size="default">Dashed Default</Button>
                      <Button variant="primary" size="icon"><Plus className="w-4 h-4" /></Button>
                      <Button variant="outline" size="icon"><Settings className="w-4 h-4" /></Button>
                    </div>
                    <div className="flex flex-wrap gap-4 items-center">
                      <Button variant="primary" size="large">Large (48px)</Button>
                      <Button variant="dashed" size="large">Dashed Large</Button>
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
                      <Card depth="sunken" surface="concave">
                        <CardContent className="p-6">
                          <h3 className="text-white font-semibold mb-2">Sunken Concave</h3>
                          <p className="text-gray-300 text-sm mb-3">Pressed buttons, input fields</p>
                          <code className="text-xs text-norse-gold bg-neu-surface px-2 py-1 rounded">depth="sunken" surface="concave"</code>
                        </CardContent>
                      </Card>
                      
                      <Card depth="sunken" border="transparent">
                        <CardContent className="p-6">
                          <h3 className="text-white font-semibold mb-2">Sunken Transparent</h3>
                          <p className="text-gray-300 text-sm mb-3">Form containers, content wells</p>
                          <code className="text-xs text-norse-gold bg-neu-surface px-2 py-1 rounded">depth="sunken" border="transparent"</code>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  {/* Flat Cards */}
                  <div className="mb-8">
                    <h5 className="text-white font-medium mb-3">Flat Cards</h5>
                    <p className="text-gray-400 text-sm mb-4">Level with surface</p>
                    <div className="grid grid-cols-1 gap-4">
                      <Card depth="flat" surface="flat">
                        <CardContent className="p-6">
                          <h3 className="text-white font-semibold mb-2">Flat</h3>
                          <p className="text-gray-300 text-sm mb-3">Background grouping, sidebars</p>
                          <code className="text-xs text-norse-gold bg-neu-surface px-2 py-1 rounded">depth="flat" surface="flat"</code>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  {/* Subtle Cards */}
                  <div className="mb-8">
                    <h5 className="text-white font-medium mb-3">Subtle Cards</h5>
                    <p className="text-gray-400 text-sm mb-4">Barely emerging from surface</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card depth="subtle" surface="convex" border="subtle">
                        <CardContent className="p-6">
                          <h3 className="text-white font-semibold mb-2">Subtle Convex</h3>
                          <p className="text-gray-300 text-sm mb-3">Standard cards, containers</p>
                          <code className="text-xs text-norse-gold bg-neu-surface px-2 py-1 rounded">depth="subtle" surface="convex" border="subtle"</code>
                        </CardContent>
                      </Card>
                      
                      <Card depth="subtle" surface="concave" border="subtle">
                        <CardContent className="p-6">
                          <h3 className="text-white font-semibold mb-2">Subtle Concave</h3>
                          <p className="text-gray-300 text-sm mb-3">Secondary buttons, panels</p>
                          <code className="text-xs text-norse-gold bg-neu-surface px-2 py-1 rounded">depth="subtle" surface="concave" border="subtle"</code>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  {/* Elevated Cards */}
                  <div className="mb-8">
                    <h5 className="text-white font-medium mb-3">Elevated Cards</h5>
                    <p className="text-gray-400 text-sm mb-4">Prominently emerging from surface</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card depth="elevated" surface="convex" border="crisp">
                        <CardContent className="p-6">
                          <h3 className="text-white font-semibold mb-2">Elevated Convex</h3>
                          <p className="text-gray-300 text-sm mb-3">Featured content, hero cards</p>
                          <code className="text-xs text-norse-gold bg-neu-surface px-2 py-1 rounded">depth="elevated" surface="convex" border="crisp"</code>
                        </CardContent>
                      </Card>
                      
                      <Card depth="elevated" surface="concave" border="crisp">
                        <CardContent className="p-6">
                          <h3 className="text-white font-semibold mb-2">Elevated Concave</h3>
                          <p className="text-gray-300 text-sm mb-3">Specialized inputs, unique states</p>
                          <code className="text-xs text-norse-gold bg-neu-surface px-2 py-1 rounded">depth="elevated" surface="concave" border="crisp"</code>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  {/* Special Cards */}
                  <div className="mb-8">
                    <h5 className="text-white font-medium mb-3">Special Cards</h5>
                    <p className="text-gray-400 text-sm mb-4">Primary actions and interactive states</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card depth="elevated" surface="gold" border="crisp">
                        <CardContent className="p-6">
                          <h3 className="font-semibold mb-2 text-black">Gold Primary</h3>
                          <p className="text-sm mb-3 text-black">Primary actions, CTA elements</p>
                          <code className="text-xs bg-black/20 px-2 py-1 rounded">depth="elevated" surface="gold" border="crisp"</code>
                        </CardContent>
                      </Card>
                      
                      <Card depth="subtle" surface="convex" border="glow" hoverLift>
                        <CardContent className="p-6">
                          <h3 className="text-white font-semibold mb-2">Interactive Glow</h3>
                          <p className="text-gray-300 text-sm mb-3">Hover states, active selections</p>
                          <code className="text-xs text-norse-gold bg-neu-surface px-2 py-1 rounded">depth="subtle" surface="convex" border="glow" hoverLift</code>
                        </CardContent>
                      </Card>
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

      case 'chips':
        return (
          <div className="space-y-8">
            {/* Introduction */}
            <Card depth="subtle" surface="convex" border="subtle">
              <CardHeader>
                <CardTitle className="text-xl">🏷️ Chips Component System</CardTitle>
                <CardDescription>
                  Interactive tag elements for filtering, categorization, and user selections. 
                  Fully integrated with the semantic token system for consistent context highlighting.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Basic Variants */}
            <ComponentShowcase title="Basic Variants">
              <div className="space-y-6 p-6 bg-neu-surface shadow-neu rounded-xl">
                <div>
                  <h4 className="text-white font-medium mb-4">Neutral Variants</h4>
                  <p className="text-gray-400 text-sm mb-4">Standard chips for general categorization and tags</p>
                  <div className="flex flex-wrap gap-3">
                    <Chip variant="neutral">Tag</Chip>
                    <Chip variant="neutral" icon={<Tag />}>Category</Chip>
                    <Chip variant="neutral" removable onRemove={() => showToast.info('Chip removed')}>
                      Removable
                    </Chip>
                    <Chip variant="neutral-bordered">Bordered</Chip>
                    <Chip variant="neutral-bordered" icon={<Filter />}>Filter</Chip>
                    <Chip variant="outlined">Outlined</Chip>
                    <Chip variant="outlined" icon={<Star />}>Featured</Chip>
                  </div>
                </div>

                <div>
                  <h4 className="text-white font-medium mb-4">Context Variants</h4>
                  <p className="text-gray-400 text-sm mb-4">Semantic variants using context surface tokens for state communication</p>
                  <div className="flex flex-wrap gap-3">
                    <Chip variant="success" icon={<Check />}>Completed</Chip>
                    <Chip variant="danger" icon={<X />}>Failed</Chip>
                    <Chip variant="warning" icon={<Bell />}>Pending</Chip>
                    <Chip variant="info" icon={<Clock />}>In Progress</Chip>
                    <Chip variant="gold" icon={<Award />}>Premium</Chip>
                  </div>
                </div>
              </div>
            </ComponentShowcase>

            {/* Size Variants */}
            <ComponentShowcase title="Size Variants">
              <div className="space-y-6 p-6 bg-neu-surface shadow-neu rounded-xl">
                <div>
                  <h4 className="text-white font-medium mb-4">Default Size (36px height)</h4>
                  <p className="text-gray-400 text-sm mb-4">Standard size for general use cases</p>
                  <div className="flex flex-wrap gap-3 items-center">
                    <Chip size="default" variant="neutral">Standard</Chip>
                    <Chip size="default" variant="success" icon={<Dumbbell />}>Strength Training</Chip>
                    <Chip size="default" variant="warning" icon={<Clock />} removable>30 minutes</Chip>
                    <Chip size="default" variant="gold" icon={<Star />}>Featured Workout</Chip>
                  </div>
                </div>

                <div>
                  <h4 className="text-white font-medium mb-4">Label Size (24px height)</h4>
                  <p className="text-gray-400 text-sm mb-4">Compact size for labels and dense layouts</p>
                  <div className="flex flex-wrap gap-2 items-center">
                    <Chip size="label" variant="neutral">Tag</Chip>
                    <Chip size="label" variant="success" icon={<Check />}>Done</Chip>
                    <Chip size="label" variant="danger" icon={<X />} removable>Error</Chip>
                    <Chip size="label" variant="info" icon={<Users />}>Team</Chip>
                    <Chip size="label" variant="gold" icon={<Zap />}>Pro</Chip>
                  </div>
                </div>
              </div>
            </ComponentShowcase>

            {/* Interactive States */}
            <ComponentShowcase title="Interactive States">
              <div className="space-y-6 p-6 bg-neu-surface shadow-neu rounded-xl">
                <div>
                  <h4 className="text-white font-medium mb-4">Selection States</h4>
                  <p className="text-gray-400 text-sm mb-4">Chips with selected state and context-specific ring glows</p>
                  <div className="flex flex-wrap gap-3">
                    <Chip variant="neutral" selected>Selected Neutral</Chip>
                    <Chip variant="outlined" selected>Selected Outlined</Chip>
                    <Chip variant="success" selected icon={<Check />}>Selected Success</Chip>
                    <Chip variant="danger" selected icon={<X />}>Selected Danger</Chip>
                    <Chip variant="warning" selected icon={<Bell />}>Selected Warning</Chip>
                    <Chip variant="info" selected icon={<Clock />}>Selected Info</Chip>
                    <Chip variant="gold" selected icon={<Award />}>Selected Gold</Chip>
                  </div>
                </div>

                <div>
                  <h4 className="text-white font-medium mb-4">Disabled State</h4>
                  <p className="text-gray-400 text-sm mb-4">Non-interactive chips with reduced opacity</p>
                  <div className="flex flex-wrap gap-3">
                    <Chip variant="neutral" disabled>Disabled</Chip>
                    <Chip variant="success" disabled icon={<Check />}>Disabled Success</Chip>
                    <Chip variant="warning" disabled icon={<Bell />} removable>Disabled Removable</Chip>
                  </div>
                </div>
              </div>
            </ComponentShowcase>

            {/* Real-world Examples */}
            <ComponentShowcase title="Real-world Examples">
              <div className="space-y-6 p-6 bg-neu-surface shadow-neu rounded-xl">
                <div>
                  <h4 className="text-white font-medium mb-4">Workout Filters</h4>
                  <p className="text-gray-400 text-sm mb-4">Exercise categorization and filtering system</p>
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-2">
                      <Chip variant="gold" icon={<Star />} selected>Featured</Chip>
                      <Chip variant="success" icon={<Dumbbell />}>Strength</Chip>
                      <Chip variant="info" icon={<Heart />}>Cardio</Chip>
                      <Chip variant="warning" icon={<Target />}>Flexibility</Chip>
                      <Chip variant="neutral" icon={<Users />}>Team</Chip>
                    </div>
                    <div className="text-xs text-gray-500">Click to filter workouts by category</div>
                  </div>
                </div>

                <div>
                  <h4 className="text-white font-medium mb-4">Active Filters</h4>
                  <p className="text-gray-400 text-sm mb-4">Currently applied filters with remove functionality</p>
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-2">
                      <Chip size="label" variant="success" icon={<Dumbbell />} removable>Upper Body</Chip>
                      <Chip size="label" variant="warning" icon={<Clock />} removable>30-45 min</Chip>
                      <Chip size="label" variant="info" icon={<Target />} removable>Beginner</Chip>
                      <Chip size="label" variant="neutral" icon={<Users />} removable>Solo</Chip>
                    </div>
                    <div className="text-xs text-gray-500">Active filters - click × to remove</div>
                  </div>
                </div>

                <div>
                  <h4 className="text-white font-medium mb-4">Progress Tags</h4>
                  <p className="text-gray-400 text-sm mb-4">Workout completion and progress indicators</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-white">Bench Press</span>
                        <Chip size="label" variant="success" icon={<Check />}>Completed</Chip>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-white">Squats</span>
                        <Chip size="label" variant="warning" icon={<Clock />}>In Progress</Chip>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-white">Deadlifts</span>
                        <Chip size="label" variant="danger" icon={<X />}>Skipped</Chip>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-white">Pull-ups</span>
                        <Chip size="label" variant="gold" icon={<Award />}>PR!</Chip>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-white">Plank</span>
                        <Chip size="label" variant="info" icon={<Zap />}>New Exercise</Chip>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-white">Cooldown</span>
                        <Chip size="label" variant="neutral">Optional</Chip>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-white font-medium mb-4">Exercise Sequence Indicators</h4>
                  <p className="text-gray-400 text-sm mb-4">Outlined chips for high-contrast exercise labeling</p>
                  <div className="space-y-3 p-4 bg-neu-card rounded-lg">
                    <div className="flex items-center gap-3">
                      <Chip variant="outlined">A</Chip>
                      <span className="text-white">Burpees</span>
                      <span className="text-gray-400 text-sm ml-auto">30 seconds</span>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Chip variant="outlined">B</Chip>
                      <span className="text-white">Mountain Climbers</span>
                      <span className="text-gray-400 text-sm ml-auto">30 seconds</span>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Chip variant="outlined">C</Chip>
                      <span className="text-white">Jump Squats</span>
                      <span className="text-gray-400 text-sm ml-auto">30 seconds</span>
                    </div>
                  </div>
                </div>
              </div>
            </ComponentShowcase>

            {/* Implementation Guide */}
            <ComponentShowcase title="Implementation Guide">
              <div className="space-y-6 p-6 bg-neu-surface shadow-neu rounded-xl">
                <div>
                  <h4 className="text-white font-medium mb-4">Usage Examples</h4>
                  <div className="space-y-4">
                    <div className="p-4 bg-neu-card rounded-lg">
                      <h5 className="text-norse-gold font-medium mb-2">Basic Chip</h5>
                      <pre className="text-xs text-gray-400 font-mono overflow-x-auto">
{`<Chip variant="neutral">Tag</Chip>`}
                      </pre>
                    </div>
                    
                    <div className="p-4 bg-neu-card rounded-lg">
                      <h5 className="text-norse-gold font-medium mb-2">Chip with Icon</h5>
                      <pre className="text-xs text-gray-400 font-mono overflow-x-auto">
{`<Chip variant="success" icon={<Check />}>Completed</Chip>`}
                      </pre>
                    </div>

                    <div className="p-4 bg-neu-card rounded-lg">
                      <h5 className="text-norse-gold font-medium mb-2">Outlined Chip (High Contrast)</h5>
                      <pre className="text-xs text-gray-400 font-mono overflow-x-auto">
{`<Chip variant="outlined">A</Chip>`}
                      </pre>
                    </div>
                    
                    <div className="p-4 bg-neu-card rounded-lg">
                      <h5 className="text-norse-gold font-medium mb-2">Removable Chip</h5>
                      <pre className="text-xs text-gray-400 font-mono overflow-x-auto">
{`<Chip 
  variant="warning" 
  removable 
  onRemove={() => handleRemove(id)}
>
  Filter Tag
</Chip>`}
                      </pre>
                    </div>
                    
                    <div className="p-4 bg-neu-card rounded-lg">
                      <h5 className="text-norse-gold font-medium mb-2">Selected State</h5>
                      <pre className="text-xs text-gray-400 font-mono overflow-x-auto">
{`<Chip 
  variant="info" 
  selected={isSelected}
  onClick={() => setSelected(!isSelected)}
>
  Selectable
</Chip>`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-neu-card rounded-lg">
                  <h5 className="text-white font-medium mb-2">Component Features</h5>
                  <ul className="text-xs text-gray-400 space-y-1">
                    <li>• Full semantic token integration for consistent theming</li>
                    <li>• Context-specific ring glows for selected states</li>
                    <li>• Icon support with automatic sizing</li>
                    <li>• Removable functionality with stop propagation</li>
                    <li>• Two size variants (default 36px, label 24px)</li>
                    <li>• Accessible with proper ARIA attributes</li>
                    <li>• Norse neumorphic design with hover/active states</li>
                    <li>• TypeScript support with proper prop interfaces</li>
                  </ul>
                </div>
              </div>
            </ComponentShowcase>
          </div>
        )

      case 'modals':
        return (
          <div className="space-y-8">
            <ComponentShowcase title="Modal/Dialog Components">
              <div className="space-y-6 p-6 bg-neu-surface shadow-neu rounded-xl">
                <div>
                  <h4 className="text-white font-medium mb-4">Basic Modal</h4>
                  <p className="text-gray-400 text-sm mb-4">Neumorphic modal with proper focus management and accessibility</p>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline">Open Modal</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Norse Themed Modal</DialogTitle>
                        <DialogDescription>
                          This modal uses neumorphic styling with proper Norse design tokens for consistency.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <Input placeholder="Example input in modal" />
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Example select..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="option1">Option 1</SelectItem>
                            <SelectItem value="option2">Option 2</SelectItem>
                            <SelectItem value="option3">Option 3</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button variant="flat">Cancel</Button>
                        </DialogClose>
                        <Button variant="primary">Confirm</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="mt-6 p-4 bg-neu-card rounded-lg">
                  <h5 className="text-white font-medium mb-2">Modal Features</h5>
                  <ul className="text-xs text-gray-400 space-y-1">
                    <li>• Neumorphic design using design tokens</li>
                    <li>• Proper focus management and accessibility</li>
                    <li>• Backdrop blur and overlay styling</li>
                    <li>• Smooth animations with Norse aesthetics</li>
                    <li>• Close button with hover states</li>
                    <li>• Supports all form components inside</li>
                  </ul>
                </div>
              </div>
            </ComponentShowcase>
          </div>
        )

      case 'notifications':
        return (
          <div className="space-y-8">
            <ComponentShowcase title="Toast Notifications">
              <div className="space-y-6 p-6 bg-neu-surface shadow-neu rounded-xl">
                <div>
                  <h4 className="text-white font-medium mb-4">Toast Variants</h4>
                  <p className="text-gray-400 text-sm mb-4">Neumorphic toast notifications with context colors</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <Button 
                      variant="outline" 
                      onClick={() => showToast.default('Default notification')}
                    >
                      Default Toast
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => showToast.success('Success! Operation completed')}
                    >
                      Success Toast
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => showToast.error('Error! Something went wrong')}
                    >
                      Error Toast
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => showToast.warning('Warning! Please check this')}
                    >
                      Warning Toast
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => showToast.info('Info: Here\'s some information')}
                    >
                      Info Toast
                    </Button>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-neu-card rounded-lg">
                  <h5 className="text-white font-medium mb-2">Toast Features</h5>
                  <ul className="text-xs text-gray-400 space-y-1">
                    <li>• Neumorphic design with design tokens</li>
                    <li>• Color-coded borders for different states</li>
                    <li>• Consistent with form validation colors</li>
                    <li>• Auto-dismiss with smooth animations</li>
                    <li>• Accessible and screen reader friendly</li>
                    <li>• Easy integration with forms and actions</li>
                  </ul>
                </div>

                <div className="mt-6 p-4 bg-neu-card rounded-lg">
                  <h5 className="text-white font-medium mb-2">Usage Example</h5>
                  <pre className="text-xs text-gray-400 font-mono bg-neu-background p-3 rounded overflow-x-auto">
{`import { showToast } from '@/ui/sonner'

// Usage in components
showToast.success('Workout saved successfully!')
showToast.error('Failed to save workout')
showToast.warning('Please check your form')
showToast.info('New feature available')
showToast.default('General notification')`}
                  </pre>
                </div>
              </div>
            </ComponentShowcase>
          </div>
        )

      case 'mobile':
        return (
          <div className="space-y-8">
            <ComponentShowcase title="Sheet Component - Mobile Navigation">
              <div className="space-y-6 p-6 bg-neu-surface shadow-neu rounded-xl">
                <div>
                  <h4 className="text-white font-medium mb-4">Mobile Navigation Sheet</h4>
                  <p className="text-gray-400 text-sm mb-4">Sliding drawer navigation for mobile interfaces</p>
                  <div className="grid grid-cols-2 gap-4">
                    {/* Left Side Sheet */}
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button variant="outline">Open Left Sheet</Button>
                      </SheetTrigger>
                      <SheetContent side="left">
                        <SheetHeader>
                          <SheetTitle>Quick Actions</SheetTitle>
                          <SheetDescription>
                            Shortcuts for common tasks
                          </SheetDescription>
                        </SheetHeader>
                        <div className="py-4 space-y-4">
                          <Button variant="primary" className="w-full">
                            <Plus className="mr-2 h-4 w-4" />
                            New Workout
                          </Button>
                          <Button variant="outline" className="w-full">
                            <Calendar className="mr-2 h-4 w-4" />
                            Schedule
                          </Button>
                          <Button variant="flat" className="w-full">
                            <Clock className="mr-2 h-4 w-4" />
                            History
                          </Button>
                        </div>
                      </SheetContent>
                    </Sheet>

                    {/* Right Side Sheet */}
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button variant="outline">Open Right Sheet</Button>
                      </SheetTrigger>
                      <SheetContent side="right">
                        <SheetHeader>
                          <SheetTitle>Navigation Menu</SheetTitle>
                          <SheetDescription>
                            Quick access to main app sections
                          </SheetDescription>
                        </SheetHeader>
                        <div className="py-4 space-y-4">
                          <div className="space-y-2">
                            <Button variant="flat" className="w-full justify-start">
                              <User className="mr-2 h-4 w-4" />
                              Profile
                            </Button>
                            <Button variant="flat" className="w-full justify-start">
                              <Dumbbell className="mr-2 h-4 w-4" />
                              Workouts
                            </Button>
                            <Button variant="flat" className="w-full justify-start">
                              <Target className="mr-2 h-4 w-4" />
                              Progress
                            </Button>
                            <Button variant="flat" className="w-full justify-start">
                              <Settings className="mr-2 h-4 w-4" />
                              Settings
                            </Button>
                          </div>
                        </div>
                      </SheetContent>
                    </Sheet>
                  </div>

                  {/* Bottom Sheet Example */}
                  <div className="mt-6">
                    <h4 className="text-white font-medium mb-4">Bottom Sheet (Mobile)</h4>
                    <p className="text-gray-400 text-sm mb-4">Perfect for mobile action sheets and quick settings</p>
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button variant="primary" className="w-full">Open Bottom Sheet</Button>
                      </SheetTrigger>
                      <SheetContent side="bottom">
                        <SheetHeader>
                          <SheetTitle>Quick Settings</SheetTitle>
                          <SheetDescription>
                            Adjust your workout preferences
                          </SheetDescription>
                        </SheetHeader>
                        <div className="py-4 space-y-4">
                          <div className="grid grid-cols-3 gap-2">
                            <Button variant="flat" size="default">
                              <Settings className="mr-2 h-4 w-4" />
                              Settings
                            </Button>
                            <Button variant="flat" size="default">
                              <User className="mr-2 h-4 w-4" />
                              Profile
                            </Button>
                            <Button variant="flat" size="default">
                              <Heart className="mr-2 h-4 w-4" />
                              Favorites
                            </Button>
                          </div>
                        </div>
                      </SheetContent>
                    </Sheet>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-neu-card rounded-lg">
                  <h5 className="text-white font-medium mb-2">Sheet Features</h5>
                  <ul className="text-xs text-gray-400 space-y-1">
                    <li>• Neumorphic design with design tokens</li>
                    <li>• Slide animations from all sides (left, right, top, bottom)</li>
                    <li>• Perfect for mobile navigation and action sheets</li>
                    <li>• Bottom sheet ideal for mobile quick actions</li>
                    <li>• Backdrop blur and overlay styling</li>
                    <li>• Close button with interactive states</li>
                    <li>• Supports all form and button components</li>
                  </ul>
                </div>
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