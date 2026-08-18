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
    agentPredominantEmotion: 'joy',
    agentConfidenceScore: 85,
    clientPredominantEmotion: 'satisfaction',
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

  // Emotion Analytics - Macro View Data

  // Iteration 1: Campaigns with Negative Sentiment
  negativeSentimentCampaigns: [
    {
      id: 'loc-1',
      name: 'Localización',
      emotion: 'frustration',
      emotionLabel: 'Frustración',
      confidence: 0.72,
      negativeCallCount: 45,
      trend7Day: 5,
    },
    {
      id: 'loc-mayo',
      name: 'Localización Mayo',
      emotion: 'disappointment',
      emotionLabel: 'Decepción',
      confidence: 0.68,
      negativeCallCount: 32,
      trend7Day: -2,
    },
    {
      id: 'loc-june',
      name: 'Localización Junio',
      emotion: 'fear',
      emotionLabel: 'Miedo',
      confidence: 0.55,
      negativeCallCount: 18,
      trend7Day: 1,
    },
  ],

  // Iteration 2: Sentiment Call Counts
  sentimentCallCounts: {
    veryNegative: 125,
    negative: 287,
    neutral: 456,
    positive: 678,
    veryPositive: 345,
    trend: {
      veryNegative: 3,
      negative: -2,
      neutral: 0,
      positive: 5,
      veryPositive: 8,
    },
  },

  // Iteration 3: Distribution by Sentiment Level

  // Agent Sentiment Distribution
  agentSentimentDistribution: [
    {
      agentId: 'agent-1',
      agentName: 'Carlos Mendez',
      sentiments: { veryPositive: 35, positive: 45, neutral: 15, negative: 4, veryNegative: 1 },
      trend7Day: { veryPositive: 2, positive: 1, neutral: -1, negative: -1, veryNegative: -1 },
    },
    {
      agentId: 'agent-2',
      agentName: 'María García',
      sentiments: { veryPositive: 42, positive: 38, neutral: 12, negative: 6, veryNegative: 2 },
      trend7Day: { veryPositive: 3, positive: -2, neutral: 0, negative: 1, veryNegative: -2 },
    },
    {
      agentId: 'agent-3',
      agentName: 'Juan López',
      sentiments: { veryPositive: 28, positive: 42, neutral: 18, negative: 8, veryNegative: 4 },
      trend7Day: { veryPositive: 1, positive: 2, neutral: 1, negative: -1, veryNegative: -3 },
    },
    {
      agentId: 'agent-4',
      agentName: 'Sofia Ruiz',
      sentiments: { veryPositive: 38, positive: 40, neutral: 14, negative: 5, veryNegative: 3 },
      trend7Day: { veryPositive: 2, positive: 0, neutral: -1, negative: 0, veryNegative: -1 },
    },
  ],

  // Client Sentiment Distribution
  clientSentimentDistribution: [
    {
      clientSegment: 'Retail',
      sentiments: { veryPositive: 28, positive: 42, neutral: 20, negative: 8, veryNegative: 2 },
      trend7Day: { veryPositive: -1, positive: 0, neutral: 1, negative: 0, veryNegative: 0 },
    },
    {
      clientSegment: 'Finance',
      sentiments: { veryPositive: 35, positive: 38, neutral: 16, negative: 7, veryNegative: 4 },
      trend7Day: { veryPositive: 2, positive: -1, neutral: -1, negative: 1, veryNegative: -1 },
    },
    {
      clientSegment: 'Healthcare',
      sentiments: { veryPositive: 42, positive: 35, neutral: 12, negative: 8, veryNegative: 3 },
      trend7Day: { veryPositive: 3, positive: -2, neutral: -1, negative: 0, veryNegative: 0 },
    },
    {
      clientSegment: 'Tech',
      sentiments: { veryPositive: 38, positive: 40, neutral: 14, negative: 6, veryNegative: 2 },
      trend7Day: { veryPositive: 1, positive: 1, neutral: 0, negative: -1, veryNegative: -1 },
    },
  ],

  // Iteration 4: Negative Emotion Word Pool
  negativeEmotionWords: [
    {
      id: 'w1',
      word: 'Espera más',
      emotion: 'frustration',
      emotionLabel: 'Frustración',
      frequency: 128,
      context: 'Cliente espera demasiado tiempo en línea',
      lastDetected: '2026-08-18',
      trend7Day: 12,
    },
    {
      id: 'w2',
      word: 'No puedo ayudar',
      emotion: 'disappointment',
      emotionLabel: 'Decepción',
      frequency: 87,
      context: 'Agente no puede resolver el problema',
      lastDetected: '2026-08-18',
      trend7Day: 5,
    },
    {
      id: 'w3',
      word: 'Eso no es posible',
      emotion: 'fear',
      emotionLabel: 'Miedo',
      frequency: 64,
      context: 'Cliente teme que no se pueda completar la solicitud',
      lastDetected: '2026-08-17',
      trend7Day: 3,
    },
    {
      id: 'w4',
      word: 'Está complicado',
      emotion: 'frustration',
      emotionLabel: 'Frustración',
      frequency: 112,
      context: 'Cliente frustra con la complejidad del proceso',
      lastDetected: '2026-08-18',
      trend7Day: 8,
    },
    {
      id: 'w5',
      word: 'Perdí tiempo',
      emotion: 'disappointment',
      emotionLabel: 'Decepción',
      frequency: 76,
      context: 'Cliente se siente decepcionado por tiempo gastado',
      lastDetected: '2026-08-17',
      trend7Day: -2,
    },
    {
      id: 'w6',
      word: 'Tengo miedo de',
      emotion: 'fear',
      emotionLabel: 'Miedo',
      frequency: 45,
      context: 'Cliente expresa preocupación o miedo',
      lastDetected: '2026-08-16',
      trend7Day: 1,
    },
    {
      id: 'w7',
      word: 'No funciona',
      emotion: 'frustration',
      emotionLabel: 'Frustración',
      frequency: 156,
      context: 'Cliente frustrado porque sistema no funciona',
      lastDetected: '2026-08-18',
      trend7Day: 15,
    },
    {
      id: 'w8',
      word: 'Me siento solo',
      emotion: 'sadness',
      emotionLabel: 'Tristeza',
      frequency: 34,
      context: 'Cliente expresa sentimiento de soledad o abandono',
      lastDetected: '2026-08-15',
      trend7Day: -1,
    },
  ],
};
