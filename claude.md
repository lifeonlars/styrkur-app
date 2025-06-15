# Styrkurheim - Norse Fitness Tracker

## Project Overview

Styrkurheim is a mobile-first PWA fitness tracker inspired by Norse mythology with Tesla Cybertruck-style neumorphic design. Built with Next.js, React + TypeScript, CSS Modules + BEM architecture, and WGER API integration.

## Current Status

- ✅ Next.js app with TypeScript and WGER API integration
- ✅ CSS Modules + BEM architecture with neumorphic design
- ✅ Unified MuscleHighlighter component with responsive design
- ✅ Norse-themed neumorphic design system with Tesla Cybertruck inspiration
- 🔄 **NEXT**: Continue feature development and PWA enhancements

## Key Features

- **Exercise Database**: WGER API integration with 1400+ exercises
- **Workout Builder**: Create workouts with sets, reps, weight, RPE, tempo
- **Superset/Circuit Support**: Group exercises into supersets and circuits
- **Live Training**: Set tracking with completion states and rest timers
- **Muscle Visualization**: Unified MuscleHighlighter component with responsive design
- **Norse Theming**: Neumorphic design with Tesla Cybertruck-inspired aesthetics

## Documentation Structure

- **Component Docs**: `docs/components/` - Individual component documentation
- **UI Components**: `docs/ui/` - Design system component docs  
- **Guidelines**: `docs/guidelines/` - Development patterns and standards

### Key Components
- **MuscleHighlighter**: `docs/components/MuscleHighlighter.md` - Unified muscle visualization
- **Button System**: `docs/ui/button.md` - Norse-themed neumorphic buttons

## Target Structure

```
src/
├── app/                    # Main routes (Next.js style)
│   ├── dashboard/         # Home view
│   ├── create-program/    # Create new program
│   ├── create-workout/    # Build individual workouts
│   ├── log/              # Session logging
│   └── progress/         # Program/cycle overview
├── components/           # Reusable UI blocks
│   ├── ExerciseCard.tsx
│   ├── SupersetGroup.tsx
│   ├── WorkoutSummary.tsx
│   └── CycleStepper.tsx
├── lib/                  # External services and utils
│   ├── wger.ts          # API fetchers, filtered exercise loaders
│   └── programUtils.ts  # Generates cycles, calculates progression
├── types/               # TypeScript types and data models
│   ├── Workout.ts
│   ├── Program.ts
│   └── Exercise.ts
├── styles/              # Global CSS and design tokens
│   └── globals.css
└── ui/                  # Neumorphic component system with CSS Modules
    ├── button.tsx          # Norse-themed button components
    ├── button.module.css   # BEM + CSS Modules styling
    ├── input.tsx           # Neumorphic input components
    ├── input.module.css    # Consistent styling architecture
    ├── card.tsx            # Elevated surface components
    └── card.module.css     # Multi-layered shadow system
```

## Design System

- **Neumorphic Design**: Tesla Cybertruck-inspired organic shapes with multi-layered shadows
- **Primary Color**: Norse Gold (#C3A869) with metallic gradients
- **Background Hierarchy**: Deep charcoal gradients (neu-background → neu-surface → neu-card)
- **Typography**: Inter + Cinzel heading font
- **CSS Architecture**: CSS Modules + BEM methodology
- **Border Radius**: Organic pill shapes (neu-pill: 3rem) and rounded cards (neu, neu-lg, neu-xl)
- **Shadows**: Ultra-soft multi-layered neumorphic shadows with Norse gold highlights
- **Color Palette**: Enhanced with forest/blood/ocean/wood contextual colors

## API Integration

- **WGER API**: Free exercise database (https://wger.de/api/v2/)
- **No API Key**: Public endpoints for exercises
- **Fallback**: Local exercise cache for offline use
- **Search**: Debounced search with body part filtering

## State Management

- **useState/useReducer**: For local component state
- **Context**: For app-wide settings (theme, user preferences)
- **No Redux**: Keep it simple for now

## PWA Features (Future)

- **Service Worker**: Offline exercise cache
- **Manifest**: App installation
- **Storage**: IndexedDB for workout history

## Testing Strategy

- **Vitest**: Unit tests for utilities and API functions
- **React Testing Library**: Component tests
- **MSW**: Mock WGER API for testing
- **Focus**: Test WGER integration, workout logic, program calculations

## Backend Integration (Future)

- **Supabase** or **Firebase**: User authentication and data sync
- **Free Tier**: Basic user accounts and workout storage
- **Progressive Enhancement**: Works offline-first, syncs when available

## Development Priorities

1. **Feature Enhancement**: Complete workout tracking and progression features
2. **PWA Foundation**: Service worker and manifest for offline functionality
3. **Performance Optimization**: Optimize muscle map rendering and data processing
4. **Testing Coverage**: Expand component and integration testing
5. **Backend Integration**: User accounts and data sync with Supabase
6. **Advanced Features**: Exercise analytics and progress tracking
7. **Accessibility**: Enhanced screen reader and keyboard navigation support
8. **Mobile UX**: Further optimize touch interactions and gestures

## Code Style

- **TypeScript**: Strict mode, proper typing
- **Functional Components**: Hooks-based React
- **CSS Modules + BEM**: Semantic class names with neumorphic design patterns
- **Design Tokens**: CSS custom properties for consistent theming
- **Norse Naming**: Maintain mythology theme in component/function names
- **Mobile-First**: Responsive design starting from mobile
- **Neumorphic Architecture**: Multi-layered shadows and organic shapes

## Development Guidelines

### Commit Policy
- **QA Testing Required**: Do not commit functional fixes (like component repairs) until user has completed QA testing to verify the fix is working
- **Exception**: Commits are allowed if they are necessary as part of a larger multi-step refactor or architectural change
- **Safe Commits**: Styling updates, documentation, and non-functional changes can be committed immediately
