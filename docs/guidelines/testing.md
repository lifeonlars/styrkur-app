# Testing Guidelines

## Testing Strategy

### Unit Tests
- Test all utility functions
- Test custom hooks with React Testing Library
- Mock WGER API calls with MSW
- Aim for 80% coverage on business logic

### Component Tests
- Test user interactions (button clicks, form submissions)
- Test conditional rendering
- Test accessibility (aria labels, keyboard navigation)
- Mock complex dependencies

### Integration Tests
- Test complete user flows (create workout, start training)
- Test offline functionality
- Test API error scenarios

## Testing Framework

- **Vitest**: Unit tests for utilities and API functions
- **React Testing Library**: Component tests
- **MSW**: Mock WGER API for testing
- **Focus**: Test WGER integration, workout logic, program calculations