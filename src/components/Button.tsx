// src/components/Button.tsx
// Newtech Design System - Button Component

import React from 'react';
import { StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native';
import { colors, spacing, borderRadius, fontSize, opacity } from '../design';
import { useTheme } from '../context/ThemeContext';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'destructive' | 'ghost';
  size?: 'sm' | 'base' | 'lg';
  disabled?: boolean;
  style?: ViewStyle;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'base',
  disabled = false,
  style,
}) => {
  const { effectiveTheme } = useTheme();
  const isDark = effectiveTheme === 'dark';
  const themeColors = isDark ? colors.dark : colors.light;

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return {
          paddingVertical: spacing.xs,
          paddingHorizontal: spacing.sm,
          radius: borderRadius.sm,
          fontSize: fontSize.sm,
          fontWeight: '600' as const,
        };
      case 'lg':
        return {
          paddingVertical: spacing.md,
          paddingHorizontal: spacing.lg,
          radius: borderRadius.md,
          fontSize: fontSize.lg,
          fontWeight: '600' as const,
        };
      default:
        return {
          paddingVertical: spacing.sm,
          paddingHorizontal: spacing.md,
          radius: borderRadius.sm,
          fontSize: fontSize.base,
          fontWeight: '600' as const,
        };
    }
  };

  const sizeStyles = getSizeStyles();

  const getVariantStyles = () => {
    const outlineBorderColor = isDark ? themeColors.whisperBorder : themeColors.lightGray;
    const textColor = themeColors.pureSurface;

    switch (variant) {
      case 'primary':
        return {
          backgroundColor: themeColors.newtechGreen,
          borderColor: themeColors.newtechGreen,
          textColor,
          borderWidth: 0,
        };
      case 'secondary':
        return {
          backgroundColor: themeColors.newtechBlue,
          borderColor: themeColors.newtechBlue,
          textColor,
          borderWidth: 0,
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          borderColor: outlineBorderColor,
          textColor: themeColors.inkPrimary,
          borderWidth: 1,
        };
      case 'destructive':
        return {
          backgroundColor: themeColors.danger,
          borderColor: themeColors.danger,
          textColor,
          borderWidth: 0,
        };
      case 'ghost':
        return {
          backgroundColor: 'transparent',
          borderColor: 'transparent',
          textColor: themeColors.steelSecondary,
          borderWidth: 0,
        };
      default:
        return {
          backgroundColor: themeColors.newtechGreen,
          borderColor: themeColors.newtechGreen,
          textColor,
          borderWidth: 0,
        };
    }
  };

  const variantStyles = getVariantStyles();
  const disabledOpacity = disabled ? opacity.half : 1;

  const styles = StyleSheet.create({
    button: {
      paddingVertical: sizeStyles.paddingVertical,
      paddingHorizontal: sizeStyles.paddingHorizontal,
      borderRadius: sizeStyles.radius,
      minHeight: 44,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: variantStyles.backgroundColor,
      borderWidth: variantStyles.borderWidth,
      borderColor: variantStyles.borderColor,
      opacity: disabledOpacity,
    },
    text: {
      fontSize: sizeStyles.fontSize,
      fontWeight: sizeStyles.fontWeight,
      color: variantStyles.textColor,
      textAlign: 'center',
    },
  });

  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};
