import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { Check, AlertCircle } from 'lucide-react';
import { colors, spacing, borderRadius, fontSize } from '../../design';
import { useTheme } from '../../context/ThemeContext';

interface ComplianceItem {
  label: string;
  status: 'ok' | 'warning' | 'critical';
}

interface ComplianceEvaluationCardProps {
  items?: ComplianceItem[];
  riskLevel?: string;
}

export const ComplianceEvaluationCard: React.FC<ComplianceEvaluationCardProps> = ({
  items = [
    { label: 'Protección de Datos', status: 'ok' },
    { label: 'Consentimiento Grabación', status: 'ok' },
    { label: 'Divulgación', status: 'ok' },
  ],
  riskLevel = 'Bajo',
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
    item: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: spacing.sm,
      borderBottomWidth: 1,
      borderBottomColor: themeColors.whisperBorder,
    } as ViewStyle,
    lastItem: {
      borderBottomWidth: 0,
    } as ViewStyle,
    icon: {
      marginRight: spacing.sm,
      width: 20,
    } as ViewStyle,
    label: {
      fontSize: fontSize.sm,
      fontWeight: '500',
      color: themeColors.steelSecondary,
      flex: 1,
    } as TextStyle,
    riskSection: {
      marginTop: spacing.md,
      paddingTop: spacing.md,
      borderTopWidth: 1,
      borderTopColor: themeColors.whisperBorder,
    } as ViewStyle,
    riskLabel: {
      fontSize: fontSize.sm,
      color: themeColors.steelSecondary,
      fontWeight: '500',
      marginBottom: spacing.sm,
    } as TextStyle,
    riskBadge: {
      paddingHorizontal: spacing.sm,
      paddingVertical: spacing.xs,
      borderRadius: borderRadius.sm,
      backgroundColor: '#90EE90',
      alignSelf: 'flex-start',
    } as ViewStyle,
    riskText: {
      fontSize: fontSize.sm,
      fontWeight: '600',
      color: '#1B5E20',
    } as TextStyle,
  });

  return (
    <View style={styles.container}>
      {items.map((item, index) => (
        <View key={index} style={[styles.item, index === items.length - 1 && styles.lastItem]}>
          <View style={styles.icon}>
            <Check size={18} color={colors.light.newtechGreen} strokeWidth={2} />
          </View>
          <Text style={styles.label}>{item.label}</Text>
        </View>
      ))}

      <View style={styles.riskSection}>
        <Text style={styles.riskLabel}>Nivel de Riesgo</Text>
        <View style={styles.riskBadge}>
          <Text style={styles.riskText}>{riskLevel}</Text>
        </View>
      </View>
    </View>
  );
};
