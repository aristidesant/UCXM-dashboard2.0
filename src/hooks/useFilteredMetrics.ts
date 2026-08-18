import { useMemo } from 'react';
import { useGlobalAnalytics } from './useGlobalAnalytics';
import { aggregatedMetrics } from '../data/aggregatedMetrics';

/**
 * Hook que aplica filtros globales a las métricas agregadas
 *
 * Nota: Actualmente devuelve datos agregados pre-calculados.
 * En production, este hook se conectaría a un API que recibe los filtros
 * y retorna métricas ya filtradas desde el backend.
 */
export const useFilteredMetrics = () => {
  const { filters } = useGlobalAnalytics();

  // Aplicar filtros lógicamente (simulado por ahora)
  const filteredMetrics = useMemo(() => {
    // En un escenario real, estos datos vendrían de:
    // GET /api/metrics?campaignType=outbound&lob=Ventas&status=activa&from=2026-08-11&to=2026-08-18

    // Por ahora, retornamos los datos agregados
    // El filtrado real ocurriría en el backend
    return {
      operation: aggregatedMetrics.operation,
      qa: aggregatedMetrics.qa,
      emotion: aggregatedMetrics.emotion,
      compliance: aggregatedMetrics.compliance,
      insights: aggregatedMetrics.insights,
    };
  }, [filters]);

  return filteredMetrics;
};

/**
 * Hook especializado para métricas operacionales
 */
export const useOperationalMetrics = () => {
  const metrics = useFilteredMetrics();
  return metrics.operation;
};

/**
 * Hook especializado para métricas de QA
 */
export const useQAMetrics = () => {
  const metrics = useFilteredMetrics();
  return metrics.qa;
};

/**
 * Hook especializado para métricas de emoción/sentimiento
 */
export const useEmotionMetrics = () => {
  const metrics = useFilteredMetrics();
  return metrics.emotion;
};

/**
 * Hook especializado para métricas de cumplimiento
 */
export const useComplianceMetrics = () => {
  const metrics = useFilteredMetrics();
  return metrics.compliance;
};

/**
 * Hook especializado para insights
 */
export const useInsightsMetrics = () => {
  const metrics = useFilteredMetrics();
  return metrics.insights;
};
