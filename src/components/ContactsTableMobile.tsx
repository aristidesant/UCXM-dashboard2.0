import React, { useState, useMemo } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, ViewStyle, TextStyle, TextInput } from 'react-native';
import { ChevronDown, Check } from 'lucide-react';
import { colors, spacing, borderRadius, fontSize } from '../design';
import { Call } from '../data/mockCalls';
import { useTheme } from '../context/ThemeContext';

interface ContactsTableMobileProps {
  calls: Call[];
  onSelectCall: (call: Call) => void;
}

type EffectivenessFilter = 'all' | 'effective' | 'ineffective';

export const ContactsTableMobile: React.FC<ContactsTableMobileProps> = ({
  calls,
  onSelectCall,
}) => {
  const { effectiveTheme } = useTheme();
  const isDark = effectiveTheme === 'dark';
  const themeColors = isDark ? colors.dark : colors.light;

  const [effectivenessFilter, setEffectivenessFilter] = useState<EffectivenessFilter>('all');
  const [isListFilterExpanded, setIsListFilterExpanded] = useState(false);
  const [listSearchQuery, setListSearchQuery] = useState('');

  // Get unique contact lists
  const availableLists = useMemo(() => {
    const lists = new Set(calls.map((c) => c.contactList));
    return Array.from(lists).sort();
  }, [calls]);

  const [selectedLists, setSelectedLists] = useState<string[]>(availableLists);
  const [tempSelectedLists, setTempSelectedLists] = useState<string[]>(selectedLists);
  const [modalPageIndex, setModalPageIndex] = useState(0);
  const [modalListFilter, setModalListFilter] = useState<'all' | 'selected' | 'unselected'>('all');

  // Filter calls
  const filteredCalls = useMemo(() => {
    return calls.filter((call) => {
      if (!selectedLists.includes(call.contactList)) return false;
      if (effectivenessFilter === 'all') return true;
      const isEffective = call.disposition === 'Exitoso' || call.disposition === 'Exitosa';
      return effectivenessFilter === 'effective' ? isEffective : !isEffective;
    });
  }, [calls, effectivenessFilter, selectedLists]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
    } as ViewStyle,
    filterContainer: {
      flexDirection: 'row',
      gap: spacing.sm,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.md,
      alignItems: 'center',
    } as ViewStyle,
    filterButtonsGroup: {
      flexDirection: 'row',
      gap: spacing.sm,
      flex: 1,
    } as ViewStyle,
    filterButton: {
      paddingHorizontal: spacing.sm,
      paddingVertical: spacing.xs,
      borderRadius: borderRadius.md,
      borderWidth: 1,
      borderColor: themeColors.whisperBorder,
      backgroundColor: isDark ? themeColors.sunkenBase : themeColors.pureSurface,
    } as ViewStyle,
    filterButtonActive: {
      backgroundColor: colors.light.newtechGreen,
      borderColor: colors.light.newtechGreen,
    } as ViewStyle,
    filterButtonText: {
      fontSize: fontSize.xs,
      fontWeight: '500',
      color: themeColors.steelSecondary,
    } as TextStyle,
    filterButtonTextActive: {
      color: '#FFFFFF',
      fontWeight: '600',
    } as TextStyle,
    listFilterButton: {
      paddingHorizontal: spacing.sm,
      paddingVertical: spacing.xs,
      borderRadius: borderRadius.md,
      borderWidth: 1,
      borderColor: themeColors.whisperBorder,
      backgroundColor: isDark ? themeColors.sunkenBase : themeColors.pureSurface,
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.xs,
    } as ViewStyle,
    listFilterButtonText: {
      fontSize: fontSize.xs,
      fontWeight: '500',
      color: themeColors.steelSecondary,
    } as TextStyle,
    listFilterBadge: {
      backgroundColor: colors.light.newtechGreen,
      borderRadius: borderRadius.sm,
      paddingHorizontal: spacing.xs,
      paddingVertical: 1,
    } as ViewStyle,
    listFilterBadgeText: {
      fontSize: fontSize.xs,
      fontWeight: '600',
      color: '#FFFFFF',
    } as TextStyle,
    tableContainer: {
      flex: 1,
      marginHorizontal: spacing.md,
      marginBottom: spacing.md,
      borderRadius: borderRadius.lg,
      borderWidth: 1,
      borderColor: themeColors.whisperBorder,
      backgroundColor: isDark ? themeColors.sunkenBase : themeColors.pureSurface,
      overflow: 'hidden',
    } as ViewStyle,
    tableHeader: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: themeColors.whisperBorder,
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.md,
      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.02)',
    } as ViewStyle,
    tableHeaderCell: {
      flex: 1,
    } as ViewStyle,
    tableHeaderText: {
      fontSize: fontSize.xs,
      fontWeight: '600',
      color: themeColors.steelSecondary,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    } as TextStyle,
    tableRow: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)',
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.md,
      alignItems: 'flex-start',
      gap: spacing.md,
    } as ViewStyle,
    tableCell: {
      flex: 1,
    } as ViewStyle,
    tableCellLeft: {
      flex: 1,
      gap: spacing.xs,
    } as ViewStyle,
    tableCellText: {
      fontSize: fontSize.xs,
      color: themeColors.inkPrimary,
      fontWeight: '400',
    } as TextStyle,
    tableCellName: {
      fontSize: fontSize.sm,
      fontWeight: '600',
      color: themeColors.inkPrimary,
    } as TextStyle,
    dispositionBadge: {
      paddingHorizontal: spacing.sm,
      paddingVertical: 2,
      borderRadius: borderRadius.sm,
      backgroundColor: colors.light.newtechGreen,
      alignSelf: 'flex-start',
    } as ViewStyle,
    dispositionBadgeIneffective: {
      backgroundColor: '#9CA3AF',
    } as ViewStyle,
    dispositionBadgeText: {
      fontSize: fontSize.xs,
      fontWeight: '600',
      color: '#FFFFFF',
    } as TextStyle,
    emptyState: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: spacing.xl,
    } as ViewStyle,
    emptyStateText: {
      fontSize: fontSize.sm,
      color: themeColors.steelSecondary,
    } as TextStyle,
    modalOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 9999,
    } as ViewStyle,
    modalContent: {
      backgroundColor: isDark ? themeColors.sunkenBase : themeColors.pureSurface,
      borderRadius: borderRadius.lg,
      borderWidth: 1,
      borderColor: themeColors.whisperBorder,
      padding: spacing.lg,
      maxWidth: '90%',
      maxHeight: '80%',
      width: '90%',
      zIndex: 10000,
    } as ViewStyle,
    modalHeader: {
      fontSize: fontSize.lg,
      fontWeight: '700',
      color: themeColors.inkPrimary,
      marginBottom: spacing.sm,
    } as TextStyle,
    modalSubheader: {
      fontSize: fontSize.sm,
      color: themeColors.steelSecondary,
      fontWeight: '500',
      marginBottom: spacing.lg,
    } as TextStyle,
    modalFiltersContainer: {
      flexDirection: 'row',
      gap: spacing.md,
      marginBottom: spacing.lg,
    } as ViewStyle,
    modalFilterButton: {
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
      borderRadius: borderRadius.md,
      borderWidth: 1,
      borderColor: themeColors.whisperBorder,
      backgroundColor: isDark ? themeColors.sunkenBase : themeColors.pureSurface,
    } as ViewStyle,
    modalFilterButtonActive: {
      backgroundColor: colors.light.newtechGreen,
      borderColor: colors.light.newtechGreen,
    } as ViewStyle,
    modalFilterButtonText: {
      fontSize: fontSize.sm,
      fontWeight: '500',
      color: themeColors.steelSecondary,
    } as TextStyle,
    modalFilterButtonTextActive: {
      color: '#FFFFFF',
      fontWeight: '600',
    } as TextStyle,
    modalListItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)',
      cursor: 'pointer',
    } as ViewStyle,
    modalListItemText: {
      flex: 1,
      fontSize: fontSize.sm,
      color: themeColors.inkPrimary,
      fontWeight: '500',
    } as TextStyle,
    modalListItemCheckbox: {
      width: 20,
      height: 20,
      borderRadius: borderRadius.sm,
      borderWidth: 2,
      borderColor: themeColors.whisperBorder,
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: spacing.md,
      flexShrink: 0,
    } as ViewStyle,
    modalListItemCheckboxChecked: {
      backgroundColor: colors.light.newtechGreen,
      borderColor: colors.light.newtechGreen,
    } as ViewStyle,
    modalActions: {
      flexDirection: 'row',
      gap: spacing.md,
      marginTop: spacing.lg,
      justifyContent: 'flex-end',
    } as ViewStyle,
    modalButton: {
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.sm,
      borderRadius: borderRadius.md,
      borderWidth: 1,
      borderColor: themeColors.whisperBorder,
      backgroundColor: isDark ? themeColors.sunkenBase : themeColors.pureSurface,
    } as ViewStyle,
    modalButtonPrimary: {
      backgroundColor: colors.light.newtechGreen,
      borderColor: colors.light.newtechGreen,
    } as ViewStyle,
    modalButtonText: {
      fontSize: fontSize.sm,
      fontWeight: '600',
      color: themeColors.steelSecondary,
    } as TextStyle,
    modalButtonTextPrimary: {
      color: '#FFFFFF',
    } as TextStyle,
  });

  return (
    <View style={styles.container}>
      {/* Filters */}
      <View style={styles.filterContainer}>
        {/* Effectiveness Filters */}
        <View style={styles.filterButtonsGroup}>
          <TouchableOpacity
            style={[
              styles.filterButton,
              effectivenessFilter === 'all' && styles.filterButtonActive,
            ]}
            onPress={() => setEffectivenessFilter('all')}
          >
            <Text
              style={[
                styles.filterButtonText,
                effectivenessFilter === 'all' && styles.filterButtonTextActive,
              ]}
            >
              Todos
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.filterButton,
              effectivenessFilter === 'effective' && styles.filterButtonActive,
            ]}
            onPress={() => setEffectivenessFilter('effective')}
          >
            <Text
              style={[
                styles.filterButtonText,
                effectivenessFilter === 'effective' && styles.filterButtonTextActive,
              ]}
            >
              Efectivos
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.filterButton,
              effectivenessFilter === 'ineffective' && styles.filterButtonActive,
            ]}
            onPress={() => setEffectivenessFilter('ineffective')}
          >
            <Text
              style={[
                styles.filterButtonText,
                effectivenessFilter === 'ineffective' && styles.filterButtonTextActive,
              ]}
            >
              No Efectivos
            </Text>
          </TouchableOpacity>
        </View>

        {/* Contact List Filter Button */}
        <TouchableOpacity
          style={styles.listFilterButton}
          onPress={() => setIsListFilterExpanded(!isListFilterExpanded)}
        >
          <Text style={styles.listFilterButtonText}>Listas</Text>
          {selectedLists.length < availableLists.length && (
            <View style={styles.listFilterBadge}>
              <Text style={styles.listFilterBadgeText}>{selectedLists.length}</Text>
            </View>
          )}
          <ChevronDown size={14} color={themeColors.steelSecondary} />
        </TouchableOpacity>
      </View>

      {/* Contact Lists Filter Modal */}
      {isListFilterExpanded && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>Seleccionar Listas</Text>
            <Text style={styles.modalSubheader}>
              Listas seleccionadas: {tempSelectedLists.length} de {availableLists.length}
            </Text>

            {/* Filter Buttons in Modal */}
            <View style={styles.modalFiltersContainer}>
              <TouchableOpacity
                style={[
                  styles.modalFilterButton,
                  modalListFilter === 'all' && styles.modalFilterButtonActive,
                ]}
                onPress={() => setModalListFilter('all')}
              >
                <Text
                  style={[
                    styles.modalFilterButtonText,
                    modalListFilter === 'all' && styles.modalFilterButtonTextActive,
                  ]}
                >
                  Todas
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.modalFilterButton,
                  modalListFilter === 'selected' && styles.modalFilterButtonActive,
                ]}
                onPress={() => setModalListFilter('selected')}
              >
                <Text
                  style={[
                    styles.modalFilterButtonText,
                    modalListFilter === 'selected' && styles.modalFilterButtonTextActive,
                  ]}
                >
                  Seleccionadas
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.modalFilterButton,
                  modalListFilter === 'unselected' && styles.modalFilterButtonActive,
                ]}
                onPress={() => setModalListFilter('unselected')}
              >
                <Text
                  style={[
                    styles.modalFilterButtonText,
                    modalListFilter === 'unselected' && styles.modalFilterButtonTextActive,
                  ]}
                >
                  No Sel.
                </Text>
              </TouchableOpacity>
            </View>

            {/* Lists */}
            {(() => {
              let filteredLists = availableLists.filter((list) =>
                list.toLowerCase().includes(listSearchQuery.toLowerCase())
              );

              if (modalListFilter === 'selected') {
                filteredLists = filteredLists.filter((list) => tempSelectedLists.includes(list));
              } else if (modalListFilter === 'unselected') {
                filteredLists = filteredLists.filter((list) => !tempSelectedLists.includes(list));
              }

              return (
                <ScrollView style={{ maxHeight: 200, marginBottom: spacing.lg }}>
                  {filteredLists.map((list) => (
                    <TouchableOpacity
                      key={list}
                      style={styles.modalListItem}
                      onPress={() => {
                        setTempSelectedLists((prev) =>
                          prev.includes(list)
                            ? prev.filter((l) => l !== list)
                            : [...prev, list]
                        );
                      }}
                    >
                      <Text style={styles.modalListItemText}>{list}</Text>
                      <View
                        style={[
                          styles.modalListItemCheckbox,
                          tempSelectedLists.includes(list) && styles.modalListItemCheckboxChecked,
                        ]}
                      >
                        {tempSelectedLists.includes(list) && (
                          <Check size={12} color="#FFFFFF" strokeWidth={3} />
                        )}
                      </View>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              );
            })()}

            {/* Action Buttons */}
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setIsListFilterExpanded(false)}
              >
                <Text style={styles.modalButtonText}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalButton, styles.modalButtonPrimary]}
                onPress={() => {
                  setSelectedLists(tempSelectedLists);
                  setIsListFilterExpanded(false);
                }}
              >
                <Text style={[styles.modalButtonText, styles.modalButtonTextPrimary]}>
                  Guardar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

      {/* Table */}
      {filteredCalls.length > 0 ? (
        <View style={styles.tableContainer}>
          <View style={styles.tableHeader}>
            <View style={[styles.tableHeaderCell, { flex: 0.6 }]}>
              <Text style={styles.tableHeaderText}>Nombre</Text>
            </View>
            <View style={[styles.tableHeaderCell, { flex: 0.4 }]}>
              <Text style={styles.tableHeaderText}>Fecha</Text>
            </View>
          </View>

          <ScrollView>
            {filteredCalls.map((call, index) => {
              const isEffective = call.disposition === 'Exitoso' || call.disposition === 'Exitosa';

              return (
                <TouchableOpacity
                  key={`${call.id}-${index}`}
                  style={styles.tableRow}
                  onPress={() => onSelectCall(call)}
                  activeOpacity={0.7}
                >
                  <View style={[styles.tableCellLeft, { flex: 0.6 }]}>
                    <Text style={styles.tableCellName} numberOfLines={1}>
                      {call.contactName}
                    </Text>
                    <View
                      style={[
                        styles.dispositionBadge,
                        !isEffective && styles.dispositionBadgeIneffective,
                      ]}
                    >
                      <Text style={styles.dispositionBadgeText} numberOfLines={1}>
                        {call.disposition}
                      </Text>
                    </View>
                  </View>
                  <View style={[styles.tableCell, { flex: 0.4 }]}>
                    <Text style={styles.tableCellText} numberOfLines={1}>
                      {call.dateTime.split(' ')[0]}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>No hay contactos disponibles</Text>
        </View>
      )}
    </View>
  );
};

export default ContactsTableMobile;
