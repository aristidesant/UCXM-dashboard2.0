// src/components/Card.tsx
// Newtech Design System - Card Component

import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { colors, spacing } from '../design';
import { useTheme } from '../context/ThemeContext';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  variant?: 'default' | 'elevated';
}

export const Card: React.FC<CardProps> = ({ children, style, variant = 'default' }) => {
  const { effectiveTheme } = useTheme();
  const isDark = effectiveTheme === 'dark';
  const themeColors = isDark ? colors.dark : colors.light;

  const styles = StyleSheet.create({
    // DESIGN.md: border-radius: 12px, border: 1px solid rgba(221,226,232,0.7), background: #FFFFFF
    // box-shadow: 0 4px 12px rgba(15,23,42,0.06), padding: 24px
    card: {
      backgroundColor: isDark ? 'rgba(20, 26, 34, 0.85)' : '#FFFFFF',
      borderRadius: 12,
      padding: 24,
      borderWidth: 1,
      borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(221, 226, 232, 0.7)',
      backdropFilter: 'blur(12px)',
      shadowColor: isDark ? 'rgba(0, 0, 0, 0.4)' : 'rgba(15, 23, 42, 0.06)',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 1,
      shadowRadius: 12,
      elevation: variant === 'elevated' ? 8 : 3,
    },
  });

  return <View style={[styles.card, style]}>{children}</View>;
};
