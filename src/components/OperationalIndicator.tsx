import React from 'react';
import { StyleSheet, View, Text, ViewStyle, TextStyle } from 'react-native';
import { colors, spacing, fontSize } from '../design';
import { useTheme } from '../context/ThemeContext';

interface OperationalIndicatorProps {
  label: string;
}

export const OperationalIndicator: React.FC<OperationalIndicatorProps> = ({ label }) => {
  const { effectiveTheme } = useTheme();
  const isDark = effectiveTheme === 'dark';
  const themeColors = isDark ? colors.dark : colors.light;

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: spacing.sm,
    } as ViewStyle,
    label: {
      fontSize: fontSize.sm,
      fontWeight: '500',
      color: themeColors.steelSecondary,
      lineHeight: 16,
    } as TextStyle,
    indicatorContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.sm,
    } as ViewStyle,
    pulseOuter: {
      width: 12,
      height: 12,
      borderRadius: 6,
      backgroundColor: themeColors.newtechGreen,
      justifyContent: 'center',
      alignItems: 'center',
    } as ViewStyle,
    pulseInner: {
      width: 6,
      height: 6,
      borderRadius: 3,
      backgroundColor: '#FFFFFF',
    } as ViewStyle,
    statusText: {
      fontSize: fontSize.sm,
      fontWeight: '600',
      color: themeColors.newtechGreen,
      lineHeight: 16,
    } as TextStyle,
  });

  // Add CSS animation for pulse effect
  const animationStyles = `
    @keyframes pulse {
      0% {
        opacity: 1;
        transform: scale(1);
      }
      50% {
        opacity: 0.7;
        transform: scale(1.2);
      }
      100% {
        opacity: 1;
        transform: scale(1);
      }
    }
    .pulse-animation {
      animation: pulse 2s infinite;
    }
  `;

  return (
    <>
      <style>{animationStyles}</style>
      <View style={styles.container}>
        <Text style={styles.label}>{label}</Text>
        <View style={styles.indicatorContainer}>
          <View
            style={styles.pulseOuter}
            className="pulse-animation"
          >
            <View style={styles.pulseInner} />
          </View>
          <Text style={styles.statusText}>Operativo</Text>
        </View>
      </View>
    </>
  );
};
