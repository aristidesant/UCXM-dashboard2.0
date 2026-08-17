import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Modal,
  TouchableOpacity,
  ScrollView,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { X } from 'lucide-react';
import { colors, spacing, borderRadius, fontSize } from '../design';
import { useTheme } from '../context/ThemeContext';
import { usePlatform } from '../hooks/usePlatform';
import { usePlatformContext } from '../context/PlatformContext';
import { Button } from './Button';

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  onApply: (filters: FilterValues) => void;
}

export interface FilterValues {
  campaignType: string[];
  campaignStatus: string[];
  startDate: string;
  endDate: string;
}

export const FilterModal: React.FC<FilterModalProps> = ({
  visible,
  onClose,
  onApply,
}) => {
  const { effectiveTheme } = useTheme();
  const { isMobile } = usePlatform();
  const { dimensions } = usePlatformContext();
  const isDark = effectiveTheme === 'dark';
  const themeColors = isDark ? colors.dark : colors.light;
  const screenHeight = dimensions.height;
  const screenWidth = dimensions.width;

  // Calculate modal width: with margins on mobile, full width on desktop
  const modalMaxWidth = isMobile ? screenWidth - (spacing.md * 2) : undefined;

  const [filters, setFilters] = useState<FilterValues>({
    campaignType: [],
    campaignStatus: [],
    startDate: '',
    endDate: '',
  });

  const campaignTypes = ['Localización', 'Evaluación de Clientes', 'Retención', 'Satisfacción'];
  const campaignStatuses = ['Activa', 'Pausada', 'Completada', 'Planeada'];

  const handleToggleCampaignType = (type: string) => {
    setFilters((prev) => ({
      ...prev,
      campaignType: prev.campaignType.includes(type)
        ? prev.campaignType.filter((t) => t !== type)
        : [...prev.campaignType, type],
    }));
  };

  const handleToggleCampaignStatus = (status: string) => {
    setFilters((prev) => ({
      ...prev,
      campaignStatus: prev.campaignStatus.includes(status)
        ? prev.campaignStatus.filter((s) => s !== status)
        : [...prev.campaignStatus, status],
    }));
  };

  const handleApply = () => {
    onApply(filters);
    onClose();
  };

  const handleReset = () => {
    setFilters({
      campaignType: [],
      campaignStatus: [],
      startDate: '',
      endDate: '',
    });
  };

  const styles = StyleSheet.create({
    modal: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'flex-end',
    } as ViewStyle,
    modalContent: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
      paddingHorizontal: 0,
    } as ViewStyle,
    container: {
      backgroundColor: themeColors.pureSurface,
      borderTopLeftRadius: borderRadius.lg,
      borderTopRightRadius: borderRadius.lg,
      borderBottomLeftRadius: isMobile ? borderRadius.lg : 0,
      borderBottomRightRadius: isMobile ? borderRadius.lg : 0,
      maxHeight: isMobile ? screenHeight * 0.65 : screenHeight * 0.85,
      maxWidth: modalMaxWidth,
      paddingTop: isMobile ? spacing.md : spacing.lg,
      width: isMobile ? modalMaxWidth : '100%',
    } as ViewStyle,
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: isMobile ? spacing.md : spacing.lg,
      paddingBottom: spacing.lg,
      borderBottomWidth: 1,
      borderBottomColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
    } as ViewStyle,
    title: {
      fontSize: fontSize.lg,
      fontWeight: '700',
      color: themeColors.inkPrimary,
      lineHeight: 24,
    } as TextStyle,
    closeButton: {
      padding: spacing.sm,
    } as ViewStyle,
    content: {
      paddingHorizontal: isMobile ? spacing.md : spacing.lg,
      paddingTop: spacing.lg,
      paddingBottom: spacing.lg,
    } as ViewStyle,
    section: {
      marginBottom: isMobile ? spacing.md : spacing.lg,
    } as ViewStyle,
    sectionTitle: {
      fontSize: isMobile ? fontSize.xs : fontSize.sm,
      fontWeight: '600',
      color: themeColors.steelSecondary,
      marginBottom: isMobile ? spacing.sm : spacing.md,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
      lineHeight: 16,
    } as TextStyle,
    optionsContainer: {
      gap: isMobile ? spacing.xs : spacing.sm,
    } as ViewStyle,
    optionButton: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: isMobile ? spacing.sm : spacing.md,
      paddingVertical: isMobile ? spacing.xs : spacing.sm,
      borderRadius: borderRadius.sm,
      borderWidth: 1,
      borderColor: themeColors.whisperBorder,
      backgroundColor: 'transparent',
      gap: spacing.sm,
    } as ViewStyle,
    optionButtonSelected: {
      backgroundColor: themeColors.newtechGreen,
      borderColor: themeColors.newtechGreen,
    } as ViewStyle,
    checkbox: {
      width: isMobile ? 14 : 16,
      height: isMobile ? 14 : 16,
      borderRadius: 3,
      borderWidth: 2,
      borderColor: themeColors.newtechGreen,
      justifyContent: 'center',
      alignItems: 'center',
      flexShrink: 0,
    } as ViewStyle,
    checkboxChecked: {
      backgroundColor: themeColors.newtechGreen,
    } as ViewStyle,
    checkmark: {
      color: '#FFFFFF',
      fontSize: 12,
      fontWeight: '700',
    } as TextStyle,
    optionLabel: {
      fontSize: isMobile ? fontSize.xs : fontSize.sm,
      fontWeight: '500',
      color: themeColors.inkPrimary,
      flex: 1,
      lineHeight: isMobile ? 16 : 18,
    } as TextStyle,
    optionLabelSelected: {
      color: '#FFFFFF',
    } as TextStyle,
    dateInputContainer: {
      flexDirection: 'row',
      gap: spacing.md,
    } as ViewStyle,
    dateInput: {
      flex: 1,
      borderWidth: 1,
      borderColor: themeColors.whisperBorder,
      borderRadius: borderRadius.sm,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
      backgroundColor: themeColors.pureSurface,
      color: themeColors.inkPrimary,
    } as ViewStyle,
    dateLabel: {
      fontSize: fontSize.xs,
      color: themeColors.steelSecondary,
      marginBottom: spacing.xs,
      fontWeight: '500',
    } as TextStyle,
    footer: {
      flexDirection: isMobile ? 'column' : 'row',
      gap: spacing.md,
      paddingHorizontal: isMobile ? spacing.md : spacing.lg,
      paddingBottom: spacing.lg,
      paddingTop: spacing.md,
      borderTopWidth: 1,
      borderTopColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
    } as ViewStyle,
  });

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.modal}>
        <View style={styles.modalContent}>
          <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Filtros</Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <X size={24} color={themeColors.inkPrimary} strokeWidth={2} />
            </TouchableOpacity>
          </View>

          {/* Content */}
          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            {/* Campaign Type Filter */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Tipo de Campaña</Text>
              <View style={styles.optionsContainer}>
                {campaignTypes.map((type) => (
                  <TouchableOpacity
                    key={type}
                    onPress={() => handleToggleCampaignType(type)}
                    style={[
                      styles.optionButton,
                      filters.campaignType.includes(type) && styles.optionButtonSelected,
                    ]}
                    activeOpacity={0.7}
                  >
                    <View
                      style={[
                        styles.checkbox,
                        filters.campaignType.includes(type) && styles.checkboxChecked,
                      ]}
                    >
                      {filters.campaignType.includes(type) && (
                        <Text style={styles.checkmark}>✓</Text>
                      )}
                    </View>
                    <Text
                      style={[
                        styles.optionLabel,
                        filters.campaignType.includes(type) && styles.optionLabelSelected,
                      ]}
                    >
                      {type}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Campaign Status Filter */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Estado de la Campaña</Text>
              <View style={styles.optionsContainer}>
                {campaignStatuses.map((status) => (
                  <TouchableOpacity
                    key={status}
                    onPress={() => handleToggleCampaignStatus(status)}
                    style={[
                      styles.optionButton,
                      filters.campaignStatus.includes(status) && styles.optionButtonSelected,
                    ]}
                    activeOpacity={0.7}
                  >
                    <View
                      style={[
                        styles.checkbox,
                        filters.campaignStatus.includes(status) && styles.checkboxChecked,
                      ]}
                    >
                      {filters.campaignStatus.includes(status) && (
                        <Text style={styles.checkmark}>✓</Text>
                      )}
                    </View>
                    <Text
                      style={[
                        styles.optionLabel,
                        filters.campaignStatus.includes(status) && styles.optionLabelSelected,
                      ]}
                    >
                      {status}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Date Range Filter */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Rango de Fecha</Text>
              <View style={styles.dateInputContainer}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.dateLabel}>Inicio</Text>
                  <TouchableOpacity
                    style={styles.dateInput}
                    onPress={() => {
                      // In a real app, this would open a date picker
                      // For now, we'll just update state
                    }}
                  >
                    <Text
                      style={{
                        color: filters.startDate || themeColors.mutedSlate,
                        fontSize: fontSize.sm,
                      }}
                    >
                      {filters.startDate || 'Seleccionar...'}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.dateLabel}>Fin</Text>
                  <TouchableOpacity
                    style={styles.dateInput}
                    onPress={() => {
                      // In a real app, this would open a date picker
                      // For now, we'll just update state
                    }}
                  >
                    <Text
                      style={{
                        color: filters.endDate || themeColors.mutedSlate,
                        fontSize: fontSize.sm,
                      }}
                    >
                      {filters.endDate || 'Seleccionar...'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>

          {/* Footer */}
          <View style={styles.footer}>
            <Button
              title="Limpiar"
              onPress={handleReset}
              variant="secondary"
              style={{ flex: 1 }}
            />
            <Button
              title="Aplicar"
              onPress={handleApply}
              style={{ flex: 1 }}
            />
          </View>
        </View>
        </View>
      </View>
    </Modal>
  );
};
