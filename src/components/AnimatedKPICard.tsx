import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, Text, ViewStyle } from 'react-native';
import { colors, typography, spacing, borderRadius } from '../design';
import { useTheme } from '../context/ThemeContext';

interface AnimatedKPICardProps {
  label: string;
  value: number | string;
  suffix?: string;
  icon?: React.ReactNode | string;
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
  const { effectiveTheme } = useTheme();
  const isDark = effectiveTheme === 'dark';
  const themeColors = isDark ? colors.dark : colors.light;

  const [displayedValue, setDisplayedValue] = useState(0);
  const animationFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isNumeric || typeof value !== 'number') {
      setDisplayedValue(value as number);
      return;
    }

    const targetValue = value as number;
    const duration = 800;

    const animate = (currentTime: number) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = currentTime;
      }

      const elapsed = currentTime - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);

      const easeOutQuad = 1 - (1 - progress) * (1 - progress);
      const currentValue = Math.floor(targetValue * easeOutQuad);
      setDisplayedValue(currentValue);

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        setDisplayedValue(targetValue);
      }
    };

    startTimeRef.current = null;
    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [value, isNumeric]);

  const variantColors = {
    primary: {
      bg: themeColors.infoBg,
      accent: themeColors.newtechBlue,
      text: themeColors.steelSecondary,
    },
    success: {
      bg: themeColors.successBg,
      accent: themeColors.newtechGreen,
      text: themeColors.steelSecondary,
    },
    warning: {
      bg: themeColors.warningBg,
      accent: themeColors.warning,
      text: themeColors.steelSecondary,
    },
    danger: {
      bg: themeColors.dangerBg,
      accent: themeColors.danger,
      text: themeColors.steelSecondary,
    },
    neutral: {
      bg: themeColors.sunkenBase,
      accent: themeColors.mutedSlate,
      text: themeColors.steelSecondary,
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
      borderWidth: 1,
      borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.5)',
      shadowColor: variantStyle.accent,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 12,
      elevation: 4,
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
      fontSize: 12,
      fontWeight: '600',
      color: themeColors.mutedSlate,
      flex: 1,
      lineHeight: 18,
      letterSpacing: 0.06,
    },
    valueContainer: {
      flexDirection: 'row',
      alignItems: 'baseline',
      gap: spacing.xs,
    } as ViewStyle,
    value: {
      color: variantStyle.accent,
      fontWeight: '700',
      fontSize: 32,
      lineHeight: 40,
    },
    suffix: {
      fontSize: 15,
      fontWeight: '400',
      color: themeColors.steelSecondary,
      marginBottom: spacing.xs,
      lineHeight: 22,
    },
  });

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        {icon && (typeof icon === 'string' ? <Text style={styles.icon}>{icon}</Text> : icon)}
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
