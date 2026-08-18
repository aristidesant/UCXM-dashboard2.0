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

interface QAEvaluationCardProps {
  score?: number;
  punctuality?: string;
  tone?: string;
  compliance?: number;
}

export const QAEvaluationCard: React.FC<QAEvaluationCardProps> = ({
  score = 95,
  punctuality = 'Excelente',
  tone = 'Profesional',
  compliance = 100,
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
    scoreValue: {
      fontSize: fontSize.lg,
      fontWeight: '700',
      color: colors.light.newtechGreen,
    } as TextStyle,
  });

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.label}>Score QA</Text>
        <Text style={styles.scoreValue}>{score}/100</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Puntualidad</Text>
        <Text style={styles.value}>{punctuality}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Tono</Text>
        <Text style={styles.value}>{tone}</Text>
      </View>
      <View style={[styles.row, styles.lastRow]}>
        <Text style={styles.label}>Cumplimiento</Text>
        <Text style={styles.scoreValue}>{compliance}%</Text>
      </View>
    </View>
  );
};
