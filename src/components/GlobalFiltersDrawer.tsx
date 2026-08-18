import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
  Modal,
  ScrollView,
} from 'react-native';
import { ChevronLeft } from 'lucide-react';
import { colors, spacing, borderRadius, fontSize } from '../design';
import { useTheme } from '../context/ThemeContext';
import { useUpdateFilters, useGlobalAnalytics } from '../hooks/useGlobalAnalytics';
import { CampaignType, LOB, Status } from '../contexts/GlobalAnalyticsContext';

interface GlobalFiltersDrawerProps {
  visible: boolean;
  onClose: () => void;
}

const CAMPAIGN_OPTIONS: { label: string; value: CampaignType }[] = [
  { label: 'Outbound', value: 'outbound' },
  { label: 'Inbound', value: 'inbound' },
  { label: 'Mixta', value: 'mixta' },
];

const LOB_OPTIONS: { label: string; value: LOB }[] = [
  { label: 'Ventas', value: 'Ventas' },
  { label: 'Cuentas por Cobrar', value: 'CxC' },
  { label: 'Retención', value: 'Retención' },
  { label: 'Localización', value: 'Localización' },
  { label: 'Activación', value: 'Activación' },
];

const STATUS_OPTIONS: { label: string; value: Status }[] = [
  { label: 'Activa', value: 'activa' },
  { label: 'Inactiva', value: 'inactiva' },
];

export const GlobalFiltersDrawer: React.FC<GlobalFiltersDrawerProps> = ({
  visible,
  onClose,
}) => {
  const { effectiveTheme } = useTheme();
  const isDark = effectiveTheme === 'dark';
  const themeColors = isDark ? colors.dark : colors.light;

  const { filters, clearFilters } = useGlobalAnalytics();
  const { updateCampaignType, updateLOB, updateStatus, updateDateRange } =
    useUpdateFilters();

  const [localDateFrom, setLocalDateFrom] = useState(filters.dateRange.from);
  const [localDateTo, setLocalDateTo] = useState(filters.dateRange.to);

  const handleApply = () => {
    updateDateRange(localDateFrom, localDateTo);
    onClose();
  };

  const handleClear = () => {
    clearFilters();
    setLocalDateFrom(filters.dateRange.from);
    setLocalDateTo(filters.dateRange.to);
    onClose();
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-end',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    } as ViewStyle,
    drawer: {
      backgroundColor: isDark ? themeColors.sunkenBase : themeColors.pureSurface,
      borderTopLeftRadius: borderRadius.xl,
      borderTopRightRadius: borderRadius.xl,
      maxHeight: '70%',
      paddingBottom: spacing.lg,
    } as ViewStyle,
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: themeColors.whisperBorder,
    } as ViewStyle,
    headerTitle: {
      fontSize: fontSize.lg,
      fontWeight: '600',
      color: themeColors.inkPrimary,
      flex: 1,
    } as TextStyle,
    closeButton: {
      width: 36,
      height: 36,
      justifyContent: 'center',
      alignItems: 'center',
    } as ViewStyle,
    content: {
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.md,
    } as ViewStyle,
    section: {
      marginBottom: spacing.lg,
    } as ViewStyle,
    sectionTitle: {
      fontSize: fontSize.sm,
      fontWeight: '600',
      color: themeColors.inkPrimary,
      marginBottom: spacing.md,
    } as TextStyle,
    optionRow: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.md,
      backgroundColor: isDark ? themeColors.canvasDark : colors.light.sunkenBase,
      borderRadius: borderRadius.md,
      marginBottom: spacing.sm,
    } as ViewStyle,
    optionText: {
      flex: 1,
      fontSize: fontSize.sm,
      color: themeColors.inkPrimary,
      fontWeight: '500',
    } as TextStyle,
    checkbox: {
      width: 20,
      height: 20,
      borderRadius: borderRadius.sm,
      borderWidth: 2,
      borderColor: themeColors.whisperBorder,
      justifyContent: 'center',
      alignItems: 'center',
    } as ViewStyle,
    checkboxChecked: {
      backgroundColor: colors.light.newtechGreen,
      borderColor: colors.light.newtechGreen,
    } as ViewStyle,
    checkmark: {
      color: colors.light.canvasFrost,
      fontSize: fontSize.md,
      fontWeight: 'bold',
    } as TextStyle,
    buttonContainer: {
      flexDirection: 'row',
      gap: spacing.md,
      paddingHorizontal: spacing.md,
      paddingTop: spacing.md,
      borderTopWidth: 1,
      borderTopColor: themeColors.whisperBorder,
    } as ViewStyle,
    button: {
      flex: 1,
      paddingVertical: spacing.md,
      borderRadius: borderRadius.md,
      justifyContent: 'center',
      alignItems: 'center',
    } as ViewStyle,
    applyButton: {
      backgroundColor: colors.light.newtechGreen,
    } as ViewStyle,
    clearButton: {
      backgroundColor: themeColors.whisperBorder,
    } as ViewStyle,
    buttonText: {
      fontSize: fontSize.sm,
      fontWeight: '600',
    } as TextStyle,
    applyButtonText: {
      color: colors.light.canvasFrost,
    } as TextStyle,
    clearButtonText: {
      color: themeColors.steelSecondary,
    } as TextStyle,
  });

  if (!visible) {
    return null;
  }

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.container}>
        <View style={styles.drawer}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Filtros Globales</Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose} activeOpacity={0.7}>
              <ChevronLeft size={24} color={themeColors.steelSecondary} strokeWidth={2} />
            </TouchableOpacity>
          </View>

          {/* Filters */}
          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            {/* Campaign Type */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Tipo de Campaña</Text>
              {CAMPAIGN_OPTIONS.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  style={styles.optionRow}
                  onPress={() => updateCampaignType(filters.campaignType === option.value ? null : option.value)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.optionText}>{option.label}</Text>
                  <View
                    style={[
                      styles.checkbox,
                      filters.campaignType === option.value && styles.checkboxChecked,
                    ]}
                  >
                    {filters.campaignType === option.value && (
                      <Text style={styles.checkmark}>✓</Text>
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </View>

            {/* LOB */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Línea de Negocio</Text>
              {LOB_OPTIONS.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  style={styles.optionRow}
                  onPress={() => updateLOB(filters.lob === option.value ? null : option.value)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.optionText}>{option.label}</Text>
                  <View
                    style={[
                      styles.checkbox,
                      filters.lob === option.value && styles.checkboxChecked,
                    ]}
                  >
                    {filters.lob === option.value && (
                      <Text style={styles.checkmark}>✓</Text>
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </View>

            {/* Status */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Estatus</Text>
              {STATUS_OPTIONS.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  style={styles.optionRow}
                  onPress={() => updateStatus(filters.status === option.value ? null : option.value)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.optionText}>{option.label}</Text>
                  <View
                    style={[
                      styles.checkbox,
                      filters.status === option.value && styles.checkboxChecked,
                    ]}
                  >
                    {filters.status === option.value && (
                      <Text style={styles.checkmark}>✓</Text>
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          {/* Footer Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.clearButton]}
              onPress={handleClear}
              activeOpacity={0.7}
            >
              <Text style={[styles.buttonText, styles.clearButtonText]}>Limpiar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.applyButton]}
              onPress={handleApply}
              activeOpacity={0.7}
            >
              <Text style={[styles.buttonText, styles.applyButtonText]}>Aplicar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
