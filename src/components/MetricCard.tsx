// src/components/MetricCard.tsx

import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { colors, typography, spacing } from '../design';
import { Card } from './Card';
import { useTheme } from '../context/ThemeContext';

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
  const { effectiveTheme } = useTheme();
  const isDark = effectiveTheme === 'dark';
  const themeColors = isDark ? colors.dark : colors.light;

  const isTrendPositive = trend !== undefined && trend > 0;
  const trendColor = isTrendPositive
    ? themeColors.success
    : themeColors.danger;

  const styles = StyleSheet.create({
    container: {
      marginBottom: spacing.md,
      borderRadius: 12,
      padding: spacing.md,
      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.6)',
      borderWidth: 1,
      borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.8)',
      backdropFilter: 'blur(10px)',
      shadowColor: themeColors.diffusedShadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 8,
      elevation: 2,
    },
    label: {
      fontSize: 12,
      fontWeight: '600',
      color: themeColors.mutedSlate,
      marginBottom: spacing.sm,
      lineHeight: 18,
      textTransform: 'uppercase',
      letterSpacing: 0.06,
    },
    value: {
      fontSize: 20,
      fontWeight: '700',
      color: themeColors.inkPrimary,
      marginBottom: spacing.sm,
      lineHeight: 26,
    },
    trendContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    trendArrow: {
      fontSize: 15,
      fontWeight: '700',
      color: trendColor,
      marginRight: spacing.xs,
      lineHeight: 22,
    },
    trendText: {
      fontSize: 12,
      fontWeight: '400',
      color: trendColor,
      lineHeight: 18,
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
