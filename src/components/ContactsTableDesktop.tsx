import React, { useState, useMemo } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, ViewStyle, TextStyle } from 'react-native';
import { ChevronLeft, ChevronRight, ChevronDown, Check } from 'lucide-react';
import { colors, spacing, borderRadius, fontSize } from '../design';
import { Call } from '../data/mockCalls';
import { useTheme } from '../context/ThemeContext';

interface ContactsTableDesktopProps {
  calls: Call[];
  onSelectCall: (call: Call) => void;
}

type EffectivenessFilter = 'all' | 'effective' | 'ineffective';

export const ContactsTableDesktop: React.FC<ContactsTableDesktopProps> = ({
  calls,
  onSelectCall,
}) => {
  const { effectiveTheme } = useTheme();
  const isDark = effectiveTheme === 'dark';
  const themeColors = isDark ? colors.dark : colors.light;

  const [currentPage, setCurrentPage] = useState(1);
  const [effectivenessFilter, setEffectivenessFilter] = useState<EffectivenessFilter>('all');
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isListFilterExpanded, setIsListFilterExpanded] = useState(false);

  // Get unique contact lists from calls
  const availableLists = useMemo(() => {
    const lists = new Set(calls.map((c) => c.contactList));
    return Array.from(lists).sort();
  }, [calls]);

  const [selectedLists, setSelectedLists] = useState<string[]>(availableLists);

  const handleListSelect = (listName: string) => {
    setSelectedLists((prev) =>
      prev.includes(listName)
        ? prev.filter((l) => l !== listName)
        : [...prev, listName]
    );
    setCurrentPage(1);
  };

  // Filter calls based on effectiveness and contact list
  const filteredCalls = useMemo(() => {
    return calls.filter((call) => {
      // Filter by contact list
      if (!selectedLists.includes(call.contactList)) return false;

      // Filter by effectiveness
      if (effectivenessFilter === 'all') return true;
      const isEffective = call.disposition === 'Exitoso' || call.disposition === 'Exitosa';
      return effectivenessFilter === 'effective' ? isEffective : !isEffective;
    });
  }, [calls, effectivenessFilter, selectedLists]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredCalls.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedCalls = filteredCalls.slice(startIndex, endIndex);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
    } as ViewStyle,
    filterContainer: {
      flexDirection: 'row',
      gap: spacing.md,
      marginBottom: spacing.lg,
      paddingHorizontal: spacing.lg,
      alignItems: 'center',
    } as ViewStyle,
    filterButtonsGroup: {
      flexDirection: 'row',
      gap: spacing.md,
      flex: 1,
    } as ViewStyle,
    filterButton: {
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
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
      fontSize: fontSize.sm,
      fontWeight: '500',
      color: themeColors.steelSecondary,
    } as TextStyle,
    filterButtonTextActive: {
      color: '#FFFFFF',
      fontWeight: '600',
    } as TextStyle,
    listFilterButton: {
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
      borderRadius: borderRadius.md,
      borderWidth: 1,
      borderColor: themeColors.whisperBorder,
      backgroundColor: isDark ? themeColors.sunkenBase : themeColors.pureSurface,
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.xs,
    } as ViewStyle,
    listFilterButtonText: {
      fontSize: fontSize.sm,
      fontWeight: '500',
      color: themeColors.steelSecondary,
    } as TextStyle,
    listFilterBadge: {
      backgroundColor: colors.light.newtechGreen,
      borderRadius: borderRadius.sm,
      paddingHorizontal: spacing.xs,
      paddingVertical: 2,
      marginLeft: spacing.xs,
    } as ViewStyle,
    listFilterBadgeText: {
      fontSize: fontSize.xs,
      fontWeight: '600',
      color: '#FFFFFF',
    } as TextStyle,
    modalOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    } as ViewStyle,
    modalContent: {
      backgroundColor: isDark ? themeColors.sunkenBase : themeColors.pureSurface,
      borderRadius: borderRadius.lg,
      borderWidth: 1,
      borderColor: themeColors.whisperBorder,
      padding: spacing.lg,
      maxWidth: 500,
      maxHeight: '70%',
      width: '90%',
    } as ViewStyle,
    modalHeader: {
      fontSize: fontSize.lg,
      fontWeight: '700',
      color: themeColors.inkPrimary,
      marginBottom: spacing.md,
    } as TextStyle,
    modalListItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: themeColors.whisperBorder,
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
    tableWrapper: {
      flex: 1,
      paddingHorizontal: spacing.lg,
      marginBottom: spacing.lg,
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
      paddingVertical: spacing.md,
      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.02)',
    } as ViewStyle,
    tableHeaderCell: {
      flex: 1,
      paddingHorizontal: spacing.md,
    } as ViewStyle,
    tableHeaderText: {
      fontSize: fontSize.sm,
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
      alignItems: 'center',
    } as ViewStyle,
    tableRowClickable: {
      cursor: 'pointer',
    } as ViewStyle,
    tableCell: {
      flex: 1,
      paddingHorizontal: spacing.md,
    } as ViewStyle,
    tableCellText: {
      fontSize: fontSize.sm,
      color: themeColors.inkPrimary,
      fontWeight: '400',
    } as TextStyle,
    dispositionBadge: {
      paddingHorizontal: spacing.sm,
      paddingVertical: 2,
      borderRadius: borderRadius.sm,
      backgroundColor: colors.light.newtechGreen,
    } as ViewStyle,
    dispositionBadgeIneffective: {
      backgroundColor: '#FF9500',
    } as ViewStyle,
    dispositionBadgeText: {
      fontSize: fontSize.xs,
      fontWeight: '600',
      color: '#FFFFFF',
    } as TextStyle,
    paginationContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.md,
      borderTopWidth: 1,
      borderTopColor: themeColors.whisperBorder,
      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.02)',
    } as ViewStyle,
    paginationSection: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.md,
    } as ViewStyle,
    paginationButton: {
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
      borderRadius: borderRadius.md,
      borderWidth: 1,
      borderColor: colors.light.newtechGreen,
      backgroundColor: colors.light.newtechGreen,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: spacing.xs,
    } as ViewStyle,
    paginationButtonSecondary: {
      backgroundColor: isDark ? themeColors.sunkenBase : themeColors.pureSurface,
      borderColor: themeColors.whisperBorder,
    } as ViewStyle,
    paginationButtonDisabled: {
      opacity: 0.5,
    } as ViewStyle,
    paginationText: {
      fontSize: fontSize.sm,
      color: themeColors.steelSecondary,
      fontWeight: '500',
    } as TextStyle,
    paginationButtonText: {
      fontSize: fontSize.sm,
      color: '#FFFFFF',
      fontWeight: '600',
    } as TextStyle,
    itemsPerPageContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.md,
    } as ViewStyle,
    itemsPerPageLabel: {
      fontSize: fontSize.sm,
      color: themeColors.steelSecondary,
      fontWeight: '500',
    } as TextStyle,
    itemsPerPageButton: {
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
      borderRadius: borderRadius.md,
      borderWidth: 1,
      borderColor: themeColors.whisperBorder,
      backgroundColor: isDark ? themeColors.sunkenBase : themeColors.pureSurface,
      minWidth: 50,
      alignItems: 'center',
    } as ViewStyle,
    itemsPerPageButtonActive: {
      backgroundColor: colors.light.newtechGreen,
      borderColor: colors.light.newtechGreen,
    } as ViewStyle,
    itemsPerPageButtonText: {
      fontSize: fontSize.sm,
      color: themeColors.steelSecondary,
      fontWeight: '500',
    } as TextStyle,
    itemsPerPageButtonTextActive: {
      color: '#FFFFFF',
      fontWeight: '600',
    } as TextStyle,
    pageInfoContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.sm,
    } as ViewStyle,
    pageInfoText: {
      fontSize: fontSize.sm,
      color: themeColors.steelSecondary,
      fontWeight: '500',
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
            onPress={() => {
              setEffectivenessFilter('all');
              setCurrentPage(1);
            }}
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
            onPress={() => {
              setEffectivenessFilter('effective');
              setCurrentPage(1);
            }}
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
            onPress={() => {
              setEffectivenessFilter('ineffective');
              setCurrentPage(1);
            }}
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
          <ChevronDown size={16} color={themeColors.steelSecondary} />
        </TouchableOpacity>
      </View>

      {/* Contact Lists Filter Modal */}
      {isListFilterExpanded && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>Seleccionar Listas de Contacto</Text>

            <ScrollView style={{ maxHeight: '60%', marginBottom: spacing.md }}>
              {availableLists.map((list) => (
                <TouchableOpacity
                  key={list}
                  style={styles.modalListItem}
                  onPress={() => handleListSelect(list)}
                >
                  <Text style={styles.modalListItemText}>{list}</Text>
                  <View
                    style={[
                      styles.modalListItemCheckbox,
                      selectedLists.includes(list) && styles.modalListItemCheckboxChecked,
                    ]}
                  >
                    {selectedLists.includes(list) && (
                      <Check size={14} color="#FFFFFF" strokeWidth={3} />
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => {
                  setSelectedLists(availableLists);
                  setCurrentPage(1);
                }}
              >
                <Text style={styles.modalButtonText}>Seleccionar Todo</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => {
                  setSelectedLists([]);
                  setCurrentPage(1);
                }}
              >
                <Text style={styles.modalButtonText}>Deseleccionar Todo</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalButton, styles.modalButtonPrimary]}
                onPress={() => setIsListFilterExpanded(false)}
              >
                <Text style={[styles.modalButtonText, styles.modalButtonTextPrimary]}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

      {/* Table */}
      {filteredCalls.length > 0 ? (
        <>
          <View style={styles.tableWrapper}>
            <View style={styles.tableHeader}>
              <View style={[styles.tableHeaderCell, { flex: 0.25 }]}>
                <Text style={styles.tableHeaderText}>Nombre</Text>
              </View>
              <View style={[styles.tableHeaderCell, { flex: 0.2 }]}>
                <Text style={styles.tableHeaderText}>Teléfono</Text>
              </View>
              <View style={[styles.tableHeaderCell, { flex: 0.2 }]}>
                <Text style={styles.tableHeaderText}>Fecha</Text>
              </View>
              <View style={[styles.tableHeaderCell, { flex: 0.15 }]}>
                <Text style={styles.tableHeaderText}>Duración</Text>
              </View>
              <View style={[styles.tableHeaderCell, { flex: 0.2 }]}>
                <Text style={styles.tableHeaderText}>Resultado</Text>
              </View>
            </View>

            <ScrollView>
              {paginatedCalls.map((call, index) => {
                const isEffective =
                  call.disposition === 'Exitoso' || call.disposition === 'Exitosa';

                return (
                  <TouchableOpacity
                    key={`${call.id}-${index}`}
                    style={styles.tableRow}
                    onPress={() => onSelectCall(call)}
                    activeOpacity={0.7}
                  >
                    <View style={[styles.tableCell, { flex: 0.25 }]}>
                      <Text style={styles.tableCellText}>{call.contactName}</Text>
                    </View>
                    <View style={[styles.tableCell, { flex: 0.2 }]}>
                      <Text style={styles.tableCellText}>{call.phoneNumber}</Text>
                    </View>
                    <View style={[styles.tableCell, { flex: 0.2 }]}>
                      <Text style={styles.tableCellText}>{call.dateTime}</Text>
                    </View>
                    <View style={[styles.tableCell, { flex: 0.15 }]}>
                      <Text style={styles.tableCellText}>{call.duration}</Text>
                    </View>
                    <View style={[styles.tableCell, { flex: 0.2 }]}>
                      <View
                        style={[
                          styles.dispositionBadge,
                          !isEffective && styles.dispositionBadgeIneffective,
                        ]}
                      >
                        <Text style={styles.dispositionBadgeText}>
                          {call.disposition}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>

          {/* Pagination Footer */}
          <View style={styles.paginationContainer}>
            {/* Left Section: Items Per Page */}
            <View style={styles.itemsPerPageContainer}>
              <Text style={styles.itemsPerPageLabel}>Mostrar:</Text>
              {[5, 10, 15, 20].map((num) => (
                <TouchableOpacity
                  key={num}
                  style={[
                    styles.itemsPerPageButton,
                    itemsPerPage === num && styles.itemsPerPageButtonActive,
                  ]}
                  onPress={() => {
                    setItemsPerPage(num);
                    setCurrentPage(1);
                  }}
                >
                  <Text
                    style={[
                      styles.itemsPerPageButtonText,
                      itemsPerPage === num && styles.itemsPerPageButtonTextActive,
                    ]}
                  >
                    {num}
                  </Text>
                </TouchableOpacity>
              ))}
              <Text style={styles.itemsPerPageLabel}>
                ({filteredCalls.length} total)
              </Text>
            </View>

            {/* Center Section: Page Info */}
            <View style={styles.pageInfoContainer}>
              <Text style={styles.pageInfoText}>
                {startIndex + 1}-{Math.min(endIndex, filteredCalls.length)} de{' '}
                {filteredCalls.length}
              </Text>
            </View>

            {/* Right Section: Navigation Buttons */}
            <View style={styles.paginationSection}>
              <TouchableOpacity
                style={[
                  styles.paginationButton,
                  styles.paginationButtonSecondary,
                  currentPage === 1 && styles.paginationButtonDisabled,
                ]}
                onPress={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft size={18} color={currentPage === 1 ? themeColors.steelSecondary : themeColors.inkPrimary} />
                <Text style={[styles.paginationText, { fontWeight: '600' }]}>Anterior</Text>
              </TouchableOpacity>

              <Text style={styles.pageInfoText}>
                Página {currentPage} de {totalPages}
              </Text>

              <TouchableOpacity
                style={[
                  styles.paginationButton,
                  currentPage === totalPages && styles.paginationButtonDisabled,
                ]}
                onPress={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
              >
                <Text style={styles.paginationButtonText}>Siguiente</Text>
                <ChevronRight size={18} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>
        </>
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>No hay contactos disponibles</Text>
        </View>
      )}
    </View>
  );
};

export default ContactsTableDesktop;
