// src/design/typography.ts
// Design tokens defined in design.md specification

import { TextStyle } from 'react-native';

// Complete Typography Scale (matching DESIGN.md specification)
export const typography = {
  // Display Scale
  displayXL: {
    fontSize: 48,
    fontWeight: '700' as const,
    lineHeight: 56,
    letterSpacing: -0.03,
  } as TextStyle,

  // Heading Scale
  h1: {
    fontSize: 32,
    fontWeight: '700' as const,
    lineHeight: 40,
    letterSpacing: -0.02,
  } as TextStyle,
  h2: {
    fontSize: 24,
    fontWeight: '700' as const,
    lineHeight: 32,
    letterSpacing: -0.02,
  } as TextStyle,
  h3: {
    fontSize: 20,
    fontWeight: '700' as const,
    lineHeight: 28,
    letterSpacing: -0.01,
  } as TextStyle,

  // Body Scale
  bodyLg: {
    fontSize: 18,
    fontWeight: '400' as const,
    lineHeight: 28,
    letterSpacing: 0,
  } as TextStyle,
  body: {
    fontSize: 15,
    fontWeight: '400' as const,
    lineHeight: 24,
    letterSpacing: 0,
  } as TextStyle,
  bodySm: {
    fontSize: 14,
    fontWeight: '400' as const,
    lineHeight: 21,
    letterSpacing: 0,
  } as TextStyle,

  // Label/Caption Scale
  label: {
    fontSize: 12,
    fontWeight: '600' as const,
    lineHeight: 16,
    letterSpacing: 0.06,
  } as TextStyle,
  caption: {
    fontSize: 13,
    fontWeight: '400' as const,
    lineHeight: 18,
    letterSpacing: 0,
  } as TextStyle,

  // Legacy styles (for backwards compatibility)
  display: {
    fontSize: 28,
    fontWeight: '700' as const,
    lineHeight: 32,
  } as TextStyle,
  title: {
    fontSize: 20,
    fontWeight: '700' as const,
    lineHeight: 24,
  } as TextStyle,
  heading: {
    fontSize: 17,
    fontWeight: '700' as const,
    lineHeight: 22,
  } as TextStyle,
  micro: {
    fontSize: 11,
    fontWeight: '700' as const,
    lineHeight: 14,
  } as TextStyle,
  subheading: {
    fontSize: 16,
    fontWeight: '600' as const,
    lineHeight: 20,
  } as TextStyle,
};

// Letter Spacing Scale
export const letterSpacing = {
  tight: -0.03,   // Tight (display text)
  snug: -0.02,    // Snug (headings)
  normal: 0,      // Normal (body text)
  wide: 0.06,     // Wide (labels, uppercase)
};

// Font Sizes (for direct reference if needed)
export const fontSize = {
  xs: 11,
  sm: 12,
  base: 14,
  md: 15,
  lg: 16,
  xl: 18,
  '2xl': 20,
  '3xl': 24,
  '4xl': 28,
  '5xl': 32,
  '6xl': 48,
};

// Line Height Scale (multipliers or pixel values)
export const lineHeight = {
  tight: 1.2,     // 120%
  normal: 1.5,    // 150%
  relaxed: 1.75,  // 175%
  loose: 2,       // 200%
};

// Font Weight Scale
export const fontWeight = {
  normal: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
};

// Font Family (SF Pro is iOS native, DM Sans is fallback)
export const fontFamily = '-apple-system, "SF Pro Text", "DM Sans", "Inter", "Helvetica Neue", Arial, sans-serif';
