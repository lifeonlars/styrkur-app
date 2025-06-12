// Script to analyze SVG path coordinates from bodyFront.ts and bodyBack.ts
const fs = require('fs');

// Function to extract coordinates from SVG path data
function extractCoordinates(pathString) {
  const coords = [];
  
  // Remove path commands and extract numeric values
  const numbers = pathString.match(/-?\d+(?:\.\d+)?/g);
  
  if (numbers) {
    for (let i = 0; i < numbers.length; i += 2) {
      if (i + 1 < numbers.length) {
        coords.push({
          x: parseFloat(numbers[i]),
          y: parseFloat(numbers[i + 1])
        });
      }
    }
  }
  
  return coords;
}

// Function to analyze a body data file
function analyzeBodyData(filePath, fileName) {
  console.log(`\n=== Analyzing ${fileName} ===`);
  
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Extract the bodyData array using regex
    const bodyDataMatch = content.match(/export const bodyData = (\[[\s\S]*\]);/);
    if (!bodyDataMatch) {
      console.log('Could not find bodyData export');
      return null;
    }
    
    let minX = Infinity, maxX = -Infinity;
    let minY = Infinity, maxY = -Infinity;
    let totalCoords = 0;
    
    // Parse all path data manually
    const pathRegex = /"([^"]*[Mm][^"]*)"/g;
    let match;
    
    while ((match = pathRegex.exec(content)) !== null) {
      const pathString = match[1];
      if (pathString.includes('M') || pathString.includes('m')) {
        const coords = extractCoordinates(pathString);
        
        coords.forEach(coord => {
          if (coord.x < minX) minX = coord.x;
          if (coord.x > maxX) maxX = coord.x;
          if (coord.y < minY) minY = coord.y;
          if (coord.y > maxY) maxY = coord.y;
          totalCoords++;
        });
      }
    }
    
    const width = maxX - minX;
    const height = maxY - minY;
    
    console.log(`Coordinate Analysis:`);
    console.log(`- X range: ${minX.toFixed(2)} to ${maxX.toFixed(2)} (width: ${width.toFixed(2)})`);
    console.log(`- Y range: ${minY.toFixed(2)} to ${maxY.toFixed(2)} (height: ${height.toFixed(2)})`);
    console.log(`- Total coordinates analyzed: ${totalCoords}`);
    console.log(`- Aspect ratio: ${(width/height).toFixed(3)}`);
    
    return {
      fileName,
      minX,
      maxX,
      minY,
      maxY,
      width,
      height,
      aspectRatio: width/height,
      totalCoords
    };
    
  } catch (error) {
    console.log(`Error analyzing ${fileName}:`, error.message);
    return null;
  }
}

// Analyze both files
const frontData = analyzeBodyData('/Volumes/Code/www/styrkur-app/src/components/muscle-map/enhanced/data/bodyFront.ts', 'bodyFront.ts');
const backData = analyzeBodyData('/Volumes/Code/www/styrkur-app/src/components/muscle-map/enhanced/data/bodyBack.ts', 'bodyBack.ts');

// Calculate optimal viewBox recommendations
if (frontData && backData) {
  console.log('\n=== ViewBox Recommendations ===');
  
  // Calculate overall bounds
  const overallMinX = Math.min(frontData.minX, backData.minX);
  const overallMaxX = Math.max(frontData.maxX, backData.maxX);
  const overallMinY = Math.min(frontData.minY, backData.minY);
  const overallMaxY = Math.max(frontData.maxY, backData.maxY);
  
  const overallWidth = overallMaxX - overallMinX;
  const overallHeight = overallMaxY - overallMinY;
  
  console.log(`\nOverall bounds (both views):`);
  console.log(`- X range: ${overallMinX.toFixed(2)} to ${overallMaxX.toFixed(2)} (width: ${overallWidth.toFixed(2)})`);
  console.log(`- Y range: ${overallMinY.toFixed(2)} to ${overallMaxY.toFixed(2)} (height: ${overallHeight.toFixed(2)})`);
  
  // Add padding (10% on each side)
  const padding = Math.max(overallWidth, overallHeight) * 0.1;
  const paddedMinX = overallMinX - padding;
  const paddedMaxX = overallMaxX + padding;
  const paddedMinY = overallMinY - padding;
  const paddedMaxY = overallMaxY + padding;
  
  const paddedWidth = paddedMaxX - paddedMinX;
  const paddedHeight = paddedMaxY - paddedMinY;
  
  console.log(`\nRecommended viewBox (with 10% padding):`);
  console.log(`viewBox="${paddedMinX.toFixed(0)} ${paddedMinY.toFixed(0)} ${paddedWidth.toFixed(0)} ${paddedHeight.toFixed(0)}"`);
  
  // Calculate individual centering offsets
  const frontCenterX = (frontData.minX + frontData.maxX) / 2;
  const backCenterX = (backData.minX + backData.maxX) / 2;
  const overallCenterX = (overallMinX + overallMaxX) / 2;
  
  const frontOffsetX = overallCenterX - frontCenterX;
  const backOffsetX = overallCenterX - backCenterX;
  
  console.log(`\nAlignment Analysis:`);
  console.log(`- Front view center X: ${frontCenterX.toFixed(2)}`);
  console.log(`- Back view center X: ${backCenterX.toFixed(2)}`);
  console.log(`- Overall center X: ${overallCenterX.toFixed(2)}`);
  console.log(`- Front view X offset needed: ${frontOffsetX.toFixed(2)}`);
  console.log(`- Back view X offset needed: ${backOffsetX.toFixed(2)}`);
  
  console.log(`\nSpecific ViewBox Recommendations:`);
  console.log(`\nFor Front View (bodyFront.ts):`);
  console.log(`viewBox="${paddedMinX.toFixed(0)} ${paddedMinY.toFixed(0)} ${paddedWidth.toFixed(0)} ${paddedHeight.toFixed(0)}"`);
  
  console.log(`\nFor Back View (bodyBack.ts):`);
  console.log(`viewBox="${paddedMinX.toFixed(0)} ${paddedMinY.toFixed(0)} ${paddedWidth.toFixed(0)} ${paddedHeight.toFixed(0)}"`);
  
  console.log(`\nBoth views should use the same viewBox for consistent sizing and alignment.`);
  console.log(`The views are naturally positioned differently within this coordinate space, which will provide proper alignment.`);
}