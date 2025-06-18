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
**Status**: Depends on CS2  
**Estimated Time**: 30-45 minutes  
**Priority**: Medium - Presentation layer

**Scope**:
- Create three-tab interface for color foundations
- Design swatch book display format
- Implement hover interactions for color details
- Clean separation of concerns across tabs

**Tab Structure**:
1. **Semantics Tab** (Primary focus):
   - Context surfaces with live examples
   - Text hierarchy demonstrations
   - Border variants showcase
   - Usage guidelines and do/don't examples

2. **Primitives Tab** (Developer reference):
   - Swatch book display (hover for details)
   - Complete color scales
   - Hex values and CSS variables
   - Mathematical progression validation

3. **Typography Tab** (Separated concerns):
   - Font hierarchy and sizing
   - Text color applications
   - Heading styles and body text
   - Norse gold text treatments

**Design Requirements**:
- Compact swatch book format
- Hover overlay with transparent background
- Clear visual hierarchy
- Consistent with existing styleguide aesthetic

---

### **Phase CS4: Migration & Integration** 🔄
**Status**: Depends on CS1-3  
**Estimated Time**: 60-90 minutes  
**Priority**: High - System integration

**Scope**:
- Implement side-by-side color systems
- Update component examples to use semantic tokens
- Test semantic token functionality across components
- Create migration documentation
- Validate no visual regressions

**Migration Strategy**:
- Keep existing color system functional
- Add new primitive + semantic tokens alongside
- Update styleguide components to demonstrate new system
- Provide clear migration path for existing components
- Document breaking changes and update procedures

**Testing Requirements**:
- All semantic tokens render correctly
- Context surfaces work with neumorphic system
- No conflicts between old and new token names
- Visual consistency maintained across styleguide

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

---

## Next Steps
1. Execute Phase CS1 (Primitive Color Scale Generation)
2. Validate color progressions and mathematical consistency
3. Proceed to Phase CS2 (Semantic Token Architecture) upon CS1 completion
4. Continue through remaining phases systematically