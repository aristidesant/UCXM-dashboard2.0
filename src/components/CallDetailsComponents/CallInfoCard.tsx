import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { Phone } from 'lucide-react';
import { colors, spacing, typography, borderRadius, fontSize } from '../../design';
import { useTheme } from '../../context/ThemeContext';
import type { Call } from '../../data/mockCalls';

interface CallInfoCardProps {
  call: Call;
}

export const CallInfoCard: React.FC<CallInfoCardProps> = ({ call }) => {
  const { effectiveTheme } = useTheme();
  const isDark = effectiveTheme === 'dark';
  const themeColors = isDark ? colors.dark : colors.light;

  const styles = StyleSheet.create({
    card: {
      backgroundColor: isDark ? themeColors.sunkenBase : themeColors.pureSurface,
      borderRadius: borderRadius.md,
      padding: spacing.sm,
      borderWidth: 1,
      borderColor: themeColors.whisperBorder,
    } as ViewStyle,
    header: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: spacing.sm,
      marginBottom: spacing.xs,
    } as ViewStyle,
    iconContainer: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: colors.light.newtechGreen,
      justifyContent: 'center',
      alignItems: 'center',
    } as ViewStyle,
    textContainer: {
      flex: 1,
    } as ViewStyle,
    name: {
      fontSize: fontSize.sm,
      fontWeight: '700',
      color: themeColors.inkPrimary,
      marginBottom: 2,
    } as TextStyle,
    phone: {
      fontSize: fontSize.xs,
      color: themeColors.steelSecondary,
      fontWeight: '400',
    } as TextStyle,
    statusBadge: {
      paddingHorizontal: spacing.xs,
      paddingVertical: 2,
      borderRadius: borderRadius.sm,
      backgroundColor: colors.light.newtechGreen,
    } as ViewStyle,
    statusText: {
      fontSize: fontSize.xs,
      fontWeight: '600',
      color: colors.light.canvasFrost,
    } as TextStyle,
    section: {
      marginTop: spacing.xs,
      paddingTop: spacing.xs,
      borderTopWidth: 1,
      borderTopColor: themeColors.whisperBorder,
    } as ViewStyle,
    label: {
      fontSize: fontSize.xs,
      color: themeColors.steelSecondary,
      fontWeight: '600',
      marginBottom: 2,
      textTransform: 'uppercase',
    } as TextStyle,
    dispositionText: {
      fontSize: fontSize.xs,
      color: colors.light.newtechGreen,
      fontWeight: '600',
    } as TextStyle,
    featureBadge: {
      paddingHorizontal: spacing.xs,
      paddingVertical: 2,
      borderRadius: borderRadius.sm,
      backgroundColor: isDark ? themeColors.canvasDark : colors.light.sunkenBase,
      marginTop: spacing.xs,
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.xs,
      alignSelf: 'flex-start',
    } as ViewStyle,
    featureText: {
      fontSize: fontSize.xs,
      color: themeColors.inkPrimary,
      fontWeight: '400',
    } as TextStyle,
  });

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Phone size={24} color="white" strokeWidth={2} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.name}>{call.contactName}</Text>
          <Text style={styles.phone}>{call.phoneNumber}</Text>
        </View>
        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>{call.statusLabel}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Resultado</Text>
        <Text style={styles.dispositionText}>{call.disposition}</Text>
      </View>

      {call.features.length > 0 && (
        <View>
          {call.features.map((feature, idx) => (
            <View key={idx} style={styles.featureBadge}>
              <Text style={styles.featureText}>📍 {feature}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};
