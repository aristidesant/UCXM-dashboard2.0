import React, { useState } from 'react';
import { StyleSheet, View, ViewStyle, ScrollView } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { usePlatform } from '../hooks/usePlatform';
import { spacing, colors } from '../design';
import { EmotionAnalyticsTabFilters } from '../components/EmotionAnalyticsTabFilters';
import { EmotionAgentsView } from '../components/EmotionAgentsView';
import { EmotionClientsView } from '../components/EmotionClientsView';
import { EmotionCallsView } from '../components/EmotionCallsView';
import { EmotionCampaignsView } from '../components/EmotionCampaignsView';

type FilterTabId = 'agents' | 'clients' | 'calls' | 'campaigns';

export const EmotionAnalyticsPage: React.FC = () => {
  const { platform } = usePlatform();
  const { effectiveTheme } = useTheme();
  const isMobile = platform === 'mobile';
  const isDark = effectiveTheme === 'dark';
  const themeColors = isDark ? colors.dark : colors.light;

  const [activeTab, setActiveTab] = useState<FilterTabId>('agents');

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

  // Mock data for demo - replace with real data from API
  const mockAgentData = [
    {
      agentId: 'agent-1',
      agentName: 'Carlos Mendez',
      primaryEmotion: 'frustration',
      primaryEmotionLabel: 'Frustración',
      sentimentScore: 65,
      callCount: 145,
      commonEmotions: [
        { emotion: 'frustration', label: 'Frustración', percentage: 35 },
        { emotion: 'disappointment', label: 'Decepción', percentage: 25 },
        { emotion: 'neutral', label: 'Neutral', percentage: 20 },
        { emotion: 'satisfaction', label: 'Satisfacción', percentage: 20 },
      ],
    },
    {
      agentId: 'agent-2',
      agentName: 'María García',
      primaryEmotion: 'satisfaction',
      primaryEmotionLabel: 'Satisfacción',
      sentimentScore: 78,
      callCount: 132,
      commonEmotions: [
        { emotion: 'satisfaction', label: 'Satisfacción', percentage: 45 },
        { emotion: 'relief', label: 'Alivio', percentage: 30 },
        { emotion: 'joy', label: 'Alegría', percentage: 15 },
        { emotion: 'neutral', label: 'Neutral', percentage: 10 },
      ],
    },
  ];

  const mockCampaignData = [
    { id: 'loc', name: 'Localización', status: 'active' as const },
    { id: 'ret', name: 'Retención', status: 'active' as const },
    { id: 'eval', name: 'Evaluación', status: 'paused' as const },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'agents':
        return <EmotionAgentsView agents={mockAgentData} />;
      case 'clients':
        return (
          <EmotionClientsView
            veryNegativeCount={12}
            negativeCount={28}
            neutralCount={35}
            positiveCount={48}
            veryPositiveCount={31}
          />
        );
      case 'calls':
        return (
          <EmotionCallsView
            veryNegativeCount={45}
            negativeCount={87}
            neutralCount={156}
            positiveCount={234}
            veryPositiveCount={178}
          />
        );
      case 'campaigns':
        return <EmotionCampaignsView campaigns={mockCampaignData} />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {/* Tab Filters */}
      <EmotionAnalyticsTabFilters activeTab={activeTab} onSelectTab={setActiveTab} />

      {/* Content Area */}
      <ScrollView style={styles.contentContainer} showsVerticalScrollIndicator={false}>
        {renderContent()}
      </ScrollView>
    </View>
  );
};
