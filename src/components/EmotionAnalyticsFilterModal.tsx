import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ViewStyle,
  TextStyle,
  Modal,
} from 'react-native';
import { colors, spacing, borderRadius, fontSize } from '../design';
import { useTheme } from '../context/ThemeContext';
import { DatePicker } from './DatePicker';
import { EmotionAnalyticsFilters as FiltersInterface } from '../hooks/useEmotionAnalytics';

interface EmotionAnalyticsFilterModalProps {
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
  onClose: () => void;
}

const AGENTS = ['Carlos Mendez', 'María García', 'Juan López', 'Sofia Ruiz'];
const CLIENTS = ['Retail', 'Finance', 'Healthcare', 'Tech'];
const CALL_TYPES = ['Inbound', 'Outbound', 'Internal'];
const CHANNELS = ['Phone', 'Chat', 'Email'];

export const EmotionAnalyticsFilterModal: React.FC<EmotionAnalyticsFilterModalProps> = ({
  filters,
  onToggleAgent,
  onToggleClient,
  onToggleCallType,
  onToggleChannel,
  onReset,
  onSetDateRange,
  onClose,
}) => {
  const { effectiveTheme } = useTheme();
  const isDark = effectiveTheme === 'dark';
  const themeColors = isDark ? colors.dark : colors.light;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'flex-end',
    } as ViewStyle,
    modal: {
      backgroundColor: themeColors.canvasFrost,
      borderTopLeftRadius: borderRadius.lg,
      borderTopRightRadius: borderRadius.lg,
      maxHeight: '80%',
      paddingBottom: spacing.lg,
    } as ViewStyle,
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: themeColors.whisperBorder,
    } as ViewStyle,
    title: {
      fontSize: fontSize.lg,
      fontWeight: '600',
      color: themeColors.inkPrimary,
    } as TextStyle,
    closeButton: {
      paddingVertical: spacing.xs,
      paddingHorizontal: spacing.sm,
    } as ViewStyle,
    closeButtonText: {
      fontSize: fontSize.lg,
      color: themeColors.steelSecondary,
      fontWeight: '600',
    } as TextStyle,
    scrollContent: {
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.md,
    } as ViewStyle,
    section: {
      marginBottom: spacing.lg,
    } as ViewStyle,
    sectionTitle: {
      fontSize: fontSize.sm,
      fontWeight: '600',
      color: themeColors.steelSecondary,
      marginBottom: spacing.sm,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    } as TextStyle,
    checkboxRow: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.md,
      borderRadius: borderRadius.md,
      marginBottom: spacing.xs,
    } as ViewStyle,
    checkboxRowActive: {
      backgroundColor: isDark ? themeColors.sunkenBase : colors.light.pureSurface,
    } as ViewStyle,
    checkbox: {
      width: 20,
      height: 20,
      borderWidth: 2,
      borderColor: themeColors.whisperBorder,
      borderRadius: borderRadius.sm,
      marginRight: spacing.md,
      justifyContent: 'center',
      alignItems: 'center',
    } as ViewStyle,
    checkboxChecked: {
      backgroundColor: colors.light.newtechGreen,
      borderColor: colors.light.newtechGreen,
    } as ViewStyle,
    checkboxLabel: {
      fontSize: fontSize.sm,
      fontWeight: '400',
      color: themeColors.inkPrimary,
      flex: 1,
    } as TextStyle,
    footer: {
      flexDirection: 'row',
      gap: spacing.md,
      paddingHorizontal: spacing.lg,
      paddingTop: spacing.md,
    } as ViewStyle,
    button: {
      flex: 1,
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.md,
      borderRadius: borderRadius.md,
      alignItems: 'center',
      justifyContent: 'center',
    } as ViewStyle,
    buttonReset: {
      backgroundColor: themeColors.whisperBorder,
    } as ViewStyle,
    buttonApply: {
      backgroundColor: colors.light.newtechGreen,
    } as ViewStyle,
    buttonText: {
      fontSize: fontSize.sm,
      fontWeight: '600',
    } as TextStyle,
    buttonTextReset: {
      color: themeColors.steelSecondary,
    } as TextStyle,
    buttonTextApply: {
      color: colors.light.canvasFrost,
    } as TextStyle,
  });

  const renderCheckboxItem = (
    label: string,
    value: string,
    isActive: boolean,
    onToggle: (val: string) => void
  ) => (
    <TouchableOpacity
      key={value}
      style={[styles.checkboxRow, isActive && styles.checkboxRowActive]}
      onPress={() => onToggle(value)}
      activeOpacity={0.7}
    >
      <View style={[styles.checkbox, isActive && styles.checkboxChecked]}>
        {isActive && <Text style={{ color: 'white', fontWeight: 'bold' }}>✓</Text>}
      </View>
      <Text style={styles.checkboxLabel}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <Modal transparent visible={true} animationType="slide" onRequestClose={onClose}>
      <View style={styles.container}>
        <View style={styles.modal}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Filtros de Análisis</Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose} activeOpacity={0.7}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* Scrollable Content */}
          <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
            {/* Agentes */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Agentes</Text>
              {AGENTS.map((agent, idx) =>
                renderCheckboxItem(agent, `agent-${idx + 1}`, false, onToggleAgent)
              )}
            </View>

            {/* Clientes */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Clientes</Text>
              {CLIENTS.map((client) =>
                renderCheckboxItem(client, client.toLowerCase(), false, onToggleClient)
              )}
            </View>

            {/* Tipo de Llamada */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Tipo de Llamada</Text>
              {CALL_TYPES.map((type) =>
                renderCheckboxItem(type, type.toLowerCase(), false, onToggleCallType)
              )}
            </View>

            {/* Canal */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Canal</Text>
              {CHANNELS.map((channel) =>
                renderCheckboxItem(channel, channel.toLowerCase(), false, onToggleChannel)
              )}
            </View>

            {/* Date Range */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Rango de Fechas</Text>
              <DatePicker
                label="Desde"
                value={filters.dateRange.start}
                onChange={(date) => onSetDateRange(date, filters.dateRange.end)}
              />
              <View style={{ height: spacing.sm }} />
              <DatePicker
                label="Hasta"
                value={filters.dateRange.end}
                onChange={(date) => onSetDateRange(filters.dateRange.start, date)}
              />
            </View>
          </ScrollView>

          {/* Footer */}
          <View style={styles.footer}>
            <TouchableOpacity
              style={[styles.button, styles.buttonReset]}
              onPress={onReset}
              activeOpacity={0.7}
            >
              <Text style={[styles.buttonText, styles.buttonTextReset]}>Limpiar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.buttonApply]}
              onPress={onClose}
              activeOpacity={0.7}
            >
              <Text style={[styles.buttonText, styles.buttonTextApply]}>Aplicar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
