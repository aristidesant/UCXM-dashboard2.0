import React from 'react';
import { StyleSheet, View, Text, ViewStyle, TextStyle } from 'react-native';
import { colors, spacing, borderRadius, fontSize } from '../design';
import { useTheme } from '../context/ThemeContext';
import { Card } from './Card';

interface ComplianceWidgetProps {
  violations: number;
}

export const ComplianceWidget: React.FC<ComplianceWidgetProps> = ({
  violations,
}) => {
  const { effectiveTheme } = useTheme();
  const isDark = effectiveTheme === 'dark';
  const themeColors = isDark ? colors.dark : colors.light;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      minWidth: '48%',
      marginBottom: spacing.lg,
    } as ViewStyle,
    card: {
      padding: spacing.lg,
      borderRadius: borderRadius.md,
      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.6)',
      borderWidth: 1,
      borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.8)',
      minHeight: 140,
      justifyContent: 'space-between',
    } as ViewStyle,
    label: {
      fontSize: fontSize.sm,
      fontWeight: '600',
      color: themeColors.mutedSlate,
      marginBottom: spacing.md,
      textTransform: 'uppercase',
      letterSpacing: 0.06,
      lineHeight: 18,
    } as TextStyle,
    value: {
      fontSize: 32,
      fontWeight: '700',
      color: themeColors.inkPrimary,
      lineHeight: 40,
    } as TextStyle,
  });

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Text style={styles.label}>Compliance Violations</Text>
        <Text style={styles.value}>{violations}</Text>
      </Card>
    </View>
  );
};
