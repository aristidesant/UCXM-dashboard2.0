import React from 'react';
import { StyleSheet, View, Text, ViewStyle, TextStyle } from 'react-native';
import { colors, spacing, borderRadius, fontSize } from '../design';
import { useTheme } from '../context/ThemeContext';
import { Card } from './Card';
import { getSentimentLevel, getSentimentColor } from '../utils/homeScreenMetrics';

interface SentimentPairProps {
  agentEmotion: string;
  agentConfidence: number;
  clientEmotion: string;
  clientConfidence: number;
}

const getSentimentIcon = (level: string): string => {
  const iconMap: Record<string, string> = {
    'Very Negative': '😢',
    'Negative': '😐',
    'Neutral': '😑',
    'Positive': '🙂',
    'Very Positive': '😊',
    'Professional': '💼',
    'Empathetic': '❤️',
    'Polite': '👋',
    'Casual': '💬',
  };
  return iconMap[level] || '😐';
};

export const SentimentPair: React.FC<SentimentPairProps> = ({
  agentEmotion,
  agentConfidence,
  clientEmotion,
  clientConfidence,
}) => {
  const { effectiveTheme } = useTheme();
  const isDark = effectiveTheme === 'dark';
  const themeColors = isDark ? colors.dark : colors.light;

  const styles = StyleSheet.create({
    container: {
      marginBottom: spacing.lg,
    } as ViewStyle,
    title: {
      fontSize: 12,
      fontWeight: '600',
      color: themeColors.steelSecondary,
      marginBottom: spacing.md,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
      lineHeight: 18,
    } as TextStyle,
    grid: {
      flexDirection: 'row',
      gap: spacing.md,
    } as ViewStyle,
    card: {
      flex: 1,
      padding: spacing.lg,
      borderRadius: borderRadius.md,
      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.6)',
      borderWidth: 1,
      borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.8)',
    } as ViewStyle,
    label: {
      fontSize: fontSize.sm,
      fontWeight: '600',
      color: themeColors.steelSecondary,
      marginBottom: spacing.md,
      lineHeight: 18,
    } as TextStyle,
    sentimentTag: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.sm,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
      borderRadius: borderRadius.md,
      marginBottom: spacing.md,
      alignSelf: 'flex-start',
    } as ViewStyle,
    sentimentIcon: {
      fontSize: 18,
    } as TextStyle,
    sentimentText: {
      fontSize: fontSize.sm,
      fontWeight: '700',
      lineHeight: 18,
    } as TextStyle,
    percentage: {
      fontSize: fontSize.sm,
      fontWeight: '600',
      color: themeColors.steelSecondary,
      lineHeight: 18,
    } as TextStyle,
  });

  const agentLevel = getSentimentLevel(agentEmotion);
  const clientLevel = getSentimentLevel(clientEmotion);
  const agentColor = getSentimentColor(agentEmotion);
  const clientColor = getSentimentColor(clientEmotion);
  const agentIcon = getSentimentIcon(agentLevel);
  const clientIcon = getSentimentIcon(clientLevel);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sentiment Analysis</Text>
      <View style={styles.grid}>
        <Card style={styles.card}>
          <Text style={styles.label}>Agent Sentiment</Text>
          <View
            style={[
              styles.sentimentTag,
              {
                backgroundColor: `${agentColor}20`,
                borderWidth: 1,
                borderColor: agentColor,
              },
            ]}
          >
            <Text style={styles.sentimentIcon}>{agentIcon}</Text>
            <Text style={[styles.sentimentText, { color: agentColor }]}>
              {agentLevel}
            </Text>
          </View>
          <Text style={styles.percentage}>{agentConfidence}% confidence</Text>
        </Card>

        <Card style={styles.card}>
          <Text style={styles.label}>Client Sentiment</Text>
          <View
            style={[
              styles.sentimentTag,
              {
                backgroundColor: `${clientColor}20`,
                borderWidth: 1,
                borderColor: clientColor,
              },
            ]}
          >
            <Text style={styles.sentimentIcon}>{clientIcon}</Text>
            <Text style={[styles.sentimentText, { color: clientColor }]}>
              {clientLevel}
            </Text>
          </View>
          <Text style={styles.percentage}>{clientConfidence}% confidence</Text>
        </Card>
      </View>
    </View>
  );
};
