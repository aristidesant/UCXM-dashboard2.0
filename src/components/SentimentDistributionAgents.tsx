import React from 'react';
import { EmotionDistributionChart } from './EmotionDistributionChart';
import { EmotionAnalyticsFilters } from '../hooks/useEmotionAnalytics';

interface AgentData {
  agentId: string;
  agentName: string;
  sentiments: Record<string, number>;
  trend7Day?: Record<string, number>;
}

interface SentimentDistributionAgentsProps {
  agents: AgentData[];
  filters: EmotionAnalyticsFilters;
}

export const SentimentDistributionAgents: React.FC<SentimentDistributionAgentsProps> = ({
  agents,
  filters,
}) => {
  const chartData = agents.map((agent) => ({
    name: agent.agentName,
    sentiments: agent.sentiments,
  }));

  return (
    <EmotionDistributionChart
      title="Distribución de Sentimientos por Agentes"
      data={chartData}
    />
  );
};
