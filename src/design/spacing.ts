// src/design/spacing.ts
// Design tokens defined in design.md specification
// Base unit: 4px (follows iOS Human Interface Guidelines)

export const spacing = {
  xs: 4,      // Extra small: --space-1
  sm: 8,      // Small: --space-2
  md: 12,     // Medium: --space-3
  lg: 16,     // Large: --space-4
  xl: 20,     // Extra large: --space-5
  xxl: 24,    // 2XL: --space-6
  xxxl: 32,   // 3XL: --space-8
  '4xl': 40,  // 4XL: Large section spacing
  '5xl': 48,  // 5XL: Extra large section spacing
};

// Padding presets for common components
export const paddingPresets = {
  compact: { horizontal: spacing.sm, vertical: spacing.xs },      // Tight spacing
  normal: { horizontal: spacing.md, vertical: spacing.sm },       // Standard spacing
  spacious: { horizontal: spacing.lg, vertical: spacing.md },     // Generous spacing
};

// Gap presets for flex layouts
export const gapPresets = {
  tight: spacing.xs,      // 4px - icon to label
  compact: spacing.sm,    // 8px - flex items
  normal: spacing.md,     // 12px - standard gap
  loose: spacing.lg,      // 16px - section content
};
