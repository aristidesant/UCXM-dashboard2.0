import React from 'react';
import { EmotionDistributionChart } from './EmotionDistributionChart';
import { EmotionAnalyticsFilters } from '../hooks/useEmotionAnalytics';

interface ClientData {
  clientSegment: string;
  sentiments: Record<string, number>;
  trend7Day?: Record<string, number>;
}

interface SentimentDistributionClientsProps {
  clients: ClientData[];
  filters: EmotionAnalyticsFilters;
}

export const SentimentDistributionClients: React.FC<SentimentDistributionClientsProps> = ({
  clients,
  filters,
}) => {
  const chartData = clients.map((client) => ({
    name: client.clientSegment,
    sentiments: client.sentiments,
  }));

  return (
    <EmotionDistributionChart
      title="Distribución de Sentimientos por Clientes"
      data={chartData}
    />
  );
};
