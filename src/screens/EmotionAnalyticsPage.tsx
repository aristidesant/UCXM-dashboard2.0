import React, { useState } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { usePlatform } from '../hooks/usePlatform';
import { spacing, colors } from '../design';
import { useEmotionAnalytics } from '../hooks/useEmotionAnalytics';
import { aggregatedMetrics } from '../data/aggregatedMetrics';
import { EmotionAnalyticsFilters } from '../components/EmotionAnalyticsFilters';
import { EmotionAnalyticsFilterModal } from '../components/EmotionAnalyticsFilterModal';
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
  const [showFilterModal, setShowFilterModal] = useState(false);

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
      {/* Desktop Filter Bar or Mobile Filter Button */}
      {!isMobile ? (
        <EmotionAnalyticsFilters
          filters={filters}
          onFilterChange={filterHandlers.updateFilter}
          onToggleAgent={filterHandlers.toggleAgentFilter}
          onToggleClient={filterHandlers.toggleClientFilter}
          onToggleCallType={filterHandlers.toggleCallTypeFilter}
          onToggleChannel={filterHandlers.toggleChannelFilter}
          onToggleCampaignType={filterHandlers.toggleCampaignTypeFilter}
          onToggleCampaignStatus={filterHandlers.toggleCampaignStatusFilter}
          onSetDateRange={filterHandlers.setDateRange}
          onReset={resetFilters}
        />
      ) : (
        <View style={{ paddingHorizontal: spacing.md, paddingVertical: spacing.sm }}>
          {/* Mobile filter button would go here */}
        </View>
      )}

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
              onOpenFilter={() => setShowFilterModal(true)}
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

      {/* Mobile Filter Modal */}
      {isMobile && showFilterModal && (
        <EmotionAnalyticsFilterModal
          filters={filters}
          onFilterChange={filterHandlers.updateFilter}
          onToggleAgent={filterHandlers.toggleAgentFilter}
          onToggleClient={filterHandlers.toggleClientFilter}
          onToggleCallType={filterHandlers.toggleCallTypeFilter}
          onToggleChannel={filterHandlers.toggleChannelFilter}
          onToggleCampaignType={filterHandlers.toggleCampaignTypeFilter}
          onToggleCampaignStatus={filterHandlers.toggleCampaignStatusFilter}
          onSetDateRange={filterHandlers.setDateRange}
          onReset={resetFilters}
          onClose={() => setShowFilterModal(false)}
        />
      )}
    </View>
  );
};
