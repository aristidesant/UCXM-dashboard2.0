import React from 'react';
import { StyleSheet, TouchableOpacity, Text, ScrollView, ViewStyle, TextStyle } from 'react-native';
import { colors, spacing, typography, borderRadius, fontSize } from '../design';
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
      paddingVertical: spacing.xs,
      backgroundColor: themeColors.canvasFrost,
    } as ViewStyle,
    pill: {
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.md,
      borderRadius: borderRadius.lg,
      borderWidth: 1,
      borderColor: isDark ? themeColors.whisperBorder : themeColors.lightGray,
      backgroundColor: isDark ? themeColors.canvasDark : themeColors.canvasLight,
      justifyContent: 'center',
      alignItems: 'center',
    } as ViewStyle,
    activePill: {
      backgroundColor: isDark
        ? `rgba(27, 181, 74, 0.15)`
        : `rgba(27, 181, 74, 0.1)`,
      borderColor: themeColors.newtechGreen,
      borderWidth: 1.5,
    } as ViewStyle,
    label: {
      fontSize: fontSize.sm,
      fontWeight: '500',
      color: themeColors.steelSecondary,
    } as TextStyle,
    activeLabel: {
      color: themeColors.newtechGreen,
      fontWeight: '600',
    } as TextStyle,
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
