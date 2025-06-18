'use client'

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
    
    // Return a lighter background color for non-highlighted muscles for better contrast
    // Use a lighter gray that provides better visibility against dark background
    return '#6B7280'; // Lighter gray for better contrast with dark background
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
  // EXPANDED VIEWBOX: Added 40px (20px on each side) to prevent cropping
  // CENTERING ADJUSTMENT: Shifted 20px right to move body 20px left for better centering
  // Using consistent viewBox to align both views:
  // - Expanded width (340) and height (1300) for both
  // - Vertically aligned from top (Y: 80) to bottom
  // - Horizontally adjusted for optimal centering within the container
  const viewBox = side === 'front' 
    ? '180 80 340 1300'  // Front: shifted 20px right (was 160) for better centering
    : '890 80 340 1300'; // Back: shifted 20px right (was 870) for better centering
  const width = 340 * scale; // Increased from 300
  const height = 650 * scale;

  return (
    <div
      className={className}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%', // Take full width of parent
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
          display: 'block', // Removes default inline spacing
          margin: '0 auto', // Centers the SVG horizontally
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