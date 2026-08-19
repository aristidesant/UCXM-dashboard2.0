import React from 'react';
import { StyleSheet, View, Text, ViewStyle, TextStyle } from 'react-native';
import { colors, spacing, borderRadius, fontSize } from '../design';
import { useTheme } from '../context/ThemeContext';
import { usePlatform } from '../hooks/usePlatform';
import { Card } from './Card';
import { formatCallVolume } from '../utils/homeScreenMetrics';

interface WeeklyCallVolumeChartProps {
  incoming?: number[];
  outgoing?: number[];
  data?: number[];
  labels?: string[];
}

export const WeeklyCallVolumeChart: React.FC<WeeklyCallVolumeChartProps> = ({
  incoming = [5200, 9400, 13100, 8300, 11900, 2100, 1200],
  outgoing = [3000, 6000, 9000, 6000, 7000, 1300, 900],
  labels = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
}) => {
  const { effectiveTheme } = useTheme();
  const { isMobile } = usePlatform();
  const isDark = effectiveTheme === 'dark';
  const themeColors = isDark ? colors.dark : colors.light;

  const allData = [...incoming, ...outgoing];
  const maxValue = Math.max(...allData);
  const peakIncoming = Math.max(...incoming);
  const peakOutgoing = Math.max(...outgoing);
  const peakIncomingIndex = incoming.indexOf(peakIncoming);
  const peakLabel = labels[peakIncomingIndex];

  // Generate Y-axis labels
  const yAxisSteps = 4;
  const yAxisLabels = Array.from({ length: yAxisSteps + 1 }, (_, i) => {
    const value = Math.round((maxValue / yAxisSteps) * i);
    return formatCallVolume(value);
  }).reverse();

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
    chartWrapper: {
      flexDirection: 'row',
      marginBottom: spacing.lg,
      gap: spacing.sm,
    } as ViewStyle,
    yAxis: {
      width: 50,
      height: 120,
      justifyContent: 'space-between',
      paddingRight: spacing.sm,
    } as ViewStyle,
    yAxisLabel: {
      fontSize: fontSize.xs,
      fontWeight: '400',
      color: themeColors.steelSecondary,
      textAlign: 'right',
      lineHeight: 14,
    } as TextStyle,
    chartContainer: {
      flex: 1,
      height: 120,
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'space-around',
      gap: isMobile ? spacing.xs : spacing.sm,
      paddingBottom: spacing.xs,
    } as ViewStyle,
    bar: {
      width: isMobile ? '12%' : '20%',
      backgroundColor: themeColors.primaryBlue,
      borderRadius: borderRadius.sm,
      minHeight: 20,
      justifyContent: 'flex-end',
      alignItems: 'center',
    } as ViewStyle,
    barIncoming: {
      backgroundColor: colors.light.newtechGreen,
    } as ViewStyle,
    barOutgoing: {
      backgroundColor: '#3B82F6',
    } as ViewStyle,
    barLabel: {
      fontSize: fontSize.xs,
      fontWeight: '600',
      color: themeColors.steelSecondary,
      marginTop: spacing.sm,
      lineHeight: 16,
    } as TextStyle,
    legend: {
      flexDirection: 'row',
      gap: spacing.md,
      marginBottom: spacing.md,
      justifyContent: 'center',
    } as ViewStyle,
    legendItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.sm,
    } as ViewStyle,
    legendColor: {
      width: 12,
      height: 12,
      borderRadius: 2,
    } as ViewStyle,
    legendLabel: {
      fontSize: fontSize.sm,
      fontWeight: '500',
      color: themeColors.steelSecondary,
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
      <Text style={styles.title}>Volumen de Llamadas Semanal</Text>
      <Card style={styles.card}>
        {/* Legend */}
        <View style={styles.legend}>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, styles.barIncoming]} />
            <Text style={styles.legendLabel}>Entrantes</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, styles.barOutgoing]} />
            <Text style={styles.legendLabel}>Salientes</Text>
          </View>
        </View>

        <View style={styles.chartWrapper}>
          {/* Y-Axis Labels */}
          <View style={styles.yAxis}>
            {yAxisLabels.map((label, index) => (
              <Text key={index} style={styles.yAxisLabel}>
                {label}
              </Text>
            ))}
          </View>

          {/* Chart Bars */}
          <View style={styles.chartContainer}>
            {labels.map((label, index) => (
              <View key={index} style={{ flex: 1, alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: spacing.xs, height: 90 }}>
                  <View style={[styles.bar, styles.barIncoming, { width: isMobile ? '45%' : '48%', height: Math.max((incoming[index] / maxValue) * 90, 15) }]} />
                  <View style={[styles.bar, styles.barOutgoing, { width: isMobile ? '45%' : '48%', height: Math.max((outgoing[index] / maxValue) * 90, 15) }]} />
                </View>
                <Text style={styles.barLabel}>{label}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.peakInfo}>
          <Text style={styles.peakLabel}>Pico (Entrantes):</Text>
          <Text style={styles.peakValue}>
            {peakLabel} ({formatCallVolume(peakIncoming)})
          </Text>
        </View>
      </Card>
    </View>
  );
};
