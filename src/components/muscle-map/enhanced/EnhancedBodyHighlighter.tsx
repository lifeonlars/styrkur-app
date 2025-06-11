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
    // Return a subtle background color for non-highlighted muscles so they're visible
    // Use a darker gray that works well with the app's dark theme
    return '#6b7280'; // Medium gray for non-highlighted muscles
  };

  // Get the stroke color based on theme
  const getStrokeColor = (): string => {
    if (border === 'none') return 'none';
    return border || '#1f2937'; // Default to a darker gray for better contrast
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

    const paths = [];

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
  const viewBox = side === 'front' ? '0 0 800 1400' : '0 0 800 1400';
  const width = 300 * scale;
  const height = 525 * scale;

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