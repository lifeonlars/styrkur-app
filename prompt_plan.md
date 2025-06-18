# Color System Refactor - Prompt Plan

## Overview
Complete overhaul of the color system to establish proper primitive → semantic token architecture following Tailwind/Radix best practices. This will create a cleaner, more maintainable foundation for the Norse neumorphic design system.

## Phase Structure

### **Phase CS1: Primitive Color Scale Generation** 🎨
**Status**: Ready to implement  
**Estimated Time**: 60-90 minutes  
**Priority**: High - Foundation for all other phases

**Scope**:
- Generate 9-color scales (100-900) for all primitive colors
- Anchor existing colors as 500-level in new scales
- Replace "Wood" with "Amethyst" (Norse purple naming)
- Regenerate Iron scale for consistent blue-grey progression
- Create clean, mathematically consistent color progressions

**Primitive Colors to Generate**:
- `norse-gold` (anchor: #C3A869 as 500)
- `forest` (anchor: current forest-500)
- `amethyst` (replace wood, Norse purple theme)
- `ocean` (anchor: current ocean-500) 
- `blood` (anchor: current blood-500)
- `iron` (regenerate for consistent cool-grey progression)

**Deliverables**:
- CSS custom properties for all primitive scales
- Color value calculations and hex codes
- Visual validation of color progressions

---

### **Phase CS2: Semantic Token Architecture** 🔗
**Status**: Depends on CS1  
**Estimated Time**: 45-60 minutes  
**Priority**: High - Core semantic layer

**Scope**:
- Define semantic token categories (surface, text, border, icon)
- Map primitive tokens to semantic purposes
- Create context surface variants (success, danger, warning, info)
- Establish semantic naming conventions
- Document token usage guidelines

**Semantic Categories**:
```
Surface Tokens:
- surface-success (forest-based with gradient + opacity)
- surface-danger (blood-based with gradient + opacity)  
- surface-warning (amethyst-based with gradient + opacity)
- surface-info (ocean-based with gradient + opacity)

Text Tokens:
- text-primary, text-secondary, text-muted
- text-success, text-danger, text-warning, text-info

Border Tokens:
- border-subtle, border-strong, border-focus
- border-success, border-danger, border-warning, border-info

Icon Tokens:
- icon-primary, icon-secondary, icon-accent
- icon-success, icon-danger, icon-warning, icon-info
```

**Technical Implementation**:
- Follow current success surface pattern (3-level gradient)
- 35%, 25%, 25% opacity structure for context surfaces
- CSS custom property mapping from primitives

---

### **Phase CS3: Styleguide Tab Interface** 📑
**Status**: ✅ Ready to implement  
**Estimated Time**: 30-45 minutes  
**Priority**: Medium - Presentation layer

**Scope**:
- Create three-tab interface for color foundations
- Organize content: Semantics (primary) | Primitives (reference) | Typography (separated)
- Implement Norse-styled tab component with smooth transitions
- Migrate existing content to appropriate tabs

**Tab Structure**:
1. **Semantics Tab** (Primary focus):
   - Context surfaces with live examples
   - Text hierarchy demonstrations
   - Border and icon token showcases
   - Usage guidelines (do/don't examples)

2. **Primitives Tab** (Developer reference):
   - Swatch book display with hover interactions
   - Color generation logic documentation
   - CSS variable outputs for copy-paste
   - System architecture explanation

3. **Typography Tab** (Separated concerns):
   - Font hierarchy and sizing
   - Semantic text token integration
   - Context text color examples
   - Clean typography documentation

**Technical Implementation**:
- Tab component integration (check existing or create Norse-styled)
- Tab state management and smooth transitions
- Responsive design for mobile tab navigation
- Content migration from existing foundations page

---

### **Phase CS4: Migration & Integration** 🔄
**Status**: Depends on CS1-3  
**Estimated Time**: 60-90 minutes  
**Priority**: High - System integration and validation

**Scope**:
- Test semantic tokens with existing components
- Update component examples to demonstrate token usage
- Validate no visual regressions across styleguide
- Create migration documentation for existing components
- Prepare for team adoption of new token system

**Integration Tasks**:
- **Component Testing**: Validate semantic tokens work with Card, Button, Form components
- **WorkoutGroup Integration**: Test context surfaces work with completion states
- **Visual Regression Testing**: Ensure existing designs maintain consistency
- **Performance Validation**: Check CSS bundle size impact
- **Documentation**: Create migration guide for development team

**Migration Strategy**:
- Keep both old and new token systems during transition
- Update styleguide components to showcase new tokens
- Test semantic tokens in real component contexts
- Document breaking changes and update procedures
- Create adoption timeline for development team

**Testing Priorities**:
1. **Context Surfaces**: Success highlighting in WorkoutGroup components
2. **Text Hierarchy**: Semantic text tokens across all styleguide sections
3. **Background System**: Iron/stone tokens in app layout contexts
4. **Border Integration**: Semantic borders in form and card components

**Success Validation**:
- All semantic tokens functional in component contexts
- Context surfaces ready for WorkoutGroup completion states
- Clear migration path documented for team
- No performance regressions from token additions

---

### **Phase CS5: System Cleanup & Documentation** 📚
**Status**: Depends on CS4  
**Estimated Time**: 30-45 minutes  
**Priority**: Medium - Polish and documentation

**Scope**:
- Remove legacy color tokens and unused variables
- Update design system documentation
- Create developer guidelines for semantic token usage
- Document color accessibility compliance
- Finalize color system architecture

**Documentation Deliverables**:
- Primitive → semantic mapping reference
- Usage guidelines for each semantic category
- Color accessibility audit results
- Migration guide for existing components
- Best practices for extending the color system

---

## Design System Dependencies

### **Required Integration Points**:
- Norse neumorphic utility classes (depth, surface, border)
- Card component system (surface variants)
- Form components (context states)
- Button variants (semantic color applications)

### **Color Accessibility Standards**:
- WCAG AA compliance for all text colors
- Sufficient contrast ratios for context colors
- Colorblind-friendly differentiation
- High contrast mode compatibility

### **Technical Requirements**:
- CSS custom property architecture
- Consistent naming conventions
- Minimal bundle size impact
- IE11 fallback considerations (if needed)

## Implementation Strategy

### **Phase Execution Order**:
1. **CS1**: Generate primitive scales (foundation)
2. **CS2**: Create semantic mappings (core functionality)  
3. **CS3**: Build styleguide interface (presentation)
4. **CS4**: Integrate and test (validation)
5. **CS5**: Clean up and document (polish)

### **Quality Gates**:
- After CS1: All primitive scales validated for mathematical consistency
- After CS2: Semantic tokens tested with existing components
- After CS3: Styleguide interface provides clear documentation
- After CS4: No visual regressions, migration path clear
- After CS5: Complete color system ready for team adoption

### **Risk Mitigation**:
- **Scope creep**: Keep phases focused and separate
- **Visual consistency**: Test semantic tokens against existing components
- **Performance impact**: Minimize CSS custom property bloat
- **Migration complexity**: Maintain backward compatibility during transition

## Success Criteria

### **Technical Goals**:
1. ✅ Clean primitive → semantic token architecture
2. ✅ Consistent 9-color scales across all primitives  
3. ✅ Context surface variants working with neumorphic system
4. ✅ Zero visual regressions in existing components
5. ✅ Clear migration path for component updates

### **User Experience Goals**:
1. ✅ Intuitive color system for designers and developers
2. ✅ Clear documentation and usage guidelines
3. ✅ Consistent visual language across all contexts
4. ✅ Accessible color combinations meeting WCAG standards
5. ✅ Scalable system for future color additions

### **Design System Goals**:
1. ✅ Industry-standard token architecture (Tailwind/Radix approach)
2. ✅ Norse aesthetic maintained throughout
3. ✅ Clean separation between primitives and semantics
4. ✅ Comprehensive styleguide documentation
5. ✅ Foundation for future design system expansion

### **Current Status Summary**:
- ✅ **Phase CS1**: Primitive color scales completed
- ✅ **Phase CS2**: Semantic token architecture completed  
- 🔄 **Phase CS3**: Tab interface ready for implementation
- ⏳ **Phase CS4**: Integration testing pending
- ⏳ **Phase CS5**: Cleanup and documentation pending

### **Critical Path**:
1. **Complete CS3** → Organized presentation of color system
2. **Execute CS4** → Validate tokens work in real components  
3. **Context Surfaces Priority** → Essential for WorkoutGroup completion states
4. **Migration Documentation** → Prepare team for token adoption

### **Integration with Other Phases**:
- **WorkoutGroup Components**: Depends on context surfaces from CS2/CS4
- **Styleguide Polish**: Benefits from organized CS3 tab interface
- **Component Updates**: Will use semantic tokens validated in CS4