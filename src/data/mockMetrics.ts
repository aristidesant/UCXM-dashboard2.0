// src/data/mockMetrics.ts

import { InfoType } from '../context/AppContext';

export interface QAMetrics {
  contactPercentage: number;
  voiceMailboxPercentage: number;
  totalAnalyzed: number;
  trend: number[];
  results: { effective: number; ineffective: number };
}

export interface EmotionMetrics {
  sentiment: 'positive' | 'neutral' | 'negative';
  score: number;
  breakdown: Record<string, number>;
  trend: number[];
}

export interface ComplianceMetrics {
  violations: number;
  coverage: number;
  trend: number[];
  alerts: string[];
}

export type Metrics = QAMetrics | EmotionMetrics | ComplianceMetrics;

export const mockMetrics: Record<string, Record<InfoType, Metrics>> = {
  'loc-1': {
    qa: {
      contactPercentage: 70,
      voiceMailboxPercentage: 0,
      totalAnalyzed: 10,
      trend: [0.2, 1, 3, 5, 5.5, 5.8, 4.5],
      results: { effective: 7, ineffective: 3 },
    },
    emotion: {
      sentiment: 'positive',
      score: 8.5,
      breakdown: { positive: 65, neutral: 25, negative: 10 },
      trend: [6, 6.5, 7, 7.8, 8.2, 8.5, 8.3],
    },
    compliance: {
      violations: 2,
      coverage: 95,
      trend: [90, 91, 92, 94, 95, 95, 95],
      alerts: ['Rule A violated twice', 'Coverage target met'],
    },
  },
  'loc-mayo': {
    qa: {
      contactPercentage: 85,
      voiceMailboxPercentage: 5,
      totalAnalyzed: 20,
      trend: [1, 3, 8, 15, 18, 20, 22],
      results: { effective: 17, ineffective: 3 },
    },
    emotion: {
      sentiment: 'positive',
      score: 9.0,
      breakdown: { positive: 75, neutral: 20, negative: 5 },
      trend: [7, 7.5, 8, 8.5, 8.8, 9.0, 8.9],
    },
    compliance: {
      violations: 0,
      coverage: 100,
      trend: [95, 96, 97, 98, 99, 100, 100],
      alerts: ['All compliance rules met'],
    },
  },
};
