# Styleguide Restructure Prompt Plan

## Current Status: Planning Phase

### Documentation Consolidation: ✅ COMPLETE

- [x] Created unified `DESIGN_SYSTEM.md` (consolidated STYLING.md + docs/design-system.md)
- [x] Enhanced `rules.md` with component patterns
- [x] Identified conflicts and redundancies
- [x] Established clean documentation hierarchy

### Next Phase: Implementation

## Phase 1: Audit & Setup 🔄 IN PROGRESS

### Tasks

- [ ] **Audit current StyleGuide.tsx** - Map content to new route structure
- [ ] **Create app router structure** - `/app/styleguide` with nested routes
- [ ] **Design shared layout** - Sticky navigation for all styleguide routes
- [ ] **Plan content migration** - Without losing existing examples

### Success Criteria

- All existing StyleGuide.tsx content mapped to appropriate routes
- App router structure created with proper nested routing
- Shared layout component designed with sticky navigation
- Migration plan documented without data loss

## Phase 2: Route Structure Creation

### Tasks

- [ ] **Create `/app/styleguide/page.tsx`** - Landing page with navigation cards
- [ ] **Create `/app/styleguide/layout.tsx`** - Shared navigation component
- [ ] **Create route directories** - foundations, components, patterns, brand
- [ ] **Test navigation** - Between all sections

### Success Criteria

- All routes accessible and properly nested
- Navigation remains consistent across routes
- Proper meta titles and SEO for each section
- Bookmarkable URLs working correctly

## Phase 3: Content Migration

### Sub-phase 3a: Foundations Route

- [ ] **Extract color system** - From current StyleGuide.tsx
- [ ] **Extract typography** - Scale and hierarchy examples
- [ ] **Extract neumorphic system** - Depth/surface/border combinations
- [ ] **Extract spacing/layout** - Visual scale demonstrations

### Sub-phase 3b: Components Route

- [ ] **Extract all components** - With current state demonstrations
- [ ] **Organize by category** - Forms, Navigation, Display, Feedback
- [ ] **Add secondary navigation** - For component categories
- [ ] **Preserve all examples** - Don't lose existing demonstrations

### Sub-phase 3c: Patterns Route (Placeholder)

- [ ] **Create structure** - For future workout-specific patterns
- [ ] **Add placeholder sections** - Exercise views, workout cards, logging
- [ ] **Prepare for expansion** - Clear areas for future development

### Sub-phase 3d: Brand Route

- [ ] **Audit /public folder** - For existing brand assets
- [ ] **Create logo showcase** - Variations and usage examples
- [ ] **Document Norse gold usage** - Brand color applications
- [ ] **Add icon system** - Using only existing assets

### Success Criteria for Phase 3

- All content from StyleGuide.tsx successfully migrated
- No visual examples lost in migration
- Proper organization across all routes
- Secondary navigation working in components section

## Phase 4: Enhancement & Polish

### Tasks

- [ ] **Optimize for AI reference** - Clear visual examples for Claude Code
- [ ] **Add status tracking** - ✅ Ready, 🔄 In Progress, 🔬 Experimental
- [ ] **Implement responsive tests** - Mobile/desktop behavior examples
- [ ] **Add interaction demos** - Hover, focus, active, disabled states
- [ ] **Performance optimization** - Lazy loading for heavy visual content

### Success Criteria

- Styleguide serves as effective AI consistency tool
- All component states properly demonstrated
- Performance optimized for fast navigation
- Visual regression testing capabilities in place

## Phase 5: Verification & Documentation

### Tasks

- [ ] **Test all routes** - Navigation and content loading
- [ ] **Verify bookmarking** - All URLs shareable and functional
- [ ] **Update documentation** - Reflect new structure in project files
- [ ] **QA verification** - User testing of new navigation structure
- [ ] **Update workflow docs** - How to use new styleguide for development

### Success Criteria

- All routes fully functional and tested
- Documentation updated to reflect new structure
- Team workflow updated for new styleguide usage
- No regressions from original StyleGuide.tsx functionality

## Implementation Notes

### Critical Requirements

- **Follow DESIGN_SYSTEM.md** - Use only established utility combinations
- **Preserve existing examples** - Don't lose current component demonstrations
- **Maintain visual fidelity** - Keep neumorphic styling exactly as is
- **Enable AI reference** - Clear examples for Claude Code consistency

### Navigation Architecture

- **Fixed/sticky navigation** - Remains visible across all routes
- **Clean, minimal design** - Matching Norse aesthetic
- **Clear current section** - Visual indication of location
- **Quick access** - To all main sections

### Content Organization Principles

- **Components by function** - Logical grouping for easy reference
- **Visual examples only** - No code examples needed in styleguide
- **All interactive states** - Comprehensive state demonstrations
- **Combination examples** - How utilities work together

### Performance Considerations

- **Lazy load content** - Heavy visual demonstrations
- **Optimize navigation** - Fast switching between sections
- **Responsive performance** - Mobile and desktop optimized
- **Bundle optimization** - Efficient loading of styleguide assets

## Risk Mitigation

### Potential Issues

- **Content loss during migration** - Solution: Careful audit and mapping first
- **Navigation complexity** - Solution: Keep minimal and focused
- **Performance degradation** - Solution: Implement lazy loading
- **Visual inconsistencies** - Solution: Use DESIGN_SYSTEM.md as reference

### Rollback Plan

- Keep original StyleGuide.tsx until migration verified complete
- Test new structure thoroughly before removing old component
- Document any changes made during migration for easy reversal

## Post-Implementation

### Documentation Updates Required

- [ ] Update `claude.md` to reference new styleguide structure
- [ ] Update `styleguide/claude.md` with new navigation patterns
- [ ] Update any component documentation referencing old structure
- [ ] Create usage guide for new styleguide workflow

### Team Communication

- [ ] Demo new styleguide structure to team
- [ ] Update development workflow documentation
- [ ] Train team on new AI consistency workflow
- [ ] Establish maintenance procedures for styleguide

## Success Metrics

### Functional Success

- All routes accessible and properly functional
- No content lost from original StyleGuide.tsx
- Navigation smooth and intuitive
- Performance maintained or improved

### Workflow Success

- Styleguide effectively serves as AI consistency tool
- Development workflow improved with clear visual references
- Component creation follows established patterns
- Visual regression prevention system working

### Maintenance Success

- Easy to add new components to appropriate sections
- Clear organization supports team collaboration
- Documentation workflow supports iterative development
- Scalable structure ready for future expansion

---

**Current Priority**: Begin Phase 1 - Audit current StyleGuide.tsx and create app router structure

**Next Update**: After Phase 1 completion, update this plan with Phase 2 details and any lessons learned
