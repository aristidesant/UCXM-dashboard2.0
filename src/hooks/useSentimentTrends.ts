import { useMemo } from 'react';

export interface TrendData {
  value: number;
  trend7Day: number;
  trend30Day?: number;
  trendIndicator: '↑' | '↓' | '→';
  sparkline: number[];
}

export interface SentimentTrendMetrics {
  veryNegative: TrendData;
  negative: TrendData;
  neutral: TrendData;
  positive: TrendData;
  veryPositive: TrendData;
}

/**
 * Hook to calculate and format sentiment trend data
 * Converts raw counts and trends into display-ready format
 */
export const useSentimentTrends = (
  sentimentCounts: {
    veryNegative: number;
    negative: number;
    neutral: number;
    positive: number;
    veryPositive: number;
    trend: {
      veryNegative: number;
      negative: number;
      neutral: number;
      positive: number;
      veryPositive: number;
    };
  }
) => {
  return useMemo(() => {
    const getTrendIndicator = (trend: number): '↑' | '↓' | '→' => {
      if (trend > 2) return '↑';
      if (trend < -2) return '↓';
      return '→';
    };

    // Generate sparkline data (7-day simulated)
    const generateSparkline = (baseValue: number, trend: number): number[] => {
      const trend7 = Array.from({ length: 7 }, (_, i) => {
        const variation = Math.floor(baseValue * (trend / 100) * (i / 6));
        return Math.max(0, baseValue - Math.abs(trend) + variation);
      });
      return trend7;
    };

    return {
      veryNegative: {
        value: sentimentCounts.veryNegative,
        trend7Day: sentimentCounts.trend.veryNegative,
        trendIndicator: getTrendIndicator(sentimentCounts.trend.veryNegative),
        sparkline: generateSparkline(sentimentCounts.veryNegative, sentimentCounts.trend.veryNegative),
      } as TrendData,
      negative: {
        value: sentimentCounts.negative,
        trend7Day: sentimentCounts.trend.negative,
        trendIndicator: getTrendIndicator(sentimentCounts.trend.negative),
        sparkline: generateSparkline(sentimentCounts.negative, sentimentCounts.trend.negative),
      } as TrendData,
      neutral: {
        value: sentimentCounts.neutral,
        trend7Day: sentimentCounts.trend.neutral,
        trendIndicator: getTrendIndicator(sentimentCounts.trend.neutral),
        sparkline: generateSparkline(sentimentCounts.neutral, sentimentCounts.trend.neutral),
      } as TrendData,
      positive: {
        value: sentimentCounts.positive,
        trend7Day: sentimentCounts.trend.positive,
        trendIndicator: getTrendIndicator(sentimentCounts.trend.positive),
        sparkline: generateSparkline(sentimentCounts.positive, sentimentCounts.trend.positive),
      } as TrendData,
      veryPositive: {
        value: sentimentCounts.veryPositive,
        trend7Day: sentimentCounts.trend.veryPositive,
        trendIndicator: getTrendIndicator(sentimentCounts.trend.veryPositive),
        sparkline: generateSparkline(sentimentCounts.veryPositive, sentimentCounts.trend.veryPositive),
      } as TrendData,
    } as SentimentTrendMetrics;
  }, [sentimentCounts]);
};

/**
 * Hook to determine color for sentiment level based on value
 */
export const useSentimentLevelColors = () => {
  return useMemo(
    () => ({
      veryNegative: '#FF4D4F', // Red
      negative: '#FFC53D', // Orange
      neutral: '#8C8C8C', // Gray
      positive: '#52C41A', // Light Green
      veryPositive: '#1BB54A', // Dark Green
    }),
    []
  );
};

/**
 * Hook to format trend percentage for display
 */
export const useFormattedTrend = (trend: number): string => {
  return useMemo(() => {
    const sign = trend > 0 ? '+' : '';
    return `${sign}${trend}%`;
  }, [trend]);
};
