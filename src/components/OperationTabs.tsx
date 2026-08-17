import React, { useRef } from 'react';
import { StyleSheet, TouchableOpacity, Text, ScrollView, View, ViewStyle, TextStyle } from 'react-native';
import { ChevronLeft, ChevronRight } from 'lucide-react';
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
  const scrollViewRef = useRef<ScrollView>(null);

  const tabs = [
    { id: 'llamadas', label: 'Llamadas' },
    { id: 'gestion', label: 'Gestión y Resultados' },
    { id: 'calidad', label: 'Calidad' },
  ];

  const handleScrollLeft = () => {
    scrollViewRef.current?.scrollTo({ x: 0, animated: true });
  };

  const handleScrollRight = () => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  };

  const styles = StyleSheet.create({
    wrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.md,
      paddingVertical: spacing.xs,
      backgroundColor: themeColors.canvasFrost,
    } as ViewStyle,
    container: {
      flex: 1,
      flexDirection: 'row',
      gap: spacing.lg,
      paddingHorizontal: spacing.lg,
    } as ViewStyle,
    chevronButton: {
      width: 36,
      height: 36,
      borderRadius: borderRadius.md,
      backgroundColor: isDark ? themeColors.canvasDark : themeColors.canvasLight,
      borderWidth: 1,
      borderColor: isDark ? themeColors.whisperBorder : themeColors.lightGray,
      justifyContent: 'center',
      alignItems: 'center',
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
    <View style={styles.wrapper}>
      <TouchableOpacity
        style={styles.chevronButton}
        onPress={handleScrollLeft}
        activeOpacity={0.7}
      >
        <ChevronLeft size={18} color={themeColors.steelSecondary} />
      </TouchableOpacity>

      <ScrollView
        ref={scrollViewRef}
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

      <TouchableOpacity
        style={styles.chevronButton}
        onPress={handleScrollRight}
        activeOpacity={0.7}
      >
        <ChevronRight size={18} color={themeColors.steelSecondary} />
      </TouchableOpacity>
    </View>
  );
};
