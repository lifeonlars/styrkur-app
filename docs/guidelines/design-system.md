# Norse Neumorphic Design System

## Architecture

CSS Modules + BEM methodology with design tokens for consistent neumorphic styling.

## Design Tokens

```css
:root {
  /* Norse Gold Palette */
  --norse-gold: #C3A869;
  --norse-gold-light: #D4BC7F;
  --norse-gold-dark: #A89253;
  --norse-gold-darker: #8D7A42;
  
  /* Neumorphic Surface Hierarchy */
  --neu-background: #2c2f36;  /* Page background */
  --neu-surface: #343940;     /* Cards, elevated surfaces */
  --neu-card: #3d424f;        /* Main content cards */
  --neu-elevated: #454a57;    /* Hover states, highlighted areas */
  
  /* Multi-layered Shadows */
  --shadow-neu: -4px -4px 12px rgba(255, 255, 255, 0.04), 
                4px 4px 12px rgba(15, 17, 20, 0.2);
  --shadow-neu-inset: inset 3px 3px 8px rgba(15, 17, 20, 0.2), 
                      inset -3px -3px 8px rgba(255, 255, 255, 0.03);
  --shadow-neu-gold: -4px -4px 12px rgba(195, 168, 105, 0.08), 
                     4px 4px 12px rgba(15, 17, 20, 0.2);
  
  /* Contextual Colors */
  --forest-500: #2E7D5F; /* Success */
  --blood-500: #A83232;  /* Error */
  --ocean-500: #375A74;  /* Info */
  --wood-500: #5C4533;   /* Warning */
  --iron-600: #1F2937;   /* Neutral */
}
```

## BEM Component Pattern

```css
/* Block */
.exercise-card {
  background: var(--neu-surface);
  box-shadow: var(--shadow-neu);
  border-radius: var(--radius-neu);
}

/* Element */
.exercise-card__title {
  color: var(--norse-gold);
  font-weight: var(--font-weight-semibold);
}

/* Modifier */
.exercise-card--highlighted {
  box-shadow: var(--shadow-neu-gold);
  border: 1px solid var(--norse-gold-dark);
}
```

## Responsive Design

- Mobile-first approach (min-width breakpoints)
- Touch-friendly targets (44px minimum)
- Dark mode only with neumorphic elevation
- Tesla Cybertruck-inspired organic pill shapes
- Multi-layered shadow system for depth perception