/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/ui/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['var(--font-cinzel)', 'serif'],
      },
      // Ultra-soft neumorphic shadows - inspired by Tesla Cybertruck UI
      boxShadow: {
        // Multi-layered shadows for ultra-soft effect with wide spread
        'neu-flat': 
          '-2px -2px 8px rgba(255, 255, 255, 0.03), ' +
          '2px 2px 8px rgba(15, 17, 20, 0.15), ' +
          '-1px -1px 3px rgba(255, 255, 255, 0.02), ' +
          '1px 1px 3px rgba(15, 17, 20, 0.1)',
        
        'neu': 
          '-4px -4px 12px rgba(255, 255, 255, 0.04), ' +
          '4px 4px 12px rgba(15, 17, 20, 0.2), ' +
          '-2px -2px 6px rgba(255, 255, 255, 0.03), ' +
          '2px 2px 6px rgba(15, 17, 20, 0.15)',
        
        'neu-lg': 
          '-6px -6px 20px rgba(255, 255, 255, 0.06), ' +
          '6px 6px 20px rgba(15, 17, 20, 0.25), ' +
          '-3px -3px 10px rgba(255, 255, 255, 0.04), ' +
          '3px 3px 10px rgba(15, 17, 20, 0.18)',
        
        // Inset shadows for inputs - multiple layers for ultra-soft feel
        'neu-inset': 
          'inset 3px 3px 8px rgba(15, 17, 20, 0.2), ' +
          'inset -3px -3px 8px rgba(255, 255, 255, 0.03), ' +
          'inset 1px 1px 4px rgba(15, 17, 20, 0.15), ' +
          'inset -1px -1px 4px rgba(255, 255, 255, 0.02)',
        
        'neu-inset-lg': 
          'inset 4px 4px 12px rgba(15, 17, 20, 0.25), ' +
          'inset -4px -4px 12px rgba(255, 255, 255, 0.04), ' +
          'inset 2px 2px 6px rgba(15, 17, 20, 0.18), ' +
          'inset -2px -2px 6px rgba(255, 255, 255, 0.03)',
        
        // Enhanced hover with wider spread
        'neu-hover': 
          '-6px -6px 16px rgba(255, 255, 255, 0.08), ' +
          '6px 6px 16px rgba(15, 17, 20, 0.3), ' +
          '-3px -3px 8px rgba(255, 255, 255, 0.05), ' +
          '3px 3px 8px rgba(15, 17, 20, 0.2)',
        
        // Pressed state with soft inset
        'neu-pressed': 
          'inset 2px 2px 6px rgba(15, 17, 20, 0.3), ' +
          'inset -2px -2px 6px rgba(255, 255, 255, 0.05), ' +
          'inset 1px 1px 3px rgba(15, 17, 20, 0.2)',
        
        // Focus with Norse gold accent
        'neu-focus': 
          '0 0 0 2px rgba(195, 168, 105, 0.3), ' +
          '-4px -4px 12px rgba(255, 255, 255, 0.04), ' +
          '4px 4px 12px rgba(15, 17, 20, 0.2)',
        
        // Gold variants with ultra-soft Norse gold highlights
        'neu-gold': 
          '-4px -4px 12px rgba(195, 168, 105, 0.08), ' +
          '4px 4px 12px rgba(15, 17, 20, 0.2), ' +
          '-2px -2px 6px rgba(195, 168, 105, 0.05), ' +
          '2px 2px 6px rgba(15, 17, 20, 0.15)',
        
        'neu-gold-hover': 
          '-6px -6px 16px rgba(195, 168, 105, 0.12), ' +
          '6px 6px 16px rgba(15, 17, 20, 0.3), ' +
          '-3px -3px 8px rgba(195, 168, 105, 0.08), ' +
          '3px 3px 8px rgba(15, 17, 20, 0.2)',
        
        'neu-gold-pressed': 
          'inset 2px 2px 6px rgba(15, 17, 20, 0.3), ' +
          'inset -2px -2px 6px rgba(195, 168, 105, 0.06), ' +
          'inset 1px 1px 3px rgba(15, 17, 20, 0.2)',
      },
      
      // Neumorphic border styles - subtle light keylines for crisp edges
      borderColor: {
        'neu-light': 'rgba(255, 255, 255, 0.1)',
        'neu-lighter': 'rgba(255, 255, 255, 0.15)',
        'neu-subtle': 'rgba(255, 255, 255, 0.08)',
        'neu-gold-light': 'rgba(195, 168, 105, 0.2)',
        'neu-gold-subtle': 'rgba(195, 168, 105, 0.1)',
      },
      
      // Deep charcoal gradients inspired by the neumorphic examples
      backgroundImage: {
        'neu-base': 'linear-gradient(145deg, #2c2f36, #252831)',
        'neu-elevated': 'linear-gradient(145deg, #2f3239, #28292f)', 
        'neu-sunken': 'linear-gradient(145deg, #1f2126, #252831)',
        'neu-button': 'linear-gradient(145deg, #2a2d33, #242530)',
        'neu-card': 'linear-gradient(145deg, #31343b, #2a2d33)',
        'neu-surface': 'linear-gradient(145deg, #2d3037, #252831)',
        
        // Norse gold metallic gradients - sophisticated gold with proper light/dark tones
        'neu-gold-metallic': 'linear-gradient(145deg, #C3A869, #B8A260, #A89253)',
        'neu-gold-light': 'linear-gradient(145deg, #D4BC7F, #C3A869, #B8A260)',
        'neu-gold-dark': 'linear-gradient(145deg, #B8A260, #A89253, #8D7A42)',
        'neu-gold-subtle': 'linear-gradient(145deg, rgba(195, 168, 105, 0.12), rgba(184, 162, 96, 0.06))',
        
        // Large gradient backgrounds for main surfaces
        'neu-main-bg': 'radial-gradient(ellipse at top, #2f323a, #252831), linear-gradient(145deg, #2c2f36, #1f2126)',
        'neu-card-bg': 'radial-gradient(ellipse at center, #363942, #2a2d33), linear-gradient(135deg, #31343b, #252831)',
        'neu-modal-bg': 'radial-gradient(ellipse at center, #3a3d45, #2d3037), linear-gradient(145deg, #34373e, #282a30)',
        
        // Neumorphic gradient borders - light keylines for crisp definition
        'neu-border': 'linear-gradient(145deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.05))',
        'neu-border-subtle': 'linear-gradient(145deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.03))',
        'neu-border-gold': 'linear-gradient(145deg, rgba(195, 168, 105, 0.25), rgba(195, 168, 105, 0.08))',
        'neu-border-inset': 'linear-gradient(145deg, rgba(15, 17, 20, 0.3), rgba(255, 255, 255, 0.1))',
      },
      
      // Deep charcoal neumorphic color palette with bronze-gold accents
      colors: {
        // Neumorphic background hierarchy (darkest to lightest)
        'neu-background': '#2c2f36', // Page background
        'neu-surface': '#343940',    // Cards, elevated surfaces  
        'neu-card': '#3d424f',       // Main content cards
        'neu-elevated': '#454a57',   // Hover states, highlighted areas
        
        // Legacy charcoal colors for compatibility
        'neu-darkest': '#1a1c20',    // Deepest charcoal
        'neu-darker': '#1f2126',     // Dark charcoal
        'neu-dark': '#252831',       // Main charcoal
        'neu-base': '#2c2f36',       // Raised charcoal
        'neu-light': '#383b42',      // Light charcoal
        'neu-lighter': '#3f4248',    // Lightest charcoal
        
        // Norse gold metallic accents - original Norse gold #C3A869 based
        'norse-gold': '#C3A869',        // Original Norse gold from styleguide
        'norse-gold-light': '#D4BC7F',  // Light Norse gold
        'norse-gold-dark': '#A89253',   // Dark Norse gold
        'norse-gold-darker': '#8D7A42', // Darker Norse gold
        'norse-accent': '#B8A260',      // Norse accent
        
        // Context colors from original styleguide - Forest (Success)
        'forest-300': '#4AE5A8',
        'forest-400': '#3BC692',
        'forest-500': '#2E7D5F',
        'forest-600': '#25654C',
        'forest-700': '#1C4D39',
        
        // Blood (Error)
        'blood-300': '#F87171',
        'blood-400': '#EF4444',
        'blood-500': '#A83232',
        'blood-600': '#8B2828',
        'blood-700': '#6F1F1F',
        
        // Ocean (Info)
        'ocean-300': '#7DD3FC',
        'ocean-400': '#38BDF8',
        'ocean-500': '#375A74',
        'ocean-600': '#2D4A5F',
        'ocean-700': '#243A4A',
        
        // Wood (Warning)
        'wood-300': '#A78BFA',
        'wood-400': '#8B5CF6',
        'wood-500': '#5C4533',
        'wood-600': '#4A3729',
        'wood-700': '#38291F',
        
        // Iron (Neutral)
        'iron-200': '#4B5563',
        'iron-300': '#3B3F46',
        'iron-400': '#374151',
        'iron-500': '#2D3138',
        'iron-600': '#1F2937',
        'iron-700': '#111827',
      },
      
      // Enhanced transitions for neumorphic interactions
      transitionDuration: {
        'neu': '200ms',
      },
      
      // Custom transform utilities for micro-interactions
      translate: {
        'neu': '1px',
        'neu-lg': '2px',
      }
    },
  },
  darkMode: "class",
  plugins: [],
}