import React, { useState, useEffect } from 'react';
import { 
  Home, Calendar, Wrench, Edit3, Settings, Plus, 
  Search, ChevronDown, ChevronRight, Check, X,
  Play, Pause, Timer, Trophy, Target, Zap
} from 'lucide-react';

const StyrkurheimApp = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [workouts, setWorkouts] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [currentWorkout, setCurrentWorkout] = useState(null);
  const [showModal, setShowModal] = useState(null);
  const [exercises, setExercises] = useState([]);
  const [filteredExercises, setFilteredExercises] = useState([]);
  const [exerciseFilter, setExerciseFilter] = useState('');
  const [selectedBodyPart, setSelectedBodyPart] = useState('all');
  const [loading, setLoading] = useState(false);
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [showExerciseConfig, setShowExerciseConfig] = useState(null);
  const [workoutForm, setWorkoutForm] = useState({
    title: '',
    description: '',
    exercises: [],
    supersets: [],
    circuits: []
  });
  const [exerciseConfig, setExerciseConfig] = useState({
    sets: 3,
    reps: 10,
    weight: 0,
    rest: 90,
    rpe: 7,
    tempo: '',
    notes: ''
  });

  // Norse mythology icons mapping for body parts and equipment
  const norseIcons = {
    // Body parts
    'chest': '🛡️',
    'back': '🌲', 
    'shoulders': '🔨',
    'upper arms': '⚔️',
    'lower arms': '🗡️',
    'upper legs': '🏔️',
    'lower legs': '⛰️',
    'waist': '🔥',
    'cardio': '⚡',
    'neck': '👑',
    // Equipment
    'barbell': '🏔️',
    'dumbbell': '🪓',
    'cable': '⛓️',
    'body weight': '⚡',
    'kettlebell': '🪓',
    'assisted': '🛡️',
    'machine': '⚙️',
    'stability ball': '🔵',
    'default': '⚔️'
  };

  // Mock WGER API with realistic data structure
  const fetchExercises = async (query = '', bodyPart = '', limit = 50) => {
    setLoading(true);
    
    try {
      console.log('Using mock WGER API...', { query, bodyPart, limit });
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 400));
      
      // If we have cached exercises, use them for search
      if (exercises.length > 0 && query.length > 0) {
        console.log('Using cached exercises for search');
        const searchTerm = query.toLowerCase();
        const filtered = exercises.filter(ex => 
          ex.name.toLowerCase().includes(searchTerm) ||
          ex.target.toLowerCase().includes(searchTerm) ||
          ex.bodyPart.toLowerCase().includes(searchTerm) ||
          ex.equipment.toLowerCase().includes(searchTerm) ||
          ex.instructions.some(instruction => instruction.toLowerCase().includes(searchTerm))
        );
        setFilteredExercises(filtered.slice(0, limit));
        setLoading(false);
        return;
      }
      
      // Mock WGER exercise database with realistic data structure
      const mockWgerData = [
        // Kettlebell Exercises (Equipment ID: 10)
        {
          id: 345,
          uuid: "c788d643-150a-4ac7-97ef-84643c6419bf",
          name: "Kettlebell Swing",
          exercise_base: 9,
          description: "<p>Two Handed Russian Style Kettlebell swing. Stand with feet wide apart. Swing kettlebell between legs using hip drive.</p>",
          category: 10, // Abs/Core
          muscles: [8], // Glutes
          muscles_secondary: [14, 6], // Obliques, Rectus Abdominis
          equipment: [10], // Kettlebell
          language: 2
        },
        {
          id: 1001,
          uuid: "kb-goblet-squat",
          name: "Kettlebell Goblet Squat",
          description: "<p>Hold kettlebell at chest level. Squat down keeping chest up. Drive through heels to stand.</p>",
          category: 9, // Legs
          muscles: [10], // Quadriceps
          muscles_secondary: [8], // Glutes
          equipment: [10], // Kettlebell
          language: 2
        },
        {
          id: 1002,
          uuid: "kb-turkish-getup",
          name: "Turkish Get-Up",
          description: "<p>Start lying with kettlebell overhead. Slowly stand up while keeping bell overhead. Reverse the movement.</p>",
          category: 10, // Core
          muscles: [6], // Rectus Abdominis
          muscles_secondary: [2, 10], // Anterior Deltoid, Quadriceps
          equipment: [10], // Kettlebell
          language: 2
        },
        {
          id: 1003,
          uuid: "kb-clean-press",
          name: "Kettlebell Clean and Press",
          description: "<p>Clean kettlebell to rack position. Press overhead. Lower with control.</p>",
          category: 13, // Shoulders
          muscles: [2], // Anterior Deltoid
          muscles_secondary: [5, 6], // Triceps, Core
          equipment: [10], // Kettlebell
          language: 2
        },
        {
          id: 1004,
          uuid: "kb-deadlift",
          name: "Kettlebell Deadlift",
          description: "<p>Stand over kettlebell. Hinge at hips and grip handle. Drive hips forward to lift.</p>",
          category: 12, // Back
          muscles: [11], // Latissimus Dorsi
          muscles_secondary: [8, 9], // Glutes, Hamstrings
          equipment: [10], // Kettlebell
          language: 2
        },
        {
          id: 1005,
          uuid: "kb-snatch",
          name: "Kettlebell Snatch",
          description: "<p>Start with kettlebell between legs. Explosively pull to overhead. Lower with control.</p>",
          category: 13, // Shoulders
          muscles: [2], // Anterior Deltoid
          muscles_secondary: [11, 6], // Lats, Core
          equipment: [10], // Kettlebell
          language: 2
        },

        // Barbell Exercises (Equipment ID: 1)
        {
          id: 2001,
          uuid: "bb-back-squat",
          name: "Barbell Back Squat",
          description: "<p>Bar on upper back. Feet shoulder-width apart. Squat down and drive up through heels.</p>",
          category: 9, // Legs
          muscles: [10], // Quadriceps
          muscles_secondary: [8, 9], // Glutes, Hamstrings
          equipment: [1], // Barbell
          language: 2
        },
        {
          id: 2002,
          uuid: "bb-deadlift",
          name: "Barbell Deadlift",
          description: "<p>Stand with feet hip-width apart. Hinge at hips and grip bar. Drive through heels to lift.</p>",
          category: 12, // Back
          muscles: [11], // Latissimus Dorsi
          muscles_secondary: [8, 9], // Glutes, Hamstrings
          equipment: [1], // Barbell
          language: 2
        },
        {
          id: 2003,
          uuid: "bb-bench-press",
          name: "Barbell Bench Press",
          description: "<p>Lie on bench with feet flat. Lower bar to chest. Press up explosively.</p>",
          category: 11, // Chest
          muscles: [4], // Chest
          muscles_secondary: [5, 2], // Triceps, Anterior Deltoid
          equipment: [1], // Barbell
          language: 2
        },
        {
          id: 2004,
          uuid: "bb-overhead-press",
          name: "Barbell Overhead Press",
          description: "<p>Start with bar at shoulder height. Press overhead in straight line. Lower with control.</p>",
          category: 13, // Shoulders
          muscles: [2], // Anterior Deltoid
          muscles_secondary: [5, 6], // Triceps, Core
          equipment: [1], // Barbell
          language: 2
        },
        {
          id: 2005,
          uuid: "bb-row",
          name: "Barbell Bent Over Row",
          description: "<p>Hinge at hips with bar in hands. Pull bar to lower chest. Lower with control.</p>",
          category: 12, // Back
          muscles: [11], // Latissimus Dorsi
          muscles_secondary: [13, 1], // Trapezius, Biceps
          equipment: [1], // Barbell
          language: 2
        },

        // Bodyweight Exercises (Equipment ID: 7)
        {
          id: 3001,
          uuid: "bw-pushups",
          name: "Push-ups",
          description: "<p>Start in plank position. Lower chest to floor. Push back up to starting position.</p>",
          category: 11, // Chest
          muscles: [4], // Chest
          muscles_secondary: [5, 2], // Triceps, Anterior Deltoid
          equipment: [7], // Body weight
          language: 2
        },
        {
          id: 3002,
          uuid: "bw-pullups",
          name: "Pull-ups",
          description: "<p>Hang from bar with palms away. Pull chest to bar. Lower with control.</p>",
          category: 12, // Back
          muscles: [11], // Latissimus Dorsi
          muscles_secondary: [1], // Biceps
          equipment: [7], // Body weight
          language: 2
        },
        {
          id: 3003,
          uuid: "bw-squats",
          name: "Bodyweight Squats",
          description: "<p>Feet shoulder-width apart. Squat down keeping chest up. Drive through heels to stand.</p>",
          category: 9, // Legs
          muscles: [10], // Quadriceps
          muscles_secondary: [8], // Glutes
          equipment: [7], // Body weight
          language: 2
        },
        {
          id: 3004,
          uuid: "bw-plank",
          name: "Plank",
          description: "<p>Start in push-up position. Hold straight line from head to heels. Engage core throughout.</p>",
          category: 10, // Core
          muscles: [6], // Rectus Abdominis
          muscles_secondary: [2], // Anterior Deltoid
          equipment: [7], // Body weight
          language: 2
        },
        {
          id: 3005,
          uuid: "bw-burpees",
          name: "Burpees",
          description: "<p>Start standing. Drop to push-up position. Jump back up with hands overhead.</p>",
          category: 10, // Core
          muscles: [6], // Rectus Abdominis
          muscles_secondary: [4, 10], // Chest, Quadriceps
          equipment: [7], // Body weight
          language: 2
        },

        // Dumbbell Exercises (Equipment ID: 3)
        {
          id: 4001,
          uuid: "db-bench-press",
          name: "Dumbbell Bench Press",
          description: "<p>Lie on bench with dumbbells. Press dumbbells up and together. Lower with control.</p>",
          category: 11, // Chest
          muscles: [4], // Chest
          muscles_secondary: [5, 2], // Triceps, Anterior Deltoid
          equipment: [3], // Dumbbell
          language: 2
        },
        {
          id: 4002,
          uuid: "db-rows",
          name: "Dumbbell Bent Over Row",
          description: "<p>Hinge at hips holding dumbbells. Pull dumbbells to hip. Lower with control.</p>",
          category: 12, // Back
          muscles: [11], // Latissimus Dorsi
          muscles_secondary: [13, 1], // Trapezius, Biceps
          equipment: [3], // Dumbbell
          language: 2
        },
        {
          id: 4003,
          uuid: "db-shoulder-press",
          name: "Dumbbell Shoulder Press",
          description: "<p>Hold dumbbells at shoulder height. Press overhead. Lower with control.</p>",
          category: 13, // Shoulders
          muscles: [2], // Anterior Deltoid
          muscles_secondary: [5], // Triceps
          equipment: [3], // Dumbbell
          language: 2
        }
      ];

      // Apply filters
      let filtered = mockWgerData;
      
      // Body part filter
      if (bodyPart && bodyPart !== 'all') {
        const categoryId = mapBodyPartToCategory(bodyPart);
        if (categoryId) {
          filtered = filtered.filter(ex => ex.category === categoryId);
        }
      }
      
      // Search filter
      if (query && query.length > 0) {
        const searchTerm = query.toLowerCase();
        filtered = filtered.filter(ex => 
          ex.name.toLowerCase().includes(searchTerm) ||
          ex.description.toLowerCase().includes(searchTerm)
        );
      }
      
      // Map to our format
      const mappedExercises = filtered.map(exercise => ({
        id: exercise.id.toString(),
        name: exercise.name,
        bodyPart: mapCategoryToBodyPart(exercise.category),
        equipment: mapEquipmentArray(exercise.equipment),
        target: getTargetMuscle(exercise.muscles),
        primaryMuscles: exercise.muscles || [],
        secondaryMuscles: exercise.muscles_secondary || [],
        instructions: parseInstructions(exercise.description),
        category: exercise.category,
        uuid: exercise.uuid,
        icon: getNorseIconForCategory(exercise.category),
        isWeighted: determineIfWeighted(exercise.equipment),
        wgerData: exercise
      }));
      
      console.log(`Mock API returned ${mappedExercises.length} exercises`);
      
      setExercises(mappedExercises);
      setFilteredExercises(mappedExercises.slice(0, limit));
      
      // Cache in memory
      if (typeof window !== 'undefined') {
        window.exerciseCache = mappedExercises;
      }
      
    } catch (error) {
      console.error('Mock API error:', error);
      loadFallbackExercises();
    }
    
    setLoading(false);
  };

  // Map body parts to Wger category IDs
  const mapBodyPartToCategory = (bodyPart) => {
    const mapping = {
      'chest': 11, // Chest
      'back': 12, // Back  
      'shoulders': 13, // Shoulders
      'upper arms': 8, // Arms
      'lower arms': 8, // Arms
      'upper legs': 9, // Legs
      'lower legs': 14, // Calves
      'waist': 10 // Abs
    };
    return mapping[bodyPart];
  };

  // Map Wger categories back to our body parts
  const mapCategoryToBodyPart = (categoryId) => {
    const mapping = {
      8: 'upper arms', // Arms
      9: 'upper legs', // Legs
      10: 'waist', // Abs
      11: 'chest', // Chest
      12: 'back', // Back
      13: 'shoulders', // Shoulders  
      14: 'lower legs' // Calves
    };
    return mapping[categoryId] || 'general';
  };

  // Map equipment arrays to readable string
  const mapEquipmentArray = (equipmentArray) => {
    if (!equipmentArray || equipmentArray.length === 0) return 'body weight';
    
    // Equipment ID mapping from Wger
    const equipmentMap = {
      1: 'barbell',
      3: 'dumbbell', 
      7: 'body weight',
      8: 'bench',
      9: 'incline bench',
      10: 'kettlebell',
      12: 'pull-up bar',
      15: 'cable'
    };
    
    const primaryEquipment = equipmentMap[equipmentArray[0]] || 'unknown';
    return primaryEquipment;
  };

  // Get target muscle name
  const getTargetMuscle = (muscleArray) => {
    if (!muscleArray || muscleArray.length === 0) return 'general';
    
    // Muscle ID mapping from Wger (common ones)
    const muscleMap = {
      1: 'biceps',
      2: 'anterior deltoid', 
      3: 'serratus anterior',
      4: 'chest',
      5: 'triceps',
      6: 'rectus abdominis',
      7: 'calves',
      8: 'glutes',
      9: 'hamstrings',
      10: 'quadriceps',
      11: 'latissimus dorsi',
      12: 'posterior deltoid',
      13: 'trapezius',
      14: 'obliques',
      15: 'gastrocnemius'
    };
    
    return muscleMap[muscleArray[0]] || `muscle_${muscleArray[0]}`;
  };

  // Determine if exercise is weighted based on equipment
  const determineIfWeighted = (equipmentArray) => {
    return equipmentArray && equipmentArray.length > 0 && equipmentArray[0] !== 7; // Not body weight
  };

  // Get Norse icon based on category
  const getNorseIconForCategory = (categoryId) => {
    const mapping = {
      8: '⚔️', // Arms
      9: '🏔️', // Legs  
      10: '🔥', // Abs
      11: '🛡️', // Chest
      12: '🌲', // Back
      13: '🔨', // Shoulders
      14: '⛰️' // Calves
    };
    return mapping[categoryId] || '⚔️';
  };

  // Parse HTML instructions to plain text array
  const parseInstructions = (htmlDescription) => {
    if (!htmlDescription) return ['Perform exercise with proper form'];
    
    // Remove HTML tags and convert to plain text
    const plainText = htmlDescription.replace(/<[^>]*>/g, '').trim();
    
    // Split by common separators and filter empty strings
    const instructions = plainText
      .split(/[.\n•]/)
      .map(instruction => instruction.trim())
      .filter(instruction => instruction.length > 10); // Filter out very short fragments
    
    return instructions.length > 0 ? instructions : ['Perform exercise with proper form'];
  };

  // Load fallback exercises
  const loadFallbackExercises = () => {
    // Try to load from memory cache first
    try {
      if (typeof window !== 'undefined' && window.exerciseCache && window.exerciseCache.length > 0) {
        console.log(`Loaded ${window.exerciseCache.length} exercises from memory cache`);
        setExercises(window.exerciseCache);
        setFilteredExercises(window.exerciseCache.slice(0, 50));
        return;
      }
    } catch (error) {
      console.log('Failed to load from memory cache:', error);
    }
    
    console.log('Using basic fallback exercises...');
    const fallbackData = [
      { 
        id: 'fb1', 
        name: 'Kettlebell Swing', 
        bodyPart: 'waist', 
        equipment: 'kettlebell', 
        target: 'glutes', 
        icon: '🪓', 
        instructions: ['Stand with feet wide', 'Swing kettlebell between legs', 'Drive hips forward'],
        isWeighted: true,
        primaryMuscles: ['glutes'],
        secondaryMuscles: ['core']
      },
      { 
        id: 'fb2', 
        name: 'Push-ups', 
        bodyPart: 'chest', 
        equipment: 'body weight', 
        target: 'pectorals', 
        icon: '🛡️', 
        instructions: ['Start in plank position', 'Lower chest to floor', 'Push back up'],
        isWeighted: false,
        primaryMuscles: ['chest'],
        secondaryMuscles: ['triceps']
      },
      { 
        id: 'fb3', 
        name: 'Barbell Squat', 
        bodyPart: 'upper legs', 
        equipment: 'barbell', 
        target: 'quadriceps', 
        icon: '🏔️', 
        instructions: ['Bar on shoulders', 'Squat down', 'Drive up through heels'],
        isWeighted: true,
        primaryMuscles: ['quadriceps'],
        secondaryMuscles: ['glutes']
      }
    ];
    
    setExercises(fallbackData);
    setFilteredExercises(fallbackData);
  };

  // Handle exercise search with improved logic
  const handleExerciseSearch = (searchTerm) => {
    setExerciseFilter(searchTerm);
    
    // Clear existing timeout
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
    
    if (searchTerm.length === 0) {
      // Reset to show all exercises or current body part filter
      fetchExercises('', selectedBodyPart, 50);
      return;
    }
    
    if (searchTerm.length < 3) {
      // Filter locally from current exercises for 1-2 chars
      if (exercises.length > 0) {
        const filtered = exercises.filter(ex => 
          ex.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          ex.target.toLowerCase().includes(searchTerm.toLowerCase()) ||
          ex.bodyPart.toLowerCase().includes(searchTerm.toLowerCase()) ||
          ex.equipment.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredExercises(filtered.slice(0, 50));
      }
      return;
    }
    
    // For 3+ characters, search with debouncing
    const newTimeout = setTimeout(() => {
      console.log(`Searching for: "${searchTerm}"`);
      fetchExercises(searchTerm, selectedBodyPart, 50);
    }, 300);
    
    setSearchTimeout(newTimeout);
  };

  const handleBodyPartFilter = async (bodyPart) => {
    setSelectedBodyPart(bodyPart);
    setExerciseFilter(''); // Clear search when filtering by body part
    console.log(`Filtering by body part: ${bodyPart}`);
    await fetchExercises('', bodyPart, 50);
  };

  // Load exercises on component mount
  useEffect(() => {
    console.log('Loading initial exercises...');
    fetchExercises('', 'all', 100); // Load initial exercises
  }, []);

  // Sample programs and workouts
  useEffect(() => {
    const sampleWorkouts = [
      {
        id: 1,
        title: 'Odin\'s Strength',
        description: 'Core compound movements',
        exercises: [
          { exerciseId: '2001', sets: 5, reps: 5, load: 100, rest: 180 },
          { exerciseId: '2002', sets: 3, reps: 8, load: 120, rest: 180 },
          { exerciseId: '3002', sets: 3, reps: 10, load: 0, rest: 120 }
        ],
        tags: ['strength', 'compound']
      },
      {
        id: 2,
        title: 'Thor\'s Hammer',
        description: 'Upper body power',
        exercises: [
          { exerciseId: '2004', sets: 4, reps: 6, load: 60, rest: 150 },
          { exerciseId: '2003', sets: 4, reps: 8, load: 80, rest: 150 },
          { exerciseId: '3002', sets: 3, reps: 12, load: 0, rest: 90 }
        ],
        tags: ['upper', 'power']
      }
    ];
    setWorkouts(sampleWorkouts);
  }, []);

  // Add exercise with configuration
  const addExerciseToWorkout = (exercise) => {
    setShowExerciseConfig(exercise);
    setExerciseConfig({
      sets: 3,
      reps: 10,
      weight: exercise.isWeighted ? 20 : 0,
      rest: 90,
      rpe: 7,
      tempo: '',
      notes: ''
    });
  };

  const confirmAddExercise = () => {
    if (!showExerciseConfig) return;
    
    const newExercise = {
      id: Date.now(),
      exerciseId: showExerciseConfig.id,
      exerciseData: showExerciseConfig,
      ...exerciseConfig,
      type: 'single'
    };
    
    setWorkoutForm(prev => ({
      ...prev,
      exercises: [...prev.exercises, newExercise]
    }));
    
    setShowExerciseConfig(null);
  };

  // Superset and Circuit functions
  const createSuperset = (exercises) => {
    const newSuperset = {
      id: Date.now(),
      type: 'superset',
      name: `Superset ${String.fromCharCode(65 + workoutForm.supersets.length)}`,
      exercises: exercises,
      rounds: 3,
      rest: 60
    };
    
    setWorkoutForm(prev => ({
      ...prev,
      supersets: [...prev.supersets, newSuperset]
    }));
  };

  const createCircuit = (exercises) => {
    const newCircuit = {
      id: Date.now(),
      type: 'circuit',
      name: `Circuit ${workoutForm.circuits.length + 1}`,
      exercises: exercises,
      rounds: 3,
      rest: 45
    };
    
    setWorkoutForm(prev => ({
      ...prev,
      circuits: [...prev.circuits, newCircuit]
    }));
  };

  const saveWorkout = () => {
    if (!workoutForm.title) return;
    
    const newWorkout = {
      id: Date.now(),
      ...workoutForm,
      tags: ['custom']
    };
    
    setWorkouts(prev => [...prev, newWorkout]);
    setWorkoutForm({ title: '', description: '', exercises: [], supersets: [], circuits: [] });
    setShowModal(null);
  };

  const startWorkout = (workout) => {
    const workoutSession = {
      ...workout,
      startTime: new Date(),
      completedSets: {},
      logs: {}
    };
    setCurrentWorkout(workoutSession);
    setActiveTab('train');
  };

  const completeSet = (exerciseIndex, setIndex) => {
    if (!currentWorkout) return;
    
    const key = `${exerciseIndex}-${setIndex}`;
    setCurrentWorkout(prev => ({
      ...prev,
      completedSets: {
        ...prev.completedSets,
        [key]: !prev.completedSets[key]
      }
    }));
  };

  const getExerciseById = (id) => {
    return exercises.find(ex => ex.id === id) || filteredExercises.find(ex => ex.id === id);
  };

  const renderHomeScreen = () => (
    <div className="flex-1 overflow-y-auto pb-20">
      {/* Header */}
      <div className="bg-gray-900 p-6 border-b border-gray-800">
        <h1 className="text-2xl font-light text-white mb-2">Styrkurheim</h1>
        <p className="text-gray-400 text-sm">Strength through the ages</p>
      </div>

      {/* Quick Stats */}
      <div className="p-4 grid grid-cols-3 gap-4">
        <div className="bg-gray-800 rounded-xl p-4 text-center">
          <div style={{color: '#C3A869'}} className="text-2xl mb-1">⚡</div>
          <div className="text-white font-medium">12</div>
          <div className="text-gray-400 text-xs">Sessions</div>
        </div>
        <div className="bg-gray-800 rounded-xl p-4 text-center">
          <div style={{color: '#C3A869'}} className="text-2xl mb-1">🏔️</div>
          <div className="text-white font-medium">3</div>
          <div className="text-gray-400 text-xs">PRs</div>
        </div>
        <div className="bg-gray-800 rounded-xl p-4 text-center">
          <div style={{color: '#C3A869'}} className="text-2xl mb-1">🔥</div>
          <div className="text-white font-medium">7</div>
          <div className="text-gray-400 text-xs">Streak</div>
        </div>
      </div>

      {/* Recent Workouts */}
      <div className="p-4">
        <h2 className="text-white font-medium mb-4 flex items-center">
          <Trophy className="w-5 h-5 mr-2" style={{color: '#C3A869'}} />
          Your Arsenal
        </h2>
        <div className="space-y-3">
          {workouts.map(workout => (
            <div key={workout.id} className="bg-gray-800 rounded-xl p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-white font-medium">{workout.title}</h3>
                <button
                  onClick={() => startWorkout(workout)}
                  style={{backgroundColor: '#C3A869'}}
                  className="text-black px-3 py-1 rounded-lg text-sm font-medium"
                >
                  Start
                </button>
              </div>
              <p className="text-gray-400 text-sm mb-3">{workout.description}</p>
              <div className="flex flex-wrap gap-2">
                {workout.tags.map(tag => (
                  <span key={tag} style={{backgroundColor: 'rgba(195, 168, 105, 0.2)', color: '#C3A869'}} className="px-2 py-1 rounded text-xs">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderTrainScreen = () => {
    if (!currentWorkout) {
      return (
        <div className="flex-1 flex items-center justify-center pb-20">
          <div className="text-center">
            <div className="text-6xl mb-4">⚔️</div>
            <h2 className="text-white text-xl font-medium mb-2">Ready for Battle</h2>
            <p className="text-gray-400 mb-6">Select a workout to begin your training</p>
            <button
              onClick={() => setActiveTab('home')}
              style={{backgroundColor: '#C3A869'}}
              className="text-black px-6 py-3 rounded-xl font-medium"
            >
              Choose Workout
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="flex-1 overflow-y-auto pb-20">
        {/* Workout Header */}
        <div className="bg-gray-900 p-4 border-b border-gray-800 sticky top-0 z-10">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-white text-lg font-medium">{currentWorkout.title}</h1>
              <p className="text-gray-400 text-sm">
                {new Date(currentWorkout.startTime).toLocaleTimeString()}
              </p>
            </div>
            <button
              onClick={() => setCurrentWorkout(null)}
              style={{color: '#C3A869'}}
              className="bg-gray-800 p-2 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Exercise List */}
        <div className="p-4 space-y-4">
          {currentWorkout.exercises.map((exercise, exerciseIndex) => {
            const exerciseData = getExerciseById(exercise.exerciseId);
            return (
              <div key={exerciseIndex} className="bg-gray-800 rounded-xl p-4">
                <div className="flex items-center mb-3">
                  <span className="text-2xl mr-3">{exerciseData?.icon}</span>
                  <div className="flex-1">
                    <h3 className="text-white font-medium">{exerciseData?.name}</h3>
                    <p className="text-gray-400 text-sm">
                      {exercise.sets} × {exercise.reps} @ {exercise.load}kg
                    </p>
                  </div>
                </div>
                
                {/* Set Tracking */}
                <div className="grid grid-cols-4 gap-2">
                  {Array.from({ length: exercise.sets }).map((_, setIndex) => {
                    const isCompleted = currentWorkout.completedSets[`${exerciseIndex}-${setIndex}`];
                    return (
                      <button
                        key={setIndex}
                        onClick={() => completeSet(exerciseIndex, setIndex)}
                        className={`p-3 rounded-lg border-2 transition-all ${
                          isCompleted
                            ? 'border-2 text-black'
                            : 'bg-gray-700 border-gray-600 text-white'
                        }`}
                        style={isCompleted ? {backgroundColor: '#C3A869', borderColor: '#C3A869'} : {}}
                      >
                        <div className="text-sm font-medium">Set {setIndex + 1}</div>
                        <div className="text-xs opacity-75">{exercise.reps} reps</div>
                        {isCompleted && <Check className="w-4 h-4 mx-auto mt-1" />}
                      </button>
                    );
                  })}
                </div>
                
                {/* Rest Timer */}
                <div className="mt-3 pt-3 border-t border-gray-700">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400 flex items-center">
                      <Timer className="w-4 h-4 mr-1" />
                      Rest: {exercise.rest}s
                    </span>
                    <span style={{color: '#C3A869'}} className="text-sm">RPE: 7</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Complete Workout Button */}
        <div className="fixed bottom-20 left-4 right-4">
          <button
            onClick={() => {
              setCurrentWorkout(null);
              setActiveTab('home');
            }}
            style={{backgroundColor: '#C3A869'}}
            className="w-full text-black py-4 rounded-xl font-medium text-lg"
          >
            Complete Workout 🏆
          </button>
        </div>
      </div>
    );
  };

  const renderBuildScreen = () => (
    <div className="flex-1 overflow-y-auto pb-20">
      {/* Header */}
      <div className="bg-gray-900 p-4 border-b border-gray-800">
        <h1 className="text-white text-xl font-medium">Forge Your Path</h1>
        <p className="text-gray-400 text-sm">Create workouts and programs</p>
      </div>

      {/* Quick Actions */}
      <div className="p-4 grid grid-cols-2 gap-4">
        <button
          onClick={() => setShowModal('workout')}
          className="bg-gray-800 p-6 rounded-xl text-center hover:bg-gray-700 transition"
        >
          <div style={{color: '#C3A869'}} className="text-3xl mb-2">⚡</div>
          <div className="text-white font-medium">New Workout</div>
          <div className="text-gray-400 text-sm">Build custom session</div>
        </button>
        
        <button
          onClick={() => setShowModal('program')}
          className="bg-gray-800 p-6 rounded-xl text-center hover:bg-gray-700 transition"
        >
          <div style={{color: '#C3A869'}} className="text-3xl mb-2">📋</div>
          <div className="text-white font-medium">New Program</div>
          <div className="text-gray-400 text-sm">Multi-week plan</div>
        </button>
      </div>

      {/* Program Templates */}
      <div className="p-4">
        <h2 className="text-white font-medium mb-4">Program Templates</h2>
        <div className="space-y-3">
          <div className="bg-gray-800 rounded-xl p-4">
            <h3 className="text-white font-medium mb-1">Valhalla Strength</h3>
            <p className="text-gray-400 text-sm mb-2">12-week progressive overload program</p>
            <div className="flex justify-between items-center">
              <span style={{color: '#C3A869'}} className="text-sm">3 blocks • 36 sessions</span>
              <button style={{backgroundColor: '#C3A869'}} className="text-black px-3 py-1 rounded-lg text-sm">
                Use Template
              </button>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-xl p-4">
            <h3 className="text-white font-medium mb-1">Berserker Conditioning</h3>
            <p className="text-gray-400 text-sm mb-2">High-intensity metabolic training</p>
            <div className="flex justify-between items-center">
              <span style={{color: '#C3A869'}} className="text-sm">2 blocks • 24 sessions</span>
              <button style={{backgroundColor: '#C3A869'}} className="text-black px-3 py-1 rounded-lg text-sm">
                Use Template
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderWorkoutModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-end z-50">
      <div className="bg-gray-900 w-full h-5/6 rounded-t-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="p-4 border-b border-gray-800 flex justify-between items-center">
          <h2 className="text-white text-lg font-medium">Create Workout</h2>
          <button onClick={() => setShowModal(null)} className="text-gray-400">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {/* Workout Details */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Workout name (e.g., Odin's Power)"
              value={workoutForm.title}
              onChange={(e) => setWorkoutForm(prev => ({ ...prev, title: e.target.value }))}
              className="w-full bg-gray-800 text-white p-3 rounded-xl mb-3 placeholder-gray-400"
            />
            <textarea
              placeholder="Description (optional)"
              value={workoutForm.description}
              onChange={(e) => setWorkoutForm(prev => ({ ...prev, description: e.target.value }))}
              className="w-full bg-gray-800 text-white p-3 rounded-xl placeholder-gray-400 h-20 resize-none"
            />
          </div>

          {/* Exercise Search and Filters */}
          <div className="mb-6">
            <h3 className="text-white font-medium mb-3">Add Exercises</h3>
            
            {/* Search Bar */}
            <div className="relative mb-3">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search exercises... (e.g., kettlebell, squat, press)"
                value={exerciseFilter}
                onChange={(e) => handleExerciseSearch(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleExerciseSearch(exerciseFilter);
                  }
                }}
                className="w-full bg-gray-800 text-white pl-10 pr-4 py-3 rounded-xl placeholder-gray-400"
              />
              {exerciseFilter.length > 0 && exerciseFilter.length < 3 && (
                <div className="absolute right-3 top-3 text-xs text-gray-500">
                  {3 - exerciseFilter.length} more chars for search
                </div>
              )}
              {loading && (
                <div className="absolute right-3 top-3">
                  <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
            </div>

            {/* Body Part Filter */}
            <div className="flex gap-2 mb-3 overflow-x-auto">
              {['all', 'chest', 'back', 'shoulders', 'upper arms', 'upper legs', 'waist'].map(bodyPart => (
                <button
                  key={bodyPart}
                  onClick={() => handleBodyPartFilter(bodyPart)}
                  className={`px-3 py-1 rounded-lg text-xs whitespace-nowrap transition ${
                    selectedBodyPart === bodyPart
                      ? 'text-black'
                      : 'bg-gray-700 text-gray-300'
                  }`}
                  style={selectedBodyPart === bodyPart ? {backgroundColor: '#C3A869'} : {}}
                >
                  {bodyPart === 'all' ? 'All' : bodyPart.charAt(0).toUpperCase() + bodyPart.slice(1)}
                </button>
              ))}
            </div>
            
            {/* Exercise List */}
            <div className="max-h-60 overflow-y-auto">
              {loading ? (
                <div className="text-center py-8">
                  <div style={{color: '#C3A869'}} className="text-2xl mb-2">⚡</div>
                  <div className="text-gray-400">
                    {exerciseFilter.length >= 3 ? `Searching for "${exerciseFilter}"...` : 'Loading exercises...'}
                  </div>
                </div>
              ) : filteredExercises.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-gray-400 text-sm">
                    {exerciseFilter.length > 0 
                      ? `No exercises found for "${exerciseFilter}". Try different keywords.`
                      : 'No exercises available'
                    }
                  </div>
                  {exerciseFilter.length > 0 && (
                    <div className="text-gray-500 text-xs mt-2">
                      Try: "kettlebell", "squat", "press", "pull"
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 gap-2">
                    {filteredExercises.slice(0, 15).map(exercise => (
                      <button
                        key={exercise.id}
                        onClick={() => addExerciseToWorkout(exercise)}
                        className="bg-gray-800 p-3 rounded-lg flex items-center hover:bg-gray-700 transition"
                      >
                        <span className="text-2xl mr-3">{exercise.icon}</span>
                        <div className="text-left flex-1">
                          <div className="text-white text-sm font-medium">{exercise.name}</div>
                          <div className="text-gray-400 text-xs">
                            {exercise.target} • {exercise.equipment}
                          </div>
                        </div>
                        <div className="flex items-center">
                          {exercise.isWeighted && (
                            <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded mr-2">
                              Weighted
                            </span>
                          )}
                          <Plus className="w-5 h-5" style={{color: '#C3A869'}} />
                        </div>
                      </button>
                    ))}
                  </div>
                  {filteredExercises.length > 15 && (
                    <div className="text-center py-2 text-gray-400 text-xs">
                      Showing first 15 of {filteredExercises.length} results. Be more specific to narrow down.
                    </div>
                  )}
                  {exerciseFilter.length > 0 && (
                    <div className="text-center py-2">
                      <button
                        onClick={() => {
                          setExerciseFilter('');
                          handleExerciseSearch('');
                        }}
                        className="text-xs text-gray-400 hover:text-gray-300"
                      >
                        Clear search
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Current Workout Structure */}
          {(workoutForm.exercises.length > 0 || workoutForm.supersets.length > 0 || workoutForm.circuits.length > 0) && (
            <div className="mb-6">
              <h3 className="text-white font-medium mb-3">Workout Structure</h3>
              <div className="space-y-3">
                {/* Individual Exercises */}
                {workoutForm.exercises.map((exercise, index) => (
                  <div key={exercise.id} className="bg-gray-800 p-3 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="text-xl mr-2">{exercise.exerciseData?.icon}</span>
                        <div>
                          <div className="text-white text-sm font-medium">{exercise.exerciseData?.name}</div>
                          <div className="text-gray-400 text-xs">
                            {exercise.sets} × {exercise.reps}
                            {exercise.weight > 0 && ` @ ${exercise.weight}kg`}
                            {exercise.rpe && ` • RPE ${exercise.rpe}`}
                          </div>
                        </div>
                      </div>
                      <button 
                        onClick={() => setWorkoutForm(prev => ({
                          ...prev,
                          exercises: prev.exercises.filter(ex => ex.id !== exercise.id)
                        }))}
                        className="text-red-400 hover:text-red-300"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}

                {/* Supersets */}
                {workoutForm.supersets.map((superset, index) => (
                  <div key={superset.id} className="bg-yellow-900 bg-opacity-20 border border-yellow-600 p-3 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-yellow-400 text-sm font-medium">🟡 {superset.name}</div>
                      <div className="text-gray-400 text-xs">{superset.rounds} rounds</div>
                    </div>
                    <div className="space-y-1">
                      {superset.exercises.map((exercise, exIndex) => (
                        <div key={exIndex} className="text-gray-300 text-xs ml-4">
                          {exIndex + 1}. {exercise.exerciseData?.name} - {exercise.sets}×{exercise.reps}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                {/* Circuits */}
                {workoutForm.circuits.map((circuit, index) => (
                  <div key={circuit.id} className="bg-red-900 bg-opacity-20 border border-red-600 p-3 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-red-400 text-sm font-medium">🔴 {circuit.name}</div>
                      <div className="text-gray-400 text-xs">{circuit.rounds} rounds</div>
                    </div>
                    <div className="space-y-1">
                      {circuit.exercises.map((exercise, exIndex) => (
                        <div key={exIndex} className="text-gray-300 text-xs ml-4">
                          {exIndex + 1}. {exercise.exerciseData?.name} - {exercise.sets}×{exercise.reps}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Save Button */}
        <div className="p-4 border-t border-gray-800">
          <button
            onClick={saveWorkout}
            disabled={!workoutForm.title || (workoutForm.exercises.length === 0 && workoutForm.supersets.length === 0 && workoutForm.circuits.length === 0)}
            style={{backgroundColor: (!workoutForm.title || (workoutForm.exercises.length === 0 && workoutForm.supersets.length === 0 && workoutForm.circuits.length === 0)) ? '#6B7280' : '#C3A869'}}
            className="w-full text-black disabled:text-gray-400 py-3 rounded-xl font-medium"
          >
            Save Workout
          </button>
        </div>
      </div>
    </div>
  );

  const renderBottomNav = () => (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800">
      <div className="flex">
        {[
          { id: 'home', icon: Home, label: 'Home' },
          { id: 'train', icon: Calendar, label: 'Train' },
          { id: 'build', icon: Wrench, label: 'Build' },
          { id: 'log', icon: Edit3, label: 'Log' },
          { id: 'settings', icon: Settings, label: 'Settings' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-3 px-2 flex flex-col items-center ${
              activeTab === tab.id ? '' : 'text-gray-400'
            }`}
            style={activeTab === tab.id ? {color: '#C3A869'} : {}}
          >
            <tab.icon className="w-5 h-5 mb-1" />
            <span className="text-xs">{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );

  const renderActiveScreen = () => {
    switch (activeTab) {
      case 'home': return renderHomeScreen();
      case 'train': return renderTrainScreen();
      case 'build': return renderBuildScreen();
      case 'log': return (
        <div className="flex-1 flex items-center justify-center pb-20">
          <div className="text-center">
            <Edit3 className="w-16 h-16 mx-auto mb-4" style={{color: '#C3A869'}} />
            <h2 className="text-white text-xl mb-2">Training Log</h2>
            <p className="text-gray-400">View your progress and history</p>
          </div>
        </div>
      );
      case 'settings': return (
        <div className="flex-1 flex items-center justify-center pb-20">
          <div className="text-center">
            <Settings className="w-16 h-16 mx-auto mb-4" style={{color: '#C3A869'}} />
            <h2 className="text-white text-xl mb-2">Settings</h2>
            <p className="text-gray-400">Customize your experience</p>
          </div>
        </div>
      );
      default: return renderHomeScreen();
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col max-w-md mx-auto">
      {renderActiveScreen()}
      {renderBottomNav()}
      
      {/* Modals */}
      {showModal === 'workout' && renderWorkoutModal()}
      
      {/* Exercise Configuration Modal */}
      {showExerciseConfig && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 w-full max-w-md rounded-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="p-4 border-b border-gray-800 flex justify-between items-center">
              <h3 className="text-white text-lg font-medium">Configure Exercise</h3>
              <button onClick={() => setShowExerciseConfig(null)} className="text-gray-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4">
              {/* Exercise Info */}
              <div className="flex items-center mb-6 p-3 bg-gray-800 rounded-xl">
                <span className="text-2xl mr-3">{showExerciseConfig.icon}</span>
                <div>
                  <div className="text-white font-medium">{showExerciseConfig.name}</div>
                  <div className="text-gray-400 text-sm">{showExerciseConfig.target}</div>
                </div>
              </div>

              {/* Configuration Form */}
              <div className="space-y-4">
                {/* Sets and Reps */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-300 text-sm mb-2">Sets</label>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={exerciseConfig.sets}
                      onChange={(e) => setExerciseConfig(prev => ({ ...prev, sets: parseInt(e.target.value) || 1 }))}
                      className="w-full bg-gray-800 text-white p-3 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 text-sm mb-2">Reps</label>
                    <input
                      type="number"
                      min="1"
                      max="50"
                      value={exerciseConfig.reps}
                      onChange={(e) => setExerciseConfig(prev => ({ ...prev, reps: parseInt(e.target.value) || 1 }))}
                      className="w-full bg-gray-800 text-white p-3 rounded-lg"
                    />
                  </div>
                </div>

                {/* Weight (if applicable) */}
                {showExerciseConfig.isWeighted && (
                  <div>
                    <label className="block text-gray-300 text-sm mb-2">Weight (kg)</label>
                    <input
                      type="number"
                      min="0"
                      step="0.5"
                      value={exerciseConfig.weight}
                      onChange={(e) => setExerciseConfig(prev => ({ ...prev, weight: parseFloat(e.target.value) || 0 }))}
                      className="w-full bg-gray-800 text-white p-3 rounded-lg"
                    />
                  </div>
                )}

                {/* Rest and RPE */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-300 text-sm mb-2">Rest (sec)</label>
                    <input
                      type="number"
                      min="15"
                      max="300"
                      step="15"
                      value={exerciseConfig.rest}
                      onChange={(e) => setExerciseConfig(prev => ({ ...prev, rest: parseInt(e.target.value) || 60 }))}
                      className="w-full bg-gray-800 text-white p-3 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 text-sm mb-2">RPE Target</label>
                    <select
                      value={exerciseConfig.rpe}
                      onChange={(e) => setExerciseConfig(prev => ({ ...prev, rpe: parseInt(e.target.value) }))}
                      className="w-full bg-gray-800 text-white p-3 rounded-lg"
                    >
                      {[6, 7, 8, 9, 10].map(rpe => (
                        <option key={rpe} value={rpe}>{rpe}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Tempo */}
                <div>
                  <label className="block text-gray-300 text-sm mb-2">Tempo (optional)</label>
                  <input
                    type="text"
                    placeholder="e.g., 3-0-1-1"
                    value={exerciseConfig.tempo}
                    onChange={(e) => setExerciseConfig(prev => ({ ...prev, tempo: e.target.value }))}
                    className="w-full bg-gray-800 text-white p-3 rounded-lg placeholder-gray-400"
                  />
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-gray-300 text-sm mb-2">Notes (optional)</label>
                  <textarea
                    placeholder="Exercise cues, modifications, etc."
                    value={exerciseConfig.notes}
                    onChange={(e) => setExerciseConfig(prev => ({ ...prev, notes: e.target.value }))}
                    className="w-full bg-gray-800 text-white p-3 rounded-lg placeholder-gray-400 h-20 resize-none"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-6">
                <button
                  onClick={confirmAddExercise}
                  style={{backgroundColor: '#C3A869'}}
                  className="flex-1 text-black py-3 rounded-xl font-medium"
                >
                  Add to Workout
                </button>
                <button
                  onClick={() => setShowExerciseConfig(null)}
                  className="flex-1 bg-gray-700 text-white py-3 rounded-xl font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Floating Action Button */}
      {activeTab === 'home' && (
        <button
          onClick={() => setShowModal('workout')}
          style={{backgroundColor: '#C3A869'}}
          className="fixed bottom-24 right-6 text-black w-14 h-14 rounded-full flex items-center justify-center shadow-lg z-40"
        >
          <Plus className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};

export default StyrkurheimApp;