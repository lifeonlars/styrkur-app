'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowLeft, Palette, Component, Grid3x3, Building, Star } from 'lucide-react'

export default function StyleGuideLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  const navigationItems = [
    {
      id: 'overview',
      label: 'Overview',
      href: '/styleguide',
      icon: Star,
      description: 'Design philosophy & navigation'
    },
    {
      id: 'foundations',
      label: 'Foundations',
      href: '/styleguide/foundations',
      icon: Palette,
      description: 'Colors, typography, spacing'
    },
    {
      id: 'components',
      label: 'Components',
      href: '/styleguide/components',
      icon: Component,
      description: 'UI components & states'
    },
    {
      id: 'patterns',
      label: 'Patterns',
      href: '/styleguide/patterns',
      icon: Grid3x3,
      description: 'Workout interface patterns'
    },
    {
      id: 'brand',
      label: 'Brand',
      href: '/styleguide/brand',
      icon: Building,
      description: 'Logos, icons, assets'
    },
  ]

  const isActive = (href: string) => {
    if (href === '/styleguide') {
      return pathname === '/styleguide'
    }
    return pathname.startsWith(href)
  }

  return (
    <div className="min-h-screen bg-neu-background">
      {/* Header with Back Navigation */}
      <div className="sticky top-0 z-50 bg-neu-background/95 backdrop-blur-sm border-b border-neu-light/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link 
                href="/"
                className="flex items-center gap-2 px-4 py-2 bg-neu-surface shadow-neu rounded-xl text-gray-300 hover:text-white hover:shadow-neu-hover transition-all duration-200"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to App
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-white font-heading">Styrkur Design System</h1>
                <p className="text-sm text-gray-400">Norse-themed neumorphic component library</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <div className="sticky top-[88px] z-40 bg-neu-surface/95 backdrop-blur-sm border-b border-neu-light/5">
        <div className="max-w-7xl mx-auto px-6">
          <nav className="flex gap-1 py-2 overflow-x-auto">
            {navigationItems.map((item) => {
              const Icon = item.icon
              const active = isActive(item.href)
              
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                    active
                      ? 'bg-norse-gold text-black shadow-neu-gold'
                      : 'bg-neu-surface text-gray-300 hover:text-white hover:shadow-neu'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </nav>
        </div>
      </div>

      {/* Content Area */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {children}
      </main>
    </div>
  )
}