import React from 'react';
import { StyleSheet, View, ScrollView, ViewStyle, StyleProp } from 'react-native';
import { colors, spacing } from '../design';
import { useTheme } from '../context/ThemeContext';
import {
  WelcomeCard,
  SystemHealthIndicator,
  SentimentPair,
  WeeklyCallVolumeChart,
  ComplianceWidget,
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

  const qaMetric = {
    title: 'QA Status',
    value: `${aggregatedMetrics.qa.effectivePercentage}%`,
    description: 'Effective Contacts',
  };

  const complianceMetric = {
    title: 'Compliance',
    value: `${aggregatedMetrics.compliance.complianceScore}%`,
    description: 'Score',
  };

  const businessMetric = {
    title: 'Business Insights',
    value: '$456k',
    description: 'Potential Revenue',
  };

  const emotionMetric = {
    title: 'Emotions',
    value: aggregatedMetrics.emotion.agentPredominantEmotion === 'professional'
      ? 'Professional'
      : 'Satisfied',
    description: 'Agent Status',
  };

  const styles2Col = StyleSheet.create({
    grid: {
      flexDirection: 'row',
      gap: spacing.md,
      flexWrap: 'wrap',
      marginBottom: spacing.lg,
    } as ViewStyle,
    column: {
      flex: 1,
      minWidth: '48%',
    } as ViewStyle,
  });

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      {/* Welcome Card */}
      <WelcomeCard userName="Client" />

      {/* System Health & Compliance Violations - 2 Column */}
      <View style={styles2Col.grid}>
        <View style={styles2Col.column}>
          <SystemHealthIndicator
            level={health.level}
            score={health.score}
            variant={health.variant}
          />
        </View>
        <View style={styles2Col.column}>
          <ComplianceWidget violations={aggregatedMetrics.compliance.violationCount} />
        </View>
      </View>

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
        qa={qaMetric}
        compliance={complianceMetric}
        business={businessMetric}
        emotion={emotionMetric}
      />
    </ScrollView>
  );
};

export default HomeScreen;
