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
import { useQAMetrics } from '../hooks/useFilteredMetrics';

interface QAScoreProps {
  label: string;
  value: number;
  threshold: number;
  status: 'ok' | 'warning' | 'critical';
  isDark: boolean;
  themeColors: any;
}

const QAScore: React.FC<QAScoreProps> = ({
  label,
  value,
  threshold,
  status,
  isDark,
  themeColors,
}) => {
  const getStatusColor = () => {
    switch (status) {
      case 'ok':
        return colors.light.newtechGreen;
      case 'warning':
        return '#FFC53D';
      case 'critical':
        return '#FF4D4F';
      default:
        return themeColors.steelSecondary;
    }
  };

  const styles = StyleSheet.create({
    card: {
      backgroundColor: isDark ? themeColors.sunkenBase : themeColors.pureSurface,
      borderRadius: borderRadius.lg,
      padding: spacing.md,
      marginBottom: spacing.md,
      borderWidth: 1,
      borderColor: themeColors.whisperBorder,
      borderLeftWidth: 4,
      borderLeftColor: getStatusColor(),
    } as ViewStyle,
    label: {
      fontSize: fontSize.sm,
      color: themeColors.steelSecondary,
      fontWeight: '500',
      marginBottom: spacing.sm,
    } as TextStyle,
    scoreContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      marginBottom: spacing.sm,
    } as ViewStyle,
    value: {
      fontSize: fontSize.xl,
      fontWeight: '700',
      color: getStatusColor(),
    } as TextStyle,
    threshold: {
      fontSize: fontSize.xs,
      color: themeColors.steelSecondary,
      fontWeight: '400',
    } as TextStyle,
    bar: {
      height: 8,
      backgroundColor: isDark ? themeColors.canvasDark : colors.light.sunkenBase,
      borderRadius: borderRadius.sm,
      overflow: 'hidden',
    } as ViewStyle,
    barFill: {
      height: '100%',
      backgroundColor: getStatusColor(),
    } as ViewStyle,
  });

  const percentage = Math.min((value / threshold) * 100, 100);

  return (
    <View style={styles.card}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.scoreContainer}>
        <Text style={styles.value}>{value}</Text>
        <Text style={styles.threshold}>Umbral: {threshold}</Text>
      </View>
      <View style={styles.bar}>
        <View style={[styles.barFill, { width: `${percentage}%` }]} />
      </View>
    </View>
  );
};

export const QAMetricsView: React.FC = () => {
  const { effectiveTheme } = useTheme();
  const isDark = effectiveTheme === 'dark';
  const themeColors = isDark ? colors.dark : colors.light;
  const metrics = useQAMetrics();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    } as ViewStyle,
    summaryCard: {
      backgroundColor: isDark ? themeColors.sunkenBase : themeColors.pureSurface,
      borderRadius: borderRadius.lg,
      padding: spacing.md,
      marginBottom: spacing.md,
      borderWidth: 1,
      borderColor: themeColors.whisperBorder,
    } as ViewStyle,
    summaryLabel: {
      fontSize: fontSize.sm,
      color: themeColors.steelSecondary,
      fontWeight: '500',
      marginBottom: spacing.sm,
    } as TextStyle,
    summaryValue: {
      fontSize: fontSize.xl,
      fontWeight: '700',
      color: themeColors.inkPrimary,
      marginBottom: spacing.sm,
    } as TextStyle,
    summarySubtext: {
      fontSize: fontSize.xs,
      color: themeColors.steelSecondary,
    } as TextStyle,
  });

  return (
    <View style={styles.container}>
      {/* Effectiveness Summary */}
      <View style={styles.summaryCard}>
        <Text style={styles.summaryLabel}>Contactos Efectivos</Text>
        <Text style={styles.summaryValue}>{metrics.effectivePercentage}%</Text>
        <Text style={styles.summarySubtext}>
          {metrics.effectiveContacts} efectivos de {metrics.effectiveContacts + metrics.ineffectiveContacts} total
        </Text>
      </View>

      {/* Quality Scores */}
      <QAScore
        label={metrics.ecn.name}
        value={metrics.ecn.value}
        threshold={metrics.ecn.threshold}
        status={metrics.ecn.status}
        isDark={isDark}
        themeColors={themeColors}
      />

      <QAScore
        label={metrics.enc.name}
        value={metrics.enc.value}
        threshold={metrics.enc.threshold}
        status={metrics.enc.status}
        isDark={isDark}
        themeColors={themeColors}
      />

      <QAScore
        label={metrics.ecc.name}
        value={metrics.ecc.value}
        threshold={metrics.ecc.threshold}
        status={metrics.ecc.status}
        isDark={isDark}
        themeColors={themeColors}
      />

      <QAScore
        label={metrics.ecuf.name}
        value={metrics.ecuf.value}
        threshold={metrics.ecuf.threshold}
        status={metrics.ecuf.status}
        isDark={isDark}
        themeColors={themeColors}
      />
    </View>
  );
};
