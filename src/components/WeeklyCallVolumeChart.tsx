import React from 'react';
import { StyleSheet, View, Text, ViewStyle, TextStyle } from 'react-native';
import { colors, spacing, borderRadius, fontSize } from '../design';
import { useTheme } from '../context/ThemeContext';
import { Card } from './Card';
import { formatCallVolume } from '../utils/homeScreenMetrics';

interface WeeklyCallVolumeChartProps {
  data: number[];
  labels?: string[];
}

export const WeeklyCallVolumeChart: React.FC<WeeklyCallVolumeChartProps> = ({
  data,
  labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
}) => {
  const { effectiveTheme } = useTheme();
  const isDark = effectiveTheme === 'dark';
  const themeColors = isDark ? colors.dark : colors.light;

  const maxValue = Math.max(...data);
  const peakIndex = data.indexOf(maxValue);
  const peakLabel = labels[peakIndex];

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
    card: {
      padding: spacing.lg,
      borderRadius: borderRadius.md,
      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.6)',
      borderWidth: 1,
      borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.8)',
    } as ViewStyle,
    chartContainer: {
      height: 200,
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'space-around',
      marginBottom: spacing.lg,
      gap: spacing.sm,
    } as ViewStyle,
    bar: {
      flex: 1,
      backgroundColor: themeColors.primaryBlue,
      borderRadius: borderRadius.sm,
      minHeight: 20,
      justifyContent: 'flex-end',
      alignItems: 'center',
    } as ViewStyle,
    barActive: {
      backgroundColor: themeColors.newtechGreen,
    } as ViewStyle,
    barLabel: {
      fontSize: fontSize.xs,
      fontWeight: '600',
      color: themeColors.steelSecondary,
      marginTop: spacing.sm,
      lineHeight: 16,
    } as TextStyle,
    peakInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.sm,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
      backgroundColor: isDark ? 'rgba(27, 181, 74, 0.15)' : 'rgba(27, 181, 74, 0.1)',
      borderRadius: borderRadius.md,
    } as ViewStyle,
    peakLabel: {
      fontSize: fontSize.sm,
      fontWeight: '600',
      color: themeColors.steelSecondary,
      lineHeight: 18,
    } as TextStyle,
    peakValue: {
      fontSize: fontSize.sm,
      fontWeight: '700',
      color: themeColors.newtechGreen,
      lineHeight: 18,
    } as TextStyle,
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weekly Call Volume</Text>
      <Card style={styles.card}>
        <View style={styles.chartContainer}>
          {data.map((value, index) => (
            <View key={index} style={{ flex: 1 }}>
              <View
                style={[
                  styles.bar,
                  index === peakIndex && styles.barActive,
                  { height: Math.max((value / maxValue) * 160, 20) },
                ]}
              />
              <Text style={styles.barLabel}>{labels[index]}</Text>
            </View>
          ))}
        </View>

        <View style={styles.peakInfo}>
          <Text style={styles.peakLabel}>Peak:</Text>
          <Text style={styles.peakValue}>
            {peakLabel} ({formatCallVolume(maxValue)})
          </Text>
        </View>
      </Card>
    </View>
  );
};
