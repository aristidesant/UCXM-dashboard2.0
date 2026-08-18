import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { colors, spacing, borderRadius, fontSize } from '../../design';
import { useTheme } from '../../context/ThemeContext';

interface ErrorMetric {
  label: string;
  value: number;
  minimum: number;
}

interface QAEvaluationCardProps {
  ecn?: number;
  enc?: number;
  ecc?: number;
  ecuf?: number;
}

export const QAEvaluationCard: React.FC<QAEvaluationCardProps> = ({
  ecn = 90,
  enc = 85,
  ecc = 100,
  ecuf = 98,
}) => {
  const { effectiveTheme } = useTheme();
  const isDark = effectiveTheme === 'dark';
  const themeColors = isDark ? colors.dark : colors.light;

  const errorMetrics: ErrorMetric[] = [
    { label: 'ECN (Error Crítico de Negocio)', value: ecn, minimum: 90 },
    { label: 'ENC (Error No Crítico)', value: enc, minimum: 85 },
    { label: 'ECC (Error Crítico Cumplimiento)', value: ecc, minimum: 100 },
    { label: 'ECUF (Error Crítico Usuario Final)', value: ecuf, minimum: 98 },
  ];

  const getStatusColor = (value: number, minimum: number): string => {
    if (value >= minimum) {
      return colors.light.newtechGreen;
    } else if (value >= minimum - 5) {
      return '#FFB347';
    }
    return '#FF6B6B';
  };

  const styles = StyleSheet.create({
    container: {
      backgroundColor: isDark ? themeColors.sunkenBase : themeColors.pureSurface,
      borderRadius: borderRadius.lg,
      padding: spacing.md,
      borderWidth: 1,
      borderColor: themeColors.whisperBorder,
    } as ViewStyle,
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: spacing.sm,
      borderBottomWidth: 1,
      borderBottomColor: themeColors.whisperBorder,
    } as ViewStyle,
    lastRow: {
      borderBottomWidth: 0,
    } as ViewStyle,
    labelContainer: {
      flex: 1,
      gap: spacing.xs,
    } as ViewStyle,
    label: {
      fontSize: fontSize.xs,
      color: themeColors.steelSecondary,
      fontWeight: '600',
      textTransform: 'uppercase',
    } as TextStyle,
    minimum: {
      fontSize: fontSize.xs,
      color: themeColors.steelSecondary,
      fontWeight: '400',
    } as TextStyle,
    valueContainer: {
      alignItems: 'flex-end',
      gap: spacing.xs,
    } as ViewStyle,
    value: {
      fontSize: fontSize.sm,
      fontWeight: '700',
      color: themeColors.inkPrimary,
    } as TextStyle,
    statusIndicator: {
      width: 8,
      height: 8,
      borderRadius: 4,
      marginLeft: spacing.xs,
    } as ViewStyle,
  });

  return (
    <View style={styles.container}>
      {errorMetrics.map((metric, index) => (
        <View
          key={metric.label}
          style={[styles.row, index === errorMetrics.length - 1 && styles.lastRow]}
        >
          <View style={styles.labelContainer}>
            <Text style={styles.label}>{metric.label}</Text>
            <Text style={styles.minimum}>Mínimo: {metric.minimum}%</Text>
          </View>
          <View style={styles.valueContainer}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.xs }}>
              <Text style={[styles.value, { color: getStatusColor(metric.value, metric.minimum) }]}>
                {metric.value}%
              </Text>
              <View
                style={[
                  styles.statusIndicator,
                  { backgroundColor: getStatusColor(metric.value, metric.minimum) },
                ]}
              />
            </View>
          </View>
        </View>
      ))}
    </View>
  );
};
