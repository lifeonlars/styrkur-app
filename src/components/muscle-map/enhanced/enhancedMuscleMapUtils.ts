import { MuscleSlug, ExtendedBodyPart } from './types';

// Enhanced mapping from WGER muscle IDs to enhanced body highlighter muscle slugs
export const wgerToEnhancedMapping: Record<number, MuscleSlug[]> = {
  // Primary muscles
  1: ['biceps'], // Biceps brachii
  2: ['deltoids'], // Anterior deltoid
  3: ['deltoids'], // Serratus anterior
  4: ['chest'], // Chest
  5: ['triceps'], // Triceps brachii
  6: ['abs'], // Rectus abdominis
  7: ['calves'], // Gastrocnemius
  8: ['gluteal'], // Gluteus maximus
  9: ['hamstring'], // Biceps femoris
  10: ['quadriceps'], // Quadriceps femoris
  11: ['calves'], // Soleus
  12: ['obliques'], // Obliquus externus abdominis
  13: ['upper-back'], // Latissimus dorsi -> upper-back
  14: ['upper-back'], // Brachialis -> upper-back (close approximation)
  15: ['upper-back'], // Brachioradialis -> upper-back (close approximation)
  16: ['quadriceps'], // Vastus lateralis
  17: ['quadriceps'], // Vastus medialis
  18: ['deltoids'], // Deltoid
  19: ['upper-back'], // Rhomboideus major -> upper-back
  20: ['upper-back'], // Rhomboideus minor -> upper-back
  21: ['trapezius'], // Trapezius
  22: ['upper-back'], // Infraspinatus -> upper-back
  23: ['upper-back'], // Supraspinatus -> upper-back
  24: ['adductors'], // Adductor longus
  25: ['adductors'], // Adductor magnus
  26: ['abs'], // Pectoralis minor -> abs (core)
  27: ['upper-back'], // Levator scapulae -> upper-back
  28: ['upper-back'], // Teres major -> upper-back
  29: ['upper-back'], // Teres minor -> upper-back
  30: ['deltoids'], // Posterior deltoid
  31: ['forearm'], // Anconeus -> forearm
  32: ['forearm'], // Flexor carpi radialis -> forearm
  33: ['forearm'], // Flexor carpi ulnaris -> forearm
  34: ['forearm'], // Extensor carpi radialis longus -> forearm
  35: ['forearm'], // Extensor carpi radialis brevis -> forearm
  36: ['forearm'], // Extensor carpi ulnaris -> forearm
  37: ['forearm'], // Flexor digitorum superficialis -> forearm
  38: ['forearm'], // Flexor digitorum profundus -> forearm
  39: ['forearm'], // Extensor digitorum -> forearm
  40: ['forearm'], // Extensor digiti minimi -> forearm
  41: ['forearm'], // Extensor pollicis longus -> forearm
  42: ['forearm'], // Extensor pollicis brevis -> forearm
  43: ['forearm'], // Abductor pollicis longus -> forearm
  44: ['hands'], // Palmaris longus -> hands
  45: ['hands'], // Flexor pollicis longus -> hands
  46: ['forearm'], // Pronator teres -> forearm
  47: ['forearm'], // Pronator quadratus -> forearm
  48: ['forearm'], // Supinator -> forearm
  49: ['tibialis'], // Tibialis anterior
  50: ['tibialis'], // Tibialis posterior
  51: ['calves'], // Peroneus longus -> calves
  52: ['calves'], // Peroneus brevis -> calves
  53: ['calves'], // Flexor hallucis longus -> calves
  54: ['calves'], // Flexor digitorum longus -> calves
  55: ['calves'], // Extensor hallucis longus -> calves
  56: ['calves'], // Extensor digitorum longus -> calves
  57: ['neck'], // Sternocleidomastoideus
  58: ['neck'], // Scalenes
  59: ['lower-back'], // Erector spinae
  60: ['obliques'], // Obliquus internus abdominis
  61: ['abs'], // Transversus abdominis
  62: ['quadriceps'], // Rectus femoris
  63: ['quadriceps'], // Vastus intermedius
  64: ['hamstring'], // Semitendinosus
  65: ['hamstring'], // Semimembranosus
  66: ['gluteal'], // Gluteus medius
  67: ['gluteal'], // Gluteus minimus
  68: ['adductors'], // Adductor brevis
  69: ['adductors'], // Pectineus
  70: ['adductors'], // Gracilis
  71: ['upper-back'], // Psoas major -> upper-back (approximation)
  72: ['quadriceps'], // Iliacus -> quadriceps (hip flexor)
  73: ['gluteal'], // Piriformis -> gluteal
  74: ['head'], // Temporalis
  75: ['head'], // Masseter
  76: ['neck'], // Longus colli -> neck
  77: ['neck'], // Longus capitis -> neck
  78: ['upper-back'], // Multifidus -> upper-back
  79: ['lower-back'], // Quadratus lumborum
  80: ['abs'], // Diaphragm -> abs (core)
  81: ['upper-back'], // Serratus posterior superior -> upper-back
  82: ['upper-back'], // Serratus posterior inferior -> upper-back
  83: ['lower-back'], // Iliocostalis lumborum
  84: ['lower-back'], // Iliocostalis thoracis
  85: ['neck'], // Iliocostalis cervicis -> neck
  86: ['lower-back'], // Longissimus thoracis
  87: ['neck'], // Longissimus cervicis -> neck
  88: ['neck'], // Longissimus capitis -> neck
  89: ['lower-back'], // Spinalis thoracis
  90: ['neck'], // Spinalis cervicis -> neck
  91: ['neck'], // Spinalis capitis -> neck
  92: ['neck'], // Splenius cervicis -> neck
  93: ['neck'], // Splenius capitis -> neck
  94: ['upper-back'], // Semispinalis thoracis -> upper-back
  95: ['neck'], // Semispinalis cervicis -> neck
  96: ['neck'], // Semispinalis capitis -> neck
  97: ['neck'], // Rotatores cervicis -> neck
  98: ['upper-back'], // Rotatores thoracis -> upper-back
  99: ['lower-back'], // Rotatores lumborum
  100: ['neck'], // Interspinales cervicis -> neck
  101: ['upper-back'], // Interspinales thoracis -> upper-back
  102: ['lower-back'], // Interspinales lumborum
  103: ['neck'], // Intertransversarii -> neck
};

/**
 * Convert WGER muscle IDs to enhanced body highlighter format
 */
export function convertWgerToEnhanced(
  primaryMuscleIds: number[] = [],
  secondaryMuscleIds: number[] = [],
  exerciseName?: string
): ExtendedBodyPart[] {
  const muscleMap = new Map<MuscleSlug, ExtendedBodyPart>();

  // Process primary muscles with higher intensity
  primaryMuscleIds.forEach(muscleId => {
    const slugs = wgerToEnhancedMapping[muscleId];
    if (slugs) {
      slugs.forEach(slug => {
        if (muscleMap.has(slug)) {
          // If already exists, increase intensity
          const existing = muscleMap.get(slug)!;
          existing.intensity = Math.min((existing.intensity || 0.8) + 0.2, 1.0);
        } else {
          muscleMap.set(slug, {
            slug,
            intensity: 0.8,
            color: '#ff6b6b', // Primary muscle color
          });
        }
      });
    }
  });

  // Process secondary muscles with lower intensity
  secondaryMuscleIds.forEach(muscleId => {
    const slugs = wgerToEnhancedMapping[muscleId];
    if (slugs) {
      slugs.forEach(slug => {
        if (muscleMap.has(slug)) {
          // If already exists, slightly increase intensity
          const existing = muscleMap.get(slug)!;
          existing.intensity = Math.min((existing.intensity || 0.5) + 0.1, 0.9);
        } else {
          muscleMap.set(slug, {
            slug,
            intensity: 0.5,
            color: '#ff8e53', // Secondary muscle color
          });
        }
      });
    }
  });

  return Array.from(muscleMap.values());
}

/**
 * Aggregate muscle activation for multiple exercises (workout mode)
 */
export function aggregateWorkoutMuscleActivation(exercises: Array<{
  primaryMuscles?: number[];
  secondaryMuscles?: number[];
  name?: string;
}>): {
  exerciseData: ExtendedBodyPart[];
  colorMap: Record<string, string>;
} {
  const muscleMap = new Map<MuscleSlug, { intensity: number; count: number }>();

  // Process all exercises
  exercises.forEach(exercise => {
    const primaryMuscles = exercise.primaryMuscles || [];
    const secondaryMuscles = exercise.secondaryMuscles || [];

    // Process primary muscles
    primaryMuscles.forEach(muscleId => {
      const slugs = wgerToEnhancedMapping[muscleId];
      if (slugs) {
        slugs.forEach(slug => {
          const existing = muscleMap.get(slug);
          if (existing) {
            existing.intensity += 0.8;
            existing.count += 1;
          } else {
            muscleMap.set(slug, { intensity: 0.8, count: 1 });
          }
        });
      }
    });

    // Process secondary muscles
    secondaryMuscles.forEach(muscleId => {
      const slugs = wgerToEnhancedMapping[muscleId];
      if (slugs) {
        slugs.forEach(slug => {
          const existing = muscleMap.get(slug);
          if (existing) {
            existing.intensity += 0.4;
            existing.count += 1;
          } else {
            muscleMap.set(slug, { intensity: 0.4, count: 1 });
          }
        });
      }
    });
  });

  // Convert to final format with normalized intensities
  const exerciseData: ExtendedBodyPart[] = Array.from(muscleMap.entries()).map(([slug, data]) => {
    // Normalize intensity based on number of exercises
    const normalizedIntensity = Math.min(data.intensity / Math.max(exercises.length * 0.6, 1), 1.0);
    
    return {
      slug,
      intensity: normalizedIntensity,
      color: normalizedIntensity > 0.6 ? '#c44569' : normalizedIntensity > 0.3 ? '#ff6b6b' : '#ff8e53',
    };
  });

  // Create color map for legend
  const colorMap = {
    'High activation': '#c44569',
    'Medium activation': '#ff6b6b', 
    'Light activation': '#ff8e53',
  };

  return { exerciseData, colorMap };
}

/**
 * Get muscle name from slug for display purposes
 */
export const muscleDisplayNames: Record<MuscleSlug, string> = {
  abs: 'Abs',
  adductors: 'Adductors',
  ankles: 'Ankles',
  biceps: 'Biceps',
  calves: 'Calves',
  chest: 'Chest',
  deltoids: 'Deltoids',
  feet: 'Feet',
  forearm: 'Forearms',
  gluteal: 'Glutes',
  hamstring: 'Hamstrings',
  hands: 'Hands',
  hair: 'Hair',
  head: 'Head',
  knees: 'Knees',
  'lower-back': 'Lower Back',
  neck: 'Neck',
  obliques: 'Obliques',
  quadriceps: 'Quadriceps',
  tibialis: 'Tibialis',
  trapezius: 'Trapezius',
  triceps: 'Triceps',
  'upper-back': 'Upper Back',
};

export function getMuscleDisplayName(slug: MuscleSlug): string {
  return muscleDisplayNames[slug] || slug;
}