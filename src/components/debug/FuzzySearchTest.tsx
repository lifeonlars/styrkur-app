'use client'

import { useState, useEffect } from 'react'
import { testFuzzySearch } from '@/lib/wger'

export default function FuzzySearchTest() {
  const [testResults, setTestResults] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)

  const runFuzzyTest = async (searchTerm: string) => {
    setIsLoading(true)
    setTestResults('')
    
    // Capture console output
    const originalLog = console.log
    const logs: string[] = []
    
    console.log = (...args) => {
      logs.push(args.join(' '))
      originalLog(...args)
    }
    
    try {
      await testFuzzySearch(searchTerm)
      setTestResults(logs.join('\n'))
    } catch (error) {
      setTestResults(`Error: ${error}`)
    } finally {
      console.log = originalLog
      setIsLoading(false)
    }
  }

  return (
    <div className="p-6 bg-gray-800 rounded-xl">
      <h2 className="text-white font-bold text-xl mb-4">🧪 Fuzzy Search Test</h2>
      
      <div className="space-y-4">
        <div className="flex gap-2">
          <button
            onClick={() => runFuzzyTest('goblit')}
            disabled={isLoading}
            className="bg-[#C3A869] text-black px-4 py-2 rounded font-medium hover:bg-[#C3A869]/80 disabled:opacity-50"
          >
            Test "goblit" → "Goblet Squat"
          </button>
          
          <button
            onClick={() => runFuzzyTest('pres')}
            disabled={isLoading}
            className="bg-[#C3A869] text-black px-4 py-2 rounded font-medium hover:bg-[#C3A869]/80 disabled:opacity-50"
          >
            Test "pres" → "Press"
          </button>
          
          <button
            onClick={() => runFuzzyTest('bech')}
            disabled={isLoading}
            className="bg-[#C3A869] text-black px-4 py-2 rounded font-medium hover:bg-[#C3A869]/80 disabled:opacity-50"
          >
            Test "bech" → "Bench"
          </button>
        </div>
        
        {isLoading && (
          <div className="text-[#C3A869]">Running fuzzy search test...</div>
        )}
        
        {testResults && (
          <div className="bg-gray-900 p-4 rounded font-mono text-sm text-gray-300 whitespace-pre-wrap max-h-96 overflow-y-auto">
            {testResults}
          </div>
        )}
      </div>
    </div>
  )
}