import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { TrendingUp } from 'lucide-react';
import { colors, spacing, borderRadius, fontSize } from '../../design';
import { useTheme } from '../../context/ThemeContext';

interface BusinessEvaluationCardProps {
  salesOpportunity?: string;
  retention?: string;
  churnRisk?: string;
  upsellPotential?: string;
}

export const BusinessEvaluationCard: React.FC<BusinessEvaluationCardProps> = ({
  salesOpportunity = 'No identificada',
  retention = 'Alta',
  churnRisk = 'Bajo',
  upsellPotential = 'Futuro',
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
    badge: {
      paddingHorizontal: spacing.sm,
      paddingVertical: spacing.xs,
      borderRadius: borderRadius.sm,
      backgroundColor: colors.light.newtechGreen,
      alignSelf: 'flex-start',
    } as ViewStyle,
    badgeText: {
      fontSize: fontSize.xs,
      fontWeight: '600',
      color: '#FFFFFF',
    } as TextStyle,
  });

  const getBadgeColor = (value: string) => {
    if (value.toLowerCase() === 'alta' || value.toLowerCase() === 'alto') {
      return '#26D366';
    } else if (value.toLowerCase() === 'medio') {
      return '#FFB347';
    } else if (value.toLowerCase() === 'bajo' || value.toLowerCase() === 'baja') {
      return '#FFB347';
    }
    return '#CCCCCC';
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.label}>Oportunidad de Venta</Text>
        <Text style={styles.value}>{salesOpportunity}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Retención</Text>
        <View style={[styles.badge, { backgroundColor: '#26D366' }]}>
          <Text style={styles.badgeText}>{retention}</Text>
        </View>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Riesgo de Churn</Text>
        <View style={[styles.badge, { backgroundColor: '#FFB347' }]}>
          <Text style={styles.badgeText}>{churnRisk}</Text>
        </View>
      </View>
      <View style={[styles.row, styles.lastRow]}>
        <Text style={styles.label}>Potencial Upsell</Text>
        <Text style={styles.value}>{upsellPotential}</Text>
      </View>
    </View>
  );
};
