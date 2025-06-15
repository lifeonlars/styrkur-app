# Styrkurheim Development Rules

## Quick Reference

### Code Standards
- **Architecture**: CSS Modules + BEM with neumorphic design
- **TypeScript**: Strict mode, no `any` types
- **Components**: Functional only, under 200 lines
- **Testing**: React Testing Library + Vitest + MSW

### Design System
- **Styling**: `docs/guidelines/design-system.md`
- **Components**: `docs/guidelines/component-patterns.md`
- **UI Library**: `docs/ui/` directory

### API & State
- **Guidelines**: `docs/guidelines/api-integration.md`
- **Testing**: `docs/guidelines/testing.md`

## Commit Policy
- **QA Testing Required**: Do not commit functional fixes until user QA testing
- **Exception**: Commits allowed for multi-step refactors
- **Safe Commits**: Styling, docs, non-functional changes immediately

## Git Workflow
```
feat: add exercise search with WGER API
fix: resolve set completion state bug
refactor: extract workout utils to separate file
docs: update component documentation
test: add unit tests for program calculations
```

## File Naming
- **Components**: `ExerciseCard.tsx` + `ExerciseCard.module.css`
- **Hooks**: `useWgerApi.ts`
- **Types**: `Exercise.ts`
- **Constants**: `API_ENDPOINTS.ts`