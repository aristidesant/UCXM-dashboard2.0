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
import { useInsightsMetrics } from '../hooks/useFilteredMetrics';

interface InsightCardProps {
  label: string;
  value: string | number;
  unit?: string;
  trend?: number;
  highlight?: boolean;
  isDark: boolean;
  themeColors: any;
}

const InsightCard: React.FC<InsightCardProps> = ({
  label,
  value,
  unit,
  trend,
  highlight,
  isDark,
  themeColors,
}) => {
  const styles = StyleSheet.create({
    card: {
      backgroundColor: isDark ? themeColors.sunkenBase : themeColors.pureSurface,
      borderRadius: borderRadius.lg,
      padding: spacing.md,
      marginBottom: spacing.md,
      marginRight: spacing.sm,
      flex: 1,
      minWidth: '45%',
      borderWidth: 1,
      borderColor: themeColors.whisperBorder,
      borderLeftWidth: highlight ? 4 : 1,
      borderLeftColor: highlight ? colors.light.newtechGreen : themeColors.whisperBorder,
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
      marginBottom: trend !== undefined ? spacing.sm : 0,
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
          {trend > 0 ? '+' : ''}{trend}%
        </Text>
      )}
    </View>
  );
};

export const InsightsMetricsView: React.FC = () => {
  const { effectiveTheme } = useTheme();
  const isDark = effectiveTheme === 'dark';
  const themeColors = isDark ? colors.dark : colors.light;
  const metrics = useInsightsMetrics();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    } as ViewStyle,
    insightsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginHorizontal: -spacing.sm / 2,
    } as ViewStyle,
  });

  return (
    <View style={styles.container}>
      <View style={styles.insightsContainer}>
        {/* Revenue Insights */}
        <InsightCard
          label="Ingresos Potenciales"
          value={`$${(metrics.potentialRevenue / 1000).toFixed(0)}`}
          unit="k"
          highlight
          isDark={isDark}
          themeColors={themeColors}
        />

        <InsightCard
          label="Ingresos por Llamada"
          value={`$${metrics.revenuePerCall}`}
          isDark={isDark}
          themeColors={themeColors}
        />

        <InsightCard
          label="Crecimiento de Ingresos"
          value={metrics.revenueGrowth}
          unit="%"
          isDark={isDark}
          themeColors={themeColors}
        />

        <InsightCard
          label="Oportunidades de Conversión"
          value={metrics.conversionOpportunities}
          isDark={isDark}
          themeColors={themeColors}
        />

        {/* Customer Satisfaction */}
        <InsightCard
          label="Net Promoter Score"
          value={metrics.netPromoterScore}
          isDark={isDark}
          themeColors={themeColors}
        />

        {/* Risk & Efficiency */}
        <InsightCard
          label="Riesgo de Churn"
          value={metrics.churnRisk}
          unit="%"
          isDark={isDark}
          themeColors={themeColors}
        />

        <InsightCard
          label="Productividad del Agente"
          value={metrics.agentProductivity}
          unit="llamadas/h"
          isDark={isDark}
          themeColors={themeColors}
        />

        <InsightCard
          label="Tiempo Promedio de Llamada"
          value={metrics.averageHandlingTime}
          unit="seg"
          isDark={isDark}
          themeColors={themeColors}
        />

        <InsightCard
          label="Costo por Llamada"
          value={`$${metrics.costPerCall}`}
          isDark={isDark}
          themeColors={themeColors}
        />
      </View>
    </View>
  );
};
