import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle, FlatList } from 'react-native';
import { colors, spacing, fontSize, borderRadius } from '../design';
import { useTheme } from '../context/ThemeContext';
import { getEmotionLabel, getSentimentColor } from '../utils/homeScreenMetrics';

interface AgentSentiment {
  agentId: string;
  agentName: string;
  primaryEmotion: string;
  primaryEmotionLabel: string;
  sentimentScore: number;
  callCount: number;
  commonEmotions: Array<{
    emotion: string;
    label: string;
    percentage: number;
  }>;
}

interface EmotionAgentsViewProps {
  agents: AgentSentiment[];
}

export const EmotionAgentsView: React.FC<EmotionAgentsViewProps> = ({ agents }) => {
  const { effectiveTheme } = useTheme();
  const isDark = effectiveTheme === 'dark';
  const themeColors = isDark ? colors.dark : colors.light;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    } as ViewStyle,
    listContent: {
      paddingBottom: spacing.lg,
    } as ViewStyle,
    agentCard: {
      backgroundColor: isDark ? themeColors.sunkenBase : themeColors.pureSurface,
      borderRadius: borderRadius.lg,
      padding: spacing.md,
      marginBottom: spacing.md,
      borderWidth: 1,
      borderColor: themeColors.whisperBorder,
    } as ViewStyle,
    agentHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: spacing.md,
    } as ViewStyle,
    agentName: {
      fontSize: fontSize.md,
      fontWeight: '600',
      color: themeColors.inkPrimary,
      flex: 1,
    } as TextStyle,
    emotionBadge: {
      paddingVertical: spacing.xs,
      paddingHorizontal: spacing.sm,
      borderRadius: borderRadius.sm,
    } as ViewStyle,
    emotionLabel: {
      fontSize: fontSize.xs,
      fontWeight: '600',
      color: colors.light.canvasFrost,
    } as TextStyle,
    metricRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: spacing.sm,
      borderBottomWidth: 1,
      borderBottomColor: themeColors.whisperBorder,
    } as ViewStyle,
    metricLabel: {
      fontSize: fontSize.sm,
      color: themeColors.steelSecondary,
      fontWeight: '500',
    } as TextStyle,
    metricValue: {
      fontSize: fontSize.sm,
      fontWeight: '600',
      color: themeColors.inkPrimary,
    } as TextStyle,
    emotionsContainer: {
      marginTop: spacing.md,
      gap: spacing.sm,
    } as ViewStyle,
    emotionItemRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: spacing.xs,
    } as ViewStyle,
    emotionItemLabel: {
      fontSize: fontSize.xs,
      color: themeColors.steelSecondary,
    } as TextStyle,
    emotionItemPercentage: {
      fontSize: fontSize.xs,
      fontWeight: '600',
      color: themeColors.inkPrimary,
    } as TextStyle,
  });

  const renderAgent = ({ item }: { item: AgentSentiment }) => (
    <View style={styles.agentCard}>
      <View style={styles.agentHeader}>
        <Text style={styles.agentName}>{item.agentName}</Text>
        <View
          style={[
            styles.emotionBadge,
            { backgroundColor: getSentimentColor(item.primaryEmotion) },
          ]}
        >
          <Text style={styles.emotionLabel}>{item.primaryEmotionLabel}</Text>
        </View>
      </View>

      <View style={styles.metricRow}>
        <Text style={styles.metricLabel}>Llamadas</Text>
        <Text style={styles.metricValue}>{item.callCount}</Text>
      </View>

      <View style={[styles.metricRow, { borderBottomWidth: 0 }]}>
        <Text style={styles.metricLabel}>Score Sentimiento</Text>
        <Text style={styles.metricValue}>{Math.round(item.sentimentScore)}%</Text>
      </View>

      <View style={styles.emotionsContainer}>
        <Text
          style={[
            styles.metricLabel,
            { marginBottom: spacing.sm, fontWeight: '600' },
          ]}
        >
          Emociones Comunes
        </Text>
        {item.commonEmotions.map((emotion, idx) => (
          <View key={idx} style={styles.emotionItemRow}>
            <Text style={styles.emotionItemLabel}>{emotion.label}</Text>
            <Text style={styles.emotionItemPercentage}>{emotion.percentage}%</Text>
          </View>
        ))}
      </View>
    </View>
  );

  if (agents.length === 0) {
    return (
      <View style={styles.container}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: themeColors.steelSecondary }}>
            No hay datos de agentes disponibles
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={agents}
        renderItem={renderAgent}
        keyExtractor={(item) => item.agentId}
        contentContainerStyle={styles.listContent}
        scrollEnabled={false}
      />
    </View>
  );
};
