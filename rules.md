# Styrkur Saga Development Rules

## Regression Prevention Workflow

1. **Research Phase**: Read relevant files, check styleguide - NO CODE YET
2. **Plan Phase**: Create implementation plan - use "think" for complex tasks
3. **Implement Phase**: Write code following established patterns
4. **Verify Phase**: Test against styleguide examples and QA requirements

## Code Standards

### Architecture

- **CSS Modules + BEM** with neumorphic design utilities
- **TypeScript strict mode** - no `any` types, proper component typing
- **Functional components only** - under 200 lines, single responsibility
- **Mobile-first responsive** - Tesla Cybertruck-inspired organic shapes

### Component Structure Pattern

```typescript
// Import order: React, external libs, internal components, types, utils, styles
import { useState, useEffect } from 'react';
import { Button } from '@/ui/button';
import { ExerciseCard } from '@/components/ExerciseCard';
import type { Exercise } from '@/types/Exercise';
import { formatWeight } from '@/lib/utils';
import { cn } from '@/lib/utils';
import styles from './Component.module.css';

interface ComponentProps {
  className?: string;
  // Other props with proper typing
}

export function Component({ className, ...props }: ComponentProps) {
  // 1. State hooks first
  const [loading, setLoading] = useState(false);

  // 2. Effect hooks second
  useEffect(() => {
    // Side effects
  }, []);

  // 3. Custom hooks third
  const { data, error } = useCustomHook();

  // 4. Event handlers
  const handleClick = () => {
    // Event handling logic
  };

  // 5. Render helpers
  const renderContent = () => {
    // Complex rendering logic
  };

  return (
    <div className={cn(styles.component, 'depth-subtle surface-flat', className)}>
      <h2 className={styles['component__title']}>Title</h2>
      <div
        className={cn(styles['component__content'], styles['component__content--highlighted'])}
      >
        {renderContent()}
      </div>
    </div>
  );
}
```

### File Naming Conventions

- **Components**: PascalCase (`ExerciseCard.tsx`)
- **Hooks**: camelCase with `use` prefix (`useWgerApi.ts`)
- **Utilities**: camelCase (`programUtils.ts`)
- **Types**: PascalCase (`Exercise.ts`, `Workout.ts`)
- **Constants**: UPPER_SNAKE_CASE (`API_ENDPOINTS.ts`)
- **CSS Modules**: `Component.module.css`

### TypeScript Guidelines

- Use strict TypeScript configuration
- Prefer interfaces over types for object shapes
- Use proper generic typing for API responses
- No `any` types - use `unknown` if needed
- Export types from dedicated files in `/types`

## Design System Enforcement

### Check First, Code Second

1. **Check `/styleguide/components`** - Does this component already exist?
2. **Reference `DESIGN_SYSTEM.md`** - Use established utility combinations
3. **Follow neumorphic physics** - Concave for sunken, convex for raised
4. **Norse gold only** - For primary actions, no other accent colors

### Utility Class Usage

```css
/* Required combinations - don't create new shadows */
.depth-sunken + .surface-concave   /* Pressed states, inputs */
.depth-elevated + .surface-convex  /* Primary buttons, cards */
.depth-subtle + .surface-flat      /* Secondary buttons, containers */
.depth-flat + .surface-flat; /* Navigation, minimal elements */
```

### BEM Naming in CSS Modules

```css
/* Block */
.exercise-card {
  /* Base component styles */
}

/* Element */
.exercise-card__title {
  /* Component part styles */
}

.exercise-card__content {
  /* Another component part */
}

/* Modifier */
.exercise-card--highlighted {
  /* Variant/state styles */
}

.exercise-card--interactive {
  /* Another variant */
}
```

## Component Creation Process

1. **Audit existing patterns** - Check styleguide components first
2. **Plan utility combinations** - Use established depth/surface/border classes
3. **Implement with BEM** - Follow CSS Modules + BEM naming
4. **Document in styleguide** - Add visual example with all states
5. **Test all interactive states** - hover, focus, active, disabled, loading

## Quality Gates

### Pre-Commit Checklist

- [ ] Checked styleguide for existing patterns
- [ ] Used established utility classes (no new shadow definitions)
- [ ] Followed BEM naming convention
- [ ] Tested all interactive states
- [ ] Component under 200 lines
- [ ] TypeScript strict compliance
- [ ] Responsive mobile-first design

### Visual Consistency Requirements

- **Match styleguide examples exactly** - No visual regressions
- **Test responsive behavior** - Mobile/desktop variations
- **Verify interaction states** - All states properly implemented
- **QA verification required** - No functional commits until user testing

### Performance Standards

- **Lazy load heavy components** - Optimize bundle size
- **Debounce search/API calls** - 300ms standard
- **Proper loading states** - Never leave users hanging
- **Error boundaries** - Graceful failure handling

## React Patterns

### State Management

- **Keep state close to usage** - Avoid prop drilling
- **Use Context sparingly** - Only for truly global state
- **Prefer derived state** - Over cached/duplicate state
- **useReducer for complex updates** - When useState becomes unwieldy

### Custom Hooks Pattern

```typescript
const useWgerExercises = (query: string) => {
  const [data, setData] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query.trim()) return;

    const controller = new AbortController();

    const fetchExercises = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/exercises?q=${query}`, {
          signal: controller.signal,
        });

        if (!response.ok) throw new Error('Failed to fetch');

        const exercises = await response.json();
        setData(exercises);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(fetchExercises, 300); // Debounce

    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [query]);

  return { data, loading, error };
};
```

## Error Handling

### User Experience

- **Show loading states** - For all async operations
- **Helpful error messages** - Not technical details
- **Graceful degradation** - When APIs fail
- **Offline indicators** - With fallback functionality

### Development

- **Error Boundaries** - For component crashes
- **Console logging** - In development mode only
- **Proper TypeScript** - Catch errors at compile time

## Git Workflow

### Commit Message Format

```
feat: add exercise search with WGER API integration
fix: resolve set completion state bug (AFTER user QA)
refactor: extract workout utilities to separate file
docs: update component documentation in styleguide
style: apply neumorphic depth utilities to cards
test: add unit tests for program calculations
perf: optimize muscle map rendering performance
```

### Branch Naming

- `feature/exercise-search`
- `bugfix/set-completion-state`
- `refactor/workout-utils`
- `docs/component-updates`

## Anti-Regression Checklist

### Before Any UI Changes

- [ ] Read `DESIGN_SYSTEM.md` for utility classes
- [ ] Check `/styleguide/components` for existing patterns
- [ ] Verify utility combinations follow neumorphic physics
- [ ] Confirm Norse gold usage is appropriate
- [ ] Test all interactive states

### Before Commit

- [ ] No duplicate components created
- [ ] No new shadow definitions added
- [ ] BEM naming followed consistently
- [ ] TypeScript strict compliance
- [ ] Visual regression testing complete
- [ ] QA verification obtained

## Testing Standards

### Required Tests

- **Unit tests** - All utility functions and custom hooks
- **Component tests** - User interactions and conditional rendering
- **Integration tests** - Complete user flows and API scenarios
- **Visual tests** - Compare against styleguide examples

### Testing Tools

- **Vitest** - Unit tests for utilities and API functions
- **React Testing Library** - Component interaction testing
- **MSW** - Mock WGER API responses for consistent testing
- **Manual QA** - User verification required for all functional changes
