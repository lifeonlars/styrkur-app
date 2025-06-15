# Styrkurheim Development Rules

## Code Standards

### TypeScript

- Use strict TypeScript configuration
- Prefer interfaces over types for object shapes
- Use proper generic typing for API responses
- No `any` types - use `unknown` if needed
- Export types from dedicated files in `/types`

### React Patterns

- Functional components only (no class components)
- Use custom hooks for complex logic
- Prefer composition over inheritance
- Keep components under 200 lines
- Extract business logic to utility functions

### File Naming

- **Components**: PascalCase (`ExerciseCard.tsx`)
- **Hooks**: camelCase with `use` prefix (`useWgerApi.ts`)
- **Utilities**: camelCase (`programUtils.ts`)
- **Types**: PascalCase (`Exercise.ts`, `Workout.ts`)
- **Constants**: UPPER_SNAKE_CASE (`API_ENDPOINTS.ts`)

### Component Structure

```typescript
// Import order: React, external libs, internal components, types, utils, styles
import { useState, useEffect } from 'react'
import { Button } from '@/ui/button'
import { ExerciseCard } from '@/components/ExerciseCard'
import type { Exercise } from '@/types/Exercise'
import { formatWeight } from '@/lib/utils'
import { cn } from '@/lib/utils'
import styles from './Component.module.css'

interface ComponentProps {
  className?: string
  // Other props
}

export function Component({ className, ...props }: ComponentProps) {
  // State hooks first
  // Effect hooks second 
  // Custom hooks third
  // Event handlers
  // Render helpers
  
  return (
    <div className={cn(styles.component, className)}>
      <h2 className={styles['component__title']}>Title</h2>
      <div className={cn(styles['component__content'], styles['component__content--highlighted'])}>
        Content
      </div>
    </div>
  )
}
```

## Styling Guidelines

### CSS Modules + BEM Architecture

- Use CSS Modules for component-scoped styling
- Follow BEM (Block Element Modifier) naming convention
- Leverage CSS custom properties for design tokens
- Create semantic, maintainable class names
- Build neumorphic design patterns with multi-layered shadows

### Norse Neumorphic Design System

```css
/* Design Token Architecture */
:root {
  /* Norse Gold Palette */
  --norse-gold: #C3A869;
  --norse-gold-light: #D4BC7F;
  --norse-gold-dark: #A89253;
  --norse-gold-darker: #8D7A42;
  
  /* Neumorphic Surface Hierarchy */
  --neu-background: #2c2f36;
  --neu-surface: #343940;
  --neu-card: #3d424f;
  --neu-elevated: #454a57;
  
  /* Multi-layered Shadows */
  --shadow-neu: -4px -4px 12px rgba(255, 255, 255, 0.04), 
                4px 4px 12px rgba(15, 17, 20, 0.2);
  --shadow-neu-inset: inset 3px 3px 8px rgba(15, 17, 20, 0.2), 
                      inset -3px -3px 8px rgba(255, 255, 255, 0.03);
  --shadow-neu-gold: -4px -4px 12px rgba(195, 168, 105, 0.08), 
                     4px 4px 12px rgba(15, 17, 20, 0.2);
  
  /* Contextual Color Palette */
  --forest-500: #2E7D5F; /* Success */
  --blood-500: #A83232;  /* Error */
  --ocean-500: #375A74;  /* Info */
  --wood-500: #5C4533;   /* Warning */
  --iron-600: #1F2937;   /* Neutral */
}

/* BEM Component Example */
.exercise-card {
  /* Block styles */
}

.exercise-card__title {
  /* Element styles */
}

.exercise-card--highlighted {
  /* Modifier styles */
}
```

### Responsive Design

- Mobile-first approach (min-width breakpoints)
- Touch-friendly targets (44px minimum) 
- Dark mode only with neumorphic elevation
- Tesla Cybertruck-inspired organic pill shapes
- Multi-layered shadow system for depth perception
- Test on 375px width minimum

## API Integration Rules

### WGER API

- Always handle loading states
- Implement proper error boundaries
- Cache responses in memory/localStorage
- Provide offline fallbacks
- Debounce search requests (300ms)

```typescript
// API call pattern
const useWgerExercises = (query: string) => {
  const [data, setData] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Implementation with proper error handling
};
```

### State Management

- Keep state close to where it's used
- Use Context for truly global state only
- Prefer derived state over cached state
- Use useReducer for complex state updates

## Testing Requirements

### Unit Tests

- Test all utility functions
- Test custom hooks with React Testing Library
- Mock WGER API calls with MSW
- Aim for 80% coverage on business logic

### Component Tests

- Test user interactions (button clicks, form submissions)
- Test conditional rendering
- Test accessibility (aria labels, keyboard navigation)
- Mock complex dependencies

### Integration Tests

- Test complete user flows (create workout, start training)
- Test offline functionality
- Test API error scenarios

## Performance Guidelines

### Bundle Size

- Lazy load routes with React.lazy()
- Tree-shake unused dependencies
- Optimize CSS Modules with production builds
- Optimize images (use WebP, proper sizing)
- Monitor bundle with webpack-bundle-analyzer
- Leverage Next.js built-in optimizations

### Runtime Performance

- Memoize expensive calculations
- Use React.memo for pure components
- Debounce user inputs (search, filters)
- Virtualize long lists if needed

## Security & Privacy

### Data Handling

- Never store sensitive data in localStorage
- Sanitize user inputs
- Validate API responses
- Use HTTPS for all external calls

### User Privacy

- No tracking/analytics initially
- Offline-first approach
- Minimal data collection
- Clear about what data is stored

## Git Workflow

### Commit Messages

```
feat: add exercise search with WGER API
fix: resolve set completion state bug
refactor: extract workout utils to separate file
docs: update component documentation
test: add unit tests for program calculations
```

### Branch Naming

- `feature/wger-api-integration`
- `refactor/typescript-conversion`
- `fix/superset-state-bug`

### PR Requirements

- All tests passing
- No TypeScript errors
- Component tests for new features
- Update documentation if needed

## Error Handling

### User Experience

- Show loading states for all async operations
- Provide helpful error messages (not technical details)
- Graceful degradation when APIs fail
- Offline indicators and fallbacks

### Development

- Use Error Boundaries for component crashes
- Log errors to console in development
- Prepare for error reporting service (future)

## Accessibility

### Requirements

- Semantic HTML elements
- ARIA labels for interactive elements
- Keyboard navigation support
- Color contrast ratios (dark mode)
- Screen reader compatibility

### Testing

- Test with keyboard only
- Test with screen reader
- Check color contrast
- Validate HTML semantics
