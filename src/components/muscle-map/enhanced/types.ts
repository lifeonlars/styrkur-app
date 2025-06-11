/**
 * Enhanced Body Highlighter Types
 * Adapted from React Native body highlighter for web use
 */

export type MuscleSlug =
  | "abs"
  | "adductors" 
  | "ankles"
  | "biceps"
  | "calves"
  | "chest"
  | "deltoids"
  | "feet"
  | "forearm"
  | "gluteal"
  | "hamstring"
  | "hands"
  | "hair"
  | "head"
  | "knees"
  | "lower-back"
  | "neck"
  | "obliques"
  | "quadriceps"
  | "tibialis"
  | "trapezius"
  | "triceps"
  | "upper-back"

export interface BodyPart {
  slug: MuscleSlug
  color?: string
  path?: {
    common?: string[]
    left?: string[]
    right?: string[]
  }
}

export interface ExtendedBodyPart extends BodyPart {
  intensity?: number
  side?: "left" | "right"
}

export interface EnhancedBodyHighlighterProps {
  /** Array of body parts to highlight */
  data: ReadonlyArray<ExtendedBodyPart>
  /** Color palette for different intensities */
  colors?: ReadonlyArray<string>
  /** Scale factor for the body model */
  scale?: number
  /** Side view to display */
  side?: "front" | "back"
  /** Gender of the body model */
  gender?: "male" | "female"
  /** Callback when a body part is clicked */
  onBodyPartPress?: (bodyPart: ExtendedBodyPart, side?: "left" | "right") => void
  /** Border color or 'none' */
  border?: string
  /** Custom CSS styles for the SVG container */
  style?: React.CSSProperties
  /** CSS class name */
  className?: string
}