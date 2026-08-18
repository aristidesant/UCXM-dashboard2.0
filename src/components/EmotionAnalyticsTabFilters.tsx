import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
  ScrollView,
} from 'react-native';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { colors, spacing, borderRadius, fontSize } from '../design';
import { useTheme } from '../context/ThemeContext';
import { EmotionAnalyticsFilters as FiltersInterface } from '../hooks/useEmotionAnalytics';

interface FilterOption {
  label: string;
  value: string;
}

interface FilterTab {
  id: string;
  label: string;
  options: FilterOption[];
}

interface EmotionAnalyticsTabFiltersProps {
  filters: FiltersInterface;
  onToggleAgent: (agentId: string) => void;
  onToggleClient: (clientId: string) => void;
  onToggleCallType: (callType: string) => void;
  onToggleChannel: (channel: string) => void;
  onReset: () => void;
}

const FILTER_TABS: FilterTab[] = [
  {
    id: 'agents',
    label: 'Agentes',
    options: [
      { label: 'Carlos Mendez', value: 'agent-1' },
      { label: 'María García', value: 'agent-2' },
      { label: 'Juan López', value: 'agent-3' },
      { label: 'Sofia Ruiz', value: 'agent-4' },
    ],
  },
  {
    id: 'clients',
    label: 'Clientes',
    options: [
      { label: 'Retail', value: 'retail' },
      { label: 'Finance', value: 'finance' },
      { label: 'Healthcare', value: 'healthcare' },
      { label: 'Tech', value: 'tech' },
    ],
  },
  {
    id: 'callTypes',
    label: 'Llamadas',
    options: [
      { label: 'Inbound', value: 'inbound' },
      { label: 'Outbound', value: 'outbound' },
      { label: 'Internal', value: 'internal' },
    ],
  },
  {
    id: 'campaigns',
    label: 'Campañas',
    options: [
      { label: 'Localización', value: 'localization' },
      { label: 'Retención', value: 'retention' },
      { label: 'Evaluación', value: 'evaluation' },
    ],
  },
];

export const EmotionAnalyticsTabFilters: React.FC<EmotionAnalyticsTabFiltersProps> = ({
  filters,
  onToggleAgent,
  onToggleClient,
  onToggleCallType,
  onToggleChannel,
  onReset,
}) => {
  const { effectiveTheme } = useTheme();
  const isDark = effectiveTheme === 'dark';
  const themeColors = isDark ? colors.dark : colors.light;

  const [activeTabId, setActiveTabId] = useState<string>('agents');

  const styles = StyleSheet.create({
    container: {
      backgroundColor: isDark ? themeColors.sunkenBase : themeColors.pureSurface,
      borderBottomWidth: 1,
      borderBottomColor: themeColors.whisperBorder,
    } as ViewStyle,
    tabsBar: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
      gap: spacing.sm,
    } as ViewStyle,
    navButton: {
      width: 36,
      height: 36,
      borderRadius: borderRadius.md,
      backgroundColor: isDark ? themeColors.canvasFrost : themeColors.sunkenBase,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: themeColors.whisperBorder,
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
    optionsContainer: {
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.md,
      gap: spacing.sm,
      flexDirection: 'row',
      flexWrap: 'wrap',
    } as ViewStyle,
    optionButton: {
      paddingVertical: spacing.xs,
      paddingHorizontal: spacing.md,
      borderRadius: borderRadius.md,
      borderWidth: 1,
    } as ViewStyle,
    optionButtonActive: {
      backgroundColor: colors.light.newtechGreen,
      borderColor: colors.light.newtechGreen,
    } as ViewStyle,
    optionButtonInactive: {
      backgroundColor: 'transparent',
      borderColor: themeColors.whisperBorder,
    } as ViewStyle,
    optionText: {
      fontSize: fontSize.xs,
      fontWeight: '500',
    } as TextStyle,
    optionTextActive: {
      color: colors.light.canvasFrost,
    } as TextStyle,
    optionTextInactive: {
      color: themeColors.steelSecondary,
    } as TextStyle,
  });

  const currentTab = FILTER_TABS.find((tab) => tab.id === activeTabId) || FILTER_TABS[0];

  const getActiveFilters = (): string[] => {
    switch (activeTabId) {
      case 'agents':
        return filters.agents;
      case 'clients':
        return filters.clients;
      case 'callTypes':
        return filters.callTypes;
      case 'campaigns':
        return filters.campaignTypes;
      default:
        return [];
    }
  };

  const handleOptionToggle = (value: string) => {
    switch (activeTabId) {
      case 'agents':
        onToggleAgent(value);
        break;
      case 'clients':
        onToggleClient(value);
        break;
      case 'callTypes':
        onToggleCallType(value);
        break;
      case 'campaigns':
        // Usar toggleCampaignType si existe, de lo contrario usar un callback genérico
        break;
    }
  };

  const activeFilters = getActiveFilters();

  return (
    <View style={styles.container}>
      {/* Tabs Bar - Similar to OperationTabs */}
      <View style={styles.tabsBar}>
        {FILTER_TABS.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[
              styles.tabButton,
              activeTabId === tab.id ? styles.tabButtonActive : styles.tabButtonInactive,
            ]}
            onPress={() => setActiveTabId(tab.id)}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.tabText,
                activeTabId === tab.id ? styles.tabTextActive : styles.tabTextInactive,
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Options for Active Tab */}
      <View style={styles.optionsContainer}>
        {currentTab.options.map((option) => (
          <TouchableOpacity
            key={option.value}
            style={[
              styles.optionButton,
              activeFilters.includes(option.value)
                ? styles.optionButtonActive
                : styles.optionButtonInactive,
            ]}
            onPress={() => handleOptionToggle(option.value)}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.optionText,
                activeFilters.includes(option.value)
                  ? styles.optionTextActive
                  : styles.optionTextInactive,
              ]}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};
