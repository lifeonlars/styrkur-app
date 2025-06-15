# Button Component

Norse-themed neumorphic button system with Tesla Cybertruck-inspired design.

## Variants

### Primary Button
- Norse gold gradient background
- Multi-layered neumorphic shadows
- Organic pill shape for main actions

### Outline Button  
- Neumorphic surface background
- Light keyline border
- Secondary actions

### Flat Button
- Transparent background
- Minimal hover effects
- Tertiary actions, navigation

## Usage

```tsx
import { Button } from '@/ui/button'

// Primary action
<Button variant="primary" size="default">
  Start Workout
</Button>

// Secondary action
<Button variant="outline" size="large">
  Cancel
</Button>

// Tertiary action
<Button variant="flat" size="default">
  Close
</Button>
```

## Location

- Component: `src/ui/button.tsx`
- Styles: `src/ui/button.module.css`