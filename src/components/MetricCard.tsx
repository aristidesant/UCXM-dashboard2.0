// src/components/MetricCard.tsx

import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { colors, typography, spacing } from '../design';
import { Card } from './Card';

interface MetricCardProps {
  label: string;
  value: string | number;
  trend?: number;
  trendLabel?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  trend,
  trendLabel,
}) => {
  const isTrendPositive = trend !== undefined && trend > 0;
  const trendColor = isTrendPositive
    ? colors.light.successGreen
    : colors.light.dangerRed;

  const styles = StyleSheet.create({
    container: {
      marginBottom: spacing.md,
    },
    label: {
      ...typography.caption,
      color: colors.light.mediumGray,
      marginBottom: spacing.sm,
    },
    value: {
      ...typography.heading,
      color: colors.light.darkGray,
      marginBottom: spacing.sm,
    },
    trendContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    trendArrow: {
      ...typography.body,
      color: trendColor,
      marginRight: spacing.xs,
    },
    trendText: {
      ...typography.caption,
      color: trendColor,
    },
  });

  return (
    <Card style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
      {trend !== undefined && (
        <View style={styles.trendContainer}>
          <Text style={styles.trendArrow}>{isTrendPositive ? '↑' : '↓'}</Text>
          <Text style={styles.trendText}>
            {Math.abs(trend).toFixed(1)}% {trendLabel || ''}
          </Text>
        </View>
      )}
    </Card>
  );
};
