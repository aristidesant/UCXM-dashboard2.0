import React from 'react';
import { StyleSheet, View, Text, ViewStyle, TextStyle } from 'react-native';
import { colors, spacing, borderRadius, fontSize } from '../design';
import { useTheme } from '../context/ThemeContext';
import { Card } from './Card';
import { Badge } from './Badge';
import { OperationalIndicator } from './OperationalIndicator';

interface SystemHealthIndicatorProps {
  inboundCalls?: number;
  outboundCalls?: number;
  avgHandlingTime: string;
}

export const SystemHealthIndicator: React.FC<SystemHealthIndicatorProps> = ({
  inboundCalls,
  outboundCalls,
  avgHandlingTime,
}) => {
  const { effectiveTheme } = useTheme();
  const isDark = effectiveTheme === 'dark';
  const themeColors = isDark ? colors.dark : colors.light;

  const styles = StyleSheet.create({
    container: {
      marginBottom: spacing.lg,
      width: '100%',
    } as ViewStyle,
    card: {
      backgroundColor: themeColors.successBg,
      borderRadius: borderRadius.md,
      padding: spacing.lg,
      borderWidth: 1,
      borderColor: isDark ? 'rgba(27, 181, 74, 0.3)' : 'rgba(27, 181, 74, 0.2)',
      shadowColor: themeColors.newtechGreen,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 12,
      elevation: 4,
    } as ViewStyle,
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: spacing.lg,
    } as ViewStyle,
    title: {
      fontSize: 12,
      fontWeight: '600',
      color: themeColors.mutedSlate,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
      lineHeight: 18,
    } as TextStyle,
    metricsGrid: {
      flexDirection: 'row',
      gap: spacing.xl,
      justifyContent: 'space-between',
      alignItems: 'flex-start',
    } as ViewStyle,
    metricItem: {
      flex: 1,
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
    } as ViewStyle,
    metricLabel: {
      fontSize: fontSize.sm,
      fontWeight: '500',
      color: themeColors.steelSecondary,
      marginBottom: spacing.sm,
      lineHeight: 16,
    } as TextStyle,
    metricValue: {
      fontSize: fontSize.lg,
      fontWeight: '700',
      color: themeColors.newtechGreen,
      lineHeight: 26,
    } as TextStyle,
  });

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.title}>Salud del Sistema</Text>
          <Badge status="success" label="Excelente" />
        </View>

        <View style={styles.metricsGrid}>
          <View style={styles.metricItem}>
            <OperationalIndicator label="Llamadas Entrantes" />
          </View>

          <View style={styles.metricItem}>
            <OperationalIndicator label="Llamadas Salientes" />
          </View>

          <View style={styles.metricItem}>
            <Text style={styles.metricLabel}>AHT</Text>
            <Text style={styles.metricValue}>{avgHandlingTime}</Text>
          </View>
        </View>
      </Card>
    </View>
  );
};
