import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { spacing } from '../design';
import { MetricCard } from './MetricCard';

interface ComplianceWidgetProps {
  violations: number;
}

export const ComplianceWidget: React.FC<ComplianceWidgetProps> = ({
  violations,
}) => {
  const styles = StyleSheet.create({
    container: {
      marginBottom: spacing.lg,
      flex: 1,
      minWidth: '48%',
    } as ViewStyle,
  });

  return (
    <View style={styles.container}>
      <MetricCard label="Compliance Violations" value={violations.toString()} />
    </View>
  );
};
