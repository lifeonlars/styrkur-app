'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/ui/card'
import { ComponentShowcase } from '@/components/styleguide/StyleGuideComponents'
import MuscleHighlighter from '@/components/muscle-map/MuscleHighlighter'
import { Grid3x3, Zap, Clock, Dumbbell } from 'lucide-react'

export default function PatternsPage() {
  const upcomingPatterns = [
    {
      icon: Grid3x3,
      title: 'Workout Planning Layouts',
      description: 'Grid patterns for exercise selection and workout composition'
    },
    {
      icon: Zap,
      title: 'Real-time Logging Interfaces',
      description: 'Interactive patterns for live workout tracking and set completion'
    },
    {
      icon: Clock,
      title: 'Progress Visualization',
      description: 'Chart and graph patterns for strength progression and analytics'
    }
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white font-heading mb-2">Patterns</h1>
        <p className="text-gray-400">Workout-specific interface patterns and layouts</p>
      </div>

      <ComponentShowcase title="MuscleHighlighter - Single Exercise">
        <div className="p-6 bg-neu-surface shadow-neu rounded-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h4 className="text-white font-medium mb-4">Bench Press - Individual Exercise</h4>
              <p className="text-gray-400 text-sm mb-4">Shows primary and secondary muscles for a single exercise with enhanced legend</p>
              <MuscleHighlighter
                exercise={{
                  primaryMuscleIds: [4, 1], // Chest, Biceps
                  secondaryMuscleIds: [5, 15], // Shoulders, Triceps
                  name: "Bench Press"
                }}
                showLegend={true}
                showMuscleList={true}
                size="medium"
              />
            </div>
            <div>
              <h4 className="text-white font-medium mb-4">Pull-ups - Alternative Example</h4>
              <p className="text-gray-400 text-sm mb-4">Different muscle activation pattern for comparison</p>
              <MuscleHighlighter
                exercise={{
                  primaryMuscleIds: [2, 8], // Lats, Back
                  secondaryMuscleIds: [1, 13], // Biceps, Rear Delts
                  name: "Pull-ups"
                }}
                showLegend={true}
                showMuscleList={false}
                size="medium"
              />
            </div>
          </div>
        </div>
      </ComponentShowcase>

      <ComponentShowcase title="MuscleHighlighter - Workout Overview">
        <div className="p-6 bg-neu-surface shadow-neu rounded-xl">
          <h4 className="text-white font-medium mb-4">Full Body Workout - Aggregated Muscle Activation</h4>
          <p className="text-gray-400 text-sm mb-4">Heat map shows combined muscle activation across multiple exercises in a complete workout</p>
          <MuscleHighlighter
            exercises={[
              {
                primaryMuscleIds: [4, 1], // Chest, Biceps
                secondaryMuscleIds: [5, 15], // Shoulders, Triceps
                name: "Bench Press"
              },
              {
                primaryMuscleIds: [2, 8], // Lats, Back
                secondaryMuscleIds: [1, 13], // Biceps, Rear Delts
                name: "Pull-ups"
              },
              {
                primaryMuscleIds: [10, 11], // Quads, Glutes
                secondaryMuscleIds: [7, 9], // Hamstrings, Calves
                name: "Squats"
              },
              {
                primaryMuscleIds: [5, 15], // Shoulders, Triceps
                secondaryMuscleIds: [4, 12], // Chest, Core
                name: "Overhead Press"
              }
            ]}
            showLegend={true}
            showMuscleList={true}
            size="large"
          />
          <div className="mt-4 p-4 bg-neu-card rounded-lg">
            <h5 className="text-norse-gold font-medium mb-2">Usage Notes:</h5>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• Automatically aggregates muscle activation across all exercises</li>
              <li>• Responsive design: tabbed view on mobile, dual view on desktop</li>
              <li>• Enhanced legend shows combined muscle engagement</li>
              <li>• Perfect for workout planning and muscle balance analysis</li>
            </ul>
          </div>
        </div>
      </ComponentShowcase>

      <ComponentShowcase title="Logical Utility Combinations">
        <div className="p-6 bg-neu-surface shadow-neu rounded-xl">
          <h4 className="text-white font-medium mb-4">Depth + Surface + Border Pattern Examples</h4>
          <p className="text-gray-400 text-sm mb-4">Real-world patterns that combine multiple utility classes following neumorphic physics principles.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card depth="subtle" surface="gold" border="glow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Dumbbell className="w-5 h-5 text-black" />
                  Primary Action Pattern
                </CardTitle>
                <CardDescription>depth="subtle" surface="gold" border="glow"</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-900 mb-3">Perfect for primary CTAs with Norse branding</p>
                <div className="p-2 bg-neu-card rounded text-xs">
                  <code className="text-norse-gold">
                    &lt;Card depth="subtle" surface="gold" border="glow"&gt;
                  </code>
                </div>
              </CardContent>
            </Card>

            <Card depth="elevated" surface="convex" border="crisp">
              <CardHeader>
                <CardTitle>Tesla Cybertruck Pattern</CardTitle>
                <CardDescription>depth="elevated" surface="convex" border="crisp"</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-300 mb-3">Premium elevated card with sharp definition</p>
                <div className="p-2 bg-neu-card rounded text-xs">
                  <code className="text-norse-gold">
                    &lt;Card depth="elevated" surface="convex" border="crisp"&gt;
                  </code>
                </div>
              </CardContent>
            </Card>

            <Card depth="sunken" surface="concave" border="transparent">
              <CardHeader>
                <CardTitle>Content Well Pattern</CardTitle>
                <CardDescription>depth="sunken" surface="concave" border="transparent"</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-300 mb-3">Perfect for form containers and content areas</p>
                <div className="p-2 bg-neu-card rounded text-xs">
                  <code className="text-norse-gold">
                    &lt;Card depth="sunken" surface="concave" border="transparent"&gt;
                  </code>
                </div>
              </CardContent>
            </Card>

            <Card depth="flat" surface="flat" border="transparent">
              <CardHeader>
                <CardTitle>Background Container Pattern</CardTitle>
                <CardDescription>depth="flat" surface="flat" border="transparent"</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-300 mb-3">Subtle background element for grouping content</p>
                <div className="p-2 bg-neu-card rounded text-xs">
                  <code className="text-norse-gold">
                    &lt;Card depth="flat" surface="flat" border="transparent"&gt;
                  </code>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </ComponentShowcase>

      <ComponentShowcase title="Future Expansion">
        <div className="p-6 bg-neu-surface shadow-neu rounded-xl">
          <h4 className="text-white font-medium mb-4">Upcoming Workout Interface Patterns</h4>
          <p className="text-gray-400 text-sm mb-6">
            This section will document complex interface patterns specific to the Styrkur Saga 
            workout application. These patterns will combine multiple components to create 
            cohesive user experiences.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {upcomingPatterns.map((pattern) => {
              const Icon = pattern.icon
              return (
                <Card key={pattern.title} variant="flat" size="compact">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-neu-surface shadow-neu rounded-lg">
                        <Icon className="w-4 h-4 text-norse-gold" />
                      </div>
                      <CardTitle className="text-sm">{pattern.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs text-gray-400">{pattern.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </ComponentShowcase>

      {/* Pattern Philosophy */}
      <Card variant="accent">
        <CardHeader>
          <CardTitle>Pattern Design Philosophy</CardTitle>
          <CardDescription>Guiding principles for workout interface patterns</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 text-sm text-gray-300">
            <p>
              Patterns in the Styrkur Saga design system combine foundational elements and components 
              to create meaningful, reusable solutions for complex workout interface challenges.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-white font-medium mb-2">Core Principles:</h4>
                <ul className="space-y-1 text-xs">
                  <li>• <strong>Progressive Enhancement:</strong> Build from simple to complex</li>
                  <li>• <strong>Muscle Memory:</strong> Consistent interaction patterns</li>
                  <li>• <strong>Real-time Feedback:</strong> Immediate visual response</li>
                  <li>• <strong>Data Density:</strong> Maximum info, minimal space</li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-medium mb-2">Implementation:</h4>
                <ul className="space-y-1 text-xs">
                  <li>• <strong>Utility Composition:</strong> Combine depth, surface, border</li>
                  <li>• <strong>Component Assembly:</strong> Cards, forms, interactive elements</li>
                  <li>• <strong>Responsive Behavior:</strong> Mobile-first progressive enhancement</li>
                  <li>• <strong>Performance Focus:</strong> Efficient rendering and updates</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}