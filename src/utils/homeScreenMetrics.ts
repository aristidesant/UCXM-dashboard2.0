import type { EmotionMetrics, OperationMetrics, ComplianceMetrics } from '../data/mockMetrics';

export const getEmotionLabel = (emotion: string): string => {
  const emotionLabels: Record<string, string> = {
    // Existing emotions
    joy: 'Alegría',
    satisfaction: 'Satisfacción',
    neutral: 'Neutral',
    frustration: 'Frustración',
    anger: 'Ira',
    sadness: 'Tristeza',
    positive: 'Positivo',
    negative: 'Negativo',
    frustrated: 'Frustrado',
    angry: 'Enojado',
    satisfied: 'Satisfecho',
    // New emotions (12 total)
    elation: 'Euforia',
    gratitude: 'Gratitud',
    relief: 'Alivio',
    surprise: 'Sorpresa',
    fear: 'Miedo',
    disappointment: 'Decepción',
    rage: 'Furia',
  };
  return emotionLabels[emotion] || emotion;
};

export const getToneLabel = (tone: string): string => {
  const toneLabels: Record<string, string> = {
    professional: 'Profesional',
    empathetic: 'Empático',
    polite: 'Educado',
    casual: 'Informal',
  };
  return toneLabels[tone] || tone;
};

export const getSentimentLevel = (emotion: string): string => {
  const emotionMap: Record<string, string> = {
    // Muy Positivo
    professional: 'Muy Positivo',
    satisfied: 'Muy Positivo',
    'muy positivo': 'Muy Positivo',
    joy: 'Muy Positivo',
    elation: 'Muy Positivo',
    gratitude: 'Muy Positivo',
    empathetic: 'Muy Positivo',
    // Positivo
    positivo: 'Positivo',
    positive: 'Positivo',
    satisfaction: 'Positivo',
    relief: 'Positivo',
    polite: 'Positivo',
    casual: 'Positivo',
    // Neutral
    neutral: 'Neutral',
    surprise: 'Neutral',
    // Negativo
    negative: 'Negativo',
    frustration: 'Negativo',
    frustrated: 'Negativo',
    fear: 'Negativo',
    disappointment: 'Negativo',
    // Muy Negativo
    angry: 'Muy Negativo',
    anger: 'Muy Negativo',
    sadness: 'Muy Negativo',
    rage: 'Muy Negativo',
  };
  return emotionMap[emotion] || emotion;
};

export const getSentimentColor = (emotion: string): string => {
  const colors: Record<string, string> = {
    // Muy Positivo (Dark Green)
    professional: '#1BB54A',
    satisfied: '#1BB54A',
    joy: '#1BB54A',
    elation: '#1BB54A',
    gratitude: '#1BB54A',
    empathetic: '#1BB54A',
    // Positivo (Light Green)
    positive: '#52C41A',
    satisfaction: '#52C41A',
    relief: '#52C41A',
    polite: '#52C41A',
    casual: '#52C41A',
    // Neutral (Gray)
    neutral: '#8C8C8C',
    surprise: '#8C8C8C',
    // Negativo (Orange)
    negative: '#FFC53D',
    frustration: '#FFC53D',
    frustrated: '#FFC53D',
    fear: '#FFC53D',
    disappointment: '#FFC53D',
    // Muy Negativo (Red)
    angry: '#FF4D4F',
    anger: '#FF4D4F',
    sadness: '#FF4D4F',
    rage: '#FF4D4F',
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
