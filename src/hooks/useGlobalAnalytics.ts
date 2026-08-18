import { useContext } from 'react';
import {
  GlobalAnalyticsContext,
  GlobalAnalyticsFilters,
  AnalysisType,
  CampaignTypeValue,
  LOBValue,
  StatusValue,
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
    updateCampaignType: (campaignType: CampaignTypeValue) => {
      const campaignTypes = filters.campaignTypes.includes(campaignType)
        ? filters.campaignTypes.filter(ct => ct !== campaignType)
        : [...filters.campaignTypes, campaignType];
      setFilters({ ...filters, campaignTypes });
    },
    updateLOB: (lob: LOBValue) => {
      const lobs = filters.lobs.includes(lob)
        ? filters.lobs.filter(l => l !== lob)
        : [...filters.lobs, lob];
      setFilters({ ...filters, lobs });
    },
    updateStatus: (status: StatusValue) => {
      const statuses = filters.statuses.includes(status)
        ? filters.statuses.filter(s => s !== status)
        : [...filters.statuses, status];
      setFilters({ ...filters, statuses });
    },
  };
};
