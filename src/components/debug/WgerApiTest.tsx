'use client'

import { useState } from 'react'
import { testWgerApi, fetchExercises, calculateSearchRelevance } from '@/lib/wger'
import { Exercise } from '@/types'

/**
 * Debug component to test real WGER API integration
 * Add this to any page to verify API is working
 */
export default function WgerApiTest() {
  const [results, setResults] = useState<Exercise[]>([])
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('chest fly')
  const [apiSource, setApiSource] = useState<'unknown' | 'real' | 'mock'>('unknown')

  const testSearch = async () => {
    setLoading(true)
    setResults([])
    setApiSource('unknown')
    
    try {
      console.log('Testing search:', searchTerm)
      
      // First run the test function to get console output
      await testWgerApi(searchTerm)
      
      // Then get the actual results
      const exercises = await fetchExercises({ search: searchTerm, limit: 10 })
      setResults(exercises)
      
      // Determine if results are from real API or mock data
      const mockIds = ['345', '1001', '1002', '1003', '1004', '1005', '2001', '2002', '2003', '2004', '2005', '3001', '3002', '3003', '3004', '3005', '4001', '4002', '4003', '5001', '5002', '5003', '6001', '6002']
      const hasRealApiResults = exercises.some(ex => !mockIds.includes(ex.id))
      
      setApiSource(hasRealApiResults ? 'real' : 'mock')
      
    } catch (error) {
      console.error('Test failed:', error)
    } finally {
      setLoading(false)
    }
  }

  const commonSearches = [
    'chest fly',
    'bench press', 
    'squat',
    'deadlift',
    'pull up',
    'bicep curl',
    'shoulder press',
    'lat pulldown',
    'tricep extension',
    'leg press'
  ]

  return (
    <div className="bg-gray-800 rounded-lg p-6 m-4">
      <h2 className="text-white text-xl font-medium mb-4">🧪 WGER API Test</h2>
      
      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for an exercise..."
          className="w-full bg-gray-700 text-white p-3 rounded-lg"
        />
        <button
          onClick={testSearch}
          disabled={loading}
          className="mt-2 bg-[#C3A869] text-black px-4 py-2 rounded-lg font-medium hover:bg-[#B19651] disabled:opacity-50"
        >
          {loading ? 'Testing...' : 'Test Search'}
        </button>
      </div>

      {/* Quick Test Buttons */}
      <div className="mb-4">
        <p className="text-gray-400 text-sm mb-2">Quick tests:</p>
        <div className="flex flex-wrap gap-2">
          {commonSearches.map(search => (
            <button
              key={search}
              onClick={() => {
                setSearchTerm(search)
                setTimeout(() => testSearch(), 100)
              }}
              className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded hover:bg-gray-600"
            >
              {search}
            </button>
          ))}
        </div>
      </div>

      {/* API Source Indicator */}
      {apiSource !== 'unknown' && (
        <div className={`mb-4 p-3 rounded-lg ${
          apiSource === 'real' 
            ? 'bg-green-900/50 border border-green-700' 
            : 'bg-yellow-900/50 border border-yellow-700'
        }`}>
          <div className="flex items-center gap-2">
            <span className="text-lg">
              {apiSource === 'real' ? '🌐' : '📂'}
            </span>
            <span className={`font-medium ${
              apiSource === 'real' ? 'text-green-400' : 'text-yellow-400'
            }`}>
              {apiSource === 'real' 
                ? 'Results from Real WGER API' 
                : 'Results from Mock Data (API may have failed or no results)'
              }
            </span>
          </div>
        </div>
      )}

      {/* Results */}
      <div>
        <p className="text-white mb-2">
          Results ({results.length}):
        </p>
        {loading ? (
          <div className="text-gray-400">Loading...</div>
        ) : results.length === 0 ? (
          <div className="text-gray-400">No results found</div>
        ) : (
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {results.map((exercise, index) => {
              const relevanceScore = searchTerm ? calculateSearchRelevance(exercise, searchTerm) : 0
              const hasMuscleIssue = exercise.primaryMuscles.some(m => m.includes('[Object object]') || m.includes('muscle_'))
              
              return (
                <div key={exercise.id} className="bg-gray-700 p-3 rounded text-sm">
                  <div className="flex items-center justify-between">
                    <div className="text-white font-medium">
                      #{index + 1} {exercise.name}
                      {exercise.name === 'Unknown Exercise' && (
                        <span className="ml-2 text-red-400 text-xs">⚠️ Name mapping issue</span>
                      )}
                    </div>
                    {searchTerm && (
                      <span className="text-[#C3A869] text-xs font-mono">
                        Score: {relevanceScore}
                      </span>
                    )}
                  </div>
                  <div className="text-gray-400">
                    ID: {exercise.id} | Group: {exercise.muscleGroup} | Equipment: {exercise.equipment}
                  </div>
                  {exercise.primaryMuscles.length > 0 && (
                    <div className="text-gray-500 text-xs">
                      Muscles: {exercise.primaryMuscles.join(', ')}
                      {hasMuscleIssue && (
                        <span className="ml-2 text-red-400">⚠️ Muscle mapping issue</span>
                      )}
                    </div>
                  )}
                  {exercise.instructions.length > 0 && exercise.instructions[0] !== 'Perform exercise with proper form' && (
                    <div className="text-gray-500 text-xs mt-1">
                      Instructions: {exercise.instructions[0].substring(0, 100)}...
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>

      <div className="mt-4 text-xs text-gray-500">
        💡 Check browser console for detailed API logs
      </div>
    </div>
  )
}