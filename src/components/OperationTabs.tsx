import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text, ScrollView, ViewStyle } from 'react-native';
import { colors, spacing, typography } from '../design';
import { useTheme } from '../context/ThemeContext';

interface OperationTabsProps {
  activeTab: 'llamadas' | 'gestion' | 'calidad';
  onSelectTab: (tab: 'llamadas' | 'gestion' | 'calidad') => void;
}

export const OperationTabs: React.FC<OperationTabsProps> = ({
  activeTab,
  onSelectTab,
}) => {
  const { effectiveTheme } = useTheme();
  const isDark = effectiveTheme === 'dark';
  const themeColors = isDark ? colors.dark : colors.light;

  const tabs = [
    { id: 'llamadas', label: 'Llamadas' },
    { id: 'gestion', label: 'Gestión y Resultados' },
    { id: 'calidad', label: 'Calidad' },
  ];

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      gap: spacing.md,
      paddingHorizontal: spacing.lg,
      paddingVertical: 4,
      backgroundColor: themeColors.canvasFrost,
    } as ViewStyle,
    pill: {
      flex: 1,
      paddingVertical: 0,
      paddingHorizontal: spacing.xs,
      borderRadius: 12,
      borderWidth: 1,
      height: 28,
      borderColor: isDark ? 'rgba(200, 204, 211, 0.2)' : 'rgba(99, 115, 129, 0.15)',
      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(99, 115, 129, 0.06)',
      justifyContent: 'center',
      alignItems: 'center',
    } as ViewStyle,
    activePill: {
      backgroundColor: isDark
        ? 'rgba(27, 181, 74, 0.25)'
        : 'rgba(27, 181, 74, 0.18)',
      borderColor: themeColors.newtechGreen,
      borderWidth: 1.5,
    } as ViewStyle,
    label: {
      fontSize: 12,
      fontWeight: '500',
      color: themeColors.steelSecondary,
      lineHeight: 16,
    } as ViewStyle,
    activeLabel: {
      color: themeColors.newtechGreen,
      fontWeight: '600',
    } as ViewStyle,
  });

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}
      scrollEnabled={true}
    >
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <TouchableOpacity
            key={tab.id}
            style={[styles.pill, isActive && styles.activePill]}
            onPress={() => onSelectTab(tab.id as 'llamadas' | 'gestion' | 'calidad')}
            activeOpacity={0.7}
          >
            <Text style={[styles.label, isActive && styles.activeLabel]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};
