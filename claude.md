# Styrkurheim - Norse Fitness Tracker

## Project Overview

Styrkurheim is a mobile-first PWA fitness tracker inspired by Norse mythology with dark mode Scandinavian design. Built with React + TypeScript, Shadcn/ui components, and WGER API integration.

## Current Status

- ✅ Basic React app with mock WGER API
- ✅ Norse theming with gold accent (#C3A869)
- 🔄 **NEXT**: Refactor to TypeScript + Shadcn + proper structure

## Key Features

- **Exercise Database**: WGER API integration with 1400+ exercises
- **Workout Builder**: Create workouts with sets, reps, weight, RPE, tempo
- **Superset/Circuit Support**: Group exercises into supersets and circuits
- **Live Training**: Set tracking with completion states and rest timers
- **Norse Theming**: Dark mode with gold accents and mythology-inspired naming

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
├── styles/              # Tailwind or custom CSS
│   └── globals.css
└── ui/                  # shadcn-compatible component wrappers
    ├── button.tsx
    ├── input.tsx
    └── card.tsx
```

## Design System

- **Primary Color**: Norse Gold (#C3A869)
- **Dark Theme**: Gray-900 backgrounds, Gray-800 cards
- **Typography**: Roboto (light/medium weights)
- **Icons**: Replace emojis with SVG icons (future)
- **Spacing**: 8px grid system
- **Shadows**: Subtle, layered cards

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

1. **Structure Refactor**: Move to TypeScript + proper folder structure
2. **Shadcn Integration**: Replace inline styles with component system
3. **WGER API**: Replace mock with real API calls
4. **Superset/Circuit Logic**: Complete workout builder features
5. **Testing Setup**: Basic API and component tests
6. **PWA Foundation**: Service worker and manifest
7. **Icon System**: Replace emojis with SVG icons
8. **Backend Integration**: User accounts and data sync

## Code Style

- **TypeScript**: Strict mode, proper typing
- **Functional Components**: Hooks-based React
- **Tailwind**: Utility-first CSS with Shadcn
- **Norse Naming**: Maintain mythology theme in component/function names
- **Mobile-First**: Responsive design starting from mobile
