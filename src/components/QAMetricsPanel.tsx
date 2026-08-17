import React from 'react';
import { StyleSheet, View, Text, ViewStyle, TextStyle, ScrollView } from 'react-native';
import { colors, spacing, borderRadius, fontSize } from '../design';
import { useTheme } from '../context/ThemeContext';
import { Card, MetricCard } from './index';
import type { QAMetrics } from '../data/mockMetrics';

interface QAMetricsPanelProps {
  metrics: QAMetrics;
}

export const QAMetricsPanel: React.FC<QAMetricsPanelProps> = ({ metrics }) => {
  const { effectiveTheme } = useTheme();
  const isDark = effectiveTheme === 'dark';
  const themeColors = isDark ? colors.dark : colors.light;

  const getStatusColor = (status: 'ok' | 'warning' | 'critical') => {
    switch (status) {
      case 'ok':
        return themeColors.newtechGreen;
      case 'warning':
        return '#FFB800';
      case 'critical':
        return '#FF6B6B';
    }
  };

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
    distributionGrid: {
      flexDirection: 'row',
      gap: spacing.md,
    } as ViewStyle,
    distributionItem: {
      flex: 1,
    } as ViewStyle,
    distributionLabel: {
      fontSize: fontSize.sm,
      fontWeight: '500',
      color: themeColors.steelSecondary,
      marginBottom: spacing.sm,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    } as TextStyle,
    distributionValue: {
      fontSize: fontSize.xl,
      fontWeight: '700',
      color: themeColors.inkPrimary,
    } as TextStyle,
    metricsGrid: {
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
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {/* Analysis Distribution - Simple Formula Display */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Distribución de Análisis</Text>
        <View style={styles.distributionGrid}>
          <View style={styles.distributionItem}>
            <Text style={styles.distributionLabel}>Contactos Efectivos</Text>
            <Text style={styles.distributionValue}>{metrics.effectivePercentage}%</Text>
          </View>
          <View style={styles.distributionItem}>
            <Text style={styles.distributionLabel}>Contactos No Efectivos</Text>
            <Text style={styles.distributionValue}>{100 - metrics.effectivePercentage}%</Text>
          </View>
        </View>
      </View>

      {/* Error Metrics - 2-Column Grid with Metric Cards */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Métricas de Errores</Text>
        <View style={styles.metricsGrid}>
          {[metrics.ecn, metrics.enc, metrics.ecc, metrics.ecuf].filter(Boolean).map((error) => (
            <View key={error.name} style={styles.metricColumn}>
              <MetricCard
                label={error.name}
                value={`${error.value}%`}
                trend={error.status === 'ok' ? 1 : error.status === 'warning' ? 0 : -1}
                trendLabel={`Umbral: ${error.threshold}% - ${error.status === 'ok' ? '✓ OK' : '⚠ Revisar'}`}
              />
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default QAMetricsPanel;
