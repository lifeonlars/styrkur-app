# Styrkur Saga Design System

## Architecture

CSS Modules + BEM methodology with design tokens for consistent neumorphic styling across all components.

## Design Philosophy

Norse mythology meets scandinavian minimalism - organic pill shapes with sophisticated multi-layered neumorphic shadows creating depth and tactile feeling.

## Design Tokens

```css
:root {
  /* Norse Gold Palette - Primary Brand */
  --norse-gold: #c3a869;
  --norse-gold-light: #d4bc7f;
  --norse-gold-dark: #a89253;
  --norse-gold-darker: #8d7a42;

  /* Neumorphic Surface Hierarchy */
  --neu-background: #2c2f36; /* Page background */
  --neu-surface: #343940; /* Cards, elevated surfaces */
  --neu-card: #3d424f; /* Main content cards */
  --neu-elevated: #454a57; /* Hover states, highlighted areas */

  /* Multi-layered Shadows - Core System */
  --shadow-neu: -4px -4px 12px rgba(255, 255, 255, 0.04), 4px 4px 12px rgba(15, 17, 20, 0.2);
  --shadow-neu-inset: inset 3px 3px 8px rgba(15, 17, 20, 0.2), inset -3px -3px 8px rgba(255, 255, 255, 0.03);
  --shadow-neu-gold: -4px -4px 12px rgba(195, 168, 105, 0.08), 4px 4px 12px rgba(15, 17, 20, 0.2);

  /* Contextual Colors */
  --forest-500: #2e7d5f; /* Success */
  --blood-500: #a83232; /* Error */
  --ocean-500: #375a74; /* Info */
  --wood-500: #5c4533; /* Warning */
  --iron-600: #1f2937; /* Neutral */

  /* Typography Scale */
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;

  /* Border Radius */
  --radius-neu: 16px; /* Standard neumorphic radius */
  --radius-pill: 50px; /* Full pill shapes */
  --radius-subtle: 8px; /* Subtle rounding */
}
```

## Utility Class System

### Depth Utilities

```css
.depth-sunken {
  box-shadow: var(--shadow-neu-inset);
  background: var(--neu-background);
}

.depth-flat {
  box-shadow: none;
  background: var(--neu-surface);
}

.depth-subtle {
  box-shadow: var(--shadow-neu);
  background: var(--neu-surface);
}

.depth-elevated {
  box-shadow: var(--shadow-neu);
  background: var(--neu-elevated);
}
```

### Surface Utilities

```css
.surface-concave {
  background: linear-gradient(145deg, var(--neu-background), var(--neu-surface));
}

.surface-flat {
  background: var(--neu-surface);
}

.surface-convex {
  background: linear-gradient(145deg, var(--neu-surface), var(--neu-elevated));
}

.surface-gold {
  background: linear-gradient(145deg, var(--norse-gold-dark), var(--norse-gold-light));
}
```

### Border Utilities

```css
.border-transparent {
  border: 1px solid transparent;
}

.border-neu-subtle {
  border: 1px solid rgba(255, 255, 255, 0.06);
}

.border-neu-crisp {
  border: 1px solid rgba(255, 255, 255, 0.12);
}

.border-neu-glow {
  border: 1px solid var(--norse-gold-dark);
}
```

## Component BEM Pattern

```css
/* Block - Component root */
.exercise-card {
  background: var(--neu-surface);
  box-shadow: var(--shadow-neu);
  border-radius: var(--radius-neu);
  padding: 1.5rem;
}

/* Element - Component part */
.exercise-card__title {
  color: var(--norse-gold);
  font-weight: var(--font-weight-semibold);
  margin-bottom: 0.5rem;
}

.exercise-card__content {
  color: rgba(255, 255, 255, 0.8);
}

/* Modifier - Variant/state */
.exercise-card--highlighted {
  box-shadow: var(--shadow-neu-gold);
  border: 1px solid var(--norse-gold-dark);
}

.exercise-card--interactive:hover {
  background: var(--neu-elevated);
  transform: translateY(-1px);
}
```

## Neumorphic Physics Rules

### Visual Logic

- **Concave surfaces** = sunken, inward depth (inset shadows)
- **Convex surfaces** = raised, outward depth (outset shadows)
- **Light source** = top-left (consistent across all shadows)
- **Material** = soft metallic with subtle highlights

### Combination Rules

- `depth-sunken` + `surface-concave` = pressed button, input fields
- `depth-elevated` + `surface-convex` = primary buttons, cards
- `depth-subtle` + `surface-flat` = secondary buttons, containers
- Norse gold only for primary actions and brand elements

## Responsive Design

### Breakpoints

```css
/* Mobile-first approach */
@media (min-width: 640px) {
  /* sm */
}
@media (min-width: 768px) {
  /* md */
}
@media (min-width: 1024px) {
  /* lg */
}
@media (min-width: 1280px) {
  /* xl */
}
```

### Touch Targets

- Minimum 44px touch targets on mobile
- 8px spacing between interactive elements
- Hover states desktop-only

### Typography

- Fluid typography using clamp()
- High contrast for accessibility
- Norse gold for emphasis only

## Component Categories

### Form Elements

- Inputs: `depth-sunken` + `surface-concave`
- Buttons: `depth-elevated` + `surface-convex` (primary) or `depth-subtle` + `surface-flat` (secondary)
- Selects: Custom dropdown with neumorphic styling

### Layout Components

- Cards: `depth-subtle` + `surface-flat`
- Panels: `depth-elevated` + `surface-convex`
- Navigation: `depth-flat` + `surface-flat`

### Feedback Components

- Alerts: Contextual colors with subtle neumorphic depth
- Progress: Norse gold with convex surface
- Loading: Subtle pulsing with neumorphic shadows

## Usage Guidelines

### Do's

- Use established utility combinations
- Follow neumorphic physics (concave/convex logic)
- Maintain consistent light source direction
- Apply Norse gold sparingly for emphasis

### Don'ts

- Don't create new shadow definitions
- Don't mix gradient directions randomly
- Don't use multiple accent colors
- Don't ignore the established depth hierarchy

## Implementation

### In Components

```tsx
import { cn } from '@/lib/utils';
import styles from './Component.module.css';

export function Component({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        styles.component,
        'depth-subtle surface-flat border-neu-subtle',
        className
      )}
    >
      <h2 className={styles['component__title']}>Title</h2>
      <div className={cn(styles['component__content'], 'depth-sunken surface-concave')}>
        Content
      </div>
    </div>
  );
}
```

### In Styleguide

Each component should demonstrate all utility combinations and interactive states for visual verification and AI consistency reference.
