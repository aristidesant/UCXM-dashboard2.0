import { useContext } from 'react';
import {
  GlobalAnalyticsContext,
  GlobalAnalyticsFilters,
  AnalysisType,
  CampaignType,
  LOB,
  Status,
} from '../contexts/GlobalAnalyticsContext';

export const useGlobalAnalytics = () => {
  const context = useContext(GlobalAnalyticsContext);

  if (!context) {
    throw new Error('useGlobalAnalytics must be used within GlobalAnalyticsProvider');
  }

  return context;
};

export const useUpdateFilters = () => {
  const { setFilters, filters } = useGlobalAnalytics();

  return {
    updateDateRange: (from: Date, to: Date) => {
      setFilters({ ...filters, dateRange: { from, to } });
    },
    updateCampaignType: (campaignType: CampaignType) => {
      setFilters({ ...filters, campaignType });
    },
    updateLOB: (lob: LOB) => {
      setFilters({ ...filters, lob });
    },
    updateStatus: (status: Status) => {
      setFilters({ ...filters, status });
    },
  };
};
