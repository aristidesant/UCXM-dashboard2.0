import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ViewStyle } from 'react-native';
import { colors, typography, spacing, borderRadius } from '../design';

interface AnimatedKPICardProps {
  label: string;
  value: number | string;
  suffix?: string;
  icon?: React.ReactNode;
  variant?: 'primary' | 'success' | 'warning' | 'danger' | 'neutral';
  isNumeric?: boolean;
}

export const AnimatedKPICard: React.FC<AnimatedKPICardProps> = ({
  label,
  value,
  suffix = '',
  icon,
  variant = 'primary',
  isNumeric = true,
}) => {
  const [displayedValue, setDisplayedValue] = useState(0);

  useEffect(() => {
    if (!isNumeric || typeof value !== 'number') {
      setDisplayedValue(value as number);
      return;
    }

    const targetValue = value as number;
    const duration = 800;
    const steps = 60;
    const stepDuration = duration / steps;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      const progress = Math.min(currentStep / steps, 1);
      const easeOutQuad = 1 - (1 - progress) * (1 - progress);
      const currentValue = Math.floor(targetValue * easeOutQuad);
      setDisplayedValue(currentValue);

      if (progress >= 1) {
        clearInterval(interval);
        setDisplayedValue(targetValue);
      }
    }, stepDuration);

    return () => clearInterval(interval);
  }, [value, isNumeric]);

  const variantColors = {
    primary: {
      bg: colors.light.bgSecondary,
      accent: colors.light.primaryBlue,
      text: colors.light.darkGray,
    },
    success: {
      bg: 'rgba(52, 199, 89, 0.1)',
      accent: colors.light.successGreen,
      text: colors.light.darkGray,
    },
    warning: {
      bg: 'rgba(255, 149, 0, 0.1)',
      accent: colors.light.warningOrange,
      text: colors.light.darkGray,
    },
    danger: {
      bg: 'rgba(255, 59, 48, 0.1)',
      accent: colors.light.dangerRed,
      text: colors.light.darkGray,
    },
    neutral: {
      bg: colors.light.bgSecondary,
      accent: colors.light.mediumGray,
      text: colors.light.darkGray,
    },
  };

  const variantStyle = variantColors[variant];

  const styles = StyleSheet.create({
    card: {
      flex: 1,
      backgroundColor: variantStyle.bg,
      borderRadius: borderRadius.md,
      padding: spacing.lg,
      borderLeftWidth: 4,
      borderLeftColor: variantStyle.accent,
      minHeight: 140,
      justifyContent: 'space-between',
    } as ViewStyle,
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: spacing.md,
      gap: spacing.sm,
    } as ViewStyle,
    icon: {
      fontSize: 24,
      opacity: 0.6,
    },
    label: {
      ...typography.caption,
      color: colors.light.mediumGray,
      flex: 1,
    },
    valueContainer: {
      flexDirection: 'row',
      alignItems: 'baseline',
      gap: spacing.xs,
    } as ViewStyle,
    value: {
      ...typography.display,
      color: variantStyle.accent,
      fontWeight: '700',
      fontSize: 32,
    },
    suffix: {
      ...typography.body,
      color: colors.light.mediumGray,
      marginBottom: spacing.xs,
    },
  });

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        {icon && <Text style={styles.icon}>{icon}</Text>}
        <Text style={styles.label} numberOfLines={2}>{label}</Text>
      </View>
      <View style={styles.valueContainer}>
        <Text style={styles.value}>
          {isNumeric ? displayedValue : value}
        </Text>
        {suffix && <Text style={styles.suffix}>{suffix}</Text>}
      </View>
    </View>
  );
};
