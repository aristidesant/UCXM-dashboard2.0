import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { Phone, Calendar, Clock, Layers } from 'lucide-react';
import { colors, spacing, borderRadius, fontSize } from '../../design';
import { useTheme } from '../../context/ThemeContext';
import type { Call } from '../../data/mockCalls';

interface CompactCallInfoCardProps {
  call: Call;
}

export const CompactCallInfoCard: React.FC<CompactCallInfoCardProps> = ({ call }) => {
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
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.xs,
      marginBottom: spacing.xs,
      paddingVertical: spacing.xs,
    } as ViewStyle,
    lastRow: {
      marginBottom: 0,
    } as ViewStyle,
    infoSection: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.xs,
      flex: 1,
      marginRight: spacing.xs,
    } as ViewStyle,
    divider: {
      width: 1,
      height: 16,
      backgroundColor: themeColors.whisperBorder,
    } as ViewStyle,
    icon: {
      width: 16,
      justifyContent: 'center',
      alignItems: 'center',
    } as ViewStyle,
    text: {
      fontSize: fontSize.xs,
      color: themeColors.steelSecondary,
      fontWeight: '500',
    } as TextStyle,
    name: {
      fontSize: fontSize.sm,
      fontWeight: '700',
      color: themeColors.inkPrimary,
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
      color: '#FFFFFF',
    } as TextStyle,
    metaText: {
      fontSize: fontSize.xs,
      color: themeColors.steelSecondary,
      fontWeight: '500',
    } as TextStyle,
  });

  return (
    <View style={styles.card}>
      {/* Contact Row */}
      <View style={styles.row}>
        <View style={styles.infoSection}>
          <Phone size={14} color={themeColors.steelSecondary} strokeWidth={2} />
          <View>
            <Text style={styles.name}>{call.contactName}</Text>
            <Text style={styles.phone}>{call.phoneNumber}</Text>
          </View>
        </View>
        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>{call.statusLabel}</Text>
        </View>
      </View>

      {/* Metadata Row - Date | Duration | OLA */}
      <View style={[styles.row, styles.lastRow]}>
        <View style={styles.infoSection}>
          <Calendar size={14} color={themeColors.steelSecondary} strokeWidth={2} />
          <Text style={styles.metaText}>{call.dateTime}</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.infoSection}>
          <Clock size={14} color={themeColors.steelSecondary} strokeWidth={2} />
          <Text style={styles.metaText}>{call.duration}</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.infoSection}>
          <Layers size={14} color={themeColors.steelSecondary} strokeWidth={2} />
          <Text style={styles.metaText}>{call.ola}</Text>
        </View>
      </View>

      {/* Disposition */}
      {call.disposition && (
        <View style={[styles.row, styles.lastRow]}>
          <Text style={styles.text}>Resultado:</Text>
          <Text style={[styles.text, { color: colors.light.newtechGreen, fontWeight: '600' }]}>
            {call.disposition}
          </Text>
        </View>
      )}
    </View>
  );
};
