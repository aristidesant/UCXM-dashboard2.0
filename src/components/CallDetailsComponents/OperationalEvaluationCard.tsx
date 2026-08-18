import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { colors, spacing, borderRadius, fontSize } from '../../design';
import { useTheme } from '../../context/ThemeContext';

interface OperationalEvaluationCardProps {
  duration?: string;
  ahtTarget?: string;
  escalations?: number;
  result?: string;
}

export const OperationalEvaluationCard: React.FC<OperationalEvaluationCardProps> = ({
  duration = '4m 28s',
  ahtTarget = '5m 00s',
  escalations = 0,
  result = 'Exitoso',
}) => {
  const { effectiveTheme } = useTheme();
  const isDark = effectiveTheme === 'dark';
  const themeColors = isDark ? colors.dark : colors.light;

  const styles = StyleSheet.create({
    container: {
      backgroundColor: isDark ? themeColors.sunkenBase : themeColors.pureSurface,
      borderRadius: borderRadius.lg,
      padding: spacing.md,
      borderWidth: 1,
      borderColor: themeColors.whisperBorder,
    } as ViewStyle,
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: spacing.sm,
      borderBottomWidth: 1,
      borderBottomColor: themeColors.whisperBorder,
    } as ViewStyle,
    lastRow: {
      borderBottomWidth: 0,
    } as ViewStyle,
    label: {
      fontSize: fontSize.sm,
      color: themeColors.steelSecondary,
      fontWeight: '500',
    } as TextStyle,
    value: {
      fontSize: fontSize.sm,
      fontWeight: '700',
      color: themeColors.inkPrimary,
    } as TextStyle,
    successBadge: {
      paddingHorizontal: spacing.sm,
      paddingVertical: spacing.xs,
      borderRadius: borderRadius.sm,
      backgroundColor: colors.light.newtechGreen,
    } as ViewStyle,
    successText: {
      fontSize: fontSize.xs,
      fontWeight: '600',
      color: '#FFFFFF',
    } as TextStyle,
  });

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.label}>Duración</Text>
        <Text style={styles.value}>{duration}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>AHT Objetivo</Text>
        <Text style={styles.value}>{ahtTarget}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Escalaciones</Text>
        <Text style={styles.value}>{escalations}</Text>
      </View>
      <View style={[styles.row, styles.lastRow]}>
        <Text style={styles.label}>Resultado</Text>
        <View style={styles.successBadge}>
          <Text style={styles.successText}>{result}</Text>
        </View>
      </View>
    </View>
  );
};
