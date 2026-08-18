import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
  FlatList,
} from 'react-native';
import { colors, spacing, borderRadius, fontSize } from '../design';
import { useTheme } from '../context/ThemeContext';
import { Dropdown } from './Dropdown';
import { DatePicker } from './DatePicker';
import { EmotionAnalyticsFilters as FiltersInterface } from '../hooks/useEmotionAnalytics';

interface EmotionAnalyticsFiltersProps {
  filters: FiltersInterface;
  onFilterChange: (key: string, value: any) => void;
  onToggleAgent: (agentId: string) => void;
  onToggleClient: (clientId: string) => void;
  onToggleCallType: (callType: string) => void;
  onToggleChannel: (channel: string) => void;
  onToggleCampaignType: (campaignType: string) => void;
  onToggleCampaignStatus: (status: string) => void;
  onSetDateRange: (start: string, end: string) => void;
  onReset: () => void;
}

const AGENT_OPTIONS = [
  { label: 'Carlos Mendez', value: 'agent-1' },
  { label: 'María García', value: 'agent-2' },
  { label: 'Juan López', value: 'agent-3' },
  { label: 'Sofia Ruiz', value: 'agent-4' },
];

const CLIENT_OPTIONS = [
  { label: 'Retail', value: 'retail' },
  { label: 'Finance', value: 'finance' },
  { label: 'Healthcare', value: 'healthcare' },
  { label: 'Tech', value: 'tech' },
];

const CALL_TYPE_OPTIONS = [
  { label: 'Inbound', value: 'inbound' },
  { label: 'Outbound', value: 'outbound' },
  { label: 'Internal', value: 'internal' },
];

const CHANNEL_OPTIONS = [
  { label: 'Phone', value: 'phone' },
  { label: 'Chat', value: 'chat' },
  { label: 'Email', value: 'email' },
];

export const EmotionAnalyticsFilters: React.FC<EmotionAnalyticsFiltersProps> = ({
  filters,
  onToggleAgent,
  onToggleClient,
  onToggleCallType,
  onToggleChannel,
  onToggleCampaignType,
  onToggleCampaignStatus,
  onSetDateRange,
  onReset,
}) => {
  const { effectiveTheme } = useTheme();
  const isDark = effectiveTheme === 'dark';
  const themeColors = isDark ? colors.dark : colors.light;

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      gap: spacing.md,
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.md,
      backgroundColor: isDark ? themeColors.sunkenBase : themeColors.pureSurface,
      borderBottomWidth: 1,
      borderBottomColor: themeColors.whisperBorder,
      flexWrap: 'wrap',
      alignItems: 'center',
    } as ViewStyle,
    filterLabel: {
      fontSize: fontSize.sm,
      fontWeight: '500',
      color: themeColors.steelSecondary,
      marginBottom: spacing.xs,
    } as TextStyle,
    buttonGroup: {
      flexDirection: 'row',
      gap: spacing.sm,
      marginLeft: 'auto',
    } as ViewStyle,
    resetButton: {
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.md,
      borderWidth: 1,
      borderColor: themeColors.whisperBorder,
      borderRadius: borderRadius.md,
      backgroundColor: themeColors.canvasFrost,
    } as ViewStyle,
    resetButtonText: {
      fontSize: fontSize.sm,
      fontWeight: '500',
      color: themeColors.steelSecondary,
    } as TextStyle,
    filterCounter: {
      paddingVertical: 2,
      paddingHorizontal: 6,
      borderRadius: borderRadius.sm,
      backgroundColor: colors.light.newtechGreen,
      marginLeft: spacing.xs,
    } as ViewStyle,
    filterCounterText: {
      fontSize: 10,
      fontWeight: '600',
      color: colors.light.canvasFrost,
    } as TextStyle,
  });

  const activeFilterCount =
    filters.agents.length +
    filters.clients.length +
    filters.callTypes.length +
    filters.callChannel.length +
    filters.campaignTypes.length +
    filters.campaignStatus.length +
    (filters.dateRange.start ? 1 : 0) +
    (filters.dateRange.end ? 1 : 0);

  return (
    <View style={styles.container}>
      {/* Agentes */}
      <Dropdown
        label="Agentes"
        value={filters.agents[0] || ''}
        options={AGENT_OPTIONS}
        onChange={(value) => onToggleAgent(value)}
        minWidth={140}
      />

      {/* Clientes */}
      <Dropdown
        label="Clientes"
        value={filters.clients[0] || ''}
        options={CLIENT_OPTIONS}
        onChange={(value) => onToggleClient(value)}
        minWidth={140}
      />

      {/* Tipo de Llamada */}
      <Dropdown
        label="Tipo de Llamada"
        value={filters.callTypes[0] || ''}
        options={CALL_TYPE_OPTIONS}
        onChange={(value) => onToggleCallType(value)}
        minWidth={140}
      />

      {/* Canal */}
      <Dropdown
        label="Canal"
        value={filters.callChannel[0] || ''}
        options={CHANNEL_OPTIONS}
        onChange={(value) => onToggleChannel(value)}
        minWidth={120}
      />

      {/* Date Range */}
      <DatePicker
        label="Desde"
        value={filters.dateRange.start}
        onChange={(date) => onSetDateRange(date, filters.dateRange.end)}
        minWidth={120}
      />

      <DatePicker
        label="Hasta"
        value={filters.dateRange.end}
        onChange={(date) => onSetDateRange(filters.dateRange.start, date)}
        minWidth={120}
      />

      {/* Reset Button with Counter */}
      <View style={styles.buttonGroup}>
        {activeFilterCount > 0 && (
          <View style={styles.filterCounter}>
            <Text style={styles.filterCounterText}>{activeFilterCount}</Text>
          </View>
        )}
        <TouchableOpacity style={styles.resetButton} onPress={onReset} activeOpacity={0.7}>
          <Text style={styles.resetButtonText}>Limpiar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
