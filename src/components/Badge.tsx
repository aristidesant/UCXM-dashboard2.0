// src/components/Badge.tsx
// Newtech Design System - Badge Component

import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { colors, spacing, borderRadius, fontSize, lineHeight } from '../design';
import { useTheme } from '../context/ThemeContext';

interface BadgeProps {
  status: 'active' | 'inactive' | 'completed' | 'failed' | 'paused' | 'success' | 'info' | 'warning' | 'danger';
  label?: string;
}

const defaultLabels: Record<string, string> = {
  active: 'Activa',
  inactive: 'Inactiva',
  completed: 'Completada',
  failed: 'Fallida',
  paused: 'Pausada',
  success: 'Success',
  info: 'Info',
  warning: 'Warning',
  danger: 'Error',
};

const DOT_SIZE = 6;

export const Badge: React.FC<BadgeProps> = ({ status, label }) => {
  const { effectiveTheme } = useTheme();
  const isDark = effectiveTheme === 'dark';
  const themeColors = isDark ? colors.dark : colors.light;

  const getStatusStyles = () => {
    switch (status) {
      case 'active':
      case 'completed':
      case 'success':
        return {
          backgroundColor: themeColors.successBg,
          textColor: themeColors.success,
          dotColor: themeColors.success,
        };
      case 'info':
        return {
          backgroundColor: themeColors.infoBg,
          textColor: themeColors.info,
          dotColor: themeColors.info,
        };
      case 'warning':
      case 'paused':
        return {
          backgroundColor: themeColors.warningBg,
          textColor: themeColors.warning,
          dotColor: themeColors.warning,
        };
      case 'danger':
      case 'failed':
        return {
          backgroundColor: themeColors.dangerBg,
          textColor: themeColors.danger,
          dotColor: themeColors.danger,
        };
      case 'inactive':
      default:
        return {
          backgroundColor: themeColors.sunkenBase,
          textColor: themeColors.mutedSlate,
          dotColor: themeColors.mutedSlate,
        };
    }
  };

  const statusStyles = getStatusStyles();

  const styles = StyleSheet.create({
    badge: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: spacing.xs,
      paddingHorizontal: spacing.sm,
      borderRadius: borderRadius.pill,
      backgroundColor: statusStyles.backgroundColor,
      gap: spacing.xs,
    },
    dot: {
      width: DOT_SIZE,
      height: DOT_SIZE,
      borderRadius: DOT_SIZE / 2,
      backgroundColor: statusStyles.dotColor,
    },
    text: {
      fontSize: fontSize.sm,
      fontWeight: '600',
      color: statusStyles.textColor,
      lineHeight: lineHeight.normal,
    },
  });

  return (
    <View style={styles.badge}>
      <View style={styles.dot} />
      <Text style={styles.text}>{label || defaultLabels[status]}</Text>
    </View>
  );
};
