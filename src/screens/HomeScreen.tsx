import React from 'react';
import { StyleSheet, View, ScrollView, ViewStyle, StyleProp } from 'react-native';
import { colors, spacing } from '../design';
import { useTheme } from '../context/ThemeContext';
import { usePlatform } from '../hooks/usePlatform';
import {
  WelcomeCard,
  SystemHealthIndicator,
  SentimentPair,
  WeeklyCallVolumeChart,
  AnalyticsQuickView,
  ResponsiveContainer,
} from '../components';
import { aggregatedMetrics } from '../data/aggregatedMetrics';
import {
  calculateSystemHealth,
  getWeeklyCallVolume,
} from '../utils/homeScreenMetrics';

export const HomeScreen: React.FC = () => {
  const { effectiveTheme } = useTheme();
  const isDark = effectiveTheme === 'dark';
  const themeColors = isDark ? colors.dark : colors.light;
  const { platform } = usePlatform();
  const isDesktop = platform === 'desktop';

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: themeColors.canvasFrost,
    } as ViewStyle,
    scrollContent: {
      paddingHorizontal: spacing.lg,
      paddingTop: spacing.md,
      paddingBottom: spacing.xl,
    } as ViewStyle,
    chartAndAnalyticsRow: {
      flexDirection: 'row',
      gap: spacing.lg,
      flexWrap: isDesktop ? 'nowrap' : 'wrap',
      alignItems: 'flex-end',
    } as ViewStyle,
    chartColumn: {
      flex: 1,
      minWidth: isDesktop ? '50%' : '100%',
    } as ViewStyle,
    analyticsColumn: {
      flex: 1,
      minWidth: isDesktop ? '50%' : '100%',
    } as ViewStyle,
  });

  const health = calculateSystemHealth(
    aggregatedMetrics.compliance,
    aggregatedMetrics.qa,
    aggregatedMetrics.operation
  );

  const weeklyData = getWeeklyCallVolume();

  const complianceMetric = {
    title: 'Cumplimiento',
    value: `${aggregatedMetrics.compliance.complianceScore}%`,
    description: 'Puntuación',
  };

  const emotionMetric = {
    title: 'Tono Gral de Agentes',
    value: 'Profesional',
    description: 'Predominante',
  };

  const formatHandlingTime = (minutes: number, seconds: number) => {
    return `${minutes}m ${seconds}s`;
  };

  const aht = aggregatedMetrics.operation.management.averageHandleTime;
  const currentAHT = (aht.minutes * 60) + aht.seconds;
  const targetAHT = 5 * 60; // 5 minutes target
  const ahtVariance = ((currentAHT - targetAHT) / targetAHT) * 100;

  const healthMetrics = [
    {
      label: 'Llamadas Entrantes',
      value: aggregatedMetrics.operation.calls.totalAnswered.toLocaleString(),
      unit: 'llamadas',
      target: '18k',
      comparison: 3.8, // vs previous week
      status: 'success' as const,
    },
    {
      label: 'Llamadas Salientes',
      value: aggregatedMetrics.operation.calls.totalOutgoing.toLocaleString(),
      unit: 'llamadas',
      target: '8k',
      comparison: 2.1,
      status: 'success' as const,
    },
    {
      label: 'AHT (Tiempo Promedio)',
      value: aht.minutes,
      unit: `m ${aht.seconds}s`,
      target: '5m 00s',
      comparison: Math.round(ahtVariance),
      status: ahtVariance < 10 ? 'success' : 'warning',
    },
  ];

  return (
    <ResponsiveContainer>
      <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
        {/* Welcome Card */}
        <WelcomeCard userName="José Perdomo" />

        {/* System Health - Full Width */}
        <SystemHealthIndicator
          metrics={healthMetrics}
          overallStatus="success"
        />

        {/* Sentiment Metrics */}
        <SentimentPair
          agentEmotion={aggregatedMetrics.emotion.agentPredominantEmotion}
          agentConfidence={aggregatedMetrics.emotion.agentConfidenceScore}
          clientEmotion={aggregatedMetrics.emotion.clientPredominantEmotion}
          clientConfidence={aggregatedMetrics.emotion.clientConfidenceScore}
        />

        {/* Weekly Call Volume Chart and Analytics - Side by side on desktop */}
        <View style={styles.chartAndAnalyticsRow}>
          <View style={styles.chartColumn}>
            <WeeklyCallVolumeChart data={weeklyData.data} labels={weeklyData.labels} />
          </View>
          <View style={styles.analyticsColumn}>
            <AnalyticsQuickView
              compliance={complianceMetric}
              emotion={emotionMetric}
            />
          </View>
        </View>
      </ScrollView>
    </ResponsiveContainer>
  );
};

export default HomeScreen;
