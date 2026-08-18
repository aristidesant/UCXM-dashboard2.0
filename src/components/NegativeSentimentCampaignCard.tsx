import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
  FlatList,
} from 'react-native';
import { colors, spacing, borderRadius, fontSize } from '../design';
import { useTheme } from '../context/ThemeContext';
import { getEmotionLabel, getSentimentColor } from '../utils/homeScreenMetrics';
import { EmotionAnalyticsFilters } from '../hooks/useEmotionAnalytics';

interface CampaignData {
  id: string;
  name: string;
  emotion: string;
  emotionLabel: string;
  confidence: number;
  negativeCallCount: number;
  trend7Day: number;
}

interface NegativeSentimentCampaignCardProps {
  campaigns: CampaignData[];
  filters: EmotionAnalyticsFilters;
  onOpenFilter: () => void;
}

export const NegativeSentimentCampaignCard: React.FC<NegativeSentimentCampaignCardProps> = ({
  campaigns,
  filters,
  onOpenFilter,
}) => {
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
    card: {
      backgroundColor: isDark ? themeColors.canvasDark : themeColors.canvasLight,
      borderRadius: borderRadius.lg,
      padding: spacing.md,
      marginBottom: spacing.md,
      borderWidth: 1,
      borderColor: themeColors.whisperBorder,
    } as ViewStyle,
    cardHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: spacing.md,
    } as ViewStyle,
    campaignName: {
      fontSize: fontSize.md,
      fontWeight: '600',
      color: themeColors.inkPrimary,
      flex: 1,
      marginRight: spacing.md,
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
    cardContent: {
      gap: spacing.md,
    } as ViewStyle,
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
      fontSize: fontSize.md,
      fontWeight: '600',
      color: themeColors.inkPrimary,
    } as TextStyle,
    confidenceContainer: {
      flexDirection: 'column',
      gap: spacing.xs,
    } as ViewStyle,
    confidenceBar: {
      height: 6,
      backgroundColor: isDark ? themeColors.whisperBorder : colors.light.sunkenBase,
      borderRadius: borderRadius.sm,
      overflow: 'hidden',
    } as ViewStyle,
    confidenceFill: {
      height: '100%',
      backgroundColor: colors.light.newtechGreen,
    } as ViewStyle,
    confidenceLabel: {
      fontSize: fontSize.xs,
      color: themeColors.steelSecondary,
      fontWeight: '400',
    } as TextStyle,
    trendContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.sm,
    } as ViewStyle,
    trendIndicator: {
      fontSize: fontSize.lg,
      fontWeight: '600',
    } as TextStyle,
    trendPositive: {
      color: colors.light.newtechGreen,
    } as TextStyle,
    trendNegative: {
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
    filterButton: {
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.md,
      borderWidth: 1,
      borderColor: themeColors.whisperBorder,
      borderRadius: borderRadius.md,
      alignItems: 'center',
      marginBottom: spacing.md,
    } as ViewStyle,
    filterButtonText: {
      fontSize: fontSize.sm,
      fontWeight: '500',
      color: themeColors.steelSecondary,
    } as TextStyle,
  });

  const renderCard = ({ item }: { item: CampaignData }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.campaignName} numberOfLines={2}>
          {item.name}
        </Text>
        <View style={[styles.emotionBadge, { backgroundColor: getSentimentColor(item.emotion) }]}>
          <Text style={styles.emotionLabel}>{getEmotionLabel(item.emotion)}</Text>
        </View>
      </View>

      <View style={styles.cardContent}>
        {/* Llamadas Negativas */}
        <View style={styles.metricRow}>
          <Text style={styles.metricLabel}>Llamadas Negativas</Text>
          <Text style={styles.metricValue}>{item.negativeCallCount}</Text>
        </View>

        {/* Confianza */}
        <View style={styles.confidenceContainer}>
          <View style={styles.metricRow}>
            <Text style={styles.metricLabel}>Confianza</Text>
            <Text style={styles.metricValue}>{Math.round(item.confidence * 100)}%</Text>
          </View>
          <View style={styles.confidenceBar}>
            <View
              style={[
                styles.confidenceFill,
                { width: `${Math.round(item.confidence * 100)}%` },
              ]}
            />
          </View>
        </View>

        {/* Tendencia 7 días */}
        <View style={[styles.metricRow, { borderBottomWidth: 0 }]}>
          <Text style={styles.metricLabel}>Tendencia 7 días</Text>
          <View style={styles.trendContainer}>
            <Text
              style={[
                styles.trendIndicator,
                item.trend7Day > 0 ? styles.trendNegative : styles.trendPositive,
              ]}
            >
              {item.trend7Day > 0 ? '▲' : '▼'}
            </Text>
            <Text
              style={[
                styles.metricValue,
                item.trend7Day > 0 ? styles.trendNegative : styles.trendPositive,
              ]}
            >
              {Math.abs(item.trend7Day)}%
            </Text>
          </View>
        </View>
      </View>
    </View>
  );

  if (campaigns.length === 0) {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.filterButton} onPress={onOpenFilter} activeOpacity={0.7}>
          <Text style={styles.filterButtonText}>Abrir Filtros</Text>
        </TouchableOpacity>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No hay campañas con sentimiento negativo</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.filterButton} onPress={onOpenFilter} activeOpacity={0.7}>
        <Text style={styles.filterButtonText}>Filtros</Text>
      </TouchableOpacity>
      <FlatList
        data={campaigns}
        renderItem={renderCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        scrollEnabled={false}
      />
    </View>
  );
};
