import React from 'react';
import { StyleSheet, View, Text, ViewStyle, TextStyle } from 'react-native';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { colors, spacing, borderRadius, fontSize } from '../design';
import { useTheme } from '../context/ThemeContext';
import { Card } from './Card';
import { Badge } from './Badge';

interface MetricData {
  label: string;
  value: string | number;
  unit?: string;
  target: string;
  comparison: number; // percentage change vs yesterday
  status: 'success' | 'warning' | 'danger'; // green, yellow, red
}

interface SystemHealthIndicatorProps {
  metrics: MetricData[];
  overallStatus?: 'success' | 'warning' | 'danger';
}

export const SystemHealthIndicator: React.FC<SystemHealthIndicatorProps> = ({
  metrics,
  overallStatus = 'success',
}) => {
  const { effectiveTheme } = useTheme();
  const isDark = effectiveTheme === 'dark';
  const themeColors = isDark ? colors.dark : colors.light;

  const getStatusColor = (status: 'success' | 'warning' | 'danger') => {
    switch (status) {
      case 'success':
        return themeColors.newtechGreen;
      case 'warning':
        return '#FFA500';
      case 'danger':
        return '#EF4444';
      default:
        return themeColors.newtechGreen;
    }
  };

  const getStatusLabel = (status: 'success' | 'warning' | 'danger') => {
    switch (status) {
      case 'success':
        return 'Excelente';
      case 'warning':
        return 'Alerta';
      case 'danger':
        return 'Crítico';
      default:
        return 'Excelente';
    }
  };

  const getTrendIcon = (comparison: number) => {
    if (comparison > 0) {
      return <TrendingUp size={16} color={themeColors.newtechGreen} />;
    } else if (comparison < 0) {
      return <TrendingDown size={16} color="#EF4444" />;
    }
    return <Minus size={16} color={themeColors.steelSecondary} />;
  };

  const styles = StyleSheet.create({
    container: {
      marginBottom: spacing.lg,
      width: '100%',
    } as ViewStyle,
    card: {
      backgroundColor: themeColors.successBg,
      borderRadius: borderRadius.md,
      padding: spacing.lg,
      borderWidth: 1,
      borderColor: isDark ? 'rgba(27, 181, 74, 0.3)' : 'rgba(27, 181, 74, 0.2)',
      shadowColor: themeColors.newtechGreen,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 12,
      elevation: 4,
    } as ViewStyle,
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: spacing.md,
    } as ViewStyle,
    titleContainer: {
      flex: 1,
    } as ViewStyle,
    title: {
      fontSize: 12,
      fontWeight: '700',
      color: themeColors.newtechGreen,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
      lineHeight: 18,
    } as TextStyle,
    period: {
      fontSize: fontSize.xs,
      fontWeight: '400',
      color: themeColors.steelSecondary,
      marginTop: spacing.xs,
      lineHeight: 14,
    } as TextStyle,
    metricsGrid: {
      gap: spacing.md,
    } as ViewStyle,
    metricCard: {
      backgroundColor: isDark ? 'rgba(0, 0, 0, 0.4)' : 'rgba(0, 0, 0, 0.15)',
      borderRadius: borderRadius.sm,
      padding: spacing.md,
      borderWidth: 1,
      borderColor: isDark ? 'rgba(27, 181, 74, 0.2)' : 'rgba(27, 181, 74, 0.1)',
    } as ViewStyle,
    metricContent: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
    } as ViewStyle,
    metricLeft: {
      flex: 1,
    } as ViewStyle,
    metricLabel: {
      fontSize: fontSize.sm,
      fontWeight: '600',
      color: isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.7)',
      marginBottom: spacing.xs,
      lineHeight: 16,
    } as TextStyle,
    metricValues: {
      flexDirection: 'row',
      alignItems: 'baseline',
      gap: spacing.sm,
    } as ViewStyle,
    metricValue: {
      fontSize: fontSize.lg,
      fontWeight: '700',
      color: themeColors.newtechGreen,
      lineHeight: 26,
    } as TextStyle,
    metricUnit: {
      fontSize: fontSize.xs,
      color: isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.5)',
      lineHeight: 14,
    } as TextStyle,
    metricRight: {
      alignItems: 'flex-end',
      gap: spacing.xs,
    } as ViewStyle,
    target: {
      fontSize: fontSize.xs,
      color: isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.5)',
      lineHeight: 14,
    } as TextStyle,
    comparison: {
      flexDirection: 'column',
      alignItems: 'flex-end',
      gap: spacing.xs / 2,
    } as ViewStyle,
    comparisonLabel: {
      fontSize: fontSize.xs - 1,
      color: isDark ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.4)',
      lineHeight: 12,
    } as TextStyle,
    comparisonRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.xs,
    } as ViewStyle,
    comparisonText: {
      fontSize: fontSize.xs,
      fontWeight: '700',
      lineHeight: 14,
    } as TextStyle,
  });

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Salud del Sistema</Text>
            <Text style={styles.period}>Esta semana</Text>
          </View>
          <Badge status={overallStatus} label={getStatusLabel(overallStatus)} />
        </View>

        <View style={styles.metricsGrid}>
          {metrics.map((metric, index) => (
            <View key={index} style={styles.metricCard}>
              <View style={styles.metricContent}>
                <View style={styles.metricLeft}>
                  <Text style={styles.metricLabel}>{metric.label}</Text>
                  <View style={styles.metricValues}>
                    <Text style={[styles.metricValue, { color: getStatusColor(metric.status) }]}>
                      {metric.value}
                    </Text>
                    {metric.unit && <Text style={styles.metricUnit}>{metric.unit}</Text>}
                  </View>
                </View>

                <View style={styles.metricRight}>
                  <Text style={styles.target}>Meta: {metric.target}</Text>
                  <View style={styles.comparison}>
                    <Text style={styles.comparisonLabel}>vs sem. anterior</Text>
                    <View style={styles.comparisonRow}>
                      {getTrendIcon(metric.comparison)}
                      <Text
                        style={[
                          styles.comparisonText,
                          { color: metric.comparison >= 0 ? themeColors.newtechGreen : '#EF4444' },
                        ]}
                      >
                        {metric.comparison >= 0 ? '+' : ''}{metric.comparison}%
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>
      </Card>
    </View>
  );
};
