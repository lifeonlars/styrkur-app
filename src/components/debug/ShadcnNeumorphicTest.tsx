'use client'

import React, { useState } from 'react'
import { Button } from '@/ui/button'
import { Input } from '@/ui/input'
import { Textarea } from '@/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/ui/card'

export default function ShadcnNeumorphicTest() {
  const [inputValue, setInputValue] = useState('')
  const [textareaValue, setTextareaValue] = useState('')

  return (
    <div className="p-8 space-y-8 min-h-screen bg-neu-darkest">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-heading font-bold text-white mb-4">
          Neumorphic Design System
        </h1>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          A Norse-inspired Scandinavian design system with tactile neumorphic interactions, 
          featuring metallic gold and bronze accents against cool grey foundations.
        </p>
      </div>

      {/* Button Variants */}
      <Card className="p-8">
        <CardHeader>
          <CardTitle className="text-2xl font-heading">Button Variants</CardTitle>
          <CardDescription className="text-gray-400">
            Raised buttons with Norse metallic accents and tactile feedback
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <Button variant="default">Default</Button>
            <Button variant="primary">Norse Gold</Button>
            <Button variant="secondary">Bronze</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
          </div>
        </CardContent>
      </Card>

      {/* Input Components */}
      <Card className="p-8">
        <CardHeader>
          <CardTitle className="text-2xl font-heading">Input Components</CardTitle>
          <CardDescription className="text-gray-400">
            Sunken inputs that appear carved into the surface
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6 max-w-md">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Text Input
              </label>
              <Input 
                placeholder="Enter your name..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Input
              </label>
              <Input 
                type="email"
                placeholder="your.email@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Textarea
              </label>
              <Textarea 
                placeholder="Enter your message..."
                value={textareaValue}
                onChange={(e) => setTextareaValue(e.target.value)}
                className="min-h-[120px]"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Card Variants */}
      <div className="space-y-6">
        <h2 className="text-2xl font-heading font-bold text-white text-center">
          Card Elevation Variants
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card variant="flat" className="p-6">
            <CardHeader>
              <CardTitle className="text-lg">Flat Card</CardTitle>
              <CardDescription>Minimal elevation for background elements</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 text-sm">
                Subtle presence with minimal shadow depth.
              </p>
            </CardContent>
          </Card>

          <Card variant="default" className="p-6">
            <CardHeader>
              <CardTitle className="text-lg">Default Card</CardTitle>
              <CardDescription>Standard elevated appearance</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 text-sm">
                The most common card style with balanced elevation.
              </p>
            </CardContent>
          </Card>

          <Card variant="elevated" className="p-6">
            <CardHeader>
              <CardTitle className="text-lg">Elevated Card</CardTitle>
              <CardDescription>Higher elevation for emphasis</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 text-sm">
                Pronounced depth for important content areas.
              </p>
            </CardContent>
          </Card>

          <Card variant="sunken" className="p-6">
            <CardHeader>
              <CardTitle className="text-lg">Sunken Card</CardTitle>
              <CardDescription>Inset appearance for forms</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 text-sm">
                Appears pressed into the surface, ideal for inactive states.
              </p>
            </CardContent>
          </Card>

          <Card variant="interactive" className="p-6">
            <CardHeader>
              <CardTitle className="text-lg">Interactive Card</CardTitle>
              <CardDescription>Enhanced hover effects</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 text-sm">
                Pronounced elevation changes on interaction.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Interactive Demo */}
      <Card variant="elevated" className="p-8">
        <CardHeader>
          <CardTitle className="text-2xl font-heading">Interactive Form Demo</CardTitle>
          <CardDescription className="text-gray-400">
            A complete form showcasing neumorphic interactions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6 max-w-lg">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  First Name
                </label>
                <Input placeholder="Thor" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Last Name
                </label>
                <Input placeholder="Odinson" />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <Input type="email" placeholder="thor@asgard.realm" />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Message
              </label>
              <Textarea 
                placeholder="Tell us about your Norse adventures..."
                className="min-h-[100px]"
              />
            </div>
            
            <div className="flex gap-4 pt-4">
              <Button variant="primary" className="flex-1">
                Send Message
              </Button>
              <Button variant="outline" className="flex-1">
                Cancel
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Design System Information */}
      <Card variant="sunken" className="p-8">
        <CardHeader>
          <CardTitle className="text-2xl font-heading">Design Philosophy</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-norse-gold mb-3">
                Scandinavian Minimalism
              </h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>• Cool grey foundation inspired by Nordic stone and mist</li>
                <li>• Clean lines and functional design principles</li>
                <li>• Understated elegance with purposeful interactions</li>
                <li>• Focus on usability and accessibility</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-norse-bronze mb-3">
                Norse Metallic Heritage
              </h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>• Gold and bronze accents from traditional metalwork</li>
                <li>• Realistic metallic shine and depth effects</li>
                <li>• Ancient craftsmanship meets modern interface design</li>
                <li>• Premium feel with historical authenticity</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}