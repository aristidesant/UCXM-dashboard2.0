import type { EmotionMetrics, OperationMetrics, ComplianceMetrics } from '../data/mockMetrics';

export const getSentimentLevel = (emotion: string): string => {
  const emotionMap: Record<string, string> = {
    professional: 'Professional',
    satisfied: 'Very Positive',
    positive: 'Positive',
    neutral: 'Neutral',
    negative: 'Negative',
    frustrated: 'Very Negative',
    angry: 'Very Negative',
    empathetic: 'Empathetic',
    polite: 'Polite',
    casual: 'Casual',
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
    casual: '#1890FF',
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
    return { level: 'Excellent', score: Math.round(avgScore), variant: 'success' };
  } else if (avgScore >= 70) {
    return { level: 'Normal', score: Math.round(avgScore), variant: 'warning' };
  }
  return { level: 'At Risk', score: Math.round(avgScore), variant: 'danger' };
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
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    data: [8200, 15400, 22100, 14300, 18900, 3400, 2100],
  };
};
