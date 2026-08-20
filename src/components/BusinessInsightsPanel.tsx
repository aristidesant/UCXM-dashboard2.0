import React from 'react';
import { StyleSheet, View, Text, ViewStyle, TextStyle } from 'react-native';
import { colors, spacing, borderRadius, fontSize } from '../design';
import { useTheme } from '../context/ThemeContext';
import type { BusinessInsightsMetrics } from '../data/mockMetrics';

interface BusinessInsightsPanelProps {
  metrics: BusinessInsightsMetrics;
}

export const BusinessInsightsPanel: React.FC<BusinessInsightsPanelProps> = ({ metrics }) => {
  const { effectiveTheme } = useTheme();
  const isDark = effectiveTheme === 'dark';
  const themeColors = isDark ? colors.dark : colors.light;

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

  interface InsightCardProps {
    label: string;
    value: string | number;
    unit?: string;
    trend?: number;
    highlight?: boolean;
  }

  const InsightCard: React.FC<InsightCardProps> = ({
    label,
    value,
    unit,
    trend,
    highlight,
  }) => {
    const cardStyles = StyleSheet.create({
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
      <View style={cardStyles.card}>
        <Text style={cardStyles.label}>{label}</Text>
        <View style={cardStyles.valueContainer}>
          <Text style={cardStyles.value}>{value}</Text>
          {unit && <Text style={cardStyles.unit}>{unit}</Text>}
        </View>
        {trend !== undefined && (
          <Text
            style={[
              cardStyles.trend,
              trend > 0 ? cardStyles.trendPositive : cardStyles.trendNegative,
            ]}
          >
            {trend > 0 ? '+' : ''}{trend}%
          </Text>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.insightsContainer}>
        {/* Revenue Insights */}
        <InsightCard
          label="Crecimiento de Ingresos"
          value={metrics.revenueGrowth}
          unit="%"
        />

        <InsightCard
          label="Oportunidades de Conversión"
          value={metrics.conversionOpportunities}
        />

        {/* Risk & Efficiency */}
        <InsightCard
          label="Productividad del Agente"
          value={metrics.agentProductivity}
          unit="llamadas/h"
        />

      </View>
    </View>
  );
};

export default BusinessInsightsPanel;
