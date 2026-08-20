import React, { useState } from 'react';
import { StyleSheet, View, Text, ViewStyle, TextStyle, TouchableOpacity } from 'react-native';
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
  const [emotionTab, setEmotionTab] = useState<'agent' | 'customer'>('agent');

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
    distributionTabs: {
      flexDirection: 'row',
      gap: spacing.xs,
    } as ViewStyle,
    tabButton: {
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.xs,
      borderRadius: borderRadius.md,
      backgroundColor: themeColors.whisperBorder,
    } as ViewStyle,
    tabButtonActive: {
      backgroundColor: colors.light.newtechGreen,
    } as ViewStyle,
    tabText: {
      fontSize: fontSize.sm,
      fontWeight: '600',
      color: themeColors.steelSecondary,
    } as TextStyle,
    tabTextActive: {
      color: '#FFFFFF',
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

  // Agent and customer emotion data
  const agentEmotions = { satisfaction: 42, frustration: 28, anger: 12, neutral: 18 };
  const customerEmotions = { satisfaction: 25, frustration: 38, anger: 22, neutral: 15 };

  const currentEmotionData = emotionTab === 'agent' ? agentEmotions : customerEmotions;

  const sortedEmotions = currentEmotionData
    ? Object.entries(currentEmotionData)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 6)
    : [];

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
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.md }}>
          <Text style={{ fontSize: fontSize.lg, fontWeight: '600', color: themeColors.inkPrimary }}>Distribución de Emociones</Text>
          <View style={styles.distributionTabs}>
            <TouchableOpacity
              style={[styles.tabButton, emotionTab === 'agent' && styles.tabButtonActive]}
              onPress={() => setEmotionTab('agent')}
            >
              <Text style={[styles.tabText, emotionTab === 'agent' && styles.tabTextActive]}>Agente</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tabButton, emotionTab === 'customer' && styles.tabButtonActive]}
              onPress={() => setEmotionTab('customer')}
            >
              <Text style={[styles.tabText, emotionTab === 'customer' && styles.tabTextActive]}>Cliente</Text>
            </TouchableOpacity>
          </View>
        </View>
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
        {metrics.agentToneDistribution && Object.entries(metrics.agentToneDistribution).map(([tone, percentage], index) => (
          <View
            key={tone}
            style={[
              styles.toneDistributionRow,
              index === Object.entries(metrics.agentToneDistribution || {}).length - 1 && {
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
