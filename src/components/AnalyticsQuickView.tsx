import React from 'react';
import { StyleSheet, View, Text, ViewStyle, TextStyle } from 'react-native';
import { colors, spacing, borderRadius, fontSize } from '../design';
import { useTheme } from '../context/ThemeContext';
import { Card } from './Card';

interface QuickMetric {
  title: string;
  value: string;
  description?: string;
}

interface AnalyticsQuickViewProps {
  qa: QuickMetric;
  compliance: QuickMetric;
  business: QuickMetric;
  emotion: QuickMetric;
}

export const AnalyticsQuickView: React.FC<AnalyticsQuickViewProps> = ({
  qa,
  compliance,
  business,
  emotion,
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
    grid: {
      flexDirection: 'row',
      gap: spacing.md,
      flexWrap: 'wrap',
    } as ViewStyle,
    metricCard: {
      flex: 1,
      minWidth: '48%',
      padding: spacing.md,
      borderRadius: borderRadius.md,
      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.6)',
      borderWidth: 1,
      borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.8)',
    } as ViewStyle,
    metricTitle: {
      fontSize: fontSize.xs,
      fontWeight: '600',
      color: themeColors.steelSecondary,
      marginBottom: spacing.xs,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
      lineHeight: 16,
    } as TextStyle,
    metricValue: {
      fontSize: fontSize.lg,
      fontWeight: '700',
      color: themeColors.inkPrimary,
      marginBottom: spacing.xs,
      lineHeight: 24,
    } as TextStyle,
    metricDescription: {
      fontSize: fontSize.xs,
      fontWeight: '400',
      color: themeColors.steelSecondary,
      lineHeight: 16,
    } as TextStyle,
  });

  const QuickMetricItem = ({ metric }: { metric: QuickMetric }) => (
    <Card style={styles.metricCard}>
      <Text style={styles.metricTitle}>{metric.title}</Text>
      <Text style={styles.metricValue}>{metric.value}</Text>
      {metric.description && <Text style={styles.metricDescription}>{metric.description}</Text>}
    </Card>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Resumen de Análisis</Text>
      <View style={styles.grid}>
        <QuickMetricItem metric={qa} />
        <QuickMetricItem metric={compliance} />
        <QuickMetricItem metric={business} />
        <QuickMetricItem metric={emotion} />
      </View>
    </View>
  );
};
