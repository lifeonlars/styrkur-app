'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/ui/card'
import { Input } from '@/ui/input'
import { Textarea } from '@/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/ui/select'
import { Plus, Settings, Heart, Share, Download, Edit, Trash2, Search, Check, X, ArrowLeft, Star, Clock, Calendar, User, Dumbbell, Target } from 'lucide-react'

interface StyleGuideProps {
  onBack?: () => void
}

export default function StyleGuide({ onBack }: StyleGuideProps = {}) {
  const [activeSection, setActiveSection] = useState('colors')

  const sections = [
    { id: 'colors', label: 'Colors & Gradients' },
    { id: 'typography', label: 'Typography' },
    { id: 'shadows', label: 'Neumorphic Shadows' },
    { id: 'shadcn', label: 'Shadcn Components' },
    { id: 'custom', label: 'Custom Components' },
    { id: 'branding', label: 'Branding & Context' }
  ]

  const colors = [
    { name: 'Norse Gold', value: '#C3A869', var: 'norse-gold' },
    { name: 'Norse Gold Light', value: '#D4BC7F', var: 'norse-gold-light' },
    { name: 'Norse Gold Dark', value: '#A89253', var: 'norse-gold-dark' },
    { name: 'Norse Gold Darker', value: '#8D7A42', var: 'norse-gold-darker' },
    { name: 'Norse Accent', value: '#B8A260', var: 'norse-accent' },
  ]

  const backgroundColors = [
    { name: 'Background', value: '#2c2f36', var: 'neu-background' },
    { name: 'Surface', value: '#343940', var: 'neu-surface' },
    { name: 'Card', value: '#3d424f', var: 'neu-card' },
    { name: 'Elevated', value: '#454a57', var: 'neu-elevated' },
  ]

  const contextColors = [
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

  const gradients = [
    { name: 'Gold Metallic', value: 'linear-gradient(145deg, #C3A869, #B8A260, #A89253)', var: 'neu-gold-metallic' },
    { name: 'Gold Light', value: 'linear-gradient(145deg, #D4BC7F, #C3A869, #B8A260)', var: 'neu-gold-light' },
    { name: 'Gold Dark', value: 'linear-gradient(145deg, #B8A260, #A89253, #8D7A42)', var: 'neu-gold-dark' },
    { name: 'Card Background', value: 'radial-gradient(ellipse at center, #363942, #2a2d33), linear-gradient(135deg, #31343b, #252831)', var: 'neu-card-bg' },
    { name: 'Modal Background', value: 'radial-gradient(ellipse at center, #3a3d45, #2d3037), linear-gradient(145deg, #34373e, #282a30)', var: 'neu-modal-bg' },
  ]

  const shadows = [
    { name: 'Flat', class: 'shadow-neu-flat', description: 'Minimal elevation for background elements' },
    { name: 'Default', class: 'shadow-neu', description: 'Standard neumorphic depth for cards' },
    { name: 'Large', class: 'shadow-neu-lg', description: 'Higher elevation for important content' },
    { name: 'Inset', class: 'shadow-neu-inset', description: 'Sunken appearance for inputs' },
    { name: 'Hover', class: 'shadow-neu-hover', description: 'Enhanced depth on hover' },
    { name: 'Pressed', class: 'shadow-neu-pressed', description: 'Inset effect when pressed' },
    { name: 'Gold', class: 'shadow-neu-gold', description: 'Norse gold accent shadow' },
    { name: 'Gold Hover', class: 'shadow-neu-gold-hover', description: 'Enhanced gold shadow' },
  ]

  const ColorSwatch = ({ name, value, var: varName }: { name: string; value: string; var: string }) => (
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

  const GradientSwatch = ({ name, value, var: varName }: { name: string; value: string; var: string }) => (
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

  const ShadowSwatch = ({ name, class: className, description }: { name: string; class: string; description: string }) => (
    <div className="flex flex-col items-center space-y-2 p-4 bg-neu-surface rounded-xl">
      <div className={`w-16 h-16 bg-neu-card rounded-lg ${className}`} />
      <div className="text-center">
        <div className="text-sm font-medium text-white">{name}</div>
        <div className="text-xs text-gray-400">{className}</div>
        <div className="text-xs text-gray-500 text-center">{description}</div>
      </div>
    </div>
  )

  const ComponentShowcase = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-white border-b border-neu-light/20 pb-2">{title}</h3>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  )

  const renderContent = () => {
    switch (activeSection) {
      case 'colors':
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-semibold text-white mb-4">Norse Gold Palette</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {colors.map((color) => (
                  <ColorSwatch key={color.var} {...color} />
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-white mb-4">Background Hierarchy</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {backgroundColors.map((color) => (
                  <ColorSwatch key={color.var} {...color} />
                ))}
              </div>
            </div>

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

            <div>
              <h2 className="text-xl font-semibold text-white mb-4">Gradients</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {gradients.map((gradient) => (
                  <GradientSwatch key={gradient.var} {...gradient} />
                ))}
              </div>
            </div>
          </div>
        )

      case 'typography':
        return (
          <div className="space-y-8">
            <ComponentShowcase title="Typography Styles">
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
            </ComponentShowcase>
          </div>
        )

      case 'shadows':
        return (
          <div className="space-y-8">
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

      case 'shadcn':
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
                      <Input size="large" placeholder="Large input (48px)" />
                      <Button variant="primary" size="large">Submit</Button>
                    </div>
                  </div>
                </div>
              </div>
            </ComponentShowcase>

            <ComponentShowcase title="Card Component - Enhanced Variants">
              <div className="space-y-6">
                <div>
                  <h4 className="text-white font-medium mb-4">Core Variants with Semantic Classes</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Card variant="default">
                      <CardHeader>
                        <CardTitle>Default Card</CardTitle>
                        <CardDescription>Standard neumorphic depth</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-300">Class: .card .card-default</p>
                      </CardContent>
                    </Card>

                    <Card variant="elevated">
                      <CardHeader>
                        <CardTitle>Elevated Card</CardTitle>
                        <CardDescription>Higher elevation</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-300">Class: .card .card-elevated</p>
                      </CardContent>
                    </Card>

                    <Card variant="interactive" hoverLift>
                      <CardHeader>
                        <CardTitle>Interactive Card</CardTitle>
                        <CardDescription>Click-enabled with hover lift</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-300">Class: .card .card-interactive</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <div>
                  <h4 className="text-white font-medium mb-4">Size Variants</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card variant="default" size="compact">
                      <CardHeader>
                        <CardTitle>Compact</CardTitle>
                        <CardDescription>Reduced padding for dense layouts</CardDescription>
                      </CardHeader>
                    </Card>

                    <Card variant="default" size="default">
                      <CardHeader>
                        <CardTitle>Default</CardTitle>
                        <CardDescription>Standard card sizing</CardDescription>
                      </CardHeader>
                    </Card>

                    <Card variant="elevated" size="large">
                      <CardHeader>
                        <CardTitle>Large</CardTitle>
                        <CardDescription>Increased padding for hero content</CardDescription>
                      </CardHeader>
                    </Card>
                  </div>
                </div>

                <div>
                  <h4 className="text-white font-medium mb-4">Enhanced Features</h4>
                  <div className="space-y-4">
                    <Card variant="accent" fullWidth>
                      <CardHeader>
                        <CardTitle>Full Width Norse Gold Accent Card</CardTitle>
                        <CardDescription>Enhanced with fullWidth prop and gold accent border</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-300">Perfect for hero sections and important content</p>
                      </CardContent>
                      <CardFooter>
                        <Button variant="primary">Call to Action</Button>
                        <Button variant="outline">Secondary</Button>
                      </CardFooter>
                    </Card>
                  </div>
                </div>
              </div>
            </ComponentShowcase>

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
                        <Input size="large" placeholder="Large input (.input .input-large)" />
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
                  <h4 className="text-white font-medium mb-4">Perfect Form Alignment Showcase</h4>
                  <p className="text-gray-400 text-sm mb-4">CSS custom properties ensure pixel-perfect height matching</p>
                  <div className="space-y-4 max-w-lg">
                    <div className="flex gap-2">
                      <Input placeholder="Default height (36px)" />
                      <Button variant="primary">Submit</Button>
                      <Button variant="outline" size="icon"><Settings className="w-4 h-4" /></Button>
                    </div>
                    <div className="flex gap-2">
                      <Input size="large" placeholder="Large height (48px)" />
                      <Button variant="primary" size="large">Submit</Button>
                      <Button variant="outline" size="icon-large"><X className="w-5 h-5" /></Button>
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

      case 'custom':
        return (
          <div className="space-y-8">
            <ComponentShowcase title="Icon Examples">
              <div className="flex flex-wrap gap-4 p-6 bg-neu-surface shadow-neu rounded-xl">
                <div className="flex flex-col items-center space-y-2">
                  <div className="p-3 bg-neu-card shadow-neu rounded-xl">
                    <Plus className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xs text-gray-400">Plus</span>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <div className="p-3 bg-norse-gold shadow-neu-gold rounded-xl">
                    <Settings className="w-6 h-6 text-black" />
                  </div>
                  <span className="text-xs text-gray-400">Settings</span>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <div className="p-3 bg-neu-surface shadow-neu-inset rounded-xl">
                    <Heart className="w-6 h-6 text-gray-400" />
                  </div>
                  <span className="text-xs text-gray-400">Heart</span>
                </div>
              </div>
            </ComponentShowcase>

            <ComponentShowcase title="Navigation Buttons">
              <div className="flex flex-wrap gap-4 p-6 bg-neu-surface shadow-neu rounded-xl">
                <button className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-norse-gold text-black shadow-neu-gold font-medium">
                  <Settings className="w-4 h-4" />
                  <span className="text-sm">Active Tab</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-neu-surface text-gray-300 shadow-neu hover:shadow-neu-hover hover:text-white transition-all duration-200">
                  <Plus className="w-4 h-4" />
                  <span className="text-sm">Inactive Tab</span>
                </button>
              </div>
            </ComponentShowcase>

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

      case 'branding':
        return (
          <div className="space-y-8">
            <ComponentShowcase title="Brand Story">
              <div className="p-6 bg-neu-surface shadow-neu rounded-xl">
                <div className="max-w-3xl">
                  <h3 className="text-xl font-heading font-semibold text-white mb-4">Styrkur Saga</h3>
                  <div className="space-y-4 text-gray-300 text-sm leading-relaxed">
                    <p>
                      <strong className="text-norse-gold">Styrkur</strong> (pronounced "STEER-kur") means "strength" in Old Norse. 
                      This application embodies the warrior spirit of the Norse people - their dedication to physical prowess, 
                      mental fortitude, and the pursuit of excellence.
                    </p>
                    <p>
                      The design system draws inspiration from the tactile, handcrafted tools and weapons of Viking smiths. 
                      Every surface feels solid and purposeful, with deep shadows that suggest weight and substance. 
                      The neumorphic design language creates interfaces that feel carved from stone and forged from metal.
                    </p>
                    <p>
                      The <strong className="text-norse-gold">Norse Gold</strong> accent color (#C3A869) represents the precious metals 
                      that adorned legendary weapons and armor. It's not the bright flash of fool's gold, but the deep, 
                      rich tone of true craftsmanship - earned through dedication and tempered by experience.
                    </p>
                  </div>
                </div>
              </div>
            </ComponentShowcase>

            <ComponentShowcase title="Logo Variations">
              <div className="space-y-6 p-6 bg-neu-surface shadow-neu rounded-xl">
                {/* Horizontal Logo */}
                <div className="space-y-3">
                  <h4 className="text-white font-medium">Horizontal Logo</h4>
                  <div className="flex items-center justify-center p-6 bg-neu-card rounded-lg">
                    <img 
                      src="/assets/branding/LogoHorizontal.svg" 
                      alt="Styrkur Saga Horizontal Logo" 
                      className="h-12 w-auto"
                    />
                  </div>
                  <p className="text-xs text-gray-400">Primary logo for headers and navigation</p>
                </div>

                {/* Vertical Logo with Tagline */}
                <div className="space-y-3">
                  <h4 className="text-white font-medium">Vertical Logo with Tagline</h4>
                  <div className="flex items-center justify-center p-6 bg-neu-card rounded-lg">
                    <img 
                      src="/assets/branding/LogoVertical-Tagline.svg" 
                      alt="Styrkur Saga Vertical Logo with Tagline" 
                      className="h-24 w-auto"
                    />
                  </div>
                  <p className="text-xs text-gray-400">For marketing materials and hero sections</p>
                </div>

                {/* Wordmark */}
                <div className="space-y-3">
                  <h4 className="text-white font-medium">Wordmark</h4>
                  <div className="flex items-center justify-center p-6 bg-neu-card rounded-lg">
                    <img 
                      src="/assets/branding/Wordmark.svg" 
                      alt="Styrkur Saga Wordmark" 
                      className="h-8 w-auto"
                    />
                  </div>
                  <p className="text-xs text-gray-400">Text-only version for minimal layouts</p>
                </div>

                {/* Stacked Wordmark */}
                <div className="space-y-3">
                  <h4 className="text-white font-medium">Stacked Wordmark</h4>
                  <div className="flex items-center justify-center p-6 bg-neu-card rounded-lg">
                    <img 
                      src="/assets/branding/WordmarkStacked.svg" 
                      alt="Styrkur Saga Stacked Wordmark" 
                      className="h-16 w-auto"
                    />
                  </div>
                  <p className="text-xs text-gray-400">Vertical text layout for square spaces</p>
                </div>
              </div>
            </ComponentShowcase>

            <ComponentShowcase title="Glyph & Icon">
              <div className="space-y-6 p-6 bg-neu-surface shadow-neu rounded-xl">
                {/* Glyph variations */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center space-y-3">
                    <div className="flex items-center justify-center p-4 bg-neu-card rounded-lg">
                      <img 
                        src="/assets/branding/Glyph.svg" 
                        alt="Styrkur Saga Glyph" 
                        className="h-12 w-12"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">Large (48px)</p>
                      <p className="text-xs text-gray-400">App icons, favicons</p>
                    </div>
                  </div>

                  <div className="text-center space-y-3">
                    <div className="flex items-center justify-center p-4 bg-neu-card rounded-lg">
                      <img 
                        src="/assets/branding/Glyph.svg" 
                        alt="Styrkur Saga Glyph" 
                        className="h-8 w-8"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">Medium (32px)</p>
                      <p className="text-xs text-gray-400">Navigation, buttons</p>
                    </div>
                  </div>

                  <div className="text-center space-y-3">
                    <div className="flex items-center justify-center p-4 bg-neu-card rounded-lg">
                      <img 
                        src="/assets/branding/Glyph.svg" 
                        alt="Styrkur Saga Glyph" 
                        className="h-6 w-6"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">Small (24px)</p>
                      <p className="text-xs text-gray-400">Inline elements</p>
                    </div>
                  </div>

                  <div className="text-center space-y-3">
                    <div className="flex items-center justify-center p-4 bg-neu-card rounded-lg">
                      <img 
                        src="/assets/branding/Glyph.svg" 
                        alt="Styrkur Saga Glyph" 
                        className="h-4 w-4"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">Tiny (16px)</p>
                      <p className="text-xs text-gray-400">Status indicators</p>
                    </div>
                  </div>
                </div>

                {/* Usage guidelines */}
                <div className="pt-4 border-t border-gray-700">
                  <h4 className="text-white font-medium mb-3">Usage Guidelines</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-300">
                    <div>
                      <p className="font-medium text-white mb-2">Do:</p>
                      <ul className="space-y-1 text-xs">
                        <li>• Maintain minimum clear space around logos</li>
                        <li>• Use on contrasting backgrounds</li>
                        <li>• Scale proportionally</li>
                        <li>• Use provided file formats</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium text-white mb-2">Don't:</p>
                      <ul className="space-y-1 text-xs">
                        <li>• Stretch or distort the logo</li>
                        <li>• Change colors or add effects</li>
                        <li>• Use on busy backgrounds</li>
                        <li>• Scale below minimum sizes</li>
                      </ul>
                    </div>
                  </div>
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
    <div className="min-h-screen bg-neu-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            {onBack ? (
              <button
                onClick={onBack}
                className="flex items-center gap-2 px-4 py-2 bg-neu-surface shadow-neu rounded-xl text-gray-300 hover:text-white hover:shadow-neu-hover transition-all duration-200"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Settings
              </button>
            ) : (
              <Link 
                href="/"
                className="flex items-center gap-2 px-4 py-2 bg-neu-surface shadow-neu rounded-xl text-gray-300 hover:text-white hover:shadow-neu-hover transition-all duration-200"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to App
              </Link>
            )}
          </div>
          <h1 className="text-3xl font-bold text-white font-heading mb-2">Design System & Style Guide</h1>
          <p className="text-gray-400">Complete component library and design tokens for the Norse-themed neumorphic design system</p>
        </div>

        {/* Navigation */}
        <div className="flex flex-wrap gap-2 mb-8 p-2 bg-neu-surface shadow-neu rounded-xl">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeSection === section.id
                  ? 'bg-norse-gold text-black shadow-neu-gold'
                  : 'bg-neu-surface text-gray-300 hover:text-white hover:shadow-neu'
              }`}
            >
              {section.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="space-y-8">
          {renderContent()}
        </div>
      </div>
    </div>
  )
}