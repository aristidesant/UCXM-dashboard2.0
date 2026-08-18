import React, { useState } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { usePlatform } from '../hooks/usePlatform';
import { spacing, colors } from '../design';
import { useEmotionAnalytics } from '../hooks/useEmotionAnalytics';
import { aggregatedMetrics } from '../data/aggregatedMetrics';
import { EmotionAnalyticsTabFilters } from '../components/EmotionAnalyticsTabFilters';
import { NegativeSentimentCampaignTable } from '../components/NegativeSentimentCampaignTable';
import { NegativeSentimentCampaignCard } from '../components/NegativeSentimentCampaignCard';
import { SentimentCallCountCards } from '../components/SentimentCallCountCards';
import { SentimentDistributionAgents } from '../components/SentimentDistributionAgents';
import { SentimentDistributionClients } from '../components/SentimentDistributionClients';
import { NegativeEmotionWordPool } from '../components/NegativeEmotionWordPool';

type AnalyticsView = 'campaigns' | 'callCounts' | 'distributions' | 'wordPool';

export const EmotionAnalyticsPage: React.FC = () => {
  const { platform } = usePlatform();
  const { effectiveTheme } = useTheme();
  const isMobile = platform === 'mobile';
  const isDark = effectiveTheme === 'dark';
  const themeColors = isDark ? colors.dark : colors.light;

  const { filters, resetFilters, hasActiveFilters, ...filterHandlers } = useEmotionAnalytics();
  const [currentView, setCurrentView] = useState<AnalyticsView>('campaigns');

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: themeColors.canvasFrost,
    } as ViewStyle,
    contentContainer: {
      flex: 1,
      padding: isMobile ? spacing.md : spacing.lg,
    } as ViewStyle,
  });

  return (
    <View style={styles.container}>
      {/* Tab Filters - Works on All Platforms */}
      <EmotionAnalyticsTabFilters
        filters={filters}
        onToggleAgent={filterHandlers.toggleAgentFilter}
        onToggleClient={filterHandlers.toggleClientFilter}
        onToggleCallType={filterHandlers.toggleCallTypeFilter}
        onToggleChannel={filterHandlers.toggleChannelFilter}
        onReset={resetFilters}
      />

      {/* Content Area */}
      <View style={styles.contentContainer}>
        {currentView === 'campaigns' && (
          !isMobile ? (
            <NegativeSentimentCampaignTable
              campaigns={aggregatedMetrics.negativeSentimentCampaigns}
              filters={filters}
            />
          ) : (
            <NegativeSentimentCampaignCard
              campaigns={aggregatedMetrics.negativeSentimentCampaigns}
              filters={filters}
            />
          )
        )}

        {currentView === 'callCounts' && (
          <SentimentCallCountCards
            sentimentCounts={aggregatedMetrics.sentimentCallCounts}
          />
        )}

        {currentView === 'distributions' && (
          <View style={{ flex: 1 }}>
            <SentimentDistributionAgents
              agents={aggregatedMetrics.agentSentimentDistribution}
              filters={filters}
            />
            <SentimentDistributionClients
              clients={aggregatedMetrics.clientSentimentDistribution}
              filters={filters}
            />
          </View>
        )}

        {currentView === 'wordPool' && (
          <NegativeEmotionWordPool
            words={aggregatedMetrics.negativeEmotionWords}
            filters={filters}
          />
        )}
      </View>

    </View>
  );
};
