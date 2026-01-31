# Updated Phase 2 Prompt Plan - Progressive Disclosure Implementation

## Context
Based on our refined approach, Phase 2 now involves more substantial work than originally planned. We need to clean up existing broken examples AND implement a complete new workflow using progressive disclosure.

## Revised Phase 2 Structure

### Phase 2A: Exercise Selection Enhancement ✅ (Complete)
Multi-select modal with clean grouping options.

### Phase 2B: Group Configuration Components ✅ (Complete)  
Individual components with balanced technical logic.

### Phase 2C: Styleguide Cleanup + Patterns Organization (Current)
**Scope**: Clean up broken examples, reorganize styleguide structure

#### Prompt 2C-1: Styleguide Cleanup
```
Clean up the exercise groups section in the styleguide:

1. Remove all broken workflow examples
   - Delete "From Exercise Selection to Final Group Configuration"
   - Remove smart guidance references and validation summaries
   - Remove multi-step modal examples

2. Focus on individual component documentation
   - GroupTypeSelector with updated descriptions
   - ExecutionStyleSelector with technical filtering
   - RepSchemeSelector with pattern examples
   - Component interaction patterns only

3. Keep design standards and component library patterns
   - Chip hierarchy (36px vs 24px)
   - Neumorphic styling examples
   - Mobile responsiveness patterns
```

#### Prompt 2C-2: Patterns Page Creation
```
Create new Patterns section in styleguide for complex components:

1. Add Patterns page to styleguide navigation
   - Separate from basic Components page
   - Tab-based navigation for different pattern types

2. Move complex examples to Patterns
   - Exercise Group Configuration Flow (when implemented)
   - Muscle Highlighter pattern
   - Other multi-component workflows

3. Organize pattern documentation
   - Complete workflow examples
   - Multi-component state management
   - Real-world usage scenarios
```

### Phase 2D: Progressive Disclosure Implementation (New Major Phase)
**Scope**: Implement the actual working exercise group configuration flow

#### Prompt 2D-1: App Integration Foundation  
```
Integrate exercise group configuration into the existing workout creation flow:

1. Identify current workout creation modal/flow
2. Plan integration points for exercise group configuration
3. Update existing workout state management for groups
4. Create data flow between group configuration and workout creation
```

#### Prompt 2D-2: Progressive Disclosure Component
```
Create the main progressive disclosure configuration component:

1. Implement GroupConfigurationPanel with progressive disclosure
   - Single page with expanding sections
   - Previous choices always visible
   - Easy mind-changing and real-time updates
   - Mobile-optimized vertical stacking

2. Section implementations:
   - GroupTypeSection (always expanded when active)
   - ExecutionStyleSection (appears when group type selected)
   - RepSchemeSection (filtered by execution style)
   - WeightProgressionSection (conditional for pyramids)
   - ConfigurationPreview (always visible)

3. Integration with existing components
   - Use Phase 2B components as building blocks
   - Maintain consistent styling and behavior
   - Handle state management cleanly
```

#### Prompt 2D-3: Modal Integration & User Flow
```
Integrate progressive disclosure into workout creation flow:

1. Replace or enhance current "Add Exercises" workflow
2. Implement the user flow:
   - Create workout → Add exercises → Configure group → Select exercises → Add to workout
3. Handle state management between configuration and exercise selection
4. Ensure clean integration with existing workout planning interface
5. Test complete user journey end-to-end
```

#### Prompt 2D-4: Patterns Page Integration
```
Add the working exercise group configuration flow to Patterns page:

1. Document the complete configuration flow pattern
2. Show real examples with working state management
3. Demonstrate component composition and interaction
4. Include mobile responsiveness examples
5. Document integration patterns with existing app flows
```

### Phase 2E: Enhanced WorkoutEntryCard (Moved from 2C)
**Scope**: Update planning view for exercise groups display

#### Prompt 2E: Planning View Updates
```
Update WorkoutEntryCard and planning interface for exercise groups:

1. Visual group representation in planning view
   - Group type chips (36px) and style/scheme chips (24px)
   - Visual connections between grouped exercises
   - Clean group display with proper hierarchy

2. Group management features
   - Arrow-based reordering (inter-group and intra-group)
   - Duplicate group functionality
   - Edit group configuration
   - Split group into individual exercises

3. Integration with new configuration flow
   - Edit button opens progressive disclosure panel
   - Consistent state management
   - Proper error handling and validation
```

## Why This Expanded Structure?

### 1. **More Realistic Scope**
The progressive disclosure implementation is substantial work that affects:
- Styleguide organization
- App workflow integration  
- State management patterns
- Component composition
- User experience design

### 2. **Better Separation of Concerns**
- **2C**: Clean up existing mess, reorganize documentation
- **2D**: Build the actual working feature (4 sub-prompts)
- **2E**: Update planning view to display groups

### 3. **Logical Dependencies**
- Can't document patterns until we build them
- Need clean styleguide before adding new patterns
- Progressive disclosure must work before updating planning view

### 4. **Iterative Development**
Each prompt builds on the previous:
- 2C-1: Clean slate
- 2C-2: New organization
- 2D-1: Integration foundation
- 2D-2: Core functionality
- 2D-3: User flow completion
- 2D-4: Documentation
- 2E: Planning view enhancement

## Estimated Effort
**Phase 2C**: Medium (cleanup + reorganization)
**Phase 2D**: Large (new feature implementation)  
**Phase 2E**: Medium (planning view updates)

**Total**: Significant expansion from original Phase 2 scope, but more realistic for delivering a complete, working exercise groups feature.

## Success Criteria
- ✅ Clean styleguide with proper component/pattern separation
- ✅ Working progressive disclosure configuration flow
- ✅ Complete user journey from workout creation to exercise group addition
- ✅ Enhanced planning view that displays exercise groups clearly
- ✅ Documented patterns for future development reference

This expanded structure acknowledges the real scope while maintaining logical progression and clear deliverables.