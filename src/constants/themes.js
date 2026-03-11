export const COLORS = {
  // Primary calming palette
  primary: '#6B9BD2',       // Soft blue
  primaryDark: '#4A7BB5',   // Darker blue
  primaryLight: '#A8C8EC',  // Light blue

  // Secondary accent
  secondary: '#8BC4A8',     // Soft green
  secondaryDark: '#5FA380', // Darker green
  secondaryLight: '#B8DCC9',// Light green

  // Funny mode
  funny: '#F4A261',         // Warm orange
  funnyDark: '#E07B39',     // Darker orange
  funnyLight: '#FAC898',    // Light orange

  // Professional mode
  professional: '#5C6BC0',  // Indigo
  professionalDark: '#3F50B5',
  professionalLight: '#9FA8DA',

  // Neutrals
  background: '#F7F9FC',    // Very light grey-blue
  surface: '#FFFFFF',
  surfaceSecondary: '#EEF2F7',
  border: '#D9E2EC',

  // Text
  textPrimary: '#1A2B4A',   // Dark navy
  textSecondary: '#4A6080', // Medium navy
  textMuted: '#8898AA',     // Muted

  // UI states
  success: '#5CB85C',
  error: '#E74C3C',
  warning: '#F39C12',

  // Chat bubble colors
  userBubble: '#6B9BD2',
  aiBubble: '#EEF2F7',
  userBubbleText: '#FFFFFF',
  aiBubbleText: '#1A2B4A',
};

export const FONTS = {
  regular: 'System',
  sizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 22,
    xxl: 28,
    xxxl: 36,
  },
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const RADIUS = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 999,
};

export const SHADOWS = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
};
