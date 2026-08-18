import React, { useMemo, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
  ScrollView,
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

interface NegativeSentimentCampaignTableProps {
  campaigns: CampaignData[];
  filters: EmotionAnalyticsFilters;
}

type SortKey = 'name' | 'emotion' | 'calls' | 'trend';

export const NegativeSentimentCampaignTable: React.FC<NegativeSentimentCampaignTableProps> = ({
  campaigns,
  filters,
}) => {
  const { effectiveTheme } = useTheme();
  const isDark = effectiveTheme === 'dark';
  const themeColors = isDark ? colors.dark : colors.light;

  const [sortBy, setSortBy] = useState<SortKey>('calls');
  const [sortAsc, setSortAsc] = useState(false);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    } as ViewStyle,
    scrollContainer: {
      flex: 1,
      borderWidth: 1,
      borderColor: themeColors.whisperBorder,
      borderRadius: borderRadius.lg,
      overflow: 'hidden',
    } as ViewStyle,
    tableHeader: {
      flexDirection: 'row',
      backgroundColor: isDark ? themeColors.canvasDark : colors.light.sunkenBase,
      borderBottomWidth: 1,
      borderBottomColor: themeColors.whisperBorder,
    } as ViewStyle,
    headerCell: {
      flex: 1,
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.md,
      justifyContent: 'center',
    } as ViewStyle,
    headerText: {
      fontSize: fontSize.sm,
      fontWeight: '600',
      color: themeColors.inkPrimary,
    } as TextStyle,
    tableRow: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: themeColors.whisperBorder,
      backgroundColor: isDark ? themeColors.canvasDark : themeColors.canvasFrost,
    } as ViewStyle,
    tableRowHover: {
      backgroundColor: isDark ? themeColors.whisperBorder : colors.light.sunkenBase,
    } as ViewStyle,
    tableCell: {
      flex: 1,
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.md,
      justifyContent: 'center',
    } as ViewStyle,
    campaignName: {
      fontSize: fontSize.sm,
      fontWeight: '500',
      color: themeColors.inkPrimary,
    } as TextStyle,
    emotionBadge: {
      paddingVertical: spacing.xs,
      paddingHorizontal: spacing.sm,
      borderRadius: borderRadius.sm,
      alignSelf: 'flex-start',
    } as ViewStyle,
    emotionLabel: {
      fontSize: fontSize.xs,
      fontWeight: '600',
      color: colors.light.canvasFrost,
    } as TextStyle,
    confidenceText: {
      fontSize: fontSize.sm,
      fontWeight: '400',
      color: themeColors.steelSecondary,
    } as TextStyle,
    callCount: {
      fontSize: fontSize.sm,
      fontWeight: '600',
      color: colors.light.newtechGreen,
    } as TextStyle,
    trendText: {
      fontSize: fontSize.sm,
      fontWeight: '500',
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
    } as TextStyle,
  });

  const sortedCampaigns = useMemo(() => {
    const sorted = [...campaigns].sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'emotion':
          comparison = a.emotion.localeCompare(b.emotion);
          break;
        case 'calls':
          comparison = a.negativeCallCount - b.negativeCallCount;
          break;
        case 'trend':
          comparison = a.trend7Day - b.trend7Day;
          break;
      }

      return sortAsc ? comparison : -comparison;
    });

    return sorted;
  }, [campaigns, sortBy, sortAsc]);

  const handleSort = (key: SortKey) => {
    if (sortBy === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortBy(key);
      setSortAsc(false);
    }
  };

  if (campaigns.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No hay campañas con sentimiento negativo</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer} horizontal showsHorizontalScrollIndicator={false}>
        <View>
          {/* Table Header */}
          <View style={styles.tableHeader}>
            <TouchableOpacity
              style={[styles.headerCell, { flex: 2 }]}
              onPress={() => handleSort('name')}
              activeOpacity={0.7}
            >
              <Text style={styles.headerText}>Campaña {sortBy === 'name' ? (sortAsc ? '↑' : '↓') : ''}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.headerCell}
              onPress={() => handleSort('emotion')}
              activeOpacity={0.7}
            >
              <Text style={styles.headerText}>Emoción {sortBy === 'emotion' ? (sortAsc ? '↑' : '↓') : ''}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.headerCell}
              onPress={() => handleSort('calls')}
              activeOpacity={0.7}
            >
              <Text style={styles.headerText}>Llamadas {sortBy === 'calls' ? (sortAsc ? '↑' : '↓') : ''}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.headerCell}
              onPress={() => handleSort('trend')}
              activeOpacity={0.7}
            >
              <Text style={styles.headerText}>Tendencia {sortBy === 'trend' ? (sortAsc ? '↑' : '↓') : ''}</Text>
            </TouchableOpacity>
          </View>

          {/* Table Rows */}
          {sortedCampaigns.map((campaign) => (
            <View key={campaign.id} style={styles.tableRow}>
              <View style={[styles.tableCell, { flex: 2 }]}>
                <Text style={styles.campaignName}>{campaign.name}</Text>
              </View>
              <View style={styles.tableCell}>
                <View
                  style={[
                    styles.emotionBadge,
                    { backgroundColor: getSentimentColor(campaign.emotion) },
                  ]}
                >
                  <Text style={styles.emotionLabel}>{getEmotionLabel(campaign.emotion)}</Text>
                </View>
                <Text style={styles.confidenceText}>
                  Confianza: {Math.round(campaign.confidence * 100)}%
                </Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.callCount}>{campaign.negativeCallCount}</Text>
              </View>
              <View style={styles.tableCell}>
                <Text
                  style={[
                    styles.trendText,
                    campaign.trend7Day > 0 ? styles.trendNegative : styles.trendPositive,
                  ]}
                >
                  {campaign.trend7Day > 0 ? '+' : ''}{campaign.trend7Day}%
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};
