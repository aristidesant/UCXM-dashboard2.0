import React from 'react';
import { StyleSheet, View, Text, ViewStyle, TextStyle } from 'react-native';
import { colors, spacing, borderRadius, fontSize } from '../design';
import { useTheme } from '../context/ThemeContext';
import { Card } from './Card';
import { getSentimentLevel, getSentimentColor, getSentimentTrend } from '../utils/homeScreenMetrics';

interface SentimentPairProps {
  agentEmotion: string;
  agentConfidence: number;
  clientEmotion: string;
  clientConfidence: number;
}

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
      marginBottom: spacing.sm,
      lineHeight: 18,
    } as TextStyle,
    sentiment: {
      fontSize: fontSize.lg,
      fontWeight: '700',
      marginBottom: spacing.sm,
      lineHeight: 24,
    } as TextStyle,
    percentage: {
      fontSize: fontSize.sm,
      fontWeight: '600',
      color: themeColors.steelSecondary,
      marginTop: spacing.xs,
      lineHeight: 18,
    } as TextStyle,
    trend: {
      fontSize: 16,
      fontWeight: '700',
      marginRight: spacing.xs,
    } as TextStyle,
  });

  const agentLevel = getSentimentLevel(agentEmotion);
  const clientLevel = getSentimentLevel(clientEmotion);
  const agentColor = getSentimentColor(agentEmotion);
  const clientColor = getSentimentColor(clientEmotion);
  const agentTrend = getSentimentTrend(agentConfidence);
  const clientTrend = getSentimentTrend(clientConfidence);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sentiment Analysis</Text>
      <View style={styles.grid}>
        <Card style={styles.card}>
          <Text style={styles.label}>Agent Sentiment</Text>
          <Text style={[styles.sentiment, { color: agentColor }]}>
            {agentTrend} {agentLevel}
          </Text>
          <Text style={styles.percentage}>{agentConfidence}% confidence</Text>
        </Card>

        <Card style={styles.card}>
          <Text style={styles.label}>Client Sentiment</Text>
          <Text style={[styles.sentiment, { color: clientColor }]}>
            {clientTrend} {clientLevel}
          </Text>
          <Text style={styles.percentage}>{clientConfidence}% confidence</Text>
        </Card>
      </View>
    </View>
  );
};
