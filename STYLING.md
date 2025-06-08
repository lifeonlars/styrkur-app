# Styrkurheim Styling System

## Overview
This document explains the styling system and automated testing implemented for the Styrkurheim Norse fitness tracker app.

## Architecture

### Core Technologies
- **Tailwind CSS 3.4.17**: Utility-first CSS framework
- **Next.js 15**: Built-in CSS optimization and processing
- **PostCSS**: CSS processing with autoprefixer
- **Custom CSS Variables**: Norse-themed color palette

### Key Files
- `src/app/globals.css`: Global styles and Tailwind directives
- `tailwind.config.js`: Tailwind configuration with custom colors
- `postcss.config.js`: PostCSS configuration
- `src/lib/css-test.ts`: CSS testing utility
- `scripts/test-styling.js`: Automated styling verification

## Color Palette

### Primary Colors
- **Norse Gold**: `#C3A869` - Primary accent color
- **Dark Background**: `#111827` (gray-900) - Main background
- **Medium Gray**: `#1f2937` (gray-800) - Card backgrounds
- **Light Gray**: `#374151` (gray-700) - Borders and secondary elements

### CSS Variables
```css
:root {
  --primary-color: #C3A869;
  --background: 220 13% 9%;
  --foreground: 220 14% 96%;
  /* ... additional variables */
}
```

## Responsive Design

### Breakpoints
- **Mobile First**: Default styles for mobile (320px+)
- **Desktop**: `lg:` prefix for 1024px+ screens
- **Wide Desktop**: `xl:` prefix for 1280px+ screens

### Container System
```css
.container-responsive {
  @apply w-full max-w-md mx-auto lg:max-w-4xl xl:max-w-6xl;
}
```

## Custom Components

### Button Styles
```css
.btn-primary {
  background-color: #C3A869;
  color: #000000;
  font-weight: 500;
  transition: all 0.2s ease-in-out;
}
```

### Card Hover Effects
```css
.card-hover {
  transition: all 0.2s ease-in-out;
}

.card-hover:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(195, 168, 105, 0.15);
}
```

## Automated Testing

### CSS Test Utility (`src/lib/css-test.ts`)
- **Critical Classes Array**: Maintains list of essential CSS classes
- **Runtime Testing**: Verifies CSS is applied correctly
- **Build Integration**: Forces inclusion of critical classes

### Styling Verification Script (`scripts/test-styling.js`)
Automated checks for:
1. ✅ Tailwind configuration validity
2. ✅ Required CSS directives in globals.css
3. ✅ TypeScript compilation success
4. ✅ Critical CSS classes in build output
5. ✅ CSS test utility functionality

### Pre-commit Hook (`.git/hooks/pre-commit`)
Automatically runs styling tests before each commit to prevent styling regressions.

## Usage

### Running Tests
```bash
# Run all styling tests
npm run test:styling

# Run specific test
npm test -- --testPathPattern=styling.test.tsx

# Force styling verification
node scripts/test-styling.js
```

### Development Workflow
1. Make styling changes
2. Test locally with `npm run dev`
3. Run `npm run test:styling` to verify
4. Commit changes (pre-commit hook runs automatically)

### Adding New Styles
1. Add new CSS classes to `CRITICAL_CSS_CLASSES` in `css-test.ts`
2. Update `globals.css` if needed
3. Run styling tests to ensure everything works
4. Document new styles in this file

## Troubleshooting

### Common Issues

#### Styling Not Applied
1. Check if classes are in `CRITICAL_CSS_CLASSES`
2. Verify Tailwind config includes file patterns
3. Run `npm run test:styling` for diagnosis

#### Build Fails
1. Check TypeScript errors in CSS test utility
2. Verify all imports are correct
3. Ensure CSS files are properly structured

#### Pre-commit Hook Fails
1. Run `npm run test:styling` manually
2. Fix any reported issues
3. Try commit again

### Debug Commands
```bash
# Check Tailwind config
npx tailwindcss --config tailwind.config.js

# Verify CSS generation
npm run build && ls -la .next/static/css/

# Test CSS utility manually
node -e "console.log(require('./src/lib/css-test.ts').testCriticalCSS())"
```

## Best Practices

### Class Naming
- Use Tailwind utilities first
- Custom classes for reusable components only
- Prefix custom classes with project name if needed

### Performance
- Critical CSS classes are automatically included
- Unused classes are purged by Tailwind
- CSS is optimized in production builds

### Maintenance
- Update `CRITICAL_CSS_CLASSES` when adding new components
- Run styling tests after major changes
- Document new patterns in this file

## Migration Notes

### From Broken Styling
This system was implemented to fix recurring styling issues where:
1. CSS classes were being purged incorrectly
2. No automated detection of styling problems
3. Manual testing was required after each change

### Future Improvements
- Visual regression testing with screenshots
- Automated cross-browser testing
- Performance monitoring for CSS bundle size
- Integration with design tokens system

---

**Generated for Styrkurheim Norse Fitness Tracker**  
*Strength through reliable styling* ⚡