// src/hooks/useMockData.ts

import { InfoType } from '../context/AppContext';
import { mockMetrics, Metrics } from '../data/mockMetrics';

export const useMockData = (dashboardId: string, infoType: InfoType): Metrics | null => {
  if (!dashboardId || !mockMetrics[dashboardId]) {
    return null;
  }
  return mockMetrics[dashboardId][infoType];
};
