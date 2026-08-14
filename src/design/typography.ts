// src/design/typography.ts
// Design tokens defined in design.md specification

import { TextStyle } from 'react-native';

export const typography = {
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
  body: {
    fontSize: 15,
    fontWeight: '400' as const,
    lineHeight: 21,
  } as TextStyle,
  label: {
    fontSize: 15,
    fontWeight: '600' as const,
    lineHeight: 18,
  } as TextStyle,
  caption: {
    fontSize: 13,
    fontWeight: '400' as const,
    lineHeight: 18,
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

export const fontFamily = '-apple-system, "SF Pro Text", "Inter", "Helvetica Neue", Arial, sans-serif';
