import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { colors } from '../design';
import { CampaignPerformanceCard } from '../components/CampaignPerformanceCard';
import { AgentSentimentCard } from '../components/AgentSentimentCard';
import { ClientSentimentCard } from '../components/ClientSentimentCard';
import { QAIssuesCard } from '../components/QAIssuesCard';

// Mock data
const mockCampaignData = {
  best: [
    {
      id: 'camp-1',
      name: 'VIP account services',
      callVolume: 2845,
      complianceViolations: 3,
      performance: 'best' as const,
    },
    {
      id: 'camp-2',
      name: 'Technical support',
      callVolume: 2156,
      complianceViolations: 8,
      performance: 'best' as const,
    },
    {
      id: 'camp-3',
      name: 'General inquiries',
      callVolume: 1923,
      complianceViolations: 12,
      performance: 'best' as const,
    },
  ],
  lowest: [
    {
      id: 'camp-4',
      name: 'Billing support Q3',
      callVolume: 1245,
      complianceViolations: 31,
      performance: 'lowest' as const,
    },
    {
      id: 'camp-5',
      name: 'Collections campaign',
      callVolume: 1089,
      complianceViolations: 42,
      performance: 'lowest' as const,
    },
    {
      id: 'camp-6',
      name: 'Renewal outreach',
      callVolume: 987,
      complianceViolations: 28,
      performance: 'lowest' as const,
    },
  ],
};

const mockQAIssues = [
  {
    category: 'Billing policy violations',
    count: 12,
    trend: 'up' as const,
  },
  {
    category: 'Negative sentiment escalations',
    count: 8,
    trend: 'down' as const,
  },
  {
    category: 'Documentation gaps',
    count: 6,
    trend: 'stable' as const,
  },
];

export const QADashboard: React.FC = () => {
  const { effectiveTheme } = useTheme();
  const isDark = effectiveTheme === 'dark';
  const themeColors = isDark ? colors.dark : colors.light;

  return (
    <div
      className="flex flex-col min-h-screen overflow-y-auto p-8"
      style={{ backgroundColor: themeColors.canvasFrost }}
    >
      {/* Header */}
      <div className="mb-12">
        <h1
          className="text-5xl font-bold mb-2"
          style={{ color: themeColors.inkPrimary }}
        >
          QA Analytics
        </h1>
        <p className="text-sm" style={{ color: themeColors.mutedSlate }}>
          Campaign performance and sentiment analysis
        </p>
      </div>

      {/* 2x2 Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Row 1 */}
        <div>
          <CampaignPerformanceCard
            bestPerforming={mockCampaignData.best}
            lowestPerforming={mockCampaignData.lowest}
          />
        </div>

        <div>
          <AgentSentimentCard score={8.3} />
        </div>

        {/* Row 2 */}
        <div>
          <ClientSentimentCard score={8.1} />
        </div>

        <div>
          <QAIssuesCard issues={mockQAIssues} />
        </div>
      </div>
    </div>
  );
};

export default QADashboard;
