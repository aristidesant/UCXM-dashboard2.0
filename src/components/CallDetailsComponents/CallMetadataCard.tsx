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
import type { Call } from '../../data/mockCalls';

interface CallMetadataCardProps {
  call: Call;
}

export const CallMetadataCard: React.FC<CallMetadataCardProps> = ({ call }) => {
  const { effectiveTheme } = useTheme();
  const isDark = effectiveTheme === 'dark';
  const themeColors = isDark ? colors.dark : colors.light;

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      gap: spacing.sm,
    } as ViewStyle,
    card: {
      flex: 1,
      backgroundColor: isDark ? themeColors.sunkenBase : themeColors.pureSurface,
      borderRadius: borderRadius.md,
      padding: spacing.sm,
      borderWidth: 1,
      borderColor: themeColors.whisperBorder,
    } as ViewStyle,
    label: {
      fontSize: fontSize.xs,
      color: themeColors.steelSecondary,
      fontWeight: '600',
      marginBottom: 2,
      textTransform: 'uppercase',
    } as TextStyle,
    value: {
      fontSize: fontSize.sm,
      fontWeight: '700',
      color: themeColors.inkPrimary,
    } as TextStyle,
  });

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.label}>Fecha</Text>
        <Text style={styles.value}>{call.dateTime}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.label}>Duración</Text>
        <Text style={styles.value}>{call.duration}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.label}>OLA</Text>
        <Text style={styles.value}>{call.ola}</Text>
      </View>
    </View>
  );
};
