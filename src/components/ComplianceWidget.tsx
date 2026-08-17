import React from 'react';
import { StyleSheet, View, Text, ViewStyle, TextStyle } from 'react-native';
import { colors, spacing, borderRadius, fontSize } from '../design';
import { useTheme } from '../context/ThemeContext';
import { MetricCard } from './MetricCard';

interface ComplianceWidgetProps {
  violations: number;
  adherenceRate: number;
}

export const ComplianceWidget: React.FC<ComplianceWidgetProps> = ({
  violations,
  adherenceRate,
}) => {
  const { effectiveTheme } = useTheme();
  const isDark = effectiveTheme === 'dark';
  const themeColors = isDark ? colors.dark : colors.light;

  const styles = StyleSheet.create({
    container: {
      marginBottom: spacing.lg,
    } as ViewStyle,
    grid: {
      flexDirection: 'row',
      gap: spacing.md,
      flexWrap: 'wrap',
    } as ViewStyle,
    metricColumn: {
      flex: 1,
      minWidth: '48%',
    } as ViewStyle,
  });

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        <View style={styles.metricColumn}>
          <MetricCard label="Compliance Violations" value={violations.toString()} />
        </View>
        <View style={styles.metricColumn}>
          <MetricCard label="Adherence Rate" value={`${adherenceRate}%`} />
        </View>
      </View>
    </View>
  );
};
