# Styrkurheim Development Rules

## Regression Prevention Workflow

1. **Research Phase**: Read relevant files, check styleguide - NO CODE YET
2. **Plan Phase**: Create implementation plan - use "think" for complex tasks
3. **Implement Phase**: Write code following established patterns
4. **Verify Phase**: Test against styleguide examples and QA requirements

## Code Standards

- **Architecture**: CSS Modules + BEM with neumorphic design utilities
- **TypeScript**: Strict mode, no `any` types, proper component typing
- **Components**: Functional only, under 200 lines, single responsibility
- **CSS**: Use existing depth/surface/border utilities, NO new shadows

## Design System Enforcement

- **Check styleguide first**: Before creating any UI component
- **Use utility classes**: `depth-*`, `surface-*`, `border-neu-*`
- **Follow neumorphic physics**: Concave for sunken, convex for raised
- **Norse gold only**: For primary actions, no other accent colors

## Component Creation Process

1. **Check `/styleguide/components`** - Does this component already exist?
2. **Use existing patterns** - Follow established depth/surface combinations
3. **Document in styleguide** - Add visual example with all states
4. **Test all interactive states** - hover, focus, active, disabled

## Quality Gates

- **Visual consistency**: Must match styleguide examples exactly
- **Responsive behavior**: Test mobile/desktop variations
- **Interaction states**: All states must be properly implemented
- **QA verification**: No functional commits until user testing complete

## Git Workflow

```
feat: add exercise search with WGER API
fix: resolve set completion state bug (AFTER user QA)
refactor: extract workout utils to separate file
docs: update component documentation
style: apply neumorphic depth utilities
test: add unit tests for program calculations
```

## Anti-Regression Checklist

- [ ] Checked styleguide for existing patterns
- [ ] Used established utility classes
- [ ] Tested all interactive states
- [ ] Verified against visual examples
- [ ] No duplicate components created
- [ ] No new shadow definitions added

## File Naming & Architecture

- **Components**: `ExerciseCard.tsx` + `ExerciseCard.module.css`
- **Utilities**: CSS custom properties, no hardcoded values
- **Types**: Proper TypeScript interfaces
- **Testing**: React Testing Library + Vitest + MSW
