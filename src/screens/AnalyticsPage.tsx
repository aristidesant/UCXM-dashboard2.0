import React from 'react';
import { GlobalAnalyticsProvider } from '../contexts/GlobalAnalyticsContext';
import { GlobalAnalyticsPage } from './GlobalAnalyticsPage';

export const AnalyticsPage: React.FC = () => {
  return (
    <GlobalAnalyticsProvider>
      <GlobalAnalyticsPage />
    </GlobalAnalyticsProvider>
  );
};

export default AnalyticsPage;
