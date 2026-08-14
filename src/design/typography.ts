// src/design/typography.ts

import { TextStyle } from 'react-native';

export const typography = {
  display: {
    fontSize: 32,
    fontWeight: '700' as const,
  } as TextStyle,
  heading: {
    fontSize: 24,
    fontWeight: '700' as const,
  } as TextStyle,
  subheading: {
    fontSize: 18,
    fontWeight: '600' as const,
  } as TextStyle,
  body: {
    fontSize: 16,
    fontWeight: '400' as const,
  } as TextStyle,
  label: {
    fontSize: 14,
    fontWeight: '600' as const,
  } as TextStyle,
  caption: {
    fontSize: 12,
    fontWeight: '400' as const,
  } as TextStyle,
};

export const fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
