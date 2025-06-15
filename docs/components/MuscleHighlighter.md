# MuscleHighlighter Component

Unified component for displaying muscle activation maps with neumorphic styling.

## Features

- **Single exercise mode**: Show muscles for individual exercises
- **Workout mode**: Aggregate muscle activation across multiple exercises
- **Responsive design**: Mobile tabs, desktop dual-view
- **Enhanced legend**: Muscle activation percentages when available
- **CSS Modules architecture**: Semantic BEM classes with neumorphic design

## Usage

### Single Exercise
```tsx
<MuscleHighlighter
  exercise={{
    primaryMuscleIds: [4, 1],
    secondaryMuscleIds: [5, 15],
    name: "Bench Press"
  }}
  showLegend={true}
  showMuscleList={true}
/>
```

### Workout Overview
```tsx
<MuscleHighlighter
  exercises={exerciseArray}
  showLegend={true}
  size="large"
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `exercise` | `Exercise` | - | Single exercise data |
| `exercises` | `Exercise[]` | `[]` | Array of exercises for workout mode |
| `showLegend` | `boolean` | `true` | Show color legend |
| `showMuscleList` | `boolean` | `false` | Show detailed muscle list |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Component size |
| `forceSingleView` | `boolean` | `false` | Force single view (mobile) |
| `useEnhanced` | `boolean` | `true` | Use enhanced SVG version |
| `muscleActivation` | `MuscleActivation[]` | `[]` | Detailed activation percentages |
| `className` | `string` | - | Additional CSS classes |

## Location

- Component: `src/components/muscle-map/MuscleHighlighter.tsx`
- Styles: `src/components/muscle-map/MuscleHighlighter.module.css`
- Examples: `src/components/muscle-map/examples/ExampleUsage.tsx`