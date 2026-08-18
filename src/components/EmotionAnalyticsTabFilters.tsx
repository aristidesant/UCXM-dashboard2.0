import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { colors, spacing, borderRadius, fontSize } from '../design';
import { useTheme } from '../context/ThemeContext';

type FilterTabId = 'agents' | 'clients' | 'calls' | 'campaigns';

interface EmotionAnalyticsTabFiltersProps {
  activeTab: FilterTabId;
  onSelectTab: (tabId: FilterTabId) => void;
}

const FILTER_TABS: Array<{ id: FilterTabId; label: string }> = [
  { id: 'agents', label: 'Agentes' },
  { id: 'clients', label: 'Clientes' },
  { id: 'calls', label: 'Llamadas' },
  { id: 'campaigns', label: 'Campañas' },
];

export const EmotionAnalyticsTabFilters: React.FC<EmotionAnalyticsTabFiltersProps> = ({
  activeTab,
  onSelectTab,
}) => {
  const { effectiveTheme } = useTheme();
  const isDark = effectiveTheme === 'dark';
  const themeColors = isDark ? colors.dark : colors.light;

  const styles = StyleSheet.create({
    container: {
      backgroundColor: isDark ? themeColors.sunkenBase : themeColors.pureSurface,
      borderBottomWidth: 1,
      borderBottomColor: themeColors.whisperBorder,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
    } as ViewStyle,
    tabsBar: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.sm,
    } as ViewStyle,
    tabButton: {
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.md,
      borderRadius: borderRadius.md,
      borderWidth: 1,
      justifyContent: 'center',
      alignItems: 'center',
    } as ViewStyle,
    tabButtonActive: {
      backgroundColor: colors.light.newtechGreen,
      borderColor: colors.light.newtechGreen,
    } as ViewStyle,
    tabButtonInactive: {
      backgroundColor: 'transparent',
      borderColor: themeColors.whisperBorder,
    } as ViewStyle,
    tabText: {
      fontSize: fontSize.sm,
      fontWeight: '500',
    } as TextStyle,
    tabTextActive: {
      color: colors.light.canvasFrost,
    } as TextStyle,
    tabTextInactive: {
      color: themeColors.steelSecondary,
    } as TextStyle,
  });

  return (
    <View style={styles.container}>
      <View style={styles.tabsBar}>
        {FILTER_TABS.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[
              styles.tabButton,
              activeTab === tab.id ? styles.tabButtonActive : styles.tabButtonInactive,
            ]}
            onPress={() => onSelectTab(tab.id)}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab.id ? styles.tabTextActive : styles.tabTextInactive,
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};
