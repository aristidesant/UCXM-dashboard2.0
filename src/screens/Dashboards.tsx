import React, { useMemo } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TextInput,
  FlatList,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';
import { colors, typography, spacing, borderRadius } from '../design';
import { usePlatform } from '../hooks/usePlatform';
import { useAppContext } from '../context/AppContext';
import { Card, Badge, Dropdown, DatePicker, ResponsiveContainer } from '../components';
import { mockDashboards } from '../data/mockDashboards';
import { useTheme } from '../context/ThemeContext';

interface DashboardsScreenProps {
  onSelectDashboard: (dashboardId: string) => void;
}

export const DashboardsScreen: React.FC<DashboardsScreenProps> = ({
  onSelectDashboard,
}) => {
  const { platform } = usePlatform();
  const isMobile = platform === 'mobile';
  const { effectiveTheme } = useTheme();
  const isDark = effectiveTheme === 'dark';
  const themeColors = isDark ? colors.dark : colors.light;
  const [search, setSearch] = React.useState('');
  const [selectedStatus, setSelectedStatus] = React.useState<string>('');
  const [selectedCampaignType, setSelectedCampaignType] = React.useState<string>('');
  const [selectedLineOfBusiness, setSelectedLineOfBusiness] = React.useState<string>('');
  const [dateRange, setDateRange] = React.useState<{ from: string; to: string }>({ from: '', to: '' });
  const [currentPage, setCurrentPage] = React.useState(1);
  const [openFilter, setOpenFilter] = React.useState<string | null>(null);
  const itemsPerPage = 20;

  const uniqueStatuses = Array.from(new Set(mockDashboards.map(d => d.status))).sort();
  const uniqueCampaignTypes = Array.from(new Set(mockDashboards.map(d => d.campaignType))).sort();
  const uniqueLineOfBusiness = Array.from(new Set(mockDashboards.map(d => d.lineOfBusiness))).sort();

  const filteredDashboards = useMemo(() => {
    return mockDashboards.filter((d) => {
      const matchesSearch = d.name.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = !selectedStatus || d.status === selectedStatus;
      const matchesCampaignType = !selectedCampaignType || d.campaignType === selectedCampaignType;
      const matchesLineOfBusiness = !selectedLineOfBusiness || d.lineOfBusiness === selectedLineOfBusiness;

      let matchesDate = true;
      if (dateRange.from || dateRange.to) {
        const dashboardDate = new Date(d.lastUpdated);
        if (dateRange.from) {
          const fromDate = new Date(dateRange.from);
          matchesDate = matchesDate && dashboardDate >= fromDate;
        }
        if (dateRange.to) {
          const toDate = new Date(dateRange.to);
          toDate.setHours(23, 59, 59, 999);
          matchesDate = matchesDate && dashboardDate <= toDate;
        }
      }

      return matchesSearch && matchesStatus && matchesCampaignType && matchesLineOfBusiness && matchesDate;
    });
  }, [search, selectedStatus, selectedCampaignType, selectedLineOfBusiness, dateRange]);

  const paginatedDashboards = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredDashboards.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredDashboards, currentPage]);

  const totalPages = Math.ceil(filteredDashboards.length / itemsPerPage);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: themeColors.canvasFrost,
      paddingTop: spacing.lg,
    } as ViewStyle,
    header: {
      fontSize: 32,
      fontWeight: '700',
      lineHeight: 40,
      color: themeColors.inkPrimary,
      marginBottom: spacing.lg,
      letterSpacing: -0.02,
    },
    searchAndFiltersContainer: {
      flexDirection: 'row',
      marginBottom: spacing.md,
      alignItems: 'center',
      gap: spacing.md,
    },
    searchContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
    },
    searchInput: {
      flex: 1,
      borderWidth: 1,
      borderColor: themeColors.whisperBorder,
      borderRadius: 8,
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.md,
      fontSize: 15,
      fontWeight: '400',
      color: themeColors.inkPrimary,
      lineHeight: 22,
    },
    gridContainer: {
      gap: spacing.md,
    } as ViewStyle,
    dashboardCard: {
      minHeight: 120,
      justifyContent: 'space-between',
      marginBottom: spacing.md,
    } as ViewStyle,
    dashboardName: {
      fontSize: 16,
      fontWeight: '600',
      color: themeColors.inkPrimary,
      marginBottom: spacing.sm,
      lineHeight: 22,
    },
    dashboardMeta: {
      fontSize: 12,
      fontWeight: '400',
      color: themeColors.mutedSlate,
      marginBottom: spacing.sm,
      lineHeight: 18,
    },
    metaRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    filterBar: {
      flexDirection: 'row',
      gap: spacing.md,
      flexWrap: 'wrap',
      position: 'relative',
      zIndex: 1000,
    } as ViewStyle,
    activeFiltersContainer: {
      flexDirection: 'row',
      gap: spacing.md,
      flexWrap: 'wrap',
      alignItems: 'center',
      marginBottom: spacing.lg,
      minHeight: spacing.lg,
    } as ViewStyle,
    filterPill: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.xs,
      backgroundColor: themeColors.newtechGreen,
      borderRadius: borderRadius.md,
      paddingVertical: spacing.xs,
      paddingHorizontal: spacing.md,
    } as ViewStyle,
    filterPillText: {
      fontSize: 13,
      fontWeight: '500',
      color: themeColors.canvasFrost,
    } as TextStyle,
    filterPillClose: {
      paddingLeft: spacing.xs,
      marginLeft: spacing.xs,
    } as ViewStyle,
    clearFiltersButton: {
      paddingVertical: spacing.xs,
      paddingHorizontal: spacing.md,
      borderRadius: borderRadius.md,
      backgroundColor: themeColors.whisperBorder,
    } as ViewStyle,
    clearFiltersText: {
      fontSize: 13,
      fontWeight: '500',
      color: themeColors.steelSecondary,
    } as TextStyle,
    filterSelect: {
      flex: 1,
      minWidth: 150,
      height: 40,
      borderWidth: 1,
      borderColor: themeColors.whisperBorder,
      borderRadius: 8,
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.md,
      fontSize: 14,
      fontWeight: '400',
      color: themeColors.inkPrimary,
    },
    tableContainer: {
      flex: 1,
      borderWidth: 1,
      borderColor: themeColors.whisperBorder,
      borderRadius: 8,
      marginBottom: spacing.lg,
      backgroundColor: isDark ? themeColors.sunkenBase : '#FFFFFF',
    } as ViewStyle,
    tableHeader: {
      flexDirection: 'row',
      backgroundColor: themeColors.sunkenBase,
      borderBottomWidth: 1,
      borderBottomColor: themeColors.whisperBorder,
    } as ViewStyle,
    tableHeaderCell: {
      flex: 1,
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.md,
    } as ViewStyle,
    tableHeaderText: {
      fontSize: 14,
      fontWeight: '600',
      color: themeColors.inkPrimary,
    },
    tableRow: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: themeColors.whisperBorder,
    } as ViewStyle,
    tableCell: {
      flex: 1,
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.md,
    } as ViewStyle,
    tableStatusCell: {
      flex: 1,
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.md,
    } as ViewStyle,
    tableCellText: {
      fontSize: 14,
      fontWeight: '400',
      color: themeColors.inkPrimary,
    },
    tableRowTouchable: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: themeColors.whisperBorder,
    } as ViewStyle,
    paginationContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: spacing.md,
    } as ViewStyle,
    paginationText: {
      fontSize: 14,
      fontWeight: '400',
      color: themeColors.mutedSlate,
    },
    paginationButton: {
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.md,
      borderWidth: 1,
      borderColor: themeColors.whisperBorder,
      borderRadius: 6,
      backgroundColor: themeColors.sunkenBase,
    } as ViewStyle,
    paginationButtonText: {
      fontSize: 14,
      fontWeight: '500',
      color: themeColors.inkPrimary,
    },
    paginationButtonDisabled: {
      opacity: 0.5,
    } as ViewStyle,
  });

  const renderDashboard = ({ item }: { item: typeof mockDashboards[0] }) => (
    <TouchableOpacity
      onPress={() => onSelectDashboard(item.id)}
      activeOpacity={0.7}
    >
      <Card style={styles.dashboardCard}>
        <View>
          <Text style={styles.dashboardName}>{item.name}</Text>
          <View style={styles.metaRow}>
            <Badge status={item.status} />
            <Text style={styles.dashboardMeta}>
              Iniciada {new Date(item.lastUpdated).toLocaleDateString()}
            </Text>
          </View>
        </View>
        <Text style={styles.dashboardMeta}>Tipo: {item.type}</Text>
      </Card>
    </TouchableOpacity>
  );

  const renderTableRow = (item: typeof mockDashboards[0]) => (
    <TouchableOpacity
      key={item.id}
      onPress={() => onSelectDashboard(item.id)}
      activeOpacity={0.7}
      style={styles.tableRowTouchable}
    >
      <View style={[styles.tableCell, { flex: 2 }]}>
        <Text style={styles.tableCellText}>{item.name}</Text>
      </View>
      <View style={[styles.tableCell, { flex: 1 }]}>
        <Text style={styles.tableCellText}>{item.campaignType}</Text>
      </View>
      <View style={[styles.tableCell, { flex: 1 }]}>
        <Text style={styles.tableCellText}>{item.lineOfBusiness}</Text>
      </View>
      <View style={[styles.tableCell, { flex: 1 }]}>
        <Text style={styles.tableCellText}>{new Date(item.createdAt).toLocaleDateString()}</Text>
      </View>
      <View style={[styles.tableStatusCell, { flex: 1 }]}>
        <Badge status={item.status} />
      </View>
    </TouchableOpacity>
  );

  const hasActiveFilters = selectedStatus || selectedCampaignType || selectedLineOfBusiness || dateRange.from || dateRange.to;

  const clearAllFilters = () => {
    setSelectedStatus('');
    setSelectedCampaignType('');
    setSelectedLineOfBusiness('');
    setDateRange({ from: '', to: '' });
    setCurrentPage(1);
  };

  return (
    <ResponsiveContainer>
      <View style={styles.container}>
        <Text style={styles.header}>Dashboards</Text>

      {!isMobile && (
        <View style={{ flex: 1, flexDirection: 'column', position: 'relative', zIndex: 0 }}>
          <View style={styles.searchAndFiltersContainer}>
            <View style={styles.searchContainer}>
              <TextInput
                style={styles.searchInput}
                placeholder="Buscar dashboards..."
                placeholderTextColor={themeColors.mediumGray}
                value={search}
                onChangeText={setSearch}
              />
            </View>

            <View style={styles.filterBar}>
              <Dropdown
                label="Status"
                value={selectedStatus}
                options={uniqueStatuses.map((s) => ({ label: s, value: s }))}
                onChange={(value) => {
                  setSelectedStatus(value);
                  setCurrentPage(1);
                }}
                minWidth={140}
                isOpen={openFilter === 'status'}
                onOpenChange={(isOpen) => setOpenFilter(isOpen ? 'status' : null)}
              />

              <Dropdown
                label="Tipo de Campaña"
                value={selectedCampaignType}
                options={uniqueCampaignTypes.map((c) => ({ label: c, value: c }))}
                onChange={(value) => {
                  setSelectedCampaignType(value);
                  setCurrentPage(1);
                }}
                minWidth={160}
                isOpen={openFilter === 'campaign'}
                onOpenChange={(isOpen) => setOpenFilter(isOpen ? 'campaign' : null)}
              />

              <Dropdown
                label="LOB"
                value={selectedLineOfBusiness}
                options={uniqueLineOfBusiness.map((l) => ({ label: l, value: l }))}
                onChange={(value) => {
                  setSelectedLineOfBusiness(value);
                  setCurrentPage(1);
                }}
                minWidth={160}
                isOpen={openFilter === 'lob'}
                onOpenChange={(isOpen) => setOpenFilter(isOpen ? 'lob' : null)}
              />

              <DatePicker
                label="Desde"
                value={dateRange.from}
                onChange={(date) => {
                  setDateRange({ ...dateRange, from: date });
                  setCurrentPage(1);
                }}
                minWidth={140}
                isOpen={openFilter === 'from'}
                onOpenChange={(isOpen) => setOpenFilter(isOpen ? 'from' : null)}
              />

              <DatePicker
                label="Hasta"
                value={dateRange.to}
                onChange={(date) => {
                  setDateRange({ ...dateRange, to: date });
                  setCurrentPage(1);
                }}
                minWidth={140}
                isOpen={openFilter === 'to'}
                onOpenChange={(isOpen) => setOpenFilter(isOpen ? 'to' : null)}
              />
            </View>
          </View>

          <View style={styles.activeFiltersContainer}>
            {selectedStatus && (
              <View style={styles.filterPill}>
                <Text style={styles.filterPillText}>Status: {selectedStatus}</Text>
                <TouchableOpacity
                  style={styles.filterPillClose}
                  onPress={() => {
                    setSelectedStatus('');
                    setCurrentPage(1);
                  }}
                  activeOpacity={0.7}
                >
                  <Text style={styles.filterPillText}>✕</Text>
                </TouchableOpacity>
              </View>
            )}
            {selectedCampaignType && (
              <View style={styles.filterPill}>
                <Text style={styles.filterPillText}>Tipo: {selectedCampaignType}</Text>
                <TouchableOpacity
                  style={styles.filterPillClose}
                  onPress={() => {
                    setSelectedCampaignType('');
                    setCurrentPage(1);
                  }}
                  activeOpacity={0.7}
                >
                  <Text style={styles.filterPillText}>✕</Text>
                </TouchableOpacity>
              </View>
            )}
            {selectedLineOfBusiness && (
              <View style={styles.filterPill}>
                <Text style={styles.filterPillText}>LOB: {selectedLineOfBusiness}</Text>
                <TouchableOpacity
                  style={styles.filterPillClose}
                  onPress={() => {
                    setSelectedLineOfBusiness('');
                    setCurrentPage(1);
                  }}
                  activeOpacity={0.7}
                >
                  <Text style={styles.filterPillText}>✕</Text>
                </TouchableOpacity>
              </View>
            )}
            {dateRange.from && (
              <View style={styles.filterPill}>
                <Text style={styles.filterPillText}>Desde: {dateRange.from}</Text>
                <TouchableOpacity
                  style={styles.filterPillClose}
                  onPress={() => {
                    setDateRange({ ...dateRange, from: '' });
                    setCurrentPage(1);
                  }}
                  activeOpacity={0.7}
                >
                  <Text style={styles.filterPillText}>✕</Text>
                </TouchableOpacity>
              </View>
            )}
            {dateRange.to && (
              <View style={styles.filterPill}>
                <Text style={styles.filterPillText}>Hasta: {dateRange.to}</Text>
                <TouchableOpacity
                  style={styles.filterPillClose}
                  onPress={() => {
                    setDateRange({ ...dateRange, to: '' });
                    setCurrentPage(1);
                  }}
                  activeOpacity={0.7}
                >
                  <Text style={styles.filterPillText}>✕</Text>
                </TouchableOpacity>
              </View>
            )}
            {hasActiveFilters && (
              <TouchableOpacity
                style={styles.clearFiltersButton}
                onPress={clearAllFilters}
                activeOpacity={0.7}
              >
                <Text style={styles.clearFiltersText}>Limpiar filtros</Text>
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.tableContainer}>
            <View style={styles.tableHeader}>
              <View style={[styles.tableHeaderCell, { flex: 2 }]}>
                <Text style={styles.tableHeaderText}>Dashboard</Text>
              </View>
              <View style={[styles.tableHeaderCell, { flex: 1 }]}>
                <Text style={styles.tableHeaderText}>Tipo de Campaña</Text>
              </View>
              <View style={[styles.tableHeaderCell, { flex: 1 }]}>
                <Text style={styles.tableHeaderText}>LOB</Text>
              </View>
              <View style={[styles.tableHeaderCell, { flex: 1 }]}>
                <Text style={styles.tableHeaderText}>Iniciada</Text>
              </View>
              <View style={[styles.tableStatusCell, { flex: 1 }]}>
                <Text style={styles.tableHeaderText}>Status</Text>
              </View>
            </View>

            {paginatedDashboards.map(renderTableRow)}

            {paginatedDashboards.length === 0 && (
              <View style={{ padding: spacing.lg, alignItems: 'center' }}>
                <Text style={styles.paginationText}>No dashboards found</Text>
              </View>
            )}
          </View>

          <View style={styles.paginationContainer}>
            <Text style={styles.paginationText}>
              {filteredDashboards.length === 0 ? '0' : `${(currentPage - 1) * itemsPerPage + 1}-${Math.min(currentPage * itemsPerPage, filteredDashboards.length)}`} of {filteredDashboards.length}
            </Text>
            <View style={{ flexDirection: 'row', gap: spacing.sm }}>
              <TouchableOpacity
                style={[styles.paginationButton, currentPage === 1 && styles.paginationButtonDisabled]}
                onPress={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                <Text style={styles.paginationButtonText}>Previous</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.paginationButton, currentPage === totalPages && styles.paginationButtonDisabled]}
                onPress={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
              >
                <Text style={styles.paginationButtonText}>Next</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

        {isMobile && (
          <FlatList
            data={filteredDashboards}
            renderItem={renderDashboard}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            contentContainerStyle={styles.gridContainer}
          />
        )}
      </View>
    </ResponsiveContainer>
  );
};
