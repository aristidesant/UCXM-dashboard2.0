import React, { createContext, useState, useCallback } from 'react';

export type AnalysisType = 'operation' | 'qa' | 'emotion' | 'compliance' | 'insights';
export type CampaignTypeValue = 'outbound' | 'inbound' | 'mixta';
export type LOBValue = 'Ventas' | 'CxC' | 'Retención' | 'Localización' | 'Activación';
export type StatusValue = 'activa' | 'inactiva';

export interface GlobalAnalyticsFilters {
  dateRange: {
    from: Date;
    to: Date;
  };
  campaignTypes: CampaignTypeValue[];
  lobs: LOBValue[];
  statuses: StatusValue[];
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
  campaignTypes: [],
  lobs: [],
  statuses: [],
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
    filters.campaignTypes.length > 0 || filters.lobs.length > 0 || filters.statuses.length > 0
  );

  const getFilterSummary = useCallback(() => {
    const parts: string[] = [];

    if (filters.campaignTypes.length > 0) {
      parts.push(`Campañas: ${filters.campaignTypes.join(', ')}`);
    }
    if (filters.lobs.length > 0) {
      parts.push(`LOB: ${filters.lobs.join(', ')}`);
    }
    if (filters.statuses.length > 0) {
      parts.push(`Estatus: ${filters.statuses.join(', ')}`);
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
