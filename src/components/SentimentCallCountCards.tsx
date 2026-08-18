import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { colors, spacing, fontSize, borderRadius } from '../design';
import { useTheme } from '../context/ThemeContext';
import { usePlatform } from '../hooks/usePlatform';

interface SentimentCallCountCardsProps {
  sentimentCounts: {
    veryNegative: number;
    negative: number;
    neutral: number;
    positive: number;
    veryPositive: number;
    trend: Record<string, number>;
  };
}

export const SentimentCallCountCards: React.FC<SentimentCallCountCardsProps> = ({
  sentimentCounts,
}) => {
  const { platform } = usePlatform();
  const { effectiveTheme } = useTheme();
  const isMobile = platform === 'mobile';
  const isDark = effectiveTheme === 'dark';
  const themeColors = isDark ? colors.dark : colors.light;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    } as ViewStyle,
    gridContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: spacing.md,
    } as ViewStyle,
    card: {
      flex: isMobile ? 1 : 0.48,
      backgroundColor: isDark ? themeColors.canvasDark : themeColors.canvasLight,
      borderRadius: borderRadius.lg,
      padding: spacing.lg,
      borderWidth: 1,
      borderColor: themeColors.whisperBorder,
    } as ViewStyle,
    title: {
      fontSize: fontSize.sm,
      fontWeight: '500',
      color: themeColors.steelSecondary,
      marginBottom: spacing.md,
    } as TextStyle,
    count: {
      fontSize: fontSize.xl,
      fontWeight: '700',
      color: themeColors.inkPrimary,
    } as TextStyle,
  });

  const cardConfig = [
    {
      title: 'Llamadas Muy Negativas',
      value: sentimentCounts.veryNegative,
      color: '#FF4D4F',
    },
    {
      title: 'Llamadas Negativas',
      value: sentimentCounts.negative,
      color: '#FFC53D',
    },
    {
      title: 'Llamadas Neutral',
      value: sentimentCounts.neutral,
      color: '#8C8C8C',
    },
    {
      title: 'Llamadas Positivas',
      value: sentimentCounts.positive,
      color: '#52C41A',
    },
    {
      title: 'Llamadas Muy Positivas',
      value: sentimentCounts.veryPositive,
      color: '#1BB54A',
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.gridContainer}>
        {cardConfig.map((item, idx) => (
          <View key={idx} style={[styles.card, { borderLeftWidth: 4, borderLeftColor: item.color }]}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={[styles.count, { color: item.color }]}>{item.value}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};
