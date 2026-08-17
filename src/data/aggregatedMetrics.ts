// Aggregated metrics across all campaigns
import type {
  QAMetrics,
  EmotionMetrics,
  ComplianceMetrics,
  BusinessInsightsMetrics,
  OperationMetrics,
} from './mockMetrics';

export const aggregatedMetrics = {
  qa: {
    effectiveContacts: 238,
    ineffectiveContacts: 62,
    effectivePercentage: 79,
    ecn: { name: 'Error crítico de negocio', value: 91, threshold: 90, status: 'ok' as const },
    enc: { name: 'Error no crítico', value: 86, threshold: 85, status: 'ok' as const },
    ecc: { name: 'Error crítico de cumplimiento', value: 99, threshold: 100, status: 'ok' as const },
    ecuf: { name: 'Error crítico usuario final', value: 98, threshold: 98, status: 'ok' as const },
  } as QAMetrics,

  emotion: {
    agentPredominantEmotion: 'muy positivo',
    agentConfidenceScore: 85,
    clientPredominantEmotion: 'positivo',
    clientConfidenceScore: 90,
    emotionDistribution: {
      joy: 18,
      satisfaction: 38,
      neutral: 28,
      frustration: 12,
      anger: 4,
    },
    agentToneDistribution: {
      professional: 43,
      empathetic: 32,
      polite: 19,
      casual: 6,
    },
  } as EmotionMetrics,

  compliance: {
    complianceScore: 93,
    adherenceRate: 92,
    violationCount: 8,
    dataProtection: { score: 95, violations: 1 },
    recordingCompliance: { score: 91, violations: 3 },
    disclosureCompliance: { score: 94, violations: 2 },
    regulatoryRequirements: { score: 92, violations: 2 },
    highRiskCalls: 12,
    lowRiskCalls: 288,
  } as ComplianceMetrics,

  insights: {
    potentialRevenue: 456000,
    revenuePerCall: 1840,
    conversionOpportunities: 68,
    customerSatisfactionScore: 86,
    netPromoterScore: 59,
    churnRisk: 7,
    agentProductivity: 14.2,
    averageHandlingTime: 288,
    costPerCall: 12.75,
    revenueGrowth: 8.3,
    satisfactionTrend: [81, 82, 84, 85, 86, 87, 86],
    productivityTrend: [13.5, 13.8, 14.0, 14.1, 14.2, 14.2, 14.1],
  } as BusinessInsightsMetrics,

  operation: {
    calls: {
      totalOutgoing: 125400,
      totalAnswered: 92300,
      byLanguage: [
        { language: 'Inglés', quantity: 745, percentage: 61 },
        { language: 'Español', quantity: 455, percentage: 39 },
      ],
    },
    management: {
      escalationRate: { value: 72, trend: -2 },
      conversionRate: { value: 88.5, trend: 3.2 },
      contactRate: { value: 73.6, trend: 1.2 },
      averageHandleTime: { minutes: 4, seconds: 48, trend: 2.1 },
      callsByDisposition: [
        { disposition: 'Contacto efectivo', count: 560, percentage: 45 },
        { disposition: 'Contacto no efectivo', count: 400, percentage: 32 },
        { disposition: 'No contacto', count: 240, percentage: 23 },
      ],
      firstCallResolution: { value: 88.2, trend: 1.5 },
    },
    quality: {
      satisfaction: { rating: 4.5, maxRating: 5, trend: 2.1 },
    },
  } as OperationMetrics,
};
