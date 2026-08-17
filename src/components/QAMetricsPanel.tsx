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
    errorCard: {
      backgroundColor: isDark ? themeColors.canvasDark : themeColors.canvasLight,
      borderRadius: borderRadius.lg,
      padding: spacing.lg,
      marginBottom: spacing.md,
      borderLeftWidth: 4,
    } as ViewStyle,
    errorName: {
      fontSize: fontSize.sm,
      fontWeight: '500',
      color: themeColors.steelSecondary,
      marginBottom: spacing.xs,
    } as TextStyle,
    errorValue: {
      fontSize: fontSize.xl,
      fontWeight: '700',
      marginBottom: spacing.xs,
    } as TextStyle,
    errorThreshold: {
      fontSize: fontSize.xs,
      color: themeColors.steelSecondary,
    } as TextStyle,
    distributionCard: {
      backgroundColor: isDark ? themeColors.canvasDark : themeColors.canvasLight,
      borderRadius: borderRadius.lg,
      padding: spacing.lg,
      borderWidth: 1,
      borderColor: isDark ? themeColors.whisperBorder : themeColors.lightGray,
    } as ViewStyle,
  });

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {/* Analysis Distribution */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Distribución de Análisis</Text>
        <View style={styles.metricsGrid}>
          <View style={styles.metricColumn}>
            <MetricCard
              label="Contactos Efectivos"
              value={`${metrics.effectivePercentage}%`}
              subValue={`${metrics.effectiveContacts} contactos`}
            />
          </View>
          <View style={styles.metricColumn}>
            <MetricCard
              label="Contactos No Efectivos"
              value={`${100 - metrics.effectivePercentage}%`}
              subValue={`${metrics.ineffectiveContacts} contactos`}
            />
          </View>
        </View>
      </View>

      {/* Error Metrics */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Métricas de Errores</Text>

        {[metrics.ecn, metrics.enc, metrics.ecc, metrics.ecuf].map((error) => (
          <View
            key={error.name}
            style={[
              styles.errorCard,
              { borderLeftColor: getStatusColor(error.status) },
            ]}
          >
            <Text style={styles.errorName}>{error.name}</Text>
            <Text style={[styles.errorValue, { color: getStatusColor(error.status) }]}>
              {error.value}%
            </Text>
            <Text style={styles.errorThreshold}>
              Umbral: {error.threshold}% - {error.status === 'ok' ? '✓ OK' : '⚠ Revisar'}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default QAMetricsPanel;
