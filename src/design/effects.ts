// src/design/effects.ts
// Design tokens defined in design.md specification

// Border Radius Scale (synced with DESIGN.md)
export const borderRadius = {
  sm: 6,       // Small: buttons, inputs
  md: 8,       // Medium: cards, containers
  lg: 12,      // Large: modals, sheets
  pill: 999,   // Pill: fully rounded
};

// Opacity/Alpha Scale (for transparency effects)
export const opacity = {
  xs: 0.05,    // Very subtle background
  sm: 0.1,     // Subtle background
  md: 0.15,    // Medium background
  lg: 0.2,     // Standard overlay
  xl: 0.25,    // Strong overlay
  '2xl': 0.3,  // Very strong overlay
  half: 0.5,   // Semi-transparent
  '3xl': 0.6,  // High opacity
  '4xl': 0.75, // Very high opacity
  '5xl': 0.85, // Almost opaque
  '6xl': 0.9,  // Nearly opaque
};

// Shadow Scale (React Native elevation system)
export const shadows = {
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 2,
  },
  cardLayer2: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 24,
    elevation: 4,
  },
  sheet: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 6,
  },
};

// Animation/Duration Scale (milliseconds)
export const animation = {
  fast: 120,      // Micro-interactions
  base: 220,      // Standard transitions
  slow: 380,      // Emphasis animations
};

// Animation Easing (CSS cubic-bezier equivalents)
export const easing = {
  standard: 'cubic-bezier(0.22, 1, 0.36, 1)',      // Spring physics
  smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',          // Standard easing
  easeOut: 'cubic-bezier(0, 0, 0.2, 1)',           // Decelerate
};

// Z-Index Scale (for layering)
export const zIndex = {
  hide: -1,      // Hidden elements
  base: 0,       // Default stacking
  sticky: 10,    // Sticky headers/footers
  fixed: 20,     // Fixed position elements
  overlay: 30,   // Overlay backgrounds
  modal: 40,     // Modal dialogs
  tooltip: 50,   // Tooltips and popovers
  notification: 60, // Toast notifications
};

// Icon Size Scale (pixels)
export const iconSize = {
  xs: 14,        // Extra small icons
  sm: 16,        // Small icons (badges, small buttons)
  base: 18,      // Base/default size
  md: 20,        // Medium icons (navigation)
  lg: 24,        // Large icons (primary actions)
};

// Component Dimension Scale (pixels)
export const componentSize = {
  input: 40,     // Input field height
  button: 44,    // Standard button height
  avatar: 44,    // Avatar size
  iconButton: 56, // Icon-only button size
  tabBar: 60,    // Tab bar height
};

// Border Color Variants (used with opacity scale)
export const borderColor = {
  default: 'rgba(0, 0, 0, 0.1)',     // Default border
  strong: 'rgba(0, 0, 0, 0.2)',      // Strong border
  focus: 'rgba(27, 181, 74, 0.5)',   // Focus state (green brand)
};

// Focus Ring Token
export const focusRing = {
  width: 2,
  color: 'rgba(27, 181, 74, 0.5)',   // Green brand with opacity
  offset: 2,
};
