# MuscleHighlighter Component

A unified, reusable component for displaying muscle activation maps for both individual exercises and entire workouts. Built with CSS Modules and Norse-themed neumorphic design.

## Features

- **Single Exercise Mode**: Show muscles used by one exercise
- **Workout Mode**: Show combined muscle activation across multiple exercises  
- **Responsive Design**: Optimized for mobile (tabbed view) and desktop (dual view)
- **Enhanced Legend**: Shows muscle activation percentages when available
- **CSS Modules**: Clean, semantic styling with neumorphic design
- **Accessible**: Screen reader friendly with proper ARIA labels

## Basic Usage

### Single Exercise
```tsx
import MuscleHighlighter from '@/components/muscle-map/MuscleHighlighter'

const exercise = {
  primaryMuscleIds: [4, 1], // Chest, Biceps
  secondaryMuscleIds: [5, 15], // Shoulders, Triceps
  name: "Bench Press"
}

<MuscleHighlighter
  exercise={exercise}
  showLegend={true}
  showMuscleList={true}
/>
```

### Workout Overview
```tsx
const exercises = [
  {
    primaryMuscleIds: [4, 1],
    secondaryMuscleIds: [5, 15],
    name: "Bench Press"
  },
  {
    primaryMuscleIds: [2, 8],
    secondaryMuscleIds: [1, 13],
    name: "Pull-ups"
  }
]

<MuscleHighlighter
  exercises={exercises}
  showLegend={true}
  showMuscleList={true}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `exercise` | `Exercise` | - | Single exercise data (primary/secondary muscle IDs, name) |
| `exercises` | `Exercise[]` | `[]` | Array of exercises for workout mode |
| `showLegend` | `boolean` | `true` | Show color legend |
| `showMuscleList` | `boolean` | `false` | Show detailed muscle list |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Component size |
| `forceSingleView` | `boolean` | `false` | Force single view (useful for mobile) |
| `useEnhanced` | `boolean` | `true` | Use enhanced SVG version |
| `muscleActivation` | `MuscleActivation[]` | `[]` | Detailed activation percentages |
| `className` | `string` | - | Additional CSS classes |

## Types

```tsx
interface Exercise {
  primaryMuscleIds: number[]
  secondaryMuscleIds: number[]
  name?: string
}

interface MuscleActivation {
  muscle: string
  percentage: number
}
```

## Design System

The component uses our CSS Modules design system with:
- **Neumorphic styling**: Soft shadows and organic shapes
- **Norse color palette**: Gold accents and dark themes
- **Responsive design**: Mobile-first approach
- **Semantic classes**: Clean, maintainable CSS

## Migration from Old Components

### Replace MuscleMap
```tsx
// Old
<MuscleMap 
  primaryMuscleIds={[1, 2]} 
  secondaryMuscleIds={[3, 4]}
  exerciseName="Bench Press"
/>

// New
<MuscleHighlighter 
  exercise={{
    primaryMuscleIds: [1, 2],
    secondaryMuscleIds: [3, 4],
    name: "Bench Press"
  }}
/>
```

### Replace EnhancedMuscleMap
```tsx
// Old
<EnhancedMuscleMap 
  exercises={exercises}
  isWorkoutMode={true}
/>

// New
<MuscleHighlighter 
  exercises={exercises}
/>
```

## Accessibility

- Proper ARIA labels for muscle regions
- Keyboard navigation support
- Screen reader compatible
- High contrast color scheme
- Semantic HTML structure

## Performance

- Lazy loading of SVG components
- Optimized re-renders with React.memo
- Efficient muscle data processing
- CSS Modules for optimal styling performance