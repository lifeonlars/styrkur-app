import React, { useMemo } from 'react';
import { EnhancedBodyHighlighterProps, ExtendedBodyPart, MuscleSlug } from './types';
import { bodyData as frontBodyData } from './data/bodyFront';
import { bodyData as backBodyData } from './data/bodyBack';

const EnhancedBodyHighlighter: React.FC<EnhancedBodyHighlighterProps> = ({
  data,
  colors = ['#ff6b6b', '#ff8e53', '#ff6b6b', '#c44569'],
  scale = 1,
  side = 'front',
  gender = 'male',
  onBodyPartPress,
  border = '#000000',
  style,
  className,
}) => {
  // For now, we'll use the male body data regardless of gender
  // Future enhancement could support female variants
  const bodyDataSource = side === 'front' ? frontBodyData : backBodyData;

  // Create a map of highlighted parts for quick lookup
  const highlightedParts = useMemo(() => {
    const map = new Map<MuscleSlug, ExtendedBodyPart>();
    data.forEach(part => {
      map.set(part.slug, part);
    });
    return map;
  }, [data]);

  // Calculate the color based on intensity
  const getColorForIntensity = (intensity: number = 1): string => {
    const colorIndex = Math.min(Math.floor(intensity * colors.length), colors.length - 1);
    return colors[colorIndex];
  };

  // Get the fill color for a body part
  const getFillColor = (slug: MuscleSlug): string => {
    const highlighted = highlightedParts.get(slug);
    if (highlighted) {
      return highlighted.color || getColorForIntensity(highlighted.intensity);
    }
    
    // Check if there's a default color in the body data for this part
    const bodyPart = bodyDataSource.find(part => part.slug === slug);
    if (bodyPart && bodyPart.color) {
      return bodyPart.color;
    }
    
    // Return a subtle background color for non-highlighted muscles so they're visible
    // Use a darker gray that works well with the app's dark theme
    return '#3a3a3f'; // Medium gray for non-highlighted muscles
  };

  // Get the stroke color based on theme
  const getStrokeColor = (): string => {
    if (border === 'none') return 'none';
    return border || '#1E1E1E'; // Default to a darker gray for better contrast
  };

  // Handle click on body part
  const handleBodyPartClick = (slug: MuscleSlug, partSide?: 'left' | 'right') => {
    const highlighted = highlightedParts.get(slug);
    if (highlighted && onBodyPartPress) {
      onBodyPartPress(highlighted, partSide);
    }
  };

  // Render SVG paths for a body part
  const renderBodyPart = (bodyPart: any) => {
    const fillColor = getFillColor(bodyPart.slug as MuscleSlug);
    const strokeColor = getStrokeColor();

    const paths: React.ReactElement[] = [];

    // Render common paths (for both sides)
    if (bodyPart.path?.common) {
      bodyPart.path.common.forEach((pathData: string, index: number) => {
        paths.push(
          <path
            key={`${bodyPart.slug}-common-${index}`}
            d={pathData}
            fill={fillColor}
            stroke={strokeColor}
            strokeWidth={border === 'none' ? 0 : 1}
            style={{ cursor: onBodyPartPress ? 'pointer' : 'default' }}
            onClick={() => handleBodyPartClick(bodyPart.slug)}
          />
        );
      });
    }

    // Render left side paths
    if (bodyPart.path?.left) {
      bodyPart.path.left.forEach((pathData: string, index: number) => {
        paths.push(
          <path
            key={`${bodyPart.slug}-left-${index}`}
            d={pathData}
            fill={fillColor}
            stroke={strokeColor}
            strokeWidth={border === 'none' ? 0 : 1}
            style={{ cursor: onBodyPartPress ? 'pointer' : 'default' }}
            onClick={() => handleBodyPartClick(bodyPart.slug, 'left')}
          />
        );
      });
    }

    // Render right side paths
    if (bodyPart.path?.right) {
      bodyPart.path.right.forEach((pathData: string, index: number) => {
        paths.push(
          <path
            key={`${bodyPart.slug}-right-${index}`}
            d={pathData}
            fill={fillColor}
            stroke={strokeColor}
            strokeWidth={border === 'none' ? 0 : 1}
            style={{ cursor: onBodyPartPress ? 'pointer' : 'default' }}
            onClick={() => handleBodyPartClick(bodyPart.slug, 'right')}
          />
        );
      });
    }

    return paths;
  };

  // Calculate viewBox and dimensions based on the body data
  // Analyzed coordinate bounds:
  // Front view: X: ~180-480, Y: ~90-1340 (width: ~300, height: ~1250)
  // Back view: X: ~780-1400, Y: ~90-1340 (width: ~620, height: ~1250)
  // 
  // Using consistent viewBox to align both views:
  // - Same width (400) and height (1300) for both
  // - Vertically aligned from top (Y: 80) to bottom
  // - Horizontally centered within the viewBox
  const viewBox = side === 'front' 
    ? '180 80 300 1300'  // Front: centered on actual content
    : '890 80 300 1300'; // Back: centered and cropped to match front width
  const width = 300 * scale;
  const height = 650 * scale;

  return (
    <div
      className={className}
      style={{
        display: 'inline-block',
        ...style,
      }}
    >
      <svg
        width={width}
        height={height}
        viewBox={viewBox}
        xmlns="http://www.w3.org/2000/svg"
        style={{
          maxWidth: '100%',
          height: 'auto',
        }}
      >
        {/* Render all body parts */}
        {bodyDataSource.map((bodyPart: any) => (
          <g key={bodyPart.slug}>
            {renderBodyPart(bodyPart)}
          </g>
        ))}
      </svg>
    </div>
  );
};

export default EnhancedBodyHighlighter;