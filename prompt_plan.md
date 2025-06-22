# Exercise Groups Implementation - Claude Code Prompt Plan

## Project Overview
Enhance the Nordic fitness tracking PWA with advanced exercise grouping capabilities including supersets, circuits, complexes, and various execution formats (HIIT, EMOM, AMRAP) with rep schemes (pyramids, descending patterns).

## Core Requirements

### Data Structure
- **Group Types**: Single, Superset, Circuit, Complex
- **Execution Styles**: Standard, HIIT, EMOM, AMRAP  
- **Rep Schemes**: Standard, Pyramid (15-3-15, 10-1-10), Descending (10-1, 21-3, 15-3), Ascending (EMOM)
- **Multi-exercise selection** with flexible grouping
- **Digital notebook approach** for logging (no complex timers)

### Visual Design
- **Neumorphic Scandinavian minimalism**
- **Standard chips** for group types
- **Small label chips** for execution styles and rep schemes
- **Vertical connecting lines** with subtle depth for exercise connections
- **Mobile-first responsive design**

### UX Principles
- Multi-select exercises then choose grouping
- Dual-path access for EMOM ascending
- Clear visual hierarchy during planning and logging
- Simple set completion tracking
- Overall workout duration only

## Implementation Phases

### Phase 1: Data Model Foundation
**Goal**: Establish robust data structures and TypeScript interfaces

#### Prompt 1A: Core Data Models
```
Create TypeScript interfaces and types for the exercise groups system:

1. Enhanced ExerciseGroup interface supporting:
   - groupType: 'single' | 'superset' | 'circuit' | 'complex'
   - executionStyle: 'standard' | 'hiit' | 'emom' | 'amrap'
   - repScheme with patterns and weight progression
   - exercises array with proper relationships
   
2. RepScheme interface for:
   - Pattern definitions (10-1, 21-3, 15-3, 10-1-10, 15-3-15, 1-ascending)
   - Weight progression for pyramids
   - Set auto-generation logic
   
3. Update existing Workout and WorkoutEntry models to support new grouping

4. Migration strategy from current single exercise approach

Ensure backwards compatibility and clean separation of concerns.
```

#### Prompt 1B: Data Validation & Utils
```
Create validation utilities and helper functions for exercise groups:

1. Group size validation (2-3 for supersets, 3-15 for circuits/complexes)
2. Execution style compatibility logic (when to show/hide rep schemes)
3. Rep scheme pattern generators and validators
4. Weight progression calculators for pyramids
5. Exercise compatibility checks for complexes (same equipment)

Include comprehensive unit tests for all validation logic.
```

### Phase 2: Planning Interface Components
**Goal**: Build the exercise group creation and editing UI

#### Prompt 2A: Exercise Selection Modal Enhancement
```
Enhance the exercise selection modal to support:

1. Multi-select capability with visual indicators
2. Grouping options after selection:
   - "Add as Individual Groups" 
   - "Add as Single Group"
3. Dynamic group type selection based on exercise count
4. Preview of resulting groups before confirmation

Maintain existing single-select functionality while adding multi-select.
Use neumorphic design principles with proper touch targets for mobile.
```

#### Prompt 2B: Group Configuration Components
```
Create components for configuring exercise groups:

1. GroupTypeSelector - Default size (36px) chips for Single/Superset/Circuit/Complex
2. ExecutionStyleSelector - Label size (24px) chips that hide when incompatible with rep schemes
3. RepSchemeSelector - Label size (24px) chips with pattern previews and explanations
4. WeightProgressionConfig - For pyramid weight settings with start/peak weight inputs
5. GroupPreview - Shows resulting sets with reps/weights before confirmation
6. DuplicateGroupAction - Simple exact duplication, user modifies as needed

Handle the dual-path EMOM ascending selection (accessible from both rep scheme and execution style).
Include validation feedback, pattern explanations, and duplicate group workflow.
Use proper chip sizing to maintain visual hierarchy.
```

#### Prompt 2C: Enhanced WorkoutEntryCard
```
Update the WorkoutEntryCard component for the planning view:

1. Visual group connections with neumorphic vertical lines
2. Chip display using correct sizes:
   - Default size (36px) chips for group types (Single/Superset/Circuit/Complex)
   - Label size (24px) chips for execution styles and rep schemes
3. Rep scheme pattern indicators and previews
4. Collapsible/expandable group details
5. Enhanced reordering support:
   - Existing: Inter-group reordering (arrows up/down)
   - New: Intra-group exercise reordering using arrows within groups
   - Consistent mobile-friendly arrow controls throughout
6. Quick actions:
   - Duplicate group (creates exact copy, user edits as needed)
   - Split group into individual exercises
   - Normalize weights across group exercises

Ensure mobile optimization with proper spacing and touch targets.
Maintain clean visual hierarchy with Scandinavian minimalism.
```

### Phase 3: Logging Interface Updates
**Goal**: Digital notebook approach for workout execution

#### Prompt 3A: Enhanced GroupedExerciseCard
```
Update the logging interface components:

1. GroupedExerciseCard showing exercise connections
2. Simple set completion tracking (tap to mark complete)
3. Visual progress indicators for group completion
4. Rep scheme pattern guidance without complex timers
5. Notes capability for each group
6. Clear "what's next" indicators

Focus on readability and quick interaction in gym environment.
No built-in timers - rely on external timing sources.
```

#### Prompt 3B: Workout Progress Tracking
```
Create workout session tracking:

1. Overall workout timer (start/stop only)
2. Group completion status
3. Exercise progression indicators
4. Simple rest period suggestions (no active timing)
5. Workout summary and statistics
6. Auto-save functionality for interrupted sessions

Maintain simplicity while providing useful progress feedback.
```

### Phase 4: Advanced Features & Polish
**Goal**: Enhanced UX and edge case handling

#### Prompt 4A: Template System
```
Implement exercise group templates:

1. Save common group configurations as templates
2. Quick template application to new workouts
3. Template library with common patterns
4. Community/preset templates for popular workout styles
5. Template versioning and updates

Make templates easily discoverable and applicable.
```

#### Prompt 4B: Smart Suggestions & Analytics
```
Add intelligent features:

1. Exercise compatibility suggestions for groups
2. Weight progression recommendations based on history
3. Rest period suggestions based on group type
4. Performance analytics for different execution styles
5. Progression tracking for rep scheme improvements

Focus on helpful suggestions without overwhelming the interface.
```

#### Prompt 4C: Import/Export & Sharing
```
Enable workout portability:

1. Export workouts with group configurations
2. Import from common fitness app formats
3. Share workout templates with other users
4. Backup/restore functionality
5. Cross-device synchronization

Ensure data integrity and privacy in all sharing features.
```

### Phase 5: Mobile Optimization & Performance
**Goal**: PWA excellence and performance optimization

#### Prompt 5A: Mobile UX Refinement
```
Optimize for mobile PWA usage:

1. Touch gesture support (swipe actions, long press)
2. Haptic feedback for set completion
3. Screen orientation handling
4. Offline capability enhancement
5. Battery usage optimization
6. Background app refresh handling

Test extensively on various mobile devices and screen sizes.
```

#### Prompt 5B: Performance & Caching
```
Optimize performance for complex workouts:

1. Efficient rendering of large workout groups
2. Smart caching of exercise data and templates
3. Lazy loading of workout history
4. Optimized state management for real-time updates
5. Memory usage optimization for long workout sessions

Ensure smooth performance even with complex multi-group workouts.
```

## Development Guidelines

### Code Quality
- **TypeScript strict mode** throughout
- **Comprehensive unit tests** for all business logic
- **Integration tests** for component interactions
- **Accessibility compliance** (WCAG 2.1 AA)
- **Performance budgets** and monitoring

### Design System
- **Consistent neumorphic styling** across all components
- **Responsive breakpoints** for mobile-first design
- **Design tokens** for colors, spacing, typography
- **Component documentation** and storybook entries

### Data Management
- **Immutable state updates** using proper Redux patterns
- **Optimistic updates** for better UX
- **Error boundary** implementation
- **Data migration** strategies for schema changes

## Testing Strategy

### Unit Tests
- Data validation functions
- Rep scheme generators
- Weight progression calculators
- Component logic isolation

### Integration Tests
- Workout creation flow
- Group configuration workflows
- Logging session management
- Data persistence and retrieval

### E2E Tests
- Complete workout planning to execution
- Multi-device synchronization
- Offline/online state transitions
- Performance under load

## Success Metrics

### UX Metrics
- Time to create complex workouts (target: <2 minutes)
- User error rates in group configuration
- Workout completion rates
- User satisfaction scores

### Technical Metrics
- Component render performance
- Bundle size impact
- Battery usage efficiency
- Offline capability reliability

## Risk Mitigation

### Complexity Management
- **Phased rollout** with feature flags
- **Progressive enhancement** approach
- **Fallback to simple mode** for unsupported features
- **Clear migration paths** for existing users

### Performance Risks
- **Regular performance auditing**
- **Component lazy loading** strategies
- **State optimization** for complex workouts
- **Memory leak prevention**

## Conclusion

This prompt plan provides a structured approach to implementing advanced exercise grouping while maintaining the app's core simplicity and Nordic design principles. The phased approach allows for iterative development and testing, ensuring each component works well before adding complexity.

The focus on practical gym usage (digital notebook vs complex timers) and mobile-first design should result in a tool that users actually want to use during workouts, rather than fighting with complex interfaces while trying to exercise.