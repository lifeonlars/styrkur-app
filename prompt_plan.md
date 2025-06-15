# Styleguide Refactor Plan - Revised Current State

## Current Status: Phase 6 Partially Complete, Need Border Fix

### Documentation Consolidation: ✅ COMPLETE

- [x] Created unified `DESIGN_SYSTEM.md`
- [x] Enhanced `rules.md` with component patterns
- [x] Established clean documentation hierarchy

### Migration Complete: ✅ COMPLETE

- [x] All routes functional and accessible
- [x] Content migrated from original StyleGuide.tsx
- [x] Navigation and routing working properly

## Phase 6: Foundations Fixes 🔄 IN PROGRESS

### Completed Phase 6 Tasks ✅

- [x] **Move card gradients/borders to foundations** - Content reorganized
- [x] **Label old neumorphic system** - Marked as deprecated
- [x] **Fix depth-flat shadows** - No shadows applied correctly
- [x] **Fix surface-gold readability** - Dark text added for contrast

### Current Phase 6 Task 🔄

- [ ] **Fix border utility lighting** - Need directional borders (light source top-left)
  - Border utilities should not override surface utilities ✅ (fixed)
  - Need proper neumorphic lighting: light top/left, dark bottom/right
  - Keep crisp border at 2px, subtle at 1px

### Phase 6 Success Criteria

- [x] Border utilities don't override surface utilities
- [x] Depth-flat has absolutely no shadows
- [x] Surface-gold has dark text for readability
- [ ] Borders follow neumorphic lighting physics (TOP PRIORITY)

## Phase 7: Component Refinement 📋 READY AFTER PHASE 6

### Cards - Replace with 9 Utility Archetypes

**Current**: 4 working cards (Default, Elevated, Sunken, Flat)
**Goal**: 9 complete archetypes showcasing all utility combinations

#### Standard Archetypes (6)

- [ ] **Sunken-transparent**: `depth-sunken` + transparent background + transparent border
- [ ] **Sunken-concave**: `depth-sunken` + `surface-concave` + transparent border ✅ (exists)
- [ ] **Flat**: `depth-flat` + `surface-flat` + transparent border ✅ (exists)
- [ ] **Subtle-convex**: `depth-subtle` + `surface-convex` + `border-subtle` ✅ (exists as Default)
- [ ] **Subtle-concave**: `depth-subtle` + `surface-concave` + `border-subtle`
- [ ] **Elevated-convex**: `depth-elevated` + `surface-convex` + `border-crisp` ✅ (exists as Elevated)

#### Premium Archetypes (3)

- [ ] **Elevated-concave**: `depth-elevated` + `surface-concave` + `border-crisp`
- [ ] **Gold**: `depth-elevated` + `surface-gold` + `border-crisp`
- [ ] **Interactive**: `border-glow` + hover animation (stackable utility)

### Remove from Cards

- [ ] **Special variants section** - Not needed in new archetype system

### Buttons - Standardize Hierarchy

- [ ] **Primary**: `depth-elevated` + `surface-gold` + `border-crisp`
- [ ] **Secondary**: `depth-subtle` + `surface-convex` + `border-subtle`
- [ ] **Tertiary**: `depth-flat` + transparent background + transparent border
- [ ] **Delete/Danger**: New red variant for destructive actions

## Phase 8: Missing Components 📋 FUTURE

### Add Components

- [ ] Tabs (based on current subnav)
- [ ] Expanded Forms (checkboxes, radio, toggles, select)
- [ ] Clean up UI Elements

## Critical Notes

### What's Working - DON'T CHANGE ⚠️

- **Shadow system** - Current large, soft neumorphic shadows are CORRECT
- **Sunken cards** - Perfect inset appearance
- **Surface utilities** - Gold, convex, concave, flat all working
- **Depth progression** - Clear hierarchy from flat → subtle → elevated

### What Needs Fixing 🔧

- **Border lighting physics** - Need directional borders for proper neumorphism
- **Missing card archetypes** - Only 4 of 9 implemented
- **Special variants cleanup** - Remove inconsistent custom styling

### Anti-Patterns to Avoid ❌

- **Don't change shadow system** - Large, soft shadows are correct for neumorphism
- **Don't create new CSS** - Use existing utility combinations only
- **Don't lose working examples** - Preserve current good cards

---

**Current Priority**: Fix border lighting physics, then add missing card archetypes

**Next Update**: After border fix completion, proceed to Phase 7 card archetype expansion
