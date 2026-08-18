import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { colors, spacing, fontSize, borderRadius } from '../design';
import { useTheme } from '../context/ThemeContext';

interface DistributionChartProps {
  title: string;
  data: Array<{
    name: string;
    sentiments: Record<string, number>;
  }>;
}

export const EmotionDistributionChart: React.FC<DistributionChartProps> = ({ title, data }) => {
  const { effectiveTheme } = useTheme();
  const isDark = effectiveTheme === 'dark';
  const themeColors = isDark ? colors.dark : colors.light;

  const styles = StyleSheet.create({
    container: {
      marginBottom: spacing.lg,
    } as ViewStyle,
    title: {
      fontSize: fontSize.md,
      fontWeight: '600',
      color: themeColors.inkPrimary,
      marginBottom: spacing.md,
    } as TextStyle,
    chartContainer: {
      backgroundColor: isDark ? themeColors.sunkenBase : themeColors.pureSurface,
      borderRadius: borderRadius.lg,
      padding: spacing.lg,
      borderWidth: 1,
      borderColor: themeColors.whisperBorder,
    } as ViewStyle,
    rowContainer: {
      marginBottom: spacing.md,
    } as ViewStyle,
    rowLabel: {
      fontSize: fontSize.sm,
      fontWeight: '500',
      color: themeColors.steelSecondary,
      marginBottom: spacing.sm,
    } as TextStyle,
    barContainer: {
      flexDirection: 'row',
      height: 24,
      borderRadius: borderRadius.sm,
      overflow: 'hidden',
      gap: 2,
    } as ViewStyle,
    barSegment: {
      justifyContent: 'center',
      alignItems: 'center',
    } as ViewStyle,
  });

  const sentimentColors = {
    veryPositive: '#1BB54A',
    positive: '#52C41A',
    neutral: '#8C8C8C',
    negative: '#FFC53D',
    veryNegative: '#FF4D4F',
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.chartContainer}>
        {data.map((item, idx) => (
          <View key={idx} style={styles.rowContainer}>
            <Text style={styles.rowLabel}>{item.name}</Text>
            <View style={styles.barContainer}>
              {Object.entries(item.sentiments).map(([sentiment, percentage], i) => (
                <View
                  key={i}
                  style={[
                    styles.barSegment,
                    {
                      flex: percentage || 0.1,
                      backgroundColor:
                        sentimentColors[sentiment as keyof typeof sentimentColors] || '#ccc',
                    },
                  ]}
                >
                  {percentage > 5 && (
                    <Text
                      style={{
                        fontSize: 10,
                        fontWeight: '600',
                        color: 'white',
                      }}
                    >
                      {percentage}%
                    </Text>
                  )}
                </View>
              ))}
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};
