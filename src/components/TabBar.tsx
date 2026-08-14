// src/components/TabBar.tsx

import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { colors, typography, spacing } from '../design';
import { usePlatform } from '../hooks/usePlatform';
import { useTheme } from '../context/ThemeContext';

interface TabBarProps {
  currentScreen: string;
  onSelectScreen: (screen: string) => void;
  tabs: { id: string; label: string; icon: string }[];
}

export const TabBar: React.FC<TabBarProps> = ({
  currentScreen,
  onSelectScreen,
  tabs,
}) => {
  const { platform } = usePlatform();
  const isMobile = platform === 'mobile';
  const { effectiveTheme } = useTheme();
  const isDark = effectiveTheme === 'dark';
  const themeColors = isDark ? colors.dark : colors.light;

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      backgroundColor: isDark ? 'rgba(20, 26, 34, 0.8)' : 'rgba(255, 255, 255, 0.85)',
      backdropFilter: 'blur(20px)',
      borderTopWidth: 1,
      borderTopColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
      height: isMobile ? 56 : 50,
      alignItems: 'center',
      justifyContent: isMobile ? 'space-around' : 'flex-start',
      paddingHorizontal: isMobile ? 0 : spacing.md,
      gap: isMobile ? 0 : spacing.lg,
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: -4 },
      shadowOpacity: isDark ? 0.3 : 0.08,
      shadowRadius: 16,
      elevation: 10,
    } as ViewStyle,
    tab: {
      flex: isMobile ? 1 : undefined,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: spacing.sm,
      borderBottomWidth: 3,
      borderBottomColor: 'transparent',
    } as ViewStyle,
    activeTab: {
      borderBottomColor: themeColors.primaryBlue,
    } as ViewStyle,
    icon: {
      fontSize: isMobile ? 20 : 18,
      marginBottom: isMobile ? spacing.xs : 0,
      marginRight: isMobile ? 0 : spacing.xs,
    },
    label: {
      ...typography.caption,
      color: themeColors.mediumGray,
    },
    activeLabel: {
      color: themeColors.primaryBlue,
      fontWeight: '600',
    },
  });

  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const isActive = currentScreen === tab.id;
        return (
          <TouchableOpacity
            key={tab.id}
            style={[styles.tab, isActive && styles.activeTab]}
            onPress={() => onSelectScreen(tab.id)}
            activeOpacity={0.7}
          >
            <Text style={styles.icon}>{tab.icon}</Text>
            {isMobile && (
              <Text style={[styles.label, isActive && styles.activeLabel]}>
                {tab.label}
              </Text>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
