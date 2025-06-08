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
// Import order: React, external libs, internal components, types, utils
import { useState, useEffect } from 'react';
import { Button } from '@/ui/button';
import { ExerciseCard } from '@/components/ExerciseCard';
import type { Exercise } from '@/types/Exercise';
import { formatWeight } from '@/lib/utils';

interface ComponentProps {
  // Props definition
}

export function Component({ prop }: ComponentProps) {
  // State hooks first
  // Effect hooks second
  // Custom hooks third
  // Event handlers
  // Render helpers
  // Return JSX
}
```

## Styling Guidelines

### Shadcn Integration

- Use Shadcn components as base building blocks
- Customize with CSS variables for Norse theming
- Extend Shadcn variants for fitness-specific states
- Maintain consistent spacing using Tailwind scale

### Norse Design System

```typescript
// Color palette
const colors = {
  primary: '#C3A869', // Norse Gold
  background: '#111827', // Gray-900
  card: '#1F2937', // Gray-800
  text: '#F9FAFB', // Gray-50
  muted: '#9CA3AF', // Gray-400
};

// Component naming convention
// Use Norse mythology references
// Examples: OdinStrength, ThorHammer, ValkyrieForm
// Keep names meaningful and searchable
```

### Responsive Design

- Mobile-first approach (min-width breakpoints)
- Touch-friendly targets (44px minimum)
- Dark mode only (no light mode toggle needed)
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
- Tree-shake unused Shadcn components
- Optimize images (use WebP, proper sizing)
- Monitor bundle with webpack-bundle-analyzer

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
