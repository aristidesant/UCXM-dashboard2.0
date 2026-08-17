import React from 'react';
import { StyleSheet, View, Text, ViewStyle, TextStyle } from 'react-native';
import { colors, spacing, borderRadius } from '../design';
import { useTheme } from '../context/ThemeContext';
import { AnimatedKPICard } from './AnimatedKPICard';

interface SystemHealthIndicatorProps {
  level: string;
  score: number;
  variant: 'success' | 'warning' | 'danger';
}

export const SystemHealthIndicator: React.FC<SystemHealthIndicatorProps> = ({
  level,
  score,
  variant,
}) => {
  const { effectiveTheme } = useTheme();
  const isDark = effectiveTheme === 'dark';
  const themeColors = isDark ? colors.dark : colors.light;

  const styles = StyleSheet.create({
    container: {
      marginBottom: spacing.lg,
    } as ViewStyle,
    title: {
      fontSize: 12,
      fontWeight: '600',
      color: themeColors.steelSecondary,
      marginBottom: spacing.md,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
      lineHeight: 18,
    } as TextStyle,
    cardWrapper: {
      flexDirection: 'row',
    } as ViewStyle,
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>System Health</Text>
      <View style={styles.cardWrapper}>
        <AnimatedKPICard
          label={level}
          value={score}
          suffix="%"
          variant={variant}
          isNumeric={true}
        />
      </View>
    </View>
  );
};
