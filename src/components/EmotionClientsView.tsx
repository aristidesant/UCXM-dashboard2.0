import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { colors, spacing, fontSize, borderRadius } from '../design';
import { useTheme } from '../context/ThemeContext';
import { usePlatform } from '../hooks/usePlatform';

interface EmotionClientsViewProps {
  veryNegativeCount: number;
  negativeCount: number;
  neutralCount: number;
  positiveCount: number;
  veryPositiveCount: number;
}

const SENTIMENT_LEVELS = [
  {
    label: 'Clientes Muy Negativos',
    color: '#FF4D4F',
    key: 'veryNegative',
  },
  {
    label: 'Clientes Negativos',
    color: '#FFC53D',
    key: 'negative',
  },
  {
    label: 'Clientes Neutral',
    color: '#8C8C8C',
    key: 'neutral',
  },
  {
    label: 'Clientes Positivos',
    color: '#52C41A',
    key: 'positive',
  },
  {
    label: 'Clientes Muy Positivos',
    color: '#1BB54A',
    key: 'veryPositive',
  },
];

export const EmotionClientsView: React.FC<EmotionClientsViewProps> = ({
  veryNegativeCount,
  negativeCount,
  neutralCount,
  positiveCount,
  veryPositiveCount,
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
      backgroundColor: isDark ? themeColors.sunkenBase : themeColors.pureSurface,
      borderRadius: borderRadius.lg,
      padding: spacing.lg,
      borderWidth: 1,
      borderColor: themeColors.whisperBorder,
      borderLeftWidth: 4,
    } as ViewStyle,
    label: {
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

  const counts = [
    veryNegativeCount,
    negativeCount,
    neutralCount,
    positiveCount,
    veryPositiveCount,
  ];

  return (
    <View style={styles.container}>
      <View style={styles.gridContainer}>
        {SENTIMENT_LEVELS.map((level, idx) => (
          <View
            key={level.key}
            style={[styles.card, { borderLeftColor: level.color }]}
          >
            <Text style={styles.label}>{level.label}</Text>
            <Text style={[styles.count, { color: level.color }]}>
              {counts[idx]}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};
