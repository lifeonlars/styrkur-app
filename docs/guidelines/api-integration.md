# API Integration Guidelines

## WGER API Integration

- Always handle loading states
- Implement proper error boundaries
- Cache responses in memory/localStorage
- Provide offline fallbacks
- Debounce search requests (300ms)

## API Call Pattern

```typescript
const useWgerExercises = (query: string) => {
  const [data, setData] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Implementation with proper error handling
};
```

## State Management

- Keep state close to where it's used
- Use Context for truly global state only
- Prefer derived state over cached state
- Use useReducer for complex state updates

## Error Handling

### User Experience
- Show loading states for all async operations
- Provide helpful error messages (not technical details)
- Graceful degradation when APIs fail
- Offline indicators and fallbacks

### Development
- Use Error Boundaries for component crashes
- Log errors to console in development
- Prepare for error reporting service (future)