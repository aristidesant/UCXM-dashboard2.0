import React from 'react';
import { StyleSheet, View, Text, ViewStyle, TextStyle, ScrollView } from 'react-native';
import { TrendingUp, Users, DollarSign, Zap } from 'lucide-react';
import { colors, spacing, borderRadius, fontSize } from '../design';
import { useTheme } from '../context/ThemeContext';
import { Card, MetricCard, Chart } from './index';
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
    scrollContent: {
      paddingHorizontal: 0,
      paddingTop: spacing.md,
      paddingBottom: spacing.lg,
    } as ViewStyle,
    section: {
      marginBottom: spacing.lg,
      paddingHorizontal: spacing.lg,
    } as ViewStyle,
    sectionTitle: {
      fontSize: fontSize.lg,
      fontWeight: '600',
      color: themeColors.inkPrimary,
      marginBottom: spacing.md,
      lineHeight: 24,
    } as TextStyle,
    metricsGrid: {
      flexDirection: 'row',
      gap: spacing.md,
      marginBottom: spacing.md,
      flexWrap: 'wrap',
    } as ViewStyle,
    metricColumn: {
      flex: 1,
      minWidth: 150,
    } as ViewStyle,
    fullWidth: {
      width: '100%',
    } as ViewStyle,
    insightCard: {
      backgroundColor: isDark ? themeColors.canvasDark : themeColors.canvasLight,
      borderRadius: borderRadius.lg,
      padding: spacing.lg,
      marginBottom: spacing.md,
      borderWidth: 1,
      borderColor: isDark ? themeColors.whisperBorder : themeColors.lightGray,
      flexDirection: 'row',
      alignItems: 'center',
    } as ViewStyle,
    iconContainer: {
      width: 48,
      height: 48,
      borderRadius: borderRadius.md,
      backgroundColor: isDark ? `rgba(255, 255, 255, 0.05)` : `rgba(0, 0, 0, 0.02)`,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: spacing.md,
    } as ViewStyle,
    insightContent: {
      flex: 1,
    } as ViewStyle,
    insightLabel: {
      fontSize: fontSize.sm,
      fontWeight: '500',
      color: themeColors.steelSecondary,
      marginBottom: spacing.xs,
    } as TextStyle,
    insightValue: {
      fontSize: fontSize.xl,
      fontWeight: '700',
      color: themeColors.inkPrimary,
    } as TextStyle,
    insightSubvalue: {
      fontSize: fontSize.xs,
      color: themeColors.steelSecondary,
      marginTop: spacing.xs,
    } as TextStyle,
    trendBadge: {
      paddingHorizontal: spacing.sm,
      paddingVertical: spacing.xs,
      borderRadius: borderRadius.sm,
      backgroundColor: themeColors.newtechGreen,
      marginLeft: spacing.md,
    } as ViewStyle,
    trendText: {
      fontSize: fontSize.xs,
      fontWeight: '700',
      color: '#FFFFFF',
    } as TextStyle,
    chartContainer: {
      backgroundColor: isDark ? themeColors.canvasDark : themeColors.canvasLight,
      borderRadius: borderRadius.lg,
      padding: spacing.lg,
      marginBottom: spacing.md,
      borderWidth: 1,
      borderColor: isDark ? themeColors.whisperBorder : themeColors.lightGray,
      minHeight: 250,
    } as ViewStyle,
    chartTitle: {
      fontSize: fontSize.sm,
      fontWeight: '600',
      color: themeColors.steelSecondary,
      marginBottom: spacing.md,
    } as TextStyle,
  });

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {/* Revenue Metrics */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Métricas de Ingresos</Text>
        <View style={styles.metricsGrid}>
          <View style={styles.metricColumn}>
            <MetricCard
              label="Ingresos Potenciales"
              value={`$${(metrics.potentialRevenue / 1000).toFixed(0)}k`}
            />
          </View>
          <View style={styles.metricColumn}>
            <MetricCard
              label="Ingreso por Llamada"
              value={`$${metrics.revenuePerCall}`}
            />
          </View>
        </View>
        <View style={styles.metricsGrid}>
          <View style={styles.metricColumn}>
            <MetricCard
              label="Oportunidades de Conversión"
              value={metrics.conversionOpportunities.toString()}
            />
          </View>
          <View style={styles.metricColumn}>
            <MetricCard
              label="Crecimiento de Ingresos"
              value={`${metrics.revenueGrowth}%`}
              trend={metrics.revenueGrowth > 0 ? metrics.revenueGrowth : -Math.abs(metrics.revenueGrowth)}
              trendLabel="vs semana anterior"
            />
          </View>
        </View>
      </View>

      {/* Customer Metrics */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Métricas de Clientes</Text>
        <View style={styles.metricsGrid}>
          <View style={styles.metricColumn}>
            <MetricCard
              label="Satisfacción del Cliente"
              value={`${metrics.customerSatisfactionScore}%`}
            />
          </View>
          <View style={styles.metricColumn}>
            <MetricCard
              label="NPS (Net Promoter Score)"
              value={metrics.netPromoterScore.toString()}
            />
          </View>
        </View>
        <View style={styles.metricsGrid}>
          <View style={styles.metricColumn}>
            <MetricCard
              label="Riesgo de Pérdida"
              value={`${metrics.churnRisk}%`}
            />
          </View>
        </View>
      </View>

      {/* Efficiency Metrics */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Métricas de Eficiencia</Text>
        <View style={styles.insightCard}>
          <View style={styles.iconContainer}>
            <Zap size={24} color={themeColors.newtechGreen} />
          </View>
          <View style={styles.insightContent}>
            <Text style={styles.insightLabel}>Productividad del Agente</Text>
            <Text style={styles.insightValue}>{metrics.agentProductivity}</Text>
            <Text style={styles.insightSubvalue}>llamadas por hora</Text>
          </View>
        </View>

        <View style={styles.insightCard}>
          <View style={styles.iconContainer}>
            <TrendingUp size={24} color="#FFB800" />
          </View>
          <View style={styles.insightContent}>
            <Text style={styles.insightLabel}>Tiempo Promedio de Manejo</Text>
            <Text style={styles.insightValue}>{Math.floor(metrics.averageHandlingTime / 60)}:{String(metrics.averageHandlingTime % 60).padStart(2, '0')}</Text>
            <Text style={styles.insightSubvalue}>minutos</Text>
          </View>
        </View>

        <View style={styles.insightCard}>
          <View style={styles.iconContainer}>
            <DollarSign size={24} color="#FF6B6B" />
          </View>
          <View style={styles.insightContent}>
            <Text style={styles.insightLabel}>Costo por Llamada</Text>
            <Text style={styles.insightValue}>${metrics.costPerCall}</Text>
            <Text style={styles.insightSubvalue}>costo operacional</Text>
          </View>
        </View>
      </View>

      {/* Trend Charts */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Tendencias</Text>

        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Satisfacción del Cliente (7 días)</Text>
          <Chart data={metrics.satisfactionTrend} height={180} />
        </View>

        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Productividad del Agente (7 días)</Text>
          <Chart data={metrics.productivityTrend} height={180} />
        </View>
      </View>
    </ScrollView>
  );
};

export default BusinessInsightsPanel;
