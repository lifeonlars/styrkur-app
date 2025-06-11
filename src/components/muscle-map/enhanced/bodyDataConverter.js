/**
 * Converts React Native body data to web-compatible format
 * This script processes the downloaded React Native SVG data
 */

const fs = require('fs');
const path = require('path');

// Function to convert React Native body data to our format
function convertBodyData(filePath, outputPath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Extract the array data using regex
    const arrayMatch = content.match(/export const \w+: BodyPart\[\] = (\[[\s\S]*\]);/);
    if (!arrayMatch) {
      console.error('Could not extract array from', filePath);
      return;
    }

    // Clean up the data - remove import statement and fix formatting
    let bodyData = arrayMatch[1];
    
    // Replace TypeScript specific syntax for JavaScript/JSON compatibility
    bodyData = bodyData.replace(/,(\s*[}\]])/g, '$1'); // Remove trailing commas
    bodyData = bodyData.replace(/(\w+):/g, '"$1":'); // Quote object keys
    bodyData = bodyData.replace(/"/g, '\\"'); // Escape quotes
    bodyData = bodyData.replace(/\\"/g, '"'); // Fix quotes
    
    // Write the converted data
    const output = `// Converted body data from React Native version\nexport const bodyData = ${bodyData};`;
    
    fs.writeFileSync(outputPath, output, 'utf8');
    console.log('Converted', filePath, 'to', outputPath);
    
  } catch (error) {
    console.error('Error converting', filePath, error);
  }
}

// Convert all the downloaded files
const tempDir = '/tmp';
const outputDir = '/Volumes/Code/www/styrkur-app/src/components/muscle-map/enhanced/data';

// Create output directory
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Convert each file
convertBodyData(path.join(tempDir, 'bodyFront.ts'), path.join(outputDir, 'bodyFront.ts'));
convertBodyData(path.join(tempDir, 'bodyBack.ts'), path.join(outputDir, 'bodyBack.ts'));
convertBodyData(path.join(tempDir, 'bodyFemaleFront.ts'), path.join(outputDir, 'bodyFemaleFront.ts'));
convertBodyData(path.join(tempDir, 'bodyFemaleBack.ts'), path.join(outputDir, 'bodyFemaleBack.ts'));

console.log('Body data conversion completed!');