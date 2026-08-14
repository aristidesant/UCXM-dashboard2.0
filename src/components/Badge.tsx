// src/components/Badge.tsx

import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { colors, typography, spacing, borderRadius } from '../design';

interface BadgeProps {
  status: 'active' | 'inactive' | 'completed' | 'failed' | 'paused';
}

const statusColors: Record<BadgeProps['status'], string> = {
  active: colors.light.successGreen,
  inactive: colors.light.mediumGray,
  completed: colors.light.successGreen,
  failed: colors.light.dangerRed,
  paused: colors.light.warningOrange,
};

const statusLabels: Record<BadgeProps['status'], string> = {
  active: 'Activa',
  inactive: 'Inactiva',
  completed: 'Completada',
  failed: 'Fallida',
  paused: 'Pausada',
};

export const Badge: React.FC<BadgeProps> = ({ status }) => {
  const styles = StyleSheet.create({
    badge: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: spacing.xs,
      paddingHorizontal: spacing.sm,
      borderRadius: borderRadius.sm,
      backgroundColor: statusColors[status],
      opacity: 0.2,
    },
    dot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: statusColors[status],
      marginRight: spacing.xs,
    },
    text: {
      ...typography.caption,
      color: statusColors[status],
    },
  });

  return (
    <View style={styles.badge}>
      <View style={styles.dot} />
      <Text style={styles.text}>{statusLabels[status]}</Text>
    </View>
  );
};
