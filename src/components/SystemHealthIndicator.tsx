import React from 'react';
import { StyleSheet, View, Text, ViewStyle, TextStyle } from 'react-native';
import { colors, spacing, borderRadius, fontSize } from '../design';
import { useTheme } from '../context/ThemeContext';
import { Card } from './Card';
import { Badge } from './Badge';

interface SystemHealthIndicatorProps {
  inboundCalls: number;
  outboundCalls: number;
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
      gap: spacing.lg,
      justifyContent: 'space-around',
    } as ViewStyle,
    metricItem: {
      flex: 1,
      alignItems: 'center',
    } as ViewStyle,
    metricLabel: {
      fontSize: fontSize.sm,
      fontWeight: '500',
      color: themeColors.steelSecondary,
      marginBottom: spacing.sm,
      lineHeight: 18,
    } as TextStyle,
    metricValue: {
      fontSize: fontSize.xl,
      fontWeight: '700',
      color: themeColors.newtechGreen,
      lineHeight: 28,
    } as TextStyle,
  });

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.title}>System Health</Text>
          <Badge status="success" label="Excellent" />
        </View>

        <View style={styles.metricsGrid}>
          <View style={styles.metricItem}>
            <Text style={styles.metricLabel}>Inbound Calls</Text>
            <Text style={styles.metricValue}>
              {(inboundCalls / 1000).toFixed(1)}k
            </Text>
          </View>

          <View style={styles.metricItem}>
            <Text style={styles.metricLabel}>Outbound Calls</Text>
            <Text style={styles.metricValue}>
              {(outboundCalls / 1000).toFixed(1)}k
            </Text>
          </View>

          <View style={styles.metricItem}>
            <Text style={styles.metricLabel}>Avg. Handling Time</Text>
            <Text style={styles.metricValue}>{avgHandlingTime}</Text>
          </View>
        </View>
      </Card>
    </View>
  );
};
