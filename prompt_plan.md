# Styleguide Refactor Plan - Post-Audit

## Current Status: Restructure Complete, Refinement Needed

### Migration Complete: ✅ DONE

- [x] All routes functional and accessible
- [x] Content migrated from original StyleGuide.tsx
- [x] Navigation and routing working properly

### Next Phase: Design System Refinement

## Phase 6: Foundations Fixes 🔄 HIGH PRIORITY

### Critical Bug Fixes

- [ ] **Fix border utility background override** - Border classes overriding surface utilities
- [ ] **Fix surface-gold readability** - Add dark text for contrast
- [ ] **Fix depth-flat shadows** - Should have NO shadows, not subtle sunken
- [ ] **Fix border examples** - Show without shadows/elevation for clarity

### Utility System Improvements

- [ ] **Move card gradients/borders to foundations** - Extract from Cards section
- [ ] **Update border-neu-glow** - Blue ocean glow, wider and softer
- [ ] **Update border-neu-crisp** - 2px, brighter (reference existing buttons)
- [ ] **Enhance surface-gold gradient** - Split into 3-4 gradient levels for more depth
- [ ] **Label old neumorphic system** - Mark as deprecated but keep for reference

### Success Criteria

- Border utilities don't override surface utilities
- All depth utilities work as intended (flat = no shadows)
- Glow effect actually glows with ocean blue
- Surface-gold has proper contrast and depth variations

## Phase 7: Component Refinement 🔄 MEDIUM PRIORITY

### Cards - Utility Combinations Focus

Replace current card examples with proper archetype combinations:

- [ ] **Sunken-transparent**: `depth-sunken` + transparent background + transparent border
- [ ] **Sunken-concave**: `depth-sunken` + `surface-concave` + transparent border
- [ ] **Flat**: `depth-flat` + `surface-flat` + transparent border
- [ ] **Subtle-convex**: `depth-subtle` + `surface-convex` + `border-subtle`
- [ ] **Subtle-concave**: `depth-subtle` + `surface-concave` + `border-subtle`
- [ ] **Elevated-convex**: `depth-elevated` + `surface-convex` + `border-crisp`
- [ ] **Elevated-concave**: `depth-elevated` + `surface-concave` + `border-crisp`
- [ ] **Gold**: `depth-elevated` + `surface-gold` + `border-crisp`
- [ ] **Interactive**: `border-glow` + hover animation (stackable utility)
- [ ] **Remove special variants** - Norse gold accent section

### Buttons - Standardization

- [ ] **Primary button**: `depth-elevated` + `surface-gold` + `border-crisp`
- [ ] **Secondary button**: `depth-subtle` + `surface-convex` + `border-subtle`
- [ ] **Tertiary button**: `depth-flat` + transparent background + transparent border
- [ ] **Delete button**: New variant using danger/error red color
- [ ] **Update minimalist example** - Replace delete with info button + arrow

### Success Criteria

- Cards showcase proper utility combinations, not custom styling
- Buttons follow consistent depth/surface/border logic
- Delete button variant properly implemented
- Special variants section removed

## Phase 8: Missing Components 🔄 MEDIUM PRIORITY

### Add Tabs Component

- [ ] **Create tabs section** - In component library
- [ ] **Base on current subnav** - Reusable component version
- [ ] **Show all states** - Default, active, hover, disabled

### Expand Forms Section

- [ ] **Keep existing inputs** - Text and Description unchanged
- [ ] **Add checkboxes** - Move from UI elements
- [ ] **Add radio buttons** - New component
- [ ] **Add toggles** - New component
- [ ] **Add select dropdown** - New component

### Clean Up UI Elements

- [ ] **Remove action buttons** - Superseded by standard button system
- [ ] **Remove status indicators** - Not needed, doesn't fit philosophy
- [ ] **Remove checkboxes** - Moving to Forms
- [ ] **Keep chips and icons** - For later refactoring

### Success Criteria

- Tabs component matches current subnav styling
- Forms section comprehensive with all input types
- UI elements section cleaned up and focused

## Phase 9: Documentation & Polish 🔄 LOW PRIORITY

### Documentation Updates

- [ ] **Update DESIGN_SYSTEM.md** - Reflect utility fixes and new combinations
- [ ] **Update component usage examples** - Match new archetype system
- [ ] **Document gradient levels** - For surface-gold variations
- [ ] **Update button guidelines** - New primary/secondary/tertiary logic

### Final Verification

- [ ] **Test all utility combinations** - Ensure they work as documented
- [ ] **Verify AI reference quality** - Clear examples for Claude Code
- [ ] **Check responsive behavior** - All components work on mobile/desktop
- [ ] **Performance audit** - Lazy loading and optimization

### Success Criteria

- Documentation matches actual implementation
- All examples serve as clear AI reference
- Performance optimized and responsive
- Complete design system ready for production

## Implementation Priority

### Critical Path (Do First)

1. **Phase 6** - Fix utility system bugs (blocking other work)
2. **Phase 7** - Standardize components to use fixed utilities
3. **Phase 8** - Add missing components
4. **Phase 9** - Documentation and polish

### Dependencies

- Phase 7 depends on Phase 6 (need working utilities first)
- Phase 9 depends on Phases 6-8 (document what actually exists)

## Risk Mitigation

### Potential Issues

- **Utility changes break existing components** - Solution: Test thoroughly, update systematically
- **Design inconsistencies during transition** - Solution: Work in phases, verify each step
- **Performance impact from changes** - Solution: Monitor and optimize as we go

### Quality Gates

- [ ] All utility combinations work as intended
- [ ] No visual regressions in existing components
- [ ] New components match established patterns
- [ ] Documentation accurately reflects implementation

---

**Current Priority**: Phase 6 - Fix utility system bugs before proceeding with component refinements

**Next Update**: After Phase 6 completion, verify fixes and plan Phase 7 implementation
