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

export interface OperationMetrics {
  calls: {
    totalOutgoing: number;
    totalAnswered: number;
    byLanguage: Array<{ language: string; quantity: number; percentage: number }>;
  };
  management: {
    escalationRate: { value: number; trend: number };
    conversionRate: { value: number; trend: number };
    contactRate: { value: number; trend: number };
    averageHandleTime: { minutes: number; seconds: number; trend: number };
    callsByDisposition: Array<{ disposition: string; count: number; percentage: number }>;
    firstCallResolution: { value: number; trend: number };
  };
  quality: {
    satisfaction: { rating: number; maxRating: number; trend: number };
  };
}

export type Metrics = QAMetrics | EmotionMetrics | ComplianceMetrics | OperationMetrics;

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
    operation: {
      calls: {
        totalOutgoing: 38500,
        totalAnswered: 28300,
        byLanguage: [
          { language: 'Inglés', quantity: 245, percentage: 62 },
          { language: 'Español', quantity: 150, percentage: 38 },
        ],
      },
      management: {
        escalationRate: { value: 73.5, trend: 0 },
        conversionRate: { value: 89.3, trend: 4.3 },
        contactRate: { value: 73.5, trend: 0 },
        averageHandleTime: { minutes: 4, seconds: 45, trend: 4.3 },
        callsByDisposition: [
          { disposition: 'Contacto efectivo', count: 180, percentage: 45 },
          { disposition: 'Contacto no efectivo', count: 128, percentage: 32 },
          { disposition: 'No contacto', count: 92, percentage: 23 },
        ],
        firstCallResolution: { value: 89.5, trend: 0 },
      },
      quality: {
        satisfaction: { rating: 4.6, maxRating: 5, trend: 2.8 },
      },
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
    operation: {
      calls: {
        totalOutgoing: 52000,
        totalAnswered: 45600,
        byLanguage: [
          { language: 'Inglés', quantity: 380, percentage: 58 },
          { language: 'Español', quantity: 220, percentage: 42 },
        ],
      },
      management: {
        escalationRate: { value: 65.2, trend: -2.1 },
        conversionRate: { value: 92.5, trend: 3.2 },
        contactRate: { value: 88.9, trend: 1.5 },
        averageHandleTime: { minutes: 4, seconds: 12, trend: 2.5 },
        callsByDisposition: [
          { disposition: 'Contacto efectivo', count: 320, percentage: 52 },
          { disposition: 'Contacto no efectivo', count: 180, percentage: 29 },
          { disposition: 'No contacto', count: 115, percentage: 19 },
        ],
        firstCallResolution: { value: 91.2, trend: 1.8 },
      },
      quality: {
        satisfaction: { rating: 4.8, maxRating: 5, trend: 3.1 },
      },
    },
  },
};
