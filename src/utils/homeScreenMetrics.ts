import type { EmotionMetrics, OperationMetrics, ComplianceMetrics } from '../data/mockMetrics';

export const getSentimentLevel = (emotion: string): string => {
  const emotionMap: Record<string, string> = {
    professional: 'Muy Positivo',
    satisfied: 'Muy Positivo',
    positive: 'Positivo',
    neutral: 'Neutral',
    negative: 'Negativo',
    frustrated: 'Muy Negativo',
    angry: 'Muy Negativo',
    empathetic: 'Muy Positivo',
    polite: 'Positivo',
    casual: 'Positivo',
  };
  return emotionMap[emotion] || emotion;
};

export const getSentimentColor = (emotion: string): string => {
  const colors: Record<string, string> = {
    professional: '#1BB54A',
    satisfied: '#1BB54A',
    positive: '#52C41A',
    neutral: '#8C8C8C',
    negative: '#FFC53D',
    frustrated: '#FF7A45',
    angry: '#FF4D4F',
    empathetic: '#1BB54A',
    polite: '#52C41A',
    casual: '#52C41A',
  };
  return colors[emotion] || '#1BB54A';
};

export const calculateSystemHealth = (
  compliance: ComplianceMetrics,
  qa: { effectivePercentage: number },
  operation: { management: { contactRate: { value: number } } }
): { level: string; score: number; variant: 'success' | 'warning' | 'danger' } => {
  const complianceScore = compliance.complianceScore;
  const effectiveContacts = qa.effectivePercentage;
  const contactRate = operation.management.contactRate.value;

  // Calculate average score from three key metrics
  const avgScore = (complianceScore + effectiveContacts + contactRate) / 3;

  if (avgScore >= 85) {
    return { level: 'Excelente', score: Math.round(avgScore), variant: 'success' };
  } else if (avgScore >= 70) {
    return { level: 'Normal', score: Math.round(avgScore), variant: 'warning' };
  }
  return { level: 'En Riesgo', score: Math.round(avgScore), variant: 'danger' };
};

export const getSentimentTrend = (confidence: number): string => {
  if (confidence >= 85) return '↑';
  if (confidence >= 70) return '→';
  return '↓';
};

export const formatCallVolume = (calls: number): string => {
  if (calls >= 1000) {
    return `${(calls / 1000).toFixed(1)}k`;
  }
  return calls.toString();
};

export const getWeeklyCallVolume = (): { labels: string[]; data: number[] } => {
  return {
    labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
    data: [8200, 15400, 22100, 14300, 18900, 3400, 2100],
  };
};
