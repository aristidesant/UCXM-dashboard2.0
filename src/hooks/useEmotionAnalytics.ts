import { useState, useCallback } from 'react';

export interface EmotionAnalyticsFilters {
  agents: string[];
  clients: string[];
  callTypes: string[];
  callChannel: string[];
  campaignTypes: string[];
  campaignStatus: string[];
  dateRange: {
    start: string;
    end: string;
  };
}

const DEFAULT_FILTERS: EmotionAnalyticsFilters = {
  agents: [],
  clients: [],
  callTypes: [],
  callChannel: [],
  campaignTypes: [],
  campaignStatus: [],
  dateRange: {
    start: '',
    end: '',
  },
};

export const useEmotionAnalytics = () => {
  const [filters, setFilters] = useState<EmotionAnalyticsFilters>(DEFAULT_FILTERS);

  const updateFilter = useCallback(
    (filterKey: keyof EmotionAnalyticsFilters, value: any) => {
      setFilters((prev) => ({
        ...prev,
        [filterKey]: value,
      }));
    },
    []
  );

  const toggleAgentFilter = useCallback((agentId: string) => {
    setFilters((prev) => ({
      ...prev,
      agents: prev.agents.includes(agentId)
        ? prev.agents.filter((a) => a !== agentId)
        : [...prev.agents, agentId],
    }));
  }, []);

  const toggleClientFilter = useCallback((clientId: string) => {
    setFilters((prev) => ({
      ...prev,
      clients: prev.clients.includes(clientId)
        ? prev.clients.filter((c) => c !== clientId)
        : [...prev.clients, clientId],
    }));
  }, []);

  const toggleCallTypeFilter = useCallback((callType: string) => {
    setFilters((prev) => ({
      ...prev,
      callTypes: prev.callTypes.includes(callType)
        ? prev.callTypes.filter((c) => c !== callType)
        : [...prev.callTypes, callType],
    }));
  }, []);

  const toggleChannelFilter = useCallback((channel: string) => {
    setFilters((prev) => ({
      ...prev,
      callChannel: prev.callChannel.includes(channel)
        ? prev.callChannel.filter((c) => c !== channel)
        : [...prev.callChannel, channel],
    }));
  }, []);

  const toggleCampaignTypeFilter = useCallback((campaignType: string) => {
    setFilters((prev) => ({
      ...prev,
      campaignTypes: prev.campaignTypes.includes(campaignType)
        ? prev.campaignTypes.filter((c) => c !== campaignType)
        : [...prev.campaignTypes, campaignType],
    }));
  }, []);

  const toggleCampaignStatusFilter = useCallback((status: string) => {
    setFilters((prev) => ({
      ...prev,
      campaignStatus: prev.campaignStatus.includes(status)
        ? prev.campaignStatus.filter((s) => s !== status)
        : [...prev.campaignStatus, status],
    }));
  }, []);

  const setDateRange = useCallback((start: string, end: string) => {
    setFilters((prev) => ({
      ...prev,
      dateRange: { start, end },
    }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
  }, []);

  const hasActiveFilters = useCallback(() => {
    return (
      filters.agents.length > 0 ||
      filters.clients.length > 0 ||
      filters.callTypes.length > 0 ||
      filters.callChannel.length > 0 ||
      filters.campaignTypes.length > 0 ||
      filters.campaignStatus.length > 0 ||
      (filters.dateRange.start !== '' || filters.dateRange.end !== '')
    );
  }, [filters]);

  return {
    filters,
    updateFilter,
    toggleAgentFilter,
    toggleClientFilter,
    toggleCallTypeFilter,
    toggleChannelFilter,
    toggleCampaignTypeFilter,
    toggleCampaignStatusFilter,
    setDateRange,
    resetFilters,
    hasActiveFilters: hasActiveFilters(),
  };
};
