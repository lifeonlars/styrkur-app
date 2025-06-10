import { Workout } from '@/types'

export interface FuzzySearchOptions {
  keys: string[]
  threshold: number
}

export interface SearchResult<T> {
  item: T
  score: number
}

/**
 * Simple fuzzy search implementation
 * Returns items sorted by relevance score
 */
export function fuzzySearch<T>(
  items: T[], 
  query: string, 
  options: FuzzySearchOptions
): SearchResult<T>[] {
  if (!query.trim()) {
    return items.map(item => ({ item, score: 1 }))
  }

  const normalizedQuery = query.toLowerCase().trim()
  const results: SearchResult<T>[] = []

  for (const item of items) {
    let bestScore = 0

    for (const key of options.keys) {
      const value = getNestedValue(item, key)
      if (typeof value === 'string') {
        const score = calculateFuzzyScore(value.toLowerCase(), normalizedQuery)
        bestScore = Math.max(bestScore, score)
      } else if (Array.isArray(value)) {
        // Handle arrays (like tags or exercise names)
        for (const arrayItem of value) {
          if (typeof arrayItem === 'string') {
            const score = calculateFuzzyScore(arrayItem.toLowerCase(), normalizedQuery)
            bestScore = Math.max(bestScore, score)
          }
        }
      }
    }

    if (bestScore >= options.threshold) {
      results.push({ item, score: bestScore })
    }
  }

  return results.sort((a, b) => b.score - a.score)
}

/**
 * Calculate fuzzy score between two strings
 * Returns a score between 0 and 1, where 1 is exact match
 */
function calculateFuzzyScore(text: string, query: string): number {
  // Exact match gets highest score
  if (text === query) return 1

  // Check if text starts with query
  if (text.startsWith(query)) return 0.9

  // Check if text contains query as substring
  if (text.includes(query)) return 0.7

  // Check for partial character matches
  let matches = 0
  let queryIndex = 0
  
  for (let i = 0; i < text.length && queryIndex < query.length; i++) {
    if (text[i] === query[queryIndex]) {
      matches++
      queryIndex++
    }
  }

  // Return score based on how many characters matched
  const charScore = matches / query.length
  return charScore >= 0.5 ? charScore * 0.5 : 0
}

/**
 * Get nested object value by dot notation key
 */
function getNestedValue(obj: any, key: string): any {
  return key.split('.').reduce((current, prop) => {
    return current && current[prop] !== undefined ? current[prop] : undefined
  }, obj)
}

/**
 * Workout-specific search function
 */
export function searchWorkouts(workouts: Workout[], query: string): SearchResult<Workout>[] {
  return fuzzySearch(workouts, query, {
    keys: [
      'title',
      'description', 
      'tags',
      'exercises.exerciseData.name', // Legacy structure
      'entries.exercises.exerciseId' // New structure - would need exercise name lookup
    ],
    threshold: 0.1
  })
}