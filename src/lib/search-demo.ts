// Demo to show fuzzy search improvements
import { fetchExercises } from './wger'

export const demoFuzzySearch = async () => {
  console.log('\n🎯 FUZZY SEARCH DEMO')
  console.log('===================')

  const testCases = [
    { query: 'goblit', expected: 'Kettlebell Goblet Squat' },
    { query: 'pres', expected: 'Press exercises' },
    { query: 'bech', expected: 'Bench exercises' },
    { query: 'swng', expected: 'Kettlebell Swing' },
    { query: 'squt', expected: 'Squat exercises' }
  ]

  for (const testCase of testCases) {
    console.log(`\n🔍 Testing: "${testCase.query}" (expecting ${testCase.expected})`)
    
    try {
      const results = await fetchExercises({ search: testCase.query, limit: 5 })
      
      if (results.length > 0) {
        console.log(`✅ Found ${results.length} results:`)
        results.forEach((ex, i) => {
          const score = (ex as any)._fuseScore
          console.log(`  ${i + 1}. ${ex.name}${score ? ` (score: ${score.toFixed(3)})` : ''}`)
        })
        
        // Check if we found the expected match
        const hasExpectedMatch = results.some(ex => 
          ex.name.toLowerCase().includes(testCase.expected.toLowerCase().split(' ')[0])
        )
        
        if (hasExpectedMatch) {
          console.log('🎉 SUCCESS: Found expected match!')
        } else {
          console.log('⚠️  No exact expected match, but fuzzy search returned results')
        }
      } else {
        console.log('❌ No results found')
      }
    } catch (error) {
      console.log(`❌ Error: ${error}`)
    }
  }
}