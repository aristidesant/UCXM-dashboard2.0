import React from 'react';
import { StyleSheet, View, Text, ViewStyle, TextStyle } from 'react-native';
import { colors, spacing, borderRadius, fontSize } from '../design';
import { useTheme } from '../context/ThemeContext';
import { Card } from './Card';
import { getSentimentLevel, getSentimentColor } from '../utils/homeScreenMetrics';
import {
  Frown,
  Meh,
  Smile,
  Laugh,
} from 'lucide-react';

interface SentimentPairProps {
  agentEmotion: string;
  agentConfidence: number;
  clientEmotion: string;
  clientConfidence: number;
}

const getSentimentIcon = (level: string): React.ReactNode => {
  const iconMap: Record<string, React.ReactNode> = {
    'Very Negative': <Frown size={24} strokeWidth={1.5} />,
    'Negative': <Meh size={24} strokeWidth={1.5} />,
    'Neutral': <Meh size={24} strokeWidth={1.5} />,
    'Positive': <Smile size={24} strokeWidth={1.5} />,
    'Very Positive': <Laugh size={24} strokeWidth={1.5} />,
  };
  return iconMap[level] || <Meh size={24} strokeWidth={1.5} />;
};

const getAnimationClass = (level: string): string => {
  if (level === 'Very Negative') return 'sentiment-cry';
  if (level === 'Positive') return 'sentiment-smile';
  if (level === 'Very Positive') return 'sentiment-excited';
  return 'sentiment-none';
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

  // Add inline styles for animations
  const animationStyles = `
    @keyframes cry {
      0%, 100% { transform: scaleY(1); }
      25% { transform: scaleY(1.1); }
      50% { transform: scaleY(0.95); }
      75% { transform: scaleY(1.05); }
    }
    @keyframes smile {
      0%, 100% { transform: scale(1) rotate(0deg); }
      50% { transform: scale(1.15) rotate(5deg); }
    }
    @keyframes excited {
      0%, 100% { transform: scale(1) translateY(0); }
      25% { transform: scale(1.2) translateY(-3px); }
      50% { transform: scale(1.15) translateY(0); }
      75% { transform: scale(1.2) translateY(-3px); }
    }
    .sentiment-cry { animation: cry 2s infinite; }
    .sentiment-smile { animation: smile 1.5s infinite; }
    .sentiment-excited { animation: excited 1.2s infinite; }
    .sentiment-none { animation: none; }
  `;

  return (
    <>
      <style>{animationStyles}</style>
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
              <View
                style={[styles.sentimentIconWrapper, { className: getAnimationClass(agentLevel) }]}
              >
                {React.cloneElement(agentIcon as React.ReactElement, {
                  color: agentColor,
                  strokeWidth: 1.5,
                })}
              </View>
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
              <View
                style={[styles.sentimentIconWrapper, { className: getAnimationClass(clientLevel) }]}
              >
                {React.cloneElement(clientIcon as React.ReactElement, {
                  color: clientColor,
                  strokeWidth: 1.5,
                })}
              </View>
              <Text style={[styles.sentimentText, { color: clientColor }]}>
                {clientLevel}
              </Text>
            </View>
            <Text style={styles.percentage}>{clientConfidence}% confidence</Text>
          </Card>
        </View>
      </View>
    </>
  );
};
