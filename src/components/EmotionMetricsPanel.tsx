import React from 'react';
import { StyleSheet, View, Text, ViewStyle, TextStyle } from 'react-native';
import { colors, spacing, borderRadius, fontSize } from '../design';
import { useTheme } from '../context/ThemeContext';
import type { EmotionMetrics } from '../data/mockMetrics';
import { getSentimentLevel, getEmotionLabel, getToneLabel } from '../utils/homeScreenMetrics';

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
    sentimentCardsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginHorizontal: -spacing.sm / 2,
      marginBottom: spacing.lg,
    } as ViewStyle,
    sentimentCard: {
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
    sentimentLabel: {
      fontSize: fontSize.sm,
      fontWeight: '500',
      color: themeColors.steelSecondary,
      marginBottom: spacing.sm,
    } as TextStyle,
    sentimentValue: {
      fontSize: fontSize.lg,
      fontWeight: '700',
      color: themeColors.inkPrimary,
      textTransform: 'capitalize',
    } as TextStyle,
    distributionContainer: {
      backgroundColor: isDark ? themeColors.sunkenBase : themeColors.pureSurface,
      borderRadius: borderRadius.lg,
      padding: spacing.lg,
      marginBottom: spacing.lg,
      borderWidth: 1,
      borderColor: themeColors.whisperBorder,
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
      backgroundColor: themeColors.whisperBorder,
      borderRadius: borderRadius.sm,
      overflow: 'hidden',
    } as ViewStyle,
    distributionFill: {
      height: '100%',
    } as ViewStyle,
    distributionPercentage: {
      fontSize: fontSize.xs,
      fontWeight: '600',
      color: themeColors.inkPrimary,
      marginTop: spacing.xs,
    } as TextStyle,
    toneDistributionContainer: {
      backgroundColor: isDark ? themeColors.sunkenBase : themeColors.pureSurface,
      borderRadius: borderRadius.lg,
      padding: spacing.lg,
      borderWidth: 1,
      borderColor: themeColors.whisperBorder,
    } as ViewStyle,
    toneDistributionRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: spacing.sm,
      paddingHorizontal: 0,
      borderBottomWidth: 1,
      borderBottomColor: themeColors.whisperBorder,
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
    <View style={styles.container}>
      {/* Sentiment Cards - 2 Column Layout */}
      <View style={styles.sentimentCardsContainer}>
        <View style={styles.sentimentCard}>
          <Text style={styles.sentimentLabel}>Sentimiento Predominante del Agente</Text>
          <Text style={styles.sentimentValue}>{getSentimentLevel(metrics.agentPredominantEmotion)} - {getEmotionLabel(metrics.agentPredominantEmotion)}</Text>
        </View>

        <View style={styles.sentimentCard}>
          <Text style={styles.sentimentLabel}>Sentimiento Predominante del Cliente</Text>
          <Text style={styles.sentimentValue}>{getSentimentLevel(metrics.clientPredominantEmotion)} - {getEmotionLabel(metrics.clientPredominantEmotion)}</Text>
        </View>
      </View>

      {/* Emotion Distribution */}
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
              <Text style={styles.distributionLabel}>
                {getEmotionLabel(emotion)}
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

      {/* Agent Tone Distribution */}
      <View style={styles.toneDistributionContainer}>
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
            <Text style={styles.toneName}>{getToneLabel(tone)}</Text>
            <Text style={styles.tonePercentage}>{percentage}%</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default EmotionMetricsPanel;
