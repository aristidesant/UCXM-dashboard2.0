// src/components/Button.tsx
// Newtech Design System - Button Component

import React from 'react';
import { StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native';
import { colors, spacing } from '../design';
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
        return { paddingVertical: 6, paddingHorizontal: 12, radius: 6, fontSize: 12, fontWeight: '600' };
      case 'lg':
        return { paddingVertical: 14, paddingHorizontal: 22, radius: 12, fontSize: 16, fontWeight: '600' };
      default:
        // DESIGN.md Spec: padding: 10px 16px, border-radius: 8px, font-weight: 600, font-size: 14px
        return { paddingVertical: 10, paddingHorizontal: 16, radius: 8, fontSize: 14, fontWeight: '600' };
    }
  };

  const sizeStyles = getSizeStyles();

  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: themeColors.newtechGreen,
          borderColor: themeColors.newtechGreen,
          textColor: '#FFFFFF',
          borderWidth: 0,
        };
      case 'secondary':
        return {
          backgroundColor: themeColors.newtechBlue,
          borderColor: themeColors.newtechBlue,
          textColor: '#FFFFFF',
          borderWidth: 0,
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          borderColor: '#DDE2E8',
          textColor: themeColors.inkPrimary,
          borderWidth: 1,
        };
      case 'destructive':
        return {
          backgroundColor: themeColors.danger,
          borderColor: themeColors.danger,
          textColor: '#FFFFFF',
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
          textColor: '#FFFFFF',
          borderWidth: 0,
        };
    }
  };

  const variantStyles = getVariantStyles();

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
      opacity: disabled ? 0.5 : 1,
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
