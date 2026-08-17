import React from 'react';
import { StyleSheet, View, Text, ViewStyle, TextStyle, ScrollView } from 'react-native';
import { AlertCircle, CheckCircle } from 'lucide-react';
import { colors, spacing, borderRadius, fontSize } from '../design';
import { useTheme } from '../context/ThemeContext';
import { Card, MetricCard } from './index';
import type { ComplianceMetrics } from '../data/mockMetrics';

interface ComplianceMetricsPanelProps {
  metrics: ComplianceMetrics;
}

export const ComplianceMetricsPanel: React.FC<ComplianceMetricsPanelProps> = ({ metrics }) => {
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
      flexWrap: 'wrap',
    } as ViewStyle,
    metricColumn: {
      flex: 1,
      minWidth: '48%',
    } as ViewStyle,
    metricColumnFull: {
      width: '100%',
    } as ViewStyle,
    riskContainer: {
      backgroundColor: isDark ? themeColors.canvasDark : themeColors.canvasLight,
      borderRadius: borderRadius.lg,
      padding: spacing.lg,
      borderWidth: 1,
      borderColor: isDark ? themeColors.whisperBorder : themeColors.lightGray,
    } as ViewStyle,
    riskRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: isDark ? themeColors.whisperBorder : themeColors.lightGray,
    } as ViewStyle,
    riskLabel: {
      fontSize: fontSize.sm,
      fontWeight: '500',
      color: themeColors.steelSecondary,
      flexDirection: 'row',
      alignItems: 'center',
    } as TextStyle,
    riskValue: {
      fontSize: fontSize.lg,
      fontWeight: '700',
      color: themeColors.inkPrimary,
    } as TextStyle,
  });

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {/* Overall Metrics */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Métricas Generales</Text>
        <View style={styles.metricsGrid}>
          <View style={styles.metricColumn}>
            <MetricCard
              label="Puntuación de Cumplimiento"
              value={`${metrics.complianceScore}%`}
            />
          </View>
          <View style={styles.metricColumn}>
            <MetricCard
              label="Tasa de Adherencia"
              value={`${metrics.adherenceRate}%`}
            />
          </View>
          <View style={[styles.metricColumn, styles.metricColumnFull]}>
            <MetricCard
              label="Violaciones Detectadas"
              value={metrics.violationCount.toString()}
            />
          </View>
        </View>
      </View>

      {/* Compliance Areas - 2 Column Grid with MetricCard */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Áreas de Cumplimiento</Text>
        <View style={styles.metricsGrid}>
          {[
            { name: 'Protección de Datos', data: metrics.dataProtection },
            { name: 'Cumplimiento de Grabación', data: metrics.recordingCompliance },
            { name: 'Cumplimiento de Divulgación', data: metrics.disclosureCompliance },
            { name: 'Requisitos Regulatorios', data: metrics.regulatoryRequirements },
          ].map((area) => (
            <View key={area.name} style={styles.metricColumn}>
              <MetricCard
                label={area.name}
                value={`${area.data.score}%`}
                trendLabel={area.data.violations === 0 ? '✓ Sin violaciones' : `⚠ ${area.data.violations} violación(es)`}
              />
            </View>
          ))}
        </View>
      </View>

      {/* Risk Indicators */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Indicadores de Riesgo</Text>
        <View style={styles.riskContainer}>
          <View style={[styles.riskRow, { borderBottomWidth: 1 }]}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <AlertCircle size={20} color="#FF6B6B" />
              <Text style={[styles.riskLabel, { marginLeft: spacing.sm }]}>Llamadas de Alto Riesgo</Text>
            </View>
            <Text style={styles.riskValue}>{metrics.highRiskCalls}</Text>
          </View>
          <View style={[styles.riskRow, { borderBottomWidth: 0 }]}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <CheckCircle size={20} color={themeColors.newtechGreen} />
              <Text style={[styles.riskLabel, { marginLeft: spacing.sm }]}>Llamadas de Bajo Riesgo</Text>
            </View>
            <Text style={styles.riskValue}>{metrics.lowRiskCalls}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default ComplianceMetricsPanel;
