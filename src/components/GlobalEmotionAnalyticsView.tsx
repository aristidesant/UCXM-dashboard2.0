import React from 'react';
import { StyleSheet, View, Text, ViewStyle, TextStyle, ScrollView } from 'react-native';
import { colors, spacing, borderRadius, fontSize } from '../design';
import { useTheme } from '../context/ThemeContext';
import { Card } from './index';
import { getSentimentLevel, getEmotionLabel, getToneLabel } from '../utils/homeScreenMetrics';

export const GlobalEmotionAnalyticsView: React.FC = () => {
  const { effectiveTheme } = useTheme();
  const isDark = effectiveTheme === 'dark';
  const themeColors = isDark ? colors.dark : colors.light;

  // Mock aggregated data from multiple campaigns
  const aggregatedData = {
    agentPredominantEmotion: 'satisfaction',
    clientPredominantEmotion: 'satisfaction',
    emotionDistribution: {
      satisfaction: 28,
      joy: 22,
      neutral: 18,
      frustration: 15,
      disappointment: 10,
      relief: 7,
    },
    agentToneDistribution: {
      professional: 42,
      empathetic: 28,
      polite: 20,
      casual: 10,
    },
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    } as ViewStyle,
    scrollContent: {
      paddingHorizontal: 0,
      paddingTop: spacing.md,
      paddingBottom: spacing.lg,
    } as ViewStyle,
    sentimentCardsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: spacing.md,
      paddingHorizontal: spacing.lg,
      marginBottom: spacing.lg,
    } as ViewStyle,
    sentimentCard: {
      flex: 1,
      minWidth: '45%',
      backgroundColor: isDark ? themeColors.sunkenBase : themeColors.pureSurface,
      borderRadius: borderRadius.lg,
      padding: spacing.md,
      borderWidth: 1,
      borderColor: themeColors.whisperBorder,
    } as ViewStyle,
    sentimentCardLabel: {
      fontSize: fontSize.sm,
      color: themeColors.steelSecondary,
      fontWeight: '500',
      marginBottom: spacing.md,
    } as TextStyle,
    sentimentValueContainer: {
      gap: spacing.sm,
    } as ViewStyle,
    sentimentValueLabel: {
      fontSize: fontSize.xs,
      color: themeColors.steelSecondary,
      fontWeight: '500',
    } as TextStyle,
    sentimentValue: {
      fontSize: fontSize.lg,
      fontWeight: '700',
      color: themeColors.inkPrimary,
      textTransform: 'capitalize',
    } as TextStyle,
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
    distributionContainer: {
      backgroundColor: isDark ? themeColors.sunkenBase : themeColors.pureSurface,
      borderRadius: borderRadius.lg,
      padding: spacing.md,
      borderWidth: 1,
      borderColor: themeColors.whisperBorder,
    } as ViewStyle,
    distributionItem: {
      marginBottom: spacing.lg,
    } as ViewStyle,
    distributionLabel: {
      fontSize: fontSize.sm,
      fontWeight: '500',
      color: themeColors.steelSecondary,
      marginBottom: spacing.sm,
    } as TextStyle,
    distributionBar: {
      height: 6,
      backgroundColor: isDark ? themeColors.canvasDark : colors.light.canvasLight,
      borderRadius: borderRadius.sm,
      overflow: 'hidden',
    } as ViewStyle,
    distributionFill: {
      height: '100%',
      backgroundColor: themeColors.newtechGreen,
    } as ViewStyle,
    distributionPercentage: {
      fontSize: fontSize.sm,
      fontWeight: '600',
      color: themeColors.inkPrimary,
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

  const emotionColors: Record<string, string> = {
    joy: '#FFD93D',
    satisfaction: '#6BCB77',
    neutral: '#4D96FF',
    frustration: '#FF9500',
    anger: '#FF6B6B',
    sadness: '#7B68EE',
    elation: '#FFE066',
    gratitude: '#51CF66',
    relief: '#74C0FC',
    surprise: '#90C3FF',
    fear: '#FFA94D',
    disappointment: '#FF8A80',
    rage: '#FF5252',
  };

  const getEmotionColor = (emotion: string) => emotionColors[emotion.toLowerCase()] || themeColors.newtechGreen;

  const sortedEmotions = Object.entries(aggregatedData.emotionDistribution)
    .sort(([, a], [, b]) => b - a);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {/* Agent & Client Sentiment - 2 Column Layout */}
      <View style={styles.sentimentCardsContainer}>
        <View style={styles.sentimentCard}>
          <Text style={styles.sentimentCardLabel}>Sentimiento Predominante del Agente</Text>
          <View style={styles.sentimentValueContainer}>
            <Text style={styles.sentimentValueLabel}>Sentimiento</Text>
            <Text style={styles.sentimentValue}>
              {getSentimentLevel(aggregatedData.agentPredominantEmotion)} - {getEmotionLabel(aggregatedData.agentPredominantEmotion)}
            </Text>
          </View>
        </View>

        <View style={styles.sentimentCard}>
          <Text style={styles.sentimentCardLabel}>Sentimiento Predominante del Cliente</Text>
          <View style={styles.sentimentValueContainer}>
            <Text style={styles.sentimentValueLabel}>Sentimiento</Text>
            <Text style={styles.sentimentValue}>
              {getSentimentLevel(aggregatedData.clientPredominantEmotion)} - {getEmotionLabel(aggregatedData.clientPredominantEmotion)}
            </Text>
          </View>
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
                  alignItems: 'center',
                  marginBottom: spacing.sm,
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
      </View>

      {/* Agent Tone Distribution */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Tono del Agente</Text>
        <Card>
          {Object.entries(aggregatedData.agentToneDistribution).map(([tone, percentage], index) => (
            <View
              key={tone}
              style={[
                styles.toneDistributionRow,
                index === Object.entries(aggregatedData.agentToneDistribution).length - 1 && {
                  borderBottomWidth: 0,
                },
              ]}
            >
              <Text style={styles.toneName}>{getToneLabel(tone)}</Text>
              <Text style={styles.tonePercentage}>{percentage}%</Text>
            </View>
          ))}
        </Card>
      </View>
    </ScrollView>
  );
};
