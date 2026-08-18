import React, { useMemo, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
} from 'react-native';
import { colors, spacing, fontSize, borderRadius } from '../design';
import { useTheme } from '../context/ThemeContext';
import { getEmotionLabel, getSentimentColor } from '../utils/homeScreenMetrics';
import { EmotionAnalyticsFilters } from '../hooks/useEmotionAnalytics';

interface WordPoolData {
  id: string;
  word: string;
  emotion: string;
  emotionLabel: string;
  frequency: number;
  context: string;
  lastDetected: string;
  trend7Day: number;
}

interface NegativeEmotionWordPoolProps {
  words: WordPoolData[];
  filters: EmotionAnalyticsFilters;
}

export const NegativeEmotionWordPool: React.FC<NegativeEmotionWordPoolProps> = ({
  words,
  filters,
}) => {
  const { effectiveTheme } = useTheme();
  const isDark = effectiveTheme === 'dark';
  const themeColors = isDark ? colors.dark : colors.light;
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    } as ViewStyle,
    emotionFilterContainer: {
      flexDirection: 'row',
      gap: spacing.sm,
      marginBottom: spacing.lg,
      flexWrap: 'wrap',
    } as ViewStyle,
    emotionTag: {
      paddingVertical: spacing.xs,
      paddingHorizontal: spacing.md,
      borderRadius: borderRadius.md,
      borderWidth: 1,
      borderColor: themeColors.whisperBorder,
    } as ViewStyle,
    emotionTagActive: {
      backgroundColor: themeColors.whisperBorder,
    } as ViewStyle,
    emotionTagText: {
      fontSize: fontSize.xs,
      fontWeight: '500',
      color: themeColors.steelSecondary,
    } as TextStyle,
    emotionTagTextActive: {
      color: colors.light.canvasFrost,
      fontWeight: '600',
    } as TextStyle,
    wordCard: {
      backgroundColor: isDark ? themeColors.sunkenBase : themeColors.pureSurface,
      borderRadius: borderRadius.lg,
      padding: spacing.md,
      marginBottom: spacing.md,
      borderLeftWidth: 4,
      borderWidth: 1,
      borderColor: themeColors.whisperBorder,
    } as ViewStyle,
    word: {
      fontSize: fontSize.md,
      fontWeight: '600',
      color: themeColors.inkPrimary,
      marginBottom: spacing.xs,
    } as TextStyle,
    emotion: {
      fontSize: fontSize.xs,
      fontWeight: '500',
      color: themeColors.steelSecondary,
      marginBottom: spacing.sm,
    } as TextStyle,
    context: {
      fontSize: fontSize.xs,
      fontWeight: '400',
      color: themeColors.steelSecondary,
      fontStyle: 'italic',
      marginBottom: spacing.sm,
    } as TextStyle,
    metricsRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    } as ViewStyle,
    frequency: {
      fontSize: fontSize.sm,
      fontWeight: '600',
      color: themeColors.inkPrimary,
    } as TextStyle,
    trend: {
      fontSize: fontSize.sm,
      fontWeight: '500',
    } as TextStyle,
    trendPositive: {
      color: '#FF4D4F',
    } as TextStyle,
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: spacing.xl,
    } as ViewStyle,
    emptyText: {
      fontSize: fontSize.sm,
      color: themeColors.steelSecondary,
      textAlign: 'center',
    } as TextStyle,
  });

  const filteredWords = useMemo(() => {
    if (selectedEmotion) {
      return words.filter((w) => w.emotion === selectedEmotion);
    }
    return words;
  }, [words, selectedEmotion]);

  const sortedWords = useMemo(() => {
    return [...filteredWords].sort((a, b) => b.frequency - a.frequency);
  }, [filteredWords]);

  const emotions = useMemo(() => {
    return Array.from(new Set(words.map((w) => w.emotion)));
  }, [words]);

  if (words.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No hay palabras/frases con emociones negativas</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Emotion Filter */}
      <View style={styles.emotionFilterContainer}>
        <TouchableOpacity
          style={[styles.emotionTag, !selectedEmotion && styles.emotionTagActive]}
          onPress={() => setSelectedEmotion(null)}
          activeOpacity={0.7}
        >
          <Text
            style={[styles.emotionTagText, !selectedEmotion && styles.emotionTagTextActive]}
          >
            Todas ({words.length})
          </Text>
        </TouchableOpacity>
        {emotions.map((emotion) => (
          <TouchableOpacity
            key={emotion}
            style={[styles.emotionTag, selectedEmotion === emotion && styles.emotionTagActive]}
            onPress={() => setSelectedEmotion(emotion)}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.emotionTagText,
                selectedEmotion === emotion && styles.emotionTagTextActive,
              ]}
            >
              {getEmotionLabel(emotion)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Words List */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {sortedWords.map((item) => (
          <View
            key={item.id}
            style={[
              styles.wordCard,
              { borderLeftColor: getSentimentColor(item.emotion) },
            ]}
          >
            <Text style={styles.word}>"{item.word}"</Text>
            <Text style={styles.emotion}>{getEmotionLabel(item.emotion)}</Text>
            <Text style={styles.context}>{item.context}</Text>
            <View style={styles.metricsRow}>
              <Text style={styles.frequency}>Frecuencia: {item.frequency}</Text>
              <Text style={[styles.trend, item.trend7Day > 0 && styles.trendPositive]}>
                {item.trend7Day > 0 ? '+' : ''}{item.trend7Day}%
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};
