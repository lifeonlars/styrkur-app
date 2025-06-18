'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/ui/card'
import { ComponentShowcase } from '@/components/styleguide/StyleGuideComponents'
import MuscleHighlighter from '@/components/muscle-map/MuscleHighlighter'
import WorkoutCard from '@/components/ui/workout-card'
import { Grid3x3, Zap, Clock, Dumbbell, Play, Eye } from 'lucide-react'

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

      <ComponentShowcase title="WorkoutCard - Unified Component">
        <div className="p-6 bg-neu-surface shadow-neu rounded-xl">
          <h4 className="text-white font-medium mb-4">Complete Workout Card Implementation</h4>
          <p className="text-gray-400 text-sm mb-6">
            Unified WorkoutCard component that replaces multiple inconsistent implementations across the app. 
            Features smart duration calculation, exercise preview, responsive layouts, and integrated WorkoutSummaryModal.
          </p>
          
          {/* Full Layout Example */}
          <div className="space-y-6">
            <div>
              <h5 className="text-norse-gold font-medium mb-3">Full Layout (Default)</h5>
              <WorkoutCard
                workout={{
                  id: 1,
                  title: "Upper Body Power",
                  description: "Compound movements focusing on chest, back, and shoulders with progressive overload",
                  entries: [
                    {
                      id: "1",
                      exercises: [
                        { exerciseId: "bench-press", sets: 4, reps: 8, weight: 80 },
                        { exerciseId: "pull-ups", sets: 4, reps: 6, weight: 20 }
                      ],
                      sets: 4
                    },
                    {
                      id: "2", 
                      exercises: [
                        { exerciseId: "overhead-press", sets: 3, reps: 10, weight: 50 },
                        { exerciseId: "bent-over-row", sets: 3, reps: 10, weight: 70 }
                      ],
                      sets: 3
                    }
                  ],
                  tags: ["strength", "upper-body", "compound"],
                  lastCompleted: "2024-01-15T10:30:00Z",
                  completionCount: 12
                }}
                onStart={(workout) => console.log('Starting:', workout.title)}
                onClone={(workout) => console.log('Cloning:', workout.title)}
                showLastCompleted={true}
                showCompletionCount={true}
                searchTerm=""
              />
            </div>
            
            {/* Compact Layout Example */}
            <div>
              <h5 className="text-norse-gold font-medium mb-3">Compact Layout (Grid View)</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <WorkoutCard
                  compact={true}
                  workout={{
                    id: 2,
                    title: "Morning Cardio",
                    description: "Quick HIIT session",
                    entries: [
                      {
                        id: "1",
                        exercises: [
                          { exerciseId: "burpees", sets: 3, reps: 15, weight: 0 },
                          { exerciseId: "mountain-climbers", sets: 3, reps: 20, weight: 0 }
                        ],
                        sets: 3
                      }
                    ],
                    tags: ["cardio", "hiit"],
                    lastCompleted: "2024-01-16T07:00:00Z",
                    completionCount: 8
                  }}
                  onStart={(workout) => console.log('Starting:', workout.title)}
                />
                <WorkoutCard
                  compact={true}
                  workout={{
                    id: 3,
                    title: "Leg Day",
                    description: "Quad and glute focus",
                    entries: [
                      {
                        id: "1",
                        exercises: [
                          { exerciseId: "squats", sets: 4, reps: 12, weight: 100 },
                          { exerciseId: "lunges", sets: 3, reps: 10, weight: 25 }
                        ],
                        sets: 4
                      }
                    ],
                    tags: ["legs", "strength"],
                    lastCompleted: "2024-01-14T18:30:00Z",
                    completionCount: 15
                  }}
                  onStart={(workout) => console.log('Starting:', workout.title)}
                />
                <WorkoutCard
                  compact={true}
                  workout={{
                    id: 4,
                    title: "Core Stability",
                    entries: [
                      {
                        id: "1",
                        exercises: [
                          { exerciseId: "plank", sets: 3, reps: 1, weight: 0 },
                          { exerciseId: "dead-bug", sets: 3, reps: 8, weight: 0 }
                        ],
                        sets: 3
                      }
                    ],
                    tags: ["core"],
                    lastCompleted: "2024-01-13T12:00:00Z",
                    completionCount: 6
                  }}
                  onStart={(workout) => console.log('Starting:', workout.title)}
                />
              </div>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-neu-card rounded-lg">
            <h5 className="text-norse-gold font-medium mb-2">Key Features:</h5>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• <strong>Smart Duration:</strong> Formula: (sets × 45s) + ((sets-1) × 90s rest) + (exercises × 30s setup)</li>
              <li>• <strong>Exercise Preview:</strong> Shows first 3 exercises with "+X more" indicator</li>
              <li>• <strong>Date Formatting:</strong> "Today", "Yesterday", "3d ago", "2w ago", "1m ago"</li>
              <li>• <strong>Search Highlighting:</strong> Highlights matching terms in title, description, tags</li>
              <li>• <strong>Integrated Modal:</strong> Eye icon opens WorkoutSummaryModal with detailed stats</li>
              <li>• <strong>Responsive Stats:</strong> 6 stats (full) vs 3 stats (compact)</li>
              <li>• <strong>Norse Styling:</strong> Uses Card component with depth="subtle", surface="convex"</li>
            </ul>
          </div>
        </div>
      </ComponentShowcase>
      
      <ComponentShowcase title="WorkoutSummaryModal - Phase 2 Integration">
        <div className="p-6 bg-neu-surface shadow-neu rounded-xl">
          <h4 className="text-white font-medium mb-4">Enhanced Workout Summary Modal</h4>
          <p className="text-gray-400 text-sm mb-6">
            Phase 2 implementation using shadcn Dialog component with comprehensive workout analysis. 
            Features 6-stat grid, exercise breakdown, and integrated MuscleHighlighter visualization.
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h5 className="text-white font-medium mb-3">Modal Integration</h5>
              <div className="space-y-3 text-sm text-gray-300">
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-norse-gold" />
                  <span>Eye icon in WorkoutCard opens modal</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 bg-norse-gold rounded flex items-center justify-center text-xs text-black font-bold">T</span>
                  <span>Title click also triggers modal</span>
                </div>
                <div className="pl-6 space-y-1 text-xs text-gray-400">
                  <p>• Uses shadcn Dialog with Norse neumorphic styling</p>
                  <p>• Responsive: max-w-6xl with 90vh max-height</p>
                  <p>• Proper keyboard navigation and accessibility</p>
                </div>
              </div>
            </div>
            
            <div>
              <h5 className="text-white font-medium mb-3">Modal Content Structure</h5>
              <div className="space-y-2 text-sm text-gray-300">
                <div className="p-2 bg-neu-card rounded text-xs">
                  <p className="text-norse-gold font-medium">Header:</p>
                  <p className="text-gray-400">Workout title + description</p>
                </div>
                <div className="p-2 bg-neu-card rounded text-xs">
                  <p className="text-norse-gold font-medium">Stats Grid (6 cols):</p>
                  <p className="text-gray-400">Exercises, Sets, Reps, Volume, Heaviest, Duration</p>
                </div>
                <div className="p-2 bg-neu-card rounded text-xs">
                  <p className="text-norse-gold font-medium">Two-Column Layout:</p>
                  <p className="text-gray-400">Exercise List + MuscleHighlighter</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-4 p-4 bg-neu-card rounded-lg">
            <h5 className="text-norse-gold font-medium mb-2">Technical Implementation:</h5>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• <strong>Dialog Component:</strong> Uses shadcn Dialog with Norse design tokens</li>
              <li>• <strong>Statistics:</strong> Real-time calculation via calculateWorkoutMetrics</li>
              <li>• <strong>Exercise Data:</strong> Async loading with WGER API integration</li>
              <li>• <strong>Muscle Visualization:</strong> Enhanced MuscleHighlighter with workout mode</li>
              <li>• <strong>Responsive Design:</strong> Adapts from 1-column (mobile) to 2-column (desktop)</li>
            </ul>
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
      <Card variant="flat">
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