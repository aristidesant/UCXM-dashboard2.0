import React from 'react';
import { StyleSheet, View, Text, ViewStyle, TextStyle } from 'react-native';
import { colors, spacing, borderRadius } from '../design';
import { useTheme } from '../context/ThemeContext';
import { Card } from './Card';
import { Badge } from './Badge';

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

  const variantColors = {
    success: themeColors.successBg,
    warning: themeColors.warningBg,
    danger: themeColors.dangerBg,
  };

  const variantAccents = {
    success: themeColors.newtechGreen,
    warning: themeColors.warning,
    danger: themeColors.danger,
  };

  const badgeStatusMap = {
    success: 'success' as const,
    warning: 'warning' as const,
    danger: 'danger' as const,
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      minWidth: '48%',
      marginBottom: spacing.lg,
    } as ViewStyle,
    card: {
      backgroundColor: variantColors[variant],
      borderRadius: borderRadius.md,
      padding: spacing.lg,
      minHeight: 140,
      justifyContent: 'space-between',
      borderWidth: 1,
      borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.5)',
      shadowColor: variantAccents[variant],
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 12,
      elevation: 4,
    } as ViewStyle,
    title: {
      fontSize: 12,
      fontWeight: '600',
      color: themeColors.mutedSlate,
      marginBottom: spacing.md,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
      lineHeight: 18,
    } as TextStyle,
  });

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Text style={styles.title}>System Health</Text>
        <Badge status={badgeStatusMap[variant]} label={level} />
      </Card>
    </View>
  );
};
