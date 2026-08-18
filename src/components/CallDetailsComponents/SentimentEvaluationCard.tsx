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
import { getEmotionLabel, getToneLabel } from '../../utils/homeScreenMetrics';

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
    } as ViewStyle,
    lastSection: {
      marginBottom: 0,
    } as ViewStyle,
    sectionTitle: {
      fontSize: fontSize.sm,
      fontWeight: '600',
      color: themeColors.steelSecondary,
      marginBottom: spacing.sm,
      textTransform: 'uppercase',
    } as TextStyle,
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: spacing.xs,
    } as ViewStyle,
    label: {
      fontSize: fontSize.xs,
      color: themeColors.steelSecondary,
      fontWeight: '500',
    } as TextStyle,
    value: {
      fontSize: fontSize.sm,
      fontWeight: '700',
      color: themeColors.inkPrimary,
    } as TextStyle,
    toneDistribution: {
      flexDirection: 'row',
      gap: spacing.xs,
      marginTop: spacing.sm,
    } as ViewStyle,
    tonePill: {
      paddingHorizontal: spacing.sm,
      paddingVertical: spacing.xs,
      borderRadius: borderRadius.sm,
      backgroundColor: isDark ? themeColors.canvasDark : colors.light.sunkenBase,
    } as ViewStyle,
    tonePillText: {
      fontSize: fontSize.xs,
      fontWeight: '600',
      color: themeColors.inkPrimary,
    } as TextStyle,
  });

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
          <Text style={styles.value}>{getEmotionLabel(agentSentiment)}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Emoción:</Text>
          <Text style={styles.value}>{getEmotionLabel(agentEmotion)}</Text>
        </View>
      </View>

      {/* Client Sentiment */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Sentimiento del Cliente</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Sentimiento:</Text>
          <Text style={styles.value}>{getEmotionLabel(clientSentiment)}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Emoción:</Text>
          <Text style={styles.value}>{getEmotionLabel(clientEmotion)}</Text>
        </View>
      </View>

      {/* Agent Tone */}
      <View style={[styles.section, styles.lastSection]}>
        <Text style={styles.sectionTitle}>Tono del Agente</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Predominante:</Text>
          <Text style={styles.value}>{getToneLabel(getPrimaryTone())}</Text>
        </View>
        <View style={styles.toneDistribution}>
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
  );
};
