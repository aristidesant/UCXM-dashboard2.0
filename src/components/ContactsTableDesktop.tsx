import React, { useState, useMemo } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, ViewStyle, TextStyle } from 'react-native';
import { ChevronUp, ChevronDown } from 'lucide-react';
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
  const itemsPerPage = 10;

  // Filter calls based on effectiveness
  const filteredCalls = useMemo(() => {
    return calls.filter((call) => {
      if (effectivenessFilter === 'all') return true;
      const isEffective = call.disposition === 'Exitoso' || call.disposition === 'Exitosa';
      return effectivenessFilter === 'effective' ? isEffective : !isEffective;
    });
  }, [calls, effectivenessFilter]);

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
      justifyContent: 'center',
      alignItems: 'center',
      gap: spacing.md,
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.md,
    } as ViewStyle,
    paginationButton: {
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
      borderRadius: borderRadius.md,
      borderWidth: 1,
      borderColor: themeColors.whisperBorder,
      backgroundColor: isDark ? themeColors.sunkenBase : themeColors.pureSurface,
    } as ViewStyle,
    paginationButtonDisabled: {
      opacity: 0.5,
    } as ViewStyle,
    paginationText: {
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
            Todos los contactos
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
            Contactos Efectivos
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
            Contactos No Efectivos
          </Text>
        </TouchableOpacity>
      </View>

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

          {/* Pagination */}
          {totalPages > 1 && (
            <View style={styles.paginationContainer}>
              <TouchableOpacity
                style={[
                  styles.paginationButton,
                  currentPage === 1 && styles.paginationButtonDisabled,
                ]}
                onPress={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                <ChevronUp size={18} color={themeColors.steelSecondary} />
              </TouchableOpacity>

              <Text style={styles.paginationText}>
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
                <ChevronDown size={18} color={themeColors.steelSecondary} />
              </TouchableOpacity>
            </View>
          )}
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
