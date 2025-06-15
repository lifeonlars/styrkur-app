# Component Development Patterns

## Component Structure

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

## File Naming Conventions

- **Components**: PascalCase (`ExerciseCard.tsx`)
- **Hooks**: camelCase with `use` prefix (`useWgerApi.ts`)
- **Utilities**: camelCase (`programUtils.ts`)
- **Types**: PascalCase (`Exercise.ts`, `Workout.ts`)
- **Constants**: UPPER_SNAKE_CASE (`API_ENDPOINTS.ts`)
- **CSS Modules**: `Component.module.css`

## TypeScript Guidelines

- Use strict TypeScript configuration
- Prefer interfaces over types for object shapes
- Use proper generic typing for API responses
- No `any` types - use `unknown` if needed
- Export types from dedicated files in `/types`

## React Patterns

- Functional components only (no class components)
- Use custom hooks for complex logic
- Prefer composition over inheritance
- Keep components under 200 lines
- Extract business logic to utility functions