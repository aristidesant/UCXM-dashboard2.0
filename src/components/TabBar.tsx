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

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      backgroundColor: colors.light.bgPrimary,
      borderTopWidth: 1,
      borderTopColor: colors.light.lightGray,
      height: isMobile ? 56 : 50,
      alignItems: 'center',
      justifyContent: isMobile ? 'space-around' : 'flex-start',
      paddingHorizontal: isMobile ? 0 : spacing.md,
      gap: isMobile ? 0 : spacing.lg,
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
      borderBottomColor: colors.light.primaryBlue,
    } as ViewStyle,
    icon: {
      fontSize: isMobile ? 20 : 18,
      marginBottom: isMobile ? spacing.xs : 0,
      marginRight: isMobile ? 0 : spacing.xs,
    },
    label: {
      ...typography.caption,
      color: colors.light.mediumGray,
    },
    activeLabel: {
      color: colors.light.primaryBlue,
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
