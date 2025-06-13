const { heroui } = require('@heroui/theme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/ui/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/components/(button|card|checkbox|dropdown|input|modal|popover|progress|select|skeleton|spinner|toggle|tabs|ripple|form|menu|divider|listbox|scroll-shadow).js"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['var(--font-cinzel)', 'serif'],
      },
    },
  },
  darkMode: "class",
  plugins: [
    heroui({
      themes: {
        dark: {
          colors: {
            // Background hierarchy based on styleguide
            background: "#111111", // --bg-primary
            foreground: "#F0F0F0", // --text-primary
            
            // Content surfaces
            content1: "#1E1E1E", // --surface-1 (primary card surface)
            content2: "#2A2A2A", // --surface-2 (secondary card)
            content3: "#3a3a3f", // --surface-3 (overlay/alt section)
            content4: "#3B3F46", // iron-300
            
            // Primary brand color (Norse Gold)
            primary: {
              50: "#F5F1E8",
              100: "#EAE1D0", 
              200: "#DAC8A8",
              300: "#CAAF80",
              400: "#D6C088",
              500: "#C3A869", // Norse Gold main
              600: "#B19651",
              700: "#8F7A42",
              800: "#6D5E33",
              900: "#4B4224",
              DEFAULT: "#C3A869",
              foreground: "#111111",
            },
            
            // Secondary/accent colors
            secondary: {
              50: "#3B3F46",
              100: "#2D3138", 
              200: "#1F2329",
              300: "#14171B",
              400: "#2D3138",
              500: "#2D3138", // iron-500
              600: "#1F2329",
              700: "#14171B",
              800: "#0F1216",
              900: "#0A0D10",
              DEFAULT: "#2D3138",
              foreground: "#F0F0F0",
            },
            
            // Success (Forest)
            success: {
              50: "#E8F5F0",
              100: "#C3E9D7",
              200: "#9DDCBD",
              300: "#598977",
              400: "#47A484",
              500: "#2E7D5F", // forest-500
              600: "#1E5740",
              700: "#123828",
              800: "#0E2B1F",
              900: "#0A1E16",
              DEFAULT: "#2E7D5F",
              foreground: "#F0F0F0",
            },
            
            // Danger (Blood)
            danger: {
              50: "#F5E6E6",
              100: "#E6BFBF",
              200: "#D69999",
              300: "#CC5C5C",
              400: "#B84747",
              500: "#A83232", // blood-500
              600: "#7A2424",
              700: "#501717",
              800: "#3D1212",
              900: "#2A0C0C",
              DEFAULT: "#A83232",
              foreground: "#F0F0F0",
            },
            
            // Warning/info (Ocean)
            warning: {
              50: "#E8F0F5",
              100: "#C4D9E6",
              200: "#9FC1D6",
              300: "#4D6D88",
              400: "#416384",
              500: "#375A74", // ocean-500
              600: "#27425A",
              700: "#192D3E",
              800: "#13222F",
              900: "#0D1720",
              DEFAULT: "#375A74",
              foreground: "#F0F0F0",
            },
            
            // Focus and borders
            focus: "#C3A869",
            divider: "#2A2A2A",
            overlay: "#111111",
            
            // Default color mapping
            default: {
              50: "#F5F5F5",
              100: "#E5E5E5",
              200: "#D4D4D8", 
              300: "#A1A1AA",
              400: "#71717A",
              500: "#52525B",
              600: "#3F3F46",
              700: "#2A2A2A", // surface-2
              800: "#1E1E1E", // surface-1  
              900: "#111111", // bg-primary
              DEFAULT: "#2A2A2A",
              foreground: "#F0F0F0",
            }
          },
        },
      },
    }),
  ],
}