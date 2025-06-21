'use client'

import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/ui/card'
import { Palette, Component, Grid3x3, Building, ArrowRight, Shield, Zap, Eye } from 'lucide-react'

export default function StyleGuideOverview() {
  const sections = [
    {
      id: 'foundations',
      title: 'Foundations',
      description: 'Colors, typography, neumorphic system matrix, spacing scale',
      href: '/styleguide/foundations',
      icon: Palette,
      status: '✅ Ready',
      highlight: 'Norse Gold palette & 4-depth neumorphic system'
    },
    {
      id: 'components',
      title: 'Components',
      description: 'All components with states: hover, focus, active, disabled, loading',
      href: '/styleguide/components',
      icon: Component,
      status: '✅ Ready',
      highlight: 'BEM + CSS Modules with utility combinations'
    },
    {
      id: 'patterns',
      title: 'Patterns',
      description: 'Workout-specific interface patterns and layouts',
      href: '/styleguide/patterns',
      icon: Grid3x3,
      status: '✅ Ready',
      highlight: 'WorkoutCard, WorkoutSummaryModal, MuscleHighlighter patterns'
    },
    {
      id: 'brand',
      title: 'Brand',
      description: 'Logo variations, icons, and brand assets',
      href: '/styleguide/brand',
      icon: Building,
      status: '✅ Ready',
      highlight: 'SVG assets from /public folder'
    },
  ]

  const designPrinciples = [
    {
      icon: Shield,
      title: 'Norse Mythology',
      description: 'Strength, craftsmanship, and warrior spirit embodied in every interface element'
    },
    {
      icon: Zap,
      title: 'Neumorphic Physics',
      description: 'Sharp definition, crisp edges, and premium elevation with consistent 115° light direction'
    },
    {
      icon: Eye,
      title: 'Scandinavian Minimalism',
      description: 'Clean, purposeful design with three essential variants and semantic states only'
    }
  ]

  return (
    <div className="space-y-8">
      {/* Design Philosophy */}
      <div className="space-y-6">
        <div>
          <h1 className="text-h1 text-white mb-2">Styrkur Design System</h1>
          <p className="text-gray-400 text-lg">Norse mythology meets Scandinavian minimalism with neumorphic styling</p>
        </div>

        <Card variant="elevated" size="large">
          <CardHeader>
            <CardTitle>Design Philosophy</CardTitle>
            <CardDescription>Three core principles guide every component and interaction</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {designPrinciples.map((principle) => {
                const Icon = principle.icon
                return (
                  <div key={principle.title} className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-norse-gold rounded-lg">
                        <Icon className="w-5 h-5 text-black" />
                      </div>
                      <h3 className="text-lg font-semibold text-white">{principle.title}</h3>
                    </div>
                    <p className="text-sm text-gray-300 leading-relaxed">{principle.description}</p>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Section Navigation */}
      <div>
        <h2 className="text-h2 text-white mb-6">Design System Sections</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sections.map((section) => {
            const Icon = section.icon
            return (
              <Link key={section.id} href={section.href}>
                <Card variant="interactive" hoverLift className="h-full">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-neu-surface shadow-neu rounded-lg">
                          <Icon className="w-5 h-5 text-norse-gold" />
                        </div>
                        <div>
                          <CardTitle>{section.title}</CardTitle>
                          <div className="text-xs text-gray-400 mt-1">{section.status}</div>
                        </div>
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                    </div>
                    <CardDescription>{section.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-norse-gold font-medium">
                      {section.highlight}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>

      {/* AI Reference Note */}
      <Card variant="flat">
        <CardHeader>
          <CardTitle>AI Consistency Tool</CardTitle>
          <CardDescription>Visual reference system for maintaining design consistency</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm text-gray-300">
            <p>
              This StyleGuide serves as a comprehensive visual reference for Claude Code to maintain 
              design consistency across all implementations. Each section demonstrates proper utility 
              class combinations, component states, and design patterns.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <h4 className="text-white font-medium mb-2">Key Features:</h4>
                <ul className="space-y-1 text-xs">
                  <li>• Visual examples of all component states</li>
                  <li>• Utility class combination demonstrations</li>
                  <li>• Norse-themed neumorphic design patterns</li>
                  <li>• BEM + CSS Modules implementation guide</li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-medium mb-2">Usage Guidelines:</h4>
                <ul className="space-y-1 text-xs">
                  <li>• Reference before implementing new components</li>
                  <li>• Follow existing utility class patterns</li>
                  <li>• Maintain Norse gold for primary actions only</li>
                  <li>• Preserve neumorphic physics consistency</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}