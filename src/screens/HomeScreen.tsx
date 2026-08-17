import React from 'react';
import { StyleSheet, View, ScrollView, ViewStyle, StyleProp } from 'react-native';
import { colors, spacing } from '../design';
import { useTheme } from '../context/ThemeContext';
import {
  WelcomeCard,
  SystemHealthIndicator,
  SentimentPair,
  WeeklyCallVolumeChart,
  AnalyticsQuickView,
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
    value: aggregatedMetrics.emotion.agentPredominantEmotion === 'professional'
      ? 'Profesional'
      : 'Satisfecho',
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

      {/* Weekly Call Volume Chart */}
      <WeeklyCallVolumeChart data={weeklyData.data} labels={weeklyData.labels} />

      {/* Analytics Quick View */}
      <AnalyticsQuickView
        compliance={complianceMetric}
        emotion={emotionMetric}
      />
    </ScrollView>
  );
};

export default HomeScreen;
