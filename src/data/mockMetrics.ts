// src/data/mockMetrics.ts

import { InfoType } from '../context/AppContext';

export interface QAMetrics {
  // Analysis distribution
  effectiveContacts: number;
  ineffectiveContacts: number;
  effectivePercentage: number;

  // Error metrics
  ecn: { name: string; value: number; threshold: number; status: 'ok' | 'warning' | 'critical' }; // Error crítico de negocio
  enc: { name: string; value: number; threshold: number; status: 'ok' | 'warning' | 'critical' }; // Error no crítico
  ecc: { name: string; value: number; threshold: number; status: 'ok' | 'warning' | 'critical' }; // Error crítico de cumplimiento
  ecuf: { name: string; value: number; threshold: number; status: 'ok' | 'warning' | 'critical' }; // Error crítico usuario final

  // Legacy fields for backward compatibility
  contactPercentage?: number;
  voiceMailboxPercentage?: number;
  totalAnalyzed?: number;
  trend?: number[];
  results?: { effective: number; ineffective: number };
}

export interface EmotionMetrics {
  // Agent emotion
  agentPredominantEmotion: string;
  agentConfidenceScore: number; // 0-100

  // Client emotion
  clientPredominantEmotion: string;
  clientConfidenceScore: number; // 0-100

  // Emotion distribution
  emotionDistribution: Record<string, number>; // e.g., { joy: 20, neutral: 30, anger: 2, frustration: 1, ... }

  // Agent tone distribution
  agentToneDistribution: {
    professional: number;
    empathetic: number;
    polite: number;
    casual: number;
  };

  // Legacy fields for backward compatibility
  sentiment?: 'positive' | 'neutral' | 'negative';
  score?: number;
  breakdown?: Record<string, number>;
  trend?: number[];
}

export interface ComplianceMetrics {
  // Core metrics
  complianceScore: number; // Overall compliance percentage
  adherenceRate: number; // % of calls following compliance rules
  violationCount: number;

  // Compliance areas
  dataProtection: { score: number; violations: number };
  recordingCompliance: { score: number; violations: number };
  disclosureCompliance: { score: number; violations: number };
  regulatoryRequirements: { score: number; violations: number };

  // Risk indicators
  highRiskCalls: number;
  lowRiskCalls: number;

  // Legacy fields for backward compatibility
  violations?: number;
  coverage?: number;
  trend?: number[];
  alerts?: string[];
}

export interface BusinessInsightsMetrics {
  // Revenue metrics
  potentialRevenue: number;
  revenuePerCall: number;
  conversionOpportunities: number;

  // Customer metrics
  customerSatisfactionScore: number; // 0-100
  netPromoterScore: number; // -100 to +100
  churnRisk: number; // percentage

  // Efficiency metrics
  agentProductivity: number; // calls per hour
  averageHandlingTime: number; // seconds
  costPerCall: number;

  // Trend data
  revenueGrowth: number; // % week-over-week
  satisfactionTrend: number[];
  productivityTrend: number[];
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

export type Metrics = QAMetrics | EmotionMetrics | ComplianceMetrics | OperationMetrics | BusinessInsightsMetrics;

export const mockMetrics: Record<string, Record<InfoType, Metrics>> = {
  'loc-1': {
    qa: {
      effectiveContacts: 76,
      ineffectiveContacts: 19,
      effectivePercentage: 80,
      ecn: { name: 'Error crítico de negocio', value: 92, threshold: 90, status: 'ok' },
      enc: { name: 'Error no crítico', value: 87, threshold: 85, status: 'ok' },
      ecc: { name: 'Error crítico de cumplimiento', value: 100, threshold: 100, status: 'ok' },
      ecuf: { name: 'Error crítico usuario final', value: 99, threshold: 98, status: 'ok' },
      // Legacy for backward compatibility
      contactPercentage: 70,
      voiceMailboxPercentage: 0,
      totalAnalyzed: 10,
      trend: [0.2, 1, 3, 5, 5.5, 5.8, 4.5],
      results: { effective: 7, ineffective: 3 },
    },
    emotion: {
      agentPredominantEmotion: 'professional',
      agentConfidenceScore: 87,
      clientPredominantEmotion: 'satisfied',
      clientConfidenceScore: 92,
      emotionDistribution: { joy: 20, satisfaction: 35, neutral: 30, frustration: 10, anger: 5 },
      agentToneDistribution: {
        professional: 45,
        empathetic: 30,
        polite: 20,
        casual: 5,
      },
      // Legacy for backward compatibility
      sentiment: 'positive',
      score: 8.5,
      breakdown: { positive: 65, neutral: 25, negative: 10 },
      trend: [6, 6.5, 7, 7.8, 8.2, 8.5, 8.3],
    },
    compliance: {
      complianceScore: 94,
      adherenceRate: 93,
      violationCount: 2,
      dataProtection: { score: 96, violations: 0 },
      recordingCompliance: { score: 92, violations: 2 },
      disclosureCompliance: { score: 95, violations: 0 },
      regulatoryRequirements: { score: 94, violations: 0 },
      highRiskCalls: 3,
      lowRiskCalls: 92,
      // Legacy for backward compatibility
      violations: 2,
      coverage: 95,
      trend: [90, 91, 92, 94, 95, 95, 95],
      alerts: ['Rule A violated twice', 'Coverage target met'],
    },
    insights: {
      potentialRevenue: 145000,
      revenuePerCall: 1850,
      conversionOpportunities: 23,
      customerSatisfactionScore: 87,
      netPromoterScore: 62,
      churnRisk: 8,
      agentProductivity: 14.5,
      averageHandlingTime: 285,
      costPerCall: 12.50,
      revenueGrowth: 12.5,
      satisfactionTrend: [82, 83, 85, 86, 87, 88, 87],
      productivityTrend: [13.2, 13.8, 14.0, 14.2, 14.4, 14.5, 14.3],
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
      effectiveContacts: 17,
      ineffectiveContacts: 3,
      effectivePercentage: 85,
      ecn: { name: 'Error crítico de negocio', value: 88, threshold: 90, status: 'warning' },
      enc: { name: 'Error no crítico', value: 84, threshold: 85, status: 'warning' },
      ecc: { name: 'Error crítico de cumplimiento', value: 98, threshold: 100, status: 'ok' },
      ecuf: { name: 'Error crítico usuario final', value: 96, threshold: 98, status: 'ok' },
      // Legacy for backward compatibility
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
