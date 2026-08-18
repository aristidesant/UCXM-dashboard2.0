import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { Zap } from 'lucide-react';
import { colors, spacing, borderRadius, fontSize } from '../../design';
import { useTheme } from '../../context/ThemeContext';

interface AISummaryCardProps {
  summary: string;
}

export const AISummaryCard: React.FC<AISummaryCardProps> = ({ summary }) => {
  const { effectiveTheme } = useTheme();
  const isDark = effectiveTheme === 'dark';
  const themeColors = isDark ? colors.dark : colors.light;

  const styles = StyleSheet.create({
    card: {
      backgroundColor: isDark ? themeColors.sunkenBase : themeColors.pureSurface,
      borderRadius: borderRadius.lg,
      padding: spacing.md,
      borderWidth: 1,
      borderColor: themeColors.whisperBorder,
    } as ViewStyle,
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.sm,
      marginBottom: spacing.md,
    } as ViewStyle,
    title: {
      fontSize: fontSize.sm,
      fontWeight: '700',
      color: colors.light.newtechGreen,
      textTransform: 'uppercase',
    } as TextStyle,
    text: {
      fontSize: fontSize.sm,
      color: themeColors.inkPrimary,
      fontWeight: '400',
      lineHeight: 22,
    } as TextStyle,
  });

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Zap size={16} color={colors.light.newtechGreen} strokeWidth={2} />
        <Text style={styles.title}>Resumen IA</Text>
      </View>
      <Text style={styles.text}>{summary}</Text>
    </View>
  );
};
