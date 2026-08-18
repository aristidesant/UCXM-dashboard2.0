import React, { createContext, useState, useCallback } from 'react';

export type AnalysisType = 'operation' | 'qa' | 'emotion' | 'compliance' | 'insights';
export type CampaignType = 'outbound' | 'inbound' | 'mixta' | null;
export type LOB = 'Ventas' | 'CxC' | 'Retención' | 'Localización' | 'Activación' | null;
export type Status = 'activa' | 'inactiva' | null;

export interface GlobalAnalyticsFilters {
  dateRange: {
    from: Date;
    to: Date;
  };
  campaignType: CampaignType;
  lob: LOB;
  status: Status;
}

interface GlobalAnalyticsContextType {
  filters: GlobalAnalyticsFilters;
  selectedAnalysis: AnalysisType;
  setFilters: (filters: GlobalAnalyticsFilters) => void;
  setSelectedAnalysis: (analysis: AnalysisType) => void;
  clearFilters: () => void;
  hasActiveFilters: boolean;
  getFilterSummary: () => string;
}

const defaultFilters: GlobalAnalyticsFilters = {
  dateRange: {
    from: new Date(new Date().setDate(new Date().getDate() - 7)),
    to: new Date(),
  },
  campaignType: null,
  lob: null,
  status: null,
};

export const GlobalAnalyticsContext = createContext<GlobalAnalyticsContextType | undefined>(
  undefined
);

export const GlobalAnalyticsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [filters, setFilters] = useState<GlobalAnalyticsFilters>(defaultFilters);
  const [selectedAnalysis, setSelectedAnalysis] = useState<AnalysisType>('operation');

  const clearFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  const hasActiveFilters = Boolean(
    filters.campaignType || filters.lob || filters.status
  );

  const getFilterSummary = useCallback(() => {
    const parts: string[] = [];

    if (filters.campaignType) {
      parts.push(`Campaña: ${filters.campaignType}`);
    }
    if (filters.lob) {
      parts.push(`LOB: ${filters.lob}`);
    }
    if (filters.status) {
      parts.push(`Estatus: ${filters.status}`);
    }

    if (parts.length === 0) {
      return 'Sin filtros aplicados';
    }

    return parts.join(' • ');
  }, [filters]);

  const value: GlobalAnalyticsContextType = {
    filters,
    selectedAnalysis,
    setFilters,
    setSelectedAnalysis,
    clearFilters,
    hasActiveFilters,
    getFilterSummary,
  };

  return (
    <GlobalAnalyticsContext.Provider value={value}>
      {children}
    </GlobalAnalyticsContext.Provider>
  );
};
