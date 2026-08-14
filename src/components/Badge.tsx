// src/components/Badge.tsx
// Newtech Design System - Badge Component

import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { colors, spacing } from '../design';
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
    // DESIGN.md: border-radius: 999px, padding: 2px 8px, font-size: 12px, font-weight: 600, line-height: 18px
    badge: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 2,
      paddingHorizontal: 8,
      borderRadius: 999,
      backgroundColor: statusStyles.backgroundColor,
      gap: 6,
    },
    // DESIGN.md: Dot indicator - pseudo-element 6px de color currentColor antes del label
    dot: {
      width: 6,
      height: 6,
      borderRadius: 3,
      backgroundColor: statusStyles.dotColor,
    },
    text: {
      fontSize: 12,
      fontWeight: '600',
      color: statusStyles.textColor,
      lineHeight: 18,
    },
  });

  return (
    <View style={styles.badge}>
      <View style={styles.dot} />
      <Text style={styles.text}>{label || defaultLabels[status]}</Text>
    </View>
  );
};
