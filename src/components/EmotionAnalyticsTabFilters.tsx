import React, { useState, useMemo } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
  ScrollView,
  FlatList,
} from 'react-native';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { colors, spacing, borderRadius, fontSize } from '../design';
import { useTheme } from '../context/ThemeContext';
import { EmotionAnalyticsFilters as FiltersInterface } from '../hooks/useEmotionAnalytics';

interface FilterTab {
  id: string;
  label: string;
  options: Array<{
    label: string;
    value: string;
  }>;
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
    label: 'Tipo de Llamadas',
    options: [
      { label: 'Inbound', value: 'inbound' },
      { label: 'Outbound', value: 'outbound' },
      { label: 'Internal', value: 'internal' },
    ],
  },
  {
    id: 'channels',
    label: 'Canales',
    options: [
      { label: 'Phone', value: 'phone' },
      { label: 'Chat', value: 'chat' },
      { label: 'Email', value: 'email' },
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

  const [activeTab, setActiveTab] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);

  const styles = StyleSheet.create({
    container: {
      backgroundColor: isDark ? themeColors.sunkenBase : themeColors.pureSurface,
      borderBottomWidth: 1,
      borderBottomColor: themeColors.whisperBorder,
      paddingVertical: spacing.md,
    } as ViewStyle,
    headerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.md,
      paddingHorizontal: spacing.md,
      marginBottom: spacing.md,
    } as ViewStyle,
    tabsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
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
      minWidth: 110,
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
    } as ViewStyle,
    optionButton: {
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.md,
      borderRadius: borderRadius.md,
      borderWidth: 1,
      marginRight: spacing.sm,
      marginBottom: spacing.sm,
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
    clearButton: {
      paddingVertical: spacing.xs,
      paddingHorizontal: spacing.sm,
      borderRadius: borderRadius.sm,
      backgroundColor: themeColors.whisperBorder,
    } as ViewStyle,
    clearButtonText: {
      fontSize: fontSize.xs,
      fontWeight: '500',
      color: themeColors.steelSecondary,
    } as TextStyle,
  });

  const currentTab = FILTER_TABS[activeTab];

  const getActiveFilters = () => {
    switch (currentTab.id) {
      case 'agents':
        return filters.agents;
      case 'clients':
        return filters.clients;
      case 'callTypes':
        return filters.callTypes;
      case 'channels':
        return filters.callChannel;
      default:
        return [];
    }
  };

  const handleOptionToggle = (value: string) => {
    switch (currentTab.id) {
      case 'agents':
        onToggleAgent(value);
        break;
      case 'clients':
        onToggleClient(value);
        break;
      case 'callTypes':
        onToggleCallType(value);
        break;
      case 'channels':
        onToggleChannel(value);
        break;
    }
  };

  const activeFilters = getActiveFilters();

  const handlePrevTab = () => {
    if (activeTab > 0) {
      setActiveTab(activeTab - 1);
    }
  };

  const handleNextTab = () => {
    if (activeTab < FILTER_TABS.length - 1) {
      setActiveTab(activeTab + 1);
    }
  };

  return (
    <View style={styles.container}>
      {/* Tab Navigation */}
      <View style={styles.headerRow}>
        <TouchableOpacity
          style={[styles.navButton, { opacity: activeTab === 0 ? 0.5 : 1 }]}
          onPress={handlePrevTab}
          disabled={activeTab === 0}
          activeOpacity={0.7}
        >
          <ChevronLeft size={20} color={themeColors.steelSecondary} strokeWidth={2} />
        </TouchableOpacity>

        <View style={styles.tabsContainer}>
          {FILTER_TABS.map((tab, idx) => (
            <TouchableOpacity
              key={tab.id}
              style={[
                styles.tabButton,
                activeTab === idx ? styles.tabButtonActive : styles.tabButtonInactive,
              ]}
              onPress={() => setActiveTab(idx)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === idx ? styles.tabTextActive : styles.tabTextInactive,
                ]}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={[styles.navButton, { opacity: activeTab === FILTER_TABS.length - 1 ? 0.5 : 1 }]}
          onPress={handleNextTab}
          disabled={activeTab === FILTER_TABS.length - 1}
          activeOpacity={0.7}
        >
          <ChevronRight size={20} color={themeColors.steelSecondary} strokeWidth={2} />
        </TouchableOpacity>

        {activeFilters.length > 0 && (
          <TouchableOpacity style={styles.clearButton} onPress={onReset} activeOpacity={0.7}>
            <Text style={styles.clearButtonText}>Limpiar</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Options for Active Tab */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.optionsContainer}
      >
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
      </ScrollView>
    </View>
  );
};
