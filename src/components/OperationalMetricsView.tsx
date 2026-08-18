import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { colors, spacing, fontSize, borderRadius } from '../design';
import { useTheme } from '../context/ThemeContext';
import { useOperationalMetrics } from '../hooks/useFilteredMetrics';

interface MetricCardProps {
  label: string;
  value: string | number;
  unit?: string;
  trend?: number;
  isDark: boolean;
  themeColors: any;
}

const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  unit,
  trend,
  isDark,
  themeColors,
}) => {
  const styles = StyleSheet.create({
    card: {
      backgroundColor: isDark ? themeColors.sunkenBase : themeColors.pureSurface,
      borderRadius: borderRadius.lg,
      padding: spacing.md,
      marginBottom: spacing.md,
      borderWidth: 1,
      borderColor: themeColors.whisperBorder,
    } as ViewStyle,
    label: {
      fontSize: fontSize.sm,
      color: themeColors.steelSecondary,
      fontWeight: '500',
      marginBottom: spacing.sm,
    } as TextStyle,
    valueContainer: {
      flexDirection: 'row',
      alignItems: 'baseline',
      marginBottom: spacing.sm,
    } as ViewStyle,
    value: {
      fontSize: fontSize.xl,
      fontWeight: '700',
      color: themeColors.inkPrimary,
    } as TextStyle,
    unit: {
      fontSize: fontSize.sm,
      color: themeColors.steelSecondary,
      marginLeft: spacing.xs,
      fontWeight: '400',
    } as TextStyle,
    trend: {
      fontSize: fontSize.xs,
      fontWeight: '600',
    } as TextStyle,
    trendPositive: {
      color: colors.light.newtechGreen,
    } as TextStyle,
    trendNegative: {
      color: '#FF4D4F',
    } as TextStyle,
  });

  return (
    <View style={styles.card}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.valueContainer}>
        <Text style={styles.value}>{value}</Text>
        {unit && <Text style={styles.unit}>{unit}</Text>}
      </View>
      {trend !== undefined && (
        <Text
          style={[
            styles.trend,
            trend > 0 ? styles.trendPositive : styles.trendNegative,
          ]}
        >
          {trend > 0 ? '+' : ''}{trend}% vs ayer
        </Text>
      )}
    </View>
  );
};

export const OperationalMetricsView: React.FC = () => {
  const { effectiveTheme } = useTheme();
  const isDark = effectiveTheme === 'dark';
  const themeColors = isDark ? colors.dark : colors.light;
  const metrics = useOperationalMetrics();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    } as ViewStyle,
  });

  const totalAnsweredPercentage = Math.round(
    (metrics.calls.totalAnswered / metrics.calls.totalOutgoing) * 100
  );

  return (
    <View style={styles.container}>
      {/* Key Metrics */}
      <MetricCard
        label="Total de Llamadas Salientes"
        value={(metrics.calls.totalOutgoing / 1000).toFixed(1)}
        unit="k"
        isDark={isDark}
        themeColors={themeColors}
      />

      <MetricCard
        label="Llamadas Contestadas"
        value={totalAnsweredPercentage}
        unit="%"
        isDark={isDark}
        themeColors={themeColors}
      />

      <MetricCard
        label="Tasa de Escalación"
        value={metrics.management.escalationRate.value}
        unit="%"
        trend={metrics.management.escalationRate.trend}
        isDark={isDark}
        themeColors={themeColors}
      />

      <MetricCard
        label="Tasa de Conversión"
        value={metrics.management.conversionRate.value}
        unit="%"
        trend={metrics.management.conversionRate.trend}
        isDark={isDark}
        themeColors={themeColors}
      />

      <MetricCard
        label="Tasa de Contacto"
        value={metrics.management.contactRate.value}
        unit="%"
        trend={metrics.management.contactRate.trend}
        isDark={isDark}
        themeColors={themeColors}
      />

      <MetricCard
        label="Satisfacción General"
        value={`${metrics.quality.satisfaction.rating}/${metrics.quality.satisfaction.maxRating}`}
        isDark={isDark}
        themeColors={themeColors}
      />

      <MetricCard
        label="Cierre en Primera Llamada"
        value={metrics.management.firstCallResolution.value}
        unit="%"
        trend={metrics.management.firstCallResolution.trend}
        isDark={isDark}
        themeColors={themeColors}
      />
    </View>
  );
};
