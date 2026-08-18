import React from 'react';
import { StyleSheet, View, Text, ViewStyle, TextStyle, ScrollView } from 'react-native';
import { colors, spacing, borderRadius, fontSize } from '../design';
import { useTheme } from '../context/ThemeContext';
import { Card, MetricCard } from './index';
import type { EmotionMetrics } from '../data/mockMetrics';
import { getSentimentLevel, getEmotionLabel } from '../utils/homeScreenMetrics';

interface EmotionMetricsPanelProps {
  metrics: EmotionMetrics;
}

export const EmotionMetricsPanel: React.FC<EmotionMetricsPanelProps> = ({ metrics }) => {
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
    emotionCard: {
      backgroundColor: isDark ? themeColors.canvasDark : themeColors.canvasLight,
      borderRadius: borderRadius.lg,
      padding: spacing.lg,
      marginBottom: spacing.md,
      borderWidth: 1,
      borderColor: isDark ? themeColors.whisperBorder : themeColors.lightGray,
    } as ViewStyle,
    emotionLabel: {
      fontSize: fontSize.sm,
      fontWeight: '500',
      color: themeColors.steelSecondary,
      marginBottom: spacing.xs,
    } as TextStyle,
    emotionValue: {
      fontSize: fontSize.xl,
      fontWeight: '700',
      color: themeColors.inkPrimary,
      marginBottom: spacing.sm,
      textTransform: 'capitalize',
    } as TextStyle,
    confidenceLabel: {
      fontSize: fontSize.xs,
      color: themeColors.steelSecondary,
    } as TextStyle,
    confidenceValue: {
      fontSize: fontSize.lg,
      fontWeight: '700',
      color: themeColors.newtechGreen,
    } as TextStyle,
    metricsGrid: {
      flexDirection: 'row',
      gap: spacing.md,
      marginBottom: spacing.md,
    } as ViewStyle,
    metricColumn: {
      flex: 1,
    } as ViewStyle,
    distributionContainer: {
      backgroundColor: isDark ? themeColors.canvasDark : themeColors.canvasLight,
      borderRadius: borderRadius.lg,
      padding: spacing.lg,
      borderWidth: 1,
      borderColor: isDark ? themeColors.whisperBorder : themeColors.lightGray,
    } as ViewStyle,
    distributionItem: {
      marginBottom: spacing.md,
    } as ViewStyle,
    distributionLabel: {
      fontSize: fontSize.sm,
      fontWeight: '500',
      color: themeColors.steelSecondary,
      marginBottom: spacing.xs,
    } as TextStyle,
    distributionBar: {
      height: 8,
      backgroundColor: isDark ? themeColors.whisperBorder : themeColors.lightGray,
      borderRadius: borderRadius.sm,
      overflow: 'hidden',
    } as ViewStyle,
    distributionFill: {
      height: '100%',
      backgroundColor: themeColors.newtechGreen,
    } as ViewStyle,
    distributionPercentage: {
      fontSize: fontSize.xs,
      fontWeight: '600',
      color: themeColors.inkPrimary,
      marginTop: spacing.xs,
    } as TextStyle,
    toneDistributionRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: isDark ? themeColors.whisperBorder : themeColors.lightGray,
    } as ViewStyle,
    toneName: {
      fontSize: fontSize.sm,
      fontWeight: '500',
      color: themeColors.steelSecondary,
    } as TextStyle,
    tonePercentage: {
      fontSize: fontSize.sm,
      fontWeight: '700',
      color: themeColors.inkPrimary,
    } as TextStyle,
  });

  // Color palette for emotions (12 total)
  const emotionColors: Record<string, string> = {
    // Existing
    joy: '#FFD93D',
    satisfaction: '#6BCB77',
    neutral: '#4D96FF',
    frustration: '#FF9500',
    anger: '#FF6B6B',
    sadness: '#7B68EE',
    // New
    elation: '#FFE066',
    gratitude: '#51CF66',
    relief: '#74C0FC',
    surprise: '#90C3FF',
    fear: '#FFA94D',
    disappointment: '#FF8A80',
    rage: '#FF5252',
  };

  const getEmotionColor = (emotion: string) => emotionColors[emotion.toLowerCase()] || themeColors.newtechGreen;

  const sortedEmotions = Object.entries(metrics.emotionDistribution)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 6);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {/* Agent Emotion */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Sentimiento Predominante del Agente</Text>
        <View style={styles.emotionCard}>
          <Text style={styles.emotionLabel}>Sentimiento</Text>
          <Text style={styles.emotionValue}>{getSentimentLevel(metrics.agentPredominantEmotion)} - {getEmotionLabel(metrics.agentPredominantEmotion)}</Text>
        </View>
      </View>

      {/* Client Emotion */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Sentimiento Predominante del Cliente</Text>
        <View style={styles.emotionCard}>
          <Text style={styles.emotionLabel}>Sentimiento</Text>
          <Text style={styles.emotionValue}>{getSentimentLevel(metrics.clientPredominantEmotion)} - {getEmotionLabel(metrics.clientPredominantEmotion)}</Text>
        </View>
      </View>

      {/* Emotion Distribution */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Distribución Emocional</Text>
        <View style={styles.distributionContainer}>
          {sortedEmotions.map(([emotion, percentage]) => (
            <View key={emotion} style={styles.distributionItem}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginBottom: spacing.xs,
                }}
              >
                <Text style={[styles.distributionLabel, { textTransform: 'capitalize' }]}>
                  {emotion}
                </Text>
                <Text style={styles.distributionPercentage}>{percentage}%</Text>
              </View>
              <View style={styles.distributionBar}>
                <View
                  style={[
                    styles.distributionFill,
                    {
                      width: `${percentage}%`,
                      backgroundColor: getEmotionColor(emotion),
                    },
                  ]}
                />
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Agent Tone Distribution */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Tono del Agente</Text>
        <Card>
          {Object.entries(metrics.agentToneDistribution).map(([tone, percentage], index) => (
            <View
              key={tone}
              style={[
                styles.toneDistributionRow,
                index === Object.entries(metrics.agentToneDistribution).length - 1 && {
                  borderBottomWidth: 0,
                },
              ]}
            >
              <Text style={[styles.toneName, { textTransform: 'capitalize' }]}>{tone}</Text>
              <Text style={styles.tonePercentage}>{percentage}%</Text>
            </View>
          ))}
        </Card>
      </View>
    </ScrollView>
  );
};

export default EmotionMetricsPanel;
