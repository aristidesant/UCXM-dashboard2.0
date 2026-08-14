// src/components/Chart.tsx

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors, spacing } from '../design';

interface ChartProps {
  data: number[];
  height?: number;
  labels?: string[];
}

export const Chart: React.FC<ChartProps> = ({
  data,
  height = 200,
  labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
}) => {
  const styles = StyleSheet.create({
    container: {
      width: '100%',
      height,
      paddingVertical: spacing.md,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.light.bgSecondary,
      borderRadius: 12,
      marginVertical: spacing.md,
    },
  });

  if (data.length === 0) {
    return <View style={styles.container} />;
  }

  const maxValue = Math.max(...data);
  const minValue = Math.min(...data);
  const range = maxValue - minValue || 1;

  const width = 100;
  const padding = 10;
  const chartHeight = height - padding * 2;
  const pointSpacing = width / (data.length - 1 || 1);

  const points = data.map((value, index) => {
    const x = padding + index * pointSpacing;
    const y = chartHeight - ((value - minValue) / range) * chartHeight + padding;
    return `${x},${y}`;
  });

  return (
    <View style={styles.container}>
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${width} ${height}`}
        style={{ flex: 1 }}
      >
        <polyline
          points={points.join(' ')}
          fill="none"
          stroke={colors.light.primaryBlue}
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={colors.light.primaryBlue} stopOpacity="0.3" />
            <stop offset="100%" stopColor={colors.light.primaryBlue} stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </View>
  );
};
