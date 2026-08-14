// src/components/PlatformToggle.tsx

import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ViewStyle } from 'react-native';
import { usePlatform } from '../hooks/usePlatform';
import { colors, typography, spacing, borderRadius } from '../design';
import { Smartphone, Tablet, Monitor } from 'lucide-react';
import { Platform } from '../context/PlatformContext';
import { useTheme } from '../context/ThemeContext';

const PLATFORMS: Array<{ id: Platform; label: string; icon: React.ReactNode }> = [
  { id: 'mobile', label: 'Mobile', icon: <Smartphone size={16} /> },
  { id: 'tablet', label: 'Tablet', icon: <Tablet size={16} /> },
  { id: 'desktop', label: 'Desktop', icon: <Monitor size={16} /> },
];

export const PlatformToggle: React.FC = () => {
  const { platform, setPlatform } = usePlatform();
  const { effectiveTheme } = useTheme();
  const isDark = effectiveTheme === 'dark';
  const themeColors = isDark ? colors.dark : colors.light;

  const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      top: 12,
      right: 12,
      zIndex: 1000,
      flexDirection: 'row',
      gap: spacing.xs,
      backgroundColor: themeColors.bgPrimary,
      borderWidth: 1,
      borderColor: themeColors.lightGray,
      borderRadius: borderRadius.sm,
      padding: spacing.xs,
    } as ViewStyle,
    button: {
      paddingHorizontal: spacing.sm,
      paddingVertical: spacing.xs,
      borderRadius: 6,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1.5,
      borderColor: 'transparent',
      minWidth: 44,
      height: 36,
    } as ViewStyle,
    activeButton: {
      backgroundColor: themeColors.primaryBlue,
      borderColor: themeColors.primaryBlue,
    } as ViewStyle,
    inactiveButton: {
      backgroundColor: 'transparent',
      borderColor: themeColors.lightGray,
    } as ViewStyle,
    label: {
      ...typography.caption,
      fontSize: 11,
      fontWeight: '500',
      marginLeft: spacing.xs,
    },
    activeLabel: {
      color: '#FFFFFF',
    },
    inactiveLabel: {
      color: themeColors.mediumGray,
    },
    content: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    } as ViewStyle,
  });

  return (
    <View style={styles.container}>
      {PLATFORMS.map((p) => {
        const isActive = platform === p.id;
        return (
          <TouchableOpacity
            key={p.id}
            style={[
              styles.button,
              isActive ? styles.activeButton : styles.inactiveButton,
            ]}
            onPress={() => setPlatform(p.id)}
            activeOpacity={0.7}
          >
            <View style={styles.content}>
              <View style={{ opacity: isActive ? 1 : 0.6, color: isActive ? '#FFFFFF' : themeColors.mediumGray }}>
                {p.icon}
              </View>
              <Text
                style={[
                  styles.label,
                  isActive ? styles.activeLabel : styles.inactiveLabel,
                ]}
              >
                {p.label}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
