'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/ui/card'
import { ComponentShowcase } from '@/components/styleguide/StyleGuideComponents'

export default function BrandPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-h1 text-white mb-2">Brand</h1>
        <p className="text-gray-400">Logo variations, icons, and brand assets</p>
      </div>

      <ComponentShowcase title="Brand Story">
        <div className="p-6 bg-neu-surface shadow-neu rounded-xl">
          <div className="max-w-3xl">
            <h3 className="text-h3 text-white mb-4">Styrkur Saga</h3>
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

          {/* Icon Size Guidelines */}
          <div className="pt-4 border-t border-gray-700">
            <h4 className="text-white font-medium mb-3">Icon Size Guidelines</h4>
            <div className="p-4 bg-neu-card rounded-lg mb-4">
              <p className="text-sm text-norse-gold font-medium mb-2">⚠️ Minimum Icon Size Rule</p>
              <p className="text-sm text-gray-300">
                <strong>All icons must be at least 12x12px (3x3 grid units)</strong> to ensure readability and accessibility compliance. 
                This applies to Lucide icons, brand glyphs, and custom iconography.
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 text-sm text-gray-300">
              <div>
                <p className="font-medium text-white mb-2">Standard Sizes:</p>
                <ul className="space-y-1 text-xs">
                  <li>• <strong>12px (w-3 h-3):</strong> Minimum size - status indicators</li>
                  <li>• <strong>16px (w-4 h-4):</strong> Small UI icons in buttons</li>
                  <li>• <strong>24px (w-6 h-6):</strong> Standard interactive icons</li>
                  <li>• <strong>32px (w-8 h-8):</strong> Larger interactive elements</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-2">Do:</p>
                <ul className="space-y-1 text-xs">
                  <li>• Maintain minimum clear space around logos</li>
                  <li>• Use on contrasting backgrounds</li>
                  <li>• Scale proportionally</li>
                  <li>• Use provided file formats</li>
                  <li>• <strong>Follow 12px minimum size rule</strong></li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-2">Don't:</p>
                <ul className="space-y-1 text-xs">
                  <li>• Stretch or distort the logo</li>
                  <li>• Change colors or add effects</li>
                  <li>• Use on busy backgrounds</li>
                  <li>• <strong>Scale icons below 12x12px</strong></li>
                  <li>• Use inconsistent icon sizes in same context</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </ComponentShowcase>

      {/* Asset Information */}
      <Card variant="flat">
        <CardHeader>
          <CardTitle>Brand Asset Information</CardTitle>
          <CardDescription>Available brand assets and file formats</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 text-sm text-gray-300">
            <p>
              All brand assets are located in the <code className="text-norse-gold">/public/assets/branding/</code> directory 
              and are provided as scalable SVG files for crisp display at any size.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-white font-medium mb-2">Available Assets:</h4>
                <ul className="space-y-1 text-xs">
                  <li>• LogoHorizontal.svg - Primary logo</li>
                  <li>• LogoVertical-Tagline.svg - Hero sections</li>
                  <li>• Wordmark.svg - Text-only logo</li>
                  <li>• WordmarkStacked.svg - Vertical layout</li>
                  <li>• Glyph.svg - Icon/symbol only</li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-medium mb-2">Usage Context:</h4>
                <ul className="space-y-1 text-xs">
                  <li>• Headers and navigation bars</li>
                  <li>• Marketing and promotional materials</li>
                  <li>• Application icons and favicons</li>
                  <li>• Loading screens and splash pages</li>
                  <li>• Social media profile images</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}