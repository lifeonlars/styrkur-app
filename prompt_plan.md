# Workout Components Refactor - Prompt Plan

## Overview
Refactoring workout-related components into a unified, reusable system using the established Norse neumorphic design system. This multi-phase approach ensures consistent styling, improved maintainability, and better user experience across all workout contexts.

## Phase Structure

### **Phase 1: WorkoutCard Component** 🏃‍♂️
**Status**: Ready  
**Estimated Time**: 30-45 minutes  
**Priority**: High - Foundation component needed for other phases

**Scope**:
- Create unified WorkoutCard component with multiple layout variants
- Replace existing inconsistent workout card implementations
- Add programmatic duration calculation
- Integrate click-to-summary functionality
- Update styleguide patterns page

**Files Affected**:
- `components/ui/workout-card.tsx` (new)
- `src/app/styleguide/patterns/page.tsx` (update)
- Various files using existing workout cards (search & replace)

**Key Features**:
- Props-based variants (compact/full layouts)
- Smart exercise preview truncation
- Last completed date formatting
- Consistent stats grid with neumorphic icons
- Integration hooks for summary modal

---

### **Phase 2: WorkoutSummaryModal Component** 📊  
**Status**: Pending Phase 1  
**Estimated Time**: 20-30 minutes  
**Priority**: High - Needed for Phase 1 integration

**Scope**:
- Create detailed workout summary modal
- Integrate with existing MuscleHighlighter component
- Add comprehensive stats display
- Exercise list with sets/reps/weights
- Mobile-optimized scrollable design

**Files Affected**:
- `components/ui/workout-summary-modal.tsx` (new)
- Update WorkoutCard to integrate modal
- Styleguide documentation updates

**Key Features**:
- Full workout statistics grid
- Exercise breakdown with muscle groups
- Muscle activation visualization
- Responsive layout (desktop/mobile)
- Smooth open/close animations

---

### **Phase 3: Success Surface Variant** ✅
**Status**: Pending Phase 2  
**Estimated Time**: 15-20 minutes  
**Priority**: Medium - Needed for workout groups

**Scope**:
- Add success surface variant to design tokens
- Implement forest colors at 50% opacity with concave gradient
- Create green highlighting system for completed states
- Update design system documentation

**Files Affected**:
- Design token files (CSS custom properties)
- Component variant systems
- Styleguide documentation

**Key Features**:
- `surface="success"` variant
- Concave gradient depth
- 50% opacity forest colors
- Consistent with Norse neumorphic system

---

### **Phase 4: WorkoutGroup Components** 🏋️‍♂️
**Status**: Pending Phases 1-3  
**Estimated Time**: 60-90 minutes  
**Priority**: High - Core functionality components

**Scope**:
- Create ExerciseGroup component (Single/Superset/Circuit)
- Create SetLogger component with completion states
- Create ExercisePlanner component
- Unify logging and planning interfaces
- Implement "Add Set" dashed button pattern

**Files Affected**:
- `components/ui/exercise-group.tsx` (new)
- `components/ui/set-logger.tsx` (new) 
- `components/ui/exercise-planner.tsx` (new)
- Various workout logging/planning pages
- Styleguide patterns page

**Key Features**:
- Single/Superset/Circuit variants
- Interactive set completion with success highlighting
- Consistent form patterns
- Dashed border "Add" buttons
- RPE and timing integration

---

## Design System Dependencies

### **Required Design Tokens**:
- `--surface-success` (forest colors, 50% opacity, concave)
- Existing Norse neumorphic tokens (confirmed working)
- Button variant tokens for dashed borders

### **Component Dependencies**:
- Existing Card component with depth/surface/border props
- Existing Button component variants
- MuscleHighlighter component (for summary modal)
- Existing form components (for workout groups)

### **Styling Consistency**:
- All components use established Norse color palette
- Consistent neumorphic shadow/surface treatments
- Unified typography and spacing scales
- Mobile-first responsive patterns

## Implementation Strategy

### **Phase Execution Order**:
1. **WorkoutCard** → Foundation component, needed by others
2. **WorkoutSummaryModal** → Required for WorkoutCard integration
3. **Success Surface** → Design token needed for workout groups
4. **WorkoutGroup Components** → Most complex, depends on all previous

### **Testing Checkpoints**:
- After Phase 1: Verify workout cards display correctly across app
- After Phase 2: Test modal integration and muscle map display
- After Phase 3: Confirm success highlighting works
- After Phase 4: Full workout logging/planning flow testing

### **Rollback Points**:
- Each phase is self-contained with clear file boundaries
- Original components preserved until testing confirms new versions
- Styleguide documentation tracks all changes

## Success Criteria

### **Technical Goals**:
- ✅ Single source of truth for workout display components
- ✅ Consistent Norse neumorphic styling across all variants
- ✅ Improved component reusability and maintainability
- ✅ Enhanced mobile responsiveness
- ✅ Type-safe props and component interfaces

### **User Experience Goals**:
- ✅ Faster workout browsing with consistent layouts
- ✅ Better information hierarchy and readability
- ✅ Seamless workout summary access
- ✅ Intuitive workout logging with visual feedback
- ✅ Consistent interaction patterns across contexts

### **Developer Experience Goals**:
- ✅ Comprehensive styleguide documentation with live examples
- ✅ Clear component APIs with TypeScript support
- ✅ Reduced code duplication and maintenance burden
- ✅ Easy-to-extend component system for future features

## Risk Mitigation

### **Potential Issues**:
- **Scope creep**: Stick to defined component boundaries
- **Design inconsistencies**: Reference styleguide frequently
- **Integration complexity**: Test each phase thoroughly before proceeding
- **Performance impact**: Monitor component rendering efficiency

### **Mitigation Strategies**:
- Phase-by-phase implementation with clear checkpoints
- Maintain existing components until new versions are confirmed working
- Regular testing against multiple workout data scenarios
- Keep design token usage consistent with established patterns

## Future Roadmap (Beyond This Refactor)

### **Exercise Library Evolution**:
- **Local JSON Database**: Curated exercise collection to replace WGER dependency
- **Rich Exercise Schema**: Equipment categories, variants, movement patterns, difficulty levels
- **Equipment Profiles**: User equipment inventory (home gym → commercial gym → strongman/metcon)
- **Smart Filtering**: Auto-suggest alternatives based on available equipment

### **Data Architecture Goals**:
- **WGER Usage**: Planning phase only (search/select exercises)
- **Self-Contained Workouts**: Complete exercise data embedded, no API dependencies during workouts
- **Equipment Categories**: Barbell, Dumbbell, Kettlebell, Strongman, Metcon, Bodyweight, etc.
- **Exercise Relationships**: Variants, similar exercises, progression paths

*Note: These features are planned for future development and should not influence the current 4-phase component refactor.*

---

## Next Steps
1. Execute Phase 1 (WorkoutCard) prompt
2. Test and validate implementation
3. Proceed to Phase 2 (WorkoutSummaryModal) if Phase 1 successful
4. Continue through remaining phases in order