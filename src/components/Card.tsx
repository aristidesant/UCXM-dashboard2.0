// src/components/Card.tsx

import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { colors, spacing, borderRadius, shadows } from '../design';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export const Card: React.FC<CardProps> = ({ children, style }) => {
  const styles = StyleSheet.create({
    card: {
      backgroundColor: colors.light.bgPrimary,
      borderRadius: borderRadius.md,
      padding: spacing.md,
      borderWidth: 1,
      borderColor: colors.light.lightGray,
      ...shadows.card,
    },
  });

  return <View style={[styles.card, style]}>{children}</View>;
};
