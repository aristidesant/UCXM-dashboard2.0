import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { colors, spacing, borderRadius, fontSize } from '../../design';
import { useTheme } from '../../context/ThemeContext';
import { getEmotionLabel, getToneLabel, getSentimentLevel, getSentimentColor } from '../../utils/homeScreenMetrics';

interface SentimentEvaluationCardProps {
  agentSentiment?: string;
  agentEmotion?: string;
  clientSentiment?: string;
  clientEmotion?: string;
  agentTone?: { professional: number; empathetic: number; polite: number; casual: number };
}

export const SentimentEvaluationCard: React.FC<SentimentEvaluationCardProps> = ({
  agentSentiment = 'professional',
  agentEmotion = 'joy',
  clientSentiment = 'satisfaction',
  clientEmotion = 'satisfaction',
  agentTone = { professional: 45, empathetic: 30, polite: 20, casual: 5 },
}) => {
  const { effectiveTheme } = useTheme();
  const isDark = effectiveTheme === 'dark';
  const themeColors = isDark ? colors.dark : colors.light;

  const styles = StyleSheet.create({
    container: {
      backgroundColor: isDark ? themeColors.sunkenBase : themeColors.pureSurface,
      borderRadius: borderRadius.lg,
      padding: spacing.md,
      borderWidth: 1,
      borderColor: themeColors.whisperBorder,
    } as ViewStyle,
    section: {
      marginBottom: spacing.md,
      paddingBottom: spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: themeColors.whisperBorder,
    } as ViewStyle,
    lastSection: {
      marginBottom: 0,
      paddingBottom: 0,
      borderBottomWidth: 0,
    } as ViewStyle,
    sectionTitle: {
      fontSize: fontSize.xs,
      fontWeight: '600',
      color: themeColors.steelSecondary,
      marginBottom: spacing.sm,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    } as TextStyle,
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: spacing.sm,
    } as ViewStyle,
    label: {
      fontSize: fontSize.xs,
      color: themeColors.steelSecondary,
      fontWeight: '500',
    } as TextStyle,
    badge: {
      paddingHorizontal: spacing.sm,
      paddingVertical: spacing.xs,
      borderRadius: borderRadius.sm,
      backgroundColor: '#CCCCCC',
    } as ViewStyle,
    badgeText: {
      fontSize: fontSize.xs,
      fontWeight: '600',
      color: '#FFFFFF',
    } as TextStyle,
    toneSection: {
      marginTop: spacing.sm,
    } as ViewStyle,
    toneRow: {
      flexDirection: 'row',
      gap: spacing.xs,
      flexWrap: 'wrap',
      marginTop: spacing.sm,
    } as ViewStyle,
    tonePill: {
      paddingHorizontal: spacing.sm,
      paddingVertical: spacing.xs,
      borderRadius: borderRadius.sm,
      backgroundColor: isDark ? themeColors.canvasDark : colors.light.sunkenBase,
      marginBottom: spacing.xs,
    } as ViewStyle,
    tonePillText: {
      fontSize: fontSize.xs,
      fontWeight: '600',
      color: themeColors.inkPrimary,
    } as TextStyle,
  });

  const getSentimentBadgeColor = (sentiment: string): string => {
    return getSentimentColor(sentiment) || '#CCCCCC';
  };

  const getPrimaryTone = () => {
    if (!agentTone) return 'professional';
    const tones = Object.entries(agentTone).sort(([, a], [, b]) => b - a);
    return tones[0][0];
  };

  return (
    <View style={styles.container}>
      {/* Agent Sentiment */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Sentimiento del Agente</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Sentimiento:</Text>
          <View style={[styles.badge, { backgroundColor: getSentimentBadgeColor(agentSentiment) }]}>
            <Text style={styles.badgeText}>{getSentimentLevel(agentSentiment)}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Emoción:</Text>
          <View style={[styles.badge, { backgroundColor: getSentimentBadgeColor(agentEmotion) }]}>
            <Text style={styles.badgeText}>{getEmotionLabel(agentEmotion)}</Text>
          </View>
        </View>
      </View>

      {/* Client Sentiment */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Sentimiento del Cliente</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Sentimiento:</Text>
          <View style={[styles.badge, { backgroundColor: getSentimentBadgeColor(clientSentiment) }]}>
            <Text style={styles.badgeText}>{getSentimentLevel(clientSentiment)}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Emoción:</Text>
          <View style={[styles.badge, { backgroundColor: getSentimentBadgeColor(clientEmotion) }]}>
            <Text style={styles.badgeText}>{getEmotionLabel(clientEmotion)}</Text>
          </View>
        </View>
      </View>

      {/* Agent Tone */}
      <View style={[styles.section, styles.lastSection]}>
        <Text style={styles.sectionTitle}>Tono del Agente</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Predominante:</Text>
          <View style={[styles.badge, { backgroundColor: colors.light.newtechGreen }]}>
            <Text style={styles.badgeText}>{getToneLabel(getPrimaryTone())}</Text>
          </View>
        </View>
        <View style={styles.toneSection}>
          <Text style={styles.label}>Distribución:</Text>
          <View style={styles.toneRow}>
            {agentTone &&
              Object.entries(agentTone)
                .sort(([, a], [, b]) => b - a)
                .map(([tone, percentage]) => (
                  <View key={tone} style={styles.tonePill}>
                    <Text style={styles.tonePillText}>
                      {getToneLabel(tone)}: {percentage}%
                    </Text>
                  </View>
                ))}
          </View>
        </View>
      </View>
    </View>
  );
};
