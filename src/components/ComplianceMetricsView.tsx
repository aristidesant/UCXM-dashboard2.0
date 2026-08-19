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
import { useComplianceMetrics } from '../hooks/useFilteredMetrics';

interface ComplianceMetricProps {
  label: string;
  score: number;
  violations: number;
  isDark: boolean;
  themeColors: any;
}

const ComplianceMetric: React.FC<ComplianceMetricProps> = ({
  label,
  score,
  violations,
  isDark,
  themeColors,
}) => {
  const getScoreColor = () => {
    if (score >= 90) return colors.light.newtechGreen;
    if (score >= 80) return '#FFC53D';
    return '#FF4D4F';
  };

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
    } as ViewStyle,
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: spacing.sm,
    } as ViewStyle,
    label: {
      fontSize: fontSize.sm,
      color: themeColors.steelSecondary,
      fontWeight: '500',
      flex: 1,
    } as TextStyle,
    score: {
      fontSize: fontSize.lg,
      fontWeight: '700',
      color: getScoreColor(),
    } as TextStyle,
    violationsRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.md,
    } as ViewStyle,
    violationsLabel: {
      fontSize: fontSize.xs,
      color: themeColors.steelSecondary,
      fontWeight: '400',
    } as TextStyle,
    violationsValue: {
      fontSize: fontSize.sm,
      fontWeight: '600',
      color: violations > 0 ? '#FF4D4F' : colors.light.newtechGreen,
    } as TextStyle,
  });

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.score}>{score}%</Text>
      </View>
      <View style={styles.violationsRow}>
        <Text style={styles.violationsLabel}>Violaciones:</Text>
        <Text style={styles.violationsValue}>{violations}</Text>
      </View>
    </View>
  );
};

export const ComplianceMetricsView: React.FC = () => {
  const { effectiveTheme } = useTheme();
  const isDark = effectiveTheme === 'dark';
  const themeColors = isDark ? colors.dark : colors.light;
  const metrics = useComplianceMetrics();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    } as ViewStyle,
    metricsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginHorizontal: -spacing.sm / 2,
    } as ViewStyle,
    summaryCard: {
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
    summaryValue: {
      fontSize: fontSize.xl,
      fontWeight: '700',
      marginBottom: spacing.xs,
    } as TextStyle,
    summaryLabel: {
      fontSize: fontSize.sm,
      color: themeColors.steelSecondary,
      fontWeight: '500',
    } as TextStyle,
    summarySubtext: {
      fontSize: fontSize.xs,
      color: themeColors.steelSecondary,
      marginTop: spacing.sm,
    } as TextStyle,
    riskContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: spacing.md,
      marginBottom: spacing.md,
      marginHorizontal: -spacing.sm / 2,
    } as ViewStyle,
    riskCard: {
      flex: 1,
      minWidth: '45%',
      backgroundColor: isDark ? themeColors.sunkenBase : themeColors.pureSurface,
      borderRadius: borderRadius.lg,
      padding: spacing.md,
      borderWidth: 1,
      borderColor: themeColors.whisperBorder,
    } as ViewStyle,
    riskLabel: {
      fontSize: fontSize.xs,
      color: themeColors.steelSecondary,
      fontWeight: '500',
      marginBottom: spacing.sm,
    } as TextStyle,
    riskValue: {
      fontSize: fontSize.lg,
      fontWeight: '700',
    } as TextStyle,
  });

  const getScoreColor = (score: number): string => {
    if (score >= 90) return colors.light.newtechGreen;
    if (score >= 80) return '#FFC53D';
    return '#FF4D4F';
  };

  return (
    <View style={styles.container}>
      {/* Overall Compliance Score */}
      <View style={styles.summaryCard}>
        <Text style={styles.summaryLabel}>Cumplimiento General</Text>
        <Text style={[styles.summaryValue, { color: getScoreColor(metrics.complianceScore) }]}>
          {metrics.complianceScore}%
        </Text>
        <Text style={styles.summarySubtext}>
          Tasa de Adherencia: {metrics.adherenceRate}%
        </Text>
      </View>

      {/* Risk Assessment - 2 Column Layout */}
      <View style={styles.riskContainer}>
        <View style={styles.riskCard}>
          <Text style={styles.riskLabel}>Llamadas Alto Riesgo</Text>
          <Text style={[styles.riskValue, { color: '#FF4D4F' }]}>
            {metrics.highRiskCalls}
          </Text>
        </View>
        <View style={styles.riskCard}>
          <Text style={styles.riskLabel}>Llamadas Bajo Riesgo</Text>
          <Text style={[styles.riskValue, { color: colors.light.newtechGreen }]}>
            {metrics.lowRiskCalls}
          </Text>
        </View>
      </View>

      {/* Detailed Metrics - 2 Column Layout */}
      <View style={styles.metricsContainer}>
        <ComplianceMetric
          label={metrics.dataProtection.name || 'Protección de Datos'}
          score={metrics.dataProtection.score}
          violations={metrics.dataProtection.violations}
          isDark={isDark}
          themeColors={themeColors}
        />

        <ComplianceMetric
          label={metrics.recordingCompliance.name || 'Cumplimiento de Grabación'}
          score={metrics.recordingCompliance.score}
          violations={metrics.recordingCompliance.violations}
          isDark={isDark}
          themeColors={themeColors}
        />

        <ComplianceMetric
          label={metrics.disclosureCompliance.name || 'Cumplimiento de Divulgación'}
          score={metrics.disclosureCompliance.score}
          violations={metrics.disclosureCompliance.violations}
          isDark={isDark}
          themeColors={themeColors}
        />

        <ComplianceMetric
          label={metrics.regulatoryRequirements.name || 'Requisitos Regulatorios'}
          score={metrics.regulatoryRequirements.score}
          violations={metrics.regulatoryRequirements.violations}
          isDark={isDark}
          themeColors={themeColors}
        />
      </View>
    </View>
  );
};
